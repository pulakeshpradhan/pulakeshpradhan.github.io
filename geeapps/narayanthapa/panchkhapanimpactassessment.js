var study_area = ui.import && ui.import("study_area", "table", {
      "id": "projects/ee-narayanthapa/assets/panchkhapan"
    }) || ee.FeatureCollection("projects/ee-narayanthapa/assets/panchkhapan"),
    rainfall_boundaries = ui.import && ui.import("rainfall_boundaries", "table", {
      "id": "projects/ee-narayanthapa/assets/upstream_area"
    }) || ee.FeatureCollection("projects/ee-narayanthapa/assets/upstream_area"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-narayanthapa/assets/hewa_khola_20m"
    }) || ee.FeatureCollection("projects/ee-narayanthapa/assets/hewa_khola_20m");
 /**
 * Example: Earth Engine App for a flood mapping and asessement 
 *  
 * This script demonstrates how to make a basic Earth Engine App that could
 * accompany a published research paper.
 * 
 * @author Narayan Thapa (thapannn@gmail.com)
 */
 /** 
  Model section
  */
var m={};
//cloudmask
var sentinel= ee.ImageCollection("COPERNICUS/S2");
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//using sentinel
var get_image= function get_image(image, pre_start, pre_end){
  var img= image.filterDate(pre_start,pre_end).filterBounds(geometry)
                  .map(maskS2clouds);
  return img
}
var pre_image19= get_image(sentinel, '2023-07-06', '2023-07-11').median().clip(geometry)
//print(pre_image19)
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
// function to calculate flooded region
var flooded= function(image){
  var ndvi= image.normalizedDifference(['B8','B4']);
  var flood_ndvi= ndvi.lte(0). selfMask();
  return flood_ndvi
}
// for debris
var debris = function(image){
  var ndvi= image.normalizedDifference(['B8','B4']);
  var debris_flow= ndvi.lte(0.06).selfMask();
  return debris_flow
}
var ndvi_flood_19= flooded(pre_image19)
var ndvi_debris_19 = debris(pre_image19)
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var rgb= pre_image19.visualize(visualization);
var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY');
var timeseries= dataset.filter(ee.Filter.date('2023-01-01', '2023-06-30')).select('precipitation');
var precipitation_chart = ui.Chart.image.doySeries(
  {
    imageCollection:timeseries, region:rainfall_boundaries, regionReducer:ee.Reducer.sum(), scale:5566, yearReducer:ee.Reducer.sum(), startDay:1, endDay:365
  })
