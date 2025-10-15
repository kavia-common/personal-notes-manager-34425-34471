# Ocean Notes (Qwik)

A personal notes manager built with Qwik and Qwik City. It provides basic CRUD for notes persisted in the browser using localStorage. Styled with the "Ocean Professional" theme.

## Features

- Notes list with title, last updated time, and content preview
- Create, edit, delete notes
- Client-side persistence via localStorage
- Search/filter by title or content
- Responsive layout with header, main content, and footer
- Smooth transitions, subtle shadows, and rounded corners (Ocean Professional)

## Routes

- `/` — Notes list with search
- `/note/new` — Create a new note
- `/note/[id]` — Edit an existing note

## Development

- Start dev server on port 3000:
  - `npm install`
  - `npm start` (or `npm run dev`)

- Build:
  - `npm run build`

- Preview production build:
  - `npm run preview`

## Accessibility

- Proper input labels
- Focus states with visible focus ring
- Keyboard shortcut: Ctrl/Cmd+S in the editor to save

## Theme

- Colors:
  - primary #2563EB
  - secondary/success #F59E0B
  - error #EF4444
  - background #f9fafb
  - surface #ffffff
  - text #111827

These are available as CSS variables in `src/global.css`.
