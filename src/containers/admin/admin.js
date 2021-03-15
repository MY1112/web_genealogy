import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import './admin.less'
import Header from './children/header'
import Content from './children/content'
import Footer from './children/footer'
import { initRouters, routers } from '../../routers/router.config'
import logo from '../../assets/imgs/base_home.png'

const SubMenu = Menu.SubMenu
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const newRouters = routers.filter(item => {
  if (['admin','god'].includes(userInfo?.identity)) {
    return true
  } else {
    if (item.menuName !== '用户') {
      return true
    }
    return false
  }
})
const initRoutersNew = initRouters.filter(item => {
  if (['admin','god'].includes(userInfo?.identity)) {
    return true
  } else {
    if (item.menuName !== '用户') {
      return true
    }
    return false
  }
})
class Admin extends Component {
  newRouters = newRouters
  initRoutersNew = initRoutersNew
  rootSubmenuKeys = JSON.parse(JSON.stringify(this.initRoutersNew))
  state = {
    isShowMenu: false,
    collapsed: false,
    openKeys: [], // 打开的菜单
    selectedKeys: [], // 选中的菜单
    breadcrumb: [] // 面包屑
  }

  initShowMenu(pathname) {
    let selectedKeys = []
    let indexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, pathname, index)
      if (
        result &&
        Object.prototype.toString.call(result) === '[object Object]'
      ) {
        selectedKeys = [result.findKey]
        indexList = result.indexList
      }
    })
    this.setState({ selectedKeys })
    const deepIndexList = (item, list, parentList) => {
      if (list.length > 2) {
        let index = list.shift()
        return deepIndexList(item[index].children, list, item[index])
      } else if (!list.length) {
        return parentList.menuName
      } else if (list.length === 1) {
        return item[list[0]].menuName
      }
    }
    // 根据当前需要高亮的序号，把其他不高亮的移除
    const deepIndex = (list, indexList) => {
      if (indexList.length === 1) {
        list.forEach(item => {
          item.isOpen = false
        })
        list[indexList.shift()].isOpen = true
      } else if (indexList.length > 1) {
        list.forEach((item, index) => {
          if (index !== indexList[0]) {
            item.isOpen = false
          } else {
            item.isOpen = true
          }
        })
        deepIndex(list[indexList.shift()].children, indexList)
      }
    }
    deepIndex(this.rootSubmenuKeys, indexList)
    if (!this.state.collapsed) {
      let openKeys = this.deepEachOpenKey()
      this.setState({ openKeys })
    }
  }

  componentDidMount() {
    this.initShowMenu(this.props.location.pathname)
    this.getBreadcrumb(this.props.location.pathname)
  }
  toggleCollapsed = () => {
    if (!this.state.collapsed) {
      // 重置菜单，全部关闭
      this.rootSubmenuKeys = JSON.parse(JSON.stringify(this.initRoutersNew))
    }
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: []
    })
  }
  changeShowMenu = () => {
    this.setState({
      isShowMenu: !this.state.isShowMenu
    })
  }
  // 如果菜单是收缩状态
  onOpenChange = menu => {
    if (this.state.collapsed) {
      this.setState({
        openKeys: menu
      })
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.initShowMenu(nextProps.location.pathname)
      this.getBreadcrumb(nextProps.location.pathname)
    }
  }
  // 找到这个菜单属于哪个位置
  findKeyFunc(item, findKey, index, indexList = []) {
    if (item.children && item.children.length) {
      if (item.menuName === findKey) {
        indexList.push(index)
        // 点击的菜单节点,如一级菜单（包含子菜单）
        return indexList
      } else {
        if (item.children && item.children.length) {
          indexList.push(index)
        }
        // 点击的菜单节点,如二级菜单（包含子菜单）
        let retrunResult = []
        item.children.forEach((el, _index) => {
          let result = this.findKeyFunc(
            el,
            findKey,
            _index,
            JSON.parse(JSON.stringify(indexList))
          )
          if (
            result &&
            (result.length ||
              Object.prototype.toString.call(result) === '[object Object]')
          ) {
            retrunResult = result
          }
        })
        return retrunResult
      }
    } else if (item.path === findKey) {
      // 点击的路由页面菜单（不包含菜单）
      return {
        findKey,
        indexList
      }
    } else {
      return null
    }
  }
  menuClick({ key }) {
    this.getBreadcrumb(key)
    this.props.history.push(key)
  }
  // 获得面包屑
  getBreadcrumb = key => {
    let findKey = ''
    let indexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, key, index)
      if (result && result.findKey) {
        findKey = result.findKey
        indexList = result.indexList
      }
    })
    if (!indexList.length) {
      let oData = this.rootSubmenuKeys.find(el => el.path === findKey)
      if (oData) {
        this.setState({
          breadcrumb: [oData.menuName]
        })
      }
    } else {
      let menuList = null
      let breadcrumb = []
      const deep = list => {
        if (list.length) {
          menuList =
            (menuList && menuList.children[list.shift()]) ||
            this.rootSubmenuKeys[list.shift()]
          breadcrumb.push(menuList.menuName)
          if (list.length) {
            deep(list)
          }
        }
      }
      deep(indexList)
      let lastMenuName = menuList.children.find(el => el.path === findKey)
        .menuName
      breadcrumb.push(lastMenuName)
      this.setState({
        breadcrumb
      })
    }
  }
  // 遍历对应的菜单栏进行,同等级的菜单关闭
  deepEach(list, indexList) {
    if (indexList.length > 1) {
      let nextIndex = indexList.shift()
      this.deepEach(list[nextIndex].children, indexList)
    } else if (indexList.length === 1) {
      let lastIndex = indexList.pop()
      let oldIsOpem = list[lastIndex].isOpen
      list.forEach(item => {
        item.isOpen = false
      })
      list[lastIndex].isOpen = !oldIsOpem
    }
  }
  // 遍历对应的菜单，筛选打开的菜单并且返回
  deepEachOpenKey() {
    const deepMenu = (item, list = []) => {
      if (item.children && item.children.length) {
        if (item.isOpen) {
          list.push(item.menuName)
        }
        item.children.forEach(el => {
          deepMenu(el, list)
        })
      }
    }
    let openKeysList = []
    this.rootSubmenuKeys.forEach(item => {
      deepMenu(item, openKeysList)
    })
    return openKeysList
  }
  setOpenKeys(key) {
    let getIndexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, key, index)
      if (result && result.length) {
        getIndexList = result
      }
    })
    this.deepEach(this.rootSubmenuKeys, getIndexList)
  }
  // 点击多级菜单
  onTitleClick = ({ key }) => {
    if (!this.state.collapsed) {
      this.setOpenKeys(key)
      let openKeys = this.deepEachOpenKey()
      this.setState({ openKeys })
    }
  }
  render() {
    const userInfoNew = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfoNew?.username !== userInfo?.username &&
        !this.state.openKeys.length && !this.state.selectedKeys.length
      ) {
      this.newRouters = routers.filter(item => {
        if (['admin','god'].includes(userInfoNew?.identity)) {
          return true
        } else {
          if (item.menuName !== '用户') {
            return true
          }
          return false
        }
      })
      this.initRoutersNew = initRouters.filter(item => {
        if (['admin','god'].includes(userInfo?.identity)) {
          return true
        } else {
          if (item.menuName !== '用户') {
            return true
          }
          return false
        }
      })
      this.rootSubmenuKeys = JSON.parse(JSON.stringify(this.initRoutersNew))
    }
    // 递归路由
    const mapRouters = item => {
      if (item.children && item.children.length) {
        // 存在子集
        return (
          <SubMenu
            onTitleClick={this.onTitleClick}
            key={item.menuName}
            title={
              <span>
                <Icon type={item.menuIco} />
                <span>{item.menuName}</span>
              </span>
            }
          >
            {item.children.map(child => mapRouters(child))}
          </SubMenu>
        )
      } else {
        // 没有子集
        return (
          <Menu.Item key={item.path}>
            <span>{item.menuName}</span>
          </Menu.Item>
        )
      }
    }
    // 只能同时打开一个
    return (
      <div className="admin">
        <div
          className={`left-menu ${this.state.collapsed ? 'left-menu-all' : ''} 
           ${this.state.isShowMenu ? 'left-menu-show' : ''}`}
        >
          <a className="logo flex_left">
            <img src={logo} alt="" />
            {this.state.collapsed ? '' : <span>家家OA </span>}
          </a>
          <Menu
            // 收缩暂时存在bug
            openKeys={this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            onOpenChange={this.onOpenChange}
            onClick={event => this.menuClick(event)}
          >
            {this.newRouters.map(item => {
              if (!item.children) {
                return (
                  <Menu.Item key={item.path}>
                    <Icon type={item.menuIco} />
                    <span>{item.menuName}</span>
                  </Menu.Item>
                )
              } else {
                return mapRouters(item)
              }
            })}
          </Menu>
        </div>
        {this.state.isShowMenu && <div className="menu-mask" onClick={() => this.changeShowMenu()} />}
        <div
          className={`right-content ${this.state.collapsed ? 'right-content-all' : ''}`}
        >
          <Header
          { ...this.props }
            toggleCollapsed={this.toggleCollapsed}
            collapsed={this.state.collapsed}
            changeShowMenu={this.changeShowMenu}
            isShowMenu={this.state.isShowMenu}
          />
          {
            <Content { ...this.props } breadcrumb={this.state.breadcrumb}>
              {this.props.children}
            </Content>
          }
          <Footer  />
        </div>
      </div>
    )
  }
}
export default Admin
