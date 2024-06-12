import './CreateTravelForm.css'
import { Form, Button, Col, Row, Image, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import uploadServices from '../../services/upload.service';
import travelService from '../../services/travel.service';

function CreateTravelForm() {
    const [travelData, setTravelData] = useState({
        title: '',
        days: '',
        persons: '',
        pictures: [],
        activities: [],
        tips: '',
        ratings: [],
    });
    
    const [loadingImage, setLoadingImage] = useState(false);
    
    const handleFileUpload = e => {
        setLoadingImage(true);
    
        const formData = new FormData();
        formData.append('travelPictures', e.target.files[0]);
    
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
        })
        .catch(err => console.log(err));
    };
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="My trip to Asturias" value={travelData.title} onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="days">
                    <Form.Label>How many days?</Form.Label>
                    <Form.Control type="number" name="days" placeholder="5 days" value={travelData.days} onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="persons">
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control type="number" name="persons" placeholder="4 persons" value={travelData.persons} onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="travelPictures">
                    <Form.Label>Pictures</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                    {loadingImage && <Spinner animation="border" />}
                    <Row>
                        {travelData.pictures.map((pic, index) => (
                            <Col xs={6} md={4} key={index}>
                                <Image src={pic} thumbnail />
                            </Col>
                        ))}
                    </Row>
                </Form.Group>
                <Button type="submit" variant='primary' disabled={loadingImage}>
                    {loadingImage ? 'Saving image...' : 'Create travel'}
                </Button>
            </Form>
        </div>
    );
}

export default CreateTravelForm;
