import { useContext } from "react";
import { Mealctx } from "../../Store/store-meals";
import MealItem from "../MealItem/MealItem";
export default function Meal() {
  const { meals, isLoading, error } = useContext(Mealctx);
  console.log(meals, isLoading);
  return (
    <div className="w-full">
      {isLoading && <p>fetching</p>}
      {meals.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {meals.map((meal) => (
            <MealItem meal={meal} />
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
