var geometry_roi = ui.import && ui.import("geometry_roi", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    img_malaysia = ui.import && ui.import("img_malaysia", "image", {
      "id": "users/rudiyanto/modis_malaysia/img_product_malaysia"
    }) || ee.Image("users/rudiyanto/modis_malaysia/img_product_malaysia"),
    img_vietnam = ui.import && ui.import("img_vietnam", "image", {
      "id": "users/rudiyanto/modis_vietnam/img_product_vietnam"
    }) || ee.Image("users/rudiyanto/modis_vietnam/img_product_vietnam"),
    img_philippines = ui.import && ui.import("img_philippines", "image", {
      "id": "users/rudiyanto/modis_philippines/img_product_philippines"
    }) || ee.Image("users/rudiyanto/modis_philippines/img_product_philippines"),
    img_indonesia = ui.import && ui.import("img_indonesia", "image", {
      "id": "users/rudiyanto/modis_indonesia/img_product_indonesia3"
    }) || ee.Image("users/rudiyanto/modis_indonesia/img_product_indonesia3"),
    img_cambodia = ui.import && ui.import("img_cambodia", "image", {
      "id": "users/rudiyanto/modis_cambodia/img_product_cambodia"
    }) || ee.Image("users/rudiyanto/modis_cambodia/img_product_cambodia"),
    img_japan = ui.import && ui.import("img_japan", "image", {
      "id": "users/rudiyanto/modis_japan/img_product_japan"
    }) || ee.Image("users/rudiyanto/modis_japan/img_product_japan"),
    img_japan1 = ui.import && ui.import("img_japan1", "image", {
      "id": "users/rudiyanto/modis_japan/img_product_japan1"
    }) || ee.Image("users/rudiyanto/modis_japan/img_product_japan1"),
    img_myanmar = ui.import && ui.import("img_myanmar", "image", {
      "id": "users/rudiyanto/modis_myanmar/img_product_myanmar"
    }) || ee.Image("users/rudiyanto/modis_myanmar/img_product_myanmar"),
    img_usa_arkansas = ui.import && ui.import("img_usa_arkansas", "image", {
      "id": "users/rudiyanto/modis_usa_california/img_product_usa_california"
    }) || ee.Image("users/rudiyanto/modis_usa_california/img_product_usa_california"),
    img_usa_california = ui.import && ui.import("img_usa_california", "image", {
      "id": "users/rudiyanto/modis_usa_arkansas/img_product_usa_arkansas"
    }) || ee.Image("users/rudiyanto/modis_usa_arkansas/img_product_usa_arkansas"),
    img_spain = ui.import && ui.import("img_spain", "image", {
      "id": "users/rudiyanto/modis_spain/img_product_spain"
    }) || ee.Image("users/rudiyanto/modis_spain/img_product_spain"),
    img_italy = ui.import && ui.import("img_italy", "image", {
      "id": "users/rudiyanto/modis_italy/img_product_italy"
    }) || ee.Image("users/rudiyanto/modis_italy/img_product_italy"),
    img_taiwan = ui.import && ui.import("img_taiwan", "image", {
      "id": "users/rudiyanto/modis_taiwan/img_product_taiwan"
    }) || ee.Image("users/rudiyanto/modis_taiwan/img_product_taiwan"),
    img_india_punjab = ui.import && ui.import("img_india_punjab", "image", {
      "id": "users/rudiyanto/modis_india_punjab/img_product_india_punjab30"
    }) || ee.Image("users/rudiyanto/modis_india_punjab/img_product_india_punjab30"),
    img_india_westbengal = ui.import && ui.import("img_india_westbengal", "image", {
      "id": "users/rudiyanto/modis_india_westbengal/img_product_india_westbengal15a"
    }) || ee.Image("users/rudiyanto/modis_india_westbengal/img_product_india_westbengal15a"),
    img_india_tamilnadu = ui.import && ui.import("img_india_tamilnadu", "image", {
      "id": "users/rudiyanto/modis_india_tamilnadu/img_product_india_tamilnadu"
    }) || ee.Image("users/rudiyanto/modis_india_tamilnadu/img_product_india_tamilnadu"),
    img_india_assam = ui.import && ui.import("img_india_assam", "image", {
      "id": "users/rudiyanto/modis_india_assam/img_product_india_assam"
    }) || ee.Image("users/rudiyanto/modis_india_assam/img_product_india_assam"),
    img_india_maharashtra = ui.import && ui.import("img_india_maharashtra", "image", {
      "id": "users/rudiyanto/modis_india_maharashtra/img_product_india_maharashtra30"
    }) || ee.Image("users/rudiyanto/modis_india_maharashtra/img_product_india_maharashtra30"),
    img_india_gujarat = ui.import && ui.import("img_india_gujarat", "image", {
      "id": "users/rudiyanto/modis_india_gujarat/img_product_india_gujarat"
    }) || ee.Image("users/rudiyanto/modis_india_gujarat/img_product_india_gujarat"),
    img_china_shandong = ui.import && ui.import("img_china_shandong", "image", {
      "id": "users/rudiyanto/modis_china_shandong/img_product_china_shandong"
    }) || ee.Image("users/rudiyanto/modis_china_shandong/img_product_china_shandong"),
    img_china_hunan = ui.import && ui.import("img_china_hunan", "image", {
      "id": "users/rudiyanto/modis_china_hunan/img_product_china_hunan"
    }) || ee.Image("users/rudiyanto/modis_china_hunan/img_product_china_hunan"),
    img_china_heilongjiang = ui.import && ui.import("img_china_heilongjiang", "image", {
      "id": "users/rudiyanto/modis_china_heilongjiang/img_product_china_heilongjiang"
    }) || ee.Image("users/rudiyanto/modis_china_heilongjiang/img_product_china_heilongjiang"),
    img_china_shaanxi = ui.import && ui.import("img_china_shaanxi", "image", {
      "id": "users/rudiyanto/modis_china_shaanxi/img_product_china_shaanxi"
    }) || ee.Image("users/rudiyanto/modis_china_shaanxi/img_product_china_shaanxi"),
    img_china_sichuan = ui.import && ui.import("img_china_sichuan", "image", {
      "id": "users/rudiyanto/modis_china_sichuan/img_product_china_sichuan"
    }) || ee.Image("users/rudiyanto/modis_china_sichuan/img_product_china_sichuan"),
    img_china_guangxi = ui.import && ui.import("img_china_guangxi", "image", {
      "id": "users/rudiyanto/modis_china_guangxi/img_product_china_guangxi"
    }) || ee.Image("users/rudiyanto/modis_china_guangxi/img_product_china_guangxi"),
    img_china_fujian = ui.import && ui.import("img_china_fujian", "image", {
      "id": "users/rudiyanto/modis_china_fujian/img_product_china_fujian"
    }) || ee.Image("users/rudiyanto/modis_china_fujian/img_product_china_fujian"),
    img_china_ningxia = ui.import && ui.import("img_china_ningxia", "image", {
      "id": "users/rudiyanto/modis_china_ningxia/img_product_china_ningxia"
    }) || ee.Image("users/rudiyanto/modis_china_ningxia/img_product_china_ningxia"),
    img_china_mongol = ui.import && ui.import("img_china_mongol", "image", {
      "id": "users/rudiyanto/modis_china_mongol/img_product_china_mongol"
    }) || ee.Image("users/rudiyanto/modis_china_mongol/img_product_china_mongol"),
    img_pakistan = ui.import && ui.import("img_pakistan", "image", {
      "id": "users/rudiyanto/modis_pakistan/img_product_pakistan"
    }) || ee.Image("users/rudiyanto/modis_pakistan/img_product_pakistan"),
    img_nepal = ui.import && ui.import("img_nepal", "image", {
      "id": "users/rudiyanto/modis_nepal/img_product_nepal"
    }) || ee.Image("users/rudiyanto/modis_nepal/img_product_nepal"),
    img_bangladesh = ui.import && ui.import("img_bangladesh", "image", {
      "id": "users/rudiyanto/modis_bangladesh/img_product_bangladesh"
    }) || ee.Image("users/rudiyanto/modis_bangladesh/img_product_bangladesh"),
    gaul0_2020 = ui.import && ui.import("gaul0_2020", "table", {
      "id": "users/rudiyanto/gaul0_date/gaul0_2020"
    }) || ee.FeatureCollection("users/rudiyanto/gaul0_date/gaul0_2020"),
    img_korea = ui.import && ui.import("img_korea", "image", {
      "id": "users/rudiyanto/modis_korea/img_product_korea"
    }) || ee.Image("users/rudiyanto/modis_korea/img_product_korea"),
    img_srilanka = ui.import && ui.import("img_srilanka", "image", {
      "id": "users/rudiyanto/modis_srilanka/img_product_srilanka"
    }) || ee.Image("users/rudiyanto/modis_srilanka/img_product_srilanka"),
    gaul0_code_2020 = ui.import && ui.import("gaul0_code_2020", "table", {
      "id": "users/rudiyanto/gaul0_date/gaul0_country_code_2020"
    }) || ee.FeatureCollection("users/rudiyanto/gaul0_date/gaul0_country_code_2020"),
    img_thailand = ui.import && ui.import("img_thailand", "image", {
      "id": "users/rudiyanto/modis_thailand/img_product_thailand"
    }) || ee.Image("users/rudiyanto/modis_thailand/img_product_thailand"),
    img_laos = ui.import && ui.import("img_laos", "image", {
      "id": "users/rudiyanto/modis_laos/img_product_laos"
    }) || ee.Image("users/rudiyanto/modis_laos/img_product_laos"),
    img_iran = ui.import && ui.import("img_iran", "image", {
      "id": "users/rudiyanto/modis_iran/img_product_iran"
    }) || ee.Image("users/rudiyanto/modis_iran/img_product_iran"),
    img_brazil = ui.import && ui.import("img_brazil", "image", {
      "id": "users/rudiyanto/modis_brazil/img_product_brazil"
    }) || ee.Image("users/rudiyanto/modis_brazil/img_product_brazil"),
    img_korea_north = ui.import && ui.import("img_korea_north", "image", {
      "id": "users/rudiyanto/modis_korea_north/img_product_korea_north"
    }) || ee.Image("users/rudiyanto/modis_korea_north/img_product_korea_north"),
    img_korea_south = ui.import && ui.import("img_korea_south", "image", {
      "id": "users/rudiyanto/modis_korea_south/img_product_korea_south"
    }) || ee.Image("users/rudiyanto/modis_korea_south/img_product_korea_south"),
    geometry_roi2 = ui.import && ui.import("geometry_roi2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                37.799583534660336,
                22.492642328225177
              ],
              [
                66.62770853466034,
                -14.370430200048078
              ],
              [
                106.00270853466033,
                -14.029610166433212
              ],
              [
                160.14333353466034,
                -15.389733846152208
              ],
              [
                158.03395853466034,
                47.91662139525771
              ],
              [
                143.97145853466034,
                51.55001020655437
              ],
              [
                102.48708353466033,
                51.76809783248275
              ],
              [
                79.28395853466034,
                53.265462232682935
              ],
              [
                51.510521034660336,
                53.265462232682935
              ],
              [
                32.877708534660336,
                53.265462232682935
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[37.799583534660336, 22.492642328225177],
          [66.62770853466034, -14.370430200048078],
          [106.00270853466033, -14.029610166433212],
          [160.14333353466034, -15.389733846152208],
          [158.03395853466034, 47.91662139525771],
          [143.97145853466034, 51.55001020655437],
          [102.48708353466033, 51.76809783248275],
          [79.28395853466034, 53.265462232682935],
          [51.510521034660336, 53.265462232682935],
          [32.877708534660336, 53.265462232682935]]]);
