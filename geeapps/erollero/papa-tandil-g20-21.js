var departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B11",
          "B4"
        ],
        "min": 350.8,
        "max": 3317.2,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B11","B4"],"min":350.8,"max":3317.2,"gamma":1},
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/erollero/EJIDOS/ejidobsas"
    }) || ee.Image("users/erollero/EJIDOS/ejidobsas"),
    girasol = ui.import && ui.import("girasol", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.940230699746806,
                -35.944377342021866
              ],
              [
                -57.942977281778056,
                -35.94715679032621
              ],
              [
                -57.93993029233714,
                -35.948859154132116
              ],
              [
                -57.9373124563386,
                -35.9462882232334
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.935510011880595,
                -35.94767792599901
              ],
              [
                -57.93834242460032,
                -35.95000562337303
              ],
              [
                -57.93679747220774,
                -35.95153422314869
              ],
              [
                -57.93362173673411,
                -35.949137087596974
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.93121847745677,
                -35.95181214720301
              ],
              [
                -57.93405089017649,
                -35.953827067356315
              ],
              [
                -57.932505937783915,
                -35.95473029074214
              ],
              [
                -57.929458948343,
                -35.952020589602114
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.95537981626292,
                -35.975605767973306
              ],
              [
                -57.957697244851786,
                -35.97643928307913
              ],
              [
                -57.954221101968486,
                -35.97817574461226
              ],
              [
                -57.95336279508372,
                -35.97709914296213
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.953234049051005,
                -35.98168328037794
              ],
              [
                -57.95439276334544,
                -35.982655638931256
              ],
              [
                -57.94868502256175,
                -35.98713527893474
              ],
              [
                -57.94465098020335,
                -35.984391963689816
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.97327551481028,
                -36.00623166533852
              ],
              [
                -57.977738710611064,
                -36.00956437880634
              ],
              [
                -57.983918520181376,
                -36.00956437880634
              ],
              [
                -57.980485292642314,
                -36.01289695138796
              ],
              [
                -57.97610792753001,
                -36.01053639369623
              ],
              [
                -57.97207388517161,
                -36.007064856913274
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -58.02571806546946,
                -35.995746585554556
              ],
              [
                -58.02254232999583,
                -36.00164895428932
              ],
              [
                -58.01773581144114,
                -35.99394106689319
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.884026296492515,
                -35.96029785428461
              ],
              [
                -57.88291049754232,
                -35.9635283025871
              ],
              [
                -57.880507238264975,
                -35.963458831970975
              ],
              [
                -57.87831855570882,
                -35.960263117563265
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.86724639689535,
                -35.95647672334193
              ],
              [
                -57.87312579905599,
                -35.95977680186005
              ],
              [
                -57.87183833872884,
                -35.964049330259904
              ],
              [
                -57.86724639689535,
                -35.9599852232424
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 10
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.940230699746806, -35.944377342021866],
                  [-57.942977281778056, -35.94715679032621],
                  [-57.93993029233714, -35.948859154132116],
                  [-57.9373124563386, -35.9462882232334]]]),
            {
              "CLASE": 10,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.935510011880595, -35.94767792599901],
                  [-57.93834242460032, -35.95000562337303],
                  [-57.93679747220774, -35.95153422314869],
                  [-57.93362173673411, -35.949137087596974]]]),
            {
              "CLASE": 10,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.93121847745677, -35.95181214720301],
                  [-57.93405089017649, -35.953827067356315],
                  [-57.932505937783915, -35.95473029074214],
                  [-57.929458948343, -35.952020589602114]]]),
            {
              "CLASE": 10,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.95537981626292, -35.975605767973306],
                  [-57.957697244851786, -35.97643928307913],
                  [-57.954221101968486, -35.97817574461226],
                  [-57.95336279508372, -35.97709914296213]]]),
            {
              "CLASE": 10,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.953234049051005, -35.98168328037794],
                  [-57.95439276334544, -35.982655638931256],
                  [-57.94868502256175, -35.98713527893474],
                  [-57.94465098020335, -35.984391963689816]]]),
            {
              "CLASE": 10,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.97327551481028, -36.00623166533852],
                  [-57.977738710611064, -36.00956437880634],
                  [-57.983918520181376, -36.00956437880634],
                  [-57.980485292642314, -36.01289695138796],
                  [-57.97610792753001, -36.01053639369623],
                  [-57.97207388517161, -36.007064856913274]]]),
            {
              "CLASE": 10,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-58.02571806546946, -35.995746585554556],
                  [-58.02254232999583, -36.00164895428932],
                  [-58.01773581144114, -35.99394106689319]]]),
            {
              "CLASE": 10,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.884026296492515, -35.96029785428461],
                  [-57.88291049754232, -35.9635283025871],
                  [-57.880507238264975, -35.963458831970975],
                  [-57.87831855570882, -35.960263117563265]]]),
            {
              "CLASE": 10,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.86724639689535, -35.95647672334193],
                  [-57.87312579905599, -35.95977680186005],
                  [-57.87183833872884, -35.964049330259904],
                  [-57.86724639689535, -35.9599852232424]]]),
            {
              "CLASE": 10,
              "system:index": "8"
            })]),
    soja = ui.import && ui.import("soja", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.92491162859646,
                -35.94711310889179
              ],
              [
                -57.92675698839871,
                -35.948763360976514
              ],
              [
                -57.92574847780911,
                -35.948815473638824
              ],
              [
                -57.92428935610501,
                -35.94765161599219
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.9289885862991,
                -35.94940608140952
              ],
              [
                -57.929803977839626,
                -35.95006616722272
              ],
              [
                -57.92828048311917,
                -35.951038915211086
              ],
              [
                -57.92763675295559,
                -35.95041357859348
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.722963518735845,
                -35.669262097815206
              ],
              [
                -57.72579593145557,
                -35.6711098829522
              ],
              [
                -57.723221010801275,
                -35.67334111365312
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -58.29019019192964,
                -35.73340956181868
              ],
              [
                -58.29739996976167,
                -35.73508168356832
              ],
              [
                -58.29190680569917,
                -35.73619641189566
              ],
              [
                -58.28838774747163,
                -35.74023717126841
              ],
              [
                -58.28495451993257,
                -35.73954050324787
              ],
              [
                -58.28890273160249,
                -35.73633575183936
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -58.31310698575288,
                -35.73814714891925
              ],
              [
                -58.31465193814546,
                -35.73898316444242
              ],
              [
                -58.31456610745698,
                -35.742257474055286
              ],
              [
                -58.312506170933545,
                -35.738216817214784
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 11
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.92491162859646, -35.94711310889179],
                  [-57.92675698839871, -35.948763360976514],
                  [-57.92574847780911, -35.948815473638824],
                  [-57.92428935610501, -35.94765161599219]]]),
            {
              "CLASE": 11,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.9289885862991, -35.94940608140952],
                  [-57.929803977839626, -35.95006616722272],
                  [-57.92828048311917, -35.951038915211086],
                  [-57.92763675295559, -35.95041357859348]]]),
            {
              "CLASE": 11,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-57.722963518735845, -35.669262097815206],
                  [-57.72579593145557, -35.6711098829522],
                  [-57.723221010801275, -35.67334111365312]]]),
            {
              "CLASE": 11,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-58.29019019192964, -35.73340956181868],
                  [-58.29739996976167, -35.73508168356832],
                  [-58.29190680569917, -35.73619641189566],
                  [-58.28838774747163, -35.74023717126841],
                  [-58.28495451993257, -35.73954050324787],
                  [-58.28890273160249, -35.73633575183936]]]),
            {
              "CLASE": 11,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-58.31310698575288, -35.73814714891925],
                  [-58.31465193814546, -35.73898316444242],
                  [-58.31456610745698, -35.742257474055286],
                  [-58.312506170933545, -35.738216817214784]]]),
            {
              "CLASE": 11,
              "system:index": "4"
            })]),
    muestras = ui.import && ui.import("muestras", "table", {
      "id": "users/erollero/GRUESA21/tandilg21"
    }) || ee.FeatureCollection("users/erollero/GRUESA21/tandilg21");
