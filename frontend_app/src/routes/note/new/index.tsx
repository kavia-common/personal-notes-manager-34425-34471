import { component$, $, type QRL } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import NoteEditor from "~/components/NoteEditor";
import { useNotes } from "~/context/notes";
import type { Note } from "~/utils/storage";

// PUBLIC_INTERFACE
export default component$(() => {
  /** Create new note page */
  const { actions } = useNotes();

  return (
    <div style="display:grid; gap:1rem;">
      <h1 style="margin:0;">New Note</h1>
      <NoteEditor initial={null} onSave$={$((n: Note) => actions.addOrUpdate(n))} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "New Note - Ocean Notes",
  meta: [{ name: "description", content: "Create a new note." }],
};
