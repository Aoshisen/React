import { Fragment } from "react";

export default function ToDoFilter(props) {
  let { setFilterType } = props;
  return (
    <Fragment>
      <span>Show</span>
      <button
        onClick={() => {
          setFilterType("All");
        }}
      >
        ShowAll
      </button>
      <button
        onClick={() => {
          setFilterType("Active");
        }}
      >
        ShowActive
      </button>
      <button
        onClick={() => {
          setFilterType("Complete");
        }}
      >
        ShowComplete
      </button>
    </Fragment>
  );
}
