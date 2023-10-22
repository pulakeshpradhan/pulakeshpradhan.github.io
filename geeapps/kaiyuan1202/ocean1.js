var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.40145247748757,
                22.71587242142412
              ],
              [
                113.40145247748757,
                22.075943979030573
              ],
              [
                114.00570052436254,
                22.075943979030573
              ],
              [
                114.00570052436254,
                22.71587242142412
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
        [[[113.40145247748757, 22.71587242142412],
          [113.40145247748757, 22.075943979030573],
          [114.00570052436254, 22.075943979030573],
          [114.00570052436254, 22.71587242142412]]], null, false);
Map.centerObject(roi, 10)
var i=(113.60197222222222,22.587972222222223)
var p1 = /* color: #bf04c2 */ee.Geometry.Point([113.60197222222222,22.587972222222223]);
var p2 =ee.Geometry.Point([113.78011111111111,22.423194444444444]);
var p3 =ee.Geometry.Point([113.87458333333333,22.42888888888889]);
//COPERNICUS/S3/OLCI/S3A_20191004T015752_20191004T020052汕头
var S3_collection = ee.Image('COPERNICUS/S3/OLCI/S3A_20191019T020906_20191019T021206')
//Oa04_radiance Blue
//Oa06_radiance Green
//Oa08_radiance Red
//Oa016_radiance Nir  (778nm)
//CHLa=10^(0.33749)*(float(b1)/float(b2))^3.7585
var rgb =S3_collection.select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'])
              //.median()
              // Convert to radiance units.
              .multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]));
var visParams = {  
  min: 0,
  max: 6,
  gamma: 1.5,
  //bands: ['Oa04_radiance', 'Oa06_radiance', 'Oa08_radiance']
};
Map.addLayer(rgb, visParams, 'false color composite1998',1);         
print(S3_collection)
  var igbpPalette = [
  'aec3d4', // water
  '152106', '225129', '369b47', '30eb5b', '387242', // forest
  '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
  '111149', // wetlands
  'cdb33b', // croplands
  'cc0013', // urban
  '33280d', // crop mosaic
  'd7cdcc', // snow and ice
  'f7e084', // barren
  '6f6f6f'  // tundra
];
var image_03=S3_collection//.mosaic()
var image_04=image_03.clip(roi);
var CHLa=image_04.expression('10**(0.389)*(((g*0.0123538)/(b*0.0115198))**3.73)',{
  'b':image_04.select('Oa04_radiance'),//.multiply(0.0115198), 
  'g':image_04.select('Oa06_radiance'),//.multiply(0.0123538),
  'r':image_04.select('Oa08_radiance'),//.multiply(0.00876539),
  'nir':image_04.select('Oa16_radiance	')//.multiply(0.00530267),
});
///////////////////////////////////////////////////////////////////////////
Map.addLayer(CHLa,{min:0,max:8,palette:igbpPalette}, '叶绿素ａ浓度',1);   
//TSS=13.985×exp⁡(4.5176×(ρ_nir/ρ_r ))
var TSS=image_04.expression('13.985*exp(4.5176*((nir*0.00530267)/(r*0.00876539)))',{
  'b':image_04.select('Oa04_radiance'),//.multiply(0.0115198), 
  'g':image_04.select('Oa06_radiance'),//.multiply(0.0123538),
  'r':image_04.select('Oa08_radiance'),//.multiply(0.00876539),
  'nir':image_04.select('Oa16_radiance')//.multiply(0.00530267),
});
///////////////////////////////////////////////////////////////////////////
Map.addLayer(TSS,{min:0,max:200,palette:igbpPalette}, '悬浮泥沙浓度',1);   
//CDOM=0.2495×〖(ρ_band490/ρ_band555 )〗^(-2.225)
var CDOM=image_04.expression('0.2495*(b*0.0115198)/(g*0.0123538)',{
  'b':image_04.select('Oa04_radiance'),//.multiply(0.0115198), 
  'g':image_04.select('Oa06_radiance'),//.multiply(0.0123538),
  'r':image_04.select('Oa08_radiance'),//.multiply(0.00876539),
  'nir':image_04.select('Oa16_radiance')//.multiply(0.00530267),
});
///////////////////////////////////////////////////////////////////////////
Map.addLayer(CDOM,{min:0,max:1,palette:igbpPalette}, '有色可溶性有机物质浓度',1);   
//SDD=exp⁡(ρ_blue/ρ_r )
var SDD=image_04.expression('exp(b*0.0115198)/(r*0.00876539)',{
  'b':image_04.select('Oa04_radiance'),//.multiply(0.0115198), 
  'g':image_04.select('Oa06_radiance'),//.multiply(0.0123538),
  'r':image_04.select('Oa08_radiance'),//.multiply(0.00876539),
  'nir':image_04.select('Oa16_radiance')//.multiply(0.00530267),
});
///////////////////////////////////////////////////////////////////////////
Map.addLayer(SDD,{min:0,max:15,palette:igbpPalette}, '水体透明度',1); 
//PP=302.2×Chla-242.96,   R^2=0.94
var PP=image_04.expression('302.2*(10**(0.389)*(((g*0.0123538)/(b*0.0115198))**3.73))-242.96',{
  'b':image_04.select('Oa04_radiance'),//.multiply(0.0115198), 
  'g':image_04.select('Oa06_radiance'),//.multiply(0.0123538),
  'r':image_04.select('Oa08_radiance'),//.multiply(0.00876539),
  'nir':image_04.select('Oa16_radiance')//.multiply(0.00530267),
});
///////////////////////////////////////////////////////////////////////////
Map.addLayer(PP,{min:0,max:500,palette:igbpPalette}, '初级生产力',1); 
Map.addLayer(p1, {color: "red"}, "p1");
Map.addLayer(p2, {color: "white"}, "p2");
Map.addLayer(p3, {color: "cyan"}, "p3");
Export.image(SDD,'水体透明度', {region:roi,crs: "EPSG:4326",  scale:30,maxPixels: 1e13})