### state 和 setState

- setState(updater, [callback])
  - updater: 更新数据，里面的才参数可以是对象，也可以是函数，但是函数必须返回一个对象，对象里面的是需要修改的属性的值
  - callback: 更新成功后的回调 function
  - 异步:react通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
  - 浅合并 Objecr.assign()
  - 调用 setState 之后，会触发生命周期，重新渲染组件
示例：	import React, { Component, Fragment } from 'react';

```javascript
class App extends Component{
  state={
    name:"kkb",
    age:1
  }
  changeName=()=>{
    this.setState({
      name:"ass"
    })
  }
  addAge=()=>{
    let {age}=this.state
    this.setState({
      age:++age
    })
  }
  render(){
    let {name,age}=this.state;
    return <Fragment>
      <p>{name}</p>
      <button onClick={this.changeName}>改变名字</button>
     <p>{age}</p>
      <button onClick={this.addAge}>长大一岁</button>  
    </Fragment>
  }
}
export default App;
{/*
注意：
## this.setState(obj||fn,[callback]),callback是完成后的回调函数
     object:修改对象里面的值，setState会自动调用合并obj的状态
    fn：执行setState的时候会执行fn,fn函数必须返回一个对象，对象里面存储我们想要修改的状态
## 修改state会调用render方法重新渲染视图
## 在使用setState时，要注意setState是一个异步方法，如果在setState时去获取state的值，拿到的还是之前的值
## 多个setState同时执行，会被合并执行，执行一次render
*/}
```

### 组件间通信

在 React.js 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的。

- 父级向子级通信
  把数据添加子组件的属性中，然后子组件中从props属性中，获取父级传递过来的数据

```javascript
state={
    name:"kkb"
}
```

然后把数据传递给子级：   

```javascript
   <Children name={name}/>
```


- 子级向父级通信
  在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息      
  在父级中定义修改状态的方法：

```javascript
  changeName=(newName)=>{   
    this.setState({
        name: newName
    })
}
```
传递给子级

```javascript
  <Children name={name} changeName={this.changeName}/>
```


#### 跨组件通信 context - 扩展

- React.createContext(defaultValue);
  { Consumer, Provider } = createContext(defaultValue)
- Context.Provider 在父组件调用 Provider 传递数据
  - value 要传递的数据
- 接收数据
  - class.contextType = Context;
  - static contextType = Context;
    - this.context;
  - Context.Consumer


示例:
建立一个context.js文件
```javascript
import {createContext} from "react";
let context=createContext();
let {Provider,Consumer}=context;
export default context;
export {Provider,Consumer};
```
在需要数据支持的组件外层包一个`<Provider> ` 组件(需要引入Provider 从之前建立的那个context.js里面)
设置需要依赖的数据

```javascript
return <Provider 
value={{
  name,
  age,
  changeName:this.changeName
  }}>
  <Fragment>
  <Children />
  <p>{age}</p>
  <button onClick={this.addAge}>长大一岁</button>  
  </Fragment>
</Provider>
```
调用：
在Provider包裹的组件或者其组件的子孙组件需要用到Provider里面的数据的时候,
使用Consumer组件
示例如下：

```javascript
import {Consumer} from "./context.js"
 return <Consumer>
      {
        (context)=>{
          let {name,changeName}=context
          console.log(context)
          return <Fragment>
          <p>{name}</p>
          <button onClick={()=>{
            return changeName("Ass")
          }}>
           改变名字
          </button>
        </Fragment>
        }
      }
      </Consumer>
```
或者：

```javascript
import  ctx from "./context.js";
class Children extends Component{
  static contextType=ctx;
  render(){
    let {name,changeName}=this.context
    return    <Fragment>
          <p>{name}</p>
          <button onClick={()=>{
            return changeName("Ass")
          }}>
           改变名字
          </button>
        </Fragment>
        }

  }
//或者Children.contextType = ctx;
// {/* 
// 注意 Consumer 接收一个插值，插值里面接受一个函数，函数的参数是一个context，context里面就是从Provider里面传递过来的数据
// 也可以不用Consumer包住，在头部引入context 然后在最后设置 Children.contextType=context||在class里面定义static属性static conTextType=context
// */}
export default Children;
```

    **注意在使用不熟练时，最好不要再项目中使用 context，context一般给第三方库使用**

### 组件的生命周期

所谓的生命周期就是指某个事物从开始到结束的各个阶段，当然在 React.js 中指的是组件从创建到销毁的过程，React.js 在这个过程中的不同阶段调用的函数，通过这些函数，我们可以更加精确的对组件进行控制，前面我们一直在使用的 render 函数其实就是组件生命周期渲染阶段执行的函数

