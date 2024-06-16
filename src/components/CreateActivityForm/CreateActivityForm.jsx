import './CreateActivityForm.css';
import { Col, Row, Form, Image, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import uploadServices from '../../services/upload.service';
import activityService from '../../services/activity.service';
import { ToastContext } from '../../contexts/toast.context';
import ToastMessage from '../ToastMessage/ToastMessage';
import Loader from '../Loader/Loader';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';

function CreateActivityForm({ travelData, setTravelData }) {
    const { showToast } = useContext(ToastContext);
    const [activityFormData, setActivityFormData] = useState({
        title: '',
        type: '',
        pictures: [],
        description: '',
        ratings: [],
    });

    const [validTypes, setValidTypes] = useState([]);

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

    const [loadingImage, setLoadingImage] = useState(false);

    const handleFileUpload = e => {
        if (activityFormData.pictures.length >= 4) {
            showToast('You can only upload up to 4 images');
            return;
        }
        setLoadingImage(true);

        const formData = new FormData();
        formData.append('imageData', e.target.files[0]);

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setActivityFormData(prevState => ({
                    ...prevState,
                    pictures: [...prevState.pictures, res.data.cloudinary_url]
                }));
                setLoadingImage(false);
            })
            .catch(err => {
                console.log(err);
                setLoadingImage(false);
            });
    };

    const handleInputChange = (idx, e) => {
        const { value, name } = e.target;
        const updatedActivities = [...travelData.activities];
        updatedActivities[idx] = { ...updatedActivities[idx], [name]: value };
        setTravelData({ ...travelData, activities: updatedActivities });
    };

    const addNewActivity = () => {
        setTravelData({
            ...travelData,
            activities: [...travelData.activities, { title: '', type: '', pictures: [], description: '', ratings: [] }]
        });
    };

    const deleteActivity = idx => {
        const updatedActivities = [...travelData.activities];
        updatedActivities.splice(idx, 1);
        setTravelData({ ...travelData, activities: updatedActivities });
    };

    return (
        <div>
            <ToastMessage />
            <Form className='createForm'>
                {travelData.activities.map((activity, idx) => (
                    <div key={idx} className="activity-container">
                        <Row className="mb-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={activity.title}
                                    onChange={e => handleInputChange(idx, e)}
                                    name="title"
                                />
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="description"
                                    value={activity.description}
                                    onChange={e => handleInputChange(idx, e)}
                                    placeholder="Description"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Control type="file" onChange={handleFileUpload} />
                                {loadingImage && <Loader />}
                                <Row>
                                    {activity.pictures.map((pic, picIdx) => (
                                        <Col xs={6} md={4} key={picIdx}>
                                            <Image src={pic} thumbnail />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 1, offset: 11 }} className="d-grid">
                                <Button
                                    className="deleteActivityButton"
                                    onClick={() => deleteActivity(idx)}
                                >
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Row>
                        {idx !== travelData.activities.length - 1 && <hr className="activity-separator" />}
                    </div>
                ))}
                <Row>
                    <Col md={{ span: 1, offset: 11 }} className="d-grid">
                        <Button
                            className="addActivityButton"
                            onClick={addNewActivity}
                        >
                            <FaPlusCircle />
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default CreateActivityForm;
