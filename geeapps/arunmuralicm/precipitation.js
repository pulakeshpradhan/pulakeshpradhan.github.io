var districts = ee.FeatureCollection("users/arunmuralicm/India_district");
var startdate ="2010-01-01"
var enddate = "2018-12-31" 
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(startdate,enddate)
//-------------MONTHLY------------------------ 
//defines period of interest 
var startyear = 2010; 
var endyear = 2018; 
var years = ee.List.sequence(startyear, endyear);
//select data for the period of interest and place
var precip = chirps.filterDate(startdate, enddate)
  .sort('system:time_start', false)
  .filterBounds(districts);
//----------ANNUAL--------
//function for calculating the annual precipitation
var annualPrecip = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = precip
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
var titleAnual = {
  title: 'Annual precipitation',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Precipitation (mm)'},
};
//crate a chart for yearly precipitation data ,using the geometry, and a reducer for 
//calculating mean precipitation area
//app function
var app = function() {
  // UI LEFT PANEL
  var panel = ui.Panel();
  panel.style().set('width','300px')
  // Ui label text
  var title = ui.Panel([
    ui.Label({
      value:'Select administrative boundary',
      style:{fontSize:'20px',fontWeight:'bold', color:'#000000', textAlign:'center'}
    })
    ]);
  panel.add(title)
  ui.root.insert(0, panel);  
  // add feature collection
  // var districts = ee.FeatureCollection('ft:1IHRHUiWkgPXOzwNweeM89CzPYSfokjLlz7_0OTQl')
  var districtsImage = ee.Image().float().paint(districts, 0).paint(districts, 1, 1)
  Map.addLayer(districtsImage, {palette:['000000', 'ffffff']}, 'districts', true, 0.5)
  Map.centerObject(districts,4.5)
  // create feature selector
  var selector = new MapFeatureSelector('districts', Map, districts, panel)
  // subscribe to selection
  selector.onSelect(function(selection) {
    print('Current selection: ', ee.Feature(selection.first()))
  })
  // add checkbox to activate selector when checkbox is clicked
  var checkbox = ui.Checkbox({label: 'Select features', style: {position: 'top-center'}});
  checkbox.onChange(function(checked) {
    selector.setActive(checked) // activate/deactivate selector
  });
  panel.add(checkbox)
}
//-------------------
/***
* Listens to map selection, adds selection layer, fires feature selection events
* 
* @name {string} selector name, used as a name for the selection map layer
* @map {ui.Map} map to be inspected
* @features {ui.FeatureCollection} features to be inspected
*/
var MapFeatureSelector = function(name, map, features, panel) {
  this.features = features
  this.map = map
  this.name = name
  this.selectionLayer = ui.Map.Layer({name: 'selector selection, ' + name, visParams: { color:'yellow' }})
  this.selection = null
  this.listeners = []
  this.panel = panel
  var selector = this;
  /***
  * Initializes map feature selector
  */
  this.initialize = function() {
    this.map.onClick(this.onMouseClick)
    this.map.layers().add(this.selectionLayer)
  }
  /***
  * Activates or deactivates selector
  * 
  * @active {bool} true or false
  */
  this.setActive = function(active) {
    this.active = active
    this.map.style().set('cursor', active ? 'crosshair' : 'hand');
    this.selectionLayer.setShown(active)
  }
  /***
  * Mouse click event handler
  */
  this.onMouseClick = function(coords) {
    if(!selector.active) {
      return
    }
    var selection = ee.FeatureCollection(selector.features).filterBounds(ee.Geometry.Point(coords.lon, coords.lat))
    selector.selectionLayer.setEeObject(selection)
    selector.selection = selection
    //-----------------------------------------------------------------
    //CHART ANNUAL
    var Anualchart = ui.Chart.image.series(annualPrecip , selection, ee.Reducer.mean(), 2500)
    .setOptions({
      title: "Annual precipitation by Over year ",
      hAxis: {title: 'Time'},
      vAxis: {title: 'Precipitation (mm)'},
      colors: ['#EF851C']
    })
    .setChartType('ColumnChart');
      selector.panel.widgets().set(1, Anualchart);     
    //-----------------------------------------------------
    // fire listeners
    selector.listeners.map(function(listener) {
      listener(selection)
    })
  }
  /***
  * Adds a new event handler, fired on feature selection. 
  */
  this.onSelect = function(listener) {
    selector.listeners.push(listener)
  }
  this.initialize()
}
app()