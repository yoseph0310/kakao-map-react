import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { libraryAPI } from '../utils/axios';

const AxiosTest = () => {
  
  const [data, setData] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');
  const [libGugun, setLibGugun] = useState('');
  
  useEffect(() => {
    // var bookIsbn = "8809105879618";
    // var libGugun = "영등포구";
    setBookIsbn("8809105879618");
    setLibGugun("영등포구");

    const fetchData = async () => {
      var response = await libraryAPI.getLibrary(bookIsbn, libGugun);
      // const login = await libraryAPI.login("ho@ho.com","12345");
      // const response = await libraryAPI.userinfo();
      // const checkNickName = await libraryAPI.checkNickName("호호");
      console.log(response);

      for (var i = 0; i < response.length; i++){
        console.log("["+i+"]lat: "+response[i].libLat);
        console.log("["+i+"]long: "+response[i].libLong);
      }
      
      // setData(response);
    };
    fetchData();

  }, []);

  return (
    
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
      <div>
        <span>아이고 사람 살려</span>
        <span>{data}</span>
      </div>
    </div>

  )
}

export default AxiosTest;