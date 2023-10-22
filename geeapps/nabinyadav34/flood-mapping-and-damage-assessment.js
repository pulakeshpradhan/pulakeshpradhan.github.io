var Nepal = ui.import && ui.import("Nepal", "table", {
      "id": "users/nabinyadav34/Nepal_Dis"
    }) || ee.FeatureCollection("users/nabinyadav34/Nepal_Dis");
//  * Author:Nabin Kumar Yadav 
//  * Email:nabin.yadav34@gmail.com
// ****************************************************************
Map.centerObject(Nepal, 7)
Map.setOptions('SATELLITE');
var logo = ee.Image("projects/academic-oath-140708/assets/nepal_logo");
Map.style().set('cursor', 'hand');
var panel = ui.Panel({
  style: {
    width: '250px',
    border : '1px solid #000000',
    shown: true
  }
});
// DEFINE WEB LINK FOR THUMBNAIL
//var link = ui.Label('Tall Timbers Research Station', {},'https://www.talltimbers.org');
//main.add(link)
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255,format: 'png'},style:{width:'100',height:'90px',textAlign: 'center'}});
var toolPanel = ui.Panel(branding, 'flow', {width: '2500px'});
//ui.root.widgets().add(toolPanel);
///////////-------------------------------------------
var Header = ui.Label('Flood Mapping and Damage Assessment',{fontWeight: 'bold',color:'Green', fontSize: '14px', textAlign: 'left'});
var Subheader0 = ui.Label('Developed by : Nabin Kumar Yadav (Forest Officer)' ,{fontWeight: 'bold', fontSize: '10px', textAlign: 'left'});
var Subheader1 = ui.Label('After Flood :',{fontWeight: 'bold',color:'red'});
var label_Start_second_select = ui.Label('Start:(YYYY-MM-DD)');
var Start_second_select = ui.Textbox({
  value: '2021-06-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_second_select = ui.Label('End:(YYYY-MM-DD)');
var End_second_select = ui.Textbox({
  value: '2021-06-16',
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
var Subheader2 = ui.Label('Before Flood :',{fontWeight: 'bold',color:'red'});
var label_Start_base_select = ui.Label('Start:(YYYY-MM-DD)');
var Start_base_select = ui.Textbox({
  value: '2021-05-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_base = text
  }
});
var label_End_base_select = ui.Label('End:(YYYY-MM-DD)');
var End_base_select = ui.Textbox({
  value: '2021-06-01',
  style: {width : '90px'},
  onChange: function(text) {
    var End_base = text
  }
});
var label_Sensor_select = ui.Label('Sensor selection:',{fontWeight: 'bold'});
var Sensor_select = ui.Select({
  items: [{label: 'Sentinel-1 SAR ', value: 'S1'},{label: 'Sentinel-1 SAR & Sentinel-2 MSI Integration (Not active)', value: 'S2'}],
  value: 'S1',
  onChange: function(value) {
    var Sensor = value
  },
  style: {width: '200px'}
});
var label_district_select = ui.Label('Select District',{fontWeight: 'bold',color:'red'});
var district_select = ui.Select({items: [
    {label:'Achham', value:'Achham'},{label:'Arghakhanchi', value:'Arghakhanchi'},{label:'Baglung', value:'Baglung'},
    {label:'Baitadi', value:'Baitadi'}, {label:'Bajhang', value:'Bajhang'},{label:'Bajhang', value:'Bajhang'},
    {label:'Bajura', value:'Bajura'},{label:'Banke', value:'Banke'},{label:'Bara', value:'Bara'},{label:'Bardiya', value:'Bardiya'},
    {label:'Bhaktapur', value:'Bhaktapur'},{label:'Bhojpur', value:'Bhojpur'},{label:'Chitawan', value:'Chitawan'},
    {label:'Dadeldhura', value:'Dadeldhura'},{label:'Dailekh', value:'Dailekh'},{label:'Dang', value:'Dang'},
    {label:'Darchula', value:'Darchula'},{label:'Dhading', value:'Dhading'},{label:'Dhankuta', value:'Dhankuta'},
    {label:'Dhanusha', value:'Dhanusha'},{label:'Dolakha', value:'Dolakha'},{label:'Dolpa', value:'Dolpa'},
    {label:'Doti', value:'Doti'},{label:'Gorkha', value:'Gorkha'},{label:'Gulmi', value:'Gulmi'},{label:'Humla', value:'Humla'},
    {label:'Illam', value:'Illam'},{label:'Jajarkot', value:'Jajarkot'},{label:'Jhapa', value:'Jhapa'},{label:'Jumla', value:'Jumla'},
    {label:'Kabhrepalanchok', value:'Kabhrepalanchok'},{label:'Kailali', value:'Kailali'},{label:'Kalikot', value:'Kalikot'},
    {label:'Kanchanpur', value:'Kanchanpur'},{label:'Kapilbastu', value:'Kapilbastu'},{label:'Kanchanpur', value:'Kanchanpur'},{label:'Kaski', value:'Kaski'},
    {label:'Kathmandu', value:'Kathmandu'},{label:'Khotang', value:'Khotang'},{label:'Lalitpur', value:'Lalitpur'},{label:'Lamjung', value:'Lamjung'},
    {label:'Mahottari', value:'Mahottari'},{label:'Makawanpur', value:'Makawanpur'},{label:'Manang', value:'Manang'},{label:'Morang', value:'Morang'},
    {label:'Mugu', value:'Mugu'},{label:'Mustang', value:'Mustang'},{label:'Myagdi', value:'Myagdi'},{label:'Nawalparasi East', value:'Nawalparasi East'},
    {label:'Nawalparasi West', value:'Nawalparasi West'},{label:'Nuwakot', value:'Nuwakot'},{label:'Okhaldhunga', value:'Okhaldhunga'},
    {label:'Palpa', value:'Palpa'},{label:'Panchthar', value:'Panchtar'},{label:'Parbat', value:'Parbat'},{label:'Parsa', value:'Parsa'},
    {label:'Pyuthan', value:'Pyuthan'},{label:'Ramechhap', value:'Ramechhap'},{label:'Rasuwa', value:'Rasuwa'},{label:'Rautahat', value:'Rautahat'},
    {label:'Rolpa', value:'Rolpa'},{label:'Rukum East', value:'Rukum East'},{label:'Rukum West', value:'Rukum West'},{label:'Rupandehi', value:'Rupandehi'},
    {label:'Salyan', value:'Salyan'},{label:'Sankhuwasabha', value:'Sankhuwasabha'},{label:'Saptari', value:'Saptari'},{label:'Sarlahi', value:'Sarlahi'},
    {label:'Sindhuli', value:'Sindhuli'},{label:'Siraha', value:'Siraha'},{label:'Solukhumbu', value:'Solukhumbu'},{label:'Sunsari', value:'Sunsari'},
    {label:'Surkhet', value:'Surkhet'},{label:'Syangja', value:'Syangja'},{label:'Tahahu', value:'Tanahu'},{label:'Taplejung', value:'Taplejung'},
    {label:'Terhathum', value:'Terhathum'},{label:'Udayapur', value:'Udayapur'}
    ],
value: 'Rautahat',
  onChange: function(value) {
    var district = value
  },
  style: {width: '200px',color:'blue'}
});
var AOI_selection = ui.Checkbox({
  label: 'Use AOI polygon',  
  value: false,
  onChange: function(value) {
    var AOI_selection = value
  }
});
var center_select = ui.Checkbox({
  label: 'Center on selected area',  
  value: true,
  onChange: function(value) {
    var center = value
  }
});
var label_zoomlevel_select = ui.Label('Zoomlevel under center option (1 - 24):');
var zoomlevel_select = ui.Slider({
  min: 1,
  max: 24, 
  value: 10, 
  step: 1,
  onChange: function(value) {
    var zoomlevel = value
  },
  style: {width: '250px'}
});
panel.add(toolPanel);
panel.add(Header);
panel.add(Subheader0);
panel.add(Subheader1);
panel.add(label_Start_second_select);
panel.add(Start_second_select);
panel.add(label_End_second_select);
panel.add(End_second_select);
panel.add(Subheader2);
panel.add(label_Start_base_select);
panel.add(Start_base_select);
panel.add(label_End_base_select);
panel.add(End_base_select);
panel.add(label_district_select);
panel.add(district_select);
panel.add(label_Sensor_select);
panel.add(Sensor_select);
panel.add(AOI_selection);
panel.add(center_select);
panel.add(label_zoomlevel_select);
panel.add(zoomlevel_select);
////This Section run when Run byttom is presses
ui.root.insert(0, panel);
var button = ui.Button('Click to Run');
button.style().set({
  position: 'top-center',
  border : '1px solid #000000',
  color:'Green'
});
Map.add(button);
// Functions of the script **********************
// **********************************************
button.onClick(function() {
    Map.clear();
    // Add the button to the map and the panel to root.
    Map.add(button);
    var Start_base = Start_base_select.getValue();
    var Start_base_number = ee.Number.parse(Start_base.replace(/-/g,'')).getInfo();
    var End_base = End_base_select.getValue();
    var End_base_number = ee.Number.parse(End_base.replace(/-/g,'')).getInfo();
    var Start_second = Start_second_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo();
    var End_second = End_second_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
    var Sensor = Sensor_select.getValue();
    var district = district_select.getValue();
    var AOI_select = AOI_selection.getValue();
    var center = center_select.getValue();
    var zoomlevel = zoomlevel_select.getValue();
    // *********************************************************************************************************************************************************
     // Define District 
     var geometry =Nepal.filterMetadata('DISTRICT','equals',district); // Please Write District Name here. Don't Change any code 
     //var geometry = AOI_select
     var display1= ee.Image(0).updateMask(0).paint(geometry, '000000',2);
     Map.addLayer(display1,{palette: '#000000'},'Boundary');
     var aoi = geometry
    // Adjustments according to above user selections
    if (center === true){
      Map.centerObject(aoi, zoomlevel);
    }
    if (Sensor === 'S1'){   
      var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
      var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
      var difference_threshold = 1.25; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */
      //var relative_orbit = 79; 
                          /*if you know the relative orbit for your study area, you can filter
                           you image collection by it here, to avoid errors caused by comparing
                           different relative orbits.*/
     // Load and filter Sentinel-1 GRD data by predefined parameters 
     var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.eq('instrumentMode','IW'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
      .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
      .filter(ee.Filter.eq('resolution_meters',10))
      //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
      .filterBounds(aoi)
      .select(polarization);
     // Select images by predefined dates
     var before_collection = collection.filterDate(Start_base, End_base);
     var after_collection = collection.filterDate(Start_second, End_second);
      // Print selected tiles to the console
      // Extract date from meta data
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      // // print dates of before images to console
      // var before_count = before_collection.size();
      // print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
      //   dates(before_collection), before_collection);
      // // print dates of after images to console
      //   var after_count = before_collection.size();
      //   print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
      //   dates(after_collection), after_collection);
       // Create a mosaic of selected tiles and clip to study area
       var before = before_collection.mosaic().clip(aoi);
       var after = after_collection.mosaic().clip(aoi);
       // Apply reduce the radar speckle by smoothing  
       var smoothing_radius = 50;
       var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
       var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
      //------------------------------- FLOOD EXTENT CALCULATION -------------------------------//
       // Calculate the difference between the before and after images
       var difference = after_filtered.divide(before_filtered);
       // Apply the predefined difference-threshold and create the flood extent mask 
       var threshold = difference_threshold;
       var difference_binary = difference.gt(threshold);
       // Refine flood result using additional datasets
      // Include JRC layer on surface water seasonality to mask flood pixels from areas
      // of "permanent" water (where there is water > 10 months of the year)
      var swater = ee.Image('JRC/GSW1_3/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      // Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
      // This operation reduces noise of the flood extent product 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      // Mask out areas with more than 5 percent slope using a Digital Elevation Model 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
      // Calculate flood extent area
      // Create a raster layer containing the area information of each pixel 
      var flood_pixelarea = flooded.select(polarization)
                                   .multiply(ee.Image.pixelArea());
      // Sum the areas of flooded pixels
      // default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
      // accurate result set bestEffort to false and increase 'maxPixels'. 
     var flood_stats = flood_pixelarea.reduceRegion({
         reducer: ee.Reducer.sum(),              
         geometry: aoi,
         scale: 10, // native resolution 
         maxPixels: 1e9,
         bestEffort: true
         });
    // Convert the flood extent to hectares (area calculations are originally given in meters)  
     var flood_area_ha = flood_stats
         .getNumber(polarization)
         .divide(10000)
         .round(); 
     //------------------------------  DAMAGE ASSSESSMENT  ----------------------------------//
     //----------------------------- Exposed population density ----------------------------//
     // Load JRC Global Human Settlement Popluation Density layer
     // Resolution: 250. Number of people per cell is given.
     var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(aoi);
      var GHSLprojection = population_count.projection();
     // Reproject flood layer to GHSL scale
     var flooded_res1 = flooded
       .reproject({
       crs: GHSLprojection
      });
     // Create a raster showing exposed population only using the resampled flood layer
      var population_exposed = population_count
     .updateMask(flooded_res1)
     .updateMask(population_count);
     //Sum pixel values of exposed population raster 
     var stats = population_exposed.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: aoi,
        scale: 250,
        maxPixels:1e9 
        });
     // get number of exposed people as integer
     var number_pp_exposed = stats.getNumber('population_count').round();
     //----------------------------- Affected agricultural land ----------------------------//
     var LC = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m").mosaic()
        .select("b1")
        .clip(aoi);
     // Extract only cropland pixels 
     var cropmask = LC.eq(05)
     var cropland = LC.updateMask(cropmask)
     // get ESRI projection
     var esriprojection = LC.projection();
     var flooded_res = flooded
         .reproject({
          crs: esriprojection
        });
     // Calculate affected cropland using the resampled flood layer
     var cropland_affected = flooded.updateMask(cropland)
     // get pixel area of affected cropland layer
     var crop_pixelarea = cropland_affected.multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
     // sum pixels of affected cropland layer
     var crop_stats = crop_pixelarea.reduceRegion({
         reducer: ee.Reducer.sum(), //sum all pixels with area information                
         geometry: aoi,
           scale: 10,
       maxPixels: 1e9
       });
      // convert area to hectares
     var crop_area_ha = crop_stats
         .getNumber(polarization)
         .divide(10000)
         .round();
      //-------------------------------- Affected urban area ------------------------------//
      // Filter urban areas
      var urbanmask = LC.eq(07)
      var urban = LC.updateMask(urbanmask)
     //Calculate affected urban areas using the resampled flood layer
     var urban_affected = flooded.updateMask(urban);
      // get pixel area of affected urban layer
     var urban_pixelarea = urban_affected.multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
      // sum pixels of affected cropland layer
      var urban_stats = urban_pixelarea.reduceRegion({
          reducer: ee.Reducer.sum(), //sum all pixels with area information                
          geometry: aoi,
          scale: 10,
          maxPixels: 1e9
          });
      // convert area to hectares
      var urban_area_ha = urban_stats
         .getNumber(polarization)
         .divide(10000)
         .round();
     //------------------------------  DISPLAY PRODUCTS  ----------------------------------//
     // Before and after flood SAR mosaic
     Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
     Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',1);
     Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);
     Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');
     // Population Density
     var populationCountVis = {
        min: 0,
        max: 200.0,
        palette: ['060606','337663','337663','ffffff'],
          };
     Map.addLayer(population_count, populationCountVis, 'Population Density',0);
    // Exposed Population
     var populationExposedVis = {
      min: 0,
      max: 200.0,
      palette: ['yellow', 'orange', 'red'],
      };
    Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population');
     // ESIR
     var LCVis = {
       min: 1,
       max: 10,
        palette: [
    "#1A5BAB",
    "#358221",
    "#A7D282",
    "#87D19E",
    "#FFDB5C",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF",
    "#C8C8C8"
  ],
          };
      Map.addLayer(LC, LCVis, 'Land Cover',0);
     // Cropland
     var croplandVis = {
         min: 0,
         max: 5.0,
         palette: ['30b21c'],
         };
      Map.addLayer(cropland, croplandVis, 'Cropland',0)
      // Affected cropland
      Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland'); 
      // Urban
      var urbanVis = {
       min: 0,
       max: 7,
       palette: ['red'],
       };
       Map.addLayer(urban, urbanVis, 'Urban',0)
       // Affected urban
       Map.addLayer(urban_affected, urbanVis, 'Affected Urban'); 
      //---------------------------------- MAP PRODUCTION --------------------------------//
      //-------------------------- Display the results on the map -----------------------//
     // set position of panel where the results will be displayed 
     var results = ui.Panel({
         style: {
         position: 'bottom-right',
         padding: '8px 15px',
         width: '250px'
       }
      });
     //Prepare the visualtization parameters of the labels 
      var textVis = {
       'margin':'0px 8px 2px 0px',
       'fontWeight':'bold'
       };
      var numberVIS = {
       'margin':'0px 0px 15px 0px', 
       'color':'bf0f19',
       'fontWeight':'bold'
       };
      var subTextVis = {
       'margin':'0px 0px 2px 0px',
       'fontSize':'12px',
       'color':'grey'
       };
      var titleTextVis = {
       'margin':'0px 0px 15px 0px',
       'fontSize': '18px', 
       'font-weight':'', 
       'color': '3333ff'
       };
     // Create lables of the results 
     // Titel and time period
     var title = ui.Label('Results', titleTextVis);
     var text1 = ui.Label('Flood status between:',textVis);
     var number1 = ui.Label(Start_second.concat(" and ",End_second),numberVIS);
     // Estimated flood extent 
     var text2 = ui.Label('Estimated flood extent:',textVis);
     var text2_2 = ui.Label('Please wait...',subTextVis);
     dates(after_collection).evaluate(function(val){text2_2.setValue('based on Senintel-1 imagery '+val)});
     var number2 = ui.Label('Please wait...',numberVIS); 
     flood_area_ha.evaluate(function(val){number2.setValue(val+' hectares')}),numberVIS;
     // Estimated number of exposed people
     var text3 = ui.Label('Estimated number of exposed people: ',textVis);
     var text3_2 = ui.Label('based on GHSL 2015 (250m)',subTextVis);
     var number3 = ui.Label('Please wait...',numberVIS);
     number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
     // Estimated area of affected cropland 
     var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
     var text4 = ui.Label('Estimated affected cropland:',textVis);
     var text4_2 = ui.Label('Please wait', subTextVis)
     MODIS_date.evaluate(function(val){text4_2.setValue('ESRI_LULC 2020 (10m)')}), subTextVis;
     var number4 = ui.Label('Please wait...',numberVIS);
     crop_area_ha.evaluate(function(val){number4.setValue(val+' hectares')}),numberVIS;
     // Estimated area of affected urban
     var text5 = ui.Label('Estimated affected urban areas:',textVis);
     var text5_2 = ui.Label('Please wait', subTextVis)
     MODIS_date.evaluate(function(val){text5_2.setValue('ESRI LULC 2020 (10m)')}), subTextVis;
     var number5 = ui.Label('Please wait...',numberVIS);
     urban_area_ha.evaluate(function(val){number5.setValue(val+' hectares')}),numberVIS;
    // // Disclaimer
    //   var text6 = ui.Label('Disclaimer: This product has been derived automatically without validation data. All geographic information has limitations due to the scale, resolution, date and interpretation of the original source materials. No liability concerning the content or the use thereof is assumed by the producer.',subTextVis)
    // // Produced by...
    // var text7 = ui.Label('Script produced by: UN-SPIDER December 2019', subTextVis)
      // Add the labels to the panel 
      results.add(ui.Panel([
             title,
             text1,
             number1,
             text2,
             text2_2,
             number2,
             text3,
             text3_2,
             number3,
             text4,
             text4_2,
             number4,
            text5,
            text5_2,
             number5
             ]
            ));
       // Add the panel to the map 
      Map.add(results);
      //----------------------------- Display legend on the map --------------------------//
     // Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
     // set position of panel
     var legend = ui.Panel({
       style: {
       position: 'bottom-left',
      padding: '8px 8px',
       }
      });
     // Create legend title
     var legendTitle = ui.Label('Legend',titleTextVis);
     // Add the title to the panel
     legend.add(legendTitle);
     // Creates and styles 1 row of the legend.
     var makeRow = function(color, name) {
           // Create the label that is actually the colored box.
           var colorBox = ui.Label({
             style: {
              backgroundColor: color,
              // Use padding to give the box height and width.
              padding: '8px',
              margin: '0 0 4px 0'
             }
            });
           // Create the label filled with the description text.
          var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
           });
        // return the panel
         return ui.Panel({
         widgets: [colorBox, description],
         layout: ui.Panel.Layout.Flow('horizontal')
         });
       };
     //  Palette with the colors
     var palette =['#0000FF', '#30b21c', 'red'];
      // name of the legend
     var names = ['potentially flooded areas','affected cropland','affected urban'];
     // Add color and and names
     for (var i = 0; i < 3; i++) {
      legend.add(makeRow(palette[i], names[i]));
       }  
     // Create second legend title to display exposed population density
     var legendTitle2 = ui.Label({
     value: 'Exposed population density',
     style: {
     fontWeight: 'bold',
     fontSize: '10px',
     margin: '10px 0 0 0',
     padding: '0'
     }
     });
     // Add second title to the panel
     legend.add(legendTitle2);
     // create the legend image
     var lon = ee.Image.pixelLonLat().select('latitude');
     var gradient = lon.multiply((populationExposedVis.max-populationExposedVis.min)/100.0).add(populationExposedVis.min);
     var legendImage = gradient.visualize(populationExposedVis);
     // create text on top of legend
     var panel = ui.Panel({
     widgets: [
     ui.Label('> '.concat(populationExposedVis['max']))
     ],
     });
     legend.add(panel);
     // create thumbnail from the image
     var thumbnail = ui.Thumbnail({
     image: legendImage,
     params: {bbox:'0,0,10,100', dimensions:'10x20'},
     style: {padding: '1px', position: 'bottom-center'}
     });
     // add the thumbnail to the legend
     legend.add(thumbnail);
     // create text on top of legend
     var panel = ui.Panel({
     widgets: [
     ui.Label(populationExposedVis['min'])
     ],
     });
     legend.add(panel);
     // add legend to map (alternatively you can also print the legend to the console)
     Map.add(legend);
    }
});
// ******************************************************************* END *********************************************************************************