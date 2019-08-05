import React, { Component } from 'react'
import './admin.less'
import { Breadcrumb } from 'antd'
class App extends Component {
  render() {
    const extraBreadcrumbItems = this.props.breadcrumb.map((el, index) => {
      return <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
    })
    return (
      <div className="content">
        <div className="breadcrumb">
          <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
        </div>
        <div className="show-view">
        {this.props.children}
        </div>
      </div>
    )
  }
}
export default App
