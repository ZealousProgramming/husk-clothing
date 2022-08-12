import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	const navigate = useNavigate();
	const cartItems = useSelector(selectCartItems);

	const moveToCheckout = () => {
		navigate("checkout");
	};

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem key={item.id} item={item} />
				))}
			</div>
			<Button onClick={moveToCheckout}>CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
