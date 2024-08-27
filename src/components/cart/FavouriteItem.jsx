import { NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import ItemList from '../item/ItemList';
import ItemListRemove from '../item/ItemListRemove';

const FavouriteItem = () => {
    // Use useSelector to access the cart items from the Redux store
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems)
    const dispatch = useDispatch();


    return (
        <div>

            <div className="container mt-3 p-3 rounded cart">
                <div className="main-cart-heading">
                    <h1>Your Favourite Item</h1>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="product-details">
                            <div className="responsive-txt d-flex justify-content-between align-items-center p-2">
                                <span>You have {cartItems.length} items in your List</span>
                                {cartItems.length === 0 && <span>Add Items To The Cart😋</span>}
                            </div>

                            <div className="mt-3 p-2">
                                <ItemListRemove items={cartItems} />
                                {/* <ItemListRemove items={cartItems} /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default FavouriteItem;
