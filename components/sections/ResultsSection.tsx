'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, inView: boolean, reduced: boolean): number {
  const [display, setDisplay] = useState(reduced ? target : 0);
  const raw = useMotionValue(reduced ? target : 0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });

  useMotionValueEvent(spring, 'change', (v) => setDisplay(Math.round(v)));

  useEffect(() => {
    if (inView && !reduced) {
      const t = setTimeout(() => raw.set(target), 80);
      return () => clearTimeout(t);
    }
  }, [inView, target, raw, reduced]);

  return display;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  {
    value: 14,
    suffix: 'DAYS',
    label: 'Average time from discovery call to live site.',
  },
  {
    value: 100,
    suffix: '/100',
    label: 'Lighthouse performance score — our target on every build.',
  },
  {
    value: 30,
    suffix: 'MIN',
    label: 'Discovery call. Tell us your goal. We handle the rest.',
  },
  {
    value: 0,
    suffix: ' HIDDEN FEES',
    label: 'The price we quote is the price you pay.',
  },
] as const;

const stackItems = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel',
  'Framer Motion', 'shadcn/ui', 'Lucide', 'React', 'HTML5', 'CSS3',
];

const demoTags = ['HTML5', 'CSS3', 'Vanilla JS', 'Responsive', 'Schema.org', 'Mobile-first'];

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatCard({ value, suffix, label, delay }: StatCardProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, inView, reduced);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
      transition={{ duration: reduced ? 0.15 : 0.5, delay: reduced ? 0 : delay, ease: 'easeOut' }}
      className="text-center px-6 py-2"
    >
      <div className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-none tabular-nums">
        <span className="text-foreground">{count}</span>
        <span className="text-neon">{suffix}</span>
      </div>
      <p className="font-body text-[13px] text-muted-foreground leading-snug mt-3 max-w-[160px] mx-auto">
        {label}
      </p>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ResultsSection() {
  const reduced = useReducedMotion() ?? false;

  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.15 : 0.5,
        delay: reduced ? 0 : delay,
        ease: 'easeOut' as const,
      },
    },
  });

  // Quadruple items so the strip is always wider than any viewport
  const marqueeItems = [...stackItems, ...stackItems, ...stackItems, ...stackItems];

  return (
    <section id="results" className="bg-surface py-24">
      <div className="max-w-6xl mx-auto px-4">

        {/* Eyebrow + Headline */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <p className="font-body text-neon text-[11px] uppercase tracking-[0.2em] mb-4">
            Built to perform
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-foreground">
            WHAT YOU ACTUALLY GET
          </h2>
        </motion.div>

        {/* Stat counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-brand-border">
          {stats.map((stat, i) => (
            <StatCard key={stat.suffix} {...stat} delay={i * 0.1} />
          ))}
        </div>

        {/* Tech stack marquee */}
        <div className="mt-16 border-y border-brand-border py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-8 px-4 whitespace-nowrap">
                <span className="font-body text-[12px] uppercase tracking-widest text-muted-foreground">
                  {item}
                </span>
                <span className="text-neon/30 text-[10px]">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Case study card */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-bg border border-brand-border rounded-xl p-8">

            {/* Badge */}
            <span className="inline-block font-body text-[11px] uppercase tracking-widest text-neon border border-neon/30 rounded-full px-3 py-1 mb-6">
              Sample Work
            </span>

            {/* Clinic name */}
            <h3 className="font-display text-[2rem] leading-tight text-foreground mb-2">
              MINAGAWA CLINIC
            </h3>

            {/* Meta */}
            <p className="font-body text-[14px] text-muted-foreground flex items-center gap-1.5 mb-5">
              <MapPin className="w-3.5 h-3.5 text-neon/50 flex-shrink-0" />
              Internal Medicine &amp; Gastroenterology · Minato-ku, Tokyo
            </p>

            {/* Description */}
            <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-6">
              A demo site built to show a local Tokyo clinic what a modern, mobile-first
              presence could look like. Designed around patient trust — clear hours,
              bilingual-ready structure, and Schema.org markup for local search visibility.
              Shown to the client. They loved it.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {demoTags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[12px] text-muted-foreground bg-surface border border-brand-border rounded-md px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <a
              href="https://matthewrsouth.github.io/minagawa-clinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[14px] text-neon hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              View the demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
