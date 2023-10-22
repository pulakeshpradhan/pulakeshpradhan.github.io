//*********************************************************************
//*********************************************************************
var cld = require('users/fitoprincipe/geetools:cloud_masks');
var timeField = 'system:time_start';
//
var library = require('users/luciovilla/coded:Modules/Library');
//
//*********************************************************************
//*********************************************************************
// Visualization parameters
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '590px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left'
  }
//// Main Panel
var mainPanel = ui.Panel({style: {width: '600px'}})
.add(ui.Label('Select/Export Sentinel-2 Data',visLabels))
.add(ui.Label('El presente aplicativo'))
.add(ui.Label('Leer con cuidado'))
.add(ui.Label('Parameters',visLabels))
ui.root.add(mainPanel)
//*********************************************************************
//*********************************************************************
//// Text boxes
// Enter path to training data
// Example training data: users/bullockebu/amazon/samples/sample2
var trainingData = ui.Panel(
  [
    ui.Label({value:'Bounds Polygon:', style:{color:'red'}}),
    //ui.Textbox({value:'users/bullocke/GuyanaTraining', style:{stretch: 'horizontal'}})
    ui.Textbox({value:'users/luciovilla/LACC/LACC_Bounds', style:{stretch: 'horizontal'}})
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
// Consecutive observation threshold
/*
var consec = ui.Panel(
  [
    ui.Label({value:'consec:', style:{color:'red'}}),
    ui.Textbox({value:4, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var thresh = ui.Panel(
  [
    ui.Label({value:'thresh:', style:{color:'red'}}),
    ui.Textbox({value:3, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
*/
var start = ui.Panel(
  [
    ui.Label({value:'start:', style:{color:'red'}}),
    ui.Textbox({value:'2019-09-01', style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var end = ui.Panel(
  [
    ui.Label({value:'end:', style:{color:'red'}}),
    ui.Textbox({value:'2019-10-01', style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var outName = ui.Panel(
  [
    ui.Label({value:'Output Name:', style:{color:'red'}}),
    ui.Textbox({value:'S2_Selected', style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
//*********************************************************************
//*********************************************************************
mainPanel.add(trainingData)
mainPanel.add(start)
mainPanel.add(end)
//
mainPanel.add(ui.Label('Run/Export Mosaic',visLabels))
mainPanel.add(outName)
//*********************************************************************
//*********************************************************************
function doCoded(value) {
  // // Parameters
  var params = ee.Dictionary({
    'start': String(start.widgets().get(1).getValue()),
    'end': String(end.widgets().get(1).getValue()),
      })
  //var limites = ee.FeatureCollection(params.get('boundsPolygon'));
  var trainingDataFC = ee.FeatureCollection(trainingData.widgets().get(1).getValue())
  print(trainingDataFC)
  Map.addLayer(trainingDataFC)
  var outputDescription = outName.widgets().get(1).getValue()
  var assetName = outputDescription
  //var trainingDataFC = ee.FeatureCollection(trainingData.widgets().get(1).getValue())
  // Study region
  //ar saveRegion = ee.FeatureCollection(bounds)
  print("Boton");
  print(Date(start.widgets().get(1).getValue()))
  //
  var S2_SM_clip = library.S2_L2A_Mosaic_SelectionAll_APP([params.get('start'), params.get('end')],trainingDataFC)//.clip(aoi);;
  //var S2_SM_clip = library.S2_L2A_Mosaic_SelectionAll_APP(['2019-09-01', '2019-10-01'],bounds)//.clip(aoi);;
  //var S2_SM_clip = tempsign.S2_Mosaic_Selection(ndvi_date_01,aoi,ndvi_percentile).multiply(125).add(128).toByte().clip(cropsaoi);
  print(S2_SM_clip);
  //
  var S2_SM_clip_select = S2_SM_clip.select(['B2','B3','B4','B8']).uint16().clip(trainingDataFC)//.rescale();
  print("Coleccion seleccionada", S2_SM_clip_select);
  Map.addLayer(S2_SM_clip_select,{min:0,max:3000,bands:"B8,B4,B3"},"S2 Mosaic");
  Map.centerObject(trainingDataFC,12)
  //Map.addLayer(CCLA)
  // Save the results
  Export.image.toDrive({
  image:S2_SM_clip_select,
  description: outputDescription,
  scale: 10,
  region: trainingDataFC,
  maxPixels: 1e12
  });
  /*                   
  Export.image.toAsset({
    image: save_output,
    description: outputDescription,
    assetId: assetName,
    maxPixels: 1e13,
    scale: 30,
    region: bounds,
    pyramidingPolicy: {
    '.default': 'mode'
    }
  })
  */
}
var runCODED = ui.Button('Run',doCoded)
mainPanel.add(runCODED)