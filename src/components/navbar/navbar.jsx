import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function Menubar() {
    let user = localStorage.getItem('user');
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };
    
    return (

        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand className="navbar-logo" href="/">myFlixApp</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link className="navbar-link" href={`/users/${user}`}>
                                MyPage
                            </Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}></Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}