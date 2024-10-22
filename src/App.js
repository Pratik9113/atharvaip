import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:5000/courses');
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  // Handle inquiry submission
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const inquiry = { name, email, message };

    const response = await fetch('http://localhost:5000/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });

    if (response.ok) {
      setInquirySubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <>
    <div>
    <div className="heading">
      <h1>Think Ahead!! Course Catalog</h1>
      </div>
      
     <center> <h2>Available Courses</h2> </center>
      <div className="options">
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
          </div>
          
      <center><h2 className='bd'>Contact Us</h2></center>
      
      <form onSubmit={handleInquirySubmit} className='info'>
        <input className='box1'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          
        />
        <input className='box1'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea className='box2'
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className='btn'>Submit Inquiry</button>
      </form>
      

      {inquirySubmitted && <center><p>Thank you for your inquiry! We will get back to you soon.</p></center>}
    </div>
    </>
  );
};

export default App;
