var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -43.167559083655014,
                -22.943645359768098
              ],
              [
                -43.167559083655014,
                -22.955263816399416
              ],
              [
                -43.148805078222885,
                -22.955263816399416
              ],
              [
                -43.148805078222885,
                -22.943645359768098
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-43.167559083655014, -22.943645359768098],
          [-43.167559083655014, -22.955263816399416],
          [-43.148805078222885, -22.955263816399416],
          [-43.148805078222885, -22.943645359768098]]], null, false);
//var area = ee.FeatureCollection("users/claumao/boavista")
//.filter(ee.Filter.eq('Name','boa vista'));
var area = geometry;
Map.setOptions('satellite')
print(area)
// ========  RAMPA DE CORES
var palette = ['011301','011D01','012E01','023B01', '004C00','056201','207401',
               '3E8601', '529400','66A000','74A901','99B718','FCD163','F1B555',
               'CE7E45', 'FFFFFF'];
Map.centerObject(area,16);
var cores = ['#00008B','#0000FF','#00FFFF','#008000','#ADFF2F','#FFFF00','#FF4500','#FF0000']
//===============================================================
//========= ALTIMETRIA e DERIVADAS =================
var elevation = ee.Image('USGS/SRTMGL1_003');
// Make the training dataset.
elevation = elevation.clip(area);
Map.addLayer(elevation,{min:0, max: 390, palette:cores},'SRTM',0);
//===============================================================
var lines = ee.List.sequence(0, 400, 20);
var contourlines = lines.map(function(line) {
var mycontour = elevation
.convolve(ee.Kernel.gaussian(30,20))
.subtract(ee.Image.constant(line)).zeroCrossing()
.multiply(ee.Image.constant(line)).toFloat();
return mycontour.mask(mycontour);
});
contourlines = ee.ImageCollection(contourlines).mosaic();
Map.addLayer(contourlines,{min: 0, max:400, palette:cores},'Curvas de nível',1);
function ColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 500, 20],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 500,
      palette: cores,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend(a,b) {
  var labelPanel = ui.Panel(
      [
        ui.Label(a, {margin: '4px 8px'}),
        ui.Label(' ',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(b, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(), labelPanel]);
}
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '14px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
Map.add(ui.Panel(
    [
      ui.Label('Isolinhas', LEGEND_TITLE_STYLE), makeLegend('20','400'),
      ui.Label('Máxima: 396m', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));
var titleLabel = ui.Label(
    'SRTM - Morro da Urca/Pão de Açúcar - RJ', {fontWeight: 'bold', fontSize: '18px'})
Map.add(titleLabel);
/*
Export.table.toDrive({
  collection: contourlines,
  description:'vectorsToDriveExample',
  fileFormat: 'KML'
});
// EXPORTANDO IMAGEM PROCESSADA
Export.image.toDrive({
  image: elevation,
  description: 'SRTM',
  scale: 10,
  region: area,
  maxPixels: 1000000000
});
*/