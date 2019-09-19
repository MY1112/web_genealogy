/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 14:21:01 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-09-19 17:06:24
 */
import React, { PureComponent } from 'react'
import { message } from 'antd'
import MemberCharts from './MemberCharts'
import { loadCDN } from 'util/Tool'
import './index.less'


interface IProps {}

interface IState {
    CDNLoading: boolean
}

class MemberTree extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            CDNLoading: false
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="memberTree">
                <p>charts树状图</p>
                    <MemberCharts />
            </div>
        )
    }
}
export default MemberTree