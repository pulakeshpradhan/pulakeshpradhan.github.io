var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setOptions("Hybrid");
Map.setControlVisibility({ all: false });
Map.style().set("cursor", "crosshair");
// adding Centre for Informaiton Resilience Ukraine map data
var table = ee.FeatureCollection("users/ollielballinger/ukraine")
  .map(function (feature) {
    var date = ee.Date(feature.get("date"));
    return feature.set("system:time_start", date);
  });
var filtered_clashes = table;
table = table.map(function (feature) {
  var pt_size = feature.get("pt_size");
  var styles = ee.Dictionary({
    "#005e38": {
      color: "black",
      fillColor: "green",
      pointSize: pt_size,
      pointShape: "circle",
    },
    "#cc1b15": {
      color: "black",
      fillColor: "red",
      pointSize: pt_size,
      pointShape: "square",
    },
    "#f18729": {
      color: "black",
      fillColor: "orange",
      pointSize: pt_size,
      pointShape: "diamond",
    },
    "#ffcc00": {
      color: "black",
      fillColor: "yellow",
      pointSize: pt_size,
      pointShape: "plus",
    },
  });
  return feature.set("style", styles.get(feature.get("color")));
});
// Style the FeatureCollection according to each feature's "style" property.
var fcVisCustom = table.style({
  styleProperty: "style",
});
var sliderPanel = ui.Panel();
// Use a DateSlider to create annual composites of this collection.
// Use the start of the collection and now to bound the slider.
var start = "2021-01-01";
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var filterDates = function (range) {
  var filtered_clashes = table.filterDate(range.start(),range.end())
  Map.layers().set(1, filtered_clashes.style({ styleProperty: "style" }));
  return filtered_clashes;
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function (range) {
  var dateSlider = ui.DateSlider({
    start: range["dates"][0],
    end: range["dates"][1],
    period: 7,
    onChange: filterDates,
    style: { width: "95%" },
  });
  sliderPanel.add(dateSlider);
});
var info_panel = ui.Panel({
  style: {
    position: "top-right",
    width: "300px",
    maxHeight: "500px",
    shown: false,
  },
});
var radius_box_buffer = ui.Textbox({
  placeholder: "100",
  value: "100",
  onChange: function (value) {
    var lon = ui.url.get("lon");
    var lat = ui.url.get("lat");
    getProps({
    lon: lon,
    lat: lat,
    });
  },
  style: { width: "50px", margin: "1px 1px"}
});
Map.add(info_panel);
var info=ui.Panel('') 
var bufferLabel1=ui.Label('The estimated number of civilians within')
var bufferLabel2=ui.Label('metres of this conflict event is')
var bufferLabel3=ui.Label('')
var bufferPanel=ui.Panel({widgets:[bufferLabel1,radius_box_buffer,bufferLabel2],layout: ui.Panel.Layout.flow("horizontal", true)})
info_panel.widgets().set(0, info);
info_panel.widgets().set(1, bufferPanel);
info_panel.widgets().set(2, bufferLabel3);
var makeBuffer=function(feature){
    var radius=ee.Number.parse(radius_box_buffer.getValue())
    var buffered_pt=ee.Feature(feature).buffer(radius)
    var empty = ee.Image().byte();
    var outline = empty.paint({
    featureCollection: buffered_pt,
    color: 1,
    width: 3
    });
    var radius_layer=ui.Map.Layer(outline,{palette: '#00FFFF'}, 'edges')
    var sum = pop.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: buffered_pt.geometry(),
    scale: 90,
    maxPixels: 1e9,
   });
    var pop_in_view = ee.Number(sum.get("population")).int().getInfo()
    bufferLabel3.setValue(pop_in_view)
    Map.layers().set(2,radius_layer)
    return pop_in_view
}
var SEARCH_DISTANCE = 5000; // Meters.
function getProps(coords) {
  if (!info_panel.style().get("shown")) {
    info_panel.style().set("shown", true);
  }
  ui.url.set("lon", coords.lon.toFixed(4));
  ui.url.set("lat", coords.lat.toFixed(4));
  ui.url.set("zoom", Map.getZoom());
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var selectedPt = filtered_clashes
    .filterBounds(point.buffer(SEARCH_DISTANCE))
    .map(function (ft) {
      return ft.set("system:click_distance", point.distance(ft.geometry()));
    })
    .sort("system:click_distance")
    .first();
  var title = ui.Label({
    value: selectedPt.get("title").getInfo(),
    style: { fontWeight: "bold" },
  });
  var group = ui.Label("Event Type: " + selectedPt.get("group").getInfo());
  var violence_lvl = ui.Label(
    "Violence Level: " + selectedPt.get("violence_lvl").getInfo()
  );
  var url = ui.Label(
    "Click here to view source media",
    {},
    selectedPt.get("url").getInfo()
  );
  var pop_in_radius=makeBuffer(selectedPt)
  var bufferLabel3=ui.Label(pop_in_radius, {textAlign:'center',fontSize:'24px'})
  var info = ui.Panel([title, group, violence_lvl, url]);
  info_panel.widgets().set(0, info);
  //info_panel.widgets().reset([info]);
  info_panel.widgets().set(2, bufferLabel3);
}
var pop = ee.Image("DOE/ORNL/LandScan_HD/Ukraine_202201");
var pop = pop.resample("bicubic");
var pop_palette = [
  "#000004",
  "#320a5a",
  "#781b6c",
  "#bb3654",
  "#ec6824",
  "#fbb41a",
  "#fcffa4",
];
var pop_vis = { min: 1, max: 30, palette: pop_palette, opacity: 0.8 };
var pop_number = ui.Label("", { fontSize: "24px" });
var pop_label = ui.Label("", { maxWidth: "200px" });
var radius_box = ui.Textbox({
  placeholder: "300",
  value: "300",
  onChange: function (value) {
    makeChart(value);
  },
  style: { width: "50px", margin: "1px 1px"}
});
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry = ui.Map.GeometryLayer({
  geometries: null,
  name: "geometry",
  color: "23cba7",
});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape("polygon");
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape("point");
  //var pointBuffer = point.buffer({'distance': 100});
  drawingTools.draw();
}
function popEstimate() {
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  var sum = pop.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: aoi,
    scale: 90,
    maxPixels: 1e9,
  });
  var pop_in_view = ee.Number(sum.get("population")).int().getInfo();
  pop_label.setValue("The estimated number of people in the specified area is:");
  pop_number.setValue(pop_in_view);
}
drawingTools.onDraw(ui.util.debounce(popEstimate, 500));
drawingTools.onEdit(ui.util.debounce(popEstimate, 500));
var total_pop_number = ui.Label("");
function totalCiviliansAffected(filtered_clashes, buffer) {
  var bufferedPoints = filtered_clashes
    .filter(
      ee.Filter.or(
        ee.Filter.eq("color", "#cc1b15"),
        ee.Filter.eq("color", "#f18729")
      )
    )
    .map(function (feature) {
      return feature.buffer(ee.Number.parse(buffer));
    })
  var sum = pop.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: bufferedPoints.union(),
    scale: 93,
    maxPixels: 1e9,
  });
  var total_pop= ee.Number.parse(sum.get("population")).int()
  var average= total_pop.divide(bufferedPoints.size()).int()
  return [average, total_pop]
}
var chartPanel= ui.Panel({style:{position:'bottom-center', backgroundColor: '#00000055', width:'600px'}})
var civ_lab1 = ui.Label("Daily estimated number of civilians within", {whiteSpace: "wrap" , backgroundColor: '#00000000', color:'#ffffff'});
var civ_lab2 = ui.Label("meters of any documented conflict event.", {whiteSpace: "wrap" , backgroundColor: '#00000000', color:'#ffffff'});
var total_civ_panel = ui.Panel({
  widgets: [civ_lab1, radius_box, civ_lab2],
  layout: ui.Panel.Layout.flow("horizontal", true),
  style:{backgroundColor: '#00000000'}
});
chartPanel.widgets().set(0, total_civ_panel);
var makeChart= function(value){
  var Date_Start = ee.Date('2022-02-22');
  var Date_End = ee.Date(Date.now()).advance(-1, 'day');
  var n_days = Date_End.difference(Date_Start,'day')
  var dates = ee.List.sequence(0,n_days,1);
  var make_datelist = function(n) {
    return Date_Start.advance(n,'day')
  };
dates = dates.map(make_datelist);
var dailyProximity= dates.map(function(date){
  var daily_clashes = table.filterDate(date)
  var daily_prox=totalCiviliansAffected(daily_clashes, radius_box.getValue())[1];
  var daily_count=totalCiviliansAffected(daily_clashes, radius_box.getValue())[0];
  return [daily_prox, daily_count]
})
var dates=dates.map(function(date){return ee.Date(date).format('dd-MMMM')})
var chartStyle = {
  //legend: {position: 'none'},
  chartArea: {backgroundColor: '#00000000'},
  backgroundColor: '#00000000',
  hAxis: {
    title: 'Date',
    titleTextStyle: {italic: false, bold: true},
  },
  intervals: { 'style':'area' },  
  series: {
       0: {
           targetAxisIndex: 0 ,
           type: "line" ,
           lineWidth: 3 ,
           pointSize: 0 ,
           color: "#12bcff",
           xLabel:'eg'
          } ,
       1: {
           targetAxisIndex: 1 ,
           type: "line" ,
           lineWidth: 3 ,
           pointSize: 0 ,
           color: "#ffa812" 
          } ,
      } ,
  vAxes: {
          0: {
              title: "Total number of civilians" ,
              baseline: 0 ,
              titleTextStyle: { bold: true , color: '#12bcff', short:true} ,
              color:'#12bcff',
              viewWindow: { min: 0 },
              format: 'short'
            } ,
          1: {
              title: "Average per event" ,
              baseline: 0  ,
              titleTextStyle: { bold: true, color: '#ffa812' } ,
              viewWindow: { min: 0 },
              format: 'short'
            }
  }
  // series: {
  //   0: {lineWidth: 3, color: 'red', pointSize: 7 , label:'civilians'},
  // }
};
var chart = ui.Chart.array.values(dailyProximity, 0, dates)
            .setSeriesNames(['Total','Average'])
            //.setChartType('ColumnChart')
            .setOptions(chartStyle)
chartPanel.widgets().set(1, chart);
  var getDate = function (callback) {
    var date=ee.Date.parse('dd-MMMM',callback).update({year: 2022})
    var chart_filter=table.filterDate(date);
    //print(ee.Date(callback).format().getInfo());
    Map.layers().set(1, chart_filter.style({ styleProperty: "style" }))
  };
  chart.onClick(getDate);
}
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(pop_palette),
  style: { stretch: "horizontal", margin: "0px 8px", maxHeight: "24px" },
});
var legendTitle = ui.Label({
  value: "Population Density (Pop/100m)",
  style: { fontWeight: "bold" },
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(pop_vis.min, { margin: "4px 8px" }),
    ui.Label(pop_vis.max / 2, {
      margin: "4px 8px",
      textAlign: "center",
      stretch: "horizontal",
    }),
    ui.Label(pop_vis.max, { margin: "4px 8px" }),
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
});
var legendPanel = ui.Panel({
  widgets: [legendTitle, colorBar, legendLabels],
  style: { width: "100%" },
});
//ui.Label('During the week of'),
var chartButton=ui.Button({
  label:"Generate Conflict Proximity Chart",
  onClick: function(){
    Map.add(chartPanel)
    makeChart(radius_box.getValue())
    controlPanel.widgets().set(6, hideButton);
  },
  style:{stretch: "horizontal"}
})
var hideButton=ui.Button({
  label:"Hide Chart",
  onClick: function(){
  Map.remove(chartPanel)
  controlPanel.widgets().set(6, chartButton)
  },
  style:{stretch: "horizontal"}
})
var controlPanel = ui.Panel({
  widgets: [
    ui.Label("Civilian Risk Assessment", {
      fontWeight: "bold",
      fontSize: "20px",
    }),
    ui.Label(
      "The symbols on this map represent geolocated photos and videos of military activity from social media. Clicking on a pin will show further details related to the conflict event, as well as the source media.",
      { whiteSpace: "wrap" }
    ),
    ui.Label(
      "Use the slider below to view military activity in a specific date range:",
      { whiteSpace: "wrap" }
    ),
    sliderPanel,
    ui.Label(
      "The underlying map shows population density data at 100m by 100m spatial resolution.",
      { whiteSpace: "wrap" }
    ),
    legendPanel,
    chartButton,
    ui.Label(
      "To get an estimate of the population affected by fighting in a specific area,",
      { whiteSpace: "wrap" }
    ),
    ui.Button({
      label: "🔺" + " Draw a Polygon",
      onClick: drawPolygon,
      style: { stretch: "horizontal" },
    }),
    pop_label,
    pop_number,
  ],
  style: { position: "top-left", maxWidth: "350px", maxHeight:'90%'},
  layout: ui.Panel.Layout.flow("vertical", true),
});
Map.add(controlPanel);
// fires
var dataset = ee
  .ImageCollection("FIRMS")
  .filter(ee.Filter.date("2022-02-25", Date.now()));
