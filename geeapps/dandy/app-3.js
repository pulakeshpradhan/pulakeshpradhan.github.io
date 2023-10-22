// Info.
var scriptTitle = 'DEV_dataInquiry';
var generalTitle = 'Data Inquiry';
var lastEdit = '2021.03.29';
var assignAs = 'app-3';
var path = 'users/dandy/apps/app-3/DEV_dataInquiry';
print(generalTitle+' - '+lastEdit)
/***** [SECTION x] Main function *****/ 
var imageProcess = function () {
  // [1] Clear panels.
  mapPanel.clear();
  mainPanel_text.clear();
  // mainPanel_chart.clear();  
  // [2] Get user parameters from input commands. 
  var startDate = inputCommands.START_DATE.getValue();
  var endDate = inputCommands.END_DATE.getValue(); 
  // var opt_targetArea = inputCommands.OPT_TARGETAREA.getValue();  
  // var opt_targetArea_attValue = inputCommands.OPT_TARGETAREA_ATTVALUE.getValue(); 
  // var targetArea_assetID = inputCommands.TARGETAREA_ASSETID.getValue();
  // var targetArea_attName = inputCommands.TARGETAREA_ATTNAME.getValue();
  // var targetArea_attValue = inputCommands.TARGETAREA_ATTVALUE.getValue();
  var percentArea_thres = inputCommands.PERCENTAREA_THRES.getValue();
  var countS2 = inputCommands.COUNT_S2.getValue();
  var countL8 = inputCommands.COUNT_L8.getValue();
  var countL7 = inputCommands.COUNT_L7.getValue();
  var countL5 = inputCommands.COUNT_L5.getValue();
  // var countS1ASC = inputCommands.COUNT_S1ASC.getValue(); 
  // var countS1DSC = inputCommands.COUNT_S1DSC.getValue(); 
  var opt_cloudMask = inputCommands.OPT_CLOUDMASK.getValue(); 
  // [3] Get target area.
  var targetArea = mapPanel.drawingTools().layers().get(0).toGeometry();
  // [4] Image analysis.
  var startDate_millis = ee.Number(ee.Date(startDate).millis());
  var dateNow_millis = ee.Number(ee.Date(Date.now()).millis());  
  var endDate_millis = ee.Number(ee.Date(endDate).millis());  
  startDate_millis.evaluate(function(startDate_millis_i){
    dateNow_millis.evaluate(function(dateNow_millis_i){
      endDate_millis.evaluate(function(endDate_millis_i){
        if (startDate_millis_i <= dateNow_millis_i && startDate_millis_i <= endDate_millis_i) {
          // Analysis for Sentinel-2 Level-2A.
          switch (countS2) {
              case true:
              // Image Collection: Sentinel-2 Level-2A.
              var S2_imageColl = ee.ImageCollection("COPERNICUS/S2_SR").filterDate(startDate,endDate)
                                                                       .filterBounds(targetArea)
                                                                       .sort('system:time_start');
              // Image Processing.
              S2_imageColl.size().evaluate(function (S2_imageColl_i) {
                if (S2_imageColl_i === 0) {
                  // mainPanel_text.remove(countS2_loading);
                  mainPanel_text.add(ui.Label('WARNING: No S2L2A image in the selected duration.',
                                              {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));  
                } else {
                  // Cloud masking, percent area filtering, and deriving indices.
                  switch (opt_cloudMask) {
                    case 'Apply QA-band Method':
                    // Cloud-free Image Collection.  
                    var S2_cloudFreeColl = ee.ImageCollection(S2_imageColl).map(callModule.S2_qaBand);  
                    // Percent area filtering.
                    var S2_cloudFreeColl_percentArea = ee.ImageCollection(S2_cloudFreeColl).map(callModule.getPercentArea('B4',10,targetArea)); 
                    var S2_cloudFreeColl_thres = S2_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres));  
                    print('S2',S2_cloudFreeColl_percentArea.size(),S2_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(S2_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'S2L2A - Median image');
                    S2_cloudFreeColl_thres.size().evaluate(function (S2_cloudFreeColl_thres_i) {
                      if (S2_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No S2L2A image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(S2_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'S2L2A - Median image');
                      }
                    });
                    // // Indices Collection.
                    // var S2_indicesColl = ee.ImageCollection(S2_cloudFreeColl_thres).map(S2_indices);
                    break;
                    case 'Apply Custom Method':
                    // Cloud-free Image Collection.  
                    S2_cloudFreeColl = ee.ImageCollection(S2_imageColl).filterMetadata('CLOUD_COVERAGE_ASSESSMENT','not_greater_than',30).map(callModule.S2_cloudElimination); 
                    // Percent area filtering.
                    S2_cloudFreeColl_percentArea = ee.ImageCollection(S2_cloudFreeColl).map(callModule.getPercentArea('B4',10,targetArea)); 
                    S2_cloudFreeColl_thres = S2_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres));
                    print('S2',S2_cloudFreeColl_percentArea.size(),S2_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(S2_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'S2L2A - Median image'); 
                    S2_cloudFreeColl_thres.size().evaluate(function (S2_cloudFreeColl_thres_i) {
                      if (S2_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No S2L2A image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(S2_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'S2L2A - Median image');
                      }
                    });
                    // // Indices Collection.
                    // S2_indicesColl = ee.ImageCollection(S2_cloudFreeColl_thres).map(S2_indices);
                    break;
                    case 'Do not apply':
                    // Cloud-free Image Collection. - Not applied, only for naming purposes.  
                    S2_cloudFreeColl = ee.ImageCollection(S2_imageColl); 
                    // Percent area filtering. - Not applied, only for naming purposes.
                    S2_cloudFreeColl_percentArea = ee.ImageCollection(S2_cloudFreeColl);
                    S2_cloudFreeColl_thres = S2_cloudFreeColl_percentArea;
                    print('S2',S2_cloudFreeColl_percentArea.size(),S2_cloudFreeColl_thres.size())
                    // Display.
                    mapPanel.drawingTools().layers().get(0).setShown(false);
                    mapPanel.addLayer(S2_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'S2L2A - Median image');                     
                    // // Indices Collection.
                    // S2_indicesColl = ee.ImageCollection(S2_cloudFreeColl_thres).map(S2_indices);
                    break;      
                  }   
                }
              });   
              break;
          }    
          // Analysis for Landsat-8 Surface Reflectance. 
          switch (countL8) {
              case true:
              // Image Collection: Landsat-8 Surface Reflectance.    
              var L8_imageColl = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").filterDate(startDate,endDate)
                                                                             .filterBounds(targetArea)
                                                                             .sort('system:time_start'); 
              // Image Processing.
              L8_imageColl.size().evaluate(function (L8_imageColl_i) {
                if (L8_imageColl_i === 0) {
                  // mainPanel_text.remove(countL8_loading);
                  mainPanel_text.add(ui.Label('WARNING: No L8SR image in the selected duration.',
                                              {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));  
                } else {
                  // Cloud masking, percent area filtering, and deriving indices.
                  switch (opt_cloudMask) {
                    case 'Apply QA-band Method':
                    // Cloud-free Image Collection.  
                    var L8_cloudFreeColl = ee.ImageCollection(L8_imageColl).map(callModule.L8_qaBand);
                    // Percent area filtering.
                    var L8_cloudFreeColl_percentArea = ee.ImageCollection(L8_cloudFreeColl).map(callModule.getPercentArea('B4',30,targetArea)); 
                    var L8_cloudFreeColl_thres = L8_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres)); 
                    print('L8',L8_cloudFreeColl_percentArea.size(),L8_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L8_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'L8SR - Median image');
                    L8_cloudFreeColl_thres.size().evaluate(function (L8_cloudFreeColl_thres_i) {
                      if (L8_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L8SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L8_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'L8SR - Median image');
                      }
                    });                    
                    // // Indices Collection.
                    // var L8_indicesColl = ee.ImageCollection(L8_cloudFreeColl_thres).map(L8_indices);
                    break;
                    case 'Apply Custom Method':
                    // Cloud-free Image Collection.  
                    L8_cloudFreeColl = ee.ImageCollection(L8_imageColl).filterMetadata('CLOUD_COVER_LAND','not_greater_than',30).map(callModule.L8_cloudElimination);  
                    // Percent area filtering.
                    L8_cloudFreeColl_percentArea = ee.ImageCollection(L8_cloudFreeColl).map(callModule.getPercentArea('B4',30,targetArea)); 
                    L8_cloudFreeColl_thres = L8_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres)); 
                    print('L8',L8_cloudFreeColl_percentArea.size(),L8_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L8_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'L8SR - Median image');
                    L8_cloudFreeColl_thres.size().evaluate(function (L8_cloudFreeColl_thres_i) {
                      if (L8_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L8SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L8_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'L8SR - Median image');
                      }
                    });                    
                    // Indices Collection.
                    L8_indicesColl = ee.ImageCollection(L8_cloudFreeColl_thres).map(L8_indices);
                    break;
                    case 'Do not apply':
                    // Cloud-free Image Collection. - Not applied, only for naming purposes.  
                    L8_cloudFreeColl = ee.ImageCollection(L8_imageColl); 
                    // Percent area filtering. - Not applied, only for naming purposes.
                    L8_cloudFreeColl_percentArea = ee.ImageCollection(L8_cloudFreeColl);
                    L8_cloudFreeColl_thres = L8_cloudFreeColl_percentArea;  
                    // Display.
                    mapPanel.drawingTools().layers().get(0).setShown(false);
                    mapPanel.addLayer(L8_cloudFreeColl_thres.median().clip(targetArea),{bands:['B4','B3','B2'],min:0,max:2500},'L8SR - Median image');                    
                    // // Indices Collection.
                    // L8_indicesColl = ee.ImageCollection(L8_cloudFreeColl_thres).map(L8_indices);
                    break;      
                  }      
                }
              });        
              break;
            }     
          // Analysis for Landsat-7 Surface Reflectance.
          switch (countL7) {
              case true:
              // Image Collection: Landsat-7 Surface Reflectance.    
              var L7_imageColl = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").filterDate(startDate,endDate)
                                                                             .filterBounds(targetArea)
                                                                             .sort('system:time_start'); 
              // Image Processing.
              L7_imageColl.size().evaluate(function (L7_imageColl_i) {
                if (L7_imageColl_i === 0) {
                  // mainPanel_text.remove(countL7_loading);
                  mainPanel_text.add(ui.Label('WARNING: No L7SR image in the selected duration.',
                                              {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));  
                } else {
                  // Cloud masking, percent area filtering, and deriving indices.
                  switch (opt_cloudMask) {
                    case 'Apply QA-band Method':
                    // Cloud-free Image Collection.  
                    var L7_cloudFreeColl = ee.ImageCollection(L7_imageColl).map(callModule.L57_qaBand);
                    // Percent area filtering.
                    var L7_cloudFreeColl_percentArea = ee.ImageCollection(L7_cloudFreeColl).map(callModule.getPercentArea('B3',30,targetArea)); 
                    var L7_cloudFreeColl_thres = L7_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres)); 
                    print('L7',L7_cloudFreeColl_percentArea.size(),L7_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L7_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L7SR - Median image');
                    L7_cloudFreeColl_thres.size().evaluate(function (L7_cloudFreeColl_thres_i) {
                      if (L7_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L7SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L7_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L7SR - Median image');
                      }
                    });                    
                    // // Indices Collection.
                    // var L7_indicesColl = ee.ImageCollection(L7_cloudFreeColl_thres).map(L7_indices);
                    break;
                    case 'Apply Custom Method':
                    // Cloud-free Image Collection.  
                    L7_cloudFreeColl = ee.ImageCollection(L7_imageColl).filterMetadata('CLOUD_COVER_LAND','not_greater_than',30).map(callModule.L57_cloudElimination);  
                    // Percent area filtering.
                    L7_cloudFreeColl_percentArea = ee.ImageCollection(L7_cloudFreeColl).map(callModule.getPercentArea('B3',30,targetArea)); 
                    L7_cloudFreeColl_thres = L7_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres));  
                    print('L7',L7_cloudFreeColl_percentArea.size(),L7_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L7_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L7SR - Median image');
                    L7_cloudFreeColl_thres.size().evaluate(function (L7_cloudFreeColl_thres_i) {
                      if (L7_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L7SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L7_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L7SR - Median image');
                      }
                    });                     
                    // // Indices Collection.
                    // L7_indicesColl = ee.ImageCollection(L7_cloudFreeColl_thres).map(L7_indices);
                    break;
                    case 'Do not apply':
                    // Cloud-free Image Collection. - Not applied, only for naming purposes.  
                    L7_cloudFreeColl = ee.ImageCollection(L7_imageColl); 
                    // Percent area filtering. - Not applied, only for naming purposes.
                    L7_cloudFreeColl_percentArea = ee.ImageCollection(L7_cloudFreeColl);
                    L7_cloudFreeColl_thres = L7_cloudFreeColl_percentArea;
                    // Display.
                    mapPanel.drawingTools().layers().get(0).setShown(false);
                    mapPanel.addLayer(L7_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L7SR - Median image');                    
                    // // Indices Collection.
                    // L7_indicesColl = ee.ImageCollection(L7_cloudFreeColl_thres).map(L7_indices);
                    break;      
                  }   
                }
              });        
              break;
            }      
          // Analysis for Landsat-5 Surface Reflectance.
          switch (countL5) {
              case true:
              // Image Collection: Landsat-5 Surface Reflectance.    
              var L5_imageColl = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR").filterDate(startDate,endDate)
                                                                             .filterBounds(targetArea)
                                                                             .sort('system:time_start'); 
              // Image Processing.
              L5_imageColl.size().evaluate(function (L5_imageColl_i) {
                if (L5_imageColl_i === 0) {
                  // mainPanel_text.remove(countL5_loading);
                  mainPanel_text.add(ui.Label('WARNING: No L5SR image in the selected duration.',
                                              {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));  
                } else {
                  // Cloud masking, percent area filtering, and deriving indices.
                  switch (opt_cloudMask) {
                    case 'Apply QA-band Method':
                    // Cloud-free Image Collection.  
                    var L5_cloudFreeColl = ee.ImageCollection(L5_imageColl).map(callModule.L57_qaBand);
                    // Percent area filtering.
                    var L5_cloudFreeColl_percentArea = ee.ImageCollection(L5_cloudFreeColl).map(callModule.getPercentArea('B3',30,targetArea)); 
                    var L5_cloudFreeColl_thres = L5_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres));      
                    print('L5',L5_cloudFreeColl_percentArea.size(),L5_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L5_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L5SR - Median image');
                    L5_cloudFreeColl_thres.size().evaluate(function (L5_cloudFreeColl_thres_i) {
                      if (L5_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L5SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L5_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L5SR - Median image');
                      }
                    });                    
                    // // Indices Collection.
                    // var L5_indicesColl = ee.ImageCollection(L5_cloudFreeColl_thres).map(L5_indices);
                    break;
                    case 'Apply Custom Method':
                    // Cloud-free Image Collection.  
                    L5_cloudFreeColl = ee.ImageCollection(L5_imageColl).filterMetadata('CLOUD_COVER_LAND','not_greater_than',30).map(callModule.L57_cloudElimination);  
                    // Percent area filtering.
                    L5_cloudFreeColl_percentArea = ee.ImageCollection(L5_cloudFreeColl).map(callModule.getPercentArea('B3',30,targetArea)); 
                    L5_cloudFreeColl_thres = L5_cloudFreeColl_percentArea.filterMetadata('percentArea','not_less_than',ee.Number.parse(percentArea_thres)); 
                    print('L5',L5_cloudFreeColl_percentArea.size(),L5_cloudFreeColl_thres.size())
                    // Display.
                    // mapPanel.addLayer(L5_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L5SR - Median image');
                    L5_cloudFreeColl_thres.size().evaluate(function (L5_cloudFreeColl_thres_i) {
                      if (L5_cloudFreeColl_thres_i === 0) {
                        print('No image')
                        mainPanel_text.add(ui.Label('WARNING: No L5SR image in the selected settings.',
                                          {fontSize:'15px',fontWeight:'bold',color:'Red',backgroundColor:'Yellow',margin:'20px 8px 0px'}));                        
                      } else {
                        mapPanel.drawingTools().layers().get(0).setShown(false);
                        mapPanel.addLayer(L5_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L5SR - Median image');
                      }
                    });                                        
                    // // Indices Collection.
                    // L5_indicesColl = ee.ImageCollection(L5_cloudFreeColl_thres).map(L5_indices);
                    break;
                    case 'Do not apply':
                    // Cloud-free Image Collection. - Not applied, only for naming purposes.  
                    L5_cloudFreeColl = ee.ImageCollection(L5_imageColl); 
                    // Percent area filtering. - Not applied, only for naming purposes.
                    L5_cloudFreeColl_percentArea = ee.ImageCollection(L5_cloudFreeColl);
                    L5_cloudFreeColl_thres = L5_cloudFreeColl_percentArea;  
                    // Display.
                    mapPanel.drawingTools().layers().get(0).setShown(false);
                    mapPanel.addLayer(L5_cloudFreeColl_thres.median().clip(targetArea),{bands:['B3','B2','B1'],min:0,max:2500},'L5SR - Median image');                    
                    // // Indices Collection.
                    // L5_indicesColl = ee.ImageCollection(L5_cloudFreeColl_thres).map(L5_indices);
                    break;      
                  }                     
                }
              });          
              break;
          }             
        } else {
          mainPanel_text.add(ui.Label('ERROR: Please change monitoring period.',
                            {fontWeight:'bold',fontSize:'15px',color:'Red',backgroundColor:'Yellow'}));
        }
      });
    });
  });  
};
/***** [SECTION x] Helper Functions *****/
// Call module that consist of helper functions.
var callModule = require('users/dandy/apps:app-3/MODULE_general');
/***** [SECTION x] UI configuration *****/ 
// [1] Define the map panel and set default center.
var mapPanel = ui.Map();
mapPanel.setCenter(120.064,-2.12);
// [2] Add a title and some explanatory text to the main panel.
var title = ui.Label(generalTitle,{fontWeight:'bold',fontSize:'20px',color:'Gray',margin:'10px 8px 0px'});
var version = ui.Label(lastEdit+' version',{fontWeight: 'bold',fontSize:'12px',color:'Red',margin:'0px 8px'});      
var explanation_1 = ui.Label('Complete commands below:',
                            {fontWeight:'bold',fontSize:'15px',color:'Black',backgroundColor:'DarkGray',margin:'20px 8px 0px'}); 