//Indicar depto.
var roi1 = departamentos.filterMetadata("LINK","equals","6791");
var roi2 = departamentos.filterMetadata("LINK","equals","6063");
var roi5 = departamentos.filterMetadata("LINK","equals","6357");
var roi4 = departamentos.filterMetadata("LINK","equals","6280");
var roi = roi1.merge(roi2).merge(roi5).merge(roi4);
/*
var roi2 = departamentos.filterMetadata("LINK","equals","82126");
var roi1 = departamentos.filterMetadata("LINK","equals","82105");
var roi3 = departamentos.filterMetadata("LINK","equals","82056");
var roi4 = departamentos.filterMetadata("LINK","equals","82007");
var roi5 = departamentos.filterMetadata("LINK","equals","82084");
var roi6 = roi2.merge(roi1);
var roi7 = roi6.merge(roi3);
var roi8 = roi7.merge(roi4);
var roi = roi8.merge(roi5);
*/
//MUESTRAS table + geometrias
//Centrado del mapa y zoom
Map.setCenter(-59.17, -37.3201, 10); 
var gsw = ee.Image('JRC/GSW1_2/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence').clip(roi);
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', '#4B70A4']
};
var VIS_WATER_MASK = {
  palette: ['white', '#4B70A4']
};
// Create a water mask layer, and set the image mask so that non-water areas
// are no opaque.
var water_mask = occurrence.gt(2).unmask(0);
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '2% occurrence water mask',
  shown: false
});
var water2 = water_mask.eq(0);
//Map.addLayer(water2,{max: 1, min:0,palette: [ '478d19','AQUA']},'water2');
var Min = image3.clip(roi);
var urb_mask = Min.gte(1).unmask(0);
var urb = urb_mask.eq(0);
///////////////////////////////////////////////////////////////////////////////////
/*
var image = ee.ImageCollection('COPERNICUS/S2_SR')
         .filterBounds(roi)
         .filterDate('2020-09-01' ,'2020-11-01')  
         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 10);
var bandas = ['B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12'];
//Map.addLayer(image,{min:116 ,max:4700, bands:['B8','B4','B11']},'image',false)
// visualizar bandas
var sentinel = image.select(bandas);
print("sentinel" , sentinel);
//Map.addLayer (sentinel,{min:483 ,max:4848, bands:['B8','B4','B11']}, 'sentinel');
// Reducciones
var mediana = sentinel.median();
print( mediana);
//Map.addLayer(mediana, { bands: ['B4','B8','B11']}, 'median');
//para que solo se trabaje en el area de interes
var Img_AEr = mediana.clip(roi);
print(Img_AEr);
var max = sentinel.max();
var maxi = max.clip(roi);
var min = sentinel.min();
var mini = min.clip(roi);
//Map.addLayer(min, {}, 'min');
//print("mini", min);
//var desvio st = sentinel.s
var desv_st = sentinel.reduce(ee.Reducer.stdDev());
print("Dst", desv_st);
var DS = desv_st.clip(roi);
var variance = sentinel.reduce(ee.Reducer.variance());
print("vari", variance);
var varian = variance.clip(roi);
//unir todas las capas en una imagen
var stacking1 = Img_AEr.addBands(maxi);
print('stacking1', stacking1.bandNames());
var stacking2 = stacking1.addBands(mini);
print('stacking2 ', stacking2 .bandNames());
var stacking3  = stacking2 .addBands(DS);
print('stacking3', stacking3.bandNames());
var stacking4 = stacking3.addBands(varian);
print('stacking4', stacking4.bandNames());
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Mask sdt ndvi sentinel2
/*
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
                  // Pre-filter to get less cloudy granules.
var collection = s2.filterDate('2020-04-10','2020-10-25')
     .filterBounds(roi)
     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 2))
     .map(maskS2clouds)
     .select( 'B8','B4','B5');
var addNDVI = function(image) {
  var ndvi2 = image.expression("(nir-red) / (nir+red)", {
    nir : image.select("B8"),
    red : image.select("B4")
  }).rename("ndvi")
  return ndvi2
}
var withNDVI = collection.map(addNDVI)
////STD
var stand = withNDVI.reduce(ee.Reducer.sampleStdDev());
////
var standar = stand.clip(roi);   //le cambié stand  x  image2 que es la maskara de gruesa.
//print (standar);
//Map.addLayer(standar,{max:0.264, min:0.0389},'stD');
var nocult = standar.gt(0.095);
//LO QUE TIENE VALOR x ES AGRÍCOLA
//Map.addLayer(noCNinv,{max: 1, min:0, bands:['stdDev']});
var maskcult = nocult.eq(1);
Map.addLayer(maskcult,{max: 1, min:0,palette: [ 'cyan','blue']},'MasknoAgri');
var masknocult = nocult.eq(0);
*/
///////////////////////////////////FerArias.maskcult
//'2020-07-15', '2020-08-20'
///////////////////////////////////REFLECTANCIAS NIVEL SUPERFICIE/////////////////////////////////////////
//Imagen AGO 2020
var sendica = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2020-11-01', '2020-12-03').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var mosdica = sendica.median();
//Recorte
var Recdica = mosdica.clip(roi);
//Map.addLayer(Recdica, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'RecNov1');
//Imagen SEP1 2019
var sendicb = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2020-11-05', '2020-12-25').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var mosdicb = sendicb.median();
//Recorte
var Recdicb = mosdicb.clip(roi);
//Map.addLayer(Recdicb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'RecNov');
//Imagen SEP2 2020
var senenea = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2020-12-05', '2021-01-10').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var mosenea = senenea.median();
//Recorte
var Recenea = mosenea.clip(roi);
//Map.addLayer(Recenea, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'RecDic');
//Imagen OCT 2020
var seneneb = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2020-12-21', '2021-01-25').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var moseneb = seneneb.median();
//Recorte
var Receneb = moseneb.clip(roi);
//Map.addLayer(Receneb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'RecEnero');
//Imagen NOV 2020
var senfeba = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2021-01-15', '2021-02-15').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var mosfeba = senfeba.median();
//Recorte
var Recfeba = mosfeba.clip(roi);
Map.addLayer(Recfeba, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'IMG 15/01-15/02/21');
/*
//Imagen DIC 2020
var senfebb = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2020-02-16', '2020-03-01').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 30.0);
var mosfebb = senfebb.median();
//Recorte
var Recfebb = mosfebb.clip(roi);
Map.addLayer(Recfebb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'Recfebb');
*/
//Imagen DIC 2020
var senmara = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2021-01-21', '2021-03-17').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 10.0);
var mosmara = senmara.median();
//Recorte
var Recmara = mosmara.clip(roi);
//Map.addLayer(Recmara, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'RecMarz');
//Imagen DIC2 2020
var senmarb = ee.ImageCollection ('COPERNICUS/S2_SR').filterBounds(roi)
           .filterDate('2021-03-01', '2021-04-25').select('B2','B3','B4','B5','B6','B7','B8A','B8','B11','B12').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 20.0);
