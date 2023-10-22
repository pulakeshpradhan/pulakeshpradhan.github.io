var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            21.739334825178354,
            63.134026170550584
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([21.739334825178354, 63.134026170550584]),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4");
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG');
var finland_geo = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            20.932066165399437,
            54.07166328154393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            21.832945071649437,
            54.25177261865518
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                12.283131794756121,
                71.29412115623977
              ],
              [
                12.283131794756121,
                59.701601786322854
              ],
              [
                33.37688179475612,
                59.701601786322854
              ],
              [
                33.37688179475612,
                71.29412115623977
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "coordinates": []
    });               
//var nighttime = dataset.select('avg_rad');
//var nighttimeVis = {min: 0.0, max: 60.0};
var qualityvisparams = {
  bands: ["cf_cvg"],
  max: 120,
  min: 20,
  //gain:0.15,
  opacity: 0.5,
//  palette: ["black", "#fbff08"] //was yellow
};
var hamvisparams = {
  bands: ["avg_rad"],
  max: 15,
  min: -2,
  //gain:0.15,
  opacity: 0.8,
//  palette: ["black", "#fbff08"] //was yellow
};
var hamvisparams2 = {
  bands: ["avg_rad"],
  max: 15,
  min: -2,
//  gain:0.15,
  opacity: 0.8,
//  palette: ["black", "#fbff08"] //was red
//  palette: ["black", "yellow"]
};
var differenceVis = {
 bands: ["constant"],
//  bands: ["avg_rad"],
//  gain:0.15,
  min: 2,
  max: 20,
  opacity: 0.5,
  palette: ["black","#0af4ff"]
};
var differenceVis2 = {
 bands: ["constant"],
// bands: ["avg_rad"],
//  gain:0.15,
  min: 4,
  max: 10,
  opacity: 0.5,
  palette: ["black","#de25ff"]
};
var differenceVis3 = {
//  bands: ["constant"],
  bands: ["avg_rad"],
//  gain:0.15,
  min: 5,
  max: 10,
  opacity: 0.5,
  palette: ["black","#38ff06"]
};
var histOptions = {
  title: 'Newer Image (2nd, red) Histogram',
  fontSize: 8,
  hAxis: {title: 'Average DNB of Radiance in nanoWatts/cm2/sr'},
  vAxis: {title: 'count of avg_rad'},
  backGroundColor: "#e4edff",
  series: {
    0: {color: '#ffc6bc'}}
 };
var histOptions2 = {
  title: 'Older Image (1st, yellow) Histogram',
  fontSize: 8,
  hAxis: {title: 'Average DNB of Radiance in nanoWatts/cm2/sr'},
  vAxis: {title: 'count of avg_rad'},
  backGroundColor: "#e4edff",
  series: {
    0: {color: '#ffdd05'}}
 }
