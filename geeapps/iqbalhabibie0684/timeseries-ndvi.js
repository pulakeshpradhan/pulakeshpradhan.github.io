var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                101.2175883962009,
                0.3652705773338549
              ],
              [
                101.2175883962009,
                0.11533400889891521
              ],
              [
                101.36315724385715,
                0.11533400889891521
              ],
              [
                101.36315724385715,
                0.3652705773338549
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
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[101.2175883962009, 0.3652705773338549],
          [101.2175883962009, 0.11533400889891521],
          [101.36315724385715, 0.11533400889891521],
          [101.36315724385715, 0.3652705773338549]]], null, false);
function cloudMasking(image){
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
}
function ndviCalc(image){
  return image.expression('(NIR-RED)/(NIR+RED)',{'NIR':image.select('B8'),'RED':image.select('B4')})
  .set('system:time_start',image.get('system:time_start'));
}
var fdatelist = ['-01-01','-07-01'];
var ldatelist = ['-06-30','-12-31'];
var point = ee.Geometry.Point([101.54443165791965,-0.01924843238127185])
for (var yr = 2016; yr < 2019; yr++){
  for (var i = 0, len = fdatelist.length; i < len; i++){
    var fdate = yr.toString()+fdatelist[i];
    var ldate = yr.toString()+ldatelist[i];
    var image = ee.ImageCollection('COPERNICUS/S2').filterBounds(point).filterDate(fdate,ldate).map(cloudMasking).median();
    var ndvi = ndviCalc(image);
    Map.centerObject(point,12);
    Map.addLayer(image,{min:0,max:3000,bands:['B4','B3','B2']},'truecolor_'+ldate);
  Map.addLayer(ndvi,{min:-1.0,max:1.0,palette:['red','blue','yellow','green']},'NDVI');
  }
}
var ndvi_image = ee.ImageCollection('COPERNICUS/S2').filterBounds(geometry)
                 .filterDate('2016-01-01','2017-12-31').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                 .map(cloudMasking).map(ndviCalc);
var result = ui.Chart.image.series(ndvi_image,geometry,ee.Reducer.mean(),10);
print(result);