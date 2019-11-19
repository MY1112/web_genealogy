/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 14:21:01 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-11-19 17:55:19
 */
import React, { PureComponent } from 'react'
import { Button } from 'antd'
import './index.less'
import Api, { IMODApiData } from '../Api'

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
      const userInfo = JSON.parse(localStorage.getItem('userInfo')||'')
      Api.memberTree(userInfo._id).then((res: IMODApiData) => {
        if (res.code === 10000) {
          this.treeData = res.data[0]
          this.getGraphTree()
        }
      })
    }

    private getGraphTree = () => {
      this.graph = new G6.TreeGraph({
        container: 'mountNode',
        width: window.innerWidth - 250,
        height: window.innerHeight - 187,
        pixelRatio: 2,
        modes: {
          default: [{
            type: 'collapse-expand',
            onChange: function onChange(item: any, collapsed: any) {
              var data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            }
        }, 'drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
          size: 16,
          anchorPoints: [[0, 0.5], [1, 0.5]]
        },
        defaultEdge: {
          shape: 'cubic-horizontal'
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
            <div className="memberTree_download">
              {
                this.treeData ?
                <Button
                  className="default_btn csp"
                  icon="download"
                  onClick={() => this.handleDownloadTree()}
                >
                  导出
                </Button> : <span>家族空空如也～～请先创建家族成员吧～</span>
              }
            </div>
            <div id="mountNode" className="memberTree_content"/>
          </div>
        )
    }
}
export default MemberTree