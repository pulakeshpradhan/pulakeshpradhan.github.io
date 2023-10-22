//*****************************************************************************************************************************
//******************************************** globalTreeHmapping *************************************************************
//*****************************************************************************************************************************
// Draw AOI 
function drawCustomAoi(){
   while (Map.drawingTools().layers().length() > 0) {
    Map.drawingTools().layers().remove(Map.drawingTools().layers().get(0));
   }
   function f() {
   // Map.onClick();
   // turns drawing off.
   // Map.drawingTools().setShape(null);
   }
 Map.drawingTools().onDraw(ui.util.debounce(f, 500));
 Map.drawingTools().setShape('polygon');
 Map.drawingTools().setLinked(true);
 Map.drawingTools().draw();
}
// load inputs
function loadInputs(){
var u_chooseAoi                  = chooseAoiCheckSelector          .getValue();
var u_aoiImage                   = aoiTexbox                       .getValue();
var u_aoiPoint                   = aoiPointTexbox                  .getValue();// *aoi_Point
var u_aoiShp                     = aoiShpTexbox                    .getValue();// *aoi_shp          
var u_choose_mask                = selectmask                      .getValue();// *forest mask
var u_choose_model               = selectmodel                     .getValue();
var u_year                       = YearTexbox                      .getValue();
var u_start_date                 = startDateTexbox                 .getValue();
var u_end_date                   = endDateTexbox                   .getValue();
var u_cloud_threshold            = cloudThresholdSlider            .getValue();
var u_graphs                     = TypePercCheckbox3               .getValue();// *graphs
var u_TypePerc                   = TypePercCheckbox                .getValue();// *Download
var u_quantile                   = quantileSlider                  .getValue();
var u_scale                      = scaleSlider                     .getValue();
var u_outputImgName              = u_outputImgNameTexbox           .getValue();// *Output file name
var u_outputCSVName              = u_outputCSVNameTexbox           .getValue();// *Output csv file name
var u_DownloadOutput             = u_DownloadOutputCheckbox        .getValue();// *Download
var u_DownloadOutputCSV          = u_DownloadOutputCSVCheckbox     .getValue();// *Download
var u_outputFolder               = u_outputFolderTexbox            .getValue();// *Output map folder
var u_outputCSVFolder            = u_outputCSVFolderTexbox         .getValue();// *Output CSV folder
// adjust inputs
var u_aoi;
if (u_chooseAoi == 'Upload'){
  u_aoiImage = ee.FeatureCollection(u_aoiImage);
  u_aoi = u_aoiImage.geometry().bounds();  // added bounds
}else if (u_chooseAoi == 'Draw'){
  u_aoi = Map.drawingTools().layers().get(0).getEeObject();
}else if (u_chooseAoi == 'Point'){
  u_aoi = ee.FeatureCollection(u_aoiPoint);
 } else if (u_chooseAoi == 'Boundary'){
  u_aoi = ee.FeatureCollection(u_aoiShp);}
u_choose_mask           = String(u_choose_mask          ); //*forest mask
u_choose_model          = String(u_choose_model         );
u_year                  = Number(u_year                 );
u_start_date            = String(u_start_date           );
u_end_date              = String(u_end_date             );
u_cloud_threshold       = Number(u_cloud_threshold      );
u_quantile              = "rh"+u_quantile               ;
u_outputImgName         = String(u_outputImgName        ); //*
u_outputCSVName         = String(u_outputCSVName        ); //*
u_outputFolder          = String(u_outputFolder         ); //*
u_outputCSVFolder       = String(u_outputCSVFolder      ); //*
//file_name = ee.String("my_file_").cat(date_string);
//u_quantile         = String("rh", u_quantile   );
u_scale                 = Number(u_scale                );
  return { 
          u_chooseAoi                : u_chooseAoi,        //* aoi path
          u_aoiImage                 : u_aoiImage,         //* template image
          u_aoiPoint                 : u_aoiPoint,         //* template point 
          u_aoi                      : u_aoi,              //* general aoi
          u_choose_mask              : u_choose_mask,      //*
          u_choose_model             : u_choose_model,
          u_TypePerc                 : u_TypePerc,    // (***)
          u_year                     : u_year,
          u_start_date               : u_start_date,
          u_end_date                 : u_end_date,
          u_graphs                   : u_graphs,    //* include graphs
          u_cloud_threshold          : u_cloud_threshold,
          u_quantile                 : u_quantile,
          u_scale                    : u_scale,
          u_outputImgName            : u_outputImgName,     //*Output img file name
          u_outputCSVName            : u_outputCSVName,     //*Output csv file name
          u_DownloadOutput           : u_DownloadOutput,    //*
          u_DownloadOutputCSV        : u_DownloadOutputCSV, //* 
          u_outputFolder             : u_outputFolder,      //*
          u_outputCSVFolder          : u_outputCSVFolder 
          };
}
// InputShapefile = function(shapefile)
// Run the model
function mapheigts(){
    var Inputs = loadInputs();
	var library = require("users/hjosullivan/GEE-summer-school:TH_app");
    var library4 = require("users/hjosullivan/GEE-summer-school:4_Plots");
    var library5 = require("users/hjosullivan/GEE-summer-school:5_ImportExport"); 
if(Inputs.u_chooseAoi == "Draw"){
  if(Inputs.u_TypePerc){
     var tree_heights = library.globalTreeHmapping(Inputs.u_aoi, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'singleGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights);//* variable important function
     }else{0}}else{//* general function
    tree_heights = library.globalTreeHmapping(Inputs.u_aoi, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'meanGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights);//* variable important function
     }else{0}}
     Map.centerObject(Inputs.u_aoi, 12);
  if(Inputs.u_DownloadOutput){
      library5.DownloadImg(tree_heights,Inputs.u_outputImgName,Inputs.u_outputFolder,Inputs.u_aoi,Inputs.u_scale);}
      } 
else if(Inputs.u_chooseAoi == "Point"){
    var outputAOI = library5.InputShapefile(Inputs.u_aoi,'Point');
    if(Inputs.u_TypePerc){
    var tree_heights_BB  = library.globalTreeHmapping(outputAOI, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'singleGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights_BB,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights_BB);//* variable important function
     }else{0}}else{//* general function
    tree_heights_BB  = library.globalTreeHmapping(outputAOI, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'meanGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights_BB,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights_BB);//* variable important function
     }else{0}} 
     Map.centerObject(outputAOI, 12);
  if(Inputs.u_DownloadOutputCSV){
    library5.DownloadCSV(tree_heights_BB,Inputs.u_outputCSVName,Inputs.u_outputCSVFolder,Inputs.u_aoiPoint,Inputs.u_scale);}
  if(Inputs.u_DownloadOutput){
      library5.DownloadImg(tree_heights_BB,Inputs.u_outputImgName,Inputs.u_outputFolder,outputAOI,Inputs.u_scale);}
      }
else /*if(Inputs.u_chooseAoi == 'Boundary')*/{
   if(Inputs.u_TypePerc){ 
     var tree_heights_CC  = library.globalTreeHmapping(Inputs.u_aoi, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'singleGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights_CC,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights_CC);//* variable important function
     }else{0}
     }else{//* general function
     tree_heights_CC  = library.globalTreeHmapping(Inputs.u_aoi, Inputs.u_year, Inputs.u_start_date, 
     Inputs.u_end_date, Inputs.u_cloud_threshold, Inputs.u_quantile,  Inputs.u_scale, 
     Inputs.u_choose_model,Inputs.u_choose_mask,'meanGEDI');
     if(Inputs.u_graphs){       
     library4.SCPLOT(tree_heights_CC,Inputs.u_scale,Inputs.u_aoi);//* scatter plot function
     library4.VARIMP(tree_heights_CC);//* variable important function
     }else{0}    
     }
     Map.centerObject(Inputs.u_aoi, 12);
  if(Inputs.u_DownloadOutput){
      library5.DownloadImg(tree_heights_CC,Inputs.u_outputImgName,Inputs.u_outputFolder,Inputs.u_aoi,Inputs.u_scale);}
      }    
    }
