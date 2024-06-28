import './TravelDetailsPage.css'
import TravelDetails from '../../components/TravelDetails/TravelDetails';
import { useParams } from 'react-router-dom';
import travelService from '../../services/travel.service';
import { useEffect, useState } from 'react';

function TravelDetailsPage() {
  const { id } = useParams()
    const [travel, setTravel] = useState(null);

    useEffect(() => {
        travelService
            .getTravelById(id)
            .then(({data}) => {
              console.log(data)
                setTravel(data);
            })
            .catch(err => console.log(err))
    }, [id]);
    return (
      <div className='travel-details-page'>
        <div className='details'>
          {travel && (
            <TravelDetails
            title={travel.title}
            days={travel.days}
            persons={travel.persons}
            pictures={travel.pictures}
            activities={travel.activities}
            tips={travel.tips}
            />
          )}
        </div>
      </div>
    );
  }
  
  export default TravelDetailsPage;
  