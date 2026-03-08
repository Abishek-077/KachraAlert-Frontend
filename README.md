# KachraAlert Web ♻️🚨

### Live Demo : https://kachra-alert-web-swms.vercel.app/
---

## ✨ Highlights

- Role-aware experience for **Resident** and **Admin / Driver** accounts
- Public marketing pages (`/`, `/about`) and complete auth flow (`/login`, `/register`, reset/forgot password)
- Dashboard modules for:
  - Collection schedule
  - Alerts center (with optional real-time socket updates)
  - Reports/issues management
  - Payments
  - Messages
  - User profile and settings
- Admin user management screens (list, create, edit, detail)
- Dark mode support and polished Tailwind-based UI
- Typed API layer with token refresh and standardized error handling


---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS, Lucide icons
- **State & Forms:** React Context, React Hook Form, Zod
- **Charts:** Recharts
- **Realtime:** socket.io-client (optional via env flag)

---

## 📁 Project Structure

```text
KachraAlert-Frontend/
├── README.md
└── front-end/
    ├── app/
    │   ├── (public)/          # Landing + informational pages
    │   ├── (auth)/            # Login/register/forgot/reset flows
    │   ├── (dashboard)/       # Authenticated app + admin sections
    │   └── lib/               # Client auth/API/alerts/language contexts
    ├── lib/                   # Shared domain types + demo data
    ├── package.json
    └── tailwind.config.ts
```

---

## 🚀 Getting Started

### 1) Prerequisites

- Node.js **18.18+** (Node 20 LTS recommended)
- npm (comes with Node)

### 2) Install dependencies

```bash
cd front-end
npm install
```

### 3) Configure environment variables

Create `front-end/.env.local`:

```env
# Backend API base URL (no trailing slash preferred)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Enable websocket-based alerts (optional)
NEXT_PUBLIC_ENABLE_SOCKET=false
```

### Environment reference

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:5000` | Base URL for backend REST APIs. |
| `NEXT_PUBLIC_ENABLE_SOCKET` | No | `false` | Enables websocket-based alert updates when backend supports sockets. |

### 4) Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## 📜 Available Scripts

Run these inside `front-end/`:

- `npm run dev` – start local dev server on port 3000
- `npm run build` – create production build
- `npm run start` – serve production build on port 3000
- `npm run lint` – run Next.js/ESLint checks
- `npm run lint:fix` – auto-fix lint issues when possible
- `npm run typecheck` – run TypeScript type checking without emitting output

---

## 🔌 Backend Contract Notes

The frontend expects a backend that exposes endpoints under `/api/v1/*`, including:

- Auth: login, register, refresh, logout
- Alerts: list + mark read
- Reports, schedule, payments, messages, and admin user management endpoints

Authentication is handled using:

- Bearer access token for API calls
- Cookie-based persistence for remember-me sessions
- Automatic token refresh handling on `401` responses

---

## 👥 Role Model

Supported account types:

- `resident`
- `admin_driver`
- `admin`

UI role resolution maps `admin_driver` and `admin` into admin-capable dashboard navigation.

---

## 🎨 UI/UX Notes

- Responsive layout with persistent, collapsible sidebar in dashboard
- Theme support (light/dark)
- Designed for clean readability and quick action in operational workflows

---

## 🛠️ Troubleshooting

- **Blank/failed API calls:** verify `NEXT_PUBLIC_API_URL` and backend CORS settings.
- **Socket alerts not arriving:** ensure `NEXT_PUBLIC_ENABLE_SOCKET=true` and backend socket namespace/config is active.
- **Auth appears to reset:** check cookies in browser and confirm `/api/v1/auth/refresh` behavior.

---

### Recommended pre-PR checks

```bash
npm run typecheck
npm run lint
npm run build
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run lint/build locally
4. Open a PR with clear scope and screenshots for UI changes

---

## 📄 License

Add your preferred license information here (MIT, Apache-2.0, etc.).
