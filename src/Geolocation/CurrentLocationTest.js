/*global kakao*/
import React, { useEffect, useState } from 'react'
import { libraryAPI } from '../utils/axios'
import '../Geolocation/CLT.css';

const CurrentLocation = () => {
  const [bookIsbn, setBookIsbn] = useState("");
  const [libGugun, setLibGugun] = useState("");

  useEffect(() => {

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7
    };
    // bookIsbn : 도서 ISBN 
    setBookIsbn("8809105879618");
    // 지도 생성
    var map = new kakao.maps.Map(container, options);
    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();
    // 도서관 좌표 이미지 - 현재 코드로는 적용 불가 테스트용 이미지 Map Marker
    var imageLibraryMarker = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // Geolocation - Https 환경에서 위치 허용 필요
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;     // 위도
        var lon = position.coords.longitude;    // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon);      // 위, 경도로 생성한 위치 정보

        // 위, 경도 정보로 주소 변환 함수
        searchDetailAddrFromCoords(locPosition, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // libGugun : 도서관 구 - (현재 위치의 구 이름 )
            setLibGugun(result[0].address.region_2depth_name);

            // MapMarker의 메세지를 나타내는 부분
            var message = libGugun;
            // var message = '<div style="padding:5px; border-radius: 30px;">' + libGugun + '</div>';

            // 현재 위치, message를 들고 Map에 Marker를 띄우는 부분.
            displayMarker(locPosition, message);
          }
        });

      })
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      var message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message);
    }
    // 제대로 찍히면 지워도 됨.
    console.log(bookIsbn);
    console.log(libGugun);

    // 현재 위치 기반으로 bookIsbn에 해당하는 책을 소장하고 있는 도서관 리스트 호출 API
    const fetchData = async () => {
      var response = await libraryAPI.getLibrary(bookIsbn, libGugun);
      console.log(response);

      for (var i = 0; i < response.length; i++){
        var libraryLat = response[i].libLat;
        var libraryLong = response[i].libLong;
        var libraryName = '<span class="info-title">' + response[i].libName + '</span>';
        var libraryUrl = response[i].libUrl;
        var content = '<div class="customoverlay">' +
                      '  <a href="'+libraryUrl+'" target="_blank">' +
                      '    <span class="title">'+libraryName+'</span>' +
                      '  </a>' +
                      '</div>';
        var libraryPosition = new kakao.maps.LatLng(libraryLat, libraryLong);

        console.log("["+i+"]Name: "+libraryName + " lat: "+libraryLat + " long: " + libraryLong);

        displaylibMarker(libraryPosition, content);
      }
      // setData(response);
    };
    fetchData();

    // MapMarker 찍는 함수
    function displayMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      // var iwContent = message;
      // var iwRemoveable = true;

      // var infowindow = new kakao.maps.InfoWindow({
      //   content: iwContent,
      //   removalble: iwRemoveable
      // });

      // infowindow.open(map, marker);
      map.setCenter(locPosition);
    }

    // 도서관 MapMarker 찍는 함수
    function displaylibMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      // var iwContent = message;
      // var iwRemoveable = true;

      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: locPosition,
        content: message,
        yAnchor: 1 
      });
      // var infowindow = new kakao.maps.InfoWindow({
      //   content: iwContent,
      //   removalble: iwRemoveable
      // });

      // infowindow.open(map, marker);

      // var infoTitle = document.querySelectorAll('.info-title');
      // infoTitle.forEach(function(e) {
      //     var w = e.offsetWidth + 10;
      //     var ml = w/2;
      //     e.parentElement.style.top = "82px";
      //     e.parentElement.style.left = "50%";
      //     e.parentElement.style.marginLeft = -ml+"px";
      //     e.parentElement.style.width = w+"px";
      //     e.parentElement.previousSibling.style.display = "none";
      //     e.parentElement.parentElement.style.border = "0px";
      //     e.parentElement.parentElement.style.background = "unset";
      // });
    }

    // 현재 위치의 좌표로 주소를 반환하는 함수
    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, [libGugun])  // 현재 위치에 따라서 요청해오는 위치가 바뀌므로 libGugun으로 react hook 설정


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