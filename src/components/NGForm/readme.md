
| 参数                | 类型                                 | 说明        | 是否必须 |
| ------------------- | ------------------------------------ | ----------- | -------- |
| wrappedComponentRef | (form: IWrappedComponentRef) => void | 获取 ref 值 | true     |
| list                | IList[]                              | 渲染表单    | true     |
| layout  | ('horizontal','vertical','inline') | 表单布局 | false 
| className | string | form样式 | false |

IList 类型
| 参数 | 类型 | 说明 | 是否必须 |
| ------------------- | ----------- | ----------- | -------- |
| list | IListItem | 列表 | true |
| className | string | 类名 | false
| show | string | 是否显示,默认显示，'none'的时候不显示 | false |

IListItem 类型
| 参数 | 类型 | 说明 | 是否必须 |
| ------------------- | ----------- | ----------- | -------- |
| type | string | 类型 | true |
| field | string | 唯一标示 | true |
| label | string | label 标签的文本 | false |
| attribute | any | 控件属性， 如 placeholder， 同 antd 控件属性 | false |
| fieldDecorator | any | initialValue，rules，onChange 等， 同 getFieldDecorator 的 options | false |
| extra | string|ReactNode | 额外的提示信息 | false
| custom | string|ReactNode | 自定义显示内容 | false
| formItemLayout | IFormItemLayout | 布局 | false
| className | string | 类名 | false
| tips | string | 提示 | false

type 类型
| 参数 | 类型 |
| -------- | --------- |
| text | 文本 |
| input | 输入框 |
| textArea | 多行文本输入框 |
| select | 选择下拉 |
| inputNumber | 数字输入框 |
| radio | 单选按钮 |
| radioButton | 单选 button |
| checkbox | 多选按钮 |
| cascader | 级联选择 |
| employeePicker | 选人 |
| treeSelect | 树 |
| timePicker | 时间选择 |
| switch | 开关 |
| rate | 打星 |
| datePicker | 日期选择 |
| rangePicker | 日期范围选择 |
| custom | 自定义 |
| rangeInputNumber | 数字范围 |




rangeINputNumber -> field: 'age' -> 返回 ageStart/ageEnd
例子请看 Examples.tsx
