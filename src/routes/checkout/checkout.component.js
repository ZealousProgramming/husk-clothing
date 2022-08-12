import { useSelector } from "react-redux";

import {
	selectCartItems,
	selectCartSubtotal,
	selectCartCount,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
	// const { cartItems, cartCount, cartSubtotal } = useContext(CartContext);
	const cartItems = useSelector(selectCartItems);
	const cartCount = useSelector(selectCartCount);
	const cartSubtotal = useSelector(selectCartSubtotal);

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartCount > 0 ? (
				cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)
			) : (
				<h2>Cart is empty</h2>
			)}
			<span className="total">Subtotal: ${cartSubtotal} </span>
		</div>
	);
};

export default Checkout;
