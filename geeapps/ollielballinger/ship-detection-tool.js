var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                33.5509666069789,
                44.625964465556486
              ],
              [
                33.552447186355124,
                44.62368895371772
              ],
              [
                33.552940712813864,
                44.62380349503611
              ],
              [
                33.55148159110976,
                44.62612481705332
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#000000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #000000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[33.5509666069789, 44.625964465556486],
          [33.552447186355124, 44.62368895371772],
          [33.552940712813864, 44.62380349503611],
          [33.55148159110976, 44.62612481705332]]]);
// ---------------------------- SHIP DETECTION ALGORITHM----------------------------------
// Set the basemap to satellite with labels 
Map.setOptions("Hybrid");
// Remove unnecessary map controls 
Map.setControlVisibility({ all: false });
// Create a kernel to smooth out the Dynamic World dataset
var kernel = ee.Kernel.circle({
    radius: 10, units: 'meters', normalize: true
  });  
// Load the Dynamic World dataset to mask out non-water areas, and smooth it out using the kernel. 
var water = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').filterDate('2022-06-01','2022-08-01').max().select('water').convolve(kernel)
// A geometry corresponding to the Avlita Grain Terminal in Sevastopol, used to initialize the tool
var sevastopol = 
    ee.Geometry.Polygon(
        [[[33.5509666069789, 44.625964465556486],
          [33.552447186355124, 44.62368895371772],
          [33.552940712813864, 44.62380349503611],
          [33.55148159110976, 44.62612481705332]]]);
// Set up drawing tools
var drawingTools = Map.drawingTools();
// Replace old drawn geometries with new ones
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
// Create dummy geometry 
var dummyGeometry = ui.Map.GeometryLayer({
  geometries: null,
})
  .fromGeometry(sevastopol)
  .setShown(false);
