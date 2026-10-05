# Qwik vs React

A side-by-side comparison of **Qwik** and **React** built with the exact same three features in two independent projects. Both use the same toolchain (Vite 7 + TypeScript), so the only difference between the apps is the framework.

| | `react-app` | `qwik-app` |
|---|---|---|
| Framework | React 19 | Qwik 1.20 (Qwik City) |
| Bundler | Vite 7 | Vite 7 |
| Language | TypeScript | TypeScript |
| Routing | react-router-dom 7 | Qwik City (file-based) |
| Rendering model | Client-side SPA (hydration) | Server-side first (resumable + SSR) |
| Package manager | pnpm | pnpm |

> **Why client-side React?** The React app is built the way the official Vite React template ships: a client-rendered SPA. That is React's most common, honest baseline. React's equivalent SSR-first story lives in meta-frameworks (Next.js, Remix); Qwik is SSR-first out of the box as a core design decision — that difference *is* the point of this comparison.

---

## Requirements

- Node.js 20.3+ (tested on 24)
- pnpm 9+

pnpm 11 blocks dependency build scripts by default, so each project ships a `pnpm-workspace.yaml` that allows the `esbuild` (and `sharp`) postinstall scripts.

---

## Quick start

```bash
# React app – dev server on http://localhost:5173
cd react-app
pnpm install
pnpm dev

# Qwik app – dev server on http://localhost:5174
cd qwik-app
pnpm install
pnpm dev
```

Both apps have the same three pages, reachable from the nav bar:

- **`/`** – Home with an interactive **counter**
- **`/todos`** – Add / toggle / remove **todos**
- **`/posts`** – Async **data fetching** (a list of posts from `jsonplaceholder.typicode.com`)

### Production builds

```bash
# React: static SPA (single JS bundle)
cd react-app && pnpm build        # → dist/

# Qwik: client chunks + SSR node server (with an SSG prerender step)
cd qwik-app && pnpm build         # → dist/ + server/
cd qwik-app && pnpm serve         # → http://localhost:3004
```

---

## Project structure

```
qwik-vs-react/
├── react-app/                    # Client-side SPA
│   ├── src/
│   │   ├── main.tsx              # ReactDOM root + <BrowserRouter>
│   │   ├── App.tsx               # Route table + shared <nav>
│   │   └── pages/
│   │       ├── Home.tsx          # Counter (useState)
│   │       ├── Todos.tsx         # Todo list (useState)
│   │       └── Posts.tsx         # fetch in useEffect
│   └── vite.config.ts
│
├── qwik-app/                     # SSR + resumable
│   ├── src/
│   │   ├── root.tsx              # <QwikCityProvider> + <RouterOutlet>
│   │   ├── entry.ssr.tsx         # Server render
│   │   ├── entry.node-server.tsx # Production Node.js server
│   │   └── routes/               # file-based routing
│   │       ├── layout.tsx        # Shared shell: nav + <Slot/>
│   │       ├── index.tsx         # Counter (useSignal)
│   │       ├── todos/index.tsx   # Todo list (useSignal)
│   │       └── posts/index.tsx   # routeLoader$ (server-side fetch)
│   └── adapters/node-server/     # Vite adapter for SSR builds
│
└── README.md
```

**Note on routing:** React declares routes in a React component (`<Routes><Route …/></Routes>`). Qwik City derives routes from the filesystem — every directory under `src/routes/` with an `index.tsx` is a page (`src/routes/todos/index.tsx` → `/todos/`).

---

## The three features, side by side

### 1. Counter — what has to happen before a button works

**React** — `src/pages/Home.tsx`

```tsx
const [count, setCount] = useState(0);
...
<button onClick={() => setCount((c) => c + 1)}>+1</button>
<p>{count}</p>
```

**Qwik** — `src/routes/index.tsx`

```tsx
const count = useSignal(0);
...
<button onClick$={() => count.value++}>+1</button>
<p>{count.value}</p>
```

**Why they behave differently:**

- **React hydrates.** The server sends an empty `<div id="root">` and a **263 kB JS bundle**. The browser must download and *execute* the whole bundle to rebuild the component tree and attach the `onClick`. Until then the page is a static shell and nothing is interactive.
- **Qwik is resumable.** The HTML is already complete **and already interactive**. The counter's state and handler were serialized into the HTML during SSR. `onClick$` is a QRL (a reference to a piece of code); the framework downloads the *one, tiny* handler chunk (in this app ~3 kB) lazily, only when you actually click. No reconciliation, no re-run of the whole app — the browser resumes where the server left off.

### 2. Todos — client-side list state

Both keep an array in component state:

```tsx
// React                                  // Qwik
const [todos, setTodos] = useState<Todo[]>([])   const todos = useSignal<Todo[]>([]);
setTodos(prev => [...prev, newTodo])              todos.value = [...todos.value, newTodo]
```

