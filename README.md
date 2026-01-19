# ClassPals

A student-run platform where students can search for university courses, join course hubs, and create/view posts (questions) for courses.

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + TypeScript + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: Firebase Authentication
- **File Storage**: Firebase Storage 
- **Hosting**: Firebase Hosting (frontend), Heroku (backend)

## Project Structure

```
ClassPals/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/              # Page components (Login, CourseSearch, CourseHub)
│   │   ├── contexts/           # React contexts (AuthContext)
│   │   ├── services/           # API service layer
│   │   ├── config/             # Configuration (Firebase)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                     # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── routes/             # API routes (auth, courses, posts)
│   │   ├── models/             # Mongoose models (User, Course, Post)
│   │   ├── middleware/         # Express middleware (auth)
│   │   ├── config/             # Configuration (Firebase Admin)
│   │   └── index.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── package.json                 # Root workspace config
└── README.md
```

**Note**: This is a project structure setup. All implementation files contain placeholder comments indicating what needs to be implemented.

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Set up environment variables:

   - Frontend: Create `frontend/.env` with Firebase config
   - Backend: Create `backend/.env` with MongoDB URI and Firebase admin config

3. Run development servers:

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

## Environment Variables

### Frontend (.env)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/classpals
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```
