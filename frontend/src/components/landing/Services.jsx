import { motion } from "framer-motion";
import { Stethoscope, Ambulance, FlaskConical, Pill, Video, Baby } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Consultation", desc: "Walk-in and scheduled visits with primary care physicians across all specialties." },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 emergency response with a dedicated trauma team and rapid triage." },
  { icon: FlaskConical, title: "Diagnostics & Lab", desc: "Same-day blood work, imaging, and pathology with digital report delivery." },
  { icon: Pill, title: "Pharmacy", desc: "In-house pharmacy with real-time stock and automatic prescription fulfillment." },
  { icon: Video, title: "Video Consultation", desc: "Secure video visits with your care team from wherever you are." },
  { icon: Baby, title: "Maternity & Newborn", desc: "Comprehensive prenatal, delivery, and postnatal care in a dedicated wing." },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinical-600">What we offer</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Every service your care journey needs
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600 transition-colors group-hover:bg-clinical-600 group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
