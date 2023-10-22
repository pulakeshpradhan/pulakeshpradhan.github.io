var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var palettes = require('users/gena/packages:palettes');
var panel=require('users/rahulharod/APP:Panel.js');
var panel_left=panel.panel_left();
var ProvideDates = ui.Label({value:'User Inputs',
style: {fontSize: '18px', fontWeight: 'bold'}});
var DateFormate = ui.Label('Start Date and End Date for NDVI Time Series.',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var datasetRange_label1 = ui.Label('Start [YYYY-MM-DD]   ',
  {margin: '5px 0 0 10px',fontSize: '11px',color: 'gray'});
var datasetRange_label2 = ui.Label('End [YYYY-MM-DD]    ',
  {margin: '5px 0 0 10px',fontSize: '11px',color: 'gray'});
panel_left.add(ProvideDates).add(DateFormate)
      .add(ui.Panel([datasetRange_label1, datasetRange_label2],ui.Panel.Layout.flow('horizontal')));
var start = ui.Textbox({placeholder: 'Start Date',  value: '2020-12-01',
  style: {width: '100px'}});
var end = ui.Textbox({placeholder: 'End Date',  value: '2021-03-30',
  style: {width: '100px'}});
panel_left.add(ui.Panel([start, end],ui.Panel.Layout.flow('horizontal')));
var Cloud_cover_label = ui.Label('Max Cloud %  (0-100) ',
  {margin: '10px 0 0 10px',fontSize: '12px',color: 'gray', fontWeight: 'bold'});
var Cloud_cover = ui.Textbox({placeholder: 'Max Cloud Percentage',  value:'30',
  style: {width: '50px'}});
var Day_mosaic_label = ui.Label('No. of days to mosaic',
  {margin: '10px 0 0 10px',fontSize: '12px',color: 'gray', fontWeight: 'bold'});
var Day_mosaic = ui.Textbox({placeholder: 'Days',  value:'5',
  style: {width: '50px'}});
panel_left.add(ui.Panel([Cloud_cover_label, Cloud_cover],ui.Panel.Layout.flow('horizontal')));
panel_left.add(ui.Panel([Day_mosaic_label, Day_mosaic],ui.Panel.Layout.flow('horizontal')));
var draw=require('users/rahulharod/APP:drawingTools.js');
var drawingTools=draw.drwaing()[0]
var geometryPanel=draw.drwaing()[1]
panel_left.add(geometryPanel)
// To remove geometry panels
drawingTools.setShape(null);
function name(){
  print('Rahul');
  Map.clear()
  var aoi = drawingTools.layers().get(0).getEeObject();
  print(aoi)
  // Map.addLayer(aoi,{},'aoi')
  drawingTools.setShape(null);
}
//  legend
function health_colorbar() {
var nSteps = 10
// Creates a color bar thumbnail image for use in legend from the given color palette
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, nSteps, 0.1],
    dimensions: '200x10',
    format: 'png',
    min: 0,
    max: nSteps,
    palette: palette,
  };
}
// Create the colour bar for the legend
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0).int(),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend
var legendLabels = ui.Panel({
  widgets: [
    ui.Label('Low', {margin: '4px 8px'}),
    ui.Label(
        ('Normal'),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('Good', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Legend title
var legendTitle = ui.Label({
  value: 'Crop Health',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
}
function reset_map(){
  Map.clear()
  Map.setControlVisibility({
  drawingToolsControl:false
})  
  Map.setOptions('HYBRID');
  drawingTools.setShape(null);
}
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
var textStyle = {
  color: 'grey',
  fontName: 'arial',
  fontSize: 10,
  bold: false,
  italic: true,
}
var palette =palettes.colorbrewer.RdYlGn[9]
var vis = {min: 0.1, max: 0.8, palette: palette};
var date_start,
    date_end,
    Max_Cloud,
    day_mosaic;
var submit= ui.Button({label:'Submit' });
submit.onClick(function(){
  reset_map()
  var date_start = ee.Date(start.getValue());
  var date_end=ee.Date(end.getValue());
  var Max_Cloud=ee.Number.parse(Cloud_cover.getValue());
  var day_mosaic=ee.Number.parse(Day_mosaic.getValue());
  var file_prefix='Farms';
  print(date_start,date_end,Max_Cloud,day_mosaic)
  var aoi = drawingTools.layers().get(0).getEeObject();
  clearGeometry()
  print(aoi)
  Map.addLayer(aoi,{},'aoi',true)
  var S2_coll = require('users/rahulharod/Dehaat:Sentinel2_Coll.js');
  var coll=ee.ImageCollection(S2_coll.S2_collection(date_start,date_end,aoi,aoi,Max_Cloud,day_mosaic,file_prefix));
  print('S2_coll',coll);
  Map.addLayer(coll.select('NDVI').max(),vis,'Max_NDVI');
  health_colorbar();
        //   var chart = ui.Chart.image.series({
        //   imageCollection: coll.select(['NDVI','NDRE','LSWI']),
        //   region: aoi,
        //   reducer: ee.Reducer.mean(),
        //   scale: 10
        // }).setOptions({
        //       lineWidth: 1,
        //       title: 'NDVI Time Series',
        //       interpolateNulls: true,
        //       vAxis: {title: 'NDVI'},
        //       hAxis: {title: '', format: 'YYYY-MMM'}
        //     })
  var chart = ui.Chart.image.series({
                            imageCollection:coll.select(['NDVI','NDRE','LSWI']), 
                            region:aoi, 
                            reducer:ee.Reducer.mean(),
                            scale:10,
                            xProperty: 'system:time_start'
                            })
                            .setOptions({
                            lineWidth: 2,
                            pointSize: 3,
                            colors: ['red','black','Blue'],
                            title: 'VegIndices Time Series',
                            vAxis: {title: 'Indices_value', maxValue: 1, minValue: 0},
                            hAxis: {title: 'Date',format: 'MMM-yyyy',textStyle: textStyle,gridlines: {count:10}},
                            curveType: 'function',
                            interpolateNulls: true,
  });  
  var chartPanel = ui.Panel({
    style:
        {height: '235px', width: '600px', position: 'bottom-right'}
  });
  Map.add(chartPanel);
  chartPanel.widgets().reset([chart]);
});
panel_left.add(submit);
// drawingTools.onDraw(ui.util.debounce(name, 500));
// drawingTools.onEdit(ui.util.debounce(name, 500));