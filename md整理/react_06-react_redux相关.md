# redux

-   Redux 是一个独立的 JavaScript 状态管理库
-   <https://www.redux.org.cn/>

# 安装 Redux

```bash
npm i redux
yarn add redux
```

### 核心概念

理解 Redux 核心几个概念与它们之间的关系

-   state 状态
-   reducer 纯函数
-   store 仓库
-   action 动作

#### state 对象

通常我们会把应用中的数据存储到一个对象树（Object Tree） 中进行统一管理，我们把这个对象树称为：state

##### state 是只读的

这里需要注意的是，为了保证数据状态的可维护和测试，不推荐直接修改 state 中的原数据

##### 通过纯函数修改 state

什么是纯函数？

###### 纯函数

1.  相同的输入永远返回相同的输出
2.  不修改函数的输入值
3.  不依赖外部环境状态
4.  无任何副作用

使用纯函数的好处

1.  便于测试
2.  有利重构

#### action 对象

我们对 state 的修改是通过 reducer 纯函数来进行的，同时通过传入的 action 来执行具体的操作，action 是一个对象

-   type 属性 : 表示要进行操作的动作类型，增删改查……
-   payload属性 : 操作 state 的同时传入的数据

但是这里需要注意的是，我们不直接去调用 Reducer 函数，而是通过 Store 对象提供的 dispatch 方法来调用

#### Store 对象

为了对 state，Reducer，action 进行统一管理和维护，我们需要创建一个 Store 对象

## redux 三大原则

-   单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
-   State 是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
-   使用纯函数来执行修改

## redux API

-   createStore(reducer, [preloadedState], enhancer); 
    -   reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
    -   [preloadedState] \(any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 - reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
    -   enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
    -   返回值 (Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。
-   reducer 
    -   reducer(state,action)

```js
import {createStore} from "redux";

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
function reducer(state={
  count: 1
},action){
  switch(action.type){
      case "ADD":
        state.count++;
        return {...state};//返回修改后的新的state
      case "MINUS":
        state.count--;
        return {...state};
  }
  return state;
}
const store = createStore(reducer);

window.onload = function(){
  let addBtn = document.createElement("button");
  addBtn.innerHTML = "++";
  addBtn.onclick=()=>{
    store.dispatch({
      type:"ADD"
    })
  };
  document.body.appendChild(addBtn); 
  let p = document.createElement("p");
  render();
  document.body.appendChild(p); 
  let minusBtn = document.createElement("button");
  minusBtn.innerHTML = "--";
  minusBtn.onclick=()=>{
    store.dispatch({
      type:"MINUS"
    })
  };
  document.body.appendChild(minusBtn); 
  store.subscribe(render);
  function render(){
    p.innerHTML = store.getState().count;
  }

};


```

-   Store 
    -   getState()
    -   dispatch(action)
    -   subscribe(listener)
    -   replaceReducer(nextReducer)

```js
import {createStore} from "redux";
function reducer(state={
  count: 1
},action){
  switch(action.type){
      case "ADD":
        state.count++;
        return {...state};//返回修改后的新的state
      case "MINUS":
        state.count--;
        return {...state};
  }
  return state;
}
const store = createStore(reducer);

window.onload = function(){
  let addBtn = document.createElement("button");
  addBtn.innerHTML = "++";
  addBtn.onclick=()=>{
    store.dispatch({
      type:"ADD"
    })
  };
  document.body.appendChild(addBtn); 
  let p = document.createElement("p");
  render();
  document.body.appendChild(p); 
  let minusBtn = document.createElement("button");
  minusBtn.innerHTML = "--";
  minusBtn.onclick=()=>{
    store.dispatch({
      type:"MINUS"
    });
    console.log(store.getState());
  };
  document.body.appendChild(minusBtn); 
  let unsubscribe = store.subscribe(render);
    //取消监听数据变化而重新渲染视图
  setTimeout(()=>{
    unsubscribe();
  },2000);
  function render(){
    p.innerHTML = store.getState().count;
  }
};
```

-   combineReducers(reducers)
      将 reducer 函数拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分
    

```js
const store = createStore(
    combineReducers({reducer})
);
```

-   applyMiddleware(...middlewares) 中间件

```js
import axios from "axios";
function getListData(type) {
    //因为这不是一个自定义Hooks所以不能使用useDispatch()所以只能使用
    // const store = createStore(reducer,applyMiddleware(thunk));来达到在普通函数中使用diapatch来操作数据
    return (dispatch)=>{
        dispatch({
            type: "LOADING"
        });
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${type}&limit=10`)
            .then(res => {
                dispatch({
                    type: "LOAD",
                    data: res.data.data
                })
            }, () => {
                dispatch({
                    type: "LOAD",
                    data: []
                })
            })
    }
    
}

