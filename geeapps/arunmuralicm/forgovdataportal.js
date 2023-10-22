var viirs_mask_unproj = ui.import && ui.import("viirs_mask_unproj", "image", {
      "id": "users/arunmuralicm/VIRRS_mask_464m"
    }) || ee.Image("users/arunmuralicm/VIRRS_mask_464m"),
    districts = ui.import && ui.import("districts", "table", {
      "id": "users/arunmuralicm/district_v2"
    }) || ee.FeatureCollection("users/arunmuralicm/district_v2");
Map.add(ui.Label('Data Explorer', {fontWeight: 'bold', fontSize: '24px'}));  
// Add a title and some explanitory text to a side panel. 
var header = ui.Label('Data Description', {fontSize: '24px',fontWeight: 'bold', color: 'red'});
var header1 = ui.Label('Location Details', {fontSize: '24px',fontWeight: 'bold', color: 'black'});
var toolPanel = ui.Panel([header], 'flow', {width: '300px',shown: true});
  toolPanel.style().set({
  position: 'top-right'
});
var toolPanel1 = ui.Panel([header1], 'flow', {width: '300px',shown: false});
  toolPanel1.style().set({
  position: 'top-right'
});
toolPanel1.add(ui.Label(' ', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel1.add(ui.Label(' ', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel1.add(ui.Label(' ', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel1.add(ui.Label(' ', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel1.add(ui.Label('Land Use Overview', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel1.add(ui.Label('(area measured in Sq.Km)', {'font-size': '10px'}));
//-------------------onclick function-----------
 var button = ui.Label('Select the district', {fontWeight: 'bold', fontSize: '15px',position: 'bottom-center',color: 'red'});
 Map.add(button);
   var listenerId = Map.onClick(function() {
      toolPanel.style().set('shown', false);
      toolPanel1.style().set('shown', true);
      button.style().set('shown',false)
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
//--------------------------------------------------------------
 ui.root.insert(0, toolPanel1);
 ui.root.insert(0, toolPanel);
//----------------------------------------Data Description---------------------------------------//
//--------------------------------------------Worldpop-------------------------------------------//
toolPanel.add(ui.Label('WorldPop Population', {'font-size': '24px','fontWeight': 'bold'})); 
toolPanel.add(ui.Label('WorldPop Population Data is the estimate of total number of people per grid square at five year intervals; national totals have been adjusted to match UN Population Division estimates for each time point.Here 2015 population data is used in computation', {'font-size': '12px'})); 
  var link = ui.Chart(
    [
      ['<a target="_blank" href=https://www.worldpop.org/project/categories?id=3>' +
       'WorldPop Population Data</a>']
    ],
    'Table', {allowHtml: true});
  var linkPanel = ui.Panel([link], 'flow', {width: '325px', height: '30px'});
toolPanel.add(linkPanel); 
//---------------------------------------------ESA CCI LC----------------------------------------//  
toolPanel.add(ui.Label('ESA CCI Land cover', {'font-size': '24px','fontWeight': 'bold'})); 
toolPanel.add(ui.Label('The CCI-LC project delivers consistent global LC maps at 300 m spatial resolution on an annual basis from 1992 to 2015.We have used the 2015 land cover map for the district wise land cover area computation.', {'font-size': '12px'})); 
  var link1 = ui.Chart(
    [
      ['<a target="_blank" href=http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf>' +
       'ESA CCI LC Data</a>']
    ],
    'Table', {allowHtml: true});
  var linkPanel1 = ui.Panel([link1], 'flow', {width: '325px', height: '30px'});
toolPanel.add(linkPanel1);
//--------------------------------------------Nightlight------------------------------------------//  
toolPanel.add(ui.Label('Night Light', {'font-size': '24px','fontWeight': 'bold'})); 
toolPanel.add(ui.Label('Values extracted from the monthly average radiance composite images using nighttime data from the Visible Infrared Imaging Radiometer Suite (VIIRS) Day/Night Band (DNB).', {'font-size': '12px'})); 
  var link2 = ui.Chart(
    [
      ['<a target="_blank" href=https://ngdc.noaa.gov/eog/viirs/download_dnb_composites.html>' +
       'VIIRS DNB Nighttime Lights</a>']
    ],
    'Table', {allowHtml: true});
  var linkPanel2 = ui.Panel([link2], 'flow', {width: '325px', height: '30px'});
toolPanel.add(linkPanel2);
//---------------------------------------------Precipitation---------------------------------------//
toolPanel.add(ui.Label('Precipitation', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel.add(ui.Label('Climate Hazards Group InfraRed Precipitation with Station data (CHIRPS) is a 30+ year quasi-global rainfall dataset. CHIRPS incorporates 0.05° resolution satellite imagery with in-situ station data', {'font-size': '12px'}));
  var link3 = ui.Chart(
    [
      ['<a target="_blank" href=https://www.nature.com/articles/sdata201566>' +
       'CHIRPS Precipitation</a>']
    ],
    'Table', {allowHtml: true});
  var linkPanel3 = ui.Panel([link3], 'flow', {width: '325px', height: '30px'});
toolPanel.add(linkPanel3);
//---------------------------------------------Treecover--------------------------------------------//
toolPanel.add(ui.Label('Tree Cover', {'font-size': '24px','fontWeight': 'bold'}));
toolPanel.add(ui.Label('MODIS Vegetation Continuous Fields (VCF) product is a sub-pixel-level representation of surface vegetation cover estimates globally.VCF products provide a continuous, quantitative portrayal of land surface cover with improved spatial detail, and hence, are widely used in environmental modeling and monitoring applications. ', {'font-size': '12px'}));
  var link4 = ui.Chart(
    [
      ['<a target="_blank" href=https://modis.gsfc.nasa.gov/data/dataprod/mod44.php>' +
       'MODIS Vegetation Continuous Fields</a>']
    ],
    'Table', {allowHtml: true});
  var linkPanel4 = ui.Panel([link4], 'flow', {width: '325px', height: '30px'});
toolPanel.add(linkPanel4);
//-----------------------------------------Datasets and Computation---------------------------------//
//-----------------------------------------------VIIRS Data-----------------------------------------//
var viirs_collection = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                          .filterDate('2014-01-01', '2018-01-01');
var viirs_mask = viirs_mask_unproj.reproject('EPSG:4326', null, 463.83121534928955);
var avg_rad = viirs_collection.select('avg_rad').map(function(img) {return img.clip(districts)});
var addVIIRS_Correction = function(image) {
  var avg_rad_corrected = image.multiply(viirs_mask).rename('avg_rad_corrected');
  return image.addBands(avg_rad_corrected);
};
var withVIIRS_Correction = avg_rad.map(addVIIRS_Correction); 
var avg_rad_corrected = withVIIRS_Correction.select('avg_rad_corrected');
var dataset = avg_rad_corrected.map(function(img) {return img.clip(districts)});
//----------------------------------------------CHIRPS data-----------------------------------------//
var startdate ="2000-01-01"
var enddate = "2018-01-01" 
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
//--------------------------------------------MODIS VCF data-------------------------------------//
var image = ee.ImageCollection('MODIS/006/MOD44B')
            .filterDate('2000-01-01', '2018-01-01')
var scale = 250; 
var treecover = image.select('Percent_Tree_Cover');
var dataset1 = treecover.map(function(img) {return img.clip(districts)});
//---------------------------------------Application related functions---------------------------//
//app function
var app = function() {
  // UI LEFT PANEL
  var panel = ui.Panel();
  panel.style().set('width','360px')
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
  Map.onClick(function(select) {
  selector.setActive(select)
});
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
    //print('selection',selection);
    var lab1= ee.Feature(selection.first());
    //Map.addLayer(lab1)
    var lab2 = lab1.get('DISTRICT');
    var lab3 = lab1.get('ST_NM');
    //var lab2 = lab1.propertyNames('DISTRICT');
    var lab4 = lab1.get('X_dist_are')  
    var lab5 = lab1.get('X_dist_pop')
var location1 = lab2.evaluate(function(result){
  toolPanel1.widgets().set(1,ui.Label({
    value: 'District: '+ result 
  }))
})
var location2 = lab3.evaluate(function(result){
  toolPanel1.widgets().set(2,ui.Label({
    value: 'State: '+ result  
  }))
})
var location3 = lab4.evaluate(function(result){
  toolPanel1.widgets().set(3,ui.Label({
    value: 'Area(Sq.Km): '+ result.toFixed(0)
  }))
})
var location4 = lab5.evaluate(function(result){
  toolPanel1.widgets().set(4,ui.Label({
    value: 'Population: '+ result.toFixed(0)
  }))
})
var lab6 = lab1.get('X_crp');
var lab7 = lab1.get('X_for');
var lab8 = lab1.get('X_grss');
var lab9 = lab1.get('X_shrb');
var lab10 = lab1.get('X_urban');
var lab11 = lab1.get('X_bare');
var lab12 = lab1.get('X_water');
var lab13 = lab1.get('X_snow');
var lab14 = lab1.get('X_OtherLU');
Map.centerObject(lab1,8)
var empty = ee.Image().byte();
//--------------------------------------------Pie chart-------------------------------------//
var dataTable = {
  cols: [{id: 'LULC', label: 'Landuse', type: 'string'},
         {id: 'area', label: 'Area in Sq.Km', type: 'number'}],
  rows: [{c: [{v: 'Cropland'}, {v: lab6.getInfo()}]},
         {c: [{v: 'Forest'}, {v: lab7.getInfo()}]},
         {c: [{v: 'Grassland'}, {v: lab8.getInfo()}]},
         {c: [{v: 'Shrubland'}, {v: lab9.getInfo()}]},
         {c: [{v: 'Urban'}, {v: lab10.getInfo()}]},
         {c: [{v: 'Bare land'}, {v: lab11.getInfo()}]},
         {c: [{v: 'Water bodies'}, {v: lab12.getInfo()}]},
         {c: [{v: 'Permanent Snow and ice'}, {v: lab13.getInfo()}]},
         {c: [{v: 'Other landuse'}, {v: lab14.getInfo()}]}]
};
 var chart1 = new ui.Chart(dataTable, 'PieChart',{
  width: 600,
  height: 300,
  title: 'Land Use Area',
  //colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
});
toolPanel1.widgets().set(7, chart1);
    //-------------------------------------Chart creation---------------------------------------//
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
//-------------------------------------------------------------------------------------------
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
    // fire listeners
    selector.listeners.map(function(listener) {
      listener(selection)
    })
  }
  this.onSelect = function(listener) {
    selector.listeners.push(listener)
  }
  this.initialize()
}
app()