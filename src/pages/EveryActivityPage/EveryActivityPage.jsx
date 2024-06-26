import './EveryActivityPage.css'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import { useEffect, useState } from 'react'
import activityService from '../../services/activity.service'
import { Col, Row, Container } from 'react-bootstrap'

function EveryActivityPage (){
    const [activities, setActivity] = useState([])

    useEffect(() => {
        activityService.getAllActivities()
            .then(response => setActivity(response.data))
            .catch(err => console.error(err))
    }, [])

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