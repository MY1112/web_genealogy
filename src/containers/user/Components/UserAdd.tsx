import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item
const RadioGroup = Radio.Group

interface IProps extends FormComponentProps {
  visibel: boolean
  handleOk: (value: any) => void
  handleCancel: () => void
}

interface IState {}

class UserAdd extends Component<IProps, IState> {
  private handleOk = () => {
    this.props.form.validateFields((err,value) => {
      if (!err) {
        this.props.handleOk(value)
      }
    })
  }
  componentWillReceiveProps = (nextProps: IProps) => {
    if (nextProps.visibel && !this.props.visibel) {
      this.props.form.resetFields()
    }
  }  
  render() {
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
          visible={this.props.visibel}
          onCancel={this.props.handleCancel}
          onOk={this.handleOk}
        >
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名'
                }
              ]
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="账号">
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请输入账号'
                }
              ]
            })(<Input placeholder="请输入账号" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ]
            })(<Input placeholder="请输入密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="身份">
            {getFieldDecorator('Identity')(
              <RadioGroup>
                <Radio value="admin">管理员</Radio>
                <Radio value="user">普通</Radio>
                <Radio value="god">神</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(UserAdd)