//own functions---------------------------------------------------------------------------------------
function ToggleHistogram1()
{
  if(histogram1_Visible)
  {
    map.remove(chartPanel);
    histogram1_Visible = false;
  }
  else
  {
    histogram1_Visible = true;
    UpdateFirstHistogram();
    map.add(chartPanel);
  }
}
function ToggleHistogram2()
{
  if(histogram2_Visible)
  {
    map2.remove(chartPanel2);
    histogram2_Visible = false;
  }
  else
  {
    histogram2_Visible = true;
    UpdateSecondHistogram();
    map2.add(chartPanel2);
  }
}
function returnNewDataRange(startYear_,startMonth_,endYear_,endMonth_){
  var filterStartDate = "";
  var filterEndDate = "";
  if (startMonth_ < 10) {
    filterStartDate = startYear_ +"-0"+ startMonth_ +"-01";
  } else {
    filterStartDate = startYear_ +"-"+ startMonth_ +"-01";
  }
  print("[DEBUG] using filter start:" +filterStartDate);
  if (endMonth_ < 10) {
    if(endMonth_ == 2){
      filterEndDate = endYear_ +"-0"+ endMonth_ +"-28";
    }
    else {
     filterEndDate = endYear_ +"-0"+endMonth_ +"-30";
    }
  } else {
     filterEndDate = endYear_ +"-"+ endMonth_ +"-30";
  }
  print("[DEBUG] using filter end:" +filterEndDate);
  return  ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG').filter(ee.Filter.date(filterStartDate, filterEndDate));
 // return  ee.ImageCollection('NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4').filter(ee.Filter.date(filterStartDate, filterEndDate))NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4
}
//TODO function of error messages and setting up choices for previous.. prolly not gonna do it
function RevertMenus(whichImage){
  if(whichImage ==1)
  {
  }
  else
  {
  }
}
function ReturnHistogram(sourceImage, area)
{
  var histogramReduced = sourceImage.select("avg_rad").reduceRegion({
    reducer: ee.Reducer.fixedHistogram({
    min: 2,
    max: 200,
    steps: 200
    }),
    geometry: area, 
    scale: 250, 
    maxPixels: 1e9, 
    bestEffort: true
  });
  // found code below, cannot credit as did not find it again
  // #############################################################################
  // ### HISTOGRAM CHART USING ARRAYS ###
  // #############################################################################
  // The result of the region reduction by `autoHistogram` is an array. Get the
  // array and cast it as such for good measure.
  var histArray = ee.Array(histogramReduced.get('avg_rad'));
  // Subset the values that represent the bottom of the bins and project to
  // a single dimension. Result is a 1-D array.
  var binBottom = histArray.slice(1, 0, 1).project([0]);
  // Subset the values that represent the number of pixels per bin and project to
  // a single dimension. Result is a 1-D array.
  var nPixels = histArray.slice(1, 1, null).project([0]);
  // Chart the two arrays using the `ui.Chart.array.values` function.
  var histColumnFromArray = ui.Chart.array.values({
    array:nPixels,
    axis: 0,
    xLabels: binBottom})
    .setChartType('ColumnChart');
  //-- found code ends
  return histColumnFromArray;
}
function UpdateFirstImage(firstRun)
{
   map.remove(layer);
   var image1DataSetTemp = returnNewDataRange(selectedyearBegin,selectedmonthBegin,selectedyearEnd,selectedmonthEnd);
  if(image1DataSetTemp.size()<1)
  {
    RevertMenus(1);
    image1Text.setValue("0 images found! ERROR! CHOOSE ANOTHER DATE(S) OR AREA!");
    return;
  }
  image1DataSet = image1DataSetTemp;
  image1Text.setValue(image1DataSet.size().getInfo() +" images found");
  layer = ui.Map.Layer(image1DataSet.select('avg_rad').mean(), hamvisparams, "newer");
  layers.add(layer);
  //just to prevent map load time out -- use fixed coord on first run as we know bounds
  if (!firstRun)
  {
    UpdateFirstHistogram();
  }
}
function UpdateSecondImage(firstRun)
{
  map2.remove(secondLayer);
  var image2DataSetTemp = returnNewDataRange(selectedyearBegin2,selectedmonthBegin2,selectedyearEnd2,selectedmonthEnd2);
  if(image2DataSetTemp.size()<1)
  {
    RevertMenus(1);
    image1Text.setValue("0 images found! ERROR! CHOOSE ANOTHER DATE(S) OR AREA!");
    return;
  }
  image2DataSet = image2DataSetTemp;
  image2Text.setValue(image2DataSet.size().getInfo() +" images found");
  secondLayer = ui.Map.Layer(image2DataSet.select('avg_rad').mean(), hamvisparams2, "older");
  layers2.add(secondLayer);
  //if first run, no time to load the map before recalc, fixed coord as we know bounds
  if(!firstRun)
  {
    UpdateSecondHistogram();
  }
}
function UpdateFirstHistogram()
{
    var image1h = image1DataSet.select("avg_rad").mean();
    print(image1h);
    //map load timing problems show up with bounds function
    var bounds;
    var area;
    try
    {
      bounds = map.getBounds();
      print(bounds);
      area = ee.Geometry.Rectangle(bounds[0],bounds[1],bounds[2],bounds[3]);
    }
    catch(err)
    {
      bounds = [12.836037499999984,58.86952436396589,30.414162499999982,66.77367540485132]
    }
    area = ee.Geometry.Rectangle(bounds[0],bounds[1],bounds[2],bounds[3]);
    chartPanel.clear();
    chartPanel.add(ReturnHistogram(image1h, area).setOptions(histOptions));
}
function UpdateSecondHistogram()
{
   var image2h = image2DataSet.select("avg_rad").mean();
    print(image2h);
    //problems with map load times show up with the bounds..
    var bounds;
    var area;
    try
    {
      bounds = map.getBounds();
      print(bounds[0]);
      area = ee.Geometry.Rectangle(bounds[0],bounds[1],bounds[2],bounds[3]);
    }
    catch(err)
    {
      bounds = [12.836037499999984,58.86952436396589,30.414162499999982,66.77367540485132]
    }
    area = ee.Geometry.Rectangle(bounds[0],bounds[1],bounds[2],bounds[3]);
  //print(area);
  //layers.add(area);
    chartPanel2.clear();
    chartPanel2.add(ReturnHistogram(image2h, area).setOptions(histOptions2));
}
function UpdateLayers(init_)
{
  print("[DEBUG] Starting UpdateLayers..")
 // var firstlayerOp = layer.getOpacity();
  var thirdlayerOp = difflayer.getOpacity();
  var forthlayerOp = difflayer2.getOpacity();
  var fifthlayerOp = difflayer3.getOpacity();
  var secondlayerOp = qualitylayer.getOpacity();
  print("opacity");
  print(thirdlayerOp);
  //remove old layers
  if(!init_)
  {
    //map.remove(layer);
    //map.remove(secondLayer);
    qmap.remove(difflayer);
    qmap.remove(difflayer2);
    qmap.remove(difflayer3);
    qmap.remove(qualitylayer);
  }
  else
  {
  //  firstlayerOp = 0.5;
  //  secondlayerOp = 0.5;
    thirdlayerOp = 0.5;
    forthlayerOp = 0.5;
    fifthlayerOp = 0.5;
    secondlayerOp = 0.5;
  }
  print(thirdlayerOp);
  //layer2
 // var layers = map.layers();
 // var qlayers = qmap.layers();
//  var map2_layers = map2.layers();
  /* moved to its own subfunction
  var image1DataSetTemp = returnNewDataRange(selectedyearBegin,selectedmonthBegin,selectedyearEnd,selectedmonthEnd);
  print(image1DataSetTemp);
  print(image1DataSetTemp.size());
  var image2DataSetTemp = returnNewDataRange(selectedyearBegin2,selectedmonthBegin2,selectedyearEnd2,selectedmonthEnd2);
  print(image2DataSetTemp);
  print(image2DataSetTemp.size());
  if(image1DataSetTemp.size()<1 || image2DataSetTemp.size()<1)
  {
    if(image1DataSetTemp.size()<1)
    {
      RevertMenus(1);
      image1Text.setValue("0 images found! ERROR! CHOOSE ANOTHER DATE(S) OR AREA!");
    }
    else
    {
      RevertMenus(2);
       image2Text.setValue("0 images found! ERROR! CHOOSE ANOTHER DATE(S) OR AREA!");
    }
    return;
  }
  else
  {
    oldselectedYearBegin = selectedyearBegin;
    oldselectedyearBegin2 = selectedyearBegin2;
    oldselectedmonthBegin=selectedmonthBegin;
    oldselectedmonthBegin2 =selectedmonthBegin2;
    oldselectedyearEnd = selectedyearEnd;
    oldselectedyearEnd2 = selectedyearEnd2;
    oldselectedmonthEnd = selectedmonthEnd;
    oldselectedmonthEnd2= selectedmonthEnd2;
    image1DataSet = image1DataSetTemp;
    image2DataSet = image2DataSetTemp;
    image1Text.setValue(image1DataSet.size().getInfo() +" images found");
    image2Text.setValue(image2DataSet.size().getInfo() +" images found");
    //
  }
  layer = ui.Map.Layer(image1DataSet.select('avg_rad').mean(), hamvisparams2, "newer");
  layers.add(layer);
  secondLayer = ui.Map.Layer(image2DataSet.select('avg_rad').mean(), hamvisparams, "older");
  map2_layers.add(secondLayer);*/
  var qualityImage1 = ee.Image(image1DataSet.select("cf_cvg").sum());
  var qualityImage2 = ee.Image(image2DataSet.select("cf_cvg").sum());
  var qualityMetric = ee.Image();
  qualityMetric = qualityMetric.expression(
    "(image1+image2)", {
      "image1" : qualityImage1,
      "image2" : qualityImage2
    });
  print("here");
  qualitylayer = ui.Map.Layer(qualityMetric, qualityvisparams,"quality_newer");
  //diff
  var image1 = ee.Image(image1DataSet.mean());
  var image2 = ee.Image(image2DataSet.mean());
  print(image1);
  print(image2);
  var image1h = image1.select("avg_rad");
 // var histogram = ui.Chart.image1h.histogram(image1,finland_geo).setSeriesNames(['avg_rad']).setOptions(chartOptions); // print(histogram);
// var historgram = ui.Chart.feature.historgam(image1h,finland_geo).setSeriesNames(['avg_rad']).setOptions(chartOptions);
//  print(historgram);
  //chartPanel.add(histogram);
  //newer test
  print("[DEBUG] Starting difference 1...")
  var differenceMask = image2.select("avg_rad");
  print(differenceMask);
  differenceMask = differenceMask.expression(
    '((newer-older)>0)?newer-older:0', {
   //   '((older/newer)>0.7)?newer/older:0', {
      'pixel': differenceMask.select("avg_rad"),
      'newer':  image1.select("avg_rad"),
      'older': image2.select("avg_rad")
   });
  /* differenceMask = differenceMask.expression(
    '!pixel', {
      'pixel': differenceMask.select("constant")
   });*/
   var difference = differenceMask;
   /*image1.expression(
  'diffmask==0?-1:newer', {
    "diffmask" : differenceMask.select("constant"),
    "newer" : image1.select("avg_rad")
  });*/
  print(difference);
  //lost things
  print("[DEBUG] Starting Difference 2..");
  var differenceMask2 = image2.select("avg_rad");
  print(differenceMask2);
  //'(newer-older<1 && newer-older >0)||((older/newer)>0.7)||(older<0.3&&newer<0.3)?0:1', {
  differenceMask2 = differenceMask2.expression(
    '(older<7&&newer<5)||(older>newer)||(older<2 && older/newer>0.3)||(newer<4)||(older>9 && older/newer >0.3)||(older/newer >0.7)?0:1', {
      'pixel': differenceMask2.select("avg_rad"),
      'newer': image1.select("avg_rad"),
      'older': image2.select("avg_rad")
   });
   print(differenceMask2);
 /*  differenceMask2 = differenceMask2.expression(
    '!pixel', {
      'pixel': differenceMask2.select("constant")
   });
   */
   print(differenceMask2);
  var difference2 = image2.expression(
  '((diffmask==1) && (older/newer < 0.4))?(1-(older/newer))*10:-1', {
    "diffmask" : differenceMask2.select("constant"),
    "newer" : image1.select("avg_rad"),
    'older': image2.select("avg_rad")
  });
   var difference3 = image2.expression(
  '((diffmask==1) && (older/newer <0.3))?-1:older/newer', {
    "diffmask" : differenceMask2.select("constant"),
    "newer" : image1.select("avg_rad"),
    'older': image2.select("avg_rad")
  });
 // print(difference2);
 //old test way..
 // var difference = image1.select("avg_rad").subtract(image2.select("avg_rad"));
  //var difference = image1.subtract(image2);
  print(differenceMask);
  difflayer = ui.Map.Layer(difference, differenceVis, "differenceMask");
  qlayers.add(difflayer);
//  difflayer2 = ui.Map.Layer(differenceMask2, differenceVis2, "diff2");
//  layers.add(difflayer2);
  difflayer2 = ui.Map.Layer(difference2, differenceVis2, "dif2")
  qlayers.add(difflayer2);
  difflayer3 = ui.Map.Layer(difference3, differenceVis3, "dif3")
  qlayers.add(difflayer3);
  qlayers.add(qualitylayer);
 // if(init_)
 // {
   // qmap.layers().get(0).setOpacity(firstlayerOp);
  //  qmap.layers().get(1).setOpacity(secondlayerOp);
    qmap.layers().get(0).setOpacity(thirdlayerOp);
    qmap.layers().get(1).setOpacity(forthlayerOp);
    qmap.layers().get(2).setOpacity(fifthlayerOp);
    qmap.layers().get(3).setOpacity(secondlayerOp);
//  }
  print("DEBUG Ending Update LAyers..");
}
/////////////////////////////////////////// MAIN BEGINS ////////////////////////////////////
//clear
ui.root.clear();
var map = ui.Map();
map.setOptions("SATELLITE");
var qmap = ui.Map();
var map2 = ui.Map();
map2.setOptions("SATELLITE");
ui.root.add(map2);
ui.root.add(map);
ui.root.add(qmap);
ui.Map.Linker([map,qmap,map2]);
//defines
var layers = map.layers();
var layers2 = map2.layers();
var qlayers = qmap.layers();
var layer = ui.Map.Layer();
var secondLayer = ui.Map.Layer();
var difflayer = ui.Map.Layer();
var difflayer2 = ui.Map.Layer();
var difflayer3 = ui.Map.Layer();
var qualitylayer = ui.Map.Layer();
//booleans
var histogram1_Visible = true;
var histogram2_Visible = true;
var years = {
  2014: 2014,
  2015: 2015,
  2016: 2016,
  2017: 2017,
  2018: 2018,
  2019: 2019,
  2020: 2020};
