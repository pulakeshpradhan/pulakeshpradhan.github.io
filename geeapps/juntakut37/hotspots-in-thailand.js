var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                95.38,
                20.7
              ],
              [
                95.38,
                4.82
              ],
              [
                106,
                4.82
              ],
              [
                106,
                20.7
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffffff */ee.Geometry.Polygon(
        [[[95.38, 20.7],
          [95.38, 4.82],
          [106, 4.82],
          [106, 20.7]]]);
var firms = ee.ImageCollection("FIRMS"),
    geometry = /* color: #ffffff */ee.Geometry.Polygon(
        [[[95.38, 20.7],
          [95.38, 4.82],
          [106, 4.82],
          [106, 20.7]]]);
// *****************************************************************
// =================================================================
// --------------- Instructions for FIRMS Explorer --------------
// =================================================================
// *****************************************************************
/*
// @author Juntakut P.
// Last updated: March 18, 2021
// Purpose: plot timeseries of MODIS/FIRMS active fire counts
// by region and day of year, across years
*/
// =================================================================
// **********************   --    Code    --   *********************
// =================================================================
// Note: The drawing tools and app codes are based on the tutorial by Justin Braaten & Tianjia Liu:
// https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// https://github.com/tianjialiu/FIRECAM
// Hide the drawing tools widget; we want a really simple interface.
// We'll add our own buttons or geometry selection.
//var baseMap = require('users/juntakut37/packages:baseMap.js');
Map.drawingTools().setShown(false);
//Map.setOptions('Dark', {'Dark': baseMap.darkTheme});
//Map.setOptions('Terrain');
//Map.setOptions('Satellite');
Map.setOptions('Hybrid');
Map.setCenter(20,10,4);
Map.setControlVisibility({layerList: true, zoomControl: false});
// Define symbols for the labels.
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  pan: '🤚'
};
// Set up a ui.Panel to hold instructions and the geometry drawing buttons.
var startYearSlider = ui.Slider({min:2001,max:2021,value:2015,step:1,
  style:{stretch:'horizontal', 'background-color':'333333', color: 'white', fontSize:'18px'}});
var endYearSlider = ui.Slider({min:2001,max:2021,value:2021,step:1,
  style:{stretch:'horizontal', 'background-color':'333333', color: 'white', fontSize:'18px'}});
var doyText = ui.Textbox({placeholder:'1-365',value:'1-365',
  style:{stretch:'horizontal', 'background-color':'333333', color:'black', fontSize:'18px'}});
