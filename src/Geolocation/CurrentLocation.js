/*global kakao*/
import React, { useEffect } from 'react'

const CurrentLocation = () => {

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    // 지도 생성
    var map = new kakao.maps.Map(container, options);
    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        var locPosition = new kakao.maps.LatLng(lat, lon);
        var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var gugun = result[0].address.region_2depth_name;
            console.log(gugun);
          }
        };
        geocoder.coord2Address(locPosition.getLng(), locPosition.getLat(), callback);

        var message = '<div style="padding:5px;">현재위치</div>';
        
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

  }, [])


  return (

    <div id="map" style={{ width: "100%", height: "800px" }}></div>

  )
}

export default CurrentLocation;