import './CreateActivityForm.css';
import { useContext, useState, useEffect } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import uploadServices from '../../services/upload.service';
import activityService from '../../services/activity.service';
import Dropzone from '../Dropzone/Dropzone';
import { ToastContext } from '../../contexts/toast.context';

function CreateActivityForm({ showSubmitButton = true}) {
    const { showToast } = useContext(ToastContext);
    const [validTypes, setValidTypes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([]);
    const [activity, setActivity] = useState({
        title: '',
        type: '',
        pictures: [], 
        description: '', 
        ratings: []
    });

    
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
        
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setActivity({ ...activity, [name]: value });
    };

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    
        const newActivity = {
            ...activity,
            pictures: uploadedImages
        };
    
        activityService
        .createActivity(newActivity)
        .then(response => {
            showToast('Activity created successfully');
            console.log('Activity created successfully', response.data);
            setLoading(false)
        })
        .catch(error => {
            showToast('Error creating activity');
            console.error('Error creating activity', error);
        });
    };

    return (
    <div className='create-activity'>
        <Form className='create-form' onSubmit={handleSubmit}>
            <div className="activity-container">
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="activity-title">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={activity.title}
                                onChange={handleInputChange}
                                name="title"
                                />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="activity-type">
                            <Form.Select
                                aria-label="activityType"
                                value={activity.type}
                                onChange={handleInputChange}
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
                        <Form.Group controlId="activity-description">
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={activity.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Dropzone 
                            maxFiles={4}
                            onFilesChange={handleFilesChange} />
                    </Col>
                </Row>
            </div>
            {showSubmitButton && (
                    <Row className="mt-3">
                        <Col className="d-grid">
                            <Button type="submit" variant='primary' disabled={loading}>
                                {loading ? 'Saving images, creating activity...' : 'Create activity'}
                            </Button>
                        </Col>
                    </Row>
                )}
        </Form>
    </div>
    );
}

export default CreateActivityForm;