var changeSliderYr = function() {
  var startYr = startYearSlider.getValue();
  var endYr = endYearSlider.getValue();
  if (endYr < startYr) {endYearSlider.setValue(startYr)}
};
startYearSlider.onChange(changeSliderYr);
endYearSlider.onChange(changeSliderYr);
var submitButton = ui.Button({
  label: 'SUBMIT',
  style: {stretch: 'horizontal', margin:'2px 50px 10px 50px'}
});
var mainPanel = ui.Panel({
  widgets: [
    ui.Label('จุดความร้อนจากการเผาไหม้ในที่โล่ง (HOTSPOTS) จากข้อมูล Fire Information for Resource Management System (FIRMS) โดย NASA',{'background-color':'000000', margin:'0px 0px 0px 0px', fontSize:'24px', fontWeight:'bold', color:'orange'}),
    ui.Label('เลือกช่วงเวลา (SELECT TIME RANGE):',{fontSize:'16px', 'background-color': '333333', fontWeight:'bold', color:'gold'}),
    ui.Panel([ui.Label('Start Year: ',{color:'white',fontSize:'16px', margin:'8px 3px 8px 8px','background-color':'333333'}),startYearSlider],ui.Panel.Layout.Flow('horizontal'),{stretch:'horizontal',margin:'-3px 8px 0px 8px','background-color':'333333'}), 
    ui.Panel([ui.Label('End Year: ',{color:'white',fontSize:'16px', margin:'8px 10px 8px 8px', 'background-color':'333333'}),endYearSlider],ui.Panel.Layout.Flow('horizontal'),{stretch:'horizontal',margin:'-3px 8px 0px 8px', 'background-color':'333333'}),
    ui.Label('ระบุวัน (DAY OF YEAR) [1-365]:',{color:'gold',fontSize:'16px','background-color':'333333', fontWeight:'bold'}),
    ui.Label('ปฏิทิน Julian day calendar',{color:'aqua',fontSize:'13px',margin:'0px 0px 5px 8px', 'background-color':'333333'},'https://landweb.modaps.eosdis.nasa.gov/browse/calendar.html'),
    ui.Panel([ui.Label('DOY Range: ',{color:'white',margin:'8px 0 0 8px',fontSize:'16px','background-color':'333333'}),doyText],ui.Panel.Layout.Flow('horizontal'),{stretch:'horizontal',margin:'-3px 8px 0px 8px', 'background-color':'333333'}),
    ui.Label('เลือกพื้นที่สนใจ (SELECT AREA OF INTEREST):',{color:'gold',fontSize:'16px','background-color':'333333', fontWeight:'bold'}),
    ui.Panel({
      widgets: [
        ui.Button({
          label: symbol.rectangle + ' RECTANGLE',
          onClick: drawRectangle,
          style: {stretch: 'horizontal', margin:'2px 90px 10px 90px'}}),
        ui.Button({
          label: symbol.polygon + ' POLYGON',
          onClick: drawPolygon,
          style: {stretch: 'horizontal', margin:'2px 90px 10px 90px'}}),
        ui.Button({
      label: symbol.pan + ' PAN MAP',
      onClick: panMap,
      style: {stretch: 'horizontal', margin:'2px 90px 10px 90px'}}),
    submitButton
      ],
    style: {'background-color':'333333'}}),
    ui.Label('Purpose: plot timeseries of MODIS/FIRMS hotspot counts by region and day of year, across years' , {'background-color':'333333', fontSize: '8pt', color:'white'}),
    ui.Label('Modified by Juntakut, P. | Chulachomklao Royal Military Academy (CRMA)' , {'background-color':'333333', fontSize: '8pt', color:'aqua'}),
  ],
  style: {position: 'top-left', stretch:'horizontal','background-color':'333333',
    width: '400px', maxHeight: '90%', padding: '5px'},
  layout: ui.Panel.Layout.Flow('vertical'),
});
//=====================================================================================
//===============================
// Define a panel to hold the time series chart.
var chartPanelParent = ui.Panel({
  style: {
    width: '600px',
    position: 'bottom-right',
    'background-color': '333333',
    maxHeight: '90%'
  }
});
var chartPanel = ui.Panel([],null,{'background-color': '333333', margin: '0px -8px 0px -8px'});
var chartSelectPanel = ui.Panel([],
  ui.Panel.Layout.Flow('horizontal'), {
    margin: '0px 0 0 0', padding: '0', width: '450px', 'background-color':'333333'
  });
