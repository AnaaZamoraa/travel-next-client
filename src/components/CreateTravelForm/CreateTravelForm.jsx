import './CreateTravelForm.css'
import { useState, useContext, useEffect } from 'react'
import travelService from '../../services/travel.service'
import uploadServices from '../../services/upload.service'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { ToastContext } from '../../contexts/toast.context'
import Dropzone from '../Dropzone/Dropzone'
import { FaTrash, FaPlusCircle } from 'react-icons/fa';
import activityService from '../../services/activity.service'

function CreateTravelForm() {
    const { showToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false)
    const [validTypes, setValidTypes] = useState([]);
    const [travel, setTravel] = useState({
        title: '',
        days: '',
        persons: '',
        pictures: [],
        activities: [{
            title: '',
            type: '',
            description: '',
            pictures: [],
            ratings: []
            }],
        tips: '',
        ratings: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTravel({ ...travel, [name]: value });
    };

    const handleActivityInputChange = (e, activityIndex) => {
        const { name, value } = e.target;
        const updatedActivities = [...travel.activities];
        updatedActivities[activityIndex] = {
            ...updatedActivities[activityIndex],
            [name]: value
        };
        setTravel({ ...travel, activities: updatedActivities });
    };

    const handleFilesChange = (newFiles, type, index = null) => {
        if (type === 'travel') {
            setTravel({ ...travel, pictures: newFiles.map(fileWrapper => fileWrapper.file) });
        } else if (type === 'activity' && index !== null) {
            const updatedActivities = [...travel.activities];
            updatedActivities[index].pictures = newFiles.map(fileWrapper => fileWrapper.file);
            setTravel({ ...travel, activities: updatedActivities });
        }
    };

    const addActivity = () => {
        const newActivity = { title: '', type: '', description: '', pictures: [], ratings: [] };
        setTravel({ ...travel, activities: [...travel.activities, newActivity] });
    };

    const deleteActivity = (index) => {
        const updatedActivities = [...travel.activities];
        updatedActivities.splice(index, 1);
        setTravel({ ...travel, activities: updatedActivities });
    };

    useEffect(() => {
        activityService.getValidTypes()
            .then(response => {
                setValidTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching valid types:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const uploadedImages = [];

        for (const imageFile of travel.pictures) {
            try {
                const formData = new FormData();
                formData.append('imageData', imageFile);
                const response = await uploadServices.uploadImage(formData);
                uploadedImages.push(response.data.cloudinary_url);
            } catch (error) {
                console.error('Error uploading file: ', error);
                showToast('Error uploading files');
                setLoading(false);
                return;
            }
        }

        const activitiesWithUploadedImages = [];
            for (const activity of travel.activities) {
                const uploadedActivityImages = [];
                try {
                    for (const imageFile of activity.pictures) {
                        const formData = new FormData();
                        formData.append('imageData', imageFile);
                        const response = await uploadServices.uploadImage(formData);
                        uploadedActivityImages.push(response.data.cloudinary_url);
                    }
                    activitiesWithUploadedImages.push({ ...activity, pictures: uploadedActivityImages });
                } catch (error) {
                    console.error('Error uploading file: ', error);
                    showToast('Error uploading files');
                    setLoading(false);
                    return;
                }
            }

        const newTravel = {
            ...travel,
            pictures: uploadedImages,
            activities: activitiesWithUploadedImages
        };

        travelService.createTravel(newTravel)
            .then(response => {
                showToast('Travel created successfully');
                console.log('Travel created successfully', response.data);
                setLoading(false);
            })
            .catch(error => {
                showToast('Error creating travel');
                console.error('Error creating travel', error);
                setLoading(false);
            });
    }

    return (
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
                            onFilesChange={(files) => handleFilesChange(files, 'travel')}
                        />
                    </Col>
                </Row>
                <Form.Group className="mb-3 input" controlId="activities">
                    <Form.Label>Activities</Form.Label>
                    {travel.activities.map((act, index) => (
                        <div key={index} className="activity-container">
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId={`activity-title-${index}`}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            value={act.title}
                                            onChange={(e) => handleActivityInputChange(e, index)}
                                            name="title"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`activity-type-${index}`}>
                                        <Form.Select
                                            aria-label="activityType"
                                            value={act.type}
                                            onChange={(e) => handleActivityInputChange(e, index)}
                                            name="type"
                                        >
                                            <option>Type of activity</option>
                                            {validTypes.map((type, idx) => (
                                                <option key={idx} value={type}>{type}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId={`activity-description-${index}`}>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="description"
                                            value={act.description}
                                            onChange={(e) => handleActivityInputChange(e, index)}
                                            placeholder="Description"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Dropzone
                                        maxFiles={4}
                                        onFilesChange={(files) => handleFilesChange(files, 'activity', index)}
                                    />
                                </Col>
                            </Row>
                            <Button variant='danger' onClick={() => deleteActivity(index)}><FaTrash /></Button>
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

export default CreateTravelForm;
