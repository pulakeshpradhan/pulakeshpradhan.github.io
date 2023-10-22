var s2 = ee.ImageCollection("COPERNICUS/S2"),
    kisumu = ee.FeatureCollection("users/lericnganga/cropmonitor/Kisumu_1_kmbuffer"),
    uasingishu = ee.FeatureCollection("users/lericnganga/cropmonitor/Uasin_Gishu_1_kmbuffer"),
    nandi = ee.FeatureCollection("users/lericnganga/cropmonitor/Nandi_1_kmbuffer"),
    unbp_roi = ee.FeatureCollection("users/firsake/VV/UNBP_ROI"),
    L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    L7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    L4 = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR");
//filter by date per county and inspect
Map.centerObject(unbp_roi);
var sat_names = ['SELECT','S2','L8','L7','L5','L4'];
var sat_img = [s2,L8,L7,L5];
var roi_names = ['SELECT',/*'KISUMU','NANDI','UASIN_GISHU',*/'UNBP'];
var roi_shp = [/*kisumu, nandi, uasingishu,*/ unbp_roi];
var mosaicker = require('users/firsake/default:ImportantTools/mosaicByDate_module.js');
var reducer = ee.Reducer.median();
var loc = "AOI";
var sat_ = "";
var dateImage = "";
var roi_sel, finalImage, roi, satNM, band_c;
var select_bands_S2_Download = ['B2','B3','B4','B8','B11','B12'];
var bandCombinations = [
                        ['B4', 'B3', 'B2'],
                        ['B4', 'B3', 'B2'],
                        ['B3', 'B2', 'B1'],
                        ['B3', 'B2', 'B1'],
                        ['B3', 'B2', 'B1']
                      ];            
function maskS2clouds(image) {
  var qa = image.select('QA60').toInt();
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa').toInt();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000);/*
              .select("B[0-9]*")
              .copyProperties(image, ["system:time_start"]);*/
}
// Define the visualization parameters - ndvi.
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
var vizParamsNDVI = {
  min: 0,
  max: 1,
  palette: palette
};
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Date Picker Grand',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#000050',  textAlign: 'center',stretch: 'horizontal'}
  }),
  ui.Label(
    {
    value: loc +' Region',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#000000', textAlign: 'center',stretch: 'horizontal'}
    }
  )
]);
panel.add(intro);
var select_sat = ui.Select({
  items: sat_names,
  value: sat_names[0],
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'}
});
var select_roi = ui.Select({
  items: roi_names,
  value: roi_names[0],
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'}
});
var text_startDate = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  value: '2019-03-01',
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'}
});
var text_endDate = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  value: '2019-03-31',
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'}
});
var button_process = ui.Button({
      label: 'RUN',
      style: {textAlign:'center', stretch:'horizontal', margin:'20px'},
      onClick: redraw});
var exporta = ui.Button({
      label: 'Export the current image to Drive',
      style: {textAlign:'center', stretch:'horizontal'},
      onClick: function() {
        var d = new Date();
        var n = d.getTime();
        var dateString = dateImage.replace("-","_").getInfo();
        //var dateString2 = dateString.replace("-","_").getInfo();
        var image_name = loc + "_" + dateString + "_" + n;
      var startDate = text_startDate.getValue();
      var endDate = text_endDate.getValue();
      if(roi_sel == 'SELECT' && startDate === "" && endDate === ""){
          print ("Please select the single image first");
        }else{
                    Export.image.toDrive({
                                            //image: finalImage.select(select_bands_S2_Download,select_bands_S2_Download), 
                                            image: finalImage, 
                                            description: image_name,
                                            maxPixels: 1e13,
                                            region:roi.geometry().bounds(),
                                            scale: 10, 
                                            crs: "EPSG:4326"
                                        });
      }
}
}
);
panel.add(ui.Label('Satellite:')).add(select_sat);
panel.add(ui.Label('Region:')).add(select_roi);
panel.add(ui.Label('Start Date:')).add(text_startDate);
panel.add(ui.Label('End Date:')).add(text_endDate);
panel.add(ui.Label('Show Image(s):')).add(button_process);
panel.add(ui.Label({ value: 'Download Image',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#006600', textAlign: 'center' ,stretch: 'horizontal'}})).add(exporta);
function redraw(){
  Map.layers().reset();
  //add sat
  var sat_sel = select_sat.getValue();
  sat_ = sat_sel;
  var sat_Idx = sat_names.indexOf(sat_sel) - 1;
  satNM = sat_img[sat_Idx];
  //add region
  var roi_sel = select_roi.getValue();
  loc = roi_sel;
  var roi_Idx = roi_names.indexOf(roi_sel) - 1;
  roi = roi_shp[roi_Idx];
  var startDate = text_startDate.getValue();
  var endDate = text_endDate.getValue();
  band_c = bandCombinations[sat_Idx];
  // Define the visualization parameters.
  var vizParams = {
    bands: band_c,
    min: 0,
    max: 0.3,
    gamma: [0.95, 1.1, 1]
  };
  if(sat_sel == 'SELECT' && roi_sel == 'SELECT' && startDate === "" && endDate === ""){
  }else{
    Map.centerObject(roi);
    var im_col = ee.ImageCollection(satNM.filterBounds(roi).filterDate(startDate,endDate));
    var im_col_mosaic = mosaicker.mosaicByDate(im_col, reducer);
    var col_Ids = im_col_mosaic.reduceColumns(ee.Reducer.toList(), ['date']).get('list');
    col_Ids.evaluate(function(ids) {
      for (var i=0; i<ids.length; i++) {
        var image = ee.Image(im_col_mosaic.filter(ee.Filter.eq('date', ids[i])).first());
        var image_cloud_masked;
        if(sat_sel == 'S2'){
           image_cloud_masked = maskS2clouds(image);
        }else{
          image_cloud_masked = maskL8sr(image);
        }
        dateImage = ee.String(ids[i]);
        finalImage = image_cloud_masked.clip(roi);
        //ndvi - remove to leave as normal
        //finalImage = finalImage.normalizedDifference(['B8','B4']);
      Map.addLayer(finalImage, vizParams/*NDVI*/, roi_sel + "_" + sat_sel + "_" + ids[i]);
      }
    });
  }
}
// Add the panel to the ui.root.
ui.root.insert(0, panel);