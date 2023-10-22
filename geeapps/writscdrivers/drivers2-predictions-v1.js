var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -105.834765625,
            40.233158702878626
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-105.834765625, 40.233158702878626]),
    plots = ui.import && ui.import("plots", "table", {
      "id": "projects/wri-datalab/TSC_DRIVERS/SamplePlots/USA_Cohort_1_2"
    }) || ee.FeatureCollection("projects/wri-datalab/TSC_DRIVERS/SamplePlots/USA_Cohort_1_2");
//http://www.acgeospatial.co.uk/time-series-on-landsat-data-gee/
var labels = ee.ImageCollection('projects/wri-datalab/TSC_DRIVERS/LabelEvaluation/USA/Labels_Cohort_1_and_2')
print(plots.aggregate_array("PLOTID"))
var centerPlotID = 199//6003634; //4468462
var centerPlot = plots.filterMetadata('PLOTID','equals',centerPlotID).first();
var hansen = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
var projection = hansen.projection()
var lossyear = hansen.select('lossyear')
var L7collection = ee.ImageCollection('ee.ImageCollection("LANDSAT/LE07/C02/T1_L2")')
var year=2016
var startDateMonth =5
var startDateDay = 1
var endDateMonth= 9
var endDateDay = 30
//Scaling factor from LANDSAT/LE07/C02/T1_L2 page
function applyScaleFactors(image) {
  return image.multiply(0.0000275).add(-0.2);
}
//focalMean for gap filling
var focalMean = function(image){
  var filled1a = image.focalMean(1, 'square', 'pixels', 8)
  return image.blend(filled1a)
}
var cloudMaskL457 = function(image){
  var qa = image.select('QA_PIXEL')
  var cloud = (qa.bitwiseAnd(1 << 3)).or(qa.bitwiseAnd(1 << 4)).or(qa.bitwiseAnd(1 << 1))
  var mask2 = image.mask().reduce(ee.Reducer.min())
  return image.updateMask(cloud.not())
}
var getLandsat = function(year){
  year = ee.Number(year)
  //var year = ee.Number(year)
  var startDate = ee.Date.fromYMD(year.add(1), startDateMonth, startDateDay)
  var endDate = ee.Date.fromYMD(year.add(1), endDateMonth, endDateDay)
  var landsat7Collection = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').select(['SR_B3', 'SR_B2', 'SR_B1','QA_PIXEL'])
  var landsat7DateFiltered = landsat7Collection.filterDate(startDate,endDate)
  var landsat7CloudFiltered = landsat7DateFiltered.map(cloudMaskL457).select(['SR_B3', 'SR_B2', 'SR_B1'])
  //var landsat7FocalFiltered = landsat7CloudFiltered.map(focalMean)
  var landsat7Scaled = landsat7CloudFiltered.map(applyScaleFactors)
  var landsat7Median = landsat7Scaled.reduce(ee.Reducer.percentile([30]))
  landsat7Median = landsat7Median.rename(['SR_B3', 'SR_B2', 'SR_B1'])
  var hansenYear = year.subtract(2000)
  var lossBand = lossyear.eq(hansenYear)
  lossBand = lossBand.mask(lossBand).rename(['lossyear']).toDouble().unmask(0)
  var landsatCompositeExport = lossBand.addBands(landsat7Median)
  return landsatCompositeExport
}
var model = ee.Model.fromAiPlatformPredictor({
  projectName:'drivers-deforestation2', 
  projectId:'drivers-deforestation2', 
  modelName:'drivers2_model', 
  fixInputProj:true,
  proj:ee.Projection('EPSG:4326').atScale(projection.nominalScale()),
  version:'v0', 
  region:'us-central1',
  inputTileSize: [64,64],
  outputBands: {'p': {'type': ee.PixelType.float(), 'dimensions': 1}}
})
var getPrediction = function(landsatImage){
  landsatImage = ee.Image(landsatImage)
  var predictions = model.predictImage(landsatImage.toFloat().toArray())
  var predClasses = predictions.arrayArgmax().arrayFlatten([['p']]);
  return predClasses;
}
var classcolors = ['#ffffff','#FCABAB','#93D896','#C5E4FC','#FBFD38','#BABABA','#FC3B26','#3540c8']
var classnames = ['No loss','Hard commodities', 'Forest products', 'Other disturbances',
                'Soft commodities', 'Urbanization', 'Fires','Non-forest loss']
