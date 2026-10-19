# React Vite First Practice

<!-- Tech Stack -->
[![React](https://img.shields.io/badge/React-277EA4?logo=react&logoColor=7CD6FD)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5E33A9?logo=vite&logoColor=B990FF)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-365FB2?logo=typescript&logoColor=9ABCFF)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=3AB74F)](https://nodejs.org/)

<!-- Quality Tools -->
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=5BFF77)](https://vitest.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-861492?logo=oxc&logoColor=25FFF9)](https://oxc.rs/docs/guide/usage/linter/quickstart.html#quickstart/)

<!-- Repo -->
[![Repo](https://img.shields.io/badge/GitHub-react--vite--first--practice-2260B0?logo=github)](https://github.com/johnny60904/react-vite-first-practice)
[![License: MIT](https://img.shields.io/badge/License-MIT-65AB1E.svg)](https://opensource.org/license/mit)

<!-- CI -->
[![Deploy](https://github.com/johnny60904/react-vite-first-practice/actions/workflows/deploy.yaml/badge.svg)](https://github.com/johnny60904/react-vite-first-practice/actions/workflows/deploy.yaml)

<!-- Platforms -->
[![GitHubPages](https://img.shields.io/badge/GitHub_Pages-1D9BA9?logo=githubpages&logoColor=FF972F)](https://johnny60904.github.io/react-vite-first-practice/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-1D9BA9?logo=cloudflare&logoColor=FF972F)](https://react-vite-first-practice.privateuser60904.workers.dev)
[![Vercel](https://img.shields.io/badge/Vercel-1D9BA9?logo=vercel&logoColor=FF972F)](https://react-vite-first-practice.vercel.app)

A React + TypeScript Todo application built with Vite to practice modern frontend development, component design, state management, automated testing, and CI/CD deployment.

---

## Live Demo

| Platform           | URL                                                                         |
| ------------------ | --------------------------------------------------------------------------- |
| GitHub Pages       | [Open Demo](https://johnny60904.github.io/react-vite-first-practice/)       |
| Cloudflare Workers | [Open Demo](https://react-vite-first-practice.privateuser60904.workers.dev) |
| Vercel             | [Open Demo](https://react-vite-first-practice.vercel.app)                   |

---

## Features

- Add, complete, and delete todos.

- Filter todos by completion status.

- Mark all todos as completed.

- Persist todo data in `localStorage`.

- Reusable React components and custom hooks.

- Reducer-based state transition logic.

- Automated tests for todo logic, storage, and hooks.

- Automated linting, testing, building, and deployment.

---

## Tech Stack

- **Framework:** React 19

- **Language:** TypeScript

- **Build Tool:** Vite

- **Package Manager:** pnpm

- **Linting:** Oxlint

- **Testing:** Vitest

- **Deployment:** GitHub Pages, Cloudflare Workers, and Vercel

- **CI/CD:** GitHub Actions and platform-integrated build pipelines

---

## Prerequisites

- Node.js 24 or a compatible supported version

- pnpm

- Git

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/johnny60904/react-vite-first-practice.git
cd react-vite-first-practice
pnpm install --frozen-lockfile
```

Start the development server:

```bash
pnpm dev
```

Vite will print the local development URL in the terminal.

---

## Available Scripts

| Command        | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `pnpm dev`     | Start the Vite development server.                                   |
| `pnpm lint`    | Run Oxlint.                                                          |
| `pnpm test`    | Run the Vitest test suite once.                                      |
| `pnpm build`   | Run TypeScript project build checks and create the production build. |
| `pnpm preview` | Preview the production build locally.                                |

To run the checks and build locally before deployment:

```bash
pnpm lint
pnpm test
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

---

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── components/
│   │   ├── counter/
│   │   └── todo/
│   ├── modules/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── test/
│   └── components/
│       └── todo/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

---

## CI/CD and Deployment

The project uses automated quality checks before deployment:

1. Install dependencies from the lockfile.

2. Run linting.

3. Run automated tests.

4. Run TypeScript checks and create the production build.

5. Deploy only after the required checks succeed.

The GitHub Actions workflow deploys the production build to GitHub Pages. Cloudflare Workers Builds and Vercel use their respective Git integration and build settings to build and deploy the application.

Each platform has an independent deployment pipeline. A successful deployment on one platform does not guarantee that deployments on the others have succeeded.

---

## Learning Goals

This project serves as a practical learning environment for:

- React components, props, and hooks

- TypeScript in React applications

- State management with reducers and custom hooks

- Browser storage with `localStorage`

- Unit and hook testing with Vitest

- Static production builds with Vite

- CI/CD workflows and multi-platform deployment

---

## License

See [LICENSE](LICENSE) for license information.
