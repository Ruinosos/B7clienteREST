import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import defaultMarker from "../../assets/imgs/map-marker.svg"
import busStopMarker from '../../assets/imgs/bus-marker.svg';

const iconDefault = new L.Icon({
    iconUrl: defaultMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const iconBusStop = new L.Icon({
    iconUrl: busStopMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export { iconDefault, iconBusStop };