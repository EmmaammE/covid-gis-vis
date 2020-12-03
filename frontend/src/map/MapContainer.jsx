import React, { useEffect, useState, useRef } from "react";
import { ATTRIBUTION, URL, CENTER, ZOOM, token } from "../util/map";
import { TileLayer, MapContainer, Marker, useMap } from "react-leaflet";
import CanvasMarkersLayer from "react-leaflet-canvas-markers";
import "./box.map.css";
import "./main.map.css";
import MapMarkers from "./MapMarkers.jsx";

function MapWrapper() {
  const [center, setCenter] = useState(CENTER);
  const [zoom, setZoom] = useState(ZOOM);
  const [points, setPoints] = useState([]);

  // mapref
  const $map = useRef(null);
  const $container = useRef(null);

  useEffect(() => {
    fetch("/getAllData/", { method: "POST" })
      .then((res) => {
        console.log(res);

        return res.json();
      })
      .then((res) => {
        if (res.status === "success") {
          let resArr = [];
          Object.keys(res.data).forEach((key) => {
            let traj = res.data[key];
            traj.forEach((path) => {
              let pointsStrArr = path.split(";");

              let pathArr = [];
              pointsStrArr.forEach((str, i) => {
                if (i === 0) {
                  return;
                }

                let latlng = str
                  .split(",")
                  .map((d) => +d)
                  .reverse();
                latlng.length === 2 && pathArr.push(latlng);
              });

              resArr.push({
                path: pathArr,
                flag: +pointsStrArr[0],
              });
            });
          });

          console.log(resArr);
          setPoints(resArr);
        }
      });
  }, []);

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e) => {
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
        id="map"
        center={CENTER}
        zoom={ZOOM}
        scrollWheelZoom={false}
      >
        <TileLayer attribution={ATTRIBUTION} url={URL} />

        {/* <CanvasMarkersLayer>
          <Marker position={[22.5774626732038, 114.04924392700197]} icon={defaultIcon}>
          </Marker>
        </CanvasMarkersLayer> */}
        <MapMarkers pos={points} />
      </MapContainer>
      <div className="box-wrapper"></div>
    </div>
  );
}

export default MapWrapper;
