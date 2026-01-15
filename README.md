# Groundtruth

Community-driven platform for verifying claims through transparent expert consensus and democratic voting.

## Project Structure

This is a pnpm monorepo with the following packages:

```
groundtruth/
├── packages/
│   ├── backend/       # NestJS API server
│   ├── frontend/      # Nuxt 3 web application
│   └── shared/        # Shared types, schemas, and constants
├── _bmad/             # BMAD workflow definitions
└── _bmad-output/      # Generated documentation and artifacts
```

## Technology Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL + TypeORM
- **Cache**: Redis
- **Auth**: JWT (httpOnly cookies)
- **Password Hashing**: Argon2id
- **Validation**: Zod
- **API Docs**: Swagger/OpenAPI

### Frontend
- **Framework**: Nuxt 3 (Vue 3 Composition API)
- **Styling**: Tailwind CSS
- **State**: Pinia
- **Build**: Vite

### Shared
- **Validation**: Zod schemas
- **Types**: TypeScript

## Prerequisites

- **Node.js**: 18+
- **pnpm**: 8+
- **Docker**: For PostgreSQL and Redis

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

```bash
# Backend
cp packages/backend/.env.example packages/backend/.env

# Frontend
cp packages/frontend/.env.example packages/frontend/.env
```

Edit the `.env` files with your configuration.

### 3. Start Docker Services

```bash
pnpm docker:up
```

This starts PostgreSQL and Redis containers.

### 4. Create the Database

Create the `groundtruth` database in PostgreSQL:

```bash
# Using psql with password from .env (default: postgres)
PGPASSWORD=postgres psql -U postgres -h localhost -c "CREATE DATABASE groundtruth;"
```

Or connect to PostgreSQL and create it manually:

```bash
psql -U postgres -h localhost
# Then run: CREATE DATABASE groundtruth;
```

### 5. Run Database Migrations

```bash
pnpm migration:run
```

### 6. Start Development Servers

```bash
# Start all services (backend + frontend)
pnpm dev

# Or start individually:
pnpm dev:backend   # Runs on http://localhost:3001
pnpm dev:frontend  # Runs on http://localhost:3000
```

## Available Scripts

### Root Level
- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm docker:up` - Start Docker services
- `pnpm docker:down` - Stop Docker services

### Backend (`packages/backend`)
- `pnpm --filter backend start:dev` - Start backend in watch mode
- `pnpm --filter backend test` - Run unit tests
- `pnpm --filter backend test:e2e` - Run E2E tests
- `pnpm --filter backend migration:generate` - Generate migration
- `pnpm --filter backend migration:run` - Run migrations

### Frontend (`packages/frontend`)
- `pnpm --filter frontend dev` - Start frontend dev server
- `pnpm --filter frontend build` - Build for production
- `pnpm --filter frontend test` - Run unit tests (Vitest)
- `pnpm --filter frontend test:e2e` - Run E2E tests (Playwright)

### Shared (`packages/shared`)
- `pnpm --filter shared build` - Build shared package
- `pnpm --filter shared test` - Run tests

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs

## Database Migrations

### Create a New Migration

```bash
pnpm migration:generate -- -n MigrationName
```

### Run Migrations

```bash
pnpm migration:run
```

### Revert Last Migration

```bash
pnpm migration:revert
```

## Testing

### Run All Tests

```bash
pnpm test
```

### Run Backend Tests

```bash
pnpm test:backend
```

### Run Frontend Tests

```bash
pnpm test:frontend
```

### Run E2E Tests

```bash
pnpm test:e2e
```

## Project Architecture

See [Architecture Documentation](_bmad-output/planning-artifacts/architecture.md) for detailed architectural decisions.

See [Project Context](_bmad-output/project-context.md) for critical implementation rules and patterns.

## Development Workflow

1. **Create Feature Branch**: `git checkout -b feature/description`
2. **Make Changes**: Implement features following project-context.md rules
3. **Run Tests**: `pnpm test`
4. **Lint & Format**: `pnpm lint && pnpm format`
5. **Commit**: Use conventional commits (e.g., `feat(auth): add email verification`)
6. **Push & PR**: Submit pull request for review

## Naming Conventions

- **Database**: `snake_case` (tables: `users`, columns: `user_id`)
- **API Endpoints**: `kebab-case`, plural (`/api/v1/claims`)
- **TypeScript**: `camelCase` (variables), `PascalCase` (classes, components)
- **JSON API**: `camelCase` (`userId`, `createdAt`)
- **Files**: `kebab-case.ts` for TS, `PascalCase.vue` for Vue

## Security

- Passwords hashed with **Argon2id** (never bcrypt)
- JWTs stored in **httpOnly cookies** (never localStorage)
- All inputs validated with **Zod** on both client and server
- HTTPS/TLS 1.3+ required in production

## License

MIT

## Support

For issues and questions, please refer to:
- [Product Brief](_bmad-output/planning-artifacts/product-brief.md)
- [Epics & Stories](_bmad-output/planning-artifacts/epics-and-stories.md)
- [UX Design](_bmad-output/planning-artifacts/ux-design-specification.md)
