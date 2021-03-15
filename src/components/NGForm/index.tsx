
import React, { ReactNode } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import NGFormItem, { IListItem, IFormItemLayout } from './NGFormItem';

export interface IOptions {
  label: string;
  value: string | ReactNode;
  depart?: string[];
}
export interface IList {
  list: IListItem[];
  show?: string;
  className?: string;
}
export interface IProps extends FormComponentProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  list: IList[];
  formItemLayout?: IFormItemLayout | {};
  className?: string;
}
export interface WrappedForm extends WrappedFormUtils {}

export interface IWrappedComponentRef extends RegistrationForm {}

class RegistrationForm extends React.Component<IProps, {}> {
  static defaultProps = {
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }
  };
  constructor(props: IProps) {
    super(props);
    this.getListNode = this.getListNode.bind(this);
    this.getFormListNode = this.getFormListNode.bind(this);
  }
  private getListNode(list: IListItem[]) {
    const { formItemLayout } = this.props;
    const { getFieldDecorator } = this.props.form;
    const node = list.map((item: IListItem) => {
      const options = { initialValue: '', ...item.fieldDecorator };
      if (!options.initialValue) {
        delete options.initialValue;
      }
      const layout = item.formItemLayout ? item.formItemLayout : formItemLayout;
      const itemInfo = {
        ...item,
        attribute: { ...item.attribute },
        fieldDecorator: { ...item.fieldDecorator }
      };
      return (
        <NGFormItem
          className={item.className ? item.className : ''}
          key={item.field}
          formItemLayout={layout}
          item={itemInfo}
          getFieldDecorator={getFieldDecorator}
        />
      );
    });
    return node;
  }
  private getFormListNode() {
    const { list } = this.props;
    const listNode = list.map((item: IList, index: number) => {
      const show = item.show === 'none' ? false : true;
      return (
        show && (
          <div key={index} className={item.className}>
            {this.getListNode(item.list)}
          </div>
        )
      );
    });
    return listNode;
  }
  public render() {
    const { layout, className } = this.props;
    return (
      <Form
        layout={layout ? layout : 'horizontal'}
        className={`ngForm ${className}`}
      >
        {this.getFormListNode()}
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create<IProps>()(RegistrationForm);
export default WrappedRegistrationForm;
