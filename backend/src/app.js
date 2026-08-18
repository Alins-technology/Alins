import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_URL,
  }),
)
app.use(express.json({ limit: '10kb' }))
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))

// Basic abuse protection for the contact form.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests. Please try again later.' },
})
app.use('/api/contact', contactLimiter)

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Alins Technologies API is running.' })
})

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
