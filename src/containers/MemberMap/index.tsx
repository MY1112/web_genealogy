import React, { Component } from 'react'
import './index.less'

interface IProps {}

interface IState {}


class MemberMap extends Component<IProps, IState> {

    componentDidMount() {
        const BMap = window.BMap
        const mp = new BMap.Map('memberMap_content');  
        mp.centerAndZoom(new BMap.Point(121.491, 31.233), 15);  
    }

    render() {
        return(
            <div className="memberMap">
                <div id="memberMap_content" />
            </div>
        )
    }
}
export default MemberMap