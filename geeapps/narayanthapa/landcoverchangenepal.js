var landcover2000 = ui.import && ui.import("landcover2000", "image", {
      "id": "projects/ee-narayanthapa/assets/LandCover_NP_2000"
    }) || ee.Image("projects/ee-narayanthapa/assets/LandCover_NP_2000"),
    landcover2019 = ui.import && ui.import("landcover2019", "image", {
      "id": "projects/ee-narayanthapa/assets/LandCover_NP_2019"
    }) || ee.Image("projects/ee-narayanthapa/assets/LandCover_NP_2019");
/// Model section ///
////// chat gpt code ///
// Import the Nightlight dataset
var nightlight_1992 = landcover2019
var nightlight_2014 = landcover2000
// Filter the data by year range
var night_vis= {
  bands:['b1'],
  min:1,
  max:11,
  palette:['0046c7','368BC1','729DC8','228B22','556061','fa0000','f096ff','b4b4b4','9b7653','447741','fae6a0']
}
// Component section //
var c={};
//empty panel
c.controlPanel=ui.Panel();
// information
// Year from user
c.inputYear={}
c.inputYear.label1=ui.Label("2019 land cover")
c.inputYear.label2=ui.Label("2000 land cover")
// defining legend widiget
// Define a legend widget group.
/*composition***************************/
//default map
// dividing map into two component
c.leftmap=ui.Map({center: {lat:27.6332, lon:85.5277 , zoom:9}})
c.leftmap.setControlVisibility(false)
c.leftmap.setOptions('SATELLITE')
c.rightmap=ui.Map({center: {lat:27.6332, lon:85.5277, zoom:9}})
c.rightmap.setControlVisibility(true);
c.rightmap.setOptions('SATELLITE')
// Adding image to map:
var leftimage=ui.Map.Layer()
var rightimage=ui.Map.Layer()
c.rightmap.addLayer(nightlight_1992, night_vis, 'land cover 2000')
c.leftmap.addLayer(nightlight_2014, night_vis, 'land cover 2019')
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
var info1 = ui.Panel({
  style: {
    position: 'bottom-center',
    padding: '8px 15px'
  }
});
var info2 = ui.Label({
  value: ' Land cover 2019',
  style: {
    fontSize: '16px',
    margin: '0 0 3px 0',
    padding: '0'
    }
});
var info3 = ui.Label({
  value: ' Land cover 2000',
  style: {
    fontSize: '16px',
    margin: '0 0 3px 0',
    padding: '0'
    }
});
info.add(info2);
c.rightmap.add(info);
info1.add(info3)
c.leftmap.add(info1)
//Add legend
// Add map legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Legend',
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
var classColour = ['0046c7','368BC1','729DC8','228B22','556061','fa0000','f096ff','b4b4b4','9b7653','447741','fae6a0'];
// Set legend labels
var labelName = ['Waterbody','Glacier','Snow','Forest','Riverbed','Built-up area','Cropland','Bare soil','Bare rock','Grassland','Wooded land'];
// Combine legend colour and labels
for (var i = 0; i < 11; i++) {
  legend.add(content(classColour[i], labelName[i]));
  }  
// Add legend
c.rightmap.add(legend);