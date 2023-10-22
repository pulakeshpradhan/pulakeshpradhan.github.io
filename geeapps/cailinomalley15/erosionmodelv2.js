/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/atstahl/HUC8_outline"),
    MapArea = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-118.45294189453125, 47.64475967869918],
                  [-118.45294189453125, 46.38644431947216],
                  [-116.42047119140625, 46.38644431947216],
                  [-116.42047119140625, 47.64475967869918]]], null, false),
            {
              "system:index": "0"
            })]),
    CTmaxErosion = ee.Image("users/cailinomalley15/CTmaxErrosion1"),
    CTbufmaxErosion = ee.Image("users/cailinomalley15/CT_bufmaxErrosion"),
    MTbufmaxErosion = ee.Image("users/cailinomalley15/MT_bufmaxErrosion"),
    NTmaxErosion = ee.Image("users/cailinomalley15/NTmaxErrosion1"),
    MTmaxErosion = ee.Image("users/cailinomalley15/MTmaxErrosion1"),
    NTbufmaxErosion = ee.Image("users/cailinomalley15/NT_bufmaxErrosion"),
    WSDACrop_Palouse = ee.FeatureCollection("users/cailinomalley15/WSDACrop2020_PalouseBasin");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Testing erosion model outputs in Earth Engine. 
// Load 2019 NAIP imagery for map area. 
var NAIP = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.bounds(MapArea))
    .filterDate('2019-01-01', '2019-12-31').median().clip(MapArea);
// Display NAIP and CTmaxErosion.
Map.setCenter(-117.5411, 47.1166, 9);
var visParams = {bands: ['R', 'G', 'B']};
Map.addLayer(NAIP, visParams, '2019 NAIP', false);
//var visParams2 = {min: 0, max: 1, palette: ['d8b365', 'f5f5f5', '5ab4ac']};
var visParams2 = {min: 0, max: 1, palette: ['#FCFDBFFF', '#FB8861FF', '#B63679FF', '#51127CFF', '#000004FF']};
var polygonstyle = {'color': 'white', 'fillColor': '#00FFFFFF', 'width': '0.5'}
ee.FeatureCollection(WSDACrop_Palouse)
print(CTmaxErosion);
Map.addLayer(CTmaxErosion, visParams2, 'CTmaxErosion', false);
Map.addLayer(MTmaxErosion, visParams2, 'MTmaxErosion', false);
Map.addLayer(NTmaxErosion, visParams2, 'NTmaxErosion', false);
Map.addLayer(CTbufmaxErosion, visParams2, 'CTbufmaxErosion', false);
Map.addLayer(MTbufmaxErosion, visParams2, 'MTbufmaxErosion', false);
Map.addLayer(NTbufmaxErosion, visParams2, 'NTbufmaxErosion', false);
Map.addLayer(WSDACrop_Palouse, polygonstyle, 'Crop Boundaries', false);
// Creating legend - set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Erosion Rates (tons/acre)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '' + color,
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
//var palette =['d8b365', 'f5f5f5', '5ab4ac'];
 var palette = ['#FCFDBFFF', '#FB8861FF', '#B63679FF', '#51127CFF', '#000004FF']
// name of the legend
//var names = ['Min.','Med.','Max.'];
var names =  ['0', 'x-x', 'x-x', 'x-x', 'x-max']
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);