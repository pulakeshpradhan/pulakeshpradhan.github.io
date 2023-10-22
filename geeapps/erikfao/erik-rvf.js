/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var appUI = {},
    modis = ee.ImageCollection("MODIS/006/MYD13Q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//===========================================================================================
// November 2016 - Erik van Ingen (CIO) - Claudia Pittiglio (AGAH)
//  This script uses Modis in order to calculate the accumulated average anomolies on the NDVI. 
//  The anomolies are part of an indicator for the Rift Valley Fever. The other part of the 
//  indicator comes from the calculated dryspells, which is another script. 
// September 2017 - Claudia Pittiglio (AGAH) updated the script by replacing Modis v005 with
//  Modis v006
//  Threshold for East Africa is 0.1
//===========================================================================================
// long term avg of the timeseries
// Images start from 2002_07_04, therefore the next month is chosen as a startdate, 
// to be sure that there is data for the full month. 
var longTermAvgStartDate =  new Date('2002-08-01');
var longTermAvgEndDate =  new Date('2019-12-31');
// subsequently you would need to pick the right month in .get(8) below in the runApp script. 
var aoi = ee.Feature(ee.Geometry.Polygon(
            [[[28.5,-12.5],
              [42.5,-12.5],
              [42.5,5.5],
              [28.5,5.5]]]));
//===========================================================================================
// Part 1: calculate the max per month
//===========================================================================================
var calculateMaxPerMonth = function(startDate, endDate){
  startDate =  ee.Date(startDate);
  endDate =  ee.Date(endDate);
  var ndvi = modis.filterDate(startDate,endDate).select('NDVI');
    // The filter over calendarRange is great but needs to be provided with the month numbers
    // In order to get this working, it is needed to interate over the years, then map over the months. 
    var iterFunction = function(currentYear, newList) {
    var yearImages = ndvi.filter(ee.Filter.calendarRange(currentYear, currentYear, 'year'));
    currentYear = ee.Number(currentYear);
    var startYear = ee.Number(startDate.get('year'));
    var endYear = ee.Number(endDate.get('year'));
    // select the right month, even when it is not the first month
    var startMonth = ee.Algorithms.If(startYear.eq(currentYear),startDate.get('month'),1);
    // select the right month, even when it is not the last month
    var endMonth = ee.Algorithms.If(endYear.eq(currentYear),endDate.get('month'),12);
    var monthSequence = ee.List.sequence(startMonth,endMonth);
    // aggregate over the decadals per month 
    var mcv = ee.ImageCollection.fromImages(
       monthSequence.map(function (m) {
          // prepare properly the new dates
          var startDateLocal = ee.Date.fromYMD(currentYear, m, 1);
          // TODO define and set end date
          return yearImages.filter(ee.Filter.calendarRange(m, m, 'month'))
                      .select('NDVI').max()
                      .set('system:time_start',startDateLocal)
                      .set('month',m);
    }));
    // This is to pass on the list of months of 1 year into the new list that we are making (newList). 
    // The new list is actually the list of all the MCVs of the whole image collection. 
    var iterMonth = function(element, newList){
    return ee.List(newList).add(element) ;
    };
  // add the months into the list with an iterator
  return mcv.iterate(iterMonth,newList );
  };
  // Make a empty list which will be filled with the new elements
  var newList = ee.List([]);
  var years = ee.List.sequence(startDate.get('year'), endDate.get('year'));
  print('years', years);
  // Iterate for the years. Pass on the iterFunction which will aggregate over the decadals. 
  var months =  ee.ImageCollection(ee.List(years.iterate(iterFunction, newList)));
  return months;
};
// var original = ee.Image(ndvi.filterDate('2008-01-08', '2008-01-10').first());
// var second = ee.Image(ndvi.filterDate('2008-01-24', '2008-01-28').first());
// var max = ee.Image(months.filterDate('2008-01-01', '2008-01-31').first());
// print('original' , original);
// print('max' , max);
// print('second' , second);
// Map.addLayer(original);
// Map.addLayer(second);
// Map.addLayer(max);
//===========================================================================================
// Part 2: get the means of 1 month over the whole timeseries. 
//===========================================================================================
var meansPerMonth = function(months){
  print('months', months);
  months = ee.ImageCollection(months);
  var monthSequence =  ee.List.sequence(1,12);
  var monthsAvgs = ee.ImageCollection.fromImages(
    monthSequence.map(function (m) {
        return months.filter(ee.Filter.eq('month', m))
                    .select('NDVI').mean()
                    .set('month', m);
    }));
  return monthsAvgs;
};
// print('monthsAvgs size' , monthsAvgs.size()) ; 
// print('monthsAvgs' , monthsAvgs) ; 
// print('months' , months) ; 
// Map.addLayer(ee.Image(months.first()));
// Map.addLayer(ee.Image(monthsAvgs.first()));
//===========================================================================================
// Part 3: Substract the max with the avg
//===========================================================================================
var substractMaxWithAvg = function(months, monthsAvgs){
  var iterFunctionSubtract = function(currentMonth, newListSubtract) {
    var localMonth = ee.Image(currentMonth).get('month');
    var avgMonth = monthsAvgs.filter(ee.Filter.eq('month', localMonth)).first();
    return  ee.List(newListSubtract).add(currentMonth.subtract(avgMonth));
  };
  var newListSubtract = ee.List([]);
  //Iterate for the years. Pass on the iterFunction which will aggregate over the decadals. 
  var anomolies =  ee.ImageCollection(ee.List(months.iterate(iterFunctionSubtract, newListSubtract)));
  return anomolies; 
};
// print('anomolies months size' , anomolies.size()) ; 
// print('anomolies months' , anomolies) ; 
// Map.addLayer(ee.Image(months.first()));
// Map.addLayer(ee.Image(monthsAvgs.first()));
// Map.addLayer(ee.Image(anomolies.first()));
//===========================================================================================
// Part 4: Apply threshold noise
// TODO: while doing the gt with multiply, the type changes and the result remains visually a boolean like 
// which is in effect a double. Maybe this can help: Image.double() Casts the input value to a 64-bit float. or Image.int16()
// Threshold is 0.025 which is 250 in GEE Modis NDVI. 
//===========================================================================================
// print('newListTresh' , newListTresh) ; 
// print('newListTresh months size' , newListTresh.size()) ; 
// Map.addLayer(ee.Image(newListTresh.first()));
var applyThresholdNoise = function(anomolies) {
  return applyThreshold(anomolies, 250);
};
var applyThreshold = function(collection, threshold) {
  var treshFunction = function(currentMonth, newListTresh) {
    currentMonth = currentMonth.gt(threshold).multiply(currentMonth);
    return ee.List(newListTresh).add(currentMonth);
  };
  var newListTresh = ee.List([]);
//Iterate over the collection
  newListTresh =  ee.ImageCollection(ee.List(collection.iterate(treshFunction, newListTresh)));
  return newListTresh; 
};
//===========================================================================================
// Part 5: Do something with the consecutive 3 months
//===========================================================================================
var calcConsecutives = function(anomolies) {
  var consecutiveFunction = function(currentMonth, l) {
    // make sure this function understands that this is a list by doing a cast
    l = ee.List(l);
    currentMonth = currentMonth.select('NDVI');
    // Take the current in case of the first element where there is not yet a previous
    //This step needs to be modified in order to take 3 real consecutive months
    var  previous1 = ee.Image(ee.Algorithms.If(l.length().gt(0), l.get(-1), currentMonth)).select(['NDVI'],['avg']);
    var  previous2 = ee.Image(ee.Algorithms.If(l.length().gt(1), l.get(-2), currentMonth)).select(['NDVI'],['avg']);
    var avg  =  currentMonth.select(['NDVI'],['avg']);
    avg = avg.add(previous1).add(previous2).divide(3);
    currentMonth = avg.addBands(currentMonth ,null, false);
    return l.add(currentMonth);
  };
  var threeMonthsDiffs = ee.List([]);
  // Final product is threeMonthsDiffs
  threeMonthsDiffs =  ee.ImageCollection(ee.List(anomolies.iterate(consecutiveFunction, threeMonthsDiffs)));
  return threeMonthsDiffs;
};
// var firstImage = ee.Image(anomolies.toList(99999).get(10));
// var secondImage = ee.Image(anomolies.toList(99999).get(11));
// var thirdImage = ee.Image(anomolies.toList(99999).get(12));
//var consec = ee.Image(newListConsecutiveList.toList(99999).get(12)).select('avg');
//print(newListConsecutiveList);
// Map.addLayer(firstImage);
// Map.addLayer(secondImage);
// Map.addLayer(thirdImage);
//Map.addLayer(consec,{min: 0, max: 6000, palette: ['00FF00', '000000', 'FF0000']}, 'Anomolies consecutive');
//Map.addLayer(consec,{min: 0, max: 2000, palette: ['00FF00', '000000','FF0000']}, 'Anomolies consecutive');
//===========================================================================================
// Part 6: Apply musquito treshold (>0.08 which means 800 in terms of the actual NDVI GEE values)
// 
//===========================================================================================
var applyThresholdMusquito = function(collection) {
  collection = applyThreshold(collection, 1000).select('avg');
  return collection;
};
//===========================================================================================
// Part 7: Export threeMonthsDiffs
// TODO: Check with Claudia, this has already been done in step 5, correct? And therefore 
// can be deleted. 
//===========================================================================================
// var startDate  = ee.Date('2003-09-01');
// var endDate  = ee.Date('2003-10-30');
// var threeMonthsDiffsDated = threeMonthsDiffsDated.filterDate(startDate,endDate).first();
// Map.addLayer(threeMonthsDiffsDated,{min: 0, max: 2000, palette: ['00FF00', '000000','FF0000']}, 'Anomolies consecutive');
//===========================================================================================
// UI Defs
//===========================================================================================
/** Creates the application interface. */
appUI.boot = function() {
  appUI.createPanels();
  var main = ui.Panel({
    widgets: [
//      appUI.intro.panel,
      appUI.filters.panel,
//      appUI.applyAnomolies.panel,
//      appUI.export.panel
    ],
    style: {width: '25%', padding: '8px'}
  });
  Map.setOptions("HYBRID");
  ui.root.insert(0, main);
};
appUI.applyAnomolies = {
  buttonModel: ui.Button({
    label: 'Run Model & Show', 
    // React to the button's click event.
    onClick: function() {
      runApp();
    }
  })
};
appUI.export = {
  buttonModel: ui.Button({
    label: 'Export to Drive', 
    // React to the button's click event.
    onClick: function() {
      exportFuntion(); 
    }
  })
};
  /* The panel for the export section with corresponding widgets. */
appUI.applyAnomolies.panel = ui.Panel({
  widgets: [appUI.applyAnomolies.buttonModel]
});
appUI.export.panel = ui.Panel({
  widgets: [appUI.export.buttonModel]
});
appUI.createPanels = function() {
  /* The introduction section. */
  // appUI.intro = {
  //   panel: ui.Panel([
  //     ui.Label({
  //       value: 'Rift Valley Fever',
  //       style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
  //     }),
  //     ui.Label('Accumulated Average Anomolies')
  //   ])
  // };
  /* The collection filter controls. */
  var numberYears = longTermAvgEndDate.getFullYear() - longTermAvgStartDate.getFullYear();
  var uiYears = new Array(numberYears);
  for(var i=0;i<=numberYears;i++  ){
    uiYears[i] = longTermAvgStartDate.getFullYear() + i;
    uiYears[i]  =  uiYears[i].toString();
  }
  appUI.filters = {
    yearSelector: ui.Select({
      // these hard coded values always need to be consistent with the above start and end dates. 
      items: uiYears,
      placeholder: 'Choose a Year...'
    }),
    monthSelector: ui.Select({
      items: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      placeholder: 'Choose a Month...'
    })
  };
  appUI.applyAnomolies = {
    buttonModel: ui.Button({
      label: 'Run Model & Show', 
      // React to the button's click event.
      onClick: function() {
        runModel();
      }
    })
  };
  appUI.applyExport = {
    buttonExport: ui.Button({
      label: 'Export to the drive', 
      // React to the button's click event.
      onClick: function() {
        exportFuntion();
      }
    })
  };
  // function runModel() {
  //   var months = (appUI.filters.yearSelector.getValue() - longTermAvgStartDate.getFullYear()) * 12;
  //   // The series does not start always in January, therefore needs correction with the start month.
  //   // Then the collection starts with 0, therefore the minus 1
  //   months  = months + parseInt(appUI.filters.monthSelector.getValue()) -1 - longTermAvgStartDate.getMonth();
  //   print('uiMonths', months);
  //   return runApp(months);
  // }
  /* The panel for the filter control widgets. */
  appUI.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Rift Valley Fever hotspots for vector amplification', {fontWeight: 'bold'}),
      appUI.filters.yearSelector,
      appUI.filters.monthSelector,
      appUI.applyAnomolies.buttonModel,
      appUI.applyExport.buttonExport
    ],
    style: appUI.SECTION_STYLE
  });
};
function runModel() {
  var months = (appUI.filters.yearSelector.getValue() - longTermAvgStartDate.getFullYear()) * 12;
  // The series does not start always in January, therefore needs correction with the start month.
  // Then the collection starts with 0, therefore the minus 1
  months  = months + parseInt(appUI.filters.monthSelector.getValue()) -1 - longTermAvgStartDate.getMonth();
  print('uiMonths', months);
  return runApp(months);
}
appUI.getDate = function(object){
  var date = object.getValue();
  if (date) date = ee.Date(date);
  return date;
};
//===========================================================================================
// main model
//===========================================================================================
var mainModel = function(startDate, endDate){
  //1
  var months = calculateMaxPerMonth(startDate, endDate);
  //2
  var means = meansPerMonth(months);
  //3
  var anomolies = substractMaxWithAvg(months, means);
  //4
  var thresholded = applyThresholdNoise(anomolies);
  //5
  var consecutives = calcConsecutives(thresholded);
  //6
  var thresholdedConsecutives = applyThresholdMusquito(consecutives);
  return thresholdedConsecutives;
};
//===========================================================================================
//exportFuntion
//===========================================================================================
var exportFuntion = function(){
  var diffImage = runModel();
  //var diffImage = ee.Image(consecutives.toList(99999).get(8));
  // var aoiVizParams = { opacity: 0.0  };  
  // var imageVizParams = {  min: 0,  max: 6000,  gamma: [6000] };
  //var avg = diffImage.select('avg');
  //Export the image to an Earth Engine asset.
  var fileName = 'RVFrisk_' +  appUI.filters.yearSelector.getValue() + '_' +  appUI.filters.monthSelector.getValue();
  // Export the image, specifying scale and region.
  Export.image.toDrive({
    image: diffImage,
    description: fileName,
    scale: 1000,
    region: aoi
  });
};
//===========================================================================================
// runModel
//===========================================================================================
var runApp = function(index){
  var consecutives = mainModel(longTermAvgStartDate, longTermAvgEndDate);
  // 9 years times 12 months plus 9 months (8)
  var diffImage = ee.Image(consecutives.toList(9999).get(index));
  diffImage  = diffImage.updateMask(diffImage.gt(0));
  var aoiVizParams = {palette: 'FFFFFF', opacity: -1.0  };  
//  var imageVizParams = {  min: 1000,  max: 2500, gamma: 2500 };
//  var imageVizParams = {  min: 1000,  max: 2500,  palette: ['000000', 'FF0000'] };
  var imageVizParams = {  min: 1000,  max: 2500,  palette: ['FF0000','FF0000'] };
//  var imageVizParams = {  min: 1000,  max: 2500};
  print('diffImage', diffImage);
  Map.clear();
Map.addLayer(aoi,aoiVizParams,  'area of interest');
  Map.centerObject(aoi, 5);
  Map.addLayer(diffImage.clip(aoi), imageVizParams, 'anomalies');
  return diffImage;
};
//===========================================================================================
// main program
//===========================================================================================
appUI.boot();