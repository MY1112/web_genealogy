import React, { Component } from 'react'
import { Spin, Avatar, Descriptions, message } from 'antd'
import NGHeader from 'components/NGHeader'
import Api, { IMODApiData } from '../Membership/Api'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
        Api.memberStatistic(userId)
          .then((res: IMODApiData) => {
            if (res.code === 10000) {
              this.setState({
                membersList: res.data,
                loading: false
              })
              this.getStatisticList()
            } else {
              this.setState({ loading: false })
            }
          })
          .catch(() => {
            this.setState({ loading: false })
          })
      }
    )
	}
	private refToPDF1: any

  // 成员统计
  private getStatisticList = () => {
    const { membersList } = this.state
    const statisticList: any[] = []
    let level = 0
    const getLevel = () => {
      const isLevel = membersList.some(
        (item: any) => item.pids.length === level + 1
      )
      if (isLevel) {
        const memberInfoList = membersList.filter(
          (item: any) => item.pids.length === level + 1
        )
        statisticList.push(memberInfoList)
        level += 1
        getLevel()
      } else {
        return
      }
    }
    getLevel()
    console.log(statisticList)
    this.setState({ statisticList })
  }

  // 获取成员统计dom
  private getStatisticDom = () => {
    const { statisticList } = this.state
    const memberItem = statisticList.map((item: any[], index: number) => {
      return (
        <div
          className="member-statistic-row mb-20"
          key={`${index}_member-statistic-row`}
        >
          <NGHeader title={`第 ${sectionToChinese(index + 1)} 代`} />
          <div className="member-statistic-row-item pl-24 pr-24">
            {item.map((info: any, cIndex) => {
              return (
                <div
                  className="member-item-list pt-20 pb-20"
                  key={`${cIndex}_member-item-list_${index}`}
                  style={{
                    border: `${!cIndex && 'none'}`
                  }}
                >
                  <Descriptions
                    title={
                      <div className="member-photo">
                        <Avatar
                          src={info.genderFlag === 1 ? man_icon : woman_icon}
                        />
                        <span className="member-name ml-16">{info.title}</span>
                      </div>
                    }
                  >
                    <Descriptions.Item label="出生日期">
                      {info.dateBirth || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否在世">
                      {info.livingFlag ? '是' : '否'}
                    </Descriptions.Item>
                    <Descriptions.Item label="去世时间">
                      {info.dateDeath || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否结婚">
                      {info.marryFlag ? '是' : '否'}
                    </Descriptions.Item>
                    <Descriptions.Item label="配偶姓名">
                      {info.spouseName || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="籍贯">
                      {info.birthplaceText || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="生平经历">
                      {info.deeds || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                      {info.remark || '-'}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
    return memberItem
  }

  // 打印
  private handlePrint = () => {
		// html2canvas(this.refToPDF1, {
		// 	onrendered: (canvas) => {

		// 			const contentWidth = canvas.width;
		// 			const contentHeight = canvas.height;

		// 			//一页pdf显示html页面生成的canvas高度;
		// 			const pageHeight = contentWidth / 592.28 * 841.89;
		// 			//未生成pdf的html页面高度
		// 			let leftHeight = contentHeight;
		// 			//页面偏移
		// 			let position = 0;
		// 			//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
		// 			const imgWidth = 595.28;
		// 			const imgHeight = 592.28/contentWidth * contentHeight;

		// 			const pageData = canvas.toDataURL('image/jpeg', 1.0);

		// 			const pdf = new jsPDF('', 'pt', 'a4');

		// 			//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
		// 			//当内容未超过pdf一页显示的范围，无需分页
		// 			if (leftHeight < pageHeight) {
		// 		pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
		// 			} else {
		// 				while(leftHeight > 0) {
		// 						pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
		// 						leftHeight -= pageHeight;
		// 						position -= 841.89;
		// 						//避免添加空白页
		// 						if(leftHeight > 0) {
		// 						pdf.addPage();
		// 						}
		// 				}
		// 			}

		// 			pdf.save('content.pdf');
		// 	}
		// })
  }

  render() {
    const { loading, statisticList } = this.state
    return (
      <div className="member-statistic" ref={pdfWrap => this.refToPDF1 = pdfWrap}>
        {!!statisticList.length && (
          <div
            className="member-statistic-download csp dsp_ib"
            onClick={this.handlePrint.bind(this)}
          >
            导出成册
          </div>
        )}
        <Spin spinning={loading}>
          {statisticList.length > 0 ? (
            this.getStatisticDom()
          ) : (
            <div>还没有创建成员哦，快去创建吧</div>
          )}
        </Spin>
      </div>
    )
  }
}
