var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "min": -0.005168445583265673,
        "max": 0.001513811894723139,
        "gamma": 2
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"min":-0.005168445583265673,"max":0.001513811894723139,"gamma":2},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b2"
        ],
        "palette": [
          "ff0000",
          "0400ff"
        ]
      }
    }) || {"opacity":1,"bands":["b2"],"palette":["ff0000","0400ff"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.94989013671875,
                40.63452780219729
              ],
              [
                -3.94989013671875,
                40.18699387274801
              ],
              [
                -3.436279296875,
                40.18699387274801
              ],
              [
                -3.436279296875,
                40.63452780219729
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0c29d6",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0c29d6 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.94989013671875, 40.63452780219729],
          [-3.94989013671875, 40.18699387274801],
          [-3.436279296875, 40.18699387274801],
          [-3.436279296875, 40.63452780219729]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -18.35443749743107,
                62.52065236468946
              ],
              [
                -18.587042642199858,
                27.127814296246303
              ],
              [
                -14.19503224745194,
                27.3706701591944
              ],
              [
                -9.714676721883974,
                32.45375585772219
              ],
              [
                -6.575408395359631,
                35.933370322292014
              ],
              [
                -4.085653104103915,
                35.944680097996006
              ],
              [
                -1.4558177722321604,
                36.18576902174436
              ],
              [
                6.013739211461034,
                37.76046852358932
              ],
              [
                11.489896093107099,
                37.36527795069332
              ],
              [
                12.509122881727489,
                34.06397384705011
              ],
              [
                30.24933153010136,
                32.004362409545806
              ],
              [
                32.61075385679395,
                32.24977294565576
              ],
              [
                34.991553113840986,
                32.74765078082003
              ],
              [
                35.51625742517202,
                36.64538926494076
              ],
              [
                33.61981056846377,
                35.773558552353215
              ],
              [
                27.457514418823987,
                36.81975690260979
              ],
              [
                26.334846188441453,
                40.58393577652269
              ],
              [
                28.04817146998083,
                42.32994348282157
              ],
              [
                30.309718959483835,
                45.29098017476246
              ],
              [
                28.83979638880278,
                46.467258105090515
              ],
              [
                27.126810211494654,
                48.426146045190485
              ],
              [
                24.360183583151628,
                50.590064740951675
              ],
              [
                24.01624263417345,
                54.01359303022474
              ],
              [
                20.759942747324494,
                57.04808967325265
              ],
              [
                19.53033932759187,
                63.30652672715781
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
        [[[-18.35443749743107, 62.52065236468946],
          [-18.587042642199858, 27.127814296246303],
          [-14.19503224745194, 27.3706701591944],
          [-9.714676721883974, 32.45375585772219],
          [-6.575408395359631, 35.933370322292014],
          [-4.085653104103915, 35.944680097996006],
          [-1.4558177722321604, 36.18576902174436],
          [6.013739211461034, 37.76046852358932],
          [11.489896093107099, 37.36527795069332],
          [12.509122881727489, 34.06397384705011],
          [30.24933153010136, 32.004362409545806],
          [32.61075385679395, 32.24977294565576],
          [34.991553113840986, 32.74765078082003],
          [35.51625742517202, 36.64538926494076],
          [33.61981056846377, 35.773558552353215],
          [27.457514418823987, 36.81975690260979],
          [26.334846188441453, 40.58393577652269],
          [28.04817146998083, 42.32994348282157],
          [30.309718959483835, 45.29098017476246],
          [28.83979638880278, 46.467258105090515],
          [27.126810211494654, 48.426146045190485],
          [24.360183583151628, 50.590064740951675],
          [24.01624263417345, 54.01359303022474],
          [20.759942747324494, 57.04808967325265],
          [19.53033932759187, 63.30652672715781]]]),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/Corr_iss050e12304RGo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss050e12304RGo2_rect"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/pmisson/Corr_iss050e12307RGo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss050e12307RGo2_rect"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/pmisson/Corr_iss050e12309RGo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss050e12309RGo2_rect"),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "min": 0.003,
        "max": 0.1,
        "gamma": 2
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"min":0.003,"max":0.1,"gamma":2},
    table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/pmisson/ne_10m_coastline"
    }) || ee.FeatureCollection("users/pmisson/ne_10m_coastline"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/Corr_EUg0RGBA_pre2013_47"
    }) || ee.Image("users/pmisson/Corr_EUg0RGBA_pre2013_47");
