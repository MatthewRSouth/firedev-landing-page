'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

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
      {/* Background glows — CSS only, no image needed */}
      <div aria-hidden="true" className="absolute inset-0 bg-bg pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-fire opacity-[0.06] blur-3xl -translate-x-1/3 translate-y-1/3" />
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
