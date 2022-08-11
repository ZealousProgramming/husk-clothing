import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = (props) => {
	return (
		<div className="product-card-container">
			<img src={props.product.imageUrl} alt={`${props.product.name}`} />
			<div className="footer">
				<span className="name">{props.product.name}</span>
				<span className="price">{props.product.price}</span>
			</div>
			<Button buttonType="inverted">Add to cart</Button>
		</div>
	);
};

export default ProductCard;