var mosmarb = senmarb.median();
//Recorte
var Recmarb = mosmarb.clip(roi);
//Map.addLayer(Recmarb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']},'RecAbr');
//Todas las Reflectancias del año
var imgTOTAL= Recdica.addBands ([Recdicb, Recenea, Receneb, Recfeba, Recmara, Recmarb]);
//print (imgTOTAL);
//Map.addLayer(imgTOTAL, {max: 3200, min:1200, bands:['B8_3', 'B8_1_1', 'B8_2']},'Recreflect');
///INDICES VARIOS
//generacion de dicccionario
var bandas_indices = {
  'BLUE_1':  Recdica.select('B2'),
  'GREEN_1': Recdica.select('B3'),
  'RED_1':  Recdica.select('B4'),
  'RDED1_1': Recdica.select('B5'),
  'RDED2_1': Recdica.select('B6'),
  'RDED3_1': Recdica.select('B7'),
  'NIR_1':  Recdica.select('B8'),
  'SWIR1_1': Recdica.select('B11'),
  'SWIR2_1': Recdica.select('B12'),
  'BLUE_2':  Recdicb.select('B2'),
  'GREEN_2': Recdicb.select('B3'),
  'RED_2':  Recdicb.select('B4'),
  'RDED1_2': Recdicb.select('B5'),
  'RDED2_2': Recdicb.select('B6'),
  'RDED3_2': Recdicb.select('B7'),
  'NIR_2':  Recdicb.select('B8'),
  'SWIR_2': Recdicb.select('B11'),
  'SWIR2_2': Recdicb.select('B12'),
  'BLUE_3':  Recenea.select('B2'),
  'GREEN_3': Recenea.select('B3'),
  'RED_3':  Recenea.select('B4'),
  'RDED1_3': Recenea.select('B5'),
  'RDED2_3': Recenea.select('B6'),
  'RDED3_3': Recenea.select('B7'),
  'NIR_3':  Recenea.select('B8'),
  'SWIR_3': Recenea.select('B11'),
  'SWIR2_3': Recenea.select('B12'),
  'BLUE_4':  Receneb.select('B2'),
  'GREEN_4': Receneb.select('B3'),
  'RED_4':  Receneb.select('B4'),
  'RDED1_4':Receneb.select('B5'),
  'RDED2_4':Receneb.select('B6'),
  'RDED3_4':Receneb.select('B7'),
  'NIR_4':  Receneb.select('B8'),
  'SWIR_4': Receneb.select('B11'),
  'SWIR2_4': Receneb.select('B12'),
  'BLUE_5':  Recfeba.select('B2'),
  'GREEN_5': Recfeba.select('B3'),
  'RED_5':  Recfeba.select('B4'),
  'RDED1_5':Recfeba.select('B5'),
  'RDED2_5':Recfeba.select('B6'),
  'RDED3_5':Recfeba.select('B7'),
  'NIR_5':  Recfeba.select('B8'),
  'SWIR_5': Recfeba.select('B11'),
  'SWIR2_5': Recfeba.select('B12'),
  'BLUE_6':  Recmara.select('B2'),
  'GREEN_6': Recmara.select('B3'),
  'RED_6':  Recmara.select('B4'),
  'RDED1_6':Recmara.select('B5'),
  'RDED2_6':Recmara.select('B6'),
  'RDED3_6':Recmara.select('B7'),
  'NIR_6':  Recmara.select('B8'),
  'SWIR_6': Recmara.select('B11'),
  'SWIR2_6': Recmara.select('B12'),
  'BLUE_7':  Recmarb.select('B2'),
  'GREEN_7': Recmarb.select('B3'),
  'RED_7':  Recmarb.select('B4'),
  'RDED1_7':Recmarb.select('B5'),
  'RDED2_7':Recmarb.select('B6'),
  'RDED3_7':Recmarb.select('B7'),
  'NIR_7':  Recmarb.select('B8'),
  'SWIR_7': Recmarb.select('B11'),
  'SWIR2_7': Recmarb.select('B12'),
};
//-----------------------
//        NDVI
//-----------------------Recdica, Recdicb, Recenea, Receneb, Recfeba, Recmara, Recmarb
//Calcular NDVI de cada commposicion
var image_ndvi1 = Recdica.normalizedDifference(['B8','B4']).rename('NDVI1');
var image_ndvi2 = Recdicb.normalizedDifference(['B8','B4']).rename('NDVI2');
var image_ndvi3 = Recenea.normalizedDifference(['B8','B4']).rename('NDVI3');
var image_ndvi4 = Receneb.normalizedDifference(['B8','B4']).rename('NDVI4');
var image_ndvi5 = Recfeba.normalizedDifference(['B8','B4']).rename('NDVI5');
var image_ndvi6 = Recmara.normalizedDifference(['B8','B4']).rename('NDVI6');
var image_ndvi7 = Recmarb.normalizedDifference(['B8','B4']).rename('NDVI7');
//Compilar bandas NDVI
var ndviComposite = image_ndvi1.addBands([image_ndvi2,image_ndvi3,image_ndvi4,image_ndvi5,image_ndvi6,image_ndvi7]);
//print(ndviComposite);
//Map.addLayer(ndviComposite, {bands: ['NDVI2', 'NDVI3', 'NDVI1'], min: 0.1, max: 1.0}, 'NDVIComposite');
//print('NDVI_Composite', ndviComposite);
//--------------------
//        NDVI borde rojo
//--------------------Recoct, Recnov, Recdic, Recdica, Recdicas, Recdicast
var image_ndvire1 = Recdica.normalizedDifference(['B8A','B5']).rename('NDVIre1');
var image_ndvire2 = Recdicb.normalizedDifference(['B8A','B5']).rename('NDVIre2');
var image_ndvire3 = Recenea.normalizedDifference(['B8A','B5']).rename('NDVIre3');
var image_ndvire4 = Receneb.normalizedDifference(['B8A','B5']).rename('NDVIre4');
var image_ndvire5 = Recfeba.normalizedDifference(['B8A','B5']).rename('NDVIre5');
var image_ndvire6 = Recmara.normalizedDifference(['B8A','B5']).rename('NDVIre6');
var image_ndvire7 = Recmarb.normalizedDifference(['B8A','B5']).rename('NDVIre7');
//Compilar bandas NDVIredge
var ndvireComposite = image_ndvire1.addBands([image_ndvire2,image_ndvire3,image_ndvire4,image_ndvire5,image_ndvire6,image_ndvire7]);
//print(ndviComposite);
//Map.addLayer(ndvireComposite, {bands: ['NDVIre2', 'NDVIre3', 'NDVIre1'], min: 0.1, max: 1.0}, 'NDVIreComposite');
//print('NDVIre_Composite', ndvireComposite);
//-----------------------
//        GNDVI
//-----------------------Recdica, Recdicb, Recenea, Receneb, Recfeba, Recmara
var image_gndvi1 =  Recdica.expression('(NIR_1 - GREEN_1) / (NIR_1 + GREEN_1)', bandas_indices).rename('GNDVI1');
print("GNDVI1", image_gndvi1);
//Map.addLayer(image_gndvi1, { min: [-1], max: [1] }, "GNDVI1",false ); 
var image_gndvi2 = Recdicb.expression('(NIR_2 - GREEN_2) / (NIR_2 + GREEN_2)', bandas_indices).rename('GNDVI2');
print("GNDVI2", image_gndvi2);
//Map.addLayer(image_gndvi2, { min: [-1], max: [1] }, "GNDVI2",false ); 
var image_gndvi3 = Recenea.expression('(NIR_3 - GREEN_3) / (NIR_3 + GREEN_3)', bandas_indices).rename('GNDVI3');
print("GNDVI3", image_gndvi3);
//Map.addLayer(image_gndvi3, { min: [-1], max: [1] }, "GNDVI3",false ); 
var image_gndvi4 = Receneb.expression('(NIR_4 - GREEN_4) / (NIR_4 + GREEN_4)', bandas_indices).rename('GNDVI4');
print("GNDVI4", image_gndvi4);
//Map.addLayer(image_gndvi4, { min: [-1], max: [1] }, "GNDVI4",false ); 
var image_gndvi5 = Recfeba.expression('(NIR_5 - GREEN_5) / (NIR_5 + GREEN_5)', bandas_indices).rename('GNDVI5');
print("GNDVI5", image_gndvi5 );
//Map.addLayer(image_gndvi5 , { min: [-1], max: [1] }, "GNDVI5",false ); 
var image_gndvi6 = Recmara.expression('(NIR_6 - GREEN_6) / (NIR_6 + GREEN_6)', bandas_indices).rename('GNDVI6');
print("GNDVI6", image_gndvi6);
//Map.addLayer(image_gndvi6, { min: [-1], max: [1] }, "GNDVI6",false ); 
var image_gndvi7 = Recmarb.expression('(NIR_7 - GREEN_7) / (NIR_7 + GREEN_7)', bandas_indices).rename('GNDVI7');
print("GNDVI7", image_gndvi7);
//Map.addLayer(image_gndvi6, { min: [-1], max: [1] }, "GNDVI6",false );
//Compilar bandas SAVI
var gndviComposite = image_gndvi1.addBands([image_gndvi2,image_gndvi3,image_gndvi4,image_gndvi5,image_gndvi6,image_gndvi7]);
print(gndviComposite);
//Map.addLayer(gndviComposite, {bands: ['GNDVI1', 'GNDVI2', 'GNDVI3'], min: 0.1, max: 1.0}, 'GNDVIComposite', false);
//-----------------------
//        MSAVI
//-----------------------Recdica, Recdicb, Recenea, Receneb, Recfeba, Recmara
var image_msavi1 =  Recdica.expression(
  '(2 * NIR_1 + 1 - sqrt(pow((2 * NIR_1 + 1), 2) - 8 * (NIR_1 - RED_1)) ) / 2', bandas_indices).rename('MSAVI1');
