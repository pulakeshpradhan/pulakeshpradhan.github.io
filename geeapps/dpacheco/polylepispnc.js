var n1 = ui.import && ui.import("n1", "image", {
      "id": "users/dpacheco/pnc/pnc_n1_cng2020"
    }) || ee.Image("users/dpacheco/pnc/pnc_n1_cng2020"),
    n0 = ui.import && ui.import("n0", "image", {
      "id": "users/dpacheco/pnc/pnc_n0_cng2020"
    }) || ee.Image("users/dpacheco/pnc/pnc_n0_cng2020"),
    n2 = ui.import && ui.import("n2", "image", {
      "id": "users/dpacheco/pnc/pnc_n2_cng2020"
    }) || ee.Image("users/dpacheco/pnc/pnc_n2_cng2020"),
    n3 = ui.import && ui.import("n3", "image", {
      "id": "users/dpacheco/pnc/pnc_n3_cng2020"
    }) || ee.Image("users/dpacheco/pnc/pnc_n3_cng2020"),
    borde_cuenca = ui.import && ui.import("borde_cuenca", "table", {
      "id": "users/dpacheco/pnc/area_pnc"
    }) || ee.FeatureCollection("users/dpacheco/pnc/area_pnc"),
    st_n0 = ui.import && ui.import("st_n0", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "palette": [
          "2ba51c"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"palette":["2ba51c"]},
    st_n1 = ui.import && ui.import("st_n1", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "palette": [
          "fdff7a"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"palette":["fdff7a"]},
    st_n2 = ui.import && ui.import("st_n2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "palette": [
          "ff150a"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"palette":["ff150a"]},
    st_n3 = ui.import && ui.import("st_n3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "palette": [
          "66ff4b"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"palette":["66ff4b"]};
print("Procesando datos..");
Map.centerObject(borde_cuenca);
var clasificacion_pix="si"; //bandera que indica si va a realizar la clasificación en pixeles por niveles
var carpeta_salida="GEE_ECUADOR";
var area="PNC";
var finicio=null;
var ffinal=null;
var S2=null;
var masked=null;
var test_image=null;
var r_union=null;
var s2_select_bands=["AOT","ARI","SIPI","CCCI","MSI","EVI","MSR","GLI","TCI_G","NGRDI","WVP","B6"]; //bandas s2 obtenidas para n0,n1,n2,n3,n4
var f= require('users/dpacheco/modulos:funciones_globales.js');
var cld = require('users/fitoprincipe/geetools:cloud_masks');
//Dataset altura vegetacion
var height_2019= ee.Image("users/potapovpeter/GEDI_V27/GEDI_SAM_v27");
var h2019 = height_2019.clip(borde_cuenca).resample('bilinear').reproject('EPSG:4326', null, 10).rename('height2019');
var dataset = ee.Image('USGS/SRTMGL1_003').clip(borde_cuenca);
var elevation = dataset.select('elevation');
elevation = elevation.resample('bilinear').reproject('EPSG:4326', null, 10);
var mask_polylepis = elevation.updateMask(elevation.gt(2700));
var slope = ee.Terrain.slope(elevation);
var a=["2020-08-04","2020-08-24"];
a.forEach(function(entry) {
    finicio=f.st_nueva_fecha(entry,-2);
    ffinal=f.st_nueva_fecha(entry,2);
    S2 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(finicio, ffinal)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .filterBounds(borde_cuenca)
    //.map(MascaraNubesS)
    .map(function(image){return image.clip(borde_cuenca)});
    test_image=S2.mosaic().select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12','AOT','WVP','SCL','TCI_R','TCI_G','TCI_B','QA60']);
    masked = cld.sclMask([ 'cloud_medium','cloud_high','shadow'])(test_image);
   // Map.addLayer(masked, vizParams, 'True RGB S2 ' + entry);
    if (r_union===null)
    {r_union=r_union = ee.ImageCollection(masked)}
    else
    {
      r_union = r_union.merge(masked);
    }
});
var S2_rgb= S2.select(['TCI_R','TCI_G','TCI_B']);
var vizParams = {
  bands: ['TCI_R', 'TCI_G', 'TCI_B']
};
Map.addLayer(S2_rgb,vizParams , 'True RGB S2 MOSAICO', true);
Map.addLayer(n0,st_n0, '1. Vegetación', false);
Map.addLayer(n1,st_n1, '2. Bosques', false);
Map.addLayer(n2,st_n2, '3. Bosques nativos', false);
Map.addLayer(n3,st_n3, '4. Ubicación potencial de Bosques de Polylepis', true);