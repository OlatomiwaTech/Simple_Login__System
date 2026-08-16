# Simple Login System

A full-stack authentication system built from scratch to demonstrate secure user registration, login, password hashing, session management, protected routes, and PostgreSQL database integration.

## Project Structure

```text
Login-System/
├── frontend/       # Next.js frontend application
└── backend/        # Node.js + Express API
```

## Architecture

```text
Browser
   ↓
Next.js Frontend
   ↓ HTTP
Express Backend
   ↓
Prisma ORM
   ↓
PostgreSQL
```

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* Zod
* Argon2

### Database

* PostgreSQL
* Prisma ORM

## Planned Features

* [ ] User registration
* [ ] Secure password hashing
* [ ] User login
* [ ] Session management
* [ ] HTTP-only authentication cookies
* [ ] Protected routes
* [ ] Logout
* [ ] Input validation
* [ ] Authentication error handling
* [ ] Production deployment

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL
* Git

### Clone the Repository

```bash
git clone https://github.com/OlatomiwaTech/Simple-Login-System.git
cd Simple-Login-System
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
```

Initialize the database:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

The backend will run on:

```text
http://localhost:5000
```

## Environment Variables

Never commit sensitive environment variables to Git.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/simple_login"
```

Use `.env.example` to document required environment variables without exposing secrets.

## Development Status

🚧 This project is currently under development.

The authentication system is being built incrementally, starting with the database and backend infrastructure before implementing registration and login.

## License

This project is for learning and development purposes.
