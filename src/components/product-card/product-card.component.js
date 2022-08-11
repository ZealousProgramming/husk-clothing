import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = (props) => {
	const { addItemToCart } = useContext(CartContext);

	const addProductToCart = () => {
		addItemToCart(props.product);
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
