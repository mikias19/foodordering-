import { useContext } from "react";
import { Cartctx } from "../../Store/store-cart";

export default function Order({ onCloseModal, onCheckout }) {
  const { cartItems, totalPrice, addToCart, removeFromCart } =
    useContext(Cartctx);
  console.log(totalPrice);
  return (
    <div className="mx-2 my-4 max-w-[50rem] w-[40rem] h-[30rem] overflow-auto">
      <h1 className="leading-loose font-bold text-3xl ">Your Cart</h1>
      {cartItems.length === 0 && (
        <h1 className="text-2xl leading-loose text-center text-slate-400 ">
          Empty Cart
        </h1>
      )}
      {cartItems &&
        cartItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex  items-center  justify-between px-2"
            >
              <div className="flex items-center justify-center">
                <h2 className="text-xl text-slate-400 pr-2">{item.name}</h2>
                <p className="text-slate-700 text-xl pr-2">-</p>
                <h2 className="text-slate-400 pr-2 font-medium">
                  {item.quantitiy}
                </h2>
                <p className="text-slate-700 text-xl pr-2">*</p>
                <h2 className="leading-loose text-slate-400 text-xl">
                  {`$${item.price}`}
                </h2>
              </div>
              <div className="flex items-center  justify-between mr-4 ">
                <button
                  type="button"
                  className="h-[30px] w-[30px] bg-slate-900 text-slate-100 text-xl rounded-full text-center mx-2  transition-transform duration-300 hover:bg-slate-800  active:scale-95 "
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <h2 className="text-xl leading-relaxed mx-2">
                  {item.quantitiy}
                </h2>
                <button
                  type="button"
                  className="h-[30px] w-[30px] bg-slate-900 text-slate-100 text-xl rounded-full text-center ml-2  transition-transform duration-300 hover:bg-slate-800  active:scale-95 "
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      {cartItems.length > 0 && (
        <div className="flex flex-col mt-4 items-end justify-center mr-[2rem]">
          <h2 className="text-center pr-0.5 text-2xl font-medium ">
            Total Price
          </h2>
          <h1 className="text-2xl text-slate-500 leading-loose ">
            {totalPrice}
          </h1>
        </div>
      )}
      <div className="w-full">
        <form
          className="flex justify-end mr-[4rem] item-center gap-3 mt-4"
          method="dialog"
        >
          <button className="text-2xl font-normal  p-3" onClick={onCloseModal}>
            Close
          </button>
          <button
            className="p-3 bg-amber-400 rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
            disabled={cartItems.length === 0}
            onClick={onCheckout}
          >
            Go to Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
