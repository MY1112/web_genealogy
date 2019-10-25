
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  signup: `/login/signup`,
  userList: '/user/userList',
  userDel: '/user/userDel',
  userUpdate: '/user/userUpdate'
};
// 获取用户列表
const getUserList = (data: object) =>
  Axios.getInstance().post(urlServer.userList, { data });

// 新增用户
const signup = (data: object) =>
  Axios.getInstance().post(urlServer.signup, { data });

// 修改用户
const userUpdate = (data: object) =>
  Axios.getInstance().post(urlServer.userUpdate, { data });

// 删除用户
const userDel = (id:string) => Axios.getInstance().get(urlServer.userDel, { params : { id } })

export default {
  signup,
  getUserList,
  userDel,
  userUpdate
};
