import './TravelCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { BsPersonFill, BsCalendar2WeekFill } from 'react-icons/bs'

function TravelCard({ title, days, persons, pictures, _id }) {
    return (
        <div className="TravelCard me-3">
            <Link to={`/travels/${_id}`} className="card-link">
                <Card className="bg-light border-0">
                    <Card.Img src={pictures[0]} alt="Card image" variant="top" />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <div className="card-details">
                            <p><BsPersonFill/>  {persons} persons</p>
                            <p><BsCalendar2WeekFill/>  {days} days</p>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default TravelCard
