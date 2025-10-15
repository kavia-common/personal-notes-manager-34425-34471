import { component$, $, useStore, useTask$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import NoteEditor from "~/components/NoteEditor";
import { useNotes } from "~/context/notes";

// PUBLIC_INTERFACE
export const onGet: RequestHandler = async () => {
  /** No server-side fetching; data is client-side only for this app. */
};

export default component$(() => {
  /** Edit existing note page */
  const { state, actions } = useNotes();
  const loc = useLocation();
  const id = loc.params["id"];
  const view = useStore({ notFound: false });

  const note = state.notes.find((n) => n.id === id) || null;

  useTask$(() => {
    view.notFound = !note;
  });

  if (view.notFound) {
    return (
      <div class="surface" style="padding:1rem;">
        <h1 style="margin-top:0;">Note not found</h1>
        <p class="helper">The note you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div style="display:grid; gap:1rem;">
      <h1 style="margin:0;">Edit Note</h1>
      <NoteEditor initial={note} onSave$={$((n: any) => actions.addOrUpdate(n))} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Edit Note - Ocean Notes",
  meta: [{ name: "description", content: "Edit your note." }],
};
