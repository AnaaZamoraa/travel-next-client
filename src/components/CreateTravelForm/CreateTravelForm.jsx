import './CreateTravelForm.css'
import { useState, useContext } from 'react'
import CreateActivityForm from '../CreateActivityForm/CreateActivityForm'
import travelService from '../../services/travel.service'
import uploadServices from '../../services/upload.service'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { ToastContext } from '../../contexts/toast.context'
import Dropzone from '../Dropzone/Dropzone'
import { FaTrash, FaPlusCircle } from 'react-icons/fa';


function CreateTravelForm() {
    const { showToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([]);
    const [travel, setTravel] = useState({
        title: '',
        days: '',
        persons: '',
        pictures: [],
        activities: [{ title: '', type: '', pictures: [], description: '', ratings: [] }],
        tips: '',
        ratings: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTravel({ ...travel, [name]: value });
    };

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const addActivity = () => {
        const newActivity = { title: '', type: '', pictures: [], description: '', ratings: [] };
        setTravel({ ...travel, activities: [...travel.activities, newActivity] });
    };

    const deleteActivity = (index) => {
        const updatedActivities = [...travel.activities];
        updatedActivities.splice(index, 1);
        setTravel({ ...travel, activities: updatedActivities });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const uploadedImages = [];
    
        for (const fileWrapper of files) {
            try {
                const formData = new FormData();
                formData.append('imageData', fileWrapper.file);
                const response = await uploadServices.uploadImage(formData);
                uploadedImages.push(response.data.cloudinary_url);
            } catch (error) {
                console.error('Error uploading file: ', error);
                showToast('Error uploading files');
                return;
            }
        }
    
        const newTravel = {
            ...travel,
            pictures: uploadedImages
        };
    
        travelService
        .createTravel(newTravel)
        .then(response => {
            showToast('Travel created successfully');
            console.log('Travel created successfully', response.data);
            setLoading(false)
        })
        .catch(error => {
            showToast('Error creating travel');
            console.error('Error creating travel', error);
        });
    }

    return(
        <div>
            <Form onSubmit={handleSubmit} className='create-travel'>
                <h5>Create a new travel</h5>
                <Form.Group className="mb-3 input" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="My trip to Asturias" value={travel.title} onChange={handleInputChange} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 input" controlId="days">
                            <Form.Label>How many days?</Form.Label>
                            <Form.Control type="number" name="days" placeholder="5 days" value={travel.days} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 input" controlId="persons">
                            <Form.Label>How many people?</Form.Label>
                            <Form.Control type="number" name="persons" placeholder="4 persons" value={travel.persons} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Dropzone 
                            maxFiles={6}
                            onFilesChange={handleFilesChange} />
                    </Col>
                </Row>
                <Form.Group className="mb-3 input" controlId="activities">
                    <Form.Label>Activities</Form.Label>
                    {travel.activities.map((activity, index) => (
                        <div key={index}>
                            <CreateActivityForm activity={travel.activity} showSubmitButton={false}/>
                            <Button variant="danger" onClick={() => deleteActivity(index)}><FaTrash /></Button>
                        </div>
                    ))}
                    <Button variant="primary" onClick={addActivity}><FaPlusCircle /></Button>
                </Form.Group>
                <Form.Group className="mb-3 input" controlId="tips">
                    <Form.Label>Tips</Form.Label>
                    <Form.Control as="textarea" rows={2} name="tips" value={travel.tips} onChange={handleInputChange} />
                </Form.Group>
                <Button type="submit" variant='primary' disabled={loading}>
                    {loading ? 'Saving images, creating travel...' : 'Create travel'}
                </Button>
            </Form>
        </div>
    )
}

export default CreateTravelForm