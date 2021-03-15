import React from 'react'
import Bundle from './bundle'

const routers = [
  {
    menuName: '主页',
    menuIco: 'home',
    component: import('../containers/home/home.tsx'), // 主页
    path: '/admin/home' // 主页
  },
  {
    menuName: '用户',
    menuIco: 'user',
    children: [
      {
        menuName: '用户列表',
        component: import('../containers/user/index.tsx'), // 主页
        path: '/admin/user/list' // 主页
      }
    ]
  },
  {
    menuName: '成员',
    menuIco: 'team',
    children: [
      {
        menuName: '成员录入',
        component: import('../containers/Membership/index.tsx'),
        path: '/admin/Membership'
      },
      {
        menuName: '成员树',
        component: import('../containers/Membership/MemberTree/index.tsx'),
        path: '/admin/MemberTree'
      }
    ]
  },
  {
    menuName: '家族手册',
    menuIco: 'book',
    component: import('../containers/MemberStatistic/index.tsx'),
    path: '/admin/MemberStatistic'
  },
  // {
  //   menuName: '家族中心',
  //   menuIco: 'solution',
  //   component: 'FamilyCenter/index.tsx',
  //   path: '/admin/FamilyCenter'
  // },
  {
    menuName: '成员地图',
    menuIco: 'environment',
    component: import('../containers/MemberMap/index.tsx'),
    path: '/admin/MemberMap'
  },
  {
    menuName: '关于我',
    menuIco: 'smile-o',
    component: import('../containers/about/about.js'),
    path: '/admin/about'
  }
]

// const userInfo = JSON.parse(localStorage.getItem('userInfo'))

// 递归路由
const mapRouters = item => {
  if (item.children && item.children.length) {
    // 存在子集
    item.children = item.children.map(child => mapRouters(child))
  } else {
    // 不存在子集
    let component = item.component
    item.props = {}
    item.component = function(props){
      return (
      <Bundle { ...props } load={() => component}>
        {Comp => {
          return Comp ? <Comp {...props} { ...item.props } /> : <div>加载中...</div>
        }}
      </Bundle>
      )
    }
  }
  return item
}

// const routers = routersArr.filter(item => {
//   if (['admin','god'].includes(userInfo.identity)) {
//     return true
//   } else {
//     if (item.menuName !== '用户') {
//       return true
//     }
//     return false
//   }
// })
const initRouters = routers.map(item => {
  return mapRouters(item)
})
export { initRouters, routers }
