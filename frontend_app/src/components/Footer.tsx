import { component$ } from "@builder.io/qwik";

// PUBLIC_INTERFACE
export default component$(() => {
  /** Footer with subtle background */
  return (
    <footer class="footer">
      <div class="container" style="padding:0;">
        <div class="helper">
          © {new Date().getFullYear()} Ocean Notes. Built with Qwik.
        </div>
      </div>
    </footer>
  );
});
