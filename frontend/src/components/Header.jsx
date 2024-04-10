import {Navbar, Nav, Form, Container, Button, Row, Col} from 'react-bootstrap';
import logo from '../logo192.png';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {removeTokenFromLocalStorage} from '../helpers/localstorage.helper';
import {logout} from '../store/user/userSlice';
import {selectIsAuth} from '../store/selectors';

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        navigate('auth')
    }

    return (
        <>
            <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Дневник</Nav.Link>
                            <Nav.Link href="programs">Программы тренировок</Nav.Link>
                            <Nav.Link href="exercises">Упражнения</Nav.Link>
                            <Nav.Link href="/about">О нас</Nav.Link>
                            <Nav.Link href="/contacts">Контакты</Nav.Link>
                        </Nav>
                        {isAuth ? (
                            <Button variant="outline-warning" onClick={logoutHandler}>Logout</Button>
                        ) : (
                           <Nav.Link href="/auth">Log In / Sing In</Nav.Link>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="content-div"><Outlet /></div>
        </>
    )
}