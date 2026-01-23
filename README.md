# Task Manager - MERN Stack Application

[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features secure JWT authentication, password recovery via email, and comprehensive CRUD operations with TypeScript backend implementation.

## Features

### Security & Authentication
- **JWT-based authentication** with bcrypt password hashing
- **Password recovery system** with secure token-based email verification
- **Protected routes** with middleware authorization
- **Token expiration management** (7-day validity)

### Task Management
- **Complete CRUD operations** for task entities
- **Priority levels** (low, medium, high)
- **Task completion tracking**
- **User-scoped data** - users can only access their own tasks

### Technical Implementation
- **TypeScript backend** for type safety and improved developer experience
- **RESTful API design** following industry best practices
- **Responsive UI** optimized for desktop and mobile devices
- **Modern design patterns** including glassmorphism and smooth animations
- **Comprehensive test coverage** with Jest and Supertest
- **CI/CD pipeline** with GitHub Actions
- **Docker containerization** with multi-stage builds and Docker Compose orchestration

## Prerequisites

### Required
- **Node.js** >= 20.x (for Vite compatibility)
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Git** for version control

### Optional (Choose One)
- **Docker Desktop** - Recommended for easy setup and deployment
- **MongoDB Atlas** account (free tier) - If running without Docker
- **Gmail account** with App Password - For email functionality (optional)

> **Note**: Email functionality requires SMTP configuration. For development/testing, you can use services like [Mailtrap](https://mailtrap.io/) or skip email features.

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/carturitos/task-manager-mern.git
cd task-manager-mern
```

### 2. Backend Configuration

```bash
cd backend

# Install dependencies
npm install

# Create environment configuration file
cat > .env << EOF
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key_min_32_characters
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
EOF

# Start development server
npm run dev
```

### 3. Frontend Configuration

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🐳 Docker Setup (Recommended)

### Quick Start with Docker Compose

The easiest way to run the entire application stack:

```bash
# Clone repository
git clone https://github.com/carturitos/task-manager-mern.git
cd task-manager-mern

# Copy environment file
cp .env.docker.example .env

# Edit .env and add your credentials
# JWT_SECRET, SMTP_EMAIL, SMTP_PASSWORD

# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: localhost:27017

### Development Mode with Docker

For development with hot reload:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Rebuild after dependency changes
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Individual Docker Commands

```bash
# Build images
docker-compose build

# Build without cache
docker-compose build --no-cache

# View running containers
docker-compose ps

# Execute commands in containers
docker-compose exec backend npm test
docker-compose exec mongodb mongosh

# View container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Docker Image Sizes

Optimized multi-stage builds:
- **Backend**: ~180MB (Alpine-based)
- **Frontend**: ~25MB (Nginx Alpine)
- **MongoDB**: ~700MB (Official image)

> **💡 Production Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md) for free deployment options using Railway, Render, Fly.io, and more.


## Application URLs

| Service        | URL                          | Description                    |
| -------------- | ---------------------------- | ------------------------------ |
| Frontend       | http://localhost:5173        | React development server       |
| Backend API    | http://localhost:5000/api    | Express REST API               |
| Database       | MongoDB Atlas                | Cloud-hosted database instance |

## Project Structure

```
task-manager-mern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                  # MongoDB connection configuration
│   │   ├── controllers/
│   │   │   ├── userController.ts      # Authentication & password recovery logic
│   │   │   └── taskController.ts      # Task CRUD operations
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts      # JWT validation middleware
│   │   ├── models/
│   │   │   ├── User.ts                # User schema with reset tokens
│   │   │   └── Task.ts                # Task schema
│   │   ├── routes/
│   │   │   ├── userRoutes.ts          # Authentication endpoints
│   │   │   └── taskRoutes.ts          # Task endpoints
│   │   ├── utils/
│   │   │   └── sendEmail.ts           # Email service utility
│   │   ├── tests/                     # Integration tests
│   │   ├── app.ts                     # Express application setup
│   │   └── server.ts                  # Application entry point
│   ├── .env                           # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx     # Route protection HOC
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Authentication state management
│   │   ├── pages/
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Registration page
│   │   │   ├── ForgotPassword.jsx     # Password recovery request
│   │   │   ├── ResetPassword.jsx      # Password reset with token
│   │   │   └── Tasks.jsx              # Task management dashboard
│   │   ├── services/
│   │   │   └── api.js                 # Axios HTTP client configuration
│   │   ├── styles/
│   │   │   ├── Auth.css               # Authentication pages styling
│   │   │   └── Tasks.css              # Dashboard styling
│   │   ├── App.jsx                    # Route configuration
│   │   ├── App.css
│   │   ├── index.css                  # Global styles
│   │   └── main.jsx                   # React entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint                                | Description                              | Auth Required |
| ------ | --------------------------------------- | ---------------------------------------- | ------------- |
| POST   | `/api/users/register`                   | Register new user account                | No            |
| POST   | `/api/users/login`                      | Authenticate user and issue JWT          | No            |
| GET    | `/api/users/profile`                    | Retrieve authenticated user profile      | ✅ JWT        |
| POST   | `/api/users/forgotpassword`             | Request password reset email             | No            |
| PUT    | `/api/users/resetpassword/:resettoken`  | Reset password using valid token         | No            |

### Tasks

| Method | Endpoint         | Description                      | Auth Required |
| ------ | ---------------- | -------------------------------- | ------------- |
| POST   | `/api/tasks`     | Create new task                  | ✅ JWT        |
| GET    | `/api/tasks`     | Retrieve all user tasks          | ✅ JWT        |
| GET    | `/api/tasks/:id` | Retrieve specific task by ID     | ✅ JWT        |
| PUT    | `/api/tasks/:id` | Update existing task             | ✅ JWT        |
| DELETE | `/api/tasks/:id` | Delete task                      | ✅ JWT        |

## Frontend Routes

| Route                            | Component         | Description                              | Protected |
| ------------------------------- | ------------------ | ---------------------------------------- | --------- |
| `/`                             | Navigate           | Redirects to `/tasks`                    | No        |
| `/login`                        | Login              | User authentication page                 | No        |
| `/register`                     | Register           | New user registration                    | No        |
| `/forgotpassword`               | ForgotPassword     | Password recovery request form           | No        |
| `/resetpassword/:resettoken`    | ResetPassword      | Password reset with email token          | No        |
| `/tasks`                        | Tasks              | Task management dashboard                | ✅ JWT    |

## Technology Stack

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Statically typed JavaScript superset
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling (ODM)
- **JWT (jsonwebtoken)** - Stateless authentication tokens
- **bcryptjs** - Password hashing algorithm
- **nodemailer** - Email delivery service integration
- **CORS** - Cross-origin resource sharing middleware
- **Jest** - JavaScript testing framework
- **Supertest** - HTTP assertion library

### Frontend

- **React 18** - Component-based UI library
- **Vite** - Next-generation frontend build tool
- **React Router v6** - Client-side routing
- **Axios** - Promise-based HTTP client
- **Context API** - React state management

## Available Scripts

### Backend

```bash
# Development mode with hot reload (ts-node-dev)
npm run dev

# Compile TypeScript to JavaScript
npm run build

# Production mode (compiled JavaScript)
npm start

# Run test suite
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Frontend

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Authentication Flow

### JWT Authentication Process

1. **User Registration**: Client submits credentials (name, email, password)
2. **Password Hashing**: Server hashes password using bcrypt (10 salt rounds)
3. **JWT Generation**: Upon successful login, server generates JWT with 7-day expiration
4. **Token Storage**: Client stores JWT in localStorage
5. **Request Authorization**: Protected endpoints require `Authorization: Bearer <token>` header
6. **Token Validation**: `authMiddleware` verifies JWT signature and expiration on each request

### Required Headers for Protected Routes

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Password Recovery System

### Recovery Workflow

1. **Recovery Request**: User submits email address via `/forgotpassword` endpoint
2. **Token Generation**: Server generates cryptographically secure token (SHA-256 hash) with 1-hour TTL
3. **Email Delivery**: System sends recovery email containing unique reset link
4. **Token Validation**: User clicks link, accessing `/resetpassword/:resettoken` with token parameter
5. **Password Update**: User submits new password; server validates token and updates credentials
6. **Token Cleanup**: Reset token is removed from database after successful password update

### Email Configuration

Configure the following environment variables for email functionality:

```env
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

> **Note**: For Gmail, generate an App Password from your Google Account settings. Do not use your primary account password.

## API Usage Examples

### 1. User Registration

```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "nombre": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67a123...",
    "nombre": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### 2. Create Task

```http
POST http://localhost:5000/api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "titulo": "Implement authentication",
  "descripcion": "Add JWT-based authentication to API",
  "prioridad": "alta"
}
```

### 3. Retrieve All Tasks

```http
GET http://localhost:5000/api/tasks
Authorization: Bearer <JWT_TOKEN>
```

### 4. Request Password Reset

```http
POST http://localhost:5000/api/users/forgotpassword
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

**Response:**

```json
{
  "message": "Email de recuperación enviado"
}
```

### 5. Reset Password with Token

```http
PUT http://localhost:5000/api/users/resetpassword/abc123def456...
Content-Type: application/json

{
  "password": "NewSecurePass456!"
}
```

**Response:**

```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

## Testing

### Test Suite Overview

- **Framework**: Jest + Supertest + MongoDB Memory Server for integration testing
- **Coverage Reports**: Generate with `npm run test:coverage` (output in `backend/coverage/`)
- **Test Coverage**: 
  - Authentication endpoints (registration, login, profile, JWT protection)
  - Complete task CRUD operations with authorization validation
  - Password recovery workflow
- **CI Integration**: Automated test execution on every push and pull request

### Running Tests Locally

```bash
cd backend
npm install
npm test                # Run test suite
npm run test:watch      # Watch mode for development
npm run test:coverage   # Generate coverage report
```

## Continuous Integration & Deployment

### GitHub Actions Workflow

- **Automated Testing**: `Backend Tests` workflow executes on every `push` and `pull_request` to `main`
- **Coverage Artifacts**: Test coverage reports are uploaded as workflow artifacts
- **Branch Protection**: Recommended to require passing CI checks before merging PRs
- **Quality Gates**: Enforce code quality standards through automated testing

## Troubleshooting

### CORS Errors

**Issue**: Cross-origin request blocked

**Solution**: Ensure frontend (port 5173) and backend (port 5000) are running on different ports. Verify CORS middleware is properly configured in `backend/src/app.ts`.

### MongoDB Connection Failures

**Issue**: Unable to connect to MongoDB Atlas

**Solutions**:

1. Verify `MONGO_URI` in `.env` file
2. Add your IP address to MongoDB Atlas Network Access whitelist
3. Confirm database user credentials are correct
4. Check network connectivity and firewall settings

### JWT Token Expiration

**Issue**: Authentication fails with expired token

**Solution**: JWT tokens expire after 7 days. Re-authenticate to obtain a new token. Consider implementing refresh token mechanism for production environments.

## Resources

- [MongoDB Atlas Documentation](https://www.mongodb.com/cloud/atlas)
- [Express.js Official Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev)
- [JWT Introduction](https://jwt.io/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Nodemailer Documentation](https://nodemailer.com/)

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

### Pull Request Guidelines

> All Pull Requests must be reviewed and approved before merging into `main`. Ensure all tests pass and code coverage meets project standards. Follow the existing code style and include appropriate test coverage for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Samuel Gutiérrez Oliva** - Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Samuel_Gutiérrez-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samuel-guti%C3%A9rrez-oliva-a5866a317/)
[![GitHub](https://img.shields.io/badge/GitHub-carturitos-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/carturitos)
[![Portfolio](https://img.shields.io/badge/Portfolio-Projects-4CAF50?style=for-the-badge&logo=google-chrome&logoColor=white)](https://github.com/carturitos?tab=repositories)

---

**Created**: January 2026  
**Last Updated**: January 2026
