import React, { Component } from 'react'
import './admin.less'
import { Button, Icon, Menu } from 'antd'
import { verifyLogin } from '../../../actions/rootActions'
const SubMenu = Menu.SubMenu

const initialState = {
  username: ''
}
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setState({ username: userInfo.username})
  }
  handleClick = e => {
    localStorage.setItem('user',false)
    localStorage.removeItem('userInfo')
    this.props.dispatch(verifyLogin({
      isLogin: false
    }))
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header">
        <div className="collapsed">
          <Button
            onClick={this.props.toggleCollapsed}
            style={{ border: 0, padding: '5px 10px', marginLeft: '15px' }}
          >
            <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </div>
        <div className="collapsed-min" style={{
           left: `${this.props.isShowMenu ?
            this.props.collapsed ? '80px' : '200px'
            : '15px'}`
        }}>
          <Button
            onClick={this.props.changeShowMenu}
            style={{ border: 0, padding: '5px 10px' }}
          >
            <Icon type="unordered-list" />
          </Button>
        </div>

        <div className="exit">
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
          >
            <SubMenu
              title={
                <span>
                  <Icon type="user" />{this.state.username || ''}
                </span>
              }
            >
              <Menu.Item key="user">退出</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}
export default Header
