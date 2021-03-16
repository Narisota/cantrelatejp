import { createStore } from "redux";
import { RootReducer } from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const saveState = state => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("store-state", serializedState);
    } catch (err) {
        console.log("err :>> ", err);
    }
};

export const store = createStore(RootReducer as any, composeWithDevTools());

store.subscribe(() => {
    saveState(store.getState());
});
