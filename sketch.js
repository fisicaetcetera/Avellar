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
    [34.672314, 135.484802], //Osaka
    [35.011665, 135.768326], //Kioto
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
    .bindPopup('SÃO GONÇALO <BR> dia 09/9 (10:00-12:50)<br> GOL G3 1541 <br> Retorno: dia 02/10 (1:55)')
    .openPopup();
    
  L.marker(latlngsIda[1]).addTo(map)
    .bindPopup('SÃO PAULO <BR> dia 09/9 (16:20-01:00+1) ,<br> Retorno: dia 01/10 (17:40)')
    .openPopup();
    
   //BURJ KHALIFA 
  ///L.marker([]).addTo(map)
   /// .bindPopup('Burj Khalifa, dia 12')
   // .openPopup();
   //var imageUrl = './burj_Khalifa.jpg',
   // imageBounds = [[25.197197, 55.272594], [25.6,55.12]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map);
     
  // DUBAI
  L.marker(latlngsIda[2]).addTo(map)
    .bindPopup('DUBAI <BR> dia 12 (00:00) a 13 (10:05) ')
    .openPopup();
    
 //CINGAPURA
  L.marker(latlngsIda[3]).addTo(map)
    .bindPopup('CINGAPURA<BR> dias 13(21:45) A 16 (16:40)<br> SQ 806')
    .openPopup(); 
   //Sri Marianman
      //var imageUrl = './sri_Marianman.jpg',
    //imageBounds = [ [1.359167, 103.989441], [5,109]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map); 

//PEQUIM
  L.marker(latlngsIda[4]).addTo(map)
    .bindPopup('PEQUIM <BR> dias 16 (23:00) A 19 (à tarde, de trem para Xian)')
    .openPopup();
   //Beijing Summer Palace
     // var imageUrl = './Summer-Palace-Beijing-728x410.jpg',
   // imageBounds = [ [40.072498,116.597504], [43,121]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map);     

  //XIAN
  L.marker(latlngsIda[5]).addTo(map)
    .bindPopup('XIAN<BR> dias 19 (s/horário) A 21 (sem horário)')
    .openPopup();
      //Xian Terra cota warriors
      //var imageUrl = './guerreiros_de_terra_cota.png',
   // imageBounds = [ [34.274342, 108.889191], [35.5,113]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map);     


  // SHANGHAI

  L.marker(latlngsIda[6]).addTo(map)
    .bindPopup('SHANGHAI : dias 21 (sem horário) a 23 ()')
    .openPopup();
     //shanghai_jardim_Yu
     // var imageUrl = './shanghai_jardim_Yu_540 × 312.jpg',
    //imageBounds = [ [31.22222, 121.45806], [33.5,125.5]];
//L.imageOverlay(imageUrl, imageBounds).addTo(map); 
    
  // SEUL

  L.marker(latlngsIda[7]).addTo(map)
    .bindPopup('SEUL : dias 23 a 26 (08:10)<br> Asiana OZ 1145 <BR> Destino: Osaka')
    .openPopup();
      
  //OSAKA
  L.marker(latlngsIda[8]).addTo(map)
    .bindPopup('OSAKA : dia 26 A 27<BR> TREM? para Kioto' )
    .openPopup();
  
  //KIOTO
  // Kyoto, Japan, 35.011665, 135.768326 
  //SAI DE TREM PARA TOKIO DIA 27
  L.marker(latlngsIda[9]).addTo(map)
    .bindPopup('KIOTO : dia 26 A 27<BR> TREM para Tokio' )
    .openPopup();
  // TOKYO

  L.marker(latlngsIda[10]).addTo(map)
    .bindPopup('TOKYO <BR> dias 27 (09:45) a 30 (22:30)<br> Emirates EK 319')
    .openPopup();
    
//  map.on('click', function(ev) {
    //alert(ev.latlng); // ev is an event object (MouseEvent in this case)
             // map.setView(ev.latlng, 4); // ([latuser, lonuser], zoom)
 //  });
  
} //setup

//Colocar natal e são gonçalo na linha de ida e volta.



