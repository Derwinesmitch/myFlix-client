import React from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
export class MovieView extends React.Component {


    keypressCallback(event) {
        console.log(event.key);
    }

    UNSAFE_componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }
   
    UNSAFE_componentWillMount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
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
            </div>        
        );
    }
}