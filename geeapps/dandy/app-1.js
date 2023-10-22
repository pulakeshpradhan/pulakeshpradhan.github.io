// Sentinel-2 SR Image Collection and Mean Cloudy Pixel Percentage
var assignAs = 'app-1';
var lastEdit = '2021-03-23';
var path = 'users/dandy/RD/4_imageInquiry_S2/imageInquiry_S2_withUI_type2';
/***** 1 - UI *****/
// [1-1] Target area.
// Set initial view.
Map.setCenter(120.064, -2.12);
var labelStyle = {textAlign:'center', fontWeight:'bold', fontSize:'20px',
                  position:'bottom-center', border:'5px solid black'}; 
Map.add(ui.Label('Draw a rectangle...',labelStyle));
// Don't make imports that correspond to the drawn rectangle.
Map.drawingTools().setLinked(false);
// Limit the draw modes to rectangle.
Map.drawingTools().setDrawModes(['rectangle']);
// Add an empty layer to hold the drawn rectangle.
Map.drawingTools().addLayer([]);
// Set the geometry type to be rectangle.
Map.drawingTools().setShape('rectangle');
// Stop drawing mode.
Map.drawingTools().stop();
// Assign a name.
Map.drawingTools().layers().get(0).setName('target area');
// [1-2] Main panel.
var header = ui.Label({
                      value: '[DEV] Sentinel-2 SR Image Collection and Mean Cloudy Pixel Percentage',
                      style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 8px'}
                     });
var text = ui.Label('Complete commands below to generate and display an image',{fontWeight: 'bold',color:'Gray'});
var mainPanel = ui.Panel([header, text], 'flow', {width:'450px',padding:'8px',border:'5px solid black'});
ui.root.widgets().insert(1,mainPanel);
// [1-3] Commands.
var commandList = {
    START_DATE: ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      value: '2020-01-01',
    }),
    END_DATE: ui.Textbox({
      placeholder: 'YYYY-MM-DD', 
      value: '2020-01-31',
    }),
    MAX_CLOUD: ui.Textbox({
      placeholder: '0 - 100%',
      // value: ee.String('50').getInfo(),  
      value: '50',  
    }),
  };
var commandList_panel = ui.Panel({
    widgets: [
      ui.Panel([
        ui.Label('Start-date:'), commandList.START_DATE
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label('End-date:'), commandList.END_DATE
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label('Max CLOUDY_PIXEL_PERCENTAGE:'), commandList.MAX_CLOUD
      ], ui.Panel.Layout.flow('horizontal')),
    ]
  });
mainPanel.add(commandList_panel);
/***** 2 - ANALYSIS *****/
// [2-1] Function to get an image.
var getImage = function () {
  // [2-1-1] Set Map.
  Map.clear();
  var targetArea = Map.drawingTools().layers().get(0).toGeometry();
  // [2-1-2] Define analysis period.
  var startDate = commandList.START_DATE.getValue();
  var endDate = commandList.END_DATE.getValue();
  // [2-1-3] Define maximum 'CLOUDY_PIXEL_PERCENTAGE'.
  var maxCloud = ee.Number.parse(commandList.MAX_CLOUD.getValue());
  // [2-1-4] Filter image collection.
  var imageColl = ee.ImageCollection("COPERNICUS/S2_SR").filterDate(startDate,endDate)
                                                        .filterBounds(targetArea)
                                                        .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',maxCloud)
                                                        .aside(print);
  // [2-1-5] Derive and display median image.
  var imageMedian = imageColl.median().aside(print);
  var visParams = {bands: 'B4,B3,B2', min:0, max:3000}; // True-color RGB.
  Map.addLayer(imageMedian.clip(targetArea),visParams,'median image');
  // [2-1-6] Export. 
  Export.image.toAsset({
    image: imageMedian.clip(targetArea), 
    description: 'imageMedian',
    region: targetArea,
    crs: 'EPSG:4326',
    scale: 10,
    maxPixels: 1e13,
  }); 
  // [2-1-7] Label of image collection's size.
  var imageCollSize_info = 'Image collection: '+ee.String(imageColl.size()).getInfo()+' images';
  var imageCollSize_labelStyle = {textAlign:'center', fontWeight:'bold', fontSize:'20px',
                              position:'bottom-left', border:'5px solid black'}; 
  Map.add(ui.Label(imageCollSize_info,imageCollSize_labelStyle));
  // [2-1-8] Label of mean cloud.
  var meanCloud = ee.Number(imageColl.aggregate_mean('CLOUDY_PIXEL_PERCENTAGE')).format('%.2f');
  var meanCloud_info = 'Mean cloud: '+meanCloud.getInfo()+' %';
  var meanCloud_labelStyle = {textAlign:'center', fontWeight:'bold', fontSize:'20px',
                              position:'bottom-right', border:'5px solid black'}; 
  Map.add(ui.Label(meanCloud_info,meanCloud_labelStyle));  
};                                                    
/***** 3 - APPLY BUTTON. *****/ 
// [3-1] Add apply button.
var applyButton = {
    clickRun: ui.Button({
      label: 'APPLY',
      style: {border: '1px solid black',
              height: '30px',
              width: '100px',
      },
      onClick: getImage,
  }),
};
var applyButton_panel = ui.Panel({
    widgets:[
      ui.Panel([
        applyButton.clickRun,
      ]), 
    ]
  });
mainPanel.add(applyButton_panel);