
import Axios, { IApiData } from 'util/Axios';
export interface IResApiData extends IApiData {}
const urlServer = {
  memberAdd: `/member/addMember`,
  memberTreeList: '/member/memberTreeList',
  memberDel: '/member/memberDel',
  memberDetail: '/member/memberDetail',
  memberUpdate: '/member/memberUpdate',
  memberTree: '/member/memberTree',
  memberStatistic: '/member/memberStatistic'
};
// 获取成员统计
const memberStatistic = (userId: string) =>
  Axios.getInstance().get(urlServer.memberStatistic, { params: { userId }})

// 获取成员树
const memberTree = (userId: string) =>
  Axios.getInstance().get(urlServer.memberTree, { params: { userId }})

// 获取成员列表树
const memberTreeList = (userId: string) =>
  Axios.getInstance().get(urlServer.memberTreeList, { params: { userId } });

// 新增成员
const memberAdd = (data: object) =>
  Axios.getInstance().post(urlServer.memberAdd, { data });

// 修改用户
const memberUpdate = (data: object) =>
  Axios.getInstance().post(urlServer.memberUpdate, { data });

// 删除成员
const memberDel = (id:string) => Axios.getInstance().get(urlServer.memberDel, { params: { id }})

// 获取成员详情
const memberDetail = (id: string) => Axios.getInstance().get(urlServer.memberDetail, { params: { id }})

export default {
  memberAdd,
  memberTreeList,
  memberDel,
  memberDetail,
  memberUpdate,
  memberTree,
  memberStatistic
};