import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';

export function ProfileView({props}) {
        const [ user, setUser ] = useState(props.user)
        const [ movies, setMovies ] = useState(props.movies)
        const [ favouriteMovies, setFavouriteMovies ] = useState([]);
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

const getUser = () => {
        axios.get(`https://movieappcf.herokuapp.com/users/${currentUser}`, {
                headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
                setUser(response.data);
                setFavouriteMovies(response.data.FavouriteMovies)
        })
        .catch(error => console.error(error))
}

useEffect(() => {
        getUser();
}, [])

const handleDelete = () => {
        axios.delete(`https://movieappcf.herokuapp.com/users/${currentUser}`, {
                headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
                alert(`Account ${user.userName} was successfully deleted`)
                localStorage.clear();
                window.open('/register', '_self');
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
            <Row className="mt-3"> 
                <FavouriteMoviesView
                movies={movies}
                favouriteMovies={favouriteMovies}
                currentUser={currentUser}
                token={token}/>
            </Row>
            <UpdateView user={user}/>
            <Button className="d-block mt-5" variant="warning" size="sm" onClick={handleDelete}>Delete the profile</Button>
        </Container>
)
}