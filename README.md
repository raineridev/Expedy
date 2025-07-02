# Expedy 🚀

A modern Express.js REST API built with TypeScript, featuring user management, store operations, and order processing capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Contributing](#contributing)

## ✨ Features

- **User Management**: Complete user authentication and profile management
- **Store Operations**: Create and manage stores with full CRUD operations
- **Order Processing**: Handle order creation, updates, and tracking
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens
- **MongoDB Integration**: Robust database operations with Mongoose
- **TypeScript**: Full type safety throughout the application
- **Validation**: Request validation using Zod schemas
- **RESTful API**: Well-structured REST endpoints

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Development**: Nodemon for hot reloading

## 📁 Project Structure

```
src/
├── app.ts                 # Express application setup
├── server.ts              # Server entry point
├── db.ts                  # Database connection
├── controllers/           # Request handlers
│   ├── authController.ts
│   ├── orderController.ts
│   ├── storeController.ts
│   ├── userController.ts
│   └── validate/          # Validation schemas
├── entities/              # Database models
│   ├── order.ts
│   ├── store.ts
│   └── user.ts
├── middlewares/           # Custom middleware
│   └── auth.ts
├── repositories/          # Data access layer
│   ├── orderRepository.ts
│   ├── storeRepository.ts
│   └── userRepository.ts
├── routes/                # API routes
│   ├── auth.ts
│   ├── order.ts
│   ├── router.ts
│   ├── store.ts
│   └── users.ts
├── services/              # Business logic
│   ├── authService.ts
│   ├── orderService.ts
│   ├── storeService.ts
│   └── userService.ts
└── types/                 # TypeScript type definitions
    ├── authType.ts
    ├── orderSearchType.ts
    ├── orderType.ts
    ├── storeType.ts
    └── userType.ts
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raineridev/ProjectExpedy.git
   cd ProjectExpedy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/expedy

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
```

## 🎯 Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh JWT token

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Stores
- `GET /stores` - Get all stores
- `GET /stores/:id` - Get store by ID
- `POST /stores` - Create new store
- `PUT /stores/:id` - Update store
- `DELETE /stores/:id` - Delete store

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## 🗄 Database Models

### User
- `id`: Unique identifier
- `name`: User's full name
- `email`: User's email address
- `password`: Hashed password
- `role`: User role (admin, user, etc.)
- `createdAt`: Registration timestamp
- `updatedAt`: Last update timestamp

### Store
- `id`: Unique identifier
- `name`: Store name
- `description`: Store description
- `owner`: Reference to User
- `address`: Store address
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Order
- `id`: Unique identifier
- `user`: Reference to User
- `store`: Reference to Store
- `items`: Array of order items
- `status`: Order status
- `total`: Total amount
- `createdAt`: Order timestamp
- `updatedAt`: Last update timestamp

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Protected routes require a valid JWT token. Obtain a token by registering or logging in through the authentication endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 👨‍💻 Author

**Raineri** - [GitHub](https://github.com/raineridev)

---

⭐ If you find this project helpful, please give it a star!