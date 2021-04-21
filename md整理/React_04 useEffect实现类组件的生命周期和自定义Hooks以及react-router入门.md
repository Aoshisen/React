## 对于之前的知识点的补充
### useEffect函数来实现组件中的生命周期
- useEffect()副作用函数，定义在组件内部，基本语法useEffect(fn,[依赖参数]),
- 当==没有==第二个参数时，组件==挂载或者更新==的时候执行（很好理解阿，你他瞄的什么都没有，那我就当组件状态改变的时候执行一遍，这样就不会挨骂拉，）
- 当第二参数为一个==空数组==的时候 (组件挂载的时候执行,什么东西都不需要，那只有在挂载的时候才有这么奇怪的需求拉)
- 如果想在更新完之后执行,那么可以在函数外定义一个参数isMount，在挂载完成之后改变其值，然后再判断一下isMount的值，**注意依赖项不设置**；
- 如果useEffect有依赖参数，那么这个useEffect会在挂载完之后执行，以及该依赖值更新之后执行
```javascript
import React, { useEffect, useState } from 'react';
/* 
  useState(initailVal)
  useEffect: 副作用函数：
      useEffect(()=>{
        //副作用要处理的事情，比如之前在组件更新时让一个输入框获得焦点的逻辑
        //依赖的参数，就是这个函数只检测依赖参数里面#### Redirect 组件

##### to
的值改变或者更新才去执行这个副作用函数，并且去重新渲染视图
      },[依赖的参数])
      1.useEffect()如果不写第二个依赖参数的数组，这个函数会在挂载完成或者式更新完成之后执行
      2.如果想在挂载完之后执行；第二个参数为一个空数组
      3.如果想在更新完之后执行,那么可以在函数外定义一个参数isMount，在挂载完成之后改变其值，然后再判断一下isMount的值，注意依赖项不设置；
      4. 如果useEffect有依赖参数，那么这个useEffect会在挂载完之后执行，以及该依赖值更新之后执行
*/
let isMount=false;
function App() {
  let [count,setCount]=useState(0);
  let [name,setName]=useState("Ass")
  // let data=useState(0)
  // console.log(data);
  useEffect(
    ()=>{
      console.log("组件挂载或者是更新完成之后执行 ")
    }
  )

  useEffect(()=>{
    console.log("组件挂载完成之后执行 ")
  },[])

  useEffect(()=>{
    if(isMount){
      console.log("组件更新")
    }
    isMount=true
  })
  useEffect(()=>{
    console.log("依赖的参数更新了")
  },[count])
  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={()=>{
        // 这个地方和之前类组件的不同这里在小括号里面可以直接写改变的逻辑,而不用像之前那样需要在小括号里面需要一个对象的形式
        setCount(count+1)
      }}>自增</button>
            <p>{name}</p>
      <button onClick={()=>{
        setName("Aoshisen")
      }}>改变名字</button>
    </div>
  );
}

export default App;
```

*useEffect 的return的用法：在组件卸载的时候做的相应逻辑*

```javascript
import Child from "./child"
/* 
useEffect的返回函数: 相当于之前的class版本里面的实现拿到还未更新之前的状态的一个生命周期
        执行流程是这样的：组件生成虚拟DOM————>返回函数组件更新完成————>副作用函数
    
*/
function App() {
  let [isShow,changeShow]=useState(true);
  return (
    <Fragment>
    {isShow?<Child changeShow={changeShow}/>:""}
    <button onClick={()=>{
      changeShow(!isShow)
    }}>显示隐藏</button>
    </Fragment>
    );
}

export default App;
```
子函数：

```javascript
import React, { useEffect } from 'react';
/* 
useEffect的返回函数: 相当于之前的class版本里面的实现拿到还未更新之前的状态的一个生命周期
        执行流程是这样的：组件生成虚拟DOM————>返回函数组件更新完成————>副作用函数
    所以依赖为空数组，那么该组件会在挂载完成之后执行，然后在组件即将卸载的时候执行return 函数
    
*/
function Child() {
  useEffect(()=>{
    console.log("挂载完成");
    return ()=>{
      console.log("即将卸载")
    }
  },[])
  return (
    <div style={{
      width:"100px",
      height:"100px",
      backgroundColor:"red"

    }}></div>
    );
}

export default Child;
```


