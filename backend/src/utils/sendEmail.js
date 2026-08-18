import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let transporter = null

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null
  if (transporter) return transporter

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: Number(env.SMTP_PORT) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  })
  return transporter
}

/**
 * Sends a notification email for a new contact form submission.
 * Falls back to a console log if SMTP credentials are not configured,
 * so the API keeps working out of the box in local development.
 */
export async function sendContactNotification(entry) {
  const t = getTransporter()

  if (!t) {
    console.log('[mailer] SMTP not configured — skipping email send. Submission:', entry)
    return { delivered: false, reason: 'smtp-not-configured' }
  }

  await t.sendMail({
    from: `"Alins Website" <${env.SMTP_USER}>`,
    to: env.MAIL_TO,
    replyTo: entry.email,
    subject: `New enquiry from ${entry.name} — ${entry.service}`,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Phone: ${entry.phone || '—'}`,
      `Service: ${entry.service}`,
      '',
      'Message:',
      entry.message,
    ].join('\n'),
  })

  return { delivered: true }
}