export {getListData};
```

```js
const store = createStore(reducer,applyMiddleware(thunk));
```

## react-redux

react项目中的 redux 绑定库

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store/index";s
import App from './app';
ReactDOM.render(
 <Provider store={store}>
    <App />,
 </Provider>,
 document.getElementById('root')
);
```

-   connect() -- 高阶函数:传入数据，返回一个函数

```js
import React, { Component } from 'react';
import "./index.css";
import AddMessage from './addMessage';
import MessageList from './messageList';
import { connect } from 'react-redux';
function App(props){
    //let {data} = props;
    console.log(props);
    let {data} = props;
    return <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage />
        {data.length>0?<MessageList 
            data={data}
        />:""}
    </section>;
}
/*
    let cb= connect((state)=>{...state})  

    state => 返回值
        注意返回值必须是一个对象

    let newComponent = cb(component);

    通过 connect 可以 让组件获取到 state 和 dispatch

*/
App = connect(state=>state)(App)

export default App;

```

-   useDispatch 获取 dispatch
-   useStore 获取 store
-   useSelector 获取 state 

```js
import React, { Component } from 'react';
import "./index.css";
import AddMessage from './addMessage';
import MessageList from './messageList';
import { useSelector, useDispatch, useStore } from 'react-redux';
/*
    react-redux 的 hooks
        useSelector 用户获取 state
            useSelector(state=>我们需要的state的相关数据);
        useDispatch 获取 dispatch方法 

        useStore 获取 store

*/
function App(){
    let data = useSelector(state=>state);
    let dispatch = useDispatch();
    let store = useStore();
    console.log(data,dispatch,store);
    return <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage />
        {data.length>0?<MessageList 
            data={data}
        />:""}
    </section>;
}

export default App;
import React, { Component } from 'react';
import "./index.css";
import AddMessage from './addMessage';
import MessageList from './messageList';
import { useSelector, useDispatch, useStore } from 'react-redux';
/*
    react-redux 的 hooks
        useSelector 用户获取 state
            useSelector(state=>我们需要的state的相关数据);
        useDispatch 获取 dispatch方法 

        useStore 获取 store

*/
function App(){
    let data = useSelector(state=>state);
    let dispatch = useDispatch();
    let store = useStore();
    console.log(data,dispatch,store);
    return <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage />
        {data.length>0?<MessageList 
            data={data}
        />:""}
    </section>;
}

export default App;
```

## 中间件

更新的过程中，去做一些其他的事情，
dispatch ---> reducer 更新state
dispatch --> 中间件 --> reducer

## 异步操作中间件

-   redux-thunk
    -   参数是对象，直接调用 reducer 修改我们的 state
    -   参数是函数，调用该函数，并且把 dispatch 和 getState 传递我们的函数，可以在函数中，进行异步操作

## 异步请求数据

1.  利用thunk中间件，在函数中完成相应的逻辑并在组件中调用函数返回一个对象（相当于一个高阶的action）在dispatch函数中调用

-   函数中的逻辑

