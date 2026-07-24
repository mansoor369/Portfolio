import Link from "next/link";
import SocialLinks from "./SocialLinks";
import data from "../data/data.json";

export default function ContactMe() {
  return (
    <section id="contact" className="mt-32 flex flex-col">
      <span className="text-[11px] mb-24 md:mb-44 font-extralight font-mono relative tracking-[0.2em] text-accent-gold-dark uppercase">
        / OPEN CHANNEL / p. 004
      </span>
      <span className="text-[11px] font-mono font-extralight tracking-[0.4em] text-accent-gold-dark uppercase">
        Lets make something that means something
      </span>

      <Link href={data.socials.email} className="text-[8vw]  md:text-[6vw] mt-4 md:mt-6 uppercase font-bebas hover:text-accent-gold-dark duration-150 ease-in transition-all cursor-none break-all sm:break-normal">
        {data.socials.email.replace("mailto:", "")}
      </Link>

      <div className="h-px my-8 bg-accent-gold-dark w-full shadow-[0_0_10px_rgba(212,178,83,0.3)] animate-pulse"></div>

      {/* Social Links Row */}
      <SocialLinks />

      {/* Footer Row */}
      <div className="mt-40 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] font-mono tracking-[0.2rem] text-accent-gold-dark/40 uppercase">
        <div className="flex items-center gap-2">
          <span>© 2026 MANSOOR KHAN</span>
          <span className="opacity-50">—</span>
          <span className="hover:text-accent-gold-dark/80 transition-colors">mky333.vercel.app</span>
        </div>
        <div className="flex items-center gap-2">
          <span>BUILT RAW</span>
          <span className="text-accent-gold-dark/20">•</span>
          <span>SHIPPED WITH INTENT</span>
        </div>
      </div>
    </section>
  );
}
