import dynamic from "next/dynamic";
import { Button, Icon } from "antd";
const Particles = dynamic(import("reactparticles.js"), {
  ssr: false
});

const LoginUi = props => {
  const { loading, username, password, val } = props;
  return (
    <>
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
              onChange={e => {
                username(e.target.value);
              }}
            />
          </div>
          <div className="yz">
            <span className="iconfont">
              <Icon type="lock" className="iconfont" />
            </span>
            <input
              className="password"
              type="password"
              onChange={e => {
                password(e.target.value);
              }}
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
              onChange={e => {
                val(e.target.value);
              }}
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
    </>
  );
};

export default LoginUi;
