import React, { Component } from 'react'
import './index.less'

interface IProps {}

interface IState {}

const markIcon = require('../../assets/imgs/map/bonsai.png')

class MemberMap extends Component<IProps, IState> {
    private BMap: any
    constructor(props: IProps) {
        super(props)
        this.BMap = window.BMap
    }
    componentDidMount() {
        const mp = new this.BMap.Map('memberMap_content');  
        const point = new this.BMap.Point(116.404, 39.915)
        mp.centerAndZoom(point, 15);
        mp.enableScrollWheelZoom(true);
        mp.addControl(new this.BMap.NavigationControl())
        const marker = new this.BMap.Marker(point);        // 创建标注    
        mp.addOverlay(marker);
    }

    // private addMarker = (mp: any, point: any) => {  // 创建图标对象   
    //     const myIcon = new this.BMap.Icon(markIcon, new this.BMap.Size(120, 120), {       
    //         anchor: new this.BMap.Size(10, 25)  
    //     });      
    //     const marker = new this.BMap.Marker(point, {icon: myIcon});    
    //     mp.addOverlay(marker);    
    // }   

    render() {
        return(
            <div className="memberMap">
                <div id="memberMap_content" />
            </div>
        )
    }
}
export default MemberMap