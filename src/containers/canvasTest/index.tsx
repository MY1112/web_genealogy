import React, { Component } from 'react'
import './index.less'
import { Icon, Tooltip, Input } from 'antd'
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
  detailItem: any
  loading: boolean
  selectedKeys: string[]
}

interface IProps {}

class CanvasTest extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onChangeContent = this.onChangeContent.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.addSuccess = this.addSuccess.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.editSuccess = this.editSuccess.bind(this)
    this.getSearch = this.getSearch.bind(this)
    this.canvasTestPage = this.canvasTestPage.bind(this)
  }
  readonly state: IState = initialState

  private onChangeContent(e: any) {
    this.setState({
      sertchVal: e.target.value
    })
  }

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
    this.getList()
    console.log('成功')
  }
  private handleEdit() {
    this.setState({
      status: true
    })
  }
  private handleChecked(item: any) {
    this.setState({
      detailItem: {
        value: '',
        createBy: "1",
        createDate: 1548402772000,
        delFlag: 0,
        id: "4cc2366ba1d7d288a23d900ee47f2ca0",
        medicalFlag: true,
        medicalFlagStr: "",
        num: 1,
        pTitle: "一",
        pid: "4296ff558285482ea70045d8aabce81a",
        pids: "[0],[4296ff558285482ea70045d8aabce81a],",
        title: "二",
        titps: null,
        updateBy: "1",
        updateDate: 1548402772000,
        userSum: 8,
        version: null
      },
      selectedKeys: [item.key]
    },() => {
      this.setState({
        isChecked: true,
        status: false
      })
    })
  }

  private editSuccess(val: { value: string; key: string }) {
    this.getList()
    this.handleChecked(val)
  }

  private getList = () => {
          this.setState({
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
            }]
          })
  }

  private cancelEdit() {
    this.setState({
      status: false
    })
  }
  // 左边显示
  private canvasTestPage() {
    const { status, isChecked, listData, detailItem } = this.state
    const CustomerPage = isChecked ? (
      <div className="CustomerDetail">
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
    return CustomerPage
  }

  // 搜索
  private getSearch() {
    const search = (
      <Input
        className="search_icon mr-20"
        placeholder="请输入部门名称"
        suffix={
          <i className="fs-18 iconfont icon-sousuo fs-20 ngLayout_headerTop_searchIcon csp" />
        }
        onBlur={this.onChangeContent}
        onPressEnter={this.onChangeContent}
      />
    )
    return search
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
            <p className="pl-16 pr-16 mt-16">{this.getSearch()}</p>
            <div className="canvasTest_left_tree pl-24 pr-24">
              <NGTree
                className="ng_select_tree"
                seartchVal={sertchVal}
                handleChecked={this.handleChecked}
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