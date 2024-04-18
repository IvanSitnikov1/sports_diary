import {Navbar, Nav, Container} from 'react-bootstrap';
import logo from '../logo192.png';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {removeTokenFromLocalStorage} from '../helpers/localstorage.helper';
import {logout} from '../store/user/userSlice';
import {selectIsAuth} from '../store/selectors';

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname;

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
                            <Nav.Link href="/" className={path === "/" ? "active" : ""}>Дневник</Nav.Link>
                            <Nav.Link href="/programs" className={path === "/programs" ? "active" : ""}>Программы тренировок</Nav.Link>
                            <Nav.Link href="/exercises" className={path === "/exercises" ? "active" : ""}>Упражнения</Nav.Link>
                            <Nav.Link href="/about" className={path === "/about" ? "active" : ""}>О нас</Nav.Link>
                            <Nav.Link href="/contacts" className={path === "/contacts" ? "active" : ""}>Контакты</Nav.Link>
                        </Nav>
                        {isAuth ?
                            <Nav.Link href="/auth" onClick={logoutHandler}>Log out</Nav.Link>
                        : <></>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="content-div"><Outlet /></div>
        </>
    )
}