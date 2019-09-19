import React, { PureComponent } from 'react';
import NGForm, { IWrappedComponentRef } from 'components/NGForm';
import { Button, message } from 'antd';
import { IdetailItem } from '../index';
const initialState = {
  loading: false
};
interface IProps {
  handleEdit: () => void;
  cancel: () => void;
  detailItem: IdetailItem;
  listData: object[];
  success: (val: { value: string; key: string }) => void;
}
interface IState {
  loading: boolean;
}
export default class MemberEdit extends PureComponent<IProps, IState> {
  form: IWrappedComponentRef;
  constructor(props: IProps) {
    super(props);
    // this.handleEdit = throttle(this.handleEdit, 400);
  }
  readonly state: IState = initialState;

  private getFormList = () => [
    {
      className: 'halfCol',
      list: [
        {
          formItemLayout: {},
          type: 'input',
          field: 'title',
          label: '成员名称',
          fieldDecorator: {
            rules: [{ required: true, message: '部门名称必须填写' }]
          },
          attribute: {
            placeholder: '请输入名称',
            maxLength: 8
          }
        },
        {
          formItemLayout: {},
          type: 'treeSelect',
          field: 'pid',
          label: '上级成员',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择上级成员' }]
          },
          attribute: {
            treeData: [...this.props.listData],
            placeholder: '请选择上级成员'
          }
        },
        {
          formItemLayout: {},
          type: 'radio',
          field: 'medicalFlag',
          label: '是否在世',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择是否在世' }]
          },
          attribute: {
            options: [
              {
                value: true,
                label: '是'
              },
              {
                value: false,
                label: '否'
              }
            ]
          }
        },
        {
          type: 'input',
          field: 'userSum',
          label: '子孙人数',
          formItemLayout: {},
          attribute: {
            disabled: true
          }
        },
        {
          type: 'textArea',
          field: 'titps',
          label: '备注',
          formItemLayout: {},
          attribute: {
            maxLength: '300',
            autosize: { minRows: 2, maxRows: 2 }
          }
        }
      ]
    }
  ];

  componentDidMount() {
    const form = this.form.props.form;
    const { detailItem } = this.props;
    const editValue = {
      pid: detailItem.pid,
      title: detailItem.title,
      userSum: detailItem.userSum,
      titps: detailItem.titps,
      medicalFlag: detailItem.medicalFlag
    };
    console.log(editValue)
    form.setFieldsValue(editValue);
  }

  private saveFormRef = (form: IWrappedComponentRef) => {
    this.form = form;
  };
  private handleEdit = () => {
    // const form = this.form.props.form;
    // const { detailItem } = this.props;
    // this.setState({ loading: true });
    // form.validateFieldsAndScroll((err: object, values: object) => {
    //   if (err) {
    //     this.setState({ loading: false });
    //     return;
    //   }
    //   Api.putEditList({ ...values, id: detailItem.id })
    //     .then((res: IMODApiData) => {
    //       const { code } = res;
    //       this.setState({ loading: false });
    //       if (code === 10000) {
    //         message.success('编辑成功');
    //         this.props.success({ ...values, value: detailItem.id });
    //         this.props.cancel();
    //       }
    //     })
    //     .catch(() => {
    //       this.setState({ loading: false });
    //     });
    // });
  };

  private handleCancel = () => {
    this.props.cancel();
  };

  private getAddButton = () => {
    const addButton = (
      <React.Fragment>
        <Button className="default_btn" onClick={this.handleCancel}>
          取消
        </Button>
        <Button
          className="primary_btn  ml-20"
          onClick={this.handleEdit}
          loading={this.state.loading}
        >
          保存
        </Button>
      </React.Fragment>
    );
    return addButton;
  };

  render() {
    const { detailItem } = this.props;
    const list = this.getFormList();
    return (
      <React.Fragment>
        <header className="memberDetail_header">{detailItem.title}</header>
        <div className="memberEdit">
          <NGForm wrappedComponentRef={this.saveFormRef} list={list} />
        </div>
        <div className=" flex_c memberBtn">{this.getAddButton()}</div>
      </React.Fragment>
    );
  }
}