var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-cokrosantoso2/assets/Konsumsi_energi"
    }) || ee.FeatureCollection("projects/ee-cokrosantoso2/assets/Konsumsi_energi"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "first"
        ],
        "min": 1,
        "max": 20,
        "palette": [
          "000591",
          "0221ff",
          "0681ff",
          "00c4ff",
          "02ffa2",
          "06ff0e",
          "a9ff02",
          "a9ff02",
          "fbff00",
          "ffd402",
          "ff8508",
          "ff0000",
          "c00000"
        ]
      }
    }) || {"opacity":1,"bands":["first"],"min":1,"max":20,"palette":["000591","0221ff","0681ff","00c4ff","02ffa2","06ff0e","a9ff02","a9ff02","fbff00","ffd402","ff8508","ff0000","c00000"]},
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-sdgs/assets/Bandung_SolarRad"
    }) || ee.FeatureCollection("projects/ee-sdgs/assets/Bandung_SolarRad"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "projects/ee-sdgs/assets/Solar_Priority"
    }) || ee.FeatureCollection("projects/ee-sdgs/assets/Solar_Priority"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "projects/ee-sdgs/assets/Bandung_Building5k"
    }) || ee.FeatureCollection("projects/ee-sdgs/assets/Bandung_Building5k");
var snazzy = require("users/aazuspan/snazzy:styles");
snazzy.addStyle("https://snazzymaps.com/style/38/shades-of-grey", "My Custom Style");
Map.setControlVisibility({mapTypeControl: false})
Map.setControlVisibility({zoomControl: false})
Map.setControlVisibility({scaleControl: false})
Map.setControlVisibility({drawingToolsControl: false})
var geom = ee.Geometry.Point(107.60366265410916,-6.927210708107486);
Map.centerObject(geom,17);  
// Convert Vector to Raster
var Konsumsi_Energi = ee.FeatureCollection(table);
var Konsumsi_Energi_Bandung = Konsumsi_Energi
  .filter(ee.Filter.notNull(['Kon_energi']))
  .reduceToImage({
    properties: ['Kon_energi'],
    reducer: ee.Reducer.first()
});
var SolarRadiance = ee.FeatureCollection(table2);
var SolarRadiance_raster = SolarRadiance
  .filter(ee.Filter.notNull(['Solar_PV']))
  .reduceToImage({
    properties: ['Solar_PV'],
    reducer: ee.Reducer.first()
});
var SolarPriority = ee.FeatureCollection(table3);
var SolarPriority_raster = SolarPriority
  .filter(ee.Filter.notNull(['Pr_tot']))
  .reduceToImage({
    properties: ['Pr_tot'],
    reducer: ee.Reducer.first()
});
var Building = ee.FeatureCollection(table4);
var Building_raster = Building
  .filter(ee.Filter.notNull(['ID']))
  .reduceToImage({
    properties: ['ID'],
    reducer: ee.Reducer.first()
});
var SolarVis = {
  min: 108,
  max: 314,
  palette: ["000591", "0221ff", "0681ff", "00c4ff", "02ffa2", "06ff0e", "a9ff02", "fbff00", "ffd402", "ff8508", "ff0000", "c00000"],
};
var ComsVis = {
  min: 1, 
  max: 20,
  palette: ["000591", "0221ff", "0681ff", "00c4ff", "02ffa2", "06ff0e", "a9ff02", "fbff00", "ffd402", "ff8508", "ff0000", "c00000"],
};
var PriorVis = {
  min: 3,
  max: 30,
  palette: ["000591", "0221ff", "0681ff", "00c4ff", "02ffa2", "06ff0e", "a9ff02", "fbff00", "ffd402", "ff8508", "ff0000", "c00000"],
};
var BuidlingVis = {
  min: 1,
  max: 1,
  palette: ["5c5c5c"],
};
Map.addLayer(Building_raster,BuidlingVis,"Building Footprints")
Map.addLayer(Konsumsi_Energi_Bandung,ComsVis,"1). Annual Energy Consumption (MWh)")
Map.addLayer(SolarRadiance_raster,SolarVis,"2). Monthly Solar Energy Potential (kWh/m2)")
Map.addLayer(SolarPriority_raster,PriorVis,"3). Solar PV Deployment Priority")
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left', 
    padding: '5px 5px',
    backgroundColor: 'white',
    shown: 'false'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Bandung City, Indonesia',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 1px 0',
    padding: '0'
    }
});
// Create legend title
var legendTitle0 = ui.Label({
  value: 'Rooftop Solar PV deployment priority',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 1px 0',
    padding: '0'
    }
});
// Create legend title
var legendTitle1 = ui.Label({
  value: '1). Annual energy consumption potential (MWh/year)',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '0 0 1px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: '2). Monthly solar PV energy potential (kWh/m2/month)',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '2 2 1px 2',
    padding: '0'
    }
});
var legendTitle3 = ui.Label({
  value: '3). Solar PV Deployment Priority Level',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '0 0 1px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle0);
legend.add(legendTitle);
var doi = ui.Label(
    'Ref: Multi-Criteria Assessment for Rooftop Solar PV Deployment', 
    {fontSize: '11px', color: 'Blue', margin: '0 0 1px 0', padding: '0'},
    'https://www.mdpi.com/2072-4292/14/12/2796');  
legend.add(doi);
var doi2 = ui.Label(
    'How to read: Layer selection is on the up-right,', 
    {fontSize: '11px', color: 'grey', margin: '0 0 1px 0', padding: '0'});  
legend.add(doi2);
var doi3 = ui.Label(
    'If more than one layer is selected, only the upper layer will be seen', 
    {fontSize: '11px', color: 'grey', margin: '0 0 1px 0', padding: '0'});  
legend.add(doi3);
legend.add(legendTitle1);
legend.add(legendTitle2);
legend.add(legendTitle3);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '7px',
          margin: '0 0 0 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {
          margin: '0 0 0 0',
          padding: '0'
          }
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description], 
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =["000591", "0221ff", "0681ff", "00c4ff", "02ffa2", "06ff0e", "a9ff02", "fbff00", "ffd402", "ff8508", "ff0000", "c00000", "5c5c5c"];
// name of the legend
var names = 
["01-02 MWh | 100-120 kWh/m2 | Very Low Priority", 
"02-04 MWh | 120-130 kWh/m2 ", 
"04-06 MWh | 130-140 kWh/m2 ", 
"06-08 MWh | 140-160 kWh/m2 | Low Priority",  
"08-10 MWh | 160-180 kWh/m2", 
"10-12 MWh | 180-200 kWh/m2 ", 
"12-14 MWh | 200-220 kWh/m2 | Medium Priority ", 
"14-16 MWh | 220-240 kWh/m2 ", 
"16-18 MWh | 240-260 kWh/m2 ", 
"18-20 MWh | 260-280 kWh/m2 | High Priority", 
"20-22 MWh | 280-300 kWh/m2 ", 
"22< MWh | 300-320 kWh/m2 | Very High Priority",
"Building Footprints"];
// Add color and and names
for (var i = 0; i < 13; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);