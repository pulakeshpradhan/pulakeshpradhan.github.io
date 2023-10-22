//-------------DOWNLOAD DEM ALOS 30m (Huỳnh Văn Thanh)---------------------
//Filter province
var province_name ='Ha Giang'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
var legendPanel =ui.Panel({
  layout: ui.Panel.Layout.flow('vertical',false),
  style: {
    stretch: 'horizontal', 
    width: '360px',
    position: 'bottom-left', 
    border: '1px solid black',
  }
});
legendPanel.add(import_other_modules.dem_ui(elev))
Map.add(panel);
Map.add(legendPanel)
var title = ui.Label('Mô Hình DEM 15 tỉnh Miền Bắc Việt Nam', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '25px',
  color: 'FF0000',
});
Map.add(title);
//Export tiff
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
//Filter province
var province_name ='Lao Cai'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
// var legendPanel =ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical',false),
//   style: {
//     stretch: 'horizontal', 
//     width: '360px',
//     position: 'bottom-center', 
//     border: '1px solid black',
//   }
// });
// legendPanel.add(import_other_modules.dem_ui(elev))
// Map.add(panel);
// Map.add(legendPanel)
// var title = ui.Label('Mô Hình DEM toàn Việt Nam', {
//   stretch: 'horizontal',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   fontSize: '25px',
//   color: 'FF0000',
// });
// Map.add(title);
//Export tiff
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
  var province_name ='Lai Chau'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
 var province_name ='Dien Bien'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
 var province_name ='Son La'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
 var province_name ='Yen Bai'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Tuyen Quang'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Cao Bang'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Bac Kan'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Phu Tho'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Thai Nguyen'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Vinh Phuc'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Lang Son'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Bac Giang'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });
   var province_name ='Quang Ninh'  
//Provinces
var province= ee.FeatureCollection('projects/huyenvinhcuu/assets/dulieuvecto63tinh')
var selected_province = province.filter(ee.Filter.eq('VARNAME_1',province_name))
//Alos Dem 30m
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Parameters VIZ
var elevPalette = ['1a9850', '91cf60', 'd9ef8b','fee08b','fc8d59','d73027'];
var elev = {min: 0, max: 3000, palette: elevPalette};
Map.centerObject(selected_province,8);
//import module
var import_other_modules = require('users/lethiquynhhoa/Modules:other_functions')
//Select province
var dem_selected_province_mosaic = dem.select('DSM').filterBounds(selected_province).mosaic().clip(selected_province);
//print(dsm_ulb);
var dem_selected_province = ui.Map.Layer(dem_selected_province_mosaic, elev, 'DEM - '+province_name,true)
Map.add(dem_selected_province)
var panel = ui.Panel();
Export.image.toDrive({
  image: dem_selected_province_mosaic,
  description: 'DEM_'+ province_name.replace(/ +/g,""), //Ten file
  folder: 'DEM_30m', //Ten folder trong Google driver cua ban
  region: selected_province,
  crs: 'EPSG:32648',
  scale:30, 
  maxPixels:1e9 
  });