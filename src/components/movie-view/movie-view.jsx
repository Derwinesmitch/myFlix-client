import React from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';
export class MovieView extends React.Component {
addMovie(movie) { 
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    const notify = () =>
    toast.success('Movie has been added!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    axios.put(
        `https://movieappcf.herokuapp.com/users/${username}/movies/${movie._Id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return notify();
}

    // keypressCallback(event) {
    //     console.log(event.key);
    // }

    // componentDidMount() {
    //     document.addEventListener('keypress', this.keypressCallback);
    // }
   
    // componentWillMount() {
    //     document.removeEventListener('keypress', this.keypressCallback);
    // }

    render() {
        const { movie, onBackClick } = this.props;

        return (
        <Container>

            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>    
                </div> 
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>   
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
                <Button onClick={() => {this.addMovie(movie); }}>Add to Favorites</Button>
            </div>        
         </Container>
 
        );        

    }
}