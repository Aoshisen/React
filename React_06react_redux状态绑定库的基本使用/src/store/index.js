import todos from "./reducers/todos";
import { createStore, combineReducers } from "redux";
//注意这里combineReducers里面接受的是一个对象形式的
export default createStore(combineReducers({ todos }));
