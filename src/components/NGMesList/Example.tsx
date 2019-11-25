import React from 'react'
import NGMesList, { IItems } from 'components/NGMesList'
import NGModal from 'components/NGModal'


interface IState {
  dataList: IItems[],
  visible:boolean
}
export default class TestOfNgMesList extends React.PureComponent<object, IState>{
  state = {
    dataList: [{
      title: '客户姓名',
      value: '萌萌哒小龙龙',
    },
    {
      title: '客户电话',
      value: '1878785233',
    },
    {
      title: '报备项目',
      value: '咸蛋超人迪迦',
    },
    {
      title: '预计到院',
      value: '2018-09-01',
    }, {
      title: '报备说明',
      value: '我是报备说明示例文字，我是报备说明示例文字我是报备说明示例文字，我是报备说明示例文字我是报备说明示例文字我是报备说明示例文字',
    }, {
      title: '报备人',
      value: '可可可；植发科',
    }, {
      title: '报备类型',
      value: '电网/xx网站；来源xx网站xxxxxxx的信息',
    }
    ],
    visible:true
  }
  render() {
    const { dataList,visible } = this.state
    return (
      <NGModal
      visible = {visible}
      title="测试测试"
      >
        <NGMesList
          dataList={dataList}

        />
      </NGModal>
    )
  }
}
