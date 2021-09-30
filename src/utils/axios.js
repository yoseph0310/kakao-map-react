import axios from 'axios';

let request = axios.create({
    baseURL: "http://localhost:8080/api",
    headers:{
      'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      // 'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob0Boby5jb20iLCJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2MzI5Mjk2NTIsImlhdCI6MTYzMjkyNzg1Mn0.62g3QLvIDvXUUz-_SQAtQ5u2IUYDgAUhXxZDuXMhRvQW0wsD7ixfu1omgvlseCWC85YvlCcMQeRyneWBzdEF1A`
    }
});

export const libraryAPI = {
  getLibrary: async (bookIsbn, libGugun) => {
    return await request.get(`/library`, {
      bookIsbn, libGugun
    }).then(function (response) {
      console.log(response.data);
      return response;
    }).catch(function (e) {
      console.log("axios.js 에서 잡음");
      console.log(e);
    })
  },

  login: async (userEmail, userPassword)=>{
      return await request.post(`/auth/login`,{
          userEmail, userPassword
      }).then(function(response) {
          // accessToken은 header에 refreshToken은 sessionStorage에 넣어주기
          window.sessionStorage.setItem('token', response.data.accessToken);
          window.sessionStorage.setItem('refreshToken', response.data.refreshToken);
          return response;
      })
  },
  userinfo:async ()=>{
      return await request.get(`/users/me`,{
          
      }).then(function(response){
          return response;
      }).catch(function(e){
          console.log(e);
      })
  },
  checkNickName:async (userNickname)=>{
      return await request.get(`/users/nickname/${userNickname}`,{
          userNickname
      }).then(function(response){
          return response;
      })
  },
  join:async (userEmail, userPassword, userName, userNickname) => {
      return await request.post(`/users`, {
          userEmail, userPassword, userName, userNickname
      }).then(function(response){
          return response;
      })
  },
  checkEmail:async (userEmail)=>{
      return await request.get(`users/email/${userEmail}`,{
          userEmail
      }).then(function(response){
          return response;
      })
  }
}