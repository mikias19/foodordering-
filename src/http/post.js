import { useState } from "react";

export function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrders] = useState([]);
  const [errors, setError] = useState("");

  async function setOrder(orderData) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderData }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Some thing went wrong");
      }
      const res = await response.json();

      setOrders(res);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    errors,
    order,
    setOrder,
  };
}
