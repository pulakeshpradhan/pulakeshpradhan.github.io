var Amazonia = ui.import && ui.import("Amazonia", "table", {
      "id": "users/nicolasalejandromari/Amazonia"
    }) || ee.FeatureCollection("users/nicolasalejandromari/Amazonia");
var dataset = ee.ImageCollection('FIRMS')
var fires = dataset.select('T21').map(function(image) {
      return image.clip(Amazonia);
    });
var fires = dataset.select('confidence').map(function(image) {
      return image.clip(Amazonia);
    });
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
var august2005 = fires.filterDate('2005-08-01', '2005-08-31')
var august2010 = fires.filterDate('2010-08-01', '2010-08-31')
var august2015 = fires.filterDate('2015-08-01', '2015-08-31')
var august2019Fires = fires.filterDate('2019-08-01', '2019-08-31')
Map.addLayer(Amazonia, {}, 'Frontera Amazónica')
Map.addLayer(august2019Fires, {palette: ['bd0026']}, 'Agosto 2019 Incendios');
Map.addLayer(august2015, {palette: ['f03b20']}, 'Agosto 2015 Incendios');
Map.addLayer(august2010, {palette: ['fd8d3c']}, 'Agosto 2010 Incendios');
Map.addLayer(august2005, {palette: ['fecc5c']}, 'Agosto 2005 Incendios');
var panel = ui.Panel()
panel.style().set({
  maxHeight: '700px',
  maxWidth: '450px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Aplicación de Mapeo de Incendios de Amazon',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'Utilice esta aplicación para mapear y trazar cambios en la extensión de los incendios forestales en la selva amazónica durante la última década y comparar la ubicación de los incendios forestales con la distribución de la deforestación en toda la región. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var amazonFiresText = ui.Label({
  value: 'Los siguientes mapas muestran la distribución de los incendios en la región amazónica durante el mes de agosto de 2005, 2010, 2015 y 2019. Los mapas se obtuvieron del conjunto de datos de MODIS FIRMS.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
  }
})
var checkBoundary = ui.Checkbox('Frontera Amazónica', true);
checkBoundary.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
checkBoundary.style().set({padding: '0px 0px 0px 8px'})
var check0 = ui.Checkbox('Agosto 2019 Incendios', true);
check0.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
check0.style().set({padding: '0px 0px 0px 8px'})
var check1 = ui.Checkbox('Agosto 2015 Incendios', true);
check1.onChange(function(checked) {
  Map.layers().get(2).setShown(checked);
});
check1.style().set({padding: '0px 0px 0px 8px'})
var check2 = ui.Checkbox('Agosto 2010 Incendios', true);
check2.onChange(function(checked) {
  Map.layers().get(3).setShown(checked);
});
check2.style().set({padding: '0px 0px 0px 8px'})
var check3 = ui.Checkbox('Agosto 2005 Incendios', true);
check3.onChange(function(checked) {
  Map.layers().get(4).setShown(checked);
});
check3.style().set({padding: '0px 0px 0px 8px'})
var hansenText = ui.Label({
  value: 'Este mapa muestra la distribución de la deforestación en la Amazonía entre 2000 y 2019. Considere la superposición espacial entre las regiones de deforestación y los puntos calientes de incendios. Los mapas fueron adquiridos del conjunto de datos de Hansen Global Forest Change v1.6. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
  }
})
var hansenForestChange = ee.Image('UMD/hansen/global_forest_change_2018_v1_6')
.select('loss').eq(1).selfMask().clip(Amazonia)
Map.addLayer(hansenForestChange, {palette: '00FFFF'}, 'Extensión de la deforestación 2000-2019')
var index4 = 4
var check4 = ui.Checkbox('Extensión de la deforestación 2000-2019', true);
check4.onChange(function(checked) {
  Map.layers().get(5).setShown(checked);
});
check4.style().set({padding: '0px 0px 0px 8px'})
panel.add(title)
panel.add(text)
panel.add(checkBoundary)
panel.add(amazonFiresText)
panel.add(check0)
panel.add(check1)
panel.add(check2)
panel.add(check3)
panel.add(hansenText)
panel.add(check4)
ui.root.insert(0, panel)
Map.setOptions('SATELLITE')
Map.setCenter(-62.488850181315456, -4.324040434577207, 6)
var hansen = ee.Image('UMD/hansen/global_forest_change_2018_v1_6')
// Filter Hansen's data by loss year
var loss2001 = hansen.select('lossyear').eq(1).selfMask()
var loss2002 = hansen.select('lossyear').eq(2).selfMask()
var loss2003 = hansen.select('lossyear').eq(3).selfMask()
var loss2004 = hansen.select('lossyear').eq(4).selfMask()
var loss2005 = hansen.select('lossyear').eq(5).selfMask()
var loss2006 = hansen.select('lossyear').eq(6).selfMask()
var loss2007 = hansen.select('lossyear').eq(7).selfMask()
var loss2008 = hansen.select('lossyear').eq(8).selfMask()
var loss2009 = hansen.select('lossyear').eq(9).selfMask()
var loss2010 = hansen.select('lossyear').eq(10).selfMask()
var loss2011 = hansen.select('lossyear').eq(11).selfMask()
var loss2012 = hansen.select('lossyear').eq(12).selfMask()
var loss2013 = hansen.select('lossyear').eq(13).selfMask()
var loss2014 = hansen.select('lossyear').eq(14).selfMask()
var loss2015 = hansen.select('lossyear').eq(15).selfMask()
var loss2016 = hansen.select('lossyear').eq(16).selfMask()
var loss2017 = hansen.select('lossyear').eq(17).selfMask()
var loss2018 = hansen.select('lossyear').eq(18).selfMask()
// ****FIRES*****
var dataset = ee.ImageCollection('FIRMS')
var fires = dataset.select('T21').map(function(image) {
      return image.clip(Amazonia);
    });
