import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { staggerContainer, fadeUpChild } from '../../lib/motion'

// Same-origin in production (Vercel rewrites /api/* to the backend service) —
// only needed as an absolute URL for local dev where frontend/backend run on different ports.
const API_URL = import.meta.env.VITE_API_URL || ''
const WHATSAPP_NUMBER = '919354080179'

const serviceOptions = [
  'Web Design',
  'Web Development',
  'App Development',
  'Digital Marketing',
  'Graphic Designing',
  'Other',
]

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: serviceOptions[0],
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Open the tab synchronously on the click so popup blockers (Safari/Firefox)
    // don't treat it as an unsolicited popup once the redirect happens after the await below.
    // NOTE: deliberately no 'noopener' here — that flag makes window.open() return null,
    // which would leave us with no handle to redirect once the fetch resolves. We cut the
    // opener link manually instead, which gives the same tab-nabbing protection.
    const whatsappTab = window.open('', '_blank')
    if (whatsappTab) whatsappTab.opener = null

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')

      const message = [
        `Hi Alins Technologies, I just submitted the contact form.`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone && `Phone: ${form.phone}`,
        `Service: ${form.service}`,
        `Message: ${form.message}`,
      ]
        .filter(Boolean)
        .join('\n')

      setForm(initialState)
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      if (whatsappTab) whatsappTab.location.href = whatsappUrl
      else window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      whatsappTab?.close()
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-bg-border bg-bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-all duration-300 focus:border-primary-500/60 focus:bg-primary-500/[0.04] focus:ring-4 focus:ring-primary-500/10'

  return (
    <motion.form
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="glass-card relative overflow-hidden p-8 sm:p-10 lg:p-11"
    >
      {/* Premium card treatment: a soft corner glow, same recipe as the
          Hero/CTA blobs, purely decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.10) 0%, rgba(59,109,251,0) 70%)' }}
      />

      <motion.div variants={fadeUpChild(14)} className="relative mb-8">
        <span className="eyebrow">Start the Conversation</span>
        <h3 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">Tell us about the project.</h3>
      </motion.div>

      <div className="relative space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <motion.div variants={fadeUpChild(14)}>
          <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink-faint">
            Full Name
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </motion.div>
        <motion.div variants={fadeUpChild(14)}>
          <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink-faint">
            Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputClass}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <motion.div variants={fadeUpChild(14)}>
          <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink-faint">
            Phone Number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </motion.div>
        <motion.div variants={fadeUpChild(14)}>
          <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink-faint">
            Service Needed
          </label>
          <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-bg-surface">
                {opt}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <motion.div variants={fadeUpChild(14)}>
        <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink-faint">
          Project Details
        </label>
        <textarea
          required
          rows={5}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us a bit about your project, goals and timeline..."
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      <motion.div variants={fadeUpChild(14)} className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send size={15} />
            </>
          )}
        </button>
        <span className="text-xs text-ink-faint">We typically reply within 24 hours.</span>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700"
          >
            <CheckCircle2 size={16} /> Got it — we're sending you to WhatsApp so we can keep talking right away.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle size={16} /> That didn't go through. Double-check your connection, or email us directly at contact@alins.in.
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.form>
  )
}
