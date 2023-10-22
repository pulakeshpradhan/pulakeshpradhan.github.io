var chirps_pentad = ui.import && ui.import("chirps_pentad", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    chirps_precipnormals = ui.import && ui.import("chirps_precipnormals", "image", {
      "id": "users/hkvgee/chirps_p_monthlynormals_mozambique_1981_2015"
    }) || ee.Image("users/hkvgee/chirps_p_monthlynormals_mozambique_1981_2015"),
    moz_boundary = ui.import && ui.import("moz_boundary", "table", {
      "id": "users/hkvgee/moz_admbnda_adm0_ine_20190607"
    }) || ee.FeatureCollection("users/hkvgee/moz_admbnda_adm0_ine_20190607"),
    moz_basins = ui.import && ui.import("moz_basins", "table", {
      "id": "users/hkvgee/bacias_hidro_mz_region"
    }) || ee.FeatureCollection("users/hkvgee/bacias_hidro_mz_region"),
    gpm_precip_rate = ui.import && ui.import("gpm_precip_rate", "imageCollection", {
      "id": "NASA/GPM_L3/IMERG_V06"
    }) || ee.ImageCollection("NASA/GPM_L3/IMERG_V06");
// HydroPC. Precipitation Monitoring App
// Authors: Nathalia Silva Cancino & Micha Werner (IHE Delft)
// This script maps monthly precipitation over Mozambique using CHIRPS Precipitation data 
// (https://www.nature.com/articles/sdata201566)
// Data is aggregated to monthly and compared to monthly normal precip calculated for 1980-2015 
// reference period. This data is calculated in a separate script and imported as an asset
// The Percent of Normal Precipitation (PNP) indicator is then calculated for a requested month 
// and for a requested aggregation period (1-12 months)
// (https://public.wmo.int/en/resources/library/handbook-of-drought-indicators-and-indices)
// Data is displayed as gridded data for the whole country and subseqeuntly for river basins 
// step 2: Import features and CHIRPS pentad data
// Centre the map the selected shape with the basins
Map.centerObject(moz_basins, 6);
// set the names of the fields in the moz basins feature collection - this changes if shape file changes
var basinNameField = 'NOME';
var basinIdField   = 'ID';
// extract the list of basins (based on: https://gis.stackexchange.com/questions/302469/google-earth-engine-dropdown-of-items-in-imagecollection)
var basinFeatures = moz_basins.getInfo()['features'];
var selectBasinList = [];
for (var i = 0; i < basinFeatures.length; i++) {
  selectBasinList.push({
    label: basinFeatures[i]['properties'][basinNameField],
    value: basinFeatures[i]['properties'][basinIdField]
  })
}
// read the band names
var bandNames = chirps_precipnormals.bandNames();
print('Original Band names of Normals image: ', bandNames); // ee.List of band names
var monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
// rename the bands in the normals image
var chirpsMonthlyNormals = chirps_precipnormals.select(bandNames,monthNames);
print(chirpsMonthlyNormals);
//Load the CHIRPS pentad data, filtering on the area of Mozambique - and clip to Mozambique
var chirpsPentad = ee.ImageCollection(chirps_pentad)
.filterBounds(moz_basins)
.select('precipitation')
.map(function(image){return image.clip(moz_basins)});
print(chirpsPentad);
//The chirps data contains a date range - retrieve the first and last date in the collection
var firstDate = ee.Date(chirpsPentad.get('date_range').getInfo()[0]);
var lastDate = ee.Date(chirpsPentad.get('date_range').getInfo()[1]);
print(ee.String('Date range in collection: ')
.cat(firstDate.format("YYYY-MM-dd")).cat(' to ').cat(lastDate.format("YYYY-MM-dd")));
// step 3: Set the dates to be displayed
// set the defaults for year and month to display
var historicalYear = 2020;
var historicalMonth = 3;
var numMonths = 3; // number of months to average data (i.e PNP-n), n is number of months)
// if the following code is uncommented the most recent months are shown
var currentYear = ee.Number.parse(lastDate.format("YYYY"),10).getInfo();
var currentMonth = ee.Number.parse(lastDate.format("MM"),10).getInfo();
var currentDate = ee.Date.fromYMD(currentYear, currentMonth, 1);
//create a date at the start of this month (used in GPM data);
var thisYear  = ee.Date(Date.now()).get('year');
var thisMonth = ee.Date(Date.now()).get('month');
var thisMonthDate = ee.Date.fromYMD(thisYear, thisMonth, 1);
// the first date to be extracted for GPM is set to 3 months before current
var firstDateGPM = thisMonthDate.advance(-3,'month');
var gpmDateRange = ee.List(ee.ImageCollection(gpm_precip_rate).get('date_range'));
var lastDateGPM  = ee.Date(gpmDateRange.get(1));
/* processing of GPM data */
// Load the GPM dataset, filter on date and select 'precipitationCal'
var gpmPrecipRate = ee.ImageCollection(gpm_precip_rate)
                  .filterDate(firstDateGPM, lastDateGPM)
                  .select('precipitationCal')
                  .map(function(image){return image.clip(moz_basins)});
//print(gpmPrecipRate);
// create a sequence of days
var numDays = lastDateGPM.difference(firstDateGPM, 'days');
// create list of dates - note that last date is not included as it comes back when calculating daily average
var daysIndex = ee.List.sequence(0, numDays.subtract(1));
print(daysIndex);
var daysList = daysIndex.map(function(n) {
  return firstDateGPM.advance(n,'day');
});
print(daysList);
// calculate daily by looping days in the date range, taking the mean hourly precip rate and multply by 24 to get daily total
// note the 24h value is included both at end of day
var gpmPrecipDaily = ee.ImageCollection.fromImages(
      daysIndex.map(function(dd) {
        var dayStart = firstDateGPM.advance(dd,'day').advance(1,'second');
        var dayEnd   = dayStart.advance(1,'day');
        return gpmPrecipRate.filter(ee.Filter.date(dayStart, dayEnd)).mean().set('Date', dayStart);
}));
var gpmPrecipSum = gpmPrecipDaily.reduce(ee.Reducer.sum()).rename('precip_sum_grid');
var gpmPrecipPal = ['white','blue'];
Map.addLayer(gpmPrecipSum, {min: 0, max: 100, palette: gpmPrecipPal}, 'GPM Precip Sum (Current)', 0);
//print(gpmPrecipDaily);
// determine length of array with GPM data and create list of dates
var len = ee.Number(gpmPrecipDaily.size()).subtract(1);
var dayIndexList = ee.List.sequence(0, len.getInfo());
var gpmPrecipDayImages = gpmPrecipDaily.toList(gpmPrecipDaily.size());
// Add a legend
//set position of legend panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: ee.String('PNP').cat('-').cat(ee.Number(numMonths).format("%d"))
.cat(' ').cat(currentDate.format("MMM-YYYY")).getInfo(),
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'}
});
//Add the title to the panel
legend.add(legendTitle);
//Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
// Create the label that is actually the colored box.
var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
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
// Palette with the colors
var palette =['FA290A','FF7006','FFC70D','67DB07','02F2F5','005EF5','0C05F5'];
// name of the legend
var names = ['-100%','-66%','-33%','0%','33%','66%','100%'];
// Add color and and names
for (var i = 0; i < 7; i++) {
legend.add(makeRow(palette[i], names[i]));
}
Map.add(legend);
// Create a panel to display what is selected
// Create a panel, initially hidden.
var infoLabel = ui.Label({value: 'Information',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
var infoPanel = ui.Panel({
  style: {
    width: '350px',
    shown: false,
    padding: '0'
  },
});
infoPanel.add(infoLabel);
// The layout is vertical flow by default.
//var panel = ui.Panel({style: {width: '300px'}});
var descLabel = ui.Label(ee.String('Percent Normal Precipitation (PNP)\n')
        .cat('Displaying index for ').cat(currentDate.format("MMM-YYYY"))
        .cat('\nPrecipitation accumulated for ').cat(ee.Number(numMonths).format("%d")).cat(' months')
        .cat('\n\n')
        .cat('Calculated using CHIRPS Precipitation data\n')
        .cat('https://www.nature.com/articles/sdata201566\n')
        .cat('Precipitation Normals: 1981-2015')
        .cat('\n\n')
        .cat('Recent precipitation data:\n')
        .cat('Data shown from: ')
        .cat(firstDateGPM.format("YYYY-MM-dd"))
        .cat(' to ')
        .cat(lastDateGPM.format("YYYY-MM-dd")) 
        .cat('\n\n')
        .cat('Global Precipitation Mission (GPM)\n')
        .cat('https://doi.org/10.5067/GPM/IMERG/3B-HH/06\n')
        .getInfo(),
        {whiteSpace: 'pre'}
    );
infoPanel.add(descLabel);    
// Add a panel to host sliders and date selection 
//set position of legend panel
var optionsPanel = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
var optionsLabel = ui.Label({value: 'Options',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
optionsPanel.add(optionsLabel);
// Add a slider and label for selecting number of months 
var sliderLabel = ui.Label('Accumulation (months)');
var monthSlider = ui.Slider(1, 12, 3, 1);
monthSlider.setValue(3);  // Set a default value.
optionsPanel.add(sliderLabel);
optionsPanel.add(monthSlider);
// when slider changes set the number of months
monthSlider.onChange(function(value) {
  numMonths = value;
  print('Number of months selected: ', numMonths);
});
// add a check box to choose if latest date or historical date
var checkLabel   = ui.Label('Display current data');
var currentCheck = ui.Checkbox(ee.String('Current: ').cat(currentDate.format("YYYY-MM")).getInfo(), true);
optionsPanel.add(checkLabel);
optionsPanel.add(currentCheck);
var showCurrent = true;
// when checkbox set the option
currentCheck.onChange(function(value) {
  showCurrent = value;
  print('Show data for current date: ', showCurrent);
});
// create a list of dates to select from if historical data should be shown
var selectYears = ee.List.sequence(currentYear, 1982, -1);
// need to replace the list below in a list derived from the above to help !
var yearNames = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011',
                 '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001',
                 '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991',
                 '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983'];
//var selectYearsList = [];
//for (var yy = 0; yy < selectYears.length().getInfo(); yy++) {
//    selectYearsList.push({
//    label: ee.Number(selectYears.get(yy)).format("%d").getInfo(),
//    value: selectYears.get(yy).getInfo()
//    });
//}
var selectYearsList = yearNames.map(function(yy) {
    return {
    label: yy,
    value: yearNames.indexOf(yy)
    };
});
// create a list of months to select from
var selectMonthsList = monthNames.map(function(mm) {
    return {
    label: mm,
    value: monthNames.indexOf(mm)
    };
});
var dropboxLabel   = ui.Label('Select Year/Month');
var yearDropbox    = ui.Select(selectYearsList, 'Select year', 0); // defaults to first item in list (2020)
var monthDropbox    = ui.Select(selectMonthsList, 'Select month', 2); // defaults to march (end of wet season)
optionsPanel.add(dropboxLabel);
optionsPanel.add(yearDropbox);
optionsPanel.add(monthDropbox);
yearDropbox.onChange(function(value) {
  var selectedYear = value;
  print('Selected Year: ', selectedYear);
});
monthDropbox.onChange(function(value) {
  var selectedMonth = value;
  print('Selected Month: ', selectedMonth);
});
// now add a button to refresh - this invokes the calculation and loading of maps
var refreshButton = ui.Button({
  label: 'Refresh Map'
});
optionsPanel.add(refreshButton);
var returnImage = refreshButton.onClick(function() {
  // retrieve the selections made in the script
  showCurrent = currentCheck.getValue();
  print(yearDropbox.getValue());
  historicalYear = ee.Number.parse(ee.List(yearNames).get(yearDropbox.getValue())).getInfo();
  historicalMonth = monthDropbox.getValue()+1; // incremented by one as months count from 1-12
  numMonths = monthSlider.getValue();
  // run the function to calculate PNP
  var returnImage = calculatePNP(showCurrent, historicalYear, historicalMonth, numMonths);
  return returnImage;
});
// Create a button to unhide the info panel.
var infoButton = ui.Button({
  label: 'Show info panel'
});
optionsPanel.add(infoButton);
// Create a button to unhide/hide the precip avg panel.
var basinPrecipButton = ui.Button({
  label: 'Show basin precip panel'
});
optionsPanel.add(basinPrecipButton);
// toggle visibility of the info panel
infoButton.onClick(function() {
  if (infoPanel.style().get('shown'))
  {
    infoPanel.style().set('shown', false);
    infoButton.setLabel('Show info panel');
  }
  else
  {
    infoPanel.style().set('shown', true);
    infoButton.setLabel('Hide info panel');
  }
});
// toggle visibility of the basin precip panel
basinPrecipButton.onClick(function() {
  print(basinPrecipPanel.style().get('shown'));
  if (basinPrecipPanel.style().get('shown'))
  {
    basinPrecipPanel.style().set('shown', false);
    basinPrecipButton.setLabel('Show basin precip panel');
  }
  else
  {
    basinPrecipPanel.style().set('shown', true);
    basinPrecipButton.setLabel('Hide basin precip panel');
  }
});
// define the function in which all calculations are made and the map is loaded
var calculatePNP = function(showCurrent, historicalYear, historicalMonth, numMonths){
  print('Calculating PNP');
  print('Selected to show current data ', showCurrent);
  print('Selected year  ', historicalYear);
  print('Selected month ', historicalMonth);
  print('Selected number months ', numMonths);    
  // clear loaded layers (note these are removed by name!)
  print(Map.layers());
  removeLayer('Basins');
  removeLayer('Percent Normal Precipation (gridded)');
  removeLayer('Percent Normal Precipation (basin)');
  var historicalDate = ee.Date.fromYMD(historicalYear, historicalMonth, 1);
  // select the date to display
  var displayDate  = ee.Date(ee.Algorithms.If(showCurrent, currentDate, historicalDate));
  print(currentDate, historicalDate,displayDate);
  // check a future date is not selected otherwise return currentDate
  displayDate  = ee.Date(ee.Algorithms.If(displayDate > currentDate , currentDate, displayDate));
  print(ee.String('Displaying precipitation indicator for: ').cat(displayDate.format("YYYY-MM")));
  var displayYear=ee.Number.parse(displayDate.format("YYYY")).getInfo();
  var displayMonth=ee.Number.parse(displayDate.format("MM")).getInfo();
  // step 4: Calculate the precipitation sum for the n-month period
  // set the first and last date of the images to select from the pentad data
  var lastDate = displayDate.advance(1,'month').advance(-1,'day');
  var firstDate = displayDate.advance(-(numMonths-1),'month');
  // filter the collection and print
  var chirpsSelect = chirpsPentad.filterDate(firstDate, lastDate);
  print('Selected images from CHIRPS Pentad dataset',chirpsSelect);
  // calculate the precip for selected images
  var precipSum = chirpsSelect.reduce(ee.Reducer.sum()).rename('precip_sum_grid');
  // create a pallete and add to the map
  var precipPal = ['white','blue']; // store palette as variable
  //Map.addLayer(precipSum, {min: 0, max: 1000, palette: precipPal}, 'Precip Sum (Current)',0);
  // step 5: Calculate the precipitation normals for the n-month period and
  // calculate the Percent Normal Precipitation
  // estabish the months over which data was averaged
  print(displayMonth, numMonths);
  var months = ee.List.sequence(displayMonth-numMonths,displayMonth-1);
  // get the month pertaining to the selected indexes
  var monthIds = ee.List.sequence(1,12);
  var getMonth = function(number) {
  return ee.List(monthNames).getString(number);
  };
  var monthList = months.map(getMonth);
  print('Months incldued', monthList);
  // now select the months from the normals (each month is a band)
  var precipNormalImages = chirpsMonthlyNormals.select(monthList);
  print(precipNormalImages);
  var normalSum = precipNormalImages.reduce('sum').rename('precip_normal_grid');
  //Map.addLayer(normalSum, {min: 0, max: 1000, palette: precipPal}, 'Precip Sum (Normal)',0);
  // now calculate the PNP (multiply by 100 as a pecentage)
  var pnpPrecip = (precipSum.subtract(normalSum)).divide(normalSum).multiply(100).rename('pnp_grid');
  // create a pallette from -100% to 100%
  //Add a palette and clip the image by area
  var pnpPal = {min:-100, max:100,
  palette:['FA290A','FF7006','FFC70D','67DB07','02F2F5','005EF5','0C05F5']};
  // add to map with designated pallete
  Map.addLayer(pnpPrecip, pnpPal, 'Percent Normal Precipation (gridded)',1);
  // step 6: Calculate the Percent Normal Precipitation over the basin plygons
  // create a feature collection with the precip normals per basin
  var normalSumBasinFc = normalSum.reduceRegions({
  collection: moz_basins,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  });
  //convert to an image
  var normalSumBasin = normalSumBasinFc
  .reduceToImage({
  properties: ['mean'],
  reducer: ee.Reducer.first()
  }).rename('precip_normal_basin');
  //Map.addLayer(normalSumBasin, {min: 0, max: 1000, palette: precipPal},'Precip Sum Basin (normal)',0);
  // create a feature collection with the current precip per basin
  var precipSumBasinFc = precipSum.reduceRegions({
  collection: moz_basins,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  });
  //convert to an image
  var precipSumBasin = precipSumBasinFc
  .reduceToImage({
  properties: ['mean'],
  reducer: ee.Reducer.first()
  }).rename('precip_sum_basin');
  // Map.addLayer(precipSumBasin, {min: 0, max: 1000, palette: precipPal},'Precip Sum Basin (Normal)',0);
  // now calculate the PNP per basin (multiply by 100 as a pecentage)
  var pnpPrecipBasin =
  (precipSumBasin.subtract(normalSumBasin)).divide(normalSumBasin).multiply(100).rename('pnp_basin');
  // add to map with same pallete as used for the gridded data and overlay with basin outline
  Map.addLayer(pnpPrecipBasin, pnpPal, 'Percent Normal Precipation (basin)',1);
  // add the basin outlines
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint the basin outlines as a black line
  var basinOutline = empty.paint({
    featureCollection: moz_basins,
    color: 1,
    width: 1
  });
  Map.addLayer(basinOutline, {palette: '000000'}, 'Basins',1);  
  print(ee.String('PNP').cat('-').cat(ee.Number(numMonths).format("%d")).cat(' ').cat(displayDate.format("MMM-YYYY")).getInfo());
  // update the legends
  legendTitle.setValue(ee.String('PNP').cat('-').cat(ee.Number(numMonths).format("%d")).cat(' ').cat(displayDate.format("MMM-YYYY")).getInfo());
  descLabel.setValue(ee.String('Percent Normal Precipitation (PNP)\n')
        .cat('Displaying index for ').cat(displayDate.format("MMM-YYYY"))
        .cat('\nPrecipitation accumulated for ').cat(ee.Number(numMonths).format("%d")).cat(' months')
        .cat('\n\n')
        .cat('Calculated using CHIRPS Precipitation data\n')
        .cat('https://www.nature.com/articles/sdata201566\n')
        .cat('Precipitation Normals: 1981-2015')
        .cat('\n\n')
        .cat('Recent precipitation data:\n')
        .cat('Data shown from: ')
        .cat(firstDateGPM.format("YYYY-MM-dd"))
        .cat(' to ')
        .cat(lastDateGPM.format("YYYY-MM-dd")) 
        .cat('\n\n')
        .cat('Global Precipitation Mission (GPM)\n')
        .cat('https://doi.org/10.5067/GPM/IMERG/3B-HH/06\n')
        .getInfo()
  );
  var a=ee.String('Displaying precipitation indicator for: ').cat(displayDate.format("YYYY-MM"));
  print(a);
  // combine images to return as multiband image
  var returnImage = ee.Image([precipSum, precipSumBasin, normalSum, normalSumBasin, pnpPrecip, pnpPrecipBasin]);
  return returnImage;
};
// function to remove layers (used to remove before reloading)
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  } else {
    print('Layer '+name+' not found');
  }
};
// function to hide/show named layer
var visibleLayer = function(name, visible) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    layers.get(index).setShown(visible);
  } else {
    print('Layer '+name+' not found');
  }
};
// Main routine (always executes)
// run the function to load maps with current date (default behaviour)
var returnImage = calculatePNP(true, currentYear, currentMonth, numMonths);
print(returnImage);
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click on a Basin on the map')]);
Map.add(inspector);
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0,
  ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  //var pnpBasin = returnImage.select('pnp_basin').reduceRegion({
  var pointValues = returnImage.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: click_point,
  scale: 30,
  maxPixels: 1e9
  }); 
  var pnpBasin = pointValues.get('pnp_basin');
  var pnpPoint = pointValues.get('pnp_grid');
  var precipPoint = pointValues.get('precip_sum_grid');
  var precipBasin = pointValues.get('precip_sum_basin');
  var normalPoint = pointValues.get('precip_normal_grid');
  var normalBasin = pointValues.get('precip_normal_basin');
  inspector.widgets().set(0,
  ui.Label({
    value: 'Basin: PNP: ' + String(Math.round(pnpBasin.getInfo())) + ' %  ' 
          + '[precip: '   + String(Math.round(precipBasin.getInfo())) + ' mm, '
          +  'normal: '   + String(Math.round(normalBasin.getInfo())) + ' mm]' 
  }));
});
// Add a panel to allow layers to be selected 
var layersPanel = ui.Panel({
style: {
position: 'middle-left',
padding: '8px 15px'
}
});
var layerLabel = ui.Label({value: 'Layer Selection',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
var gridLayerCheck = ui.Checkbox('Display gridded index', true);
var basinLayerCheck = ui.Checkbox('Display basin averaged index', true);
Map.add(layersPanel);
layersPanel.add(layerLabel);
layersPanel.add(basinLayerCheck);
layersPanel.add(gridLayerCheck);
basinLayerCheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Percent Normal Precipation (basin)';
  visibleLayer(layerName, checked);
});
gridLayerCheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Percent Normal Precipation (gridded)';
  visibleLayer(layerName, checked);
});
// Add a panel to plot and export precip
var basinPrecipPanel = ui.Panel({
  style: {
    width: '400px',
    padding: '0',
    shown: false
  },
});
var basinPrecipLabel = ui.Label({value: 'Basin precipitation (GPM data)',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
basinPrecipPanel.add(basinPrecipLabel);
// add a drop down to select a basin fromn feature list
//var basinExportDropBox = ui.Select(selectBasinList,'Select basin to plot');
var basinSelect = ui.Select({
  items: selectBasinList,
  onChange: function(value) {
    print(value);
  }
});
basinPrecipPanel.add(basinSelect);
// Create a panel to hold the chart.
var precipChartPanel = ui.Panel();
precipChartPanel.style().set({
  width: '400px',
  position: 'bottom-right'
});
basinPrecipPanel.add(precipChartPanel);
basinSelect.onChange(function(value) {
  var selectedBasinId = value;
  // Select the basin 
  var selectedBasin = moz_basins
      .filter(ee.Filter.eq('ID', selectedBasinId))
      .first();
  var selectedBasinName = selectedBasin.get(basinNameField);
  print(selectedBasinName);
  // calculate list of basin avg precips for selected basin
  var basinAvgPrecip = function(dd){
    var precip = ee.Image(gpmPrecipDayImages.get(dd)).reduceRegion({
      geometry: selectedBasin.geometry(),
      reducer: ee.Reducer.mean(),
      scale: 1000,
    });
    return precip.values().get(0);
  };
  var basinAvgPrecipList = dayIndexList.map(basinAvgPrecip);
  // determine dates for the list of basin avg precips
  var basinAvgDate = function(dd){
    var gpmPrecipDayImg = ee.Image(gpmPrecipDayImages.get(dd)); 
    return ee.Date(gpmPrecipDayImg.get('Date')).format('YYYY-MM-dd', 'GMT');
  };  
  var basinAvgDateList = dayIndexList.map(basinAvgDate);  
  print(basinAvgDateList);
  // now create a dictionary of the list
  print('Crearing dict list');
  var basinAvgDictFn = function(dd){
    var basinAvgDayDict = ee.Dictionary({Date: ee.String(basinAvgDateList[dd]), Precip: basinAvgPrecip[dd]});
    return(basinAvgDayDict);
  };
  var chartTitle = ee.String('Basin Average Precip (GPM Data): ').cat(selectedBasinName);
  print(chartTitle);
  var precipChart = ui.Chart.array.values(basinAvgPrecipList, 0, basinAvgDateList);
  precipChart.setSeriesNames(['Precip']);
  precipChart.setOptions({
    title: chartTitle.getInfo(),
    maxWidth: '300px',
    vAxis: {title:'Precip (mm)'},
    hAxis: {title: 'Date'},
    legend: 'Precip'
  });
  //chart.setChartType('ScatterChart');
  precipChart.setChartType('ColumnChart');
  precipChartPanel.clear();
  precipChartPanel.add(precipChart);
  //print(chart);  
});
// add the options panel
Map.add(optionsPanel);
// Add the side panels to the ui.root.
ui.root.insert(0, infoPanel);
ui.root.add(basinPrecipPanel);