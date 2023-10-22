var gfs = ui.import && ui.import("gfs", "imageCollection", {
      "id": "NOAA/GFS0P25"
    }) || ee.ImageCollection("NOAA/GFS0P25"),
    aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                63.395107281668515,
                39.182170395801165
              ],
              [
                63.395107281668515,
                3.9751416895661804
              ],
              [
                97.32088853166854,
                3.9751416895661804
              ],
              [
                97.32088853166854,
                39.182170395801165
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[63.395107281668515, 39.182170395801165],
          [63.395107281668515, 3.9751416895661804],
          [97.32088853166854, 3.9751416895661804],
          [97.32088853166854, 39.182170395801165]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/LearningIIT/Countries_WGS84"
    }) || ee.FeatureCollection("users/LearningIIT/Countries_WGS84"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/LearningIIT/India_New_State"
    }) || ee.FeatureCollection("users/LearningIIT/India_New_State"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "JAXA/GPM_L3/GSMaP/v6/operational"
    }) || ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational"),
    rainaoi = ui.import && ui.import("rainaoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                62.15817811615184,
                25.157031998036537
              ],
              [
                61.98239686615184,
                0.5183418415976668
              ],
              [
                77.62692811615184,
                0.342565621297764
              ],
              [
                77.97849061615184,
                4.731711260585983
              ],
              [
                77.62692811615184,
                8.745904559397104
              ],
              [
                76.22067811615184,
                13.914673178994382
              ],
              [
                73.93552186615184,
                21.608216864844735
              ],
              [
                71.47458436615184,
                22.909637864982535
              ],
              [
                66.55270936615184,
                25.157031998036537
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[62.15817811615184, 25.157031998036537],
          [61.98239686615184, 0.5183418415976668],
          [77.62692811615184, 0.342565621297764],
          [77.97849061615184, 4.731711260585983],
          [77.62692811615184, 8.745904559397104],
          [76.22067811615184, 13.914673178994382],
          [73.93552186615184, 21.608216864844735],
          [71.47458436615184, 22.909637864982535],
          [66.55270936615184, 25.157031998036537]]]),
    era5 = ui.import && ui.import("era5", "imageCollection", {
      "id": "ECMWF/ERA5/DAILY"
    }) || ee.ImageCollection("ECMWF/ERA5/DAILY");
// Define an area of interest geometry with a global non-polar extent.
var geometry=table2;
var geometry1=table2.filterMetadata('stname','equals' ,'MAHARASHTRA');
var start=ee.Date.fromYMD(2020,05,30);
var end=ee.Date.fromYMD(2020,06,05);
//Map.addLayer(geometry);   
Map.setCenter(70.78, 14.55,3)
//////////-----------GPM---------------- ///////////////
// Define a base collection.
var pcp = ee.ImageCollection("NASA/GPM_L3/IMERG_V06").select('precipitationCal')
.filterDate(start, end);
// Calc number of days between start and end dates.
var nDays = ee.Number(end.difference(start, 'day'));
// Enumerate a list of days.
var daysList = ee.List.sequence(0, nDays.subtract(1));
// Map over the list of days to make daily sum composites.
var pcpDayList = daysList.map(function(dayN){
  var t1 = start.advance(ee.Number(dayN), 'day');
  var t2 = t1.advance(1, 'day');
  var dailySum = pcp.filterDate(t1, t2).max();
  var nBands = dailySum.bandNames().size();
  return dailySum
    .set({
      'system:time_start': t1.millis(),
      'nBands': nBands
    });
});
// // Check three dates.
// print('Day 0:', ee.Image(pcpDayList.get(0)).date());
// print('Day 1:', ee.Image(pcpDayList.get(1)).date());
// print('Day 2:', ee.Image(pcpDayList.get(2)).date());
// Convert image List to ImageCollection and filter out images that have no bands.
// (occurs when there are no images for a given composite day)
var pcpDayCol = ee.ImageCollection.fromImages(pcpDayList)
  .filter(ee.Filter.gte('nBands', 0));