print("MSAVI_1", image_msavi1);
//Map.addLayer(image_msavi1, { min: [-1], max: [1] }, "MSAVI1",false ); 
var image_msavi2 =  Recdicb.expression(
  '(2 * NIR_2 + 1 - sqrt(pow((2 * NIR_2 + 1), 2) - 8 * (NIR_2 - RED_2)) ) / 2', bandas_indices).rename('MSAVI2');
print("MSAVI_2", image_msavi2);
//Map.addLayer(image_msavi2, { min: [-1], max: [1] }, "MSAVI2",false ); 
var image_msavi3 =  Recenea.expression(
  '(2 * NIR_3 + 1 - sqrt(pow((2 * NIR_3 + 1), 2) - 8 * (NIR_3 - RED_3)) ) / 2', bandas_indices).rename('MSAVI3');
print("MSAVI_3", image_msavi3);
//Map.addLayer(image_msavi3, { min: [-1], max: [1] }, "MSAVI3",false ); 
var image_msavi4 =  Receneb.expression(
  '(2 * NIR_4 + 1 - sqrt(pow((2 * NIR_4 + 1), 2) - 8 * (NIR_4 - RED_4)) ) / 2', bandas_indices).rename('MSAVI4');
print("MSAVI_4", image_msavi4);
//Map.addLayer(image_msavi4, { min: [-1], max: [1] }, "MSAVI4",false ); 
var image_msavi5 =  Recfeba.expression(
  '(2 * NIR_5 + 1 - sqrt(pow((2 * NIR_5 + 1), 2) - 8 * (NIR_5 - RED_5)) ) / 2', bandas_indices).rename('MSAVI5');
print("MSAVI_5", image_msavi5);
//Map.addLayer(image_msavi5, { min: [-1], max: [1] }, "MSAVI5",false ); 
var image_msavi6 =  Recmara.expression(
  '(2 * NIR_6 + 1 - sqrt(pow((2 * NIR_6 + 1), 2) - 8 * (NIR_6 - RED_6)) ) / 2', bandas_indices).rename('MSAVI6');
print("MSAVI_6", image_msavi6);
//Map.addLayer(image_msavi6, { min: [-1], max: [1] }, "MSAVI6",false ); 
var image_msavi7 =  Recmarb.expression(
  '(2 * NIR_7 + 1 - sqrt(pow((2 * NIR_7 + 1), 2) - 8 * (NIR_7 - RED_7)) ) / 2', bandas_indices).rename('MSAVI7');
