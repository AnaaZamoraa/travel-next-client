import './TravelDetails.css';
import { Card, Carousel, Row, Col } from 'react-bootstrap';
import ActivityDetails from '../ActivityDetails/ActivityDetails';

function TravelDetails({ title, days, persons, pictures, activities, tips}) {
    return (
        <div className='travel-details'>
            <Card className='travel-details-card'>
                <h1 className='title'>{title}</h1>
                <Row>
                    <Col md={7}>
                        {pictures && pictures.length > 0 && (
                            <Carousel className='carousel' controls={pictures.length > 1 ? true : false}>
                                {pictures.map((picture, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={picture}
                                            alt={`Slide ${index}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </Col>
                    <Col md={5}>
                        <Card.Body className='card-body'>
                            <Card.Text><strong>Number of persons:</strong> {persons} persons</Card.Text>
                            <Card.Text><strong>How many days:</strong> {days} days</Card.Text>
                            <Card.Text><strong>Tips:</strong> {tips}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
                <div className='activities-list'>
                <h2>Activities</h2>
                {activities && activities.map((activity) => (
                    <ActivityDetails
                        key={activity._id}
                        title={activity.title}
                        type={activity.type}
                        pictures={activity.pictures}
                        description={activity.description}
                    />
                ))}
            </div>
            </Card>
        </div>
    );
}

export default TravelDetails;