// Print n images before and after daily compositing to check.
print('n images pcp:', pcp.size());
print('n images pcpDayCol:', pcpDayCol.size());
// Predefine the chart titles.
var title = {
  title: ' GPM Daily Max Precipitation vs Time for ',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Precipitation (mm)'},
};
var chartgpm = ui.Chart.image.seriesByRegion(pcpDayCol,rainaoi, ee.Reducer.max(), 'precipitationCal', 10000, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
var tempCol = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
                  .filter(ee.Filter.date(start, end))
                  .select('hourlyPrecipRate');
var visArgs = {
  min: 0,
  max: 30.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'orange', 'red']
};
Map.addLayer(tempCol.max().clip(aoi),visArgs,'max Precipitation',1,0.6);
// Calc number of days between start and end dates.
var nDays = ee.Number(end.difference(start, 'day'));
// Enumerate a list of days.
var daysList = ee.List.sequence(0, nDays.subtract(1));
// Map over the list of days to make daily sum composites.
var pcpDayList = daysList.map(function(dayN){
  var t1 = start.advance(ee.Number(dayN), 'day');
  var t2 = t1.advance(1, 'day');
  var dailySum = tempCol.filterDate(t1, t2).max();
  var nBands = dailySum.bandNames().size();
  return dailySum
    .set({
      'system:time_start': t1.millis(),
      'nBands': nBands
    });
});
// // Check three dates.
// print('Day 0:', ee.Image(pcpDayList.get(0)).date());
// print('Day 1:', ee.Image(pcpDayList.get(1)).date());
// print('Day 2:', ee.Image(pcpDayList.get(2)).date());
// Convert image List to ImageCollection and filter out images that have no bands.
// (occurs when there are no images for a given composite day)
var pcpDayCol = ee.ImageCollection.fromImages(pcpDayList)
  .filter(ee.Filter.gte('nBands', 0));
// Alternatively, print a URL that will produce the animation when accessed.
//print(finalVisCol.getVideoThumbURL(videoArgs));
var title = {
  title: ' GSMap daily Precipitation vs Time',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Precipitation (mm)'},
};
var chart = ui.Chart.image.seriesByRegion(pcpDayCol,rainaoi, ee.Reducer.max(), 'hourlyPrecipRate', 10000, 'system:time_start', 'SITE')
    .setOptions(title)
    .setChartType('ColumnChart');
var windCol = gfs
                  .filter(ee.Filter.date(start, end))
                  .select('u_component_of_wind_10m_above_ground');
var visArgs1 = {
  min: -10,
  max: 30.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'orange', 'red']
};
Map.addLayer(windCol.max().clip(aoi),visArgs1,'max Wind U',0,0.6)
// Map over the list of days to make daily sum composites.
var pcpDayList = daysList.map(function(dayN){
  var t1 = start.advance(ee.Number(dayN), 'day');
  var t2 = t1.advance(1, 'day');
  var dailySum = windCol.filterDate(t1, t2).max();
  var nBands = dailySum.bandNames().size();
  return dailySum
    .set({
      'system:time_start': t1.millis(),
      'nBands': nBands
    });
});
// // Check three dates.
// print('Day 0:', ee.Image(pcpDayList.get(0)).date());
// print('Day 1:', ee.Image(pcpDayList.get(1)).date());
// print('Day 2:', ee.Image(pcpDayList.get(2)).date());
// Convert image List to ImageCollection and filter out images that have no bands.
// (occurs when there are no images for a given composite day)
var winddayCol = ee.ImageCollection.fromImages(pcpDayList)
  .filter(ee.Filter.gte('nBands', 0));
var chartWind = ui.Chart.image.seriesByRegion(winddayCol,rainaoi, ee.Reducer.max(), 'u_component_of_wind_10m_above_ground',10000, 'system:time_start', 'SITE')
    .setChartType('ColumnChart');
//Map.add('Chart for Max Wind Speed (U)');
// plot the chart
//Map.add(chartWind);
var windvCol = gfs
                  .filter(ee.Filter.date(start, end))
                  .select('v_component_of_wind_10m_above_ground');
