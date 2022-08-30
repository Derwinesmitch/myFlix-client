import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';

export function ProfileView({props}) {
        const [ user, setUser ] = useState({}); 
        // const [ movies, setMovies ] = useState(props.movies);
        const [ updatedUser, setUpdatedUser] = useState({});
        const [ favouriteMovies, setFavouriteMovies ] = useState([]);
        const token = localStorage.getItem('token');

const getUser = () => {
        const username = localStorage.getItem('user');

        axios.get(`https://movieappcf.herokuapp.com/users/${props.user}`, {
                headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
                setUser(response.data);
                setUpdatedUser(response.data);
                setFavouriteMovies(response.data.FavouriteMovies)
        })
        .catch(error => console.error(error))
}


const handleDelete = () => {
        const token = localStorage.getItem('token');
        const username = localstorage.getItem('user');
        
        axios.delete(`https://movieappcf.herokuapp.com/users/${username}`, {
                headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
                alert(`Account ${user.userName} was successfully deleted`)
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open('/', '_self');
        }).
        catch(error => console.error(error))
}

return(
        <Container id="profile-form">
            <Row><h4>Your Profile</h4></Row>
            <Row>     
                <Col className="label">Username:</Col>
                <Col className="value">{user.Username}</Col>
            </Row>
            <Row className="mt-3">     
                <Col className="label">Password:</Col>
                <Col className="value">******</Col>
            </Row>
            <Row className="mt-3">     
                <Col className="label">Email:</Col>
                <Col className="value">{user.Email}</Col>
            </Row>
            <Row className="mt-3">     
                <Col className="label">Birthday:</Col>
                <Col className="value">{user.Birthday}</Col>
            </Row>
            <Row className="mt-5"><h4>Favourite movie list</h4></Row> 
            <UpdateView user={user}/>
            <Button className="d-block mt-5" variant="warning" size="sm" onClick={handleDelete}>Delete the profile</Button>
        </Container>
)
}

ProfileView.PropTypes = {

        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }