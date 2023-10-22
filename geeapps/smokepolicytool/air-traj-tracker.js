var cfs = ui.import && ui.import("cfs", "imageCollection", {
      "id": "NOAA/CFSV2/FOR6H"
    }) || ee.ImageCollection("NOAA/CFSV2/FOR6H"),
    ecmwf = ui.import && ui.import("ecmwf", "imageCollection", {
      "id": "ECMWF/ERA5/DAILY"
    }) || ee.ImageCollection("ECMWF/ERA5/DAILY");
// ================================================
// 2D Air Trajectory Tracker
// ------------------------------------------------
// @author Tianjia Liu (tianjialiu@g.harvard.edu)
// Last updated: December 17, 2020
// ================================================
// The air trajectory tracker is a simplified 2D version
// of HYSPLIT that tracks air parcels forward and backward
// in time from point locations using only surface wind fields.
// NOAA's HYSPLIT model - https://www.ready.noaa.gov/HYSPLIT_traj.php
// ================
// Load Packages
// ================
var colPals = require('users/tl2581/packages:colorPalette.js');
var baseMap = require('users/tl2581/packages:baseMap.js');
var baseRegions = require('users/tl2581/packages:baseRegions.js');
// Global parameters
var initialZoom = 5;
var basisRegions = ee.FeatureCollection('projects/GlobalFires/basisRegions_0p25deg');
var metNames = ['NCEP/CFSv2 - Climate Forecast System',
  'ECMWF/ERA5 - Reanalysis'];