var visArgs2 = {
  min: -10,
  max: 30.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'orange', 'red']
};
Map.addLayer(windvCol.max().clip(aoi),visArgs2,'max Wind V',0,0.6)
// Map over the list of days to make daily sum composites.
var pcpDayList = daysList.map(function(dayN){
  var t1 = start.advance(ee.Number(dayN), 'day');
  var t2 = t1.advance(1, 'day');
  var dailySum = windvCol.filterDate(t1, t2).max();
  var nBands = dailySum.bandNames().size();
  return dailySum
    .set({
      'system:time_start': t1.millis(),
      'nBands': nBands
    });
});
// // Check three dates.
// print('Day 0:', ee.Image(pcpDayList.get(0)).date());
// print('Day 1:', ee.Image(pcpDayList.get(1)).date());
// print('Day 2:', ee.Image(pcpDayList.get(2)).date());
// Convert image List to ImageCollection and filter out images that have no bands.
// (occurs when there are no images for a given composite day)
var windvdayCol = ee.ImageCollection.fromImages(pcpDayList)
  .filter(ee.Filter.gte('nBands', 0));
var chartvWind = ui.Chart.image.seriesByRegion(windvdayCol,rainaoi, ee.Reducer.max(), 'v_component_of_wind_10m_above_ground', 10000, 'system:time_start', 'SITE')
    .setChartType('ColumnChart');
//Map.add('Chart for Max Wind Speed (V)');
// plot the chart
//Map.add(chartvWind);
var tempColVis = tempCol.map(function(img) {
  return img.visualize(visArgs);
});
// Define an empty image to paint features to.
var empty = ee.Image().byte();
// Paint country feature edges to the empty image. 
var southAmOutline = empty
  .paint({featureCollection: geometry1.merge(geometry), color: 1, width: 1})
  // Convert to an RGB visualization image; set line color to black.
  .visualize({palette: 'white'});
// Map a blend operation over the temperature collection to overlay the country
// border outline image on all collection images.
var tempColOutline = tempColVis.map(function(img) {
  return img.blend(southAmOutline);
});
// Define a partially opaque grey RGB image to dull the underlying image when
// blended as an overlay.
var dullLayer = ee.Image.constant(175).visualize({
  opacity: 0.1, min: 0, max: 255, forceRgbOutput: true});
// Map a two-part blending operation over the country outline temperature
// collection for final styling.
var finalVisCol = tempColOutline.map(function(img) {
  return img
    // Blend the dulling layer with the given country outline temperature image.
    .blend(dullLayer)
    // Blend a clipped copy of the country outline temperature image with the
    // dulled background image.
    .blend(img.clipToCollection(geometry1.merge(geometry)));
});
// Define arguments for animation function parameters.
var videoArgs = {
  dimensions:'360',
  region: aoi,
  framesPerSecond: 7,
};
//Map.add('Chart for Max precipitation');
// plot the chart
//Map.add(chart);
//Map.addLayer(geometry1.merge(geometry));
Export.video.toDrive({
  collection: finalVisCol,
  description: 'CycloneVideo',
  dimensions: 720,
  framesPerSecond: 12,
  region: aoi
});
var map = ui.Map();
var headLabel = ui.Label({value:'Cyclone Visualizer and Charts',
  style: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
  }
});
// Make a button widget.
var button = ui.Button('Click for Animation!');
button.style().set('position', 'middle-left');
// Set a callback function to run when the
// button is clicked.
button.onClick(function() {
  Map.add(
  ui.Thumbnail({
    image:finalVisCol, 
    params: videoArgs,
    style:{position: 'middle-left',width: '320px'}
  }));
});
// Display the button in the console.
Map.add(button)
var panel = ui.Panel();
panel.style().set({'width':'30%',
  'backgroundColor':'#738b16'
});
var chartPanel = ui.Panel({style: {width:'100%',backgroundColor:'#738b16'}});
panel.add(headLabel);
panel.add(chartPanel);
ui.root.add(panel);
chartPanel.clear();
chartPanel.add(chartgpm);
chartPanel.add(chart);
//chartPanel.add(chartpress);
chartPanel.add(chartvWind);
chartPanel.add(chartWind);
// Add the panel to the ui.root.
//ui.root.insert(0, panel);
///.........LEGENDS...............////////////
// set  position of panel
var legend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '4px 8px'
    ,color:'black'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legends',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0',
    }
});
// Add the title to the panel
legend.add(legendTitle);
 var panel = ui.Panel({
      widgets: [
        ui.Label('Low')
      ],
    });
  legend.add(panel);   
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 8px 12px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette=[
      'blue', 'purple', 'cyan', 'green', 'orange', 'red',
  ];
