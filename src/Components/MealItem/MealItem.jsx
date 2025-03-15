import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Store/store-cart";

export default function MealItem({ meal }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  console.log(cartItems);
  return (
    <div
      className="bg-slate-900 flex flex-col rounded-lg shadow-md shadow-black text-center pb-8"
      key={meal.id}
    >
      <img
        src={`http://localhost:3000/${meal.image}`}
        alt={`${meal.image}`}
        className="rounded-lg object-contain"
      />
      <h1 className="text-slate-200 text-2xl leading-relaxed my-2 text-center">
        {meal.name}
      </h1>
      <div className=" flex w-full justify-center">
        <p className="bg-stone-700 leading-normal rounded-md px-2 py-1 w-[70px] text-amber-400 mb-1">
          {meal.price}
        </p>
      </div>
      <div className="text-slate-300 m-4 text-xl  leading-normal h-[130px] ">
        <p>{meal.description}</p>
      </div>
      <div className="mb-4 flex items-center justify-center">
        <button
          className="bg-amber-400 rounded-md px-4 py-2 text-xl  transition-all duration-300 hover:text-slate-400 hover:bg-amber-500 cursor-pointer  active:scale-95"
          onClick={() => dispatch(addToCart(meal))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
