var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#cd00cd",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #cd00cd */ee.Geometry.MultiPoint();
var dataset = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8");
Map.setControlVisibility({zoomControl: false, drawingToolsControl: true});
Map.setCenter(-65.36, -9.29, 3.5);
//Creamos el mapa
var Mapa_r = ui.Map();
Mapa_r.setOptions('ROADMAP');
Mapa_r.setControlVisibility({zoomControl: true, drawingToolsControl: true});
//Funcion para cortar
var corte = function(img){
  var img_corte = img.clip(roi);
  return img_corte; 
};
//Panel de instrucciones 1
{
var title = ui.Label('Instructions', {fontSize: '16px', fontWeight: 'bold'});
var instr1 = ui.Label('1. Select the study area', {fontSize: '14px'});
var instr2 = ui.Label('2. Write the dates before the flood', {fontSize: '14px'});
var instr3 = ui.Label('3. Write the dates after the flood', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr4 = ui.Label('4. Choose polarization', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr5 = ui.Label('5. Choose the satellite orbit', {fontSize: '14px', margin: '8px 8px 4px 8px'});
//Boton busqueda de imágenes
var symbol = {
  point: '●',
  rectangulo: '▊',
  poligono: '▛  '
};
var regionButtonPanel = ui.Panel([
    ui.Button({
      label: symbol.rectangulo + ' Study area',
      onClick: drawRectangle,
      style: {stretch: 'horizontal', margin:'1px'}}),
    ], ui.Panel.Layout.flow('horizontal'), {margin: '8px'}
);
//Selector de las fechas
{
var tiempo = [];
    tiempo[0] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre){
        tiempo[0].setValue(pre);
    }
    });
    tiempo[1] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[1].setValue(pre);
    }
    });
    tiempo[2] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[2].setValue(pre);
    }
    });
    tiempo[3] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[3].setValue(pre);
    }
    });
var hasta1 = ui.Label('to', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var hasta1_1 = ui.Label('to', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var tiempo1 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo1.add(ui.Panel([tiempo[0], hasta1, tiempo[1]],ui.Panel.Layout.Flow('horizontal')));
var tiempo1_1 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo1_1.add(ui.Panel([tiempo[2], hasta1_1, tiempo[3]],ui.Panel.Layout.Flow('horizontal')));
}
var botonSiguiente = ui.Button({
  label: 'Siguiente',
  onClick: siguienteimg,
  style: {stretch: 'horizontal'}
});
var orbita = ui.Select({
  items: ["Descendente",
          "Ascendente"],
  placeholder: "Descendente",
  value: "Descendente",
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        orbita.setValue(pre);
  },
});
var polarización = ui.Select({
  items: ['VV',
          'VH'],
  placeholder: 'VV',
  value: 'VV',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        polarización.setValue(pre);
        print ("valor pol", pre);
  },
});
var controlPanel = ui.Panel([
    title,
    instr1,
    regionButtonPanel,
    instr2,
    tiempo1,
    instr3,
    tiempo1_1,
    instr4,
    polarización,
    instr5,
    orbita,
    botonSiguiente
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
}
Map.add(controlPanel);
//Dibuja una geometría
{
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
drawingTools.onDraw(function() {
  drawingTools.setShape(null);
});
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'cd00cd'});
drawingTools.layers().add(dummyGeometry);
}
//Función para limpiar geometrías
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//Función para dibujar geometrías
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
//Función siguiente paso
var Zona_estudio = [];
var roi = [];
var collection_r = [];
var orb_f = [];
function siguienteimg() {
  ui.root.clear();
  ui.root.add(Mapa_r);
  Zona_estudio = drawingTools.layers().get(0).getEeObject();
  var Cuenca = dataset.filterBounds(Zona_estudio);
  Mapa_r.addLayer(Cuenca,{},"Watersheds");
  Mapa_r.centerObject(Cuenca,8);
  roi = Cuenca;
  var title = ui.Label('Flooded areas');
    title.style().set({
      position: 'top-center',
      fontWeight: 'bold'
  });
  Mapa_r.add(title);
  Mapa_r.centerObject(roi, 9);
  var pol = polarización.getValue();
  var orb = orbita.getValue();
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VV, descending)
if (orb == "Descendente"){
  orb_f = 'DESCENDING';
  print ("orbita", orb_f);
} else {
  orb_f = 'ASCENDING';
  print ("orbita", orb_f);
}
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', pol))
.filter(ee.Filter.eq('orbitProperties_pass', orb_f))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VV');
collectionVV = collectionVV.map(corte);
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VH, descending)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', pol))
.filter(ee.Filter.eq('orbitProperties_pass', orb_f))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VH');
collectionVH = collectionVH.map(corte);
if (pol == 'VV'){
  collection_r = collectionVV;
}
else {
  collection_r = collectionVH;
}
//Filter by date
var fecha_antes_i = tiempo[0].getValue();
var fecha_antes_f = tiempo[1].getValue();
var fecha_despues_i = tiempo[2].getValue();
var fecha_despues_f = tiempo[3].getValue();
var before = collection_r.filterDate(fecha_antes_i, fecha_antes_f).mosaic();
print ("beforeVV", before);
var after = collection_r.filterDate(fecha_despues_i, fecha_despues_f).mosaic();
print ("afterVV", after);
//Apply filter to reduce speckle
var SMOOTHING_RADIUS = 50;
var before_filtered = before.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var after_filtered = after.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
// Calculate difference between before and after
var difference= after_filtered.divide(before_filtered);
//Apply Threshold VH
var DIFF_UPPER_THRESHOLD = 1.25;
var difference_thresholded = difference.gt(DIFF_UPPER_THRESHOLD);
// Display map
if (pol == "VV"){
  collection_r = collectionVV;
  Mapa_r.addLayer(before, {min:-15,max:0}, 'Before flood VV', 0);
  Mapa_r.addLayer(after, {min:-15,max:0}, 'After flood VV', 0);
  Mapa_r.addLayer(before_filtered, {min:-15,max:0}, 'Before Flood VV Filtered',0);
  Mapa_r.addLayer(after_filtered, {min:-15,max:0}, 'After Flood VV Filtered',0);
  Mapa_r.addLayer(difference, {min: 0,max:2}, 'Difference VV filtered', 0);
  Mapa_r.addLayer(difference_thresholded.updateMask(difference_thresholded),
  {palette:"0000FF"},'Flooded areas - blue VV',1);
}
else {
  collection_r = collectionVH;
  Mapa_r.addLayer(before, {min:-25,max:0}, 'Before flood VH', 0);
  Mapa_r.addLayer(after, {min:-25,max:0}, 'After flood VH', 0);
  Mapa_r.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood VH Filtered',0);
  Mapa_r.addLayer(after_filtered, {min:-25,max:0}, 'After Flood VH Filtered',0);
  Mapa_r.addLayer(difference, {min: 0,max:2}, 'Difference VH filtered', 0);
  Mapa_r.addLayer(difference_thresholded.updateMask(difference_thresholded),
  {palette:"0000FF"},'Flooded areas - blue VH',1);
}
}
/**
Map.onClick(function(coords) {
  Map.clear()
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var Cuenca = dataset.filterBounds(point);
  Map.addLayer(Cuenca, {}, "Cuenca");
});
**/