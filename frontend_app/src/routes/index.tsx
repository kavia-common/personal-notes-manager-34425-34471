import { component$, useStore, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { useNotesProvider, useNotes } from "~/context/notes";
import EmptyState from "~/components/EmptyState";
import NoteCard from "~/components/NoteCard";
import { searchNotes } from "~/utils/storage";

// PUBLIC_INTERFACE
export default component$(() => {
  // Provide notes context at root index to ensure it's available across pages via layout re-render
  useNotesProvider();
  const { state, actions } = useNotes();
  const view = useStore({ query: "" });

  const handleDelete = $((id: string) => actions.remove(id));

  const filtered = searchNotes(state.notes, view.query);

  return (
    <div style="display:grid; gap:1rem;">
      <div class="surface" style="padding:1rem; display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
        <div style="flex:1 1 320px; min-width:220px;">
          <label for="search" class="helper" style="display:block; margin-bottom:0.25rem;">Search</label>
          <input
            id="search"
            class="input"
            placeholder="Search by title or content"
            value={view.query}
            onInput$={(e) => {
              const val = (e.target as HTMLInputElement).value;
              view.query = val;
            }}
          />
        </div>
        <div style="display:flex; gap:0.5rem;">
          <Link class="btn btn-primary" href="/note/new">
            <span aria-hidden="true">➕</span> New Note
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div style="display:grid; gap:0.75rem;">
          {filtered.map((n) => (
            <NoteCard key={n.id} note={n} onDelete$={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ocean Notes",
  meta: [
    {
      name: "description",
      content: "A personal notes manager built with Qwik.",
    },
  ],
};
