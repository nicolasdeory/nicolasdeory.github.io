This is a [Next.js 16](https://nextjs.org) app bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Package manager: [pnpm](https://pnpm.io).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Edit `src/app/page.tsx` — the page hot-reloads.

## Build

```bash
pnpm build
pnpm start
```

## Deploy on Vercel (project name `nicolasdeory-new`)

This repo also contains other folders (e.g. the legacy site). On Vercel, point the project at this app:

1. [Import the repository](https://vercel.com/new) and choose **Next.js** (auto-detected).
2. Set **Root Directory** to `nicolasdeory-new`.
3. Name the Vercel project **`nicolasdeory-new`** (or rename it under Project → Settings → General).

Vercel will detect `pnpm` via `packageManager` in `package.json` and use the lockfile. No extra config is required for a standard Next.js deploy.

**CLI (optional):** from this folder, `pnpm dlx vercel link` and select or create project `nicolasdeory-new`, then `pnpm dlx vercel --prod`.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Deploying Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
