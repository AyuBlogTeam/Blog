import React from "react";
import Particles from "reactparticles.js";
import { Button, Icon } from "antd";

const LoginUi = props => {
  const { loading, username, password, val } = props.all;
  return (
    <div id="loginUI">
      <div className="header">阿鱼的研发日志</div>
      <div className="page">
        <Particles id="particles" config="/particles/particles.json" />
      </div>
      <div className="login">
        <div className="title">管理员登录</div>
        <div className="yz">
          <span className="iconfont">
            <Icon type="user" />
          </span>
          <input
            className="username"
            type="text"
            onChange={props.change}
            value={username}
          />
        </div>
        <div className="yz">
          <span className="iconfont">
            <Icon type="lock" className="iconfont" />
          </span>
          <input
            className="password"
            type="password"
            onChange={props.change}
            value={password}
          />
        </div>
        <div className="yz">
          <span className="iconfont">
            <Icon type="check-circle" className="iconfont" />
          </span>
          <canvas
            onClick={props.drow}
            id="canvas"
            className="canvas"
            width="100"
            height="30"
          ></canvas>
          <input
            type="text"
            className="val"
            onChange={props.change}
            value={val}
          />
        </div>
        <div className="btn">
          <Button type="primary" loading={loading} onClick={props.submit}>
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
