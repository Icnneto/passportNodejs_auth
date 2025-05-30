# User Authentication App

## Introduction

This is a study project created to explore and implement a complete user authentication flow using Node.js, Express, Passport.js, and MongoDB on the backend, along with a simple HTML/CSS/JS frontend. 
The main goal is to deepen my understanding of backend concepts like routing, middleware, encryption, and session management while building a functional login system.

Reference: [freeCodeCamp](https://www.youtube.com/watch?v=F-sFp_AvHc8&list=WL&index=38&t=21963s&ab_channel=freeCodeCamp.org)

## Languages and Technologies

- Node.js
- Express.js
- Passport.js
- MongoDB (Mongoose)
- HTML
- CSS (Tailwind)
- JavaScript (Vanilla)

## Backend

The backend is built with Express and separated into logical layers to promote code organization and maintainability.

### API Layer

- **Routes:** All application routes are registered inside the `/routes` folder. These define paths for login, logout, session checking, and protected content.
- **Controllers:** Handle business logic related to user actions such as login, registration, and logout.
- **Middleware:** Middleware functions are used for error handling and access protection (e.g., checking if the user is authenticated).
- **Passport Local Strategy**: Implements the authentication strategy using email and password, verifying credentials against the database.
- **Password Hashing and Salting**: Utilizes Node's `crypto` module to securely hash and salt user passwords before saving them in the database.

### Authentication

Authentication is handled using `passport-local` strategy. Passwords are never stored directly. Instead:

- When a user registers, the password is hashed using `crypto.pbkdf2Sync` with a generated salt.
- On login, the provided password is validated by regenerating the hash and comparing it to the stored hash.

The authentication strategy logic can be found in `/services/passport/` and `/services/lib`.

### Database
- The application uses MongoDB via Mongoose to manage user data.
- Session data is stored using connect-mongo to persist sessions in the database.

### App Setup (app.js)
The Express app is configured with:

- CORS to allow requests from specific frontend URLs.
- express-session for managing session cookies.
- Secure cookie options (HTTPOnly, Secure, SameSite).
- Passport initialized for login session persistence.

## Frontend
The frontend is kept minimal and written in HTML, Tailwind CSS, and vanilla JavaScript. 

It communicates with the backend through fetch API calls.

- Pages are stored in /public/pages.
- JS modules are organized by purpose (/submit, /utils, /errors, etc.).
- Example: The logout button on the protected page is created dynamically and has its event listeners attached post-render.

## How to Use

### Option 1: Try it Online

You can test the authentication system directly by visiting the deployed version:

[**Access the app here**](https://icnneto.github.io/passportNodejs_auth/frontend/public/index.html)

### Option 2: Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Icnneto/passportNodejs_auth.git
   ```

2. **Install backend dependencies**:
   ```bash
   cd ./backend
   npm install
   ```

3. **Create a `.env` file** at the root of the backend directory with the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   SECRET=your-session-secret
   ```

4. **Start the backend server**:
   ```bash
   npm run start
   ```

5. The frontend is located in the `/frontend` folder and can be opened directly in the browser (e.g. `index.html`) or served using a simple static file server.

## API Routes

| Method | Route           | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/loginUser`     | Logs in a user                  |
| POST   | `/registerUser`  | Registers a new user            |
| GET    | `/profile`       | Returns protected content (auth required) |
| GET    | `/logoutUser`    | Logs out the current session    |

Make sure to send requests with credentials if you're testing via tools like Postman or from the frontend (e.g., `{ credentials: 'include' }` in fetch).

## 🧠 Purpose
This project is meant to demonstrate understanding of user authentication systems, RESTful backend design, and basic security practices. It was created for learning purposes and as part of my journey as an aspiring junior software developer.
