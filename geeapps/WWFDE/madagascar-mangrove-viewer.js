var mada1995 = ee.Image("users/WWFDE/Madagascar/Mada_SR_1995_Comp"),
    mada2000 = ee.Image("users/WWFDE/Madagascar/Mada_SR_2000_Comp"),
    mada2010 = ee.Image("users/WWFDE/Madagascar/Mada_SR_2010_Comp"),
    mada2015 = ee.Image("users/WWFDE/Madagascar/Mada_SR_2015_Comp"),
    mada2018 = ee.Image("users/WWFDE/Madagascar/Mada_SR_2018_Comp"),
    point = /* color: #d63000 */ee.Geometry.Point([46.4038518135834, -15.878031351344687]),
    dem = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    mada2005 = ee.Image("users/WWFDE/Madagascar/Mada_SR_2005_Comp"),
    mang2000 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_2000"),
    mang2005 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_2005"),
    mang2010 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_2010"),
    mang2015 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_2015"),
    mang2018 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_2018"),
    viz1995 = {"opacity":1,"bands":["mangrove"],"palette":["ffb5a4"]},
    viz2000 = {"opacity":1,"bands":["mangrove"],"palette":["e06c52"]},
    viz2005 = {"opacity":1,"bands":["mangrove"],"palette":["e04637"]},
    viz2010 = {"opacity":1,"bands":["mangrove"],"palette":["b82a13"]},
    viz2015 = {"opacity":1,"bands":["mangrove"],"palette":["70190b"]},
    viz2018 = {"opacity":1,"bands":["mangrove"],"palette":["2a7013"]},
    mang1995 = ee.Image("users/WWFDE/Madagascar/Mada_mangroves_filt_1995"),
    anom = ee.Image("users/WWFDE/Madagascar/Mada_NDVI_Anomaly"),
    WDPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    bounds = ee.FeatureCollection("users/WWFDE/Madagascar/mada_mangrove_bounds");
var coords = point.coordinates()
print('coords', coords)
  var vizParamsFalse = {
      'min': 500,
      'max': 5000, 
      'bands': 'swir1,nir,red', 
      'gamma': 1.6
      };
