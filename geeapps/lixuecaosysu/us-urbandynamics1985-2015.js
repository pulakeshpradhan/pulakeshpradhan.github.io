var maskRegions = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.47630751005863, 25.83373727304608],
                  [-80.4855772244141, 25.830338093539158],
                  [-80.49519026152348, 25.767281081217714],
                  [-80.4965635525391, 25.760788014461053],
                  [-80.4745908962891, 25.76233401494855]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.4970200593952, 25.759859054865714],
                  [-80.50525980548895, 25.75313366589309],
                  [-80.50131159381903, 25.72808404008098],
                  [-80.44886904315985, 25.728393326908666],
                  [-80.45058565692938, 25.760013657030004],
                  [-80.45273142414129, 25.760786664831755]]]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.45092897968328, 25.77207200554989],
                  [-80.47315912799871, 25.76689324952986],
                  [-80.47350245075262, 25.761636967600822],
                  [-80.44912653522528, 25.762332665336835]]]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.43453531818426, 25.782351553124702],
                  [-80.44766741352117, 25.781655972738992],
                  [-80.44723826007879, 25.772535763721],
                  [-80.43410616474188, 25.7729222274791],
                  [-80.43384867267645, 25.780110223945144]]]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.43328948574458, 25.95272612454251],
                  [-80.44393249111567, 25.951336964007705],
                  [-80.48392959194575, 25.905485474170938],
                  [-80.4782647665063, 25.89359513970231],
                  [-80.46041198330317, 25.901933941319662],
                  [-80.43458349813142, 25.912350721264],
                  [-80.43475515950837, 25.92624618685436]]]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-80.29860084490605, 26.231701384783563],
                  [-80.30958717303105, 26.223694011322237],
                  [-80.31645362810917, 26.18488124074856],
                  [-80.37138526873417, 26.159615188088644],
                  [-80.36417549090214, 26.137425848006995],
                  [-80.32709663348027, 26.16516186380705],
                  [-80.29825752215214, 26.191350934337446]]]),
            {
              "system:index": "5"
            })]);
//  This script uses to count the urban area over a given zone 
//  Author: lixuecaosysu@gmail.com
//  ###### Load US state layer ######
//  --------------------------------------------------------------
var usState = ee.FeatureCollection('users/lixuecaosysu/FusionTables/US/US_States');
// var abbState = usState.aggregate_histogram('abbState'); 
// var abbState = ee.Dictionary(abbState).keys(); print(abbState, 'abbState')
// var stateLen = abbState.length().getInfo(); 
Map.setOptions('SATELLITE');
var roi = ee.Geometry.Point([-93.73008505167252,41.611737393128394]); 
Map.centerObject(roi, 10); 
//  --------------------------------------------------------------
//  ###### Load and visualize the result ######
//  --------------------------------------------------------------
//  Load NLCD 1992, 2001, 2011 and chanage layer 1985-1992, 2011-2015
var nlcd2001 = ee.Image('USGS/NLCD/NLCD2001').select('landcover');
var nlcd2011 = ee.Image('USGS/NLCD/NLCD2011').select('landcover');
var urban1992 = ee.Image('users/lixuecaosysu/US_UrbanTrender/NLCD_urban_1992');
var urban2001 = nlcd2001.gt(21).add(nlcd2001.lt(30)).eq(2);  //Map.addLayer(urban2001.updateMask(urban2001), {}, 'urban2001', false); 
var urban2011 = nlcd2011.gt(21).add(nlcd2011.lt(30)).eq(2);  //Map.addLayer(urban2011.updateMask(urban2011), {}, 'urban2011', false); 
//  ###### Load the ImageCollection in Asset ######
var urban_b1992 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/UrbanTS_1985_1992').mosaic();
var urban_b2001 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/UrbanTS_1992_2001').mosaic();
var urban_b2011 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/UrbanTS_2001_2011').mosaic();
var urban_b2015 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/UrbanTS_2011_2016').mosaic();
//  ###### Load CVA image collection #####
var change8592 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/ChangeCVA_1985_1992').mosaic();
var change9201 = urban1992.eq(0).add(urban2001.eq(1)).eq(2); 
var change0111 = urban2001.eq(0).add(urban2011.eq(1)).eq(2);
var change1115 = ee.ImageCollection('users/lixuecaosysu/US_UrbanTrender/ChangeCVA_2011_2016').mosaic();
//  ###### Get period-based change information ######
var urban1985 = urban1992.eq(1).add(change8592.unmask().eq(0)).eq(2).rename('y1985').uint8();
var urban_b1992 = urban_b1992.updateMask(change8592);  
var urban_b2015 = urban_b2015.updateMask(change1115); 
var selImg = ee.ImageCollection.fromImages([urban_b1992, urban_b2001, urban_b2011, urban_b2015]).mosaic(); 
var selImg = selImg.addBands(urban1985); 
// //  ###### For zonal statistics, mask road-induced change using VIIRS NTL images ######
var ntlMask = ee.Image('users/lixuecaosysu/US_UrbanTrender/DNB_urbanClusters/us_urban_VIIRS_2017_allClusters');
var ntlMask = ntlMask.updateMask(ntlMask.gt(0)); 
var selImg = selImg.updateMask(ntlMask); 
//  ###### Elicit each variable
var P2 = selImg.select('P2');
var y1985 = selImg.select('y1985'); 
//  *** use y1985 to update P2
var P2 = P2.updateMask(y1985.unmask().eq(0)); 
//  ###### Mask region with obvious errors   
var maskRegions = maskRegions.map(function(feature){
  return feature.set('type', 1);
}); 
var maskLayer = maskRegions.reduceToImage({
  properties: ['type'],
  reducer: ee.Reducer.first(),
}).unmask().clipToCollection(usState);
var P2 = P2.multiply(ee.Image(1).subtract(maskLayer)).clipToCollection(usState); 
var P2 = P2.updateMask(P2); 
//  ###### Visualize ######
var yearVis = {opacity:1,min:1986,max:2015,palette:["0b7bf0","53b4e3","28bb62","89ed83","cbb35c","ffd560","ffc1a4","ffab83","ff5034", "c5110d"]};
Map.addLayer(y1985.updateMask(y1985), {min:0, max:1, opacity: 0.5, palette: '#D3D3D3'}, 'y1985');
Map.addLayer(P2, yearVis, 'changeYear');
//  --------------------------------------------------------------
//  ###### Add legned on the map ######
//  ------------------------------------------------------------------------------
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Year Information',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.clear();
legend.add(legendTitle);
//  *** add entries on the legend
var colors = ['d3d3d3', '0b7bf0','53b4e3','28bb62','89ed83','cbb35c','ffd560','ffc1a4','ffab83','ff5034', 'c5110d'];
var names = ['1985', '1988', '1991', '1994', '1997', '2000', '2003', '2006', '2009', '2012','2015'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<11; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------
// //  ###### Export to assets ######
// //  ------------------------------------------------------------------------------
// var exportname = 'US_Urban_1985_2015';
// var outImg = ee.Image(y1985.updateMask(y1985)).addBands(P2); print(outImg, 'outImg');
// Export.image.toAsset({
//   image: outImg.set({'yearStart': 1985, 'yearEnd':2015}), 
//   description: exportname, 
//   assetId: 'users/lixuecaosysu/UrbanProduct/'+exportname, 
//   region: nlcd2001.geometry(), 
//   scale:30, 
//   maxPixels:1e13})
// //  ------------------------------------------------------------------------------