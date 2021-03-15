import React, { Component, ChangeEvent } from 'react'
import { Input, Row, Col, Button, Table, Modal, message } from 'antd'
import UserAdd from './Components/UserAdd'
import UserEdit from './Components/UserEdit'
import { getColumns } from './Columns'
import './index.less'
import Api, { IResApiData } from './Api'
const Search = Input.Search
const confirm = Modal.confirm

const initialState = {
  tableLoading: false,
  username: '',
  list: [],
  addVisible: false,
  editVisible: false,
  userInfo: {
    pid: '',
    username: '',
    identity: '',
    password: '',
    parents: '',
    _id: ''
  }
}

export interface IListItem {
  pid: string
  username: string
  identity: string
  password: string
  parents: string
  _id: string
}

const jsonUser = localStorage.getItem('userInfo');
const userItem = jsonUser ? JSON.parse(jsonUser) : undefined;

interface IProps {}

interface IState {
  tableLoading: boolean
  username: string
  addVisible: boolean
  editVisible: boolean
  list: IListItem[]
  userInfo: IListItem
}

class UserList extends Component<IProps, IState> {
  readonly state: IState = initialState
  public userItem = userItem
  componentDidMount() {
    this.userItem = JSON.parse(localStorage.getItem('userInfo')||'')
    this.getUserList()
  }

  private getUserList = () => {
    const { username } = this.state
    this.setState({tableLoading:true},() => {
      Api.getUserList({
        keywords: username,
        identity: this.userItem?.identity,
        pid: this.userItem?._id
      }).then((res: IResApiData) => {
        if (res.code === 10001) {
          this.setState({
            list: res.data,
            tableLoading: false
          })
        }
        this.setState({
          tableLoading: false
        })
      }).catch((err: Error) => {
        this.setState({tableLoading: false})
        console.error(err)
      })
    })
  }

  private onchange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value
    })
  }
  private handleCancel = () => {
    this.setState({
      addVisible: false,
      editVisible: false
    })
  }
  private handleAddOk = () => {
    this.setState({
      addVisible: false,
      editVisible: false
    },() => {
      this.getUserList()
    })
  }
  private handleAdd = () => {
    this.setState({
      addVisible: true
    })
  }

  public handleEditUser = (row: IListItem) => {
    this.setState({
      editVisible: true,
      userInfo: row
    })
  }

  public handleDeleteUser = (id: string) => {
    const THIS = this
    confirm({
      title: '确认删除该用户吗?',
      onOk() {
        Api.userDel(id).then((res: IResApiData) => {
          message.success('删除成功')
          THIS.getUserList()
        }).catch(err => {
          console.error(err)
        })
      },
      onCancel() {}
    })
  }
  render() {
    const { addVisible, editVisible, userInfo, list, tableLoading } = this.state
    const columns = getColumns(this)
    return (
      <div className="userList">
        <Row gutter={16}>
          <Col span={4}>
            <Search
              placeholder="姓名"
              onChange={this.onchange}
              value={this.state.username}
            />
          </Col>
          <Col span={4}>
            <Button
              className="search_user_btn"
              type="primary"
              onClick={this.getUserList}
            >
              查询
            </Button>
          </Col>
          <Col span={4} offset={12}>
            <Button
              className="primary_btn"
              style={{ float: `right` }}
              onClick={this.handleAdd}
            >
              新增用户
            </Button>
          </Col>
        </Row>
        <div className="mt-16">
          <Table
            loading={tableLoading}
            bordered={true}
            columns={columns}
            dataSource={list}
            pagination={{ pageSize: 6 }}
            rowKey={'_id'}
          />
        </div>
        {addVisible && (
          <UserAdd
            userInfo={this.userItem}
            visible={this.state.addVisible}
            handleCancel={this.handleCancel}
            handleOk={this.handleAddOk}
          />
        )}
        {editVisible && (
          <UserEdit
            visible={editVisible}
            userInfo={userInfo}
            handleOk={this.handleAddOk}
            handleCancel={this.handleCancel}
          />
        )}
      </div>
    )
  }
}

export default UserList
