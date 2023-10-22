var END_TIME =  ee.Date(new Date());
var START_TIME =  END_TIME.advance(-2, 'day')
var TIME_ZONE = 'America/Los_Angeles';
var coll_16 = ee.ImageCollection('NOAA/GOES/16/FDCC')
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)).max()
var coll_17 = ee.ImageCollection('NOAA/GOES/17/FDCC')
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)).max()
  var palette = ['F6BDC0', 'F1959B', 'F07470', 'EA4C46', 'DC1C13']
var tempVis = {min:0, max:6000, palette: palette};
var powerVis = {min:0, max:2000, palette: palette};
Map.addLayer(coll_16.select('Temp'), tempVis, 'Fire temperature, GOES 16', false);
Map.addLayer(coll_17.select('Temp'), tempVis, 'Fire temperature, GOES 17', false);
Map.addLayer(coll_16.select('Power'), powerVis, 'Fire radiative power, GOES 16');
Map.addLayer(coll_17.select('Power'), powerVis, 'Fire radiative power, GOES 17');
Map.setCenter(-122.0448, 37.5105, 7)