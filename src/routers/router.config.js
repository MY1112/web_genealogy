import React from 'react'
import Bundle from './bundle'

const routers = [
  {
    menuName: '主页',
    menuIco: 'home',
    component: 'home/home.tsx', // 主页
    path: '/admin/home' // 主页
  },
  {
    menuName: '用户',
    menuIco: 'user',
    children: [
      {
        menuName: '用户列表',
        component: 'user/index.tsx', // 主页
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
        component: 'Membership/index.tsx',
        path: '/admin/Membership'
      },
      {
        menuName: '成员树',
        component: 'Membership/MemberTree/index.tsx',
        path: '/admin/MemberTree'
      }
    ]
  },
  {
    menuName: '成员地图',
    menuIco: 'user',
    component: 'MemberMap/index.tsx',
    path: '/admin/MemberMap'
  },
  {
    menuName: '关于我',
    menuIco: 'smile-o',
    component: 'about/about.js', // 主页
    path: '/admin/about' // 主页
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
      <Bundle { ...props } load={() => import(`../containers/${component}`)}>
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
