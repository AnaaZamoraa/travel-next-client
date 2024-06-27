import './ActivityDetailsPage.css'
import ActivityDetails from '../../components/ActivityDetails/ActivityDetails';
import activityService from '../../services/activity.service';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ActivityDetailsPage() {

    const { id } = useParams()
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        activityService
            .getActivityById(id)
            .then(({data}) => {
                setActivity(data);
            })
            .catch(err => console.log(err))
    }, [id]);

    return (
        <div className='activity-details-page'>
            {activity && (
                    <ActivityDetails 
                        title={activity.title}
                        type={activity.type}
                        pictures={activity.pictures}
                        description={activity.description}
                    />
                )}
        </div>
    );
}

export default ActivityDetailsPage;