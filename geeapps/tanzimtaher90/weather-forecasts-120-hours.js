var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    dhaka = ui.import && ui.import("dhaka", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            90.4238703859857,
            23.789702456328673
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([90.4238703859857, 23.789702456328673]);
// initialize points of different locations of interest
var kurigram = ee.Geometry.Point(89.619278, 25.811063);
var noonkhawa = ee.Geometry.Point(89.745156, 25.885547);
var mogalbasa = ee.Geometry.Point(89.655839, 25.768529);
var ghogadaha = ee.Geometry.Point(89.424167, 25.845588);
var borobari = ee.Geometry.Point(89.522545, 25.876279);
var panchagram = ee.Geometry.Point(89.502100, 25.839044);
var aditmari = ee.Geometry.Point(89.34519, 25.922187);
// Only change the values inside the block below:
//////////////////////////////////////////////////////////
var aoi = dhaka;
var forecast_hours = 24;
var forecast_hours_string = '024';
//////////////////////////////////////////////////////////
// create start date and end dates
var start_date = ee.Date('2020-09-28');
var end_date = start_date.advance(1, 'days');
////////////////////////////////////////////////////////////
// Temperature
// query temperature forecast data from NOAA's GFS collection
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(start_date, end_date))
                  .select('temperature_2m_above_ground')
                  .filterMetadata('forecast_hours', 'equals', forecast_hours);
// print dataset to check
print('120-hour temperture forecast', dataset);
// temperature image in the morning
var forecast06 = dataset.filterMetadata('system:index', 'ends_with', '06F' + forecast_hours_string).first();
//print(temperature06);
// temperature image in the afternoon
var forecast12 = dataset.filterMetadata('system:index', 'ends_with', '12F' + forecast_hours_string).first();
//print(temperature12);
// temperature image in the evening
var forecast18 = dataset.filterMetadata('system:index', 'ends_with', '18F' + forecast_hours_string).first();
//print(temperature18);
// temperature image at night
var forecast00 = dataset.filterMetadata('system:index', 'ends_with', '00F' + forecast_hours_string).first();
//print(temperature00);
var summaryScale = 611;
var getSummary = function(img, geom, scale) {
  return img.reduceRegion({
   reducer: ee.Reducer.max(),
   geometry: geom,
   scale: scale
  });
};
var morning = getSummary(forecast06, aoi, summaryScale).toArray();
//print(morning);
var afternoon = getSummary(forecast12, aoi, summaryScale).toArray();
//print(afternoon);
var evening = getSummary(forecast18, aoi, summaryScale).toArray();
//print(evening);
var night = getSummary(forecast00, aoi, summaryScale).toArray();
//print(night);
// Concatenate the arrays
var finalArray = [['night', 'morning', 'afternoon', 'evening'], [night, morning, afternoon, evening]];
print('120-hour temperture forecast', finalArray);
///////////////////////////////////////////////////////////
// indicate line break
print('****************************************************');
//Relative Humidity
// query humidity forecast data from NOAA's GFS collection
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(start_date, end_date))
                  .select('relative_humidity_2m_above_ground')
                  .filterMetadata('forecast_hours', 'equals', forecast_hours);
// print dataset to check
print('120-hour relative humidity forecast', dataset);
// temperature image in the morning
var forecast06 = dataset.filterMetadata('system:index', 'ends_with', '06F' + forecast_hours_string).first();
//print(temperature06);
// temperature image in the afternoon
var forecast12 = dataset.filterMetadata('system:index', 'ends_with', '12F' + forecast_hours_string).first();
//print(temperature12);
// temperature image in the evening
var forecast18 = dataset.filterMetadata('system:index', 'ends_with', '18F' + forecast_hours_string).first();
//print(temperature18);
// temperature image at night
var forecast00 = dataset.filterMetadata('system:index', 'ends_with', '00F' + forecast_hours_string).first();
//print(temperature00);
var summaryScale = 611;
var getSummary = function(img, geom, scale) {
  return img.reduceRegion({
   reducer: ee.Reducer.max(),
   geometry: geom,
   scale: scale
  });
};
var morning = getSummary(forecast06, aoi, summaryScale).toArray();
//print(morning);
var afternoon = getSummary(forecast12, aoi, summaryScale).toArray();
//print(afternoon);
var evening = getSummary(forecast18, aoi, summaryScale).toArray();
//print(evening);
var night = getSummary(forecast00, aoi, summaryScale).toArray();
//print(night);
// Concatenate the arrays
var finalArray = [['night', 'morning', 'afternoon', 'evening'], [night, morning, afternoon, evening]];
print('120-hour relative humidity forecast', finalArray);
//////////////////////////////////////////////////////
// indicate line break
print('****************************************************');
// Total Precipitable Water
// query total precipitable water forecast data from NOAA's GFS collection
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(start_date, end_date))
                  .select('precipitable_water_entire_atmosphere')
                  .filterMetadata('forecast_hours', 'equals', forecast_hours);
