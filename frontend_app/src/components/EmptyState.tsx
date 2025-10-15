import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  /** Empty state with CTA to create the first note */
  return (
    <div class="surface" style="padding:2rem; text-align:center;">
      <div style="font-size:2.25rem; line-height:1; margin-bottom:0.5rem;">📝</div>
      <h2 style="margin:0 0 0.5rem 0;">No notes yet</h2>
      <p class="helper" style="margin:0 0 1rem 0;">Create your first note to get started.</p>
      <Link href="/note/new" class="btn btn-primary"><span aria-hidden="true">➕</span> New Note</Link>
    </div>
  );
});
