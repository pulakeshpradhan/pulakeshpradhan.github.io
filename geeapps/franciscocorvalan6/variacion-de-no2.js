var Argentina = ui.import && ui.import("Argentina", "table", {
      "id": "users/franciscocorvalan6/Poligono_argentina"
    }) || ee.FeatureCollection("users/franciscocorvalan6/Poligono_argentina"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -59.448348966530716,
                -34.14441968247992
              ],
              [
                -59.448348966530716,
                -35.640211769457004
              ],
              [
                -57.564193693093216,
                -35.640211769457004
              ],
              [
                -57.564193693093216,
                -34.14441968247992
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-59.448348966530716, -34.14441968247992],
          [-59.448348966530716, -35.640211769457004],
          [-57.564193693093216, -35.640211769457004],
          [-57.564193693093216, -34.14441968247992]]], null, false);
//VISUALIZACION DE MAPAS DE CONTAMINACION NO2 TROPOSFERICO
//Llamamos a la coleccion de datos Sentinel 5P y seleccionamos la banda de NO2 troposferico
var TROPOMISensor = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density');
// Definimos los dos momentos de analisis de concentracion de contaminacion
// y cortamos la superficie de estudio transformando las unidades de la imagen de  m² a km²
var NO2Previo = TROPOMISensor.filterDate('2020-02-15', '2020-03-15').mean(); //Primer momento
var NO2Posterior = TROPOMISensor.filterDate('2020-03-20', '2020-04-04').mean(); //Segundo momento
var NO2Lapso = (TROPOMISensor.filterDate('2020-02-15', '2020-04-23'));//Lapso de tiempo para el chart
var NO2Lapso_max = (TROPOMISensor.filterDate('2020-02-15', '2020-04-04').max()).multiply(1000000);//Lapso de tiempo para el chart
var SRTM = ee.Image('CGIAR/SRTM90_V4');
var HillShade = ee.Terrain.hillshade(SRTM);
var HillShade = HillShade.clip (Argentina)
var NO2Previo= NO2Previo.clip (Argentina).multiply(1000000);
var NO2Posterior= NO2Posterior.clip (Argentina).multiply(1000000);
////////////////////////// cambio de unidades a lapso que es una imagecollection
var NO2Lapso = NO2Lapso.map(function(img){
  return img.multiply(1000000)
  .copyProperties(img,['system:time_start','system:time_end']);
});
/////////////////// renombrar las bandas ////////
function renameBandsETM(image) {
    var bands = ['tropospheric_NO2_column_number_density'];
    var new_bands = ['Columna de densidadad de NO2 troposférico'];
    return image.select(bands).rename(new_bands);
}
var NO2Lapso = NO2Lapso.map(renameBandsETM)
////////
//print(NO2Lapso.propertyNames())
//print(NO2Lapso.select('stropospheric_NO2_column_number_density','asd'))
//print(NO2Lapso)
//print(etm)
//print(NO2Lapso.aggregate_array('visualization_0_bands'));
//var NO2Posterior= NO2Posterior.multiply(1000000)
// var NO2Lapso = NO2Lapso.clip (Argentina);
//Map.addLayer (NO2Previo, colorizedVis, 'Emisiones Previas de NO2 troposferico');
// Demonstracion del antes/despues de la cuarentena.
var images = {
  'NO2Previo' : NO2Previo,
  'NO2Posterior' : NO2Posterior
} 
// maximo de las imagenes
var max_previo = (NO2Lapso_max.reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: geometry,
      scale : 60
      }))
print (max_previo)
var colorizedVis = {
  min:0,
  max: 150,
  opacity: 0.80,
  //palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
  palette: ['#0e0860','0000ff','13b8de','27ff00','fff80c','ff6a00','ff0000']
};
//Map.addLayer(HillShade,{min: 100, max:255}, 'Hillshade')
// Creacion del mapa izquierdo, y mostrar la capa 0.
var leftMap = ui.Map();
//leftMap.addLayer(HillShade,{min: 100, max:255}, 'Hillshade');
leftMap.add(createLegend())
leftMap.add(createLegend2())
leftMap.setControlVisibility(true);
leftMap.style().set({cursor: 'crosshair'});
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, colorizedVis);
// Creacion del mapa izquierdo, y mostrar la capa 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.add(createLegend2())
rightMap.style().set({cursor: 'crosshair'});
rightMap.setControlVisibility(true);
//rightMap.addLayer(HillShade,{min: 100, max:255}, 'Hillshade');
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Elegir periodo para visualizar');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],colorizedVis));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//////////////////////////// Leyenda ///////////////////
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 10px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
  value: 'NO2 troposférico mol/km²',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
   // Add the title to the panel
  legend.add(legendTitle); 
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label((colorizedVis.max),{margin: '0px 50px',textAlign: 'center',padding: '0px'})
      ],
    });
  legend.add(panel);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((colorizedVis.max-colorizedVis.min)/100.0).add(colorizedVis.min);
  var legendImage = gradient.visualize(colorizedVis);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x300'},  
    style: {padding: '0px', position: 'bottom-center', margin: '10px 50px'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label((colorizedVis.min),{margin: '0px 50px',textAlign: 'center'})
      ],
    });
  legend.add(panel);
  return legend
}
//////// Firma del autor ///
function createLegend2() {
    var legend2 = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '0px 0px',
      color: 'grey',
      backgroundColor : "blue"
    }
  })
  // Create legend title
  var legendTitle2 = ui.Label({
  value: 'Francisco Martín Corvalán'+'\n'+
  'francisco.corvalan6@gmail.com',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 0px 0',
    padding: '0',
    backgroundColor : ('white')
    }
});
   // Add the title to the panel
  legend2.add(legendTitle2); 
  // // create text on top of legend
  // var panel3 = ui.Panel({
  //     widgets: [
  //       ui.Label((colorizedVis.max),{margin: '0px 50px',textAlign: 'center',padding: '0px'})
  //     ],
  //   });
  // legend.add(panel3);
  // });
  // add the thumbnail to the legend
  //legend2.add(thumbnail);
  // create text on top of legend
  // var panel3 = ui.Panel({
  //     widgets: [
  //       ui.Label((colorizedVis.min),{margin: '0px 50px',textAlign: 'center'})
  //     ],
  //   });
  //legend2.add(panel3);
  return legend2
}
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-64.98915273773932,-31.849089102114494, 6);
////////////////////////////////////////////////  Grafico ////////////////////////////////////////////
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel2 = ui.Panel({style: {
  width: '500px',
  //, height:'1000px',
  // ,
  // position: 'bottom-left',
   padding: '8px 15px'
}
})
  .add(ui.Label('Seccione una ubicacion en el mapa'));
