
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  memberAdd: `/member/addMember`,
  memberTreeList: '/member/memberTreeList',
//   userDel: '/user/userDel',
//   userUpdate: '/user/userUpdate'
};
// 获取用户列表
const memberTreeList = () =>
  Axios.getInstance().get(urlServer.memberTreeList, { });

// 新增成员
const memberAdd = (data: object) =>
  Axios.getInstance().post(urlServer.memberAdd, { data });

// // 修改用户
// const userUpdate = (data: object) =>
//   Axios.getInstance().post(urlServer.userUpdate, { data });

// // 删除用户
// const userDel = (id:string) => Axios.getInstance().get(urlServer.userDel, { params : { id } })

export default {
    memberAdd,
    memberTreeList
};