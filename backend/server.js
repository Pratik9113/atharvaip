const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming using Python.',
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description: 'Become a full-stack web developer in this comprehensive course.',
  },
  {
    id: 3,
    title: 'Data Science and Machine Learning',
    description: 'Explore data science and machine learning with hands-on projects.',
  },
];

// GET request to retrieve course information
app.get('/courses', (req, res) => {
  res.json(courses);
});

// POST request for inquiries
app.post('/inquiries', (req, res) => {
  const { name, email, message } = req.body;
  // Here, you would typically save the inquiry to a database or send an email
  console.log(`Inquiry received from ${name} (${email}): ${message}`);
  res.status(200).json({ message: 'Inquiry submitted successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