#### 生命周期演变

- 挂载阶段 （组件创建-->把组件创建的虚拟DOM，生成真实DOM，添加到我们的DOM树中）
  - constructor
  - static getDerivedStateFromProps(props) 
    - 注意 this 问题
  - render
  - componentDidMount -- 处理副作用(请求)

```javascript
class App extends Component{
  constructor(props){
    super(props);
    console.log("0初始化组件")
  }
  static getDerivedStateFromProps(props){
    console.log("1.将props和state进行关联");
    //这个静态方法返回的是一个对象，这个方法会把返回的对象添加到state中
    return {
      name:"这是新添加的一个state"
    }
  }
  componentDidMount(){
    console.log(3,"组件挂载完成并将虚拟DOM生成真实DOM,添加到DOM树中")
  }
render(){
  console.log(this.state)
  console.log(2,"创建虚拟DOM")
  return  <Fragment>
   <p>{11}</p>
  <button>长大一岁</button>  
  </Fragment>

}
  }
```

- 更新阶段 -- 组件重新渲染
      - static getDerivedStateFromProps(props, state)
      - shouldComponentUpdate()  -- 判断是否跟新
      - render()
      - getSnapshotBeforeUpdate() 
      - componentDidUpdate() -- 处理副作用(请求)
```javascript
class App extends Component{
  static getDerivedStateFromProps(props){
    console.log(0,"组件开始获取新的props,并将props绑定在state中");
  }
  shouldComponentUpdate(nextProps,nextState){
    // console.log(this.state,nextState);
    console.log(1,"判断组件是否进行更新");
    //这个方法必须有返回值，返回值的类型为bool值，true则继续执行后面的生命周期，为false则终止组件更新，后续生命周期不被调用
    return true;

  }
  getSnapshotBeforeUpdate(){
    console.log(3,"组件即将更新完成，更新真实DOM，在这里拿到更新前的DOM快照")
    return document.querySelector("#add").innerHTML
    //返回值会传递给componentDidUpdate的第三个参数；
  }
  componentDidUpdate(prevProps,prevState,prevDOM){
    console.log(4,"组件更新完成，state，props皆已更新",prevProps,prevState,prevDOM);
    console.log(this.state)

  }
render(){
  //
  console.log("重新生成虚拟DOM,准备组件更新")
  return  <Fragment>
   <p id="add">{11}</p>
  <button>长大一岁</button>  
  </Fragment>

}
  }
```

- 卸载阶段
  - componentWillUnmount  -- 删除添加在全局的一些信息或操作
父组件：


```javascript
import React, {  Component, Fragment } from 'react';
import Children from "./children"
class App extends Component{
  state={
    isShow:true
  }

render(){
  let {isShow}=this.state;
  return  <Fragment>{
    isShow?<Children />:""
    }
  <button onClick={()=>{this.setState({isShow:!isShow})}
  }>显示隐藏</button>
  </Fragment>

}
  }

export default App;
```
子组件：


```javascript
class Children extends Component{
    componentDidMount(){
        window.onresize=()=>{
          // console.log(window.innerHeight);
          let age=document.querySelector("#add");
          console.log(age.innerHTML)
        }
    
      }
      componentWillUnmount(){
        console.log("组件即将卸载")
        window.onresize=null;
        //这里需要在卸载的阶段清空在全局的方法，比如在窗口打小改变时获取不存在dom的值
    
      }
    render() {
        return <h1 id="add">这是children</h1>
    }
}
export default Children;
```

### 受控组件

当想要获取表单的一些内部状态时，就可以将表单的内部状态和组件的状态进行绑定，这样就形成受控组件
受控组件: 让 表单控件 的内部状态  和我们 state 保持一致
非受控组件: 我们不需要同步 value 值(defaultValue，defaultChecked)


```javascript
import React, {  Component, Fragment } from 'react';
class App extends Component{
  state={
    name:"小名",
    isChecked:false
  }
  render(){
    let {name,isChecked}=this.state
    return <Fragment>
      <input placeholder="请输入昵称"
      value={name}
      type="text"
      onChange={({target})=>{
        this.setState({
          name:target.value
        })    
      }}
      ></input>
      <span> {name}</span>
      {/* //这里就形成了一个受控组件 */}
      {/* 非受控组件就是把value变成defaultValue，然后onChange时不去改变他的状态就可以了，变成了一个非受控组件 */}
      <br />
     <input type="checkbox" checked={isChecked} onChange={({target})=>{
       this.setState({
         isChecked:target.checked
       })
     }}/>是否愿意学习

     <span>{isChecked?"是":"否"}</span>
      <br />
      <button>提交</button>
    </Fragment>
  }
}

export default App;
```


