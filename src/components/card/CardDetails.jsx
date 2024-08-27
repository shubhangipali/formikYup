import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../customHooks/useApi';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItems, setCartItems } from '../../redux/slices/cartSlice';
import { getCartItems, saveCartItems, getFavItems, saveFavItems } from '../../utils/localStoarge';
import { addFavorite } from '../../redux/slices/favSlice';

const CardDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, error, loading } = useApi('https://api.example.com/items');

    useEffect(() => {
        // Load cart items from local storage on mount
        const cartItems = getCartItems();
        dispatch(setCartItems(cartItems));
    }, [dispatch]);

    const handleAddItem = (item) => {
        const updatedCartItems = [...getCartItems(), item];
        saveCartItems(updatedCartItems);
        dispatch(addItems(item));
    };

    const handleFavItem = (item) => {
        const updatedFavItems = [...getFavItems(), item];
        saveFavItems(updatedFavItems);
        dispatch(addFavorite(item));  // You might want a different action for favorites
    };

    console.log("Data fetched:", data);
    console.log("Loading state:", loading);
    console.log("Error state:", error);

    const item = data.find((elm) => elm.id === parseInt(id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!item) return <p>No item found</p>;

    return (
        <Container>
            <Row className='cardDetail'>
                <Col md={4}>
                    <Carousel variant="dark">
                        {item.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={image} alt={`Item ${index}`} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col md={8}>
                    <div className='cardWrapper w-100'>
                        <img className='cardWrapper-img' src={item.thumbnail} alt="" />
                        <h3 className='cardWrapper-title'>Title: {item.title}</h3>
                        <h3 className='cardWrapper-price'>Price: {item.price}</h3>
                        <h3 className='cardWrapper-category'>Category: {item.category}</h3>
                        <h3 className='cardWrapper-description'>Description: {item.description}</h3>
                        <h3 className='cardWrapper-rating'>Rating: {item.rating.rate}</h3>
                        <h3 className='cardWrapper-count'>Count: {item.rating.count}</h3>
                        <Button variant="secondary" onClick={() => handleAddItem(item)}>Add to cart</Button>
                        <Button variant="secondary" onClick={() => handleFavItem(item)}>Add to favourite</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CardDetails;
