import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function Test() {
  const initialMarker = [
    {
      label: "여의도역 ", //
      index: "0",
      coor: [37.524563, 126.90541],
      record: 100,
      time: 20,
    },
    {
      label: "당산역 ", //
      index: "1",
      coor: [37.544563, 126.92541],
      record: 101230,
      time: 21230,
    },
  ];
  // Object.keys(initialMarker).map((e, b) => console.log(b));
  var a = initialMarker.map(({ record }) => record);
  var asd = Math.max(...a);
  var asd = Math.min(...a);
  console.log(asd);

  return;
}

export default Test;
