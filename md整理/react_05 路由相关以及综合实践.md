

# 路由相关以及综合实践

### render 和重定向

```js
import React, { Fragment, useState } from "react"
import { Redirect, Route,Switch } from "react-router-dom"
import IndexView from "./view/indexView"
import JoinView from "./view/joinView"
import Page404 from "./view/page404"
import PageView from "./view/pageView"
import Nav from "./components/nav"
import MessageView from "./view/messageView"
import LoginView from "./view/loginView"
export default function App(){
  let [username,setUserName]=useState("")
  return (
    <Fragment>
      <Nav />
      <Switch>
      <Route path={["/","/home","/index"]} component={IndexView} exact />
      <Route path="/page" component={PageView} exact />
      <Route path="/join" component={JoinView}/>
      <Route path="/message" render={()=>{
        if(username){
          //如果有userName 那么就跳转到message页面如果没有跳转到登录页面
        return <MessageView username={username}/>
        }
        return <Redirect to="/login"/>
      }} exact />
      
      <Route  path="/login" render={()=>{
        return <LoginView setUserName={setUserName}/>
      }} exact/>
      <Route  component={Page404}/>
      </Switch>

    </Fragment>
  )
}

            {/*
      需求就是，需要在Route里面向子组件传递参数 这个时候就不能用component属性了
       render:可以接受一个函数，在函数里面返回一个组件
      */}
```

那么在Message里面就可以拿到对应的参数和方法

```js
import React from "react"
//用户登录才能进入，留言界面并且在该界面获取到用户名
export default function MessageView(props){
  console.log(props)
  return (
  <div> This is messageView</div>
  )
}
```

### 路由信息的传递和获取

```js
import React, { Fragment, useState } from "react"
import { Redirect, Route,Switch } from "react-router-dom"
import IndexView from "./view/indexView"
import JoinView from "./view/joinView"
import Page404 from "./view/page404"
import PageView from "./view/pageView"
import Nav from "./components/nav"
import MessageView from "./view/messageView"
import LoginView from "./view/loginView"
{/*
被 Route组件调用的组件，我们称之为路由组件
   Route在调用组件的时候会传递一些相关联的路由信息
   history:
go: ƒ go(n) 历史记录跳转几项 正值向前跳转（就是下一步）,负值向后跳转（就是上一步）
goBack: ƒ goBack() 返回到上一步
goForward: ƒ goForward() 前进到下一步
length: 16 历史记录共几项
location: {pathname: "/", search: "", hash: "", state: undefined, key: "6me149"} 
location: url 信息，path 当前url,search:当前search,hash:当前hash,state：历史记录传递的信息
push: ƒ push(path, state) 跳转
replace: ƒ replace(path, state) 跳转
__proto__: Object
location: {pathname: "/", search: "", hash: "", state: undefined, key: "6me149"}
match: {path: "/", url: "/", isExact: true, params: {…}}
match:匹配信息，path 当前的path， params：path传递的参数
staticContext: undefined



注意：被render方法调用的组件，路由参数不在props中，而是在render方法的参数中

*/}
export default function App(){
  let [username,setUserName]=useState("")
  return (
    <Fragment>
      <Nav />
      <Switch>
      <Route path={["/","/home","/index"]} component={IndexView} exact />
      <Route path="/page" component={PageView} exact />
      <Route path="/join" component={JoinView}/>
      <Route path="/message" render={(routeProps)=>{
// 注意：被render方法调用的组件，路由参数不在props中，而是在render方法的参数中
        console.log(routeProps)
        if(username){
        return <MessageView username={username} {...routeProps}/>
        }
        return <Redirect to="/login"/>
      }} exact />
      <Route  path="/login" render={(routeProps)=>{
        return <LoginView setUserName={setUserName} {...routeProps}/>
      }} exact/>
      <Route  component={Page404}/>
      </Switch>

    </Fragment>
  )
}
```

### 高阶路由和一些关于路由的Hooks

-   因为只有被Route组件调用的组件才是路由组件 ，render方法的路由参数在函数的props里面如果需要传递给子集那么需要申明变量，然后传递给子组件，component的路由参数在子组件的props里面。
-   那么在被component调用的组件里面，还有子组件需要路由参数来做一些事情，我们怎么拿到呢
    实例一：孙组件为类组件

```js
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
 class PageDetail extends Component{
    render(){
        // console.log(this.props)
       return  <div>This is PageDetail</div>
       //在子组件里面就拿不到路由参数了怎么办呢，当然可以适用父级传递下来的props，也可以使用高阶路由组件withRouter
       //withRouter 高阶路由会接受一个组件，返回一个新的组件，在组件被调用的时候，会把路由信息传递给这个组件
    }  
}
PageDetail = withRouter(PageDetail)
export default PageDetail
```

实例二：孙组件为函数组件

```js
import React from "react"
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"
function PageDetail2(props){
    // console.log(props)
    //函数式组件也没办法获取到对应的路由信息
    //但是有Hooks呀
    let history=useHistory();
    let match=useRouteMatch();
    let params =useParams();
    let location=useLocation();
    console.log(history,match,params,location)
    return <div>
        PageDetail2
    </div>
}
export default PageDetail2
```

-   当然也可以一步一步的乖乖传递参数到子组件然后子组件再传递给孙组件。

### NavLink(加强版的Link跳转组件)

```js
import React from "react"
import {NavLink} from "react-router-dom"

/*
用NavLink 替代Link组件 NavLink的匹配规则和Route的path 是一致的希望精确匹配还需要加exact
activeClassName =也可以用activeStyle来替换
isActive(){
    return true 代表当前项应该选中，false,无需选中
}
*/
export default function Nav(){
    // console.log(props)
    return (
        // <nav>
        //     <NavLink to="/" activeClassName="selected" exact>首页</NavLink>
        //     <span>|</span>
        //     <NavLink to="/page" activeClassName="selected" exact>page页</NavLink>
        //     <span>|</span>
        //     <NavLink to="/join" activeClassName="selected" exact>join页</NavLink>
        //     <span>|</span>
        // </nav>
        <nav>
        <NavLink to="/" activeStyle={{
            color:"yellow",
        }} exact
        isActive={()=>{
            return true
            //这样首页一直选中
        }}
        
        >首页</NavLink>
        <span>|</span>
        <NavLink to="/page" activeStyle={{
            color:"yellow",
        }} exact>page页</NavLink>
        <span>|</span>
        <NavLink to="/join" activeStyle={{
            color:"yellow",
        }} exact>join页</NavLink>
        <span>|</span>
    </nav>
    )
}   
```
