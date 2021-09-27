/*global kakao*/ 
import React, { useEffect } from 'react'



const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        var locPosition = new kakao.maps.LatLng(lat, lon);
        var message = '<div style="padding:5px;">썸바리헲미!</div>';

        displayMarker(locPosition, message);
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
    // var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition
    // });
    // marker.setMap(map);

  }, [])


  return (
      
    <div id="map" style={{width:"100%", height:"500px"}}></div>
      
  )
}

export default Location;