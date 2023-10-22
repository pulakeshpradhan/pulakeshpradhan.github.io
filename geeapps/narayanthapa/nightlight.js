var nightlight_2020 = ui.import && ui.import("nightlight_2020", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
/// Model section ///
////// chat gpt code ///
// Import the Nightlight dataset
var nightlight_1992 = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').select('stable_lights')
.filterDate('1992','1993').median()
var nightlight_2014 = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').select('stable_lights')
.filterDate('2006','2014').median()
// Filter the data by year range
var night_vis= {
  bands:['stable_lights'],
  max:63,
  palette:['black','lightgray','orange','yellow','red']
}
// Component section //
var c={};
//empty panel
c.controlPanel=ui.Panel();
// information
// Year from user
c.inputYear={}
c.inputYear.label1=ui.Label("2014 Night light data")
c.inputYear.label2=ui.Label("2000 Night light data")
// defining legend widiget
// Define a legend widget group.
/*composition***************************/
//default map
// dividing map into two component
c.leftmap=ui.Map({center: {lat: 0, lon: 0, zoom: 2}})
c.leftmap.setControlVisibility(false)
c.leftmap.setOptions('SATELLITE')
c.rightmap=ui.Map({center: {lat: 0, lon: 0, zoom: 2}})
c.rightmap.setControlVisibility(true);
c.rightmap.setOptions('SATELLITE')
// Adding image to map:
var leftimage=ui.Map.Layer()
var rightimage=ui.Map.Layer()
c.rightmap.addLayer(nightlight_1992, night_vis, 'Night light 1998')
c.leftmap.addLayer(nightlight_2014, night_vis, 'Night light 2014')
c.splitPanel=ui.SplitPanel({
  firstPanel:c.leftmap,
  secondPanel:c.rightmap,
  orientation:'horizontal',
  wipe:true
})
ui.root.clear()
//adding to root
ui.root.add(c.controlPanel);
ui.root.add(c.splitPanel);
var linkPanel=ui.Map.Linker([c.rightmap, c.leftmap])
/***************************Style*****************/
/**************************Behaviour*************/
//Map.addLayer(nightlight_1992, night_vis, 'Night light 2000')
//Map.addLayer(nightlight_2014,night_vis,'Night light 2014')
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
//legend.add(night_vis)
// Add info
var info = ui.Panel({
  style: {
    position: 'bottom-center',
    padding: '8px 15px'
  }
});
var info2 = ui.Label({
  value: 'Split Panels of "image of 2014" (left) and "image of 1998" (right)',
  style: {
    fontSize: '16px',
    margin: '0 0 3px 0',
    padding: '0'
    }
});
info.add(info2);
c.rightmap.add(info);
//Add legend
// Add map legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Night light intensity',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
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
var classColour = ['black','lightgray','orange','yellow','red'];
// Set legend labels
var labelName = ['None','Low','Medium','High','Very high'];
// Combine legend colour and labels
for (var i = 0; i < 5; i++) {
  legend.add(content(classColour[i], labelName[i]));
  }  
// Add legend
c.rightmap.add(legend);