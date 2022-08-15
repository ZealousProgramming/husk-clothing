import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], item: CategoryItem): CartItem[] => {
	// Find if cartItems already has a item
	const itemFound = cartItems.find((ele) => ele.id === item.id);

	if (itemFound) {
		return cartItems.map((ele) =>
			ele.id === item.id ? { ...ele, quantity: ele.quantity + 1 } : ele
		);
	}

	return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => {
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

const deleteCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => {
	return cartItems.filter((ele) => ele.id !== item.id);
};

// Actions
export type SetShowCart = ActionWithPayload<CART_ACTION_TYPES.SET_SHOW_CART, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setShowCart = withMatcher((boolean: boolean): SetShowCart =>
	createAction(CART_ACTION_TYPES.SET_SHOW_CART, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], item: CategoryItem): SetCartItems => {
	const newCartItems = addCartItem(cartItems, item);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
	const newCartItems = removeCartItem(cartItems, item);
	return setCartItems(newCartItems);
};

export const deleteItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems  => {
	const newCartItems = deleteCartItem(cartItems, item);
	return setCartItems(newCartItems);
};
