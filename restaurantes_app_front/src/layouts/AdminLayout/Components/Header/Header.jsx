import React from 'react'
import { Button } from 'react-bootstrap'
import "./Header.scss"
import { Navbar, NavbarBrand, Container } from 'react-bootstrap'

export default function Header(props) {
  const { title, btnTitle, btnClick, btnColor, child, btnTitle2, btnClick2 } = props
  return (
    <Navbar bg='dark' data-bs-theme="dark" className='header-admin-navbar'>
      <Container>
        <Navbar.Brand>{title}</Navbar.Brand>
      </Container>
      <Container className="d-flex justify-content-end right-container">
        {child && (
          child
        )}
        {btnTitle && (
          <Button variant={btnColor ? btnColor : 'success'} onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitle2 && (
          <Button variant={btnColor ? btnColor : 'primary'} onClick={btnClick2} className='ms-2'>
            {btnTitle2}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}