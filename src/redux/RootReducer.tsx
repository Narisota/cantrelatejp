export interface Product {
    product_id: number;
    name: string;
    price: number;
    stock: number;
    option?: string;
    option_id?: number;
}

export interface ProductInCart {
    product_id: number;
    name: string;
    price: number;
    stock: number;
    quantity: number;
    option?: string;
    option_id?: number;
}

export interface State {
    productsInCart: [
        {
            product_id: number;
            name: string;
            price: number;
            stock: number;
            quantity: number;
            option?: string;
            option_id?: number;
        }
    ];
}

const loadState = () => {
    try {
        let serializedState = localStorage.getItem("store-state");
        if (serializedState) {
            let state = JSON.parse(serializedState);
            console.log("state :>> ", state);
            return state;
        }
    } catch (err) {
        console.log("err :>> ", err);
    }
};

const initState = loadState() || {
    productsInCart: [],
};

type Actions = {
    type: string;
    product?: Product;
    newQuantity?: number;
    productIndex?: number;
};

export const RootReducer = (state = initState, action: Actions) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART": {
            debugger;
            let products = loadState().productsInCart || [];
            console.log("products :>> ", products);
            console.log("action :>> ", action);

            //if product is already in cart increase quantity instead of adding a new product
            for (let i = 0; i < products.length; i++) {
                if (products[i].product_id === action.product!.product_id) {
                    //if product does not have an option
                    if (!!action.product && !action.product.option) {
                        products[i].quantity++;
                        return { ...state, productsInCart: products };
                    } else if (
                        products[i].option_id === action.product!.option_id
                    ) {
                        products[i].quantity++;
                        return { ...state, productsInCart: products };
                    }
                }
            }

            let newProduct: any = action.product;
            newProduct.quantity = 1;

            products.push(newProduct);
            return { ...state, productsInCart: products };
        }

        case "CHANGE_QUANTITY_ON_PRODUCT": {
            let productsInCart = state.productsInCart;
            if (action.newQuantity === 0) {
                //remove product if quantity is 0
                productsInCart.splice(action.productIndex!, 1);
            } else {
                productsInCart[
                    action.productIndex!
                ].quantity = action.newQuantity!;
            }
            return { ...state, productsInCart };
        }

        case "RESET_CART": {
            // delete localStorage items
            localStorage.setItem("store-state", " ");
            // dump state
            return {};
        }
        default:
            return state;
    }
};
