import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "../features/teachers/teacherSlice";

export const store = configureStore({
  reducer: {
    teachers: teacherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;