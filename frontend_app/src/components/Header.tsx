import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  /** Header with brand and primary actions */
  return (
    <header class="header">
      <div class="header-inner">
        <div class="brand">
          <span class="brand-badge" aria-hidden="true">N</span>
          <span class="brand-title">Ocean Notes</span>
        </div>
        <nav class="header-actions" aria-label="Primary">
          <Link class="btn" href="/"><span aria-hidden="true">🏠</span> Home</Link>
          <Link class="btn btn-primary" href="/note/new"><span aria-hidden="true">➕</span> New Note</Link>
        </nav>
      </div>
    </header>
  );
});
