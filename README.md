# 📝 Online Exam System

A full-stack web application that allows administrators to create exams and questions, and students to take exams and view their results.

---

## 📌 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Setup Without Docker](#setup-without-docker)
* [Setup With Docker](#setup-with-docker)
* [Setup With Docker Compose](#setup-with-docker-compose)
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)

---

## ✅ Features

* User registration and login (JWT-based)
* Admin panel to create exams and add questions
* Student interface to take exams and view scores
* MongoDB for backend database
* Next.js frontend with protected routes

---

## 🛠 Tech Stack

| Layer    | Tech                         |
| -------- | ---------------------------- |
| Frontend | Next.js, React, Tailwind CSS |
| Backend  | Node.js, Express.js          |
| Database | MongoDB                      |
| Auth     | JWT                          |
| DevOps   | Docker, Docker Compose       |

---

## 📁 Project Structure

```
Online-Exam-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── pages/
│   ├── components/
│   └── next.config.js
├── docker-compose.yml
├── README.md
```

---

## 🔧 Setup Without Docker

### 🔹 Prerequisites

* Node.js & npm
* MongoDB installed & running locally

### 🧩 Step-by-Step

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` and add:

```env
MONGODB_URI=mongodb://localhost:27017/online-exam
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node server.js
```

Server will run on `http://localhost:5000`

---

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 🐳 Setup With Docker (Manually Each Service)

### Prerequisites

* Docker installed

### 1. Build and Run Backend

```bash
cd backend
docker build -t online-exam-backend .
docker run -d -p 5000:5000 --env-file .env online-exam-backend
```

Ensure MongoDB is accessible in your `.env`:

```env
MONGODB_URI=mongodb://<your-host-ip>:27017/online-exam
```

---

### 2. Build and Run Frontend

```bash
cd frontend
docker build -t online-exam-frontend .
docker run -d -p 3000:3000 online-exam-frontend
```

---

## 🐳📦 Setup With Docker Compose

### Prerequisites

* Docker + Docker Compose installed

### 🧩 Step-by-Step

1. Ensure the following files exist:

   * `docker-compose.yml` in root directory
   * `.env` in `backend/` directory

   ```env
   # backend/.env
   MONGODB_URI=mongodb://mongo-db:27017/online-exam
   JWT_SECRET=your_jwt_secret
   ```

2. Start all services:

```bash
docker-compose up --build
```

3. Access the app:

   * Frontend: `http://localhost:3000`
   * Backend: `http://localhost:5000`

To stop:

```bash
docker-compose down
```

---

## 🔐 Environment Variables

Set in `backend/.env`:

| Key          | Description                       |
| ------------ | --------------------------------- |
| MONGODB\_URI | MongoDB connection string         |
| JWT\_SECRET  | Secret key for JWT authentication |

---

## 📬 API Endpoints

### Auth

* `POST /api/auth/register` – Register new user
* `POST /api/auth/login` – Login user and get token

### Exams

* `POST /api/exams` – Create exam (Admin)
* `GET /api/exams` – Get all exams
* `GET /api/exams/:id` – Get exam by ID

### Questions

* `POST /api/exams/:examId/questions` – Add question to an exam
* `PUT /api/questions/:id` – Update a question
* `DELETE /api/questions/:id` – Delete a question

---

## 🧑‍💻 Author

Made by \[Your Name]

---

Let me know if you want this in a downloadable format or hosted as a GitHub `README.md`.

