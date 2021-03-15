import React, { Component } from 'react'
import { Modal, Form, Input, Radio, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { IListItem } from '../index'
import Api, { IResApiData } from '../Api'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const initialState = {
  loading: false
}

interface IProps extends FormComponentProps {
  userInfo: IListItem // 修改的用户信息
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}

interface IState {
  loading: boolean
}

class UserEdit extends Component<IProps, IState> {
  readonly state: IState = initialState
  private handleOk = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.setState({loading: true},() => {
          const values = {
            username: value.username,
            password: value.password,
            parents: value.parents,
            id: this.props.userInfo._id
          }
          Api.userUpdate(values).then((res: IResApiData) => {
            if(res.code === 10000) {
              message.success('修改成功')
              this.setState({loading: false})
              this.props.handleOk()
            }
          }).catch((err: Error) => {
            console.error(err)
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
  render() {
    const { loading } = this.state
    const { userInfo } = this.props
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
          title="编辑用户"
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
              ],
              initialValue: userInfo.username || ''
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ],
              initialValue: userInfo.password || ''
            })(<Input placeholder="请输入密码" />)}
          </FormItem>
          {
            (userInfo.identity === 'god' || userInfo.identity === 'admin') &&
            <FormItem {...formItemLayout} label="家谱姓氏">
              {getFieldDecorator('parents', {
                rules: [
                  {
                    required: true,
                    message: '请输入家谱姓氏'
                  }
                ],
                initialValue: userInfo.parents || ''
              })(<Input style={{ width: 200, marginRight: 8 }} placeholder="请输入家谱姓氏" />)}
              氏族谱
            </FormItem>
          }
        </Modal>
      </div>
    )
  }
}

export default Form.create()(UserEdit)
