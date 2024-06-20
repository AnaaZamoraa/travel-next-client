import './CreateActivityForm.css'
import { useContext, useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import uploadServices from '../../services/upload.service';
import activityService from '../../services/activity.service';
import Dropzone from '../Dropzone/Dropzone';
import { ToastContext } from '../../contexts/toast.context';

function CreateActivityForm({ onSubmit }) {
    const { showToast } = useContext(ToastContext);
    const [validTypes, setValidTypes] = useState([]);
    const [files, setFiles] = useState([]);
    const [activities, setActivities] = useState([
        {
            title: '',
            type: '',
            pictures: [], 
            description: '', 
            ratings: []
        }
    ]);

    useEffect(() => {
        activityService
            .getValidTypes()
            .then(response => {
                setValidTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching valid types:', error);
            });
    }, []);

    const handleInputChange = (idx, e) => {
        const { name, value } = e.target;
        const newActivities = [...activities];
        newActivities[idx] = { ...newActivities[idx], [name]: value };
        setActivities(newActivities);
    };

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    
        const newActivities = activities.map(activity => ({
            ...activity,
            pictures: uploadedImages
        }));
    
        activityService
        .createActivity(newActivities)
        .then(response=>{
            showToast('bien')
            console.log('Activity created successfully', response.data);
        })
        .catch(error => {
            showToast('mal')
            console.error('Error creating activity', error);
        });
    };
    

    return (
        <Form className='create-form' onSubmit={handleSubmit}>
            {activities.map((activity, idx) => (
                <div key={idx} className="activity-container">
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId={`activity-title-${idx}`}>
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={activity.title}
                                    onChange={e => handleInputChange(idx, e)}
                                    name="title"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`activity-type-${idx}`}>
                                <Form.Select
                                    aria-label="activityType"
                                    value={activity.type}
                                    onChange={e => handleInputChange(idx, e)}
                                    name="type"
                                >
                                    <option>Type of activity</option>
                                    {validTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId={`activity-description-${idx}`}>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="description"
                                    value={activity.description}
                                    onChange={e => handleInputChange(idx, e)}
                                    placeholder="Description"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Dropzone 
                                index={idx} 
                                maxFiles={4}
                                onFilesChange={handleFilesChange} />
                        </Col>
                    </Row>
                </div>
            ))}
                <Row className="mt-3">
                    <Col className="d-grid">
                        <Button type="submit" className="submitActivityButton">
                            Create Activity
                        </Button>
                    </Col>
                </Row>
        </Form>
    );
}

export default CreateActivityForm;
