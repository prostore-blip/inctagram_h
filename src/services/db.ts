import Dexie, { type EntityTable } from 'dexie'

interface DraftCreatePost {
  description: string
  id: number
  photo: File[]
}

const db = new Dexie('DraftCreatePost') as {
  draftPost: EntityTable<DraftCreatePost, 'id'>
} & Dexie

db.version(1).stores({
  draftPost: 'id, photo, description',
})

export type { DraftCreatePost }
export { db }
