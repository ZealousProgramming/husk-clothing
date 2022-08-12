import { CART_ACTION_TYPES } from "./cart.types.";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, item) => {
	// Find if cartItems already has a item
	const itemFound = cartItems.find((ele) => ele.id === item.id);

	if (itemFound) {
		return cartItems.map((ele) =>
			ele.id === item.id ? { ...ele, quantity: ele.quantity + 1 } : ele
		);
	}

	return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems, item) => {
	// Find if cartItems already has a item
	const itemFound = cartItems.find((ele) => ele.id === item.id);

	if (itemFound && itemFound.quantity === 1) {
		return cartItems.filter((ele) => ele.id !== item.id);
	}

	if (itemFound) {
		return cartItems.map((ele) =>
			ele.id === item.id ? { ...ele, quantity: ele.quantity - 1 } : ele
		);
	}

	return cartItems;
};

const deleteCartItem = (cartItems, item) => {
	return cartItems.filter((ele) => ele.id !== item.id);
};

export const setShowCart = (boolean) =>
	createAction(CART_ACTION_TYPES.SET_SHOW_CART, boolean);

export const addItemToCart = (cartItems, item) => {
	const newCartItems = addCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
	const newCartItems = removeCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, item) => {
	const newCartItems = deleteCartItem(cartItems, item);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
