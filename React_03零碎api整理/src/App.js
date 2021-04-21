import React, { Component } from "react";
let inner = `
<div>
<h1>这是标题</h1>
<p>111</p>
</div>
`;

class App extends Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: inner,
        }}
      >
        {/* {inner} */}
      </div>
    );
  }
}
export default App;