**useRef存储值** 
*这个方法可以拿到更新前的状态*

```javascript
import React, { useEffect, useRef, useState } from 'react';
function Child() {
  let [count,changeCount]=useState(0)
  let previousCount=useRef(count)
  let countP=useRef()
  let initCount=useRef(count)
  // 如果useRef用来存储值的话,那么这个值是不会随着状态改变而改变的
  useEffect(()=>{
    console.log(previousCount.current)
    console.log(count)
    //需要手动给previousCount更新值
    previousCount.current=count
  })
  //那么可以用useRef来定义最开始的初始数据然后再在之后的更新中判断其初始值来判断是否为第一次挂载或者是更新(解决useEffect，没有第二个参数就是在更新或者是挂载的时候执行副作用函数，抽离单个生命先
  // 周期需要在外部定义一个状态的问题)
  useEffect(()=>{
    if(initCount.current===count){
      console.log("挂载阶段")
    }
    else{
      console.log("更新阶段")
    }
  })
  return (
    <div>
      <p ref={countP}>{count}</p>
      <button onClick={
        ()=>{
          changeCount(++count)
          // console.log(stateCount)
        }
}>增加</button>
    </div>
    );
}

export default Child;
```
**自定义Hooks**

```javascript
import React, { Fragment, useEffect, useState } from 'react';
function useScrollY(){
  //通过useState定义初始值和修改值的方法，当窗口滚动的时候改变scrollY的值；并且返回scrollY，并且返回一个定义scrollY的方法
  let [scrollY,setScrollY]=useState(window.scrollY);
  //当组件卸载的时候清除定义在全局的方法
  useEffect(()=>{
    return ()=>{
      window.onscroll=null
    }
  },[])
  window.onscroll=()=>{
    setScrollY(window.scrollY)
  }
  return [scrollY,(newScrollY)=>{
    // 设置scrollY的值，并且返回到滚动到定义的值的位置
    window.scrollTo(0,newScrollY);
    setScrollY(newScrollY);
  }]
};


function App() {
  let [scrollY,setScrollY]=useScrollY()
  return (
    <Fragment>
      <style>
        {
          `
          div {
            
            width:200px;
            height:200px;
            font:100px/200px "宋体";
            text-align:center;
            border:1px solid #000;
            margin:10px auto;

          }
          #root{
            border:none;
          }
          span {
            width:50px;
            position:absolute;
            backgroundcolor:black;
            font:12px/20px "宋体";
            background:black;
            color:white;
            top:200px;
            left:20px;
          }
          `
        }
      </style>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <span 
      style={{
        top:200+scrollY+"px"
      }}
      onClick={
        ()=>{
          setScrollY(0)
        }
      }
      >{scrollY}</span>

    </Fragment>
    );
}

export default App;
//自定义Hooks 只能定义在组件的最外层，再自定义Hooks中可以调用react的hooks，
// 和普通函数的区别：有一套规则：只能在react函数中调用hooks（react函数组件，react自定义Hooks）
//注意：只能在最顶层使用Hooks ，判断里面不行，for循环里面不行
```

### 路由 
路由：根据不同的url规则，给用户展示不同的视图(页面)
当应用变得复杂的时候，就需要分块的进行处理和展示，传统模式下，我们是把整个应用分成了多个页面，然后通过 URL 进行连接。但是这种方式也有一些问题，每次切换页面都需要重新发送所有请求和渲染整个页面，不止性能上会有影响，同时也会导致整个 JavaScript 重新执行，丢失状态。

### SPA

Single Page Application : 单页面应用，整个应用只加载一个页面（入口页面），后续在与用户的交互过程中，通过 DOM 操作在这个单页上动态生成结构和内容

**优点：**

- 有更好的用户体验（减少请求和渲染和页面跳转产生的等待与空白），页面切换快
- 重前端，数据和页面内容由异步请求（AJAX）+ DOM 操作来完成，前端处理更多的业务逻辑

**缺点：**

- 首次进入处理慢
- 不利于 SEO

### SPA 的页面切换机制

