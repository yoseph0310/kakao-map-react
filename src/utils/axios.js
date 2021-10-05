import axios from 'axios';

let request = axios.create({
    baseURL: "https://j5a502.p.ssafy.io/api",       // 서버 URL로 바꿔야함
    headers:{
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`,
    }
});

export const libraryAPI = {
    // Library Axios
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
    
}