//print("MSAVI_7", image_msavi7);
//Map.addLayer(image_msavi6, { min: [-1], max: [1] }, "MSAVI6",false ); 
//Compilar bandas MSAVI
var msaviComposite = image_msavi1.addBands([image_msavi2,image_msavi3,image_msavi4,image_msavi5,image_msavi6,image_msavi7]);
print(msaviComposite);
//Map.addLayer(msaviComposite, {bands: ['MSAVI1', 'MSAVI2', 'MSAVI3'], min: 0.1, max: 1.0}, 'MSAVIComposite', false);
//-----------------------
//        EVI
//-----------------------Recdica, Recdicb, Recenea, Receneb, Recfeba, Recmara
// General formula: 2.5 * (NIR - RED) / ((NIR + 6*RED - 7.5*BLUE) + 1)
//Calcular el SAVI de cada composicion
var image_evi1 = Recdica.expression('2.5 * (NIR_1 - RED_1) / ((NIR_1 + 6*RED_1 - 7.5*BLUE_1) + 1)', bandas_indices).rename('EVI1');
print("EVI_1", image_evi1);
//Map.addLayer(image_savi1, { min: [-1], max: [1] }, "EV1",false ); 
var image_evi2 = Recdicb.expression('2.5 * (NIR_2 - RED_2) / ((NIR_2 + 6*RED_2 - 7.5*BLUE_2) + 1)', bandas_indices).rename('EVI21');
print("EVI_2", image_evi2);
//Map.addLayer(image_savi2, { min: [-1], max: [1] }, "SAVI2",false ); 
var image_evi3 = Recenea.expression('2.5 * (NIR_3 - RED_3) / ((NIR_3 + 6*RED_3 - 7.5*BLUE_3) + 1)', bandas_indices).rename('EVI3');
print("EVI_3", image_evi3);
//Map.addLayer(image_savi3, { min: [-1], max: [1] }, "SAVI3",false ); 
var image_evi4 = Receneb.expression('2.5 * (NIR_4 - RED_4) / ((NIR_4 + 6*RED_4 - 7.5*BLUE_4) + 1)', bandas_indices).rename('EVI4');
print("EVI_4", image_evi4);
//Map.addLayer(image_savi4, { min: [-1], max: [1] }, "SAVI4",false ); 
var image_evi5 = Recfeba.expression('2.5 * (NIR_5 - RED_5) / ((NIR_5 + 6*RED_5 - 7.5*BLUE_5) + 1)', bandas_indices).rename('EVI5');
print("EVI_5", image_evi5);
//Map.addLayer(image_savi5, { min: [-1], max: [1] }, "SAVI5",false ); 
var image_evi6 = Recmara.expression('2.5 * (NIR_6 - RED_6) / ((NIR_6 + 6*RED_6 - 7.5*BLUE_6) + 1)', bandas_indices).rename('EVI6');
print("EVI_6", image_evi6);
//Map.addLayer(image_savi6, { min: [-1], max: [1] }, "SAVI6",false ); 
var image_evi7 = Recmarb.expression('2.5 * (NIR_7 - RED_7) / ((NIR_7 + 6*RED_7 - 7.5*BLUE_7) + 1)', bandas_indices).rename('EVI7');
//print("EVI_7", image_evi7);
//Map.addLayer(image_savi6, { min: [-1], max: [1] }, "SAVI6",false );
//Compilar bandas SAVI
var eviComposite = image_evi1.addBands([image_evi2,image_evi3,image_evi4,image_evi5,image_evi6,image_evi7]);
print(eviComposite);
//Map.addLayer(saviComposite, {bands: ['SAVI1', 'SAVI2', 'SAVI3'], min: 0.1, max: 1.0}, 'SAVIComposite', false);
//--------------------
//        NDWI
//--------------------Recoct, Recnov, Recdic, Recdica, Recdicas, Recdicast
var ndwi1 =   Recdica.expression('(GREEN_1 - NIR_1) / (GREEN_1 + NIR_1 )', bandas_indices).rename('NDWI1');
print("NDWI1", ndwi1);
//Map.addLayer(ndwi1, { min: [-1], max: [1] }, "NDWI1",false );
var ndwi2 =   Recdicb.expression('(GREEN_2 - NIR_2) / (GREEN_2 + NIR_2 )', bandas_indices).rename('NDWI2');
print("NDWI2", ndwi2);
//Map.addLayer(ndwi2, { min: [-1], max: [1] }, "NDWI2",false );
var ndwi3 =   Recenea.expression('(GREEN_3 - NIR_3) / (GREEN_3 + NIR_3 )', bandas_indices).rename('NDWI3');
print("NDWI3", ndwi3);
//Map.addLayer(ndwi3, { min: [-1], max: [1] }, "NDWI3",false );
var ndwi4 =   Receneb.expression('(GREEN_4 - NIR_4) / (GREEN_4 + NIR_4 )', bandas_indices).rename('NDWI4');
print("NDWI4", ndwi4);
//Map.addLayer(ndwi4, { min: [-1], max: [1] }, "NDWI4",false );
var ndwi5 =   Recfeba.expression('(GREEN_5 - NIR_5) / (GREEN_5 + NIR_5 )', bandas_indices).rename('NDWI5');
print("NDWI5", ndwi5);
//Map.addLayer(ndwi5, { min: [-1], max: [1] }, "NDWI5",false );
var ndwi6 =   Recmara.expression('(GREEN_6 - NIR_6) / (GREEN_6 + NIR_6 )', bandas_indices).rename('NDWI6');
print("NDWI6", ndwi6);
//Map.addLayer(ndwi5, { min: [-1], max: [1] }, "NDWI6",false );
var ndwi7 =   Recmarb.expression('(GREEN_7 - NIR_7) / (GREEN_7 + NIR_7 )', bandas_indices).rename('NDWI7');
//print("NDWI6", ndwi6);
//Map.addLayer(ndwi5, { min: [-1], max: [1] }, "NDWI6",false );
//Compilar bandas NDWI
var ndwiComposite = ndwi1.addBands([ndwi2,ndwi3,ndwi4,ndwi5,ndwi6,ndwi7]);
print(ndwiComposite);
//Map.addLayer(ndwiComposite, {bands: ['NDWI1', 'NDWI2', 'NDWI3'], min: -1, max: 1.0}, 'NDWIComposite', false);
//------------------
//      CGVI
//------------------Recoct, Recnov, Recdic, Recdica, Recdicas, Recdicast
//Calcular GCVI para cada composición
var gcvi1 = Recdica.expression('(NIR_1 / GREEN_1)- 1', bandas_indices).rename('GCVI_1');
print("GCVI1", gcvi1);
//Map.addLayer(gcvi1, { min: [-1], max: [1] }, "GCVI1" , false);
var gcvi2 = Recdicb.expression('(NIR_2 / GREEN_2)- 1', bandas_indices).rename('GCVI_2');
print("GCVI2", gcvi2);
//Map.addLayer(gcvi2, { min: [-1], max: [1] }, "GCVI2" , false);
var gcvi3 = Recenea.expression('(NIR_3 / GREEN_3)- 1', bandas_indices).rename('GCVI_3');
print("GCVI3", gcvi3);
//Map.addLayer(gcvi3, { min: [-1], max: [1] }, "GCVI3" , false);
var gcvi4 = Receneb.expression('(NIR_4 / GREEN_4)- 1', bandas_indices).rename('GCVI_4');
print("GCVI4", gcvi4);
//Map.addLayer(gcvi4, { min: [-1], max: [1] }, "GCVI4" , false);
var gcvi5 = Recfeba.expression('(NIR_5 / GREEN_5)- 1', bandas_indices).rename('GCVI_5');
print("GCVI5", gcvi5);
//Map.addLayer(gcvi5, { min: [-1], max: [1] }, "GCVI5" , false);
var gcvi6 = Recmara.expression('(NIR_6 / GREEN_6)- 1', bandas_indices).rename('GCVI_6');
//print("GCVI6", gcvi6);
//Map.addLayer(gcvi6, { min: [-1], max: [1] }, "GCVI6" , false);
var gcvi7 = Recmarb.expression('(NIR_7 / GREEN_7)- 1', bandas_indices).rename('GCVI_7');
//print("GCVI7", gcvi7);
//Map.addLayer(gcvi6, { min: [-1], max: [1] }, "GCVI6" , false);
//Compilar bandas CGVI
var gcviComposite = gcvi1.addBands([gcvi2,gcvi3,gcvi4,gcvi5,gcvi6,gcvi7]);
print(gcviComposite);
//Map.addLayer(gcviComposite, {bands: ['GCVI_1', 'GCVI_2', 'GCVI_3'], min: 0, max: 3.5}, 'GCVIComposite', false);
//let index = (3.0 * (RDED1_1 - RED_1) - 0.2 * (RDED1_1 - GREEN_1) * RDED1_1 / RED_1) / ((1.0 + 0.16) * (NIR_1 - RED_1) / (NIR_1 + RED_1 + 0.16));
//-----------------------
//        TCARI/OSAVI
//-----------------------Recdica, Recdicb, Recenea, Receneb, Recfeba, Recmara
var image_tcari1 =  Recdica.expression(
  '(3.0 * (RDED1_1 - RED_1) - 0.2 * (RDED1_1 - GREEN_1) * RDED1_1 / RED_1) / ((1.0 + 0.16) * (NIR_1 - RED_1) / (NIR_1 + RED_1 + 0.16))', bandas_indices).rename('TCARI1');
