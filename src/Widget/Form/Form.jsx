import { useActionState } from "react";
import Input from "../Input/Input";
import { useContext } from "react";
import { Cartctx } from "../../Store/store-cart";
import { useHttp } from "../../http/post";

export default function Form({ onCloseModal, handleOrdeCreated }) {
  const { cartItems, totalPrice } = useContext(Cartctx);
  const { isLoading, errors, order, setOrder } = useHttp();
  function verfiyNotEmpty(text) {
    return text !== "";
  }
  function verifyEmail(email) {
    return email.includes("@");
  }
  function checkoutAction(prevData, formData) {
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const street = formData.get("street").trim();
    const postalCode = formData.get("postal-code").trim();
    const city = formData.get("city").trim();
    console.log(name, email, street, postalCode, city);

    let error = [];

    if (!verifyEmail(email)) {
      error.push("Please enter valid email address!");
    }
    if (!verfiyNotEmpty(name)) {
      error.push("Please enter name");
    }
    if (!verfiyNotEmpty(street)) {
      error.push("Please enter street address");
    }
    if (!verfiyNotEmpty(postalCode)) {
      error.push("Please enter postal-code");
    }
    if (!verfiyNotEmpty(city)) {
      error.push("Please enter city");
    }
    if (error.length > 0) {
      return {
        error: error,
        customer: {
          name,
          email,
          street,
          "postal-code": postalCode,
          city,
        },
      };
    }

    const orderData = {
      items: cartItems,
      customer: {
        name,
        email,
        street,
        "postal-code": postalCode,
        city,
      },
    };
    setOrder(orderData);

    return {
      isLoading,
      errors,
      order,
      error: "",
      customer: {
        name: "",
        email: "",
        street: "",
        "postal-code": "",
        city: "",
      },
    };
  }

  const [formState, formAction, isFormActionPending] = useActionState(
    checkoutAction,
    {
      error: "",
      customer: {
        name: "",
        email: "",
        street: "",
        "postal-code": "",
        city: "",
      },
    }
  );

  if (order.message && order.message.trim() !== "") {
    handleOrdeCreated(order.message);
  }

  return (
    <div className="flex justify-between items-start gap-6">
      <form className="mt-4  max-w-[30rem] w-[25rem]  " action={formAction}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          defaultValue={formState.customer.name}
        />
        <Input
          label="E-Mail Address"
          type="text"
          name="email"
          defaultValue={formState.customer.email}
        />
        <Input
          label="Street"
          type="text"
          name="street"
          defaultValue={formState.customer.street}
        />
        <div className="flex items-center justify-between gap-2">
          <Input
            label="Postal Code"
            type="text"
            name="postal-code"
            defaultValue={formState.customer["postal-code"]}
          />
          <Input
            label="City"
            type="text"
            name="city"
            defaultValue={formState.customer.city}
          />
        </div>
        <div className=" max-w-[80rem] w-[70rem] flex items-center justify-center gap-4 mt-4">
          <button className="text-xl" onClick={onCloseModal}>
            Close
          </button>
          <button className="rounded-lg bg-amber-400 px-3 py-2 text-xl text-slate-700 transition-all active:scale-95 hover:bg-amber-500 hover:text-slate-300">
            {isLoading ? "Submiting..." : "Submit Order"}
          </button>
        </div>
      </form>
      {errors && (
        <div className="w-full  flex flex-col justify-center items-end mt-10 border border-slate-400 rounded-lg ml-4 pb-4">
          <li
            key={index}
            className="w-[20rem] mt-4 ml-2  list-none font-medium text-xl leading-relaxed text-red-300"
          >
            {errors}
          </li>
        </div>
      )}
      {formState?.error && (
        <div className="w-full  flex flex-col justify-center items-end mt-10 border border-slate-400 rounded-lg ml-4 pb-4">
          {formState?.error.map((error, index) => (
            <li
              key={index}
              className="w-[20rem] mt-4 ml-2  list-none font-medium text-xl leading-relaxed text-red-300"
            >
              {error}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