var imageVisParam = {"opacity":1,"bands":["b1","b2","b3"],"min":-0.005168445583265673,"max":0.001513811894723139,"gamma":2},
    imageVisParam2 = {"opacity":1,"bands":["b2"],"palette":["ff0000","0400ff"]},
    geometry = 
    /* color: #0c29d6 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.94989013671875, 40.63452780219729],
          [-3.94989013671875, 40.18699387274801],
          [-3.436279296875, 40.18699387274801],
          [-3.436279296875, 40.63452780219729]]], null, false),
    geometry2 = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-18.35443749743107, 62.52065236468946],
          [-18.587042642199858, 27.127814296246303],
          [-14.19503224745194, 27.3706701591944],
          [-9.714676721883974, 32.45375585772219],
          [-6.575408395359631, 35.933370322292014],
          [-4.085653104103915, 35.944680097996006],
          [-1.4558177722321604, 36.18576902174436],
          [6.013739211461034, 37.76046852358932],
          [11.489896093107099, 37.36527795069332],
          [12.509122881727489, 34.06397384705011],
          [30.24933153010136, 32.004362409545806],
          [32.61075385679395, 32.24977294565576],
          [34.991553113840986, 32.74765078082003],
          [35.51625742517202, 36.64538926494076],
          [33.61981056846377, 35.773558552353215],
          [27.457514418823987, 36.81975690260979],
          [26.334846188441453, 40.58393577652269],
          [28.04817146998083, 42.32994348282157],
          [30.309718959483835, 45.29098017476246],
          [28.83979638880278, 46.467258105090515],
          [27.126810211494654, 48.426146045190485],
          [24.360183583151628, 50.590064740951675],
          [24.01624263417345, 54.01359303022474],
          [20.759942747324494, 57.04808967325265],
          [19.53033932759187, 63.30652672715781]]]),
    image2 = ee.Image("users/pmisson/Corr_iss050e12304RGo2_rect"),
    image3 = ee.Image("users/pmisson/Corr_iss050e12307RGo2_rect"),
    image4 = ee.Image("users/pmisson/Corr_iss050e12309RGo2_rect"),
    imageVisParam3 = {"opacity":1,"bands":["b1","b2","b3"],"min":0.003,"max":0.1,"gamma":2},
    table = ee.FeatureCollection("USDOS/LSIB/2013"),
    table2 = ee.FeatureCollection("users/pmisson/ne_10m_coastline");
var image= ee.Image("users/pmisson/ISS053-E-64480o1_com");
var image2= ee.Image("users/pmisson/ISS046-E-33024o1_com");
var image3= ee.Image("users/pmisson/Madrid_ISS54");
var image4= ee.Image("users/pmisson/ISS041-E-45419o1_com");
var image5= ee.Image("users/pmisson/ISS053-E-384144o1_com");
var image6= ee.Image("users/pmisson/ISS053-E-384289o1_com");
var image7= ee.Image("users/pmisson/test4_10");
var image8= ee.Image("users/pmisson/ISS2/ISS053-E-45421o1_com");
var image9= ee.Image("users/pmisson/Bilbao_DSC5990_modificado");
var image10= ee.Image("users/pmisson/Granada_hires");
var image11= ee.Image("users/pmisson/ISS047-E-23000_modificado");
var image12= ee.Image("users/pmisson/Bilbao_DSC5990_modificado");
var image13= ee.Image("users/pmisson/Corr_EUZ3RGBA");
var image14= ee.Image("users/pmisson/Corr_EUg0RGBA_pre2013_48");
//var image15= ee.Image("users/pmisson/Corr_EUZ0RGBA_corp");
var image15= ee.Image("users/pmisson/Corr_EUg0RGBA_post2013_46");
var image16= ee.Image("users/pmisson/Corr_ITa0RGBA");
var image17= ee.Image("users/pmisson/Corr_ITb0RGBA");
var image18=ee.Image("users/pmisson/Corr_EUg0RGBA_XGR");
var image19=ee.Image("users/pmisson/Corr_EUg0RGBA_XBG");
var image20=ee.Image("users/pmisson/Corr_EUg0RGBA_post2013GR");
var image21=ee.Image("users/pmisson/Corr_EUg0RGBA_post2013BG");
var image22=ee.Image("users/pmisson/AndaluciaRGB");
var image23=ee.Image("users/pmisson/Corr_iss050e12309RGo2_rect")
var image24=ee.Image("users/pmisson/Corr_iss050e12304RGo2_rect")
var image25=ee.Image("users/pmisson/Corr_iss050e12307RGo2_rect")
print(image13)
image14=image14.clip(geometry2)
var image14mask=image14.select('b3').lt(1000)
var image14=image14.multiply(image14mask)
image15=image15.clip(geometry2)
var country= "AD"
var  maineCounties  = ee.FeatureCollection('ft:1-fuX6trVENSAd6bNH5N4so6RsOcMZU8f4_qchoN6').filter(ee.Filter.eq('name', country));
var BG1 = image15.select('b3').divide(image15.select('b2')) //Band b3 is Blue, b2 is G , b1 is Red. Pre 2013
var GR2 = image15.select('b2').divide(image15.select('b1'))
var RG3 = image15.select('b1').divide(image15.select('b2'))
var BrGpRpost = image15.select('b3').divide(image15.select('b2').add(image15.select('b1')))
var BG1_2 = image14.select('b3').divide(image14.select('b2'))//Band b3 is Blue, b2 is G , b1 is Red. Post 2013
var GR2_2 = image14.select('b2').divide(image14.select('b1'))
var RG3_2 = image14.select('b1').divide(image14.select('b2'))
var BrGpRpre = image15.select('b3').divide(image15.select('b2').add(image15.select('b1')))
var BG1_3 = image16.select('b3').divide(image16.select('b2'))//Band b3 is Blue, b2 is G , b1 is Red. Post 2017 italy
var GR2_3 = image16.select('b2').divide(image16.select('b1'))
var RG3_3 = image16.select('b1').divide(image16.select('b2'))
var BG1_4 = image17.select('b3').divide(image17.select('b2'))//Band b3 is Blue, b2 is G , b1 is Red. Post 2017 italy
var GR2_4 = image17.select('b2').divide(image17.select('b1'))
var RG3_4 = image17.select('b1').divide(image17.select('b2'))
var BG1_5 = image22.select('b3').divide(image22.select('b2'))//Band b3 is Blue, b2 is G , b1 is Red. Post 2017 italy
var GR2_5 = image22.select('b2').divide(image22.select('b1'))
var RG3_5 = image22.select('b1').divide(image22.select('b2'))
var VIIRS201211 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121101");
var VIIRS201311 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131101");
var VIIRS201811 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181101");
var vizParams2 = {
  bands:["avg_rad"],
  min: 0.5,
  max: 200,
  gamma: 3.0,
};
var vizParamsX = {
  bands:["avg_rad_2","avg_rad_1","avg_rad"],
  min: 0.5,
  max: 200,
  gamma:[1.8, 2.8, 3.9],
};
var vizParams3 = {
  min: 0.0025,
  max:0.1,
  gamma: [2, 2, 4],
};
var vizParams4 = {
  min: 0,
  max:2,
  gamma: 3.0,
};
var vizParams5 = {
  min: 0,
  max:1,
  gamma: 1.0,
};
Map.setCenter(13.3753, 52.4926, 10);
//Map.addLayer(VIIRS201211, vizParams2, 'VIIRS_20121101',true);
Map.addLayer(VIIRS201311, vizParams2, 'VIIRS_20131101',true);
Map.addLayer(VIIRS201811, vizParams2, 'VIIRS_20181101',true);
//Map.addLayer(image25, {}, 'UK High ',false);
//Map.addLayer(image24, {}, 'UK High ',false);
//Map.addLayer(image23, {}, 'UK High ',false);
//Map.addLayer(image22, vizParams3, 'Spain High 2013 ');
//Map.addLayer(image7, {}, 'North_EU_to_Egipt');
//Map.addLayer(image8, {}, 'UK');
//Map.addLayer(image3, {}, 'Madrid');
//Map.addLayer(image2, {}, 'Germany');
//Map.addLayer(image, {}, 'Scotland');
//Map.addLayer(image4, {}, 'Italy');
//Map.addLayer(image5, {}, 'Spain');
//Map.addLayer(image6, {}, 'Spain');
//Map.addLayer(image11, {}, 'Gran Bilbao');
//Map.addLayer(image9, {}, 'Bilbao');
//Map.addLayer(image10, {}, 'Granada');
Map.addLayer(image14, vizParams3, 'Europe pre 2013 RAW'); 
//Map.addLayer(image14b, vizParams3, 'Europe pre 2013 RAWb');
//Map.addLayer(image13, vizParams3, 'Europe post 2013');
Map.addLayer(image15, vizParams3, 'Europe post 2013 RAW');
var BG1mask=BG1.lt(1.2);
var GR2mask=GR2.lt(1.2);
var RG3mask=RG3.lt(6);
var maskR=image15.select('b1').gt(0.0025);
var maskG=image15.select('b2').gt(0.0025);
var mask2=maskR.multiply(BG1mask).multiply(GR2mask).multiply(RG3mask).multiply(maskG);
var image152=image15.multiply(mask2);
image152.unmask(0);
var BrGpRpost2=BrGpRpost.multiply(mask2) ;
Export.image.toDrive({
  image: BrGpRpost2,
  description: 'BrGpRpost2',
  scale: 500,
  region: geometry2
});
var BG1mask2=BG1_2.lt(1.2)
var GR2mask2=GR2_2.lt(1.2)
var RG3mask2=RG3_2.lt(6)
var maskG_2=image14.select('b2').gt(0.0025);
var maskR_2=image14.select('b1').gt(0.0025)
var mask2_2=maskR_2.multiply(BG1mask2).multiply(GR2mask2).multiply(RG3mask2).multiply(maskG_2)
var image142=image14.multiply(mask2_2).multiply(mask2)
image152=image152.multiply(mask2_2)
image152.unmask(0);
image142.unmask(0);
Map.addLayer(image142, vizParams3, 'Europe pre 2013 B');//----------
Map.addLayer(image152, vizParams3, 'Europe post 2013 B'); //----------------
var BrGpRpre2=BrGpRpre.multiply(mask2_2) 
Export.image.toDrive({
  image: image142,
  description: 'Europepre2013B',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: image152,
  description: 'Europepost2013B',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: BrGpRpre2,
  description: 'BrGpRpre2',
  scale: 500,
  region: geometry2
});
var BG1mask_3=BG1_3.lt(1)
var GR2mask_3=GR2_3.lt(1)
var RG3mask_3=RG3_3.lt(6)
var mask_3=image16.select('b1').gt(0.0025)
var mask2_3=mask_3.multiply(BG1mask_3).multiply(GR2mask_3).multiply(RG3mask_3)
var image162=image16.multiply(mask2_3)
//Map.addLayer(image162, vizParams3, 'Italia post 2017 B',false); //--------------
var BG1mask2_4=BG1_4.lt(1)
var GR2mask2_4=GR2_4.lt(1)
var RG3mask2_4=RG3_4.lt(6)
var mask_4=image17.select('b1').gt(0.0025)
var mask2_4=mask_4.multiply(BG1mask2_4).multiply(GR2mask2_4).multiply(RG3mask2_4)
var image172=image17.multiply(mask2_4)
//Map.addLayer(image172, vizParams3, 'Italia pre 2017 B',false); //-----------
VIIRS201211 = VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, 500);
var maskVIIRS=VIIRS201211.select('avg_rad').gt(0.3)
var BG1mask2_5=BG1_5.lt(1)
var GR2mask2_5=GR2_5.lt(1)
var RG3mask2_5=RG3_5.lt(6)
var mask_5=image22.select('b1').gt(0.0025)
var mask2_5=mask_5.multiply(BG1mask2_5).multiply(GR2mask2_5).multiply(RG3mask2_5)
var image222=image22.multiply(mask2_5)
image222=image222.resample('bicubic')
var image222=image222.reproject(ee.Projection('EPSG:3035'), null, 500);
var image222=image222.multiply(maskVIIRS)
//Map.addLayer(maskVIIRS, {}, 'mask'); //-----------
//Map.addLayer(image222, vizParams3, 'Spain B',false); //-----------
//alert('Please, read the terms of use.');
//Map.addLayer(mask2, {}, 'Europe post 2013 mask ');
//Map.addLayer(BG1mask, {}, 'Europe post 2013 maskGR1 ');
//Map.addLayer(GR2mask, {}, 'Europe post 2013 maskGR2 ');
var vis = {min: 0.3, max: 1, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF']
};
var vis2 = {min: 0.2, max: 0.7, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF']
};
/////////
//     
//       Post 2013 GR BG maps
//
/////////
var samplinfactor=500;
var BG1_post = image152.select('b3').divide(image152.select('b2')).multiply(mask2_2).multiply(mask2)
var maskBG1_post=BG1_post.gt(0.0);
var BG1_post=BG1_post.mask(maskBG1_post);
var GR2_post = image152.select('b2').divide(image152.select('b1')).multiply(mask2_2).multiply(mask2)
var maskGR2_post=GR2_post.gt(0.0);
var GR2_post=GR2_post.mask(maskGR2_post);
Map.addLayer(BG1_post, vis2,'Europe post 2013 maskBG1 RAW',false);
Map.addLayer(GR2_post, vis, 'Europe post 2013 maskGR2 RAW',false);
GR2_post=GR2_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
BG1_post=BG1_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
Export.image.toDrive({
  image: GR2_post,
  description: 'GR2_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: BG1_post,
  description: 'BG1_post',
  scale: 500,
  region: geometry2
});
var samplinfactor=500;//20000 funciona
VIIRS201211=VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var maskVIIRS=VIIRS201211.gt(0.1)
BG1_2=BG1_2.resample('bicubic')
var BG1_2 =BG1_2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
GR2_2=GR2_2.resample('bicubic')
var GR2_2 =GR2_2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var BG1_2=image21
var GR2_2=image20
BG1_2=BG1_2.multiply(maskVIIRS)
GR2_2=GR2_2.multiply(maskVIIRS)
BG1_2=BG1_2.unmask(0)
//Map.addLayer(GR1,vizParams5, 'GR Europe Post 2013');
//Map.addLayer(GR2,vizParams5, 'GR Europe Pre 2013');
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, true, true, true)
//Map.addLayer(geometry, {}, 'Hot spots Madrid');
Map.setCenter(10,45, 5);
//Map.addLayer(BG1_2.select('avg_rad'), vis2,'Europe post 2013 maskBG1 Interp RAW');
//Map.addLayer(GR2_2.select('avg_rad'), vis, 'Europe post 2013 maskGR2 Interp RAW',false);
////////////////////////// 
///
///   Post 2013 GR
///
///////////////////////////////
var mask = GR2_2.select('avg_rad').gt(0.1);
var GR2M = GR2_2.updateMask(mask);
GR2M.unmask(0.33)
var texture2=GR2M.select('avg_rad').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(5),
});
//Map.addLayer(texture2.select('avg_rad_median'),vis, 'Europe post 2013 maskGR2-1 ',false);
//Pre 2013 GR BG maps
var BG1_pre = image142.select('b3').divide(image142.select('b2')).multiply(mask2_2).multiply(mask2)
var maskBG1_pre=BG1_pre.gt(0.0);
var BG1_pre=BG1_pre.mask(maskBG1_pre);
var GR2_pre = image142.select('b2').divide(image142.select('b1')).multiply(mask2_2).multiply(mask2)
var maskGR2_pre=GR2_pre.gt(0.0);
var GR2_pre=GR2_pre.mask(maskGR2_pre);
var MSIGR_pre=GR2_pre.expression('GR*0.58121064-0.08774834', {
      'GR': GR2_pre});
var MSIGR_pre= MSIGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);      
var VIIRSGR_pre=GR2_pre.expression('GR*1.57391517+0.21274293', {
      'GR': GR2_pre});
var VIIRS201311 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131101");
var VIIRS201811 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181101");
var MSIBG_pre=BG1_pre.expression('BG*1.23908309-0.02733524', {
      'BG': BG1_pre});
var VIIRSBBG_pre=BG1_pre.expression('1.3628493*BG**2+0.59881705*BG-0.03733341', {
      'BG': BG1_pre});
var VIIRSBBG_post=BG1_post.expression('1.3628493*BG**2+0.59881705*BG-0.03733341', {
      'BG': BG1_post});        
var MSIGR_post=GR2_post.expression('GR*0.58121064-0.08774834', {
      'GR': GR2_post});
var VIIRSGR_post=GR2_post.expression('GR*1.57391517+0.21274293', {
      'GR': GR2_post});      
var MSIBG_post=BG1_post.expression('BG*1.23908309-0.02733524', {
      'BG': BG1_post});
var SLIGR_pre=GR2_pre.expression('0.83986732*GR**3-2.15878039*GR**2+2.26730692*GR-0.25960696', {
      'GR': GR2_pre});
var SLIBG_pre=BG1_pre.expression('BG*2.08452775+(-1.09798265*BG**2)+0.03962174', {
      'BG': BG1_pre});
var SLIGR_post=GR2_post.expression('0.83986732*GR**3-2.15878039*GR**2+2.26730692*GR-0.25960696', {
      'GR': GR2_post});
var SLIBG_post=BG1_post.expression('BG*2.08452775+(-1.09798265*BG**2)+0.03962174', {
      'BG': BG1_post});
var SLIGR_pre=GR2_pre.expression('0.83986732*GR**3-2.15878039*GR**2+2.26730692*GR-0.25960696', {
      'GR': GR2_pre});
var SLIBG_pre=BG1_pre.expression('BG*2.08452775+(-1.09798265*BG**2)+0.03962174', {
      'BG': BG1_pre});      
var VIIRSB_BG_pre=BG1_pre.expression('BG*0.59881705+(1.3628493*BG**2)-0.03733341', {
      'BG': BG1_pre});
//Map.addLayer(BG1_pre,{} , 'BG1_pre_pre_before_bicubic',false);//----------
var VIIRSB_BG_post=BG1_post.expression('BG*0.59881705+(1.3628493*BG**2)-0.03733341', {
      'BG': BG1_post});
var mothGR_pre=BG1_pre.expression('0.21200563*BG+0.2306082', {
      'BG': BG1_pre});
var mothGR_post=BG1_post.expression('0.21200563*BG+0.2306082', {
      'BG': BG1_post});
var maskSLIGR_post=SLIGR_post.gt(0.0);
var SLIGR_post=SLIGR_post.mask(maskSLIGR_post);
var maskSLIGR_pre=SLIBG_pre.gt(0.0);
var SLIGR_pre=SLIGR_pre.mask(maskSLIGR_pre);
var maskSLIBG_post=SLIBG_post.gt(0.04);
var SLIBG_post=SLIBG_post.mask(maskSLIGR_post);
var maskSLIBG_pre=SLIBG_pre.gt(0.04);
var SLIBG_pre=SLIBG_pre.mask(maskSLIGR_pre);
VIIRS201311=VIIRS201311.resample('bicubic')
var VIIRS201311 =VIIRS201311.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
VIIRS201811=VIIRS201811.resample('bicubic');
var VIIRS201811 =VIIRS201811.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var VIIRSB_BG_pre_mask=VIIRSB_BG_pre.gt(0.0);
VIIRSB_BG_pre=VIIRSB_BG_pre.mask(VIIRSB_BG_pre_mask);
var VIIRSB_BG_post_mask=VIIRSB_BG_post.gt(0.0);
VIIRSB_BG_post=VIIRSB_BG_post.mask(VIIRSB_BG_post_mask);
//Map.addLayer(VIIRSB_BG_pre,{} , 'VIIRSB_BG_pre_before_bicubic',false);//----------
Export.image.toDrive({
  image: VIIRSB_BG_pre,
  description: 'VIIRSB_BG_pre_Nobicubic',
  scale: 500,
  region: geometry2
});
VIIRSB_BG_pre=VIIRSB_BG_pre.resample('bicubic');
Export.image.toDrive({
  image: VIIRSB_BG_pre,
  description: 'VIIRSB_BG_pre_bicubic',
  scale: 500,
  region: geometry2
});
//Map.addLayer(VIIRSB_BG_pre,{} , 'VIIRSB_BG_pre_before',false);//----------
var VIIRSB_BG_pre =VIIRSB_BG_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var VIIRSGR_pre_mask=VIIRSGR_pre.gt(0.5);
VIIRSGR_pre=VIIRSGR_pre.mask(VIIRSGR_pre_mask);
VIIRSGR_pre=VIIRSGR_pre.resample('bicubic');
var VIIRSGR_pre =VIIRSGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var ImVIIRSB_BG_pre=VIIRS201311.select('avg_rad').multiply(VIIRSB_BG_pre);
var ImVIIRSB_BG_post=VIIRS201811.select('avg_rad').multiply(VIIRSB_BG_post);
var ImVIIRSGR_pre=VIIRS201311.select('avg_rad').multiply(VIIRSGR_pre);
var VIIRSGR_post_mask=VIIRSGR_post.gt(0.5);
VIIRSGR_post=VIIRSGR_post.mask(VIIRSGR_post_mask);
VIIRSGR_post=VIIRSGR_post.resample('bicubic');
var VIIRSGR_post =VIIRSGR_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var ImVIIRSGR_post=VIIRS201811.select('avg_rad').subtract(0.15).multiply(VIIRSGR_post);
var ImVIIRSGR_post_mask=ImVIIRSGR_post.gt(0);
var ImVIIRSGR_pre_mask=ImVIIRSGR_pre.gt(0);
var ImVIIRSB_BG_post_mask=ImVIIRSB_BG_post.gt(0);
var ImVIIRSB_BG_pre_mask=ImVIIRSB_BG_pre.gt(0);
var maskALL=ImVIIRSGR_post_mask.multiply(ImVIIRSGR_pre_mask);
var maskALLB=ImVIIRSB_BG_post_mask.multiply(ImVIIRSB_BG_pre_mask);
ImVIIRSGR_post=ImVIIRSGR_post.multiply(maskALL);
ImVIIRSGR_pre=ImVIIRSGR_pre.multiply(maskALL);
ImVIIRSB_BG_post=ImVIIRSB_BG_post.multiply(maskALLB);
ImVIIRSB_BG_pre=ImVIIRSB_BG_pre.multiply(maskALLB);
var VIIRS201311B=VIIRS201311.multiply(maskALLB);
var VIIRS201811B=VIIRS201811.multiply(maskALLB);
ImVIIRSGR_post=ImVIIRSGR_post.unmask(0);
ImVIIRSGR_pre=ImVIIRSGR_pre.unmask(0);
ImVIIRSGR_post=ImVIIRSGR_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
ImVIIRSGR_pre=ImVIIRSGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var IMmoths_pre=mothGR_pre.multiply(ImVIIRSGR_pre);
var IMmoths_post=mothGR_post.multiply(ImVIIRSGR_post);
var IMmoths_pre_mask=IMmoths_pre.gt(0);
var IMmoths_post_mask=IMmoths_post.gt(0);
var maskALLM=IMmoths_post_mask.multiply(IMmoths_pre_mask);
IMmoths_post=IMmoths_post.multiply(maskALLM)
IMmoths_pre=IMmoths_pre.multiply(maskALLM)
IMmoths_post.unmask(0)
IMmoths_pre.unmask(0)
Map.addLayer(mothGR_pre,{}, 'Moths pre 2013',false);
Map.addLayer(mothGR_post,{}, 'Moths post 2013',false);
Map.addLayer(IMmoths_pre,{}, 'Impact Moths pre 2013',false);
Map.addLayer(IMmoths_post,{}, 'Impact Moths post 2013',false);
mothGR_pre=mothGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
mothGR_post=mothGR_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
IMmoths_pre=IMmoths_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
IMmoths_post=IMmoths_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
Export.image.toDrive({
  image: mothGR_pre,
  description: 'mothGR_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: mothGR_post,
  description: 'mothGR_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: IMmoths_pre,
  description: 'IMmoths_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: IMmoths_post,
  description: 'IMmoths_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: ImVIIRSGR_post,
  description: 'ImVIIRSGR_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: ImVIIRSB_BG_pre,
  description: 'ImVIIRSB_BG_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: ImVIIRSB_BG_post,
  description: 'ImVIIRSB_BG_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: ImVIIRSGR_pre,
  description: 'ImVIIRSGR_pre',
  scale: 500,
  region: geometry2
});
var MSIGR_post= MSIGR_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);        
var MSIGR_pre= MSIGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);         
var MSIBG_pre= MSIBG_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);         
var MSIBG_post= MSIBG_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var SLIBG_post= SLIBG_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var SLIGR_post= SLIGR_post.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);         
var SLIGR_pre= SLIGR_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var SLIBG_pre= SLIBG_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);         
Map.addLayer(BG1_pre, vis2,'Europe pre 2013 maskBG1 RAW',false);
Map.addLayer(GR2_pre, vis, 'Europe pre 2013 maskGR2 RAW',false);
BG1_pre=BG1_pre.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
GR2_pre=GR2_pre.reproject(ee.Projection('EPSG:3035'), null,samplinfactor);
Export.image.toDrive({
  image: GR2_pre,
  description: 'GR2_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: BG1_pre,
  description: 'BG1_pre',
  scale: 500,
  region: geometry2
});
var ratioBG=BG1_post.divide(BG1_pre);
var ratioGR=GR2_post.divide(GR2_pre);
var consisntency=ratioBG.gt(1.2).multiply(ratioGR.gt(1.2)).multiply(GR2_pre.gt(0.2).multiply(GR2_post.gt(0.2)));
print(ratioBG);
var visX = {min: 0, max: 2, palette: ['#000000','#ff0000','#fbff00','#00e7ff','#0400ff']};
//Map.addLayer(ratioBG,visX , 'Ratio BG post/pre',false);//----------
//Map.addLayer(ratioGR,visX , 'Ratio GR post/pre',false);//----------
//Map.addLayer(VIIRSGR_pre,{} , 'VIIRSGR_pre',false);//----------
//Map.addLayer(VIIRSGR_post,{} , 'VIIRSGR_post',false);//----------
//Map.addLayer(ImVIIRSGR_pre,{} , 'ImVIIRSGR_pre',false);//----------
//Map.addLayer(ImVIIRSGR_post,{} , 'ImVIIRSGR_post',false);//----------
//Map.addLayer(ImVIIRSB_BG_pre, {},'Europe VIIRS pre B',false);
//Map.addLayer(BG1_pre, {},'BG1_pre',false);
//Map.addLayer(VIIRSB_BG_pre,{} , 'VIIRSB_BG_pre',false);//----------
//Map.addLayer(VIIRSBBG_pre,{} , 'VIIRSBBG_pre',false);//----------
//Map.addLayer(VIIRSB_BG_post,{} , 'VIIRSBG_post',false);//----------
//Map.addLayer(ImVIIRSB_BG_post, {}, 'Europe VIIRS post B',false);
var RGBVIIRS_pre=ee.Image(ImVIIRSB_BG_pre).addBands(ImVIIRSGR_pre).addBands(VIIRS201311B.multiply(2));
RGBVIIRS_pre=RGBVIIRS_pre.unmask(0).toUint16()
var RGBVIIRS_post=ee.Image(ImVIIRSB_BG_post).addBands(ImVIIRSGR_post).addBands(VIIRS201811B.multiply(2));
RGBVIIRS_post=RGBVIIRS_post.unmask(0).toUint16();
var GRVIIRS_post=RGBVIIRS_post.toFloat().select('avg_rad_1').divide(RGBVIIRS_post.toFloat().select('avg_rad'));
var BGVIIRS_post=RGBVIIRS_post.toFloat().select('avg_rad_2').divide(RGBVIIRS_post.toFloat().select('avg_rad_1'));
var GRVIIRS_pre=RGBVIIRS_pre.toFloat().select('avg_rad_1').divide(RGBVIIRS_post.toFloat().select('avg_rad'));
var BGVIIRS_pre=RGBVIIRS_pre.toFloat().select('avg_rad_2').divide(RGBVIIRS_post.toFloat().select('avg_rad_1'));
var maskGRVIIRS_post = GRVIIRS_post.lt(10);
var maskGRVIIRS_pre=GRVIIRS_pre.lt(10);
var maskBGVIIRS_post=BGVIIRS_post.lt(10);
var maskBGVIIRS_pre=BGVIIRS_pre.lt(10);
var maskBIIRS_pre =RGBVIIRS_post.select('avg_rad_2').neq(0)
var maskBIIRS_post =RGBVIIRS_post.select('avg_rad_2').neq(0)
var maskRIIRS_pre =RGBVIIRS_post.select('avg_rad').neq(0)
var maskRIIRS_post =RGBVIIRS_post.select('avg_rad').neq(0)
var maskGIIRS_pre =RGBVIIRS_post.select('avg_rad_1').neq(0)
var maskGIIRS_post =RGBVIIRS_post.select('avg_rad_1').neq(0)
RGBVIIRS_post=RGBVIIRS_post.multiply(maskGRVIIRS_post).multiply(maskGRVIIRS_pre).multiply(maskBGVIIRS_post).multiply(maskBGVIIRS_pre).multiply(maskBIIRS_pre).multiply(maskRIIRS_pre).multiply(maskGIIRS_pre)
RGBVIIRS_pre=RGBVIIRS_pre.multiply(maskGRVIIRS_post).multiply(maskGRVIIRS_pre).multiply(maskBGVIIRS_post).multiply(maskBGVIIRS_pre).multiply(maskBIIRS_pre).multiply(maskRIIRS_pre).multiply(maskGIIRS_pre)
//Map.addLayer(maskGRVIIRS_post, {}, 'maskGRVIIRS_post',false);
//Map.addLayer(maskGRVIIRS_pre, {}, 'maskGRVIIRS_pre',false);
//Map.addLayer(maskBGVIIRS_post, {}, 'maskBGVIIRS_post',false);
//Map.addLayer(maskBGVIIRS_pre, {}, 'maskBGVIIRS_pre',false);
Map.addLayer(RGBVIIRS_post, vizParamsX, 'RGBVIIRS_post',false);
Map.addLayer(RGBVIIRS_pre, vizParamsX, 'RGBVIIRS_pre',false);
var maskLpreHipost=BG1_pre.lt(0.1).multiply(BG1_post.gt(0.2));
var maskIncreased=BG1_post.subtract(BG1_pre);
maskIncreased=maskIncreased.gt(0.1);
Export.image.toDrive({
  image: RGBVIIRS_pre,
  description: 'RGBVIIRS_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: RGBVIIRS_post,
  description: 'RGBVIIRS_post',
  scale: 500,
  region: geometry2
});
//var LPS=GR2_pre.lt(0.2).multiply(GR2_post.lt(0.2)).multiply(GR2_pre.lt(0.2).multiply(GR2_post.lt(0.2)))
var LPS=GR2_post.lt(0.2).multiply(BG1_post.lt(0.2))
var LED_cool=BG1_pre.lt(0.8).multiply(BG1_pre.gt(0.2).multiply(BG1_post.lt(1.4).multiply(BG1_post.gt(0.9))))
var LED_cooltowarm=BG1_pre.lt(1.2).multiply(BG1_pre.gt(0.6).multiply(BG1_post.lt(0.8).multiply(BG1_post.gt(0.2))))
var LED_warmtocool2=BG1_post.lt(1.2).multiply(BG1_post.gt(0.6).multiply(GR2_post.lt(0.7).multiply(GR2_post.gt(0.5))))
//Map.addLayer(image152.multiply(maskLpreHipost), vizParams3, 'Europe post 2013 B masked LpreHipost',false); //----------------
//Map.addLayer(image152.multiply(maskIncreased), vizParams3, 'Europe post 2013 B masked Increased',false); //----------------
//Map.addLayer(image152.multiply(consisntency), vizParams3, 'Europe post 2013 B masked Consistent',false); //----------------
//Map.addLayer(image142.multiply(LPS), vizParams3, 'Europe post 2013 B masked LPS',false); //----------------
//Map.addLayer(image152.multiply(LED_cool), vizParams3, 'Europe post 2013 B masked LED_cool',false); //----------------
//Map.addLayer(image152.multiply(LED_cooltowarm), vizParams3, 'Europe post 2013 B masked LED_Cooltowarm',false); //----------------
//Map.addLayer(image152.multiply(LED_warmtocool2), vizParams3, 'Europe post 2013 B masked LED_Warmtocool2',false); //----------------
Export.image.toDrive({
  image: ratioBG,
  description: 'ratioBGpreRpost',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: ratioGR,
  description: 'ratioGRpreRpost',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: MSIGR_pre,
  description: 'MSIGR_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: MSIBG_pre,
  description: 'MSIBG_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: SLIGR_pre,
  description: 'SLIGR_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: SLIBG_pre,
  description: 'SLIBG_pre',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: MSIGR_post,
  description: 'MSIGR_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: MSIBG_post,
  description: 'MSIBG_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: SLIGR_post,
  description: 'SLIGR_post',
  scale: 500,
  region: geometry2
});
Export.image.toDrive({
  image: SLIBG_post,
  description: 'SLIBG_post',
  scale: 500,
  region: geometry2
});
var GR2 = image18
var BG1 = image19
var samplinfactor=500;//20000 funciona
VIIRS201211=VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var maskVIIRS=VIIRS201211.gt(0.15)
BG1=BG1.resample('bicubic')
GR2=GR2.resample('bicubic')
var BG1 =BG1.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var GR2 =GR2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
BG1=BG1.multiply(maskVIIRS)
GR2=GR2.multiply(maskVIIRS)
BG1=BG1.unmask(0)
//Map.addLayer(GR1, vizParams5, 'GR Europe Pre 2013');
//Map.addLayer(GR2,vizParams5, 'GR Europe Pre 2013');
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, true, true, true)
//Map.addLayer(geometry, {}, 'Hot spots Madrid');
Map.setCenter(10,45, 5);
//Map.addLayer(BG1.select('avg_rad'), vis2, 'Europe pre 2013 maskBG1 ');
var mask = BG1.select('avg_rad').gt(0.1);
var BG1M = BG1.updateMask(mask);
BG1M.unmask(0.33)
var texture2=BG1M.select('avg_rad').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(5),
});
//Map.addLayer(texture2.select('avg_rad_median'),vis2, 'Europe pre 2013 maskBG1-1 ');
//Map.addLayer(GR2.select('avg_rad'), vis, 'Europe pre 2013 maskGR2 ');
////////////////////////// 
///
///   Pre 2013 GR
///
///////////////////////////////
var mask = GR2.select('avg_rad').gt(0.1);
var GR2M = GR2.updateMask(mask);
GR2M.unmask(0.33)
var texture2=GR2M.select('avg_rad').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(5),
});
//Map.addLayer(texture2.select('avg_rad_median'),vis, 'Europe pre 2013 maskGR2-1 ',false);
/*
texture2=texture2.unmask(0)
var texture2=texture2.select('avg_rad_mean').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(7),
});
Map.addLayer(texture2.select('avg_rad_mean_median'),vis, 'Europe pre 2013 maskGR2-2 ');
var texture2=texture2.select('avg_rad_mean_median').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(12),
});
print(texture2)
Map.addLayer(texture2.select('avg_rad_mean_median_median'),vis, 'Europe pre 2013 maskGR2-3 ');
var texture2=texture2.select('avg_rad_mean_median_median').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(12),
});
print(texture2)
Map.addLayer(texture2.select('avg_rad_mean_median_median_median'),vis, 'Europe pre 2013 maskGR2-4 ');
*/
//////////////////////////////////////////////////////////////
//
//               Italy
//
//////////////////////////////////////////////////////////////
///Post 2013 GR BG maps
var BG1_2 = image162.select('b3').divide(image162.select('b2'))
var GR2_2 = image162.select('b2').divide(image162.select('b1'))
var RG3_2 = image162.select('b1').divide(image162.select('b2'))
var samplinfactor=500;//20000 funciona
VIIRS201211=VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
VIIRS201211=VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var maskVIIRS=VIIRS201211.gt(0.1)
BG1_2=BG1_2.resample('bicubic')
GR2_2=GR2_2.resample('bicubic')
RG3_2=RG3_2.resample('bicubic')
var BG1_2 =BG1_2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var GR2_2 =GR2_2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var RG3_2 =RG3_2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
BG1_2=BG1_2.multiply(maskVIIRS)
GR2_2=GR2_2.multiply(maskVIIRS)
RG3_2=RG3_2.multiply(maskVIIRS)
BG1_2=BG1_2.unmask(0)
//Map.addLayer(GR1, vizParams5, 'GR Europe Post 2013');
//Map.addLayer(GR2,vizParams5, 'GR Europe Pre 2013');
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, true, true, true)
//Map.addLayer(geometry, {}, 'Hot spots Madrid');
Map.setCenter(10,45, 5);
//Map.addLayer(BG1_2.select('avg_rad'), vis2, 'Italy post 2013 maskBG1 ');
//Map.addLayer(GR2_2.select('avg_rad'), vis, 'Italy post 2013 maskGR2 ');
//Pre 2013 GR BG maps
var BG1 = image172.select('b3').divide(image172.select('b2'))
var GR2 = image172.select('b2').divide(image172.select('b1'))
var RG3 = image172.select('b1').divide(image172.select('b2'))
var samplinfactor=500;//20000 funciona
VIIRS201211=VIIRS201211.resample('bicubic')
var VIIRS201211 =VIIRS201211.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var maskVIIRS=VIIRS201211.gt(0.1)
BG1=BG1.resample('bicubic')
GR2=GR2.resample('bicubic')
RG3=RG3.resample('bicubic')
var BG1 =BG1.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var GR2 =GR2.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
var RG3 =RG3.reproject(ee.Projection('EPSG:3035'), null, samplinfactor);
BG1=BG1.multiply(maskVIIRS)
GR2=GR2.multiply(maskVIIRS)
BG1=BG1.unmask(0)
//Map.addLayer(GR1, vizParams5, 'GR Europe Pre 2013');
//Map.addLayer(GR2,vizParams5, 'GR Europe Pre 2013');
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, true, true, true)
//Map.addLayer(geometry, {}, 'Hot spots Madrid');
Map.setCenter(10,45, 5);
//Map.addLayer(BG1.select('avg_rad'), vis2, 'Italy pre 2013 maskBG1 ');
//Map.addLayer(GR2.select('avg_rad'), vis, 'Italy pre 2013 maskGR2 ');
var texture=GR2.select('avg_rad').reduceNeighborhood({
  reducer: ee.Reducer.max(),
  kernel: ee.Kernel.circle(7),
});
var texture=texture.select('avg_rad_max').reduceNeighborhood({
  reducer: ee.Reducer.median(),
  kernel: ee.Kernel.circle(7),
});
//Map.addLayer(texture.select('avg_rad_max_median'),vis, 'Italy pre 2013 maskGR2-2 ');
// set position of panel
var legend1 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend1.add(legendTitle);
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
// create vizualization parameters
var viz = {min: 0.3, max: 1, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF']
};
// set position of panel
var legend2 = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'GR ratio',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend2.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend2.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend2.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])],});
legend2.add(panel);
Map.add(legend2);
/////////////////////////////////////////////////////////////////////////////////
//
//                          Nueva Leyenda
//
////////////////////////////////////////////////////////////////////////////////
// set position of panel
var legend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend3.add(legendTitle);
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
// create vizualization parameters
var viz = {min: 0, max: 2, palette: ['#000000','#ff0000','#fbff00','#00e7ff','#0400ff']
};
// set position of panel
var legend3 = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'BG and GR ratio pre/post',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend3.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend3.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend3.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])],});
legend3.add(panel);
//Map.add(legend3);
///////////////////////////////////////////////
// set position of panel
var legend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend4.add(legendTitle);
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
// create vizualization parameters
var viz = {min: 0.2, max: 0.7, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF'] };
// set position of panel
var legend4 = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'BG ratio',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend4.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend4.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend4.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])],});
legend4.add(panel);
Map.add(legend4);
//////////////////////////////////////////////
var image = image152.select('b[1-3]');
var region = geometry;
// Pre-define some customization options.
var options = {
  title: 'ISS Spain',
  fontSize: 20,
  hAxis: {title: 'DN'},
  vAxis: {title: 'count of DN'},
  series: {
    0: {color: 'blue'},
    1: {color: 'green'},
    2: {color: 'red'}}};
