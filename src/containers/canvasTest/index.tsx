import React, { Component } from 'react'
import './index.less'
// import { Button } from 'antd'
import NGTree from 'components/NGTree'

const initialState = {
  sertchVal: '',
  visible: false,
  status: false,
  isChecked: false,
  addItme: {},
  listData: [{
    ext: "",
    id: "",
    key: "0-0",
    num: 1,
    pid: "0",
    pids: "[0],",
    title: "粤秀整形外科医院",
    value: "4296ff558285482ea70045d8aabce81a",
    children: [{
      children: [],
      ext: "",
      id: "",
      key: "0-0-0",
      num: 0,
      pid: "4296ff558285482ea70045d8aabce81a",
      pids: "[0],[4296ff558285482ea70045d8aabce81a],",
      title: "调拨部门2",
      value: "4cc2366ba1d7d288a23d900ee47f2ca0"
    }]
  }],
  detailItem: { value: '' },
  loading: false,
  selectedKeys: []
}

export interface IdetailItem {
  pid?: string
  value: string
  title?: string
  medicalFlag?: boolean
  userSum?: number
  tips?: string
  pTitle?: string
  id?: string
  name?: string
  titps?: string
}
interface IState {
  sertchVal: string
  visible: boolean
  status: boolean
  isChecked: boolean
  addItme: object
  listData: object[]
  detailItem: IdetailItem
  loading: boolean
  selectedKeys: string[]
}

interface IProps {}

class CanvasTest extends Component<IProps, IState> {
  readonly state: IState = initialState


  private getOptions() {
    const render = {
      value: (text: { key: string }) => (
        <span>666</span>
        // <Options
        //   // clickOptions={this.clickOptions.bind(this, text)}
        //   className="fs-14"
        //   type={[
        //     {
        //       name: 'add',
        //       icon: 'icon-icon02',
        //       text: '新增',
        //       authorize: 'addDepartment'
        //     },
        //     {
        //       name: 'delete',
        //       icon: 'icon-shanchu1',
        //       text: '删除',
        //       display: text.key === '0-0',
        //       authorize: 'deleteDepartment'
        //     }
        //   ]}
        // />
      )
    }
    return render
  }

  render() {
    const {
      listData,
      sertchVal,
      loading,
      selectedKeys
    } = this.state
    return (
      <div className="canvasTest pt-20 pl-20 pr-24 pb-20">
        <div className="flex">
          <div className="canvasTest_left">
            <div>顶部</div>
              <NGTree
                className="ng_select_tree"
                seartchVal={sertchVal}
                // handleChecked={this.handleChecked}
                listData={listData}
                opions={this.getOptions()}
                loading={loading}
                autoExpandedKeys={['0-0']}
                selectedKeys={selectedKeys}
                titleClass="pr-60"
              />
          </div>
        </div>
      </div>
    )
  }
}
export default CanvasTest