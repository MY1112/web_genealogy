import React, { PureComponent } from 'react'
import { Button } from 'antd'
const initialState = {}
interface IProps {
  handleEdit: () => void
  detailItem: any
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

  private getDetailItem (){
    const {detailItem} = this.props
    const detailVal = [
      { title: '成员名称', value: detailItem.title },
      { title: '上级成员', value: detailItem.pTitle},
      { title: '子孙人数', value: detailItem.userSum },
      { title: '是否在世', value: detailItem.medicalFlag?'是':'不是'},
      {title: '备注', value:detailItem.titps?detailItem.titps:'-'}
    ]
    const detailItemData=detailVal.map((item:{title:string,value:string})=><li className="fs-16 mt-35  flex" key={item.title}><span style={{width:'150px'}}>{item.title}</span><span className="flex_1">{item.value}</span></li>)
    return detailItemData
  }

  render() {
    const {detailItem} = this.props
    const addButton = (
      <Button  className="primary_btn" onClick={this.handleEdit}>
        编辑
      </Button>
    )

    return (
      <React.Fragment>
        <header className="memberDetail_header">{detailItem.title}</header>
        <ul className="memberDetail_content pl-50 pr-50">
        {this.getDetailItem()}
        </ul>
        <div className="flex_c memberBtn">{addButton}</div>
      </React.Fragment>
    )
  }
}

export default MemberDetail