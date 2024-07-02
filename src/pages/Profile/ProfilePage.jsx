import './ProfilePage.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

function ProfilePage() {
    const { user } = useContext(AuthContext);

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
        </div>
    );
}

export default ProfilePage;
