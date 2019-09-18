
| 参数               | 类型                       | 默认值   | 说明                                   | 是否必须 |
| ------------------ | -------------------------- | -------- | -------------------------------------- | -------- |
| width              | number                     | 400      | 宽                                     | false    |
| okText             | string                     | 确定     | 确认按钮文字                           | false    |
| cancelText         | string                     | 取消     | 取消按钮文字                           | false    |
| title              | string                     | 标题     | 标题                                   | false    |
| confirmLoading     | boolean                    | false    | 确定按钮 loading                       | false    |
| visible            | boolean                    | false    | 对话框是否可见                         | true     |
| wrapClassName      | string                     | ''       | 对话框外层容器的类名                   | false    |
| closable           | boolean                    | true     | 是否显示右上角的关闭按钮               | false    |
| isShowCancelButton | boolean                    | true     | 是否显示取消按钮                       | false    |
| onCancel           | function                   | () => {} | 点击右上角叉或取消按钮的回调           | false    |
| onOk               | function                   | () => {} | 点击确定回调, 没有的时候不显示确定按钮 | false    |
| afterClose         | function                   | () => {} | 完全关闭后的回调                       | false    |
| textAlign          | 'right' ,'left' , 'center' | 'right'  | 按钮位置                               | false    |

```
import NGModal from 'components/NGModal'

<NGModal
onOk={this.onOk}
onCancel={this.onCancel}
visible={ok}>
    <div>内容只能为一个标签</div>
</NGModal>
```