print("TCARI_1", image_tcari1);
//Map.addLayer(image_tcari1, { min: [1122], max: [4706] }, "TCARI1",false ); 
var image_tcari2 =  Recdicb.expression(
  '(3.0 * (RDED1_2 - RED_2) - 0.2 * (RDED1_2 - GREEN_2) * RDED1_2 / RED_2) / ((1.0 + 0.16) * (NIR_2 - RED_2) / (NIR_2 + RED_2 + 0.16))', bandas_indices).rename('TCARI2');
print("TCARI_2", image_tcari2);
//Map.addLayer(image_msavi2, { min: [-1], max: [1] }, "MSAVI2",false ); 
var image_tcari3 =  Recenea.expression(
  '(3.0 * (RDED1_3 - RED_3) - 0.2 * (RDED1_3 - GREEN_3) * RDED1_3 / RED_3) / ((1.0 + 0.16) * (NIR_3 - RED_3) / (NIR_3 + RED_3 + 0.16))', bandas_indices).rename('TCARI3');
print("TCARI_3", image_tcari3);
//Map.addLayer(image_msavi3, { min: [-1], max: [1] }, "MSAVI3",false ); 
var image_tcari4 =  Receneb.expression(
  '(3.0 * (RDED1_4 - RED_4) - 0.2 * (RDED1_4 - GREEN_4) * RDED1_4 / RED_4) / ((1.0 + 0.16) * (NIR_4 - RED_4) / (NIR_4 + RED_4 + 0.16))', bandas_indices).rename('TCARI4');
print("TCARI_4", image_tcari4);
//Map.addLayer(image_tcari4, { min: [-1], max: [1] }, "TCARI4",false ); 
var image_tcari5 =  Recfeba.expression(
  '(3.0 * (RDED1_5 - RED_5) - 0.2 * (RDED1_5 - GREEN_5) * RDED1_5 / RED_5) / ((1.0 + 0.16) * (NIR_5 - RED_5) / (NIR_5 + RED_5 + 0.16))', bandas_indices).rename('TCARI5');
print("TCARI_5", image_tcari5);
//Map.addLayer(image_msavi5, { min: [-1], max: [1] }, "MSAVI5",false ); 
var image_tcari6 =  Recmara.expression(
  '(3.0 * (RDED1_6 - RED_6) - 0.2 * (RDED1_6 - GREEN_6) * RDED1_6 / RED_6) / ((1.0 + 0.16) * (NIR_6 - RED_6) / (NIR_6 + RED_6 + 0.16))', bandas_indices).rename('TCARI6');
print("TCARI_6", image_tcari6);
//Map.addLayer(image_msavi6, { min: [-1], max: [1] }, "MSAVI6",false ); 
var image_tcari7 =  Recmarb.expression(
  '(3.0 * (RDED1_7 - RED_7) - 0.2 * (RDED1_7 - GREEN_7) * RDED1_7 / RED_7) / ((1.0 + 0.16) * (NIR_7 - RED_7) / (NIR_7 + RED_7 + 0.16))', bandas_indices).rename('TCARI7');
