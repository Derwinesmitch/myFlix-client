import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Col, Row } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;

        return(
            <Container>
                <Row>
                    <Col className="label">Genre: </Col>
                    <Col className="value">{genre.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Description: </Col>
                    <Col className="value">{genre.Description}</Col>
                </Row>
                <Button onClick={() => { onBackClick(null); }} variant="warning">Go back</Button>
            </Container>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired
};