//Map.addLayer( img_india_assam.select('class'), igbpLandCoverVis, 'Paddy extent',1);
var img_product= ee.ImageCollection([img_indonesia,img_malaysia,img_vietnam,
img_philippines,img_cambodia,img_japan1,img_myanmar,
img_usa_california,img_usa_arkansas,img_spain,img_italy,
img_taiwan,img_india_punjab,img_india_westbengal,
img_india_tamilnadu,img_india_maharashtra,
img_india_assam,img_india_gujarat,
img_china_shandong,img_china_hunan,img_china_heilongjiang,
img_china_shaanxi,img_china_sichuan,img_china_guangxi,
img_china_fujian,img_china_ningxia,img_china_mongol,
img_pakistan,img_nepal,img_bangladesh,
img_korea_north,img_korea_south,img_srilanka,img_thailand,img_laos,
img_iran,img_brazil
]).max()
.set("system:time_end",ee.Date('2019-01-01'))
   .set("system:time_start", ee.Date('2019-12-31'))
   .set("date_start",'2019-01-01')
   .set("year",'2019')
print('img_product',img_product)
print(img_product.projection())
// Export the image to an Earth Engine asset.
Export.image.toAsset({
  image: ee.Image(img_product),
  description: 'paddy_modis_2019',
  assetId: 'paddy_modis_2019',
  scale: 463.3127165275001,
  region: geometry_roi2,
  maxPixels:1e13,
  crs:'EPSG:4326'
});
//print('Scale in meters:', image3.projection().nominalScale().getInfo());
var imgscale=img_vietnam.projection().nominalScale().getInfo();
print('Scale in meters:',imgscale);
//Map.centerObject(geometry_roi,5)
//Map.addLayer(img_product.geometry())
var igbpLandCoverVis = {
  min: 1.0,
  max: 12.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
//Map.setCenter(6.746, 46.529, 6);
var MonthVis={min:1,max:13,palette:['0000ff','00ffff','00bbbb','ffaa00','ff0000','ff00ff',
                                                               'ffff44','bbbb00','88ff00','00ff00','00dd00','008800','ffffff']};
Map.addLayer(img_product.select('class'), {min: 0, max: 1, palette: ['white','red']}, 'Paddy Cover',1);
Map.addLayer(img_product.select('nH'), {min: 1, max: 3, palette: ['blue', 'green', 'red']}, 'Number of harvesting',0);
Map.addLayer(img_product.select('mT1'), MonthVis, 'Month Planting1',0);
Map.addLayer(img_product.select('mH1'), MonthVis, 'Month Harvesting1',0);
Map.addLayer(img_product.select('mT2'), MonthVis, 'Month Planting2',0);
Map.addLayer(img_product.select('mH2'), MonthVis, 'Month Harvesting2',0);
Map.addLayer(img_product.select('mT3'), MonthVis, 'Month Planting3',0);
Map.addLayer(img_product.select('mH3'), MonthVis, 'Month Harvesting3',0);
// methane
var imgMethane=img_product.select('nH').multiply(20);// 20 g/m2/season table 4-13 https://www.ipcc-nggip.iges.or.jp/public/gl/guidelin/ch4ref5.pdf
print('imgMethane',imgMethane)
var methaneVisParam = {
  bands: ['nH'],
  min: 20,
  max: 60,
  palette: ['yellow', 'red']
};
Map.addLayer(imgMethane, methaneVisParam, 'Methane g/m2/year',1);
/*
//print(img_product.geometry())
//Map.addLayer(img_product.geometry());
// Export the image, specifying scale and region.
//indonesia
Export.image.toDrive({
  image: img_indonesia.toByte(),
  description: 'img_paddy_product_indonesia',
  folder:'Climate_Trace', 
  scale: imgscale,
  region: img_product.geometry(),
   maxPixels:1e13,
  crs:'EPSG:4326'
});
//malaysia
Export.image.toDrive({
  image: img_malaysia.toByte(),
  description: 'img_paddy_product_malaysia',
  folder:'Climate_Trace', 
  scale: imgscale,
  region: img_product.geometry(),
   maxPixels:1e13,
  crs:'EPSG:4326'
});
//vietnam
Export.image.toDrive({
  image: img_vietnam.toByte(),
  description: 'img_paddy_product_vietnam',
  folder:'Climate_Trace', 
  scale: imgscale,
  region: img_product.geometry(),
   maxPixels:1e13,
  crs:'EPSG:4326'
});
*/
//
//adm
var gaul0 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0").sort('ADM0_CODE')
print('List of countries',(gaul0.sort('ADM0_NAME').aggregate_array('ADM0_NAME')))
//Map.centerObject(gaul0 ,5)
//var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', ['Malaysia','Indonesia','Viet Nam',
// 
//'Philippines','Myanmar','Cambodia'])).sort('ADM0_CODE'));
/*
var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', ['Malaysia','Indonesia','Viet Nam',
                                                            'Philippines','Cambodia','Japan',
                                                            'Myanmar',
                                                            'United States of America',
                                                            'Spain','Italy','Taiwan','India'])).sort('ADM0_CODE'));                                                            
var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', ['India'])).sort('ADM0_CODE'))
*/
var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', [
'Pakistan','Nepal','India','Bangladesh','Sri Lanka',
'Iran  (Islamic Republic of)','Dem People\'s Rep of Korea',
'China','Republic of Korea','Myanmar','Thailand','Lao People\'s Democratic Republic',
'Malaysia','Indonesia','Viet Nam','Philippines',
'Cambodia','Japan','Taiwan','Spain','Italy',
'United States of America','Brazil'
])).sort('ADM0_CODE'))
var select_country= ['Myanmar','Thailand','Lao People\'s Democratic Republic',
'Malaysia','Indonesia','Viet Nam','Philippines',
'Cambodia'];
//var select_country= ['Viet Nam'];
var select_country= ['Pakistan','Nepal','India','Bangladesh','Sri Lanka',
'Iran  (Islamic Republic of)','Dem People\'s Rep of Korea',
'China','Republic of Korea','Myanmar','Thailand','Lao People\'s Democratic Republic',
'Malaysia','Indonesia','Viet Nam','Philippines',
'Cambodia','Japan','Taiwan','Spain','Italy']
var shp_adm0 = (gaul0.filter(ee.Filter.inList('ADM0_NAME', select_country)).sort('ADM0_CODE'))
print('list of selected contries',shp_adm0 .aggregate_array('ADM0_NAME'))
Map.centerObject(shp_adm0 ,2)
///
var ad0Border = ee.Image().byte().paint({featureCollection: shp_adm0, color: 1, width: 1});
Map.addLayer(ad0Border, {palette: '0000FF'}, 'ad0Border');
//
//malaysia
Export.image.toDrive({
  image: imgMethane.clip(shp_adm0).toByte(),
  description: 'img_methane_product_'+select_country,
  folder:'Climate_Trace', 
  scale: imgscale,
  region: shp_adm0.geometry(),
   maxPixels:1e13,
  crs:'EPSG:4326',
  fileFormat:'GeoTIFF'
});
print('img',img_product.clip(shp_adm0))
print(img_product.select(['class']))
Export.image.toDrive({
  image: img_product.select(['class']).clip(shp_adm0).toByte(),
  description: 'img_rice_product_'+select_country,
  folder:'Climate_Trace', 
  scale: imgscale,
  region: shp_adm0.geometry(),
   maxPixels:1e13,
  crs:'EPSG:4326',
  fileFormat:'GeoTIFF'
});
///
print('adm0',shp_adm0.sort('ADM0_CODE').sort('ADM0_CODE').toList(shp_adm0.size()));
//join date
// Use an equals filter to specify how the collections match.
var toyFilter = ee.Filter.equals({
  leftField: 'ADM0_CODE',
  rightField: 'ADM0_CODE'
});
// Define the join.
var innerJoin = ee.Join.inner();
// Apply the join.
var toyJoin = innerJoin.apply(shp_adm0, gaul0_code_2020,  toyFilter);
// Print the result.
//print('Inner join toy example:', toyJoin);
var combfeat_shp_adm0=(toyJoin.map(function(pair) {
  var f1 = ee.Feature(pair.get('primary'));
  var f2 = ee.Feature(pair.get('secondary'));
  return f1.set(f2.toDictionary());
}));
print('combfeat',combfeat_shp_adm0)
// Area Calculation by Class
// We learnt how to calculate area for a single class. 
// But typically when you have a classified image, you want to compute area covered by each class
// We follow a similar process as before, but now we need to use a 'Grouped Reducer'
// https://developers.google.com/earth-engine/reducers_grouping
// We take the ee.Image.pixelArea() image and add the classified image as a new band
// This band will be used by the grouped reduced to categorize the results
//paddy area by contry
var img_class=img_product.select('class');
var shp_adm=combfeat_shp_adm0;//shp_adm0;
var areaImage = ee.Image.pixelArea().addBands(img_class)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: shp_adm.geometry(),
    scale: imgscale,
    maxPixels: 1e13
    }); 
