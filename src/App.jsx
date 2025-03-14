import { useRef, useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Meal from "./Components/Meal/Meal";
import Modal from "./Components/Modal/Modal";
import CartProvider from "./Store/store-cart";
import MealProvider from "./Store/store-meals";
import Order from "./Components/Order/Order";
import Checkout from "./Components/Checkout/Checkout"; // Assuming you have a Checkout component

function App() {
  const orderModalRef = useRef();
  const checkoutModalRef = useRef();

  const [showModals, setShowModals] = useState({
    order: false,
    checkout: false,
  });

  function openOrderModal() {
    setShowModals((prev) => ({ ...prev, order: true }));
    orderModalRef.current.open();
  }

  function openCheckoutModal() {
    setShowModals((prev) => ({ ...prev, checkout: true }));
    checkoutModalRef.current.open();
  }

  function closeOrderModal() {
    orderModalRef.current.close();
    setShowModals((prev) => ({ ...prev, order: false }));
  }

  function closeCheckoutModal() {
    checkoutModalRef.current.close();
    setShowModals((prev) => ({ ...prev, checkout: false }));
  }
  useEffect(() => {
    if (showModals.order && orderModalRef.current) {
      orderModalRef.current.open();
    }
  }, [showModals.order]);

  useEffect(() => {
    if (showModals.checkout && checkoutModalRef.current) {
      checkoutModalRef.current.open();
    }
  }, [showModals.checkout]);
  return (
    <MealProvider>
      <CartProvider>
        <div className="bg-gradient-to-b from-stone-700 to-stone-800 min-h-screen w-full pb-10">
          {showModals.order && (
            <Modal ref={orderModalRef} onCloseModal={closeOrderModal}>
              <Order
                onCloseModal={closeOrderModal}
                onCheckout={openCheckoutModal}
              />
            </Modal>
          )}

          {showModals.checkout && (
            <Modal ref={checkoutModalRef} onCloseModal={closeCheckoutModal}>
              <Checkout onCloseModal={closeCheckoutModal} />
            </Modal>
          )}

          <Header onClickCart={openOrderModal} />
          <main className="max-w-[90%] w-[70rem] mx-auto pt-[8rem]">
            <Meal />
          </main>
        </div>
      </CartProvider>
    </MealProvider>
  );
}

export default App;