// Add dummy geometry to drawing tools 
drawingTools.layers().add(dummyGeometry);
// Define a function to be executed when user draws a polygon 
function drawPolygon() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  drawingTools.setShape("polygon");
  drawingTools.draw();
}
// Define a function to be executed when a polygon is drawn
function getVectors(img) {
  // Get the user-drawn geomtry 
  var aoi = drawingTools.layers().get(0).getEeObject();
  // clip the image to the AOI 
  var processed = img.clip(aoi)
  // Create a binary raster where the return signal in the VV polarization is >0
  // i.e., a raster where open water will have a pixel value of 0, and anything reflecting the signal (probably a ship) will have a value of 1
  var vv = processed.select("VV").gt(0);
  // Mask out non-water areas 
  var cutoff=vv.updateMask(water.gt(0.3))
  // Turn the binary raster in to a vector dataset where each vector encloses an area where neighbouring pixels =1
  // This creates a FeatureCollection in which each feature is a ship 
  var ships = cutoff.reduceToVectors({
    geometry: aoi,
    geometryType: "polygon",
    eightConnected: true,
    maxPixels: 1653602926,
  });
  // Map through the feature collection to calculate the rough length and area of each ship 
  ships=ships.map(function(feature){
    // first draw a bounding box around the ship 
    var box=ee.List(feature.geometry().bounds().coordinates().get(0))
    // get the top left and bottom right coordinates of the box
    var pt1=ee.Geometry.Point(box.get(0))
    var pt2=ee.Geometry.Point(box.get(2))
    // calculate the distance between them 
    var length=pt1.distance(pt2,10)
    // add length and area as properties to the feature 
    return feature.set('area',feature.area(10))
                  .set('length',length)
    })
  // enable filtering of the featurecollection of ships by the ship length slider value and platform number checkbox
  ships=ships.filter(ee.Filter.eq('label',1))
                .set('platform',img.get('platform_number'))
                .filter(ee.Filter.gt('length', scaleSlider.getValue()))
  // count the number of ships in the AOI on the date of the image, add as a property.
  var count = ships.size();
  var date = ee.Date(img.get("system:time_start")).millis()
  return ships.set("count", count).set("system:time_start", date).set("length", ships.aggregate_max('length')).set("area", ships.aggregate_max('area'));
}
// define a visualization function 
function viz(aoi, vectors, s1Filtered) {
  // create an outline of the user-drawn AOI
  var empty = ee.Image().byte();
  var outline = empty.paint({
    featureCollection: aoi,
    color: 1,
    width: 3,
  });
  var aoi_layer = ui.Map.Layer(outline, { palette: "red" }, "AOI");
  // visualize the ship detections in green 
  var vectorLayer = ui.Map.Layer(
    vectors.flatten(),
    { color: "#39ff14" },
    "Vectors"
  );
  // create visualization parameters for the underlying SAR image
  var sarLayer = ui.Map.Layer(
    s1Filtered,
    { min: -5, max: 0, opacity: 0.8 },
    "SAR"
  );
  // add all three layers to the map
  Map.layers().set(0, sarLayer);
  Map.layers().set(1, vectorLayer);
  Map.layers().set(2, aoi_layer);
}
// Run this function on a change of the dateSlider.
var daterangeVectors = function () {
  // get the AOI from the user-drawn polygon 
  var aoi = drawingTools.layers().get(0).getEeObject();
  // use the centroid of the AOI and add it to the URL to enable sharing of specific views via link 
  var centroid=aoi.centroid().coordinates()
  ui.url.set("lon", centroid.get(0).getInfo().toFixed(4));
  ui.url.set("lat", centroid.get(1).getInfo().toFixed(4));
  ui.url.set("zoom", Map.getZoom());
  if (!chartPanel.style().get("shown")) {
    chartPanel.style().set("shown", true);
  }
  // get the date range from the date slider
  var range = ee.DateRange(
    ee.Date(dateSlider.getValue()[0]),
    ee.Date(dateSlider.getValue()[1])
  );
  // get checkbox value to include/exclude Sentinel-1A/1B imagery 
  var platform=ee.Algorithms.If(checkbox.getValue(),'B','')
  // load Sentinel-1 imagery and filter according to platform settings, selecting vertical-vertical polarization. 
  var s1 = ee.ImageCollection("COPERNICUS/S1_GRD")
    .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
    .filter(ee.Filter.neq('platform_number',platform))
    .select('VV')
    .filter(ee.Filter.eq("instrumentMode", "IW"))
    .sort("system:time_start")
  drawingTools.layers().get(0).setShown(false);
  // filter Sentinel-1 imagery according to date range and smooth each image using the kernel 
  var s1Filtered = s1.filterDate(range.start(), range.end()).map(function(img){return img.convolve(kernel)})
  // run the getVectors function on each image in the collection 
  var vectors = s1Filtered.filterBounds(aoi).map(getVectors);
  // get the maximum pixel value, creating a raster showing all ship presence over the specified period 
  var max= s1Filtered.max().updateMask(water.gt(0.3))
  // run the visualization function 
  viz(aoi, vectors, max);
  // get the total number of ship detections across the whole period 
  var total=vectors.aggregate_sum('count')
  // check the chart option dropdown to determine which chart to create 
  var chartInfo=items[dropdown.getValue()]
  // define a function to get monthly counts of ships 
  function monthly(vectors){
    var months = ee.List.sequence(1, 12);
    // Map filtering and reducing across year-month combinations
    var monthly = months.map(function (m) {
                  var monthVec=vectors.filter(ee.Filter.calendarRange(m, m, 'month'))
                  var y= ee.Date(monthVec.first().get('system:time_start')).get('year')
                  var count= monthVec.aggregate_sum('count')
                  return monthVec.set('monthly',count).set('system:time_start',ee.Date.fromYMD(y,m,1))
        }).flatten()
        return ee.FeatureCollection(monthly)
    }
  // if "monthly" is selected from the dropdown menu, run the monthly count function 
  var vectors=ee.FeatureCollection(ee.Algorithms.If(chartInfo.property=='monthly',monthly(vectors),vectors))
  // chart the resulting featurecollection 
  var chart = ui.Chart.feature
    .byFeature({
      features: vectors,
      xProperty: "system:time_start",
      yProperties: chartInfo.property,
    })
    .setChartType('ScatterChart')
    .setOptions({
      title: chartInfo.title,
      vAxis: { title: chartInfo.ylab },
      explorer: { axis: "horizontal" },
      lineWidth: 2,
      //series: "platform",
    })
  // add a placeholder during calculation   
  var sumLabel2 = ui.Label({
      value: 'Calculating...'
    })
  // get the total number of ship detections over the period 
  total.evaluate(function(val){sumLabel2.setValue(val)});
  // add these to the label 
  var sumLabel1=ui.Label("Total number of detections:", {
      fontWeight: "bold",
      fontSize: "20px",
    })
  // create a panel to store the total number of detections 
  var sumPanel=ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
    widgets:[sumLabel1,sumLabel2]})
  // add the chart and the total number of detection to the chart panel
  chartPanel.widgets().set(1, chart);
  chartPanel.widgets().set(0, sumPanel);
  // define a function to display the SAR image from a given day upon clicking the corresponding date on the chart
  var filterDay = function (callback) {
    // get date from the click event 
    var date = ee.Date(callback);
    // filter the ships featurecollection to that date
    var vectorDay = vectors.filterDate(date);
    // filter the SAR imagecollection to that date
    var s1Day = s1Filtered.filterDate(date).max().updateMask(water.gt(0.3)).convolve(kernel);
    // visualize 
    viz(aoi, vectorDay, s1Day);
  };
  // add event listener to chart 
  chart.onClick(filterDay);
};
// ---------------------------- USER INTERFACE ----------------------------------
var checkbox = ui.Checkbox('Filter Sentinel 1-B', true);
checkbox.onChange(function(checked) {daterangeVectors()});
var items= {"Daily Count": 
              {title: "Daily number of ships in the Area of Interest",
                ylab: "Ship Count",
                property:'count'}, 
            "Monthly Count": 
              {title: "Monthly number of ships in the Area of Interest",
                ylab: "Ship Count",
                property:'monthly'}, 
            "Ship Length":{title: "Max ship length in Area of Interest",
              ylab: "Ship Length (meters)",
              property:'length'},
            "Ship Area":{title: "Max ship area in Area of Interest",
              ylab: "Ship Area (meters^2)",
              property:['area','length']}
}
var dropdown= ui.Select({
  items: Object.keys(items),
  value:'Daily Count',
  onChange: daterangeVectors
})
var dropdownLabel=ui.Label("Chart Type:")
var optionPanel = ui.Panel({
  widgets: [dropdownLabel, dropdown, checkbox],
  style: { stretch: "horizontal" },
  layout: ui.Panel.Layout.Flow("horizontal"),
});
var drawButton = ui.Button({
  label: "🔺" + " Draw a Polygon",
  onClick: drawPolygon,
  style: { stretch: "horizontal" },
});
var scaleLabel = ui.Label("Minimum Ship Length: ");
var scaleSlider = ui.Slider({
  min: -10,
  max: 400,
  value: 100,
  step: 10,
  onChange: daterangeVectors,
  style: { width: "60%" },
});
var scalePanel = ui.Panel({
  widgets: [scaleLabel, scaleSlider],
  style: { stretch: "horizontal" },
  layout: ui.Panel.Layout.Flow("horizontal"),
});
var chartPanel = ui.Panel({
  widgets:[
    ui.Label(),
    ui.Label()
    ],
  style: {
    position: "bottom-center",
    width: "600px",
    maxHeight: "300px",
    shown: false,
  },
});
var homePanel = ui.Panel({
  widgets: [
    ui.Label("SAR Ship Detection", {
      fontWeight: "bold",
      fontSize: "20px",
    }),
    ui.Label(
      "This tool identifies ships using Synthetic Aperture Radar imagery.",
      { whiteSpace: "wrap" }
    ),
    ui.Label("1. Draw an Area of Interest", {
      fontWeight: "bold",
      fontSize: "15px",
    }),
    ui.Label(
      "Click the button below and draw a polygon on the map to count ships in a given area."
    ), 
    drawButton,
    ui.Label("2. Select a Date Range", {
      fontWeight: "bold",
      fontSize: "15px",
    }),
    ui.Label("Use the date slider below to analyze imagery from a given year."),
    ui.Label(), 
    ui.Label("3. Set Chart Options", {
      fontWeight: "bold",
      fontSize: "15px",
    }),
    scalePanel,
    optionPanel,
  ],
  style: {maxWidth: "400px"},
  layout: ui.Panel.Layout.flow("vertical", true),
});
var start = "2015-01-01";
var now = Date.now();
var end = ee.Date(now).format();
var dateSlider = ui.DateSlider({
  //value: "2022-01-01",
  //period: 1200,
  start: start,
  end: now,
  value:"2022-01-01",
  period:365,
  onChange: daterangeVectors,
  style: { width: "95%" },
});
ui.root.insert(0,homePanel);
Map.add(chartPanel)
homePanel.widgets().set(7, dateSlider);
drawingTools.onDraw(ui.util.debounce(daterangeVectors, 500));
var lon = ui.url.get("lon", -9999);
var lat = ui.url.get("lat", -9999);
var zoom = ui.url.get("zoom", -9999);
if (lon != -9999 && lat != -9999) {
  Map.setCenter(lon, lat, zoom);
  var initialPoint = ee.Geometry.Point(lon, lat);
  daterangeVectors();
} else {
  // defauilt location
  Map.centerObject(sevastopol);
  Map.setZoom(17)
  daterangeVectors();
}