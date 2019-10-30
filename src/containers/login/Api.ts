
import Axios, { IApiData } from 'util/Axios';
export interface IMODApiData extends IApiData {}
const urlServer = {
  login: `/login/signin`,
};
const login = (data: object) =>
  Axios.getInstance().post(urlServer.login, { data });

export default {
    login
};