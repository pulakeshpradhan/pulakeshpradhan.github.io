/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Cities = ee.Image("Oxford/MAP/accessibility_to_cities_2015_v1_0"),
    SRTM = ee.Image("USGS/SRTMGL1_003"),
    modis = ee.ImageCollection("FIRMS"),
    forest2 = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF"),
    imageVisParam = {"opacity":1,"bands":["accessibility"],"min":5.659999895095825,"max":9.606666994094848,"palette":["ff7151","feffa3","c1ff5d"]},
    geometry = 
    /* color: #0b4a8b */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[100.61097851562499, -1.0008873390341242],
          [100.61097851562499, -3.788701516980357],
          [105.68666210937499, -3.788701516980357],
          [105.68666210937499, -1.0008873390341242]]], null, false),
    imageVisPara = {"opacity":1,"bands":["accessibility"],"min":5.659999895095825,"max":9.606666994094848,"palette":["61ff1f","f4ff54","ff5421"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.setCenter(103.808, -3.23, 9);
var lokasi = Cities.select('accessibility').gt(300);
Map.addLayer(lokasi, {min:0, max:1, palette:['white','red']}, 'city', false);
// mask daerah yg kurang dari 8 jam
var jauhmsk = lokasi.mask(lokasi);
Map.addLayer(jauhmsk, {max:1, palette:['red']}, 'city masked');
// ini membuat image biar nggak jadi image composite
var conf = modis.select('confidence')
            .filterDate ('2014-01-01', '2015-12-31')
          // ini untuk milih band untuk 
var composite = conf.max().gt(75)
var firemsk = composite.mask(composite);
Map.addLayer(firemsk, {max:1, palette:['orange']}, 'fire_masked');
var forest = forest2. filterDate('2014-01-01', '2015-12-31')
var onlyf = forest.max()
var foresto = onlyf.lt(2)
var forestmsk = foresto.mask(foresto);
Map.addLayer(forestmsk, {max:1, palette:['green']}, 'forest_masked');
var risk = forestmsk.multiply(jauhmsk).multiply(firemsk);
Map.addLayer(risk,{max:1, palette:['red']},'risk area1');
var jam = Cities.mask(risk).divide(60)
var clip = jam.clip(geometry)
var all = forestmsk.addBands(jam)
print(clip)
// Map.addLayer(jam,{min:0,max:1000, palette:['green','orange','red']}, 'risk nya')
Map.addLayer(clip,imageVisPara)