var center = {lon: 46.35, lat: -15.893, zoom: 9};
print('center', center);
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(true);
//rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
//rightMap.setControlVisibility({zoomControl: true});
///////////////////////////////
//LEGEND
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var instructions = ui.Label({
  value: 'Move the slider to view differences between the left map (1995 image)',
  style: {
    //fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var instructions1 = ui.Label({
  value: 'and other layers. Use scroll to zoom.',
  style: {
    //fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var instructions2 = ui.Label({
  value: 'Activate right map data using the Layers box',
  style: {
    //fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Madagascar Mangrove Extent',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var dict = {
  '1995': 'ffb5a4',
  '2000': 'e06c52',
  '2005': 'b82a13',
  '2010': 'b82a13',
  '2015': '70190b',
  '2018': '2a7013'
}
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '9px',
      margin: '1 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//var legend = ui.Panel()
Object.keys(dict).map(function(key) {
  var value = dict[key]
  return legend.add(makeRow(value, key));
})
//print(legend)
// Add the legend to the map.
leftMap.add(legend);
legend.add(instructions)
legend.add(instructions1)
legend.add(instructions2)
/////////////////////////////////////////////////////////////////////////////
var land = dem.select('AVE').gte(1)
var mask = mada1995.neq(-32768)
var mada1995 = mada1995.mask(land)
var mada1995 = mada1995.updateMask(mask)
var mada2000 = mada2000.mask(land)
var mada2000 = mada2000.updateMask(mask)
var mada2005 = mada2005.mask(land)
var mada2005 = mada2005.updateMask(mask)
var mada2010 = mada2010.mask(land)
var mada2010 = mada2010.updateMask(mask)
var mada2015 = mada2015.mask(land)
var mada2015 = mada2015.updateMask(mask)
var mada2018 = mada2018.mask(land)
var mada2018 = mada2018.updateMask(mask)
//print(madaImageAll)
//print(madaImageCollection)
var madaImage1995 = ee.ImageCollection.fromImages([mada1995]);
var madaImage1995Coll = madaImage1995.mosaic();
var madaImage2000 = ee.ImageCollection.fromImages([mada2000]);
var madaImage2000Coll = madaImage2000.mosaic();
var madaImage2005 = ee.ImageCollection.fromImages([mada2005]);
var madaImage2005Coll = madaImage2005.mosaic();
var madaImage2010 = ee.ImageCollection.fromImages([mada2010]);
var madaImage2010Coll = madaImage2010.mosaic();
var madaImage2015 = ee.ImageCollection.fromImages([mada2015]);
var madaImage2015Coll = madaImage2015.mosaic();
var madaImage2018 = ee.ImageCollection.fromImages([mada2018]);
var madaImage2018Coll = madaImage2018.mosaic();
var madaAnom = ee.ImageCollection.fromImages([anom]);
var madaAnomColl = madaAnom.mosaic();
//print(madaMangCollection)
//print(madaMangAll)
var madaMang1995 = ee.ImageCollection.fromImages([mang1995]);
var mang1995Coll = madaMang1995.mosaic();
var madaMang2000 = ee.ImageCollection.fromImages([mang2000]);
var mang2000Coll = madaMang1995.mosaic();
var madaMang2005 = ee.ImageCollection.fromImages([mang2005]);
var mang2005Coll = madaMang2005.mosaic();
var madaMang2010 = ee.ImageCollection.fromImages([mang2010]);
var mang2010Coll = madaMang2010.mosaic();
var madaMang2015 = ee.ImageCollection.fromImages([mang2015]);
var mang2015Coll = madaMang2015.mosaic();
var madaMang2018 = ee.ImageCollection.fromImages([mang2018]);
var mang2018Coll = madaMang2018.mosaic();
//rightMap.addLayer(madaImageCollection.filterMetadata('id','equals','users/WWFDE/Madagascar/Mada_SR_2000_Comp'),vizParamsFalse, 'collection', true)
leftMap.addLayer(madaImage1995Coll,vizParamsFalse, 'Sat Image 1995', true)
//leftMap.addLayer(mada1995,vizParamsFalse, 'Image 1995', false)
//rightMap.addLayer(madaMang1995,vizParamsFalse, 'Image 1995', true)
//leftMap.addLayer(mada2000,vizParamsFalse, 'Image 2000', false)
rightMap.addLayer(madaImage2000Coll,vizParamsFalse, 'Sat Image 2000', false)
//leftMap.addLayer(mada2005,vizParamsFalse, 'Image 2005', false)
rightMap.addLayer(madaImage2005Coll,vizParamsFalse, 'Sat Image 2005', false)
//leftMap.addLayer(mada2010,vizParamsFalse, 'Image 2010', false)
rightMap.addLayer(madaImage2010Coll,vizParamsFalse, 'Sat Image 2010', false)
//leftMap.addLayer(mada2015,vizParamsFalse, 'Image 2015', false)
rightMap.addLayer(madaImage2015Coll,vizParamsFalse, 'Sat Image 2015', false)
//leftMap.addLayer(mada2018,vizParamsFalse, 'Image 2018')
rightMap.addLayer(madaImage2018Coll,vizParamsFalse, 'Sat Image 2018', true)
//leftMap.addLayer(anom,{min: -30, max: 70, palette: ['FF0000', '000000', '00FF00']}, 'NDVI Trend', false)
rightMap.addLayer(madaAnomColl,{min: -30, max: 70, palette: ['FF0000', '000000', '00FF00']}, 'NDVI Trend', false)
//leftMap.addLayer(mang1995,viz1995, 'Mangroves 1995')
//leftMap.addLayer(mang2000,viz2000, 'Mangroves 2000')
//leftMap.addLayer(mang2005,viz2005, 'Mangroves 2005')
//leftMap.addLayer(mang2010,viz2010, 'Mangroves 2010')
//leftMap.addLayer(mang2015,viz2015, 'Mangroves 2015')
//leftMap.addLayer(mang2018,viz2018, 'Mangroves 2018')
rightMap.addLayer(mang1995Coll,viz1995, 'Mangroves 1995', false)
rightMap.addLayer(mang2000Coll,viz2000, 'Mangroves 2000', false)
rightMap.addLayer(mang2005Coll,viz2005, 'Mangroves 2005', false)
rightMap.addLayer(mang2010Coll,viz2010, 'Mangroves 2010', false)
rightMap.addLayer(mang2015Coll,viz2015, 'Mangroves 2015', false)
rightMap.addLayer(mang2018Coll,viz2018, 'Mangroves 2018', true)
var WDPA = WDPA.filterBounds(bounds);
rightMap.addLayer(WDPA, {color: '42dcf4'}, 'Protected Areas', false)
//leftMap.addLayer(WDPA, {color: '42dcf4'}, 'Protected Areas', true)