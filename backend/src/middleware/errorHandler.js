export function notFound(req, res, next) {
  res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.originalUrl}` })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('[error]', err)
  const status = err.status || 500
  res.status(status).json({
    ok: false,
    error: status === 500 ? 'Internal server error.' : err.message,
  })
}
