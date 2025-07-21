# BuildMas – Full Stack Developer Technical Test

A full stack web application to manage construction estimates and clients, built using **Node.js**, **PostgreSQL**, **React**, and **TypeScript**.

This project was completed as part of the BuildMas developer assessment and showcases a clean, modular architecture with full CRUD functionality, status-driven business rules, and form state handling on both frontend and backend.

---

## Project Structure

```bash
bm-full-stack-test/
├── backend/   
└── frontend/ 
```

---

## Features

### Clients
- Create, update, delete clients
- Linked to a mocked user
- Simple validation and error handling

### Estimates
- Add dynamic materials (frontend-only)
- Auto-calculate:
  - `materialsTotal`
  - `totalCost = laborCost + materialsTotal`
- Auto-update estimate status based on business rules:
  - `initiated`: default
  - `in progress`: if client + labor + materials
  - `completed`: manually set if `in_progress`

---

## Technologies Used

### Backend
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/) (input validation)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Docker](https://www.docker.com/) (for local PostgreSQL)

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Axios](https://axios-http.com/)

---

## Setup Instructions

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose
- Yarn or NPM

---

### 1. Clone the repo
```bash
git clone https://github.com/yieniggu/BM-FULL-STACK-TEST.git
cd BM-FULL-STACK-TEST
```

---

### 2. Run the stack with Docker

```bash
docker-compose up --build
```

- Backend will be available at `http://localhost:4000`
- Frontend will be available at `http://localhost:3000`
- PostgreSQL runs inside Docker and is auto-provisioned

---

### 3. Test API (Optional)

Use Postman or curl:

```bash
curl http://localhost:4000/api/clients
```

---

### 4. Manual Backend Setup (if not using Docker)

```bash
cd backend
npm install
cp .env.example .env
npx prisma db push
npx prisma generate
npx prisma migrate dev --name init
npx tsx src/prisma/seed.ts
npm run dev
```

### 5. Manual Frontend Setup (if not using Docker)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Implementation Notes

- Material data is **frontend-only**, not persisted in the DB as per the task specs.
- `status` is auto-calculated inside the backend `EstimateService` based on client/labor/materials presence.
- `totalCost` and `materialsTotal` are also calculated in the backend before saving the estimate.
- The frontend handles all material logic inline and tracks state reactively.

---

## Business Logic Recap

| Status       | Condition                                                                              | Color   |
|--------------|----------------------------------------------------------------------------------------|---------|
| `initiated`  | Default when created or missing key fields                                             | Yellow  |
| `in_progress`| If estimate has a client, laborCost > 0, and at least one material with quantity > 0   | Orange  |
| `completed`  | Manually set by user, but only allowed from `in_progress`                              | Green   |

---


## Folder-by-Folder Breakdown

### `/backend`
- `src/index.ts`: Main server entry
- `routes/`: Express routers (`clients`, `estimates`)
- `controllers/`: Request handlers
- `services/`: Business logic
- `prisma/`: Schema & DB client
- `.env`: Env vars for port and DB connection

### `/frontend`
- `pages/`: Main app views
- `components/`: Shared UI elements
- `hooks/`: React Query hooks for API calls
- `forms/`: Estimate & Client forms
- `types/`: TS interfaces for core entities

---

## .env Example (`backend/.env.example`)

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/buildmas
```