// print dataset to check
print('120-hour total precipitable water in atmosphere forecast', dataset);
// temperature image in the morning
var forecast06 = dataset.filterMetadata('system:index', 'ends_with', '06F' + forecast_hours_string).first();
//print(temperature06);
// temperature image in the afternoon
var forecast12 = dataset.filterMetadata('system:index', 'ends_with', '12F' + forecast_hours_string).first();
//print(temperature12);
// temperature image in the evening
var forecast18 = dataset.filterMetadata('system:index', 'ends_with', '18F' + forecast_hours_string).first();
//print(temperature18);
// temperature image at night
var forecast00 = dataset.filterMetadata('system:index', 'ends_with', '00F' + forecast_hours_string).first();
//print(temperature00);
var summaryScale = 611;
var getSummary = function(img, geom, scale) {
  return img.reduceRegion({
   reducer: ee.Reducer.max(),
   geometry: geom,
   scale: scale
  });
};
var morning = getSummary(forecast06, aoi, summaryScale).toArray();
//print(morning);
var afternoon = getSummary(forecast12, aoi, summaryScale).toArray();
//print(afternoon);
var evening = getSummary(forecast18, aoi, summaryScale).toArray();
//print(evening);
var night = getSummary(forecast00, aoi, summaryScale).toArray();
//print(night);
// Concatenate the arrays
var finalArray = [['night', 'morning', 'afternoon', 'evening'], [night, morning, afternoon, evening]];
print('120-hour total precipitable water in atmosphere forecast', finalArray);
/////////////////////////////////////////////////////
// indicate line break
print('****************************************************');
// Cumulative Precipitation
// query cumulative precipitation forecast data from NOAA's GFS collection
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(start_date, end_date))
                  .select('total_precipitation_surface')
                  .filterMetadata('forecast_hours', 'equals', forecast_hours);
// print dataset to check
print('120-hour cumulative precipitation forecast', dataset);
// temperature image in the morning
var forecast06 = dataset.filterMetadata('system:index', 'ends_with', '06F' + forecast_hours_string).first();
//print(temperature06);
// temperature image in the afternoon
var forecast12 = dataset.filterMetadata('system:index', 'ends_with', '12F' + forecast_hours_string).first();
//print(temperature12);
// temperature image in the evening
var forecast18 = dataset.filterMetadata('system:index', 'ends_with', '18F' + forecast_hours_string).first();
//print(temperature18);
// temperature image at night
var forecast00 = dataset.filterMetadata('system:index', 'ends_with', '00F' + forecast_hours_string).first();
//print(temperature00);
var summaryScale = 611;
var getSummary = function(img, geom, scale) {
  return img.reduceRegion({
   reducer: ee.Reducer.max(),
   geometry: geom,
   scale: scale
  });
};
var morning = getSummary(forecast06, aoi, summaryScale).toArray();
//print(morning);
var afternoon = getSummary(forecast12, aoi, summaryScale).toArray();
//print(afternoon);
var evening = getSummary(forecast18, aoi, summaryScale).toArray();
//print(evening);
var night = getSummary(forecast00, aoi, summaryScale).toArray();
//print(night);
// Concatenate the arrays
var finalArray = [['night', 'morning', 'afternoon', 'evening'], [night, morning, afternoon, evening]];
print('120-hour cumulative precipitation forecast', finalArray);
///////////////////////////////////////////////////
// indicate line break
print('****************************************************');
// Cloud Cover
// query cloud cover percentage forecast data from NOAA's GFS collection
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(start_date, end_date))
                  .select('total_cloud_cover_entire_atmosphere')
                  .filterMetadata('forecast_hours', 'equals', forecast_hours);
// print dataset to check
print('120-hour cloud cover percentage forecast', dataset);
// temperature image in the morning
var forecast06 = dataset.filterMetadata('system:index', 'ends_with', '06F' + forecast_hours_string).first();
//print(temperature06);
// temperature image in the afternoon
var forecast12 = dataset.filterMetadata('system:index', 'ends_with', '12F' + forecast_hours_string).first();
//print(temperature12);
// temperature image in the evening
var forecast18 = dataset.filterMetadata('system:index', 'ends_with', '18F' + forecast_hours_string).first();
//print(temperature18);
// temperature image at night
var forecast00 = dataset.filterMetadata('system:index', 'ends_with', '00F' + forecast_hours_string).first();
//print(temperature00);
var summaryScale = 611;
var getSummary = function(img, geom, scale) {
  return img.reduceRegion({
   reducer: ee.Reducer.max(),
   geometry: geom,
   scale: scale
  });
};
var morning = getSummary(forecast06, aoi, summaryScale).toArray();
//print(morning);
var afternoon = getSummary(forecast12, aoi, summaryScale).toArray();
//print(afternoon);
var evening = getSummary(forecast18, aoi, summaryScale).toArray();
//print(evening);
var night = getSummary(forecast00, aoi, summaryScale).toArray();
//print(night);
// Concatenate the arrays
var finalArray = [['night', 'morning', 'afternoon', 'evening'], [night, morning, afternoon, evening]];
print('120-hour cloud cover percentage forecast', finalArray);