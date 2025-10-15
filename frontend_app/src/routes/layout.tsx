import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// PUBLIC_INTERFACE
export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <header class="header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-badge" aria-hidden="true">N</span>
            <span class="brand-title">Ocean Notes</span>
          </div>
          <nav class="header-actions" aria-label="Primary">
            <Link class="btn" href="/">
              <span aria-hidden="true">🏠</span> Home
            </Link>
            <Link class="btn btn-primary" href="/note/new">
              <span aria-hidden="true">➕</span> New Note
            </Link>
          </nav>
        </div>
      </header>
      <main class="main container">
        <Slot />
      </main>
      <footer class="footer">
        <div class="container" style="padding:0;">
          <div class="helper">
            © {new Date().getFullYear()} Ocean Notes. Built with Qwik. Tip: Press <kbd>/</kbd> to focus search.
          </div>
        </div>
      </footer>
    </>
  );
});
