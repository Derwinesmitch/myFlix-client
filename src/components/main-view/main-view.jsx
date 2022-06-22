import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import { MoviesList } from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  ProfileView  from '../profile-view/profile-view';
import { Container, Col, Row } from 'react-bootstrap';


class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
        };
    }


    componentDidMount(){
     let accessToken = localStorage.getItem('token');
     if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
       });
        this.getMovies(accessToken);
       }
    }
  

        onLoggedIn(authData)  {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }
    
    
    getMovies(token) {
      axios.get('https://movieappcf.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }


    onRegistration(register){
      this.setState({
          register,
      });
    }



    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    render() {

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
        );
      }
    }

    let mapStateToProps = state => {
      return { movies: state.movies }
    }
    
    // #8
    export default connect(mapStateToProps, { setMovies } )(MainView);