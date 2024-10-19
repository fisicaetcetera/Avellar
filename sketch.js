///Dropbox/local-server/ZHONG_GUÓ/zhong_guo_master
var imageUrl;
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

  map.setView([-6,-35],5);
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
//Water mark, beit
  L.Control.Watermark=L.Control.extend({
   onAdd: function(map){
      var img = L.DomUtil.create('img');
      img.src = 'avelar_logo.png';
      img.style.width = '100px';
      return img;
      },
    onRemove: function(map){},
    });
    
    L.control.watermark = function(opts){
      return new L.Control.Watermark(opts);
    }
    
    L.control.watermark({position: 'topleft'}).addTo(map);  

  // TRAJETO DE IDA EM AZUL  ---------------------------------------------------
  
var latlngsIda = [
    [-5.759290, -35.368370], //Natal
    [-23.454, -46.534096], // Sao Paulo
    [25.276987, 55.296249], //Dubai
    [1.359167, 103.989441], //Singapore
    [40.072498,116.597504],  // Beijing
    [34.274342, 108.889191],  //  Xian
    [31.22222, 121.45806],  // Shanghai
    [37.5657, 126.978], //Seul
    [35.6895, 139.69171] //Tokyo
];
var polylineIda = L.polyline(latlngsIda, {color: 'blue'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(polylineIda.getBounds());
//===============================================================  
  
    // TRAJETO DE VOLTA EM AMARELO  ---------------------------------------------------
   
  var latlngsVolta = [
        [35.6895, 139.69171], //Tokyo.set
        [25.252777, 55.364445], //Dubai airport
        [-23.454, -46.534096], // Sao Paulo
        [-5.759290, -35.368370] //Natal
    ];
  
  var polylineVolta = L.polyline(latlngsVolta, {color: 'green'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(polylineVolta.getBounds()); 
  
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
               L.marker(latlonuser).addTo(map).bindPopup("Você!<br>Latitude: " +latuser+"<br> Longitude: "+ lonuser).openPopup();
              L.circle(latlonuser, accuracy).addTo(map);
              map.setView(latlonuser, 2); // ([latuser, lonuser], zoom)
            });
             } else {  
              localizacao = false;
             } 
  console.log("115-just outside anonymous",latuser,lonuser,latlonuser);

  
  
  //=============================================================

  L.marker(latlngsIda[0]).addTo(map)
    .bindPopup('SÃO GONÇALO <BR> dia 10/9 ,<br> Retorno: dia 30 ')
    .openPopup();
    
  L.marker(latlngsIda[1]).addTo(map)
    .bindPopup('SÃO PAULO <BR> dia 11/9 ,<br> Retorno: dia 30 ')
    .openPopup();
    
   //BURJ KHALIFA 
  ///L.marker([]).addTo(map)
   /// .bindPopup('Burj Khalifa, dia 12')
   // .openPopup();
   var imageUrl = './burj_Khalifa.jpg',
    imageBounds = [[25.197197, 55.272594], [29,59]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
     
  // DUBAI
  L.marker(latlngsIda[2]).addTo(map)
    .bindPopup('DUBAI <BR> dias 11 a 13 ')
    .openPopup();
 
  L.marker(latlngsIda[3]).addTo(map)
    .bindPopup('CINGAPURA<BR> dias 14 A 16')
    .openPopup(); 
   //Sri Marianman
      var imageUrl = './sri_Marianman.jpg',
    imageBounds = [ [1.359167, 103.989441], [5,109]];
L.imageOverlay(imageUrl, imageBounds).addTo(map); 

  L.marker(latlngsIda[4]).addTo(map)
    .bindPopup('PEQUIM <BR> dias 16 A 19')
    .openPopup();
   //Beijing Summer Palace
      var imageUrl = './Summer-Palace-Beijing-728x410.jpg',
    imageBounds = [ [40.072498,116.597504], [43,121]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);     

  //XIAN

  L.marker(latlngsIda[5]).addTo(map)
    .bindPopup('XIAN<BR> dias 19 A 21')
    .openPopup();

  // SHANGHAI

  L.marker(latlngsIda[6]).addTo(map)
    .bindPopup('SHANGHAI : dias 21 a 23')
    .openPopup();
    
  // SEUL

  L.marker(latlngsIda[7]).addTo(map)
    .bindPopup('SEUL : dias 23 a 26')
    .openPopup();

  // TOKYO

  L.marker(latlngsIda[8]).addTo(map)
    .bindPopup('TOKYO : dias 26 a 30')
    .openPopup();
  
} //setup

//falta: ver porque alguns icones desaparecem : xian, etc.
//Colocar natal e são gonçalo na linha de ida e volta.
