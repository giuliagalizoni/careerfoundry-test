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
    <div className='container'>
      <header className='bg'>
        <h1>
          Career<span>foundry</span>
        </h1>
        <div className='buttons-box'>
          <h3>Our courses </h3>
          <ul>
            {courses.map((course) => (
              <li key={course.slug}>
                <button onClick={() => setCourse(course)}>
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        {Object.keys(course).length ? (
          <CourseDetails {...course} />
        ) : (
          <p>
            Choose a course in the menu above to learn more about our programs
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
