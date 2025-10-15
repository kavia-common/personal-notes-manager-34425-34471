import { component$, useStore, $, useTask$, type QRL } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { Note } from "~/utils/storage";

type Props = {
  initial?: Note | null;
  onSave$: QRL<(note: Note) => void>;
};

// PUBLIC_INTERFACE
export default component$<Props>(({ initial = null, onSave$ }) => {
  /** Editor for creating and editing notes (title + content) */
  const nav = useNavigate();

  const state = useStore({
    id: initial ? initial.id : "",
    title: initial ? initial.title : "",
    content: initial ? initial.content : "",
    updatedAt: initial ? initial.updatedAt : "",
    touched: false,
  });

  useTask$(() => {
    // sync when initial changes
    state.id = initial?.id ?? "";
    state.title = initial?.title ?? "";
    state.content = initial?.content ?? "";
    state.updatedAt = initial?.updatedAt ?? "";
  });

  const genId$ = $(() => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`));

  const doSave = $(async () => {
    const now = new Date().toISOString();
    const id = state.id || (await genId$());
    const note: Note = {
      id,
      title: state.title.trim(),
      content: state.content,
      updatedAt: now,
    };
    await onSave$(note);
    nav(`/note/${id}`);
  });

  const saveAndBack = $(async () => {
    const now = new Date().toISOString();
    const id = state.id || (await genId$());
    const note: Note = {
      id,
      title: state.title.trim(),
      content: state.content,
      updatedAt: now,
    };
    await onSave$(note);
    nav(`/`);
  });

  return (
    <form
      class="surface"
      style="padding:1rem; display:grid; gap:0.75rem;"
      preventdefault:submit
      onSubmit$={doSave}
    >
      <div>
        <label for="title" class="helper" style="display:block; margin-bottom:0.25rem;">
          Title
        </label>
        <input
          id="title"
          name="title"
          class="input"
          placeholder="Enter a descriptive title"
          value={state.title}
          onInput$={(e) => (state.title = (e.target as HTMLInputElement).value)}
        />
      </div>

      <div>
        <label for="content" class="helper" style="display:block; margin-bottom:0.25rem;">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          class="textarea"
          placeholder="Write your note..."
          rows={14}
          value={state.content}
          onInput$={(e) => (state.content = (e.target as HTMLTextAreaElement).value)}
        />
      </div>

      <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
        <button type="button" class="btn" onClick$={$(() => nav("/"))}>
          ← Back
        </button>
        <button type="button" class="btn" onClick$={saveAndBack}>
          💾 Save & Close
        </button>
        <button type="submit" class="btn btn-primary">
          ✅ Save
        </button>
      </div>

      <p class="helper" style="margin-top:0.25rem;">
        Tip: Use <kbd>Ctrl</kbd> + <kbd>S</kbd> (or <kbd>⌘</kbd> + <kbd>S</kbd>) to save.
      </p>

      <script dangerouslySetInnerHTML={`
        // Enable Ctrl/Cmd+S to save
        (function(){
          const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
              e.preventDefault();
              const form = document.currentScript?.closest('form');
              form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          };
          window.addEventListener('keydown', handler);
          document.currentScript?.addEventListener('remove', () => {
            window.removeEventListener('keydown', handler);
          });
        })();
      `} />
    </form>
  );
});