var months = {
   January: 1,
   February: 2,
   March: 3,
   April: 4,
   May: 5,
   June: 6,
   July: 7,
   August: 8,
   September: 9,
   October: 10,
   November: 11,
   December: 12};
var selectedyearBegin=2020;
var oldselectedYearBegin=2020;
var selectedyearBegin2 = 2014;
var oldselectedyearBegin2 = 2014;
var selectedmonthBegin=1;
var oldselectedmonthBegin=1;
var selectedmonthBegin2 =1;
var oldselectedmonthBegin2
var selectedyearEnd = 2020;
var oldselectedyearEnd = 2020;
var selectedyearEnd2 = 2014;
var oldselectedyearEnd2 = 2014;
var selectedmonthEnd = 4;
var oldselectedmonthEnd = 4;
var selectedmonthEnd2= 4;
var oldselectedmonthEnd2= 4;
//datasets
var image1DataSet = returnNewDataRange(selectedyearBegin,selectedmonthBegin,selectedyearEnd,selectedmonthEnd);
var image2DataSet = returnNewDataRange(selectedyearBegin2,selectedmonthBegin2,selectedyearEnd2,selectedmonthEnd2);
//img 1&2 year begin
var selectYearBegin = ui.Select({
  items: Object.keys(years),
  onChange: function(key) 
  {
    selectedyearBegin = [key][0] ;
    //print("selected year begin:" +selectedyearBegin);
  }
});
selectYearBegin.style().set('position', 'top-center' );
selectYearBegin.setPlaceholder('2020');
var selectYearBegin2 = ui.Select({
  items: Object.keys(years),
  onChange: function(key) 
  {
    selectedyearBegin2 = [key][0] ;
    //print("selected year begin:" +selectedyearBegin);
  }
});
selectYearBegin2.style().set('position', 'top-center' );
selectYearBegin2.setPlaceholder('2014');
//im 1 & 2 months
var selectMonthBegin = ui.Select({
  items: Object.keys(months), onChange: function(key)
  {
    selectedmonthBegin = months[key];
    //print("selected month begin:" +selectedmonthBegin);
  }
});
selectMonthBegin.style().set('position', 'top-center' );
selectMonthBegin.setPlaceholder('January');
var selectMonthBegin2 = ui.Select({
  items: Object.keys(months), onChange: function(key)
  {
    selectedmonthBegin2 = months[key];
    //print("selected month begin:" +selectedmonthBegin);
  }
});
selectMonthBegin2.style().set('position', 'top-center' );
selectMonthBegin2.setPlaceholder('January');
//im1 & 2 year ends
var selectYearEnd = ui.Select({
  items: Object.keys(years),
  onChange: function(key)
  {
    selectedyearEnd = [key][0];
  //  print("selected year end:" +selectedyearEnd);
  }
});
selectYearEnd.style().set('position', 'top-center' );
selectYearEnd.setPlaceholder('2020');
var selectYearEnd2 = ui.Select({
  items: Object.keys(years),
  onChange: function(key)
  {
    selectedyearEnd2 = [key][0];
  //  print("selected year end:" +selectedyearEnd);
  }
});
selectYearEnd2.style().set('position', 'top-center' );
selectYearEnd2.setPlaceholder('2014');
//im1 & 2 select month ends
var selectMonthEnd = ui.Select({
  items: Object.keys(months),
  onChange: function(key)
  {
    selectedmonthEnd = months[key];
    //print("selected month end:" +selectedmonthEnd);
  }
});
selectMonthEnd.setPlaceholder('April');
var selectMonthEnd2 = ui.Select({
  items: Object.keys(months),
  onChange: function(key)
  {
    selectedmonthEnd2 = months[key];
    //print("selected month end:" +selectedmonthEnd);
  }
});
selectMonthEnd2.setPlaceholder('April');
var sliderTrans = ui.Slider({
  style: {minWidth: '150px', backgroundColor: "#e4edff"}
});
sliderTrans.setValue(0.6); 
sliderTrans.onChange(function(value) {
  map.layers().get(0).setOpacity(value);
});
var sliderTrans2 = ui.Slider({
  style: {minWidth: '150px', backgroundColor: "#e4edff"}
});
sliderTrans2.setValue(0.6); 
sliderTrans2.onChange(function(value) {
  map2.layers().get(1).setOpacity(value);
});
var sliderTrans3 = ui.Slider({
  style: {minWidth: '150px', backgroundColor: "#e4edff"}
});
sliderTrans3.setValue(0.5); 
sliderTrans3.onChange(function(value) {
  qmap.layers().get(0).setOpacity(value);
});
var sliderTrans4 = ui.Slider({
  style: {minWidth: '150px', backgroundColor: "#e4edff"}
});
sliderTrans4.setValue(0.5); 
sliderTrans4.onChange(function(value) {
  qmap.layers().get(1).setOpacity(value);
});
var sliderTrans5 = ui.Slider({
  style: {minWidth: '150px', backgroundColor: "#e4edff"}
});
sliderTrans5.setValue(0.5); 
sliderTrans5.onChange(function(value) {
  qmap.layers().get(2).setOpacity(value);
});
//Panels
var image1Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '150px', position: 'top-left', backgroundColor: "#e4edff", border:"2px solid black"}
});
var image2Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '150px', position: 'top-left', backgroundColor: "#e4edff", border:"2px solid black"}
});
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '450px', height: '150px', position: 'top-center', backgroundColor: "#e4edff", border:"2px solid black"}
});
var redPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px', height: '90px', position: 'top-left', backgroundColor: "#e4edff"}
});
var yellowPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px', height: '90x', position: 'top-center', backgroundColor: "#e4edff"}
});
var differencePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px', height: '120px', position: 'top-right', backgroundColor: "#e4edff"}
});
var differencePanel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px', height: '120px', position: 'top-right', backgroundColor: "#e4edff"}
});
var differencePanel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px', height: '120px', position: 'top-right', backgroundColor: "#e4edff"}
});
var chartPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '450px', height: '250px', position: 'bottom-left', backgroundColor: "#e4edff"}
});
var chartPanel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '450px', height: '250px', position: 'bottom-left', backgroundColor: "#e4edff"}
});
var updateButton = ui.Button("Update 2nd Image");
updateButton.style().set('position','bottom-center');
updateButton.onClick(function() {
 UpdateFirstImage(false);
});
var updateButton2 = ui.Button("Update 1st Image");
updateButton2.style().set('position','bottom-center');
updateButton2.onClick(function() {
 UpdateSecondImage(false);
});
var updateButton3 = ui.Button("Update Differences to current images");
updateButton3.style().set('position','bottom-center');
updateButton3.onClick(function() {
 UpdateLayers(false);
});
var hideHistButton = ui.Button("Show/Hide Histogram");
hideHistButton.style().set('position','bottom-center');
hideHistButton.onClick(function() {
 ToggleHistogram1();
});
var hideHistButton2 = ui.Button("Show/Hide Histogram");
hideHistButton2.style().set('position','bottom-center');
hideHistButton2.onClick(function() {
 ToggleHistogram2();
});
selectMonthEnd.style().set('position', 'top-center' );
selectMonthBegin.style().set('position', 'top-center' );
sliderTrans.style().set('position','top-center');
var title = ui.Label('Newer Image (2nd, Red)', {
    fontSize : "10px",
    backgroundColor : "#ffc6bc",
    fontWeight: "bold"
  });
