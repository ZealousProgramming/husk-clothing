// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	// const { items } = useContext(CartContext);
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items" />
			{/* {items.map((item) => (
				<div className="cart-items" key={item.id}>
					<span>{item.name}</span>
				</div>
			))} */}
			<Button>CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
