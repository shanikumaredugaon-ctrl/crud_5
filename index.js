

const express = require('express');
const app = express();

app.use(express.json());

let subjects = [
  { id: 1, name: "Math" },
  { id: 2, name: "English" }
];

app.post('/subjects', (req, res) => {
  const { name } = req.body;

  const newSubject = {
    id: subjects.length + 1,
    name
  };

  subjects.push(newSubject);

  res.status(201).json({
    message: "Subject created",
    data: newSubject
  });
});


app.get('/subjects', (req, res) => {
  res.json(subjects);
});

app.get('/subjects/:id', (req, res) => {
  const subject = subjects.find(s => s.id == req.params.id);

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  res.json(subject);
});

app.put('/subjects/:id', (req, res) => {
  const subject = subjects.find(s => s.id == req.params.id);

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  subject.name = req.body.name;

  res.json({
    message: "Subject updated",
    data: subject
  });
});


app.delete('/subjects/:id', (req, res) => {
  subjects = subjects.filter(s => s.id != req.params.id);

  res.json({ message: "Subject deleted" });
});


app.listen(3000, () => {
  console.log("Subject API running....");
});
