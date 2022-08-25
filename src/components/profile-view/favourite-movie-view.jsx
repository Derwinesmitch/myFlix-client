import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Button, Col } from 'react-bootstrap';



export function FavouriteMoviesView(props) {
    const { movies, favouriteMovies, username, token } = props;

    const favouriteMoviesId = favouriteMovies.map(m => m._id)
    const favouriteMoviesList = movies.filter(m => {
        return favouriteMoviesId.includes(m._id)
    })




    const handleMovieDelete = (movieId) => {
        axios.delete(`https://movieappcf.herokuapp.com/users/${username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
            alert(`The movie was deleted`)
            window.open('/users/:username', '_self');
        }).
        catch(error => console.error(error))
    }

return (
    <Fragment>
        {favouriteMoviesList.length === 0 ? (
            <p>There are no movies in the list</p>
        ) : (
            favouriteMoviesList.map((movie) => {
                return (
                    <Col xs={10} sm={8} md={6} lg={4} >
                        <Card id="movie-card">
                            <Link to ={`/movies/${movie._id}`}>
                                <Card.Img variant="top" src={movie.ImagePath} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button className="button" variant="outline-primary" size="sm">Open list</Button>
                                </Link>
                                <Button
                                className="button m1-2"
                                variant="outline-primray"
                                size="sm" onClick={() => {handleMovieDelete(movie._id)}}>Remove </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })
        )}
    </Fragment>
)

}