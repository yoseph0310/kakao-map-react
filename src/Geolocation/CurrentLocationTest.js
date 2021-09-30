/*global kakao*/
import React, { useEffect, useState } from 'react'
import { libraryAPI } from '../utils/axios'

const CurrentLocation = () => {
  const [bookIsbn, setBookIsbn] = useState("");
  const [libGugun, setLibGugun] = useState("");

  useEffect(() => {

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7
    };
    
    setBookIsbn("8809105879618");
    // 지도 생성
    var map = new kakao.maps.Map(container, options);
    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();
    // 도서관 좌표 이미지
    var imageLibraryMarker = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var locPosition = new kakao.maps.LatLng(lat, lon);

        searchDetailAddrFromCoords(locPosition, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // var bookIsbn = "8809105879618";
            setLibGugun(result[0].address.region_2depth_name);

            var message = '<div style="padding:5px;">' + libGugun + '</div>';

            displayMarker(locPosition, message);
          }
        });

      })
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }
    console.log(bookIsbn);
    console.log(libGugun);

    const fetchData = async () => {
      var response = await libraryAPI.getLibrary(bookIsbn, libGugun);
      console.log(response);

      for (var i = 0; i < response.length; i++){
        var libraryLat = response[i].libLat;
        var libraryLong = response[i].libLong;
        var libraryName = response[i].libName;
        var libraryPosition = new kakao.maps.LatLng(libraryLat, libraryLong);

        console.log("["+i+"]Name: "+libraryName + " lat: "+libraryLat + " long: " + libraryLong);

        displaylibMarker(libraryPosition, libraryName);
      }
      // setData(response);
    };
    fetchData();

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

    function displaylibMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message;
      var iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removalble: iwRemoveable
      });

      infowindow.open(map, marker);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, [libGugun])


  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
      <div>
        <span>아이고 사람 살려</span>
      </div>
    </div>

  )
}

export default CurrentLocation;