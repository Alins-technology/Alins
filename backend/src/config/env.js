import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Comma-separated list of allowed frontend origins, e.g.
  // "https://www.alins.in,https://alins-sigma.vercel.app"
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CLIENT_URLS: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),

  // SMTP is optional. If not configured, the contact form still works —
  // submissions are logged to the console / saved to disk instead of emailed.
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  MAIL_TO: process.env.MAIL_TO || 'contact@alins.in',

  // Required to access GET /api/contact (list submissions). Leave unset to
  // keep that endpoint disabled.
  ADMIN_KEY: process.env.ADMIN_KEY || '',
}
