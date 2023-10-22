var table = ee.FeatureCollection("users/zhanglu0008/1022"),
    table2 = ee.FeatureCollection("users/zhanglu0008/1023"),
    table3 = ee.FeatureCollection("users/zhanglu0008/1024"),
    table4 = ee.FeatureCollection("users/zhanglu0008/1025"),
    table5 = ee.FeatureCollection("users/zhanglu0008/1026"),
    imageVisParam2 = {"opacity":1,"bands":["VH"],"min":-21.39019012451172,"max":-11.225689888000488,"gamma":1},
    imageVisParam = {"opacity":1,"bands":["VH"],"min":-49.13162444114685,"max":3.1225459384918213,"gamma":1},
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[86.22653061478985, 42.47747603279103],
          [86.13314682572735, 42.3761079719013],
          [86.17709213822735, 42.29692711043528],
          [86.29244858353985, 42.29895863427623],
          [86.9598680171336, 42.27457602274159],
          [86.9818406733836, 42.32739308626291],
          [86.9433885249461, 42.418702522126544],
          [86.82528549760235, 42.45721553421287]]]);
var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(geometry)
    .filterDate('2017-11-01','2017-11-30')
    .filter(ee.Filter.eq('instrumentMode', 'IW'));
print('collection',collection);
var imagelist = collection.toList(collection.size());
print(imagelist);
var k = imagelist.size().getInfo();
print(k);
for(var j = 0; j < k; j++)
{
var ID = ee.Image(imagelist.get(j)).get('system:index');
print(ID);
var imageID ='COPERNICUS/S1_GRD/'+ ID.getInfo();
//print(imageID);
//var imageID = 'COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20171107T002242_20171107T002307_008168_00E6FF_43A3';
var imageVV = ee.Image(imageID).select(['VV']);
var imageVVdate = imageVV.get('system:index');
var imageVH = ee.Image(imageID).select(['VH']);
var imageVHdate = imageVH.get('system:index');
//print('imageVV',imageVV);
//print('imageVH',imageVH);
//Map.addLayer(image1,imageVisParam);
var tableall=table.merge(table2);
tableall=tableall.merge(table3);
tableall=tableall.merge(table4);
tableall=tableall.merge(table5);
Map.addLayer(tableall.draw({color: 'red', pointRadius: 2}), {}, 'Observations');
print(tableall);
var list = tableall.toList(tableall.size());
var buffer = function(f)
  {
  var g = ee.Feature(f).geometry().buffer(1000).bounds();
  return g;
  };
var buffer_list = list.map(buffer);
//print('buffer_list', buffer_list);
var n = buffer_list.size().getInfo();
//print ('n',n);
for (var i = 0; i < n; i++) 
{
var exportedVV = Export.image.toDrive({
  image:imageVV,
  description: ee.String(imageVVdate).getInfo() + "VV"+ee.Number(i+1).getInfo(),
  scale:5,
  folder:'BSTClipimages',
  region:buffer_list.get(i),
  maxPixels: 999999999999,
  });
}
var m = buffer_list.size().getInfo();
//print ('m',m);
 for (var i = 0; i < m; i++) 
 {
   var exportedVH = Export.image.toDrive({
       image:imageVH,
       description: ee.String(imageVHdate).getInfo()+"VH"+ee.Number(i+1).getInfo(),
       scale:5,
       folder:'BSTClipimages',
       region:buffer_list.get(i),
    maxPixels: 999999999999,
   });
 }
}