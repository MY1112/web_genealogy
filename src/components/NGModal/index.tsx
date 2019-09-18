
import React, { PureComponent, Children, Fragment, createRef } from 'react'
import DragTitle from './DragTitle'
import { Button, Modal } from 'antd'
import './index.less'
interface IProps {
  sideWidth?: number
  style?: object
  width?: number
  okText?: string
  cancelText?: string
  title: string
  confirmLoading?: boolean
  visible: boolean
  wrapClassName?: string
  closable?: boolean
  isShowCancelButton?: boolean
  onCancel?(): void
  onOk?(): void
  afterClose?(): void
  textAlign: 'right' | 'left' | 'center'
  okDisabled?: boolean
  cancelDisabled?: boolean
  footer?: React.ReactNode | null
  canDrag?: boolean
  footerRender?:React.ReactNode 
}
interface IState {
  dragStyle: {
    [x: string]: string
  }
}
export default class NGModal extends PureComponent<IProps, IState> {
  private ngModalRef = createRef()
  constructor(props: IProps) {
    super(props)
    this.getButtonNode = this.getButtonNode.bind(this)
    this.state = {
      dragStyle: {}
    }
  }
  static defaultProps = {
    sideWidth: 0,
    width: 400,
    okText: '确定',
    cancelText: '取消',
    title: '标题',
    confirmLoading: false,
    isShowCancelButton: true,
    visible: false,
    wrapClassName: '',
    closable: true,
    textAlign: 'right',
    okDisabled: false,
    cancelDisabled: false,
    canDrag: true
  }
  private getButtonNode(): JSX.Element | null {
    const {
      onOk,
      confirmLoading,
      onCancel,
      cancelText,
      okText,
      isShowCancelButton,
      textAlign,
      okDisabled,
      cancelDisabled,
      footer,
      footerRender
    } = this.props
    if (footer === null) {
      return null
    }
    if (!onOk && !(isShowCancelButton &&
      onCancel)) return null
    const style = { textAlign }
    return (
      <>
      <div className="mt-14" style={style}>
        {footerRender}
        {isShowCancelButton &&
          onCancel && (
            <Button disabled={cancelDisabled} className={`ml-16 ${cancelDisabled ? 'disabled_btn' : 'default_btn'}`} onClick={onCancel}>
              {cancelText}
            </Button>
          )}
        {onOk && (
          <Button
            disabled={okDisabled}
            className={`ml-16 ${okDisabled ? 'disabled_btn' : 'primary_btn'}`}
            loading={confirmLoading}
            type="primary"
            onClick={onOk}
          >
            {okText}
          </Button>
        )}
      </div>
      </>
    )
  }

  private getPosition = (left: number, top: number) => {
    const { sideWidth = 0 } = this.props
    this.setState({
      dragStyle: {
        position: 'absolute',
        left: `${left - 24 + sideWidth}px `,
        top: `${top}px`
      }
    })
  }
  private getModalTitle = () => {
    const { title, canDrag } = this.props
    if(!canDrag) return title
    return <DragTitle getPosition={this.getPosition} title={title} />
  }
  public render() {
    const {
      width,
      visible,
      closable,
      onCancel,
      wrapClassName,
      afterClose,
      children,
      style
    } = this.props
    const { dragStyle } = this.state
    const isShowClosable = !!(closable && onCancel)
    return (
      <Modal
        ref={this.ngModalRef}
        style={{...style , ...dragStyle}}
        afterClose={afterClose}
        wrapClassName={`ngModal ${wrapClassName}`}
        width={width}
        footer={null}
        closable={isShowClosable}
        maskClosable={false}
        destroyOnClose={true}
        visible={visible}
        onCancel={onCancel}
        title={this.getModalTitle()}
        centered={true}
      >
        <Fragment>
          {children && Children.only(children)}
          {this.getButtonNode()}
        </Fragment>
      </Modal>
    )
  }
}
