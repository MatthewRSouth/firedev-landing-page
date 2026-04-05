'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Search, ShieldOff, Clock } from 'lucide-react';

const painPoints = [
  {
    icon: Search,
    headline: 'INVISIBLE ONLINE',
    body: "Customers search Google. If you're not there, they hire whoever is. It's that simple.",
  },
  {
    icon: ShieldOff,
    headline: 'NO SITE, NO TRUST',
    body: "A Facebook page or \"call for info\" signals small-time. You're losing deals before the first conversation.",
  },
  {
    icon: Clock,
    headline: 'DIY COSTS MORE THAN YOU THINK',
    body: "Three weekends on Wix and it still doesn't look right. Your time is worth more than that.",
  },
];

export default function ProblemSection() {
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

  return (
    <section id="problem" className="bg-surface py-24">
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
            Sound familiar?
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-foreground">
            THESE ARE COSTING YOU CLIENTS
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.headline}
                variants={fadeUp(i * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-bg border border-brand-border rounded-xl p-8 hover:border-neon/30 transition-colors duration-200 cursor-default"
              >
                {/* Icon container */}
                <div className="inline-flex items-center justify-center bg-neon/[0.08] rounded-lg p-3 mb-6">
                  <Icon className="w-6 h-6 text-neon" />
                </div>

                {/* Card headline */}
                <h3 className="font-display text-[1.75rem] leading-tight text-foreground mb-3">
                  {point.headline}
                </h3>

                {/* Card body */}
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
                  {point.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
