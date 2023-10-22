var Boundary = ui.import && ui.import("Boundary", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -99.03679128596156,
                19.50035065220478
              ],
              [
                -99.03679128596156,
                19.494444304736028
              ],
              [
                -99.03085823962061,
                19.494444304736028
              ],
              [
                -99.03085823962061,
                19.50035065220478
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#ffffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #ffffff */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-99.03679128596156, 19.50035065220478],
          [-99.03679128596156, 19.494444304736028],
          [-99.03085823962061, 19.494444304736028],
          [-99.03085823962061, 19.50035065220478]]], null, false);
/*
Primary Author: Sofia Ermida (sofia.ermida@ipma.pt; @ermida_sofia)
Amedded by Jonathon Brearley for Urban Risk Lab at MIT
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
Example 1:
  This example shows how to compute Landsat LST from Landsat-8 over Coimbra
  This corresponds to the example images shown in Ermida et al. (2020)
*/
var listofcountries = ee.List(['US', 'Abyei', 'Afghanistan', 'Africa', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Argentina', 'Armenia', 'Aruba', 'Asia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bonaire', 'Bosnia_and_Herzegovina', 'Botswana', 'Brazil', 'British_Indian_Ocean_Territory', 'British_Virgin_Islands', 'Bulgaria', 'Burkina_Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cayman_Islands', 'Central_African_Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo_DRC', 'Costa_Rica', 'Croatia, Cuba', 'Curacao', 'Cyprus', 'Czech_Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican_Republic', 'Ecuador', 'Egypt', 'El_Salvador', 'Equatorial_Guinea', 'Eritrea, Estonia', 'Ethiopia', 'Europe', 'FYRO_Makedonija', 'Faroe_Islands', 'Finland', 'France', 'Gabon', 'Gaza_Strip', 'Georgia', 'Germany', 'Ghana, Golan_Heights', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'Ile_Saint-Martin', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory_Coast', 'Jamaica', 'Jordan', 'Kazakhstan', 'Kenya, Kingdom_of_Saudi_Arabia', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria', 'North_America', 'Norway', 'Pa-li-chia-ssu', 'Pakistan', 'Panama', 'Paracel_Islands', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto_Rico', 'Republic_of_Yemen', 'Republic_of_the_Congo, Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint_Barthelemy', 'Saint_Helena_Ascension_and_Tristan_da_Cunha', 'Saint_Lucia', 'San_Marino', 'Sang', 'Sao_Tome_and_Principe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra_Leone', 'Slovakia', 'Slovenia', 'Somalia', 'South_Africa', 'South_America', 'South_Sudan', 'Spain', 'Sri_Lanka', 'Sudan', 'Sultanate_or_Oman', 'State_of_Qatar', 'Suriname', 'Swaziland', 'Sweden', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'The_Bahamas', 'The_Gambia', 'Togo', 'Tonga', 'Trinidad_and_Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turnks_and_Caicos_Islands', 'US', 'US_Virgin_Islands', 'Uganda', 'Ukraine', 'United_Arab_Emirates', 'Uruguay', 'Uzbekistan', 'Vatican_City', 'Venezuela', 'Vietnam', 'West_Bank', 'Western_Halaib_Triangle', 'Zambia', 'Zimbabwe']);
var listofstates = ee.List(['', '/Alabama','/Alaska','/Arizona','/Arkansas','/California','/Colorado','/Connecticut','/Delaware','/DistrictOfColumbia','/Florida','/Georgia','/Hawaii','/Idaho','/Illinois','/Indiana','/Iowa','/Kansas','/Kentucky','/Louisiana','/Maine','/Maryland','/Massachusetts','/Michigan','/Minnesota','/Mississippi','/Missouri','/Montana','/Nebraska','/Nevada','/NewHampshire','/NewJersey','/NewMexico','/NewYork','/NorthCarolina','/NorthDakota','/Ohio','/Oklahoma','/Oregon','/Pennsylvania','/RhodeIsland','/SouthCarolina','/SouthDakota','/Tennessee','/Texas','/Utah','/Vermont','/Virginia','/Washington','/WestVirginia','/Wisconsin','/Wyoming']);
//IMPORT FLOODING DATASET
var gfd = ee.ImageCollection('GLOBAL_FLOOD_DB/MODIS_EVENTS/V1');
//---------------------------------------------------------------------------------------------
// DRAWING TOOLS
var drawingTools = Map.drawingTools();
ui.Map.GeometryLayer({shown: true});
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'Boundary', color: 'FFFFFF', shown: false});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '275px', width: '350px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
Map.setOptions('SATELLITE')
//---------------------------------------------------------------------------------------------
// DATE AND THRESHOLD TEXT BOXES
var country_text = ui.Textbox({placeholder: 'Year',  value: 'US',
  onChange: function(value) {
    startdate.setValue(value);
  },
  });
