import { LatLngTuple } from "leaflet";

const style: string = "mapbox/light-v10";
const token: string =
  "pk.eyJ1IjoienJjY2NyeiIsImEiOiJjank2bjgzMzcwZmJqM2RsYjBtbjh2Z3F6In0.Bi-7OaOTBaJ43pJM-hAT-g";

const URL: string = `https://api.mapbox.com/styles/v1/${style}/tiles/{z}/{x}/{y}?access_token=${token}`;
const ATTRIBUTION: string =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

// the center point of map
const CENTER: LatLngTuple = [29.896136, 121.644553];
// the zoom level
const ZOOM: number = 7;

export { URL, ATTRIBUTION, CENTER, ZOOM, token };
