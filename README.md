# 📝 Online Exam System

A full-stack Online Exam System that allows admins to create exams and add questions, while users can log in, take exams, and view their results.

## 🔧 Tech Stack

- **Frontend**: [Next.js (React)](https://nextjs.org/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: 
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/) *(or any other Node hosting platform)*

---

## 🚀 Features

### Admin
- Login
- Create Exams
- Add Questions to Exams

### User
- Login
- View Available Exams
- Take Exams
- View Results

---

## 📁 Folder Structure

Online-Exam-System/
│
├── backend/ # Express backend with MongoDB
│ ├── controllers/ # Auth, Exam, Question controllers
│ ├── models/ # Mongoose models: User, Exam, Question
│ ├── middleware/ # JWT Auth middleware
│ ├── routes/ (if applicable)
│ ├── .env # Environment variables (MONGO_URI, JWT_SECRET)
│ └── app.js # Entry point
│
├── online-exam-frontend/ # Next.js frontend (Admin/User Dashboards)
│ ├── src/app/ # Pages
│ │ ├── login/ # Login Page
│ │ ├── dashboard/ # Shared Dashboard
│ │ ├── admin-dashboard/ # Admin Exam & Questions
│ │ └── user-dashboard/ # Exam Taking & Results
│ ├── package.json
│ └── ...

yaml
Copy
Edit

---

## 💻 Getting Started Locally

### 🛠️ Backend Setup

```bash
cd backend
npm install

# Create a .env file in /backend with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start
💻 Frontend Setup
bash
Copy
Edit
cd online-exam-frontend
npm install
npm run dev
