
## React 是什么？
一个用于构建用户界面的 JavaScript 库
中文手册：https://react.docschina.org/

## 命令式编程 和 声明式编程
- 告诉计算机怎么做（How） - 过程
- 告诉计算机我们要什么（What） - 结果

## 如何使用 React
### 基于浏览器的模式
- React.js 提供 React.js 核心功能代码，如：虚拟 dom，组件
    - React.createElement(type,props,children);
```javascript
  <script src="./js/react.js"></script>

<script src="./js/react-dom.js"></script>
<script>
    let root=document.getElementById("root")
    //createElement(type,props,inner||children)
    let h1=React.createElement("h1",{id:"title"},"Hello React");
    let p=React.createElement("p",null,"p");
    let header=React.createElement("header",{id:"header"},[h1,p]);
    ReactDOM.render(header,root)
</script>
```

- ReactDOM 提供了与浏览器交互的 DOM 功能，如：dom 渲染
    - ReactDOM.render(Vnode, container[, callback])
        - element：要渲染的内容
        - container：要渲染的内容存放容器
        - callback：渲染后的回调函数 


```javascript
 <!-- //React是一个渐进式的javascript库，当用上了所有的组件的时候，React才能称之为一个框架 -->

<script src="./js/react.js"></script>

<!-- react-dom依赖react -->
<script src="./js/react-dom.js"></script>
<body>
    <div id="root"></div>
</body>
<script>
    let root=document.getElementById("root")
    // 用react-dom里面的render方法来将虚拟dom渲染到原生dom里面
    ReactDOM.render(
        `hello React`,
        root
    )
</script>
```



### babel
[babel-standalone.js：在浏览器中处理 JSX](https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js)
https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js

### JSX
JSX 是一个基于 JavaScript + XML 的一个扩展语法
    - 它可以作为值使用
    - 它并不是字符串
    - 它也不是HTML
    - 它可以配合JavaScript 表达式一起使用
```javascript
<script src="./js/react.js"></script>
<script src="./js/react-dom.js"></script>
<script src="./js/babel.js"></script>
<script type="text/babel">
    /*
    JSX ;javascript +xml 就是在javascript 中扩展了xml语法 和HTML 一样是一个标记性的语言
    最大的特点就是可以自定义标签 比如说 可以定义一个<Ass />标签
    */
   //这里直接使用JSX 语法可以大大的方便我们使用react，但是这时候浏览器不认识这个JSX语法就会报错，需要引入babel.js 来编译JSX语法
   //    !!!!并且设置type="text/babel"
//    浏览器会警告一下，推荐在开发环境中使用babel，通过webpack，配置，create-reacte-app 构建项目
   let root=document.getElementById("root");
   let header = <header><h1 id="title">Hello React</h1><p> 这是p标签</p></header>;

    ReactDOM.render(
        header,
        root
    )
</script>
```

#### 插值表达式
在 JXS 中可以使用 {表达式} 嵌入表达式
表达式：产生值的一组代码的集合

- 变量
- 算术运算
- 函数调用
- ……

注意：分清楚 表达式 与 语句 的区别，if、for、while 这些都是语句，JSX 不支持语句

```javascript
<script src="./js/react.js"></script>
<script src="./js/react-dom.js"></script>
<script src="./js/babel.js"></script>
<body>
    <div id="root"></div>
</body>
<script type="text/babel">
/*
JSX可以当成一个值来使用
JSX插值：{}里面可以放插值
*/
   let root=document.getElementById("root");
   let header = <header><h1 id="title">Hello React</h1><p> 这是p标签</p></header>;

    ReactDOM.render(
        header,
        root
    )
</script>
```


##### 各种类型内容在插值中的使用
- 注释
    {/*注释*/}
    	{/*
    			多行注释
    	*/}

#### 输出数据类型
- 字符串、数字：原样输出
- 布尔值、空、未定义 会被忽略
#### 列表渲染
- 数组
- 对象
扩展：虚拟 DOM （virtualDOM） 和 diff

#### 条件渲染
- 三元运算符
- 与或运算符

