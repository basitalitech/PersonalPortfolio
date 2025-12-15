"use client";

import Image from "next/image";
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
const m: any = motion as any;

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NeuraWeb – Futuristic AI Website Landing Design",
    description: "A sleek, dark-themed AI-powered landing page concept built in Figma.",
    longDescription: "A sleek, dark-themed AI-powered landing page concept built in Figma. Designed for modern startups and futuristic digital products, it features glowing neon visuals, immersive UI, and a dynamic tone. The design encapsulates the cutting-edge possibilities of AI and tech, offering a glimpse into the future of online experiences for tech-forward companies. This project showcases advanced UI/UX principles including glassmorphism, micro-interactions, and responsive design patterns.",
    link: "https://www.figma.com/community/file/1441377868897233703/ai-website-landing-design",
    image: "/projects/project-1.png",
    technologies: ["Figma", "UI/UX Design", "Prototyping"],
    category: "Design",
  },
  {
    id: 2,
    title: "Apple Vision Pro – HR Software Design",
    description: "A futuristic HR software concept designed for Apple Vision Pro.",
    longDescription: "A futuristic HR software concept designed for Apple Vision Pro, built in Figma to reimagine attendance, leave tracking, and employee experience - all in one immersive interface. This project explores spatial computing and 3D interface design principles, creating an intuitive experience for managing HR workflows in a mixed reality environment. Features include gesture-based navigation, real-time data visualization, and seamless integration with existing HR systems.",
    link: "https://www.figma.com/community/file/1371824014208363481/apple-vision-pro-hr-software-design",
    image: "/projects/project-2.png",
    technologies: ["Figma", "Spatial Design", "Vision Pro"],
    category: "Design",
  },
];

export default function ProjectsPage(): React.JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Header />
        <main className="min-h-screen pt-24 pb-20 px-6">
        <m.div className="container mx-auto max-w-7xl" initial="hidden" animate="visible" variants={containerVariants}>
            {/* Header Section */}
            <m.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                My Projects
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
                A collection of my work spanning design, development, and innovation. 
                Each project represents a unique challenge and creative solution.
            </p>
            </m.div>

            {/* Projects Grid */}
            <m.div className="space-y-20" variants={containerVariants}>
            {projects.map((project, index) => (
                <m.article
                key={project.id}
                className="group"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}>
                    {/* Image Section */}
                    <m.div
                    className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 p-3 shadow-2xl">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            priority={index < 2}
                        />
                        </div>
                    </div>
                    </m.div>

                    {/* Content Section */}
                    <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    {/* Category Badge */}
                    <m.div
                        className="inline-flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium">
                        {project.category}
                        </span>
                    </m.div>

                    {/* Title */}
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-white/80 mb-6 leading-relaxed">
                        {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                        Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90 text-sm"
                            >
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        {project.link && (
                        <m.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50 text-white transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>View Project</span>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </m.a>
                        )}
                        {project.github && (
                        <m.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label="View GitHub repository"
                        >
                            <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>GitHub</span>
                        </m.a>
                        )}
                    </div>
                    </div>
                </div>
                </m.article>
            ))}
            </m.div>

            {/* CTA Section */}
            <m.div
            className="mt-20 text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Interested in collaborating?
                </h3>
                <p className="text-lg text-white/80 mb-6 max-w-xl mx-auto">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <Link href="/#contact">
                <m.span
                    className="inline-block px-8 py-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Get in Touch
                </m.span>
                </Link>
            </div>
            </m.div>
        </m.div>
        </main>
      <Footer />
    </>
  );
}
