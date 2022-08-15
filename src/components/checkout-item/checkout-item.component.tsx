import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
	addItemToCart,
	deleteItemFromCart,
	removeItemFromCart,
} from "../../store/cart/cart.action";

import "./checkout-item.styles.scss";
import { CartItem } from "../../store/cart/cart.types";
import { FunctionComponent } from "react";

type CheckoutItemProps = {
	item: CartItem;
}
const CheckoutItem: FunctionComponent<CheckoutItemProps> = (props) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const increaseQuantityHandler = () =>
		dispatch(addItemToCart(cartItems, props.item));
	const decreaseQuantityHandler = () =>
		dispatch(removeItemFromCart(cartItems, props.item));
	const deleteItemHandler = () =>
		dispatch(deleteItemFromCart(cartItems, props.item));

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
