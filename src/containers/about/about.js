import React, { Component } from 'react'
import './about.less'
import doudou from '../../assets/imgs/doudou.jpg'
export default class NotFound extends Component {
  render() {
    return (
      <div className="about">
        <img alt="" className="img" src={doudou} />
        <br />
        一个菜鸡前端：MY1112
        <br />
        我的git地址:
        <br />
        <a href="https://github.com/MY1112">
          https://github.com/MY1112
        </a>
      </div>
    )
  }
}
