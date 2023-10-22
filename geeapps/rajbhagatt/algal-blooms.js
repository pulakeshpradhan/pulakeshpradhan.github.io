var S2Coll = ee.ImageCollection("COPERNICUS/S2");
var layerProperties = {
    visParams: {min: 200, max: 1500, bands:['B4','B3','B2']},
};
var locOpt = { 
  'Mettur': {lon: 77.7870743, lat: 11.872455, zoom: 12, sdate: '2018-09-25', edate:'2018-09-27',defaultVisibility: true, imdate:'2018-09-12'},
  'Gandhi Sagar - Chambal River': {lon: 75.5834153, lat: 24.533008, zoom: 11, sdate: '2018-10-01', edate:'2018-10-03',defaultVisibility: false, imdate:'2018-09-12'},
  'Bargi - Narmada River': {lon: 80, lat: 22.870726, zoom: 12, sdate: '2018-10-02', edate:'2018-10-07',defaultVisibility: false, imdate:'2018-09-12'},
  'Indira Sagar - Narmada River': {lon: 76.6647743, lat: 22.1762, zoom: 11, sdate: '2018-10-03', edate:'2018-10-07',defaultVisibility: false, imdate:'2018-09-12'},
  'Ukai - Tapti River': {lon: 73.7807375, lat: 21.3443406, zoom: 12, sdate: '2018-09-28', edate:'2018-10-01',defaultVisibility: false, imdate:'2018-09-12'},
  'Kadana - Mahi River': {lon: 73.8850693, lat: 23.345846, zoom: 13, sdate: '2018-09-28', edate:'2018-10-02',defaultVisibility: false, imdate:'2018-09-12'},
  'Hirakud - Mahanadi River': {lon: 83.8333287, lat: 21.6136696, zoom: 12, sdate: '2018-09-28', edate:'2018-09-29',defaultVisibility: false, imdate:'2018-09-12'},
  'Rengali - Brahmani River': {lon: 84.9967703, lat: 21.334977, zoom: 12, sdate: '2018-09-28', edate:'2018-10-01',defaultVisibility: false, imdate:'2018-09-12'},
  'Almatti - Krishna River': {lon: 75.8074293, lat: 16.2943, zoom: 13, sdate: '2018-09-18', edate:'2018-09-20',defaultVisibility: false, imdate:'2018-09-12'},
  'Srisailam - Krishna River': {lon: 78.5156013, lat: 15.88335, zoom: 10, sdate: '2018-10-02', edate:'2018-10-07',defaultVisibility: false, imdate:'2018-09-12'},
  'Nagarjuna Sagar - Krishna River': {lon: 79.2612403, lat: 16.572019, zoom: 13.5, sdate: '2018-09-23', edate:'2018-09-27',defaultVisibility: false, imdate:'2018-09-12'},
  'Somasila - Pennar River': {lon: 79.2588373, lat: 14.472883, zoom: 12.5, sdate: '2018-09-09', edate:'2018-09-12',defaultVisibility: false, imdate:'2018-09-12'},
  'SriRam Sagar - Godavari': {lon: 78.3110873, lat: 18.953886, zoom: 13, sdate: '2018-10-06', edate:'2018-10-07',defaultVisibility: false, imdate:'2018-09-12'},
  'Vaigai': {lon: 77.5750333, lat: 10.055117, zoom: 14, sdate: '2018-09-09', edate:'2018-09-12',defaultVisibility: false, imdate:'2018-09-12'}
};
var mapPanel = ui.Map();
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
var defaultLocation = locOpt.Mettur;
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var datelabel = ui.Label("Date of Observation: 26/09/2018");
mapPanel.add(ui.Panel({widgets: [datelabel],style:{position: "bottom-left"},layout: ui.Panel.Layout.flow('horizontal')}));
for (var locationname in locOpt)
{
  var loc=locOpt[locationname];
  var im = S2Coll.filterBounds(ee.Geometry.Point(loc.lon, loc.lat)).filterDate(loc.sdate,loc.edate);
  var image = im.mosaic().visualize(layerProperties.visParams);
  var dateim= (ee.Date(im.first().get('system:time_start')).format('dd/MM/YYYY'));
  mapPanel.add(ui.Map.Layer(image, {}, locationname, loc.defaultVisibility));
  locOpt[locationname]["imdate"]=dateim;
}
var header = ui.Label('ALGAL BLOOM OBSERVATIONS', {fontSize: '36px', color: 'red'});
var text = ui.Label(
    'Algal Blooms have been spotted in many reservoirs across the country in September and October - 2018; Credits: European Union, Contains Modified Copernicus Sentinel Data [2018]; Processed by Raj Bhagat Palanichamy',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link = ui.Chart(
    [
      ['For discussions around the same'],
      ['<a target="_blank" href=https://twitter.com/rajbhagatt/status/1048914048543154177>' +
       'Twitter Conversations on the Algal Blooms Issue</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel = ui.Panel([link], 'flow', {width: '300px', height: '125px'});
toolPanel.add(linkPanel);
var selectItems = Object.keys(layerProperties);
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    layerSelect.setDisabled(!value);
  }
});
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
var locations = Object.keys(locOpt);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locOpt[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
    var m=locOpt[value]["imdate"];
    m.evaluate(function(m) {
    datelabel.setValue("Date of Observation: "+ m)
    });
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(value == element.getName());
    });
  }
});
var locationPanel = ui.Panel([
  ui.Label('Choose the Reservoir', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);