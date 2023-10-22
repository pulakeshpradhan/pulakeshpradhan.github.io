var exportROI_globe = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-145.546875, 77.23507365492469],
          [-107.2265625, 82.40242347938855],
          [-47.109375, 84.05256097843036],
          [-7.3828125, 82.1664460084773],
          [35.5078125, 82.40242347938855],
          [94.921875, 81.87364125482827],
          [139.21875, 77.46602847687329],
          [176.1328125, 74.4021625984244],
          [-170.5078125, 68.39918004344187],
          [-169.1015625, 65.5129625532949],
          [-171.2109375, 64.16810689799152],
          [166.2890625, 48.922499263758255],
          [158.90625, 9.795677582829745],
          [-176.1328125, -36.3151251474805],
          [-178.2421875, -52.908902047770255],
          [150.46875, -55.57834467218205],
          [120.234375, -47.75409797968002],
          [69.9609375, -38.54816542304656],
          [22.8515625, -40.979898069620134],
          [-49.5703125, -57.89149735271031],
          [-82.6171875, -60.759159502269895],
          [-131.8359375, -6.315298538330034],
          [-163.828125, 43.834526782236814],
          [-169.453125, 55.3791104480105],
          [-168.046875, 75.23066741281573]]]),
    exportROI = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[54.217529296875, 47.39834920035926],
          [55.008544921875, 32.91648534731439],
          [80.321044921875, 32.24997445586331],
          [80.145263671875, 48.2246726495652]]]);
