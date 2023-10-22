var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    LAMBAYEQUE = ui.import && ui.import("LAMBAYEQUE", "table", {
      "id": "users/fhuamani/LAMBAYEQUE"
    }) || ee.FeatureCollection("users/fhuamani/LAMBAYEQUE");
////////////////////////// CURSOR  //////////////////////
Map.style().set("cursor", "crosshair")
print (Map.style())
///////////////////////////////   CREACION DEL PANEL  //////////////////////////////////////////
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
// Define title and description.
var titulo = ui.Label('ANALISIS MULTITEMPORAL DEL NDVI POR PIXEL EN LAMBAYEQUE 2019 AL 2020',
  {fontWeight: 'bold', fontSize: '15px', margin: '10px 5px'}
);
var resumen = ui.Label('En este panel conocerás el análisis multitemportal del NDVI de un deperminado pixel,  '+ 
  ' podras analizar la evolución de la cobertura,'+
  ' inferir las fechas de siembra,'+
  ' crecimiento, cosecha segun el comportamiento del NDVI en el tiempo (como la calidad), tambien las fechas de inundaciones, incendios forestales, deforestaciones,'+
  ' evolución de los nevados...', {fontSize: '12px'});
var agricultura = ui.Label('AGRICULTURA',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var table_agricola = ui.Chart(
    [
      ['<h4>AGRO</h4>'],
      ['<img src=https://ericka669.files.wordpress.com/2016/09/images.jpg?w=1180 width=300px>']
    ],
    'Table', {allowHtml: true});
var agricultura_text = ui.Label('Podras analizar al evolucion de los cultivos', {});
var table_deforestacion = ui.Chart(
    [
      ['<h4>DEFORESTACION</h4>'],
      ['<img src=https://gestion.pe/resizer/6NMmZXczBXsEDq8ZWeClurwW8-g=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/GTTBQA7C7BBXBGJJAQO3MFTMJQ.jpg width=300px>']
    ],
    'Table', {allowHtml: true});
var deforestacion_text = ui.Label('Podras analizar las areas deforestadas', {});
// Add title and description to the panel.  
panel.add(titulo).add(resumen);
panel.add(table_agricola).add(agricultura_text)
panel.add(table_deforestacion).add(deforestacion_text)
////////////////////////////////// ENLACE  //////////////////////////////
///////////////////////////////////// ETIQUETAS ////////////////
/////////////////// BAR BOTON CENTRAL ///////////////////////////
var boton_centrar = ui.Button({label: "Centrar mapa", 
                               onClick: function(n){n= Map.centerObject(LAMBAYEQUE)}, 
                               style:{position:'bottom-center' } })
Map.add(boton_centrar);
//////////////////// GRAFICO AL HACER CLICK ///////////////////////
//Map.addLayer(LAMBAYEQUE,{}, 'LAMBAYEQUE')
var coleccion = ee.ImageCollection('COPERNICUS/S2')
            .filterBounds(LAMBAYEQUE)
            .filterDate('2019-01-01', '2020-08-30')
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
            .map(function(o){var ndvi = o.normalizedDifference(['B8', 'B4'])
            o = o.addBands(ndvi.rename('NDVI'))
            return o.clip(LAMBAYEQUE)
            })
var visparm =  {bands: ['NDVI'], min:-0.5, max:0.9, palette: ['blue', 'black', 'yellow', 'green','green'] }
Map.addLayer(coleccion, visparm, 'NDVI');
Map.setCenter(-79.8268977822548,-6.34056611749706,8)
//////////// al hacer click tiene un resultado //////////////
var lon = ui.Label()
var lat = ui.Label()
Map.onClick(function(click){
                    lon.setValue('Longitud:' + click.lon.toFixed(2))
                    lat.setValue('Latitud:' + click.lat.toFixed(2))
                    var punto = ee.Geometry.Point(click.lon, click.lat)
                    var dibujo = ui.Map.Layer(punto)
                    Map.layers().set(1,punto)
                    var grafico = ui.Chart.image.series(coleccion.select('NDVI'), punto, ee.Reducer.mean(), 10)
                    .setOptions({title:'ANALISIS MULTITEMPORAL DEL  NDVI',
                                 vAxis:{title: 'Valores del NDVI'},
                                 hAxis:{title: 'FECHA'},
                                 backgroundColor: 'white',
                    })
                    //Map.widgets().set(2, grafico)
                    var panel = ui.Panel({widgets: grafico, 
                                          layout:ui.Panel.Layout.Flow('vertical'), 
                                          style:{width:'450px',
                                          position:'bottom-left' }})
                    Map.widgets().set(4,panel)   // PARA VER CUANTOS GRAFICOS ACEPTA EL PANEL
})
////////////////////////////// PALETA  /////////////////////////////////////
//var vis = {min: -0.5, max: 0.9, palette: 'navy,blue,aqua'};
var vis = {min: -0.5, max: 0.9, palette: 'blue, black, yellow, green,green'};
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
panel.add(legendPanel);
/////////////////////// ETIQUETAS Y BOTONES ////////////////////////////
// crear una etiqueta
var etiqueta = ui.Label({value:"ANÁLISIS MULTITEMPORAL DEL NDVI POR PIXEL EN LAMBAYEQUE", 
                         style:{fontSize:'20px', 
                         color:'indigo', 
                         backgroundColor:'white'   
                         }});
Map.add(etiqueta);
var comentario = ui.Label({value:"Selecciona un pixel", 
                         style:{fontSize:'18px', 
                         color:'indigo', 
                         backgroundColor:'white',
                         position:'middle-right'
                         }});
Map.add(comentario);
var boton = ui.Button({label:'Mas informacion B',
                      style:{color:'green',
                      backgroundColor:'orange', position:'bottom-right'}});
//Map.add(boton2)