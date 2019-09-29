
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  getTest: `/test`,
};
const getTestApi = () =>
  Axios.getInstance().get(urlServer.getTest)

// const getExport = (data: object) =>
//   Axios.getInstance().post(urlServer.export, { data });

// const canclePaymentOrder = (id: string) =>
//   Axios.getInstance().put(urlServer.canclePaymentOrder, { params: { id } });

export default {
    getTestApi
};
