import React, { ReactNode,memo} from 'react'
import Ellipsis from 'components/NGEllipsis'
import { Row, Col } from 'antd'
import './index.less'
interface IProps {
  dataList: IItems[]
  titleSpan?: number
  className?: string
}

export interface IItems {
  title: string
  value: any
}
const getNodes = (
  dataList: IItems[],
  titleSpan?: number,
  valueSpan?: number
): ReactNode => {
  return dataList.map((item, index) => {
    return (
      <Row className="mes_list_row mes-list-wieght" key={index}>
        <Col span={titleSpan} className="mes_list_row_title">
          <div className="mes_list_row_title_flex"><Ellipsis val={item.title} /></div>
        </Col>
        <Col span={valueSpan} className="mes_list_row_value pl-12">
          <div className="mes_list_row_value_flex ">
          {
            item.title==='头像'?
            (item.value === undefined || item.value === null || item.value === '' || (Object.prototype.toString.call(item.value) ==='[object Array]') && item.value.length === 0 ) ? '-' : item.value
             : <span>{
               (item.value === undefined || item.value === null || item.value === '' || (Object.prototype.toString.call(item.value) ==='[object Array]') && item.value.length === 0 )
               ?
                '-'
                :
                 (Object.prototype.toString.call(item.value) ==='[object Array]' ? item.value.join('、'): item.value) }</span>
          }
          </div>
        </Col>
      </Row>
    )
  })
}


function NGMesList (props:IProps){
  const {dataList,titleSpan = 6, className} = props
  return (
    <ul className={`mes_list ${className}`}>
      {getNodes(dataList, titleSpan, 24-titleSpan)}
    </ul>
  )
}

export default memo(NGMesList)
