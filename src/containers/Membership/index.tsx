import React, { Component } from 'react'
import './index.less'
import { Icon, Tooltip, Input, Modal, message } from 'antd'
import NGTree from 'components/NGTree'
import NGHeader from 'components/NGHeader'
import NGNoData from 'components/NGNoData'
import MemberAdd, { IDateItem } from './Components/MemberAdd'
import MemberEdit from './Components/MemberEdit'
import MemberDetail, { IListItem } from './Components/MemberDetail'
import Api from './Api'
import { IMODApiData } from 'containers/login/Api'

const { confirm } = Modal

const initialState = {
  sertchVal: '',
  visible: false,
  status: false,
  isChecked: false,
  addItem: {
    value: '',
    title: '',
    children: [],
    key: '',
    pid: '',
    pids: []
  },
  listData: [],
  detailItem: { value: '' },
  loading: false,
  selectedKeys: []
}

export interface IdetailItem {
  pid?: string
  value: string
  title?: string
  medicalFlag?: boolean
  memberNum?: number
  tips?: string
  pTitle?: string
  uid: string
  name?: string
  titps?: string
  genderFlag?: boolean
  dateBirth?: number
  livingFlag?: boolean
  dateDeath?: number
  deeds?: string
  remark?: string
  birthplace?: string[]
  birthplaceText?: string
  address?: string
  marryFlag?: true
  spouseName?: string
}
interface IState {
  sertchVal: string
  visible: boolean
  status: boolean
  isChecked: boolean
  addItem: IDateItem
  listData: IDateItem[]
  detailItem: any
  loading: boolean
  selectedKeys: string[]
}

interface IProps {}

class Membership extends Component<IProps, IState> {
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
    this.MembershipPage = this.MembershipPage.bind(this)
  }
  private userInfo: IListItem
  readonly state: IState = initialState
  componentDidMount() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo')||'')
    this.getList()
  }

  private onChangeContent(e: any) {
    console.log(e.target.value)
    this.setState({
      sertchVal: e.target.value
    })
  }

  private handleAdd(item: IDateItem) {
    this.setState({
      visible: true,
      addItem: item
    })
  }

  private onCancel() {
    this.setState({
      visible: false
    })
  }

  private handleDel = (item: IDateItem) => {
    confirm({
      title: '是否确定删除此条数据',
      onOk: () => {
        this.deleteMember(item.value)
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  private deleteMember = (id: string) => {
    Api.memberDel(id).then(() => {
      message.success('删除成功')
      this.getList()
    }).catch(() => {})
  }

  private getOptions() {
    const render = ['god','admin'].includes(this.userInfo && this.userInfo.identity) ? {
      value: (text: IDateItem) => (
        <React.Fragment>
          <Tooltip title="新增">
            <span className="mr-8" onClick={this.handleAdd.bind(this, text)} >
              <Icon type="plus-circle" />
            </span>
          </Tooltip>
          {
            !text.children.length ?
            <Tooltip title="删除">
              <span className="mr-8" onClick={this.handleDel.bind(this, text)} >
                <Icon type="usergroup-delete" />
              </span>
            </Tooltip>
            : null
          }
        </React.Fragment>
      )
    } : {
      value: (text: { key: string }) => null
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
    Api.memberDetail(item.value).then((res: IMODApiData) => {
      console.log(res.data)
      this.setState({
        detailItem: res.data,
        selectedKeys: [item.key]
      },() => {
        this.setState({
          isChecked: true,
          status: false
        })
      })
    }).catch(() => {})
  }

  private editSuccess(val: { value: string; key: string }) {
    this.getList()
    this.handleChecked(val)
  }

  private getList = () => {
    let userId = this.userInfo._id
      if (this.userInfo.identity === 'user') {
        userId = this.userInfo.pid
      }
    Api.memberTreeList(userId).then((res: IMODApiData) => {
      if (res.code === 10000 || res.code === 10001) {
        this.setState({
          listData: res.data
        })
      } else {
        this.setState({
          listData: []
        })
      }
    }).catch(() => {})
  }

  private cancelEdit() {
    this.setState({
      status: false
    })
  }
  // 左边显示
  private MembershipPage() {
    const { status, isChecked, listData, detailItem } = this.state
    const MemberPage = isChecked ? (
      <div className="memberDetail">
        {status ? (
          <MemberEdit
            listData={listData}
            handleEdit={this.handleEdit}
            detailItem={detailItem}
            cancel={this.cancelEdit}
            success={this.editSuccess}
          />
        ) : (
          <MemberDetail
            handleEdit={this.handleEdit}
            detailItem={detailItem}
            userInfo={this.userInfo}
          />
        )}
      </div>
    ) : (
      <NGNoData text="还没有选中的内容哦~"/>
    )
    return MemberPage
  }

  // 搜索
  private getSearch() {
    const search = (
      <Input
        className="search_icon mr-20"
        placeholder="请输入成员名称"
        suffix={
          <Icon className="fs-20 ngLayout_headerTop_searchIcon csp" type="search" />
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
      addItem
    } = this.state
    return (
      <div className="Membership">
        <div className="flex">
          <div className="Membership_left mr-16">
            <NGHeader
              title="人物关系"
              size="big"
              className="Membership_left_header"
              extra={
                ['god','admin'].includes(this.userInfo && this.userInfo.identity) &&
                <span
                  className="Membership_options"
                  onClick={this.handleAdd.bind(this,{})}
                >
                  <Tooltip title="新增">
                    <Icon className="csp" type="plus-circle" />
                  </Tooltip>
                </span>
              }
            />
            <p className="pl-16 pr-16 mt-16">{this.getSearch()}</p>
            <div className="Membership_left_tree pl-24 pr-24">
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
              />
            </div>
          </div>
          <div className="Membership_page">
            <div className="Membership_page_content">
              {this.MembershipPage()}
            </div>
          </div>
        </div>
        {visible && (
          <MemberAdd
            userInfo={this.userInfo}
            onCancel={this.onCancel.bind(this)}
            addItem={addItem}
            addSuccess={this.addSuccess}
            listDataLen={listData.length}
            pidTree={listData}
          />
        )}
      </div>
    )
  }
}
export default Membership