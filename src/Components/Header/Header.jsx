import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Cartctx } from "../../Store/store-cart";

export default function Header({ onClickCart }) {
  const { cartItems } = useContext(Cartctx);
  return (
    <header className="flex items-center justify-around gap-2 h-[7rem] w-full  mx-auto  fixed   bg-stone-800  z-100">
      <div className="flex items-center justify-center gap-x-4">
        <img
          alt="logo"
          src={logo}
          className="h-[50px] w-[50px] object-contain  rounded-full   border border-amber-500 "
        />
        <h1 className="text-4xl leading-loose text-amber-400 uppercase">
          ReactFood
        </h1>
      </div>
      <div className="text-xl animate-bounce">
        <button className="text-amber-500 cursor-pointer" onClick={onClickCart}>
          Cart<span className="pl-1 ">({cartItems.length})</span>
        </button>
      </div>
    </header>
  );
}