var state = ui.Textbox({placeholder: 'Year',  value: 'Massachusetts',
  onChange: function(value) {
    startdate.setValue(value);
  },
  });
var startdate = ui.Textbox({placeholder: 'Year',  value: '2021-06-01',
  onChange: function(value) {
    startdate.setValue(value);
  },
  });
var enddate = ui.Textbox({placeholder: 'Year',  value: '2021-07-29',
  onChange: function(value) {
    enddate.setValue(value);
  },
  });
var mean_thresh = ui.Textbox({placeholder: 'Theshold',  value: '20',
  onChange: function(value) {
    mean_thresh.setValue(value);
  },
  });
var dev_thresh = ui.Textbox({placeholder: 'Threshold',  value: '10',
  onChange: function(value) {
   dev_thresh.setValue(value);
  },
  });
var datepanel = ui.Panel({widgets: [
  ui.Label('Start Date:'),
  startdate,
  ui.Label('End Date:'),
  enddate
  ],
  });
var threshpanel = ui.Panel({widgets: [
  ui.Label('Image Mean Threshold:'),
  mean_thresh,
  ui.Label('Image StDev Threshold:'),
  dev_thresh,
  ], 
  });
//---------------------------------------------------------------------------------------------
//VISUALIZATION 
var cmap1 = ['1300FF', '03dbfc', '2bc285', 'FFF000', 'F00000'];
var cmap2 = ['F2F2F2','EFC2B3','ECB176','E9BD3A','E6E600','63C600','00A600']; 
var cmap3 = ['5e3c99','5e3c99','f7f7f7','fdb863','e66101']; 
var cmap4 = ['00A600', '63C600', 'E6E600', 'E9BD3A', 'ECB176', 'EFC2B3', 'F2F2F2'];  
var cmap5 = ['cb181d', 'ef3b2c', 'fb6a4a', 'fc9272', 'fcbba1', 'fee0d2',]; 
//---------------------------------------------------------------------------------------------
//>>>>>>>>>>>BEGIN LST FUNCTION
function LST(){
Map.layers().reset();
// link to the code that computes the Landsat LST
var LandsatLST = require('users/brearleyjonathon/LST:modules/Landsat_LST.js');
//---------------------------------------------------------------------------------------------
// INPUTS: select region of interest, date range, and landsat satellite
//var geometry = Boundary//REFERENCE GEOMETRY 
var satellite = 'L8'; //CHOOSE SATELLITE
var date_start = startdate.getValue(); //BEGINNING DATE
var date_end = enddate.getValue(); //ENDING DATE
var use_ndvi = true; //USE NDVI
var geometry = drawingTools.layers().get(0).getEeObject();
var mean_threshold = ee.Number.parse(mean_thresh.getValue(), 10);
var dev_threshold = ee.Number.parse(dev_thresh.getValue(), 10);
//---------------------------------------------------------------------------------------------
//GET VARS
// get landsat collection with added variables: NDVI, FVC, TPW, EM, LST
var LandsatColl = LandsatLST.collection(satellite, date_start, date_end, geometry, use_ndvi);
var img_bands = LandsatColl.first().bandNames().size();
print('Number of bands in the image:', img_bands);
print('LANDSAT Collection:', LandsatColl);
//---------------------------------------------------------------------------------------------
//CREATING DAILY LST MOSICS
var numberOfDays = ee.Date(date_end).difference(ee.Date(date_start), 'days');
var dayOffsets = ee.List.sequence(0, numberOfDays.subtract(1));
var dailyMosaics = ee.ImageCollection(dayOffsets
  .map(function (dayOffset) {
    var date = ee.Date(date_start).advance(ee.Number(dayOffset), 'days');
    var date_format = date.format('yyy_MM_dd');
    var images = LandsatColl.filterDate(date.getRange('day'));
    return ee.ImageCollection(images)
      .mosaic()
      .set('system:time_start', date.millis())
      .set('date', date_format);
  })
);
//number of bands per image
var listOfImages = dailyMosaics.toList(dailyMosaics.size());
//creating an empty image
var empty_img = ee.Image();
var bandNames = empty_img.bandNames();
var bandsToRemove = ['constant'];
var bandsToKeep = bandNames.removeAll(bandsToRemove);
var zero_image = empty_img.select(bandsToKeep);
//Adding empty image to list
listOfImages = listOfImages.add(zero_image);
var newList = listOfImages.map(function comprobeBandsNumber(ele){
  var new_list = ee.List([]); 
  var count = ee.Image(ele).bandNames().size();
  var comp = ee.Algorithms.If(count.eq(img_bands), ele, 0);
  new_list = new_list.add(comp);
  return new_list;
}).flatten();
//removing zeroes in new list
newList = newList.removeAll([0]);
//creating new collection
var MIC = ee.ImageCollection(newList);
print("Daily LANDSAT Mosaics", MIC);
//---------------------------------------------------------------------------------------------
//CROPPING AND ADDING IMAGES TO MAP
var listOfImage = MIC.toList(MIC.size()); 
var listlength = listOfImage.length();
var listdate = MIC.aggregate_array('date').getInfo();
//print("List of Image Dates:", listdate);
//function to clip and convert to celcius
var crop_add = (function(image){
  var img = image.select('LST');
  var img_clip = img.clip(geometry).subtract(273.15);
  var img_meta = img_clip.set('date', image.get('date'));
  return img_meta;
});
var imagetoCelcius = MIC.map(function(image){
  var img = image.select('LST').subtract(273.5);
  return img.set('date', image.get('date'));
});
//band list (not used at the moment)
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11', 'SR_aerosol', 'pixel_qa', 'radsat_qa', 'NDVI', 'FVC', 'TPW', 'TPWpos', 'EM', 'LST'];
//function to crop to geometry
var crop = imagetoCelcius.map(function(image){
  return image.clip(geometry);
});
//combining cropped LST and other bands 
var crop_combine = crop.combine(MIC);
//getting LST statistics as a proxy cloud mask 
//  finding standard deviation and mean temp values 
var cloudy = function(image) {
  var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
  });
  var stats1 = ee.Image(image.select('LST')).reduceRegion({
    reducer: reducers,
    geometry: geometry,
    scale: 30,
    bestEffort: true
  });
  return ee.Image(image).set(stats1);
};
//make statistcs variable and print to console for viewing
var statistics = crop_combine.map(cloudy);
//print("statistics", statistics);
//filter 1: remove images with deviation threshold greater than 'dev_threshold' set above
var filterClouds_std = statistics
.filterMetadata('LST_stdDev','less_than', dev_threshold);
//print('filtered1', filterClouds_std);
//filter 2: remove image with mean temp less than 'mean_threshold' set above
var filterClouds_mean = statistics
.filterMetadata('LST_mean','greater_than', mean_threshold);
//print('filtered2', filterClouds_mean);
//add images to map
var cropped = filterClouds_mean;
var croppedlist = cropped.toList(cropped.size());
var croppedlen = croppedlist.length().getInfo();
var croppeddate = cropped.aggregate_array('date').getInfo();
var visParams1 = {
  bands: ['LST'],
  min: 0,
  max: 50,
  palette:cmap1,
};
for(var i = 0; i < croppedlen; i++) {
  var image = ee.Image(croppedlist.get(i));
  Map.addLayer(image, visParams1, 'LST' + croppeddate[i]);
}
//print in the cropped and unit changed images in the console
print('Collection of Cropped Images:', cropped);
//---------------------------------------------------------------------------------------------
//AVERAGING ALL IMAGES FOR MEDIAN LST OVER DATE PERIOD
var date_range_mean = cropped.select('LST').median();
//print(date_range_mean)
var visParams2 = {
  bands: ['LST'],
  min: 0,
  max: 50,
  palette:cmap1,
};
//---------------------------------------------------------------------------------------------
//FINDING AVERAGE SURFACE ALBEDO
var albedo = function(image){
  var alb = image.expression(
  "((0.356*blue)+(0.130*red)+(0.373*nir)+(0.085*swir)+(0.072*swir2)- 0.018)/ 1.016",
  {
    'red': image.select('B4'),
    'blue':  image.select('B2'),
    'nir':  image.select('B5'),
    'swir':  image.select('B6'),
    'swir2':  image.select('B7')
  });
  return(image.addBands(alb.rename("albedo")));
};
var clip_albedo = cropped.map(albedo);
print('clip_albedo', clip_albedo)
var date_range_albedo_med = clip_albedo.select('albedo').median()
var date_range_albedo = date_range_albedo_med.abs()
print('abs', date_range_albedo)
var albedoViz = {
  bands: ['albedo'],
  min: 0,
  max: 3000,
  palette:cmap5
}
//---------------------------------------------------------------------------------------------
//MAKE TEMPERATURE DEVATION MAPS
//get list size and convert it to list (not imagecollection)
var listOfImagesDev = cropped.toList(cropped.size()); 
//visualization parameters
var visParams3 = {
  bands: ['LST'],
  min: -15,
  max: 15,
  palette:cmap3,
};
//function to make the deviation map
var dev_map = (function(image){
  var sub = image.subtract(date_range_mean);
  var img_meta = sub.set('date', image.get('date'));
  return img_meta;
});
//add images to maps
var deviation =  cropped.map(dev_map);
var devlist = deviation.toList(cropped.size());
var devlen = devlist.length().getInfo();
var devdate = deviation.aggregate_array('date').getInfo();
//---------------------------------------------------------------------------------------------
//DEVIATION HISTOGRAM CHARTS
var listOfImagesHist = deviation.select('LST');
var listforHist = listOfImagesHist.toList(deviation.size());
var listlength2 = listforHist.length();
//chart function
listlength2.evaluate(function(listlength2) {
  for(var i = 0; i < listlength2; i++){
    var image = ee.Image(listforHist.get(i));
    var hist = ui.Chart.image.histogram({image: image.select('LST'), region: geometry, scale: 500, minBucketWidth: 0.2})
        .setSeriesNames(['LST'])
        .setOptions({
          title: 'LST Deviation from Summer Average ' + listdate[i],
          hAxis: {
            title: 'Celcius',
            titleTextStyle: {italic: false, bold: true},
            viewWindow: {
              min: -15,
              max: 15
            },
            ticks: [-15, -10, -5, 0, 5, 10, 15]
          },
          vAxis:
              {title: 'Count', titleTextStyle: {italic: false, bold: true},
              viewWindow: {
                min: 0,
                max: 750
                },
              },
          colors: ['fc0303']
        });
    print(hist);
  }
});
//---------------------------------------------------------------------------------------------
//BUILDING FOOTPRINTS
var objects = ee.data.listAssets('projects/sat-io/open-datasets/MSBuildings/');
print('Assets in MS Global Buildings Footprint Folder', objects['assets']);
//Add Average LST on top of Layer list
Map.addLayer(date_range_mean.clip(geometry), visParams2, 'Date Range Median LST');
//Map.addLayer(date_range_albedo.clip(geometry), albedoViz, 'Date Range Median Albedo');
var place = ee.String('projects/sat-io/open-datasets/MSBuildings/').cat(country_dropdown.getValue()).cat(dropdown.getValue()).trim().getInfo();
print('i should be the place', place)
var build_feature = ee.FeatureCollection(place);
var building_filter = build_feature.filterBounds(geometry);
var building_clip = building_filter.map(function(f){
  return  f.intersection(geometry, 1);
});
//Clip LST to Building Footprints
var building_meanLST = date_range_mean.addBands(date_range_mean);  
var building_means = building_meanLST.reduceRegions({
  collection: building_clip,
  reducer: ee.Reducer.mean(),
  scale: 30,
});
print('Means per Footprint:', building_means);
var LST_build_display = building_means.select('LST');
print(LST_build_display)
//Add Building LST Layers
var empty_build = ee.Image().byte();
var fills_build = empty_build.paint({
  featureCollection: LST_build_display,
  color: 'LST'
});
var outlines_build = empty_build.paint({
  featureCollection: LST_build_display,
  color: 1,
  width: 1
});
//Clip Albedo to Building Footprints
var building_meanAlbedo = date_range_albedo.addBands(date_range_albedo);
print(building_meanAlbedo)
var albedomax = building_meanAlbedo.reduceRegions({
  collection: geometry,
  reducer: ee.Reducer.max(),
  scale: 30,
});
print('albedomax', albedomax)
//var albedomaxnum = albedomax.first().get('albedo')
//var albedocon = ee.Image.constant(albedomaxnum)
//var normalalbedo = date_range_albedo.divide(albedocon)
var albedo_clip = date_range_albedo.clip(building_clip)
var albedo_add = albedo_clip.select('albedo')
print('albedo_add', albedo_add)
//Map.addLayer(geometry, {palette: '00000000', opacity: 1}, 'Background');
Map.addLayer(fills_build, {min:0, max:50, palette: cmap1, opacity: 1}, 'Building Roof Mean LST ');
Map.addLayer(albedo_add, {min:0, max:4000, palette: cmap5, opacity: 1}, 'Building Roof Albedo Clip');
//Map.addLayer(outlines_build, {palette: 'FFFFFF', opacity: 1 }, 'Roof Outlines');
//MAP VIS OPTIONS
Map.setControlVisibility({drawingToolsControl: true});
Map.centerObject(geometry);
//>>>>>>>>>>>END LST FUNCTION
}
//---------------------------------------------------------------------------------------------
//DRAWING TOOLS
drawingTools.onDraw(ui.util.debounce(LST, 500));
drawingTools.onEdit(ui.util.debounce(LST, 500));
drawingTools.onErase(ui.util.debounce(LST, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var zero = ' '
var states = ee.FeatureCollection("TIGER/2018/States");
var names = states.aggregate_array('NAME');
var slash = '/'
var valued = listofstates.sort().getInfo()
var dropdown = ui.Select({items: valued})
var dropset = dropdown.setValue('')
var countries = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"); 
var country_names = countries.aggregate_array('ADM0_NAME');
var country_values = listofcountries
var country_dropdown = ui.Select({items: country_values.getInfo()});
var style = {height: '150px', width: '400px', textAlign: 'center', stretch: 'horizontal'};
var textstyle = {height: '150px', width: '400px', textAlign: 'center', stretch: 'horizontal'};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label({ value: 'Use drawing tools below, not in upper left!', style: {fontWeight: 'bold'}}),
    ui.Label({ value: '1a) Select a country to filter building dataset', style: {}}),
    country_dropdown,
    ui.Label({ value: '1b). If US, select state', style: {}}),
    dropdown,
    ui.Label('2) Set Date Range and Thresholds\n\n      -Lower threshold numbers include images\n     with more cloud cover.\n\n      -"Image Mean Theshold" is the mean pixel value across\n      the region (~10-30 C should give good results).\n\n     -"Image StDev Threshold" indicated proximity to the\n     mean. Higher standard deviation = greater variance)\n     (~5-15 C should give good results).\n\n', {whiteSpace: 'pre'}),
    ui.SplitPanel(datepanel, threshpanel, 'horizontal', false, textstyle),
    ui.Label('3) Draw rectangle or polygon'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('4) Wait for chart to render.'),
    ui.Label('5) Turn off geometry layer (upper left)to see maps below\nand toggle nmap layers (upper right).', {whiteSpace: 'pre'}),
    ui.Label(
        '6) Repeat 1-4 or edit/move geometry for a new chart.',
        {whiteSpace: 'pre'}),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
//LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'LST Temperature (Celcius)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
// name of the legend
var names = ['=< 0','','25','','50 <='];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(cmap1[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//---------------------------------------------------------------------------------------------
//Building Footprints
/*
//Building Footprints
var objects = ee.data.listAssets('projects/sat-io/open-datasets/MSBuildings/US')
print('Assets in MS Global Buildings Footprint Folder', objects['assets'])
print(ee.FeatureCollection('projects/sat-io/open-datasets/MSBuildings/US/Massachusetts').size())
var feature = ee.FeatureCollection('projects/sat-io/open-datasets/MSBuildings/US/Massachusetts')
Map.addLayer(feature.style({fillColor: '00000000',color: 'FF5500'})),{},'Massachusetts'
*/