'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: CalendarCheck,
    headline: 'BOOK A CALL',
    body: '30 minutes over Google Meet. We learn your goals, walk you through the process, and agree on a scope.',
  },
  {
    number: '02',
    icon: Code2,
    headline: 'WE BUILD',
    body: 'Fast, mobile-first, designed to convert. You see updates as the build comes together. No surprises.',
  },
  {
    number: '03',
    icon: Rocket,
    headline: 'YOU LAUNCH',
    body: 'Site goes live. You get the keys. We handle any post-launch tweaks at no extra charge.',
  },
];

export default function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
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

  const connectorVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="process" className="bg-bg py-24">
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
            Simple by design
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-foreground">
            HOW IT WORKS
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="relative mt-16">
          {/* Connector line — desktop only */}
          <motion.div
            variants={connectorVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-hidden="true"
            className="hidden md:block absolute top-[52px] left-[calc(16.666%+24px)] right-[calc(16.666%+24px)] border-t border-dashed border-neon/20 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp(i * 0.12)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden bg-surface border border-brand-border rounded-xl p-8 hover:border-neon/30 transition-colors duration-200 cursor-default"
                >
                  {/* Decorative step number */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-4 font-display text-[6rem] leading-none text-foreground/[0.04] select-none"
                  >
                    {step.number}
                  </span>

                  {/* Icon container */}
                  <div className="relative inline-flex items-center justify-center bg-neon/[0.08] rounded-lg p-3 mb-6">
                    <Icon className="w-6 h-6 text-neon" />
                  </div>

                  {/* Card headline */}
                  <h3 className="font-display text-[1.75rem] leading-tight text-foreground mb-3">
                    {step.headline}
                  </h3>

                  {/* Card body */}
                  <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
