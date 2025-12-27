Contributing to DocuGen
========================

Thank you for your interest in contributing to DocuGen! This document explains the recommended workflow for reporting issues, proposing changes, and submitting code.

Repository
----------

https://github.com/emnextech/DocuGen

How to contribute
-----------------

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/DocuGen.git
   cd DocuGen
   ```

2. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/short-description
   ```

3. Install dependencies and run the app locally:

   ```bash
   npm install
   npm run dev
   ```

4. Make small, focused changes. Keep commits logical and atomic.

5. Run linters and tests (if available) before submitting a PR:

   ```bash
   npm run lint   # if configured
   npm test       # if tests are present
   ```

6. Push your branch and open a pull request against `emnextech:main`.

Pull request checklist
----------------------

- Title describes the change and references the issue (if any).
- Tests added or updated for new functionality where applicable.
- Linting and formatting checks pass.
- No sensitive data or secrets included.
- Brief description of what and why in the PR description.

Reporting issues and feature requests
------------------------------------

- Use the repository Issues tab to report bugs or request features.
- Provide a clear title, steps to reproduce (for bugs), expected vs actual behavior, and any relevant screenshots or logs.

Code style and quality
----------------------

- This project uses TypeScript and React. Follow existing patterns in `src`/`pages`/`components`.
- Keep components small and reusable; prefer composition over duplication.
- Use descriptive variable and function names; avoid one-letter names except for loop indices.
- If ESLint/Prettier are added to the project, run them and follow their suggestions.

Testing
-------

- Add unit tests for core logic (for example, `services/documentGenerator.ts`).
- Recommended test tools: Jest + Testing Library for unit/component tests; Playwright or Cypress for E2E tests.

Security & credentials
----------------------

- Never commit API keys, credentials, or other secrets to the repository.
- Use environment variables and `.env` files that are excluded via `.gitignore`.

License & contribution agreement
--------------------------------

- Contributions are accepted under the project's license. By opening a pull request you agree to license your contribution under the same terms.

Contact
-------

For questions about contributing, open an issue or contact the maintainers via the repo.

Thank you for helping improve DocuGen!
