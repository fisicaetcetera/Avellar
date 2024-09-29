//Dropbox/local-server/Ellada/Greece-master
var imageUrl;
var Places = [
    [-5.759290, -35.368370], //Natal-0
    [-23.454, -46.534096], // Sao Paulo-01
    [51.509865, -0.118092], //london-02
    [55.953251, -3.188267], // Edinburgh-03
    [57.477772, -4.224721],  // Inverness-04
    [57.337399, -5.652608],  //  Plockton-05
    [57.424595, -6.321627],  //Skye-06
    [51.481583, -3.179090], //Cardiff
    [48.864716, 2.349014],  //Paris
    [30.033333, 31.233334],  //Cairo
    [31.24557290, 29.99930860], //Alexandria
    [25.687243, 32.639637], // Luxor 
    [24.978548, 32.875820], // Edfu
    [22.336823, 31.625532] // Abu Simbel
    ];
var city = [
   'Natal',
   'São Paulo',
   'London',
   'Edinburgh',
   'Inverness',
   'Plockton',
   'Skye',
   'Cardiff',
   'Paris',
   'Cairo',
   'Alexandria',
   'Luxor',
   'Edfu',
   'Abu Simbel'
   ];
var latuser;
var lonuser;
var lattxt;
var lontxt;
var latlonuser;
var accuracy;


var icone = L.icon({
  iconUrl: './marker-icon.png',
  shadowUrl: './marker-shadow.png',
  iconSize: [18, 95], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [9, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 94], // the same for the shadow
  popupAnchor: [0, -79] // point from which the popup should open relative to the iconAnchor
})

function setup() {

  noCanvas();

  //=====localização
  
  var map = L.map('mapid');
  
  map.locate({
    setView: true,
    maxZoom: 12
  });

  map.setView([-6,-35],2);
  //map.on('locationfound', onLocationFound);


  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  //Escala
  L.control.scale({
     metric: true,
     imperial: false,
     position: 'topleft'
  }).addTo(map);
  //Watermark, meu
  L.Control.Watermark=L.Control.extend({
   onAdd: function(map){
      var img = L.DomUtil.create('img');
      img.src = 'eniLogo.ico';
      img.style.width = '30px';
      return img;
      },
    onRemove: function(map){},
    });
    
    L.control.watermark = function(opts){
      return new L.Control.Watermark(opts);
    }
    
    L.control.watermark({position: 'topleft'}).addTo(map);  

  
  var polylineSkye = L.polyline(Places, {color: 'white'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(polylineSkye.getBounds()); 
  
  let localizacao = false;
  if("geolocation" in navigator)
        {
          localizacao = true;  
          console.log('geolocation available 🤗️');
            navigator.geolocation.getCurrentPosition(position => {
              const posicao = position.coords;
              console.log(posicao);
              latuser = posicao.latitude;
              lonuser = posicao.longitude;
              lattxt = latuser.toString();
              lontxt = lonuser.toString();
              latlonuser = [latuser, lonuser];
              console.log(latuser,lonuser,latlonuser);
              //const altitude = posicao.altitude.toString();
              //const speed = posicao.speed.toString();
              //const heading = posicao.heading.toString();
              accuracy = posicao.accuracy;
               //L.marker(latlonuser).addTo(map).bindPopup("Você!<br>Latitude: " +latuser+"<br> Longitude: "+ lonuser + '<br>Versão 02120909').openPopup();
             // L.circle(latlonuser, accuracy).addTo(map);
            });
             } else {  
              localizacao = false;
             } 
  console.log("115-just outside anonymous");
  
  //Todas cidades
  let length = city.length;
  console.log(length);
  for(let i = 0; i < length; i++){
    console.log(i, Places[i], city[i]);
    L.marker(Places[i]).addTo(map)
    .bindPopup(city[i])
    .openPopup();
  }  
  let i=3;
  L.marker(Places[i]).addTo(map)
    .bindPopup(city[i])
    .openPopup();
  
} //setup
