
export const getFormList = (that: any) => [
  {
    className: '',
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
          treeData: [...that.state.pidTree],
          placeholder: '请选择上级成员'
        }
      },
      {
        formItemLayout: {},
        type: 'radio',
        field: 'genderFlag',
        label: '性别',
        fieldDecorator: {
          initialValue: true,
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
          placeholder: '请选择出生日期'
        }
      },
      {
        formItemLayout: {},
        type: 'radio',
        field: 'medicalFlag',
        label: '是否在世',
        fieldDecorator: {
          initialValue: true,
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
        formItemLayout: {},
        type: 'custom',
        field: 'dateDeath',
        label: '死亡时间',
        custom: that.custom
      },
      {
        formItemLayout: {
          labelCol:  { span: 24 }
        },
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
        formItemLayout: {
          labelCol:  { span: 24 }
        },
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
    ]
  }
]
