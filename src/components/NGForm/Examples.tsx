
import React, { PureComponent } from 'react'
import NGForm, { IWrappedComponentRef, IList, WrappedForm } from 'components/NGForm'
import NGModal from '../NGModal'
import getFormList from './ExamplesList'
import { Form, Input } from 'antd'
import './Examples.less'
const FormItem = Form.Item
const initialState = {
  options: [],
  searchValue: ''
}
interface IProps {
  test: string
}
interface IState {
  options: { value: string; label: string }[]
  searchValue: string
}
class Home extends PureComponent<IProps, IState> {
  private form: WrappedForm
  constructor(props: IProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSearchPerson = this.onSearchPerson.bind(this)
    this.onBlurPerson = this.onBlurPerson.bind(this)
    this.saveFormRef = this.saveFormRef.bind(this)
    this.setFieldsValue = this.setFieldsValue.bind(this)
    this.resetFields = this.resetFields.bind(this)
    this.validateFieldsAndScroll = this.validateFieldsAndScroll.bind(this)
    setTimeout(() => {
      this.setState({
        options: [
          {
            value: '155',
            label: 'a'
          },
          {
            value: '25545',
            label: 'ab'
          },
          {
            value: '3545',
            label: 'c'
          }
        ]
      })
    }, 1000)
  }
  readonly state: IState = initialState
  private onChange(e: string) {
    this.form.setFieldsValue({ radio: '25545' })
  }
  private onSearchPerson(e: string) {
    this.setState({ searchValue: e })
  }
  private onBlurPerson() {
    this.setState({ searchValue: '' })
  }
  public extra() {
    return <div>1111</div>
  }
  public exportNode = () => {
    return (
      <div className="select-tabs">
        <a className="tab-item" key="3">三个月</a>
        <a className="tab-item" key="6"> 六个月</a>
        <a className="tab-item" key="1">一年</a>
        <a className="tab-item" key="0">无限期</a>
      </div>
    )
  }
  public custom = (getFieldDecorator: Function) => {
    return (
      <React.Fragment>
        {[1, 2, 3].map((item, index) => (
          <FormItem key={index}>
            {getFieldDecorator(`input[${index}]`)(<Input />)}
          </FormItem>
        ))}
      </React.Fragment>
    )
  }
  /**
   * 动态设置其他控件的值
   * @param obj {field: value}
   */
  private setFieldsValue(obj: {}) {
    this.form.setFieldsValue(obj)
  }
  /**
   *
   * @param form 表单的ref
   */
  private saveFormRef(form: IWrappedComponentRef): void {
    if (form) {
      this.form = form.props.form
    }
  }
  /**
   * 提交验证 返回状态和内容
   */
  private validateFieldsAndScroll(): void {
    this.form.validateFieldsAndScroll((err: object, values: object) => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
  /**
   * 重置
   */
  private resetFields(): void {
    this.form.resetFields()
  }
  public render() {
    const list: IList[] = getFormList(this)
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
    return (
      <div>
        <NGModal
          width={600}
          onCancel={this.resetFields}
          visible={true}
          onOk={this.validateFieldsAndScroll}
        >
        <div>
          <NGForm wrappedComponentRef={this.saveFormRef} list={list}  layout="vertical"
              formItemLayout={formItemLayout}/>
        </div>
        </NGModal>
      </div>
    )
  }
}
export default Home
