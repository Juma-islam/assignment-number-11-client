import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaShoppingCart, FaCut, FaClipboardCheck, FaTruck } from "react-icons/fa";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const steps = [
  {
    icon: FaShoppingCart,
    number: "01",
    label: "ORDER",
    title: "Place Order",
    desc: "Browse collections, select styles & place bulk orders in minutes with instant confirmation.",
    color: "#E8531A",
    stat: "< 2 min",
    statLabel: "avg. order time",
  },
  {
    icon: FaCut,
    number: "02",
    label: "PRODUCE",
    title: "Production Starts",
    desc: "Cutting → Sewing → Printing with real-time stage updates and photo documentation.",
    color: "#7C3AED",
    stat: "100%",
    statLabel: "stage visibility",
  },
  {
    icon: FaClipboardCheck,
    number: "03",
    label: "INSPECT",
    title: "Quality Control",
    desc: "Multi-stage QC checkpoints, AQL 2.5 inspection & final approval before packing.",
    color: "#0891B2",
    stat: "AQL 2.5",
    statLabel: "inspection standard",
  },
  {
    icon: FaTruck,
    number: "04",
    label: "DELIVER",
    title: "Shipping & Tracking",
    desc: "Global delivery with live tracking, ETA updates & proof of delivery.",
    color: "#059669",
    stat: "180+",
    statLabel: "countries shipped",
  },
];

/* ─── Animated connector line between steps ─────────────────────────────── */
function ConnectorLine({ color }) {
  return (
    <div className="hidden lg:flex items-center flex-1 px-2 mt-[-2.5rem]">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ originX: 0 }}
        className="w-full"
      >
        <svg width="100%" height="16" viewBox="0 0 120 16" preserveAspectRatio="none">
          <line
            x1="0" y1="8" x2="110" y2="8"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <polygon points="110,4 120,8 110,12" fill={color} opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ─── Single Step (no card — open layout) ───────────────────────────────── */
function Step({ step, index, total }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start relative group"
    >
      {/* Step number + label row */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="font-black text-[11px] tracking-[0.28em] px-2.5 py-1 rounded-sm"
          style={{
            color: step.color,
            backgroundColor: `${step.color}15`,
            border: `1px solid ${step.color}30`,
          }}
        >
          {step.label}
        </span>
        <span className="text-gray-300 dark:text-gray-700 text-sm font-light">
          {step.number} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Icon circle — open ring style, no fill */}
      <div className="relative mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-14 h-14 rounded-full flex items-center justify-center relative"
          style={{ border: `2px solid ${step.color}` }}
        >
          <Icon style={{ color: step.color, fontSize: "20px" }} />
          {/* Pulse ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${step.color}` }}
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Vertical connector for mobile */}
        {index < total - 1 && (
          <div
            className="lg:hidden absolute left-1/2 top-full mt-1 w-px h-8 -translate-x-1/2 opacity-30"
            style={{ backgroundColor: step.color }}
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3 leading-tight group-hover:translate-x-1 transition-transform duration-300">
        {step.title}
      </h3>

      {/* Thin accent rule */}
      <motion.div
        className="h-px w-10 mb-4 rounded-full"
        style={{ backgroundColor: step.color }}
        initial={{ width: "2.5rem" }}
        whileInView={{ width: "2.5rem" }}
        whileHover={{ width: "5rem" }}
        transition={{ duration: 0.3 }}
      />

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-[220px]">
        {step.desc}
      </p>

      {/* Micro-stat */}
      <div className="mt-auto">
        <span
          className="text-3xl font-black tracking-tighter leading-none"
          style={{ color: step.color }}
        >
          {step.stat}
        </span>
        <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium tracking-wide uppercase mt-1">
          {step.statLabel}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Progress Bar (scroll-linked) ─────────────────────────────────────── */
function ScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return { ref, scaleX };
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAF8] dark:bg-[#080808] py-28 overflow-hidden"
    >
      {/* Background — large watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="text-[22vw] font-black tracking-tighter text-gray-100 dark:text-white/[0.02] leading-none whitespace-nowrap">
          PROCESS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            {/* Eyebrow with step dots */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              {steps.map((s, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color, opacity: 0.6 }}
                />
              ))}
              <span className="ml-3 text-[11px] font-black tracking-[0.25em] text-gray-400 dark:text-gray-600 uppercase">
                How It Works
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.92]"
            >
              Order to
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Doorstep.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm text-base text-gray-500 dark:text-gray-400 leading-relaxed lg:text-right lg:mb-3"
          >
            A streamlined 4-step journey designed for speed, quality, and
            complete transparency — from first click to final delivery.
          </motion.p>
        </div>

        {/* ── Scroll-linked horizontal rail ── */}
        <div className="relative mb-16 hidden lg:block">
          <div className="h-px w-full bg-gray-100 dark:bg-white/[0.05]" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-[#E8531A] via-[#7C3AED] to-[#059669]"
            style={{ scaleX: lineScale, transformOrigin: "left", width: "100%" }}
          />
        </div>

        {/* ── Steps layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col lg:flex-row flex-1 min-w-0">
              <Step step={step} index={i} total={steps.length} />
              {i < steps.length - 1 && (
                <ConnectorLine color={step.color} />
              )}
            </div>
          ))}
        </div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-8 items-center justify-between"
        >
          <div className="flex flex-wrap gap-6">
            {[
              "Every step monitored",
              "100% Transparency",
              "Dedicated Support",
            ].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-600 tracking-wide"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {t}
              </span>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}