var fires = dataset.select("T21");
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ["red", "orange", "yellow"],
};
//Map.addLayer(fires, firesVis, 'Fires');
Map.addLayer(pop, pop_vis, "Population");
Map.addLayer(fcVisCustom);
// set position of panel
var legend = ui.Panel({
  style: {
    position: "bottom-right",
    padding: "8px 15px",
  },
});
// Create legend title
var legendTitle = ui.Label({
  value: "Legend",
  style: {
    fontWeight: "bold",
    fontSize: "18px",
    margin: "0 0 4px 0",
    padding: "0",
  },
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function (color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: "#" + color,
      // Use padding to give the box height and width.
      padding: "8px",
      margin: "0 0 4px 0",
    },
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: { margin: "0 0 4px 6px" },
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow("horizontal"),
  });
};
//  Palette with the colors
var palette = ["005e38", "cc1b15", "f18729", "ffcc00"];
// name of the legend
var names = ["Military Movements", "Casualties", "Combat", "Other"];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
var lon = ui.url.get("lon", -9999);
var lat = ui.url.get("lat", -9999);
var zoom = ui.url.get("zoom", -9999);
if (lon != -9999 && lat != -9999 && zoom != -9999) {
  Map.setCenter(lon, lat, zoom);
  var initialPoint = ee.Geometry.Point(lon, lat);
  getProps({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo(),
  });
} else {
  Map.setCenter(32.681, 49.44, 7);
}
//legend.add(ui.Label('click on a conflict event to display further information'), {whiteSpace:'wrap'})
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
Map.onClick(getProps);