var august2001 = fires.filterDate('2001-08-01', '2001-08-31').mosaic()
var august2002 = fires.filterDate('2002-08-01', '2002-08-31').mosaic()
var august2003 = fires.filterDate('2003-08-01', '2003-08-31').mosaic()
var august2004 = fires.filterDate('2004-08-01', '2004-08-31').mosaic()
var august2005 = fires.filterDate('2005-08-01', '2005-08-31').mosaic()
var august2006 = fires.filterDate('2006-08-01', '2006-08-31').mosaic()
var august2007 = fires.filterDate('2007-08-01', '2007-08-31').mosaic()
var august2008 = fires.filterDate('2008-08-01', '2008-08-31').mosaic()
var august2009 = fires.filterDate('2009-08-01', '2009-08-31').mosaic()
var august2010 = fires.filterDate('2010-08-01', '2010-08-31').mosaic()
var august2011 = fires.filterDate('2011-08-01', '2011-08-31').mosaic()
var august2012 = fires.filterDate('2012-08-01', '2012-08-31').mosaic()
var august2013 = fires.filterDate('2013-08-01', '2013-08-31').mosaic()
var august2014 = fires.filterDate('2014-08-01', '2014-08-31').mosaic()
var august2015 = fires.filterDate('2015-08-01', '2015-08-31').mosaic()
var august2016 = fires.filterDate('2016-08-01', '2016-08-31').mosaic()
var august2017 = fires.filterDate('2017-08-01', '2017-08-31').mosaic()
var august2018 = fires.filterDate('2018-08-01', '2018-08-31').mosaic()
// ****FOREST LOSS DUE TO FOREST FIRES****
var allDeforestation = hansen.select('loss').eq(1).selfMask()
.focal_min(500, 'circle', 'meters')
var dRelatedAugust2001 = august2001.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2002 = august2002.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2003 = august2003.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2004 = august2004.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2005 = august2005.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2006 = august2006.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2007 = august2007.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2008 = august2008.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2009 = august2009.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2010 = august2010.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2011 = august2011.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2012 = august2012.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2013 = august2013.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2014 = august2014.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2015 = august2015.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2016 = august2016.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2017 = august2017.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2018 = august2018.updateMask(allDeforestation).gt(0).selfMask()
var dRelatedAugust2005 = ee.Image('users/lgoldberg8000/Deforestation_Related_Fires2005');
var dRelatedAugust2010 = ee.Image('users/lgoldberg8000/Deforestation_Related_Fires2010');
var dRelatedAugust2015 = ee.Image('users/lgoldberg8000/Deforestation_Related_Fires2015');
var dRelatedAugust2019 = ee.Image('users/lgoldberg8000/Deforestation_Related_Fires2019');
var feature = ee.Feature(Amazonia.first());
  var forestArea2001 = (dRelatedAugust2001.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
var forestArea2002 = (dRelatedAugust2002.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2003 = (dRelatedAugust2003.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2004 = (dRelatedAugust2004.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2005 = (dRelatedAugust2005.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2006 = (dRelatedAugust2006.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2007 = (dRelatedAugust2007.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2008 = (dRelatedAugust2008.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2009 = (dRelatedAugust2009.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2010 = (dRelatedAugust2010.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2011 = (dRelatedAugust2011.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2012 = (dRelatedAugust2012.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2013 = (dRelatedAugust2013.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2014 = (dRelatedAugust2014.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2015 = (dRelatedAugust2015.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2016 = (dRelatedAugust2016.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 1000,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
   var forestArea2017 = (dRelatedAugust2017.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 30,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
  var forestArea2018 = (dRelatedAugust2018.multiply(ee.Image.pixelArea())).reduceRegion({
    geometry: feature.geometry(),
    scale: 30,
    reducer: ee.Reducer.sum(),
    maxPixels: 1e13
  }).get('T21')
 feature= feature.set('2001', ee.Number(forestArea2001).divide(1e6))
                .set('2002', ee.Number(forestArea2002).divide(1e6))
                .set('2003', ee.Number(forestArea2003).divide(1e6))
                .set('2004', ee.Number(forestArea2004).divide(1e6))
                .set('2005', ee.Number(forestArea2005).divide(1e6))
                .set('2006', ee.Number(forestArea2006).divide(1e6))
                .set('2007', ee.Number(forestArea2007).divide(1e6))
                .set('2008', ee.Number(forestArea2008).divide(1e6))
                .set('2009', ee.Number(forestArea2009).divide(1e6))
                .set('2010', ee.Number(forestArea2010).divide(1e6))
                .set('2011', ee.Number(forestArea2011).divide(1e6))
                .set('2012', ee.Number(forestArea2012).divide(1e6))
                .set('2013', ee.Number(forestArea2013).divide(1e6))
                .set('2014', ee.Number(forestArea2014).divide(1e6))
                .set('2015', ee.Number(forestArea2015).divide(1e6))
                .set('2016', ee.Number(forestArea2016).divide(1e6))
                .set('2017', ee.Number(forestArea2017).divide(1e6))
                .set('2018', ee.Number(forestArea2018).divide(1e6))
print(feature, 'Amazonia')
var chart = ui.Chart.feature.byProperty(feature, ['2000', '2001', '2002', '2003', '2004', '2005', '2006', 
'2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'], ['Total'])
chart.setOptions({
  title: 'Total Forest Area over Time', 
  hAxis: {
    title: 'Year',
  },
  vAxis: {
    title: 'Forest Area (km^2)'
  }
})
// panel.add(chart)