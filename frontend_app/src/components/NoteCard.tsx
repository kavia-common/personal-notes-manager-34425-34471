import { component$, $, type QRL } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Note } from "~/utils/storage";

type Props = {
  note: Note;
  onDelete$: QRL<(id: string) => void>;
};

// PUBLIC_INTERFACE
export default component$<Props>(({ note, onDelete$ }) => {
  /** Card for a single note in the list */
  const handleDelete = $(() => {
    const ok = confirm(`Delete "${note.title || "Untitled"}"?`);
    if (ok) onDelete$(note.id);
  });

  const updated = new Date(note.updatedAt);
  const preview =
    note.content.length > 140 ? note.content.slice(0, 140) + "…" : note.content;

  return (
    <article class="card" style="padding:1rem;">
      <div style="display:flex; align-items:start; justify-content:space-between; gap:1rem;">
        <div style="min-width:0;">
          <h3 style="margin:0 0 0.25rem 0; font-size:1.1rem; line-height:1.25;">
            <Link href={`/note/${note.id}`} style="text-decoration:none;">
              {note.title || "Untitled"}
            </Link>
          </h3>
          <div class="helper" style="margin-bottom:0.5rem;">
            Last updated {updated.toLocaleString()}
          </div>
          <p style="margin:0; color:var(--muted); white-space:pre-wrap;">
            {preview || <span class="helper">No content</span>}
          </p>
        </div>
        <div style="display:flex; gap:0.5rem; flex-shrink:0;">
          <Link class="btn" href={`/note/${note.id}`} aria-label={`Edit ${note.title || "Untitled"}`}>
            ✏️ Edit
          </Link>
          <button class="btn btn-danger" onClick$={handleDelete} aria-label={`Delete ${note.title || "Untitled"}`}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  );
});
