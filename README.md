# mohnish4code.github.io

Personal portfolio of **Mohnish Kumar Shandilya**, Machine Learning Engineer (Pune, India).
Live at **https://mohnish4code.github.io**.

A single static page: plain HTML, CSS and a little vanilla JavaScript. No framework, no build step.
It is hosted free on GitHub Pages straight from the `main` branch.

## Files

| File | What it holds |
|---|---|
| `index.html` | All content: hero, about, projects, skills, education, contact. Also the SEO and social-sharing tags in `<head>`. |
| `style.css` | All styling. Colours, fonts and spacing are CSS variables at the top (`:root` = dark theme, `[data-theme="light"]` = light theme). |
| `script.js` | Theme toggle (remembered in localStorage), mobile menu, active nav link on scroll, copy-email button. |
| `resume.pdf` | The résumé the **Resume** button opens. It is public, so it has no phone number or home address. |
| `resume-source/resume.html` | Source for `resume.pdf`. Edit this, then regenerate the PDF (see below). |
| `robots.txt`, `sitemap.xml` | Help search engines find and index the site. Update `lastmod` in the sitemap after big changes. |
| `assets/favicon.svg` | Browser-tab icon. |
| `assets/og-image.png` | 1200×630 preview image shown when the link is shared on LinkedIn, WhatsApp and similar apps. |
| `assets/projects/*.webp` | Project screenshots (1200×750 WebP, taken from each project's repo). |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

## How to update the site

1. Edit the files (most changes are text in `index.html`).
2. Preview locally (optional):
   ```bash
   python -m http.server 8000
   ```
   then open http://localhost:8000.
3. Publish:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
4. The live site updates within a minute or two. Hard-refresh (Ctrl+Shift+R) if you still see the old version.

### Updating the résumé

1. Edit `resume-source/resume.html` (keep it to one A4 page).
2. Regenerate the PDF from the repo root in Command Prompt:
   ```
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer --print-to-pdf="%CD%\resume.pdf" "%CD%\resume-source\resume.html"
   ```
3. Open `resume.pdf` to check it, then commit and push as above.

Never put a phone number or home address in the public résumé. Send a fuller version directly to recruiters when they ask.

### Common edits

- **New project:** copy one `<article class="project">` block in `index.html` and change its text,
  chips, metrics and link. Add a 1200×750 screenshot to `assets/projects/` (WebP keeps it small).
- **New skill or certificate:** add a `<li>` in the Skills or Education section.
- **Accent colour:** change `--accent` in `style.css` (once for dark, once for light).
- **Social preview image:** after changing `assets/og-image.png`, LinkedIn caches the old one.
  Refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
