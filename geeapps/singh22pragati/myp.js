var myCollection = ee.ImageCollection("users/singh22pragati/bhonipur"),
    hdg = ee.FeatureCollection("users/singh22pragati/haidergarhprojectarea"),
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
  label: 'Bhognipur',
  onClick: function() {
    b3.style().set('shown', true);
    p.style().set('shown', true);
  }
});
Map.add(b3);
ui.root.insert(0, p);
var listOfImages = myCollection.toList(myCollection.size());
var firstImage = listOfImages.get(0)
var secondImage = listOfImages.get(1)
var thirdImage = listOfImages.get(3)
var fourthImage = listOfImages.get(4)
var fifthImage = listOfImages.get(5)
var sixthImage = listOfImages.get(6)
var seventhImage = listOfImages.get(7)
var lastImage = listOfImages.get(listOfImages.length().subtract(1))
var listOfImages = myCollection1.toList(myCollection1.size());
var first = listOfImages.get(0)
var second = listOfImages.get(1)
var third = listOfImages.get(3)
var fourth = listOfImages.get(4)
var fifth = listOfImages.get(5)
var sixth = listOfImages.get(6)
var seventh = listOfImages.get(7)
var last = listOfImages.get(listOfImages.length().subtract(1))
print(firstImage);
print(secondImage);
print(first)
print(myCollection)
print(myCollection1)
var ima = ee.Image(firstImage).clip(wa)
var ima2 = ee.Image(secondImage).clip(wa)
var ima3 = ee.Image(thirdImage).clip(wa)
var ima4 = ee.Image(fourthImage).clip(wa)
var ima5 = ee.Image(fifthImage).clip(wa)
var ima6 = ee.Image(sixthImage).clip(wa)
var ima7 = ee.Image(seventhImage).clip(wa)
var ima8 = ee.Image(lastImage).clip(wa)
var ima9 = ee.Image(first).clip(wa)
var ima10 = ee.Image(second).clip(wa)
var ima11 = ee.Image(third).clip(wa)
var ima12 = ee.Image(fourth).clip(wa)
var ima13 = ee.Image(fifth).clip(wa)
var ima14 = ee.Image(sixth).clip(wa)
var ima15 = ee.Image(seventh).clip(wa)
var ima16 = ee.Image(last).clip(wa)
var rgb_vis = {min: 0, max: 1, palette: ['ffffff','00ca00']};
var b2 = ui.Button({
  label: 'Bhognipur_kharif',
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
var b = ui.Button({
  label: 'Bhognipur_RABI',
  onClick: function() {
    b.style().set('shown', true);
    p2.style().set('shown', true);
     // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      p2.style().set('shown', false);
      b.style().set('shown', true);
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
var checkbox = ui.Checkbox('Bhognipur Kharif 2011-12', false);
var checkbox2 = ui.Checkbox('Bhognipur Kharif 2012-13', false);
var checkbox3 = ui.Checkbox('Bhognipur Kharif 2013-14', false);
var checkbox4 = ui.Checkbox('Bhognipur Kharif 2014-15', false);
var checkbox5 = ui.Checkbox('Bhognipur Kharif 2015-16', false);
var checkbox6 = ui.Checkbox('Bhognipur Kharif 2016-17', false);
var checkbox7 = ui.Checkbox('Bhognipur Kharif 2017-18', false);
var checkbox8 = ui.Checkbox('Bhognipur Kharif 2018-19', false);
var checkbox9 = ui.Checkbox('Bhognipur Rabi 2011-12', false);
var checkbox10 = ui.Checkbox('Bhognipur Rabi 2012-13', false);
var checkbox11 = ui.Checkbox('Bhognipur Rabi 2013-14', false);
var checkbox12 = ui.Checkbox('Bhognipur Rabi 2014-15', false);
var checkbox13 = ui.Checkbox('Bhognipur Rabi 2015-16', false);
var checkbox14 = ui.Checkbox('Bhognipur Rabi 2016-17', false);
var checkbox15 = ui.Checkbox('Bhognipur Rabi 2017-18', false);
var checkbox16 = ui.Checkbox('Bhognipur Rabi 2018-19', false);
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
checkbox9.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(8).setShown(checked);
});
checkbox10.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(9).setShown(checked);
});
checkbox11.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(10).setShown(checked);
});
checkbox12.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(11).setShown(checked);
});
checkbox13.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(12).setShown(checked);
});
checkbox14.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(13).setShown(checked);
});
checkbox15.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(14).setShown(checked);
});
checkbox16.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(15).setShown(checked);
});
//var alla= image.clip(wa);
//Map.addLayer(ee.Image(alla));
p.add(select)
p.add(b2)
p.add(p1)
p.add(b)
p.add(p2)
p1.add(checkbox,false);
p1.add(checkbox2,false);
p1.add(checkbox3,false);
p1.add(checkbox4,false);
p1.add(checkbox5,false);
p1.add(checkbox6,false);
p1.add(checkbox7,false);
p1.add(checkbox8,false);
p2.add(checkbox9,false);
p2.add(checkbox10,false);
p2.add(checkbox11,false);
p2.add(checkbox12,false);
p2.add(checkbox13,false);
p2.add(checkbox14,false);
p2.add(checkbox15,false);
p2.add(checkbox16,false);
Map.addLayer(ima,rgb_vis,'kharif 2011-12(63645.26 Ha.)',false)
Map.addLayer(ima2,rgb_vis,'kharif 2012-13(70278.71 Ha.)',false);
Map.addLayer(ima3,rgb_vis,'kharif 2013-14(69959.8 Ha.)',false);
Map.addLayer(ima4,rgb_vis,'kharif 2014-15(72425.71 Ha.)',false);
Map.addLayer(ima5,rgb_vis,'kharif 2015-16(73543.25 Ha.)',false);
Map.addLayer(ima6,rgb_vis,'kharif 2016-17(79318.1 Ha.)',false);
Map.addLayer(ima7,rgb_vis,'kharif 2017-18(83748.54 Ha.)',false);
Map.addLayer(ima8,rgb_vis,'kharif 2018-19(70278.71 Ha.)',false);
Map.addLayer(ima9,rgb_vis,'RABI 2011-12(139980.7 Ha.)',false)
Map.addLayer(ima10,rgb_vis,'RABI 2012-13(148116.9 Ha.)',false);
Map.addLayer(ima11,rgb_vis,'RABI 2013-14(148815.5 Ha.)',false);
Map.addLayer(ima12,rgb_vis,'RABI 2014-15(150117.6 Ha.)',false);
Map.addLayer(ima13,rgb_vis,'RABI 2015-16(155370.5 Ha.)',false);
Map.addLayer(ima14,rgb_vis,'RABI 2016-17(154424.9 Ha.)',false);
Map.addLayer(ima15,rgb_vis,'RABI 2017-18(155931.2 Ha.)',false);
Map.addLayer(ima16,rgb_vis,'RABI 2018-19',false);
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
Map.centerObject(wa,8);