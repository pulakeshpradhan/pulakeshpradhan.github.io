var extent = ui.import && ui.import("extent", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.97009402941902,
                23.80229618745453
              ],
              [
                -98.96219760607917,
                23.806065583801075
              ],
              [
                -98.95739108752448,
                23.80873550668894
              ],
              [
                -98.96262675952156,
                23.81965020865792
              ],
              [
                -98.96365672778327,
                23.8189435291225
              ],
              [
                -98.97464305590827,
                23.81328995432837
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-98.97009402941902, 23.80229618745453],
          [-98.96219760607917, 23.806065583801075],
          [-98.95739108752448, 23.80873550668894],
          [-98.96262675952156, 23.81965020865792],
          [-98.96365672778327, 23.8189435291225],
          [-98.97464305590827, 23.81328995432837]]]),
    pointpoly = ui.import && ui.import("pointpoly", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -98.97138148974616,
            23.811562424030214
          ]
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
    ee.Geometry.Point([-98.97138148974616, 23.811562424030214]),
    pointclip = ui.import && ui.import("pointclip", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -98.96262675952156,
            23.812897335824527
          ]
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
    ee.Geometry.Point([-98.96262675952156, 23.812897335824527]),
    gulfclip = ui.import && ui.import("gulfclip", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.97223979663093,
                23.808185821170017
              ],
              [
                -98.96983653735359,
                23.8027673679803
              ],
              [
                -98.95747691821296,
                23.80849992746575
              ],
              [
                -98.96013766955573,
                23.813996664643152
              ],
              [
                -98.97249728869636,
                23.80873550668894
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-98.97223979663093, 23.808185821170017],
          [-98.96983653735359, 23.8027673679803],
          [-98.95747691821296, 23.80849992746575],
          [-98.96013766955573, 23.813996664643152],
          [-98.97249728869636, 23.80873550668894]]]),
    gulfpoly = ui.import && ui.import("gulfpoly", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.96966487597663,
                23.80378825325584
              ],
              [
                -98.9580777330323,
                23.80889255926697
              ],
              [
                -98.95936519335945,
                23.81164094863335
              ],
              [
                -98.97103816699226,
                23.80645822296253
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-98.96966487597663, 23.80378825325584],
          [-98.9580777330323, 23.80889255926697],
          [-98.95936519335945, 23.81164094863335],
          [-98.97103816699226, 23.80645822296253]]]),
    roiclip = ui.import && ui.import("roiclip", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.97472888659675,
                23.813132907069313
              ],
              [
                -98.97060901354988,
                23.802139126899455
              ],
              [
                -98.9569619340821,
                23.80826434781518
              ],
              [
                -98.96271259021003,
                23.81988576764799
              ],
              [
                -98.97464305590827,
                23.81368257164487
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -98.97429973315437,
            23.81328995432837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.96734744738777,
            23.811209062728405
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.97472888659675,
                23.813132907069313
              ],
              [
                -98.97060901354988,
                23.802139126899455
              ],
              [
                -98.9569619340821,
                23.80826434781518
              ],
              [
                -98.96271259021003,
                23.81988576764799
              ],
              [
                -98.97464305590827,
                23.81368257164487
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -98.97429973315437,
            23.81328995432837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.96734744738777,
            23.811209062728405
          ]
        }
      ],
      "coordinates": []
    }),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/yuleslig01/h"
    }) || ee.Image("users/yuleslig01/h");
var s2 = ee.ImageCollection("COPERNICUS/S2_SR");
//***********************************Mascara por Nubes***********************************************
var maskcloud1 = function(image) {var QA60 = image.select(['QA60']);return image.updateMask(QA60.lt(1));};
s2 = s2.map(maskcloud1);
var maskcloud2 = function(image) {var B1 = image.select(['B1']);var bin = B1.gt(1500);return image.updateMask(bin.lt(1));};
s2 = s2.map(maskcloud2);
s2 = s2.map(maskcloud1);
//****Se calcula el SAVI*****
/*var addSAVI = function (image) {
  // Add Soil Adjust Vegetation Index (SAVI)
    // using L = 0.5;
    var tcari = image.expression('(NIR-RED)/ (NIR+RED) ', {
    'RED': image.select('B4'),
    'NIR': image.select('B8')
    //'NIR': image.select('B8')
    });
    return image.addBands(tcari.rename('TCAR').clip(roiclip));//Este clip dentro de la funcion permitio cortar la imagen
};
var withSAVI = s2.filterDate('2020-01-01', '2020-12-11')
    .filterBounds(roiclip)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 50)
    .map(addSAVI);*/
//print(withSAVI);
// Defina una función que agregará una banda NDVI a una imagen de Sentinel.
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi).clip(roiclip);
};
// Filtra y mapea la función sobre la colección.
// Filtra y mapea la función sobre la colección.
var withNDVIS2 = s2.filterDate('2020-01-01', '2020-12-11')
    //.filterBounds(roiclip)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 60)
    //.map(maskS2clouds)
    .map(addNDVI);//me permite aplicar la función de ADDNDVI  a toda la colección
var addKC = function (image) {
  // Kc coeficiente de cultivo
    // using L = 0.5;
    var tc = image.expression('(224.76-1.1995)*NDVI', {
    'NDVI': image.select('NDVI')
    });
    return image.addBands(tc.rename('Tc').clip(roiclip));
};
var withKC = withNDVIS2.filterDate('2020-03-01', '2020-10-30')
    //.filterBounds(roi)
    //.filterMetadata('CLOUD_COVER', 'less_than', 60)
    .map(addKC);
