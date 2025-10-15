import { createContextId, useContext, useContextProvider, useStore, $, useTask$ } from "@builder.io/qwik";
import { loadNotes, saveNotes, upsertNote, deleteNote, type Note } from "~/utils/storage";

/** Notes state and actions */
export type NotesState = {
  notes: Note[];
  loaded: boolean;
  dirty: boolean;
  query: string;
};

export type NotesActions = {
  setQuery: (q: string) => void;
  addOrUpdate: (note: Note) => void;
  remove: (id: string) => void;
  replaceAll: (notes: Note[]) => void;
};

export type NotesContext = {
  state: NotesState;
  actions: NotesActions;
};

export const NotesCtx = createContextId<NotesContext>("ocean-notes-ctx");

// PUBLIC_INTERFACE
export const useNotesProvider = () => {
  /** Provide the notes context at layout level. Loads from localStorage on client mount and persists on change. */
  const state = useStore<NotesState>({ notes: [], loaded: false, dirty: false, query: "" });

  // Load from localStorage on client
  useTask$(({ track }) => {
    track(() => state.loaded);
    if (!state.loaded) {
      const loaded = loadNotes();
      state.notes = loaded;
      state.loaded = true;
      state.dirty = false;
    }
  });

  // Persist when notes change
  useTask$(({ track }) => {
    track(() => state.notes);
    if (state.loaded) {
      saveNotes(state.notes);
    }
  });

  const actions: NotesActions = {
    setQuery: $( (q: string) => { state.query = q; } ),
    addOrUpdate: $((note: Note) => {
      state.notes = upsertNote(state.notes, note);
      state.dirty = true;
    }),
    remove: $((id: string) => {
      state.notes = deleteNote(state.notes, id);
      state.dirty = true;
    }),
    replaceAll: $((notes: Note[]) => {
      state.notes = notes;
      state.dirty = true;
    }),
  };

  const ctx: NotesContext = { state, actions };
  useContextProvider(NotesCtx, ctx);
  return ctx;
};

// PUBLIC_INTERFACE
export const useNotes = () => {
  /** Consume the notes context from children components/pages. */
  return useContext(NotesCtx);
};
