"use client";

import { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function CodeBlock({ codeString, language, className }: { codeString: string; language: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeString);
      } else {
        // Fallback for older browsers (including some iOS Safari versions)
        const textarea = document.createElement('textarea');
        textarea.value = codeString;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        (document.getSelection() || (window as any).getSelection())?.removeAllRanges();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore; best effort copy
    }
  }

  // Utility to escape HTML when highlighting fails
  function escapeHTML(str: string) {
    return str.replace(/[&<>"']/g, (c) => {
      switch (c) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return c;
      }
    });
  }

  // Use highlight.js to produce safe highlighted HTML
  let highlighted = '';
  try {
    if (language && hljs.getLanguage(language)) {
      highlighted = hljs.highlight(codeString, { language }).value;
    } else {
      highlighted = hljs.highlightAuto(codeString).value;
    }
  } catch (e) {
    highlighted = escapeHTML(codeString);
  }

  return (
    <div className="code-block my-6 rounded-xl overflow-hidden border border-white/6 shadow-[0_8px_24px_rgba(0,0,0,0.45)] bg-[#0b1020]">
      <div className="code-block-header flex items-center justify-between px-3 py-3 bg-[#0b1020] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          <div className="text-sm font-semibold text-white/90 uppercase tracking-wider font-mono">{(language || 'text').toUpperCase()}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWrap((v) => !v)}
            aria-pressed={wrap}
            aria-label={`${wrap ? 'Disable' : 'Enable'} wrap`}
            className={
              'inline-flex items-center gap-2 px-3 py-2.5 h-10 rounded-md text-sm font-medium transition-all duration-200 ' +
              (wrap
                ? 'bg-brand/10 text-brand border border-brand/30'
                : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:text-white hover:border-brand/50')
            }
          >
            {wrap ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h12" />
                  <path d="M4 12h14" />
                  <path d="M4 17h12" />
                  <path d="M19 7v6h-6" />
                </svg>
                <span className="hidden sm:inline font-semibold">Wrapped</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h12" />
                  <path d="M4 12h14" />
                  <path d="M4 17h12" />
                  <path d="M20 7l3 3-3 3" />
                </svg>
                <span className="hidden sm:inline">Wrap</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopy}
            type="button"
            className={
              'inline-flex items-center gap-2 px-3 py-2.5 h-10 rounded-md text-sm font-medium transition-all duration-200 z-10 ' +
              (copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:text-white hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10')
            }
            aria-label={`Copy ${language || 'code'} to clipboard`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="hidden sm:inline font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform group-hover-btn:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre className={'code-block-content m-0 px-4 py-4 bg-[#0b1020] ' + (wrap ? 'whitespace-pre-wrap break-words overflow-x-hidden' : 'whitespace-pre overflow-x-auto')}>
        <code className={'hljs font-mono ' + (className || '')} dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}
