var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-ogordienko112/assets/buffer"
    }) || ee.FeatureCollection("projects/ee-ogordienko112/assets/buffer"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "projects/ee-ogordienko112/assets/naturalWOOD"
    }) || ee.FeatureCollection("projects/ee-ogordienko112/assets/naturalWOOD"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-ogordienko112/assets/Existing_FarmingClipped"
    }) || ee.FeatureCollection("projects/ee-ogordienko112/assets/Existing_FarmingClipped");
var mapNameLabel = ui.Label('Limassol NDVI map', {
  fontWeight: 'bold',
  fontSize: '18px',
  margin: '10px'
});
Map.add(mapNameLabel);
Map.addLayer(table,{},'Border',false);
Map.centerObject(table,9);
var visParams_ndvi = {min: -0.2, max: 0.8, palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
    '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'};
var year2022_2023 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2022-09-01','2023-03-01')
  .median()
  .clip(table);
var year2022_2023_ndvi = year2022_2023.normalizedDifference(['B8','B4']);
Map.addLayer(year2022_2023_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2022-2023');
///////////////////////
var year2021_2022 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2021-09-01','2022-03-01')
  .median()
  .clip(table);
var year2021_2022_ndvi = year2021_2022.normalizedDifference(['B8','B4']);
Map.addLayer(year2021_2022_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2021-2022');
///////////////////
var year2020_2021 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2020-09-01','2021-03-01')
  .median()
  .clip(table);
var year2020_2021_ndvi = year2020_2021.normalizedDifference(['B8','B4']);
Map.addLayer(year2020_2021_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2020-2021');
///////////////////////
var year2019_2020 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2019-09-01','2020-03-01')
  .median()
  .clip(table);
var year2019_2020_ndvi = year2019_2020.normalizedDifference(['B8','B4']);
Map.addLayer(year2019_2020_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2019-2020');
///////////////////////
var year2018_2019 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2018-09-01','2019-03-01')
  .median()
  .clip(table);
var year2018_2019_ndvi = year2018_2019.normalizedDifference(['B8','B4']);
Map.addLayer(year2018_2019_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2018-2019');
///////////////////////
var year2017_2018 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate('2017-09-01','2018-03-01')
  .median()
  .clip(table);
var year2017_2018_ndvi = year2017_2018.normalizedDifference(['B8','B4']);
Map.addLayer(year2017_2018_ndvi,visParams_ndvi,'Sentinel-2 NDVI 2017-2018');
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
Map.add(legend); 
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette =['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400',
    '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301'
];
var names = ['',
'',
'',
'',
'',
'',
'','','','','','','','','',' ',''];
for (var i = 0; i < 17; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.addLayer(table3,{},'Forest');
var styleParams = {
  fillColor: 'FF000000',
  color: '00ff00', 
  width: 1.0,
};
var Farmers = table2.style(styleParams);
Map.addLayer(Farmers,{}, 'Farmers'); 
var uiText = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px',
    width: '25%',
    height: '25%',
    maxHeight: '25%'
  }
});
Map.add(uiText);
var textLabel = ui.Label('This map shows the NDVI for each season. Start of the season is September, and the end of the season is March. The map displays existing farmers, as well as the forests, highlighting the NDVI values that are not needed.', {
  fontWeight: 'bold',
  fontSize: '16px',
  margin: '0',
  whiteSpace: 'pre-wrap'
});
uiText.add(textLabel);