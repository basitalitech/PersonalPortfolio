"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
const m: any = motion as any;

interface PostContentProps {
  title: string;
  date: string;
  content: string;
  readTime?: string;
}

export default function PostContent({ title, date, content, readTime }: PostContentProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  return (
    <m.section className="px-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="container mx-auto max-w-6xl">
        <m.article
          className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 backdrop-blur-sm border border-white/30 rounded-xl p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <header className="mb-8">
            <m.h1 className="text-4xl lg:text-5xl font-bold mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {title}
            </m.h1>
            <div className="flex gap-4 items-center text-white/60 text-lg">
              <time>{date}</time>
              {readTime && <span className="text-sm text-white/60">· {readTime}</span>}
            </div>
          </header>

              <m.section
                className="prose prose-invert max-w-none text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[]}
                  components={{
                    // Handle fenced code blocks by wrapping the <pre><code>...</code></pre>
                    pre: ({ node, children, ...props }: any) => {
                      // children is usually a single <code> element
                      const codeElement = Array.isArray(children) ? children[0] : children;
                      const className = codeElement?.props?.className || '';
                      const raw = codeElement?.props?.children;

                      // recursive extractor that safely pulls text from React nodes
                      const extractText = (n: any): string => {
                        if (n == null) return '';
                        if (typeof n === 'string' || typeof n === 'number') return String(n);
                        if (Array.isArray(n)) return n.map(extractText).join('');
                        if (n && typeof n === 'object') {
                          if (typeof n.props?.children !== 'undefined') return extractText(n.props.children);
                          if (typeof n.value === 'string' || typeof n.value === 'number') return String(n.value);
                        }
                        return '';
                      };

                      let codeString = extractText(raw).replace(/^[\n\r]+|[\n\r]+$/g, '');

                      // fallback to node children values if extraction produced nothing
                      if (!codeString && node && Array.isArray(node.children)) {
                        codeString = node.children.map((n: any) => n.value || extractText(n)).join('').replace(/^[\n\r]+|[\n\r]+$/g, '');
                      }

                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';

                      return <CodeBlock codeString={codeString} language={language} className={className} />;
                    },
                    // Keep inline code default behavior
                    code: ({ inline, className, children, ...props }: any) => {
                      if (inline) return <code className={className} {...props}>{children}</code>;
                      return <></>;
                    },
                    // Add click handler to images for lightbox
                    img: ({ src, alt, ...props }: any) => (
                      <img
                        src={src}
                        alt={alt}
                        {...props}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setEnlargedImage(src)}
                      />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </m.section>

          <footer className="mt-8 pt-8 border-t border-white/10">
            <m.div whileHover={{ x: -6 }} transition={{ duration: 0.2 }}>
              <Link href="/blog" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors inline-block">
                ← Back to blog
              </Link>
            </m.div>
          </footer>
        </m.article>

        {/* Image Lightbox Modal */}
        {enlargedImage && (
          <m.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setEnlargedImage(null)}
          >
            <m.div
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setEnlargedImage(null)}
                className="absolute top-4 right-4 z-51 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Enlarged Image */}
              <img
                src={enlargedImage}
                alt="Enlarged view"
                className="w-full h-full object-contain rounded-lg"
              />
            </m.div>
          </m.div>
        )}
      </div>
    </m.section>
  );
}

// CodeBlock is now implemented in its own file (app/components/CodeBlock.tsx)
