var ESA_2020 = ui.import && ui.import("ESA_2020", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100"),
    ESA_2021 = ui.import && ui.import("ESA_2021", "imageCollection", {
      "id": "ESA/WorldCover/v200"
    }) || ee.ImageCollection("ESA/WorldCover/v200"),
    ESRI = ui.import && ui.import("ESRI", "imageCollection", {
      "id": "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS"),
    DynamicWorld = ui.import && ui.import("DynamicWorld", "imageCollection", {
      "id": "GOOGLE/DYNAMICWORLD/V1"
    }) || ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// global landcover datasets comparison
// NOTES:
/*
to-do:
- histogram
  - scale?
    - fixed at 10m? but slow / not working for large areas?
    - dynamic based on map zoom? notify user of scale
      -> requires reprojecting with mode resampling?
- enable remapping/restyling by user?
- ...
*/
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// visual parameters
var ESA_remap_in = [10,20,30,40,50,60,70,80,90,95,100];
var ESA_remap_out = [1,2,3,4,5,6,7,8,9,10,11];
var ESA_names  = ["Trees","Shrubland","Grassland","Cropland","Built-up","Barren / sparse vegetation","Snow and ice","Open water","Herbaceous wetland","Mangroves","Moss and lichen"];
var ESA_colors = ["#006400","#ffbb22","#ffff4c","#f096ff","#fa0000","#b4b4b4","#f0f0f0","#0064c8","#0096a0","#00cf75","#fae6a0"];
var ESRI_remap_in = [1,2,4,5,7,8,9,10,11];
var ESRI_remap_out = [1,2,3,4,5,6,7,8,9];
var ESRI_names = ['Water','Trees','Flooded vegetation','Crops','Built area','Bare ground','Snow/ice','Clouds','Rangeland'];
// var ESRI_colors = ["#1A5BAB","#358221","#87D19E","#FFDB5C","#ED022A","#EDE9E4","#F2FAFF","#C8C8C8","#C6AD8D"];  // original
var ESRI_colors = ["#0064c8","#006400","#0096a0","#f096ff","#fa0000","#b4b4b4","#f0f0f0","#000000","#ffff4c"];  // matching ESA's (except clouds, new)
var DW_remap_out = [0,1,2,3,4,5,6,7,8];
var DW_names = ['Water','Trees','Grass','Flooded vegetation','Crops','Shrub and scrub','Built','Bare','Snow and ice'];
// var DW_colors = ['#419BDF', '#397D49', '#88B053', '#7A87C6', '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];  // original
var DW_colors = ['#0064c8', '#006400', '#ffff4c', '#0096a0', '#f096ff', '#ffbb22', '#fa0000', '#b4b4b4', '#f0f0f0'];  // matching ESA's
var visParams_DW = {min:0, max:8, palette: DW_colors};
var visParams_ESRI = {min:ESRI_remap_out[0], max:ESRI_remap_out[ESRI_remap_out.length-1], palette: ESRI_colors};
var visParams_ESA = {min:ESA_remap_out[0], max:ESA_remap_out[ESA_remap_out.length-1], palette:ESA_colors};
// var all_classes = ee.List(ESA_names).cat(ee.List(ESRI_names)).cat(ee.List(DW_names)).distinct();
// print(all_classes);
// var all_classes = [
//   'Water','Trees','Grassland','Cropland','Built','Bare','Snow and ice','Shrubland',
//   'Flooded vegetation','Herbaceous wetland','Mangroves','Moss and lichen','Clouds',
//   'Rangeland'
// ];
// var default_map = {
//   'Trees': 'Trees',
//   'Shrubland': 'Shrubland',
//   'Grassland': 'Grassland',
//   'Cropland': 'Cropland',
//   'Built-up': 'Built',
//   'Barren / sparse vegetation': 'Bare',
//   'Snow and ice': 'Snow and ice',
//   'Open water': 'Water',
//   'Herbaceous wetland': 'Herbaceous wetland',
//   'Mangroves': 'Mangroves',
//   'Moss and lichen': 'Moss and lichen',
//   'Water': 'Water',
//   'Flooded vegetation': 'Flooded vegetation',
//   'Crops': 'Cropland',
//   'Built area': 'Built',
//   'Bare ground': 'Bare',
//   'Snow/ice': 'Snow and ice',
//   'Clouds': 'Clouds',
//   'Rangeland': 'Rangeland',
//   'Grass': 'Grassland',
//   'Shrub and scrub': 'Shrubland',
//   'Built': 'Built',
//   'Bare': 'Bare'
// };
var all_classes = [
  // 1       2           3              4               5       6       7         8
  'Trees','Cropland','Rangeland','Flooded vegetation','Water','Built','Bare','Snow and ice'
];
var all_colors = [
  "#006400","#f096ff","#ffff4c","#0096a0","#0064c8","#fa0000","#b4b4b4","#f0f0f0"
];
var ESA_align_map  = [1,3,3,2,6,7,8,5,4,4,3];
var ESRI_align_map = [5,1,4,2,6,7,8,0,3];
var DW_align_map   = [5,1,3,4,2,3,6,7,8];
var visParams_aligned = {min:1, max:8, palette:all_colors};
// legend(s)
var dict_ESA = {"names": ESA_names, "colors": ESA_colors};
var dict_ESRI = {"names": ESRI_names, "colors": ESRI_colors};
var dict_DW = {"names": DW_names, "colors": DW_colors};
// UI functionalities
var fontsize_title  = '20px';
var fontsize_sub    = '14px';
var fontsize_text   = '12px';
var fontsize_small  = '11px';
var CHARTDELAY = 500;  //  500 milliseconds (0.5 seconds)
// ----------------------------------------------------------------------------------------- //
// Functions
// ----------------------------------------------------------------------------------------- //
// legend
function createLegend(panel, dict, title) {
  var legendTitle = ui.Label({
    value: title,
    style: {fontWeight:'bold', fontSize:'18px', margin:'0 0 4px 0', padding: '0'}
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  var makeRow = function(color, name) {
    var colorBox = ui.Label({style: {backgroundColor:color, padding:'8px', margin:'0 0 4px 0'}});
    var description = ui.Label({value:name, style: {margin:'0 0 4px 6px'}});
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  // Map.add(panel);
  return panel;
}
// alignment
// function createAlign(class_names) {
//   var panel = ui.Panel();
//   var makeRow = function(name) {
//     // var colorBox = ui.Label({style: {backgroundColor:color, padding:'8px', margin:'0 0 4px 0'}});
//     var descr = ui.Label({value:name+':', style: {margin:'0 0 4px 6px'}});
//     var row_select = ui.Select({items:all_classes, value:default_map[name]});
//     return ui.Panel({
//       // widgets: [colorBox, descr],
//       widgets: [descr, row_select],
//       layout: ui.Panel.Layout.Flow('horizontal')
//     });
//   };
//   for (var i = 0; i < class_names.length; i++) {
//     panel.add(makeRow(class_names[i]));
//   }
//   return panel;
// }
// drawing tools
var drawingTools = Map.drawingTools();  // get the drawing tools widget object
drawingTools.setShown(false);  // hide by default to customize
// clear existing geometries
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
// geometry clearing and drawing functions
function clearGeometry() {
  var layers = drawingTools.layers();
  // layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  layers.get(0).geometries().reset();
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawNone() {
  clearGeometry();
  drawingTools.setShape(null);
  chart_panel.widgets().reset();
  chart_panel.style().set('shown', false);
}
// landcover histogram chart
function chartHist() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chart_panel.style().get('shown')) {
    chart_panel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Construct image with different land cover datasets as bands.
  // var ESA_2021_aoi = ESA_2021.filterBounds(aoi).mosaic().clip(aoi);
  // var ESRI_2021_aoi = ESRI_2021.filterBounds(aoi).mosaic().clip(aoi);
  // var DW_2021_aoi = DW_2021.clip(aoi);
  var ESA_2020_aoi = ESA_2020_aligned.filterBounds(aoi).mosaic().clip(aoi).selfMask();
  var ESA_2021_aoi = ESA_2021_aligned.filterBounds(aoi).mosaic().clip(aoi).selfMask();
  var ESRI_2020_aoi = ESRI_2020_aligned.filterBounds(aoi).mosaic().clip(aoi).selfMask();
  var ESRI_2021_aoi = ESRI_2021_aligned.filterBounds(aoi).mosaic().clip(aoi).selfMask();
  var DW_2020_aoi = DW_2020_aligned.clip(aoi).selfMask();
  var DW_2021_aoi = DW_2021_aligned.clip(aoi).selfMask();
  var image_2020 = ESA_2020_aoi.rename('WorldCover').addBands(DW_2020_aoi.rename('DynamicWorld')).addBands(ESRI_2020_aoi.rename('ESRI'));
  var image_2021 = ESA_2021_aoi.rename('WorldCover').addBands(DW_2021_aoi.rename('DynamicWorld')).addBands(ESRI_2021_aoi.rename('ESRI'));
  // print(image_2021);
  // Map.addLayer(image.select('WorldCover'), visParams_aligned, 'for chart', true);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  print('Current map scale:', mapScale);
  var scale = ee.Number(mapScale).divide(100).round().multiply(100);
  // print('Current map scale:', scale);
  scale = scale.divide(10);
  // print('Current map scale:', scale);
  scale = scale.max(10);
  // print('Current map scale:', scale);
  // var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  print('Reducer for chart(s) scale:', scale);
  // Chart for the selected area of interest.
  var chart_data = image_2021.reduceRegion({
    // min (Float): The lower (inclusive) bound of the first bucket.
    // max (Float): The upper (exclusive) bound of the last bucket.
    // steps (Integer): The number of buckets to use.
    // cumulative (Boolean, default: false): When true, generates a cumulative histogram
    // reducer: ee.Reducer.fixedHistogram(min, max, steps, cumulative),
    reducer: ee.Reducer.fixedHistogram(1, 9, 8),
    geometry: aoi,
    scale: scale,
    // crs: ,
    // crsTransform: ,
    // bestEffort: ,
    maxPixels: 1e12,
    // tileScale: 
  });
  // print(chart_data);
  // print(chart_data.values());
  var chart_data_y = chart_data.values().map(function(i) {return ee.Array(i).transpose().toList().get(1)}).unzip();
  // print(chart_data_y);
  // var chart = ui.Chart.image.histogram({
  //   image: image_2021,
  //   region: aoi,
  //   scale: scale,
  //   // maxBuckets: ,
  //   // minBucketWidth: ,
  //   // maxRaw: ,
  //   maxPixels: 1e12
  // });
  var chart = ui.Chart.array.values(chart_data_y, 0, all_classes)
  .setSeriesNames(chart_data.keys())
  .setChartType('ColumnChart')
  // .setOptions({
  //   // titlePostion: 'none',
  //   // legend: {position: 'none'},
  //   hAxis: {title: ''},
  //   vAxis: {title: 'Frequency'},
  //   // series: {
  //   //   0: {color: '23cba7'}
  //   // }
  // });
  // Replace the existing chart in the chart panel with the new chart.
  // chart_panel.widgets().reset([chart]);
  scale.evaluate(function(val, err) {
    chart_panel.widgets().reset([chart.setOptions({
      title:'Landcover classes within drawn geometry calculated at ' + val + 'm.',
      hAxis: {title: ''},
      vAxis: {title: 'Frequency'},
    })]);
  });
}
// drawing tools listener to create charts
// (note that ui.util.debounce wraps the function to reduce the frequency of it being invoked while drawing and editing a geometry)
drawingTools.onDraw(ui.util.debounce(chartHist, CHARTDELAY));
drawingTools.onEdit(ui.util.debounce(chartHist, CHARTDELAY));
// ----------------------------------------------------------------------------------------- //
// UI
// ----------------------------------------------------------------------------------------- //
// intro text
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Global Landcover Explorer',
    style: {fontSize:fontsize_title, fontWeight:'bold'}
  }),
  // intro text
  ui.Label({
    value: "Application for comparing global landcover datasets (WorldCover, Dynamic World and ESRI's global maps). Visualizations matched to WorldCover styling to facilitate visual comparison.",
    style: {fontSize:fontsize_text, padding:'0px', margin:'0px 0px 0px 8px'}
  }),
  // extra text
  // ui.Label({
  //   value: "WORK-IN-PROGRESS",
  //   style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
  // })
]);
// datasets alignment
// var align_control = ui.Panel([
// ]);
// var base_ESA = ui.Panel([
//   ui.Label(ESA_remap_out)
// ]);
// function updateAlign(name) {
//   align_control.clear();
//   align_control.add(ui.Label(name));
//   align_control.add(base_ESA);
// }
var align_panel = ui.Panel();
// var align_panel = ui.Panel([
//   ui.Label('Dataset alignment:', {fontSize:fontsize_sub, fontWeight:'bold'}),
//   ui.Panel({
//     widgets: [
//       // ui.Label('Choose base:', {fontSize:fontsize_text}),
//       // ui.Select({items: ['WorldCover', 'Dynamic World', 'ESRI'], value:'WorldCover', onChange:updateAlign}),
//       createAlign(ESA_names)
//     ],
//     layout: ui.Panel.Layout.flow('horizontal')
//   }),
//   align_control
// ]);
// add placeholder geometry
var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
// drawing tools symbols
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  none: ' '
};
// drawing tools control
var drawing_control = ui.Panel({
  widgets: [
    ui.Label('Charts:', {fontSize:fontsize_sub, fontWeight:'bold'}),
    ui.Label('Datasets aligned into eight matching classes for chart calculations (rangeland = grassland + scrub/shrub).', {fontSize:fontsize_small}),
    ui.Label('Calculation scale based on map zoom level to improve speed and avoid memory/timeout errors.', {fontSize:fontsize_small}),
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.none + ' None',
      onClick: drawNone,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  // style: {position: 'bottom-left'}
  layout: null,
});
// legend
var legend_title = ui.Label('Legends:', {fontSize:fontsize_sub, fontWeight:'bold'});
var legend = ui.Panel({
  style: {
    // position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend_panel = createLegend(legend, dict_ESA, 'WorldCover');
legend_panel = createLegend(legend_panel, dict_ESRI, 'ESRI');
legend_panel = createLegend(legend_panel, dict_DW, 'Dynamic World');
// chart(s)
// var chart_panel = ui.Panel({style: {height: '235px', width: '600px', position: 'bottom-center', shown: false}});
var chart_panel = ui.Panel({style: {shown:false}});
// outro text
var outro = ui.Panel([
  ui.Label('References:', {fontSize:fontsize_sub, fontWeight:'bold'}),
  // WorldCover attribution/references
  ui.Panel([
    ui.Label({
      value: "WorldCover",
      targetUrl: "https://esa-worldcover.org/en",
      style: {fontSize:fontsize_text, fontWeight:'bold', padding:'0px', margin:'3px 0px 0px 8px'}
    }),
    ui.Label({
      value: "© ESA WorldCover project [2020-2021] / Contains modified Copernicus Sentinel data [2020-2021] processed by ESA WorldCover consortium.",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Zanaga et al. (2021). ESA WorldCover 10 m 2020 v100",
      targetUrl: "https://doi.org/10.5281/zenodo.5571936",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Zanaga et al. (2022). ESA WorldCover 10 m 2021 v200",
      targetUrl: "https://doi.org/10.5281/zenodo.7254221",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    })
  ]),
  // ESRI landcover attribution/references
  ui.Panel([
    ui.Label({
      value: "ESRI landcover",
      targetUrl: "https://www.arcgis.com/home/item.html?id=d3da5dd386d140cf93fc9ecbf8da5e31",
      style: {fontSize:fontsize_text, fontWeight:'bold', padding:'0px', margin:'3px 0px 0px 8px'}
    }),
    ui.Label({
      value: "This dataset was produced by Impact Observatory for Esri. © 2021 Esri. Contains modified Copernicus Sentinel data [2017-2021].",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Karra, Kontgis, et al. (2021). “Global land use/land cover with Sentinel-2 and deep learning.” IGARSS 2021-2021 IEEE International Geoscience and Remote Sensing Symposium.",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Data curated in GEE by Samapriya Roy.",
      targetUrl: "https://gee-community-catalog.org/projects/S2TSLULC/",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    })
  ]),
  // Dynamic World attribution/references
  ui.Panel([
    ui.Label({
      value: "Dynamic World",
      targetUrl: "https://dynamicworld.app/",
      style: {fontSize:fontsize_text, fontWeight:'bold', padding:'0px', margin:'3px 0px 0px 8px'}
    }),
    ui.Label({
      value: "This dataset is produced for the Dynamic World Project by Google in partnership with National Geographic Society and the World Resources Institute. Contains modified Copernicus Sentinel data [2015-present].",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Brown et al. (2022). Dynamic World, Near real-time global 10 m land use land cover mapping. Sci Data 9, 251.",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "doi:10.1038/s41597-022-01307-4",
      targetUrl: "https://doi.org/10.1038/s41597-022-01307-4",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    })
  ]),
  // Geometry drawing attribution/references
  ui.Panel([
    ui.Label({
      value: "Geometry drawing functions from GEE community tutorials.",
      targetUrl: "https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    })
  ]),
  // contact information
  ui.Panel([
    ui.Label({
      value: "For more information, feedback and comments please contact arjen.haag@deltares.nl.",
      style: {fontSize:fontsize_small, padding:'0px', margin:'0px 0px 0px 8px'}
    })
  ])
]);
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, align_panel, drawing_control, chart_panel, legend_title, legend_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '320px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------- //
// Processing
// ----------------------------------------------------------------------------------------- //
// remap WorldCover
function remapESA(img) {
  return img.remap(ESA_remap_in, ESA_remap_out);
}
ESA_2020 = ESA_2020.map(remapESA);
ESA_2021 = ESA_2021.map(remapESA);
// calculate yearly composite for Dynamic World
var DW_2020 = DynamicWorld.filterDate('2020-01-01','2021-01-01').select('label').mode();
var DW_2021 = DynamicWorld.filterDate('2021-01-01','2022-01-01').select('label').mode();
// get ESRI yearly maps
function remapESRI(img) {
  return img.remap(ESRI_remap_in, ESRI_remap_out);
}
ESRI = ESRI.map(remapESRI);
var ESRI_2020 = ESRI.filterDate('2020-01-01','2021-01-01');
var ESRI_2021 = ESRI.filterDate('2021-01-01','2022-01-01');
// align datasets
function remapAlign(ic, remap_in, remap_out) {
  return ic.map(function(img) {
    return img.remap(remap_in, remap_out);
  });
}
var ESA_2020_aligned = remapAlign(ESA_2020, ESA_remap_out, ESA_align_map);
var ESA_2021_aligned = remapAlign(ESA_2021, ESA_remap_out, ESA_align_map);
var ESRI_2020_aligned = remapAlign(ESRI_2020, ESRI_remap_out, ESRI_align_map);
var ESRI_2021_aligned = remapAlign(ESRI_2021, ESRI_remap_out, ESRI_align_map);
var DW_2020_aligned = DW_2020.remap(DW_remap_out, DW_align_map);
var DW_2021_aligned = DW_2021.remap(DW_remap_out, DW_align_map);
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
// Map.add(legend_panel);
// Map.add(drawing_control);
// Map.add(chart_panel);
Map.addLayer(ESA_2020, visParams_ESA, 'ESA 2020', false);
Map.addLayer(ESA_2021, visParams_ESA, 'ESA 2021', true);
Map.addLayer(ESRI_2020, visParams_ESRI, 'ESRI 2020', false);
Map.addLayer(ESRI_2021, visParams_ESRI, 'ESRI 2021', false);
Map.addLayer(DW_2020, visParams_DW, 'DW 2020', false);
Map.addLayer(DW_2021, visParams_DW, 'DW 2021', false);
Map.addLayer(ESA_2020_aligned, visParams_aligned, 'ESA 2020 (aligned)', false);
Map.addLayer(ESA_2021_aligned, visParams_aligned, 'ESA 2021 (aligned)', false);
Map.addLayer(ESRI_2020_aligned, visParams_aligned, 'ESRI 2020 (aligned)', false);
Map.addLayer(ESRI_2021_aligned, visParams_aligned, 'ESRI 2021 (aligned)', false);
Map.addLayer(DW_2020_aligned, visParams_aligned, 'DW 2020 (aligned)', false);
Map.addLayer(DW_2021_aligned, visParams_aligned, 'DW 2021 (aligned)', false);