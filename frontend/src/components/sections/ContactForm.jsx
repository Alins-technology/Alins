import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
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
    const whatsappTab = window.open('', '_blank', 'noopener,noreferrer')

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
    'w-full rounded-xl border border-bg-border bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder:text-ink-faint outline-none transition-all duration-300 focus:border-primary-500/60 focus:bg-primary-500/[0.04] focus:ring-4 focus:ring-primary-500/10'

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card space-y-5 p-8 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
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
        </div>
        <div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
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
        </div>
        <div>
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
        </div>
      </div>

      <div>
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
      </div>

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

      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle2 size={16} /> Thanks! Your message has been sent — redirecting you to WhatsApp to connect with us instantly.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} /> Something went wrong. Please make sure the server is running, or email us directly.
        </div>
      )}
    </motion.form>
  )
}
