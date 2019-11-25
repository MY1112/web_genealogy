import React, { Component } from 'react'
import { } from 'antd'
import './index.less'

const initialState = {}

interface IProps {}

interface IState {}

export default class MemberStatistic extends Component<IProps, IState> {
    readonly state: IState = initialState


    render() {
        return (
            <div className="member-statistic">
                这里将进行统计～～～～～
            </div>
        )
    }
}