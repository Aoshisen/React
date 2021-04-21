@[toc]
### key 的问题

在 React ，组件每次更新时，会生成一个 虚拟DOM，和原有的虚拟DOM进行对比。
如果是批量生成的一组元素，那React就会根据 key 值去做对比
**一个列表中的每一项 key 是唯一的**
**如果列表中发生顺序等操作变化，key 一定要用数据的id**

### PureComponent 

PureComponent 提供了一个具有浅比较的 shouldComponentUpdate 方法,其他和 Component 完全一致

```javascript
import React, { PureComponent } from 'react';
class App extends PureComponent{
  state={
    name:{title:"KKB"}
  }
  render(){
    console.log("重新渲染")
    let {name}=this.state
    return <div>
      {name.title}
      <button onClick={()=>{
        name.title="ASS"
        this.setState({
          // 但是如果数据是一个对象的话，这个属性因为是前对比所以就不会检测到数据的修改，所以这时候就需要让新值返回一个新的引用
          name:{...name}
        })
      }}>修改name</button>
    </div>
  }
}
export default App;

//大家可以看到在点击Button的时候组件里面的数据并没有改变但是这个时候重新调用了render方法,这是我们不想看到的
//所以官方提供了一个{PureComponent} 会自动浅对比，如果更新前后值一样，就不去更新组件
//但是如果数据是一个对象的话，这个属性因为是前对比所以就不会检测到数据的修改，所以这时候就需要让新值返回一个新的引用
```

### ref

- createRef()
- 注意：在 组件挂载完成之后及更新之后使用

```javascript
import React, {Component,createRef, Fragment} from 'react';
class App extends Component{
  input=createRef();
  //如果要获取多个节点那么就可以创建多个ref，然后在组件中进行绑定；然后在需要时候获取就行了
    // 用ref关联DOM节点的时候，直接绑定，如果DOM有修改，那么React会同步ref的值
  p=createRef();

  //在挂载完成之后或者更新完就可以获取到这个节点了
  componentDidMount(){
    // console.log(this.input.current)
    console.log(this.p)
    this.input.current.focus();
  }
  render(){
    //组件渲染完成后让组件获得焦点的需求
    return <Fragment>
      <input ref={this.input}/>
      <p ref={this.p}>这是一个P标签</p>
    </Fragment>
  }
}
export default App;
```


### children

- 组件标签对之间的内容会被当做一个特殊的属性 props.children 传入组件内容
- 可以自定义结构的组件的常用形式
  - children
  - 传递函数
  - 传递子组件
示例:
```javascript
<div>
      <PopWin title={"这是父级传递的title"}>
        <div>这是内容</div>
        <div>这是内容</div>
      </PopWin>
</div>
```

```javascript
//子组件
import React, {Component} from 'react';
class PopWin extends Component{
  render(){
    let {title,children}=this.props
    //在父组件中因为是双标签,中间可以放东西，但是不会渲染，这些节点就被传入到了子级的props的一个属性中，那个属性就是children
    // console.log(this.props.title)
    return <div>
      {title}
      {children}
    </div>
  }
}
export default PopWin;
```

### dangerouslySetInnerHTML

```javascript
import React, {Component} from 'react';
let inner=`
<div>
<h1>这是标题</h1>
<p>111</p>
</div>
`

class App extends Component{
  render(){
    return <div dangerouslySetInnerHTML={{
      __html:inner
    }}>
      {/* {inner} */}
    </div>
  }
}
export default App;
```

直接设置标签的 innerHTML