// EE image collections for meteorology datasets
var inMetCols = {
  'NCEP/CFSv2 - Climate Forecast System': cfs,
  'ECMWF/ERA5 - Reanalysis': ecmwf
};
// u and v band names in meteorology datasets
var metBandsList = {
  'NCEP/CFSv2 - Climate Forecast System': ['u-component_of_wind_height_above_ground',
    'v-component_of_wind_height_above_ground'],
  'ECMWF/ERA5 - Reanalysis': ['u_component_of_wind_10m',
    'v_component_of_wind_10m']
};
// start dates for date slider for meteorology datasets
var metStartDateList = {
  'NCEP/CFSv2 - Climate Forecast System': '1979-01-01',
  'ECMWF/ERA5 - Reanalysis': '1979-01-01',
};
var today = new Date();
today = ee.Date(today);
var getLatestDate = function(inMet) {
  return ee.Number(ee.Date(inMet.filterDate(today.advance(-7,'day'),today)
    .sort('system:time_start',false).first().get('system:time_start')).millis()).getInfo();
};
var metEndDateList = {
  'NCEP/CFSv2 - Climate Forecast System': getLatestDate(cfs),
  'ECMWF/ERA5 - Reanalysis': ee.Number(ee.Date('2020-07-09').millis()).getInfo()
};
// cadence of meteorology datasets (hrs)
var metCadenceList = {
  'NCEP/CFSv2 - Climate Forecast System': 6,
  'ECMWF/ERA5 - Reanalysis': 24
};
var metBandsNew = ['u','v'];
var getMetImgDaily = function(inMet, stDate) {
  var endDate = stDate.advance(1,'hour');
  var metImgDaily = inMet
    .filterDate(stDate,endDate).first();
  return metImgDaily;
};
var getMetDRes = function(inMet, stDate, nStep, trajDir, stepSize, lenTimeStep, cadence) {
  return ee.List.sequence(0,nStep-1,1)
    .map(function(step) {
    var stepNow = ee.Number(step).multiply(trajDir)
      .divide(stepSize);
    var stDateHr = stDate.advance(ee.Number(lenTimeStep).abs()
      .multiply(stepNow).multiply(stepSize),'second');
    var ceilWeight = stDateHr.get('hour').mod(cadence);
    var floorWeight = ee.Number(cadence).subtract(ceilWeight);
    var stDateHrFloor = stDateHr.advance(ceilWeight.multiply(-1),'hour');
    var stDateHrCeil = stDateHrFloor.advance(cadence,'hour');
    var metFloor = getMetImgDaily(inMet,stDateHrFloor);
    var metCeil = getMetImgDaily(inMet,stDateHrCeil);
    var metWeighted = (metCeil.multiply(ceilWeight)
      .add(metFloor.multiply(floorWeight)))
      .divide(cadence);
    var wind_sp = ((metWeighted.select('u').pow(2))
      .add(metWeighted.select('v').pow(2))).sqrt()
      .rename('windSpeed');
    return metWeighted.addBands(wind_sp);
  });
};
// adjust longitude meters/degree conversion with latitude
var lat_m = 111319.9;
var getHorizAdj = function(lat) {
  var lon_m = lat.multiply(Math.PI/180).cos().multiply(lat_m);
  var horiz_adj = ee.Number(lon_m).divide(lat_m);
  return horiz_adj;
};
// get wind component values at a point
var getWindPt = function(metImg,point,metProj,metScale) {
  var metPts = metImg
    .reduceRegions({
      collection: point,
      reducer: ee.Reducer.mean().unweighted(),
      crs: metProj,
      scale: metScale
    }).first();
  return metPts;
};
// back (-1) or forward (+1) trajectory
var trajDirTypeList = {
  'Backward': -1,
  'Forward': 1
};
// calculate next step in the trajectory
var getNextStep = function(metImg, point, step, trajDir, metProj, metScale, lenTimeStep) {
  var stepNum = ee.Number(step).add(1);
  var lon = ee.Number(point.coordinates().get(0));
  var lat = ee.Number(point.coordinates().get(1));
  var windPt = getWindPt(metImg,point,metProj,metScale);
  var u = windPt.getNumber('u');
  var v = windPt.getNumber('v');
  var sp = (u.pow(2).add(v.pow(2))).sqrt();
  var horiz_adj = getHorizAdj(lat);
  var dir = ee.Geometry.LineString([lon,lat,
    lon.add(u.multiply(horiz_adj).multiply(trajDir)),
    lat.add(v.multiply(trajDir))]);
  var buf = point.buffer(sp.multiply(lenTimeStep).abs());
  var intBuf = buf.intersection(dir);
  var endPt = ee.Geometry.Point(intBuf.coordinates().get(1));
  endPt = ee.FeatureCollection(ee.Feature(endPt,
    {step: stepNum}));
  return endPt;
};
// calculate a single trajectory
var getTraj = function(pt, metDRes, stDate, trajNum, nStep, trajDir,
  metProj, metScale, lenTimeStep) {
  var traj = ee.FeatureCollection([pt]);
  var trajStep = function(step,list) {
    list = ee.FeatureCollection(list);
    var pt = list.filterMetadata('step','equals',step)
      .first().geometry();
    var metHr = ee.Image(metDRes.get(step));
    var nextPt = getNextStep(metHr,pt,step,trajDir,metProj,metScale,lenTimeStep);
    var pts = list.merge(nextPt);
    return pts;
  };
  traj = ee.List.sequence(0,nStep-1,1).iterate(trajStep,traj);
  var geomTraj = ee.FeatureCollection(traj).geometry();
  return ee.Feature(ee.Geometry.LineString(geomTraj.coordinates()),
    {'trajNum': trajNum});
};
// wind arrows
var resizeFac = 0.3;
var makeArrowFromFeature = function(feature) {
  var coords = feature.geometry().coordinates();
  var lon = ee.Number(coords.get(0));
  var lat = ee.Number(coords.get(1));
  var u = ee.Number(feature.get('u')).multiply(resizeFac);
  var v = ee.Number(feature.get('v')).multiply(resizeFac);
  var horiz_adj = getHorizAdj(lat);
  u = u.multiply(horiz_adj);
  var sp = (u.pow(2).add(v.pow(2))).sqrt();
  var len = (sp.sqrt()).multiply(0.03);
  var norm = sp.divide(5);
  var arrow = ee.Geometry.MultiLineString([
    ee.Geometry.LineString(lon,lat,lon.add(u),lat.add(v)),
    ee.Geometry.LineString(
      lon.add(u).subtract((u.multiply(len).add(v.multiply(len))).divide(norm)),
        lat.add(v).subtract((v.multiply(len).subtract(u.multiply(len))).divide(norm)),
      lon.add(u),lat.add(v)
      ),
    ee.Geometry.LineString(
      lon.add(u),lat.add(v),
      lon.add(u).subtract((u.multiply(len).subtract(v.multiply(len))).divide(norm)),
        lat.add(v).subtract((v.multiply(len).add(u.multiply(len))).divide(norm))
      )
   ]);
  return arrow;
};
// ===============
// User Interface
// ===============
// Info panel
var infoPanel = function() {
  var trajToolLabel = ui.Label('Air Trajectory Tracker', {margin: '12px 0px 0px 8px', fontWeight: 'bold', fontSize: '24px', border: '1px solid black', padding: '5px'});
  var infoLabel = ui.Label('The air trajectory tracker is a simplified 2D version of HYSPLIT that tracks air parcels forward and backward in time from point locations using only surface wind fields (5-10 meters above ground).',
    {margin: '8px 20px 2px 8px', fontSize: '12px', color: '#777'});
  var headDivider = ui.Panel(ui.Label(),ui.Panel.Layout.flow('horizontal'),
    {margin: '12px 0px 5px 0px',height:'1.25px',border:'0.75px solid black',stretch:'horizontal'});
  var inputSectionLabel = ui.Label('Input Parameters', {margin: '8px 8px 5px 8px', fontWeight: 'bold', fontSize: '20px'});
  return ui.Panel([
    trajToolLabel, infoLabel, headDivider, inputSectionLabel
  ]);
};
// Receptor/point source panel 
var pointSelectPanel = function(map) {
  var pointLabel = ui.Label('1) Select Point Source/Receptor:', {padding: '0px 0px 0px 5px', fontSize: '14.5px', color: '#0070BF'});
  var coordsLabel = ui.Label('Enter lon/lat below, select a city, or click on map to update coordinates',
    {margin: '3px 8px 6px 23px', fontSize: '11.5px'});
  var lonLabel = ui.Label('Lon (x):', {padding: '3px 0px 0px 15px', fontSize: '14.5px'});
  var latLabel = ui.Label('Lat (y):', {padding: '3px 0px 0px 0px', fontSize: '14.5px'});
  var lonBox = ui.Textbox({value: 80.3319, style: {stretch: 'horizontal'}});
  var latBox = ui.Textbox({value: 26.4499, style: {stretch: 'horizontal'}});
  var coordsPanel = ui.Panel([
    coordsLabel, ui.Panel([lonLabel, lonBox, latLabel, latBox], ui.Panel.Layout.Flow('horizontal'),
      {stretch: 'horizontal', margin: '-5px 0px 0px 0px'})
    ]);
  map.onClick(function(coords) {
    lonBox.setValue(coords.lon);
    latBox.setValue(coords.lat);
  });
  var cityLabel = ui.Label('(Optional) Select a city to', {padding: '0px 0px 0px 15px', backgroundColor: '#FFFFFF00', fontSize: '11.5px'});
  var cityLabel2 = ui.Label('populate lon/lat above:', {padding: '0', margin: '-22px 8px 8px 25px', fontSize: '11.5px'});
  var citySelect = ui.Select({items: baseRegions.citiesNames, placeholder: 'Select a city',
    value: 'Kanpur, India', style: {stretch: 'horizontal'},
    onChange: function(city) {
      lonBox.setValue(baseRegions.citiesList[city].lon);
      latBox.setValue(baseRegions.citiesList[city].lat);
    }
  });
  var cityPanel = ui.Panel([ui.Panel([cityLabel, citySelect], ui.Panel.Layout.Flow('horizontal'),
      {stretch: 'horizontal', margin: '-8px 0px 0px 0px', backgroundColor: '#FFFFFF00'}),
        cityLabel2]);
  return ui.Panel([pointLabel, coordsPanel, cityPanel]);
};
var getCoords = function(pointSelectPanel) {
  var lon = parseFloat(pointSelectPanel.widgets().get(1).widgets().get(1).widgets().get(1).getValue());
  var lat = parseFloat(pointSelectPanel.widgets().get(1).widgets().get(1).widgets().get(3).getValue());
  return ee.Feature(ee.Geometry.Point(lon,lat),{step:0});
};
var timeIntUnitList = ['Day','Hour','Month','Year'];
var trajDirAdjList = {
  'Backward': [-1,0],
  'Forward': [0,1]
};
var getStartRunDate = function(startDateSlider,
  timeTotalSlider, trajDirTypeSelect) {
  var startDate = ee.Date((startDateSlider.getValue())[0]);
  var timeTotal = timeTotalSlider.getValue();
  var trajDirType = trajDirTypeSelect.getValue();
  var trajDirAdj = (trajDirAdjList[trajDirType])[0];
  var startRunDate = startDate.advance(timeTotal * trajDirAdj,'hour');
  return startRunDate.format('Y-MM-dd');
};
var getEndRunDate = function(startDateSlider, nTrajSlider,
  timeSeqIntSlider, timeIntUnitSelect, timeTotalSlider, trajDirTypeSelect) {
  var startDate = ee.Date((startDateSlider.getValue())[0]);
  var nTraj = nTrajSlider.getValue();
  var timeSeqInt = timeSeqIntSlider.getValue();
  var byTimeUnit = timeIntUnitSelect.getValue().toLowerCase();
  var timeTotal = timeTotalSlider.getValue();
  var trajDirType = trajDirTypeSelect.getValue();
  var trajDirAdj = (trajDirAdjList[trajDirType])[1];
  var endRunDate = startDate.advance(nTraj*timeSeqInt-timeSeqInt,byTimeUnit)
    .advance(timeTotal * trajDirAdj,'hour');
  return endRunDate.format('Y-MM-dd');
};
// Meteorology source and date panel
var metDatePanel = function() {
  // Start date panel
  var dateLabel = ui.Label('2) Select Start Time:', {fontSize: '14.5px', color: '#0070BF', padding: '0 0 0 5px'});
  var startYearLabel = ui.Label('Start Year:', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var startYearSlider = ui.Slider({min: 1979, max: 2020, value: 2019, step: 1});
  startYearSlider.style().set('stretch', 'horizontal');
  var startYearPanel = ui.Panel([startYearLabel, startYearSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'});
  var startDateLabel = ui.Label('Start Date:', {fontSize: '14.5px', margin: '12px 8px 8px 25px'});
  var startDateSlider = ui.DateSlider({start: '2019-01-01', end: '2019-12-31', value: '2019-10-20'});
  startDateSlider.style().set('stretch', 'horizontal');
  var startDatePanel = ui.Panel([startDateLabel, startDateSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'});
  var startHourLabel = ui.Label('Start Hour (UTC):', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var startHourSlider = ui.Slider({min: 0, max: 23, value: 6, step: 1});
  startHourSlider.style().set('stretch', 'horizontal');
  var startHourPanel = ui.Panel([startHourLabel, startHourSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 0px 0px 0px'});
  var startTimePanel = ui.Panel([dateLabel,startYearPanel,startDatePanel,startHourPanel]);
  // Meteorology source panel
  var metLabel = ui.Label('3) Select Meteorology:', {padding: '5px 0px 0px 5px', fontSize: '14.5px', color: '#0070BF'});
  var metSelect = ui.Select({items: metNames, value: 'NCEP/CFSv2 - Climate Forecast System', style: {stretch: 'horizontal'}});
  var metPanel = ui.Panel([metLabel, metSelect], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'});
  startYearSlider.onChange(function(inYear) {
    var startDate = ee.Date.fromYMD(inYear,1,1).format('Y-MM-dd').getInfo();
    var endDate = ee.Date.fromYMD(inYear,12,31).format('Y-MM-dd').getInfo();
    metSelect = ui.Select({items: metNames, value: 'NCEP/CFSv2 - Climate Forecast System', style: {stretch: 'horizontal'}});
    if (inYear == 2020) {
      endDate = metEndDateList[metSelect.getValue()];
    }
    startDateSlider = ui.DateSlider({start: startDate, end: endDate, value: startDate});
    startDateSlider.style().set('stretch', 'horizontal');
    metSelect.onChange(function(selected) {
      if (inYear == 2020) {
        endDate = metEndDateList[selected];
        startDateSlider = ui.DateSlider({start: startDate, end: endDate, value: startDate});
        startDateSlider.style().set('stretch', 'horizontal');
        startDatePanel.remove(startDatePanel.widgets().get(1));
        startDatePanel.insert(2, startDateSlider);
      }
    });
    startDatePanel.remove(startDatePanel.widgets().get(1));
    startDatePanel.insert(2, startDateSlider);
    metPanel.remove(metPanel.widgets().get(1));
    metPanel.add(metSelect);
  });
  // Trajectory parameters panel
  var timeLabel = ui.Label('4) Set Trajectory Parameters:', {fontSize: '14.5px', color: '#0070BF', margin: '6px 8px 8px 13px'});
  var trajDirTypeLabel = ui.Label('Trajectory Type:', {fontSize: '14.5px', margin: '15px 8px 8px 25px'});
  var trajDirTypeList = ['Backward','Forward'];
  var trajDirTypeSelect = ui.Select({items: trajDirTypeList, value: 'Backward', style: {stretch: 'horizontal'}});
  var timeTotalLabel = ui.Label('Total Trajectory Time [h]:', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var timeTotalSlider = ui.Slider({min: 3, max: 240, value: 120, step: 3});
  timeTotalSlider.style().set('stretch', 'horizontal');
  var lenTimeStepLabel = ui.Label('Length of Time Step [h]:', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var lenTimeStepSlider = ui.Slider({min: 1, max: 6, value: 3, step: 1});
  lenTimeStepSlider.style().set('stretch', 'horizontal');
  lenTimeStepSlider.onChange(function(selected) {
    timeTotalSlider.setMin(selected);
    timeTotalSlider.setStep(selected);
    timeTotalSlider.setMax(selected * 80);
    timeTotalSlider.setValue(selected * 40);
  });
  var nTrajLabel = ui.Label('Total Trajectories:', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var nTrajSlider = ui.Slider({min: 1, max: 100, value: 30, step: 1});
  nTrajSlider.style().set('stretch', 'horizontal');
  var timeIntUnitLabel = ui.Label('Time Interval Unit:', {fontSize: '14.5px', margin: '15px 8px 8px 25px'});
  var timeIntUnitSelect = ui.Select({items: timeIntUnitList, value: 'Day', style: {stretch: 'horizontal'}});
  var timeSeqIntLabel = ui.Label('Time Interval:', {fontSize: '14.5px', margin: '8px 8px 8px 25px'});
  var timeSeqIntSlider = ui.Slider({min: 1, max: 100, value: 1, step: 1});
  timeSeqIntSlider.style().set('stretch', 'horizontal');
  var trajectoryPanel = ui.Panel([
    timeLabel,
    ui.Panel([trajDirTypeLabel, trajDirTypeSelect], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 0px 0px 0px'}),
    ui.Panel([timeTotalLabel, timeTotalSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 0px 0px 0px'}),
    ui.Panel([lenTimeStepLabel, lenTimeStepSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 0px 0px 0px'}),
    ui.Panel([nTrajLabel, nTrajSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '0px 0px -3px 0px'}),
    ui.Panel([timeSeqIntLabel, timeSeqIntSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 0px 0px 0px'}),
    ui.Panel([timeIntUnitLabel, timeIntUnitSelect], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', margin: '-5px 10px 0px 0px'}),
  ]);
  // Final check panel
  var checkLabel = ui.Label('5) Final Check:', {fontSize: '14.5px', color: '#0070BF', margin: '6px 8px 5px 13px'});
  var checkMessage = ui.Label('Are the start/end dates of selected trajectories valid?', {fontSize: '13px', color: '#333', margin: '0px 8px 8px 25px'});
  var checkUpdateButton =  ui.Button({label: 'Check Info', style: {margin: '2px 8px 8px 25px'}});
  var trajMetCheck = ui.Label('<- (Click to update)', {fontSize: '12px', margin: '8px 8px 8px 2px', color: '#333'});
  var runDateCheckPanel = ui.Panel([trajMetCheck]);
  var checkPanel = ui.Panel([
    checkLabel, checkMessage,
    ui.Panel([checkUpdateButton, runDateCheckPanel], ui.Panel.Layout.Flow('horizontal'),
      {stretch: 'horizontal', margin: '2px 10px 0px 0px', width:'350px'})
  ], ui.Panel.Layout.Flow('vertical'),
      {stretch: 'horizontal', width:'350px'});
  checkUpdateButton.onClick(function() {
    var trajCheckLabel = ui.Label('The trajectory runtime range must be within the input meteorology availability.',
      {fontSize: '12px', margin: '0px 8px 5px 2px', color: '#333', stretch: 'horizontal', width: '230px'});
    var startRunDate = getStartRunDate(startDateSlider, timeTotalSlider, trajDirTypeSelect);
    var endRunDate = getEndRunDate(startDateSlider, nTrajSlider,
      timeSeqIntSlider, timeIntUnitSelect, timeTotalSlider, trajDirTypeSelect);
    var inMet = getMetSource(metDatePanel);
    var startMetDate = ee.Date(metStartDateList[inMet]).format('Y-MM-dd').getInfo();
    var endMetDate = ee.Date(metEndDateList[inMet]).format('Y-MM-dd').getInfo();
    var metAvailLabel = ui.Label('Input Meteorology:',
      {fontSize: '12px', margin: '0px 8px 3px 2px', color: '#333', width: '230px'});
    var metAvailInfoLabel = ui.Label(startMetDate + ' to ' + endMetDate,
      {fontSize: '12px', margin: '0px 8px 3px 2px', color: '#666', width: '230px'});
    var trajRuntimeLabel = ui.Label('Trajectory Runtime:',
      {fontSize: '12px', margin: '0px 8px 3px 2px', color: '#333', width: '230px'});
    var trajRuntimeInfoLabel = ui.Label(startRunDate.getInfo() + ' to ' + endRunDate.getInfo(),
      {fontSize: '12px', margin: '0px 8px 8px 2px', color: '#666', width: '230px'});
    var trajParams = getTime(metDatePanel);
    var trajParamsLabel = ui.Label('Trajectory Specifics:',
      {fontSize: '12px', margin: '0px 8px 3px 2px', color: '#333', width: '230px'});
    var trajParamsSpecificsLabel = ui.Label(trajParams.nTraj + ' total trajectories: 1 ' +
      ee.String(trajParams.trajDirType).toLowerCase().getInfo() +
      ' trajectory every ' + trajParams.timeSeqInt + ' ' +
      ee.String(trajParams.timeIntUnit).toLowerCase().getInfo() +
      '(s), where each trajectory totals ' + trajParams.timeTotal + ' hour(s) at a time step of ' +
      trajParams.lenTimeStep + ' hour(s)',
      {fontSize: '12px', margin: '0px 8px 8px 2px', color: '#666', width: '230px'});
    var trajCheckInfo = ui.Panel([trajCheckLabel,metAvailLabel,metAvailInfoLabel,
      trajRuntimeLabel,trajRuntimeInfoLabel,trajParamsLabel,trajParamsSpecificsLabel],
      ui.Panel.Layout.flow('vertical'),{stretch:'horizontal'});
    runDateCheckPanel.remove(runDateCheckPanel.widgets().get(0));
    runDateCheckPanel.add(trajCheckInfo);
  });
  return ui.Panel([
    startTimePanel,metPanel,trajectoryPanel,checkPanel,
  ]);
};
var getMetSource = function(metDatePanel) {
  return metDatePanel.widgets().get(1).widgets().get(1).getValue();
};
var getDate = function(metDatePanel) {
  var startDate = metDatePanel.widgets().get(0).widgets().get(2).widgets().get(1).getValue();
  var startHr = metDatePanel.widgets().get(0).widgets().get(3).widgets().get(1).getValue();
  return ee.Date(ee.Number(startDate[0])
    .add(ee.Number(startHr).multiply(60*60*1e3)));
};
var getTime = function(metDatePanel) {
  return {
    trajDirType:metDatePanel.widgets().get(2).widgets().get(1).widgets().get(1).getValue(),
    timeTotal:metDatePanel.widgets().get(2).widgets().get(2).widgets().get(1).getValue(),
    lenTimeStep:metDatePanel.widgets().get(2).widgets().get(3).widgets().get(1).getValue(),
    nTraj:metDatePanel.widgets().get(2).widgets().get(4).widgets().get(1).getValue(),
    timeSeqInt:metDatePanel.widgets().get(2).widgets().get(5).widgets().get(1).getValue(),
    timeIntUnit:metDatePanel.widgets().get(2).widgets().get(6).widgets().get(1).getValue()
  };
};
// Run button
var runButton = ui.Button({label: 'Run Trajectories',  style: {stretch: 'horizontal'}});
// Legend
var getLayerCheck = function(label, value, layerPos, units) {
  var checkLayer = ui.Checkbox({label: label, value: value,  
    style: {fontWeight: '100px', fontSize: '14px', margin: '0px 3px 3px 3px'}});
  checkLayer.onChange(function(checked) {
    var mapLayer = map.layers().get(layerPos);
    mapLayer.setShown(checked);
  });
  var legendSubtitle = ui.Label(units,{fontSize: '13px', fontWeight: '50px', margin: '1px 3px 0px 2px'});
  return ui.Panel([checkLayer,legendSubtitle],ui.Panel.Layout.flow('horizontal'));
};
var getLegend = function(maxVal, colPal) {
  var vis = {min: 0, max: maxVal, palette: colPal};
  var makeColorBarParams = function(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '120x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  };
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '5px 8px 0px 8px', height: '15px'},
  });
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 8px'}),
      ui.Label((vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 8px'}),
      ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendPanel = ui.Panel({
    widgets: [colorBar, legendLabels],
    style: {
      margin: '0px -5px 0px -5px',
    }});
  return legendPanel;
};
// Control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '350px', maxWidth: '350px'}
});
// Map panel
var map = ui.Map();
map.style().set({cursor:'crosshair'});
map.setCenter(0,10,2);
map.setControlVisibility({fullscreenControl: false});
ui.root.clear();
var init_panels = ui.SplitPanel({firstPanel: controlPanel,
  secondPanel: map});
ui.root.add(init_panels);
var infoPanel = infoPanel();
var pointSelectPanel = pointSelectPanel(map);
var metDatePanel = metDatePanel();
controlPanel.add(infoPanel).add(pointSelectPanel)
  .add(metDatePanel).add(runButton);
// Run calculations, linked to submit button
runButton.onClick(function() {
  // Input parameters:
  var metSource = getMetSource(metDatePanel);
  var pt = getCoords(pointSelectPanel);
  var trajTimeParams = getTime(metDatePanel);
  var lenTimeStep = trajTimeParams.lenTimeStep * 60*60; // length of each timestep, sec
  var timeTotal = trajTimeParams.timeTotal * 60*60; // total time, sec
  var trajDirType = trajTimeParams.trajDirType;
  var trajDir = trajDirTypeList[trajDirType];
  var byTimeUnit = trajTimeParams.timeIntUnit.toLowerCase();
  var nTraj = trajTimeParams.nTraj;
  var timeSeqInt = trajTimeParams.timeSeqInt;
  var stRunDate = getDate(metDatePanel);
  var endRunDate = stRunDate.advance(nTraj*timeSeqInt-timeSeqInt,byTimeUnit);
  var stRunDateAbs = stRunDate.advance(timeTotal * (trajDirAdjList[trajDirType])[0],'second');
  var endRunDateAbs = endRunDate.advance(timeTotal * (trajDirAdjList[trajDirType])[1],'second');
  var cadence = metCadenceList[metSource];
  var metTimeStep = 60*60*cadence;
  var stepSize = ee.Number(metTimeStep / lenTimeStep).abs();
  var nStep = timeTotal / lenTimeStep;
  // Meteorology
  var metBands = metBandsList[metSource];
  var inMet = inMetCols[metSource];
  inMet = ee.ImageCollection(inMet).select(metBands,metBandsNew);
  var metProj = inMet.first().projection();
  var metScale = metProj.nominalScale();
  var metMap = inMet.filterDate(stRunDateAbs.advance(-cadence+1,'hour'),
    endRunDateAbs.advance(cadence-1,'hour'))
      .map(function(image) {
        var wind_sp = ((image.select('u').pow(2))
          .add(image.select('v').pow(2))).sqrt()
          .rename('windSpeed');
        return image.addBands(wind_sp);
      }).mean();
  // Trajectories
  // Iterate trajectory calculation through a list of time slices
  var meanTimeStepsMonth = ee.List.sequence(0,(nTraj*timeSeqInt-timeSeqInt),timeSeqInt)
    .map(function(dayOffset) {
      var stDate = stRunDate.advance(dayOffset,byTimeUnit);
      var metDRes = getMetDRes(inMet,stDate,nStep,trajDir,
        stepSize,lenTimeStep, cadence);
      return getTraj(pt,metDRes,stDate,dayOffset,nStep,trajDir,metProj,metScale,lenTimeStep);
    });
  meanTimeStepsMonth = ee.FeatureCollection(meanTimeStepsMonth);
  var griddedTraj = meanTimeStepsMonth.reduceToImage(['trajNum'],'count')
    .reproject({crs:'EPSG:4326', scale: lat_m * 0.2})
    .selfMask();
  // wind arrows 
  var outputRegion = pt.geometry().buffer(lat_m * 20).bounds();
  var samplePts = ee.Image.random(0).multiply(1e5).toInt()
    .reduceToVectors({
      crs: 'EPSG:4326',
      scale: lat_m * 2.5,
      geometryType: 'centroid',
      geometry: outputRegion
    });
  var samplePtsLand = ee.Image.random(0).multiply(1e5).toInt()
    .reduceToVectors({
      crs: 'EPSG:4326',
      scale: lat_m,
      geometryType: 'centroid',
      geometry: outputRegion
        .intersection(basisRegions,1e5)
    });
  samplePts = samplePts.merge(samplePtsLand);
  var metPts = metMap.reduceRegions({
    collection: samplePts,
    reducer: ee.Reducer.mean().unweighted(),
    crs: metProj,
    scale: metScale
  }).select(['u','v']);
  var windArrows = metPts.map(makeArrowFromFeature);
  // Display maps:
  map.clear(); map.setOptions('Dark', {'Map':[],'Dark':baseMap.darkTheme}, ['Map','Dark']);
  map.setControlVisibility({layerList: false});
  map.centerObject(pt,initialZoom);
  map.addLayer(metMap.select('windSpeed'), {palette: colPals.SpectralFancy, min: 0, max: 10},
    'Wind Speed', true, 0.3);
  var windPanel = ui.Panel({
    widgets: [
      ui.Label('Map Layers',{fontWeight:'bold',fontSize:'16px',margin:'1px 3px 8px 3px'}),
      getLayerCheck('Point Source/Receptor', true, 3, ''),
      getLayerCheck('Trajectories', true, 2, ''),
      getLayerCheck('Trajectory Density', false, 1, ''),
      getLegend('1', colPals.Grays),
      getLayerCheck('Mean Wind Speed', true, 0, '(m/s)'),
      getLegend('10', colPals.SpectralFancy),
      getLayerCheck('Wind Arrows', true, 4, ''),
    ],
     style: {
      margin: '0px 0px 0px 0px',
      position: 'bottom-left'
    }});
  map.add(windPanel);
  map.addLayer(griddedTraj.divide(nTraj/100).selfMask(),
    {palette: colPals.Grays, min: 1, max: 100}, 'Trajectory Density', false, 0.85);
  map.addLayer(meanTimeStepsMonth.style({color: 'black', width: 0.85}),{},'Trajectories',true,0.7);
  map.addLayer(ee.FeatureCollection(pt).style({color: '#FF0000', pointShape: 'circle'}),
    {},'Point Location');
  map.addLayer(windArrows.style({color: '#FFF', width: 0.9}),{},'Wind Arrows',true,0.3);
  // update coordinates upon map click after first load
  map.onClick(function(coords) {
    pointSelectPanel.widgets().get(1).widgets().get(1).widgets().get(1).setValue(coords.lon);
    pointSelectPanel.widgets().get(1).widgets().get(1).widgets().get(3).setValue(coords.lat);
  });
});