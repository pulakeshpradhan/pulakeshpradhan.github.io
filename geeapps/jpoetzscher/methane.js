var dataset = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
.select('CH4_column_volume_mixing_ratio_dry_air');
// ABOUT PANEL about_Panel_visible
// 1 to start visible
// 0 to start collapsed
var aboutPanel_visible=1;
// Create legend panel 
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'top-right', margin: '20px'}
});
var mapPanel = ui.Map();
var layers = mapPanel.layers();
var aboutPanel = ui.Panel(
  {
//    layout: ui.Panel.Layout.absolute(),
    style: {width: '20%', margin: '10px'}
  }
  );
var intro = ui.Panel([
  ui.Label({
    value: 'Introduction',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Lorem ipsum dolor sit amet, duo in eirmod regione argumentum, duo feugait placerat theophrastus ex, cum at quaeque laboramus comprehensam. Agam mazim tamquam vel at, aperiam corpora est an, eruditi euripidis ad qui. Vim quas dolor adipisci te. Eos illud habemus eu, ad vituperata efficiendi est. Duo an primis complectitur, cu diam doming vituperata pro. Nec eu democritum scribentur. Eum et noster gloriatur, mel reque labitur tractatos et. Erat phaedrum conceptam quo et, diam quodsi his id, te eam sale contentiones. Et vis ipsum fugit malorum, eam an mucius civibus efficiendi, mel modo solet at. Veniam adipiscing intellegebat nam et.',
    style: {fontSize: '13'}
 })]);
