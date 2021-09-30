/*global kakao*/
import React, { useEffect } from 'react';

const LibraryLocation = () => {

  useEffect(() => {
    var mapContainer = document.getElementById('map');
    var mapOptions = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 1
    };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOptions);

    // 주소 - 좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker();
    var infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    var coord = new kakao.maps.LatLng(37.56496830314491, 126.93990862062978);
    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(result[0].address.region_2depth_name);
        }
    };
    
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    
    
    // searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
              console.log(result[0].address.region_2depth_name);
              var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
              detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
              
              var content = '<div class="bAddr">' +
                              '<span class="title">법정동 주소정보</span>' + 
                              detailAddr + 
                          '</div>';
  
              // 마커를 클릭한 위치에 표시합니다 
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
  
              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);
          }   
      });
  });

    // 좌표로 행정동 주소 정보를 요청합니다.
    // function searchAddrFromCoords(coords, callback) {
    //   geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    // }

    // 좌표로 법정동 상세 주소 정보를 요청합니다.
    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수
    // function displayCenterInfo(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     var infoDiv = document.getElementById('centerAddr');

    //     for (var i = 0; i < result.length; i++) {
    //       if (result[i].region_type === 'H') {
    //         infoDiv.innerHTML = result[i].address_name;
    //         break;
    //       }
    //     }

    //   }
    // }

  })

  return (
    <div id="map" style={{ width: "100%", height:"500px"}}></div>
  )
}

export default LibraryLocation