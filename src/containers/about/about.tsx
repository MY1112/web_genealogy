import React, { PureComponent } from 'react'
import './about.less'
const naruto = require('../../assets/imgs/naruto.jpeg')

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className="about">
        <img alt="" className="img" src={naruto} />
        <br />
        MY1112
      </div>
    )
  }
}
