/*
 * @Author: huangying
 * @Date: 2018-08-30 14:32:09
 * @Last Modified by: huangying
 * @Last Modified time: 2018-11-27 19:17:57
 */

export const getFormList = (that: any) => [
  {
    className: 'examples',
    list: [
      {
        type: 'rangeInputNumber',
        field: 'age',
        label: '年龄',
        attribute: {
          max: 200
        }
      },
      {
        type: 'searchTreeSelect',
        field: 'searchTreeSelect',
        label: 'searchTreeSelect',
        attribute: {
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              key: '0-0',
              children: [
                {
                  title: 'Child 很长很长很长啦啦啦啦啦啦',
                  value: '460@很长很长很长啦啦啦啦啦啦.com',
                  key: '0-0-1'
                },
                {
                  title: 'Child 很长很长很长啦啦啦啦啦啦',
                  value: '0-很长很长很长啦啦啦啦啦啦-2',
                  key: '0-0-2'
                }
              ]
            },
            {
              title: 'Node2',
              value: '0-1',
              key: '0-1'
            }
          ]
        },
      },
      {
        type: 'searchSelect',
        field: 'searchSelect',
        label: 'searchSelect',
        attribute: {
          options: [{
            value: '很长很长很长啦啦啦啦啦啦',
            label: '很长很长很长啦啦啦啦啦啦'
          },{
            value: '1223很长很长很长啦啦啦啦啦啦',
            label: '很长很长3432很长啦啦啦啦啦啦'
          },{
            value: '很长很2232234长很长啦啦啦啦啦啦',
            label: '很长很长很344345长啦啦啦啦啦啦'
          },{
            value: '很长很长54353很长啦啦啦啦啦啦',
            label: '很长很345645654长很长啦啦啦啦啦啦'
          }]
        }
      },
      {
        type: 'checkboxSingle',
        field: 'checkboxSingle',
        label: 'checkboxSingle',
        fieldDecorator: {
          initialValue: true
        }
      },
      {
        type: 'checkbox',
        field: 'checkbox',
        label: 'checkbox',
        attribute: {
          placeholder: 'xxx',
          showSearch: true,
          options: that.state.options
        }
      },
      {
        type: 'textArea',
        field: 'textArealist',
        label: 'textArealist',
        fieldDecorator: {
          initialValue: '默认值',
          rules: [{ required: true, message: '提成比例必须填写' }]
        },
        attribute: {
          rows: 4
        }
      },
      {
        type: 'select',
        field: 'regionAddress',
        label: '单选',
        fieldDecorator: {
          initialValue: '',
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          placeholder: 'xxx',
          showSearch: true,
          options: that.state.options
        }
      },
      {
        type: 'datePicker',
        field: 'datePicker',
        label: 'datePicker',
        fieldDecorator: {
          onChange: that.onChange
        },
        attribute: {
          style: { width: 276 }
        }
      },
      {
        type: 'rangePicker',
        field: 'RangePicker',
        label: 'RangePicker',
        fieldDecorator: {
          onChange: that.onChange
        }
      },
      {
        type: 'rate',
        field: 'rate',
        label: 'rate',
        fieldDecorator: {
          initialValue: 2.5
        },
        attribute: {}
      },
      {
        type: 'switch',
        field: 'switch',
        label: 'switch',
        fieldDecorator: {
          onChange: that.onChange
        },
        attribute: {
          checkedChildren: '开',
          unCheckedChildren: '关'
        }
      },
      {
        type: 'select',
        field: 'add',
        label: '多选',
        fieldDecorator: {
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          placeholder: 'xxx',
          mode: 'multiple',
          options: that.state.options
        }
      },
      {
        type: 'employeePicker',
        field: 'employeePicker',
        label: '选人',
        fieldDecorator: {
          initialValue: 'huangying',
          rules: [{ required: true, message: '必须按' }]
        },
        attribute: {
          onBlur: that.onBlurPerson,
          onChange: that.onSearchPerson,
          onSearch: that.onSearchPerson,
          searchValue: that.state.searchValue,
          // mode: 'multiple',
          options: [
            {
              value: 'huangying',
              label: '黄莹',
              depart: ['植发科部门植发科部门']
            },
            {
              value: 'huang',
              label: '黄黄英',
              depart: ['植发科部门']
            },
            {
              value: 'zhangsan',
              label: '章三',
              depart: ['脱毛部门']
            }
          ]
        }
      },
      {
        type: 'radio',
        field: 'radio',
        label: 'radio',
        fieldDecorator: {
          initialValue: '1',
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          mode: 'multiple',
          options: that.state.options
        }
      },
      {
        type: 'radioButton',
        field: 'radioButton',
        label: 'radioButton',
        fieldDecorator: {
          initialValue: '1',
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          options: that.state.options
        }
      },
      {
        type: 'cascader',
        field: 'cascader',
        label: 'cascader',
        fieldDecorator: {
          initialValue: ['zhejiang', 'hangzhou', 'xihu'],
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake'
                    }
                  ]
                }
              ]
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        type: 'custom',
        field: 'custom',
        label: 'custom',
        custom: that.custom
      }
    ]
  },
  {
    className: 'examples mt-10 flex_wrap',
    list: [
      {
        formItemLayout: {
          labelCol: { span: 10 },
          wrapperCol: { span: 14 }
        },
        type: 'input',
        field: 'userName22',
        label: 'input',
        fieldDecorator: {
          initialValue: '默认值',
          rules: [
            { required: true, message: '提成比例必须填写' },
            { type: 'email', message: '必须email' }
          ],
          onChange: that.onChange
        },
        attribute: {
          placeholder: 'placeholder'
        }
      },
      {
        formItemLayout: {
          labelCol: { span: 10 },
          wrapperCol: { span: 12 }
        },
        type: 'input',
        field: 'userName2',
        label: 'input',
        fieldDecorator: {
          initialValue: '默认值',
          rules: [
            { required: true, message: '提成比例必须填写' },
            { type: 'email', message: '必须email' }
          ],
          onChange: that.onChange
        },
        attribute: {
          placeholder: 'placeholder'
        }
      }
    ]
  },

  {
    className: 'examples mt-10',
    list: [
      {
        className: 'mb-40',
        type: 'treeSelect',
        field: 'treeSelect',
        label: 'treeSelect',
        fieldDecorator: {
          rules: [{ required: true, message: '提成比例必须填写' }],
          onChange: that.onChange
        },
        attribute: {
          multiple: true,
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              key: '0-0',
              children: [
                {
                  title: 'Child Node1',
                  value: '460@qq.com',
                  key: '0-0-1'
                },
                {
                  title: 'Child Node2',
                  value: '0-0-2',
                  key: '0-0-2'
                }
              ]
            },
            {
              title: 'Node2',
              value: '0-1',
              key: '0-1'
            }
          ]
        },
        extra: that.exportNode()
      },
      {
        type: 'text',
        field: 'addwords',
        label: '文字',
        attribute: {
          value: '111'
        }
      },
      {
        type: 'inputNumber',
        field: 'inputNumber',
        label: '数量',
        fieldDecorator: {
          initialValue: 11,
          onChange: that.onChange
        },
        attribute: {
          max: 100,
          min: 10
        },
        extra: '自动分配业绩描述'
      },
      {
        type: 'timePicker',
        field: 'timePicker',
        label: 'timePicker',
        extra: '自动分配业绩描述'
      }
    ]
  }
]

