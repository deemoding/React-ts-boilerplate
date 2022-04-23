import {useEffect} from "react";
import {Alert, message} from "antd";
import {greet} from "wasm";
import 'antd/es/alert/style/index.less';
import 'antd/es/message/style/index.less';
import style from "./App.less";

function App() {
  useEffect(() => {
    setTimeout(() => {
      greet("比我还帅的地球人");
      message.success('haha!')
    }, 500)
  }, [])

  return (
    <div className={style.main}>
      <Alert
        message={
          <div className={`${style.link} ${style.text}`}>
            <a href={`#${Math.random()}`} target="_blank">
              I'll change my color when you click me, and reset when you refresh.
            </a>
          </div>
        }
        type="success"
      />
      <Alert
        message={
          <div className={style.text}>
            This boilerplate is so cool!
          </div>
        }
        type="success"
      />
    </div>
  );
}

export default App;
