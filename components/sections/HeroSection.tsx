'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

// ── Floating arc paths background ────────────────────────────────────────────
// Adapted from kokonutd/background-paths (21st.dev) — MIT licensed.
// Bezier math preserved exactly; color changed to fire orange, opacity tuned
// for dark background, Math.random() replaced with deterministic i % 10
// to avoid Next.js SSR/client hydration mismatch.

function FloatingPaths({ position }: { position: number }) {
  const reduced = useReducedMotion();

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.8 + i * 0.04,
    opacity: 0.08 + (i / 35) * 0.22, // 8 % → 30 %
    duration: 20 + (i % 10),          // 20 – 29 s, deterministic
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((p) => (
        <motion.path
          key={p.id}
          d={p.d}
          stroke="#f97316"
          strokeWidth={p.width}
          strokeOpacity={p.opacity}
          initial={{ pathLength: 0.3, opacity: 0 }}
          animate={
            reduced
              ? { pathLength: 1, opacity: p.opacity }
              : {
                  pathLength: 1,
                  opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
                  pathOffset: [0, 1, 0],
                }
          }
          transition={
            reduced
              ? { duration: 0.15 }
              : { duration: p.duration, repeat: Infinity, ease: 'linear' }
          }
        />
      ))}
    </svg>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut' as const,
      },
    },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Background — arc paths + ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 bg-bg pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-neon opacity-[0.03] blur-3xl translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center py-32">
        {/* Logo */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <Image
            src="/FireDevInstagramIcon.png"
            alt="FireDev"
            width={64}
            height={64}
            priority
            className="rounded-2xl"
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="font-body text-neon text-xs uppercase tracking-[0.2em] mb-5"
        >
          Web Development Agency
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none"
        >
          <span className="text-foreground">FAST SITES.</span>
          <br />
          <span className="text-fire">MORE CALLS.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp(0.32)}
          initial="hidden"
          animate="visible"
          className="font-body text-muted-foreground text-lg md:text-xl mt-7 leading-relaxed max-w-xl mx-auto"
        >
          We build fast, professional websites for businesses worldwide —
          with deep expertise serving clients in Japan.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.44)}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-fire text-bg font-body font-semibold text-lg px-10 h-14 rounded-lg hover:bg-[#e8650a] transition-colors duration-200 cursor-pointer w-full sm:w-auto"
          >
            Book a Free Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          variants={fadeUp(0.54)}
          initial="hidden"
          animate="visible"
          className="font-body text-muted-foreground text-sm mt-4"
        >
          30 minutes. Free. No commitment.
        </motion.p>
      </div>
    </section>
  );
}
