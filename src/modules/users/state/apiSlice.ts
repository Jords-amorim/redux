import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models";

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => "/users",
            providesTags: ["users"],
            transformResponse: (response: User[]) => {
                return response.reverse();
            },
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`,
        }),
        addUser: builder.mutation<User, User>({
            query: (user) => ({
                url: "/users",
                body: user,
                method: "POST",
            }),
            invalidatesTags: ["users"],
        }),
        updateUser: builder.mutation<User, User>({
            query: (user) => ({
                url: `/users/${user.id}`,
                body: user,
                method: "PATCH",
            }),
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation<object, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export default userApi;