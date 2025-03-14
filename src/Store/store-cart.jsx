import { createContext, useReducer, useContext } from "react";

export const Cartctx = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: (meal) => {},
  removeFromCart: (id) => {},
  reset: () => {},
});

function cartReducer(state, action) {
  if (action.type === "add") {
    const exitstingItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );
    let updatedCartItem;
    console.log(exitstingItemIndex);
    if (exitstingItemIndex !== -1) {
      updatedCartItem = [...state.cartItems];
      updatedCartItem[exitstingItemIndex] = {
        ...updatedCartItem[exitstingItemIndex],
        quantitiy: updatedCartItem[exitstingItemIndex].quantitiy + 1,
      };
    } else {
      let oldCartItem = [...state.cartItems];
      updatedCartItem = [{ ...action.payload, quantitiy: 1 }, ...oldCartItem];
    }
    let totalPrice = updatedCartItem.reduce(
      (acc, Item) => acc + Item.quantitiy * Item.price,
      0
    );

    return {
      ...state,
      cartItems: updatedCartItem,
      totalPrice: totalPrice,
    };
  }

  if (action.type === "remove") {
    const exitstingItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload
    );

    const existingItem = state.cartItems[exitstingItemIndex];
    let updatedCartItem;

    if (existingItem.quantitiy > 1) {
      updatedCartItem = [...state.cartItems];
      updatedCartItem[exitstingItemIndex] = {
        ...updatedCartItem[exitstingItemIndex],
        quantitiy: existingItem.quantitiy - 1,
      };
    } else {
      updatedCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    }
    let totalPrice = updatedCartItem.reduce(
      (acc, Item) => acc + Item.quantitiy * Item.price,
      0
    );

    return {
      ...state,
      cartItems: updatedCartItem,
      totalPrice: totalPrice,
    };
  }
  if (action.type === "reset") {
    return {
      cartItems: [],
      totalPrice: 0,
    };
  } else {
    return state;
  }
}

export default function CartProvider({ children }) {
  function addToCart(meal) {
    cartDispacher({ type: "add", payload: meal });
  }
  function removeFromCart(id) {
    cartDispacher({ type: "remove", payload: id });
  }
  function reset() {
    cartDispacher({ type: "reset" });
  }
  const [cartState, cartDispacher] = useReducer(cartReducer, {
    cartItems: [],
    totalPrice: 0,
  });
  return (
    <Cartctx.Provider
      value={{
        cartItems: cartState.cartItems,
        totalPrice: cartState.totalPrice,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        reset: reset,
      }}
    >
      {children}
    </Cartctx.Provider>
  );
}
