export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string; // ISO string
};

const STORAGE_KEY = "ocean-notes-v1";

/**
 * Safely get an item from localStorage.
 */
function safeGetItem(key: string): string | null {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely set an item in localStorage.
 */
function safeSetItem(key: string, value: string): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function loadNotes(): Note[] {
  /** Load all notes from localStorage. Returns an empty array if none are found or on error. */
  const raw = safeGetItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Ensure minimal schema
    return parsed
      .filter((n) => n && typeof n.id === "string")
      .map((n) => ({
        id: String(n.id),
        title: typeof n.title === "string" ? n.title : "",
        content: typeof n.content === "string" ? n.content : "",
        updatedAt: typeof n.updatedAt === "string" ? n.updatedAt : new Date().toISOString(),
      })) as Note[];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes: Note[]): void {
  /** Persist notes array to localStorage; silently no-op on failure. */
  const data = JSON.stringify(notes);
  safeSetItem(STORAGE_KEY, data);
}

// PUBLIC_INTERFACE
export function upsertNote(notes: Note[], note: Note): Note[] {
  /** Insert or update a note by id; returns new array sorted by updatedAt desc. */
  const idx = notes.findIndex((n) => n.id === note.id);
  const next = [...notes];
  if (idx >= 0) {
    next[idx] = note;
  } else {
    next.push(note);
  }
  return sortNotes(next);
}

// PUBLIC_INTERFACE
export function deleteNote(notes: Note[], id: string): Note[] {
  /** Delete a note by id and return new array. */
  return notes.filter((n) => n.id !== id);
}

function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

// PUBLIC_INTERFACE
export function searchNotes(notes: Note[], query: string): Note[] {
  /** Basic search on title and content (case-insensitive). */
  const q = query.trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(
    (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
  );
}
