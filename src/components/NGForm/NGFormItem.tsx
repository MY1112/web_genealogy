/*
 * @Author: huangying
 * @Date: 2018-08-28 21:31:02
 * @Last Modified by: huangying
 * @Last Modified time: 2019-05-14 19:05:17
 */

import React, { Component, ReactNode } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Cascader,
  TreeSelect,
  TimePicker,
  Switch,
  Rate,
  DatePicker,
  Icon,
  Popover,
  AutoComplete
} from 'antd';
import './NGFormItem.less';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const initialState = {};
export interface IListItem {
  type: string;
  field: string;
  label?: string | ReactNode;
  attribute?: any;
  fieldDecorator?: any;
  extra?: string | ReactNode;
  custom?: string | ReactNode;
  formItemLayout?: IFormItemLayout;
  className?: string;
  tips?: string;
  isShow?: boolean;
}
export interface IProps {
  item: IListItem;
  getFieldDecorator: any;
  formItemLayout?: IFormItemLayout | [];
  className?: string;
  isShowLabel?: boolean;
}
export interface IFormItemLayout {
  labelCol?: { span: number };
  wrapperCol?: { span: number };
}
export interface IOptions {
  label: string;
  value: string;
  depart?: string[];
}
interface IState {}
export default class NGFormItem extends Component<IProps, IState> {
  static defaultProps = {
    isShowLabel: true
  };
  readonly state: IState = initialState;
  constructor(props: IProps) {
    super(props);
    this.getItemNode = this.getItemNode.bind(this);
    this.getSelect = this.getSelect.bind(this);
    this.getTreeSelect = this.getTreeSelect.bind(this);
    this.getEmployeePickerNode = this.getEmployeePickerNode.bind(this);
    this.getCascader = this.getCascader.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.getAutoComplete = this.getAutoComplete.bind(this);
  }
  private getEmployeePickerNode(
    { getpopupcontainer, ...attribute }: any,
    type: string
  ) {
    const getName = (name: string, searchValue: string) => {
      if (!searchValue || !name) {
        return <p className="employeePicker_name">{name}</p>;
      }
      const index = name.indexOf(searchValue);
      const beforeStr = name.substr(0, index);
      const afterStr = name.substr(index + searchValue.toString().length);
      const label =
        index > -1 ? (
          <p className="employeePicker_name">
            {beforeStr}
            <span
              style={{ color: '#DE564A' }}
              className="employeePicker_name-active"
            >
              {searchValue}
            </span>
            {afterStr}
          </p>
        ) : (
          <p className="employeePicker_name">{name}</p>
        );
      return label;
    };
    const getDepart = (nameString: string | string[], searchValue: string) => {
      const name =
        typeof nameString === 'string' ? nameString : nameString.join('/');
      if (!searchValue || !name) {
        return (
          <p className="employeePicker_depart wes" style={{ color: '#C0C5CF' }}>
            {name}
          </p>
        );
      }
      const index = name.indexOf(searchValue);
      const beforeStr = name.substr(0, index);
      const afterStr = name.substr(index + searchValue.toString().length);
      const label =
        index > -1 ? (
          <p className="employeePicker_depart wes" style={{ color: '#C0C5CF' }}>
            {beforeStr}
            <span style={{ color: '#DE564A' }}>{searchValue}</span>
            {afterStr}
          </p>
        ) : (
          <p className="employeePicker_depart wes" style={{ color: '#C0C5CF' }}>
            {name}
          </p>
        );
      return label;
    };
    const { showDepart } = attribute;
    const title = (label: string, depart: any) => {
      const departs =
        depart && depart.length > 0
          ? typeof depart === 'string'
            ? depart
            : `(${depart.join('/')})`
          : '';
      return showDepart ? label + departs : label;
    };
    const filterOption = (input: string, option: any) => {
      const children = option.props.title ? option.props.title.toString() : ''
      return children.indexOf(input) > -1;
    };
    if (type === 'autoCompleteEmployeePickerNode') {
      return (
        <AutoComplete
          getPopupContainer={
            getpopupcontainer ||
            ((triggerNode: Element) => triggerNode.parentNode)
          }
          filterOption={filterOption}
          showSearch={true}
          optionLabelProp="title"
          {...attribute}
        >
          {attribute.options &&
            attribute.options.map((item: any) => (
              <Option
                {...item}
                key={item.value}
                title={title(item.label, item.depart)}
              >
                {getName(item.label, attribute.searchValue)}
                {item.depart &&
                  item.depart.length > 0 &&
                  getDepart(item.depart, attribute.searchValue)}
              </Option>
            ))}
        </AutoComplete>
      );
    }
    if (type === 'autoCompleteEmployeePickerNode') {
      return (
        <AutoComplete
          getPopupContainer={
            getpopupcontainer ||
            ((triggerNode: Element) => triggerNode.parentNode)
          }
          filterOption={filterOption}
          showSearch={true}
          optionLabelProp="title"
          {...attribute}
        >
          {attribute.options &&
            attribute.options.map((item: any) => (
              <Option
                {...item}
                key={item.value}
                title={title(item.label, item.depart)}
              >
                {getName(item.label, attribute.searchValue)}
                {item.depart &&
                  item.depart.length > 0 &&
                  getDepart(item.depart, attribute.searchValue)}
              </Option>
            ))}
        </AutoComplete>
      );
    }
    return (
      <Select
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        filterOption={filterOption}
        showSearch={true}
        optionLabelProp="title"
        {...attribute}
      >
        {attribute.options &&
          attribute.options.map((item: any) => (
            <Option
              {...item}
              key={item.value}
              title={title(item.label, item.depart)}
            >
              {getName(item.label, attribute.searchValue)}
              {item.depart &&
                item.depart.length > 0 &&
                getDepart(item.depart, attribute.searchValue)}
            </Option>
          ))}
      </Select>
    );
  }
  // v2
  private getAutoComplete({ getpopupcontainer, ...attribute }: any) {
    const filterOption = (input: string, option: any) => {
      const children = option.props.children ? option.props.children.toString() : ''
      return children.indexOf(input) > -1;
    };
    return (
      <AutoComplete
        filterOption={filterOption}
        allowClear={true}
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        dataSource={attribute.options.map((item: any) => (
          <Option {...item} key={item.value} value={item.value.toString()}>
            {item.label}
          </Option>
        ))}
        {...attribute}
      />
    );
  }
  // v2
  private getSearchSelect({ getpopupcontainer, ...attribute }: any) {
    const filterOption = (input: string, option: any) => {
      const children = option.props.children ? option.props.children.toString() : ''
      return children.indexOf(input) > -1;
    };
    const maxTagPlaceholder = (omittedValue: IOptions[]) => (
      <Popover
        placement="topRight"
        content={
          <div style={{ maxWidth: 300 }}>
            {omittedValue.map((item: IOptions) => item.label).join('、')}
          </div>
        }
      >
        <i className="iconfont icon-gengduo1 fs-12 csp" />
      </Popover>
    );
    return (
      <Select
        className="ngForm_searchSelect"
        dropdownStyle={{ marginRight: 20 }}
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        filterOption={filterOption}
        {...attribute}
        allowClear={true}
        maxTagCount={1}
        mode="multiple"
        labelInValue={true}
        maxTagPlaceholder={maxTagPlaceholder}
      >
        {attribute.options &&
          attribute.options.map((item: any) => (
            <Option {...item} key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
      </Select>
    );
  }
  // v2
  private getSearchTreeSelect({ getpopupcontainer, ...attribute }: any) {
    const maxTagPlaceholder = (omittedValue: IOptions[]) => (
      <Popover
        placement="topRight"
        content={
          <div style={{ maxWidth: 300 }}>
            {omittedValue.map((item: IOptions) => item.label).join('、')}
          </div>
        }
      >
        <i className="iconfont icon-gengduo1 fs-12 csp" />
      </Popover>
    );
    return (
      <TreeSelect
        className="ngForm_searchTreeSelect"
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        {...attribute}
        allowClear={true}
        maxTagCount={1}
        multiple={true}
        labelInValue={true}
        maxTagPlaceholder={maxTagPlaceholder}
      />
    );
  }
  // v2
  private getSelect({ getpopupcontainer, ...attribute }: any, field: string) {
    const filterOption = (input: string, option: any) => {
      const children = option.props.children ? option.props.children.toString() : ''
      return children.indexOf(input) > -1;
    };
    return (
      <Select
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        filterOption={filterOption}
        showSearch={true}
        {...attribute}
      >
        {attribute.options &&
          attribute.options.map((item: any) => (
            <Option {...item} key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
      </Select>
    );
  }

  private getTreeSelect({ getpopupcontainer, ...attribute }: any) {
    return (
      <TreeSelect
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        {...attribute}
      />
    );
  }

  private getCascader({ getpopupcontainer, ...attribute }: any) {
    return (
      <Cascader
        getPopupContainer={
          getpopupcontainer ||
          ((triggerNode: Element) => triggerNode.parentNode)
        }
        {...attribute}
      />
    );
  }

  private getRangeInputNumber(attribute: any, field: string) {
    const { getFieldDecorator } = this.props;
    return (
      <InputGroup compact={true} style={{ minWidth: 220 }}>
        <FormItem>
          {getFieldDecorator(`${field}Start`, {
            ...attribute.fieldDecoratorStart
          })(
            <InputNumber
              min={attribute.min}
              max={attribute.max}
              style={{
                width: attribute.commonWidth || 92,
                textAlign: 'center'
              }}
              placeholder="最小值"
            />
          )}
        </FormItem>
        <Input
          style={{
            width: 26,
            border: 'none',
            borderLeft: '1px solid #D6D8DD',
            padding: 0,
            marginTop: attribute.marginTop || '0px',
            textAlign: 'center',
            color: '#32375A',
            pointerEvents: 'none',
            backgroundColor: '#fff'
          }}
          placeholder="~"
          disabled={true}
        />
        <FormItem>
          {getFieldDecorator(`${field}End`, {
            ...attribute.fieldDecoratorEnd
          })(
            <InputNumber
              min={attribute.min}
              max={attribute.max}
              style={{
                width: attribute.commonWidth || 92,
                textAlign: 'center'
              }}
              placeholder="最大值"
            />
          )}
        </FormItem>
      </InputGroup>
    );
  }
  private getItemNode(
    type: string,
    field: string,
    attribute: any,
    custom?: any,
    fieldDecorator?: any
  ) {
    const { getFieldDecorator } = this.props;
    const { getpopupcontainer, ...otherAttribute } = attribute;
    switch (type) {
      case 'text':
        const info = { ...otherAttribute };
        delete info.value;
        return <div {...info}>{attribute && attribute.value}</div>;
      case 'input':
        return <Input {...otherAttribute} />;
      case 'textArea':
        return <TextArea {...otherAttribute} />;
      case 'select':
        return this.getSelect(attribute, field);
      case 'inputNumber':
        return <InputNumber {...otherAttribute} />;
      case 'rangeInputNumber':
        return this.getRangeInputNumber(otherAttribute, field);
      case 'radio':
        return (
          <RadioGroup {...attribute}>
            {attribute.options.map((item: any) => (
              <Radio {...item} key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        );
      case 'radioButton':
        return (
          <RadioGroup {...attribute}>
            {attribute.options.map((item: any) => (
              <RadioButton {...item} key={item.value} value={item.value}>
                {item.label}
              </RadioButton>
            ))}
          </RadioGroup>
        );
      case 'checkboxSingle':
        return <Checkbox {...attribute}>{attribute.option}</Checkbox>;
      case 'checkbox':
        return <CheckboxGroup {...attribute} />;
      case 'cascader':
        return this.getCascader(attribute);
      case 'employeePicker':
        return this.getEmployeePickerNode(attribute, 'autoComplete');
      case 'treeSelect':
        return this.getTreeSelect(attribute);
      case 'timePicker':
        return <TimePicker {...attribute} />;
      case 'switch':
        return <Switch {...attribute} />;
      case 'rate':
        return <Rate {...attribute} />;
      case 'datePicker':
        return <DatePicker {...attribute} />;
      case 'rangePicker':
        return <RangePicker {...attribute} />;
      case 'autoComplete':
        return this.getAutoComplete(attribute);
      case 'custom':
        return custom(getFieldDecorator);
      case 'searchSelect':
        return this.getSearchSelect(attribute);
      case 'searchTreeSelect':
        return this.getSearchTreeSelect(attribute);
      case 'autoCompleteEmployeePickerNode':
        return this.getEmployeePickerNode(
          attribute,
          'autoCompleteEmployeePickerNode'
        );
      default:
        return null;
    }
  }

  private getLabel(tips: string = '', label: string | ReactNode = '') {
    const { isShowLabel } = this.props;
    return tips ? (
      <span>
        {label}
        &nbsp;
        <Popover
          placement="right"
          content={<p className="secondaryTextColor fs-12">{tips}</p>}
          trigger="hover"
        >
          <Icon
            type="question-circle"
            theme="outlined"
            className="csp fs-16"
            style={{ color: '#F7BD20' }}
          />
        </Popover>
      </span>
    ) : isShowLabel ? (
      label
    ) : (
      ''
    );
  }

  public render() {
    const { formItemLayout, item, getFieldDecorator, className } = this.props;
    const options = { ...item.fieldDecorator };
    const layout = item.formItemLayout
      ? { ...item.formItemLayout }
      : { ...formItemLayout };
    const show = item.isShow === false ? false : true;
    if (!show) return null;
    return (
      <FormItem
        {...layout}
        className={className}
        colon={false}
        label={this.getLabel(item.tips, item.label)}
        extra={item.extra}
      >
        {getFieldDecorator(item.field, {
          ...options
        })(
          this.getItemNode(item.type, item.field, item.attribute, item.custom)
        )}
      </FormItem>
    );
  }
}
