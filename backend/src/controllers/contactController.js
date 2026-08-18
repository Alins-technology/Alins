import { saveContact, listContacts } from '../models/contactStore.js'
import { sendContactNotification } from '../utils/sendEmail.js'
import { env } from '../config/env.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function createContact(req, res, next) {
  try {
    const { name, email, phone = '', service = 'Other', message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'name, email and message are required.' })
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
    }

    const record = await saveContact({ name, email, phone, service, message })

    // Email delivery is best-effort — a submission is still saved even if it fails.
    sendContactNotification(record).catch((err) =>
      console.error('[mailer] failed to send notification:', err.message),
    )

    return res.status(201).json({
      ok: true,
      message: "Thanks! Your message has been received — we'll be in touch soon.",
      id: record.id,
    })
  } catch (err) {
    return next(err)
  }
}

// Protected admin endpoint — requires header `x-admin-key: <ADMIN_KEY>`.
// Set ADMIN_KEY in .env before relying on this in anything beyond local dev.
export async function getContacts(req, res, next) {
  try {
    if (!env.ADMIN_KEY || req.headers['x-admin-key'] !== env.ADMIN_KEY) {
      return res.status(401).json({ ok: false, error: 'Unauthorized.' })
    }
    const contacts = await listContacts()
    return res.json({ ok: true, count: contacts.length, contacts })
  } catch (err) {
    return next(err)
  }
}
