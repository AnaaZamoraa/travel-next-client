import './CreateForm.css'
import { Form, Button, Col, Row } from 'react-bootstrap'

function CreateForm(){

    const handleSubmit = e => {
        e.preventDefault()
    }
    
    return(
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="title" placeholder="My trip to Asturias" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="days">
                    <Form.Label>How many days?</Form.Label>
                    <Form.Control type='days' placeholder='5 days'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="persons">
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control type='persons' placeholder='4 persons'/>
                </Form.Group>
                
            </Form>
        </div>
    )
}

export default CreateForm