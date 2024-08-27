import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../redux/slices/favSlice";
import { addItems } from "../../redux/slices/cartSlice";

const ItemListRemove = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.favorites.items);

  const handleMoveItem = (item) => {
    dispatch(addItems(item));
    dispatch(removeFavorite(item));
  };

  const handleDeleteItem = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <>
      {items.map((item) => (
        <div className="item-main-list" key={item.id}>
          <div className="item-1-side">
            <div className="item-side-name">{item.name}</div>
            <div className="item-side-price">
              ₹{" "}
              {item.defaultPrice
                ? item.defaultPrice / 100
                : item.price / 100}
            </div>
            <div className="item-side-description">{item.description}</div>
          </div>
          <div className="item-2-side">
            <div className="item-image-positioning">
              <img
                className="item-side-image"
                src={item.thumbnail}
                alt="food-img"
                width={"50px"}
              />
              <div className="d-flex">
                <button
                  type="button"
                  className="item-side-button"
                  onClick={() => handleMoveItem(item)}
                >
                  Move to cart
                </button>
                <button
                  type="button"
                  className="item-side-button"
                  onClick={() => handleDeleteItem(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemListRemove;
