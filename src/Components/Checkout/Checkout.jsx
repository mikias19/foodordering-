import Form from "../../Widget/Form/Form";
import { useContext, useState } from "react";
import { Cartctx } from "../../Store/store-cart";
export default function Checkout({ onCloseModal }) {
  const [order, setOrderCreated] = useState("");
  function handleOrdeCreated(message) {
    setOrderCreated(message);
  }
  const { totalPrice, reset } = useContext(Cartctx);

  function closeOrderModal() {
    onCloseModal();
    reset();
  }
  return (
    <div className="max-w-[60rem] w-[50rem] mx-4 my-4">
      {order.trim() === "" ? (
        <>
          <div className="flex items-start justify-center flex-col">
            <h1 className="leading-loose font-bold text-2xl mb-2">CheckOut</h1>
            <p className="text-slate-500">
              Total Amount <span className="pl-2">{`$${totalPrice}`}</span>
            </p>
          </div>
          <Form
            onCloseModal={onCloseModal}
            handleOrdeCreated={handleOrdeCreated}
          />
        </>
      ) : (
        <div className="text-center text-3xl leading-relaxed text-slate-800 font-medium">
          {order && order}
          <h2 className="text-2xl font-normal text-slate-900 leading-loose mt-2 text-center ">
            Thank Fot Your Order
          </h2>
          <form>
            <button
              className="text-xl w-[50%] bg-amber-400  rounded-lg px-3 py-2 mt-6"
              onClick={closeOrderModal}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
