import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { HouseDoor, Table, Clock, Folder, Cart, Person } from "react-bootstrap-icons"; // Íconos de Bootstrap
import "./SideMenu.scss"; // Agrega estilos aquí
import { Link } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";


export default function SideMenu() {
    const { pathname } = useLocation();
    const { auth } = useAuth();
    return (
        <div className='side-menu-container'>
            <Nav variant="pills" className="flex-column">
                <Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link
                     as={Link} 
                     to={"/admin"} 
                     className="side-menu-container__menu-item" 
                     active={pathname === "/admin"}>
                        <HouseDoor size={20} className="menu-icon"/>
                        <span>Pedidos</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link 
                    as={Link} 
                    to={"/admin/tables"} 
                    className="side-menu-container__menu-item" 
                    active={pathname === "/admin/tables"}>
                        <Table size={20} className="menu-icon"/>
                        <span>Mesas</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link 
                    as={Link} 
                    to={"/admin/payments"} 
                    className="side-menu-container__menu-item" 
                    active={pathname === "/admin/payments"}>
                        <Clock size={20} className="menu-icon"/>
                        <span>Historial Pagos</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link 
                    as={Link} 
                    to={"/admin/categories"} 
                    className="side-menu-container__menu-item" 
                    active={pathname === "/admin/categories"}>
                        <Folder size={20} className="menu-icon"/>
                        <span>Categorias</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link 
                    as={Link} 
                    to={"/admin/products"} 
                    className="side-menu-container__menu-item" 
                    active={pathname === "/admin/products"}>
                        <Cart size={20} className="menu-icon"/>
                        <span>Productos</span>
                    </Nav.Link>
                </Nav.Item>
                {auth.me.is_staff && (<Nav.Item className="side-menu-container_menu-item">
                    <Nav.Link 
                    as={Link} 
                    to={"/admin/users"} 
                    className="side-menu-container__menu-item" 
                    active={pathname === "/admin/users"}>
                        <Person size={20} className="menu-icon"/>
                        <span>Usuarios</span>
                    </Nav.Link>
                </Nav.Item>)}
                
            </Nav>
        </div>
    )
}

function MenuLeft(props) {
    const { children } = props;

    return (
        <Navbar className="side-menu" fixed="top">
            <Nav className="flex-column w-100 text-center">
                {/* Opción Home */}
                <Nav.Link href="/" className="menu-item">
                    <HouseDoor size={24} /> {/* Icono */}
                    <span>Home</span>
                </Nav.Link>

                {/* Opción Más */}
                <Nav.Link href="/more" className="menu-item">
                    <ThreeDots size={24} />
                    <span>Más</span>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
