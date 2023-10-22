var mod10a1 = ui.import && ui.import("mod10a1", "imageCollection", {
      "id": "MODIS/006/MOD10A1"
    }) || ee.ImageCollection("MODIS/006/MOD10A1"),
    dem = ui.import && ui.import("dem", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4");
ui.util.getCurrentPosition(function(p){Neige100Km(p)});
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2");
var targetDate = ee.Date(Date.now());
var radius = 100e3;
function getTimeDist(image) {
  // Difference in days to target date
  var timeDist = targetDate.difference(image.date(), 'day').abs().multiply(-1)
  // Get mask
  var mask = image.mask()
  // Add time distance band
  return image
      .addBands(ee.Image.constant(timeDist).rename('timeDist').float()
            .updateMask(mask))
      .copyProperties(image, ['system:time_start'])
}
var Neige100Km = function(p){
  Map.centerObject(p,8);
  var dept = gaul.filterBounds(p);
  var imDept = dept.reduceToImage(['ADM0_CODE'],ee.Reducer.first());
  var pArea = ee.FeatureCollection(ee.Feature(p.buffer(radius)).set('ID',1));
  var imArea = pArea.reduceToImage(['ID'],ee.Reducer.first());
  var pAreaDept = dept.merge(pArea);
  var imAutor = imArea.unmask().or(imDept.unmask());
  //var distIm=ee.FeatureCollection(p).distance(radius, 100);
  var snowCol=mod10a1.select('NDSI_Snow_Cover')
    .filterBounds(p.buffer(radius))
    .limit(10, 'system:time_start', false);
  var snowIm=snowCol.map(getTimeDist)
    .qualityMosaic('timeDist')
  var snowImMasked=snowIm
    .updateMask(snowIm.neq(0));
  var snowImMaskedRadius=snowImMasked
    .select('NDSI_Snow_Cover')
    .updateMask(imAutor)
    .gt(0)
    .and(dem.gt(800));
  //Map.addLayer(snowImMaskedRadius,{bands: ['timeDist'], min: -10, max: 0})
  Map.addLayer(snowImMaskedRadius,{palette:"0000FF"},'Neige',1);
  Map.addLayer(pAreaDept,{color:'black'},'Zone autorisée',true,0.3);
  Map.addLayer(p,{color:'red'},'Domicile');
};