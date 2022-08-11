import { createContext, useState } from "react";
// import {
// 	onAuthStateChangedListener,
// 	createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";

import PRODUCTS from "../shop-data.json";

// As the actual value you want to access
export const ProductsContext = createContext({
	products: [],
});

// Literal component
export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState(PRODUCTS);
	const value = { products };

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
