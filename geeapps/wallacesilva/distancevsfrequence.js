var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.35347172393536,
                5.657207242278998
              ],
              [
                -74.35347172393536,
                -33.908989982668544
              ],
              [
                -34.011674848935364,
                -33.908989982668544
              ],
              [
                -34.011674848935364,
                5.657207242278998
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-74.35347172393536, 5.657207242278998],
          [-74.35347172393536, -33.908989982668544],
          [-34.011674848935364, -33.908989982668544],
          [-34.011674848935364, 5.657207242278998]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -63.74083299930554,
                -5.2685647880567705
              ],
              [
                -63.74083299930554,
                -6.230486517849486
              ],
              [
                -62.42247362430554,
                -6.230486517849486
              ],
              [
                -62.42247362430554,
                -5.2685647880567705
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-63.74083299930554, -5.2685647880567705],
          [-63.74083299930554, -6.230486517849486],
          [-62.42247362430554, -6.230486517849486],
          [-62.42247362430554, -5.2685647880567705]]], null, false);
var biome = 'Amazônia';
var region = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil');
  // .filter(ee.Filter.eq('Bioma','Amazônia'))
Map.centerObject(region);
// dado de cobertura do solo
var landcover = 'projects/mapbiomas-workspace/COLECAO6/mapbiomas-collection60-integration-v0-12';
landcover = ee.ImageCollection(landcover).mosaic();
// selecionando dado de 2020
var year = 2020;
landcover = landcover.select('classification_'+year);
// remapeando valores de cobertura para somente duas classes -> natural (1) e antropico (2)
var oldClasses =    [ 1,  3,  4,  5,  6,  49, 10, 11, 12, 32, 29, 50, 13, 14, 15, 18, 19, 39, 20, 40, 41, 36, 9,  21, 22, 23, 24, 30, 25, 26, 33, 31, 27 ] ;
var newClasses =    [ 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,2 ,2 ,1 ,2 ,2 ,  ];
var landcover_remap = landcover.remap(oldClasses,newClasses);
// dado de cobertura queimada
var fire_asset = 'projects/mapbiomas-workspace/FOGO1/monthly-coverage-collection-1-v9';
var fire = ee.ImageCollection(fire_asset).mosaic();
// ajustando dado para calcular a frequencia
var frequence = fire.bandNames().getInfo().map(function(bandName){
  return ee.Image(1).updateMask(fire.select(bandName));
});
frequence = ee.ImageCollection(frequence).sum();
// dado de faixas de bordas de areas naturais a cada 1 km por 50 km
var asset = 'projects/mapbiomas-workspace/FOGO1/bordas_natural_col6_v1';
var bordas = ee.ImageCollection(asset)
  .filter(ee.Filter.eq('version','v2'))
  .filter(ee.Filter.eq('year',2020))
  .mosaic();
// print(image)
var visParams = {
  antropico:{palette:'black'},
  natural:{palette:'blue'},
  cobertura:{palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),min:0,max:49,},
  borda:{min:0,max:50,palette:['ff8d00','ffb100','ffe000','d8ff00','b4ff00','33ff00','0bba00','088f00']},
  frequencia:{min:0,max:35,palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709']},
  limite:{palette:['red']}
}
// plots
Map.addLayer(landcover_remap.updateMask(landcover_remap.eq(2)),visParams.antropico,'antrópico',true,0.2);
Map.addLayer(landcover_remap.updateMask(landcover_remap.eq(1)),visParams.natural,'natural',false,0.2);
Map.addLayer(landcover,visParams.cobertura,'cobertura do solo col. 6',false);
Map.addLayer(bordas,visParams.borda,'distance - palettizado',true,0.6);
// Map.addLayer(bordas,{min:0,max:50,palette:[]},'distance',false);
Map.addLayer(frequence,visParams.frequencia,'frequencia do fogo',true);
// transformando geometria em linha
var line = ee.Image(1).paint(region,'000000',0.5);
line = line.updateMask(line.neq(1));
Map.addLayer(line,visParams.limite,'region');
// interface de usuario
function colorBar (palette,listStrings,title){
  // Create the color bar for the legend.
  var colorbar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {
      stretch: 'horizontal',
      maxHeight: '6px',
      fontSize:'12px',
      fontWeight: 'bold',
      margin:'0px 0px 0px 0px',
      backgroundColor:'ffffff00',
    },
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(listStrings[0], {  backgroundColor:'ffffff00', fontSize:'10px',  margin:'0px 0px 0px 0px',}),
      ui.Label(listStrings[1], {  backgroundColor:'ffffff00', fontSize:'10px', textAlign: 'center', stretch: 'horizontal', margin:'0px 0px 0px 0px',}),
      ui.Label(listStrings[2], {  backgroundColor:'ffffff00', fontSize:'10px',  margin:'0px 0px 0px 0px',})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
    },
  });
  var titleColorBar = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize:'12px',
      margin:'0px 0px 0px 0px',
      backgroundColor:'ffffff00'
    }
  });
  return ui.Panel({
    widgets:[titleColorBar, colorbar, legendLabels],
    layout:ui.Panel.Layout.flow('vertical'),
    style:{
      backgroundColor:'ffffff00',
      margin:'0px 0px 0px 0px',
      width:'320px'
    }
  });
}
var bar_frequence = colorBar(visParams.frequencia.palette,['1','18','36'],'Frequencia da area queimada (1985 - 2020)');
var bar_distance = colorBar(visParams.borda.palette,['1 km','25 km', '50 km'],'Distancia das classes antrópicas');
var panel = ui.Panel(
  [bar_frequence,bar_distance],
  ui.Panel.Layout.Flow('vertical'),
  {position:'bottom-left'}
  );
