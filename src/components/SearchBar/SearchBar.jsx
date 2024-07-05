import './SearchBar.css';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const validTypes = [
    'Culture and Heritage',
    'Nature and Adventure',
    'Relax and Wellness',
    'Entertainment and Leisure',
    'Culinary and Gastronomy'
  ];
  const [selectedOption, setSelectedOption] = useState('travels');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [persons, setPersons] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (location) query.append('location', location);
    if (selectedOption === 'travels') {
      if (days) query.append('days', days);
      if (persons) query.append('persons', persons);
      navigate(`/search-travels?${query.toString()}`);
    } else if (selectedOption === 'activities') {
      if (type) query.append('type', type);
      navigate(`/search-activities?${query.toString()}`);
    }
  };

  return (
    <div className='searchBar'>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-start">
            <Form.Check
              type="radio"
              id="travels"
              label="Travels"
              className="me-2"
              checked={selectedOption === 'travels'}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              id="activities"
              label="Activities"
              checked={selectedOption === 'activities'}
              onChange={handleOptionChange}
            />
          </Col>
        </Row>

        {selectedOption === 'travels' && (
          <Row className="mt-3">
            <Col>
              <Form.Group className="mb-3" controlId="location">
                <Form.Control
                  type="text"
                  placeholder="Where"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="days">
                <Form.Control
                  type="text"
                  placeholder="How long"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="persons">
                <Form.Control
                  type="number"
                  placeholder="How many"
                  value={persons}
                  onChange={(e) => setPersons(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="dark" type="submit">Search</Button>
            </Col>
          </Row>
        )}

        {selectedOption === 'activities' && (
          <Row className="mt-3">
            <Col>
              <Form.Group className="mb-3" controlId="location">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="type">
                <Form.Control
                  as="select"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option disabled selected>Select a type</option>
                  {validTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="dark" type="submit">Search</Button>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
}

export default SearchBar;
