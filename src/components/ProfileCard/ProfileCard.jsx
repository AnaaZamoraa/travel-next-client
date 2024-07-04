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
                        <Card.Body>
                            <Card.Title className="profile-card-title">Welcome to your profile, {username}</Card.Title>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        Your email: {email}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Your age: {age}
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProfileCard;