function removeLayers(){
   //while (Map.drawingTools().layers().length() > 0) {
   //Map.drawingTools().layers().remove(Map.drawingTools().layers().get(0));
   //} 
  Map.clear();
  var widgets = ui.root.widgets();
  if (widgets.length()>3){
  ui.root.remove(ui.root.widgets().get(3));
  }
}
// drawn study area
function drawNewStdyArea(){
  if(Map.drawingTools().layers().length() > 0){
    drawCustomAoi()
    }
  }
// UI for Tree Heights map
// Add title
var Title = ui.Label({value: "GEDI Global Tree Height Mapper", style:{
backgroundColor : "#424457", color: "white", fontSize: "18px", fontFamily: "monospace"}});
// Add subtitle 
var Subtitle = ui.Label({value: "Input/Output options", style:{
backgroundColor : "#424457", color: "white", fontFamily: "monospace"}});
// Add  Point AOI
// Path to file textbox
var aoiTexbox = ui.Textbox({
  placeholder: 'Area of interest (image)',
  value: 'users/spatialanalysis/AM',
  style: {shown: false, width: '250px',color: 'green',border: '1px solid darkgray'}
});
// Add  Point AOI
// Path to file textbox
var aoiPointTexbox = ui.Textbox({
  placeholder: 'Area of interest (Point)',
  value: 'users/cesaralvites/Points_pen',
  style: {shown: false, width: '250px',color: 'green',border: '1px solid darkgray'}
});
// Add  Point AOI
// Path to file textbox
var aoiShpTexbox = ui.Textbox({
  placeholder: 'Area of interest (shp)',
  value: 'users/cesaralvites/Pennataro',
  style: {shown: false, width: '250px',color: 'green',border: '1px solid darkgray'}
});
// select options for AOI  
var chooseAoiCheckSelector = ui.Select({
 items: [
   {label: 'Draw study area'  , value: "Draw"    },
   {label: 'Upload template ' , value: "Upload"  },
   {label: 'Boundary shp '    , value: "Boundary"},
   {label: 'Points shp '      , value: "Point"   }
   ],
style: {color: 'green',border: '1px solid darkgray'}
   }).setValue("Upload");
