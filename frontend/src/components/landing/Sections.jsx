import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Phone, ChevronDown, HeartPulse, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const departments = [
  { name: "Cardiology", count: "18 specialists" },
  { name: "Neurology", count: "12 specialists" },
  { name: "Orthopedics", count: "15 specialists" },
  { name: "Pediatrics", count: "20 specialists" },
  { name: "Oncology", count: "10 specialists" },
  { name: "Dermatology", count: "9 specialists" },
  { name: "Radiology", count: "11 specialists" },
  { name: "Psychiatry", count: "8 specialists" },
];

export function Departments() {
  return (
    <section id="departments" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinical-600">Departments</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Specialized care, organized clearly</h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {departments.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-2xl border border-ink-100 p-5 text-center transition-colors hover:border-clinical-200 hover:bg-clinical-50/50"
            >
              <p className="font-display font-semibold text-ink-900">{d.name}</p>
              <p className="mt-1 text-xs text-ink-400">{d.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const doctors = [
  { name: "Dr. Anita Sharma", role: "Cardiology", rating: 4.8, exp: "12 yrs exp" },
  { name: "Dr. Vikram Rao", role: "Neurology", rating: 4.9, exp: "16 yrs exp" },
  { name: "Dr. Meera Iyer", role: "Pediatrics", rating: 4.7, exp: "9 yrs exp" },
  { name: "Dr. Arjun Kapoor", role: "Orthopedics", rating: 4.8, exp: "14 yrs exp" },
];

export function Doctors() {
  return (
    <section id="doctors" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinical-600">Our specialists</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Meet the team behind your care</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-clinical-500 to-vital-500 font-display text-lg font-bold text-white">
                {doc.name.split(" ").map((n) => n[0]).slice(-2).join("")}
              </div>
              <p className="mt-4 font-display font-semibold text-ink-900">{doc.name}</p>
              <p className="text-sm text-clinical-600">{doc.role}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-ink-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {doc.rating} · {doc.exp}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Priya M.", text: "The appointment booking took two minutes and my reports were ready online before I got home.", role: "Patient, Cardiology" },
  { name: "Suresh K.", text: "Reception staff were efficient and the digital prescription meant no lost paperwork.", role: "Patient, Orthopedics" },
  { name: "Fatima A.", text: "Video consultation quality was excellent — felt like an in-person visit.", role: "Patient, Pediatrics" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinical-600">Patient stories</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">What our patients say</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">"{t.text}"</p>
              <p className="mt-4 font-display text-sm font-semibold text-ink-900">{t.name}</p>
              <p className="text-xs text-ink-400">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmergencyBanner() {
  return (
    <div className="bg-alert-600">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center text-sm font-medium text-white sm:px-6 lg:px-8">
        <Phone className="h-4 w-4" />
        Medical emergency? Call our 24/7 hotline: <a href="tel:+911234567890" className="font-bold underline">+91 123 456 7890</a>
      </div>
    </div>
  );
}

const faqs = [
  { q: "How do I book an appointment?", a: "Create a free patient account, choose a department and doctor, and pick an available slot — all in the Patient Portal." },
  { q: "Can I access my lab reports online?", a: "Yes. All lab reports and diagnostic imaging are uploaded to your Medical Records tab as soon as they're ready." },
  { q: "Do you accept insurance?", a: "We partner with all major insurance providers. Add your policy details in your profile for automatic claim processing." },
  { q: "Is video consultation available for all departments?", a: "Most departments offer video consultations except those requiring in-person diagnostics, like radiology or surgery follow-ups." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-clinical-600">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Common questions</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-ink-900">{f.q}</span>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 text-ink-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-4">
                  <p className="text-sm leading-relaxed text-ink-500">{f.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinical-700 to-vital-700 px-8 py-16 text-center sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Your care team is ready when you are
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-clinical-50">
            Create your account in under a minute and book your first appointment today.
          </p>
          <Link to="/register" className="relative mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-clinical-700 shadow-soft hover:bg-clinical-50">
            Get started free
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-ink-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-clinical-600 text-white">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold text-ink-900">Smart Hospital</span>
            </div>
            <p className="mt-4 text-sm text-ink-500">Connected, modern healthcare — for patients and clinicians alike.</p>
            <div className="mt-4 flex gap-3 text-ink-400">
              <Facebook className="h-4 w-4 hover:text-clinical-600" />
              <Twitter className="h-4 w-4 hover:text-clinical-600" />
              <Instagram className="h-4 w-4 hover:text-clinical-600" />
              <Linkedin className="h-4 w-4 hover:text-clinical-600" />
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-500">
              <li>About us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Resources</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-500">
              <li>Insurance partners</li>
              <li>Patient rights</li>
              <li>Privacy policy</li>
              <li>Terms of service</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-500">
              <li>123 Wellness Ave, Delhi</li>
              <li>contact@smarthospital.com</li>
              <li>+91 123 456 7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-ink-100 pt-6 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} Smart Hospital Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
