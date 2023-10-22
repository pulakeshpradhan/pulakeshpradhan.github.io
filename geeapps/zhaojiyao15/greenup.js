var mcd12q2 = ui.import && ui.import("mcd12q2", "imageCollection", {
      "id": "MODIS/006/MCD12Q2"
    }) || ee.ImageCollection("MODIS/006/MCD12Q2");
var mcd2018 = mcd12q2.filter(ee.Filter.eq('system:index','2018_01_01')).first()
print(mcd2018)
var modis = ee.Image(ee.ImageCollection('MODIS/006/MOD13A1').first())
    .select('EVI');
// Get information about the MODIS projection.
var modisProjection = modis.projection();
var greenup1 = mcd2018.select('Greenup_1')
var greenup2 = mcd2018.select('Greenup_2')
var peak1 = mcd2018.select('Peak_1')
var peak2 = mcd2018.select('Peak_2')
var dormancy1 = mcd2018.select('Dormancy_1')
var dormancy2 = mcd2018.select('Dormancy_2')
var greenup1 = greenup1.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(greenup1)
var greenup2 = greenup2.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(greenup2)
var peak1 = peak1.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(peak1)
var peak2 = peak2.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(peak2)
var dormancy1 = dormancy1.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(dormancy1)
var dormancy2 = dormancy2.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort:true
    })
    // Request the data at the scale and projection of the MODIS image.
    .reproject({
      crs: modisProjection,
      scale:50000
    });
Map.addLayer(dormancy2)