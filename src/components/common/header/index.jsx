import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom/dist';
import './style.scss';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
const Header = () => {
    const items = useSelector((state) => state.cart.items)
    console.log(items)
    const favitem = useSelector((st) => st.favorites.items)
    console.log(favitem);
    return (
        <div className='header-wrap'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">E-cart</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-between'>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/contact" >Contact-us</Nav.Link>
                            <Nav.Link as={Link} to="/about">About-us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="cartPage" >
                                {/* <p>cart</p> */}
                                <FontAwesomeIcon icon={faShoppingCart}>
                                </FontAwesomeIcon>
                                {items.length > 0 ? <lable>{items.length}</lable> : null}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/favourite" >Fav
                            <FontAwesomeIcon icon={faHeart}>
                            </FontAwesomeIcon>
                                {favitem.length > 0 ? <lable> {favitem.length}</lable> : null}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;