import * as React from "react";
import {Alert} from "antd";
import * as style from "./App.less";

class App extends React.PureComponent {
  public render() {
    return (
      <Alert
        message={
          <div className={style.text}>
            This boilerplate is so cool!
          </div>
        }
        type="success"
      />
    );
  }
}

export default App;
