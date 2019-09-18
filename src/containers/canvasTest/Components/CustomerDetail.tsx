import React, { PureComponent } from 'react'
import NGPage,{IPageProps} from 'components/NGPage'
import { Button } from 'antd'
const initialState = {}
interface IProps extends IPageProps{
  handleEdit: () => void
  detailItem: any
}
interface IState {}
class DepartmentDetail extends PureComponent<IProps, IState> {
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
      { title: '部门名称', value: detailItem.title },
      { title: '上级部门', value: detailItem.pTitle},
      { title: '部门人数', value: detailItem.userSum },
      { title: '是否为医疗部门', value: detailItem.medicalFlag?'是':'不是'},
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
        <header className="departmentDetail_header">{detailItem.title}</header>
        <ul className="departmentDetail pl-50 pr-50">
        {this.getDetailItem()}
        </ul>
        {this.props.getPerMiss('editDepartment')&&<div className=" flex_c departmentBtn">{addButton}</div>}
      </React.Fragment>
    )
  }
}

export default NGPage(DepartmentDetail)