// name of the legend
var names = [' High', 'Low'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i]));
  }  
 var panel = ui.Panel({
      widgets: [
        ui.Label('High')
      ],
    });
  legend.add(panel);
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend); 
var mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#000040'}, {visibility: 'simplified'}]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{color: '#408080'}]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{color: '#800040'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{color: '#737c03'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{color: '#000040'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#a5b076'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#f5f1e6'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#b9d3c2'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
];
Map.setOptions('mapStyle', {mapStyle: mapStyle});
// // Remove icons.
// var iconChange = [
//   {
//     // Change map saturation.
//     stylers: [{gamma: 0.2}]
//   },
//   {
//     // Change label properties.
//     elementType: 'labels',
//     stylers: [{visibility: 'off', color: '#000055'}]
//   },
//   {
//     // Change road properties.
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{visibility: 'off', color: '#000055'}]
//   },
//   {
//     // Change road labels.
//     featureType: 'road',
//     elementType: 'labels',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     // Change icon properties.
//     elementType: 'labels.icon',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     // Change POI options.
//     featureType: 'poi',
//     elementType: 'all',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry.fill',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry.stroke',
//     stylers: [{visibility: 'off'}]
//   }
// ];
// // Enhanced road network visualization.
// var roadNetwork = [
//   {stylers: [{saturation: -100}]}, {
//     featureType: 'road.highway',
//     elementType: 'geometry.fill',
//     stylers: [{color: '#000055'}, {weight: 2.5}]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#000000'}, {weight: 2}]
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'geometry',
//     stylers: [{color: '#FF0000'}, {weight: 1.8}]
//   },
//   {
//     featureType: 'road.local',
//     elementType: 'geometry',
//     stylers: [{color: '#00FF55'}, {weight: 1.5}]
//   }
// ];
// Map.setOptions(
//     'roadNetwork', {iconChange: iconChange, roadNetwork: roadNetwork});
/////////Wind vector///////////
var uv0 = ee.Image(gfs.select(['u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground']).filter(ee.Filter.date(start, end)).max())
//var region = uv0.geometry()
var scale = Map.getScale() * 10 
var numPixels = 10000
var samples = uv0.rename(['u', 'v']).sample({
  region: aoi, 
  scale: scale, 
  numPixels: numPixels, 
  geometries: true
})
var geomUtils = require('users/gena/packages:geometry')
var scaleVector = 0.1
var vectors = samples.map(function(f) {
  var u = ee.Number(f.get('u')).multiply(scaleVector)
  var v = ee.Number(f.get('v')).multiply(scaleVector)
  var origin = f.geometry()
  // translate
  var proj = origin.projection().translate(u, v)
  var end = ee.Geometry.Point(origin.transform(proj).coordinates())
  // construct line
  var geom = ee.Algorithms.GeometryConstructors.LineString([origin, end], null, true)
  return f.setGeometry(geom)
})
var palettes = require('users/gena/packages:palettes')
Map.addLayer(uv0.pow(2).reduce(ee.Reducer.sum()).sqrt().clip(aoi), { palette: ['blue', 'purple', 'cyan', 'green', 'orange', 'red'], min: -10, max: 30 }, 'Max UV GFS', 0)
Map.addLayer(vectors.style({ color: 'red', width: 1 }), {}, 'GFS UV(vectors)',0)
Map.addLayer(samples.style({ pointSize: 1, color: 'red' }), {}, 'GFS UV (samples)', 0, 0.7)