var mainPanel = ui.Panel([title,version,explanation_1],'flow',{width:'30%',padding:'8px'});
// [3] Set UI.
// Clear default UI.
ui.root.clear();
// Set UI to a split view.
ui.root.add(ui.SplitPanel(mainPanel,mapPanel));
// Don't make imports that correspond to the drawn rectangle.
mapPanel.drawingTools().setLinked(false);
// Limit the draw modes to rectangle.
mapPanel.drawingTools().setDrawModes(['rectangle']);
// Add an empty layer to hold the drawn rectangle.
mapPanel.drawingTools().addLayer([]);
// Set the geometry type to be rectangle.
mapPanel.drawingTools().setShape('rectangle');
// Stop drawing mode.
mapPanel.drawingTools().stop();
// Assign a name.
mapPanel.drawingTools().layers().get(0).setName('Target Area');
// [4] Add input commands widgets.
var inputCommands = {
    // Monitoring periods.    
    START_DATE: ui.Textbox({
      placeholder: 'yyyy-mm-dd', 
      value:'20xx-01-01',
      style: {width:'90px',margin:'0px'},
    }),
    END_DATE: ui.Textbox({
      placeholder: 'yyyy-mm-dd', 
      value:'20xx-01-01',
      style: {width:'90px',margin:'0px'},
    }),
    // // Options: target area - asset id.   
    // OPT_TARGETAREA: ui.Select({
    //   items: ['asset_id (select-by-attribute)','asset_id (no selection)'],
    //   value:  'asset_id (no selection)',      
    //   style: {width:'95%',margin:'8px 8px 0px 8px'},
    //   onChange: function () {
    //     var selected = inputCommands.OPT_TARGETAREA.getValue();
    //     if (selected == 'asset_id (no selection)') {
    //       inputCommands.TARGETAREA_ASSETID.setDisabled(false);          
    //       inputCommands.TARGETAREA_ATTNAME.setDisabled(true);
    //       inputCommands.TARGETAREA_ATTVALUE.setDisabled(true);
    //       inputCommands.OPT_TARGETAREA_ATTVALUE.setDisabled(true);          
    //       inputCommands.TARGETAREA_ASSETID.setValue('');
    //       inputCommands.TARGETAREA_ATTNAME.setValue('-'); 
    //       inputCommands.TARGETAREA_ATTVALUE.setValue('-');          
    //     } else if (selected == 'asset_id (select-by-attribute)') {
    //       inputCommands.TARGETAREA_ASSETID.setDisabled(false);
    //       inputCommands.TARGETAREA_ATTNAME.setDisabled(false);
    //       inputCommands.TARGETAREA_ATTVALUE.setDisabled(false);
    //       inputCommands.OPT_TARGETAREA_ATTVALUE.setDisabled(false);
    //       inputCommands.TARGETAREA_ASSETID.setValue(''); 
    //       inputCommands.TARGETAREA_ATTNAME.setValue('');
    //       inputCommands.TARGETAREA_ATTVALUE.setValue('');  
    //     }
    //   },      
    // }),    
    // TARGETAREA_ASSETID: ui.Textbox({
    //   placeholder: 'users/user_name/folder_name/asset_id',
    //   // value: 'projects/ee-my-usernam/assets/Palm_Goodsite',
    //   value: 'users/dandy/aoi/good_palm_aoi',      
    //   style: {width:'95%',margin:'0px 8px 0px 8px'},
    // }),  
    // // Options: target area - attribute name.  
    // OPT_TARGETAREA_ATTNAME: ui.Select({
    //   items: ['attribute_name (string)'],
    //   value:  'attribute_name (string)',  
    //   disabled: true,      
    //   style: {width:'95%',margin:'8px 8px 0px 8px'},
    // }),     
    // TARGETAREA_ATTNAME: ui.Textbox({
    //   placeholder: 'attribute_name (string)', 
    //   value: '-',
    //   disabled: true,
    //   style: {width:'95%',margin:'0px 8px 0px 8px'}, 
    // }), 
    // // Options: target area - attribute value.  
    // OPT_TARGETAREA_ATTVALUE: ui.Select({
    //   items: ['attribute_value (string)','attribute_value (number)'],
    //   value:  'attribute_value (string)',  
    //   disabled: true,      
    //   style: {width:'95%',margin:'8px 8px 0px 8px'},
    //   onChange: function () {
    //     var selected = inputCommands.OPT_TARGETAREA_ATTVALUE.getValue();
    //     if (selected == 'attribute_value (string)') {
    //       inputCommands.TARGETAREA_ATTVALUE.setValue('');           
    //       inputCommands.TARGETAREA_ATTVALUE.setPlaceholder('attribute_value (string)');          
    //     } else if (selected == 'attribute_value (number)') {
    //       inputCommands.TARGETAREA_ATTVALUE.setValue('');           
    //       inputCommands.TARGETAREA_ATTVALUE.setPlaceholder('attribute_value (number)');          
    //     }
    //   },      
    // }),     
    // TARGETAREA_ATTVALUE: ui.Textbox({
    //   placeholder: 'attribute_value (string)',
    //   value: '-',
    //   disabled: true,    
    //   style: {width:'95%',margin:'0px 8px 8px 8px'},
    // }),
    // Dataset selection.   
    COUNT_S2: ui.Checkbox({
      label: 'Sentinel-2 Level-2A (S2L2A)',
      value: true,
      // value: false,  
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }),
    INFO_S2: ui.Label({
      value: '2018-12-xx to present',
      style: {fontSize:'12px',margin:'4px 8px 8px 44px',color:'Gray'},
    }),
    COUNT_L8: ui.Checkbox({
      label: 'Landsat-8 Surface Reflectance (L8SR)',
      // value: true,
      value: false,      
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }),    
    INFO_L8: ui.Label({
      value: '2013-04-11 to present',
      style: {fontSize:'12px',margin:'4px 8px 8px 44px',color:'Gray'},
    }),
    COUNT_L7: ui.Checkbox({
      label: 'Landsat-7 Surface Reflectance (L7SR)',
      // value: true,
      value: false,
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }), 
    INFO_L7: ui.Label({
      value: '1999-01-01 to present (2003-05-31 to present SLC-off)',
      style: {fontSize:'12px',margin:'4px 8px 8px 44px',color:'Gray'},
    }),    
    COUNT_L5: ui.Checkbox({
      label: 'Landsat-5 Surface Reflectance (L5SR)',
      // value: true,
      value: false,
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }),
    INFO_L5: ui.Label({
      value: '1984-01-01 to 2012-05-05',
      style: {fontSize:'12px',margin:'4px 8px 8px 44px',color:'Gray'},
    }),      
    COUNT_S1ASC: ui.Checkbox({
      label: 'Sentinel-1 SAR GRD Ascending (S1GRD-ASC)',
      // value: true,
      value: false,
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }),
    COUNT_S1DSC: ui.Checkbox({
      label: 'Sentinel-1 SAR GRD Descending (S1GRD-DSC)',
      // value: true,
      value: false,
      style: {fontSize:'12px',margin:'4px 8px 4px 24px'},
    }),  
    // Cloud masking method.
    OPT_CLOUDMASK: ui.Select({
      items: ['Apply QA-band Method', 'Apply Custom Method', 'Do not apply'],
      value:  'Apply QA-band Method',      
      style: {width:'95%',margin:'8px 8px 0px 8px'},  
      onChange: function () {
        var selected = inputCommands.OPT_CLOUDMASK.getValue();
        if (selected == 'Apply QA-band Method' || selected == 'Apply Custom Method' ) {
          inputCommands.PERCENTAREA_THRES.setDisabled(false);
          inputCommands.PERCENTAREA_THRES.setValue('');
        } else if (selected == 'Do not apply') {
          inputCommands.PERCENTAREA_THRES.setDisabled(true);
          inputCommands.PERCENTAREA_THRES.setValue('-');
        }
      },   
    }),    
    PERCENTAREA_THRES: ui.Textbox({
      placeholder: 'Enter the percent-area threshold (0-100)', 
      value:'60',
      disabled: false,
      style: {width:'95%',margin:'0px 8px 8px 8px'},
    }),    
    // Start button.
    START_BUTTON: ui.Button({
      label: 'Start Analysis',
      onClick: imageProcess,
      style: {width:'95%'},
  }),   
};
var mainPanel_inputCommands = ui.Panel({
    widgets: [
      // Command-x
      ui.Panel([ui.Label('1. Draw a rectangle using Geometry Imports tool',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('horizontal')),      
      // Command-x
      ui.Panel([ui.Label('2. Insert monitoring period',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Start Date:',{fontSize:'12px'}),inputCommands.START_DATE,
                ui.Label('End Date:',{fontSize:'12px'}),inputCommands.END_DATE], ui.Panel.Layout.flow('horizontal')), 
      // // Command-x                
      // ui.Panel([ui.Label('2. Options to specify target area using asset',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('horizontal')), 
      // ui.Panel([ui.Label('Note: Make sure you have access to the asset (as owner, writer, or reader).',
      //                   {fontSize:'10px',color:'Gray',margin:'0px 8px'})], ui.Panel.Layout.flow('horizontal')),       
      // ui.Panel([inputCommands.OPT_TARGETAREA,inputCommands.TARGETAREA_ASSETID,inputCommands.OPT_TARGETAREA_ATTNAME,
      //           inputCommands.TARGETAREA_ATTNAME,inputCommands.OPT_TARGETAREA_ATTVALUE,inputCommands.TARGETAREA_ATTVALUE]),
      // Command-x          
      ui.Panel([ui.Label('3. Select dataset(s):',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('horizontal')),
      // ui.Panel([ui.Label('Note: Selecting many datasets on an analysis increases computation time.' +
      //                   ' Apply one dataset at a time of analysis for efficient computation.',
      //                   {fontSize:'10px',color:'Gray',margin:'0px 8px'})], ui.Panel.Layout.flow('vertical')),
      // ui.Panel([inputCommands.COUNT_S2,inputCommands.COUNT_L8,inputCommands.COUNT_L7, inputCommands.COUNT_L5,
      //           inputCommands.COUNT_S1ASC, inputCommands.COUNT_S1DSC], ui.Panel.Layout.flow('vertical')), 
      ui.Panel([inputCommands.COUNT_S2,inputCommands.INFO_S2,
                inputCommands.COUNT_L8,inputCommands.INFO_L8,
                inputCommands.COUNT_L7,inputCommands.INFO_L7,
                inputCommands.COUNT_L5,inputCommands.INFO_L5],
                ui.Panel.Layout.flow('vertical')),       
      // Command-x          
      ui.Panel([ui.Label('4. Options to apply cloud masking method and set percent-area threshold',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('vertical')),
      // ui.Panel([ui.Label('Note: The cloud masking method is only applied to optical datasets. ' +
      //                   ' Percent-area is the ratio between the generated cloud-free image\'s' +
      //                   ' extent and the given target area\'s extent, ranging between 0-100%.' +
      //                   ' An 80% percent-area threshold means that each derived cloud-free' +
      //                   ' image will cover not less than 80% of the target area\'s extent.',
      //                   {fontSize:'10px',color:'Gray',margin:'0px 8px'})], ui.Panel.Layout.flow('vertical')),                        
      ui.Panel([inputCommands.OPT_CLOUDMASK,inputCommands.PERCENTAREA_THRES]),       
      // Command-x
      ui.Panel([ui.Label('5. Click the following button to start analysis',{fontSize:'12px',fontWeight:'bold'})], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([inputCommands.START_BUTTON]),       
    ]
});
mainPanel.add(mainPanel_inputCommands);
// [E-5] Define other panels.
var mainPanel_text = ui.Panel();
// var mainPanel_chart = ui.Panel();
mainPanel.add(mainPanel_text);
// mainPanel.add(mainPanel_chart);