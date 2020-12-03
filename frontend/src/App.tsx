import React from "react";
import "./App.css";
import MapWrapper from "./map/MapContainer.jsx";

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>疫情报告</h1>
      </div>

      <div className="content map-wrapper">
        <MapWrapper />
      </div>
    </div>
  );
}

export default App;