//print("TCARI_7", image_tcari7);
//Map.addLayer(image_msavi6, { min: [-1], max: [1] }, "MSAVI6",false );
//Compilar bandas MSAVI
var tcariComposite = image_tcari1.addBands([image_tcari2,image_tcari3,image_tcari4,image_tcari5,image_tcari6,image_tcari7]);
//print(tcariComposite);
//Map.addLayer(tcariComposite, {bands: ['TCARI1', 'TCARI2', 'TCARI3'], min: 854.47, max: 4352.47}, 'tcariComposite', false);
var imgTrabajo= ndviComposite.addBands([ndvireComposite, gndviComposite, msaviComposite, ndwiComposite, gcviComposite,eviComposite,tcariComposite]);
print('IMG_TRABAJO', imgTrabajo);
/*
// Función para enmascarar nubes desde la banda pixel_qa de calidad de Landsat 8 Surface Reflectance
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[2-6]*")
      .copyProperties(image, ["system:time_start"]);
}
// Colección de imágenes y filtrado de las mismas por capa (depto), fechas, % de nubes de escena landsat.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2020-08-10', '2020-11-30')
    .filterMetadata("CLOUD_COVER", "less_than", 20)
    .map(maskL8sr)
// Calculo de la mediana de toda la colección
var composite = collection.median();
print( composite);
var bandas = ['B2','B3','B4','B5','B6'];
// visualizar bandas
var landsat = composite.select(bandas);
//print("landsat" , landsat);
var landsat8 = landsat.clip(roi);
//Map.addLayer(landsat8, {min:0.0432 ,max:0.422,gamma: [0.85, 1.35, 1.1], bands: ['B5','B6','B4']}, 'Landsat8_30mts');
var max = collection.max();
var maxi = max.clip(roi);
var min = collection.min();
var mini = min.clip(roi);
//Map.addLayer(min, {}, 'min');
//print("mini", min);
//var desvio st = sentinel.s
var desv_st = collection.reduce(ee.Reducer.stdDev());
//print("Dst", desv_st);
var DS = desv_st.clip(roi).multiply (2);
//Cálculo NDVI
//generacion de dicccionario
var bandas_indices = {
 'NIR':  landsat8.select('B5'),
  'Green':  landsat8.select('B3'),
  'RED':  landsat8.select('B4'),
  'SWIR': landsat8.select('B6'),
  'BLUE': landsat8.select('B2'),
};
//Luego se indica la ecuación y el diccionario de bandas a utilizar:
var ndvi =  landsat8.expression('10000 * (NIR - RED) / (NIR + RED)', bandas_indices).rename('NDVI');
//print("ndvi", ndvi);
var gndvi =  landsat8.expression('10000 * (NIR - Green) / (NIR + Green)', bandas_indices).rename('GNDVI');
//print("gndvi", gndvi);
var msavi2 =  landsat8.expression(
  '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', bandas_indices).rename('MSAVI2');
//print("msavi2", msavi2);
var evi = landsat8.expression(
    '10000 * 2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', bandas_indices).rename('EVI');
var sratio = landsat8.expression(
    '10000 * (NIR / RED)', bandas_indices).rename('SRATIO');
var ndwi =   landsat8.expression('10000 * (Green - NIR) / (Green + NIR )', bandas_indices).rename('NDWI');
var ndsi =  landsat8.expression('10000 * (SWIR - NIR) / (SWIR + NIR)', bandas_indices).rename('NDSI');
// Shared visualization parameters.
var visParams_ndvi = {
  min: 1000,
  max: 9000,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
//Map.addLayer(ndvi,visParams_ndvi,'NDVI')
// Shared visualization parameters.
var visParams_gndvi = {
  min: 1000,
  max: 9000,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
//Map.addLayer(gndvi,visParams_gndvi,'GNDVI')
// Shared visualization parameters.
var visParams_msavi2 = {
  min: 0.0106,
  max: 0.8027,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
//Map.addLayer(msavi2,visParams_msavi2,'MSAVI2')
//unir todas las capas en una imagen
var stack1 = landsat8.addBands(maxi);
print('stack1', stack1.bandNames());
var stack2 = stack1.addBands(mini);
print('stack2', stack2.bandNames());
var stack3 = stack2.addBands(DS);
print('stack3', stack3.bandNames());
var stack31 = stack3.addBands(msavi2);
print('stack31', stack31.bandNames());
var stack32 = stack31.addBands(ndvi);
print('stack32', stack32.bandNames());
var stack34 = stack32.addBands(evi);
print('stack34', stack34.bandNames());
var stack35 = stack34.addBands(sratio);
print('stack35', stack35.bandNames());
var stack36 = stack35.addBands(ndwi);
print('stack36', stack36.bandNames());
var stack37 = stack36.addBands(ndsi);
print('stack37', stack37.bandNames());
var stack4 = stack37.addBands(gndvi);
print('stack4', stack4.bandNames());
*/
// Load the Sentinel-1 ImageCollection.
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var spring = ee.Filter.date('2020-11-21', '2020-12-31');
var lateSpring = ee.Filter.date('2021-01-01', '2021-01-31');
var summer = ee.Filter.date('2021-02-01', '2021-03-01');
var outum = ee.Filter.date('2021-03-01', '2021-03-29');
var descChange2 = ee.Image.cat(
        desc.filter(spring).mean(),
        desc.filter(lateSpring).mean(),
        desc.filter(summer).mean(),
        desc.filter(outum).mean());
