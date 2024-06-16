import './CreateTravelForm.css';
import { Form, Button, Col, Row, Image, Spinner } from 'react-bootstrap';
import { useContext, useState } from 'react';
import uploadServices from '../../services/upload.service';
import travelService from '../../services/travel.service';
import ToastMessage from '../ToastMessage/ToastMessage';
import { ToastContext } from '../../contexts/toast.context';
import CreateActivityForm from '../CreateActivityForm/CreateActivityForm';
import Loader from '../Loader/Loader';

function CreateTravelForm() {
    const { showToast } = useContext(ToastContext);
    const [travelData, setTravelData] = useState({
        title: '',
        days: '',
        persons: '',
        pictures: [],
        activities: [{ title: '', type: '', pictures: [], description: '', ratings: [] }],
        tips: '',
        ratings: [],
    });
    const [loadingImage, setLoadingImage] = useState(false);

    const handleFileUpload = e => {
        if (travelData.pictures.length >= 6) {
            showToast('You can only upload up to 6 images.');
            return;
        }
        setLoadingImage(true);
    
        const formData = new FormData();
        formData.append('imageData', e.target.files[0]);
    
        uploadServices
            .uploadimage(formData)
            .then(res => {
                setTravelData(prevState => ({
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
    
    const handleInputChange = e => {
        const { value, name } = e.target;
        setTravelData({ ...travelData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        travelService
        .createTravel(travelData)
        .then(response => {
            console.log('Travel created:', response.data);
            showToast('Your travel has been created successfully');
        })
        .catch(err => {
            console.log(err);
            showToast('Failed to create travel. Please try again.');
        });
    };
    
    return (
        <div>
            <ToastMessage />
            <Form onSubmit={handleSubmit} className='createForm'>
                <Form.Group className="mb-3 input" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="My trip to Asturias" value={travelData.title} onChange={handleInputChange} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 input" controlId="days">
                            <Form.Label>How many days?</Form.Label>
                            <Form.Control type="number" name="days" placeholder="5 days" value={travelData.days} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 input" controlId="persons">
                            <Form.Label>How many people?</Form.Label>
                            <Form.Control type="number" name="persons" placeholder="4 persons" value={travelData.persons} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3 input" controlId="imageData">
                    <Form.Label>Pictures</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                    {loadingImage && <Loader />}
                    <Row>
                        {travelData.pictures.map((pic, index) => (
                            <Col xs={6} md={4} key={index}>
                                <Image src={pic} thumbnail />
                            </Col>
                        ))}
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3 input" controlId="activities">
                    <Form.Label>Activities</Form.Label>
                    <CreateActivityForm travelData={travelData} setTravelData={setTravelData} />
                </Form.Group>
                <Form.Group className="mb-3 input" controlId="tips">
                    <Form.Label>Tips</Form.Label>
                    <Form.Control as="textarea" rows={2} name="tips" value={travelData.tips} onChange={handleInputChange} />
                </Form.Group>
                <Button type="submit" variant='primary' disabled={loadingImage}>
                    {loadingImage ? 'Saving image...' : 'Create travel'}
                </Button>
            </Form>
        </div>
    );
}

export default CreateTravelForm;
