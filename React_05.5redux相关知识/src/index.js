import { createStore } from "redux";

/*
  store 仓库
    用来管理 state
    dispatch：调用 dispatch 方法，可以向 store 发起 action，store 会调用 reducer，将 action 传递给 reducer
    getState：获取 store 中存储的 state
    subscribe：用于监听 state 变化，或取消监听

  reducer 用于创建和修改state
    纯函数：
      1. 相同的输入永远返回相同的输出
      2. 不修改函数的输入值
      3. 不依赖外部环境状态
      4. 无任何副作用

  action 修改动作
    action 本质就是一个对象，该对象必须有 type 属性，type 属性中，描述的是我们要对 state 做出哪种修改，reducer中会接接收到 action 然后，完成对state的修改

  state 状态

 


*/
// 纯函数
function reducer(
  state = {
    count: 1,
  },
  action
) {
  switch (action.type) {
    case "ADD":
      state.count++;
      return { ...state }; //返回修改后的新的state
    case "MINUS":
      state.count--;
      return { ...state };
    default:
      return { ...state };
  }
  return state;
}
const store = createStore(reducer);

window.onload = function () {
  let addBtn = document.createElement("button");
  addBtn.innerHTML = "++";
  addBtn.onclick = () => {
    store.dispatch({
      type: "ADD",
    });
  };
  document.body.appendChild(addBtn);
  let p = document.createElement("p");
  render();
  document.body.appendChild(p);
  let minusBtn = document.createElement("button");
  minusBtn.innerHTML = "--";
  minusBtn.onclick = () => {
    store.dispatch({
      type: "MINUS",
    });
  };
  document.body.appendChild(minusBtn);
  store.subscribe(render);
  function render() {
    p.innerHTML = store.getState().count;
  }
};