```javascript
import React from 'react';
//不同数据类型在JSX 中的表现形式
/* 
基本类型
- 字符串，数字 原样输出
- boolen null undefined 会被忽略

数组会把“，”去掉然后显示在页面上
对象在大多数情况下无法正常显示

*/ 
function App() {
  let arr=["a","b","c"]
  
  let styl={
    width:100,
    height:100,
    border:"1px solid #000"
  }
  let arrEl=arr.map(item=>{
    return <li>{item}</li>
    })
  return (
    <div className="App">

      {"字符串"}
      {NaN}
      {undefined}
      {true}
      {null}
      {[1,2,3]}
      {/* JSX 中的条件渲染 */}

      {/* 可以用三目，可以用&& 也可以用|| */}
      {/* 逻辑复杂的话可以用函数 */}
      {true?"正确":"错误"}
      {true&&2} {/*返回2*/}
      {false||2} {/*返回2*/}


      {/*JSX中的列表渲染*/}
 
      <ul>{arrEl}</ul>
      <div style={styl}></div>
      <label htmlFor="check">选中</label>
      <input type="checkbox"></input>


    </div>
  );
}

export default App;
```

### 在属性上使用表达式

JSX 中的表达式也可以使用在属性上，但是使用的时候需要注意
- 当在属性中使用 {} 的时候，不要使用引号包含

#### JSX 使用注意事项
- **必须有,且只有一个顶层的包含元素 - React.Fragment**
- **JSX 不是html，很多属性在编写时不一样**
    - **className**
    - **style** 
- **列表渲染时，必须有 key 值**
- **在 jsx 所有标签必须闭合**
- **组件的首字母一定大写，标签一定要小写**

**XSS**
为了有效的防止 XSS 注入攻击，React DOM 会在渲染的时候把内容（字符串）进行转义，所以字符串形式的标签是不会作为 HTML 标签进行处理的，这样编译会影响性能，所以官方不推荐使用babel编译JSX，推荐使用脚手架工具

## 基于自动化的集成环境模式 - create-react-app - 脚手架
### 介绍

通过前面 script 的方式虽然也能完成 React.js 的开发，但是有一个现在前端很重要的特性 - 模块化，无法使用。
Create React App 是一个使用 Node.js 编写的命令行工具，通过它可以帮助我们快速生成 React.js 项目，并内置了 Babel、Webpack 等工具帮助我们实现 ES6+ 解析、模块化解析打包，也就是通过它，我们可以使用 模块化 以及 ES6+ 等更新的一些特性。同时它还内置 ESLint 语法检测工具、Jest 单元测试工具。还有一个基于 Node.js 的 WebServer 帮助我们更好的在本地预览应用，其实还有更多。

这些都通过 Create React App 帮助我们安装并配置好了，**开箱即用**

### 安装与使用

通过 npm、yarn、npx 都可以

#### 安装

###### npm

```bash
npm i -g create-react-app
```

###### yarn

```bash
yarn global add create-react-app
```

#### 使用

安装完成以后，即可使用 create-react-app 命令

```bash
create-react-app <项目名称>
```

npx create-react-app <项目名称>
npm init react-app <项目名称>

### 项目目录结构说明

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js  项目的入口文件
    logo.svg
```

### 命令脚本

create-react-app 同时也提供了其它一些命令来帮助我们进行开发

###### npm start

启动一个内置的本地 WebServer，根目录映射到 './public' 目录，默认端口：3000

###### npm run test

运行 Jest 测试

###### npm run build

打包应用（准备上线）

## 组件
对具有一定独立功能的数据与方法的封装，对外暴露接口，有利于代码功能的复用，且不用担心冲突问题。

### 类式组件
- 组件类必须继承 **React.Component**
- 组件类必须有 **render** 方法

### 函数式组件
- 函数的名称就是组件的名称
- 函数的返回值就是组件要渲染的内容

## props 和 state
- props 父组件传递过来的参数
- state 组件自身状态
  - setState
  - 多个 setState 合并

###  props 与 state 的区别
*state 的主要作用是用于组件保存、控制、修改*自己*的可变状态，在组件内部进行初始化，也可以在组件内部进行修改，但是组件外部不能修改组件的 state
props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，它是外部传进来的配置参数，组件内部无法控制也无法修改
state 和 props 都可以决定组件的外观和显示状态。通常，props 做为不变数据或者初始化数据传递给组件，可变状态使用 state*


### React 中的事件
- 大小写问题 事件名称第一个字母小写以后的单词大写
- this 问题 this指向为underfined，这时候可以用改变this指向来解决这个问题或者是用箭头语法改变this指向







