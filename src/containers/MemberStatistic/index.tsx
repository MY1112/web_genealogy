import React, { Component } from 'react'
import { Spin, Avatar, Descriptions, message } from 'antd'
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
    try {
      const tabhtml = `
        <div class='printShow' style="margin:0 auto;width:596px;
        page-break-after:always;">
          ${this.getPrintStatisticDom()}
        </div>
      `
      const iframe = document.createElement('Iframe') as any
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      const doc = iframe.contentWindow.document;
      doc.write(tabhtml);
      let style = `<style>
        .printShow {
          background: #fff;
        }
        .memberStatisticRow {
          margin-bottom:20px;
        }
        .memberStatisticRowHeader {
          width: 100%;
          height: 40px;
          background: rgba(89, 143, 232, 0.04);
          font-size: 14px;
          color: #32375a;
          display: flex;
          line-height: 40px;
        }
        .memberStatisticRowHeader::before {
          content: '';
          display: inline-block;
          height: 100%;
          width: 2px;
          background: #598fe8;
        }
        .memberStatisticRowItem {
          background: #fff;
        }
        .memberItemList {
          border-top: 1px solid #cccccc;
        }
        .memberItemListTitle {
          margin-bottom: 20px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: bold;
          font-size: 16px;
          line-height: 1.5;
        }
        .memberItemListTitlePhoto {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          position: relative;
          display: inline-block;
          overflow: hidden;
          vertical-align: middle;
          background: transparent;
          width: 32px;
          height: 32px;
          line-height: 32px;
          border-radius: 50%;
        }
        .memberItemListTitlePhoto > img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .memberItemListTitleName {
          margin-left: 16px;
          font-size: 20px;
          vertical-align: middle;
        }
        .memberItemListView {
          display: flex;
          flex-wrap: wrap;
        }
        .memberItemListCell {
          margin-bottom: 16px;
        }
        .memberItemListCellTitle {
          display: inline-block;
          color: rgba(0, 0, 0, 0.85);
          font-weight: normal;
          font-size: 14px;
          line-height: 1.5;
          white-space: nowrap;
          margin-right: 8px;
        }
        .memberItemListCellContent {
          display: inline-block;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          line-height: 1.5;
          margin-right: 20px;
        }
      </style>`;
      // if (iframe.contentWindow.XMLHttpRequest) {
      //   style += `<style type='text/css' media='print'> @page{ }</style>`
      // }
      doc.getElementsByTagName('head')[0].innerHTML = style;
      doc.close();
      // let hkey_root,hkey_path,hkey_key; 
      // hkey_root="HKEY_CURRENT_USER"; hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      // if(iframe.contentWindow.ActiveXObject) {
      //   let RegWsh = new ActiveXObject("WScript.Shell");
      //   //设置页眉/脚的字体样式
      //   hkey_key="font";
      //   RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"font-size: 12px; font-family: 黑体; line-height: 24px");

      //   //设置页眉
      //   hkey_key="header";
      //   RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"打印编号");

      //   //设置页脚
      //   hkey_key="footer"; 
      //   RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"&b第 &p 页/共 &P 页")
      // }

      iframe.contentWindow.print();
    } catch(e) {
      message.warning(`${e.name} ${e.message}`)
    }
  }
  // 获取打印成员统计Dom
  private getPrintStatisticDom = () => {
    const { statisticList } = this.state
    let str = ``;
    statisticList.forEach((item: any[], index: number) => {
      str += `
        <div class='memberStatisticRow' style="margin-bottom:20px;">
          <div class='memberStatisticRowHeader'>
            <span style="margin-left:10px;">第 ${sectionToChinese(index + 1)} 代</span>
          </div>
          <div class='memberStatisticRowItem' style="padding:0 20px;">
            ${this.getPrintmemberRowList(item)}
          </div>
        </div>
      `
    })
    return str
  }
  private getPrintmemberRowList = (data: any[]) => {
    let str = ``;
    data.forEach((info: any, cIndex) => {
      str += `
        <div class='memberItemList' style="padding:20px 0;border:${
          !cIndex && 'none'
        };">
          <div class='memberItemListTitle'>
            <span class='memberItemListTitlePhoto'>
              <img src='${info.genderFlag === 1 ? man_icon : woman_icon}' />
            </span>
            <span class="memberItemListTitleName">${info.title}</span>
          </div>
          <div class='memberItemListView'>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>出生日期:</span>
              <span class='memberItemListCellContent'>${info.dateBirth || '-'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>是否在世:</span>
              <span class='memberItemListCellContent'>${info.livingFlag ? '是' : '否'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>去世时间:</span>
              <span class='memberItemListCellContent'>${info.dateDeath || '-'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>是否结婚:</span>
              <span class='memberItemListCellContent'>${info.marryFlag ? '是' : '否'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>配偶姓名:</span>
              <span class='memberItemListCellContent'>${info.spouseName || '-'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>籍贯:</span>
              <span class='memberItemListCellContent'>${info.birthplaceText || '-'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>生平经历:</span>
              <span class='memberItemListCellContent'>${info.deeds || '-'}</span>
            </div>
            <div class="memberItemListCell">
              <span class='memberItemListCellTitle'>备注:</span>
              <span class='memberItemListCellContent'>${info.remark || '-'}</span>
            </div>
          </div>
        </div>
      `
    })
    return str
  }

  render() {
    const { loading, statisticList } = this.state
    return (
      <div className="member-statistic" id="member-statistic-list">
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
