import { Fragment, useState } from "react";
import AddToDo from "./components/addTodo";
import { useSelector } from "react-redux";
import TodoList from "./components/todoList";
import TodoFilter from "./components/todoFilter";
export default function App() {
  // let store = useStore();
  let state = useSelector((state) => state);
  console.log(state);
  let [filterType, setFilterType] = useState("All");
  return (
    <Fragment>
      <AddToDo />
      <TodoList filterType={filterType} />
      <TodoFilter setFilterType={(text) => setFilterType(text)} />
    </Fragment>
  );
}
