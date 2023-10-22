var palettes = require('users/gena/packages:palettes');
////PM2.5
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
function waterMask(image){
    // Select the land/water mask.
    var datamask = hansenImage.select('datamask');
    // Create a binary mask.
    var mask = datamask.eq(1);
    // Update the composite mask with the water mask.
    var image = image.updateMask(mask);
    return image
}
var pm25Col = ee.ImageCollection('ECMWF/CAMS/NRT').map(waterMask)
var pm25visParams = {
  min: 40,
  max: 140,
  // palette : palettes.matplotlib.inferno[7]
  palette: [
    "5E4FA2",
    "3288BD",
    "66C2A5",
    "ABE0A4",
    "E6F598",
    "FFFFBF",
    "FEE08B",
    "FDAE61",
    "F46D43",
    "D53E4F",
    "9E0142"
  ]
};
/////// population
var pop_ = ee.ImageCollection("WorldPop/GP/100m/pop").mean();
var popvisParams = {
  bands: ['population'],
  min: 0.0,
  max: 50.0,
  // palette : palettes.matplotlib.magma[7]
   "palette": [
    "ffffe7",
    "86a192",
    "509791",
    "307296",
    "2c4484",
    "000066"
  ],
};
var popLayer = ui.Map.Layer(pop_, popvisParams, 'Population density');
/////// vulnerability axis 
// var nl_ = ee.ImageCollection('NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4')
//                   .filterDate('2010-01-01', '2010-01-15').mean();
// var nl_ = waterMask(nl_)                  
// var nl_= nl_.select('avg_vis');
var nl_ = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG").filter(ee.Filter.date('2017-05-01', '2017-05-31')).mean().select("avg_rad");
var nl_ = waterMask(nl_)
var nlvisParams = {
   "palette": ['#35193e', '#701f57', '#ad1759', '#e13342', '#f37651', '#f6b48f'],
  min: 3.0,
  max: 40,
};
var nlLayer = ui.Map.Layer(nl_, nlvisParams, 'Income');
/////analysis
var pmThresh = 90;
function nFormatter(num) {
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1)+ 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
     }
     return '0K';
}
//// ui for App
var showLayers = function(range) {
  // var aoi = defaultAoi
  // var aoi = drawingTools.layers().get(0).getEeObject();
  var pm25 = ee.Image(pm25Col.filterDate(range.start(), range.end()).select('particulate_matter_d_less_than_25_um_surface').first()).multiply(1e9)
             .add(ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO").filterDate(range.start(), range.end()).select('CO_column_number_density').mean().multiply(1e3))
  // var no2 =  649;
  // var o3 = 0.204
  // var pm25 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2").filterDate(range.start(), range.end()).select('NO2_column_number_density').mean()
            // .add(ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2").filterDate(range.start(), range.end()).select('NO2_column_number_density').mean())
            // .add(ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_O3").filterDate(range.start(), range.end()).select('O3_column_number_density').mean())
            // .add(ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO").filterDate(range.start(), range.end()).select('CO_column_number_density').mean())
  // var pm25 = waterMask(pm25)
  // var pm25 = pm25.clip(aoi)
  var pmLayer = ui.Map.Layer(pm25, pm25visParams, 'Air quality');
      // pmLayer.setOpacity(opacitySlider.getValue());
  mapPanel.layers().set(0, pmLayer);
  mapPanel.layers().get(0).setShown(layerSelect.getValue() === "Air quality")
  };
var chartPanel = ui.Panel();
// Generates a new time series chart of SST for the given coordinates.
function generateChart(aoi) {
  chartPanel.clear();
  drawingTools.setShape(null);
  // print(aoi) // only for jackie to help with case studies
  var pop = pop_.clip(aoi);
  var nl = nl_.clip(aoi);
  var pm25 = mapPanel.layers().get(0).getEeObject()
  var pm25 = pm25.clip(aoi);
  var mapScale = mapPanel.getScale();
  var scale = mapScale*10
  // print(mapScale)
  var multiply = scale*scale/85/85
  // var popThresh = pop.reduceRegion({reducer : ee.Reducer.median(),scale : scale, maxPixels:1e11}).get("population").getInfo();
  // ee.Reducer.fixed2DHistogram(xMin, xMax, xSteps, yMin, yMax, ySteps)
  // var nlThresh = nl.mask(pop.eq(popThresh)).reduceRegion({reducer : ee.Reducer.mean(),scale : scale, maxPixels:1e11}).get("avg_rad").getInfo();
  var nlThresh = nl.reduceRegion({reducer : ee.Reducer.percentile([90]),scale : scale, maxPixels:1e11}).get("avg_rad").getInfo();
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  // var scale = mapScale > 6000 ? mapScale * 2 : 6000;
  var richSafe = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).getInfo();
  var richDanger = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).getInfo();
  var poorSafe = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).getInfo();
  var poorDanger = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).getInfo();
  // var richSafe = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  // var richDanger = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  // var poorSafe = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  // var poorDanger = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  var data = [
      ['ID',                   'Income', 'Risk',  'Region', 'Population'],
      [nFormatter(poorSafe),    -1,        -1,      "none",   poorSafe],
      [nFormatter(poorDanger),  -1,        1,       "none",   poorDanger],
      [nFormatter(richSafe),    1,        -1,       "none",   richSafe],
      [nFormatter(richDanger),  1,        1,        "none",   richDanger]
      ];
  var options = {
        // title: 'Risk + Vulnerability',
        legend:null,
        title: 'Population in area of interest',
        hAxis: {
                minValue:-2,
                maxValue:1.5,
                ticks: [{v:-1, f:'Lower Income'}, {v:1, f:'Higher Income'}],
                gridlines:{count:0,color:"white"},
                baselineColor:'white'
                },
        vAxis: {minValue:-2,
                maxValue:1.5,
                ticks: [{v:-1, f:'Clean air'}, {v:1, f:'Unhealthy\nair'}],
                gridlines:{count:0,color:"white"},
                baselineColor:'white'
                },
        bubble: {textStyle: {fontSize: 13}},
        series: {'none': {color: '#6888C1',visibleInLegend:false}},
        sizeAxis:{minValue:0},
        animation: {"startup": true},
        fontSize:13
      };
      var chart = new ui.Chart(data, 'BubbleChart', options);
  chartPanel.add(chart)
};
var layerProperties = {
  'Air quality': {
    name: 0,
    visParams: pm25visParams,
    legend:  true,
    palette: [
    "5E4FA2",
    "3288BD",
    "66C2A5",
    "ABE0A4",
    "E6F598",
    "FFFFBF",
    "FEE08B",
    "FDAE61",
    "F46D43",
    "D53E4F",
    "9E0142"
  ],
    legendLabels : ["Safe","Unhealthy"],
    defaultVisibility: false
    },
  'Income': {
    name: 0,
    visParams: nlvisParams,
    legend: true,
    palette:['#35193e', '#701f57', '#ad1759', '#e13342', '#f37651', '#f6b48f'],
    legendLabels : ["Low Income","High Income"],
    defaultVisibility: false  
  },
};
var mapPanel = ui.Map();
// mapPanel.layers().set(2, popLayer);
/////legend
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left',fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '10'}
});
mapPanel.add(legendPanel);
var legendTitlePanel = ui.Panel();
legendPanel.add(legendTitlePanel);
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
var colorbar_thumbnail = require('users/kkraoj/ee:make_colorbar_generic');
function setLegend(legend, palette, legendLabels) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  /////update legend title
  legendTitlePanel.clear()
  var legendTitle = ui.Label(
    layerSelect.getValue(),
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '10'});
  legendTitlePanel.add(legendTitle);
  keyPanel.clear();
  if (Array.isArray(legend)) {
      for (var i = 0; i < legend.length; i++) {
        var item = legend[i];
        var name = Object.keys(item)[0];
        var color = item[name];
        var colorBox = ui.Label('', {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0'
        });
        // Create the label with the description text.
        var description = ui.Label(name, {margin: '0 0 4px 6px'});
        keyPanel.add(
            ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
        }
    } else {
      var colorbar = colorbar_thumbnail.make_colorbar(palette, legendLabels)
      keyPanel.add(colorbar, ui.Panel.Layout.Flow('horizontal'));
        // print(colorbar_thumbnail)
    }
}
//// layer select
var selectItems = Object.keys(layerProperties);
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    var i;
    for (i = 0; i < selectItems.length; i++) {
      if (selectItems[i]===selected) {
          mapPanel.layers().get(i).setShown(true);
        //  block of code to be executed if the condition is true
      } else {
          mapPanel.layers().get(i).setShown(false);
        //  block of code to be executed if the condition is false
      }
      var legend = layerProperties[layerSelect.getValue()].legend;
      var palette = layerProperties[layerSelect.getValue()].palette;
      var legendLabels = layerProperties[layerSelect.getValue()].legendLabels;
      setLegend(legend, palette,legendLabels);
    }
  }
});
// Set the initial legend.
var legend = layerProperties[layerSelect.getValue()].legend;
var palette = layerProperties[layerSelect.getValue()].palette;
var legendLabels = layerProperties[layerSelect.getValue()].legendLabels;
setLegend(legend, palette,legendLabels);
///set the initial layer 
showLayers(ee.DateRange('2020-09-01', '2020-09-15'));
mapPanel.layers().set(1, nlLayer);
mapPanel.layers().get(1).setShown(layerSelect.getValue() === "Income")
var styleDict = require('users/kkraoj/ee:fmc_from_sar/style_map');
styleDict.stylemap(mapPanel);
mapPanel.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: false});
// Center the map
var defaultAoi = ee.Geometry.Rectangle([-123.588671875, 34.086752154007726, -119.4578125, 41.33120222486773]);
// mapPanel.centerObject(defaultAoi, 4)
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
// Add a title and some explanatory text to a side panel.
var bear = ee.Image('users/kkraoj/airgapLogo').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
var thumb = ui.Thumbnail({
  image: bear,
  params: {
    dimensions: '708x354',
    format: 'png'
  },
  style: {height: '150px', width: '340px',padding :'0px 0px 0px 25px'}
});
// var header = ui.Label('FireNet: Wildfire Risk Forecaster', {fontSize: '36px', color: '#945629'});
var toolPanel = ui.Panel(thumb, 'flow', {width: '410px'});
ui.root.widgets().add(toolPanel);
toolPanel.add(ui.Label(
    'Air pollution kills over 7 million people annually. However, it can disproportionately affect some communities with lower socio-economic status. AIRGAP helps analyse and visualize this environmental justice issue and help close the gap in inequality.',
    {fontSize: '13px'}))
