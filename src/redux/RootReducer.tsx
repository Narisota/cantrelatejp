export interface Product {
    product_id: number;
    name: string;
    price: number;
    stock: number;
}

export interface ProductInCart {
    product_id: number;
    name: string;
    price: number;
    stock: number;
    quantity: number;
}

export interface State {
    productsInCart: [
        {
            product_id: number;
            name: string;
            price: number;
            stock: number;
            quantity: number;
        }
    ];
}

const loadState = () => {
    try {
        let serializedState = localStorage.getItem("store-state");
        if (serializedState) {
            let state = JSON.parse(serializedState);
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
            let tmp = state.productsInCart || [];

            //if product is already in cart increase quantity instead of adding a new product
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].product_id === action.product!.product_id) {
                    tmp[i].quantity++;
                    return { ...state, productsInCart: tmp };
                }
            }
            let tmp2: any = action.product;
            tmp2.quantity = 1;

            tmp.push(tmp2);

            return { ...state, productsInCart: tmp };
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
