var katingan = ui.import && ui.import("katingan", "table", {
      "id": "users/bobulobobi/katingan"
    }) || ee.FeatureCollection("users/bobulobobi/katingan"),
    katinganLuar = ui.import && ui.import("katinganLuar", "table", {
      "id": "users/bobulobobi/area_luar"
    }) || ee.FeatureCollection("users/bobulobobi/area_luar"),
    dataset = ui.import && ui.import("dataset", "image", {
      "id": "UMD/hansen/global_forest_change_2021_v1_9"
    }) || ee.Image("UMD/hansen/global_forest_change_2021_v1_9"),
    polygonParam = ui.import && ui.import("polygonParam", "imageVisParam", {
      "params": {
        "opacity": 0.28,
        "bands": [
          "vis-red",
          "vis-green",
          "vis-blue"
        ],
        "gamma": 1
      }
    }) || {"opacity":0.28,"bands":["vis-red","vis-green","vis-blue"],"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.75825748096791,
                -1.9006771302759538
              ],
              [
                112.75825748096791,
                -3.2505989940501525
              ],
              [
                113.60969791065541,
                -3.2505989940501525
              ],
              [
                113.60969791065541,
                -1.9006771302759538
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
        [[[112.75825748096791, -1.9006771302759538],
          [112.75825748096791, -3.2505989940501525],
          [113.60969791065541, -3.2505989940501525],
          [113.60969791065541, -1.9006771302759538]]], null, false);
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
// Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var vis = {
  bands: ['lossyear'],
  min: 0,
  max: 21,
  palette: ['yellow', 'red']
};
Map.addLayer(dataset.clip(katinganLuar), vis, 'tree loss year');
Map.addLayer(katingan.draw({color: 'yellow', strokeWidth: 1}), polygonParam, 'Area Katingan Project');
Map.addLayer(katinganLuar.draw({color: 'blue', strokeWidth: 1}), polygonParam, 'Zona Project');
// Map.addLayer(katingan)
// Map.addLayer(katinganLuar)
Map.centerObject(geometry)
//===================make data===============================
var areaImage = ee.Image.pixelArea().addBands(
      dataset.select('lossyear'))
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: katingan.geometry(),
    scale: 30.92,
    maxPixels: 1e10
    }); 
var areas2 = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: katinganLuar.geometry(),
    scale: 30.92,
    maxPixels: 1e10
    }); 
print (areas2)
var classAreas = ee.List(areas.get('groups'))
var classAreas2 = ee.List(areas2.get('groups'))
print (classAreas2)
var fun =  function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).add(2000).format()
  var area = ee.Number(
    areaDict.get('sum')).divide(1e4)
  return ee.List([classNumber, area])
}
var classAreaLists = classAreas.map(fun)
var classAreaLists2 = classAreas2.map(fun)
print (classAreaLists2)
//======================Table================================
// Define a DataTable using a JavaScript array with a column property header.
var header = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Forest Area Loss', role: 'data', type: 'number'},
    // {label: 'Forest Area Loss in Katingan Area', role: 'data', type: 'number'}
    ]]
var dataTable= ee.List(header).cat(classAreaLists)
print(dataTable)
var dataTable2= ee.List(header).cat(classAreaLists2)
//===================================================
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px',
    position: 'middle-left'
  }
});
dataTable.evaluate(function(dataTableClient) {
  var chart = ui.Chart(dataTableClient).setChartType('ColumnChart').setOptions({
    title: 'Forest lost in Katingan Project',
    hAxis: {
      title: 'Year',
      titleTextStyle: {italic: false, bold: true},
    },
    vAxis: {
      title: 'Forest Area Loss (Ha)',
      titleTextStyle: {italic: false, bold: true}
    },
    lineWidth: 5,
    colors: ['e37d05', '1d6b99'],
  });
  //print(chart);
  var chartPanel= panel.add(chart)
  Map.add(chartPanel)
});
dataTable2.evaluate(function(dataTableClient) {
  var chart = ui.Chart(dataTableClient).setChartType('ColumnChart').setOptions({
    title: "Forest lost in Katingan Project's surrounding area",
    hAxis: {
      title: 'Year',
      titleTextStyle: {italic: false, bold: true},
    },
    vAxis: {
      title: 'Forest Area Loss (Ha)',
      titleTextStyle: {italic: false, bold: true}
    },
    lineWidth: 5,
    colors: ['e37d05', '1d6b99'],
  });
  //print(chart);
  var chartPanel= panel.add(chart)
  //Map.add(chartPanel)
});
//============Legend=========================
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
  style: {
    stretch: 'horizontal', 
    margin: '0px 8px', 
    maxHeight: '24px'
  },
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min+2000, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max-vis.min) / 2+vis.min+2000+.5),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max+2000, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Forest Lost Year',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);