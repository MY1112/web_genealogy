
export const getFormList = (that: any) => [
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
          treeData: [...that.state.pidTree],
          placeholder: '请选择上级成员'
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
      }
    ]
  }
]
