// import { createContext, useEffect, useState } from "react";

// export const Mealctx = createContext({
//   isLoading: false,
//   error: "",
//   meals: [],
// });

// export default function MealProvider({ children }) {
//   const [meals, setMeals] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     async function fetchMeal() {
//       setIsLoading(true);
//       try {
//         const response = await fetch("http://localhost:3000/meals");

//         if (!response.ok) {
//           throw new Error("Failled to fecth avaliable Meals");
//         }
//         const res = await response.json();
//         setMeals(res);
//       } catch (e) {
//         setError(e.message || "Something Went Wrong");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchMeal();
//   }, []);

//   return (
//     <Mealctx.Provider value={{ meals, isLoading, error }}>
//       {children}
//     </Mealctx.Provider>
//   );
// }
//

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
//   const response = await fetch("http://localhost:3000/meals");
//   return response.json();
// });

// const mealsSlice = createSlice({
//   name: "meals",
//   initialState: {
//     meals: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMeals.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMeals.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.meals = action.payload;
//       })
//       .addCase(fetchMeals.rejected, (state, action) => {
//         state.status = "failled";
//         state.error = action.error.message;
//       });
//   },
// });

// export default mealsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await fetch("http://localhost:3000/meals");
  if (!response.ok) {
    throw new Error("Failed to fetch meals"); // Fix error handling
  }
  return response.json();
});

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed"; // Fix typo
        state.error = action.error.message;
      });
  },
});

export default mealsSlice.reducer;
