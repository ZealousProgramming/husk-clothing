import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
	SET_CART_ITEMS = "cart/SET_CART_ITEMS",
	SET_SHOW_CART = "cart/SET_SHOW_CART",
	SET_CART_COUNT = "cart/SET_CART_COUNT",
	SET_CART_SUBTOTAL = "cart/SET_CART_SUBTOTAL",
};

export type CartItem = CategoryItem & {
	quantity: number;
}