import './CourseDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function CourseDetails({ slug, title, next_start_formatted }) {
  const [details, setDetails] = useState({});
  const [location, setLocation] = useState({
    location: {
      is_eu: true,
    },
  });

  useEffect(() => {
    setDetails({});

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

    async function fetchLocation() {
      try {
        const response = await axios.get(
          `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPSTACK_KEY}&fields=location&output=json`,
          {}
        );
        setLocation(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    fetchLocation();
  }, [slug]);

  const { description, prices, start_dates } = details;

  return (
    Object.keys(details).length > 0 && (
      <div className='details-box'>
        <h2>{title}</h2>
        <p className='description'>{description}</p>
        <div className='highlights'>
          <div>
            <div className='price'>
              <span>Price</span>
              {location.location.is_eu ? (
                <p>{prices[1].amount}€</p>
              ) : (
                <p>${prices[0].amount}</p>
              )}
            </div>
          </div>

          <div className='start-date'>
            <h4>Next start date: </h4>
            <p>{next_start_formatted}</p>
          </div>

          <div className='other-dates'>
            <h5>Other dates</h5>
            {start_dates.map(
              (date, i) =>
                i > 0 && <p key={date}>{format(new Date(date), 'PPPP')}</p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default CourseDetails;
