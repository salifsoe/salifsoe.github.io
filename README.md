# Portfolio (auto-generated)

This folder contains a creative GitHub Pages-ready portfolio scaffold generated from your GitHub profile.

How to publish on GitHub Pages

1. Create a new repository named `your-username.github.io` (replace `your-username`).
2. Commit and push the contents of this folder to the repository's `main` branch.
3. GitHub Pages will serve the site at `https://your-username.github.io` shortly after push.

Quick commands:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/salifsoe/salifsoe.github.io.git
git push -u origin main
```

Notes
- The site fetches live data from the GitHub API (profile and repositories).
- Customize `index.html`, `css/style.css`, and `js/main.js` as desired.

Local testing
- Run a lightweight local server (PowerShell):

```powershell
.\serve.ps1
# then open http://localhost:8000
```

GitHub Pages CI (workflow)
- A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
- The workflow publishes the repository root to GitHub Pages on pushes to the `main` branch.

Finalize checklist
- Create a repository named `salifsoe.github.io` (or use any repo and configure Pages). 
- Push this folder to `main`. The workflow will run and Pages will publish.
- If you prefer the classic `gh-pages` branch approach, I can add that instead.
