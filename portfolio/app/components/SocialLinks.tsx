import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import data from "../data/data.json";

const socialLinks = [
  { label: "GitHub", href: data.socials.github, icon: FaGithub },
  { label: "LinkedIn", href: data.socials.linkedin, icon: FaLinkedinIn },
  { label: "Upwork", href: data.socials.upwork, icon: SiUpwork },
  { label: "Instagram", href: data.socials.instagram, icon: FaInstagram },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex items-center gap-1" : "flex flex-wrap gap-x-12 gap-y-4"}>
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={compact ? link.label : undefined}
            title={compact ? link.label : undefined}
            className={
              compact
                ? "group flex size-9 items-center justify-center rounded-full text-foreground/55 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-gold-dark hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold-dark"
                : "group flex items-center gap-2 font-mono text-[11px] tracking-[0.2rem] text-accent-gold-dark/60 transition-colors duration-300 hover:text-accent-gold-dark"
            }
          >
            <Icon
              aria-hidden="true"
              className={compact ? "size-4" : "size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"}
            />
            {!compact && link.label.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
