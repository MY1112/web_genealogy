import React, { Component } from 'react'
import './admin.less'
import { Button, Icon, Menu } from 'antd'
import { verifyLogin } from '../../../actions/rootActions'
const SubMenu = Menu.SubMenu
class Header extends Component {
  handleClick = e => {
    this.props.dispatch(verifyLogin({
      isLogin: false
    }))
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header">
        <Button
          onClick={this.props.toggleCollapsed}
          style={{ border: 0, padding: '5px 10px', marginLeft: '15px' }}
        >
          <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>

        <div className="exit">
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
          >
            <SubMenu
              title={
                <span>
                  <Icon type="user" />Circle
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
