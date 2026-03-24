import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const partners = [
  { name: "H&M",    logo: "https://i.ibb.co.com/bR8MwCFS/kate-trysh-o08-zo-Lx-G0-unsplash.jpg" },
  { name: "Zara",   logo: "https://images.unsplash.com/photo-1662275170993-1214097b947f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8WmFyYXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Uniqlo", logo: "https://images.unsplash.com/photo-1602519095267-53c956c8cf74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VW5pcWxvfGVufDB8fDB8fHww" },
  { name: "Levi's", logo: "https://images.unsplash.com/photo-1644338911891-5c49468eab89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGV2aSdzfGVufDB8fDB8fHww" },
  { name: "Nike",   logo: "https://images.unsplash.com/photo-1662410945107-e3e6927e828d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMGxvZ298ZW58MHx8MHx8fDA%3D" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1555274175-75f4056dfd05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWRpZGFzfGVufDB8fDB8fHww" },
  { name: "Puma",   logo: "https://images.unsplash.com/photo-1633523154731-d131470565d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UHVtYXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Gap",    logo: "https://images.unsplash.com/photo-1560243562-f480284a881f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhcHxlbnwwfHwwfHx8MA%3D%3D" },
];

const stats = [
  { value: "150+", label: "Partner Brands" },
  { value: "40+",  label: "Countries" },
  { value: "12yr", label: "Avg. Relationship" },
  { value: "$2B+", label: "Annual GMV" },
];

/* ─── Infinite Marquee Row ───────────────────────────────────────────────── */
function MarqueeRow({ items, speed = 40, reverse = false }) {
  const list = [...items, ...items, ...items];
  const duration = `${speed}s`;

  return (
    <div className="relative overflow-hidden w-full">
      {/* Light mode edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none
                   bg-gradient-to-r from-white to-transparent
                   dark:from-[#080808] dark:to-transparent"
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none
                   bg-gradient-to-l from-white to-transparent
                   dark:from-[#080808] dark:to-transparent"
      />

      <div
        className="flex items-center gap-16 w-max"
        style={{
          animation: `marquee-${reverse ? "rev" : "fwd"} ${duration} linear infinite`,
        }}
      >
        {list.map((p, i) => (
          <div
            key={i}
            className="group flex items-center justify-center shrink-0 w-36 h-16 relative"
          >
            {/*
              Light mode: logos are naturally dark on white — grayscale + muted opacity, hover = full color
              Dark  mode: logos are dark PNGs on black bg — we invert them to white, hover = original color (invert removed)
            */}
            <img
              src={p.logo}
              alt={p.name}
              className="
                max-h-10 max-w-[120px] object-contain transition-all duration-500

                grayscale opacity-40
                group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110

                dark:invert dark:brightness-75 dark:opacity-50
                dark:group-hover:invert-0 dark:group-hover:brightness-100 dark:group-hover:opacity-100
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated Stat Item ─────────────────────────────────────────────────── */
function StatItem({ value, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Vertical accent rule */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px
                   bg-black/10 group-hover:bg-black/30
                   dark:bg-white/10 dark:group-hover:bg-white/30
                   transition-colors duration-500"
      />
      <div className="pl-6">
        <span
          className="block text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-1
                     text-gray-900 dark:text-white"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </span>
        <span
          className="text-[11px] font-bold tracking-[0.22em] uppercase
                     text-gray-400 dark:text-white/40"
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function OurPartners() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28
                 bg-white dark:bg-[#080808]
                 transition-colors duration-500"
    >
      {/* ── Parallax watermark ── */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-[18vw] font-black tracking-tighter leading-none whitespace-nowrap
                     text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(0,0,0,0.04)",
          }}
        >
          {/* Dark mode override via a second element trick with CSS */}
          <span className="dark:hidden">PARTNERS</span>
          <span
            className="hidden dark:inline"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
          >
            PARTNERS
          </span>
        </span>
      </motion.div>

      {/* ── Fine grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none
                   opacity-[0.018] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Asymmetric Header ── */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-20">

          {/* Left — big headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-black/20 dark:bg-white/30" />
              <span
                className="text-[11px] font-black tracking-[0.3em] uppercase
                           text-gray-400 dark:text-white/40"
              >
                Global Network
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[0.9] tracking-tighter
                         text-gray-900 dark:text-white"
            >
              Trusted by
              <br />
              <span className="italic text-gray-200 dark:text-white/25">world-class</span>
              <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">brands.</span> 
            </motion.h2>
          </div>

          {/* Right — description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="max-w-xs text-right"
          >
            <p className="text-sm leading-relaxed mb-6 text-gray-400 dark:text-white/40">
              Proudly manufacturing for the world's leading fashion houses and
              retailers — from fast fashion to luxury sportswear.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs font-black tracking-[0.2em] uppercase px-6 py-3 rounded-full
                         transition-colors duration-300
                         text-gray-900 border border-gray-900/20
                         hover:bg-gray-900 hover:text-white
                         dark:text-white dark:border-white/20
                         dark:hover:bg-white dark:hover:text-black"
            >
              Become a Partner →
            </motion.button>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── Full-bleed marquee strips ── */}
      <div className="space-y-6 mb-16">
        <div className="w-full h-px bg-black/[0.07] dark:bg-white/[0.07]" />
        <MarqueeRow items={partners} speed={35} reverse={false} />
        <MarqueeRow items={[...partners].reverse()} speed={28} reverse={true} />
        <div className="w-full h-px bg-black/[0.07] dark:bg-white/[0.07]" />
      </div>

      {/* ── Footer certifications ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 items-center justify-between"
        >
          <div className="flex flex-wrap gap-8">
            {["NDA Protected", "Certified Supplier", "ISO 9001:2015", "OEKO-TEX® Standard"].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase
                           text-gray-300 dark:text-white/25"
              >
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
                {t}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-200 dark:text-white/15">
            Enterprise Edition v3.0
          </span>
        </motion.div>
      </div>

      {/* ── Marquee keyframes ── */}
      <style>{`
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rev {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}