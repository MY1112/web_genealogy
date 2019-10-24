
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  login: `/login/signin`,
};
// const getTestApi = () =>
//   Axios.getInstance().get(urlServer.getTest)

const login = (data: object) =>
  Axios.getInstance().post(urlServer.login, { data });

// const canclePaymentOrder = (id: string) =>
//   Axios.getInstance().put(urlServer.canclePaymentOrder, { params: { id } });

export default {
    login
};