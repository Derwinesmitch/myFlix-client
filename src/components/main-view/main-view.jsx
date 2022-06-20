import React from 'react';
import axios from 'axios';

<<<<<<< Updated upstream
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
=======
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
// import { MovieCard } from '../movie-card/movie-card';
>>>>>>> Stashed changes
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
<<<<<<< Updated upstream
            movies: [],
            selectedMovie: null,
            user: null
=======
            user: null,
>>>>>>> Stashed changes
        };
    }

    componentDidMount(){
      axios.get('https://movieappcf.herokuapp.com/movies')
      .then(response => {

        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user)  {
      this.setState({
        user
      });
    }


    render() {
<<<<<<< Updated upstream
        const { movies, selectedMovie } = this.state;
    
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              ))
            }
          </div>
=======

      let { movies } = this.props;
      let { user } = this.state;
    
        return (
          <Router>
             <Navbar user={user} />
              <Row className="main-view justify-content-md-center">
                <Route exact path="/" render={() => {
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                 return <MoviesList movies={movies}/>;
                  }} />

                <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return <Col>
                      <RegistrationView />
                    </Col>
                  }} />

                <Route path="/movies/:movieId" render={({ match, history }) => {
                   if (!user) return <Col>
                   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                     </Col>
                 if (movies.length === 0) return <div className="main-view" />;                 
                  return <Col md={8}>
                      <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />
                
                <Route path="/directors/:name" render={({ match, history }) => {
                    if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>                
                 if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
                  }} />

                <Route path="/genre/:name" render={({ match, history }) => {
                   if (!user) return <Col>
                   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                     </Col>                  
                  if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />

                <Route path={`/users/${user}`} render={({history, match}) => {
                    if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>                   
                    if (movies.length === 0) return <div className="main-view" />;
                      return <Col>
                      <ProfileView history={histoy} movies={movies} user={user === match.params.username} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />
                
                <Route path={`/user-update/${user}`} render={({match, history}) => {
                     if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                       </Col>                  
                   if (movies.length === 0) return <div className="main-view" />;
                      return <Col>
                      <UserUpdate user={user} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />              
              </Row>
            </Router>
>>>>>>> Stashed changes
        );
      }
}

    let mapStateToProps = state => {
      return { movies: state.movies }
    }

    export default connect(mapStateToProps, { setMovies } )(MainView);