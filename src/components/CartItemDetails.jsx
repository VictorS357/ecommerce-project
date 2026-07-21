import axios from "axios";
import { formatMoney } from "../utils/money";
import { useState } from "react";

export default function CartItemDetails({ cartItem, loadCart }) {
  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateCartItem = async () => {
    setUpdate(true);
    if(update) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      await loadCart();
      setUpdate(false);
    }
  };

  const saveQuantity = (event) => {
    setQuantity(event.target.value);
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {update ? <input
                className="update-text"
                type="text"
                style={{ width: "50px" }} 
                value={quantity} 
                onChange={saveQuantity}
              /> :
              <span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateCartItem}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}