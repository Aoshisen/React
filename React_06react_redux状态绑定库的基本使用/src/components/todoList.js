import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../store/actions/index";
function getTodo(todos, filterType) {
  switch (filterType) {
    case "All":
      return todos;
    case "Active":
      return todos.filter((item) => !item.completed);
    case "Complete":
      return todos.filter((item) => item.completed);
    default:
      throw new Error("Unknown filter: " + filterType);
  }
}
export default function TodoList(props) {
  let dispatch = useDispatch();
  let { filterType } = props;
  let { todos } = useSelector((state) => state);
  let todos_copy = getTodo(todos, filterType);
  return (
    <ul>
      {todos_copy.map((todo) => (
        <li
          key={todo.id}
          onClick={() => {
            dispatch(toggleTodo(todo.id));
          }}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
