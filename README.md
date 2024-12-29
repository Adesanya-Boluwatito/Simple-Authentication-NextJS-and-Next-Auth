# NextAuth Authentication System

A full-featured authentication system built using **Next.js** and **NextAuth.js**. This project includes email/password authentication as well as OAuth login via Google and Facebook. It is designed to provide secure session management, user sign-up/sign-in, and error handling.

## Features

- **Email/Password Authentication**: Users can sign up and log in using their email and password.
- **OAuth Authentication**: Users can log in via Google and Facebook.
- **Session Management**: Secure handling of user sessions with cookies and JWT tokens.
- **Protected Routes**: Routes and APIs that require authentication can be protected using middleware.
- **Error Handling**: Informative error pages and messages for common issues (e.g., invalid credentials, missing input).
- **Prisma ORM**: Database interactions are managed using Prisma for easy integration with various databases.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **NextAuth.js**: A library for handling authentication in Next.js apps.
- **Prisma**: A database toolkit that provides type-safe database access for Node.js and TypeScript.
- **TypeScript**: A superset of JavaScript that adds static types, ensuring better code quality and developer experience.
- **Vercel**: Deployment platform used for hosting the application.

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Prisma CLI** (for managing database schema)
- A **Google** and/or **Facebook Developer account** to set up OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/your-username/next-auth.git
cd next-auth
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

Or if you're using Yarn:

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following environment variables:

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

- **NEXTAUTH_SECRET**: A random secret used to sign JWT tokens.
- **NEXTAUTH_URL**: The base URL of your application (e.g., `http://localhost:3000` during development).
- **DATABASE_URL**: The URL to your database, usually in the format `postgresql://user:password@localhost:5432/database`.
- **GOOGLE_CLIENT_ID**, **GOOGLE_CLIENT_SECRET**: Your credentials from Google Developer Console for OAuth login.
- **FACEBOOK_APP_ID**, **FACEBOOK_APP_SECRET**: Your credentials from Facebook Developer Console for OAuth login.

### 4. Set up Prisma

After setting up the environment variables, run the following command to generate the Prisma client and apply any migrations:

```bash
npx prisma migrate dev
```

This will set up the necessary database tables for user management.

### 5. Run the app locally

To run the application locally, use the following command:

```bash
npm run dev
```

Your app should now be running at `http://localhost:3000`.

### 6. Navigate to the app

Visit the following routes in your browser to test the functionality:

- `/auth/signin` - Sign in page.
- `/auth/signup` - Sign up page.
- `/api/auth/signin` - API route for signing in (POST).
- `/api/auth/signup` - API route for signing up (POST).
- `/api/auth/signout` - API route for signing out (GET).

## Authentication Flow

The app uses NextAuth.js to manage user authentication. Here's how the flow works:

### Sign Up

- Users can sign up with their email and password.
- The credentials are validated and stored in the database using Prisma ORM.
- Upon successful registration, the user is logged in automatically.

### Sign In

- Users can log in using their email and password or via OAuth with Google and Facebook.
- The app verifies credentials using NextAuth.js, and if valid, the user is redirected to the homepage.
- A session cookie is generated and saved in the browser, ensuring the user stays logged in.

### Sign Out

- Users can log out by hitting the `/api/auth/signout` route. This will clear their session cookie and redirect them to the sign-in page.

### Protected Routes

Routes that require authentication can be protected using middleware. For example, if a user tries to access a protected page while not logged in, they will be redirected to the sign-in page.

## API Routes

### POST `/api/auth/signin`

- **Method**: POST  
- **Description**: Handles user sign-in with email/password or OAuth providers.  
- **Request Body**: `{ email: string, password: string }` for email/password, or OAuth provider information.  
- **Success**: Returns a session cookie if authentication is successful.  
- **Error**: Returns an error message if authentication fails.

### POST `/api/auth/signup`

- **Method**: POST  
- **Description**: Registers a new user with email/password.  
- **Request Body**: `{ email: string, password: string }`  
- **Success**: Creates a new user and returns a session cookie.  
- **Error**: Returns an error if the email is already in use or if required fields are missing.

## Error Handling

The app uses centralized error handling to ensure users receive descriptive error messages when authentication fails.

- **Invalid Credentials**: If a user provides incorrect email/password, they will see an error message.
- **OAuth Errors**: If OAuth login fails (e.g., due to invalid credentials), the app will show an appropriate error.
- **Missing Input**: If required fields (email or password) are missing during registration or login, the user is prompted to complete the form.

## License

This project is licensed under the MIT License - see the `LICENSE` file for more details.
```
