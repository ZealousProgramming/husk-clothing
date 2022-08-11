import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = (props) => {
	const { deleteItemFromCart, addItemToCart, removeItemFromCart } =
		useContext(CartContext);

	const increaseQuantityHandler = () => addItemToCart(props.item);
	const decreaseQuantityHandler = () => removeItemFromCart(props.item);
	const deleteItemHandler = () => deleteItemFromCart(props.item);

	return (
		<div className="checkout-item-container">
			<img
				className="image-container"
				src={props.item.imageUrl}
				alt={`${props.item.name}`}
			/>
			<span className="name">{props.item.name}</span>
			<span className="quantity">
				<div className="arrow" onClick={decreaseQuantityHandler}>
					&#10094;
				</div>
				<span className="value">{props.item.quantity}</span>
				<div className="arrow" onClick={increaseQuantityHandler}>
					&#10095;
				</div>
			</span>
			<span className="price">{props.item.price}</span>
			<div className="remove-button" onClick={deleteItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
