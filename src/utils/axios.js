import axios from 'axios';

let request = axios.create({
    baseURL: "http://localhost:8080/api",
    headers:{
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
        // 'Access-Control-Allow-Origin': '*',
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export const libraryAPI = {
    getLibrary: async (bookIsbn, libGugun) => {
        return await request.get(`/libraries`, {
            params:{
                bookIsbn: bookIsbn,
                libGugun: libGugun
            }
        }).then(function (response) {
            return response.data;
        }).catch(function (e) {
            console.log("axios.js 에서 잡음");
            console.log(e);
        })
    },

    loginKakao: async(code)=>{
        return await request.get('/kakao/login',{
            params:{
                code: code
            }
        }).then((response)=>{
            return response;
            // console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    },
    
    getTestHello: async () => {
        return await request.get(`/v1/test/hello`, {
            
        }).then(function (response) {
            return response;
        }).catch(function (e) {
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
            
        }).then(function (response) {
            console.log(response);
            return response;
        }).catch(function(e){
            console.log(e);
        })
    },
    checkNickName:async (userNickname)=>{
        return await request.get(`/users/nickname/${userNickname}`,{
            userNickname
        }).then(function (response) {
            console.log(response);
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