toolPanel.add(ui.Label(
    'Use slider on the map to scroll through time. Use "Select Layer" to view composite air quality or income estimates. Click on ⬛   button to draw area of interest. Wait for chart of population bubbles experiencing bad air quality to update below. Click on any environmental justice studies to learn how air pollution affects some communities disproportionately.',
    {fontSize: '13px', fontWeight:'bold'}))  
// var link = ui.Label(
//     'Github Repository', {},f
//     'https://github.com/kkraoj/vwc_from_radar');
// var linkPanel = ui.Panel(
//     [ui.Label('To download maps visit:'), link], ui.Panel.Layout.flow('horizontal'));
// toolPanel.add(linkPanel);
// toolPanel.add(ui.Label('_________________________________________'));
// Add the select to the toolPanel with some explanatory text.
// toolPanel.add();
// toolPanel.add ui.Panel([header, text], 'flow', {width: '300px'});
// toolPanel.add(layerSelect);
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.9,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var text = ui.Label(
    'Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([ui.Label('Select Layer', {'font-size': '20px'}),layerSelect, text, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// toolPanel.add(ui.Label('__________________________________________'));
toolPanel.add(viewPanel);
var symbol = {
  rectangle: '⬛',
};
var controlPanel = ui.Panel({
  widgets: [
    // ui.Label('Click to select area of interest'),
    ui.Button({
      label: symbol.rectangle + ' Draw area of interest',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
toolPanel.add(controlPanel);
var start = ee.Date('2019-01-01').format();
var end = ee.Date('2020-10-01').format();
// Asynchronously compute the date ange and show the slider.
var dateSlider = ui.DateSlider({
  start: start.getInfo(),
  end: end.getInfo(),
  value: null,
  period: 15,
  onChange: showLayers,
  style: {position:'bottom-center',width:'800px'}
});
mapPanel.add(dateSlider.setValue(ee.Date('2020-09-01').millis().getInfo()));
// var dateRange = ee.DateRange(start, end).evaluate(function(range) {
//   var dateSlider = ui.DateSlider({
//     start: range['dates'][0],
//     end: range['dates'][1],
//     value: null,
//     period: 15,
//     onChange: showLayers,
//     style: {position:'bottom-center',width:'800px'}
//   });
//   mapPanel.add(dateSlider.setValue(ee.Date('2020-09-01').millis().getInfo()));
// });
toolPanel.add(chartPanel);
////////drawing
var drawingTools = mapPanel.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'FF33D6'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  // var numRects = layers.get(0).geometries.getInfo()
  // print(numRects)
  // var i;
  //   for (i = 0; i < numRects; i++) {
  //     layers.get(0).geometries().remove(layers.get(0).geometries().get(i));
  //   }
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
drawingTools.onDraw(ui.util.debounce(generateChart, 500));
drawingTools.onEdit(ui.util.debounce(generateChart, 500));
// mapPanel.style().set('cursor', 'crosshair');
function drawRectangle() {
clearGeometry();
drawingTools.setShape('rectangle');
drawingTools.draw();
}
///// case studies
toolPanel.add(ui.Label('Environmental justice case studies', {'font-size': '20px'}));
var selectCases = {
      'August Complex Fire, California, USA (Sep, 2020)':
      {aoi:ee.Geometry.Rectangle([-124.56292366582547, 39.588538799371435, -121.54168343145047, 42.366452198861154]),zoom  :6, start: "2020-09-08", end:"2020-09-22",
      image:ee.Image('users/kkraoj/oregon'), text:"The August Complex Fire in Northern California began on August 16th, 2020 as a result of lightning strikes and is still active in October. This has become the largest complex fire in California's recorded history. As climate change advances, extreme events like these massive wildfires will likely become more frequent. Wildfires significantly affect outdoor air quality, as they increase particulate matter (PM) and pollutant gases including nitrogen dioxide, carbon monoxide, and formaldehyde. AIRGAP estimates show over 720K people in areas with unhealthy air levels, with 55% of them bieng in the lower income category."},
      'ACT Fire, Australia (Dec, 2019)':
      {aoi:ee.Geometry.Rectangle([146.74727689455437, -36.37790655521692, 150.54854642580437, -34.0808251140135]),zoom  :6, start: "2019-12-27", end:"2020-01-11",
      image:ee.Image('users/kkraoj/australia'), text:"The Australian Capital Territory experienced one of the worst fire seasons between late 2019 and early 2020, with over 11 million hectares of bush, forest and parks burned. In fact, the air quality in Cranberra was reportedly the third worst of all major global cities on January 3rd, 2020. With AIRGAP's estimates, we see that all of the 937K people in this ACT area experienced unhealthy air quality, and 52% of those people were in the lower income category. However, the effects are not all localized - the aftermath of these intense fires have affected air quality all the way to New Zealand."},
      'Urban pollution, Chongqing, China (Nov, 2019)':
      {aoi:ee.Geometry.Rectangle([102.98230529661262, 28.119847266202086, 108.75012756223762, 32.044764438813345]),zoom  :7, start: "2019-11-12", end:"20219-11-27",
      image:ee.Image('users/kkraoj/china'), text:"Since the 1980s, Chongqing has been used as a pilot city to test new economic policies and therefore has undergone significant industrialization. This in turn has led to a sharp increase in energy consumption, which meant burning more fossil fuels. This combustion caused increases in sulfur dioxide emissions and eventually acid rain precipitation. In fact, acid rain occurs 50% more frequently in urban than rural regions of Chongqing. AIRGAP estimates show that over 48M people in lower income regions are living in areas of unhealthy air quality."},
      'Urban pollution, Milan, Italy (Apr, 2019)':
      {aoi:ee.Geometry.Rectangle([7.769002764197648, 45.111505694975385, 10.010213701697648, 46.49005402884302]),zoom  :7, start: "2019-04-01", end:"2019-04-16",
      image:ee.Image('users/kkraoj/milan'), text:"In 2012, Italy had the most pollution-related deaths in Europe. Milan and the region of Lombardy have constantly been one of the most polluted areas of the country, to a point where local government in 2015 had to ban cars and motorcycles for 6 hours a day and in some areas they even banned wood-fired pizza stoves. AIRGAP's estimate for early April 2019 shows 3M people in lower income communities exposed to unhealthy air, compared to 1M people in higher income communities."},
      'Human encroachment, The Amazon, Colombia (Mar, 2020)':
      {aoi:ee.Geometry.Rectangle([-74.62713343783241, 0.4699379090731378, -70.75994593783241, 4.31108442237439]),zoom  :6, start: "2020-03-11", end:"2020-03-26",
      image:ee.Image('users/kkraoj/amazon'), text:"Colombia is home to 10% of the Amazon Rainforest. This is the largest rainforest in the world and aside from circulating 20% of the world's oxygen, it also acts as a natural filter for air purification. Unfortunately, human encroachment is threatening the rainforest's existence. In Colombia, a concerning amount of land is being cleared for farming and agriculture. Some of the vegetation in the area is cleared through burning of biomass, which on top of the absence of the rainforest itself leads to unhealthy air. In March of 2020, AIRGAP shows that in this area only 19% of people in higher income communities were affected, while 44% of people in lower income communities were affected."},
      'Industrial Pollution, Congo (Aug, 2020)':
      {aoi:ee.Geometry.Rectangle([12.42075729812464, -11.19549378407746, 28.900249485624638, -1.8188751923055528]),zoom  :6, start: "2020-08-08", end:"2020-08-23",
      image:ee.Image('users/kkraoj/congo'), text:"The Democratic Republic of the Congo has seen heightened development in mining, smelting, and other industrial processes. This poses an environmental threat, not only because of the materials that are being extracted but also because these activities result in air pollution from dust, combustion by-products, and toxic heavy metals. In August of 2020, AIRGAP approximates that 39M people in lower income areas and 21M people in higher income areas are experiencing levels of unhealthy air quality."},
      'Crop stub burning, New Delhi, India (Dec, 2019)':
      {aoi:ee.Geometry.Rectangle([73.46579957028041,25.167038162694638, 78.03611207028041,30.564035068803165]),zoom  :6, start: "2019-12-27", end:"2020-01-11",
      image:ee.Image('users/kkraoj/delhi'), text:"Every winter, farmers in northen India in the states of Punjab and Haryana clear their farmlands by burning the remanant stubbles. This releases an enourmous amount of particulate matter and COx polutants which affect the villages in the northern plateu, and suburbs of New Delhi. AIRGAP estimates from December 2019 show that more than 83M people from lower income communities are being affected."},
};
var caseSelect = ui.Select({
  items:  Object.keys(selectCases),
  onChange: viewCase,
  placeholder: "Select a case study",
  value: Object.keys(selectCases)[6],
    }
);
toolPanel.add(caseSelect);
var casePanel = ui.Panel()
toolPanel.add(casePanel);
function viewCase(selected){
          // zoom into the fire
      mapPanel.centerObject(selectCases[selected].aoi, selectCases[selected].zoom)
      // dateSlider.setValue(ee.Date(selectCases[selected].start).millis().getInfo())
      casePanel.clear()
      var thumb = ui.Thumbnail({
      image: selectCases[selected].image.visualize({
              bands:  ['b1', 'b2', 'b3'],min: 0, max: 255}),
      params: {dimensions: '533x300',format: 'png'},
      style: {height: '170x', width: '300px',padding :'0px 0px 0px 60px'}
                       });
      // var label = 
      var innerPanel = ui.Panel([thumb, ui.Label(selectCases[selected].text)])
      casePanel.add(innerPanel)
      showLayers(ee.DateRange(selectCases[selected].start, selectCases[selected].end));
        clearGeometry()
        var geomLayer = ui.Map.GeometryLayer({geometries: [selectCases[selected].aoi], name: 'geometry', color: 'FF33D6'});
        // drawingTools.layers().add(dummyGeometry);
        drawingTools.layers().set(0,geomLayer);
      dateSlider.setValue(ee.Date(selectCases[selected].start).millis().getInfo())
      }
viewCase(Object.keys(selectCases)[6])
// print(mapPanel.widgets())
// add default layer
// var geomLayer = ui.Map.GeometryLayer({geometries: [defaultAoi], name: 'geometry', color: 'FF33D6'});
//         // drawingTools.layers().add(dummyGeometry);
// drawingTools.layers().set(0,geomLayer);
var link = ui.Label(
    'Technical docs.', {fontSize: '10px', padding: '0px'},
    'https://2020.spaceappschallenge.org/challenges/confront/better-together/teams/3-people/project');
var linkPanel = ui.Panel(
    [ui.Label('Created by Jacqueline Fortin Flefil, Nathan Dadap & Krishna Rao.',{fontSize: '10px',padding: '0px'}), link], ui.Panel.Layout.flow('horizontal'));
toolPanel.add(linkPanel)