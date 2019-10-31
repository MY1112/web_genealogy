import React, { PureComponent } from 'react'
import { Button } from 'antd'
import moment from 'moment'
const initialState = {}

export interface IListItem {
  pid: string
  username: string
  identity: string
  password: string
  parents: string
  _id: string
}
interface IProps {
  handleEdit: () => void
  detailItem: any
  userInfo: IListItem
}
interface IState {}
class MemberDetail extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }
  readonly state: IState = initialState


  private handleEdit() {
    this.props.handleEdit()
  }

  private getDetailItem() {
    const {detailItem} = this.props
    const detailVal = [
      { title: '成员姓名', value: detailItem.title },
      { title: '上级成员', value: detailItem.pTitle },
      { title: '子孙人数', value: detailItem.userSum },
      { title: '性别', value: detailItem.genderFlag ? '男' : '女' },
      { title: '出生日期', value: detailItem.dateBirth ? moment(detailItem.dateBirth).format('YYYY-MM-DD') : '-' },
      { title: '是否在世', value: detailItem.livingFlag ? '是':'否'},
      { title: '去世时间', value: detailItem.dateDeath ? detailItem.dateDeath : '-' },
      { title: '籍贯', value: detailItem.birthplace ? detailItem.birthplace : '-' },
      { title: '现居地', value: detailItem.address ? detailItem.address : '-' },
      { title: '是否结婚', value: detailItem.marryFlag ? '是' : '否' },
      { title: '配偶姓名', value: detailItem.spouseName ? detailItem.spouseName : '-' },
      { title: '生平经历', value: detailItem.deeds ? detailItem.deeds : '-' },
      { title: '备注', value: detailItem.remark ? detailItem.remark : '-' }
    ]
    const detailItemData = detailVal.map((item:{title:string,value:string}) => 
      <li className="fs-16 mt-35  flex" key={item.title}>
        <span style={{ width:'150px' }}>{ item.title }</span>
        <span className="flex_1">{ item.value }</span>
      </li>
    )
    return detailItemData
  }

  render() {
    const { detailItem, userInfo } = this.props
    const addButton = (
      <Button className="primary_btn" onClick={this.handleEdit}>
        编辑
      </Button>
    )

    return (
      <React.Fragment>
        <header className="memberDetail_header">{detailItem.title}</header>
        <ul className="memberDetail_content pl-50 pr-50 pb-20">
          {this.getDetailItem()}
        </ul>
        {
          ['god','admin'].includes(userInfo.identity) &&
          <div className="flex_c memberBtn">{addButton}</div>
        }
      </React.Fragment>
    )
  }
}

export default MemberDetail