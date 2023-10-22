var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -124.35749470875373,
                49.3269363202981
              ],
              [
                -124.35749470875373,
                21.373836697005704
              ],
              [
                -74.61140095875373,
                21.373836697005704
              ],
              [
                -74.61140095875373,
                49.3269363202981
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
      "mode": "FeatureCollection",
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-124.35749470875373, 49.3269363202981],
                  [-124.35749470875373, 21.373836697005704],
                  [-74.61140095875373, 21.373836697005704],
                  [-74.61140095875373, 49.3269363202981]]], null, false),
            {
              "system:index": "0"
            })]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection([]);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2001-01-01', '2001-12-31'))
                  .first();
var cropLandcover = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2002-01-01', '2002-12-31'))
                  .first();
var cropLandcover1 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2003-01-01', '2003-12-31'))
                  .first();
var cropLandcover2 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2004-01-01', '2004-12-31'))
                  .first();
var cropLandcover3 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2005-01-01', '2005-12-31'))
                  .first();
var cropLandcover4 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2006-01-01', '2006-12-31'))
                  .first();
var cropLandcover5 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2007-01-01', '2007-12-31'))
                  .first();
var cropLandcover6 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2008-01-01', '2008-12-31'))
                  .first();
var cropLandcover7 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2009-01-01', '2009-12-31'))
                  .first();
var cropLandcover8 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2010-01-01', '2010-12-31'))
                  .first();
var cropLandcover9 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2011-01-01', '2012-12-31'))
                  .first();
var cropLandcover10 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2012-01-01', '2012-12-31'))
                  .first();
var cropLandcover11 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2013-01-01', '2013-12-31'))
                  .first();
var cropLandcover12 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2014-01-01', '2014-12-31'))
                  .first();
var cropLandcover13 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
                  .first();
var cropLandcover14 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2016-01-01', '2016-12-31'))
                  .first();
var cropLandcover15 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2017-01-01', '2017-12-31'))
                  .first();
var cropLandcover16 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2018-01-01', '2018-12-31'))
                  .first();
var cropLandcover17 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
                  .first();
var cropLandcover18 = dataset.select('cropland').clip(geometry);
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-31'))
                  .first();
var cropLandcover19 = dataset.select('cropland').clip(geometry);
Map.setCenter(-92.25, 41.58, 4);
Map.addLayer(cropLandcover, {}, '2001');
Map.addLayer(cropLandcover1, {}, '2002');
Map.addLayer(cropLandcover2, {}, '2003');
Map.addLayer(cropLandcover3, {}, '2004');
Map.addLayer(cropLandcover4, {}, '2005');
Map.addLayer(cropLandcover5, {}, '2006');
Map.addLayer(cropLandcover6, {}, '2007');
Map.addLayer(cropLandcover7, {}, '2008');
Map.addLayer(cropLandcover8, {}, '2009');
Map.addLayer(cropLandcover9, {}, '2010');
Map.addLayer(cropLandcover10, {}, '2011');
Map.addLayer(cropLandcover11, {}, '2012');
Map.addLayer(cropLandcover12, {}, '2013');
Map.addLayer(cropLandcover13, {}, '2014');
Map.addLayer(cropLandcover14, {}, '2015');
Map.addLayer(cropLandcover15, {}, '2016');
Map.addLayer(cropLandcover16, {}, '2017');
Map.addLayer(cropLandcover17, {}, '2018');
Map.addLayer(cropLandcover18, {}, '2019');
Map.addLayer(cropLandcover19, {}, '2020');