import React, { useEffect, useState, useRef, useCallback } from "react";
import * as L from "leaflet";
import { useMap } from "react-leaflet";
import statesData from "../assets/china.json";
import * as d3 from "d3";

const colorScaleThreshold = d3
  .scaleThreshold()
  // .domain([100, 1000, 10000, 100000])
  // .range(["#fee391", "#fec44f", "#fe9929", "#d95f0e", "#993404"])
  .domain([0, 10, 50, 100, 200, 500, 1000, 5000, 10000, 100000])
  .range([
    "#fff",
    "#FFEDA0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#E31A1C",
    "#BD0026",
    "#800026",
  ]); // color brewer yl-or-brwn

function MapGeojson() {
  const map = useMap();
  const [data, setData] = useState(null);

  const style = useCallback(
    (feature) => {
      return {
        fillColor: colorScaleThreshold(data[feature.properties.name]),
        weight: 1,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },
    [data]
  );

  useEffect(() => {
    fetch("/getNumber/", { method: "POST" })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        if (res.status === "success") {
          setData(res.data);
        }
      });
  });

  useEffect(() => {
    if (data) {
      L.geoJson(statesData, { style: style }).addTo(map);
    }
  }, [map, style, data]);

  return null;
}

export default MapGeojson;
