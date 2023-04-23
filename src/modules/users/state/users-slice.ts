import { createSlice } from "@reduxjs/toolkit";
import { IUserProps } from "../models";

export const userInitialState: IUserProps = {};

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {},
});