print('areas',areas)
// The result of reduceRegion() with a grouped reducer is a dictionary of dictionaries for each class
// The top level dictionary has a single key named 'groups'
// We can extract the individual dictionaries and merge them into a single one
var classAreas = ee.List(areas.get('groups'))
//Apply a function using .map() function to iterate over each class item
//We extract the class and area numbers and return a list for each class
//The result is a list of lists
// Important to note that dictionary key must be of type 'string'
// Our keys are class numbers, so we call .format() to convert the number to string
var classAreaLists = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  var area = ee.Number(areaDict.get('sum')).divide(1e4).round()
  return ee.List([classNumber, area])
})
print('classAreaLists',classAreaLists)
// Introducting flatten()
// flatten() is an important function in Earth Engine required for data processing
// It takes a nested list and converts it to a flat list
// Many Earth Engine constructors such a ee.Dictionary, ee.FeatureCollection etc. expect a flat list
// So before creating such objects with nested objects, we must convert them to flat structures
var nestedList = ee.List([['a', 'b'], ['c', 'd'], ['e', 'f']])
print(nestedList)
print(nestedList.flatten())
// We can now create a dictionary using ee.Dictionary which accepts a list of key/value pairs
var result = ee.Dictionary(classAreaLists.flatten())
print('Hasil',result)
// Area Calculation by Class by Admin Area 
// We saw how we can calculate areas by class for the whole state
// What if we wanted to know the breakup of these class areas by each district?
// This requires one more level of processing.
// We can apply a similar computation as above, but
// by applying .map() on the Feature Collection to obtain the values by each district geometies
var calculateClassArea = function(feature) {
    var areas = ee.Image.pixelArea().addBands(img_class).reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: feature.geometry(),
    scale: imgscale,
    maxPixels: 1e13
    })
    var classAreas = ee.List(areas.get('groups'))
    var classAreaLists = classAreas.map(function(item) {
      var areaDict = ee.Dictionary(item)
      var classNumber = ee.Number(areaDict.get('class')).format()
      var area = ee.Number(areaDict.get('sum')).divide(1e4).round()
      return ee.List([classNumber, area])
    })
    var result = ee.Dictionary(classAreaLists.flatten())
    // The result dictionary has area for all the classes
    // We add the district name to the dictionary and create a feature
    var Code_name = ['Begin_date','End_date','Alpha_3code','Country']; 
    var district = [feature.get(Code_name[0]),feature.get(Code_name[1]),feature.get(Code_name[2]),feature.get(Code_name[3])];
    return ee.Feature(feature.geometry(), result.set(Code_name[0], district[0])
    .set(Code_name[1], district[1]).set(Code_name[2], district[2]).set(Code_name[3], district[3]));
}
var districtAreas = shp_adm.map(calculateClassArea);
print(' districtAreas', districtAreas)
// One thing to note is that each district may or may not have all 
// of the 17 classes present. So each feature will have different 
// number of attributes depending on which classes are present.
// We can explicitly set the expected fields in the output 
// so we get a homogeneous table with all classes
var classes = ee.List.sequence(1, 17);
// As we need to use the list of output fields in the Export function
// we have to call .getInfo() to get the list values on the client-side
var Code_name = ['Begin_date','End_date','Alpha_3code','Country']; 
//var outputFields = ee.List(['district']).cat(classes).getInfo()
var outputFields = ee.List(Code_name).cat(classes).getInfo();
print('outputFields ',outputFields )
// Export the results as a CSV file
print('results CSV',districtAreas.limit(50));
var Datapaddy_area_by_country = districtAreas.map(function(feat){
  return ee.Feature(feat.geometry(), {
      begin_date:feat.get('Begin_date'),
      end_date:feat.get('End_date'),
      iso3_country:feat.get('Alpha_3code'),
      country_name:feat.get('Country'),
      //tCH4: feat.get('tCH4'),
      parcel_paddy_ha: feat.get('1')
  })
})
print('Datapaddy_area_by_country',Datapaddy_area_by_country);
Export.table.toDrive({
    collection: Datapaddy_area_by_country,
    description: 'paddy_area_by_country',
    folder: 'earthengine_area_paddy_modis',
    fileNamePrefix: 'paddy_area_by_country',
    fileFormat: 'CSV',
    selectors: ['begin_date','end_date','iso3_country','country_name','parcel_paddy_ha']
    });
