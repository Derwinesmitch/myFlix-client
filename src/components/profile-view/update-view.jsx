import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Container, Col, Row, Form } from 'react-bootstrap';

export function UpdateView(props) {
    const { user } = props;
    console.log("updateview", user)
    const [ username, setUsername ] = useState(user.Username);
    const [ password, setPassword ] = useState(user.Password);
    const [ email, setEmail ] = useState(user.Email);
    const [ birthday, setBirthday ] = useState(user.Birthday);
    const [ values, setValues ] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: ','
    });
    
    const userToken = localStorage.getItem('user');
const validate =() => {
    let isReq = true;
    if(!username) {
     setValues({...values, usernameErr: 'Username Required'});
     isReq = false;
    }else if(username.length < 2){
     setValues({...values, usernameErr: 'Username must be 2 characters long'});     
     isReq = false;
    }
    if(!password){
        setValues({...values, passwordErr: 'Password Required'});
     isReq = false;
    }else if(password.length < 6){
     setPassword({...values, passwordErr: 'Password must be 6 characters long'});
     isReq = false;
    }
    if(!email){
        setValues({...values, EmailErr: 'email is Required'});
     isReq = false;
    }else if(email.indexOf('@') === -1) {
     setValues({...values, emailErr: 'enter valid email please'});
     isReq = false;
    }
    return isReq;
}


const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem('token');
    if(isReq) {
      axios.put(`https://movieappcf.herokuapp.com/users/${userToken}`, {
          Username: username,
          Password: password,   
          Email: email,
          Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${token}`}
      })
          .then(response =>{
            console.log(response.data);
          alert('Profile data was updated');
          window.open('/users/:username', '_self');
      })
      .catch(e => {
        console.error(error);
        alert('error when updating');
      });
    }
  };



  return (
        <Container id="update form" className="mt-5">
            <Row><h4>Edit the profile</h4></Row>
            <Row>
                <Col md="8">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
                            {/* code added here to display validation error */}
                            {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                            {/* code added here to display validation error */}
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text"  value={email} onChange={e => setEmail(e.target.value)} placeholder="yourmail@mail.com" required />
                            {/* code added here to display validation error */}
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text"  value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="YYYY-MM-DD" required />
                            {/* code added here to display validation error */}
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>


                        <Button variant="warning" type="submit" onClick={handleSubmit}>
                        Edit profile
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
)
}