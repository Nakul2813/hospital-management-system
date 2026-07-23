import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, HeartPulse } from "lucide-react";

function useCountUp(target, duration = 1500, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let frame;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}

const stats = [
  { label: "Patients cared for", value: 128000, suffix: "+" },
  { label: "Specialist doctors", value: 340, suffix: "+" },
  { label: "Years of service", value: 27, suffix: "" },
  { label: "Patient satisfaction", value: 98, suffix: "%" },
];

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-clinical-100/70 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-vital-100/70 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge bg-clinical-50 text-clinical-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted by 340+ specialists
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-ink-900 sm:text-5xl lg:text-6xl">
              Care that moves as fast as{" "}
              <span className="bg-gradient-to-r from-clinical-600 to-vital-600 bg-clip-text text-transparent">
                you need it to
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-600">
              Book appointments, consult specialists, and manage your entire care journey — records,
              prescriptions, billing — from one connected platform built for patients and clinicians alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary !px-6 !py-3 !text-base">
                Book an appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#services" className="btn-secondary !px-6 !py-3 !text-base">
                Explore services
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-vital-600" /> 24/7 Emergency Care
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-clinical-600" /> Same-day consultations
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="card !p-8 shadow-glow">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-ink-500">Live vitals monitor</p>
                <span className="flex items-center gap-1.5 text-xs font-medium text-vital-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-vital-500 animate-pulseDot" /> Live
                </span>
              </div>
              <div className="mt-6 h-32 w-full">
                <svg viewBox="0 0 300 100" className="h-full w-full text-clinical-500">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,50 30,50 40,20 50,80 60,50 90,50 100,35 110,65 120,50 150,50 160,15 170,85 180,50 220,50 230,45 240,55 250,50 300,50"
                  />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-ink-50 p-3">
                  <p className="text-xs text-ink-400">Heart rate</p>
                  <p className="font-display text-lg font-bold text-ink-900">72 bpm</p>
                </div>
                <div className="rounded-xl bg-ink-50 p-3">
                  <p className="text-xs text-ink-400">SpO₂</p>
                  <p className="font-display text-lg font-bold text-ink-900">98%</p>
                </div>
                <div className="rounded-xl bg-ink-50 p-3">
                  <p className="text-xs text-ink-400">BP</p>
                  <p className="font-display text-lg font-bold text-ink-900">118/76</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div ref={ref} className="mt-20 grid grid-cols-2 gap-6 border-t border-ink-100 pt-10 sm:grid-cols-4">
          {stats.map((s) => {
            const count = useCountUp(s.value, 1600, inView);
            return (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-bold text-ink-900">
                  {count.toLocaleString()}
                  {s.suffix}
                </p>
                <p className="mt-1 text-sm text-ink-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
