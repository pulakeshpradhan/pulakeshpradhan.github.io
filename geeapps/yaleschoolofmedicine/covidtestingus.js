//Author: TC (https://tc25.github.io/)
var map = ui.Map() 
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: false, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map   
ui.root.add(map)
 map.setCenter(-105,40,5)   
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: false, fullscreenControl: false})
// Set the default map's cursor to a "crosshair".
map.style().set('cursor', 'crosshair');
// Color labels and palette
// Create a panel to hold our widgets.
//var CT = ee.FeatureCollection("users/yaleschoolofmedicine/Towns_CT").union(50)
var Presence = ee.Image("users/yaleschoolofmedicine/COVID_presence_raster_5_30");
var Prox_main=ee.Image('users/yaleschoolofmedicine/US_cost_surface_Main')
var Prox_alaska=ee.Image('users/yaleschoolofmedicine/US_cost_surface_Alaska')
var Prox_rico=ee.Image('users/yaleschoolofmedicine/US_cost_surface_Puerto_Rico')
var Prox_hawaii=ee.Image('users/yaleschoolofmedicine/US_cost_surface_Hawaii')
//var COVID_class = ee.Image("users/yaleschoolofmedicine/COVID19_presence_classified_9");
var test=ee.FeatureCollection("users/yaleschoolofmedicine/Testing_Locations_6_6")
//var Dat=POP.mean().multiply(COVID);
var Presence=Presence.updateMask(Presence.neq(0));
//Map.addLayer(Dat, {min:0, max:10000, palette:['yellow','brown']});
var ThePALETTE = ['yellow','grey'];
map.addLayer(Presence, {min:0, max:.3, palette:['white','black']} )
//  var uhiwinday=UHIAdded.reduceToImage({properties:['UHIwinday'], reducer:ee.Reducer.first()})
  map.addLayer(Prox_main, {min: 0, max: 50, palette: ThePALETTE, opacity: .65}, 'Smoothed');
 map.addLayer(Prox_alaska, {min: 0, max: 50, palette: ThePALETTE, opacity: .65}, 'Smoothed');
 map.addLayer(Prox_rico, {min: 0, max: 50, palette: ThePALETTE, opacity: .65}, 'Smoothed');
 map.addLayer(Prox_hawaii, {min: 0, max: 50, palette: ThePALETTE, opacity: .65}, 'Smoothed');
 map.addLayer(test.draw({color: 'red', pointRadius:1}) )
function panelcreate() {
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Relative travel time to COVID testing sites for the US',
    style: {fontSize: '1.4vw', fontWeight: 'bold'}
  }),
  ui.Label({
    value:'On this map, currently active COVID-19 testing sites are shown as red dots. These are surrounded by shades of yellow that fade to grey as relative vehicular travel time to the nearest site increases. Current levels of COVID-19 presence are shown in darker shades of grey.',
    style: {fontSize: '.9vw', fontWeight: 'normal'}
})
]);
// var reference1=ui.Label({value:'Read more about UHI',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'http://datadrivenlab.org/urban/issue-profiles/climate-change/'}) 
panel.add(intro);
// panel.add(reference1);
}
// // Create an inspector panel with a horizontal layout.
// var inspector = ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical')
// });
// // Add a label to the panel.
// inspector.add(ui.Label({value: 'Click on map to see results',
// style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
var panel = ui.Panel();
panel.style().set({width: '20%', fontSize: '1vw', fontWeight: 'bold'});
ui.root.insert(1, panel);
panelcreate();
function referencecreate(){
var reference0=ui.Label({value:'Data Sources:',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'}}) 
 var reference2=ui.Label({value:'COVID Presence Data',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'https://yaleschoolofmedicine.users.earthengine.app/view/covidpresencect'}) 
 var reference1=ui.Label({value:'GISCorps',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'https://www.giscorps.org/covid-19-testing-site-locator/'}) 
  var reference6=ui.Label({value:'Weiss, et al. 2018',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'https://www.nature.com/articles/nature25181'}) 
 var reference3=ui.Label({value:'Created by:',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'}}) 
 var reference4=ui.Label({value:'Yale COVID-19 Data Mapping Team',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'https://covid.yale.edu/innovation/mapping/team/'}) 
var reference5=ui.Label({value:'Last Updated: 6/6/2020',style: {color: 'red',fontWeight: 'bold', textAlign: 'center'}}) 
// Add reference to the panel
panel.add(reference0);
panel.add(reference1);
panel.add(reference2);
panel.add(reference6);
panel.add(reference3);
panel.add(reference4);
panel.add(reference5);
}
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
// // Add a label to the panel.
// inspector.add(ui.Label({value: 'Click on one of the red dots to extract testing facility information',
// style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
// // Add the panel to the default map.
// map.add(inspector);
referencecreate()
// map.onClick(function(coords) {
// //Clear panel
// panel.clear()
// Call the panel creation function again
//panelcreate()
//referencecreate()
// Create panels to hold lon/lat and UHI values.
//var lat = ui.Label();
//var lon = ui.Label();
//var Name=ui.Label();
//var County=ui.Label();
//var Panel_label=['None',"1", '2', '3', '4','5','6','7','8','9']
//Add panel
//panel.add(ui.Panel([lat, lon], ui.Panel.Layout.flow('horizontal')))
//panel.add(ui.Panel([Name], ui.Panel.Layout.flow('horizontal')))
//panel.add(ui.Panel([County], ui.Panel.Layout.flow('horizontal')))
// Register a callback on the default map to be invoked when the map is clicked.
  // Add a green boundary encompassing the point clicked on.
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   var dot = ui.Map.Layer(point, {color: 'black'});    
//   map.layers().set(4, dot);
//   inspector.clear()
//   inspector.style().set('shown', true);
//   inspector.add(ui.Label({value:'Loading...', style: {color: 'gray',fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
// //Calculate the UHI values at the points from the images
//   var sampleTest=ee.Feature(test.filterBounds(point.buffer(1000)).first())
//     // Add a label with the results from the server.
//   // Update the lon/lat panel with values from the click event.
//   lat.setValue('Lat: ' + coords.lat.toFixed(2)),
//   lon.setValue('Lon: ' + coords.lon.toFixed(2));
//   Name.setValue('Name: ' + sampleTest.get('name').getInfo());
//   County.setValue('County: ' + sampleTest.get('county').getInfo());
//   // Clear inspector again and display a new label
//   inspector.clear();
//   inspector.style().set('shown', true);
//   inspector.add(ui.Label({value:'Click on another point...',
// style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
//   })
  var vis = {min: 0, max: 500000, palette: ThePALETTE};
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
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label('Low', {margin: '0px 0px'}),
    ui.Label(
        ("Medium"),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('High', {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Travel time',
  style: {fontWeight: 'bold',
    fontSize: '15px'
  }
});
var legendTitle2 = ui.Label({
  value: 'Relative vehicular travel time to nearest testing site',
  style: {fontSize: '12px'
  }
});
var legendPanel = ui.Panel([legendTitle, legendTitle2, colorBar, legendLabels],
    ui.Panel.Layout.flow('vertical'),
    {position: 'top-left'});
map.add(legendPanel)