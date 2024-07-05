import './Homepage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useState } from 'react';
import travelService from '../../services/travel.service';
import activityService from '../../services/activity.service';

function HomePage() {
  const [travels, setTravels] = useState([]);
  const [activities, setActivities] = useState([]);

  const handleTravelSearch = (query) => {
    travelService
      .getTravels(query)
      .then(response => setTravels(response.data))
      .catch(error => console.error('Error fetching travels:', error));
  };

  const handleActivitySearch = (query) => {
    activityService
      .getActivities(query)
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error));
  };

  return (
    <div className='HomePage'>
      <img src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1716392690/travel-next/kzkfkhxcl4lhkkelwmte.png' alt='HomePage background' className='background'/>
      <div className='search-container'>
        <SearchBar onTravelSearch={handleTravelSearch} onActivitySearch={handleActivitySearch}/>
      </div>
    </div>
  );
}

export default HomePage;
