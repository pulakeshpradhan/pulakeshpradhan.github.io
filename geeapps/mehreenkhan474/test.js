var table = ui.import && ui.import("table", "table", {
      "id": "users/mehreenkhan474/INDIA_DIST_APR21"
    }) || ee.FeatureCollection("users/mehreenkhan474/INDIA_DIST_APR21"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/mehreenkhan474/New_SoilDB_RAW"
    }) || ee.FeatureCollection("users/mehreenkhan474/New_SoilDB_RAW"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/mehreenkhan474/try1_logo"
    }) || ee.Image("users/mehreenkhan474/try1_logo"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.15113473971645,
                28.638016856137043
              ],
              [
                77.15210033496182,
                28.636491400296613
              ],
              [
                77.15466452678005,
                28.63774378233852
              ],
              [
                77.15373111804287,
                28.639316301026593
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[77.15113473971645, 28.638016856137043],
          [77.15210033496182, 28.636491400296613],
          [77.15466452678005, 28.63774378233852],
          [77.15373111804287, 28.639316301026593]]]),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "MODIS/006/MOD16A2"
    }) || ee.ImageCollection("MODIS/006/MOD16A2"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "NASA_USDA/HSL/SMAP10KM_soil_moisture"
    }) || ee.ImageCollection("NASA_USDA/HSL/SMAP10KM_soil_moisture");
var dataset = ee.ImageCollection('MODIS/006/MOD16A2')
                  .filter(ee.Filter.date('2020-01-01', '2020-05-01'));
var evapotranspiration = dataset.select('ET');
var evapotranspirationVis = {
  min: 0.0,
  max: 300.0,
  palette: [
    'ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201',
    '004c00', '011301'
  ],
};
var dataset = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture')
                  .filter(ee.Filter.date('2020-04-01', '2020-04-30'));
var soilMoisture = dataset.select('ssm');
var soilMoistureVis = {
  min: 0.0,
  max: 28.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.centerObject(geometry, 9);
Map.style().set({cursor:'crosshair'});
Map.addLayer(evapotranspiration, evapotranspirationVis, 'Evapotranspiration');
//Map.addLayer(soilMoisture, soilMoistureVis, 'Soil Moisture');
//Map.addLayer(table);
//Map.addLayer(table2);
///// NDVI (Smooth-Line) Based on ROI of Farm/////
var s2 = ee.ImageCollection("COPERNICUS/S2");
Map.addLayer(geometry, {color: 'red'}, 'locations')
Map.centerObject(geometry)
var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};
var startDate = '2017-01-01'
var endDate = '2021-06-01'
var filtered = s2
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.bounds(geometry))
// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var filtered = filtered//.map(maskS2clouds)
// Write a function that computes NDVI for an image and adds it as a band
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return image.addBands(ndvi);
}
// Map the function over the collection
var withNdvi = filtered.map(addNDVI);
var ndviCol = withNdvi.select('ndvi')
// Savitzky-Golay smoothing
// For 3rd Order Polynomial Fitting : x3*t^3 + x2*t^2 + x1*t^1 + constant
var order = 3
var coeffFlattener = [['constant', 'x', 'x2', 'x3']]
var independentSelectors = ['constant', 't', 't2', 't3']
var ndviCol = ndviCol.map(function(image) {
  var timestamp = ee.Date(image.get('system:time_start'))
  var diff = timestamp.difference(ee.Date(startDate), 'hour')
  return image.addBands(ee.Image(1).toFloat().rename('constant')).
    addBands(ee.Image(diff).toFloat().rename('t')).
    addBands(ee.Image(diff).pow(ee.Image(2)).toFloat().rename('t2')).
    addBands(ee.Image(diff).pow(ee.Image(3)).toFloat().rename('t3'))
})
// Step 2: Set up Savitzky-Golay smoothing
var windowSize = 9
var halfWindow = (windowSize - 1)/2
// Define the axes of variation in the collection array.
var imageAxis = 0;
var bandAxis = 1;
var array = ndviCol.toArray();
// Solve 
function getLocalFit(i) {
  // Get a slice corresponding to the window_size of the SG smoother
  var subarray = array.arraySlice(
    imageAxis, ee.Number(i).int(), ee.Number(i).add(windowSize).int())
  var predictors = subarray.arraySlice(bandAxis, 1, 1 + order + 1)
  //print(predictors.arrayDimensions())
  var response = subarray.arraySlice(bandAxis, 0, 1); // NDVI
  //print(response)
  var coeff = predictors.matrixSolve(response)
  coeff = coeff.arrayProject([0]).arrayFlatten(coeffFlattener)
  return coeff  
}
var ndviColList = ndviCol.toList(ndviCol.size())
var runLength = ee.List.sequence(0,
  ndviColList.size().subtract(windowSize))
