/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 14:21:01 
 * @Last Modified by: Circlemeng
 * @Last Modified time: 2021-01-06 16:11:21
 */
import React, { PureComponent } from 'react'
import { Button } from 'antd'
import './index.less'
import Api, { IResApiData } from '../Api'
import NGNoData from 'components/NGNoData';

const G6 = require('@antv/g6')

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
    private graph: any
    private treeData: any

    componentDidMount() {
      const jsonUser = localStorage.getItem('userInfo');
      const userInfo = jsonUser ? JSON.parse(jsonUser) : undefined;
      let userId = userInfo?._id
      if (userInfo?.identity === 'user') {
        userId = userInfo?.pid
      }
      Api.memberTree(userId).then((res: IResApiData) => {
        if (res.code === 10000) {
          this.treeData = res.data[0]
          this.setState({
            CDNLoading: true
          },() => {
            this.getGraphTree()
          })
        }
      })
    }

    private getGraphTree = () => {
      this.graph = new G6.TreeGraph({
        container: 'mountNode',
        width: window.innerWidth > 900 ? window.innerWidth - 250 : window.innerWidth - 30,
        height: window.innerHeight - 187,
        pixelRatio: 2,
        modes: {
          default: ['collapse-expand', 'drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
          size: 16,
          anchorPoints: [[0, 0.5], [1, 0.5]]
        },
        defaultEdge: {
          type: 'cubic-horizontal'
        },
        nodeStyle: {
          default: {
            fill: '#40a9ff',
            stroke: '#096dd9'
          }
        },
        edgeStyle: {
          default: {
            stroke: '#A3B1BF'
          }
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d: any) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          }
        }
      });
  
      this.graph.node(function(node: any) {
        return {
          size: 26,
          style: {
            fill: '#40a9ff',
            stroke: '#096dd9'
          },
          label: node.id,
          labelCfg: {
            position: node.children && node.children.length > 0 ? 'left' : 'right'
          }
        };
      });
  
      this.graph.data(this.treeData);
      this.graph.render();
      this.graph.fitView();
    }

    private handleDownloadTree = () => {
      // const dataURL = this.graph.toDataURL()
      // console.log(dataURL)
      this.graph.downloadImage('成员树')
    }

    render() {
        return (
          <div className="memberTree">
            {
              this.state.CDNLoading &&
              <div className="memberTree_download">
                <Button
                  className="default_btn csp"
                  icon="download"
                  onClick={() => this.handleDownloadTree()}
                >
                  导出
                </Button>
              </div>
            }
            {
              !this.state.CDNLoading &&
              <NGNoData
                text="家族空空如也～～请先创建家族成员吧～"
              />
            }
            <div id="mountNode" className="memberTree_content"/>
          </div>
        )
    }
}
export default MemberTree