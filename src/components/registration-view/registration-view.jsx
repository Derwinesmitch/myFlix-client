import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { values } from 'lodash';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 2){
     setUsernameErr('Username must be 5 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPasswordErr('Password must be 6 characters long');
     isReq = false;
    }
    if(!email){
      setEmailErr('email Required');
      isReq = false;
     }else if(email.indexOf('@') === -1) {
      setEmail('email is invalid');
      isReq = false;
     }
    return isReq;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if(isReq) {
    /* Send request to the server for authentication */
    axios.post('YOUR_API_URL/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    })
    .then(response =>{
        const data = response.data;
        console.log(data)
        alert('Registration successful, please login');
        window.open('/', '_self');
    })
    .catch(e => {
      console.error(response);
      alert('unable to register');
    });
  }
};



return (
  <Row className="mt-4">
    <Col md={12}>
      <Form>
        <h3>Sign Up</h3>
        <p></p>
        <Form.Group controlId="formUsername" className="reg-form-inputs">
          <Form.Label>Username:</Form.Label>
            <Form.Control type="text"  value={username} onChange={e => setUsername(e.target.value)} />
              {values.usernameErr && <p>{values.usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword" className="reg-form-inputs">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
              {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>

        <Form.Group controlId="Email" className="reg-form-inputs">
          <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
              {values.emailErr && <p>{values.emailErr}</p>}
        </Form.Group>

        <Form.Group controlId="updateBirthday" className="reg-form-inputs">
          <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" name="birthday" onChange={e => setBirthday(e.target.value)}></Form.Control>
             
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
        </Button>
        <p></p>
        <p>Alread registered <Link to={'/'}>sign in</Link> here</p>
      </Form>
    </Col>
  </Row>
);
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired
  }),
};