```js
import axios from "axios";
function getListData(type) {
    //因为这不是一个自定义Hooks所以不能使用useDispatch()所以只能使用
    // const store = createStore(reducer,applyMiddleware(thunk));来达到在普通函数中使用diapatch来操作数据
    return (dispatch)=>{
        dispatch({
            type: "LOADING"
        });
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${type}&limit=10`)
            .then(res => {
                dispatch({
                    type: "LOAD",
                    data: res.data.data
                })
            }, () => {
                dispatch({
                    type: "LOAD",
                    data: []
                })
            })
    }
    
}

export {getListData};

```

-   reducer里面的逻辑

```js
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";

function reducer(state={
    data: [],
    loading: false
},action){
    switch(action.type){
        case "LOADING": // 正在获取数据
            return {
                data:[],
                loading: true
            }
        case "LOAD"://数据获取完成有数据
            return {
                data:action.data,
                loading: false
            }
    }
    return state;
}
//添加一个中间件
const store = createStore(reducer,applyMiddleware(thunk));

export default store;
```

-   调用组件里面的逻辑

```js

import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getListData} from "./store/action";
function List() {
    let { type = "all" } = useParams();
    let { loading, data } = useSelector(state => state);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListData(type));
    }, [type]);
    return (<Fragment>
        {loading ?
            "数据获取中……"
            :
            (
                data.length > 0 ? (
                    <ul className="list">
                        {data.map(item => (<li key={item.id}>{item.title}</li>))}
                    </ul>
                ) : "暂无数据"
            )}
    </Fragment>
    );
}

export default List;
```

2.在函数式组件中利用Hooks直接操作store

-   在store中定义的仓库

```js

//直接定义仓库就行了,不需要那么麻烦需要传递给高阶对的action函数参数
import {createStore} from "redux";

function reducer(state={
    data: [],
    loading: false
},action){
    switch(action.type){
        case "LOADING": // 正在获取数据
            return {
                data:[],
                loading: true
            }
        case "LOAD"://数据获取完成有数据
            return {
                data:action.data,
                loading: false
            }
    }
    return state;
}

const store = createStore(reducer);

export default store;
```

-   在函数式组件中请求数据

```js
import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
function List() {
    let {type = "all"} = useParams();
    let { loading, data } = useSelector(state => state);
    let dispatch = useDispatch();
    /*
      获取相关数据：
          1. 数据获取中 -- 显示数据获取中
          2. 获取数据完成进行展示 -- 根据数据展示视图
          3. 数据获取失败，或者没有数据的情况 -- 显示暂无数据
    */
   useEffect(()=>{
        dispatch({
            type:"LOADING"
        });
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${type}&limit=10`)
            .then(res=>{
                dispatch({
                    type:"LOAD",
                    data: res.data.data
                }),
                dispatch({
                    type:"LOAD",
                    data:[]
                })
            }
   )},[type]);
    //console.log(data);
    return (<Fragment>
        {loading ?
            "数据获取中……"
            :
            (
                data.length > 0 ? (
                    <ul className="list">
                        {data.map(item=>(<li key={item.id}>{item.title}</li>))}
                    </ul>
                ) : "暂无数据"
            )}
    </Fragment>
    );
}

export default List;
```

或者把相关逻辑抽离出来定义成一个自定义Hooks

```js
import {useDispatch} from "react-redux";
import axios from "axios";
function useListData(){
    let dispatch = useDispatch();
    return (type)=>{
        dispatch({
            type: "LOADING"
        });
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${type}&limit=10`)
            .then(res => {
                dispatch({
                    type: "LOAD",
                    data: res.data.data
                })
            },()=>{
                dispatch({
                    type:"LOAD",
                    data:[]
                })
            })
    }
}
export {useListData};
```

在需要用的地方使用自定义Hooks就行了

```js
import {useDispatch} from "react-redux";
import axios from "axios";
function useListData(){
    let dispatch = useDispatch();
    return (type)=>{
        dispatch({
            type: "LOADING"
        });
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${type}&limit=10`)
            .then(res => {
                dispatch({
                    type: "LOAD",
                    data: res.data.data
                })
            },()=>{
                dispatch({
                    type:"LOAD",
                    data:[]
                })
            })
    }
}
export {useListData};
```