//by class (number of harvest) and by country
var img_class=img_product.select('nH');
var shp_adm=combfeat_shp_adm0;//shp_adm0;
var areaImage = ee.Image.pixelArea().addBands(img_class)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: shp_adm.geometry(),
    scale: imgscale,
    maxPixels: 1e13
    }); 
print(areas)
// The result of reduceRegion() with a grouped reducer is a dictionary of dictionaries for each class
// The top level dictionary has a single key named 'groups'
// We can extract the individual dictionaries and merge them into a single one
var classAreas = ee.List(areas.get('groups'))
//Apply a function using .map() function to iterate over each class item
//We extract the class and area numbers and return a list for each class
//The result is a list of lists
// Important to note that dictionary key must be of type 'string'
// Our keys are class numbers, so we call .format() to convert the number to string
var classAreaLists = classAreas.map(function(item) {
  var areaDict = ee.Dictionary(item)
  var classNumber = ee.Number(areaDict.get('class')).format()
  var area = ee.Number(areaDict.get('sum')).divide(1e4).round()
  return ee.List([classNumber, area])
})
print('classAreaLists',classAreaLists)
// Introducting flatten()
// flatten() is an important function in Earth Engine required for data processing
// It takes a nested list and converts it to a flat list
// Many Earth Engine constructors such a ee.Dictionary, ee.FeatureCollection etc. expect a flat list
// So before creating such objects with nested objects, we must convert them to flat structures
var nestedList = ee.List([['a', 'b'], ['c', 'd'], ['e', 'f']])
print(nestedList)
print(nestedList.flatten())
// We can now create a dictionary using ee.Dictionary which accepts a list of key/value pairs
var result = ee.Dictionary(classAreaLists.flatten())
print('Hasil',result)
// Area Calculation by Class by Admin Area 
// We saw how we can calculate areas by class for the whole state
// What if we wanted to know the breakup of these class areas by each district?
// This requires one more level of processing.
// We can apply a similar computation as above, but
// by applying .map() on the Feature Collection to obtain the values by each district geometies
var calculateClassArea = function(feature) {
    var areas = ee.Image.pixelArea().addBands(img_class).reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: feature.geometry(),
    scale: imgscale,
    maxPixels: 1e13
    })
    var classAreas = ee.List(areas.get('groups'))
    var classAreaLists = classAreas.map(function(item) {
      var areaDict = ee.Dictionary(item)
      var classNumber = ee.Number(areaDict.get('class')).format()
      var area = ee.Number(areaDict.get('sum')).divide(1e4).round()
      return ee.List([classNumber, area])
    })
    var result = ee.Dictionary(classAreaLists.flatten())
    // The result dictionary has area for all the classes
    // We add the district name to the dictionary and create a feature
    var Code_name = ['Begin_date','End_date','Alpha_3code','Country']; 
    var district = [feature.get(Code_name[0]),feature.get(Code_name[1]),feature.get(Code_name[2]),feature.get(Code_name[3])];
    return ee.Feature(feature.geometry(), result.set(Code_name[0], district[0])
    .set(Code_name[1], district[1]).set(Code_name[2], district[2]).set(Code_name[3], district[3]));
}
var districtAreas = shp_adm.map(calculateClassArea);
// One thing to note is that each district may or may not have all 
// of the 17 classes present. So each feature will have different 
// number of attributes depending on which classes are present.
// We can explicitly set the expected fields in the output 
// so we get a homogeneous table with all classes
var classes = ee.List.sequence(1, 17);
// As we need to use the list of output fields in the Export function
// we have to call .getInfo() to get the list values on the client-side
var Code_name = ['Begin_date','End_date','Alpha_3code','Country'];  
//var outputFields = ee.List(['district']).cat(classes).getInfo()
var outputFields = ee.List(Code_name).cat(classes).getInfo();
// Export the results as a CSV file
print('results CSV',districtAreas.limit(50));
var Datapaddy_area_by_class_country = districtAreas.map(function(feat){
  return ee.Feature(feat.geometry(), {
      begin_date:feat.get('Begin_date'),
      end_date:feat.get('End_date'),
      iso3_country:feat.get('Alpha_3code'),
      country_name:feat.get('Country'),
      //tCH4: feat.get('tCH4'),
      parcel_paddy_1_ha: feat.get('1'),
      parcel_paddy_2_ha: feat.get('2'),
      parcel_paddy_3_ha: feat.get('3')
  })
})
print('Datapaddy_area_by_country',Datapaddy_area_by_class_country);
Export.table.toDrive({
    collection: Datapaddy_area_by_class_country,
    description: 'paddy_area_by_class_country',
    folder: 'earthengine_area_paddy_modis',
    fileNamePrefix: 'paddy_area_by_class_country',
    fileFormat: 'CSV',
    selectors: ['begin_date','end_date','iso3_country','country_name','parcel_paddy_1_ha','parcel_paddy_2_ha','parcel_paddy_3_ha']
    });
