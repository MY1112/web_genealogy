
import React, { PureComponent, MouseEvent } from 'react';
import { Tree, message, Spin } from 'antd';
import './index.less';

const TreeNode = Tree.TreeNode;
const DirectoryTree = Tree.DirectoryTree;
const initialState = {
  listData: [],
  searchValue: '',
  expandedKeys: [],
  autoExpandParent: false,
  activeId: '',
  actionType: '',
  selectedKeys: [],
  autoExpandedKeys: []
};
export interface ITreeItem {
  value: string;
  title: string;
  pid: string;
  pids: string;
  count: number;
  key: string;
  children: ITreeItem[];
}
export interface IListItem {
  value: string;
  title: string;
  children?: Object[];
  key: string;
  pid?: string;
  selectable?: boolean;
  usedTime?: number;
}

export interface IDateItem {
  value?: string;
  title?: string;
  children?: Object[];
  key?: string;
  pid?: string;
}
interface IProps {
  searchVal?: string
  needIdArr?:boolean,
  handleChecked?: (item: object,idArr?:string[]) => void
   handleDbClick?: (item: object, nodeArr?: ITreeItem) => void;
  listData: object[]
  options?: {value:any,hasRules?:any}
  loading?: boolean
  autoExpandedKeys?: string[]
  selectedKeys?:string[]
  className?:string
  titleClass?:string
  isShowRules?:boolean
  defaultExpandAll?: boolean
  rowKey: string
}
interface IState {
  listData: object[];
  searchValue: string;
  expandedKeys: string[];
  autoExpandParent: boolean;
  activeId: string;
  actionType: string;
  selectedKeys: string[];
  autoExpandedKeys: string[];
}

const dataList: any[] = [];

function getParentKey(key: string, tree: object[], rowKey:string) {
  let parentKey;
  tree.forEach((item: any) => {
    const node = item;
    if (node.children) {
      if (node.children.some((item: any) => item[rowKey] === key)) {
        parentKey = node[rowKey];
      } else if (getParentKey(key, node.children,rowKey)) {
        parentKey = getParentKey(key, node.children,rowKey);
      }
    }
  });
  return parentKey;
}