Map.add(panel);
var panelMessage = ui.Label('open source',
{position:'bottom-right',fontSize:'10px',margin:'0px 0px 0px 0px'}, 
'https://code.earthengine.google.com/57536b326a01725a61d5d1db22258776?noload=1');
Map.add(panelMessage);
var pixelArea = ee.Image.pixelArea().divide(1000000);
var convert2table = function (obj) {
    obj = ee.Dictionary(obj);
    var territory = obj.get('territory');
    var classesAndAreas = ee.List(obj.get('groups'));
    var tableRows = classesAndAreas.map(
        function (classAndArea) {
            classAndArea = ee.Dictionary(classAndArea);
            var classId = classAndArea.get('class');
            var classe = ee.Number(classId).divide(100).int();
            var mes = ee.Number(classId).mod(100).int();
            var area = classAndArea.get('sum');
            var tableColumns = ee.Feature(null)
                .set('REGION', territory)
                .set('CLASS_INT', classId)
                // .set('classe',classe)
                // .set('mes',mes)
                .set('area-km2', area)
                .set('area-km2', ee.String('a').cat(ee.String(area)))
                .set('COLLECTION', 'MapBiomas-Fogo-Mask');
            return tableColumns;
        }
    );
    return ee.FeatureCollection(ee.List(tableRows));
};
/**
 * calculando area
 */
var calculateArea = function (image, territory, geometry) {
    var reducer = ee.Reducer.sum().group(1, 'class').group(1, 'territory');
    var territotiesData = pixelArea.addBands(territory).addBands(image)
        .reduceRegion({
            reducer: reducer,
            geometry: geometry,
            scale: 30,
            maxPixels: 1e12
        });
    territotiesData = ee.List(territotiesData.get('groups'));
    var areas = territotiesData.map(convert2table);
    areas = ee.FeatureCollection(areas).flatten();
    return areas;
};
// bordas
// frequence
var image = bordas.multiply(100).add(frequence);
var territory = "projects/mapbiomas-workspace/AUXILIAR/biomas-estados-2016-raster";
territory = ee.Image(territory);
var areas = calculateArea(image, territory, geometry2);
// set additional properties
areas = areas.map(
    function (feature) {
      var distance = ee.Number(feature.get('CLASS_INT')).mod(100);
      var frequence = ee.Number(feature.get('CLASS_INT')).divide(100).int();
      var state = ee.Number(feature.get('REGION')).mod(100);
      var biome = ee.Number(feature.get('REGION')).divide(100).int();
      // var region = ee.Number(feature.get('REGION'));
        return feature.set({
          'distancia': distance,
          'frequencia': frequence,
          'ESTADO': state,
          'BIOMA': biome,
        });
    }
);
print('exemplo de feature',areas.first());
var name_export = 'distancia-frequencia-do-fogo-v3';
Export.table.toDrive({
    collection: areas,
    description: name_export,
    folder: 'mapbiomas-fogo',
    fileNamePrefix: name_export,
    fileFormat: 'CSV'
});