/*
Export.table.toDrive({
    collection: districtAreas,
    description: 'paddy_area_by_class_country',
    folder: 'earthengine_area_paddy_modis',
    fileNamePrefix: 'paddy_area_by_class_country',
    fileFormat: 'CSV',
    selectors: outputFields
    });
*/
//// NH4 and CO2eq
/*
var shp_mly=(gaul0.filter(ee.Filter.inList('ADM0_NAME', ['Malaysia'])).sort('ADM0_CODE'))
var stats = imgMethane.divide(1e6).multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: shp_mly,
  scale: imgscale,
  crs:'EPSG:4326',
    maxPixels:1e15,
  })
print('stats malaysia',stats)//.get('precipitation_sum')) // 1336.52 mm
*/
///https://gis.stackexchange.com/questions/297314/iterating-an-earth-engine-calculation-reducer-over-every-country-in-the-world
//var mappedReduction=shp_adm0.map(function(feature){
 var mappedReduction=combfeat_shp_adm0.map(function(feature){ 
    return feature.set(imgMethane.divide(1e6).multiply(ee.Image.pixelArea()).reduceRegion({
    reducer:ee.Reducer.sum(),//'sum',
    geometry:feature.geometry(),
     scale:imgscale,
    crs:'EPSG:4326',
    maxPixels:1e15 //default is 1e9, which is exceeded by an early country in the list (Brazil?), throwing an error
  }));
})
print('mappedReduction', mappedReduction.select(['Begin_date','End_date','Alpha_3code','Country','nH']))
var DataRenamed = mappedReduction.map(function(feat){
  return ee.Feature(feat.geometry(), { 
      Begin_date:feat.get('Begin_date'),
      End_date:feat.get('End_date'),
      Alpha_3code:feat.get('Alpha_3code'),
      Country:feat.get('Country'),
      tCH4: feat.get('nH')
  })
})
print('DataRenamed',DataRenamed)
//https://climatechangeconnection.org/emissions/co2-equivalents/
var mappedReductionCO2=DataRenamed.map(function(feature){
    return feature.set(imgMethane.divide(1e6).multiply(28).multiply(ee.Image.pixelArea()).reduceRegion({
    reducer:ee.Reducer.sum(),//'sum',
    geometry:feature.geometry(),
     scale:imgscale,
    crs:'EPSG:4326',
    maxPixels:1e15 //default is 1e9, which is exceeded by an early country in the list (Brazil?), throwing an error
  }));
})
print('mappedReductionCO2', mappedReductionCO2)
var DataRenamedCO2 = mappedReductionCO2.map(function(feat){
  return ee.Feature(feat.geometry(), {
      begin_date:feat.get('Begin_date'),
      end_date:feat.get('End_date'),
      iso3_country:feat.get('Alpha_3code'),
      country_name:feat.get('Country'),
      tCH4: feat.get('tCH4'),
      tCO2eq: feat.get('nH')
  })
})
print('DataRenamedCO2',DataRenamedCO2);
Export.table.toDrive({
    collection: DataRenamedCO2,
    description: 'CH4_by_country',
    folder: 'earthengine_area_paddy_modis',
    fileNamePrefix: 'CH4_by_country',
    fileFormat: 'CSV',
    selectors: ['begin_date','end_date','iso3_country','country_name','tCH4','tCO2eq']
    });
