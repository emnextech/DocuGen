

DocuGen — Professional README
=============================

Overview
--------

DocuGen is a lightweight, component-driven React + TypeScript single-page app for generating and previewing documents from templates. Built with Vite for fast local development and a minimal footprint, the project focuses on a clean separation between pages, UI components, and generation services.

Author
------

By emnex.tech

Key Features
------------

- Template selection and management.
- Dynamic form-driven template population.
- Live preview of generated documents.
- Extensible generator service for format/export options and external integrations.

How it works (high level)
-------------------------

1. The user selects a template in the `TemplateSelector` page.
2. The `FormPage` renders input fields required by the chosen template.
3. Entered form data is passed to `services/documentGenerator.ts`, which merges data into the template.
4. The `PreviewPage` displays the rendered document for final review and export.

Project layout (important files)
-------------------------------

- `index.html` — App entry HTML.
- `index.tsx` — React entry; mounts `App`.
- `App.tsx` — Root application routes and context providers.
- `pages/` — Feature pages: `HomePage.tsx`, `TemplateSelector.tsx`, `FormPage.tsx`, `PreviewPage.tsx`.
- `components/` — Reusable UI primitives: `Navbar.tsx`, `Layout.tsx`, `Input.tsx`, `Button.tsx`.
- `services/` — Business logic: `documentGenerator.ts`, `geminiService.ts`.
- `vite.config.ts`, `tsconfig.json`, `package.json` — Build and toolchain configuration.

Quick start
-----------

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open your browser at the URL shown in the terminal (commonly http://localhost:5173).

Available scripts
-----------------

- `npm run dev` — Start development server (Vite).
- `npm run build` — Produce a production build.
- `npm run preview` — Locally preview the production build.

Usage workflow
--------------

- Select a template in the Template Selector.
- Complete the generated form fields on the Form page.
- Review the output on the Preview page.
- Export or copy the final document using export options or clipboard actions implemented in `PreviewPage`.

Development notes
-----------------

- Add new templates while keeping parsing and content merging inside `services/documentGenerator.ts`.
- Keep form field definitions and validation logic co-located with `FormPage` to make template-specific forms easy to maintain.
- Protect API keys and credentials used by `services/geminiService.ts` via environment variables and do not commit them to source control.

Contributing
------------

If you want to contribute, please:

1. Fork the repository and create a feature branch.
2. Follow the existing component and file structure.
3. Open a pull request describing your changes.

Remarks & Recommendations
------------------------

- Add unit tests for `services/documentGenerator.ts` to validate template merging logic and edge cases.
- Consider adding export targets (PDF, DOCX) via libraries or server-side conversion.
- Add E2E tests for the full flow (select template → fill form → preview → export).

Languages & Tech
-----------------

- **Language:** TypeScript (TSX) for React components.
- **Tooling:** Vite, Node.js, npm.
- **Testing (recommended):** Jest / Testing Library for unit tests; Playwright / Cypress for E2E.

Contact & License
-----------------

By emnex.tech 
