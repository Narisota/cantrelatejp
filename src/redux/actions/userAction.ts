import { Product } from "../RootReducer";

export const addProductToCart = (product: Product) => {
    return {
        type: "ADD_PRODUCT_TO_CART",
        product,
    };
};

export const resetCart = () => {
    return { type: "RESET_CART" };
};

export const changeQuantityOnProduct = (
    newQuantity: number,
    productIndex: number
) => {
    return { type: "CHANGE_QUANTITY_ON_PRODUCT", newQuantity, productIndex };
};
