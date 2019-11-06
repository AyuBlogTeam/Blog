import React, { useRef } from "react";
import Particles from "reactparticles.js";
import { Button } from "antd";

const LoginUi = props => {
  const val = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const { loading } = props;
  return (
    <div id="loginUI">
      <div className="header">阿鱼的研发日志</div>
      <div className="page">
        <Particles id="particles" config="/particles/particles.json" />
      </div>
      <div className="login">
        <div className="title">管理员登录</div>
        <div className="yz">
          <span className="iconfont">&#xe613;</span>
          <input className="username" type="text" ref={username} />
        </div>
        <div className="yz">
          <span className="iconfont">&#xe619;</span>
          <input className="password" type="password" ref={password} />
        </div>
        <div className="yz">
          <span className="iconfont">&#xe667;</span>
          <canvas
            onClick={props.drow}
            id="canvas"
            className="canvas"
            width="100"
            height="30"
          ></canvas>
          <input type="text" className="val" ref={val} />
        </div>
        <div className="btn">
          <Button
            type="primary"
            loading={loading}
            onClick={() =>
              props.submit(
                username.current.value,
                password.current.value,
                val.current.value
              )
            }
          >
            登录
          </Button>
        </div>
      </div>
      <div className="footer">
        版权所有：李晓余（www.ayuperson.top）蜀ICP备18020911号-2
      </div>
    </div>
  );
};

export default LoginUi;
