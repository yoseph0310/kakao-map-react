/*global kakao*/
import React, { useEffect, useState } from 'react'
import { libraryAPI } from '../utils/axios'

const CurrentLocation = () => {

  const [bookIsbn, setBookIsbn] = useState('');
  const [libGugun, setLibGugun] = useState('');

  const container = document.getElementById('map');
  const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

  useEffect(() => {

    async function getLibraryList(){
      try{
          await libraryAPI.getLibrary(bookIsbn, libGugun);
      }catch(e){
        console.log("clt에서 잡음");
        console.log(e);
      }
    }
    
    setBookIsbn("8809105879618");
    // 지도 생성
    var map = new kakao.maps.Map(container, options);
    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var locPosition = new kakao.maps.LatLng(lat, lon);
        
        searchDetailAddrFromCoords(locPosition, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // var bookIsbn = "8809105879618";
            // var libGugun = result[0].address.region_2depth_name;
            
            
            setLibGugun(result[0].address.region_2depth_name);
            var message = '<div style="padding:5px;">'+libGugun+'</div>';
            
            console.log(bookIsbn, libGugun);
            displayMarker(locPosition, message);
            getLibraryList();
          }
        });

      })
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }
    
    function displayMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      var iwContent = message;
      var iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removalble: iwRemoveable
      });

      infowindow.open(map, marker);
      map.setCenter(locPosition);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

  }, [bookIsbn, libGugun])


  return (

    <div id="map" style={{ width: "100%", height: "800px" }}></div>

  )
}

export default CurrentLocation;