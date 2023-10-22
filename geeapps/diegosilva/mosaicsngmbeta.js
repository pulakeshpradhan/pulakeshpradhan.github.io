/**
 * @name mosaic-production-1
 * @author nextgenmap team 
 * @version 1
 */
// //-----------------------------------------------------------------------------
// // Project parameters
// //-----------------------------------------------------------------------------
var gui              = require('users/diegosilva/next-gen-map:gui');
var subGridsFc = ee.FeatureCollection('projects/nexgenmap/ANCILLARY/nextgenmap_subgrids');
var featureColl = ee.FeatureCollection('projects/nexgenmap/ANCILLARY/nextgenmap_grids');
var geometryFt = featureColl.geometry().centroid();
var chart;
var subgridIds = [0, 1, 2, 3, 4, 5];
var bands = ['R', 'G', 'B', 'N'];
var version = 'production-1';
var currentGrid = null;
Map.centerObject(geometryFt,5);
var blankPaint = function (geometry) {
    var blank = ee.Image(0).mask(0);
    var geometryDraw = blank.paint(geometry, '0000AA', 2);
    return geometryDraw;
};
var contourGleba = blankPaint(featureColl.geometry());
Map.addLayer(contourGleba, {
    'palette': '0000FF',
    'opacity': 0.8
}, 'Subgrids');
var visualizeMosaics = function(grid_name, startDate,cadence,assetExport, obj){
    // gui.panel.clear();
    // gui.panel.add(gui.Header);
    // gui.panel.add(gui.label_grid_select);
    // gui.panel.add(gui.grid);
    // gui.panel.add(gui.label_year_select);
    // gui.panel.add(gui.year_select);
    // gui.panel.add(gui.label_month_select);
    // gui.panel.add(gui.month_select);
   var collection = ee.ImageCollection(assetExport)
                      .filterMetadata("grid_name", "equals", grid_name)
                      .filterMetadata("cadence", "equals", cadence)
                      .filterDate(startDate);
   var listImages = collection.reduceColumns(ee.Reducer.sum(), ['n_images']);
   chart = ui.Chart([
                ['Grid',String(obj.grid_name)],
                ['Year',String(obj.year)],
                ['Month', obj.month],
                ["Number of images",listImages.get('sum').getInfo()],
                ['Cadence',obj.cadence],
                ['Cloud Cover','0.2'],
                ['Pixel Resolution','4'],
                ['Provider','planet scope'],
                ['Item type','PSScene4Band']
            ],'Table',{width: 20,height: 350});
    // gui.panel.remove(chart);
    gui.panel.insert(9,chart);
  if(currentGrid != grid_name){
    Map.centerObject(collection.geometry(),9);  
  }
  currentGrid = grid_name;
   Map.addLayer(contourGleba, {
    'palette': '0000FF',
    'opacity': 0.8
  }, 'Subgrids');
  var mosaic = collection.mosaic();
  var outputName = grid_name + "-" + startDate + "-" + String(obj.endDate);
  Map.addLayer(mosaic, {bands: ["R", "G", "B"], min: 600, max: 1700}, outputName);
};
var getParameters = function(gui){
    var grid_name = gui.grid.getValue();
    var period = gui.period();
    var startDate = period[0];
    var endDate = period[1];
    var cadence = period[2];
    var assetExport = gui.asset.getValue();
    var cloudCover = gui.cloud_cover.getValue();    
    var month = gui.month_select.getValue();
    var year = gui.year_select.getValue();
    return {
      "grid_name": grid_name, 
      "startDate": startDate, 
      "endDate": endDate, 
      "cadence": cadence, 
      "assetExport": assetExport,
      "cloudCover": cloudCover,
      "month":month,
      "year":year
    };
};
gui.visualize.onClick(function(){
    Map.layers().reset()
    gui.panel.remove(chart);
    var parameters = getParameters(gui);
    var grid_name = parameters["grid_name"]
    var startDate = parameters["startDate"]
    var endDate = parameters["endDate"]
    var cadence = parameters["cadence"]
    var assetExport = parameters["assetExport"]
    var cloudCover = parameters["cloudCover"]
    var month = parameters["month"]
    var year = parameters["year"]
    visualizeMosaics(grid_name, startDate,cadence, 'projects/nexgenmap/MOSAIC/production-1',parameters)
});