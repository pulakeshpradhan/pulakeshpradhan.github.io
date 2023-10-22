var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-stormwaterheatmap/assets/production/Mean_Annual_Q_8_epochs"
    }) || ee.Image("projects/ee-stormwaterheatmap/assets/production/Mean_Annual_Q_8_epochs"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fc"
    }) || ee.FeatureCollection("projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fc"),
    psau_fv = ui.import && ui.import("psau_fv", "featureViewLayer", {
      "id": "projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fv",
      "name": "puget_LL_hydrology_bounds_fv"
    }) || ui.Map.FeatureViewLayer("projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fv", null, "puget_LL_hydrology_bounds_fv"),
    psau = ui.import && ui.import("psau", "table", {
      "id": "projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fc"
    }) || ee.FeatureCollection("projects/ee-stormwaterheatmap/assets/puget_LL_hydrology_bounds_fc"),
    runoff = ui.import && ui.import("runoff", "image", {
      "id": "projects/ee-stormwaterheatmap/assets/production/Mean_Annual_Q_8_epochs"
    }) || ee.Image("projects/ee-stormwaterheatmap/assets/production/Mean_Annual_Q_8_epochs"),
    mask = ui.import && ui.import("mask", "image", {
      "id": "projects/ee-stormwaterheatmap/assets/pugetLL_mask"
    }) || ee.Image("projects/ee-stormwaterheatmap/assets/pugetLL_mask");
var data = require("users/stormwaterheatmap/apps:data/data_dictionary.js");
var Style = require("users/stormwaterheatmap/apps:Modules/Style");
var helpers = require("users/stormwaterheatmap/apps:Modules/helpers");
var fonts = Style.fonts;
Map.addLayer(mask,{opacity:0.3,palette:['black']})
print(fonts)
var runoff_base = data.rasters["Runoff (mm)"];
var runoff_img = {eeObject:runoff_base.layer.eeObject.mask(mask), name:runoff_base.layer.name, 
visParams: runoff_base.layer.visParams};
//Export.image.toAsset({image:runoff_img,scale:5,region:table,maxPixels:1e12})
//Export.table.toDrive(table)
//Map.addLayer(runoff_img);
// Set visualization properties for the defined layer.
psau_fv.setVisParams({
  //polygonStrokeType: 'dashed',
  polygonStrokeColor: "white",
  polygonStrokeOpacity: 1,
  polygonFillColor: "cadetBlue",
  polygonFillOpacity: 0,
  width: 1.5,
});
Map.add(psau_fv);
var panel = ui.Panel({
  style: {
    shown: false,
    position: 'bottom-right'
  },
});
Map.add(panel);
function map_click_callback(coords) {
  var pt = ee.Geometry.Point([coords.lon, coords.lat]);
  var shed = psau.filterBounds(pt);
  Map.layers().set(2, shed);
  var chart = make_chart(shed);
  panel.style().set({
    shown: true,
  });
  panel.widgets().set(0, chart);
}
Map.onClick(map_click_callback);
function make_chart(region) {
  var chart = ui.Chart.image.regions({
    image: runoff,
    regions: region,
    reducer: ee.Reducer.mean(),
    scale: 10,
    xLabels: [1980, 2030, 2040, 2050, 2060, 2070, 2080],
  });
  // Set chart style properties.
  var chartStyle = {
    title: "Estimated runoff over time",
    position: 'bottom-right', 
    vAxis: {
      title: "Mean Annual Runoff (mm)",
    },
    hAxis: {
      title: "year",
      format: "####",
      viewWindow: {
        min: 1970,
        max: 2100,
      },
    },
    pointSize: 4,
    lineWidth: 0, 
   legend: {position: 'none'}, 
    trendlines: {
      0: {
        // add a trend line to the 1st series
        type: "linear", // or 'polynomial', 'exponential'
        color: "green",
        lineWidth: 5,
        //lineDashStyle: [4, 4],
        opacity: 0.2,
        //visibleInLegend: true,
      },
    },
  };
  return chart.setOptions(chartStyle);
}
helpers.make_tnc_map();
//Add side panel
var side_panel = ui.Panel({
  layout: ui.Panel.Layout.flow(),
  style: {
    minWidth: "20%",
    maxWidth: "30%",
  maxHeight: "75%",
    position: "top-left",
    //backgroundColor: "#4B5D6Ce6",
    //color: "4B5D6C",
  },
});
var title = ui.Label({
  value: "How will runoff change in  Puget Sound watersheds?",
  style: {
    //color: "white",
    //fontSize: "30px",
    fontSize:"1.5rem",
    fontWeight: 700,
   // backgroundColor: "#4B5D6C00",
  },
});
var subtitle = ui.Label({
  value: "How to use this map", 
  style: fonts.Body1
})
var text = ui.Label({
  value: "As Puget Sound's climate changes, rainstorms are projected to "+
  "become more intense. A recent study by the "+
  "Climate Impacts Group at the University of Washington, "+
  "has produced downscaled estimates of future precipitation.", 
  style: fonts.Caption0
}) 
var text05 = ui.Label({value:
  "This map shows the results of more than 10,000 continuous "+
  "simulation rainfall-runoff models, representing a range of "+
  "land covers, soils, and slopes. The resulting 20 billion " +
  "lines of results are aggregated in this map, showing future "+
  "hydrology changes at the pixel-level.", 
  style: fonts.Caption0
})
var text2 = ui.Label({value: "This map shows watershed units in the Puget Sound Lowlands. "+
"Click on a location to generate a chart showing predicted runoff for a particular watershed unit.", 
style: fonts.Caption0}) 
var text3 = ui.Label({value: "More info", style: fonts.Body1})
var text4 = ui.Label({value: 
"READ PRECIPITATION METHODOLOGY", targetUrl: "https://cig.uw.edu/projects/heavy-precipitation-projections-for-use-in-stormwater-planning/"})
var text5 = ui.Label({
value: "READ RUNOFF METHODOLOGY", targetUrl: "https://www.stormwaterheatmap.org/docs/Technical%20Reference/Components/Hydrology"})
var text6 = ui.Label({value: "acknowledgements here: TNC, CIG, "+
"Eva, City of Tacoma, Google?",style:{
  backgroundColor:"#F9E79F"}})
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'))
Map.style().set({cursor:'crosshair'})
Map.setOptions("HYBRID")
side_panel.add(title) 
.add(text)
.add(text05)
.add(subtitle) 
.add(text2)
.add(text3)
.add(text4)
.add(text5)
.add(text6);
Map.add(side_panel);