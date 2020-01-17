import React, { PureComponent } from 'react'
import { message } from 'antd'
import { loadCDN } from 'util/Tool'
import './about.less'
const naruto = require('../../assets/imgs/naruto.jpeg')

interface IProps {}

interface IState {
  CDNLoading: boolean
}

const initialState = {
  CDNLoading: false
}

export default class NotFound extends PureComponent<IProps, IState> {
  readonly state: IState = initialState
  // componentDidMount() {
  //   this.leadCDN()
  // }
  // 加载静态资源
  // private leadCDN = async () => {
  //   const script = [
  //     'https://cdn.zhangxinxu.com/sp/demo/live2d/live2d/js/live2d.js',
  //   ]
  //   loadCDN(script).then(() => {
  //     this.setState({
  //       CDNLoading:true
  //     }, () => {
  //       this.handleLiveCanvas()
  //     })
  //   }).catch(() => {
  //     message.error('静态资源加载失败')
  //   })
  // }

  // private handleLiveCanvas = () => {
  //   loadlive2d("live2d", "../../assets//live2d/model/tia/model.json");
  // }

  render() {
    const { CDNLoading } = this.state
    return (
      <div className="about">
        <img alt="" className="img" src={naruto} />
        <br />
        MY1112
        {/* {
          CDNLoading && 
          <canvas id="live2d" width="280" height="250"></canvas>
        } */}
      </div>
    )
  }
}
