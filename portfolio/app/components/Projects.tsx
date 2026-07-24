"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/data.json";

interface Project {
  title: string;
  desc: string[];
  year: string;
  preview: string;
  code?: string;
  thumbnail: string;
  images: string[];
  tech: string[];
  slug: string;
  categories: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="mt-32 px-4 md:px-10 lg:px-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-20 animate-fade-in">
        <span className="text-[13px] font-mono relative tracking-[0.2em] text-accent-gold-dark uppercase whitespace-nowrap">
          / STUFF I BUILT / p. 003
        </span>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-40 pb-40">
        {data.projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index + 1}
            onClick={() => setSelectedProject(project as Project)}
          />
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative w-full min-h-[500px] flex flex-col justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden opacity-20 blur-[2px]">
        <Image
          src={project.images[0]}
          alt=""
          fill
          className="object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 ease-out"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        {/* Left/Top Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-accent-gold-dark font-mono text-sm">0{index}</span>
            <h3 className="text-3xl md:text-6xl xl:text-9xl font-bebas uppercase leading-none tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-xl max-sm:hidden lg:flex  md:text-xs xl:text-xl text-foreground font-sekuya tracking-wide max-w-2xl">
            {project.desc[0]}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="px-3 py-1 text-[10px] font-mono border border-white/20 uppercase tracking-widest text-foreground/60 group-hover:text-accent-gold group-hover:border-accent-gold/40 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right/Bottom Sidebar Meta */}
        <div className="lg:col-span-4 flex flex-col lg:items-end gap-10">
          <div className="text-right">
            <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">
              Year
            </span>
            <p className="text-2xl font-bebas">{project.year}</p>
          </div>

          <div className="flex flex-col lg:items-end gap-3 underline-offset-8">
            <button className="text-[12px] font-mono text-accent-gold-dark uppercase tracking-widest hover:underline flex items-center gap-2">
              VIEW PROJECT <span className="text-lg">→</span>
            </button>
            <a
              href={project.preview}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-[12px] font-mono text-foreground/40 uppercase tracking-widest hover:text-foreground hover:underline flex items-center gap-2"
            >
              VISIT SITE <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div id="projects"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-[#0a0a0b] overflow-y-auto"
    >
      {/* Replicate Global Background Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: `var(--grid-size) var(--grid-size)`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(16,185,129,0.05),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Close Header */}
      <div className="sticky top-0 z-50 p-6 flex justify-between items-center bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Project Case Study / {project.title}
        </span>
        <button
          onClick={onClose}
          className="group flex items-center gap-3 text-white transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Close
          </span>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 group-hover:border-accent-gold transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-20 mt-10">
        {/* Section 1: Hero Thumbnail */}
        <div className="relative w-full aspect-video mb-24 overflow-hidden rounded-sm group shadow-2xl">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-1000"
            sizes="100vw"
            priority
          />
        </div>

        {/* Section 2: Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          {/* Main Description */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <h2 className="text-5xl md:text-9xl font-bebas uppercase leading-none">{project.title}</h2>
            <ul className="flex flex-col gap-8">
              {project.desc.map((item, idx) => (
                <li key={idx} className="flex gap-6 group">
                  <span className="text-accent-gold-dark font-mono text-xl md:text-2xl pt-2">/</span>
                  <p className="text-xs md:text-xl font-sekuya text-foreground/80 leading-relaxed max-w-3xl">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col gap-12 pt-4">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">The Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-sm border border-white/10 rounded-sm font-mono tracking-tighter">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-y border-white/10 py-10">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Role</h4>
                <p className="md:text-lg text-sm font-sekuya">Lead Developer</p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Project Year</h4>
                <p className="text-lg font-sekuya">{project.year}</p>
              </div>
            </div>

            <a
              href={project.preview}
              target="_blank"
              className="group w-full py-6 bg-accent-gold text-black text-center font-mono uppercase tracking-[0.3em] text-sm hover:bg-accent-gold-dark transition-all duration-500 flex items-center justify-center gap-3 shadow-lg"
            >
              LAUNCH PROJECT <span className="text-xl inline-block group-hover:translate-x-1 transition-transform">↗</span>
            </a>
          </div>
        </div>

        {/* Section 3: Visuals Gallery */}
        <div className="flex flex-col gap-16">
          <div className="flex items-center gap-4">
            <h3 className="font-bebas text-5xl uppercase tracking-wider">Visuals</h3>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="flex flex-col gap-20">
            {project.images.slice(1).map((img, i) => (
              <div key={i} className="relative w-full aspect-video overflow-hidden rounded-sm bg-white/5 border border-white/5 shadow-2xl">
                <Image
                  src={img}
                  alt={`${project.title} visual ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