export const getList = (that:any) => [{
  className: 'flex_wrap calendar_search flex_sb',
  list:[{
    type: 'searchTreeSelect',
    field: 'expertId',
    label: '医生',
    attribute: {
      getPopupContainer: () => document.body,
      treeData: [{
        value: '很长很长很长啦啦啦啦啦啦',
        label: '很长很长很长啦啦啦啦啦啦'
      },{
        value: '1223很长很长很长啦啦啦啦啦啦',
        label: '很长很长3432很长啦啦啦啦啦啦'
      },{
        value: '很长很2232234长很长啦啦啦啦啦啦',
        label: '很长很长很344345长啦啦啦啦啦啦'
      },{
        value: '很长很长54353很长啦啦啦啦啦啦',
        label: '很长很345645654长很长啦啦啦啦啦啦'
      }],
      showSearch: true,
      style:{width:180}
    },
  },{
    type: 'checkbox',
    field: 'operationFlag',
    label: '医生',
    attribute: {
      onChange: that.checkOperation,
      options:[{
        label: '仅手术类',
        value: 1
      }],
      style:{width:100}
    },
  }]
},
  {
    className: 'examples',
    list: [
      {
        type: 'searchTreeSelect',
        field: 'searchTreeSelect',
        label: 'searchTreeSelect',
        attribute: {
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              key: '0-0',
              children: [
                {
                  title: 'Child 很长很长很长啦啦啦啦啦啦',
                  value: '460@很长很长很长啦啦啦啦啦啦.com',
                  key: '0-0-1'
                },
                {
                  title: 'Child 很长很长很长啦啦啦啦啦啦',
                  value: '0-很长很长很长啦啦啦啦啦啦-2',
                  key: '0-0-2'
                }
              ]
            },
            {
              title: 'Node2',
              value: '0-1',
              key: '0-1'
            }
          ]
        },
      },
      {
        type: 'searchSelect',
        field: 'searchSelect',
        label: 'searchSelect',
        attribute: {
          options: [{
            value: '很长很长很长啦啦啦啦啦啦',
            label: '很长很长很长啦啦啦啦啦啦'
          },{
            value: '1223很长很长很长啦啦啦啦啦啦',
            label: '很长很长3432很长啦啦啦啦啦啦'
          },{
            value: '很长很2232234长很长啦啦啦啦啦啦',
            label: '很长很长很344345长啦啦啦啦啦啦'
          },{
            value: '很长很长54353很长啦啦啦啦啦啦',
            label: '很长很345645654长很长啦啦啦啦啦啦'
          }]
        }
      },
      {
        type: 'select',
        field: 'select',
        label: 'select',
        attribute: {
          options: [{
            value: '很长很长很长啦啦啦啦啦啦',
            label: '很长很长很长啦啦啦啦啦啦'
          },{
            value: '1223很长很长很长啦啦啦啦啦啦',
            label: '很长很长3432很长啦啦啦啦啦啦'
          },{
            value: '很长很2232234长很长啦啦啦啦啦啦',
            label: '很长很长很344345长啦啦啦啦啦啦'
          },{
            value: '很长很长54353很长啦啦啦啦啦啦',
            label: '很长很345645654长很长啦啦啦啦啦啦'
          }]
        }
      },
      {
        type: 'select',
        field: 'select1',
        label: 'select',
        attribute: {
          options: [{
            value: '很长很长很长啦啦啦啦啦啦',
            label: '很长很长很长啦啦啦啦啦啦'
          },{
            value: '1223很长很长很长啦啦啦啦啦啦',
            label: '很长很长3432很长啦啦啦啦啦啦'
          },{
            value: '很长很2232234长很长啦啦啦啦啦啦',
            label: '很长很长很344345长啦啦啦啦啦啦'
          },{
            value: '很长很长54353很长啦啦啦啦啦啦',
            label: '很长很345645654长很长啦啦啦啦啦啦'
          }]
        }
      }
    ]
}]
