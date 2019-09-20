/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 16:30:18 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-09-20 16:20:34
 */
import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import './index.less'

const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/oldie')(Highcharts)

interface IProps {}
interface IState {}

const options1: any = {
    chart: {
		height: 600,
		inverted: true
	},
	title: {
		text: 'Highsoft 公司组织结构'
	},
	series: [{
		type: 'organization',
		name: 'Highsoft',
		keys: ['from', 'to'],
		data: [
			['股东', '董事会'],
			['董事会', 'CEO'],
			['CEO', 'CTO'],
			['CEO', 'CPO'],
			['CEO', 'CSO'],
			['CEO', 'CMO'],
			['CEO', 'HR'],
			['CTO', 'Product'],
			['CTO', 'Web'],
			['CSO', 'Sales'],
			['CMO', 'Market']
		],
		levels: [{
			level: 0,
			color: 'silver',
			dataLabels: {
				color: 'black'
			},
			height: 25
		}, {
			level: 1,
			color: 'silver',
			dataLabels: {
				color: 'black'
			},
			height: 25
		}, {
			level: 2,
			color: '#980104'
		}, {
			level: 4,
			color: '#359154'
		}],
		nodes: [{
			id: 'Shareholders'
		}, {
			id: 'Board'
		}, {
			id: 'CEO',
			title: 'CEO',
			name: 'Grethe Hjetland',
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132317/Grethe.jpg'
		}, {
			id: 'HR',
			title: 'HR/CFO',
			name: 'Anne Jorunn Fjærestad',
			color: '#007ad0',
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg',
			column: 3,
			offset: '75%'
		}, {
			id: 'CTO',
			title: 'CTO',
			name: 'Christer Vasseng',
			column: 4,
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12140620/Christer.jpg',
			layout: 'hanging'
		}, {
			id: 'CPO',
			title: 'CPO',
			name: 'Torstein Hønsi',
			column: 4,
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12131849/Torstein1.jpg'
		}, {
			id: 'CSO',
			title: 'CSO',
			name: 'Anita Nesse',
			column: 4,
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg',
			layout: 'hanging'
		}, {
			id: 'CMO',
			title: 'CMO',
			name: 'Vidar Brekke',
			column: 4,
			image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg',
			layout: 'hanging'
		}, {
			id: 'Product',
			name: '产品研发'
		}, {
			id: 'Web',
			name: '运维',
			description: '网站开发，系统维护'
		}, {
			id: 'Sales',
			name: '销售部'
		}, {
			id: 'Market',
			name: '市场部'
		}],
		colorByPoint: false,
		color: '#007ad0',
		dataLabels: {
			color: 'white'
		},
		borderColor: 'white',
		nodeWidth: 65
	}],
	tooltip: {
		outside: true
	},
	exporting: {
		allowHTML: true,
		sourceWidth: 800,
		sourceHeight: 600
	}
}

const options2: any = {
    chart: {
		type: 'area'
	},
	title: {
		text: '美苏核武器库存量'
	},
	subtitle: {
		text: '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
		'thebulletin.metapress.com</a>'
	},
	xAxis: {
		allowDecimals: false
	},
	yAxis: {
		title: {
			text: '核武库国家'
		},
		labels: {
			formatter: function () {
				return this.value / 1000 + 'k';
			}
		}
	},
	tooltip: {
		pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
	},
	plotOptions: {
		area: {
			pointStart: 1940,
			marker: {
				enabled: false,
				symbol: 'circle',
				radius: 2,
				states: {
					hover: {
						enabled: true
					}
				}
			}
		}
	},
	series: [{
		name: '美国',
		data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
			   1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
			   27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
			   26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
			   24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
			   22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
			   10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
	}, {
		name: '苏联/俄罗斯',
		data: [null, null, null, null, null, null, null, null, null, null,
			   5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
			   4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
			   15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
			   33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
			   35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
			   21000, 20000, 19000, 18000, 18000, 17000, 16000]
	}]
}
class MemberCharts extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.Highcharts = <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options2}
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