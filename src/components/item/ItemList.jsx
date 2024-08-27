import React from "react";
import "./style.scss";
// import { _URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { API_URL } from "../../constant/constant";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItems(item));
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
            <div className="item-side-description">
              {item.description}
            </div>
          </div>
          <div className="item-2-side">
            <div className="item-image-positioning">
              <img
                className="item-side-image"
                src={item.thumbnail}
                alt="food-img"
                width={"50px"}
              />
              <button
                className="item-side-button"
                onClick={() => handleAddItem(item)}
              >
                ADD
              </button>
              <div>
                <button
                  type="button"
                  className="item-side-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Item Added 🎉
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemList;
