import React from 'react';
import Proptypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;


        return(
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
        ); 
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string.isRequired
  
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};