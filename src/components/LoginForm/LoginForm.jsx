import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import authService from '../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthContext } from '../../contexts/auth.context';
import { ToastContext } from '../../contexts/toast.context';

function LoginForm({ onLoginSuccess, setAlert }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { authenticateUser } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  const handleInputChange = e => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    authService
      .login(loginData)
      .then(async ({data}) => {
        localStorage.setItem('authToken', data.authToken)
        authenticateUser()
        showToast(`Welcome ${data.username}, you logged in successfully`)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm={2}>Email:</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={loginData.email} onChange={handleInputChange} name="email" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm={2}>Password:</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" required />
          </Col>
        </Form.Group>
        <div className="d-grid">
          <Button type="submit">Log In</Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;