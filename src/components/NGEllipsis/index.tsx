import React, { SFC } from 'react'
import { Popover } from 'antd'
import './index.less'
export interface Iprops {
  len?: number
  val: string | string[]
  block?: boolean
  className?: string
}
const Ellipsis: SFC<Iprops> = ({ len = 8, val, block = true, className }) => {
  const type = typeof val
  let data = ''
  let getValue = null
  data = val ? val.toString() : ''
  if (type === 'object'&&val instanceof Array) {
    let arrayVal = val||[]
    arrayVal = arrayVal.filter((text: string)=> text)
    const content = arrayVal.map((item: string, key: number) => (
      <span className={block ? `` : `ellipsis_project`} key={key}>
        {item}{block&&(arrayVal.length-1!==key)&&'，'}
      </span>
    ))

    const popoverCont = arrayVal.map((item: string, key: number) => (
      <li className={block ?'ellipsis_block p-2':'ellipsis_popoverCont_li'} key={key}>
        {item}
      </li>
    ))
    const sliceArray = arrayVal.slice(0, len)
    getValue = !val || !val.length? (
      '-'
    ) : arrayVal.length > len ? (
      <Popover placement="bottomRight" overlayClassName="ellipsis_overlayPopover" content={<ul className="ellipsis_popoverCont mb-0">{popoverCont}</ul>} trigger="hover">
        <span className="csp">
          {sliceArray.map((item: string, key: number) => (
            <span
              className={block ? '' : `ellipsis_project`}
              key={key}
            >
              {item}{block&&(len-1!==key)&&'，'}
            </span>
          ))}
          <span>...</span>
        </span>
      </Popover>
    ) : (
      content
    )
  } else {
    getValue = !val ? (
      '-'
    ) : data.length > len ? (
      <Popover overlayClassName="ellipsis_overlayPopover" placement="bottomRight" content={<div
        dangerouslySetInnerHTML={{
          __html: typeof val === 'string' ? val.replace(/[\n\r]/g, '<br/>') : val
        }}
      />} trigger="hover">
        <span className="csp">{data.length > len ? `${data.substr(0, len)}...` : data}</span>
      </Popover>
    ) : (
      val
    )
  }
  return <span className={`${className} ellipsis`}>{getValue}</span>
}

export default Ellipsis
