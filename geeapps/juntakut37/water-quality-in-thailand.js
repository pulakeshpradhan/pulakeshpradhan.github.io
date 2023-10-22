var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                102.1135162457056,
                14.462984026073268
              ],
              [
                102.1135162457056,
                14.451680690856648
              ],
              [
                102.12244263730716,
                14.451680690856648
              ],
              [
                102.12244263730716,
                14.462984026073268
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[102.1135162457056, 14.462984026073268],
          [102.1135162457056, 14.451680690856648],
          [102.12244263730716, 14.451680690856648],
          [102.12244263730716, 14.462984026073268]]], null, false);
// atmospheric coorection is performed by sen2cor. 
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 * re write: Mijanur Rahman, GIS/RS Analyst, Bangladesh
 * Email: rmijanur10266@gmail.com
 * WhatsApp: +8801780942798
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-12-30')
                   //Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',1))
                  //.map(maskS2clouds);
//Map.setCenter(85.38062699798671, 19.766215036048404,10);
print(dataset.mean());
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
var ndtiViz={min:0,max:100, palette: ['darkblue','blue','lightblue','cyan','limegreen']};
var ndciViz={min:-1 ,max:1, palette:['darkblue', 'blue', 'cyan', 'limegreen', 'yellow', 'orange', 'orangered','darkred']};
var tssViz = {
  bands: 'TSS',
  min:0,
  max:2000,
  palette: ['darkblue', 'blue', 'cyan', 'limegreen', 'yellow', 'orange', 'orangered','darkred']
};
var colorBar_T = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ndtiViz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels_T = ui.Panel({
  widgets: [
    ui.Label(ndtiViz.min, {margin: '4px 8px'}),
    ui.Label(
        (ndtiViz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(ndtiViz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_T = ui.Label({
  value: 'Turbidity (FNU)',
  style: {fontWeight: 'bold'}
});
var panel_R= ui.Panel();
panel_R.style().set({
  width: '250px',
  position: 'middle-left',
});
var panel_T=ui.Panel({
  widgets:[legendTitle_T, colorBar_T, legendLabels_T],
  style:{
    position: 'top-left',
  }
});
var colorBar_C = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ndciViz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels_C = ui.Panel({
  widgets: [
    ui.Label(ndciViz.min, {margin: '4px 8px'}),
    ui.Label(
        (ndciViz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(ndciViz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_C = ui.Label({
  value: 'Chlorophyll',
  style: {fontWeight: 'bold'}
});
var panel_C=ui.Panel({
  widgets:[legendTitle_C, colorBar_C, legendLabels_C],
  style:{
    position: 'top-left',
  }
});
var colorBar_S = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(tssViz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels_S = ui.Panel({
  widgets: [
    ui.Label(tssViz.min, {margin: '4px 8px'}),
    ui.Label(
        (tssViz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(tssViz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_S = ui.Label({
  value: 'Total Suspended Solids (mg/L)',
  style: {fontWeight: 'bold'}
});
var panel_S=ui.Panel({
  widgets:[legendTitle_S, colorBar_S, legendLabels_S],
  style:{
    position: 'top-left',
  }
});
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
clearGeometry();
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
  var calcNDTI = function(img) {
          var ndti = img.expression(
              '(A_t * (p_w * scale_factor) / (1 - ((p_w * scale_factor )/ C)))', {
                  'p_w': img.select('B4').divide(10000), //red band mid wv_len = 645.5nm
                  'A_t': 366.14, //calib param (ACOLITE)
                  'B_t': 0.33, //calib param (ACOLITE)
                  'C': 0.19563, //calib param (ACOLITE)
                  'pi': Math.PI,
                  'scale_factor': 1.0 //band info
              }).rename('NDTI');
          return img.addBands(ndti)
}
var maskwater= function(img){
  var AWEI=img.select('AWEI').gt(300);
  return img.updateMask(AWEI);
};
var calcNDCI = function(img) {
  var ndci = img.normalizedDifference(['B5','B4']).rename('NDCI');
  return img.addBands(ndci);
};
var calcNDWI = function(img) {
  var ndwi = img.normalizedDifference(['B8','B4']).rename('NDWI');
  return img.addBands(ndwi);
};
var calcAWEI = function(img){
  var awei=img.expression(
    'BLUE+2.5*GREEN-1.5*(NIR1+SWIR2)-0.25*SWIR1', {
    BLUE:img.select('B2'),
    GREEN:img.select('B3'),
    NIR1:img.select('B8'),
    SWIR2:img.select('B11'),
    SWIR1:img.select('B12'),
    }).rename('AWEI');
  return img.addBands(awei);
};
var calcTSS = function(img){
  var tss=img.expression(
    '(RED+(NIR1/RED))/2', {
    RED:img.select('B4').divide(65565),
    NIR1:img.select('B8').divide(65565),
    }).rename('TSS');
  var tss_res = tss.expression('((TSS**2) * 93011) - (TSS * 82773) + 18442 ',{
    TSS:tss.select('TSS')
  }).rename('TSS')
  return img.addBands(tss_res);
}
Map.setCenter(102.185440, 14.435191, 12);
var panel = ui.Panel();
panel.style().set({
  width: '300px',
});
var results = ui.Panel();
var date1=ui.DateSlider({start: '01-01-2018', end:ee.Date(Date.now()), style: {width: '270px'}});
var date2=ui.DateSlider({start: '01-01-2018', end:ee.Date(Date.now()), style: {width: '270px'}});
var Items=["Turbidity","Chlorophyll","TSS"];
var MySelectItem= ui.Select(Items,"Select Calculation Value");
var drawR=ui.Button({label: 'Draw ROI' , style: {stretch: 'horizontal'}, onClick: function(){
  drawRectangle();
  ui.root.insert(0,panel_R);
  }  
});
var submit=ui.Button({label: 'Submit' , style: {stretch: 'horizontal'}, onClick: function(){
  Map.drawingTools().layers().forEach(function(layer) {
    layer.setShown(false);
  });
  panel_R.clear();
  results.clear();
  var startDate=ee.Date(ee.List(date1.getValue()).get(1));
  var endDate=ee.Date(ee.List(date2.getValue()).get(1));
  var roi = drawingTools.layers().get(0).getEeObject();
  var collection = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterDate(startDate,endDate).filterBounds(roi)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',0.1);
  var COLL= collection.map(calcAWEI).map(calcNDTI).map(calcTSS).map(calcNDWI).map(calcNDCI).map(maskwater);
  var NDTI = COLL.select('NDTI');
  var TSS = COLL.select('TSS');
  var rgbNDTI = NDTI.map(function(img) {
  return img.visualize(ndtiViz).clip(roi);
  });
  // Define GIF visualization arguments.
  var gifParams = {
    region: roi,
    dimensions: 600,
    framesPerSecond: 1,
  };
  // map function over sentinel collection
  var NDCI = COLL.select('NDCI');
  var rgbNDCI = NDCI.map(function(img) {
    return img.visualize(ndciViz).clip(roi);
  });
  var rgbTSS = TSS.map(function(img) {
    return img.visualize(tssViz).clip(roi);
  });
  var ndtiChart = ui.Chart.image.seriesByRegion({
    imageCollection: NDTI,
    regions: roi,
    reducer: ee.Reducer.mean(), //type of reduction. See ee.Reducers for other kinds of reductions
    scale: 20, //spatial scale of sentinel product
    seriesProperty: 'NAME'  //property of roi to display in map
  }).setSeriesNames(['Turbidity'])
  .setOptions({
    pointSize: 3,
    title: 'Turbidity Chart',
    vAxis: {title: 'Turbidity (FNU)'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 12}},
  });
  var ndciChart = ui.Chart.image.seriesByRegion({
    imageCollection: NDCI,
    regions: roi,
    reducer: ee.Reducer.mean(), //type of reduction. See ee.Reducers for other kinds of reductions
    scale: 20, //spatial scale of sentinel product
    seriesProperty: 'NAME'  //property of roi to display in map
  }).setSeriesNames(['Chlorophyll'])
  .setOptions({
    pointSize: 3,
    title: 'Chlorophyll Chart',
    vAxis: {title: 'Normalized Difference Chlorophyll Index',maxValue: -1, minValue:1 },
    hAxis: {title: 'Date', format: 'MM-yy',label :'ndti', gridlines: {count: 12}},
  });
  var sstChart = ui.Chart.image.seriesByRegion({
    imageCollection: TSS,
    regions: roi,
    reducer: ee.Reducer.mean(), //type of reduction. See ee.Reducers for other kinds of reductions
    scale: 20, //spatial scale of sentinel product
    seriesProperty: 'NAME'  //property of roi to display in map
  }).setSeriesNames(['Total Suspended Solids'])
  .setOptions({
    pointSize: 3,
    title: 'Total Suspended Solids Chart',
    vAxis: {title: 'Total Suspended Solids (mg/L'},
    hAxis: {title: 'Date', format: 'MM-yy',label :'tss', gridlines: {count: 12}},
  });
  var switch_i = MySelectItem.getValue();
  if (switch_i=='Turbidity'){
    Map.addLayer(NDTI.median().clip(roi),ndtiViz);
    results.add(ui.Label('Results'));
    panel_R.add(panel_T);
    panel_R.add(ui.Thumbnail(rgbNDTI, gifParams));
    //panel_R.add(rgbNDTI.getVideoThumbURL(gifParams));
    panel_R.add(ndtiChart); 
  } else{
    if (switch_i=='Chlorophyll'){
      Map.addLayer(NDCI.median().clip(roi),ndciViz);
      results.add(ui.Label('Results'));
      panel_R.add(panel_C);
      panel_R.add(ui.Thumbnail(rgbNDCI, gifParams));
      //panel_R.add(rgbNDCI.getVideoThumbURL(gifParams));      
      panel_R.add(ndciChart);  
    } else{
    if (switch_i=='TSS'){
      Map.addLayer(TSS.median().clip(roi),tssViz);
      results.add(ui.Label('Results'));
      panel_R.add(panel_S);
      panel_R.add(ui.Thumbnail(rgbTSS, gifParams));
      //panel_R.add(rgbNDCI.getVideoThumbURL(gifParams));      
      panel_R.add(sstChart);  
    }
  }
  }
}});
var clear=ui.Button({label: 'Clear Map' , style: {stretch: 'horizontal'}, onClick: function(){
  clearGeometry();
  panel_R.clear();
  Map.clear();
  ui.root.remove(panel_R);
  }
});
ui.root.add(panel);
panel.add(ui.Label('Select start date'));
panel.add(date1);
panel.add(ui.Label('Select end date'));
panel.add(date2);
panel.add(ui.Label('Region Of Interest'));
panel.add(drawR);
panel.add(ui.Label('Calculation to be performed'));
panel.add(MySelectItem);
panel.add(ui.Label('RUN'));
panel.add(submit);
panel.add(clear); 
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'WATER QUALITY ANALYSIS',
    style: {fontSize: '20px', fontWeight: 'bold',Color:'black'}
  }),
]);
Map.add(intro);
// Type
Map.setOptions('SATELLITE');