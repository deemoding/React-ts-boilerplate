import {Alert} from "antd";
import * as React from "react";
import * as style from "./App.less";

class App extends React.PureComponent {
  public render() {
    return (
      <div className={style.main}>
        <Alert
          message={
            <div className={`${style.link} ${style.text}`}>
              <a href={`#${Math.random()}`} target="_blank">
                I'll change my color when you click me, and reset when you refresh.
              </a>
            </div>}
          type="success"
        />
        <Alert
          message={
            <div className={style.text}>
              This boilerplate is so cool!
            </div>}
          type="success"
        />
      </div>
    );
  }
}

export default App;
