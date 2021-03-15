import React, { Component } from 'react'
import './home.less'
// import { loading } from '../../actions/rootActions'

interface IProps {}

interface IState {
  name: string
}
const initialState = {
  name: ''
}
class Home extends Component<IProps, IState> {
  readonly state: IState = initialState
  componentDidMount() {
    const jsonUser = localStorage.getItem('userInfo');
    const userInfo: any = jsonUser ? JSON.parse(jsonUser) : undefined;
    this.setState({ name: userInfo?.parents || ''})
  }

  render() {
    return (
      <div className="home">
        <div className="home_bg" />
        <div className="box1">
          <div className="box2">
            <div className="box3">
              <div className="home_title">
                {`${this.state.name}氏族谱`}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Home
