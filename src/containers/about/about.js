import React, { Component } from 'react'
import './about.less'
import doudou from '../../assets/imgs/doudou.jpg'
export default class NotFound extends Component {
  render() {
    return (
      <div className="about">
        <img alt="" className="img" src={doudou} />
        <br />
        MY1112
      </div>
    )
  }
}