var hideChartMode = true;
var hideShowChartButton = ui.Button({
  label: 'Hide Chart',
  onClick: function() {
    hideChartMode = !hideChartMode;
    hideShowChartButton.setLabel(hideChartMode ? 'Hide Chart': 'Show Chart');
    if (!hideChartMode) {
      chartPanelParent.style().set({width: '92px', height: '45px'});
    } else {
      chartPanelParent.style().set({width: '600px', height: 'auto'});
    }
  },
    style: {padding: '0', margin: '0'}
});
// Define a panel to hold the legend.
var legendPanel = ui.Panel({
  style: {
    padding: '6px 3px 0px 5px',
    position: 'bottom-right',
    'background-color':'333333',
  }
});
// Add the main panel to the Map.
Map.add(mainPanel);
// Get the drawing tools widget object.
var drawingTools = Map.drawingTools();
// Clear any existing geometries.
var nLayers = drawingTools.layers().length();
while (nLayers > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
  nLayers = drawingTools.layers().length();
}
// Define a function to clear the geometry from the layer when a
// drawing mode button is clicked.
function clearGeometry() {
  var layers = drawingTools.layers();
  var nGeom = layers.get(0).geometries().length();
  for (var iLayer = 0; iLayer < nGeom; iLayer++) {
    layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  } 
}
// Define function for dealing with a click on the rectangle button.
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
// Define function for dealing with a click on the polygon button.
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function panMap() {
  drawingTools.stop();
}
// Color palette
var colPal = ee.Dictionary({
  1: ['#F4622E'],
  2: ['#FECC5C','#F03B20'],
  3: ['#FED976','#FD8D3C','#E31A1C'],
  4: ['#FECC5C','#FD8D3C','#F03B20','#BD0026'],
  5: ['#FED976','#FEB24C','#FD8D3C','#F03B20','#BD0026'],
  6: ['#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#B10026'],
  7: ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#B10026'],
  8: ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'],
  9: ['#FFEDA0','#FEDB7B','#FEBB56','#FD9A41','#FC6D32','#F23A24','#D9131E','#B50026','#800026'],
  10: ['#FFEDA0','#FEDD7F','#FEC35E','#FDA546','#FC863A','#FC542B','#EB2B20','#D20E20','#AF0026','#800026'],
  11: ['#FFEDA0','#FEDF82','#FEC965','#FDAE4A','#FD943F','#FC6D32','#F64327','#E51F1D','#CC0A22','#AA0026','#800026'],
  12: ['#FFEDA0','#FEE085','#FECE6A','#FEB54F','#FD9D43','#FC8138','#FC592D','#F03623','#DF171C','#C70723','#A60026','#800026'],
  13: ['#FFEDA0','#FEE187','#FED26F','#FEBB56','#FDA546','#FD903D','#FC6D32','#F94928','#EB2B20','#D9131E','#C30424','#A30026','#800026'],
  14: ['#FFEDA0','#FEE289','#FED572','#FEC15C','#FDAC49','#FD9840','#FC7E37','#FC5C2E','#F43D25','#E6211E','#D40F1F','#BF0125','#A00026','#800026'],
  15: ['#FFEDA0','#FEE38B','#FED976','#FEC561','#FEB24C','#FD9F44','#FD8D3C','#FC6D32','#FC4E2A','#EF3423','#E31A1C','#D00C21','#BD0026','#9E0026','#800026'],
  16: ['#FFEDA0','#FEE38C','#FEDA78','#FEC965','#FEB751','#FDA546','#FD943F','#FC7C37','#FC5E2E','#F74327','#EB2B20','#DD161D','#CC0A22','#B80026','#9C0026','#800026'],
  17: ['#FFEDA0','#FEE48D','#FEDB7B','#FECC68','#FEBB56','#FDAB49','#FD9A41','#FC893A','#FC6D32','#FC512B','#F23A24','#E7231E','#D9131E','#C80822','#B50026','#9A0026','#800026'],
  18: ['#FFEDA0','#FEE48E','#FEDC7D','#FECF6C','#FEBF5A','#FDAF4B','#FDA044','#FD913D','#FC7A36','#FC602F','#F94728','#EE3222','#E41D1C','#D5101F','#C50623','#B20026','#990026','#800026'],
  19: ['#FFEDA0','#FEE58F','#FEDD7F','#FED26F','#FEC35E','#FEB44E','#FDA546','#FD9740','#FC863A','#FC6D32','#FC542B','#F53F26','#EB2B20','#E0181C','#D20E20','#C30424','#AF0026','#970026','#800026'],
  20: ['#FFEDA0','#FEE590','#FEDE81','#FED471','#FEC662','#FEB852','#FDAA48','#FD9C42','#FD8E3C','#FC7936','#FC612F','#FA4B29','#F13824','#E8241E','#DC151D','#CE0C21','#C10224','#AC0026','#960026','#800026']
});
var continuousLegend = function(title, colPal, minVal, maxVal, units) {
  var footDivider = ui.Panel(ui.Label(),ui.Panel.Layout.flow('horizontal'),
    {margin: '0px 0px 10px 0px',height:'1.25px',border:'0.75px solid black',stretch:'horizontal', 'background-color':'333333'});
  var legendTitle = ui.Label(title, {color: 'orange', fontWeight: 'bold', fontSize: '20px', 'background-color':'white', margin: '0px 0px 6px 8px'});
  var unitsLabel = ui.Label(units, {color: 'black', fontWeight: 'bold', fontSize: '16px', 'background-color':'white', margin: '0px 0px 6px 8px'});
  var vis = {min: minVal, max: maxVal, palette: colPal};
  var makeColorBarParams = function(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '110x12',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
      'background-color':'333333',
    };
  };
  // Create the color bar for the legend
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', 'background-color':'333333', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {color: 'black','background-color':'white', fontWeight: 'bold', fontSize: '16px', margin: '4px 8px'}),
      ui.Label('', {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {color: 'black','background-color':'white', fontWeight: 'bold', fontSize: '16px', margin: '4px 8px'})
      ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  return ui.Panel([footDivider,legendTitle,unitsLabel,colorBar,legendLabels]);
};
var proj = firms.first().projection();
var scale = proj.nominalScale();
if (ui.url.get('startYear') !== undefined) {
  startYearSlider.setValue(ui.url.get('startYear'));
}
if (ui.url.get('endYear') !== undefined) {
  endYearSlider.setValue(ui.url.get('endYear'));
}
if (ui.url.get('DOY') !== undefined) {
  doyText.setValue(ui.url.get('DOY'));
}
var geometry;
if (ui.url.get('geometry') !== undefined) {
  geometry = ee.Deserializer.fromJSON(ui.url.get('geometry'));
} else {
  // Initialize a dummy GeometryLayer with null geometry acts as a placeholder
  // for drawn geometries.
  geometry = ee.Geometry.Rectangle([95.38,4.82,106,20.70]);
}
var dummyGeometry = ui.Map.GeometryLayer(
  {
    geometries: [geometry],
    name: 'geometry', color: '#FFF'
  });
