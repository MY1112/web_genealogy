/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 16:30:18 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-09-19 17:49:45
 */
import React, { PureComponent } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import './index.less'

interface IProps extends HighchartsReact.Props {}

interface IState {}

const options: Highcharts.Options = {
    chart: {
		height: 600,
		inverted: true
	},
	title: {
		text: 'Highsoft 公司组织结构'
	}
}

class MemberCharts extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.Highcharts = <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                {...props}
            />
        </div>
    }
    private Highcharts: any

    render() {
        return (
            <div>
                {this.Highcharts}
            </div>
        )
    }
}
export default MemberCharts