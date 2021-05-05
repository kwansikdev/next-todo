import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import todo from "./todo";

// const rooteReducer = combineReducers({
//   todo,
// });

// const reducer = (state: any, action: any) => {
//   if (action.type === HYDRATE) {
//     const nextState = { ...state, ...action.payload };
//     return nextState;
//   }
//   return rooteReducer(state, action);
// };

// // 스토어 타입
// export type RootState = ReturnType<typeof rooteReducer>;

// //미들웨어 적용을 위한 스토어 enhancer
// const bindMiddleware = (middleware: any) => {
//   if (process.env.NODE_ENV !== "production") {
//     const { composeWithDevTools } = require("redux-devtools-extension");

//     return composeWithDevTools(applyMiddleware(...middleware));
//   }

//   return applyMiddleware(...middleware);
// };

// const initStore = () => {
//   return createStore(reducer, bindMiddleware([]));
// };

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

const rooteReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;

    return nextState;
  }
  return rooteReducer(state, action);
};

export type RootState = ReturnType<typeof rooteReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

export const wrapper = createWrapper(initStore);
