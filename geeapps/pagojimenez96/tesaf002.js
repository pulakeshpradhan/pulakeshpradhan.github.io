var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            30.030944609462498,
            30.747758443469124
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([30.030944609462498, 30.747758443469124]),
    center1 = ui.import && ui.import("center1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.024150049875495,
                30.750176055174766
              ],
              [
                30.02397838849854,
                30.747520539436003
              ],
              [
                30.02402130384278,
                30.74514157774518
              ],
              [
                30.033130085657355,
                30.745325995481004
              ],
              [
                30.032883322427985,
                30.750323581680092
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[30.024150049875495, 30.750176055174766],
          [30.02397838849854, 30.747520539436003],
          [30.02402130384278, 30.74514157774518],
          [30.033130085657355, 30.745325995481004],
          [30.032883322427985, 30.750323581680092]]], null, false);
/* ================================================================== 
/////////////////////////////////////////////////////////////////////
//// The Sentinel2 L2 ImageCollection is used for this script. //////
//// It is necessary to set a point, which corresponds to the  //////
//// central point of the pivot irrigation system to perform   //////
//// the analysed. //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//// The MODIS Terra Net Evapotranspiration 8-Day Global 500m   /////
////   image collection has been used for the ET calculation.   /////
/////////////////////////////////////////////////////////////////////
//////  ATTENTION: script designed to analyse pivot irrigation //////
//////            systems in circular crops.                  ///////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
=================================================================== */
var S2_o = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate('2019-09-01', '2021-09-08')//.filterDate('2019-09-01','2050-12-01')
.filterBounds(geometry)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10));
Map.setOptions('Satellite');
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
var min_v = 0.05;
var max_v = 0.85;
var palette = ['654321','FFA500','FFFF00', '00FF00', '008000'];
// Extract NDVI band and create NDVI median composite image
var S2_Index = S2_NdGn.select(['NDVI', 'GNDVI']);
print(S2_Index, null, 'S2_Index');
/* ================ BUILDING BUFFERS FOR THE APP =====================*/
var donut007_app = geometry.buffer(300,0.1)
                  .difference(geometry.buffer(25,0.1));
