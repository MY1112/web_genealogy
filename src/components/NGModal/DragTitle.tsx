
import React, { PureComponent, MouseEvent } from 'react'

interface IProps {
  title: string
  getPosition: (left: number, top: number) =>  void
}
interface IState {
}

export default class DragTitle extends PureComponent<IProps, IState> {
  private dragModalTitleId = `dragModalTitle${new Date().getTime()}` as string
  constructor(props: IProps) {
    super(props)
    this.dragging = false
  }
  private dragging: boolean
  private dragDom: HTMLElement | null
  private left: number
  private top: number
  componentDidMount() {
    this.dragDom = document.getElementById(this.dragModalTitleId) as HTMLElement
  }
  componentDidUpdate() {
    if(!this.dragDom) {
      this.dragDom = document.getElementById(this.dragModalTitleId) as HTMLElement
    }
  }
  private onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if(this.dragDom) {
      this.dragging = true // 激活拖拽状态
      const dragDomRect = this.dragDom.getBoundingClientRect()
      this.left = e.clientX - dragDomRect.left // 鼠标按下时和选中元素的坐标偏移:x坐标
      this.top = e.clientY - dragDomRect.top // 鼠标按下时和选中元素的坐标偏移:y坐标
      this.onMouseMove(this.dragDom)
    }

  }

  private onMouseMove = (dragDom: HTMLElement) => {
    document.onmousemove = e => {
      e.preventDefault()
      if (this.dragging && dragDom) {
        const left = e.clientX - this.left
        const top = e.clientY - this.top
        this.props.getPosition(left, top)
      }
    }
  }
  private onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.dragging = false // 停止移动状态
    document.onmousemove = null // 停止鼠标移动事件
  }
  render() {
    const { title } = this.props
    return (
      <div
        className="dragModalTitle"
        id={this.dragModalTitleId}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {title}
      </div>
    )
  }
}
