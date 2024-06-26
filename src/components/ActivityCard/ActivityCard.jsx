import './ActivityCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function ActivityCard({ title, type, pictures, _id }) {
    return (
        <div className="ActivityCard me-3">
            <Link to={`/activities/${_id}`} className="card-link">
                <Card className="bg-light border-0">
                    <Card.Img src={pictures[0]} alt="Card image" variant="top" />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <div className="card-details">
                            <p>{type}</p>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default ActivityCard