var donut7 = ee.Feature(ee.Geometry(donut007_app))
                       .set('id_ring', '275');
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
var bands = {
  "NDVI": [],
  "GNDVI": [],
}; 
/* ======================= TITLE AND LEGEND ======================= */
// Add map title
var mapTitle = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
var mapTitle2 = ui.Label({
  value: 'My crop analisys',
  style: {
    fontWeight: 'bold',
    color: '4A997E',
    fontSize: '20px',
    margin: '0 0 3px 0',
    padding: '0'
    }
});
mapTitle.add(mapTitle2);
Map.add(mapTitle);
// Add map legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
// Creates the content of the legend
var content = function(color, label) {
      // Create the color boxes
      var box = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Set legend colors
var classcolor = ['654321','FFA500','FFFF00', '00FF00', '008000'];
// Set legend labels
var labelName = ['<=0','0 - 0.2','0.2 - 0.4','0.4 - 0.6', '>0.6'];
// Combine legend colou and labels
for (var i = 0; i < 5; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
Map.add(legend);
/* ============================================================= */
// Create a slider for the date choosing
var dicObjects = {
  SliderDate: ui.DateSlider({start:'2019-09-01', 
  end:'2021-09-08',  //   end:ee.Date(Date.now()),
  period: 6, 
  onChange:function(){}, 
  style:{color: 'black', position: 'bottom-left',
  stretch: 'horizontal',width: '245px'}
  }),
  select:{
    Index:ui.Select({items: Object.keys(bands),
                    placeholder: 'Index',
                    onChange: function(){}}),
  }
};
// Create the main panel
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
        value: '  Steps:',
        style: {fontWeight: 'bold', fontSize: '14px',
        stretch: 'horizontal', position: 'bottom-left'}
        }),
        ui.Label({
        value: 'Analyses the crop by means of a vegetation index.',
        style: {fontSize: '12px',
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
        value: '_______________________________' + 
               '_______________________________',
        style: {fontWeight: 'bold', fontSize: '10px', color: 'gray',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var inf2 = ui.Panel([
  ui.Label({
        value: 'pagojimenez96@gmail.com',
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
var expl4 = ui.Panel([
        ui.Label({
        value: 'If after analysis of the vegetation ' +
        'indices it is considered that there may be ' +
        'a malfunction on the irrigation system, go ' +
        'to the second step       ⇓ ⇓ ⇓ ⇓',
        style: {fontSize: '12px', color: 'red',
        stretch: 'horizontal', position: 'bottom-left'}
        }),
        ui.Label({
        value: 'Second step',
        style: {fontWeight: 'bold', fontSize: '14px',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var expl5 = ui.Panel([
        ui.Label({
        value: '  To request a customised product with ' +
        'your crop, please contact the company by sending ' +
        'a message from the website ',
        style: {fontWeight: 'bold', fontSize: '12px', color: 'blue',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var expl6 = ui.Panel([
        ui.Label({
        value: 'https://pagojimenez96.wixsite.com/tesaf-pivotirrsys',
        style: {fontSize: '12px', color: 'blue',
        stretch: 'horizontal', position: 'bottom-left'}
        })
  ]);
var button = ui.Button({label :'Apply', onClick:function(b){
  var collectionA = ee.ImageCollection(S2_Index_crp)
  .filterDate( ee.Date(dicObjects.SliderDate.getValue()[0])
  .format('YYYY-MM-dd'), 
               ee.Date(dicObjects.SliderDate.getValue()[1])
  .format('YYYY-MM-dd'));
  print(collectionA);
  var collection = ee.ImageCollection(collectionA.mean());
  var layer = ui.Map.Layer(collection, 
  {bands: [dicObjects.select.Index.getValue()], 
   min: min_v, max: max_v, palette: palette},
  'Vegetation Index');
  Map.layers().set(0,layer);
  }, 
  style: {fontWeight: 'bold', fontSize: '19px', border: '1px solid black',
          stretch: 'both', position: 'top-center', width: '87px'}  
});
/* =====================  EVAPOTRANSPIRATION  ===================== */
var dataset = ee.ImageCollection('MODIS/006/MOD16A2')
                  .filterBounds(donut007_app)
                  .filter(ee.Filter.date('2018-01-01', '2022-02-26'));
var evapotranspiration = dataset.map(function (image) {
  return image.expression(
    '(ET/8)', {
      'ET': image.select('ET')
  });
});
print(evapotranspiration, null, 'evapotranspiration');
var evapotranspirationVis = {
  min: 0.0,
  max: 300.0,
  palette: [
    'ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'
  ],
};
var forest = ee.FeatureCollection(geometry);
var chart001 = ui.Panel({style: {width: '430px', height: '255px',
color: 'red', fontWeight: 'bold', position : 'bottom-left', 
textAlign: 'center'}})
    .add(ui.Chart.image
        .series({
          imageCollection: evapotranspiration,
          region: forest,
          reducer: ee.Reducer.mean(),
          scale: 500,
          xProperty: 'system:index',
        })
        .setSeriesNames(['ET'])
        .setOptions({
          interpolateNulls: true,
          title: 'Evapotranspiration Value by Date for your Crop',
          hAxis: {
            title: 'Date', 
            titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Total evapotranspiration (kg/m^2)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 1,
          colors: ['e37d05'],
          curveType: 'function',
        }));
/* ===========================  25m RINGS  ============================= */
var donut6 = geometry.buffer(300,0.1).difference(geometry.buffer(275,0.1));
var donut7 = geometry.buffer(275,0.1).difference(geometry.buffer(250,0.1));
var donut8 = geometry.buffer(250,0.1).difference(geometry.buffer(225,0.1));
var donut9 = geometry.buffer(225,0.1).difference(geometry.buffer(200,0.1));
var donut10 = geometry.buffer(200,0.1).difference(geometry.buffer(175,0.1));
var donut11 = geometry.buffer(175,0.1).difference(geometry.buffer(150,0.1));
var donut12 = geometry.buffer(150,0.1).difference(geometry.buffer(125,0.1));
var donut13 = geometry.buffer(125,0.1).difference(geometry.buffer(100,0.1));
var donut14 = geometry.buffer(100,0.1).difference(geometry.buffer(75,0.1));
var donut15 = geometry.buffer(75,0.1).difference(geometry.buffer(50,0.1));
var donut16 = geometry.buffer(50,0.1).difference(geometry.buffer(25,0.1));
var RingsSHP = ee.FeatureCollection([ee.Feature(donut6),ee.Feature(donut7),
ee.Feature(donut8),ee.Feature(donut9),ee.Feature(donut10),ee.Feature(donut11),
ee.Feature(donut12),ee.Feature(donut13),ee.Feature(donut14),ee.Feature(donut15),
ee.Feature(donut16)]);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: RingsSHP,
  color: 1,
  width: 0.2
  }
);
Map.addLayer(outline, {palette: 'FF0000'}, '25m rings');
Map.addLayer(outline, {palette: 'FF0000'}, '25m rings');
/* don't delate this, it's necesary for the visualization
of the rings on the app*/
/* ======================= MAIN PANEL ========================== */
var panel = ui.Panel({widgets: [
  panelIntro, dicObjects.SliderDate, expl2, panelv,
  expl3, button, /*extCheck2,*/ expl5, expl6, inf0, /*expl4,*/ 
 /* button2,*/ inf1, inf2], 
  layout: ui.Panel.Layout.Flow('vertical'),
  style:{color: 'black',
        position: 'bottom-left',
        stretch: 'horizontal',
        width: '340px',
        fontFamily: 'serif',
  }});
Map.add(chart001);
ui.root.add(panel);
Map.centerObject(center1);