//print(withKC);
var seriesKc = ui.Chart.image.seriesByRegion(
    withKC, roiclip, ee.Reducer.median(), 'Tc', 20, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Estimacion de la Cantidad de Nitrogeno kg/ha',
          vAxis: {title: 'N kg/ha'},
          lineWidth: 2,
          pointSize: 3,
          colors: ["#ff0000"]
         });
// Display.
print(seriesKc);
Map.addLayer(withKC.select(['Tc']),{min: 0, max: 150, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]},'Ic');
//*****************/////////
var chlaPallete = ['FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'];
   function buildChart(collection){
  /*
  Generates a time series chart with specifications provided
  [ImageCollection]@collection: computed chl-a surfaces
  */
  // A time series chart from computed surfaces
  var chart = ui.Chart.image.series({
  imageCollection: collection,
  region: extent,
  reducer: ee.Reducer.mean(),
  scale: 30,
  //xProperty: 'Year'
  });
  // Custom chart options
  chart.setOptions({
    title: 'Cantidad de N Kg/ha',//************
    legend: {position: 'none'},
    vAxis: {title: 'N Kg/ha'},
    hAxis: {title: 'Date', format: 'YYY-MMM', gridlines: {count: 12}},
    // backgroundColor: { fill: "#F4F4F4"},
    pointSize: 5,
    pointShape: 'circle',
    colors: ["#ff0000"]
  });
  // Chart styling
  chart.style().set({
    width: '380px',
    height: '300px'
  });
  // Update the map and label when the chart is clicked.
  chart.onClick(function(xValue, yValue, seriesName) {
     if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked year.
    var image = ee.Image(collection.filter(ee.Filter.equals('system:time_start', xValue)).first()).clip(extent);
    var layer = ui.Map.Layer(image, {
      min: 0,
      max: 250,
      palette: chlaPallete,
      bands: 'Tc'
    });
    roiclip ? Map.layers().reset([layer]) : Map.layers().reset([layer]);
    //Map.centerObject(layer, 15);
    // Show a label with the date on the map.
    //label.setValue(xValue + ' CHL-A LEVELS FROM CI ALGORITHM');
  });
  return chart;
}
// Scale Picker :: different scales of analysis
var analysisExtent = {
  'Choose An Analysis Scale': 'default',
  'Mbita Point': 'point',
  'Winam Gulf': 'gulf'
};
var selectScale = ui.Select({
  items: Object.keys(analysisExtent),
  onChange: function(value){
    // render analysis extent and charts at scale selected
    if (analysisExtent[value] == 'point'){
      extent = pointpoly;
      Map.setCenter(-98.96529, 23.81129, 17);
    }else if (analysisExtent[value] == 'gulf'){
      extent = gulfpoly;
      Map.setCenter(-98.96529, 23.81129, 17);
    }else{
      return;
    }
    rightPanel.widgets().set(1, buildChart(withKC.select8(["Tc"])));
  },
  style: { width: '365px', color: 'red'}
});
selectScale.setPlaceholder('Choose Scale of Analysis');
var rightPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-right',
    width: '400px'
  }
});
var buttonPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    width: '365px'
  }
});
buttonPanel.widgets().set(0, 
  ui.Button({
    label: 'Show Profiles',
    style: { width: '45%', color: 'red'},
    onClick: function() {
      if (! profilesOn){
        Map.addLayer(profiles, {}, 'Profiles');
      }
      profilesOn = true;
    }
  })
);
buttonPanel.widgets().set(1, 
  ui.Button({
    label: 'Clear',
    style: { width: '45%', color: 'red'},
    onClick: function() {
      Map.layers().reset();
      profilesOn = false;
    }
  })
);
// CI ##
//var ci_collection = computeChlSurfaces('CI');
// A time series chart from computed surfaces
var ciChart = buildChart(withKC.select(["Tc"]));
// Add charts to panel
rightPanel.widgets().set(0, selectScale);
rightPanel.widgets().set(1, ciChart);
rightPanel.widgets().set(2, buttonPanel);
// Display panel
Map.add(rightPanel);
// Create a label on the map.
var label = ui.Label('Click a point on the chart ');
Map.add(label);
Map.setCenter(-98.96529, 23.81129, 17);
// profiles
// ci_collection.map(function(image){
//   print(image)
//   // print(image.get('Year'));
//   waypoints.forEach(function(pointgroup){
//     pointgroup = pointgroup.sort('Id');
//     print(buildProfile(pointgroup, image));
//   });
// });
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-center',
    padding: '8px 15px',
    margin: '0 0 100px 100px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Cantidad de N Kg/ha',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add legend to maps
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var pallete = ['f3fb97', 'ffd761', '98ff00', '00ff00'];
// name of the legend
var names = ['Below 50', '50 - 100', '100-200', 'Above 200'];
// Add color and and names
for (var i = pallete.length; i > 0; i--) {
  legend.add(makeRow( pallete[i-1], names[i-1]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
var subset = Map.getBounds(true)
var Start_period = ee.Date('2020-01-01')
var End_period = ee.Date(new Date().getTime())
var sentinel_dataset = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterBounds(subset)
    .filterDate(Start_period, End_period)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    // .map(maskS2clouds)
var collection = sentinel_dataset.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4'])).rename('NDVI')
});
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 5, // Every 5 days
    onChange: renderDateRange
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  var vis = {min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
    '056201', '004C00', '023B01', '012E01', '011301'
  ]}  
  var layer = ui.Map.Layer(image, vis, 'NDVI')
  Map.layers().reset([layer])
}
var logo = ee.Image('users/yuleslig01/h').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '642x291',
        format: 'png'
        },
    style: {height: '127px', width: '280px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);