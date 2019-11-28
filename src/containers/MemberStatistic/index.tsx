import React, { Component } from 'react'
import { Spin } from 'antd'
import NGHeader from 'components/NGHeader'
import Api, { IMODApiData } from '../Membership/Api'
import './index.less'

const initialState = {
  membersList: [],
	loading: false,
	statisticList: []
}

interface IProps {}

interface IState {
  membersList: any[]
	loading: boolean
	statisticList: any[]
}

export default class MemberStatistic extends Component<IProps, IState> {
  readonly state: IState = initialState
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
    let userId = userInfo._id
    if (userInfo.identity === 'user') {
      userId = userInfo.pid
    }
    this.setState(
      {
        loading: true
      },
      () => {
        Api.memberStatistic(userId).then((res: IMODApiData) => {
          if (res.code === 10000) {
            this.setState({
              membersList: res.data,
              loading: false
						})
						this.getStatisticList()
          } else {
						this.setState({loading: false})
					}
        }).catch(() => {
					this.setState({loading: false})
				})
      }
    )
	}
	
	// 成员统计
	private getStatisticList = () => {
		const { membersList } = this.state
		const statisticList:any[] = []
		let level = 0
		const getLevel = () => {
			const isLevel = membersList.some((item: any) => item.pids.length === (level + 1))
			if (isLevel) {
				const memberInfoList = membersList.filter((item: any) => item.pids.length === (level + 1))
				statisticList.push(memberInfoList)
				level += 1
				getLevel()
			} else {
				return
			}
		}
		getLevel()
		console.log(statisticList)
		this.setState({statisticList})
	}

	// 获取成员统计dom
	private getStatisticDom = () => {
		const { statisticList } = this.state
		const memberItem = statisticList.map((item: any[], index: number) => {
			return (
				<div className="member-statistic-row mb-20" key={`${index}_member-statistic-row`}>
					<NGHeader title={`第 ${index+1} 代`} />
				</div>
			)
		})
		return memberItem
	}

  render() {
		const { loading, statisticList } = this.state
    return (
			<div className="member-statistic">
				<Spin spinning={loading} delay={200}>
					{statisticList.length > 0 ?
						this.getStatisticDom()
						: (
							<div>还没有创建成员哦，快去创建吧</div>
						)
					}
				</Spin>
			</div>
		)
  }
}
