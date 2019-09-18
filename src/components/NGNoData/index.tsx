
import React, { SFC,ReactNode } from 'react'
import './index.less'
interface IProps {
  className?: string
  text?: string | ReactNode
  noDataSrc?: any
  textClassName?: string
  style?: object
}

const NGNoData: SFC<IProps> = ({ text = '暂时没有数据哦～', noDataSrc, className, textClassName, style }) => {
  const noData = noDataSrc ? noDataSrc : require('../../assets/imgs/noData.png')
  return (
    <div style={style || {}} className={`flex_c flex_column ngNoData ${className}`}>
      <img src={noData} className="noData_img" />
      <div className={`fs-16 noData_text mb-40 ${textClassName}`}>{text}</div>
    </div>
  )
}
export default NGNoData
