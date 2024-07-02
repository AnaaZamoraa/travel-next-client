import './ProfileCard.css';
import { Card, Row, Col } from 'react-bootstrap';

function ProfileCard({ username, email, avatar, age }) {
    return (
        <div className="profile-card-container">
            <Card className="profile-card" style={{ width: '40rem' }}>
                <Row>
                    <Col>
                        <Card.Img src={avatar} style={{ width: '10rem', margin: 'auto' }} />
                    </Col>
                    <Col>
                        <Card.Title className="profile-card-title">Welcome to your profile, {username}</Card.Title>
                        <Card.Text className="profile-card-text">
                            <Row>
                                Your email: {email}
                            </Row>
                            <Row>
                                Your age: {age}
                            </Row>
                        </Card.Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProfileCard;

