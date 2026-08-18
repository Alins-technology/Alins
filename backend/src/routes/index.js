import { Router } from 'express'
import contactRoutes from './contactRoutes.js'
import { services } from '../data/services.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ ok: true, name: 'Alins Technologies API', status: 'running' })
})

router.get('/services', (req, res) => {
  res.json({ ok: true, services })
})

router.use('/contact', contactRoutes)

export default router
