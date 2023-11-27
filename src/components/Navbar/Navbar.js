// Components
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/logo.png'

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

// Redux
import { logout, reset } from '../../slices/authSlice';

function NavComponent() {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <Navbar expand="lg" className="navbar navbar-dark bg-dark" fixed='top' style={{ paddingLeft: '5px', paddingRight: '15px' }}>
            <Container fluid>
                <Navbar.Brand href={`/`}>
                    <Image
                        src={logo}
                        width="85"
                        height="31"
                        className="d-inline-block align-top"
                        alt="Fusion logo"
                        style={{ marginLeft: '10px', marginBottom: '12px' }}

                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {auth ? (
                        <>
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link style={{ fontSize: '18px' }} href={`/`}>Home</Nav.Link>
                                <Nav.Link style={{ fontSize: '18px' }} href={`/new`}>Criar</Nav.Link>
                                {user && (
                                    <Nav.Link style={{ fontSize: '18px' }} href={`/users/${user._id}`}>Dashbord</Nav.Link>
                                )}
                                <NavDropdown style={{ fontSize: '18px' }} title="Outros" id="navbarScrollingDropdown" menuVariant='dark'>
                                    <NavDropdown.Item href={`/profile`}>
                                        Perfil
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={`/processoNegocio`}>
                                        Processos de Negócio
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex" onSubmit={handleSearch} >
                                <Form.Control
                                    style={{ width: '300px' }}
                                    type="search"
                                    placeholder="Buscar notes, transações, módulos etc "
                                    className="me-2"
                                    aria-label="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button variant="outline-warning" type='submit'>Buscar</Button>
                            </Form>
                        </>
                    ) : (
                        <>

                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link style={{ fontSize: '18px' }} href={`/login`}>Login</Nav.Link>
                                <Nav.Link style={{ fontSize: '18px' }} href={`/register`}>Cadastrar</Nav.Link>
                            </Nav>
                        </>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComponent;