/////////// Panel Izquierdo 
leftMap.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
    // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
//var bandNames = image.bandNames();
//print('Band names: ', image.bandNames(NO2Lapso)); // ee.List of band names
  // Creacion de una grafico de los valorres de NO2 en el tiempo.
  var chart = ui.Chart.image.series(NO2Lapso, point,ee.Reducer.mean(), 20)
  //.setChartType('CandlestickChart')
      .setOptions({
        title: 'Variacion del contenido de NO2 troposférico',
        height:'500px',
        vAxis: {title: 'NO2 Troposférico mol/km²'},
        lineWidth: 1,
        pointSize: 3,
        interpolateNulls: true,
        seriesProperty:  'NO2 Troposférico',
        // trendlines: {
        // 0:{type: 'linear',
        //   color: 'red',
        //   lineWidth: 0.01,
        //   opacity: 0.4,
        //   showR2: false,
        //   visibleInLegend: false
        // }},
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel2.widgets().set(2, chart);
//ui.Chart(dataTable, chartType, options, view, downloadable)
////////// tranformador de coordenadas de dec a GMS
  var Latitud = (coords.lat.toFixed(10))
function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    var simbolo_Latitud = Latitud;
if (Latitud < 0) {simbolo_Latitud="S";} else {simbolo_Latitud= "N";}
    return degrees+"°"+ minutes +'\''+ seconds+"\""+simbolo_Latitud;
}
var Latitud_GMS = toDegreesMinutesAndSeconds (Latitud)
  var Longitud = (coords.lon.toFixed(10))
function toDegreesMinutesAndSecondsLong(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    var simbolo_Longitud = Longitud;
if (Latitud < 0) {simbolo_Longitud="O";} else {simbolo_Longitud= "E";}
    return degrees+"°"+ minutes +'\''+ seconds+"\""+simbolo_Longitud;
}
var Longitud_GMS = toDegreesMinutesAndSecondsLong (Longitud)
var location =  'lat: ' + Latitud_GMS + '___lon: ' + Longitud_GMS;
  panel2.widgets().set(1, ui.Label(location)); 
});
////// Panel Derecho
rightMap.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
    // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
//var bandNames = image.bandNames();
//print('Band names: ', image.bandNames(NO2Lapso)); // ee.List of band names
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(NO2Lapso, point,ee.Reducer.mean(), 20)
      .setOptions({
        title: 'Variacion del contenido de NO2 troposférico',
        vAxis: {title: 'NO2 Troposférico mol/km²'},
        lineWidth: 1,
        pointSize: 3,
        interpolateNulls: true,
        seriesProperty:  'NO2 Troposférico',
        // trendlines: {
        // 0:{type: 'linear',
        //   color: 'red',
        //   lineWidth: 0.01,
        //   opacity: 0.7,
        //   showR2: false,
        //   visibleInLegend: false
        // }},
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel2.widgets().set(2, chart);
////////// tranformador de coordenadas de dec a GMS
  var Latitud = (coords.lat.toFixed(10))
function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
 //   var simbolo_Latitud= if(coordinate < 0) {simbolo_Latitud = "O"} else [simbolo_Latitud = "E"}
    var simbolo_Latitud = Latitud;
if (Latitud < 0) {simbolo_Latitud="S";} else {simbolo_Latitud= "N";}
    return degrees+"°"+ minutes +'\''+ seconds+"\""+simbolo_Latitud;
}
var Latitud_GMS = toDegreesMinutesAndSeconds (Latitud)
  var Longitud = (coords.lon.toFixed(10))
function toDegreesMinutesAndSecondsLong(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
 //   var simbolo_Latitud= if(coordinate < 0) {simbolo_Latitud = "O"} else [simbolo_Latitud = "E"}
    var simbolo_Longitud = Longitud;
if (Latitud < 0) {simbolo_Longitud="O";} else {simbolo_Longitud= "E";}
    return degrees+"°"+ minutes +'\''+ seconds+"\""+simbolo_Longitud;
}
var Longitud_GMS = toDegreesMinutesAndSecondsLong (Longitud)
var location = ['lat: ' + Latitud_GMS +'  '+'___lon: ' + Longitud_GMS]
                 ;
  panel2.widgets().set(1, ui.Label(location)); 
});
ui.root.add(panel2);