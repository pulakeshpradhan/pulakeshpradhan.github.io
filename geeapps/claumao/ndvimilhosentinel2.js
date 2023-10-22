var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 0.009004737082485281,
        "max": 1.0357335314695577,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "529400",
          "3e8601",
          "207401",
          "056201",
          "004c00",
          "023b01",
          "012e01",
          "011d01",
          "011301"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":0.009004737082485281,"max":1.0357335314695577,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]};
// GEOMETRIA (polígono de recortes)
var reg = ee.Geometry.Polygon([
[-52.77383114678537,-28.483407193372518],
[-52.77377213818704,-28.483015840721222],
[-52.77372117621576,-28.482589123225697],
[-52.77370279842228,-28.482385956043238],
[-52.77369475179523,-28.482192635575434],
[-52.77371352725834,-28.48196159357649],
[-52.77372157388538,-28.48174705412488],
[-52.77379867222089,-28.48152351069177],
[-52.77389254953641,-28.48137734039648],
[-52.77400520231504,-28.4812476730297],
[-52.77711107393924,-28.480501737958882],
[-52.7775724138898,-28.480487592318415],
[-52.77784599920932,-28.480518241203683],
[-52.777926465479766,-28.480563035712333],
[-52.77813014341501,-28.481161716358397],
[-52.7781703429734,-28.481434812989043],
[-52.778207893899605,-28.481734225955684],
[-52.77819448285453,-28.481816741190983],
[-52.77818375401847,-28.48205957136652],
[-52.778186436227486,-28.482097292508723],
[-52.77812742762916,-28.482248176942836],
[-52.77383114678537,-28.483407193372518]])
//DADOS NDVI VINDO DOS DRONES
var ndvi = ee.Image('users/claumao/LAFOP/ndvi');
// FILTRO SENTINEL PARA ENCONTRAR AS CENAS
var start = '2020-01-01';
var end = '2020-01-30';
var sent = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(reg)
  .filterDate(start,end);
  // -------------------- FIM DO FILTRO-----------------------------
//CARREGA IMAGENS DO SENTINEL
var b20190826 = ee.Image('COPERNICUS/S2_SR/20190826T133231_20190826T133932_T22JCP');
var b20190924 = ee.Image('COPERNICUS/S2_SR/20190925T133231_20190925T133540_T22JCP');
var b20191025 = ee.Image('COPERNICUS/S2_SR/20191025T133231_20191025T133228_T22JCP');
var b20191124 = ee.Image('COPERNICUS/S2_SR/20191124T133231_20191124T133225_T22JCP');
var b20191224 = ee.Image('COPERNICUS/S2_SR/20191224T133221_20191224T133219_T22JCP');
var b20191229 = ee.Image('COPERNICUS/S2_SR/20191229T133219_20191229T133219_T22JCP');
var b20200103 = ee.Image('COPERNICUS/S2_SR/20200103T133221_20200103T133219_T22JCP');
var b20200113 = ee.Image('COPERNICUS/S2_SR/20200113T133221_20200113T133218_T22JCP');
var b20200128 = ee.Image('COPERNICUS/S2_SR/20200128T133219_20200128T133216_T22JCP');
//CRIA NDVI, FAZ RECORTE RENOMEIA
var ndvi0826 = b20190826.normalizedDifference(['B8','B4']).rename('NDVI08').clip(reg);
var ndvi0924 = b20190924.normalizedDifference(['B8','B4']).rename('NDVI09').clip(reg);
var ndvi1025 = b20191025.normalizedDifference(['B8','B4']).rename('NDVI10').clip(reg);
var ndvi1124 = b20191124.normalizedDifference(['B8','B4']).rename('NDVI11').clip(reg);
var ndvi1224 = b20191224.normalizedDifference(['B8','B4']).rename('NDVI12').clip(reg);
var ndvi1229 = b20191229.normalizedDifference(['B8','B4']).rename('NDVI1229').clip(reg);
var ndvi0103 = b20200103.normalizedDifference(['B8','B4']).rename('NDVI0103').clip(reg);
var ndvi0113 = b20200113.normalizedDifference(['B8','B4']).rename('NDVI0113').clip(reg);
var ndvi0128 = b20200128.normalizedDifference(['B8','B4']).rename('NDVI0128').clip(reg);
//RAMPA DE CORES DOS NDVI (palette)
var rampa = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//DISPLAY DOS MAPAS
//Map.addLayer(ndvi,   {min: 0.017, max: 0.91, palette: rampa},'NDVI-DRONE',1);
Map.addLayer(ndvi0826, {min: 0.0, max: 1, palette: rampa},'NDVI-26/08/2019',0);
Map.addLayer(ndvi0924, {min: 0.0, max: 1, palette: rampa},'NDVI-24/09/2019',0);
Map.addLayer(ndvi1025, {min: 0.0, max: 1, palette: rampa},'NDVI-25/10/2019',0);
Map.addLayer(ndvi1124, {min: 0.0, max: 1, palette: rampa},'NDVI-24/11/2019',0);
Map.addLayer(ndvi1224, {min: 0.0, max: 1, palette: rampa},'NDVI-24/12/2019',0);
Map.addLayer(ndvi1229, {min: 0.0, max: 1, palette: rampa},'NDVI-29/12/2019',0);
Map.addLayer(ndvi0103, {min: 0.0, max: 1, palette: rampa},'NDVI-03/01/2020',1);
Map.addLayer(ndvi0113, {min: 0.0, max: 1, palette: rampa},'NDVI-13/01/2020',0);
Map.addLayer(ndvi0128, {min: 0.0, max: 1, palette: rampa},'NDVI-28/01/2020',0);
//Map.addLayer(sent, {},'SENTINEL-2A',0);
Map.centerObject(reg, 17);