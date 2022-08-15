import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectShowCart = createSelector(
	[selectCartReducer],
	(cart) => cart.showCart
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accum, item) => accum + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((accum, item) => accum + item.quantity * item.price, 0)
);
