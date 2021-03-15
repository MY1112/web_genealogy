import React, { Component } from 'react'
import './admin.less'
import { Breadcrumb } from 'antd'
class App extends Component {
  extraBreadcrumbItems = () => {
    return this.props.breadcrumb.map((el, index) => {
      return <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
    })
  }
  render() {
    
    return (
      <div className="content">
        {!!this.props.breadcrumb?.length && 
          <div className="breadcrumb">
            <Breadcrumb>{this.extraBreadcrumbItems()}</Breadcrumb>
          </div>
        }
        <div className="show-view">
        {this.props.children}
        </div>
      </div>
    )
  }
}
export default App
