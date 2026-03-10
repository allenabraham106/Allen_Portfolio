# Allen Abraham — Portfolio

Personal portfolio (React + Vite). Deployed on GitHub Pages.

## Deploying to GitHub Pages

**Option A — GitHub Actions (recommended)**  
1. Push this repo (including the `.github/workflows/deploy.yml` file) to your `Allen_Portfolio` repo.  
2. In the repo go to **Settings → Pages**.  
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.  
4. Push to the `main` branch; the workflow will build and deploy. Your site will be at `https://allenabraham106.github.io/Allen_Portfolio/`.  
5. The app uses **HashRouter**, so URLs are `...#/` (home) and `...#/blog` (blog). No need to rename any files.

**Option B — Deploy from a branch**  
1. Run `npm run build`.  
2. Copy the **contents** of the `dist` folder (all files and the `assets` and `images` folders), **not** the `dist` folder itself.  
3. Push those contents to the root of the `gh-pages` branch (or the branch you use for Pages).  
4. In **Settings → Pages**, set **Source** to that branch and folder **/ (root)**.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