// Make the histogram, set the options.
var histogram = ui.Chart.image.histogram(image, region, 30)
    .setSeriesNames(['blue', 'green', 'red'])
    .setOptions(options);
// Display the histogram.
print(histogram);
// A simple tool for charting MODIS ocean surface temperature.
/*
 * Map layer configuration
 */
// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
/*
var composite2=BG1_2.select('avg_rad').visualize(vis);
var composite=GR2_2.select('avg_rad').visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('SkyBrightness VIIRS Median');
var compositeLayer2 = ui.Map.Layer(composite2).setName('SkyBrightness VIIRS Mean');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2012-2019 composite median');
layers.add(compositeLayer2, '2012-2019 composite mean');
*/
/*
 * Panel setup
 */
/*
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
*/
/*
 * Chart setup
 */
/*
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, {});
};
*/
/*
 * Legend setup
 */
/*
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Blue and Green Ratio(higher bluer) post 2013',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
*/
/*
 * Map setup
 */
/*
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-19.155, 22.313);
mapPanel.centerObject(initialPoint, 4);
*/
/*
 * Initialize the app
 */
/*
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
*/
/////////////////////////////////////////////
///
///
//////Interactive
///
/////////////////////////////////////////////
var img = image152;
var bandN=img.select('b1').add(img.select('b2')).add(img.select('b3'))
var image4 = img.addBands(ee.Image(bandN));
var img=image4
var bands = ['b1', 'b2', 'b3', 'b1_1'];
img = ee.Image(img).clip(geometry2).select(bands);
Map.centerObject(geometry, 13);
Map.addLayer(img, vizParams3, 'RGBN', false);
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(20);
//Map.addLayer(seeds.mask(seeds), {}, 'seeds');
// Run SNIC on the regular square grid.
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: img,
  compactness: 0,//mejor  el mas bajo
  connectivity: 8,
  neighborhoodSize: 256,
  seeds: seeds
});
var clusters = snic.select('clusters');
//Map.addLayer(clusters.randomVisualizer(), {}, 'clusters',false);
var clusterVis = {bands: ['b1_mean', 'b2_mean', 'b3_mean'], min: 0, max: 1};
//Map.addLayer(snic, clusterVis, 'means', false);
//Map.addLayer(snic, vizParams3, 'means', true);
// Compute per-cluster standard deviation and other properties.
var stdDev = img.addBands(clusters)
    .reduceConnectedComponents({
      reducer: ee.Reducer.stdDev(), 
      labelBand: 'clusters', 
      maxSize: 1000
    });
