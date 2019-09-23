import React, { PureComponent } from 'react';
import NGForm, { IWrappedComponentRef } from 'components/NGForm';
import { Button, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio'
import { IdetailItem } from '../index';
const initialState = {
  loading: false,
  livingVisble: false,
  marryVisble: false
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
  livingVisble: boolean
  marryVisble: boolean
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
      className: 'flex_sb flex_wrap',
      list: [
        {
          formItemLayout: {},
          type: 'input',
          field: 'title',
          label: '成员名称',
          fieldDecorator: {
            rules: [{ required: true, message: '成员名称必须填写' }]
          },
          attribute: {
            style: { width: 200 },
            placeholder: '请输入名称',
            maxLength: 20
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
            style: { width: 200 },
            treeData: [...this.props.listData],
            placeholder: '请选择上级成员'
          }
        }
      ]
    },
    {
      className: 'flex_sb',
      list: [
        {
          formItemLayout: {},
          type: 'radio',
          field: 'genderFlag',
          label: '性别',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择性别' }]
          },
          attribute: {
            options: [
              {
                value: 1,
                label: '男'
              },
              {
                value: 2,
                label: '女'
              }
            ]
          }
        },
        {
          formItemLayout: {},
          type: 'datePicker',
          field: 'dateBirth',
          label: '出生日期',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择出生日期' }]
          },
          attribute: {
            style: { width: 200 },
            placeholder: '请选择出生日期'
          }
        }
      ]
    },
    {
      className: 'flex_sb',
      list: [
        {
          formItemLayout: {},
          type: 'radio',
          field: 'livingFlag',
          label: '是否在世',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择是否在世' }],
            onChange: this.handleChangeLiving
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
          formItemLayout: {},
          type: 'datePicker',
          field: 'dateDeath',
          label: '去世时间',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择去世时间' }]
          },
          attribute: {
            style: { width: 200 },
            placeholder: '请选择去世时间'
          },
          isShow: this.state.livingVisble
        }
      ]
    },
    {
      list: [
        {
          formItemLayout: {},
          type: 'textArea',
          field: 'deeds',
          label: '生平经历',
          attribute: {
            style: {width: '100%'},
            placeholder: '请输入生平经历',
            autosize: { minRows: 2, maxRows: 6 },
            maxLength: 200
          }
        },
        {
          formItemLayout: {},
          type: 'textArea',
          field: 'remark',
          label: '备注',
          attribute: {
            style: {width: '100%'},
            placeholder: '请输入备注',
            autosize: { minRows: 2, maxRows: 6 },
            maxLength: 200
          }
        },
        {
          formItemLayout: {},
          type: 'cascader',
          field: 'birthplace',
          label: '籍贯',
          fieldDecorator: {
            initialValue: ['sichuan', 'zigong', 'fushun'],
            // rules: [{ required: true, message: '籍贯' }],
            // onChange: that.onChange
          },
          attribute: {
            options: [
              {
                value: 'sichuan',
                label: '四川',
                children: [
                  {
                    value: 'zigong',
                    label: '自贡',
                    children: [
                      {
                        value: 'fushun',
                        label: '富顺'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'hebei',
                label: '河北',
                children: [
                  {
                    value: 'zhangjiakou',
                    label: '张家口',
                    children: [
                      {
                        value: 'huailai',
                        label: '怀来'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          formItemLayout: {},
          type: 'textArea',
          field: 'address',
          label: '现居地',
          attribute: {
            style: {width: '100%'},
            placeholder: '请输入地址',
            autosize: { minRows: 1, maxRows: 2 },
            maxLength: 100
          }
        },
      ]
    },
    {
      className: 'flex_sb',
      list: [
        {
          formItemLayout: {},
          type: 'radio',
          field: 'marryFlag',
          label: '是否结婚',
          fieldDecorator: {
            rules: [{ required: true, message: '请选择是否结婚' }],
            onChange: this.handleChangeMarry
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
          formItemLayout: {},
          type: 'input',
          field: 'spouseName',
          label: '配偶姓名',
          fieldDecorator: {
            rules: [{ required: true, message: '请输入配偶姓名' }]
          },
          attribute: {
            style: { width: 200 },
            placeholder: '请输入配偶姓名'
          },
          isShow: this.state.marryVisble
        }
      ]
    },
  ];

  componentDidMount() {
    const form = this.form.props.form;
    const { detailItem } = this.props;
    const editValue = {
      pid: detailItem.pid,
      title: detailItem.title,
      userSum: detailItem.userSum,
      genderFlag: detailItem.genderFlag,
      // dateBirth: detailItem.dateBirth,
      livingFlag: detailItem.livingFlag,
      // dateDeath: detailItem.dateDeath,
      deeds: detailItem.deeds,
      remark: detailItem.remark,
      // birthplace: detailItem.birthplace,
      address: detailItem.address,
      marryFlag: detailItem.marryFlag,
      // spouseName: detailItem.spouseName
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

  private handleChangeLiving = (e: RadioChangeEvent) => {
    this.setState({
      livingVisble: !e.target.value
    })
  }
  private handleChangeMarry = (e: RadioChangeEvent) => {
    this.setState({
      marryVisble: e.target.value
    })
  }

  render() {
    const { detailItem } = this.props;
    const list = this.getFormList();
    return (
      <React.Fragment>
        <header className="memberDetail_header">{detailItem.title}</header>
        <div className="memberEdit pl-30 pr-30 pb-20 pt-20">
          <NGForm wrappedComponentRef={this.saveFormRef} list={list} />
        </div>
        <div className=" flex_c memberBtn">{this.getAddButton()}</div>
      </React.Fragment>
    );
  }
}