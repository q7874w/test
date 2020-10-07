import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.request.use( configs => {
  try {
    let data = JSON.parse(localStorage.getItem('user'));
    if(data.authorization) {
      //配置每次请求时的头信息
      configs.headers.common.authorization = data.authorization;
    }
  }catch(e) {

  }
  return configs;
})
axios.interceptors.response.use( response => {
  return response;
}, error => {
  console.log(error.response.data)
  alert(error.response.data.message + ':' + error.response.data.errorDetails);
  throw error
})

//注册
export const register = data => {
  return axios({
    method: 'post',
    url: '/user/register',
    data
  })
}

export const login = data => {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}