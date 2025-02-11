import React, { Component } from 'react'
import { Modal, Form, Input, Radio, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RadioChangeEvent } from 'antd/lib/radio'
import Api, { IResApiData } from '../Api'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const initialState = {
  loading: false,
  identity: 'user'
}

interface IProps extends FormComponentProps {
  userInfo: IListItem // 当前登录人信息
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}

interface IListItem {
  pid: string
  username: string
  identity: string
  password: string
  parents: string
  _id: string
}

interface IState {
  loading: boolean
  identity: string
}

class UserAdd extends Component<IProps, IState> {
  readonly state: IState = initialState
  private handleOk = () => {
    const { userInfo } = this.props
    const { identity } = this.state
    this.props.form.validateFields((err,value) => {
      if (!err) {
        this.setState({loading: true},() => {
          const values = {
            identity,
            username: value.username,
            password: value.password,
            parents: value.parents || userInfo?.parents,
            pid: userInfo?._id
          }
          Api.signup(values).then((res: IResApiData) => {
            if(res.code === 10000) {
              message.success('注册成功')
              this.setState({loading: false})
              this.props.handleOk()
            }
          }).catch((err: Error) => {
            this.setState({loading: false})
          })
        })
      }
    })
  }
  componentWillReceiveProps = (nextProps: IProps) => {
    if (nextProps.visible && !this.props.visible) {
      this.props.form.resetFields()
    }
  }
  private handleChangeIdentity = (e: RadioChangeEvent) => {
    this.setState({
      identity: e.target.value
    })
  }
  render() {
    const { userInfo }  = this.props
    const { loading, identity } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
    return (
      <div>
        <Modal
          okText="确认"
          cancelText="取消"
          title="新增用户"
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          onOk={this.handleOk}
          confirmLoading={loading}
          maskClosable={false}
        >
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名'
                }
              ]
            })(<Input style={{ width: 200 }} placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ]
            })(<Input style={{ width: 200 }} placeholder="请输入密码" />)}
          </FormItem>
          {
            userInfo?.identity === 'god' && identity !== 'user' &&
            <FormItem {...formItemLayout} label="家谱姓氏">
              {getFieldDecorator('parents', {
                rules: [
                  {
                    required: true,
                    message: '请输入家谱姓氏'
                  }
                ]
              })(<Input style={{ width: 200, marginRight: 8 }} placeholder="请输入家谱姓氏" />)}
              氏族谱
            </FormItem>
          }
          <FormItem {...formItemLayout} label="身份">
            {getFieldDecorator('identity',{
              initialValue: identity
            })(
              <RadioGroup>
                {
                  userInfo?.identity === 'god' ?
                  <Radio.Group onChange={this.handleChangeIdentity} value={identity}>
                    <Radio value="admin">管理员</Radio>
                    <Radio value="user">普通</Radio>
                    <Radio value="god">神</Radio>
                  </Radio.Group>
                  :
                  <React.Fragment>
                    <Radio value="user">普通</Radio>
                  </React.Fragment>
                }
              </RadioGroup>
            )}
          </FormItem>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(UserAdd)
