/*
 * @Author: huangying
 * @Date: 2018-09-26 16:00:37
 * @Last Modified by: huangying
 * @Last Modified time: 2018-12-18 20:15:17
 */

import React, { SFC,ReactNode } from 'react'
import './index.scss'
interface IProps {
  className?: string
  text?: string | ReactNode
  noDataSrc?: any
  textClassName?: string
  style?: object
}

const NGNoData: SFC<IProps> = ({ text = '暂时没有数据哦～', noDataSrc, className, textClassName, style }) => {
  const noData = noDataSrc ? noDataSrc : require('static/noData.png')
  return (
    <div style={style || {}} className={`flex_c flex_column ngNoData ${className}`}>
      <img src={noData} className="noData_img" />
      <div className={`fs-16 noData_text mb-40 ${textClassName}`}>{text}</div>
    </div>
  )
}
export default NGNoData