//Map.addLayer(stdDev, {min:0, max:0.1}, 'StdDev', false);
// Area.
var area = ee.Image.pixelArea().addBands(clusters)
    .reduceConnectedComponents(ee.Reducer.sum(), 'clusters', 256);
//Map.addLayer(area, {min: 50000, max: 500000}, 'Cluster Area', false);
// Perimeter.
var minMax = clusters.reduceNeighborhood({
  reducer: ee.Reducer.minMax(), 
  kernel: ee.Kernel.square(1)
});
var perimeterPixels = minMax.select(0).neq(minMax.select(1));
//Map.addLayer(perimeterPixels, {min: 0, max: 1}, 'perimeterPixels', false);
var perimeter = perimeterPixels.addBands(clusters)
    .reduceConnectedComponents(ee.Reducer.sum(), 'clusters', 256);
//Map.addLayer(perimeter, {min: 100, max: 400}, 'Perimeter size', false);
// Width and height.
var sizes = ee.Image.pixelLonLat().addBands(clusters)
    .reduceConnectedComponents(ee.Reducer.minMax(), 'clusters', 256);
var width = sizes.select('longitude_max')
    .subtract(sizes.select('longitude_min')).rename('width');
var height = sizes.select('latitude_max')
    .subtract(sizes.select('latitude_min')).rename('height');
