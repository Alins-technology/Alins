import app from './src/app.js'
import { env } from './src/config/env.js'

app.listen(env.PORT, () => {
  console.log(`🚀 Alins Technologies API running on http://localhost:${env.PORT} [${env.NODE_ENV}]`)
})
