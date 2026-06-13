import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
};

const taskSlice = createSlice({
    name: "task",

    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        addTask: (state, action) => {
            state.tasks.unshift(action.payload);
        },

        updateTaskState: (
            state,
            action
        ) => {
            state.tasks = state.tasks.map(
                (task) =>
                    task._id ===
                        action.payload._id
                        ? action.payload
                        : task
            );
        },

        deleteTaskState: (
            state,
            action
        ) => {
            state.tasks =
                state.tasks.filter(
                    (task) =>
                        task._id !==
                        action.payload
                );
        },
    },
});

export const {
    setLoading,
    setTasks,
    addTask,
    updateTaskState,
    deleteTaskState,
} = taskSlice.actions;

export default taskSlice.reducer;