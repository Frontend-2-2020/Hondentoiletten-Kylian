import '../styles/index.scss';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Axios from 'axios';




var map = L.map("map", {
    center: [51.192949, 3.217897],
    zoom: 15
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?").addTo(map);

var myIcon = L.icon({
    iconUrl: 'public/marker.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [-3, -76]
});

// L.marker([51.035, 3.217897],{icon: myIcon}).addTo(map);

var hondenWc = [];
function getData() {
    Axios.get("https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson")
    .then(function(response){
        hondenWc = response.data.coordinates;
        
        showLocation();
        console.log(response);
    });
}

function showLocation (){
for (var i = 0; i < hondenWc.length; i++) {
    const data = hondenWc[i];
 
    L.marker([data[1], data[0]], {icon: myIcon}).addTo(map);
}
}

getData();