import useMap from "@/app/core/map/hooks/use-map";
import getCurrentLocation from "@/app/core/map/libs/get-current-location";
import type { Coordinates } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const CURRENT_LOCATION_KEY = "/current-location";

//현재 위치 관리하는 함수
const useCurrentLocation = () => {
  const { data: currentLocation } = useSWR<Coordinates>(CURRENT_LOCATION_KEY);
  const { map } = useMap();

  //현재 위치 설정
  const setCurrentLocation = useCallback(() => {
    if (!map) return;

    getCurrentLocation()
      .then(([latitude, longitude]) => {
        //현재 위치로 이동하는 버튼 만들기

        console.log("setCurrentLocation");
        map.panTo(new window.naver.maps.LatLng(latitude, longitude));

        mutate(CURRENT_LOCATION_KEY, [latitude, longitude]);
      })
      .catch((error) =>
        console.error("Error getting current location:", error)
      );
  }, []);

  // 현재 위치와 다른 위치 사이의 거리를 계산하는 함수
  const calculateDistance = useCallback(
    (targetCoords: Coordinates): number | undefined => {
      if (!map || !currentLocation) return undefined;

      const proj = map.getProjection();
      const currentLatLng = new window.naver.maps.LatLng(
        currentLocation[0],
        currentLocation[1]
      );
      const targetLatLng = new window.naver.maps.LatLng(
        targetCoords[0],
        targetCoords[1]
      );

      const distance = proj.getDistance(currentLatLng, targetLatLng);
      console.log(`현재 위치와 목표 지점 사이의 거리: ${distance} 미터`);

      return distance;
    },
    [currentLocation, map]
  );

  //현재 위치 초기화
  const clearCurrentLocation = useCallback(() => {
    console.log("clearCurrentLocation");
    mutate(CURRENT_LOCATION_KEY, null);
  }, []);

  return {
    currentLocation,
    setCurrentLocation,
    calculateDistance,
    clearCurrentLocation
  };
};
export default useCurrentLocation;
