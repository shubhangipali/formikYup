import { NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import ItemList from '../item/ItemList';
import { clearCart } from '../../redux/slices/cartSlice';
// import ItemListRemove from '../item/ItemListRemove';
const CartItems = () => {
    // Use useSelector to access the cart items from the Redux store
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems)
    const dispatch = useDispatch();

    const handleClearCart = () => {
      dispatch(clearCart());
    };
  
    let totalCartPrice = 0;
    const GST = 20.0;
    const platformFee = 6;
    const DeliveryCharge = 50;
  
    // cartItems.map((item) => {
    //   totalCartPrice += item.card.info.defaultPrice /100 || item.card.info.price / 100;
    // });
  
    return (
        <div>

            <div className="container mt-3 p-3 rounded cart">
                <div className="main-cart-heading">
                    <h1>Your Cart</h1>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="product-details">
                            <div className="back-main-list d-flex justify-content-between align-items-center">
                                <NavLink to={"/"}>
                                    <div className="back-to-shopping">
                                        <i className="fa fa-long-arrow-left"></i>
                                        <span className="ml-2"> Add More Items</span>
                                    </div>
                                </NavLink>
                                <div className="clear-cart-button">
                                    <div>
                                        <button
                                            type="button"
                                            className="item-side-button-clear"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          onClick={handleClearCart}
                                        >
                                            Clear
                                        </button>

                                       
                                    </div>
                                </div>
                            </div>
                            <div className="responsive-txt d-flex justify-content-between align-items-center p-2">
                                <span>You have {cartItems.length} items in your cart</span>
                                {cartItems.length === 0 && <span>Add Items To The Cart😋</span>}
                            </div>

                            <div className="mt-3 p-2">
                                <ItemList items={cartItems} />
                                {/* <ItemListRemove items={cartItems} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="payment-info">
                            <div className="d-flex justify-content-between align-items-center payment-head">
                                <span>PAYMENT INFO</span>
                                <img
                                    className="rounded"
                                    src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                                    alt="user-img"
                                    width="30"
                                />
                            </div>

                            <div className="d-flex justify-content-between information">
                                <span>Subtotal</span>
                                <span>₹ {totalCartPrice}</span>
                            </div>
                            <div className="d-flex justify-content-between information">
                                <span>Delivery Fee</span>
                                <span>₹ {DeliveryCharge}</span>
                            </div>
                            <div className="d-flex justify-content-between information">
                                <span>Platform fee</span>
                                <span>₹ {platformFee}</span>
                            </div>
                            <div className="d-flex justify-content-between information">
                                <span>GST and Restaurant Charges</span>
                                <span>₹ {GST}</span>
                            </div>
                            <div className="d-flex justify-content-between information">
                                <span>Total(Incl. taxes)</span>
                                <span>
                                  /  ₹ {totalCartPrice + GST + platformFee + DeliveryCharge}
                                </span>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button className="checkout-btn d-flex justify-content-center align-items-center">
                                    Checkout 🍕 <i className="fa fa-long-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CartItems;
