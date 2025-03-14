import { createContext, useEffect, useState } from "react";

export const Mealctx = createContext({
  isLoading: false,
  error: "",
  meals: [],
});

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchMeal() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failled to fecth avaliable Meals");
        }
        const res = await response.json();
        setMeals(res);
      } catch (e) {
        setError(e.message || "Something Went Wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMeal();
  }, []);

  return (
    <Mealctx.Provider value={{ meals, isLoading, error }}>
      {children}
    </Mealctx.Provider>
  );
}