function generateList(data: any[], rowKey:string) {
  data.forEach((item: any) => {
    const node = item;
    const key = node[rowKey];
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children, rowKey);
    }
  });
}
export default class NGTree extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.generateList = this.generateList.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleStopPropagation = this.handleStopPropagation.bind(this);
  }
  timer: NodeJS.Timeout | number | undefined;
  readonly state: IState = initialState;
  static defaultProps = {
    loading: false,
    titleClass: '',
    rowKey: 'key'
  };

  private generateList = (data: IDateItem[]) => {
    const {rowKey} = this.props
    data.forEach((item: any) => {
      const node = item;
      const key = node[rowKey];
      dataList.push({ key, title: node.title });
      if (node.children) {
        this.generateList(node.children);
      }
    });
  };

  // 搜索
  static getDerivedStateFromProps(props: IProps, state: IState) {
    let stateVal = {};
    if (JSON.stringify(state.listData) !== JSON.stringify(props.listData)) {
      generateList(props.listData, props.rowKey);
      stateVal = { listData: props.listData };
    }
    if (
      props.autoExpandedKeys &&
      JSON.stringify(state.autoExpandedKeys) !==
        JSON.stringify(props.autoExpandedKeys)
    ) {
      stateVal = {
        ...stateVal,
        expandedKeys: props.autoExpandedKeys,
        autoExpandedKeys: props.autoExpandedKeys
      };
    }
    if (
      state.searchValue !== props.searchVal &&
      props.searchVal !== undefined
    ) {
      let expandedKeys = [];
      const value = props.searchVal;
      const matchEvery = dataList.every(
        item => item.title.indexOf(value) <= -1
      );
      if (matchEvery) {
        message.warn('暂无该条数据');
      }

      expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item[props.rowKey], props.listData, props.rowKey);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      if (!props.searchVal) {
        expandedKeys = props.autoExpandedKeys ? props.autoExpandedKeys : [];
      }
      stateVal = {
        ...stateVal,
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      };
    }
    return stateVal;
  }

  // 展开
  private onExpand = (expandedKeys: string[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };
  // 递归拿取树的id
  private getIdArr = (data: ITreeItem[], idArr: string[]) => {
    data.length &&
      data.forEach(ele => {
        idArr.push(ele.value);
        if (ele.children.length > 0) {
          this.getIdArr(ele.children, idArr);
        }
      });
  };
  // 点击树节点
  private handleClickItem = (e: MouseEvent, node: any) => {
    e.persist();
    clearTimeout(this.timer as number);
    //设置延时300ms
    this.timer = setTimeout(() => {
      //在此写单击事件要执行的代码
      const { needIdArr, rowKey } = this.props;
      const { item } = node.props;
      const idArr: string[] = [];
      e.persist();
      if (item.selectable === false) {
        return;
      }
      this.setState({
        activeId: item.value,
        selectedKeys: [item[rowKey]]
      });
      if (needIdArr) {
        idArr.push(item.value);
        this.getIdArr(item.children, idArr);
        return (
          this.props.handleChecked && this.props.handleChecked(item, idArr)
        );
      }
      this.props.handleChecked && this.props.handleChecked(item);
    }, 300);
  };

  // 阻止冒泡
  private handleStopPropagation(e: MouseEvent) {
    e.persist();
    e.stopPropagation();
  }

  // 树子节点循环
  private getloopTree = (data: object[]) => {
    const { options, titleClass, isShowRules } = this.props;
    const { searchValue } = this.state;
    const titleNode = (
      title: React.ReactNode,
      item: IListItem,
      titleText: string
    ) => {
      const otherClass =
        item.usedTime !== undefined &&
        isShowRules &&
        (item.usedTime as number) > 0;
      return (
        <React.Fragment>
          <span
            title={titleText}
            className={`ngTree_title ${titleClass} ${
              otherClass ? `hasRules` : ``
            }`}
          >
            {title}
          </span>
          {options && (
            <span
              className="ngTree_options"
              onClick={this.handleStopPropagation}
            >
              {options.value(item)}
            </span>
          )}
        </React.Fragment>
      );
    };

    return data.map((item: any) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const {rowKey} = this.props
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return (
          <TreeNode
            selectable={item.selectable}
            key={item[rowKey]}
            title={titleNode(title, item, item.title)}
            item={item}
          >
            {this.getloopTree(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          selectable={item.selectable}
          key={item[rowKey]}
          title={title}
          item={item}
        />
      );
    });
  };

  private handleDbClick = (e: MouseEvent, node: any) => {
    clearTimeout(this.timer as number);
    const { needIdArr, rowKey } = this.props;
    const { item } = node.props;
    e.persist();
    if (item.selectable === false) {
      return;
    }
    this.setState({
      activeId: item.value,
      selectedKeys: [item[rowKey]]
    });
    if (needIdArr) {
      return this.props.handleDbClick && this.props.handleDbClick(item, item);
    }
    this.props.handleDbClick && this.props.handleDbClick(item);
  };

  render() {
    const { expandedKeys, autoExpandParent, selectedKeys } = this.state
    const { loading, listData, className, defaultExpandAll } = this.props
    const treeProps = {
      ...this.props,
      onExpand: this.onExpand,
      autoExpandParent,
      onClick: this.handleClickItem,
       onDoubleClick:this.handleDbClick,
      selectedKeys: this.props.selectedKeys ? this.props.selectedKeys : selectedKeys,
      ...defaultExpandAll?{}:{expandedKeys}
    }
    return (
      <div className={`ngTree ${className || ''}`}>
        <Spin spinning={loading}>
          <DirectoryTree
            {...treeProps}
          >
            {this.getloopTree(listData)}
          </DirectoryTree>
        </Spin>
      </div>
    );
  }
}