//Map.addLayer(width, {min: 0, max: 0.02}, 'Cluster width', false);
//Map.addLayer(height, {min: 0, max: 0.02}, 'Cluster height', false);
// Create an inspector panel with a horizontal layout.
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
  inspector1.style().set({
  width: '200px',
  position: 'bottom-right'});
// Add a label to the panel.
inspector1.add(ui.Label('Tool provided by the EMISSI@n project'));
inspector1.add(ui.Label('University of Exeter'));
inspector1.add(ui.Label('Image courtesy of the Earth Science and Remote Sensing Unit, NASA Johnson Space Center'));
inspector1.add(ui.Label('Cite: Sanchez de Miguel, A. , Bennie, J., Rosenfeld, E.,Dzurjak, S., Gaston, K. (2022). Environmental risks from artificial nighttime lighting widespread and increasing across Europe. Science advances in Press '));
var vis4 = {min: 0, max: 0.7, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF']
};
var vis5 = {min: 0.5, max: 1, palette: [ '#000000',
 '#DF345A',
 '#DC2A4A',
 '#D9203C',
 '#D61636',
 '#D3122F',
 '#D0192B',
 '#CE192B',
 '#CC3029',
 '#CA3C28',
 '#C84827',
 '#CD5826',
 '#D26625',
 '#D87424',
 '#34C25A',
 '#30C46A',
 '#2DC678',
 '#2AC786',
 '#27C894',
 '#24C7A2',
 '#21C5B0',
 '#1EC1BC',
 '#1BBCC8',
 '#18B2D1',
 '#15A6D6',
 '#129ADA',
 '#118EDC',
 '#1382DC',
 '#1576DC',
 '#176ADC',
 '#195EDC',
 '#1B52DA',
 '#1D46D8',
 '#1F3AD6',
'#FFFFFF']
};
Map.addLayer(MSIGR_pre, vis4, 'MSIGR_pre',false);      
Map.addLayer(MSIGR_post, vis4, 'MSIGR_post',false);    
Map.addLayer(MSIBG_pre, vis2, 'MSIBG_pre',false);      
Map.addLayer(MSIBG_post, vis2, 'MSIBG_post',false);     
//Map.addLayer(SLIGR_pre, vis2, 'SLIGR_pre',false);      
//Map.addLayer(SLIGR_post, vis2, 'SLIGR_post',false);
//Map.addLayer(SLIBG_pre, vis5, 'SLIBG_pre',false);      
//Map.addLayer(SLIBG_post, vis5, 'SLIBG_post',false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table2,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#818181'}, 'costline');
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#818181'}, 'country',false);
Map.setCenter(8.399, 46.552, 5);