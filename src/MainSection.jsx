import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Home from '../src/Home'
const MainSection = () => {
    return (
        <div className='diff-section' style={{ minHeight: '100vh' }}>
            <Container>
                <Home/>
          
                <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
            </Container>
        </div>
    );
};

export default MainSection;