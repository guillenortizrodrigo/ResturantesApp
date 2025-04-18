import React from 'react'
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { useAuth } from '../../../../hooks/useAuth';
import { BoxArrowRight } from "react-bootstrap-icons"; // Íconos de Bootstrap

export default function TopMenu() {
    const { auth , logout } = useAuth();
    console.log(auth)
    return (
        <Navbar data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Restaurants App</Navbar.Brand>
            </Container>
            <Container className="d-flex justify-content-end right-container">
                <Navbar.Brand>Hola {auth.me.username}</Navbar.Brand>
                <Navbar.Brand>
                    <BoxArrowRight size={25} onClick={ logout } className="d-inline-block align-top" style={{ cursor: "pointer" }} />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
