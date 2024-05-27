import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import authService from '../../services/auth.service';
import uploadServices from '../../services/upload.service';

function SignupForm({ onSignupSuccess }) {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    imageUrl: '',
    age: null
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const handleInputChange = e => {
    const { value, name } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    
    authService
      .signup(signupData)
      .then(() => {
        onSignupSuccess();
      })
      .catch(err => console.log(err));
  };

  const handleFileUpload = e => {
    setLoadingImage(true);

    const formData = new FormData();
    formData.append('imageData', e.target.files[0]);
  
    uploadServices
      .uploadimage(formData)
      .then(res => {
        setSignupData({ ...signupData, imageUrl: res.data.cloudinary_url });
        setLoadingImage(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingImage(false);
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column sm={2}>Username</Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter username" name='username' value={signupData.username} onChange={handleInputChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column sm={2}>Email</Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Enter email" name='email' value={signupData.email} onChange={handleInputChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm={2}>Password</Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="***********" name='password' value={signupData.password} onChange={handleInputChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="imageData">
        <Form.Label column sm={2}>Avatar</Form.Label>
        <Col sm={10}>
          <Form.Control type="file" onChange={handleFileUpload} name='imageData' />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="age">
        <Form.Label column sm={2}>Age</Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="26" name='age' value={signupData.age} onChange={handleInputChange} />
        </Col>
      </Form.Group>
      <Button type="submit" variant='primary' disabled={loadingImage}>
        {loadingImage ? 'Saving image...' : 'Sign Up'}
      </Button>
    </Form>
  );
}

export default SignupForm;