//Map.centerObject(labels.first(),14)//
Map.centerObject(centerPlot,14)
var years = ee.List.sequence(2001,2020)
var landsatCollection = ee.ImageCollection(years.map(getLandsat))
var predictions = landsatCollection.map(getPrediction).max().selfMask()
var plotsLayer = ui.Map.Layer(plots, {}, 'Plots')
var landsatLayer = ui.Map.Layer(getLandsat(2020),{bands:['SR_B3', 'SR_B2', 'SR_B1'],min:0,max:0.2},"Landsat");
var tclLayer = ui.Map.Layer(lossyear,{'min':1,'max':20,'palette':['#fd6df7','#d000c7']},'Loss')
var labelsLayer = ui.Map.Layer(labels,{'min':0,'max':7,'palette':classcolors},'Labels')
var predictionsLayer = ui.Map.Layer(predictions,{'min':0,'max':7,'palette':classcolors},"pred");
var showMosaic = function(range) {
  var rangeYear = range.start().get('year');
  var landsatMosaic = getLandsat(rangeYear)
    // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var yearNumber = parseInt(name);
    var yearIndex = yearNumber - 2000;
    landsatLayer = landsatLayer.setEeObject(landsatMosaic).setName(name + ' Landsat');
    //var tclMasked = lossyear.mask(lossyear.eq(yearIndex));
    //tclLayer = tclLayer.setEeObject(tclMasked).setName(name + ' Tree Cover Loss');
    //predictionsLayer = predictionsLayer.setEeObject(prediction.selfMask()).setName(name + ' Driver Prediction');
  })
}
// Code for date slider!
var now = Date.now();
var end = ee.Date(now).format();
var start = ee.Date('2000-01-01').get('year').format();
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range.dates[0],
    end: range.dates[1],
    value: null,
    period: 365,
    onChange: showMosaic
  });
  dateSlider.style().set({
    width: '400px'
  });
  Map.add(dateSlider.setValue(Date.parse('01 Jan 2020')));
});
//********** Create panel for navigation *********
var panel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
panel.style().set({
  //width: '250px',
  position: 'bottom-left',
  padding: '2px',
  margin: '2px'
});
Map.add(panel);
var centerPlotIDText = ui.Textbox({
  value: centerPlotID,
  placeholder: 'Enter PLOTID here',
  onChange: function(value) {
    // set value with a dedicated method
    centerPlotIDText.setValue(value);
    return(value);
  },
  style: {width:'75px',margin: '2px 2px 2px 2px',padding: '0px'}
});
panel.add(ui.Label({value:'PLOTID',style: {margin: '2px 2px 2px 2px',padding: '0px',textAlign:'center',fontWeight:'bold'}}));
panel.add(centerPlotIDText);
var locationButton = ui.Button({
  label: 'Go to Plot',
  onClick: function() {
    centerPlotID = parseInt(centerPlotIDText.getValue());
    centerPlot = plots.filterMetadata('PLOTID','equals',centerPlotID).first();
    Map.centerObject(centerPlot, 14);
  },
  style: {margin: '2px 2px 2px 2px',padding: '0px'}
});
panel.add(locationButton);
Map.layers().set(0, plotsLayer);
Map.layers().set(1, landsatLayer);
Map.layers().set(2, tclLayer);
Map.layers().set(3, labelsLayer);
Map.layers().set(4, predictionsLayer);
/******************** Function for making legends *****************/
var makeRow = function(color, name, boxMargin, labelMargin, labelFontSize){
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '6px',
          margin: boxMargin
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: labelMargin, fontSize:labelFontSize}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var layerLegend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-right',
    padding: '0px',
    width: '220px',
    maxHeight: '400px'
  }
});
var layersLegendTitle = ui.Label({
  value: 'Drivers Legend',
  style: {
    fontSize: '16px',
    margin: '2px 0 4px 4px',
    padding: '0',
    fontWeight: 'bold'
    }
});
layerLegend.add(layersLegendTitle)
for (var i = 1; i < classcolors.length; i++) {
  layerLegend.add(makeRow(classcolors[i],classnames[i],'0 0 4px 6px', '0 0 4px 4px','12px'));
  }  
Map.add(layerLegend);