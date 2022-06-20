import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
import  MainView  from './components/main-view/main-view';
=======
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from "./components/main-view/main-view";
>>>>>>> Stashed changes

import './index.scss';

const store = createStore(moviesApp());

class MyFlixApplication extends React.Component {
    render() {
        return (
<<<<<<< Updated upstream
            <MainView />
=======
            <Provider store={store}>
                <Container>
                    <MainView /> 
                </Container>
            </Provider>
>>>>>>> Stashed changes
        );
    }
}


const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);