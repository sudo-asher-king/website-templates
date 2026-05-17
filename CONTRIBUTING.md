# Contributing to website-templates

Thanks for wanting to contribute! This repository collects small website templates and starter kits. To keep submissions consistent and easy to manage, please follow the structure and rules below.

If you are making non-template changes (docs, CI, tooling), the workflow is the same but you can skip the template checklist.

---

## Quick start

1. Fork the repository and create a feature branch from the default branch, e.g. `feat/add-templateN-in-<category>`.
2. Under the `templates/` directory, find the category folder that matches your template (see "Categories" below). If the category folder does not exist, create it.
3. Create a new folder for your template named using the format `template<number>` where `<number>` is the next available integer (see "Naming rules" below). Example: `templates/business/template7/`.
4. Add the required files (index.html, README.md, styles.css, script.js) to the template folder root — do not add nested asset folders.
5. Push your branch and open a pull request describing the template and including the completed checklist.

---

## Categories

All templates are grouped by category. Place your template into an appropriate category folder inside `templates/`. Example category names used in the repo include:

- business
- organisation
- restaurants
- education

If one of these fits your template, add it there. If a suitable category does not exist, create a new category folder under `templates/` using a single-word, lowercase name (kebab-case allowed) and put your `template<number>` folder inside it.

Example structure:

templates/
  business/
    template1/
      index.html
      README.md
      styles.css
      script.js
  restaurants/
    template2/
      index.html
      README.md
      styles.css
      script.js

---

## Naming rules for template folders

- Template folder name MUST be in the format `template<number>` (for example `template1`, `template2`, `template15`).
- Choose the next available number for the category you are adding to. If the highest existing template is `template6`, name yours `template7`.
- Do not include the template name or author in the folder name — keep the numbered format so automated tooling and reviewers can easily process submissions.

---

## Required files (strict)

Each `template<number>` folder MUST contain the following files at the folder root (no subfolders):

- `index.html` — the main entry file. Use only relative links for local assets so users can open the file locally.
- `README.md` — short README describing the template, supported browsers, usage instructions (how to open the demo locally), and any external dependencies.
- `styles.css` — main stylesheet for the template.
- `script.js` — main JavaScript for the template (may be an empty file if no JS is required).

Important: Do not create nested `assets/`, `src/`, or `demo/` folders inside the template folder — keep files flat at the template root. This repo currently relies on the flat layout for automated processing.

Note: `preview.png`, `meta.json`, separate `LICENSE` files, or additional folders are NOT required. If you include extra files, keep them minimal and documented in the README, but reviewers may ask to remove unnecessary files.

---

## File content guidance

- index.html: use semantic HTML, include images with `alt` text, and use relative paths (e.g., `styles.css`, `script.js`).
- README.md: include a short description (one or two lines), dependencies (if any), and instructions to open the template locally: `open templates/<category>/templateN/index.html`.
- styles.css and script.js: keep the files in the template root and minimize external dependencies. If you must reference a CDN (fonts, icons), document it in the README.

---

## Quality checklist (must be completed before opening a PR)

- [ ] Template folder is named `template<number>` and placed inside the correct category folder under `templates/`.
- [ ] `index.html`, `README.md`, `styles.css`, and `script.js` are present in the template folder root.
- [ ] `index.html` opens locally and renders without missing assets (no 404s).
- [ ] Basic accessibility: images have `alt` text, headings are semantic, and interactive elements are keyboard-accessible.
- [ ] Responsive: layout works on small mobile widths and desktop widths.
- [ ] No secrets or tracking code included.
- [ ] README documents any external resources and how to open the template locally.

Include this checklist in your PR description (copy-paste and tick items).

---

## Pull request guidelines

- PR title format: `Add template: templates/<category>/template<number>` or `Fix template: templates/<category>/template<number>`.
- In the PR description include:
  - A short summary of the template and its intended use case.
  - The checklist above, completed.
  - Any notes about external dependencies.
- If you created or updated a category listing file (if present), update it in the same PR.

Maintainers will review changes; please respond to feedback and push follow-up commits to the same PR.

---

## Licensing

Contributions should be compatible with the repository license. You do not need to include a `LICENSE` file inside your template folder. If your template must be distributed under a different license, note that in the template's README and discuss it in the PR.

---

## Security

Do not include passwords, API keys, or other secrets. If you discover a security issue, open a private issue or contact a maintainer — do NOT open a public PR with sensitive information.

---

## Reporting issues and discussion

Open an issue for bugs or feature requests and include a minimal reproduction when possible. For discussion about new template ideas, open an issue first to avoid duplication.

---

If you want, I can also:
- Add a small GitHub Actions workflow that validates each `templates/*/template*/` folder contains the required files, or
- Shorten this guide to a minimal checklist version.

Thanks for contributing — we look forward to your templates!
