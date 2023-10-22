var AYACUCHO = ui.import && ui.import("AYACUCHO", "table", {
      "id": "users/fhuamani/AYACUCHO"
    }) || ee.FeatureCollection("users/fhuamani/AYACUCHO"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
// crear una etiqueta
var etiqueta = ui.Label({value:"ANALISIS MULTITEMPORAL DEL NDVI", 
                         style:{fontSize:'24px', 
                         color:'indigo', 
                         backgroundColor:'orange'   
                         }});
//Map.add(etiqueta);
var boton = ui.Button({label:'Mas informacion B',
                      style:{color:'green',
                      backgroundColor:'orange', position:'bottom-right'}});
////////////// BOTON2 //////////////
var boton2 = ui.Button({label: 'Cerrar B2', 
                       onClick:function(p){p = Map.remove(etiqueta)
                       p = Map.remove(boton2)
                       } ,
                       disabled: null, 
                       style:{color:'green',
                       backgroundColor:'orange', position:'bottom-right'}})       
////////////// BOTON1 //////////////
var boton1 = ui.Button({label: 'Mas Info B1', 
                       onClick:function(l){l = Map.add(etiqueta)
                       l = Map.add(boton2) 
                       }, 
                       disabled: null, 
                       style:{color:'green',
                       backgroundColor:'orange', position:'bottom-right'}})
Map.add(boton1)
//Map.add(boton2)
/////////////////// BAR BOTON CENTRAL ///////////////////////////
var boton_centrar = ui.Button({label: "Centrar mapa", 
                               onClick: function(n){n= Map.centerObject(AYACUCHO)}, 
                               style:{position:'bottom-center' } })
Map.add(boton_centrar);
//////////////////// GRAFICO AL HACER CLICK ///////////////////////
Map.addLayer(AYACUCHO,{}, 'AYACUCHO')
var coleccion = ee.ImageCollection('COPERNICUS/S2')
            .filterBounds(AYACUCHO)
            .filterDate('2019-01-02', '2020-08-10')
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
            .map(function(o){var ndvi = o.normalizedDifference(['B8', 'B4'])
            o = o.addBands(ndvi.rename('NDVI'))
            return o.clip(AYACUCHO)
            })
var visparm =  {bands: ['NDVI'], min:-0.5, max:0.9, palette: ['blue', 'black', 'yellow', 'green','red'] }
Map.addLayer(coleccion, visparm, 'NDVI');
Map.setCenter(-74.2197, -13.9348,8)
//////////// al hacer click tiene un resultado //////////////
var lon = ui.Label()
var lat = ui.Label()
Map.onClick(function(click){
                    lon.setValue('Longitud:' + click.lon.toFixed(2))
                    lat.setValue('Latitud:' + click.lat.toFixed(2))
                    var punto = ee.Geometry.Point(click.lon, click.lat)
                    var dibujo = ui.Map.Layer(punto)
                    Map.layers().set(2,punto)
                    Map.centerObject(punto,10)
                    var grafico = ui.Chart.image.series(coleccion.select('NDVI'), punto, ee.Reducer.mean(), 10)
                    .setOptions({title:'ANALISIS MULTITEMPORAL DEL  NDVI EN EL PIXEL',
                                 vAxis:{title: 'Valores del NDVI'},
                                 hAxis:{title: 'FECHA'},
                                 backgroundColor: 'green',
                    })
                    //Map.widgets().set(2, grafico)
                    var panel = ui.Panel({widgets: grafico, 
                                          layout:ui.Panel.Layout.Flow('vertical'), 
                                          style:{width:'450px',
                                          position:'bottom-left' }})
                    Map.widgets().set(2,panel)
})
////////////////////////////// PALETA  /////////////////////////////////////
//var vis = {min: -0.5, max: 0.9, palette: 'navy,blue,aqua'};
var vis = {min: -0.5, max: 0.9, palette: 'blue, black, yellow, green,red'};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Mapa Leyenda: DNVI MULTITRMPORAL SENTINEL-2',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
////////////////////////////////// ENLACE  //////////////////////////////
var places = {
  AMAZONAS: [-122.0849, 37.3887],
  ANCASH: [116.4056, 39.9097],
  APURIMAC: [8.536, 47.376],
  AREQUIPA: [8.536, 47.376],
  CAJAMARCA: [8.536, 47.376],
  CUSCO: [8.536, 47.376],
  HUANCAVELICA: [8.536, 47.376],
  HUANUCO: [8.536, 47.376],
  ICA: [8.536, 47.376],
  JUNIN: [8.536, 47.376],
  LALIBERTAD: [8.536, 47.376],
  LAMBAYEQUE: [8.536, 47.376],
  LIMA: [8.536, 47.376],
  LORETO: [8.536, 47.376],
  MADREDEDIOS: [8.536, 47.376],
  MOQUEGUA: [8.536, 47.376],
  PASCO: [8.536, 47.376],
  PIURA: [8.536, 47.376],
  PUNO: [8.536, 47.376],
  SANMARTIN: [8.536, 47.376],
  TACNA: [8.536, 47.376],
  TUMBES: [8.536, 47.376],
  UCAYALI: [8.536, 47.376]
};
var select = ui.Select({
  items: Object.keys(places),
  placeholder: 'Departamento...',
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1]);
    print('Registered a change');
  }});
//print(select);
Map.add(select)