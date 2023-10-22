var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -92.98185584809166,
                17.176315078386203
              ],
              [
                -92.98185584809166,
                16.495445367464377
              ],
              [
                -91.9793534066854,
                16.495445367464377
              ],
              [
                -91.9793534066854,
                17.176315078386203
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-92.98185584809166, 17.176315078386203],
          [-92.98185584809166, 16.495445367464377],
          [-91.9793534066854, 16.495445367464377],
          [-91.9793534066854, 17.176315078386203]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/felipegee/AreaDeEstudioChiapas"
    }) || ee.FeatureCollection("users/felipegee/AreaDeEstudioChiapas"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4"
        ],
        "max": 3000,
        "gamma": 6.47
      }
    }) || {"opacity":1,"bands":["B4"],"max":3000,"gamma":6.47};
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
function createDate(date,range){
    var date1=new Date(date);
        date1.setDate(date1.getDate() + 1 - range);
    var date2=new Date(date);
        date2.setDate(date2.getDate() + 1);
        //date2.setDate(date2.getDate() + 2 - range);
    var ddi=date1.getDate()+1;
    var mmi=date1.getMonth()+1;
    var yyyyi=date1.getFullYear();
    var ddf=date2.getDate()+1;
    var mmf=date2.getMonth()+1;
    var yyyyf=date2.getFullYear();
    //start date
    if(ddi<10){ddi='0'+ddi;} 
    if(mmi<10){mmi='0'+mmi;}
    var string1 = yyyyi+'-'+mmi+'-'+ddi;
    //end date
    if(ddf<10){ddf='0'+ddf;} 
    if(mmf<10){mmf='0'+mmf;}
    var string2 = yyyyf+'-'+mmf+'-'+ddf;
    var strings=[string1,string2];
    return strings;
}
//load image by Id
print("Ingresa fecha y MGRS_TILE (Pe.2018-05-18 15QVU )");
var idimage = ui.Textbox({
  placeholder: 'yyyy-mm-dd tile',
  onChange: function(text) {
    print('COPERNICUS/S2/' + text + '?');
    var imgS2=ee.ImageCollection("COPERNICUS/S2");
    var parametros=text.split(" ");
    var mgrsTile=parametros[1];
    var strings1=createDate(parametros[0],1);
    var strings2=createDate(parametros[0],60);
    print(strings1);
    print("parametro 2",strings2);
    var cloudyImage = ee.Image((imgS2.filterDate(strings1[0],strings1[1]).filterMetadata('MGRS_TILE','equals',mgrsTile)).first());
    print(cloudyImage.getInfo());
    var polygono2=cloudyImage.geometry();
    var polygono=ee.Geometry.Polygon(cloudyImage.geometry().getInfo()["coordinates"]);
    //var polygono=ee.Geometry(cloudyImage.geometry(),null,false);
    print(polygono2.geodesic());
    //var planarPolygon = ee.Geometry.transform(polygono2, null, false);
    //print(planarPolygon);
    var box =cloudyImage.geometry().getInfo()["coordinates"]
    print(box);
    //print(polygono);
    Map.centerObject(cloudyImage, 10);
    Map.addLayer(cloudyImage, {bands: ['B4', 'B3', 'B2'], max: 2000}, 'cloudy image');
  var imagever = cloudyImage.visualize({
    bands: ['B3', 'B2', 'B1'],
    min: 0,
    max: 2000,
    gamma: [1, 1, 1.5]
  });
    // Print a thumbnail to the console.
    print(ui.Thumbnail({
      image: imagever,
      params: {
        dimensions: '256x256',
        //region: polygono,
        format: 'png'
      },
      style: {height: '300px', width: '300px'}
    }));
    var cloud_mask=maskS2clouds(cloudyImage);
    var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(strings2[0], strings2[1])
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(polygono)
                  .map(maskS2clouds);
    var visualization = {
      min: 0.0,
      max: 0.3,
      bands: ['B4', 'B3', 'B2'],
      maxPixels: 1e9,
    };
    var visualization_mej={
      min:0.0,
      max:0.3,
      bands:['B4','B3','B2'],
      maxPixels: 1e9,
    };
    var datos_coleccion=dataset.median();
    var coleccion=ee.ImageCollection([cloud_mask,datos_coleccion]);
    //var coleccion2=ee.ImageCollection([cloudyImage,cloudyImage]);
    //Map.addLayer(coleccion2,visualization,'coleccion2');
    //Map.addLayer(cloudyImage, {bands: ['B4', 'B3', 'B2'], max: 2000}, 'cloudy image2');
    var final_median=coleccion.median().updateMask(cloudyImage);
    var final_min=coleccion.min().updateMask(cloudyImage);
    //var final_minimo=coleccion2.min();
    Map.addLayer(final_min.clip(table),visualization,'final_min');
    Map.addLayer(final_median.clip(table),visualization_mej,'final_median');
    Map.addLayer(cloud_mask,{bands:['B4'], max:2000},'mascara_nubes');
    Map.setCenter(-93.0921, 16.7309, 12);
    Map.centerObject(cloudyImage,10);
    //print(final_min)
   // var imagemuestra = ee.Image('COPERNICUS/S2/20180518T163039_20180518T164858_T15QVU');
  //  Map.addLayer(imagemuestra,{bands: ['B4', 'B3', 'B2'], max: 2000},"prueba");
    //Direct Download
    var URLDescarga =final_min.getDownloadURL({
    scale: 400,// Resolucion de pixel de todas las bandas a exportar
    tileScale:15,
    maxPixels: 1e9 ,
    region: geometry});
    print("--ENLACE DE DESCARGA-->>",URLDescarga);
    var task_name=strings1[0]+'_'+mgrsTile;
    //Export to Drive+
    Export.image.toDrive({
    //image: final_min.select("B1", "B2", "B3", "B4","B5", "B6", "B7", "B8"),
    //image: final_min.select("B4","B3", "B2"),
    image: final_min.select("B4",
                            "B3",
                            "B2",
                            "B4",
                            "B5",
                            "B6",
                            "B7",
                            "B8",
                            "B8A",
                            "B9",
                            "B10",
                            "B11",
                            "B12"),
    region:table,
    description: 'Final_min_'+task_name,
    maxPixels: 1e9,
    scale: 10}); 
    //Export to Drive
    Export.image.toDrive({
    //image: final_median.select("B1", "B2", "B3", "B4","B5", "B6", "B7", "B8"),
    image: final_median.select("B4","B3", "B2"),
    region:table,
    description: 'Final_median_'+task_name,
    maxPixels: 1e9,
    scale: 10});
    Map.addLayer(polygono);
}});//end function
print(idimage);
Map.addLayer(table,{},'área de interes');
/*
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-05-18', '2018-05-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  //.map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 2000,
  bands: ['B4', 'B3', 'B2'],
};
//Map.setCenter(-9.1695, 38.6917, 12);
Map.addLayer(dataset.median(), rgbVis, 'RGB');
*/