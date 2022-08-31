import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}



function movies(state = [], action) {
  console.log("set movies is called")
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  console.log("set user is called")
  switch (action.type) {
    case SET_USER:
      return action.value || localStorage.getItem('user');
    default:
      return state;
  }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
  });


export default moviesApp;