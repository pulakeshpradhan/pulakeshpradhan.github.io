var districts = ee.FeatureCollection("users/arunmuralicm/district_with_code"),
    viirs_mask_unproj = ee.Image("users/arunmuralicm/VIRRS_mask_464m");
Map.add(ui.Label(
    'Temporal Data Explorer', {fontWeight: 'bold', fontSize: '24px'}));
// Add a title and some explanitory text to a side panel. 
var header = ui.Label('Data Description', {fontSize: '24px',fontWeight: 'bold', color: 'red'});
/*var text = ui.Label(
    '',
    {'fontSize': '12px'});*/ 
var toolPanel = ui.Panel([header], 'flow', {width: '310px'});
  toolPanel.style().set({
  width: '280px',
  position: 'top-right'
});
  ui.root.insert(0, toolPanel);
  toolPanel.add(ui.Label('Night Light', {'font-size': '24px','fontWeight': 'bold'})); 
  toolPanel.add(ui.Label('Values extracted from the monthly average radiance composite images using nighttime data from the Visible Infrared Imaging Radiometer Suite (VIIRS) Day/Night Band (DNB).', {'font-size': '12px'})); 
 var link = ui.Chart(
    [
      ['<a target="_blank" href=https://ngdc.noaa.gov/eog/viirs/download_dnb_composites.html>' +
       'VIIRS DNB Nighttime Lights</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel = ui.Panel([link], 'flow', {width: '320px', height: '30px'});
toolPanel.add(linkPanel);
  toolPanel.add(ui.Label('Precipitation', {'font-size': '24px','fontWeight': 'bold'}));
  toolPanel.add(ui.Label('Climate Hazards Group InfraRed Precipitation with Station data (CHIRPS) is a 30+ year quasi-global rainfall dataset. CHIRPS incorporates 0.05° resolution satellite imagery with in-situ station data', {'font-size': '12px'}));
  var link1 = ui.Chart(
    [
      ['<a target="_blank" href=https://www.nature.com/articles/sdata201566>' +
       'CHIRPS Precipitation</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel1 = ui.Panel([link1], 'flow', {width: '320px', height: '30px'});
toolPanel.add(linkPanel1);
  toolPanel.add(ui.Label('Tree Cover', {'font-size': '24px','fontWeight': 'bold'}));
  toolPanel.add(ui.Label('MODIS Vegetation Continuous Fields (VCF) product is a sub-pixel-level representation of surface vegetation cover estimates globally.VCF products provide a continuous, quantitative portrayal of land surface cover with improved spatial detail, and hence, are widely used in environmental modeling and monitoring applications. ', {'font-size': '12px'}));
 var link2 = ui.Chart(
    [
      ['<a target="_blank" href=https://modis.gsfc.nasa.gov/data/dataprod/mod44.php>' +
       'MODIS Vegetation Continuous Fields</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel2 = ui.Panel([link2], 'flow', {width: '320px', height: '30px'});
toolPanel.add(linkPanel2);
//ui.root.widgets().add(toolPanel);
//---------------VIIRS Data----------------------------------//
//Map.addLayer(districts);  
var viirs_collection = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
  .filterDate('2014-01-01', '2018-01-01');
var viirs_mask = viirs_mask_unproj
    .reproject('EPSG:4326', null, 463.83121534928955);
var avg_rad = viirs_collection.select('avg_rad').map(function(img) {return img.clip(districts)});
var addVIIRS_Correction = function(image) {
  var avg_rad_corrected = image.multiply(viirs_mask).rename('avg_rad_corrected');
  return image.addBands(avg_rad_corrected);
};
var withVIIRS_Correction = avg_rad.map(addVIIRS_Correction); 
var avg_rad_corrected = withVIIRS_Correction.select('avg_rad_corrected');
var dataset = avg_rad_corrected.map(function(img) {return img.clip(districts)});
/* var avg_radVis = {
  min: 0.0,
  max: 10.0,
  palette: ['000000','00ff00','990000','ff0000']
};*/
//Map.addLayer(avg_rad_corrected,avg_radVis,'Average Radiance')
//-----------------CHIRPS data----------------------------//
var startdate ="2000-01-01"
var enddate = "2018-01-01" 
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(startdate,enddate)
//-------------MONTHLY------------------------ 
//defines period of interest 
var startyear = 2000; 
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
////----------------------MODIS VCF data--------------------------//
var image = ee.ImageCollection('MODIS/051/MOD44B')
  .filterDate('2000-01-01', '2018-01-01')
var scale = 250; 
var treecover = image.select('Percent_Tree_Cover');
var dataset1 = treecover.map(function(img) {return img.clip(districts)});
/*var treecoverVis = {
  min: 0.0,
  max: 28.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.addLayer(dataset, treecoverVis, 'Percent tree cover');
print('dataset:', dataset);*/
////----------------------------------///
//app function
var app = function() {
  // UI LEFT PANEL
  var panel = ui.Panel();
  panel.style().set('width','360px')
  // Ui label text
  /*var title = ui.Panel([
    ui.Label({
      value:'Temporal trend',
      style:{fontSize:'26px',fontWeight:'bold', color:'red', textAlign:'center'}
     })
    ]);
  panel.add(title)*/
  //ui.root.widgets().add(panel)
  //ui.root.insert(0, panel);  
  // add feature collection
  // var districts = ee.FeatureCollection('ft:1IHRHUiWkgPXOzwNweeM89CzPYSfokjLlz7_0OTQl')
  var districtsImage = ee.Image().float().paint(districts, 0).paint(districts, 1, 1)
  Map.addLayer(districtsImage, {palette:['000000', 'ffffff']}, 'districts', true, 0.5)
  Map.centerObject(districts,4.3)
  // create feature selector
  var selector = new MapFeatureSelector('districts', Map, districts, panel)
  // subscribe to selection
  selector.onSelect(function(selection) {
    print('Current selection: ', ee.Feature(selection.first()))
  })
  // add checkbox to activate selector when checkbox is clicked
/* var checkbox = ui.Checkbox({label: 'Select features', style: {position: 'top-center'}});
  checkbox.onChange(function(checked) {
    selector.setActive(checked) // activate/deactivate selector
  });*/
  Map.onClick(function(select) {
  //panel.clear();
  //var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var chart = ui.Chart.image.regions(image, point, null, 30);
  //chart.setOptions({title: 'Band values'});
  selector.setActive(select)
  //panel.add(chart);
});
 // panel.add(checkbox)
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
  this.selectionLayer = ui.Map.Layer({name: 'selector selection:, ' + name, visParams: { color:'yellow' }})
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
    /*if(!selector.active) {
      return
    }*/
    var selection = ee.FeatureCollection(selector.features).filterBounds(ee.Geometry.Point(coords.lon, coords.lat))
    selector.selectionLayer.setEeObject(selection)
 //--------------------------------------------------------
    selector.selection = selection
    //print(selection);
    /*var lab1= ee.Feature(selection.first());
    var lab2 = lab1.get('DISTRICT');
    var lab3 = lab1.get('ST_NM');*/
     //var lab2 = lab1.propertyNames('DISTRICT')
    //var lab4 = lab2.
    /*print(lab2)
    print(lab3)*/
      //toolPanel.add(ui.Label(lab4, {'font-size': '10px','fontWeight': 'bold'})); 
/*var location = 'District: ' + lab1.get("DISTRICT") + ' ' +
                 'State: ' + lab1.get("ST_NM");
  toolPanel.widgets().set(1, ui.Label(location));*/
    //-----------------------------------------------------------------
     //ui.root.widgets().add(panel)
    //CHART ANNUAL
    var Monthlychart = ui.Chart.image.series(dataset , selection, ee.Reducer.mean(), 500)
    .setOptions({
      title: ("Monthly Nightlight Radiance "),
      hAxis: {title: 'Month'},
      vAxis: {title: 'Avg. Radiance (nanoWatts/cm2/sr)'},
      colors: ['#EF851C']
    })
    .setChartType('ComboChart');
      selector.panel.widgets().set(0, Monthlychart);     
    //-----------------------------------------------------
     //-------------------------------------------
    var Anualchart = ui.Chart.image.series(annualPrecip , selection, ee.Reducer.mean(), 5000)
    .setOptions({
      title: ("Annual Precipitation "),
      hAxis: {title: 'Year'},
      vAxis: {title: 'Precipitation (mm)'},
      colors: ['#EF851C']
    })
    .setChartType('ColumnChart');
    selector.panel.widgets().set(1, Anualchart);
     //------------------------------------------
     //---------------------
     var annualVCF = ui.Chart.image.series(dataset1 , selection, ee.Reducer.mean(), 250)
    .setOptions({
      title: ("Tree Cover "),
      hAxis: {title: 'Year'},
      vAxis: {title: 'Percent tree Cover'},
      colors: ['#EF851C']
    })
    .setChartType('ColumnChart');
      selector.panel.widgets().set(2, annualVCF); 
    ui.root.widgets().add(panel)
     //------------------------------------------
     ////-----------------------
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