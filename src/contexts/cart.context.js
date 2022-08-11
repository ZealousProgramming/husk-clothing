import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	deleteItemFromCart: () => {},
	subtotal: () => {},
	showCart: false,
	setShowCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartSubtotal, setCartSubtotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(accum, item) => accum + item.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newSubtotal = cartItems.reduce(
			(accum, item) => accum + item.quantity * item.price,
			0
		);
		setCartSubtotal(newSubtotal);
	}, [cartItems]);

	const addItemToCart = (item) => {
		setCartItems(addCartItem(cartItems, item));
	};

	const removeItemFromCart = (item) => {
		setCartItems(removeCartItem(cartItems, item));
	};

	const deleteItemFromCart = (item) => {
		setCartItems(deleteCartItem(cartItems, item));
	};

	const value = {
		showCart,
		setShowCart,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		deleteItemFromCart,
		cartCount,
		cartSubtotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