虽然 SPA 的内容都是在一个页面通过 JavaScript 动态处理的，但是还是需要根据需求在不同的情况下分内容展示，如果仅仅只是依靠 JavaScript 内部机制去判断，逻辑会变得过于复杂，通过把 JavaScript 与 URL 进行结合的方式：JavaScript 根据 URL  的变化，来处理不同的逻辑，交互过程中只需要改变 URL 即可。这样把不同 URL 与 JavaScript 对应的逻辑进行关联的方式就是路由，其本质上与后端路由的思想是一样的。

#### 前端路由

前端路由只是改变了 URL 或 URL 中的某一部分，但一定不会直接发送请求，可以认为仅仅只是改变了浏览器地址栏上的 URL 而已，JavaScript 通过各种手段处理这种 URL 的变化，然后通过 DOM 操作动态的改变当前页面的结构

- URL 的变化不会直接发送 HTTP 请求
- 业务逻辑由前端 JavaScript 来完成

目前前端路由主要的模式：
- 基于 URL Hash 的路由
- 基于 HTML5 History API 的路由
https://developer.mozilla.org/zh-CN/docs/Web/API/History_API

## React Router
理解了路由基本机制以后，也不需要重复造轮子，我们可以直接使用 React Router 库
https://reacttraining.com/react-router/

React Router 提供了多种不同环境下的路由库

- web
- native

### 基于 Web 的 React Router

基于 web 的 React Router 为：react-router-dom

### 安装

```bash
npm i -S react-router-dom
```
### 组件

#### BrowserRouter 组件 -- history

     基于 HTML5 History API 的路由组件

#### HashRouter 组件 -- hash

    基于 URL Hash 的路由组件

#### Route 组件

    通过该组件来设置应用单个路由信息，Route 组件所在的区域就是就是当 URL 与当前 Route 设置的 path 属性匹配的时候，后面 component 将要显示的区域

##### exact

    exact 属性表示路由使用 精确匹配模式，非 exact 模式下 '/' 匹配所有以 '/' 开头的路由

#### Link 组件

  Link 组件用来处理 a 链接 类似的功能（它会在页面中生成一个 a 标签），但设置这里需要注意的，react-router-dom 拦截了实际 a 标签的默认动作，然后根据所有使用的路由模式（Hash 或者 HTML5）来进行处理，改变了 URL，但不会发生请求，同时根据 Route 中的设置把对应的组件显示在指定的位置

##### to 属性
     to 属性类似 a 标签中的 href
#### Switch 组件

    该组件只会渲染首个被匹配的组件


综合示例：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import {BrowserRouter} from "react-router-dom"

/*
react-router-dom:
<BrowserRouter>--基于 history
<HashRouter> --基于 hash 
*/
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
,
  document.getElementById('root')
);
```
App组件：

```javascript
import React, { Fragment } from "react"
import { Route,Switch } from "react-router-dom"
import IndexView from "./view/indexView"
import JoinView from "./view/joinView"
import Page404 from "./view/page404"
import PageView from "./view/pageView"
import Nav from "./components/nav"
		/*
		Route 组件 关联url 和视图组件 
		 path 当path和url匹配时，渲染route关联的组件
		 component 当path 关联成功时 要显示的组件
		 */
/*

 匹配规则:默认情况下，path是一种模糊匹配，当当前url以path开始时，则认定匹配
         想要精确匹配就要设置精确匹配 ：设置exact=true 或者是exact
         严格匹配：非严格模式：z也能匹配成功 设置strict 注意strict 不能直接设置，需要设置了精确匹配，然后再设置strict
         多路径匹配：在path里面定义一个数组 ，数组里面是可以访问该页面的路径，注意这里的数组要定义成插值的形式
         当path为空或者是没有path时，该Route代表所有路径都匹配

  Switch 组件类似于switch语句：一项匹配成功则不匹配后续视图
*/
export default function App(){
  return (
    <Fragment>
      <Nav />
      <Switch>
      <Route path={["/","/home","/index"]} component={IndexView} exact />
      <Route path="/page" component={PageView} exact />
      <Route path="/join" component={JoinView} exact />
      <Route  component={Page404}/>
      </Switch>

    </Fragment>
  )
}
```





