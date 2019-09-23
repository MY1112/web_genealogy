/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 14:21:01 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-09-20 17:42:48
 */
import React, { PureComponent } from 'react'
// import G6 from '@antv/g6'
import './index.less'

const G6 = require('@antv/g6')

interface IProps {}

interface IState {
    CDNLoading: boolean
}

const data = {
    "id": "蓝-1",
    "children": [
      {
        "id": "蓝-2-1",
        "children": [
          { "id": "蓝-3-1" },
          { "id": "蓝-3-2" },
          { "id": "蓝-3-3" },
          { "id": "蓝-3-4" },
          { "id": "蓝-3-5" },
          { "id": "蓝-3-6" },
          { "id": "蓝-3-7" },
          { "id": "蓝-3-8" }
        ]
      },
      {
        "id": "蓝-2-2",
        "children": [
          {
            "id": "蓝-3-9",
            "children": [
              { "id": "蓝-4-1" },
              { "id": "蓝-4-2" },
              { "id": "蓝-4-3" },
              { "id": "蓝-4-4" },
              { "id": "蓝-4-5" },
              { "id": "蓝-4-6" }
            ]
          },
          {
            "id": "蓝-3-10",
            "children": [
              { "id": "蓝-4-7" },
              { "id": "蓝-4-8" }
            ]
          },
          {
            "id": "蓝-3-11",
            "children": [
              { "id": "蓝-4-9" },
              { "id": "蓝-4-10" },
              { "id": "蓝-4-11" }
            ]
          }
        ]
      },
      {
        "id": "蓝-2-3",
        "children": [
          { "id": "蓝-3-12" },
          { "id": "蓝-3-13" },
          { "id": "蓝-3-14" },
          { "id": "蓝-3-15" },
          { "id": "蓝-3-16" }
        ]
      }
    ]
  }

class MemberTree extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            CDNLoading: false
        }
    }

    componentDidMount() {
        const graph = new G6.TreeGraph({
            container: 'mountNode',
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: 2,
            modes: {
              default: [{
                type: 'collapse-expand',
                onChange: function onChange(item, collapsed) {
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
              getId: function getId(d) {
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
      
          graph.node(function(node: any) {
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
      
          graph.data(data);
          graph.render();
          graph.fitView();
    }


    render() {
        return (
            <div id="mountNode" className="memberTree"/>
        )
    }
}
export default MemberTree