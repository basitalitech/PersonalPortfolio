"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
const m: any = motion as any;

const posts = [
  {
    slug: 'design-systems-101',
    title: 'Design Systems 101: Foundations',
    excerpt:
      'A practical guide to building design systems that scale — principles, tokens and components.',
    date: '2025-12-01',
    category: 'Design',
    readTime: '5 min read',
  },
  {
    slug: 'front-end-performance',
    title: 'Front-end Performance: Tips and Tricks',
    excerpt:
      "A set of practical techniques to optimize performance and keep load times snappy.",
    date: '2025-11-20',
    category: 'Development',
    readTime: '7 min read',
  },
  {
    slug: 'ux-research-in-practice',
    title: 'UX Research in Practice',
    excerpt:
      'A short writeup on how to make research accessible and actionable in product teams.',
    date: '2025-10-05',
    category: 'Research',
    readTime: '4 min read',
  },
];

export default function BlogPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#110720] text-white pt-6">
        <m.section className="py-20 px-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-center">Tech Blog</h1>
            <p className="text-base text-white/90 text-center mb-8">"Technology is best when it brings people together" - <i>Matt Mullenweg</i></p>
            {/* Search and Filter Controls */}
            <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center max-w-4xl mx-auto">
              {/* Search Input */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-full py-3 px-6 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <svg className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post, index) => (
                <m.div
                  key={post.slug}
                  className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-sm rounded-xl p-6 border-t-3 border-purple-700 flex flex-col"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: index * 0.1 }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-900/20 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {post.title}
                    </h3>
                    <time className="text-white/70 text-sm mb-4 block">
                      {post.date}
                    </time>
                  </div>
                  <p className="text-white/70 text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors inline-block"
                  >
                    <m.span whileHover={{ x: 6, scale: 1.02 }}>READ MORE →</m.span>
                  </Link>
                </m.div>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg">No posts found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 text-purple-400 hover:text-purple-300 underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </m.section>
      </main>
      <Footer />
    </>
  );
}