// Important!! Read ME!
// This code is the property of Oregon State University Mountain Hydroclimatology Research Group
// Please contact Dr. Anne Nolin for any inquiries: nolina@oregonstate.edu
//
// Operational Instruction:
// Select Run to show input and default options.
// Input Options: (Note after selecting input options
//                 Hit Apply Button to display resulting SCF)
//  Water Year: 2015 (default)
//
//  Center Lat/Lon: 39.88 / -106.5 (default)
//      Center image to Latitude & Longitude and generate SCF for that point.
//  ROI: All (USA default)
//      Select Region of interest in US or elsewhere. 
//      For example you can select one or more states: Oregon + Washington + California
//      To select ROI(s) from a different fusion table use the following format:
//        ROI_Name [+ other ROI_Name] : fusion_table_id
//        ROI_Name must be a name under a fusion table column title with "Name" as a substring.
//        fusion_table_id is the encrypted id used to query a fusion table.
//          Only require when using a new fusion table. As long as ROI remains in the
//          present fusion table, specifying the fusion_table_id is not needed.
//          See the following sites to determine fusion table id:
//          https://developers.google.com/chart/interactive/docs/fusiontables
//          Example Fusion Table Id's:
//            US States      : 1OoBTpAqkASRRnJ_tsUOiswz06-0r2Nc9ncxQM68
//            US Counties    : 1xdysxZ94uUFIit9eXmnw1fYc6VcQiXhceFd_CVKa
//            World Countries: 1AbZIv2wwK1CTfWkO_qx0Dnm9-Uve9_0oRKrj7dM
//  Elev Range (low/high) : All (default)
//      Specify Elevation Ranges in meters. For example if one elevation is specified,
//      then SCF is displayed for elevations greater than or equal to.
//      If both low / high elevations are specified, then SCF displayed elevations
//      between low and high.
//
//  SDD Min Snow Days: Use this slider to select minimum number of snow days for determining SDD.
//                     Default is 3 days.
//
//  WY SCF & SDD Results:
//      SCF w/Cloud - Shows percent water year snow cover frequency for options selected using the following
//                    cloud info to extrapolate whether the ground cover snow is present or not.
//                    1. If cloud days are between two snow days, then the cloud days are
//                       interpreted as snow days.
//                    2. If cloud days are between two no snow days, then the cloud days are
//                       interpreted as no snow days.
//                    3. If cloud days are between a prior snow day and a post no snow day,
//                       then the cloud days are interpreted as no snow days.
//                    4. If cloud days are between a prior no snow day and a post snow day,
//                       then the cloud days are interpreted as snow days.
//      SDD         - Snow Disapperance Date base on Water Year Day. This algorithm search backward
//                    in the water year for the longest period without snow after a minimum of 3 days
//                    of snow cover (accounting for cloudy days).
//
//      SCF QA - This represents the fraction of MOD10A1 "good quality" snow cover over the SCF
//               analysis time period. Values are between 0 and 1, with -1 reserved for ocean.
//
//  Apply Inputs - Select this button to display SCF result of input options.
//
//  Plot SCF & SDD vs Water Year - Plot the SCF & SDD for the input options over all MODIS 
//                     operational years.
//                     Note this may take time to generate and display. So be patient.
//                     To get a larger view of the plot in a separate window and download SCF
//                     data, hit the icon on the upper right corner of the plot image.
//
//  Export Image - Used to export geotif image with area defined by "exportROI" to Google Drive.
//                 Select 1 to 5 layers to export with band order dependent on list from left
//                 to right: SCFcloud, SCFnocloud, SDD, SCFQA, DEM (default)
//                 For example if DEM, SCFncloud, SDD layers are selected (in that order) then exported image has
//                 DEM (Band1), SCFncloud (Band2), and SDD (Band3).
//                 If SCFcloud, SDD, DEM layers are selected (in that order) then exported image has
//                 SCFcloud (Band1), SDD (Band2), and DEM (Band 3).
//                 Note: Delete previously defined "exportROI" polygon before drawing a new "exportROI"
//                 polygon. 
//                 Can select projection with default projection EPSG:3857, which is used in many popular 
//                 web mapping applications (Google/Bing/OpenStreetMap/etc). AKA EPSG:900913. 
//
//  SCF Transects can also be generated and ploted by drawing a line in the display window,
//    rename the line from "geometry" to "transect" and then hit the "Run" or "Apply" button. 
//    Delete the present transect before selecting a different transect.
//    The plot will be shown on the Console Panel. 
//    To get a larger view of the plot in a separate window and download SCF transect data,
//    hit the icon on the upper right corner of the plot image. 
//
//
var DEM = ee.Image("USGS/SRTMGL1_003");
//var StatesFT = ee.FeatureCollection("ft:17aT9Ud-YnGiXdXEJUyycH2ocUqreOeKGbzCkUw");
var StatesFT = ee.FeatureCollection("ft:1OoBTpAqkASRRnJ_tsUOiswz06-0r2Nc9ncxQM68");
var snotel = ee.FeatureCollection('ft:1Bb-QDHARJ2UDi-Eghj92kJpUy43vaqT9fAcle8LW');
var skiResorts = ee.FeatureCollection('ft:1q_x12r4gjHhPpnGB2krnlsKIEks6Yr7TzpCzY875');
////////////////////////  COLOR PALETTES  ////////////////////////////////
// Create a color palette for the snow layer.
// This palette was found at the Color Brewer website.
var palette_snow = "081d58,253494,225ea8,1d91c0,41b6c4,7fcdbb,c7e9b4,edf8b1,ffffd9,ffffff";
var palette_sdd = 'a52a2a,ffa500,081d58,253494,225ea8,1d91c0,41b6c4,7fcdbb,c7e9b4,edf8b1,ffffd9,ffffff';
var makeRow = function(label1, color, label2) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 0 0'
        }
      });
      // Create the label filled with the description text.
      var description1 = ui.Label({
        value: label1,
        style: {width: '28px', margin: '0 0 0 6px'}
      });
      // Create the label filled with the description text.
      var description2 = ui.Label({
        value: label2,
        style: {margin: '0 0 0 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [description1, colorBox, description2],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var legendColors =['ffffff','ffffd9','edf8b1','c7e9b4','7fcdbb','41b6c4','1d91c0','225ea8','253494','081d58','ffa500','a52a2a'];
// name of the legend
var SCFlabels = ['0.9','0.8','0.7','0.6','0.5','0.4','0.3','0.2','0.1','0.0','',''];
var Months = ['Sep','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan','Dec','Nov','Oct',];
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '4px 4px'
  }
});
var legendTitle = ui.Label({
  value: 'SDD | ccSCF',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
// Add color and and names
for (var i = 0; i < 12; i++) {
  legend.add(makeRow(Months[i], legendColors[i], SCFlabels[i]));
}  
// Range of year
var yrStart = 2000;
var yrEnd = new Date().getFullYear();
// Starting date for water year
var wyStartDay = '-10-01';
var wyrStart = 2000;
var wyrEnd = new Date().getFullYear();
var wyrUpdated = 1;
var centerUpdated = 1;
var stateUpdated = 1;
var elevUpdated = 1;
var minSnowDaysUpdated = 0;
var mapChart = 0;
var minSnowDays = 3;
// The namespace for scf.  All the state is kept in here.
var scf = {};
var scfImages = {};
var scfImages_nocloud = {};
var sddImages = {};
var sddCorrection = {};
var scfqaImages = {};
scf.applyFilters = function(){
    var startDate = scf.filters.startDate.getValue();
    var endDate = scf.filters.endDate.getValue();
    var lat = ee.Number.parse(scf.filters.mapCenterLat.getValue()).getInfo();
    var lon = ee.Number.parse(scf.filters.mapCenterLon.getValue()).getInfo();
    //print('lat :', lat);
    //print('lon :', lon);
    return [startDate, endDate, lat, lon];
};
scf.setMapCenter = function() {
    // The .filterMetadata is a built-in GEE function that allows you to only
    // select the state/s of interest.
    var state;
    var states;
    var nstates;
    var ftid;
    var ftColName;
    if (scf.filters.stateUSA.getValue() != 'All') {
      states = scf.filters.stateUSA.getValue().replace(/\s+/g,'').split('+');
      nstates = states.length;
      ftid = states[nstates-1].split(':');
      states[nstates-1] = ftid[0];
      if (ftid.length > 1) {
        StatesFT = ee.FeatureCollection("ft:"+ftid[1]);
        var StateFTPropertyList = ee.Feature(StatesFT.toList(100).get(0)).propertyNames();
        var nList = StateFTPropertyList.length().getInfo();
        for (var i=0; i < nList; i++) {
          //print(StateFTPropertyList.get(i));
          if (ee.String(StateFTPropertyList.get(i)).index('Name').getInfo() >= 0) {
            ftColName = StateFTPropertyList.get(i);
            //print(ftColName);
          }
        }
      }
      //var statesFC = new Array(nstates);
      //for (var i=0; i < nstates; i++){
      //  states[i] = states[i].replace(/([a-z])([A-Z])/g, '$1 $2');
      //  statesFC[i] = StatesFT.filter(ee.Filter.stringContains(ftColName, states[i]));
      //}
      //state = ee.FeatureCollection(statesFC).flatten();
      //print(state);
    }
    if ((centerUpdated || wyrUpdated) && mapChart) {
      Map.remove(mapChart);
      mapChart = 0;
    }
    var wyr = scf.filters.wyear.getValue();
    var scfImage = 'MODIS_SCF_' + wyr;
    var sddImage = 'MODIS_SDD_' + wyr;
    if (minSnowDaysUpdated == 1) {
      scf.genSCFSDD();
    }
    var displaySCF = ee.Image(scfImages[scfImage]);
    var displaySDD = ee.Image(sddImages[sddImage]);
    //var displaySCFQA = ee.Image(scfqaImages[scfImage]);
    var elev;
    if (scf.filters.elevRange.getValue() != 'All') {
      var elevs = scf.filters.elevRange.getValue().replace(/\s+/g,'').split('/');
      if (elevs.length == 1) {
        elev = DEM.expression("(BAND>=" + elevs[0] + ")",{BAND:DEM.select('elevation')});
        //print(elev, elevRange);
      }
      else {
        elev = DEM.expression("(BAND>=" + elevs[0] + "&&BAND<=" + elevs[1] + ")",{BAND:DEM.select('elevation')});
      }
      displaySCF = scfImages[scfImage].updateMask(elev);
      displaySDD = sddImages[sddImage].updateMask(elev);
      //displaySCFQA = scfqaImages[scfImage].updateMask(elev);
    }
    if ((wyrUpdated == 1) || (stateUpdated == 1) || elevUpdated == 1 || minSnowDaysUpdated == 1) {
      Map.clear();
      Map.add(legend);
      try{
        Map.addLayer(displaySCF.clip(myRegion), {'palette':palette_snow}, 'ccSCF', 1);
        Map.addLayer(displaySDD.clip(myRegion), {'palette':palette_sdd}, 'SDD (Water Year Day)', 1);
        //Map.addLayer(displaySCFQA.clip(myRegion), {'palette':palette_snow, min: 0}, 'SCF QA', 0);
      }
      catch(err) {
        if (scf.filters.stateUSA.getValue() == 'All') {
          Map.addLayer(displaySCF, {'palette':palette_snow}, 'ccSCF', 1);
          Map.addLayer(displaySDD, {'palette':palette_sdd}, 'SDD (Water Year Day)', 1);
          //Map.addLayer(displaySCFQA, {'palette':palette_snow, min: 0}, 'SCF QA', 0);
        }
        else {
          Map.addLayer(displaySCF.clip(state), {'palette':palette_snow}, 'ccSCF', 1);
          Map.addLayer(displaySDD.clip(state), {'palette':palette_sdd}, 'SDD (Water Year Day)', 1);
          //Map.addLayer(displaySCFQA.clip(state), {'palette':palette_snow, min: 0}, 'SCF QA', 0);
        }
      }
      if (mapChart) {
        Map.add(mapChart);
      }
      //Map.addLayer(snotel,{},'SNOTEL');
      //Map.addLayer(skiResorts,{color:'ff00ff'},'Ski Resorts');
      wyrUpdated = 0;
      stateUpdated = 0;
      elevUpdated = 0;
      minSnowDaysUpdated = 0;
    }
    var latlon = scf.filters.mapCenterLatLon.getValue().replace(/\s+/g,'').split('/');
    var lat = ee.Number.parse(latlon[0]).getInfo();
    var lon = ee.Number.parse(latlon[1]).getInfo();
    var point = ee.Geometry.Point(lon, lat);
    Map.setCenter(lon, lat);
    centerUpdated = 0;
    try {
      Map.layers().set(4, ui.Map.Layer(myRegion, {color: 'FF0000'},'Center', 'true'));
      var scf_wcloud = 100*scfImages[scfImage].reduceRegion(ee.Reducer.mean(), myRegion, 500).get('ccSCF').getInfo();
      //var scf_nocloud = 100*scfImages_nocloud[scfImage].reduceRegion(ee.Reducer.mean(), myRegion, 500).get('Snow_Cover_Daily_Tile_sum').getInfo();      
      scf.filters.scf_wcloud.setValue('ccSCF:\xa0\xa0\xa0' + scf_wcloud.toFixed(2) + '%');
      //scf.filters.scf_nocloud.setValue('SCF noCloud:\xa0\xa0\xa0' + scf_nocloud.toFixed(2) + '%');
      var elevation = DEM.reduceRegion(ee.Reducer.mean(), myRegion, 50).get('elevation').getInfo();
      scf.filters.elevation.setValue('Elevation:\xa0\xa0' + elevation + 'm');
    }
    catch(err) {
      Map.layers().set(4, ui.Map.Layer(point, {color: 'FF0000'},'Center', 'true'));
      var scf_wcloud = 100*scfImages[scfImage].reduceRegion(ee.Reducer.mean(), point, 50).get('ccSCF').getInfo();
      //var scf_nocloud = 100*scfImages_nocloud[scfImage].reduceRegion(ee.Reducer.mean(), point, 50).get('Snow_Cover_Daily_Tile_sum').getInfo();      
      scf.filters.scf_wcloud.setValue('ccSCF:\xa0\xa0\xa0' + scf_wcloud.toFixed(2) + '%');
      //scf.filters.scf_nocloud.setValue('SCF noCloud:\xa0\xa0\xa0' + scf_nocloud.toFixed(2) + '%');
      var elevation = DEM.reduceRegion(ee.Reducer.mean(), point, 50).get('elevation').getInfo();
      scf.filters.elevation.setValue('Elevation:\xa0\xa0' + elevation + 'm');
    }
    scf.getyyyymmdd(point, sddImages[sddImage]);
    scf.transect(displaySCF, displaySDD);
    Map.onClick(function(coords) {
      var lat = coords.lat.toFixed(5).toString();
      var lon = coords.lon.toFixed(5).toString();
      scf.filters.mapCenterLatLon.setValue(lat + ' / ' + lon);
      centerUpdated = 1;
      scf.setMapCenter();
    });
    return;
};
scf.genSCFSDD = function(){
  alert('genSCF_SDD Begin processing SDD from 2000 - present ...\n\nPlease Click OK to Continue!');
  var startTime = new Date().getTime();
  for (var wyr = wyrStart; wyr < wyrEnd; wyr++){
    var start = (wyr - 1) + wyStartDay;
    var end = wyr + wyStartDay;
    scf.getWyear(wyr.toString());
  }
  var endTime = new Date().getTime();
  //print(Object.keys(sddImages).length);
alert('genSCF_SDD Completed processing SDD from 2000 - present. : ' + (endTime - startTime)/1000 + ' secs\n\nPlease Click OK to Continue!\n\n');
};
scf.makeChart = function(){
    var scfDict = {};
    var sddDict = {};
    var latlon = scf.filters.mapCenterLatLon.getValue().replace(/\s+/g,'').split('/');
    var lat = ee.Number.parse(latlon[0]).getInfo();
    var lon = ee.Number.parse(latlon[1]).getInfo();
    var point = ee.Geometry.Point(lon, lat);
    var latdeg = Math.abs(lat) + '\xB0' + (lat >= 0 ? 'N':'S');
    var londeg = Math.abs(lon) + '\xB0' + (lon >= 0 ? 'E':'W');
    var elevation = DEM.reduceRegion(ee.Reducer.mean(), point,50).get('elevation').getInfo();
    var chartTitle = 'ccSCF & SDD vs Water Year\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Lat: ' + latdeg +'\xa0\xa0 Lon: ' + londeg + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Elevation: ' + elevation + ' m';
    alert('Remember Patience is a Virtue!!! ...\n\nPlease Click OK to Continue!');
    for (var yr = yrStart; yr < yrEnd; yr ++){
        var scfImage = 'MODIS_SCF_' + yr;
        var sddImage = 'MODIS_SDD_' + yr;
        try {
          scfDict[yr] = 100*scfImages[scfImage].reduceRegion(ee.Reducer.mean(), myRegion, 50).get('ccSCF').getInfo();
          sddDict[yr] = sddImages[sddImage].reduceRegion(ee.Reducer.mean(), myRegion, 50).get('SDD').getInfo();
        }
        catch(err) {
          try{
            scfDict[yr] = 100*scfImages[scfImage].reduceRegion(ee.Reducer.mean(), point, 50).get('ccSCF').getInfo();
            sddDict[yr] = sddImages[sddImage].reduceRegion(ee.Reducer.mean(), point, 50).get('SDD').getInfo();
          }
          catch(err) {
            scfDict[yr]= 0;
            sddDict[yr] = 0;
          }
        }
    }
    //print(scfDict, sddDict);
    var scfKeys = ee.Dictionary(scfDict).keys();
    var scfArray = ee.Dictionary(scfDict).toArray();
    var sddArray = ee.Dictionary(sddDict).toArray();
    var scfArrays = ee.Array.cat([sddArray, scfArray], 1);
    var scfChart = ui.Chart.array.values(scfArrays, 0, scfKeys)
        .setSeriesNames(['SDD', 'ccSCF']);
    scfChart.setChartType('LineChart');
    scfChart.style().set({
        position: 'bottom-right',
        width: '500px',
        height: '300px'
    });
    scfChart.setOptions({
        title: chartTitle,
        hAxis: {
          title: 'Year'
        },
        vAxes: {
          0: {
            title: 'ccSCF (%)',
            minValue: 0,
            maxValue: 100,
            titleTextStyle: {color: 'red'},
            textStyle: {color: 'red'}
          },
          1: {
            title: 'SDD (Water Year Day)',
            minValue: 0,
            maxValue: 400,
            titleTextStyle: {color: 'blue'},
            baselineColor: 'transparent',
            textStyle: {color: 'blue'}
          }
        },
        lineWidth: 1,
        pointSize: 3,
        // Our chart has two Y axes: one for SCF and one for SDD.
        // The Visualization API allows us to assign each series to a specific
        // Y axis, which we do here:
        series: {
          0: {targetAxisIndex: 1},
          1: {targetAxisIndex: 0},
          2: {targetAxisIndex: 0}
        }
    });
    // Add the chart to the map.    
    Map.add(scfChart);
    mapChart = scfChart;
};
scf.transectPlot = function(distance, elevationSCF, startPt, endPt, ptype){
  // Generate and style the chart.
  var wyear = scf.filters.wyear.getValue();
  var series = (ptype ? ['Elevation', 'SDD'] : ['Elevation', 'WY SCF']);
  var tname = (ptype ? 'SDD' : 'WY SCF');
  var vyname = (ptype ? 'SDD (dowy)' : 'WY SCF (%)');
  var plot = ui.Chart.array.values(elevationSCF, 1, distance.divide(1000))
    .setChartType('LineChart')
    .setSeriesNames(series)
    .setOptions({
      title: 'Elevation and ' + tname + ' along transect: Start=[' + startPt[1].toFixed(3) + ',' + startPt[0].toFixed(3) + ']\xa0\xa0\xa0End=[' + endPt[1].toFixed(3) + ',' + endPt[0].toFixed(3) + ']\xa0\xa0\xa0Water Year: ' + wyear,
      vAxes: {
        0: {
          title: vyname,
          titleTextStyle: {color: 'red'},
          textStyle: {color: 'red'}
        },
        1: {
          title: 'Elevation (meters)',
          titleTextStyle: {color: 'blue'},
          baselineColor: 'transparent',
          textStyle: {color: 'blue'}
        }
      },
      hAxis: {
        title: 'Distance from start to end (km)'
      },
      interpolateNulls: true,
      pointSize: 0,
      lineWidth: 1,
      // Our chart has two Y axes: one for SCF and one for elevation.
      // The Visualization API allows us to assign each series to a specific
      // Y axis, which we do here:
      series: {
        0: {targetAxisIndex: 1},
        1: {targetAxisIndex: 0},
        2: {targetAxisIndex: 0}
      }
    });
  print(plot);
};
scf.exportImage = function() {
  try {
    var wyear = scf.filters.wyear.getValue();
    var scfImage = 'MODIS_SCF_' + wyear;
    var sddImage = 'MODIS_SDD_' + wyear;
    var layers = prompt("Please select layers to export:", "ccSCF, SDD, DEM");
    var bands = layers.replace(/\s+/g,'').split(',');
    var nbands = ee.List(bands).length().getInfo();
    var xbands = 'exportROI';
    for (var i = 0; i < nbands; i++) {
      xbands += '_'+bands[i];
    }
    var displaySCF;
    for (i = 0; i < nbands; i++) {
      if (i === 0) {
        switch (bands[0]) {
          case 'ccSCF': 
            displaySCF = scfImages[scfImage];
            break;
          /***
          case 'SCFncloud': 
            displaySCF = scfImages_nocloud[scfImage];
            break;
          case 'SCFQA': 
            displaySCF = scfqaImages[scfImage];
            break;
          ***/
          case 'SDD': 
            displaySCF = sddImages[sddImage].toFloat();
            break;
          case 'DEM': 
            displaySCF = DEM;
            break;
          default:
            alert('No layers named '+band[0]);
        }
      }
      else {
        switch (bands[i]) {
          case 'ccSCF': 
            displaySCF = displaySCF.addBands(scfImages[scfImage]);
            break;
          /***
          case 'SCFncloud': 
            displaySCF = displaySCF.addBands(scfImages_nocloud[scfImage]);
            break;
          case 'SCFQA': 
            displaySCF = displaySCF.addBands(scfqaImages[scfImage]);
            break;
          ***/
          case 'SDD': 
            displaySCF = displaySCF.addBands(sddImages[sddImage].toFloat());
            break;
          case 'DEM': 
            displaySCF = displaySCF.addBands(DEM);
            break;
          default:
            alert('No layers named '+band[i]);
        }
      }
    }
    //var displaySCF = scfImages[scfImage].addBands(sddImages[sddImage].toFloat()).addBands(DEM.toFloat());    
    var projection = prompt("Please enter projection:", "EPSG:3857");
    Export.image.toDrive({
      image: displaySCF,
      description: xbands,
      scale: 500,
      crs: projection,
      region: exportROI
    });
  }
  catch (err) {
    alert('Could not export image!\nMake sure an "exportROI" polygon is defined on the map!');
  }
};
scf.transect = function(displaySCF, displaySDD) {
  try {
    var startPt = transect.coordinates().get(0).getInfo();
    var endPt = transect.coordinates().get(1).getInfo();
    var p2p_distance = ee.Geometry.Point(startPt).distance(ee.Geometry.Point(endPt)).getInfo();
    //print(startPt, endPt, p2p_distance);
    var startPtFC = ee.FeatureCollection(ee.Geometry.Point(startPt));
    var transectDist = startPtFC.distance(p2p_distance);
    var elevation = ee.Image(DEM);
    var distImage = transectDist.addBands(elevation).addBands(displaySCF.unmask());
    //print(startPtFC, transectDist, distImage);
    // Extract band values along the transect line.
    var distArray = distImage.reduceRegion(ee.Reducer.toList(), transect, 500).toArray(distImage.bandNames());
    // Sort points along the transect by their distance from the starting point.
    var distances = distArray.slice(0, 0, 1);
    distArray = distArray.sort(distances);
    // Create arrays for charting SCF and elevation vs distance.
    var elevationSCF = distArray.slice(0, 1);  // For the Y axis.
    // Project distance slice to create a 1-D array for x-axis values.
    var distance = distArray.slice(0, 0, 1).project([1]);
    //distance = distance.map(function(x) {return x/1000;});
    //print(distArray, distance, elevationSCF);
    scf.transectPlot(distance, elevationSCF, startPt, endPt, 0);
    // Create arrays for charting SDD and elevation vs distance.
    var sddImage = transectDist.addBands(elevation).addBands(displaySDD.unmask());    
    // Extract band values along the transect line.
    distArray = sddImage.reduceRegion(ee.Reducer.toList(), transect, 500).toArray(sddImage.bandNames());
    // Sort points along the transect by their distance from the starting point.
    distances = distArray.slice(0, 0, 1);
    distArray = distArray.sort(distances);
    // Create arrays for charting SCF and elevation vs distance.
    var elevationSDD = distArray.slice(0, 1);  // For the Y axis.
    // Project distance slice to create a 1-D array for x-axis values.
    distance = distArray.slice(0, 0, 1).project([1]);
    //distance = distance.map(function(x) {return x/1000;});
    //print(distArray, distance, elevationSDD);    
    scf.transectPlot(distance, elevationSDD, startPt, endPt, 1);    
  }
  catch (err) {
  }
};
scf.filters = {
    wyear : ui.Textbox('WY', '2015', function(){wyrUpdated = 1;}),
    mapCenterLatLon : ui.Textbox('Lat/Lon', '39.83 / -106.5', function(){centerUpdated = 1; return;}),
    stateUSA : ui.Textbox('All', 'All', function(){stateUpdated = 1; return}),
    elevRange : ui.Textbox('All', 'All', function(){elevUpdated = 1; return}),
    //minSnowDays : print(ui.Slider.getValue()),
    elevation : ui.Label('Elevation:\xa0\xa0m'),
    scf_wcloud : ui.Label('ccSCF:\xa0\xa0%'),
    sdd : ui.Label('SDD:\xa0\xa0YYYY-MM-DD'),
    applyButton: ui.Button('Apply Inputs', scf.setMapCenter),
    scfChart: ui.Button('Plot ccSCF & SDD vs Water Year', scf.makeChart),
    scfExportImage: ui.Button('Export Image', scf.exportImage)
};
scf.filters.panel = ui.Panel({
    widgets:[
      ui.Label({
        value:'Water Year :',
        style: {fontWeight: 'bold'}}), scf.filters.wyear,
      ui.Label({
        value: 'Center Lat/Lon :',
        style: {fontWeight: 'bold'}}), scf.filters.mapCenterLatLon,
      ui.Label({
        value: 'ROI (ex: Oregon) :',
        style: {fontWeight: 'bold'}}), scf.filters.stateUSA,
      ui.Label({
        value: 'Elev Range (low/high) :',
        style: {fontWeight: 'bold'}}), scf.filters.elevRange,
      ui.Label({
        value: 'SDD Min Snow Days',
        style: {fontWeight: 'bold'}}),
      ui.Slider({
        min: 1,
        max: 5,
        value: 3,
        step: 1,
        onChange: function(value) {
          minSnowDays = value;
          minSnowDaysUpdated = 1},
        style: {stretch: 'horizontal'}}),
      ui.Label(''), scf.filters.elevation,
      ui.Label(''), scf.filters.scf_wcloud,
      ui.Label(''), scf.filters.sdd,
      scf.filters.applyButton,
      scf.filters.scfChart,
      scf.filters.scfExportImage
    ]
});
scf.getyyyymmdd = function(point, sddLayer){
    var wyear = scf.filters.wyear.getValue();  
    var start = ee.Date(ee.String(ee.Number(wyear - 1)).cat(wyStartDay));
    var end = ee.Date(ee.String(wyear).cat(wyStartDay));
    var dowy = sddLayer.reduceRegion(ee.Reducer.mean(), point, 50).get('SDD').getInfo();
    var sdday = start.advance(dowy-1,'day');
    var yyyy = sdday.get('year').getInfo();
    var mm = sdday.get('month').getInfo();
    var dd = sdday.get('day').getInfo();
    var yyyymmdd = yyyy + '-' + mm + '-' + dd;
    if (dowy > 0){
      scf.filters.sdd.setValue('SDD (dowy): ' + dowy + ' (' + yyyymmdd + ')');
    }
    else {
      scf.filters.sdd.setValue('SDD:\xa0\xa0\xa0No Snow Detected');
    }
};
scf.getWyear = function(wyr){
    var start = (wyr - 1) + wyStartDay;
    var end = wyr + wyStartDay;
    var start1 = end;
    var end1 = ee.Date(end).advance(30,'day');
    var scfImage = 'MODIS_SCF_' + wyr;
    //////////////////////// SATELLITE DATA  ///////////////////////////////// 
    // Pull the images from the MODIS/Terra Daily Snow Cover product.
    var ndays1 = ee.ImageCollection("MODIS/006/MOD10A1")
      .filterDate(start1,end1)
      .size().getInfo();
    var MODIS_cloud_list = ee.ImageCollection("MODIS/006/MOD10A1")
      .filterDate(start,end1)
      .map(function(img) {
        return img.expression("(BAND==250)",{BAND:img.select('NDSI_Snow_Cover_Class')})})
      .toList(400);
    var MODIS_snow_list = ee.ImageCollection("MODIS/006/MOD10A1")
      .filterDate(start,end1)
      .map(function(img) {
        return img.expression("(BAND>=40&&BAND<=100)",{BAND:img.select('NDSI_Snow_Cover')})})
      .toList(400);
//var c = ee.Image('MODIS/006/MOD10A1/2000_02_24')
//var ndsi = c.select('NDSI_Snow_Cover');
//Map.addLayer(ndsi, {min:0, max:100}, 'NDSI');
//var landcover = c.select('NDSI_Snow_Cover_Class');
//var cloud = landcover.updateMask(landcover.eq(250));
//var no_decision = landcover.updateMask(landcover.eq(201));
//Map.addLayer(landcover, {min:200, max:255}, 'Snow cover class');
//Map.addLayer(cloud, {}, 'Clouds');
//Map.addLayer(no_decision, {}, 'No decision');
//Map.addLayer(c.select('Snow_Albedo_Daily_Tile_Class'), {min:100, max:255}, 'Snow albedo class');
//Map.centerObject(c);
    /***
    var MODIS_scfqa_list = ee.ImageCollection("MOD10A1")
      // Filter by the desired date range (defined above).
      .filterDate(start,end)
      .map(function(img) {
        return img.select('Snow_Spatial_QA')})
      .toList(400);
    ***/  
    // Get number of days  
    var ndays = MODIS_cloud_list.length().getInfo() - ndays1;
    /***
    var MODIS_scfqa = ee.Image(0);
    for (var i = 0; i < ndays; i++) {
      MODIS_scfqa = MODIS_scfqa.add(ee.Image(MODIS_scfqa_list.get(i)).unmask());
    }
    MODIS_scfqa = ee.Image(1).subtract(MODIS_scfqa.divide(ee.Image(ndays)));
    ***/
    sddCorrection[wyr] = (ndays < 365 + (wyr % 4 ? 0 : 1)) ? 365 + (wyr % 4 ? 0 : 1) - ndays : 0;
    print('Processed ' + ndays + ' days in ' + wyr);
    var scount_ena = ee.Image(0);
    var Snow = ee.Image(0);
    var accSnow = ee.Image(0);
    var accSnow1 = ee.Image(0);
    var noSnow1 = ee.Image(0);
    var maxNoSnow = ee.Image(0);
    var minSnow = ee.Image(minSnowDays);
    var sddDetected = ee.Image(0);
    var valid = ee.Image(ndays);
    var sddImage = 'MODIS_SDD_' + wyr;
    sddImages[sddImage] = ee.Image(0);
    var MODIS_max_ndays_nosnow = ee.Image(0);
    for(var i=ndays + ndays1-1; i>=0; i--) {
      var Cloud = ee.Image(MODIS_cloud_list.get(i)).unmask();
      scount_ena = Cloud.and(scount_ena.or(Snow));
      Snow = ee.Image(MODIS_snow_list.get(i)).unmask();
      if (i < ndays) {
        var enable = scount_ena.or(Snow);
        accSnow = accSnow.add(enable);
        minSnow = minSnow.where(enable.not().and(accSnow1.gt(minSnow)), accSnow1);
        accSnow1 = (accSnow1.add(enable)).multiply(enable);
        noSnow1 = (noSnow1.add(enable.not())).multiply(sddDetected.not());
        sddDetected = (accSnow1.gt(minSnow)).and(noSnow1.gt(maxNoSnow));
        maxNoSnow = maxNoSnow.where(sddDetected, noSnow1);
        var sdd1 = i+2+sddCorrection[wyr];
        var sdd = minSnow.add(ee.Image(sdd1));
        sddImages[sddImage] = sddImages[sddImage].where(sddDetected, sdd);
      }
    }
    sddImages[sddImage] = sddImages[sddImage].where(accSnow.eq(ndays-1), ndays+sddCorrection[wyr]);
    ///////////////////////////  IMAGE CALCULATION  ////////////////////////////////
    // This function allows you to divide the values from one image by the values 
    // in another image. This is the simplicity of Snow Cover Frequency algorithm.
    scfImages[scfImage] = accSnow.divide(valid).updateMask(accSnow).rename('ccSCF');
    sddImages[sddImage] = sddImages[sddImage].updateMask(sddImages[sddImage]).rename('SDD');
};
/** Creates the application interface. */
scf.boot = function() {
  /////////////////////////  DATE RANGE  //////////////////////////////////
  // First, create variables for the date range.
  // There are many ways to do this, and I have not figured out the best way yet.
  // To change the date range of analysis, simply change the date below.
  // Set filter variables.
  scf.genSCFSDD();
  //var latlon = scf.filters.mapCenterLatLon.getValue().replace(/\s+/g,'').split('/');
  //var lat = ee.Number.parse(latlon[0]).getInfo();
  //var lon = ee.Number.parse(latlon[1]).getInfo();
  //var point = ee.Geometry.Point(lon, lat);
  //Map.setCenter(lon, lat, 6);
  var main = ui.Panel({
    widgets: [
      scf.filters.panel
    ]
  });
  Map.add(legend);
  ui.root.insert(0, main);
};
scf.boot();
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
alert('Please set input options and press \'Apply Inputs\', but first\n\n \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Press OK to continue!\n\n');
// Register a callback on the map to be invoked when the map is clicked.
/***
Map.onClick(function(coords) {
  var lat = coords.lat.toFixed(5).toString();
  var lon = coords.lon.toFixed(5).toString();
  scf.filters.mapCenterLatLon.setValue(lat + ' / ' + lon);
  centerUpdated = 1;
  scf.setMapCenter();
});
***/