Mechanically similar; the difference is **how the components become alive** (hydration vs. resumption, see feature 1). On the server these components run identically; only the client activation strategy differs.

### 3. Posts — where does the data get fetched?

**React** — the request happens **in the browser, after hydration**:

```tsx
const [posts, setPosts] = useState<Post[]>([]);
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(r => r.json()).then(setPosts);
}, []);
```

The initial HTML contains *no* posts and a loading state. Only after the bundle downloads, executes, mounts the tree *and* the fetch resolves do the posts appear.

**Qwik** — the same request runs **on the server, during SSR**:

```tsx
export const usePosts = routeLoader$(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return (await res.json()) as Post[];
});
// ...
const posts = usePosts();
{posts.value.map(post => <li key={post.id}><h3>{post.title}</h3>...</li>)}
```

`routeLoader$` executes during server render (or prerendering) and the resulting HTML — **post titles included** — is streamed to the client. There is no browser fetch, no loading spinner, and the data is visible before any JavaScript runs. On navigation the same loader runs, but the data is delivered before hydration rather than double-fetched.

---

## Hydration vs Resumability

| | React (hydration) | Qwik (resumability) |
|---|---|---|
| What ships on load | The whole app as one JS bundle | HTML markup + a ~1 kB loader |
| How it becomes interactive | Download → parse → **execute** bundle → rebuild component tree → attach listeners | Nothing to execute; state + handlers are serialized into the HTML and "woken up" on demand |
| Cost paid | Everyone pays for the full bundle, even users who never click | Only the handlers that are actually used are downloaded (`onClick$` = QRL) |
| Core primitive | `useState` + re-render the component on state change | `useSignal` + surgical, fine-grained DOM updates |
| Bundle size (this app, gzip) | **83.8 kB** loaded up front | **~2–4 kB short-term, up to 20 kB on demand** |

Measured output from these two projects:

```
react-app (pnpm build)
  dist/assets/index.js     263.4 kB │ gzip:  83.8 kB   ← loaded before anything is interactive

qwik-app (pnpm build)
  dist/build/q-*            25 separate "slept" chunks   ← downloaded on demand
  largest chunk             50.9 kB │ gzip: 20.6 kB
  a page's own chunk        0.2 – 2.4 kB
```

The initial Qwik page load transfers only markup plus the qwik loader; nothing else is executed unless the user interacts.

---

## Quick factual comparison

| Aspect | React | Qwik |
|---|---|---|
| Rendering | Client-side by default; SSR via Next.js/Remix | SSR + streaming by default; SSG built in |
| Hydration | Required (download + execute bundle) | None needed (resumable) |
| Data fetching | `fetch`/SWR/React Query on the client, or your meta-framework | `routeLoader$` / `routeAction$` on the server |
| State | `useState`, `useReducer`, Context, Redux, Zustand… | `useSignal`, `useStore`, `useContext` |
| Routing | Declarative (`react-router-dom`, TanStack Router) | File-based (Qwik City) |
| Lazy loading | Manual via `React.lazy`/dynamic `import` | Automatic per-component/per-handler QRLs |
| Forms & actions | Framework-agnostic | `routeAction$`, built-in validation/CSRF |
| Ecosystem / community | Huge and mature | Small and growing (QwikCity + integrations via `@qwik.dev/react`) |
| Learning curve | Gentle (hooks model, huge ecosystem of docs) | Steeper (unique `$`/QRL mental model; misleadingly similar JSX) |
| Best for | Anything, but especially where ecosystem/talent matters most | Content & marketing sites, storefronts, low-Core-Web-Vitals sites, server-heavy apps |

---

## When to choose which

**Choose React when:**
- You need the largest ecosystem, mature libraries, and easy hiring.
- You're building an app-centric product (dashboards, admin tools) where first visit performance is less critical than iteration speed.
- Your team already knows React; you can later adopt Next.js/Remix for SSR.

**Choose Qwik when:**
- First-load performance and Core Web Vitals are a hard requirement (landing pages, e-commerce, news media).
- You want server-side data fetching and resumability without a meta-framework.
- You want zero-JS-out-of-the-box for content pages that "just work" before a byte of app JS runs.

**Real talk:** React is the safe default; Qwik is the deliberate optimization — excellent when interactivity is sparse relative to content, and more expensive when the whole page is heavy, client-state-driven and interactive.

---

## Made with

- [create-qwik / Qwik 1.20](https://github.com/QwikDev/qwik) – `@builder.io/qwik` + `@builder.io/qwik-city`
- [Vite](https://vitejs.dev/) 7 + `@vitejs/plugin-react` + `vite-tsconfig-paths`
- [react-router-dom](https://reactrouter.com/) 7
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the demo API