// export tree height map 
var u_DownloadOutputCheckbox = ui.Checkbox({
  label:'Download Tree Height Map', value:false, style:{shown: true,
  backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
// export tree height csv 
var u_DownloadOutputCSVCheckbox = ui.Checkbox({
  label:'Download Tree Height CSV', value:false, style:{shown: true,
  backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
 // Include the graphs 
var u_GraphsCheckbox = ui.Checkbox({
  label:'View the graphs', value:false, style:{shown: true,
  backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}}); 
 chooseAoiCheckSelector.onChange(function(aoiOption){   
                         if(aoiOption == "Upload"){
                           aoiTexbox.style().set('shown', true);
                           aoiTexbox.setValue('users/spatialanalysis/AM');
                           u_DownloadOutputCheckbox.style().set('shown', true); 
                           u_DownloadOutputCheckbox.setValue(false); //*
                           runDrawNewStdyArea.style().set('shown', true);
                           u_DownloadOutputCSVCheckbox.style().set('shown', false); 
                           u_DownloadOutputCSVCheckbox.setValue(false); 
                           Map.drawingTools().setShape(null);
                         }
                         if(aoiOption == "Draw"){
                           aoiTexbox.style().set('shown', false);
                           aoiTexbox.setValue('Draw');
                           u_DownloadOutputCheckbox.style().set('shown', true); 
                           u_DownloadOutputCheckbox.style().set('shown', true); 
                           u_DownloadOutputCheckbox.setValue(false); //*
                           u_DownloadOutputCSVCheckbox.style().set('shown', false); 
                           u_DownloadOutputCSVCheckbox.setValue(false); 
                            //aoiTexbox.setValue('Draw');
                           runDrawNewStdyArea.style().set('shown', true);
                           Map.drawingTools().setShape(null);
                           drawCustomAoi();
                         }
                         if(aoiOption == "Point"){
                           //aoiTexbox.style().set('shown', false);
                           aoiPointTexbox.style().set('shown', true);
                           aoiPointTexbox.setValue('users/cesaralvites/Points_pen');
                           u_DownloadOutputCheckbox.style().set('shown', true); 
                           u_DownloadOutputCheckbox.style().set('shown', true); 
                           u_DownloadOutputCheckbox.setValue(false); 
                           u_DownloadOutputCSVCheckbox.style().set('shown', true); 
                           u_DownloadOutputCSVCheckbox.setValue(false); 
                           //aoiPointTexbox.setValue('Point');
                           runDrawNewStdyArea.style().set('shown', true);
                           Map.drawingTools().setShape(null);
                           }
                         if(aoiOption == "Boundary"){
                           //aoiTexbox.style().set('shown', false);
                           aoiShpTexbox.style().set('shown', true);
                           aoiShpTexbox.setValue('users/cesaralvites/Pennataro');
                           u_GraphsCheckbox.style().set('shown', true); //*
                           u_GraphsCheckbox.setValue(false); //*
                           u_DownloadOutputCheckbox.style().set('shown', true); //*
                           u_DownloadOutputCheckbox.setValue(false); //*
                           u_DownloadOutputCSVCheckbox.style().set('shown', false); 
                           u_DownloadOutputCSVCheckbox.setValue(false); 
                           //aoiPointTexbox.setValue('Point');
                           runDrawNewStdyArea.style().set('shown', true);
                           Map.drawingTools().setShape(null);
                           }
                           })
// Add year
var YearTexbox = ui.Select({
  items: [
                  {label: '2017',    value: "2017"},
                  {label: '2018',    value: "2018"},
                  {label: '2019',    value: "2019"},
                  {label: '2020',    value: "2020"},
                  {label: '2021',    value: "2021"},
                  {label: '2022',    value: "2022"}
                  ],
                  style: {color: 'green',border: '1px solid darkgray'}
                  }).setValue("2021");
// Add forest/non-forest mask 
var selectmask = ui.Select({
items: [
     {label: 'Dynamic world'     ,   value: "DW"  },
     {label: 'Forest/Non-Forest' ,   value: "FNF" },
     {label: 'Non-Forest Mask'   ,   value: "none"}
     ],
style: {color: 'green',border: '1px solid darkgray'}
     }).setValue("none");
// Add model selection
var selectmodel = ui.Select({
items: [
     {label: 'Random Forest'     ,   value: "RF"},
     {label: 'CART'              ,   value: "SC"},
     {label: 'Gradient Boosting' ,   value: "GB"}
     ],
style: {color: 'green',border: '1px solid darkgray'}
      }).setValue("GB");
// Add start and end date     
var startDateTexbox = ui.Textbox({
placeholder: 'startDate (e.g. 05-20)',
value: '07-01',
style: {width: '155px',color: 'green',border: '1px solid darkgray'}});
var endDateTexbox = ui.Textbox({
placeholder: 'endDate (e.g. 09-20)',
value: '08-31',
style: {width: '155px',color: 'green',border: '1px solid darkgray'}});
// Download maps
var u_outputFolderTexbox = ui.Textbox({                                
  placeholder: 'Output img folder name  (e.g. out)',                              
  value: 'ee_demos',
  style: {width: '155px', shown: false}});
var u_outputImgNameTexbox = ui.Textbox({
  placeholder: 'Output img name  (e.g. out)',
  value: 'TH',
  style: {width: '155px', shown: false}});
  // Download CSV
var u_outputCSVFolderTexbox = ui.Textbox({                                
  placeholder: 'Output csv folder name (e.g. out)',                              
  value: 'ee_demos',
  style: {width: '155px', shown: false}});
var u_outputCSVNameTexbox = ui.Textbox({
  placeholder: 'Output csv name (e.g. out)',
  value: 'CSV',
  style: {width: '155px', shown: false}});
//// Folder label maps 
 var outputFolderLabel = ui.Label({value: "Drive Img Folder", style:{
   shown: false, backgroundColor : "#424457", color: "white"}});
 var outputImgNameLabel = ui.Label({value: "File Img Name", style:{
  shown: false,backgroundColor : "#424457", color: "white"}});
// Folder label csv  
 var outputCSVFolderLabel = ui.Label({value: "Drive CSV Folder", style:{
   shown: false, backgroundColor : "#424457", color: "white"}});
var outputCSVNameLabel = ui.Label({value: "File CSV Name", style:{
  shown: false,backgroundColor : "#424457", color: "white"}});
// Download maps
 u_DownloadOutputCheckbox.onChange(function(checked){  
   if(checked){
     u_outputImgNameTexbox.style().set('shown', true);
     outputImgNameLabel.style().set('shown', true);
     //
     u_outputFolderTexbox.style().set('shown', true);
     outputFolderLabel.style().set('shown', true);
   }else{
     u_outputImgNameTexbox.style().set('shown', false);
     outputImgNameLabel.style().set('shown', false);
     //
     u_outputFolderTexbox.style().set('shown', false);                    
    outputFolderLabel.style().set('shown', false);                       
   }
 });
 // Download CSV
 u_DownloadOutputCSVCheckbox.onChange(function(checked){  
   if(checked){
     u_outputCSVNameTexbox.style().set('shown', true);
     outputCSVNameLabel.style().set('shown', true);
     //
     u_outputCSVFolderTexbox.style().set('shown', true);
     outputCSVFolderLabel.style().set('shown', true);
   }else{
     u_outputCSVNameTexbox.style().set('shown', false);
     outputCSVNameLabel.style().set('shown', false);
     //
     u_outputCSVFolderTexbox.style().set('shown', false);                    
    outputCSVFolderLabel.style().set('shown', false);                       
   }
 });
 // Define aesthetics
var cloudThresholdSlider    =  ui.Slider({min: 0, max: 100, value:70, step: 1,
                            style: { width: '165px', backgroundColor : "#424457", color: "white"}});
var cloudThresholdLabel     =  ui.Label({value: "Percentage of cloud cover", 
                            style:{backgroundColor : "#424457", color: "white", shown: true, fontFamily: "monospace"}});
var quantileSlider          =  ui.Slider({min: 0, max: 99, value:20, step: 1,
                               style: { width: '165px', backgroundColor : "#424457", color: "white",shown: false}});
var quantileLabel           =  ui.Label({value: "Relative height quantile (m)", 
                              style:{backgroundColor : "#424457", color: "white", shown: false, fontFamily: "monospace"}});
var scaleSlider             =  ui.Slider({min: 0, max: 1000, step: 5, value:100,
                              style: { width: '195px', backgroundColor : "#424457", color: "white", shown: true}});
var scaleLabel              =  ui.Label({value: "Define scale (m)", 
                            style:{backgroundColor : "#424457", color: "white", shown: true, fontFamily: "monospace"}});
// Check boxes
var TypePercCheckbox = ui.Checkbox({label: 'Individual relative height percentile', value: false, style:{shown: true,
  backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
TypePercCheckbox.onChange(function(checked){   
                         if(checked){
                           quantileSlider.style().set('shown', true);
                           quantileSlider.setValue(20);
                           quantileLabel.style().set('shown', true);
                           }else{
                           quantileSlider.style().set('shown', false);
                           quantileSlider.setValue(20);
                           quantileLabel.style().set('shown', false);
                         }
                       });
var TypePercCheckbox2 = ui.Checkbox({label: 'Average relative height percentile',value: false, style:{shown: true,
backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
//check boxes 2
var TypePercCheckbox3 = ui.Checkbox({label: 'Plot graphs of validation',value: false, style:{shown: true,
backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
// Check boxes onChange N1
var GeneralTypePercCheckbox = ui.Checkbox({label: 'Choose percentiles', value: false, style:{shown: true,
  backgroundColor : "#424457", color: "white", fontSize: "14px", fontFamily: "monospace"}});
GeneralTypePercCheckbox.onChange(function(checked){   
                         if(checked){
                           secondpanel.style().set('shown', true); // make advanced options visible
                         }
                         else {
                           secondpanel.style().set('shown', false);
                         }
                       });
// Advanced options panel
 var secondpanel = ui.Panel({style: {width: '100%', backgroundColor: "#424457",
 textAlign: "center", whiteSpace: "nowrap",shown: false }});
// global  panel
var panel = ui.Panel({style: {width: '30%', backgroundColor: "#424457", 
border: '1px solid black', textAlign: "center", whiteSpace: "nowrap", shown: true}});
// Run boxes 
var runTreeHeights = ui.Button({
      label: 'Run',style: {color: 'green',border: '1px solid darkgray'}});
      runTreeHeights.onClick(mapheigts);
var removeLayersButton = ui.Button({
      label: 'Reset',style: {color: 'e79236',border: '1px solid darkgray'}});
removeLayersButton.onClick(removeLayers);
var runDrawNewStdyArea = ui.Button({
      label: 'Reset study area',
       onClick: drawNewStdyArea,
      style: {shown: false,color: 'e79236',border: '1px solid darkgray'}
 }); 
// Add documentation label
var documentationLabel = ui.Label({value: "Link to Github tree height app", style:{
  backgroundColor : "#424457", fontSize: "15px", color: "white", shown: true, fontFamily: "monospace"}, targetUrl: "https://github.com/hjosullivan/tree-height-mapper"});
// Add boxes
panel.add(Title);
panel.add(documentationLabel);
panel.add(Subtitle);
panel.add(chooseAoiCheckSelector);
panel.add(aoiTexbox);
panel.add(aoiPointTexbox);
panel.add(aoiShpTexbox);
panel.add(runDrawNewStdyArea); 
panel.add(selectmask); 
panel.add(selectmodel);
panel.add(YearTexbox);
panel.add(startDateTexbox);
panel.add(endDateTexbox);
panel.add(cloudThresholdLabel);
panel.add(cloudThresholdSlider);
panel.add(TypePercCheckbox3);
//
secondpanel.add(TypePercCheckbox);
secondpanel.add(quantileLabel);
secondpanel.add(quantileSlider);
secondpanel.add(TypePercCheckbox2);
panel.add(GeneralTypePercCheckbox);
panel.add(secondpanel);
//
panel.add(scaleLabel);
panel.add(scaleSlider);
panel.add(u_DownloadOutputCheckbox);
panel.add(outputFolderLabel);
panel.add(u_outputFolderTexbox);
panel.add(outputImgNameLabel);
panel.add(u_outputImgNameTexbox);
panel.add(u_DownloadOutputCSVCheckbox);
panel.add(outputCSVFolderLabel);
panel.add(u_outputCSVFolderTexbox);
panel.add(outputCSVNameLabel);
panel.add(u_outputCSVNameTexbox);
//
panel.add(runTreeHeights);
panel.add(removeLayersButton);
{
ui.root.add(panel);
}
// end