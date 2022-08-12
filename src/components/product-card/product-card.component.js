import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = (props) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => {
		dispatch(addItemToCart(cartItems, props.product));
	};
	return (
		<div className="product-card-container">
			<img src={props.product.imageUrl} alt={`${props.product.name}`} />
			<div className="footer">
				<span className="name">{props.product.name}</span>
				<span className="price">{props.product.price}</span>
			</div>
			<Button buttonType="inverted" onClick={addProductToCart}>
				Add to cart
			</Button>
		</div>
	);
};

export default ProductCard;
