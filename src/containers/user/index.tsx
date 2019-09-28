import React, { Component, ChangeEvent } from 'react'
import { Input, Row, Col, Button, Table, Modal } from 'antd'
import UserAdd from './Components/UserAdd'
import UserEdit from './Components/UserEdit'
import { getColumns } from './Columns'
import './index.less'
const Search = Input.Search
const confirm = Modal.confirm

const initialState = {
  name: '',
  list: [],
  filterList: [],
  addVisibel: false,
  editVisibel: false,
  userInfo: {
    name: '',
    key: '',
    Identity: '',
    account: '',
    password: ''
  }
}

export interface IListItem {
  name: string
  Identity: string
  key: string
  account: string
  password: string
}

interface IProps {}

interface IState {
  name: string
  addVisibel: boolean
  editVisibel: boolean
  list: IListItem[]
  filterList: IListItem[]
  userInfo: IListItem
}

class UserList extends Component<IProps, IState> {
  readonly state: IState = initialState
  componentWillMount = () => {
    let list = []
    for (let i = 0; i < 100; i++) {
      list.push({
        name: `张三${i}`,
        key: `${i}`,
        Identity: Math.random() > 0.5 ? 'admin' : '',
        account: `${i}`,
        password: '123456'
      })
    }
    this.setState({
      list,
      filterList: list
    })
  }

  private onchange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    })
  }
  private filterHandler = () => {
    let name = this.state.name
    if (!name || name === '0') {
      this.setState({
        filterList: this.state.list
      })
      return false
    } else {
      let filterList = this.state.list.filter(el => {
        return el.name === name
      })
      this.setState({
        filterList
      })
    }
  }
  private handleCancel = () => {
    this.setState({
      addVisibel: false,
      editVisibel: false
    })
  }
  private handleAddOk = (value: IListItem) => {
    value.key = `${this.state.list.length + 1}`
    this.state.list.unshift(value)
    this.setState({
      addVisibel: false,
      list: this.state.list
    })
    this.filterHandler()
  }
  private handleAdd = () => {
    this.setState({
      addVisibel: true
    })
  }

  public handleEditUser = (row: IListItem) => {
    this.setState({
      editVisibel: true,
      userInfo: row
    })
  }

  public handleDeleteUser = (key: string) => {
    confirm({
      title: '确认删除该用户吗?',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  render() {
    const {
      addVisibel,
      editVisibel,
      userInfo,
      filterList
    } = this.state
    const columns = getColumns(this)
    return (
      <div className="userList">
        <Row gutter={16}>
          <Col span={4}>
            <Search
              placeholder="姓名"
              onChange={this.onchange}
              value={this.state.name}
            />
          </Col>
          <Col span={4}>
            <Button className="search_user_btn" type="primary" onClick={this.filterHandler}>
              查询
            </Button>
          </Col>
          <Col span={4} offset={12}>
            <Button className="primary_btn" style={{ float: `right` }} onClick={this.handleAdd}>
              新增用户
            </Button>
          </Col>
        </Row>
        <div className="mt-16">
          <Table
            bordered={true}
            columns={columns}
            dataSource={filterList}
            pagination={{ pageSize: 6 }}
          />
        </div>
        {
          addVisibel &&
          <UserAdd
            visibel={this.state.addVisibel}
            handleCancel={this.handleCancel}
            handleOk={this.handleAddOk}
          />
        }
        {
          editVisibel && 
          <UserEdit
            visibel={editVisibel}
            userInfo={userInfo}
            handleCancel={this.handleCancel}
          />
        }
      </div>
    )
  }
}

export default UserList
