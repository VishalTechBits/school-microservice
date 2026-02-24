const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Logger middleware
app.use((req,res,next)=>{
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

/* ---------- SAMPLE DATABASE ---------- */

let students = [
  { id:1, name:"Aman", class:"10th", city:"Mumbai"},
  { id:2, name:"Neha", class:"9th", city:"Delhi"}
];

let teachers = [
  { id:1, name:"Mr Sharma", subject:"Math"},
  { id:2, name:"Ms Priya", subject:"Science"}
];

let classes = [
  { id:1, class:"10th", section:"A"},
  { id:2, class:"9th", section:"B"}
];

/* ---------- ROUTES ---------- */

app.get('/',(req,res)=>{
    res.send("🏫 School Microservice Running");
});

app.get('/api/v1/health',(req,res)=>{
    res.json({status:"UP", service:"school-microservice", time:new Date()});
});

// Students
app.get('/api/v1/students',(req,res)=> res.json(students));

app.get('/api/v1/students/:id',(req,res)=>{
    const student = students.find(s=>s.id==req.params.id);
    if(!student) return res.status(404).send("Student not found");
    res.json(student);
});

app.post('/api/v1/students/add',(req,res)=>{
    const newStudent = {
        id:students.length+1,
        name:req.body.name,
        class:req.body.class,
        city:req.body.city
    };
    students.push(newStudent);
    res.json(newStudent);
});

// Teachers
app.get('/api/v1/teachers',(req,res)=> res.json(teachers));

// Classes
app.get('/api/v1/classes',(req,res)=> res.json(classes));

app.listen(PORT,()=> console.log(`Server running on ${PORT}`));