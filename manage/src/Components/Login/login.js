import React, {
  Component,
  Fragment
} from 'react';
import LoginUi from './loginUi.js';
import axios from 'axios'
import {
  message
} from 'antd';
import IPserver from 'IPserver';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yzm: "",
      val: "",
      username: "",
      password: "",
      loading: false
    }
    this.keydown = this.keydown.bind(this)
  }

  componentDidMount() {
    window.router = this.props.history;
    this.drow()
    document.addEventListener('keydown', this.keydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown)
  }

  keydown(e) {
    if (e.keyCode === 13) {
      this.submit()
    }
  }

  change(e) {
    this.setState({
      [e.target.className]: e.target.value
    })
  }

  submit() {
    if (this.state.username === "" || this.state.password === "") {
      message.error("用户名与密码不可留空")
      return
    }
    if (this.state.yzm.toLocaleLowerCase() !== this.state.val.toLocaleLowerCase()) {
      message.error("验证码错误")
      return
    }
    this.setState({
      loading: true
    })
    axios.post(IPserver + "login/login.php", {
      username: this.state.username,
      password: this.state.password
    }).then((res)=>{
      this.setState({
        loading: false
      })
      if (res.data.code === "200") {
        message.success("登录成功")
        this.props.history.push('/manage/')
      } else if (res.data.code === "401") {
        message.error("账号或密码错误")
      } else {
        message.error("请求失败，请联系管理员")
      }
    }).catch((error)=>{
      message.error("请求失败，请联系管理员")
      this.setState({
        loading: false
      })
    })
  }

  drow() {
    this.setState({
      yzm: ''
    })
    let canvas_width = '100'
    let canvas_height = '30'
    let canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
    let context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    let sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    let aCode = sCode.split(",");
    let aLength = aCode.length; //获取到数组的长度
    let yzm = ""
    for (let i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
      let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
      // let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      let deg = Math.random() - 0.5; //产生一个随机弧度
      let txt = aCode[j]; //得到随机的一个内容
      yzm += txt.toLowerCase();
      let x = 10 + i * 20; //文字在canvas上的x坐标
      let y = 20 + Math.random() * 8; //文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";

      context.translate(x, y);
      context.rotate(deg);

      context.fillStyle = this.randomColor();
      context.fillText(txt, 0, 0);

      context.rotate(-deg);
      context.translate(-x, -y);
    }
    for (let i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle = this.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (let i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = this.randomColor();
      context.beginPath();
      let x = Math.random() * canvas_width;
      let y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
    this.setState({
      yzm
    })
  }

  randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  render() {
    return ( <
      Fragment >
      <
      LoginUi all = {
        this.state
      }
      drow = {
        this.drow.bind(this)
      }
      submit = {
        this.submit.bind(this)
      }
      change = {
        this.change.bind(this)
      }
      /> < /
      Fragment >
    );
  }
}

export default Login;