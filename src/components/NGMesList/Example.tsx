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
      title: '嘿嘿',
      value: '哈哈',
    },
    {
      title: '电话',
      value: '1878785233',
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
