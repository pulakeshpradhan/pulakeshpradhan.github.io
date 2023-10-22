var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            33.28549942012469,
            24.435755607123035
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([33.28549942012469, 24.435755607123035]),
    center1 = ui.import && ui.import("center1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                33.282099512082226,
                24.438609842771474
              ],
              [
                33.282099512082226,
                24.432866370925286
              ],
              [
                33.28892305181611,
                24.432866370925286
              ],
              [
                33.28892305181611,
                24.438609842771474
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#1dd61f",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1dd61f */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[33.282099512082226, 24.438609842771474],
          [33.282099512082226, 24.432866370925286],
          [33.28892305181611, 24.432866370925286],
          [33.28892305181611, 24.438609842771474]]], null, false);
/* ================================================================== 
/////////////////////////////////////////////////////////////////////
//// The Sentinel2 L2 ImageCollection is used for this script. //////
//// It is necessary to set a point, which corresponds to the  //////
//// central point of the pivot irrigation system to perform   //////
//// the analysed. //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//////  ATTENTION: script designed to analyse pivot irrigation //////
//////            systems in circular crops.                  ///////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
=================================================================== */
var S2_o = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate('2019-09-01', '2050-12-01')
.filterBounds(geometry)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10));
Map.centerObject(center1);
// Function to calculate and add an NDVI and GNDVI bands
var addNDVI = function(image) {                   
return image.addBands(image.normalizedDifference(['B8', 'B4'])
                      .rename('NDVI'));
};
var addGNDVI = function(image) {              
return image.addBands(image.normalizedDifference(['B8', 'B3'])
                      .rename('GNDVI'));
};
// Add NDVI and GNDVI to the collection
var S2_Nd = S2_o.map(addNDVI);  
var S2_NdGn = S2_Nd.map(addGNDVI);  
// Palette batekin visualizatu
var min_v            = 0;  //0.05
var max_v            = 1; //0.85
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163',
               '99B718', '74A901', '66A000', '529400', '3E8601',
               '207401', '056201', '004C00', '023B01', '012E01',
               '011D01', '011301'];
// Extract NDVI band and create NDVI median composite image
var S2_Index = S2_NdGn.select(['NDVI', 'GNDVI']);
print(S2_Index, null, 'S2_Index');
                /*     BUILDING BUFFERS FOR THE APP    */
var donut007_app = geometry.buffer(315,0.1)
                  .difference(geometry.buffer(25,0.1));
var donut7 = ee.Feature(ee.Geometry(donut007_app))
                       .set('id_ring', '275');
     /* ***** For a pivot irrigation system of 400m radius **** */
function clp(img) {
  return img.clip(donut7);
}
var S2_Index_crp = S2_Index.map(clp);
print(S2_Index_crp, null, 'S2_Index_crp');
var S2_Index_crp1 = ee.ImageCollection(S2_Index_crp.first()); 
var S2_Index_crp1_Nd = S2_Index_crp1.select(['NDVI']);
////////////////////////////////////////////////////////////////////
/////////////////////////////// APP ////////////////////////////////
////////////////////////////////////////////////////////////////////
/* Hide the default drawing tools */
var drawingTools = Map.drawingTools(); 
drawingTools.setShown(false);
var symbol = {
  point: '📍',
};
var bands = {
  "NDVI": [],
  "GNDVI": [],
}; 
var dicObjects = {
  SliderDate: ui.DateSlider({start:'2019-09-01', 
  end:ee.Date(Date.now()),
  period: 6, onChange:function(){}, 
  style:{color: 'black', position: 'bottom-left',
  stretch: 'horizontal',width: '245px'}
  }),
  select:{
    Index:ui.Select({items: Object.keys(bands),
                    placeholder: 'Index',
                    onChange: function(){}}),
  }
};
var panelIntro = ui.Panel([
      ui.Label({
        value: 'Analysis of circular pivot irrigation system',
        style: {fontWeight: 'bold', fontSize: '24px',
        stretch: 'horizontal', position: 'bottom-left'}
        }),
      ui.Label({
        value: 'This app allows the detection of malfunctions '  +
               'in circular pivot irrigation systems. The NDVI ' +
               'and GNDVI are used.',
        style: {fontSize: '15px',
        stretch: 'horizontal', position: 'bottom-left'}
        }),
        ui.Label({
        value: '1) Select the date*',
        style: {fontWeight: 'bold', fontSize: '12px',
        stretch: 'horizontal', position: 'bottom-left'}
        }),
        ui.Label({
        value: '* The images are obtained with a periodicity ' +
        'of 6 days. In case of not receiving any results, it ' +
        'is possible that the cloud cover is higher than 10% ' +
        'during this period (try another date)',
        style: {fontWeight: 'bold', fontSize: '10px', color: 'gray',
        stretch: 'horizontal', position: 'bottom-left'}
        })
      ]);
var expl2 = ui.Panel([
  ui.Label({
        value: '2) Select an index',
        style: {fontWeight: 'bold', fontSize: '12px',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var expl3 = ui.Panel([
  ui.Label({
        value: '3) Click apply to see the result',
        style: {fontWeight: 'bold', fontSize: '12px',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var inf0 = ui.Panel([
  ui.Label({
        value: '',
        style: {fontWeight: 'bold', fontSize: '10px', color: 'gray',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var inf2 = ui.Panel([
  ui.Label({
        value: '             pagojimenez96@gmail.com',
        style: {fontSize: '10px', color: 'gray',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var inf1 = ui.Panel([
  ui.Label({
        value: 'TESAF Dipartimento Territorio e Sistemi Agro-Forestali',
        style: {fontWeight: 'bold', fontSize: '10px', color: 'gray',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var panelv = ui.Panel({widgets: [
  dicObjects.select.Index], layout: ui.Panel.Layout.Flow('horizontal'),
  style:{color: 'black', position: 'bottom-left'}});
//Create a button
var button = ui.Button({label :'Apply', onClick:function(b){
  var collection = ee.ImageCollection(S2_Index_crp)
  .filterDate( ee.Date(dicObjects.SliderDate.getValue()[0]).format('YYYY-MM-dd'), 
               ee.Date(dicObjects.SliderDate.getValue()[1]).format('YYYY-MM-dd'));
  print(collection);
  var layer = ui.Map.Layer(collection, {bands: [dicObjects.select.Index.getValue()], 
   min: min_v, max: max_v, palette: palette},
  'Vegetation Index');
  Map.layers().set(0,layer);
}, 
  style: {fontWeight: 'bold', fontSize: '19px', border: '1px solid black',
          stretch: 'both', position: 'top-center', width: '87px'}  
});
/* MAIN PANEL*/
var panel = ui.Panel({widgets: [
  panelIntro, dicObjects.SliderDate, expl2, panelv,
  expl3, button, inf0, inf1, inf2], layout: ui.Panel.Layout.Flow('vertical'), 
  style:{color: 'black',
        position: 'bottom-left',
        stretch: 'horizontal',
        width: '290px',
        // border: '1px solid darkgray',
        fontFamily: 'serif',
  }});
ui.root.add(panel);