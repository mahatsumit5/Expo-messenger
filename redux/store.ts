import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import { emptySplitApi } from "./api/index";
export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      emptySplitApi.middleware
    ),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
