const express = require('express');
const app = express();

// IMPORTANT for Render deployment
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Request Logger (Professional practice)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

/* ------------------ SAMPLE DATABASE ------------------ */

let students = [
  { id: 1, name: "Aman", class: "10th", city: "Mumbai" },
  { id: 2, name: "Neha", class: "9th", city: "Delhi" }
];

let teachers = [
  { id: 1, name: "Mr Sharma", subject: "Math" },
  { id: 2, name: "Ms Priya", subject: "Science" }
];

let classes = [
  { id: 1, class: "10th", section: "A" },
  { id: 2, class: "9th", section: "B" }
];

/* ------------------ ROUTES ------------------ */

// HOME ROUTE (IMPORTANT)
app.get('/', (req, res) => {
  res.send("🏫 School Management Microservice Running 🚀");
});

// HEALTH CHECK (Industry standard)
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: "UP",
    service: "school-microservice",
    timestamp: new Date()
  });
});

// GET ALL STUDENTS
app.get('/api/v1/students', (req, res) => {
  res.json({
    count: students.length,
    data: students
  });
});

// GET STUDENT BY ID
app.get('/api/v1/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// ADD STUDENT
app.post('/api/v1/students/add', (req, res) => {
  const { name, class: studentClass, city } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    class: studentClass,
    city
  };

  students.push(newStudent);
  res.json({
    message: "Student added successfully",
    student: newStudent
  });
});

// GET TEACHERS
app.get('/api/v1/teachers', (req, res) => {
  res.json({
    count: teachers.length,
    data: teachers
  });
});

// GET CLASSES
app.get('/api/v1/classes', (req, res) => {
  res.json({
    count: classes.length,
    data: classes
  });
});

// SERVER START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});