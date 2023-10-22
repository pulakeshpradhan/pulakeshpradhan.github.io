//  This script uses to calcualte the building height from GEE 
//  Author: lixuecaosysu@gmail.com 
//  ###### Initial Setting of the map ######
//  ---------------------------------------------------------------------------------
Map.setOptions('SATELLITE');
var roi = ee.Geometry.Point([116.40611500470254,39.91358980867654]); 
Map.centerObject(roi, 10); 
//  ---------------------------------------------------------------------------------
//  ###### Define region and load aggregated DBs ######
//  ---------------------------------------------------------------------------------
var selCol = ee.ImageCollection('users/lixuecaosysu/Building_Height/gPredHeight_100')
               .filter(ee.Filter.eq('type', 'dBs'))
var selImg = ee.Image(selCol.mosaic()).float().divide(100);
//  ---------------------------------------------------------------------------------
//  ###### Calcualte the building height ######
//  ---------------------------------------------------------------------------------
var vvh = selImg.expression('b(0)*(5**(b(1)))').rename('vvh').float();  //  new calculation of VVH
/* Model: us & europe combined city: 500m : (-1.7033)*x^(-0.5179)+(4.2246) */
var predHei_log = vvh.expression('(-1.7033)*(b(0)**(-0.5179))+(4.2246)');   /* 500m - model */
var predHei = ee.Image(2.718).pow(predHei_log).rename('predHei')
                    // .reproject({crs: 'EPSG:4326', scale: 100}); 
//  ---------------------------------------------------------------------------------
//  ###### Added Referrred height data ######
//  ---------------------------------------------------------------------------------
//  *** combine two datasets (from Lidar and stereo image; unit: meter)
var LiDAR_Height_Col = ee.ImageCollection('users/lixuecaosysu/Building_Height/LiDAR_Height_Col')
                        .filter(ee.Filter.eq('resolution', 100))
                        .map(function(image){
                          return image.rename('b0').float(); 
                        });
var Stereo_Height_Col = ee.ImageCollection('users/lixuecaosysu/Building_Height/stereo_Height_Col')
                        .filter(ee.Filter.eq('resolution', 100));
var Refer_Height_Col = LiDAR_Height_Col.merge(Stereo_Height_Col)
var LiDAR_Height = Refer_Height_Col.mosaic(); 
//  ---------------------------------------------------------------------------------
//  ###### Added ALOS data ######
//  ---------------------------------------------------------------------------------
var AW3D30 = ee.Image('JAXA/ALOS/AW3D30_V1_1').select('AVE').float();
var SRTM = ee.Image('USGS/SRTMGL1_003').float();
var ALOS_Height = AW3D30.subtract(SRTM); 
//  ---------------------------------------------------------------------------------
//  ###### Added Building floor ######
//  ---------------------------------------------------------------------------------
var CHN_Floor = ee.ImageCollection('users/lixuecaosysu/Building_Height/China_floor')
                  .mosaic();
//  ---------------------------------------------------------------------------------
//  ###### Added IceSat data ######
//  ---------------------------------------------------------------------------------
var icesatPoints = ee.FeatureCollection('users/lixuecaosysu/Building_Height/GHAS14_IceSat_Urban_add_meanHei_energy')
                    // .filter(ee.Filter.gt('gautEnergy', 0.5))
                     .map(function(feature){
                       return feature.buffer(35); 
                     });
//  *** vector to raster 
var iceSatHei_mean = icesatPoints.reduceToImage({
  properties: ['gauMeanHei'],
  reducer: ee.Reducer.first(), 
});
//  ---------------------------------------------------------------------------------
//  ###### Visualize the mapped building heights ######
//  ---------------------------------------------------------------------------------
Map.addLayer(ee.Image(1), {palette: '#000000', opacity: 0.8}, 'background');  
Map.addLayer(selImg, {}, 'db_raw', false); 
var heightPalette = ['000000','1593ff','21c1ff','feffcc','ffec91','ffec91','ffd371','ffbd6b','ff7e40','ff250f'];
var option = {min:0, max:15, opacity: 0.5, palette:heightPalette};
var option2 = {min:0, max:10, opacity: 1, palette:heightPalette};
var option3 = {min:0, max:15, opacity: 1, palette:heightPalette};
Map.addLayer(predHei, option, 'predHeight(m)');
Map.addLayer(LiDAR_Height, option, 'lidarHeight(m)', false);
Map.addLayer(ALOS_Height.updateMask(predHei.gt(0)), option, 'alosHeight(m)', false);
Map.addLayer(CHN_Floor, option2, 'buildFllor', false);
Map.addLayer(iceSatHei_mean, option3, 'iceSatHeight(m)');
//  ---------------------------------------------------------------------------------
//  ###### Add legned on the map ######
//  ------------------------------------------------------------------------------
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Height(m)',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.clear();
legend.add(legendTitle);
//  *** add entries on the legend
var colors = ['000000','1593ff','feffcc','ffec91','ffd371','ff7e40','ff250f'];
var names = ['non-urban', '1m', '3m', '6m', '9m', '13m','15m'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<7; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------