var myCollection = ee.ImageCollection("users/singh22pragati/allahabad");
var wa = ee.FeatureCollection("users/singh22pragati/UPWSRP-II/Kharif/Allahabad/W_Allahabad_command"),
    image = ee.Image("users/singh22pragati/UPWSRP-II/Kharif/Allahabad/2011_12");
var p3 = ui.Panel({
  style: {width: '400px', shown: false  },
  widgets: [ui.Label(' LGC Command Area ')]
});
var b3 = ui.Button({
  label: 'LGC',
  onClick: function() {
    b3.style().set('shown', true);
    p3.style().set('shown', true);
  }
});
Map.add(b3);
ui.root.insert(0, p3);
var listOfImages = myCollection.toList(myCollection.size());
var firstImage = listOfImages.get(0)
var secondImage = listOfImages.get(1)
var thirdImage = listOfImages.get(3)
var fourthImage = listOfImages.get(4)
var fifthImage = listOfImages.get(5)
var sixthImage = listOfImages.get(6)
var seventhImage = listOfImages.get(7)
var lastImage = listOfImages.get(listOfImages.length().subtract(1))
print(firstImage);
print(secondImage);
print(myCollection)
var ima = ee.Image(firstImage).clip(wa)
var ima2 = ee.Image(secondImage).clip(wa)
var ima3 = ee.Image(thirdImage).clip(wa)
var ima4 = ee.Image(fourthImage).clip(wa)
var ima5 = ee.Image(fifthImage).clip(wa)
var ima6 = ee.Image(sixthImage).clip(wa)
var ima7 = ee.Image(seventhImage).clip(wa)
var ima8 = ee.Image(lastImage).clip(wa)
var rgb_vis = {min: 0, max: 1, palette: ['ffffff','00ca00']};
//var rgb_vis = {min: 0, max: 1, palette: ['ffffff','00ca00']}; 
var checkbox = ui.Checkbox('West allahabad Kharif 2011-12', false);
var checkbox2 = ui.Checkbox('West allahabad Kharif 2012-13', false);
var hdg = ee.FeatureCollection("users/singh22pragati/haidergarhprojectarea"),
    lalit = ee.FeatureCollection("users/singh22pragati/lalitpur"),
    lgc = ee.FeatureCollection("users/singh22pragati/command_area"),
    bewar = ee.FeatureCollection("users/singh22pragati/Bewarcommand"),
    bhogni = ee.FeatureCollection("users/singh22pragati/Bhognipur_command_Output"),
    etawah = ee.FeatureCollection("users/singh22pragati/Etawah_command_Output"),
    fathepur = ee.FeatureCollection("users/singh22pragati/Fatehpur_command_Output"),
    Non_com = ee.FeatureCollection("users/singh22pragati/Non_command_Output"),
    farrukhabad = ee.FeatureCollection("users/singh22pragati/farrukhabad_command_Output"),
    kanpur = ee.FeatureCollection("users/singh22pragati/kanpurcommand_Output"),
    west_allahabad = ee.FeatureCollection("users/singh22pragati/UPWSRP-II/Kharif/Allahabad/W_Allahabad_command");
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
    Map.centerObject(places[key][0], places[key][1]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose Canal Command');
var checkbox = ui.Checkbox('West allahabad Kharif 2011-12', false);
var checkbox2 = ui.Checkbox('West allahabad Kharif 2012-13', false);
var checkbox3 = ui.Checkbox('West allahabad Kharif 2013-14', false);
var checkbox4 = ui.Checkbox('West allahabad Kharif 2014-15', false);
var checkbox5 = ui.Checkbox('West allahabad Kharif 2015-16', false);
var checkbox6 = ui.Checkbox('West allahabad Kharif 2016-17', false);
var checkbox7 = ui.Checkbox('West allahabad Kharif 2017-18', false);
var checkbox8 = ui.Checkbox('West allahabad Kharif 2018-19', false);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox5.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox6.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox7.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
checkbox8.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
//var alla= image.clip(wa);
//Map.addLayer(ee.Image(alla));
p3.add(select)
p3.add(checkbox,false);
p3.add(checkbox2,false);
p3.add(checkbox3,false);
p3.add(checkbox4,false);
p3.add(checkbox5,false);
p3.add(checkbox6,false);
p3.add(checkbox7,false);
p3.add(checkbox8,false);
Map.centerObject(wa,8);
Map.addLayer(ima,rgb_vis,'kharif 2011-12',false);
Map.addLayer(ima2,rgb_vis,'kharif 2012-13',false);
Map.addLayer(ima3,rgb_vis,'kharif 2013-14',false);
Map.addLayer(ima4,rgb_vis,'kharif 2014-15',false);
Map.addLayer(ima5,rgb_vis,'kharif 2015-16',false);
Map.addLayer(ima6,rgb_vis,'kharif 2016-17',false);
Map.addLayer(ima7,rgb_vis,'kharif 2017-18',false);
Map.addLayer(ima8,rgb_vis,'kharif 2018-19',false);
// Create legend title
var legendTitle = ui.Label({
  value: 'Crop Classification',
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