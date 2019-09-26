import React, { PureComponent } from 'react'
import NGForm, { IWrappedComponentRef } from 'components/NGForm'
import NGModal from 'components/NGModal'
import { RadioChangeEvent } from 'antd/lib/radio'
import { getFormList } from './FormList'

const initialState = {
  pidTree: [],
  confirmLoading: false,
  livingVisble: false,
  marryVisble: false,
  dateDeath: []
}

interface IdateItem {
  value?: string
  title?: string
  children?: Object[]
  key?: string
  pid?: string
}

interface IProps {
  onCancel: () => void
  addItme: IdateItem;
  addSuccess: () => void;
  listDataLen: number
}
interface IState {
  pidTree: object[]
  confirmLoading: boolean
  livingVisble: boolean
  marryVisble: boolean
  dateDeath: object[]
}

class MemberAdd extends PureComponent<IProps, IState> {
  private form: IWrappedComponentRef
  constructor(props: IProps) {
    super(props)
    // this.handleAddOk = throttle(this.handleAddOk, 400)
  }
  readonly state: IState = initialState

  private saveFormRef = (form: IWrappedComponentRef) => {
    this.form = form
  }

  componentDidMount() {
    setTimeout(() => {
      this.getParantTree()
    }, 10)
  }
  private getParantTree = () => {
    const { addItme } = this.props
    const form = this.form.props.form
    if (addItme.value) {
      form.setFieldsValue({ pid: addItme.value })
    }
    
      this.setState({
        pidTree: [{
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

  private handleAddOk = () => {
    // const form = this.form.props.form
    // this.setState({ confirmLoading: true })
    // form.validateFieldsAndScroll((err: Error, values: object) => {
    //   this.setState({ confirmLoading: false })
    //   if (err) {
    //     return
    //   }
    //   Api.addDepartment(values).then((res: IMODApiData) => {
    //     if (res.code === 10000) {
    //       message.success('新增成功')
    //       this.props.addSuccess()
    //     }
    //   })
    //   this.props.onCancel()
    //   this.setState({ confirmLoading: false })
    // })
  }
  private onCancel = () => {
    this.props.onCancel()
  }
  public handleChangeLiving = (e: RadioChangeEvent) => {
    this.setState({
      livingVisble: !e.target.value
    })
  }
  public handleChangeMarry = (e: RadioChangeEvent) => {
    this.setState({
      marryVisble: e.target.value
    })
  }

  render() {
    const list = getFormList(this)
    const { listDataLen } = this.props
    if (!listDataLen) {
      delete list[0].list[1]
    }
    return (
      <React.Fragment>
        <NGModal
          textAlign="right"
          title="新增人员"
          visible={true}
          width={680}
          okText="保存"
          onOk={this.handleAddOk}
          wrapClassName="treeTypeAddModal"
          onCancel={this.onCancel}
          confirmLoading={this.state.confirmLoading}
        >
          <div className="memberAddContent">
            <NGForm wrappedComponentRef={this.saveFormRef} list={list} />
          </div>
        </NGModal>
      </React.Fragment>
    )
  }
}
export default MemberAdd