aboutPanel.add(intro);
var aboutButton = ui.Button({
  label: 'Close',
  onClick: function() {
          ui.root.remove(aboutPanel);
          mapPanel.add(button);
          aboutPanel_visible = 0;
  },
  style: {width: '95%'},
});
aboutPanel.add(aboutButton);
ui.root.clear();
ui.root.add(mapPanel);
var button = ui.Button({
  label: 'About',
  onClick: function() { 
    print (aboutPanel_visible);
    if (aboutPanel_visible === 0)
      {
      ui.root.insert(0,aboutPanel);
      aboutPanel_visible = 1;
      mapPanel.remove(button);
      }
      else
      {
      aboutPanel_visible = 0;
      ui.root.remove(inspectorPanel);
      }
  },
  style: {position: 'bottom-left'}
});
mapPanel.setControlVisibility(false);
mapPanel.setOptions('Terrain');
mapPanel.add(button);
mapPanel.add(panel);
// LEGEND PANEL START
var legendTitle = ui.Label({
value: 'Global Methane Concentration',
style: {fontWeight: 'bold', fontSize: '15px',  width: '100%', textAlign: 'center'}
});
panel.add(legendTitle);
// LEGEND PANEL END
// ON CHANGE YEAR
// Function
var l3_ch4_year = function(key){
// Calculate date
var start = ee.Date(places1[key][0]);//range.start();
var end   = ee.Date(places1[key][1]);//start.advance(1, 'month');
var img_ch4 = dataset.filter(ee.Filter.date(start,end));
// we only remove the current layer if there's one already loaded
if (mapPanel.layers().get(0))
  mapPanel.remove(mapPanel.layers().get(0));
// Map addayer
currentImage=img_ch4.select('CH4_column_volume_mixing_ratio_dry_air').mean();
mapPanel.addLayer(currentImage, vis, 'Year - CH4: '+ start.get('day').getInfo()+'/'+start.get('month').getInfo()+'/'+start.get('year').getInfo()+' - '+ end.get('day').getInfo()+'/'+end.get('month').getInfo()+'/'+end.get('year').getInfo());
//print(panel.widgets());
// rebuild/restart the Selectbox
// this depends on panel order, if we modify the order in the future set(2 needs to be updated acordingly
panel.widgets().set(2, ui.Select( 
    {
      items: Object.keys(places),
      onChange:l3_ch4_month,
      style: {textAlign: 'right', position: 'top-right', width: '95%'},
      value: places[0],
      placeholder:'Month'
  }
  ));
};
// ON CHANGE MONTH
// Function
var l3_ch4_month = function(key){
// Calculate date
var start = ee.Date(places[key][0]);//range.start();
var end   = ee.Date(places[key][1]);//start.advance(1, 'month');
var img_ch4 = dataset.filter(ee.Filter.date(start,end));
// we only remove the current layer if there's one already loaded
if (mapPanel.layers().get(0))
  mapPanel.remove(mapPanel.layers().get(0));
//map addlayer  
currentImage=img_ch4.select('CH4_column_volume_mixing_ratio_dry_air').mean();  
mapPanel.addLayer(img_ch4.select('CH4_column_volume_mixing_ratio_dry_air').mean(), vis, 'Month - CH4: '+ start.get('day').getInfo()+'/'+start.get('month').getInfo()+'/'+start.get('year').getInfo()+' - '+ end.get('day').getInfo()+'/'+end.get('month').getInfo()+'/'+end.get('year').getInfo());
// rebuild/restart the Selectbox
// this depends on panel order, if we modify the order in the future set(4 needs to be updated acordingly
panel.widgets().set(4, ui.Select( 
    {
      items: Object.keys(places1),
      onChange:l3_ch4_year,
      style: {textAlign: 'right', position: 'top-right', width: '95%'},
      value: places1[0],
      placeholder:'Year'
  }
  ));
};
// dates
var places = {
  'April 2020': ['2020-04-01', '2020-04-07'],
  'March 2020': ['2020-03-01', '2020-03-31'],
  'February 2020': ['2020-02-01', '2020-02-29'],
  'January 2020': ['2020-01-01', '2020-01-31'],
  'December 2019': ['2019-12-01', '2019-12-31'],
  'November 2019': ['2019-11-01', '2019-11-30'],
  'October 2019': ['2019-10-01', '2019-10-31'],
  'September 2019': ['2019-09-01', '2019-09-30'],
  'August 2019': ['2019-08-01', '2019-08-31'],
  'July 2019': ['2019-07-01', '2019-07-31'],
  'June 2019': ['2019-06-01', '2019-06-30'],
  'May 2019': ['2019-05-01', '2019-05-31'],
  'April 2019': ['2019-04-01', '2019-04-30'],
  'March 2019': ['2019-03-01', '2019-03-31'],
  'February 2019': ['2019-02-01', '2019-02-28'],
  'January 2019': ['2019-01-01', '2019-01-31']
};
var monthlyLabel = ui.Label({
  value: 'Select Monthly Average', 
  style: {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px'}
  });
panel.add(monthlyLabel);
// Monthly Select
var select1 = ui.Select({
  items: Object.keys(places),
  onChange:l3_ch4_month,
  style: {width: '95%'}
});
// Set a place holder.
select1.setPlaceholder('Monthly Averages');
panel.add(select1);
// dates
var places1 = {
  '2020': ['2020-01-01', '2020-12-31'],
  ' 2019': ['2019-01-01', '2019-12-31']
};
var yearlyLabel = ui.Label({
  value: 'Or Select Yearly Average',
  style: {margin: '4px 8px', width: '100%', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px'}
  });
panel.add(yearlyLabel);
// Yearly Select
var select = ui.Select({
  items: Object.keys(places1),
  onChange:l3_ch4_year,
  style: {width:'300px'}
});
select.setPlaceholder('Yearly Averages');
panel.add(select);
print('Map.layers(): ',Map.layers());
/*
* Panel setup//
*/
var legend = ui.Panel();
// Creates Title for legend
var legendTitle = ui.Label({
value: 'Methane Column Volume Mixing Ratio Dry Air (ppbv)',
style: {fontWeight: 'bold', fontSize: '11px'}
});
legend.add(legendTitle);
// Creates Label for legend
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
return {
bbox: [0, 0, 1, 0.1],
dimensions: '100x10',
format: 'png',
min: 0,
max: 1,
palette: palette,
};
}
var vis = {
min: 1700,
max: 1950,
palette: ['purple','blue', 'cyan', 'yellow', 'orange', 'red']
};
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
image: ee.Image.pixelLonLat().select(0),
params: makeColorBarParams(vis.palette),
style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
widgets: [
ui.Label(vis.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'}),
ui.Label(
((vis.max + vis.min) / 2),
{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px'}),
ui.Label(vis.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'})
],
layout: ui.Panel.Layout.flow('horizontal')
});
// scope
var currentImage = ee.Image();
mapPanel.style().set('cursor', 'crosshair');
mapPanel.onClick(function(coords) {
  var latitude = 'Latitude: ' + coords.lat.toFixed(4);
  var longitude = 'Longitude: ' + coords.lon.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  //print(click_point);
  //text style
 latitude = {value: latitude, style: {fontSize: '13px'}};
 //inspectorPanel.widgets().set(1, ui.Label(latitude));
 longitude = {value: longitude, style: {fontSize: '13px'}};
 //inspectorPanel.widgets().set(2, ui.Label(longitude));
//// inspectorPanel.widgets().set(1, ui.Label("Latitude: -"));
// inspectorPanel.widgets().set(2, ui.Label("Longitude: -"));
  //We need the layer casted to image to be able to use reduceRegion on it
    var mapValue = currentImage.reduceRegion(ee.Reducer.mean(), click_point, 100)
  //Asynchronous Event for the query
  .evaluate(
      function(val)
      {
      var mapvalueText = 'Methane Mixing Ratio: ' + val.CH4_column_volume_mixing_ratio_dry_air.toFixed(4) + ' (ppbv)';
      mapvalueText= {value: mapvalueText,style: {fontSize: '13px'}};
      inspectorPanel.widgets().set(1, ui.Label(latitude));
      inspectorPanel.widgets().set(2, ui.Label(longitude));
      inspectorPanel.widgets().set(3, ui.Label(mapvalueText));
      }
    );
//This is the NODATA default
// var noData =  "Methane Mixing Ratio: no data";
// noData = {value: noData, style: {fontSize: '13px'}};
// inspectorPanel.widgets().set(3, ui.Label(noData));
});
// MAP CLICK END
//INSPECTOR PANEL START
var inspectorPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
var inspectorTitle = ui.Label({
  value: 'Value at Point',
  style: {margin: '4px 8px', fontWeight: 'bold', fontSize: '13px'}
});
inspectorPanel.add(inspectorTitle);
 var placeHolder = ui.Label({
    value: 'Click a point to get value',
    style: {margin: '4px 8px', fontSize: '13px'},
    });
inspectorPanel.add(placeHolder);
//INSPECTOR PANEL END
panel.add(inspectorPanel);
legend.add(legendLabels);
panel.add(legend);
select1.setValue(Object.keys(places)[0], true);
mapPanel.setCenter(35,0,2.2);
if (aboutPanel_visible !== 0)
  {
  ui.root.insert(0,aboutPanel);
  aboutPanel_visible = 1;
  mapPanel.remove(button);
  }
  else
  {
  aboutPanel_visible = 0;
  ui.root.remove(inspectorPanel);
  }