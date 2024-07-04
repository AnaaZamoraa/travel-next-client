import './ProfilePage.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import TravelCard from '../../components/TravelCard/TravelCard';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import travelService from '../../services/travel.service';
import activityService from '../../services/activity.service';

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [userActivities, setUserActivities] = useState([]);
    const [userTravels, setUserTravels] = useState([]);

    useEffect(() => {
        if (user) {
            activityService
                .getActivitiesByUser()
                .then(({ data }) => {
                    console.log("Activities data:", data);
                    setUserActivities(data);
                })
                .catch(err => console.error(err));
    
            travelService
                .getTravelsByUser()
                .then(({ data }) => {
                    console.log("Travels data:", data);
                    setUserTravels(data);
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className='profile-page'>
            <div className='user-details'>
                <ProfileCard
                    username={user.username}
                    email={user.email}
                    avatar={user.avatar}
                    age={user.age}
                />
            </div>
            <div className='section'>
                <h4>Your travels</h4>
                <div className="cards-grid">
                    {userTravels.map(travel => (
                        <TravelCard key={travel._id} {...travel} />
                    ))}
                </div>
            </div>
            <div className='section'>
                <h4>Your activities</h4>
                <div className="cards-grid">
                    {userActivities.map(activity => (
                        <ActivityCard key={activity._id} {...activity} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
