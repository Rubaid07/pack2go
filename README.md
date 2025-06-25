# 🌍 Pack2Go – Tour Package Booking Platform

**Pack2Go** is a full-stack tour package booking platform built with the MERN stack and Firebase Authentication. Users can explore curated travel packages, view detailed itineraries, and confirm bookings in real-time. Guides (users) can also add, update, or delete their own tour packages. All functionalities are secured and responsive across devices.

---

## 🌐 Live Links

- 🔗 [Live Client](https://pack2go07.web.app)

## 🌐 Server Repo

- 🔗 (https://github.com/Rubaid07/Pack2go-server)
---

## 🧠 Project Overview

- 📦 Users can browse all available packages and see their full details.
- 🔐 Authentication and authorization handled via Firebase & JWT.
- 🧑‍✈️ Guides (logged-in users) can add/manage their own packages.
- 📑 Bookings are stored with status and linked user info.
- 🎯 Focused on recruiter-friendly design and smooth deployment.

---

## 🚀 Main Features

- 🧳 Add, update, and delete personal tour packages (CRUD)
- 📅 Book packages with live booking count update using MongoDB’s `$inc`
- 🔒 Protected routes with JWT for My Bookings, Add Package, Manage Packages, etc.
- 🔍 Server-side search for packages by name or destination
- 🌙 Light/Dark Theme toggle
- 📱 Fully responsive UI (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

### 💻 Frontend
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios

### 🖥️ Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### 🔐 Auth & Storage
- Firebase Authentication
- Firebase Hosting
- MongoDB Atlas

---

## 📦 Dependencies

```bash
# Frontend
"axios"
"firebase"
"react-router-dom"
"react-toastify"
"sweetalert2"
"daisyui"
"react-icons"
"react-slick"
"slick-carousel"
"framer-motion"
"date-fns"
"lottie-react"
"react-countup"
"tailwindcss"

# Backend
"cors"
"dotenv"
"express"
"mongoose"
"jsonwebtoken"
```

---

# How to Run This Project Locally

🔧 Prerequisites:
- Node.js and npm must be installed
- MongoDB Atlas URI or local instance
- Firebase project set up with Email/Password and Google Auth enabled

🖥️ Backend Setup:
1. Clone the server repo:
   git clone https://github.com/Rubaid07/Pack2go-server.git
   cd Pack2go-server
   npm install

2. Create a `.env` file in the root of `server/` and add:
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

3. Run the server:
   npm run dev

💻 Client Setup:
1. Clone the client repo:
   git clone https://github.com/Rubaid07/pack2go.git
   cd Pack2go-client
   npm install

2. Create a `.env` file in the root of `client/` and add:
   VITE_apiKey=http://localhost:5000
   VITE_authDomain=your_project.firebaseapp.com
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_sender_id
   VITE_appId=your_app_id
   VITE_API_URL=http://localhost:3000

3. Run the client:
   npm run dev

🟢 Client will run on: http://localhost:5173
🟢 Server will run on: http://localhost:3000
