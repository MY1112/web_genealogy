import React, { Component } from 'react'
import { Spin, Avatar, Descriptions } from 'antd'
import NGHeader from 'components/NGHeader'
import Api, { IMODApiData } from '../Membership/Api'
import './index.less'
import { sectionToChinese } from 'util/Tool'

const man_icon = require('../../assets/imgs/default_icon_man.png')
const woman_icon = require('../../assets/imgs/default_icon_woman.png')

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
					<NGHeader title={`第 ${sectionToChinese(index+1)} 代`} />
					<div className="member-statistic-row-item pl-24 pr-24">
						{
							item.map((info: any, cIndex) => {
								return (
									<div
										className="member-item-list pt-20 pb-20"
										key={`${cIndex}_member-item-list_${index}`}
										style={{
											border: `${!cIndex && 'none'}`
										}}
									>
										<Descriptions title={
											<div className="member-photo">
												<Avatar src={info.genderFlag === 1 ? man_icon : woman_icon} />
												<span className="member-name ml-16">{info.title}</span>
											</div>
										}>
											<Descriptions.Item label="出生日期">{info.dateBirth || '-'}</Descriptions.Item>
											<Descriptions.Item label="是否在世">{info.livingFlag ? '是' : '否'}</Descriptions.Item>
											<Descriptions.Item label="去世时间">{info.dateDeath || '-'}</Descriptions.Item>
											<Descriptions.Item label="是否结婚">{info.marryFlag ? '是' : '否'}</Descriptions.Item>
											<Descriptions.Item label="配偶姓名">{info.spouseName || '-'}</Descriptions.Item>
											<Descriptions.Item label="籍贯">{info.birthplaceText || '-'}</Descriptions.Item>
											<Descriptions.Item label="生平经历">{info.deeds || '-'}</Descriptions.Item>
											<Descriptions.Item label="备注">{info.remark || '-'}</Descriptions.Item>
										</Descriptions>
									</div>
								)
							})
						}
					</div>
				</div>
			)
		})
		return memberItem
	}

	// 打印
	private handlePrint = () => {
		// var bdhtml = window.document.body.innerHTML;
		// var sprnstr = "<!--startprint-->";
		// var eprnstr = "<!--endprint-->";
		// var prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
		// prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
		// window.document.body.innerHTML = prnhtml;
		window.print();
	}

  render() {
		const { loading, statisticList } = this.state
    return (
			<div className="member-statistic" id="member-statistic-list">
				{!!statisticList.length &&
					<div
						className="member-statistic-download csp dsp_ib"
						onClick={this.handlePrint.bind(this)}
					>
						导出成册
					</div>
				}
				<Spin spinning={loading}>
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
