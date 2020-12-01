import React, { useEffect, useState, useRef } from "react";
import { ATTRIBUTION, URL, CENTER, ZOOM, token } from "../util/map";
import { TileLayer, MapContainer, Marker, useMap } from "react-leaflet";
import CanvasMarkersLayer from "react-leaflet-canvas-markers";
import "./box.map.css";
import "./main.map.css";
import * as L from "leaflet";

const myRenderer = L.canvas({ padding: 0.02 });

function MapMarkers() {
  const map = useMap();

  useEffect(() => {
    L.circleMarker([29.896136, 121.644553], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.2,
      weight: 1,
      radius: 30,
      renderer: myRenderer,
    })
      .addTo(map)
      .bindPopup("marker");
  }, []);

  return null;
}

function MapWrapper() {
  const [center, setCenter] = useState(CENTER);
  const [zoom, setZoom] = useState(ZOOM);

  // mapref
  const $map = useRef<any>(null);
  const $container = useRef<any>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: any) => {
    let tempY;

    console.log(window.pageYOffset, $container.current.offsetTop);
    const { offsetTop, offsetHeight } = $container.current;
    if (
      window.pageYOffset >= offsetTop &&
      window.pageYOffset <= offsetTop + offsetHeight - window.innerHeight
    ) {
      console.log("slinding");
      tempY = window.pageYOffset;
    } else if (window.pageYOffset <= offsetTop) {
      console.log("top sxcreen");
    } else {
      console.log("stop", window.pageYOffset, $container.current.offsetTop);
    }
    //change images while scroll
    // if(window.pageYOffset < document.getElementById("change1").offsetTop){

    // }
    // if(window.pageYOffset > document.getElementById("change1").offsetTop){

    // }
    // if(window.pageYOffset > document.getElementById("change2").offsetTop){

    // }
  };

  return (
    <div className="container" ref={$container}>
      <MapContainer
        scrollWheelZoom={false}
        id="map"
        center={CENTER}
        zoom={ZOOM}
      >
        <TileLayer attribution={ATTRIBUTION} url={URL} />

        {/* <CanvasMarkersLayer>
          <Marker position={[22.5774626732038, 114.04924392700197]} icon={defaultIcon}>
          </Marker>
        </CanvasMarkersLayer> */}
        <MapMarkers />
      </MapContainer>
      <div className="box-wrapper"></div>
    </div>
  );
}

export default MapWrapper;
