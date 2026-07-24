"use client";

import { motion } from "framer-motion";
import data from "../data/data.json";

export default function Experience() {
  return (
    <section id="experience" className="mt-16 overflow-hidden px-4 pb-32 md:mt-24 md:px-10 lg:mt-32 lg:px-20">
      <div className="mb-16 flex flex-col gap-3 md:mb-24">
        <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.4em] text-accent-gold-dark md:text-[13px]">
          / WHERE I&apos;VE WORKED / P.002
        </span>
        <h2 className="font-bebas text-[16vw] uppercase leading-none text-foreground md:text-[12vw]">
          Experience
        </h2>
      </div>

      <div className="border-t border-white/10">
        {data.experience.map((experience, index) => (
          <motion.article
            key={`${experience.company}-${experience.position}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="grid gap-8 border-b border-white/10 py-12 md:grid-cols-12 md:gap-10 md:py-16"
          >
            <div className="md:col-span-4">
              <span className="mb-5 block font-mono text-[10px] tracking-[0.3em] text-accent-gold-dark">
                / 0{index + 1}
              </span>
              <h3 className="font-bebas text-4xl uppercase leading-none text-foreground md:text-6xl">
                {experience.company}
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                {experience.startDate} — {experience.endDate}
              </p>
            </div>

            <div className="flex flex-col gap-7 md:col-span-8">
              <div>
                <h4 className="font-bebas text-2xl uppercase tracking-wide text-accent-gold-dark md:text-4xl">
                  {experience.position}
                </h4>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  {experience.location} / {experience.type}
                </p>
              </div>

              <ul className="flex max-w-4xl flex-col gap-4">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 font-sekuya text-sm leading-7 text-foreground/70 md:text-base md:leading-8">
                    <span aria-hidden="true" className="text-accent-gold-dark">/</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-2" aria-label={`Skills used at ${experience.company}`}>
                {experience.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-foreground/55 transition-colors duration-300 hover:border-accent-gold-dark/50 hover:text-accent-gold-dark"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
