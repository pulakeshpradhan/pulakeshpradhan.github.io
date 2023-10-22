var belavista = ui.import && ui.import("belavista", "table", {
      "id": "users/celbeberger/BelaVista"
    }) || ee.FeatureCollection("users/celbeberger/BelaVista"),
    ativos = ui.import && ui.import("ativos", "table", {
      "id": "users/celbeberger/requerimentos_ativos"
    }) || ee.FeatureCollection("users/celbeberger/requerimentos_ativos"),
    indeferidos = ui.import && ui.import("indeferidos", "table", {
      "id": "users/celbeberger/requerimentos_negados"
    }) || ee.FeatureCollection("users/celbeberger/requerimentos_negados"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
//var mtSM = ee.Geometry.Point(-48.20, -15.69);  // Bay of Mont Saint-Michel
function getRGB(inicio, fim)
{
  var sent2 = ee.ImageCollection('COPERNICUS/S2')
                    .filterDate(inicio, fim)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                    .map(maskS2clouds)
                    .median();
  var rgb = sent2.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});
  return rgb;                      
}
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(inicio, fim) {
  //var inicio = ee.Date(date);
 // var fim = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                    .filterDate(inicio, fim)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                    .map(maskS2clouds)
                    .median();
 return sentinel1.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});
}
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
var images = {
  'out/21': getWeeklySentinelComposite('2021-10-01', '2021-10-31'),
  'jun/21': getWeeklySentinelComposite('2021-06-01', '2021-06-30'),
  'nov/20': getWeeklySentinelComposite('2020-11-01', '2020-11-30'),
  'Jun/20': getWeeklySentinelComposite('2020-06-01', '2020-06-30'),
  'jun/20': getWeeklySentinelComposite('2020-06-01', '2020-06-30'),
  'mai/20': getWeeklySentinelComposite('2020-05-01', '2020-05-31'),
  'dez/19': getWeeklySentinelComposite('2019-12-01', '2019-12-31'),
  'out/19': getWeeklySentinelComposite('2019-10-01', '2019-10-31'),
  'jun/19': getWeeklySentinelComposite('2019-06-01', '2019-06-30'),
  'Jan/19': getWeeklySentinelComposite('2019-01-01', '2019-01-31'),
  'Out/18': getWeeklySentinelComposite('2018-10-01', '2018-10-30'),
};
var MapDir = ui.Map();
MapDir.addLayer(getRGB('2016-06-01','2016-06-30'),{}, '2016/06', 1);
MapDir.addLayer(getRGB('2017-06-01','2017-06-30'),{}, '2017/06', 0);
MapDir.addLayer(getRGB('2018-06-01','2018-06-30'),{}, '2018/06', 0);
MapDir.addLayer(getRGB('2019-06-01','2019-06-30'),{}, '2019/06', 0);
MapDir.addLayer(getRGB('2020-06-01','2020-06-30'),{}, '2020/06', 0);
MapDir.addLayer(getRGB('2021-06-01','2021-06-30'),{}, '2021/06', 0);
var empty1 = ee.Image().byte();
var outline1 = empty1.paint({featureCollection:ativos,color:2,width:2});
MapDir.addLayer(outline1,{palette:'	#808080'}, "Requerimentos Ativos",0);
var empty2 = ee.Image().byte();
var outline2 = empty2.paint({featureCollection:indeferidos,color:2,width:2});
MapDir.addLayer(outline2,{palette:'	#808080'}, "Requerimentos Indeferidos",0);
var empty = ee.Image().byte();
var outline = empty.paint({featureCollection:belavista,color:2,width:3});
MapDir.addLayer(outline,{palette:'000000'}, "Bela Vista",0);
Map.addLayer(getRGB('2021-06-01','2021-06-30'),{}, '', 1);
var linker = ui.Map.Linker([ui.root.widgets().get(0), MapDir]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
linker.get(0).setCenter(-48.20, -15.69, 15);