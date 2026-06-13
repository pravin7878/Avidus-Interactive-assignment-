import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/auth/authSlice";
import taskReducer from "../redux/task/taskSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    },
});