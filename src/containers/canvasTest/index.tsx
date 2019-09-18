import React, { Component } from 'react'
import './index.less'
import { Icon, Tooltip } from 'antd'
import NGTree from 'components/NGTree'
import NGHeader from 'components/NGHeader'
import NGNoData from 'components/NGNoData'
import CustomerAdd from './Components/CustomerAdd'
import CustomerEdit from './Components/CustomerEdit'
import CustomerDetail from './Components/CustomerDetail'

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
    title: "一",
    value: "4296ff558285482ea70045d8aabce81a",
    children: [{
      children: [],
      ext: "",
      id: "",
      key: "0-0-0",
      num: 0,
      pid: "4296ff558285482ea70045d8aabce81a",
      pids: "[0],[4296ff558285482ea70045d8aabce81a],",
      title: "二",
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

  private handleAdd(item: object) {
    this.setState({
      visible: true,
      addItme: item
    })
  }

  private onCancel() {
    this.setState({
      visible: false
    })
  }

  private getOptions() {
    const render = {
      value: (text: { key: string }) => (
        <React.Fragment>
          <Tooltip title="新增">
            <span onClick={this.handleAdd.bind(this, text)} >
              <Icon type="plus-circle" />
            </span>
          </Tooltip>
          <Tooltip title="删除">
            <span onClick={this.handleAdd.bind(this, text)} >
              <Icon type="usergroup-delete" style={{marginLeft: '10px'}} />
            </span>
          </Tooltip>
        </React.Fragment>
      )
    }
    return render
  }

  private addSuccess() {
    // this.getList()
    console.log('成功')
  }
  // 左边显示
  private canvasTestPage() {
    const { status, isChecked, listData, detailItem } = this.state
    const departmentPage = isChecked ? (
      <div className="departmentDetail">
        {status ? (
          <CustomerEdit
            listData={listData}
            handleEdit={this.handleEdit}
            detailItem={detailItem}
            cancel={this.cancelEdit}
            success={this.editSuccess}
          />
        ) : (
          <CustomerDetail
            handleEdit={this.handleEdit}
            detailItem={detailItem}
          />
        )}
      </div>
    ) : (
      <NGNoData text="还没有选中的内容哦~"/>
    )
    return departmentPage
  }

  private handleEdit = () => {

  }

  private cancelEdit = () => {

  }

  private editSuccess = () => {

  }

  render() {
    const {
      listData,
      sertchVal,
      loading,
      selectedKeys,
      visible,
      addItme
    } = this.state
    return (
      <div className="canvasTest">
        <div className="flex">
          <div className="canvasTest_left mr-16">
            <NGHeader
              title="人物关系"
              size="big"
              className="canvasTest_left_header"
              extra={
                <span
                  className="canvasTest_options"
                  onClick={this.handleAdd.bind(this,{})}
                >
                  <Tooltip title="新增">
                    <Icon className="csp" type="plus-circle" />
                  </Tooltip>
                </span>
              }
            />
            <div className="canvasTest_left_tree pl-24 pr-24">
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
                rowKey={'id'}
              />
            </div>
          </div>
          <div className="canvasTest_page">
            <div className="canvasTest_page_content">
              {this.canvasTestPage()}
            </div>
          </div>
        </div>
        {visible && (
          <CustomerAdd
            onCancel={this.onCancel.bind(this)}
            addItme={addItme}
            addSuccess={this.addSuccess}
            listDataLen={listData.length}
          />
        )}
      </div>
    )
  }
}
export default CanvasTest