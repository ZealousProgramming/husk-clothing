import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import { BUTTON_TYPE } from "../button/button.component";

import Button from "../button/button.component";

import "./product-card.styles.scss";
import { CategoryItem } from "../../store/categories/category.types";
import { FunctionComponent } from "react";

type ProductCardProps = {
	product: CategoryItem;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({product}) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => {
		dispatch(addItemToCart(cartItems, product));
	};
	return (
		<div className="product-card-container">
			<img src={product.imageUrl} alt={`${product.name}`} />
			<div className="footer">
				<span className="name">{product.name}</span>
				<span className="price">{product.price}</span>
			</div>
			<Button buttonType={BUTTON_TYPE.inverted} onClick={addProductToCart}>
				Add to cart
			</Button>
		</div>
	);
};

export default ProductCard;
