import React, { useEffect } from "react";

const MlGeoLocation = (setCurLocation) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setCurLocation([crd.latitude, crd.longitude]);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return navigator.geolocation.getCurrentPosition(success, error, options);
};

export default MlGeoLocation;
