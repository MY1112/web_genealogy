/*
 * @Author: mengyuan 
 * @Date: 2019-08-15 11:18:30 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-08-15 11:35:19
 */
import './index.less'
import React, { SFC } from 'react'
interface Ititle {
  title: string,
  size?:string,
  extra?:any,
  className?:string
}
const NGHeader: SFC<Ititle> = ({ title, extra, size = 'small',className }) => {
  return (
    <div className={`ngHeader ngHeader_${size} ${className}`}>
      <span className={`ngHeader_span ngHeader_${size}_span ml-10`}>{title}</span>
      {extra}
    </div>
  )
}

export default NGHeader