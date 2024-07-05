import './EveryActivityPage.css'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import { useEffect, useState } from 'react'
import activityService from '../../services/activity.service'
import { Col, Row, Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function EveryActivityPage (){
    const [activities, setActivities] = useState([])
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const searchParams = {
            location: query.get('location') || '',
            type: query.get('type') || ''
        }
    
        activityService
            .getActivities(searchParams)
            .then(response => setActivities(response.data))
            .catch(err => console.error(err))
        }, [location.search])

    return (
        <Container className='every-activity-page'>
            <Row>
                {activities.map(activity => (
                    <Col key={activity._id} sm={12} md={6} lg={4}>
                        <ActivityCard
                            title={activity.title}
                            type={activity.type}
                            pictures={activity.pictures}
                            _id={activity._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default EveryActivityPage