import axios from 'axios';
// 引入id标识
import { Guid } from './guid';

axios.defaults.baseURL = 'https://www.365msmk.com';

// 获取设备id
let DeviceID = localStorage.DeviceID;
if (!DeviceID) {
    DeviceID = Guid.NewGuid().ToString('D');
    localStorage.DeviceID = DeviceID;
}

let ID = DeviceID;
console.log(ID)

// 请求拦截
axios.interceptors.request.use(config => {
    // 添加请求头
   config.headers={
       DeviceID:ID,
       DeviceType:"H5"
   }
   let token = localStorage.getItem("token")
//    console.log(token)
   if(token){
        if(token){
         config.headers.Authorization = `Bearer ${token}`
        }
   }
//    console.log(config.headers.Authorization)
  

   return config;
})

export default axios;

