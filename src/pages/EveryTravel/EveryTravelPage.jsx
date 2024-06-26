import './EveryTravelPage.css'
import TravelCard from '../../components/TravelCard/TravelCard'
import { useEffect, useState } from 'react'
import travelService from '../../services/travel.service'
import { Col, Row, Container } from 'react-bootstrap'

function EveryTravelPage (){
    const [travels, setTravels] = useState([])

    useEffect(() => {
        travelService.getAllTravels()
            .then(response => setTravels(response.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <Container className='every-travel-page'>
            <Row>
                {travels.map(travel => (
                    <Col key={travel._id} sm={12} md={6} lg={4}>
                        <TravelCard
                            title={travel.title}
                            days={travel.days}
                            persons={travel.persons}
                            pictures={travel.pictures}
                            _id={travel._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default EveryTravelPage