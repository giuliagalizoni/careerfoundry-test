import './CourseDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CourseDetails({ slug, title, url, next_start, next_start_formatted }) {
  const [details, setDetails] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://private-e05942-courses22.apiary-mock.com/courses/${slug}`
        );
        setDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [slug]);

  const { description, prices, start_dates } = details;

  return (
    Object.keys(details).length && (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{next_start_formatted}</p>

        {location.is_eu ? (
          <p>{prices[1].amount}€</p>
        ) : (
          <p>${prices[0].amount}</p>
        )}
      </div>
    )
  );
}

export default CourseDetails;
