import './ActivityDetails.css';
import { Card, Carousel, Row, Col } from 'react-bootstrap';

function ActivityDetails({ title, type, pictures, description }) {
    return (
        <div className='activity-details'>
            <Card className='activity-details-card'>
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
                            <Card.Text><strong>Type:</strong> {type}</Card.Text>
                            <Card.Text><strong>Description:</strong> {description}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ActivityDetails;