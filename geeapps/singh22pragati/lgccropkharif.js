var hdg = ee.FeatureCollection("users/singh22pragati/haidergarhprojectarea"),
    lalit = ee.FeatureCollection("users/singh22pragati/lalitpur"),
    lgc = ee.FeatureCollection("users/singh22pragati/command_area"),
    bewar = ee.FeatureCollection("users/singh22pragati/Bewarcommand"),
    etawah = ee.FeatureCollection("users/singh22pragati/Etawah_command_Output"),
    fathepur = ee.FeatureCollection("users/singh22pragati/Fatehpur_command_Output"),
    Non_com = ee.FeatureCollection("users/singh22pragati/Non_command_Output"),
    farrukhabad = ee.FeatureCollection("users/singh22pragati/farrukhabad_command_Output"),
    kanpur = ee.FeatureCollection("users/singh22pragati/kanpurcommand_Output"),
    west_allahabad = ee.FeatureCollection("users/singh22pragati/UPWSRP-II/Kharif/Allahabad/W_Allahabad_command"),
    bhogni = ee.FeatureCollection("users/singh22pragati/Bhognipur"),
    myCollection1 = ee.ImageCollection("users/singh22pragati/bhognirabi");
var wa = ee.FeatureCollection(bhogni)
var p = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' LGC Command Area ')]
});
var p1 = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' Kharif ')]
});
var p2 = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' Kharif ')]
});
var b3 = ui.Button({
  label: 'Lower Ganaga Canal Command System',
  onClick: function() {
    b3.style().set('shown', true);
    p.style().set('shown', true);
  }
});
Map.add(b3);
ui.root.insert(0, p);
//crop classification
var startDate = '2018-08-01';
var endDate = '2018-10-30';
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
//var image2 = l8.median();
//Map.addLayer(l8.min(),{bands: ['B5', 'B4', 'B3'], max: 0.3}, 'Landsat image fcc')
function maskL8(image) {
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(Math.pow(2, 12)).neq(1).and(  // cirrus
             qa.bitwiseAnd(Math.pow(2, 13)).neq(1)).and( // cirrus
             qa.bitwiseAnd(Math.pow(2, 14)).neq(1)).and( // cloud
             qa.bitwiseAnd(Math.pow(2, 15)).neq(1));     // cloud
  return image.updateMask(mask);
}
var image1 = l8.filterDate(startDate, endDate)
                 .map(maskL8)
                  .mosaic();
//var image = image1.clip(wa);
// Create NDVI and NDWI spectral indices.
var ndvi = image1.normalizedDifference(['B5', 'B4']);
//var ndwi = image.normalizedDifference(['B3', 'B5']);
// Create a binary layer using logical operations.
var crop_lgc = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_bewar = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_etawah = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_fathepur = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_farukhabad = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_kanpur = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_westallahabad = ndvi.gt(0.3).and(ndvi.lt(0.7));
var crop_bhognipur = ndvi.gt(0.3).and(ndvi.lt(0.7));
//crop image
var ima_lgc = ee.Image(crop_lgc).clip(lgc)
var ima_bewar = ee.Image(crop_bewar).clip(bewar)
var ima_etawah = ee.Image(crop_etawah).clip(etawah)
var ima_fathepur = ee.Image(crop_fathepur).clip(fathepur)
var ima_farukhabad = ee.Image(crop_farukhabad).clip(farrukhabad)
var ima_kanpur = ee.Image(crop_kanpur).clip(kanpur)
var ima_westallahabad = ee.Image(crop_westallahabad).clip(west_allahabad)
var ima_bhognipur = ee.Image(crop_bhognipur).clip(bhogni)
//visualization
var rgb_vis = {min: 0, max: 1, palette: ['ffffff','00ca00']};
var b2 = ui.Button({
  label: 'kharif',
  onClick: function() {
    b2.style().set('shown', true);
    p1.style().set('shown', true);
     // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      p1.style().set('shown', false);
      b2.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
var places = {
  haidergarh :[hdg],
  Lalitpur : [lalit],
  LGC :[lgc],
  Farrukhanad: [farrukhabad],
  Bewar:[bewar],
  Bhognipur:[bhogni],
  Etawah:[etawah],
  Kanpur:[kanpur],
  Fatehpur:[fathepur],
 WestAllahabad:[west_allahabad],
 NonCommand:[Non_com]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.centerObject(places[key][0], places[key][11]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose Canal Command');
var checkbox = ui.Checkbox('LGC', false);
var checkbox2 = ui.Checkbox('Bewar', false);
var checkbox3 = ui.Checkbox('Etawah', false);
var checkbox4 = ui.Checkbox('Fathepur', false);
var checkbox5 = ui.Checkbox('Farukhabad', false);
var checkbox6 = ui.Checkbox('Kanpur', false);
var checkbox7 = ui.Checkbox('West Allahabad', false);
var checkbox8 = ui.Checkbox('Bhognipur', false);
//checkboxes
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
checkbox5.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked);
});
checkbox6.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(5).setShown(checked);
});
checkbox7.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(6).setShown(checked);
});
checkbox8.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(7).setShown(checked);
});
p.add(select)
p.add(b2)
p.add(p1)
p1.add(checkbox,false);
p1.add(checkbox2,false);
p1.add(checkbox3,false);
p1.add(checkbox4,false);
p1.add(checkbox5,false);
p1.add(checkbox6,false);
p1.add(checkbox7,false);
p1.add(checkbox8,false);
Map.addLayer(ima_lgc,rgb_vis,'Crop LGC',false)
Map.addLayer(ima_bewar,rgb_vis,'Crop_Bewar',false);
Map.addLayer(ima_etawah,rgb_vis,'Crop Etawah',false);
Map.addLayer(ima_fathepur,rgb_vis,'Crop Fathepur',false);
Map.addLayer(ima_farukhabad,rgb_vis,'Crop Farukkhabad',false);
Map.addLayer(ima_kanpur,rgb_vis,'Crop Kanpur',false);
Map.addLayer(ima_westallahabad,rgb_vis,'Crop West allahabad',false);
Map.addLayer(ima_bhognipur,rgb_vis,'Crop Bhognipur',false);
var legendTitle = ui.Label({
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
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
var palette =['ffffff','00ca00'];
// name of the legend
var names = ['No value','Crop'];
// Add color and and names
for (var i = 0; i <2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
Map.centerObject(lgc,8);