drawingTools.layers().add(dummyGeometry);
Map.centerObject(geometry,4);
// Define function to generate chart and add it to the chart panel.
var dirtyMap = false;
function chartBurnedArea() {
  // Make the chart panel visible the first time.
  if (dirtyMap === false) {
    Map.add(chartPanelParent.add(hideShowChartButton).add(chartPanel).add(chartSelectPanel));
    mainPanel.add(legendPanel);
    dirtyMap = true;
  }
  // Clear the chart and legend panels.
  chartPanel.clear(); chartSelectPanel.clear();
  legendPanel.clear();
  // Get the geometry.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set drawing mode back to null.
  drawingTools.setShape(null);
  var startYear = startYearSlider.getValue();
  var endYear = endYearSlider.getValue();
  var doyRange = doyText.getValue().split('-');
  var startDay = parseFloat(doyRange[0]);
  var endDay = parseFloat(doyRange[1]);
  var nYear = ee.Number(endYear).subtract(ee.Number(startYear)).add(1);
  var firmsRange = ee.ImageCollection('FIRMS').select(['T21'],['FireCount'])
    .filter(ee.Filter.calendarRange(startYear,endYear,'year'))
    .filter(ee.Filter.calendarRange(startDay,endDay,'day_of_year'))
    .map(function(x) {return x.gt(0).copyProperties(x,['system:time_start'])});
  var firmsByYearCuml = ee.List.sequence(startYear,endYear,1).map(function(iYear) {
    var firmsYr = firmsRange
      .filter(ee.Filter.calendarRange(iYear,iYear,'year'))
      .toBands();
    var bandNames = firmsYr.bandNames()
      .map(function(x) {return ee.String(x).slice(4,7)});
    firmsYr = ee.Feature(firmsYr.rename(bandNames)
      .selfMask()
      .reduceRegions({
        collection: aoi,
        reducer: ee.Reducer.sum().unweighted(),
        crs: proj,
        scale: scale,
      }).first());
    var firmsYrCS = firmsYr.toArray(bandNames).accum(0);
    return ee.Feature(null,{Year:iYear})
      .set(ee.Dictionary.fromLists(bandNames,firmsYrCS.toList()));
  });
  firmsByYearCuml = ee.FeatureCollection(firmsByYearCuml);
  var yrStr = ee.List.sequence(startYear,endYear,1)
    .map(function(x) {return ee.String(ee.Number(x).toInt())});
  var firmsByDayCuml = ee.List.sequence(startDay,endDay,1).map(function(JDay) {
    var firmsDay = ee.Feature(null,{DOY:JDay});
    for (var iYear = startYear; iYear <= endYear; iYear++) {
      var firmsYr = firmsByYearCuml.filter(ee.Filter.eq('Year',iYear)).first();
      firmsDay = firmsDay.set(ee.String(ee.Number(iYear).toInt()),
        firmsYr.getNumber(ee.Number(JDay).format('%03d')));
    }
    return firmsDay;
  });
  var firmsYr = firmsRange.sum();
  var colPaln = colPal.get(ee.String(ee.Number(nYear).format())).getInfo();
  Map.layers().remove(Map.layers().get(0));
  Map.addLayer(firmsYr.selfMask(),
    {palette:colPaln, min: 1, max: endYear-startYear+1},
    'Hotspots Count');
  var getChartByDOY = function() {
    return ui.Chart.image.doySeriesByYear({
        imageCollection: firmsRange,
        bandName: 'FireCount',
        region: aoi,
        regionReducer: ee.Reducer.sum(),
        scale: scale, 
        sameDayReducer: ee.Reducer.sum(),
        startDay: startDay,
        endDay: endDay
      }).setChartType('LineChart')
      .setOptions({
        vAxis: {
          title: 'จำนวนจุดความร้อน (Hotspot Counts)',
          viewWindow: {
          min: 0,
        },
          format:'#####'
        },
        hAxis: {
          title: 'Day of Year',
          format: '###',
        },
        height: '211px',
        colors: colPaln
    });
  };
  var getChartByDOYcuml = function() {
    return ui.Chart.feature.byFeature(firmsByDayCuml,'DOY')
      .setChartType('LineChart')
      .setOptions({
        vAxis: {
          title: 'จำนวนจุดความร้อน (Hotspot Counts)',
          viewWindow: {
          min: 0,
        },
          format:'scientific'
        },
        hAxis: {
          title: 'Day of Year',
          format: '###',
        },
        interpolateNulls: true,
        height: '211px',
        colors: colPaln
    });
  };
  var chartSelectType = ui.Label('เลือกประเภทกราฟ:',{color: 'white', 'background-color':'333333', fontSize: '18px', margin: '13px 8px 0px 13px'});
  var chartSelect = ui.Select(['จำนวนครั้ง (Count)','ผลรวมจำนวนสะสม (Cumulative Sum)'],'จำนวนครั้ง (Count)');
  chartSelect.style().set('stretch', 'horizontal');
  chartSelect.onChange(function(selected) {
    chartPanel.clear();
    if (selected == 'จำนวนครั้ง (Count)') {chartPanel.add(getChartByDOY())}
    if (selected == 'ผลรวมจำนวนสะสม (Cumulative Sum)') {chartPanel.add(getChartByDOYcuml())}
  });
  chartPanel.add(getChartByDOY());
  chartSelectPanel.add(chartSelectType).add(chartSelect);
  legendPanel.add(continuousLegend('จุดความร้อน (HOTSPOTS)',colPaln,1,endYear-startYear+1,'จำนวนครั้งที่เกิดขึ้นของปี (Number of Years)'));
  ui.url.set({
    'startYear':startYear,
    'endYear':endYear,
    'DOY':doyText.getValue(),
    'geometry':aoi.toGeoJSONString(),
  });
  Map.centerObject(aoi);
}
submitButton.onClick(chartBurnedArea);