// Run the SG solver over the series, and return the smoothed image version
var sgSeries = runLength.map(function(i) {
  var ref = ee.Image(ndviColList.get(ee.Number(i).add(halfWindow)))
  return getLocalFit(i).multiply(ref.select(independentSelectors)).reduce(ee.Reducer.sum()).copyProperties(ref)
})
// Build a stack for all images in the collection
function stack(i1, i2)
{
  return ee.Image(i1).addBands(ee.Image(i2))
}
var original = ndviColList.slice(1).iterate(stack, ndviColList.get(0))
var smoothed = sgSeries.slice(1).iterate(stack, sgSeries.get(0))
var y = ee.Image(original).select(['ndvi(..)*']).reduceRegion(ee.Reducer.mean(), geometry, 10).values()
var xlabels = ee.Image(original).select(['t(..)*']).reduceRegion(ee.Reducer.first(), geometry, 10).values()
var smoothy = ee.Image(smoothed).select(['sum(..)*']).reduceRegion(ee.Reducer.mean(), geometry, 10).values()
var y= y.map(function(v) { return ee.List([v, 0]).reduce(ee.Reducer.firstNonNull())})
xlabels = xlabels.map(function(f) { 
  // The labels are number of hours from startDate
  var date = ee.Date(startDate).advance(f, 'hour')
  return date.millis()
})
// Chart
var yValues = ee.Array.cat(
  [y, ee.List.repeat(smoothy.get(0),
  halfWindow).cat(smoothy).cat(ee.List.repeat(smoothy.get(-1), halfWindow))], 1);
var chart = ui.Chart.array.values(yValues, 0, xlabels).setSeriesNames(['Raw', 'Smoothed']).setOptions(
  {
    lineWidth: 1,
    interpolateNulls: true,
    title: 'Savitsky-Golay smoothing (order = ' + order + ', window_size = ' + windowSize + ')', 
    hAxis: {title: '', format: 'YYYY-MMM'},
    vAxis: {title: 'NDVI', viewWindow: {min:0, max:1}},
    legend: null,
    series: { 
      0: {color: 'gray', lineDashStyle: [1, 1]},
      1: {color: 'red', lineWidth: 2 }
    }
  })
print(chart)
///// UI Interface ////
var sidePanel = ui.Panel({
    style: 
    {width: '400px', 
      stretch: 'vertical'}
});
var BandsName = {B1: 'B1',B2: 'B2',B3: 'B3',B4: 'B4',B5: 'B5',B6: 'B6',
            B7: 'B7',B8: 'B8',B8A: 'B8A',B10: 'B10',B11: 'B11',B12: 'B12'};
var Data ={'LANDSAT/LC08/C01/T1_SR':"LANDSAT/LC08/C01/T1_SR",
            'COPERNICUS/S2':"COPERNICUS/S2"}
var maskL8sr= function (image) {
            var cloudShadowBitMask = (1 << 3);
            var cloudsBitMask = (1 << 5);
            var qa = image.select('pixel_qa');
            var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
            return image.updateMask(mask)};
var maskS2= function (image) {
          var qa = image.select('QA60');
          var cloudBitMask = 1 << 10;
          var cirrusBitMask = 1 << 11;
          var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
                        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
          return image.updateMask(mask).divide(10000);
        };
