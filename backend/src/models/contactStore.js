import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', '..', 'data')
const DATA_FILE = path.join(DATA_DIR, 'contacts.json')

/**
 * Lightweight JSON-file backed store for contact submissions.
 * Swap this out for a real database (MongoDB/Postgres) as the project grows —
 * the rest of the app only depends on the two exported functions below.
 */

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

export async function saveContact(entry) {
  await ensureFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  const list = JSON.parse(raw || '[]')
  const record = { id: Date.now().toString(36), createdAt: new Date().toISOString(), ...entry }
  list.push(record)
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8')
  return record
}

export async function listContacts() {
  await ensureFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw || '[]')
}
