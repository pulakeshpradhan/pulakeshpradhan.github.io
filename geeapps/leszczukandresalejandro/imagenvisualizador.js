var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B4",
          "SR_B3",
          "SR_B2"
        ],
        "min": 0.007184999999999997,
        "max": 0.145015,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":0.007184999999999997,"max":0.145015,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -54.75394342989169,
                -26.892267895932715
              ],
              [
                -54.81986139864169,
                -26.985312902429264
              ],
              [
                -54.24033259004794,
                -27.11251303342322
              ],
              [
                -54.21561335176669,
                -26.906964316249393
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-54.75394342989169, -26.892267895932715],
          [-54.81986139864169, -26.985312902429264],
          [-54.24033259004794, -27.11251303342322],
          [-54.21561335176669, -26.906964316249393]]], null, false);
///////////////////////////////////////////////////////////////
//                    1) Import Layers of Interest           //
///////////////////////////////////////////////////////////////
var dataset = ee.ImageCollection('LANDSAT/LM01/C01/T2')
                  .filterDate('1973-01-01', '1973-12-31')
                  .filterMetadata('CLOUD_COVER', 'Less_Than', 10);
var nearInfrared321 = dataset.select(['B4', 'B5', 'B6']);
var nearInfrared321Vis = {};
 var bandas = ['B4', 'B5', 'B6']
var nearInfrared321 = ee.Image(nearInfrared321.median())
var opciones = { 
  title: ' Histograma Sentinel 2 ',
  fontSize: 20,
  hAxis: {title: 'Long. Onda'},
  vAxis: {title: 'Frecuencia'},
  series: { 0: {color: 'blue'} }
}; 
var histograma = ui.Chart.image.histogram(nearInfrared321.select(['B4', 'B5', 'B6']),
                 geometry, 60)
                 .setSeriesNames(bandas)
                 .setOptions(opciones); 
print(histograma)
// Landsat 9
var dataset_l9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterDate('2022-01-01', '2022-03-01')
    .filterMetadata('CLOUD_COVER', 'Less_Than', 30);
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
dataset = dataset_l9.map(applyScaleFactors);
var visualization = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
var bandas = ['B5', 'B4', 'B5']
var ext1973 = ui.Map.Layer(nearInfrared321, {
  min: [16,38,16],
  max: [38,50,38],
  bands: bandas }, 'Near Infrared (321)', false)
Map.add(ext1973)
var ext2022 = ui.Map.Layer(dataset, imageVisParam, 'L9 True Color (432)', false)
Map.add(ext2022)
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Visualizador LANDSAT', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'Esta es una app desarrollada por la cátedra de teledetección',
    {fontSize: '15px'});
var text2 = ui.Label('TUSIGyT', {fontSize: '15px'});
var autores = ui.Label('Leszczuk, Andrés Alejandro; Valdez, Mariano; Loran, Damian; Hildt, Eduardo',{fontSize: '15px'})
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Seleccione una imagen',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(text2).add(autores).add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
var extLabel = ui.Label({value:'Imagen por año',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var extCheck = ui.Checkbox('1973 (LANDSAT 1)').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('2022 (LANDSAT 9)').setValue(false);
panel.add(extCheck)
      .add(extCheck2)
// Funcionalidad
//Extent 1973
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  ext1973.setShown(checked)
  })
}
doCheckbox();
//Extent 2022
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  ext2022.setShown(checked)
  })
}
doCheckbox2();