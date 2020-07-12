import axios from 'axios';
// 引入id标识
import { Guid } from './guid';

axios.defaults.baseURL = 'http://120.53.31.103:84';

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
//    let token = localStorage.getItem("L1uEanLogin")
//    var a= JSON.parse(token);

//    if(a.usertoken){
//     config.headers.Authorization = `Bearer ${a.usertoken}`
//    }

   return config;
})

export default axios;

