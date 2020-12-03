import React, { useEffect, useState, useRef } from "react";
import * as L from "leaflet";
import { useMap } from "react-leaflet";
import { ATTRIBUTION, URL, CENTER, ZOOM, token } from "../util/map";

const myRenderer = L.canvas({ padding: 0.02 });

const fillColor = ["#ebd8e4", "#0095c1", "#777"];
const color = ["#ff0080", "#0095c1", "#878787"];
function MapMarkers({ pos }) {
  const map = useMap();

  useEffect(() => {
    pos.forEach((points, index) => {
      const { flag, path } = points;

      try {
        L.polyline(path, {
          color: "#BCC3D1",
          opacity: 0.2,
          weight: 1,
          renderer: myRenderer,
        }).addTo(map);

        path.forEach((point) => {
          L.circleMarker(point, {
            fillColor: fillColor[flag],
            color: color[flag],
            fillOpacity: 0.2,
            weight: 1,
            // radius: 1.5,
            radius: 5,
            renderer: myRenderer,
          }).addTo(map);
        });
      } catch (e) {
        //  console.error(e);
        console.log(points, index);
      }
    });

    // .bindPopup("marker");
  }, [pos, map]);

  return null;
}

export default MapMarkers;
