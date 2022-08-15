import { useDispatch, useSelector } from "react-redux";

import {
	selectShowCart,
	selectCartCount,
} from "../../store/cart/cart.selector";
import { setShowCart } from "../../store/cart/cart.action";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartCount);
	const showCart = useSelector(selectShowCart);

	const toggleShowCart = () => dispatch(setShowCart(!showCart));

	return (
		<div className="cart-icon-container" onClick={toggleShowCart}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cartCount}</span>
		</div>
	);
};

export default CartIcon;
