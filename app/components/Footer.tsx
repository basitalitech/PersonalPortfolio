"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
const m: any = motion as any;

export default function Footer(): React.JSX.Element {
  return (
    <m.footer id="contact" className="py-20 px-6 border-t border-white/10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="container mx-auto max-w-6xl">
        <m.div className="text-center mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <m.h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Contact</m.h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            If you&apos;re interested in discussing a project, exploring a collaboration, or simply getting in touch, feel free to reach out via email or any social media platform.
          </p>
          <a
            href="mailto:basitalitech@proton.me"
            className="text-lg text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            basitalitech@proton.me
          </a>
        </m.div>

        {/* Social Media Icons */}
        <m.div className="flex justify-center gap-6 mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Link href="https://www.instagram.com/basitalitech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <m.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <Image src="/assets/instagram.svg" alt="Instagram" width={20} height={20} className="w-7 h-7" />
            </m.div>
          </Link>

          <Link href="https://github.com/basitalitech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <m.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <Image src="/assets/github.svg" alt="GitHub" width={20} height={20} className="w-7 h-7" />
            </m.div>
          </Link>

          <Link href="https://www.linkedin.com/in/basitalitech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <m.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <Image src="/assets/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-8 h-8" />
            </m.div>
          </Link>
        </m.div>

        <m.div className="text-center mt-12 pt-8 border-t border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Abdul Basit Ali. All rights reserved.
          </p>
        </m.div>
      </div>
    </m.footer>
  );
}

