import { useEffect } from "react";
import MealItem from "../MealItem/MealItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../../Store/store-meals";
export default function Meal() {
  const { meals, status, error } = useSelector((state) => state.meal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMeals());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  console.log(meals, "mikiassss");
  return (
    <div className="w-full">
      {/* {isLoading && <p>fetching</p>} */}
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
