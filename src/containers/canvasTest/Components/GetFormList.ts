export const getFormList = (that: any) => [
  {
    className: 'flex_sb flex_wrap',
    list: [
      {
        formItemLayout: {},
        type: 'input',
        field: 'title',
        label: '部门名称',
        fieldDecorator: {
          rules: [{ required: true, message: '部门名称必须填写' }]
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
        label: '上级部门',
        fieldDecorator: {
          rules: [{ required: true, message: '请选择上级部门' }]
        },
        attribute: {
          treeData: [...that.state.pidTree],
          placeholder: '请选择上级部门'
        }
      },
      {
        formItemLayout: {},
        type: 'radio',
        field: 'medicalFlag',
        label: '是否为医疗部',
        fieldDecorator: {
          initialValue: true,
          rules: [{ required: true, message: '请选择是否为医疗部' }]
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
