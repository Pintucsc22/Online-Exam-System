const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Exam + Questions routes (📌 add this)
const examRoutes = require("./routes/exams");
app.use("/api/exams", examRoutes);  // <-- This line connects /api/exams/...

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
