# 📝 Online Exam System

A **full-stack web application** for creating, managing, and taking online examinations. This system is designed for educational institutions to digitize their examination process securely and efficiently.

## 🚀 Features

- User authentication (JWT-based)
- Role-based access (Admin, Student)
- Admin:
  - Create and manage exams
  - Add and manage questions
  - View student results
- Student:
  - Take assigned exams
  - View results after completion
- Automatic result evaluation
- Containerized using Docker for easy deployment
- Scalable and secure architecture

## 🛠️ Technologies Used

- **Frontend:** React.js, Axios, Bootstrap/Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Containerization:** Docker, Docker Compose
- **CI/CD (optional):** Jenkins



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

## 📂 Project Structure

```
/online-exam-system
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── ...
├── frontend/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/App.js
│   └── ...
├── docker-compose.yml
└── README.md
```
## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/online-exam-system.git
cd online-exam-system
```

### 2️⃣ Run without Docker

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

### 3️⃣ Run with Docker Compose
```bash
docker-compose up --build
```

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` → Register a user
- `POST /api/auth/login` → Login and get JWT token

### Admin
- `POST /api/exams` → Create exam
- `POST /api/exams/:id/questions` → Add question to exam
- `GET /api/results/:examId` → View results

### Student
- `GET /api/exams` → List available exams
- `POST /api/exams/:id/submit` → Submit exam

## ✅ Testing

- Backend: Postman / Curl API tests
- Frontend: Manual testing through browser
- Unit tests: (if implemented)

## 📌 Future Enhancements

- Timer for exams
- Support for multimedia questions
- Export results as PDF/Excel
- Real-time exam monitoring
