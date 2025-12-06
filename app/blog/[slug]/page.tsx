import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostContent from '../../components/PostContent';
import { getPostBySlug, getPostSlugs } from '../../../lib/posts';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  return { title: `${post.frontmatter.title} - Blog`, description: (post.frontmatter.description || post.content.slice(0, 140)) };
}

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#110720] text-white pt-24 pb-12">
        <PostContent title={post.frontmatter.title} date={post.frontmatter.date} content={post.content} readTime={post.readTime} />
      </main>
      <Footer />
    </>
  );
}
