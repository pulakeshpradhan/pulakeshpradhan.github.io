var TC = {"opacity":1,"bands":["brightness","greenness","wetness"],"min":-2530.7958984375,"max":3166.5615234375,"gamma":1},
    forestviz = {"opacity":0.53,"bands":["treecover2000"],"palette":["d2cfb3","2c8737"]},
    tcvis = {"min":0,"max":100,"palette":"000000, 00ff00"},
    AreaInterest = /* color: #9851ff */ee.Geometry.Polygon(
        [[[98.580322265625, 12.034546267489153],
          [98.800048828125, 11.99156334952038],
          [99.580078125, 12.120491460699801],
          [99.66796875, 12.099007749948436],
          [99.5361328125, 12.721322552007855],
          [99.31640625, 12.97839084369947],
          [99.33837890625, 13.384870617442736],
          [99.16259765625, 14.217056570405033],
          [98.624267578125, 14.748914608009978],
          [97.75634765625, 14.600123219597961],
          [97.84423828125, 14.302239227769407],
          [98.26171875, 13.662594819602981],
          [98.5693359375, 12.764185500178955],
          [98.624267578125, 12.045290923942895]]]),
    deforestation = /* color: #0b4a8b */ee.Geometry.Point([99.04912948608398, 13.649582590571338]),
    brightviz = {"opacity":1,"bands":["brightness"],"min":-545.49951171875,"max":671.5101318359375,"gamma":1},
    wetviz = {"opacity":1,"bands":["wetness"],"min":-569.5315551757812,"max":286.56829833984375,"gamma":1},
    greenviz = {"opacity":1,"bands":["greenness"],"min":-1322.8948364257812,"max":607.6480407714844,"gamma":1},
    defviz = {"opacity":1,"bands":["greenness"],"palette":["ff300f"]},
    BT_CF = ee.FeatureCollection("users/WWFDE/Myanmar/CF_Banchaung_Thayetchaung"),
    BC_river = ee.FeatureCollection("users/WWFDE/Myanmar/Banchaung_River"),
    KNU_pa = ee.FeatureCollection("users/WWFDE/Myanmar/KNU_pa"),
    SEZroad = ee.FeatureCollection("users/WWFDE/Myanmar/SEZroad"),
    TNP = ee.FeatureCollection("users/WWFDE/Myanmar/TNP"),
    Kweekoh = ee.FeatureCollection("users/WWFDE/Myanmar/Kweekoh"),
    Kyp_CF = ee.FeatureCollection("users/WWFDE/Myanmar/Kyeikpilan_CF");
