import React, { Component } from 'react'
import './index.less'
import { Button } from 'antd'

interface IProps {}

class CanvasTest extends Component<IProps, any> {
  render() {
    return (
      <div className="CanvasTest">
        <Button className="primary_btn mt-10">
          canvasTest
        </Button>

      </div>
    )
  }
}
export default CanvasTest