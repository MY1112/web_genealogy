
interface IFormList {
  props: {
    pidTree: object[]
  }
  state:{
    livingVisble: boolean
    marryVisble: boolean
  }
  handleChangeLiving: () => void
  handleChangeMarry: () => void
  handleChangeBirthplace: () => void
  handleSelectPid: (value: string, node: any) => void
}
export const getFormList = (that: IFormList) => [
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
          rules: [{ required: !!that.props.pidTree.length, message: '请选择上级成员' }]
        },
        attribute: {
          style: { width: 200 },
          treeData: [...that.props.pidTree],
          placeholder: '请选择上级成员',
          onSelect: that.handleSelectPid
        }
      }
    ]
  },
  {
    className: 'flex_sb flex_wrap',
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
          // rules: [{ required: true, message: '请选择出生日期' }]
        },
        attribute: {
          style: { width: 200 },
          placeholder: '请选择出生日期'
        }
      }
    ]
  },
  {
    className: 'flex_sb flex_wrap',
    list: [
      {
        formItemLayout: {},
        type: 'radio',
        field: 'livingFlag',
        label: '是否在世',
        fieldDecorator: {
          // initialValue: true,
          rules: [{ required: true, message: '请选择是否在世' }],
          onChange: that.handleChangeLiving
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
          // rules: [{ required: true, message: '请选择去世时间' }]
        },
        attribute: {
          style: { width: 200 },
          placeholder: '请选择去世时间'
        },
        isShow: that.state.livingVisble
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
          // initialValue: ['hebei', 'zhangjiakou', 'huailai'],
          // rules: [{ required: true, message: '籍贯' }],
          // onChange: that.onChange
        },
        attribute: {
          onChange: that.handleChangeBirthplace,
          changeOnSelect: true,
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
    className: 'flex_sb flex_wrap',
    list: [
      {
        formItemLayout: {},
        type: 'radio',
        field: 'marryFlag',
        label: '是否结婚',
        fieldDecorator: {
          // rules: [{ required: true, message: '请选择是否结婚' }],
          onChange: that.handleChangeMarry
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
          // rules: [{ required: true, message: '请输入配偶姓名' }]
        },
        attribute: {
          style: { width: 200 },
          placeholder: '请输入配偶姓名'
        },
        isShow: that.state.marryVisble
      }
    ]
  },
]