///////////////////////////////////////////
//GUI PANEL
Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '450px',
  position: 'bottom-right',
  border : '1px solid #000000',
});
///////////////////////////////
var instructions =ui.Label('Instructions',{fontWeight: 'bold'});
var instructions_text=ui.Label('First unclick the area of interest under Geometry Imports. Then select your base and monitoring periods: the monitoring period is when you want to detect deforestation, the base period is either a previous time or can be over years.',{});
var instructions_text2=ui.Label('Next run the process click the center button. Inspect the greenness change layers and any known areas of deforestation. Use the inspector tab to select the appropriate threshold for deforestation, enter the value using the slider and run again.',{});
var instructions_text3=ui.Label('Deforestation detection is shown in red in the "Detected Deforestation" layer. To export the layer as a geoTIFF to your Google Drive run the process in the Tasks tab. To amend the area of interest use the polygon editing tools in the map window.',{});
var Subheader1 = ui.Label('Select Date parameters:',{fontWeight: 'bold'});
var label_Start_base_select = ui.Label('Start of base period to compare to:');
var Start_base_select = ui.Textbox({
  value: '2017-09-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_base = text
  }
});
var label_End_base_select = ui.Label('End of base period (select 2-3 months for clear image in rainy season)');
var End_base_select = ui.Textbox({
  value: '2017-12-31',
  style: {width : '90px'},
  onChange: function(text) {
    var End_base = text
  }
})
var label_Start_second_select = ui.Label('Start of monitoring period (when you want to detect change):');
var Start_second_select = ui.Textbox({
  value: '2018-02-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_second_select = ui.Label('End of monitoring period:');
var End_second_select = ui.Textbox({
  value: '2018-05-31',
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
var Subheader2 = ui.Label('Select Greenness Change Threshold:',{fontWeight: 'bold'});
var label_threshold_select = ui.Label('select value based on greenness change layer');
var threshold_select = ui.Slider({
  min: -1000,
  max: 1, 
  value: -600, 
  step: 1,
  onChange: function(value) {
    var threshold_value = value
  },
  style: {width: '380px'}
});
panel.add(Subheader1);
panel.add(label_Start_base_select);
panel.add(Start_base_select);
panel.add(label_End_base_select);
panel.add(End_base_select);
panel.add(label_Start_second_select);
panel.add(Start_second_select);
panel.add(label_End_second_select);
panel.add(End_second_select);
panel.add(Subheader2);
panel.add(label_threshold_select);
panel.add(threshold_select);
panel.add(instructions);
panel.add(instructions_text);
panel.add(instructions_text2);
panel.add(instructions_text3);
ui.root.add(panel);
var button = ui.Button('hey Google - Run this fantastic deforestation detection process!');
button.style().set({
  position: 'bottom-center',
  border : '1px solid #000000',
});
Map.add(button);
//functions
button.onClick(function() {
    Map.clear();
    Map.add(button);
    var baseStartDate = Start_base_select.getValue();
    var baseEndDate = End_base_select.getValue();
    var startDate = Start_second_select.getValue();
    var endDate = End_second_select.getValue();
    var threshold = threshold_select.getValue();
//*********************************************************************************************
print('Baseline Start and end dates:',baseStartDate,baseEndDate);
print('Monitoring Start and end dates:',startDate,endDate);
// --------------------------------------------------------- -----------------------------------------------
//  ----------  Country OPTIONS 
// -------------------------------------
var countryname = 'Myanmar';
// --------------------------------------------------------------------------------------------------------
//  ----------  Classify a box of DELTAxy OPTIONS 
// -------------------------------------
var use_centerpoint=1;        // set to 1 to classify a box of DELTAxy; Location= Map.getCenter() 
//Map.setCenter(106.26, 15.835) // Ketta (Congo)  --> change or comment to use a dynamic map center  
var DELTAx=1;               // Long size   
var DELTAy=2;               // Lat  size 
var max_cloud_percent=99;    // remove cloudy images but i would suggest using any acquisition
// --------------------------------------------------------------------------------------------------------
//  ----------  EXPORT OPTIONS 
// --------------------------------------------------------------------------------------------------------
//var Google_drive_root_folder= 'GEE_classification'
var export_map=0;    // Export PBS classification to your GDrive
var export_tiles=4;  // Export PBS classification in pieces if too big 2 = 4 tiles; 3 = 9 tiles 
//////////////////////////////////////////////////////////////
//1st step select country
//////////////////////////////////////////////////////////////
var country = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw')
                  .filterMetadata('Country', 'Contains',countryname );
var bbox=(country.geometry().bounds().coordinates().getInfo());
var AOI = AreaInterest              
//var AOI=ee.Geometry.Polygon([[
//                bbox[0][0],bbox[0][1],bbox[0][2],bbox[0][3],bbox[0][4]
//                ]]);
// Select the country boundary 
var filteredCountries = ee.Filter.inList('name', [countryname]);
// Filter the countries fusion table by country
var roi = country.filter(filteredCountries);
Map.centerObject(AOI,11)
 //////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////
 /////////////
// Sentinel 2 using the PBS CLoud Mask
///////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var CX=Map.getCenter().coordinates().getInfo()[0];
var CY=Map.getCenter().coordinates().getInfo()[1];   
//---------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// ----------- EXTRA SETTING 
// --------------------------------------------------------------------------------------------------------
var debug_mode = 0;  // add all layers to the OUT PBS classification to better understand class proportions --> Pixels info console
var EVG_domain = 0;   // set to 1 if on tropics / dense evergreen -> recodes brigt forest to dark (haze contamination) 
var clouds_morpho_filter = 0;  // enable cloud / shadow buffering     --- too be better implemented, time consuming 
var clouds_filter_size = 20;  // add buffer in meters  aroud clouds  --- too be better implemented
var shadow_filter_size = 20;  // add buffer in meters aroud shadows  --- too be better implemented
// --------------------------------------------------------------------------------------------------------
         print("Running classification");
            //--------------------------------------------------------------------------------------
          if (use_centerpoint === 0){
              var country = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw')
                  .filterMetadata('Country', 'Contains',countryname );
              //Map.addLayer(country); 
              var bbox=(country.geometry().bounds().coordinates().getInfo());
              var AOI=ee.Geometry.Polygon([[
                bbox[0][0],bbox[0][1],bbox[0][2],bbox[0][3],bbox[0][4]
                ]]);
          }    
          else {
             countryname="MyMap";
             var AOI =ee.Geometry.Polygon([[
                [CX-DELTAx, CY-DELTAy],[CX+DELTAx,CY-DELTAy],[CX+DELTAx,CY+DELTAy],[CX+DELTAx,CY+DELTAy],[CX-DELTAx, CY+DELTAy]
                ]]);
                Map.addLayer(AOI, {}, 'Area of Interest', false);
          }
          print(AOI);
//base dataset
                    var collection_mon = ee.ImageCollection('COPERNICUS/S2')
                          .filterDate(startDate,endDate)
                        //.filter(ee.Filter.calendarRange(startJulian,endJulian))
                         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",max_cloud_percent)
                         .filterBounds(country)
                         //.filterMetadata('system:asset_size', 'greater_than', 900000000)
                         .map(function(image){return PINO1(image.clip(AOI),['B2','B3','B4','B8','B11','B12','QA60','B1','B9'])});   
          print(collection_mon);
          var collection_base = ee.ImageCollection('COPERNICUS/S2').filterDate(baseStartDate,baseEndDate)
//                          .filter(ee.Filter.calendarRange(startJulian,endJulian))
                         .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",max_cloud_percent)
                         .filterBounds(country)
                         //.filterMetadata('system:asset_size', 'greater_than', 900000000)
                         .map(function(image){return PINO1(image.clip(AOI),['B2','B3','B4','B8','B11','B12','QA60','B1','B9'])});   
          print(collection_base);         
          Map.addLayer(collection_base.median(), {bands:['B11','B8','B4'], min:0, max:3000}, 'S2 composite baseline');
          var composite_base = collection_base.median()
          Map.addLayer(collection_mon.median(), {bands:['B11','B8','B4'], min:0, max:3000}, 'S2 composite monitoring');
          var composite_mon = collection_mon.median()
function rgb(r,g,b){
          var bin = r << 16 | g << 8 | b;
          return (function(h){
          return new Array(7-h.length).join("0")+h
          })(bin.toString(16).toUpperCase())
}
//load forest mask from Hansen
var tree = 30
var gfcImage = ee.Image('UMD/hansen/global_forest_change_2017_v1_5');
var treeCover = gfcImage.select('treecover2000');
var lossyear =gfcImage.select('lossyear');
var gain = gfcImage.select('gain');
// using threshold for treecover
var forest2000 = treeCover.gte(tree).and(treeCover.lte(100))
var gainloss = lossyear.gte(1).and(gain.gte(1))
var lossyearforest = lossyear.gte(1).and(forest2000.eq(1)).and(gainloss.neq(1))
var gainmap = gain.eq(1).and(gainloss.neq(1))
var lossforest = lossyearforest.gte(1).and(lossyearforest.lte(17)).and(gainloss.neq(1));
// create an image like the forest 2000 image, except with zeros
// where the lossforest image has the value 1.
var treecover2017 = treeCover.where(lossforest.eq(1), 0).clip(AOI);
//var forest2008 = roiforest2000.where(roilossforest00_07.eq(1),0);
var forest2017 = forest2000.where(lossforest.eq(1),0).clip(AOI);
Map.addLayer(treecover2017, tcvis, 'Treecover in 2017', false);
Map.addLayer(forest2017, forestviz, 'Forest in 2017', false);
/////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------------------------------------
//-------------------compute tasseled cap -----------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
// Compute the tasseled cap transformations for S2 composite image.
var tcbands = ["brightness", "greenness", "wetness"]
var coeff =ee.Array([
  [0.0822, 0.1360, 0.2611, 0.3895,0.3882,0.1366],
  [-0.1128, -0.1680, -0.3480, 0.3165, -0.4578, -0.4064],
  [0.1363, 0.2802, 0.3072, -0.0807, -0.4064, -0.5602],
]);
var mon_select = composite_mon.select(["B2","B3","B4","B8","B11","B12"])
var base_select = composite_base.select(["B2","B3","B4","B8","B11","B12"])
// Make an Array Image, with a 1-D Array per pixel.
var mon_arrayImage1D = mon_select.toArray();
var base_arrayImage1D = base_select.toArray();
// Make an Array Image with a 2-D Array per pixel, 6x1.
var mon_arrayImage2D = mon_arrayImage1D.toArray(1);
var base_arrayImage2D = base_arrayImage1D.toArray(1);
// Do a matrix multiplication: 6x6 times 6x1.
var TC_mon = ee.Image(coeff)
  .matrixMultiply(mon_arrayImage2D)
  // Get rid of the extra dimensions.
  .arrayProject([0])
  .arrayFlatten(
    [['brightness', 'greenness', 'wetness']]);
var TC_base = ee.Image(coeff)
  .matrixMultiply(base_arrayImage2D)
  // Get rid of the extra dimensions.
  .arrayProject([0])
  .arrayFlatten(
    [['brightness', 'greenness', 'wetness']]);
Map.addLayer(TC_base, TC, 'TC components - baseline',  false);
Map.addLayer(TC_mon, TC, 'TC components - monitoring', false);
////////////////////////////////////////////////////////////////////////////////////////////
//add vector layers
///////////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(BT_CF, {color:'333a20'}, 'Banchaung Thayetchaung CF')
Map.addLayer(TNP, {color:'6a7252'}, 'TNP')
Map.addLayer(Kweekoh, {color:'37a6b2'}, 'Kweekoh')
Map.addLayer(KNU_pa, {color:'5d2fc6'}, 'KNU PA')
Map.addLayer(SEZroad, {color:'1c191b'}, 'SEZ road')
Map.addLayer(Kyp_CF, {color:'b29736'}, 'Kyeikpilan CF')
Map.addLayer(BC_river, {color:'74a0db'}, 'Banchaung River')
// Define a palette for the distinct classes.
var Palette = [
 '74a0db', // BC River
  '333a20', // Banchaung Thayetchaung CF
  '6a7252', // TNP
  '37a6b2', // Kweekoh
  '5d2fc6', // KNU PA
  '1c191b', // SEZ Road
  'b29736' // Kyp CF
];
// Adding a legend, derived from https://code.earthengine.google.com/8562c7194aaff1a899e92e293fd10ef8
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 4px 0'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
var labels = ['BC River','Banchaung Thayetchaung CF','TNP', 'Kweekoh','KNU PA','SEZ Road','Kyp CF'];
add_legend('Community Forests and Intervention Areas', labels, Palette);
/////////////////////////////////////////////////////////////////////////////////////////////
//subtractions
////////////////////////////////////////////////////////////////////////////////////////////
var dgreen = TC_mon.select('greenness').subtract(TC_base.select('greenness')).updateMask(forest2017);
Map.addLayer(dgreen, greenviz, 'change in greenness');
var dwet = TC_mon.select('wetness').subtract(TC_base.select('wetness')).updateMask(forest2017);
Map.addLayer(dwet, wetviz, 'change in wetness', false);
var dbright = TC_mon.select('brightness').subtract(TC_base.select('brightness')).updateMask(forest2017);
Map.addLayer(dbright, brightviz, 'change in brightness', false);
var def = (dwet.lt(0).and(dgreen.lt(0)))
var possDef = dgreen.gte(threshold);
var possDef = possDef.updateMask(def);
var defmask = possDef.eq(0);
var Def = possDef.updateMask(defmask);
Map.addLayer(Def, defviz, 'detected deforestation')
///////////////////////////////////////////
// Convert to vectors.
var def_vectors = Def.reduceToVectors({
  geometry: AreaInterest,
  //crs: nl2012.projection(),
  scale: 10,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty: 'deforestation'+endDate,
  reducer: ee.Reducer.max()
});
// Export the FeatureCollection to a shapefile.
//Export.table.toDrive({
//  collection: def_vectors,
//  description:'DeforestationVectors'+endDate,
//  fileFormat: 'SHP'
//});
Export.image.toDrive({
  image: Def,
  region:AreaInterest,
  description: 'DetectedDef'+endDate,
  scale: 10,
  maxPixels: 10000000000000,
})
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//cloud functions
function PINO1(image,BANDS){
    var th_NDVI_MAX_WATER=0;
    var BLU=image.select(BANDS[0]).divide(10000);
    var GREEN=image.select(BANDS[1]).divide(10000);
    var RED=image.select(BANDS[2]).divide(10000);
    var NIR=image.select(BANDS[3]).divide(10000);
    var SWIR1=image.select(BANDS[4]).divide(10000);
    var SWIR2=image.select(BANDS[5]).divide(10000);
    var ESA_filter = image.select(BANDS[6])
    var B1 = image.select(BANDS[7]).divide(10000);
    var B9 = image.select(BANDS[8]).divide(10000);
    var OUT=ee.Image(0);
    var OUT2=ee.Image(0);
    var OUT3=ee.Image(0);
    var th_NDVI_SATURATION=0.0037;
    var th_NDVI_MIN_CLOUD_BARE=0.35;
    var th_NDVI_MIN_VEGE=0.45;
    var th_SHALLOW_WATER=-0.1;
    var th_RANGELAND=0.50;
    var th_GRASS=0.55;
    var th_SHRUB=0.65;
    var th_TREES=0.78 ;
    //var th_TREES=0.85 ;
    var min123=BLU.min(GREEN).min(RED);
    var min1234=min123.min(NIR);
    var min234=GREEN.min(RED).min(NIR);
    var max234=GREEN.max(RED).max(NIR);
    var max1234=max234.max(BLU);
    var max57=SWIR1.max(SWIR2);
    var max457=max57.max(NIR);
    var max123457= max1234.max(max57);
    var BLUgtGREEN  = BLU.gt(GREEN);
    var BLUgteGREEN = BLU.gte(GREEN);
    var BLUlteNIR   = BLU.lte(NIR);
    var GREENgtRED  = GREEN.gt(RED);
    var GREENlteRED = GREEN.lte(RED);
    var GREENgteRED = GREEN.gte(RED);
    var REDlteNIR= RED.lte(NIR);
    var REDsubtractGREEN = (RED.subtract(GREEN)).abs();
    var BLUsubtractNIR   = BLU.subtract(NIR)
    var BLUgtGREENgtRED=BLUgtGREEN.and(GREENgtRED)
    var growing14=(BLU.lte(GREEN)).and(GREENlteRED).and(REDlteNIR);
    var growing15=growing14.and(NIR.lte(SWIR1));
    var decreasing2345=(GREENgteRED).and(RED.gte(NIR)).and(NIR.gte(SWIR1));
    var SATURATION=(max234.subtract(min234)).divide(max234);
    var WETNESS=BLU.multiply(-1);// image.expression('byte(b("'+BANDS[0]+'")*255)*0.2626 + byte(b("'+BANDS[1]+'")*255)*0.21 + byte(b("'+BANDS[2]+'")*255)*0.0926 + byte(b("'+BANDS[3]+'")*255)*0.0656 - byte(b("'+BANDS[4]+'")*255)*0.7629 - byte(b("'+BANDS[5]+'")*255)*0.5388');
    var NDVI=(NIR.subtract(RED)).divide(NIR.add(RED));
    var NDSI=(BLU.subtract(SWIR1)).divide(GREEN.add(SWIR1));
    var BRIGTSOIL=((BLU.lt(0.27)).and(growing15)).or((BLU.lt(0.27)).and(growing14).and(  ((NIR.subtract(SWIR1)).gt(0.038)))); 
    var WATERSHAPE= ((BLU.subtract(GREEN)).gt(-0.2)).and(decreasing2345).and(WETNESS.gt(0)); //add other cond
    var OTHERWATERSHAPE= (BLUgteGREEN).and(GREENgteRED).and(NIR.gte(RED)).and(SWIR1.lt(NIR)).and(SWIR2.lte(SWIR1)).and(NIR.lt((RED).multiply(1.3)).and(NIR.lt(0.12)).and(SWIR1.lt(RED)).and(NIR.lte(GREEN)).and(NIR.gt(0.039)).and(WETNESS.gt(0))  ); //add other cond  07/10 (add replaced with and  :) and(NIR.lte(GREEN))
    var SNOWSHAPE=(min1234.gt(0.30)).and(NDSI.gt(0.65));
    var CLOUDSHAPE = ((SNOWSHAPE.eq(0)).and(BRIGTSOIL.eq(0))).and(      //
                  ((max123457.gt(0.47)).and(min1234.gt(0.37))).or(
                    ((min123.gt(0.17)).and((SWIR1).gt(min123))).and(
                          ((SATURATION.gte(0.2)).and(SATURATION.lte(0.4)).and(max234.gte(0.35)) ).or ((NDSI.lt(0.65)).and(max1234.gt(0.30)).and( (NIR.divide(RED)).gte(1.3) ).and((NIR.divide(GREEN)).gte(1.3)).and( (NIR.divide(SWIR1)).gte(0.95)  )) 
                                                                   )
                                                                  ) 
                                                              ) 
    min123=0
    BRIGTSOIL=0
    SATURATION=0
    decreasing2345=0
    // main groups based on ndvi
    var ndvi_1 = NDVI.lte(th_NDVI_MAX_WATER);
    var ndvi_2 = NDVI.lt(th_NDVI_MIN_VEGE).and(ndvi_1.eq(0));
    var ndvi_3 = NDVI.gte(th_NDVI_MIN_VEGE);
    //-------------------------------------------------------------------------------------------------------------
		//----------------------  SECTION 1 : WATER  ---------------------------------------------------------
		//-------------------------------------------------------------------------------------------------------------
    OUT=(ndvi_1.and(SNOWSHAPE)).multiply(3);
    OUT=OUT.where( (ndvi_1).and(
                    (WATERSHAPE.and(BLU.gt(0.078)).and(GREEN.gt(0.04)).and(GREEN.lte(0.12)).and(max57.lt(0.04))).or(
                    (RED.gte(max457)).and(RED.lte(0.19)).and(RED.gt(0.04)).and(BLU.gt(0.078)).and(max57.lt(0.04))) ),8);
    OUT=OUT.where(( (ndvi_1).and(BLU.gt(0.94)).and(GREEN.gt(0.94)).and(RED.gt(0.94)).and(NIR.gt(0.94)) ),1);  // TEST CLOUDS L8
		OUT=OUT.where(( (OUT.eq(0)).and(ndvi_1)),8);
   // function cloudMask(im) {
  //// Opaque and cirrus cloud masks cause bits 10 and 11 in QA60 to be set,
  //// so values less than 1024 are cloud-free
  //var mask = ee.Image(0).where(im.select('QA60').gte(1024), 1).not();
  //return im.updateMask(mask);
//}
    // ESA FILTER
    OUT=OUT.where( ESA_filter.gte(1024), 1);
    // NIR saturation
    //OUT=OUT.where( NIR.gte(0.3), 1);
        // NIR saturation
    //OUT=OUT.where( BLU.gte(0.2), 1);
   //OUT = OUT.where(BLU.gte(0.1610).and(B1.gte(0.1500)), 1);
   //OUT = OUT.where(B1.gte(0.1550), 1);
   // NIR saturation
    OUT2=OUT2.where( B1.gte(0.1550).and(BLU.gte(0.2)).and(B9.gt(0.09)), 1);
   //OUT = OUT.where(BLU.gte(0.1610).and(B1.gte(0.1500)), 1);
   //OUT2 = OUT2.where(B1.gte(0.1550).and(B9.gt(0.09)), 1);
  OUT2=OUT2.focal_max(50,'circle','meters',1); 
  // OUT = OUT.where(BLU.gte(0.1610).and(B1.gte(0.1500)), 1);
  OUT3 = OUT3.where(OUT.eq(1), 1);
  OUT3=OUT3.focal_max(50,'circle','meters',1);
   OUT = OUT.where(OUT2.gte(1), 1);
   OUT = OUT.where(OUT3.gte(1), 1);
  if (clouds_morpho_filter == 1){
        var CM=((OUT.eq(1)).or(OUT.eq(3)));                                                 // possible clouds 
        var SH=(OUT.gt(41));   //possible shadows 
        CM=CM.focal_max(500,'circle','meters',1);                             
        var CMextent=CM.focal_max(500,'circle','meters',1);                                 // max distance of SH from CL --- better number can be defined usinf sun elevation
        OUT=OUT.where(((OUT.eq(8)).and(CMextent)),42);                                      // recode SH falling in the buffer to final SH class  
        CMextent=0;
        SH=SH.focal_max(500,'circle','meters',1);
        var CM_SH=CM.add(SH.multiply(2)).select([0],["CSM"]);
        OUT=OUT.where(CM_SH.gte(1),1);
    }
    //return (OUT.select([0],["Class"]).toByte());
    // return (image.updateMask(OUT.lte(3)));
    //return image.and((OUT.select([0],["Class"]).toByte()));
    return image.mask(OUT.neq(1))
}
});   // SINGLE DATE CLASSIFICATION