import React, { PureComponent } from 'react'
import { message } from 'antd'
import NGForm, { IWrappedComponentRef } from 'components/NGForm'
import NGModal from 'components/NGModal'
import { RadioChangeEvent } from 'antd/lib/radio'
import { getFormList } from './FormList'
import moment from 'moment'
import Api, { IResApiData } from '../Api'
import { IListItem } from './MemberDetail'

const initialState = {
  birthplaceText: '',
  confirmLoading: false,
  livingVisble: false,
  marryVisble: false,
  dateDeath: [],
  pidItem: {
    value: '',
    title: '',
    children: [],
    key: '',
    pid: '',
    pids: []
  }
}

export interface IDateItem {
  value: string
  title: string
  children: Object[]
  key: string
  pid: string
  pids: string[]
}

interface IProps {
  onCancel: () => void
  addItem: IDateItem;
  addSuccess: () => void;
  listDataLen: number
  pidTree: IDateItem[]
  userInfo: IListItem
}
interface IState {
  birthplaceText: string
  confirmLoading: boolean
  livingVisble: boolean
  marryVisble: boolean
  dateDeath: object[]
  pidItem: IDateItem;
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
    const { addItem } = this.props
    const form = this.form.props.form
    if (addItem.value) {
      this.setState({
        pidItem: addItem
      }, () => {
        form.setFieldsValue({ pid: addItem.value })
      })
    }
  }

  public handleSelectPid = (value: string, node: any) => {
    this.setState({
      pidItem: node.props
    })
  }

  private handleAddOk = () => {
    const { pidTree, userInfo } = this.props
    const { birthplaceText, pidItem } = this.state
    const form = this.form.props.form
    this.setState({ confirmLoading: true })
    form.validateFieldsAndScroll((err: Error, values: any) => {
      if (err) {
        this.setState({ confirmLoading: false })
        return
      }
      if (values.dateBirth) {
        values.dateBirth = moment(values.dateBirth).format('YYYY-MM-DD')
      }
      if (values.dateDeath) {
        values.dateDeath = moment(values.dateDeath).format('YYYY-MM-DD')
      }
      values.userId = userInfo?._id
      values.birthplaceText = birthplaceText
      if (pidTree.length > 0) {
        const newPids = [...pidItem.pids]
        newPids.push(pidItem.value)
        values.pids = newPids
        values.pTitle = pidItem.title
      } else {
        values.pid = "0"
        values.pids = ["0"]
      }
      Api.memberAdd(values).then((res: IResApiData) => {
        if (res.code === 10000) {
          message.success('新增成功')
          this.setState({ confirmLoading: false })
          this.props.addSuccess()
          this.props.onCancel()
        }
      }).catch(() => {
        this.setState({ confirmLoading: false })
      })
    })
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
  public handleChangeBirthplace = (value: any, selectedOptions: any) => {
    let birthplaceText = ''
    selectedOptions.forEach((item: any, index: number) => {
      birthplaceText += index === selectedOptions.length - 1 ? item.label : `${item.label}/`
    })
    this.setState({
      birthplaceText
    })
  }

  render() {
    const list = getFormList(this as any)
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
