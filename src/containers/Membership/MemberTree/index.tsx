/*
 * @Author: mengyuan 
 * @Date: 2019-09-19 14:21:01 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-09-20 17:42:48
 */
import React, { PureComponent } from 'react'
import G6 from '@antv/g6'
import './index.less'


interface IProps {}

interface IState {
    CDNLoading: boolean
}

const data = {
    "id": "Modeling Methods",
    "children": [
      {
        "id": "Classification",
        "children": [
          { "id": "Logistic regression" },
          { "id": "Linear discriminant analysis" },
          { "id": "Rules" },
          { "id": "Decision trees" },
          { "id": "Naive Bayes" },
          { "id": "K nearest neighbor" },
          { "id": "Probabilistic neural network" },
          { "id": "Support vector machine" }
        ]
      },
      {
        "id": "Consensus",
        "children": [
          {
            "id": "Models diversity",
            "children": [
              { "id": "Different initializations" },
              { "id": "Different parameter choices" },
              { "id": "Different architectures" },
              { "id": "Different modeling methods" },
              { "id": "Different training sets" },
              { "id": "Different feature sets" }
            ]
          },
          {
            "id": "Methods",
            "children": [
              { "id": "Classifier selection" },
              { "id": "Classifier fusion" }
            ]
          },
          {
            "id": "Common",
            "children": [
              { "id": "Bagging" },
              { "id": "Boosting" },
              { "id": "AdaBoost" }
            ]
          }
        ]
      },
      {
        "id": "Regression",
        "children": [
          { "id": "Multiple linear regression" },
          { "id": "Partial least squares" },
          { "id": "Multi-layer feedforward neural network" },
          { "id": "General regression neural network" },
          { "id": "Support vector regression" }
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
            <div id="mountNode" className="memberTree">
                <p>charts树状图</p>
            </div>
        )
    }
}
export default MemberTree