title.style().set('position', 'top-center');
//labels
var startYearTitle = ui.Label('Start Year:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var startYearTitle2 = ui.Label('Start Year:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var startMonthTitle = ui.Label('Start Month:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var startMonthTitle2 = ui.Label('Start Month:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var endYearTitle = ui.Label('End Year:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var endYearTitle2 = ui.Label('End Year:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var endMonthTitle = ui.Label('End Month:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var endMonthTitle2 = ui.Label('End Month:', {
    fontSize : "10px",
    backgroundColor : "#e4edff",
    fontWeight: "bold"
  });
var title2 = ui.Label("Older Image (1st, yellow)", {
    fontSize : "10px",
    backgroundColor : "#feffce",
    fontWeight: "bold"
  });
var sliderLabel = ui.Label("Newer (2nd, red) Median Image Transparency", {
    fontSize : "10px",
    backgroundColor : "#ffc6bc",
    fontWeight: "bold"
  });
var sliderLabel2 = ui.Label("Older (1st, yellow) Median Image Transparency",
{
    fontSize : "10px",
    backgroundColor : "#feffce",
    fontWeight: "bold"
  });
var sliderLabel3 = ui.Label("Luminosity Change",
 {
    fontSize : "10px",
    backgroundColor : "#bafffc",
    fontWeight: "bold",
    textAlign : "right"
  });
var sliderLabel4 = ui.Label("New Things",
 {
    fontSize : "10px",
    backgroundColor : "#ff83e4",
    fontWeight: "bold",
    textAlign : "right"
  });
  var sliderLabel5 = ui.Label("Lost Things",
 {
    fontSize : "10px",
    backgroundColor : "#b8ffc4",
    fontWeight: "bold",
    textAlign : "right"
  });
var diff2Expl = ui.Label("MUCH more aggressive masking with custom algorithm. Will show mostly only NEW THINGS while losing some information about urban encroachment.",
 {
    fontSize : "8px",
    backgroundColor : "#ff83e4",
    fontWeight: "bold"
  });  
var diff1Expl = ui.Label("Simple difference of the two chosen images, depicting the changes of intensity between the END DATE of YELLOW and START DATE of RED image.",
 {
    fontSize : "8px",
    backgroundColor : "#bafffc",
    fontWeight: "bold"
  });
  //placeholder text, updated as the settings are changed
var image1Text = ui.Label("3 images found", {
    fontSize : "8px",
    backgroundColor : "#ffc6bc",
    fontWeight: "bold"
  });
  //placeholder text, updated as the settings are changed
var image2Text = ui.Label("4 images found", {
    fontSize : "8px",
    backgroundColor : "#feffce",
    fontWeight: "bold"
  });
var diff3Expl = ui.Label("Custom filtering algorithm and highlighting the THINGS LOST between the END DATE of YELLOW and START DATE of RED image. ",
 {
    fontSize : "8px",
    backgroundColor : "#b8ffc4",
    fontWeight: "bold"
  });
image1Panel.add(title);
image1Panel.add(startYearTitle);
image1Panel.add(selectYearBegin);
image1Panel.add(startMonthTitle);
image1Panel.add(selectMonthBegin);
image1Panel.add(endYearTitle);
image1Panel.add(selectYearEnd);
image1Panel.add(endMonthTitle);
image1Panel.add(selectMonthEnd);
image1Panel.add(image1Text);
image1Panel.add(updateButton);
image2Panel.add(title2);
image2Panel.add(startYearTitle2);
image2Panel.add(selectYearBegin2);
image2Panel.add(startMonthTitle2);
image2Panel.add(selectMonthBegin2);
image2Panel.add(endYearTitle2);
image2Panel.add(selectYearEnd2);
image2Panel.add(endMonthTitle2);
image2Panel.add(selectMonthEnd2);
image2Panel.add(image2Text);
image2Panel.add(updateButton2);
redPanel.add(sliderLabel);
redPanel.add(sliderTrans);
yellowPanel.add(sliderLabel2);
yellowPanel.add(sliderTrans2);
//controlPanel.add(yellowPanel);
//controlPanel.add(redPanel);
differencePanel.add(sliderLabel3);
differencePanel.add(sliderTrans3);
differencePanel.add(diff1Expl);
controlPanel.add(differencePanel);
differencePanel2.add(sliderLabel4);
differencePanel2.add(sliderTrans4);
differencePanel2.add(diff2Expl);
controlPanel.add(differencePanel2);
differencePanel3.add(sliderLabel5);
differencePanel3.add(sliderTrans5);
differencePanel3.add(diff3Expl);
controlPanel.add(differencePanel3);
qmap.add(controlPanel);
qmap.add(updateButton3);
//map.add(updateButton);
map.add(image1Panel);
map2.add(image2Panel);
map.add(hideHistButton);
map2.add(hideHistButton2);
map.add(chartPanel);
map2.add(chartPanel2);
map.setZoom(6);
map.setCenter(21.6251, 63.0888);
/*qmap.setZoom(6);
qmap.setCenter(21.6251, 63.0888);
map2.setZoom(6);
map2.setCenter(21.6251, 63.0888);*/
//map.setLocked(true);
map.setControlVisibility(false, true, false, true, false,false,false);
map2.setControlVisibility(false, true, false, true, false,false,false);
qmap.setControlVisibility(false, true, false, true, false,false,false);
//first run only, setup opacities
UpdateSecondImage(true);
print("[DEBUG] Second Image (code, UI 1st) Initial update done");
UpdateFirstImage(true);
print("[DEBUG] First Image (code, UI 2nd) Initial update done");
UpdateLayers(true);
print("[DEBUG] Difference layers updated");
UpdateSecondHistogram();
print("[DEBUG] Second Historgram (code, UI 1st) histogram initial calculation done");
UpdateFirstHistogram();
print("[DEBUG] Frist Histogram (code, UI 2nd) histogram initial calculation done");
ToggleHistogram1();
ToggleHistogram2();
//calculate difference, different ways and results testing
//print(image1DataSet);
//print(image2DataSet);
//var listOfImages = image1DataSet.toList
//var image1 = ee.Image(image1DataSet.first());
//var image2 = ee.Image(image2DataSet.first());
//var image1 = image1DataSet.median();
//var image2 = image2DataSet.median();
//print(image1);
//print(image2);
//var difference = image1.subtract(image2);
//var difference = image1.select("avg_rad").subtract(image2.select("avg_rad"));
//some tests
/*var difference2 =  image1.expression(
    '( ((IM1*IM1) - (IM2*IM2)) / ((IM1*IM1)+(IM2*IM2)) )', {
      'IM1': image1.select("avg_rad"),
      'IM2': image2.select("avg_rad")
});
print( difference);
var difflayer = ui.Map.Layer(difference, differenceVis);
map.add(difflayer);
var difflayer2 = ui.Map.Layer(difference2, differenceVis);
map.add(difflayer2);*/