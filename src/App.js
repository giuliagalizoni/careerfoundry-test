import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import CourseDetails from './components/CourseDetails';

function App() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://private-e05942-courses22.apiary-mock.com/courses'
        );
        setCourses([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  console.log(course);

  return (
    <div className='App'>
      <header>
        <h1>Careerfoundry</h1>
        <h3>Our courses: </h3>
        <div>
          {courses.map((course) => (
            <button key={course.slug} onClick={() => setCourse(course)}>
              {course.title}
            </button>
          ))}
        </div>
      </header>
      <main>
        {Object.keys(course).length ? (
          <CourseDetails {...course} />
        ) : (
          <p>choose a course</p>
        )}
      </main>
    </div>
  );
}

export default App;
