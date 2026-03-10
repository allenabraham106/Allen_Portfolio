# Allen Abraham — Portfolio

Personal portfolio (React + Vite). Deployed on GitHub Pages.

## Deploying to GitHub Pages

1. **Set the base path** (if using a project site):  
   If your site URL is `https://<username>.github.io/<repo-name>/`, open `vite.config.js` and set:
   ```js
   base: '/<repo-name>/',   // e.g. base: '/Personal-Portfolio/'
   ```
   Use `base: './'` if the site is at the root (e.g. user site or custom domain).

2. **Build and deploy**:
   ```bash
   npm run build
   ```
   Push the contents of the `dist` folder to the `gh-pages` branch (or use GitHub Actions).  
   The build copies `index.html` to `404.html` so direct links and refreshes work with client-side routing.

3. In the repo **Settings → Pages**, choose the branch (and folder) that contains the built files.

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
