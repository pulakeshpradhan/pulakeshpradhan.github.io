var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -77.06119603514662,
            38.90933648030123
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-77.06119603514662, 38.90933648030123]),
    S2A = ui.import && ui.import("S2A", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    S2C = ui.import && ui.import("S2C", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
var pt = ee.Geometry.Point([113.1546141, 27.8060559]);
var PI = ee.Number(3.14159265359);
var MAX_SATELLITE_ZENITH = 7.5;
var MAX_DISTANCE = 1000000;
var UPPER_LEFT = 0;
var LOWER_LEFT = 1;
var LOWER_RIGHT = 2;
var UPPER_RIGHT = 3;
var start = ee.Date('2019-04-08');
var finish = ee.Date('2019-04-10');
// Difference in days between start and finish
var diff = finish.difference(start, 'day')
// Make a list of all dates
var range = ee.List.sequence(0, diff.subtract(1)).map(function(day){return start.advance(day,'day')})
var inBands =  ee.List(['QA60','B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B10','B11','B12']);
var outBands = ee.List(['QA60','cb','blue','green','red','re1','re2','re3','nir','re4','waterVapor','cirrus','swir1','swir2']);
var s2 =  S2C.filterBounds(pt)
        .filterDate(start, finish)
        .filterMetadata("CLOUDY_PIXEL_PERCENTAGE",'less_than',30)//.sort("CLOUDY_PIXEL_PERCENTAGE");
var corrected = S2A.filterBounds(pt).filterDate(start, finish).first();
var before = S2C.filterBounds(pt).filterDate(start, finish).first();
var simpCorrected = s2.map(names).map(applyBRDF).first();
print('L2A',corrected)
print('L1C',before)
print('BRDF',simpCorrected)
var images = {
  'L1C': before,
  'BRDF correct': simpCorrected,
  'L2A': corrected
};
print(images)
var vis = {
  "L1C": {bands: ["B4", "B3", "B2"], min:0, max: 2500},
  "BRDF correct": {bands: ['red','green','blue'], min:0, max: 2500},
  "L2A": {bands: ["B4", "B3", "B2"], min:0, max: 2500}
}
var maps = [];
for (var label in vis) {
  var map = ui.Map().setControlVisibility(false)
  map.addLayer(images[label], vis[label])
  map.add(ui.Label(label))
  maps.push(map);
}
ui.root.widgets().reset(maps)
var linker = ui.Map.Linker(maps);
maps[0].centerObject(pt, 12)
// Functions to correct S2.
// Functions to correct S2 images.
function names(image){
  var newName = image.select(inBands,outBands);
  return newName;
}
function applyBRDF(image){
    var date = image.date();
    var footprint = ee.List(image.geometry().bounds().bounds().coordinates().get(0));
    var angles =  getsunAngles(date, footprint);
    var sunAz = angles[0];
    var sunZen = angles[1];
    var viewAz = azimuth(footprint);
    var viewZen = zenith(footprint);
    var kval = _kvol(sunAz, sunZen, viewAz, viewZen);
    var kvol = kval[0];
    var kvol0 = kval[1];
    var result = _apply(image, kvol.multiply(PI), kvol0.multiply(PI));
    result = result.toInt16().copyProperties(image);
    return result;
}
/* Get sunAngles from the map given the data.
*
* date:  ee.date object
* footprint: geometry of the image
*/
function getsunAngles(date, footprint){
  var jdp = date.getFraction('year');
  var seconds_in_hour = 3600;
  var  hourGMT = ee.Number(date.getRelative('second', 'day')).divide(seconds_in_hour);
  var latRad = ee.Image.pixelLonLat().select('latitude').multiply(PI.divide(180));
  var longDeg = ee.Image.pixelLonLat().select('longitude');
  // Julian day proportion in radians
  var jdpr = jdp.multiply(PI).multiply(2);
  var a = ee.List([0.000075, 0.001868, 0.032077, 0.014615, 0.040849]);
  var meanSolarTime = longDeg.divide(15.0).add(ee.Number(hourGMT));
  var localSolarDiff1 = value(a, 0)
          .add(value(a, 1).multiply(jdpr.cos())) 
          .subtract(value(a, 2).multiply(jdpr.sin())) 
          .subtract(value(a, 3).multiply(jdpr.multiply(2).cos())) 
          .subtract(value(a, 4).multiply(jdpr.multiply(2).sin()));
  var localSolarDiff2 = localSolarDiff1.multiply(12 * 60);
  var localSolarDiff = localSolarDiff2.divide(PI);
  var trueSolarTime = meanSolarTime 
          .add(localSolarDiff.divide(60)) 
          .subtract(12.0);
  // Hour as an angle;
  var ah = trueSolarTime.multiply(ee.Number(MAX_SATELLITE_ZENITH * 2).multiply(PI.divide(180))) ;   
  var b = ee.List([0.006918, 0.399912, 0.070257, 0.006758, 0.000907, 0.002697, 0.001480]);
  var delta = value(b, 0) 
        .subtract(value(b, 1).multiply(jdpr.cos())) 
        .add(value(b, 2).multiply(jdpr.sin())) 
        .subtract(value(b, 3).multiply(jdpr.multiply(2).cos())) 
        .add(value(b, 4).multiply(jdpr.multiply(2).sin())) 
        .subtract(value(b, 5).multiply(jdpr.multiply(3).cos())) 
        .add(value(b, 6).multiply(jdpr.multiply(3).sin()));
  var cosSunZen = latRad.sin().multiply(delta.sin()) 
        .add(latRad.cos().multiply(ah.cos()).multiply(delta.cos()));
  var sunZen = cosSunZen.acos();
  // sun azimuth from south, turning west
  var sinSunAzSW = ah.sin().multiply(delta.cos()).divide(sunZen.sin());
  sinSunAzSW = sinSunAzSW.clamp(-1.0, 1.0);
  var cosSunAzSW = (latRad.cos().multiply(-1).multiply(delta.sin())
                    .add(latRad.sin().multiply(delta.cos()).multiply(ah.cos()))) 
                    .divide(sunZen.sin());
  var sunAzSW = sinSunAzSW.asin();
  sunAzSW = where(cosSunAzSW.lte(0), sunAzSW.multiply(-1).add(PI), sunAzSW);
  sunAzSW = where(cosSunAzSW.gt(0).and(sinSunAzSW.lte(0)), sunAzSW.add(PI.multiply(2)), sunAzSW);
  var sunAz = sunAzSW.add(PI);
   // # Keep within [0, 2pi] range
    sunAz = where(sunAz.gt(PI.multiply(2)), sunAz.subtract(PI.multiply(2)), sunAz);
  var footprint_polygon = ee.Geometry.Polygon(footprint);
  sunAz = sunAz.clip(footprint_polygon);
  sunAz = sunAz.rename(['sunAz']);
  sunZen = sunZen.clip(footprint_polygon).rename(['sunZen']);
  return [sunAz, sunZen];
}
/* Get azimuth.
*
* 
* footprint: geometry of the image
*/
function azimuth(footprint){
    function x(point){return ee.Number(ee.List(point).get(0))}
    function  y(point){return ee.Number(ee.List(point).get(1))}
    var upperCenter = line_from_coords(footprint, UPPER_LEFT, UPPER_RIGHT).centroid().coordinates();
    var lowerCenter = line_from_coords(footprint, LOWER_LEFT, LOWER_RIGHT).centroid().coordinates();
    var slope = ((y(lowerCenter)).subtract(y(upperCenter))).divide((x(lowerCenter)).subtract(x(upperCenter)));
    var slopePerp = ee.Number(-1).divide(slope);
    var azimuthLeft = ee.Image(PI.divide(2).subtract((slopePerp).atan()));
    return azimuthLeft.rename(['viewAz']);
  }
/* Get zenith.
*
* 
* footprint: geometry of the image
*/
function zenith(footprint){
    var leftLine = line_from_coords(footprint, UPPER_LEFT, LOWER_LEFT);
    var rightLine = line_from_coords(footprint, UPPER_RIGHT, LOWER_RIGHT);
    var leftDistance = ee.FeatureCollection(leftLine).distance(MAX_DISTANCE);
    var rightDistance = ee.FeatureCollection(rightLine).distance(MAX_DISTANCE);
    var viewZenith = rightDistance.multiply(ee.Number(MAX_SATELLITE_ZENITH * 2)) 
          .divide(rightDistance.add(leftDistance)) 
          .subtract(ee.Number(MAX_SATELLITE_ZENITH)) 
          .clip(ee.Geometry.Polygon(footprint)) 
          .rename(['viewZen']);
    return viewZenith.multiply(PI.divide(180));
}
  /* apply function to all bands
  *
  * http://www.mdpi.com/2072-4292/9/12/1325/htm#sec3dot2-remotesensing-09-01325 
  * https://www.sciencedirect.com/science/article/pii/S0034425717302791
  *
  * image : the image to apply the function to
  * kvol:
  * kvol0
  *
  */
function _apply(image, kvol, kvol0){
      var f_iso = 0;
      var f_geo = 0;
      var f_vol = 0;
			var blue = _correct_band(image, 'blue', kvol, kvol0, f_iso=0.0774, f_geo=0.0079, f_vol=0.0372);
			var green = _correct_band(image, 'green', kvol, kvol0, f_iso=0.1306, f_geo=0.0178, f_vol=0.0580);
			var red = _correct_band(image, 'red', kvol, kvol0, f_iso=0.1690, f_geo=0.0227, f_vol=0.0574);
			var re1 = _correct_band(image, 're1', kvol, kvol0, f_iso=0.2085, f_geo=0.0256, f_vol=0.0845);
			var re2 = _correct_band(image, 're2', kvol, kvol0, f_iso=0.2316, f_geo=0.0273, f_vol=0.1003);
			var re3 = _correct_band(image, 're3', kvol, kvol0, f_iso=0.2599, f_geo=0.0294, f_vol=0.1197);
      var nir = _correct_band(image, 'nir', kvol, kvol0, f_iso=0.3093, f_geo=0.0330, f_vol=0.1535);
      var re4 = _correct_band(image, 're4', kvol, kvol0, f_iso=0.2907, f_geo=0.0410, f_vol=0.1611);
      var swir1 = _correct_band(image, 'swir1', kvol, kvol0, f_iso=0.3430, f_geo=0.0453, f_vol=0.1154);   
      var swir2 = _correct_band(image, 'swir2', kvol, kvol0, f_iso=0.2658, f_geo=0.0387, f_vol=0.0639);
			return image.select([]).addBands([blue, green, red,re1,re2,re3,nir,re4,swir1, swir2]);
}
/* correct band function
  *
  *
  * image : the image to apply the function to
  * band_name
  * kvol
  * kvol0
  * f_iso
  * f_geo
  * f_vol
  *
  */  
function _correct_band(image, band_name, kvol, kvol0, f_iso, f_geo, f_vol){
	//"""fiso + fvol * kvol + fgeo * kgeo"""
	var iso = ee.Image(f_iso);
	var geo = ee.Image(f_geo);
	var vol = ee.Image(f_vol);
	var pred = vol.multiply(kvol).add(geo.multiply(kvol)).add(iso).rename(['pred']);
	var pred0 = vol.multiply(kvol0).add(geo.multiply(kvol0)).add(iso).rename(['pred0']);
	var cfac = pred0.divide(pred).rename(['cfac']);
	var corr = image.select(band_name).multiply(cfac).rename([band_name]);
	return corr;
}
/* calculate kvol and kvol0
*
* sunAZ
* sunZen
* viewAz
* viewZen
*
*/  
function _kvol(sunAz, sunZen, viewAz, viewZen){
	//"""Calculate kvol kernel.
	//From Lucht et al. 2000
	//Phase angle = cos(solar zenith) cos(view zenith) + sin(solar zenith) sin(view zenith) cos(relative azimuth)"""
	var relative_azimuth = sunAz.subtract(viewAz).rename(['relAz']);
	var pa1 = viewZen.cos().multiply(sunZen.cos());
	var pa2 = viewZen.sin().multiply(sunZen.sin()).multiply(relative_azimuth.cos());
	var phase_angle1 = pa1.add(pa2);
	var phase_angle = phase_angle1.acos();
	var p1 = ee.Image(PI.divide(2)).subtract(phase_angle);
	var p2 = p1.multiply(phase_angle1);
	var p3 = p2.add(phase_angle.sin());
	var p4 = sunZen.cos().add(viewZen.cos());
	var p5 = ee.Image(PI.divide(4));
	var kvol = p3.divide(p4).subtract(p5).rename(['kvol']);
	var viewZen0 = ee.Image(0);
	var pa10 = viewZen0.cos().multiply(sunZen.cos());
	var pa20 = viewZen0.sin().multiply(sunZen.sin()).multiply(relative_azimuth.cos());
	var phase_angle10 = pa10.add(pa20);
	var phase_angle0 = phase_angle10.acos();
	var p10 = ee.Image(PI.divide(2)).subtract(phase_angle0);
	var p20 = p10.multiply(phase_angle10);
	var p30 = p20.add(phase_angle0.sin());
	var p40 = sunZen.cos().add(viewZen0.cos());
	var p50 = ee.Image(PI.divide(4));
	var kvol0 = p30.divide(p40).subtract(p50).rename(['kvol0']);
	return [kvol, kvol0]}
/* helper function
*
* 
*
*/  
function line_from_coords(coordinates, fromIndex, toIndex){
    return ee.Geometry.LineString(ee.List([
      coordinates.get(fromIndex),
      coordinates.get(toIndex)]));
}
function where(condition, trueValue, falseValue){
  var trueMasked = trueValue.mask(condition);
  var falseMasked = falseValue.mask(invertMask(condition));
      return trueMasked.unmask(falseMasked);
}
function invertMask(mask){
    return mask.multiply(-1).add(1);
}
function value(list,index){
    return ee.Number(list.get(index));
}