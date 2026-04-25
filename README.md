# Todo App Backend

A RESTful API backend for a full-stack Todo application with user authentication.

## Features

- **Todo Management**: Create, read, update, and delete todos
- **User Management**: User registration and profile management
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Firebase Auth Compatible**: COOP/COEP headers for Firebase popup authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Additional**: CORS, Dotenv

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── todos.controller.js
│   │   └── users.controller.js
│   ├── middleware/
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── todo.model.js
│   │   └── user.model.js
│   ├── routers/
│   │   ├── todo.router.js
│   │   └── user.router.js
│   └── utils/
│       └── asyncHandler.js
├── package.json
└── .env                    # Environment variables (create this)
```

## API Endpoints

### Todos API (`/api/todos`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new todo |
| GET | `/` | Get all todos |
| GET | `/:_id` | Get a single todo |
| PUT | `/:_id` | Update a todo |
| DELETE | `/:_id` | Delete a todo |

### Users API (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all users |
| GET | `/:_id` | Get a single user |
| POST | `/` | Create a new user |
| PATCH | `/:_id` | Update a user |

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

## Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 5000 (or the port specified in `.env`).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port number | 5000 |
| MONGO_URI | MongoDB connection string | Required |

## Database Schema

### Todo
- `title` (String, required) - Todo title
- `isCompleted` (Boolean, default: false) - Completion status
- `userUID` (String, required) - Firebase user UID
- `timestamps` - Created and updated timestamps

### User
- `displayName` (String, required) - User's display name
- `email` (String, required) - User's email
- `uid` (String, required) - Firebase user UID
- `photoURL` (String, default: "###") - User's profile photo URL
- `timestamps` - Created and updated timestamps

## License

ISC