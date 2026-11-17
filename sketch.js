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
  iconSize: [6, 30], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [9, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 94], // the same for the shadow
  popupAnchor: [0, -79] // point from which the popup should open relative to the iconAnchor
})
var hanoi = L.icon({
  iconUrl: 'hanoi-regina-mercia.jpeg',
  iconSize: [150, 190], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [0,190], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
})
var hotelTryp = L.icon({
  iconUrl: 'TRYP_DUBAI.jpg',
  iconSize: [36,50], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [18,50], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
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
    [25.2594, 51.5655], // Doha
    [21.0245, 105.84117], //Hanoi
    [16.0678, 108.2208], //Da Nang
    [10.82302, 106.62965],  // Ho Chi Minh 
    [13.36179, 103.86056],  // Siem Reap
    [13.7563, 100.5018],  // Bangkok
    [18.79038, 98.98468], // Chiang Mai
    [3.140853, 101.693207], // Kuala Lumpur
    [25.2594, 51.5655] // Doha
];
var polylineIda = L.polyline(latlngsIda, {color: 'blue'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(polylineIda.getBounds());
//===============================================================  
  
    // TRAJETO DE VOLTA EM AMARELO  ---------------------------------------------------
   
  var latlngsVolta = [
        [25.2855, 51.5310], // Doha
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
               L.marker(latlonuser).addTo(map).bindPopup("Você está Aqui!<br>Latitude: " +latuser+"<br> Longitude: "+ lonuser).openPopup();
              L.circle(latlonuser, accuracy).addTo(map);
              map.setView(latlonuser, 4); // ([latuser, lonuser], zoom)
            });
             } else {  
              localizacao = false;
             } 
  console.log("115-just outside anonymous",latuser,lonuser,latlonuser);

  
  
  //=============================================================

  L.marker(latlngsIda[0]).addTo(map)
    .bindPopup('SÃO GONÇALO <BR> dia 09/nov <br> LATAM  <br> Retorno: dia 01/dez')
    .openPopup();
    
  L.marker(latlngsIda[1]).addTo(map)
    .bindPopup('SÃO PAULO <BR> dia 09/nov 20:25 <BR> IDA PARA DOHA: dia 10/09 01:00, QATAR 780,<br> VOLTA: dia ...')
    .openPopup();
    
 //DOHA
  L.marker(latlngsIda[2]).addTo(map)
    .bindPopup('Doha: en passant, 20h25min')
    .openPopup();
    
// HANOI - só o pino, sem foto no ícone
L.marker(latlngsIda[3]).addTo(map)
  .bindPopup(
    '<b>HANOI</b><br>' +
    'dia 11/11 6:55 Imigração<br>' +
    '<img src="hanoi-regina-mercia.jpeg" width="150" style="margin-top:5px">'
  );
  
  
  // DA NANG
 L.marker(latlngsIda[4]).addTo(map)
  .bindPopup(
    '<b>DA NANG/HO IAN</b><br>' +
    'Dia 16/11) <br>' +
    '<img src="hoIan-regina.jpeg" width="150">'
  );
   
   // HO CHI MINH
L.marker(latlngsIda[5]).addTo(map)
  .bindPopup(
    '<b>HO CHI MINH (SAIGON)</b><br>' +
    'Dia 16/11) <br>' +
    '<img src="Notre_dame_saigon_wikipedia.jpg" width="150">'
  );
   
// L.marker([25.0813, 55.1738], {icon: hotelTryp}).addTo(map)
//   .bindPopup('Hotel Tryp')
 //  .addTo(map);   
    
 //Siem Reap
  L.marker(latlngsIda[6]).addTo(map)
    .bindPopup('Siem Reap<BR> 19/11 ')
    .openPopup(); 
   //Sri Marianman
      //var imageUrl = './sri_Marianman.jpg',
    //imageBounds = [ [1.359167, 103.989441], [5,109]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map); 

//Ban Kok
  L.marker(latlngsIda[7]).addTo(map)
    .bindPopup('Ban kok <BR> 22/1')
    .openPopup();
   //Beijing Summer Palace
     // var imageUrl = './Summer-Palace-Beijing-728x410.jpg',
   // imageBounds = [ [40.072498,116.597504], [43,121]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map);     

  //Chiang Mai
  L.marker(latlngsIda[8]).addTo(map)
    .bindPopup('Chiang Mai<BR> 25/11')
    .openPopup();
      //Xian Terra cota warriors
      //var imageUrl = './guerreiros_de_terra_cota.png',
   // imageBounds = [ [34.274342, 108.889191], [35.5,113]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map);     


  // Kuala Lumpur

  L.marker(latlngsIda[9]).addTo(map)
    .bindPopup('Kuala Lampur : 29/11')
    .openPopup();
     //shanghai_jardim_Yu
     // var imageUrl = './shanghai_jardim_Yu_540 × 312.jpg',
    //imageBounds = [ [31.22222, 121.45806], [33.5,125.5]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map); 
    
  // Doha

  L.marker(latlngsIda[10]).addTo(map)
    .bindPopup('Doha: 30/11, dia 01/12 volta ao Brasil')
    .openPopup();
    
//  map.on('click', function(ev) {
    //alert(ev.latlng); // ev is an event object (MouseEvent in this case)
             // map.setView(ev.latlng, 4); // ([latuser, lonuser], zoom)
 //  });
  
} //setup

//Colocar natal e são gonçalo na linha de ida e volta.



