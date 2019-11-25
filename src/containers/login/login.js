import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { verifyLogin, loading } from '../../actions/rootActions'
import './login.less'
import { connect } from 'react-redux'
import Api, { IMODApiData } from './Api'
const FormItem = Form.Item
class NormalLoginForm extends Component {
  componentDidMount() {
    this.getCanvasCircle()
  }
  getCanvasCircle = () => {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    let canvas = document.getElementById('point_Line');
    let ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let circles = [];
    let current_circle = new currentCirle(0, 0)

    let draw = function () {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < circles.length; i++) {
            circles[i].move(w, h);
            circles[i].drawCircle(ctx);
            for (let j = i + 1; j < circles.length; j++) {
                circles[i].drawLine(ctx, circles[j])
            }
        }
        if (current_circle.x) {
            current_circle.drawCircle(ctx);
            for (let k = 1; k < circles.length; k++) {
                current_circle.drawLine(ctx, circles[k])
            }
        }
        requestAnimationFrame(draw)
    }

    let init = function (num) {
        for (var i = 0; i < num; i++) {
            circles.push(new Circle(Math.random() * w, Math.random() * h));
        }
        draw();
    }
    window.addEventListener('load', init(60));
    window.onmousemove = function (e) {
        e = e || window.event;
        current_circle.x = e.clientX;
        current_circle.y = e.clientY;
    }
    window.onmouseout = function () {
        current_circle.x = null;
        current_circle.y = null;

    };
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.login({...values}).then((res) => {
          console.log(res)
          if(res.code === 10000) {
            this.props.dispatch(loading(true))
            this.props.dispatch(
              verifyLogin({
                isLogin: true,
                user: values
              })
            )
            localStorage.setItem('user',true)
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            setTimeout(() => {
              this.props.history.push('/admin/home')
            }, 2000)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <canvas id="point_Line"></canvas>
        <div className="login-warp">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem 
            hasFeedback
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的账号' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入您的账号"
                />
              )}
            </FormItem>
            <FormItem
            hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="请输入您的密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              {/* <div className="user">
                Username: circle
                <span>
                  Password: 123456
                </span>
              </div> */}
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
class Circle {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 4;
      this._mx = Math.random()*(Math.random() > 0.5 ? 1 : -1);
      this._my = Math.random()*(Math.random() > 0.5 ? 1 : -1);
  }

  drawCircle = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 360)
      ctx.closePath();
      ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
      ctx.fill();
  }

  drawLine = (ctx, _circle) => {
      let dx = this.x - _circle.x;
      let dy = this.y - _circle.y;
      let d = Math.sqrt(dx * dx + dy * dy)
      if (d < 150) {
          ctx.beginPath();
          //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
          ctx.moveTo(this.x, this.y);   //起始点
          ctx.lineTo(_circle.x, _circle.y);   //终点
          ctx.closePath();
          ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)';
          ctx.stroke();
      }
  }

  move = (w, h) => {
      this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
      this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
      this.x += this._mx / 2;
      this.y += this._my / 2;
  }
}
class currentCirle extends Circle {
  constructor(x, y) {
      super(x, y)
  }

  drawCircle = (ctx) => {
      ctx.beginPath();
      //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
      this.r = 6;
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath();
      //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
      ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
      ctx.fill();
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default connect()(WrappedNormalLoginForm)