var landuse = ee.ImageCollection('ESA/WorldCover/v200').first().clip(study_area);
// // Damage assessment:
var crops=landuse.eq(40).selfMask();
var bareland=landuse.eq(60).selfMask();
var tree=landuse.eq(10).selfMask();
var urban= landuse.eq(50).selfMask();
var water= landuse.eq(80).selfMask();
var grassland= landuse.eq(30).selfMask();
// prpearing charts
// estimating flood
var stats = ndvi_debris_19.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10,
  tileScale: 16
})
var flood_area_ha =ee.Number(stats.get('nd')).divide(10000).round();
// Bare land//
var floodedbareland=bareland.mask(ndvi_debris_19).updateMask(bareland);
var barestats=floodedbareland.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:geometry,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
//print(barestats)
var barestat=ee.Number(barestats.get('Map')).divide(10000).round();
//print(barestat)
// forest
var floodedtree=tree.mask(ndvi_debris_19).updateMask(tree);
var treestats=floodedtree.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:geometry,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var treestat=ee.Number(treestats.get('Map')).divide(10000).round();
//crops
var floodedcrops=crops.mask(ndvi_debris_19).updateMask(crops);
var cropstats = floodedcrops.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10,
  tileScale: 16
})
var cropstat =ee.Number(cropstats.get('Map')).divide(10000).round();
// Urbans
var floodedurban=urban.mask(ndvi_debris_19).updateMask(urban);
var urbanstats=floodedurban.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:geometry,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var urbanstat=ee.Number(urbanstats.get('Map')).divide(10000);
// grassland
var floodedgrassland=grassland.mask(ndvi_debris_19).updateMask(grassland);
var grasslandstats=floodedgrassland.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:geometry,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var grasslandstat=ee.Number(grasslandstats.get('Map')).divide(10000).round();
// create charts
var assessment=ee.Dictionary({
   Urban:urbanstat,
   BareLand:barestat,
   Forest:treestat,
   Crop:cropstat,
   Grassland: grasslandstat
})
var flood_chart=ui.Chart.array.values({
  array:assessment.values(),
  axis: 0,
  xLabels:assessment.keys()
}).setChartType('PieChart')
.setOptions({
  colors:['#b4b4b4', '#f096ff', '#006400', '#ffff4c', '#FA0000',]
});
var rgblayer =ui.Map.Layer(rgb,{},'RGB');
var visualization = {
  bands: ['Map'],
};
landuse.visualize(visualization);
var landcoverlayer=ui.Map.Layer(landuse,{},'Landcover');
var floodlayer=ui.Map.Layer(ndvi_debris_19,{palette:'#000000'},'Flood')
// creating timeseries mean graph showing precipitation
// creating timeseries mean graph showing precipitation
var precipitation_chart_studyarea = ui.Chart.image.doySeries(
  {
    imageCollection:timeseries, region:study_area, regionReducer:ee.Reducer.sum(), scale:5566, yearReducer:ee.Reducer.sum(), startDay:1, endDay:365
  })
 /** 
  component section
  */
  var c={};
  c.controlPanel= ui.Panel();
  c.map= ui.Map();
  //c.map.setControlVisibility(t);
  c.map.setCenter(87.30,27.31,12);
  c.map.setOptions('SATELLITE');
    c.map.layers().set(0, rgblayer);
  c.map.layers().set(1, landcoverlayer);
  c.map.layers().set(2,floodlayer);
  // information about
  c.info={};
  c.info.titleLabel= ui.Label('Mapping the Panchkhapan Muncipality Flood 2023-06-19');
  c.info.aboutLabel= ui.Label('The sentinel 2 imagery was used to detect the flooded region and quick assessment was done using European Space Agency (ESA) WorldCover 10 m 2021. Information about the precipitation was detected using CHIRPS data. ')
  c.infoPanel= ui.Panel([c.info.titleLabel, c.info.aboutLabel]);
  c.chartPanel= ui.Panel([precipitation_chart,precipitation_chart_studyarea]);
  c.info.flood= ui.Label('Estimated flood extent: 233 hectar');
  c.info.chart=ui.Label("Impact assessement using Land cover ih hectar");
  c.chart_assesemnt= ui.Panel([flood_chart]);
  c.floodPanel=ui.Panel([c.info.flood,c.info.chart]);
  // print(c.infoPanel);
   // adding charts to the control panel
  // 
  // c.preci.chartUpstream= 
 /** 
  composition section
  */
  ui.root.clear();
  ui.root.add(c.controlPanel);
  ui.root.add(c.map);
  c.controlPanel.add(c.infoPanel);
  c.controlPanel.add(c.chartPanel);
  c.controlPanel.add(c.floodPanel);
  c.controlPanel.add(c.chart_assesemnt);
// Add map legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Creates the content of the legend
var content = function(colour, label) {
      // Create the coloured boxes
      var box = ui.Label({
        style: {
          backgroundColor:colour,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal'),
      });
};
//  Set legend colours
var classColour = ['000000','006400','f096ff','fa0000','b4b4b4','0064c8', '#ffff4c'];
// Set legend labels
var labelName = ['Flood','Forest','Cropland','Built-up','Barrenland','Water', 'GrassLand'];
// Combine legend colour and labels
for (var i = 0; i < 7; i++) {
  legend.add(content(classColour[i], labelName[i]));
  }  
// Add legend
c.map.add(legend);
 /** 
  style section
  */
  var s={}
  c.controlPanel.style().set({
    width:'475px'
  });
  c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
s.chartStyle = {
  title: 'Precipitation in Panchakhapan, Makalu, Chichila, Bhotkhola, and Sabhapokhari using CHIRPS',
  hAxis: {
    title: 'Day of year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    title: 'Accumulated rainfall mm',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  chartArea: {backgroundColor: 'EBEBEB'}
};
s.chartStyle_study = {
  title: 'Precipitation in Panchkhapan using CHIRPS',
  hAxis: {
    title: 'Day of year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    title: 'Accumulated rainfall mm',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  chartArea: {backgroundColor: 'EBEBEB'}
};
precipitation_chart.setOptions(s.chartStyle);
precipitation_chart_studyarea.setOptions(s.chartStyle_study);
 /** 
  Behavior section
  */
   /** 
  Initialization section
  */