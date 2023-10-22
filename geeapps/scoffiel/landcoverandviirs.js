// California outline ------------------------------------------
var states = ee.FeatureCollection('TIGER/2016/States');
var cali = states.filter(ee.Filter.eq('NAME', 'California'));
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cali,
  color: 1,
  width: 3
});
Map.setCenter(-121, 37.5010, 7);
//Map.addLayer(outline, {palette: '000000'}, 'California outline');
//land cover MODIS ----------------------------------------------
/*
var modis = ee.Image("MODIS/006/MCD12Q1/2016_01_01");
var modis1 = modis.select('LC_Type1');
print(modis);
var modisVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ]};
Map.setCenter(-115, 38, 6);
Map.addLayer(modis1, modisVis, 'MODIS Land Cover');
//MODIS legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'MODIS MCD12Q1 Type1 (500m)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
var palette =[
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ];
var names = ['Evergreen Needleleaf Forests',
'Evergreen Broadleaf Forests',
'Deciduous Needleleaf Forests',
'Deciduous Broadleaf Forests',
'Mixed Forests',
'Closed Shrublands',
'Open Shrublands',
'Woody Savannas: tree cover',
'Savannas',
'Grasslands',
'Permanent Wetlands',
'Croplands',
'Urban and Built-up Lands',
'Cropland/Natural Vegetation Mosaics',
'Permanent Snow and Ice',
'Barren',
'Water Bodies'];
for (var i = 0; i < 17; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
*/
//land cover NLCD --------------------------------------------------
var nlcd = ee.Image('USGS/NLCD/NLCD2016');
var nlcd = nlcd.select('landcover');
print(nlcd);
var nlcdVis = {
  min: 0.0,
  max: 95.0,
  palette: [
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '466b9f',
    'd1def8',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dec5c5',
    'd99282',
    'eb0000',
    'ab0000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b3ac9f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '68ab5f',
    '1c5f2c',
    'b5c58f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'af963c',
    'ccb879',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dfdfc2',
    'd1d182',
    'a3cc51',
    '82ba9e',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dcd939',
    'ab6c28',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b8d9eb',
    '000000',
    '000000',
    '000000',
    '000000',
    '6c9fb8'
  ],
};
nlcd = nlcd.clip(cali);
//Map.addLayer(nlcd, nlcdVis, 'NLCD raw');
//NLCD legend
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legend2Title = ui.Label({
  value: 'NLCD (raw, 30m)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend2.add(legend2Title);
// Creates and styles 1 row of the legend.
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
var palette = [
    '466b9f',
    'd1def8',
    'dec5c5',
    'd99282',
    'eb0000',
    'ab0000',
    'b3ac9f',
    '68ab5f',
    '1c5f2c',
    'b5c58f',
    'af963c',
    'ccb879',
    'dfdfc2',
    'd1d182',
    'a3cc51',
    '82ba9e',
    'dcd939',
    'ab6c28',
    'b8d9eb',
    '6c9fb8'
  ];
var names = ['Open water',
'Perennial ice/snow',
'Developed, open space',
'Developed, low intensity',
'Developed, medium intensity',
'Developed high intensity',
'Barren land (rock/sand/clay)',
'Deciduous forest',
'Evergreen forest',
'Mixed forest',
'Dwarf scrub',
'Shrub/scrub',
'Grassland/herbaceous',
'Sedge/herbaceous',
'Lichens',
'Moss',
'Pasture/hay',
'Cultivated crops',
'Woody wetlands',
'Emergent herbaceous wetlands']
for (var i = 0; i < 20; i++) {
  legend2.add(makeRow(palette[i], names[i]));
  }  
//Map.add(legend2);
//Simplify NLCD into 7 classes ------------------------------------------
/*
New classes:
urban 23
ag 82
forest 42
shrub 52
grass 71
barren 31
water 11
*/
var simplified = nlcd.select(['landcover']).remap(
    [11,12,21,22,23,24,31,41,42,43,51,52,71,72,73,74,81,82,90,95],
    [11,11,23,23,23,23,31,42,42,42,52,52,71,71,71,71,82,82,11,11]);
//Map.addLayer(simplified, nlcdVis, 'NLCD simplified');
//NLCD simplified legend
var legend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legend3Title = ui.Label({
  value: 'NLCD simplified',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend3.add(legend3Title);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
var palette = ['466b9f','eb0000','b3ac9f','1c5f2c','ccb879','dfdfc2','ab6c28'];
var names = ['Water','Urban','Barren','Forest','Shrub','Grassland','Agriculture'];
for (var i = 0; i < 7; i++) {
  legend3.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend3);
//reproject to EPSG:5070 at 510m ----------------------------------------------------------------
print('Projection, crs, and crs_transform:', simplified.projection());
print('Scale in meters:', simplified.projection().nominalScale());
var proj = ee.Projection('EPSG:5070');
var rescaled = simplified
    .reduceResolution({
      reducer: ee.Reducer.mode(),
      maxPixels: 1024,
      bestEffort:true,
    }).reproject({
      crs: proj, scale:510});
//Map.addLayer(rescaled, nlcdVis, 'NLCD rescaled'); //Too big to map. Export first either to Drive or Assets
/*
Export.image.toAsset({
  image: rescaled,
  description:'nlcd_510m_asset',
  scale:510});
Export.image.toDrive({
  image: rescaled,
  description: 'nlcd_510m',
  region: cali,
  maxPixels: 1e10,
  crs:'EPSG:5070'
});
*/
var rescaled = ee.Image('users/scoffiel/nlcd_510m_asset');
Map.addLayer(rescaled, nlcdVis, 'NLCD land cover 510m');
var viirs = ee.FeatureCollection("users/scoffiel/viirs2012-2019");
Map.addLayer(viirs.draw({color: '000000', pointRadius: 1}), {}, 'VIIRS 2012-2019');