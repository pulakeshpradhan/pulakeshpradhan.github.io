var S2 = ee.ImageCollection("COPERNICUS/S2"),
    geometry = ee.FeatureCollection("users/gissplwbadmip/All_CCA");
var img1=S2.filterDate('2019-01-01','2019-02-28').filterBounds(geometry);
var img2=S2.filterDate('2019-03-01','2019-04-28').filterBounds(geometry);
var img3=S2.filterDate('2019-08-31','2019-11-15').filterBounds(geometry);
//Map.addLayer(S2.select('QA60'));
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
function Add_NDVI(image){
  var ndvi=image.normalizedDifference(['B8','B4']).rename('NDVI')
  return image.addBands(ndvi)
}
//var image=S2.filterBounds();
var image1=img1.map(maskS2clouds).map(Add_NDVI).select('NDVI');
var image2=img2.map(maskS2clouds).map(Add_NDVI).select('NDVI');
var image3=img3.map(maskS2clouds).map(Add_NDVI).select('NDVI');
//var kh = ee.Filter.date('2019-08-31','2019-11-15');
//var rb =ee.Filter.date ('2019-01-01','2019-03-01');
//var pk =ee.Filter.date ('2019-03-02','2019-04-30');
//var m_kh=kh.map(maskS2clouds);
//var m_rb=rb.map(maskS2clouds);
//var m_pk=pk.map(maskS2clouds);
var stack=ee.Image.cat(image1.qualityMosaic('NDVI').rename('Rabi'),
                      image2.qualityMosaic('NDVI').rename('PK'),
                      image3.qualityMosaic('NDVI').rename('Kh'));
Map.addLayer(stack);
//print(image)
print(stack);
var lon = ui.Textbox({
  value: 1.0,
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
print(lon);
var lat = ui.Textbox({
   value: 1.0,
  placeholder: 'Enter latitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
print(lat);
var Lo;
var La;
var button = ui.Button({
  label: 'Go to Location',
  onClick: function() {
      Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La, 10);
  }
});
print(button);