////
/**
 * Define UI components.
 */
var comp = {};
// Title.
comp.title = {};
comp.title.label = ui.Label('Methane emission from rice paddy cultivation (2020): rudiyanto@umt.edu.my', null, 
  'https://www.umt.edu.my');
// Legend.
comp.legend = {};
comp.legend.title = ui.Label();
comp.legend.colorbar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: methaneVisParam.palette
  }
});
comp.legend.leftLabel = ui.Label('[min]');
comp.legend.centerLabel = ui.Label();
comp.legend.rightLabel = ui.Label('[max]');
comp.legend.labelPanel = ui.Panel({
  widgets: [
    comp.legend.leftLabel,
    comp.legend.centerLabel,
    comp.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
comp.legend.panel = ui.Panel([
  comp.legend.title,
  comp.legend.colorbar,
  comp.legend.labelPanel
], null, {width: '300px', position: 'bottom-right'});
/**
 * Compose the components.
 */
Map.add(comp.title.label);
Map.add(comp.legend.panel);
/**
 * Style the components.
 */
var style = {};
style.title = {};
style.title.label = {
  fontWeight: 'bold',
  fontSize: '14px'
};
style.legend = {};
style.legend.title = {
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
};
style.legend.colorbar = {
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
};
style.legend.leftLabel = {
  margin: '4px 8px',
  fontSize: '12px'
};
style.legend.centerLabel = {
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
};
style.legend.rightLabel = {
  margin: '4px 8px',
  fontSize: '12px'
};
style.legend.panel = {
};
style.title.label;
comp.title.label.style().set(style.title.label);
comp.legend.title.style().set(style.legend.title);
comp.legend.colorbar.style().set(style.legend.colorbar);
comp.legend.leftLabel.style().set(style.legend.leftLabel);
comp.legend.centerLabel.style().set(style.legend.centerLabel);
comp.legend.rightLabel.style().set(style.legend.rightLabel);
comp.legend.title.setValue('Methane Emission (g/m2/year)');
comp.legend.leftLabel.setValue(methaneVisParam.min + 0);
comp.legend.centerLabel.setValue(methaneVisParam.max / 2  + 10);
comp.legend.rightLabel.setValue(methaneVisParam.max  + 0);
//legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Rice cropping intensity',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
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
//  Palette with the colors
//var palette =['FF0000', '22ff00', '1500ff'];
 var palette =['1500ff','22ff00','ff0000'];
// name of the legend
//var names = ['Red','Green','Blue'];
 var names = ['Single','Double','Triple'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);