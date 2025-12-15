"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const m: any = motion as any;

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "Food Delivery App (Expo)",
    description: "Developed a streamlined food delivery application using the Expo framework. The app features an intuitive interface that allows users to order seamlessly after creating an account via phone number and password.",
    icon: "/cards/card1.png",
  },
  {
    id: 2,
    title: "POS Waiter Companion App (Expo)",
    description: "Developed a mobile waiter companion app designed to sync seamlessly with a primary POS system. Built using the Expo framework, the application features a clean, beginner-friendly UI and modern design elements to enhance operational efficiency.",
    icon: "/cards/card2.png",
  },
  {
    id: 3,
    title: "POS Software (Next.js + Electron)",
    description: "Built a robust Point-of-Sale system using Next.js, packaged within an Electron container. This architecture delivers a standalone desktop application with a zero-dependency installer, ensuring a frictionless setup experience for end users.",
    icon: "/cards/card3.png",
  },
  {
    id: 4,
    title: "Face Mask Classifier (Python)",
    description: "Developed a computer vision software in Python utilizing the MobileNetV2 architecture. The model was trained on a dataset of approximately 10,000 images to classify face mask usage into three distinct categories: with mask, without mask, and incorrectly worn mask.",
    icon: "/cards/card4.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <m.section id="experience" className="py-20 px-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="container mx-auto max-w-6xl">
        <m.div className="text-center mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <m.h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Experience</m.h2>
          <p className="text-lg text-white/80 max-w-4xl mx-auto">
            Here are some of the projects and platforms I've worked on throughout my career. Each one has contributed to my growth as a developer.
          </p>
        </m.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCards.map((card, index) => (
            <m.div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-sm rounded-xl p-6 border-t-3 border-purple-700 flex items-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: index * 0.1 }}
            >
              <div className="mb-4 ">
                <m.div whileHover={{ scale: 1.2 }} className="inline-block">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={210}
                  height={210}
                  className="object-contain"
                />
                </m.div>
              </div>
              <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {card.description}
              </p>
              <Link
                // href="https://basitali.tech/projects"
                href="/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors inline-block"
              >
                <m.span whileHover={{ x: 6, scale: 1.02 }}>Learn More →</m.span>
              </Link>
              </div>

            </m.div>
          ))}
        </div>
      </div>
    </m.section>
  );
}