var logo = ee.Image('users/mehreenkhan474/try1_logo')
var title = ui.Label('Infocrop Spatial Model', {fontWeight: 'bold', fontSize: '25px', color: 'black', position:'top-center'});
var descr = ui.Label("Spatial Display of InfoCrop Model results.", {color: 'black'});
var thumbnail = ui.Thumbnail({
  image:logo, 
  params:{bands:['b1','b2','b3'], min:0, max:255},
  style: {width: '250px'}
})
// ---------------------- LABELS --------------------------
var DataSelectorLabel=ui.Label('1: Please Choose the dataset',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'});
var VisSelectorLabel=ui.Label('2: Please a visulizaton method',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'});
var GreyScaleLabel=ui.Label('2-1: Please select 1 band for Greyscale display',{fontSize: '13px', fontWeight: 'bold', color: 'Red'});
var ComLabel=(ui.Label('2-1: Please write down RGB bands composition to display.',{fontSize: '13px', fontWeight: 'bold', color: 'Red'}))
var PeriodSelectorLabel=ui.Label('3: Please write down the Obsevation period',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'});
var CloudMaskLabel=ui.Label('4: Please check the box for CloudMasking',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'})
var ReducerSelectorLabel=ui.Label('5: Please select a Reducer',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'});
var LoadLabel=ui.Label('6: Load the Image',{fontSize: '18px', fontWeight: 'bold', color: 'Blue'});
// ---------------------- datasetSelector --------------------------
var datasetSelector = ui.Select({
  items:Object.keys(s2), 
  placeholder:"Dataset to add as a layer ...",
    });
// ---------------------- BandSelector --------------------------
var GreyBandSelector =ui.Select({
  items: Object.keys(BandsName),
  placeholder:'Please select band to be shown',
  onChange:function(button){    
      ComButton.style().set('shown',false);
      ComLabel.style().set('shown',false);
      ComBandSelector.style().set('shown',false);
      PeriodSelectorLabel.style().set('shown',true);
      StartDateTextBox.style().set('shown',true);
      EndDateTextBox.style().set('shown',true);
      ReducerSelectorLabel.style().set('shown',true);
      ReducerSelector.style().set('shown',true);
      CloudMaskLabel.style().set('shown',true);
      CloudMask.style().set('shown',true);
      LoadLabel.style().set('shown',true);
      Loadbutton.style().set('shown',true);
  }
}); 
var ComBandSelector=ui.Textbox({
    placeholder: 'ex: B4-B3-B2',
  });
var GreyButton = ui.Button({
  label: "1 Band (Greyscale)",
  onClick: function(button){
      sidePanel.widgets().set(5,GreyScaleLabel);
      sidePanel.widgets().set(6,GreyBandSelector);
  }
});
var ComButton = ui.Button({
  label: "3 Bands (RGB composition)",
  onClick: function(button){
      sidePanel.widgets().set(7,ComLabel);
      sidePanel.widgets().set(8,ComBandSelector);
      GreyButton.style().set('shown',false);
      GreyScaleLabel.style().set('shown',false);
      GreyBandSelector.style().set('shown',false);
      PeriodSelectorLabel.style().set('shown',true);
      startDateTextBox.style().set('shown',true);
      endDateTextBox.style().set('shown',true);
      ReducerSelectorLabel.style().set('shown',true);
      ReducerSelector.style().set('shown',true);
      CloudMaskLabel.style().set('shown',true);
      CloudMask.style().set('shown',true);
      LoadLabel.style().set('shown',true);
      Loadbutton.style().set('shown',true);
  }
});
// ---------------------- PeriodSelector --------------------------
var StartDateTextBox= ui.Textbox({
          placeholder: 'ex: 2018-01-01',
          });
var EndDateTextBox = ui.Textbox({
          placeholder: 'ex: 2020-01-01',
          });
// ---------------------- CloudMasking --------------------------
var CloudMask = ui.Checkbox('Cloud Masking', false);
//---------------------- ReducerSelector --------------------------
var ReducerSelector=ui.Select({
  placeholder:'Please select the Reducer',
  items:[{label:'Median',value:'Median'},{label:'Mean',value:'Mean'},{label:'Min',value:'Min'},
        {label:'Max',value:'Max'},{label:'Newest: No reducer',value:'Newest: No reducer'},
        {label:'Oldest: No reducer',value:'Oldest: No reducer'}],  
      });
//---------------------- Loading --------------------------
var Loadbutton = ui.Button({
  label: 'Load the image',
  onClick: function(){
    var Dataset=ee.ImageCollection(datasetSelector.getValue());
   var RGBBands=ComBandSelector.getValue();
      if (GreyBandSelector.getValue()=== null){
        var SelectedBand=ee.String(ComBandSelector.getValue()).split('-');
      }
      else {
       var SelectedBand=ee.String(GreyBandSelector.getValue());
      };
    var startDate=ee.Date(startDateTextBox.getValue());
    var endDate=ee.Date(endDateTextBox.getValue());
    var SelectedReducer= function(ImageCollection){
        if (ReducerSelector.getValue() === 'Median'){
          return ImageCollection.median()
          }
        if (ReducerSelector.getValue() === 'Mean'){
          return ImageCollection.mean()
        }
        if (ReducerSelector.getValue() === 'Max'){
          return ImageCollection.max()
        }
        if (ReducerSelector.getValue() === 'Min'){
          return ImageCollection.min()
        } 
        if (ReducerSelector.getValue() === 'Oldest: No reducer'){
          return ImageCollection.sort('system:time_start').first()
        }       
        if (ReducerSelector.getValue() === 'Newest: No reducer'){
          return ImageCollection.sort('system:time_start',false).first()
        }           
    };
    var CloudMaskImgColl=function(ImageCollection){
          if (CloudMask.getValue() === true){
              if(datasetSelector.getValue()=== 'LANDSAT/LC08/C01/T1_SR'){
                return Dataset.map(maskL8sr)}
              else {
                return Dataset.map(maskS2)}
          }
          else {return Dataset}
          };
    var ImgtoLoad=SelectedReducer(Dataset.select(SelectedBand)
                        .filterDate(startDate,endDate))
    Map.addLayer(ImgtoLoad,{min: 100, max:2000})
  }
  });
//---------------------- Adding TO PANEL --------------------------
var sidePanel = ui.Panel([thumbnail], 'flow', {width: '330px', padding: '10px'});
sidePanel.add(title);
sidePanel.add(descr);
sidePanel.add(DataSelectorLabel);
sidePanel.widgets().set(1,DataSelectorLabel);
sidePanel.widgets().set(2, datasetSelector);
sidePanel.widgets().set(3,VisSelectorLabel);
sidePanel.widgets().set(4,GreyButton);
sidePanel.widgets().set(7,ComButton);
sidePanel.widgets().set(12,PeriodSelectorLabel);
sidePanel.widgets().set(13,StartDateTextBox);
sidePanel.widgets().set(14,EndDateTextBox);
sidePanel.widgets().set(15,ReducerSelectorLabel);
sidePanel.widgets().set(16,ReducerSelector);
sidePanel.widgets().set(17,CloudMaskLabel);
sidePanel.widgets().set(18,CloudMask);
sidePanel.widgets().set(19,LoadLabel);
sidePanel.widgets().set(20,Loadbutton);
ui.root.add(sidePanel);