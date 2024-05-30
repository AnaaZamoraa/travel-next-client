import './SearchBar.css';
import { Form, Col, Row, Button } from 'react-bootstrap';

function SearchBar() {
  return (
    <div className='searchBar'>
      <Form>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-start">
            <Form.Check
              type="switch"
              id="travels-switch"
              label="Travels"
              className="me-2"
            />
            <Form.Check
              type="switch"
              id="activities-switch"
              label="Activities"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group className="mb-3" controlId="where">
              <Form.Control type="text" placeholder="Where" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="when">
              <Form.Control type="text" placeholder="When" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="persons">
              <Form.Control type="text" placeholder="How many persons" />
            </Form.Group>
          </Col>
          <Col>
          <Button variant="dark" type="submit" className='d-flex justify-content-start'>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchBar;
