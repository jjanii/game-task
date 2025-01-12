
# Game Task Project

This project is a web application that displays a list of games and allows users to filter, sort, and interact with the games. It features a React frontend powered by Next.js and React Query for data fetching, as well as a Node.js backend.

## Features
- User login system
- Game list display with filtering and sorting
- Responsive design
- React Query for server communication
- Modular CSS for styling

---

## Prerequisites

Make sure you have the following installed:
- **Node.js**: v16 or later (v22 recommended)
- **npm**: Comes with Node.js
- **Backend Server**: Ensure the backend server is running and accessible.

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/jjanii/game-task.git
cd game-task
```

### Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

## Running the Project

### Start the Backend Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the backend:
   ```bash
   npm start
   ```
   The backend will start on `http://localhost:4000`.

### Start the Frontend
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`.

---

## Project Structure

### Frontend (Next.js)
- **pages/**: Contains the Next.js pages (e.g., `games.tsx` and `index.tsx`).
- **components/**: Reusable UI components (e.g., `GameCard`, `Filters`). The CSS modules are in the same directory as the component using it.

### Backend (Node.js)
- **server.js**: Handles all backend services for this project with hardcoded users.
- **data.js**: The data provided in the task.

---

## Technologies Used
### Frontend
- Next.js
- React Query
- TypeScript
- CSS Modules

### Backend
- Node.js
- Express
- Express session

---

## Troubleshooting

### Common Issues

#### Missing Module Error
If you see an error like `Error: Cannot find module 'express-session'`, ensure all dependencies are installed:
```bash
npm install
```

#### Port Conflicts
If the default ports (`4000` for the backend or `3000` for the frontend) are in use, update the port in the respective configuration.

#### React Query Issues
Ensure the backend server is running and accessible at `http://localhost:4000`.

---