var imgRetro = descChange2.clip(roi);
//Map.addLayer(imgRetro, {min: -25, max: 5}, 'Multi-T Mean DESC', true);
// Create a constant image.
var image1 = ee.Image(imgTOTAL);
// Concatenate two images into one multi-band image. stacking4
//var image28 = ee.Image(stacking4);
var image2 = ee.Image(imgTrabajo);
//var image11 = ee.Image(stack4);
var image21 = ee.Image(imgRetro);
var image31 = ee.Image.cat([image1, image2, image21]);
print(image31);
var image8 = image31.updateMask(water2);
var image3 = image8.updateMask(urb);
//maskcul
///////MUESTRAS, unir verdad de campo. // Muestreo
//var muestras = bajos.merge(mz_temp).merge(maiz_prim).merge(maiz_seg).merge(soja_prim).merge(soja_seg).merge(potrero);
//////////////////////////////////////////////////////////////////////////////////////////////
var seed =  400;
var muestras = muestras.randomColumn('random', seed);
// separo las muestras de Entrenamiento y validación, son independientes. Identificar umbral de separación
var features_train = muestras.filter(ee.Filter.lt('random', 0.70));
var features_test = muestras.filter(ee.Filter.gte('random', 0.70));
print ("training", features_train.size());
print ("testing", features_test.size());
// extraccion de información incluyendo atributos clase y "random"
var training = image3.sampleRegions({
  collection: features_train, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
var testing = image3.sampleRegions({
  collection: features_test, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
print ("train", training.size());
print ("test", testing.size());
//Exportar polígonos de training para analizar matriz de error en Qgis
Export.table.toDrive({
  collection: features_train,
  description: 'Training',
  folder: 'my_folder',
  fileFormat: 'shp'
});
//Exportar polígonos de testing para analizar matriz de error en Qgis
Export.table.toDrive({
  collection: features_test,
  description: 'Testing',
  folder: 'my_folder',
  fileFormat: 'shp'
});
// Entrenamiento
var parametros = {
  numberOfTrees: 127, 
  minLeafPopulation: 1, 
  seed: 15
};
var trained = ee.Classifier.smileRandomForest(parametros).train(training, 'class');
// clasificación con el modelo entrenado
var classified = image3.classify(trained);
// Crea la paleta de colores para pintar el mapa
// tantos colores como clases de  1 a n 
var paleta =['#336600','#85adad','#66ff66','#ff0000','#000000','#ffff00','#92CC92','#ff33cc','#ff66ff','#ffcc00','#66ffff',"#cc9900"];
//Map.addLayer(classified, {min: 1, max: 12, palette: paleta}, 'clasificacion');              
print("clasificacion" , classified);
//************************************************************************** 
// Postproceso reemplazando píxeles aislados con valor circundante
//************************************************************************** 
// tamaño de parche
var patchsize = classified.connectedPixelCount(50, false);
// ejecutar un filtro de mayoría
var filtered1 = classified.focal_mode({
    radius: 28,
    kernelType: 'square',
    units: 'meters',
}); 
// updated image with majority filter where patch size is small
var connectedClassified =  classified.where(patchsize.lt(45),filtered1);
Map.addLayer(connectedClassified, {min: 1, max: 12, palette: paleta}, 'Processed using Connected Pixels');
// Exportar imagen de clasificación
Export.image.toDrive({
  image:connectedClassified,
  description: 'ClassifiedFILTRADA',
  scale: 30,
  maxPixels: 1.0E13,
  region: roi
});
/*var reclass = connectedClassified.remap([1,2,3,4,5,6,7,8,9,10,11,12,13,14],[1,1,1,1,2,2,3,3,1,2,2,4,5,1])
;
Map.addLayer(reclass, {palette: ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#003300']}, 'reclass');
// Exportar imagen de clasificación
Export.image.toDrive({
  image:reclass,
  description: 'reclassdelLincoln',
  scale: 30,
  maxPixels: 1.0E13,
  region: roi
});
*/
// Generación de matriz de confusión y resultados
/*var training_pred = training.classify(trained);
var errorMatrix_training = training_pred.errorMatrix('clase', 'classification');  
print('Matriz de Confusión Training:', errorMatrix_training);
print('Exactitud General Training:', errorMatrix_training.accuracy());
print('Indice Kappa Training:', errorMatrix_training.kappa());
print('Exactitudes de Usuario Training:', errorMatrix_training.consumersAccuracy());
print('Exactitudes de Productor Training:', errorMatrix_training.producersAccuracy());
*/
var validation = testing.classify(trained);
var errorMatrix = validation.errorMatrix('class', 'classification');
print('Matriz de Confusión:', errorMatrix);
print('Exactitud General:', errorMatrix.accuracy());
print('Indice Kappa:', errorMatrix.kappa());
print('Exactitudes de Usuario:', errorMatrix.consumersAccuracy());
print('Exactitudes de Productor:', errorMatrix.producersAccuracy());
var exportAccuracy = ee.Feature(null, {matrix: errorMatrix.array()})
// Export the FeatureCollection.
Export.table.toDrive({
  collection: ee.FeatureCollection(exportAccuracy),
  description: 'exportAccuracy',
  fileFormat: 'CSV'
});
/*
//Definir imagen sobre la cual se quieren realizar los calculos de area
var imagen = classified;
//Definir region en caso de que el calculo se quiera hacer sobre una subregion de la imagen
var region = roi
var areaDict = ee.Image.pixelArea().divide(10000).addBands(imagen)
  .reduceRegion({
    reducer: ee.Reducer.sum().group(1),
    geometry: region.geometry(), //cambiar imagen por region en esta línea en caso de usar una subregion
    scale: 30,
    maxPixels: 1.0E13,
  });
var areas = ee.List(areaDict.get('groups')).map(function(obj) { 
  return ee.Dictionary(obj).get('sum')})
var areas2 = areas.getInfo();
for (var loop = 0; loop < areas2.length; ++loop)
{var loop2 = loop + 1;
 var numero = ee.Number.parse(areas2[loop].toString()).format('%,.2f');
print( 'Clase ' + loop2 + ' = ' + numero.getInfo() + ' ha')}
*/
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('336600', 'CLASS1: PP'));
legend.add(makeRow('85adad', 'CLASS2: BARB'));
legend.add(makeRow('66ff66', 'CLASS3: CN'));
legend.add(makeRow('ff0000', 'CLASS4: GIR'));
legend.add(makeRow('000000', 'CLASS5: PAPA'));
legend.add(makeRow('ffff00', 'CLASS6: MAIZ1'));
legend.add(makeRow('92CC92', 'CLASS7: SORGO'));
legend.add(makeRow('ff33cc', 'CLASS8: SOJA1'));
legend.add(makeRow('ff66ff', 'CLASS9: SOJA2'));
legend.add(makeRow('ffcc00', 'CLASS10: MAIZ2'));
legend.add(makeRow('66ffff', 'CLASS11: BAJOS'));
legend.add(makeRow('cc9900', 'CLASS11: MONTES'));
//var paleta =['#336600','#85adad','#66ff66','#ff0000','#000000','#ffff00','#92CC92','#ff33cc','#ff66ff','#ffcc00','#66ffff',"#4d2600"];
Map.add(legend);
// Exportar imagen de clasificación
Export.image.toDrive({
  image:classified,
  description: 'clasificacion',
  folder: 'my_folder',
  scale: 30,
  maxPixels: 1.0E13,
  region: roi
});
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'LULC:  Tandil, PAPA -  C.Gruesa 20/21 ' 
    , {fontWeight: 'bold', fontSize: '20px'}));
/******************Grafico de tortas****************************/
/********************************************Gráfico de áreas**************************************************/
var imagen = classified
var nomes = ['pasturas','barbechos','cnatural','girasol','papa','maiz1','sorgo','soja1','soja2','maiz2','bajos','montes']
var renomeado = imagen.eq([1,2,3,4,5,6,7,8,9,10,11,12]).rename(nomes)
print('classes', renomeado)
var area = renomeado.multiply(ee.Image.pixelArea()).divide(10000) //para converter para hectares (ha)
var area_por_classe = area.reduceRegion({
  reducer: ee.Reducer.sum(), //quero somar a área total
  geometry: roi5,
  scale:40, 
  crs:'EPSG: 4326', 
 // bestEffort: true, 
  maxPixels:1e13})
var area_total = ee.Number(area_por_classe)
print('area total por clase',area_total)
/*Criando listas array*/
var a = ee.Array(area_por_classe.get('pasturas'))
var b = ee.Array(area_por_classe.get('barbechos'))
var c = ee.Array(area_por_classe.get('cnatural'))
var d = ee.Array(area_por_classe.get('girasol'))
var e = ee.Array(area_por_classe.get('papa'))
var f = ee.Array(area_por_classe.get('maiz1'))
var g = ee.Array(area_por_classe.get('sorgo'))
var h = ee.Array(area_por_classe.get('soja1'))
var i = ee.Array(area_por_classe.get('soja2'))
var j = ee.Array(area_por_classe.get('maiz2'))
var k = ee.Array(area_por_classe.get('bajos'))
var l = ee.Array(area_por_classe.get('montes'))
var lista = ee.List([a,b,c,d,e,f,g,h,i,j,k,l])
var Nomes = ee.List(nomes)
var grafico_area = ui.Chart.array.values(lista,0, Nomes)
.setChartType('PieChart')
.setOptions(
  {width: 450,
  height: 550,
  title: 'Area por clase (Has)',
  is3D: true,
  colors: paleta})
//print(grafico_area)
grafico_area.style().set({
  position: 'bottom-left',
  width: '550px',
  height: '280px'
});
Map.add(grafico_area);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: muestras,
  color: 1,
  width: 1
});
//Map.addLayer(outline, {palette: 'yellow'}, 'Muestras');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: '001327'}, 'Deptos');