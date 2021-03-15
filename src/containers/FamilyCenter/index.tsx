import React, { PureComponent } from 'react';
import { Drawer, Icon, Divider, Tag, Tabs, Comment, Avatar, Tooltip } from 'antd';
import './index.less';
import moment from 'moment'

const { TabPane } = Tabs;

interface IProps {}

interface IState {
  isVisible: boolean
  likes: number
  dislikes: number
  action: string | null
}

const initialState = {
  isVisible: false,
  likes: 0,
  dislikes: 0,
  action: null
}

export default class FamilyCenter extends PureComponent<IProps, IState> {
  readonly state: IState = initialState
  componentDidMount() {
    
  }
  
  private handleChangeConfig = (active: boolean) => {
    this.setState({ isVisible: active })
  }

  private like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  private dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  render() {
    const { isVisible, likes, dislikes, action } = this.state
    return (
      <div className="family-center">
        <div className="family-center-content flex">
          <div className="family-center-content-left mr-8 p-16">
            <div className="family-center-content-left-header flex_column flex_center pb-16">
              <div className="family-center-content-left-header-avatar flex_c">
                神
              </div>
              <h1 className="mt-12">神氏族谱</h1>
              <p className="mt-10">海纳百川，有容乃大</p>
            </div>
            <div className="family-center-content-left-content flex_column">
              <div className="mt-10">
                <Icon type="audit" className="mr-10"/>
                家族负责人: 
              </div>
              <div className="mt-10">
                <Icon type="apartment" className="mr-10"/>
                其他负责人: 
              </div>
              <div className="mt-10">
                <Icon type="laptop" className="mr-10"/>
                系统管理人: 
              </div>
              <div className="mt-10">家族族训: </div>
              <div className="mt-10">简介: </div>
            </div>
            <Divider dashed />
            <div className="family-center-content-left-content">
              <strong>标签</strong>
              <div className="mt-12">
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="gold">gold</Tag>
                <Tag color="lime">lime</Tag>
                <Tag color="green">green</Tag>
                <Tag color="cyan">cyan</Tag>
                <Tag color="blue">blue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="purple">purple</Tag>
              </div>
            </div>
          </div>
          <div className="family-center-content-right flex_1">
            <Tabs defaultActiveKey="1">
              <TabPane tab="家族动态(3)" key="1">
                <div className="pl-16 pr-16">
                  <Comment
                    actions={[
                      <span key="comment-basic-like">
                        <Tooltip title="Like">
                          <Icon
                            type="like"
                            theme={action === 'liked' ? 'filled' : 'outlined'}
                            onClick={this.like}
                          />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                      </span>,
                      <span key=' key="comment-basic-dislike"'>
                        <Tooltip title="Dislike">
                          <Icon
                            type="dislike"
                            theme={action === 'disliked' ? 'filled' : 'outlined'}
                            onClick={this.dislike}
                          />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
                      </span>,
                      <span key="comment-basic-reply-to">Reply to</span>
                    ]}
                    author={<a>Han Solo</a>}
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully
                        and efficiently.
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </div>
              </TabPane>
              <TabPane tab="留言板(5)" key="2">
                一些留言
              </TabPane>
            </Tabs>
          </div>
        </div>


        {/* <a
          onClick={this.handleChangeConfig.bind(this, true)}
        >
          设置
        </a>
        <Drawer
          closable={false}
          visible={isVisible}
          onClose={this.handleChangeConfig.bind(this, false)}
        /> */}
      </div>
    )
  }
}
