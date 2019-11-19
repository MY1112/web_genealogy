
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  memberAdd: `/member/addMember`,
  memberTreeList: '/member/memberTreeList',
  memberDel: '/member/memberDel',
  memberDetail: '/member/memberDetail',
  memberUpdate: '/member/memberUpdate'
};
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
    memberUpdate
};