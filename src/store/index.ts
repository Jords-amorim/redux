import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../modules/users/state/users-slice";
import userApi from "../modules/users/state/apiSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

// uma função middleware é executada entre processos