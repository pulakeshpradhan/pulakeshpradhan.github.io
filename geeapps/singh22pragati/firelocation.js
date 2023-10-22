var dataset = ee.ImageCollection('FIRMS')
var fires = dataset.select('T21');
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//
var b4 = ui.Button({
  label: 'Reset',
  onClick: function() {
    Map.clear();
  }
});
 var roi
 var countries = ee.FeatureCollection("users/singh22pragati/up75_dist_bound");
var countryNames = countries.aggregate_array('D_NAME')
var select = ui.Select({
  items: countryNames.getInfo(),
  placeholder: "Select Uttar Pradesh District",
  onChange: function(country) {
   roi =  ee.FeatureCollection("users/singh22pragati/up75_dist_bound")
        .filterMetadata("D_NAME", "equals", country);
    Map.addLayer(roi)
    Map.centerObject(roi)
  }
});
var roi
 var countries = ee.FeatureCollection("users/singh22pragati/block_boundary_up");
var countryNames = countries.aggregate_array('DIST_NAME')
var select2 = ui.Select({
  items: countryNames.getInfo(),
  placeholder: "Select Uttar Pradesh Blocks",
  onChange: function(country) {
   roi =  ee.FeatureCollection("users/singh22pragati/block_boundary_up")
        .filterMetadata("DIST_NAME", "equals", country);
    var empty = ee.Image().byte();
    var outline = empty.paint({
  featureCollection: roi,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'red'}, 'Block Boundary')
  }
});
var roi
var countries = ee.FeatureCollection("users/hrishippatel/IndiaStates")
var countryNames = countries.aggregate_array('NAME_1')
var select1 = ui.Select({
  items: countryNames.getInfo(),
  placeholder: "Select State of India",
  onChange: function(country) {
   roi =  ee.FeatureCollection("users/hrishippatel/IndiaStates")
        .filterMetadata('NAME_1', "equals", country);
    Map.addLayer(roi)
    Map.centerObject(roi)
  }
});
//var SartDate = ST.getValue();
//var EndDate =  ED.getValue();
//Map.add(select)
var a =ee.Number(10)
//Map.add(select)
var year = ['2020','2019','2018', '2017', '2016','2015','2014'];
var month = ['01','02','03','04','05','06','07','08','09','10','11','12']
var day = ['01','02','03','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
//var day = ['31','30','29']
//var palettes = require('users/gena/packages:palettes');
//var palette = palettes.kovesi.linear_kryw_5_100_c64[7].reverse();
/*var visparam={
  min: 0,
  max: 60,
  palette: palette};*/
// Add dropdown for date
var selectYear = ui.Select({
  items: year,
  value: year[0],
  style:{padding: '0px 0px 0px 5px', stretch: 'horizontal'}
});
var selectYear1 = ui.Select({
  items: year,
  value: year[0],
  style:{padding: '0px 0px 0px 5px', stretch: 'horizontal'}
});
var selectMonth = ui.Select({
  items: month,
  value: month[0],
  style:{padding: '0px 0px 0px 5px', stretch: 'horizontal'}
});
var selectDay = ui.Select({
  items: day,
  value: day[1],
  style:{padding: '0px 0px 0px 5px', stretch: 'horizontal'}
});
var range = {
  'January' : ['01-01', '01-31'],
  'Februray': ['02-01', '02-28'],
  'March' : ['03-01', '03-31'],
  'April' : ['04-01', '04-30'],
  'May' : ['05-01', '05-31'],
  'June' : ['06-01', '06-30'],
  'July' : ['07-01', '07-31'],
  'August' : ['08-01', '08-31'],
  'September' : ['09-01', '09-30'],
  'October' : ['10-01', '10-31'],
  'November': ['11-01', '11-30'],
   'December': ['12-02', '12-31'],
};
var selectMonths1 = ui.Select({
  items: Object.keys(range).slice(0,12),
  value: Object.keys(range)[0],
  style: {stretch: 'horizontal'}
});
Map.centerObject(countries)
var runButton = ui.Button({
  label: 'Calculate',
  onClick: function(){
    var before1 = fires.filterDate(
      selectYear.getValue() + "-" + selectMonth.getValue() + "-" + selectDay.getValue())
      //selectYear.getValue() + "-" + selectMonth.getValue() + "-" + selectDay.getValue())
      .mosaic().clip(roi);
     var firemonthly = fires.filterDate(
      selectYear1.getValue() + "-" + range[selectMonths1.getValue()][0], 
      selectYear1.getValue() + "-" + range[selectMonths1.getValue()][1])
      .mosaic().clip(roi);
var firesVis = {
  min:300,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Map.setCenter(-119.086, 47.295, 6);
Map.addLayer(before1, firesVis, 'Fires'+ selectYear.getValue()+ "-" + selectMonth.getValue() + "-" + selectDay.getValue());
//Map.addLayer(firemonthly, firesVis, 'Fires'+ selectYear.getValue());
   // Map.addLayer(after,visparam,'After_NDVI'+ selectYear1.getValue())
    // create random color layers
  },
    style: {padding: '0px 2px', stretch: 'horizontal'}
});
var runButton1 = ui.Button({
  label: 'Calculate Monthly',
  onClick: function(){
     var firemonthly = fires.filterDate(
      selectYear1.getValue() + "-" + range[selectMonths1.getValue()][0], 
      selectYear1.getValue() + "-" + range[selectMonths1.getValue()][1])
      .mosaic().clip(roi);
var firesVis = {
  min:300,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Map.setCenter(-119.086, 47.295, 6);
//Map.addLayer(before1, firesVis, 'Fires'+ selectYear.getValue()+ "-" + selectMonth.getValue() + "-" + selectDay.getValue());
Map.addLayer(firemonthly, firesVis, 'Fires'+ selectYear.getValue()+ "-" + range[selectMonths1.getValue()]);
   // Map.addLayer(after,visparam,'After_NDVI'+ selectYear1.getValue())
    // create random color layers
  },
    style: {padding: '0px 2px', stretch: 'horizontal'}
});
// Create a panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '250px'}
});
// Add the title
var mapTitle = ui.Label('Fire Information System ');
mapTitle.style().set('color', 'blue');
mapTitle.style().set('fontWeight', 'bold');
mapTitle.style().set({
  fontSize: '20px',
  padding: '10px'
});
// Add description
var mapDesc = ui.Label('The status of Forest and Agriculture Fires  in Uttar Pradesh(Districtwise) and other states of India can be seen in the maps ');
mapDesc.style().set({
  fontSize: '16px',
  padding: '0px 10px'
});
// Style cursor to crosshair
Map.style().set('cursor', 'crosshair');
panel.add(mapTitle);
panel.add(mapDesc);
panel.add(ui.Panel([select1,select,select2], 
                  ui.Panel.Layout.flow('vertical')))
panel.add(ui.Panel([selectYear, selectMonth,selectDay], 
                  ui.Panel.Layout.flow('horizontal')));
//panel.add(ui.Panel([selectYear1,selectMonths2], 
                  //ui.Panel.Layout.flow('horizontal')));
panel.add(runButton);
var label = ui.Label('Monthly Fire Points ')
panel.add(label)
panel.add(ui.Panel([selectYear1,selectMonths1],
ui.Panel.Layout.flow('horizontal')));
panel.add(runButton1);
//panel.add(textbox)
//panel.add(runButton2)
panel.add(b4)
//check
ui.root.insert(0, panel);
/*
////////////////////////////////
var runButton2 = ui.Button({
  label: 'Legend',
  onClick: function(){
    //LEGEND
// set position of panel
var legend = ui.Panel({
 style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var p = ui.Panel({
    widgets: [
      ui.Label(visparam['min'])
    ],
  });
var l = ui.Panel({
    widgets: [
      ui.Label(visparam['max'])
    ],
  });
legend.add(legendTitle,visparam); 
legend.add(l)
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visparam.max-visparam.min)/100.0).add(visparam.min);
var legendImage = gradient.visualize(visparam)
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
legend.add(p)
// create text on top of legend
Map.add(legend);
}
});
panel.add(runButton2)
*/