import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import songSlice from "./songSlice";
import songsSaga from "./Saga/songsSaga";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
  },
  middleware: [saga],
});

saga.run(songsSaga);

export default store;
