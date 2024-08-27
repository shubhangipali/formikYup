import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Col, Container, Row } from 'react-bootstrap';


const Card = ({data}) => {

    const navigate = useNavigate();
    if (!data) return null; //
    return (
        <div>
            <Container>
                <Row>
                    {data.map(item => (
                        <Col md={3} className='d-flex align-items-stretch' key={item.id} onClick={() => navigate(`/cardDetails/${item.id}`)
                        }>
                            <div className='cardWrapper w-100'>
                                {/* <p>{item.id}</p> */}
                                <img className='cardWrapper-img' src={item.thumbnail} alt="" />
                                <h3 className='cardWrapper-tittle'>{item.title}</h3>
                                <h3 className='cardWrapper-price'>${item.price}</h3>
                                {/* <h3 className='cardWrapper-price'>{(item.rating>4.5?require('../../assets/react.svg'):item.rating<4.5&&item.rating>4?)}</h3> */}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );

};

export default Card;