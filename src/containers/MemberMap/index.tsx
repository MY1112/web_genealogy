import React, { Component } from 'react'
import { Switch, Icon, Tooltip, message } from 'antd'
import './index.less'
import Api, { IResApiData } from '../Membership/Api';
import { loadCDN } from 'util/Tool';

interface IProps {}

interface IState {
  isEarth: boolean;
}

const markIcon = require('../../assets/imgs/map/lantern.png')

//  3c298903d2e84323d94405cee4cd0661
class MemberMap extends Component<IProps, IState> {
  private BMapGL: any
  private mp: any
  private mapvgl: any
  private view: any
  constructor(props: IProps) {
    super(props)
		this.state = {
      isEarth: false
		}
  }
  componentDidMount() {
    this.loadBaiduMapScript()
      .then((res: any) => {
        const scriptList = [
          'https://mapv.baidu.com/build/mapv.min.js',
          'https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.97/dist/mapvgl.min.js',
          'https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.97/dist/mapvgl.threelayers.min.js'
        ]
        loadCDN(scriptList)
          .then(() => {
            this.BMapGL = window.BMapGL;
            this.getAllMember((addressList, resTree) => {
              let index = 0
              const mp = new this.BMapGL.Map('memberMap_content') // 初始化实例
              this.mp = mp
              this.mapvgl = window.mapvgl;
              const mapv = window.mapv;
              let centerCityName = '北京市';
              let hasAddress = false;
              addressList.forEach(item => {
                if (item.level === 1 && item.address) {
                  centerCityName = item.address;
                  hasAddress = true;
                }
              })
              // 创建地址解析器实例
              const myGeo = new this.BMapGL.Geocoder()
              myGeo.getPoint(centerCityName, (centerPoint: any) => {
                const resCenterPoint = centerPoint || {lng: 116.404, lat: 39.915}
                const point = new this.BMapGL.Point(resCenterPoint.lng, resCenterPoint.lat)
                mp.centerAndZoom(point, hasAddress ? 9 : 6) // 设置地图中心
                mp.enableScrollWheelZoom(true) // 允许滚动缩放
          
                mp.setMapStyleV2({
                  styleId: '3c298903d2e84323d94405cee4cd0661',
                })
          
                const scaleCtrl = new this.BMapGL.ScaleControl() // 添加比例尺控件
                mp.addControl(scaleCtrl)
                const zoomCtrl = new this.BMapGL.ZoomControl({
                  offset: new this.BMapGL.Size(12, 20),
                }) // 添加比例尺控件
                mp.addControl(zoomCtrl)
                const navigationCtrl3d = new this.BMapGL.NavigationControl3D()
                mp.addControl(navigationCtrl3d)
                mp.setTilt(73);
          
                
                // 地图飞线，成员关系线
                const curve = new this.mapvgl.BezierCurve();

                const resHasChild = resTree.filter(item => !!item.children.length)
                
                const lineData: any = [];
                let i = 0;

                const getLinePoint = (i: number) => {
                  if (i < resHasChild.length) {
                    const childrenList = resHasChild[i]['children'];
                    myGeo.getPoint(resHasChild[i]['address'] || resHasChild[i]['birthplaceText'], (startPoint: any) => {
                      if (startPoint) {
                        let j = 0;
                        const getChildrenPoint = (j: number) => {
                          if (j < childrenList.length) {
                            myGeo.getPoint(childrenList[j]['address'], (endPoint: any) => {
                              if (endPoint) {
                                curve.setOptions({
                                  start: [startPoint.lng, startPoint.lat],
                                  end: [endPoint.lng, endPoint.lat]
                                });
                                var curveModelData = curve.getPoints();
                                lineData.push({
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: curveModelData
                                    }
                                });
                                j++;
                                getChildrenPoint(j);
                              }
                            })
                          } else {
                            i++;
                            getLinePoint(i);
                          }
                        }
                        getChildrenPoint(j);
                      }
                    })
                  } else {
                    this.view = new this.mapvgl.View({
                      map: this.mp
                    });
                    const flyLineLayer = new this.mapvgl.FlyLineLayer({
                        style: 'chaos',
                        step: 0.2,
                        color: 'rgba(94, 236, 124, 0.8)',
                        textureColor: 'rgb(237, 242, 7)',
                        textureWidth: 20,
                        textureLength: 10
                    });
                    this.view.addLayer(flyLineLayer);
                    flyLineLayer.setData(lineData);
                  }
                }
                getLinePoint(i);
                
                
                // 创建icon图标
                const myIcon = new this.BMapGL.Icon(
                  markIcon,
                  new this.BMapGL.Size(20, 20)
                )
          
                const bdGEO = () => {
                  if (index < addressList.length) {
                    const addressItem = addressList[index]
                    geoCodeSearch(addressItem)
                    index++
                  }
                }
                const geoCodeSearch = (addressItem: any) => {
                  if (index < addressList.length) {
                    setTimeout(bdGEO, 400)
                  }
                  // 将地址解析结果显示在地图上,并调整地图视野
                  myGeo.getPoint(addressItem.address, (point: any) => {
                    if (point) {
                      // point.lng  point.lat
                      addMarker(mp, point, addressItem)
                    }
                  })
                }
                // 编写自定义函数,创建标注
                const addMarker = (mp: any, point: any, addressItem: any) => {
                  const sizeNumX = parseInt((Math.random() * 20).toString(), 10) * (Math.round(Math.random()) * 2 - 1);
                  const sizeNumY = (parseInt((Math.random() * 20).toString(), 10) + 10) * (Math.round(Math.random()) * 2 - 1);
                  let myRepeatIcon: any;
                  if (addressItem.isRepeat) {
                    myRepeatIcon = new this.BMapGL.Icon(
                      markIcon,
                      new this.BMapGL.Size(20, 20),
                      {
                        anchor: new this.BMapGL.Size(sizeNumX, sizeNumY),
                      }
                    )
                  }
                  const opts = {
                    width: 200, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                          title: addressItem.name, // 信息窗口标题
                    message: addressItem.address
                  }
                  const infoWindow = new this.BMapGL.InfoWindow(
                    `地址: ${addressItem.address}`,
                    opts
                  ) // 创建信息窗口对象
                  const marker = new this.BMapGL.Marker(point, { icon: addressItem.isRepeat ? myRepeatIcon : myIcon })
                  marker.addEventListener('click', () =>
                    this.handleOpenModel(infoWindow, point)
                  )
                  mp.addOverlay(marker)
                }
          
                bdGEO() // 执行循环渲染点     
              })
            })
          })
          .catch(() => {
            message.error('初始化地图失败');
          });
      })
      .catch((e: any) => {
        message.error('初始化地图失败');
      });
  }

  private getChildList = (data: any[]) => {
    const result: any = []
    for (let i = 0; i < data.length; i++) {
      let temp: any = []
      data.forEach(item => {
        if (data[i].uid === item.pid) {
          const obj: any = {
            key: item.uid,
            pid: item.pid,
            pids: item.pids,
            title: item.title,
            pTitle: item.pTitle,
            address: item.address || item.birthplaceText
          }
          temp.push(obj)
        }
      })
      data[i].children = temp;
      result.push(data[i])
    }
    return result
  }

  private loadBaiduMapScript = () => {
    const ak = 'pfDeQwmAwislusrWwBxzVVXLfXustbd7';
    const BMapGL_URL =
      'http://api.map.baidu.com/api?type=webgl&v=1.0&ak=' +
      ak +
      '&s=1&callback=onBMapCallback';
    const nowScript = Array.from(document.getElementsByTagName('script')).map(
      item => item.src
    );
    if (nowScript.includes(BMapGL_URL)) {
      return new Promise((resolve, reject) => {
        return resolve();
      });
    }
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if (typeof window.BMapGL !== 'undefined') {
        resolve();
      }
      // 百度地图异步加载回调处理
      (window as any).onBMapCallback = () => {
        resolve(window.BMapGL);
      };
      // 插入script脚本
      let scriptNode = document.createElement('script');
      scriptNode.setAttribute('type', 'text/javascript');
      scriptNode.setAttribute('src', BMapGL_URL);
      document.body.appendChild(scriptNode);
    });
  };

  componentWillUnmount() {
    this.view && this.view.destroy();
		this.mp && this.mp.removeEventListener('click', this.handleOpenModel)
		this.mp && this.mp.reset()
  }

  private handleChangeFlyLine = (e: boolean) => {
    if (e) {
      this.view.show();
    } else {
      this.view.hide();
    }
  }

  private handleOpenModel = (infoWindow: any, point: any) => {
    this.mp.openInfoWindow(infoWindow, point) //开启信息窗口
  }

  private changeMapStyle = (e: boolean) => {
    this.mp.setMapStyleV2({
      styleId: e
        ? '3c298903d2e84323d94405cee4cd0661'
        : '7c89ae5e874bab456f62ce9edaeb2ed5',
    })
	}
	
	private changeMapType = () => {
		const { isEarth } = this.state
		this.setState({
			isEarth: !isEarth
		}, () => {
			this.mp.setMapType(!isEarth ? BMAP_EARTH_MAP : BMAP_NORMAL_MAP)
      this.mp.setZoom(!isEarth ? 3 : 6)
		})
  }

  private getAllMember = (cb: (data: any[], resTree: any[]) => void) => {
    const jsonUser = localStorage.getItem('userInfo');
    const userInfo: any = jsonUser ? JSON.parse(jsonUser) : undefined;
    let userId = userInfo?._id
    if (userInfo?.identity === 'user') {
      userId = userInfo?.pid
    }
    Api.memberStatistic(userId)
      .then((res: IResApiData) => {
        const arr = this.getMapAddress(res.data);
        const resTree = this.getChildList(res.data);
        cb(arr, resTree)
      })
      .catch((err) => {})
  }

  private getMapAddress = (data: any[]) => {
    const haveAddress =
      data && data.filter((item) => item.address || item.birthplaceText)
    const res: any = [];
    haveAddress.forEach((item) => {
      const addressText = item.address || item.birthplaceText;
      const repeatNum = haveAddress.reduce((pre, cur) => {
        const resAddress = cur.address || cur.birthplaceText;
        return addressText === resAddress ? pre + 1 : pre + 0;
      }, 0)
      const isRepeat = repeatNum > 1;
      const obj = {
        isRepeat,
        address: addressText,
        name: item.title,
        level: item.pids.length,
        pTitle: item.pTitle || '-',
      }
      res.push(obj)
    })
    return res
  }

  render() {
    const { isEarth } = this.state
    return (
      <div className="memberMap">
        {!isEarth && (
          <Switch
            className="memberMap_fly"
            checkedChildren="成员飞线"
            unCheckedChildren="取消飞线"
            onChange={this.handleChangeFlyLine.bind(this)}
            defaultChecked
          />
        )}
        {!isEarth && (
          <Switch
            className="memberMap_switch"
            checkedChildren="开灯"
            unCheckedChildren="关灯"
            onChange={this.changeMapStyle.bind(this)}
            defaultChecked
          />
        )}
				<Tooltip title={isEarth ? '地图模式' : '地球模式'}>
					<Icon
						onClick={this.changeMapType.bind(this)}
						className={`memberMap_earth csp ${isEarth ? 'memberMap_earth_active' : ''}`}
						type="global"
					/>
				</Tooltip>
        <div id="memberMap_content" />
      </div>
    )
  }
}
export default MemberMap
