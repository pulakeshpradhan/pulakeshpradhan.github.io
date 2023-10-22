var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -95.01287838389351,
            39.36181303260589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.42829301491327,
            40.05889179802793
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-95.01287838389351, 39.36181303260589]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.42829301491327, 40.05889179802793]),
            {
              "system:index": "1"
            })]),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_CO"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/snyawacha/tza_admbnda_adm0_20181019"
    }) || ee.FeatureCollection("users/snyawacha/tza_admbnda_adm0_20181019"),
    county = ui.import && ui.import("county", "table", {
      "id": "users/snyawacha/kenya_adm0"
    }) || ee.FeatureCollection("users/snyawacha/kenya_adm0"),
    Nigeria = ui.import && ui.import("Nigeria", "table", {
      "id": "projects/ee-snyawacha/assets/CDR_BOUNDARIES/AEZ_NIGERIA"
    }) || ee.FeatureCollection("projects/ee-snyawacha/assets/CDR_BOUNDARIES/AEZ_NIGERIA"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "projects/ee-snyawacha/assets/CDR_BOUNDARIES/KE_Admin_Level_1"
    }) || ee.FeatureCollection("projects/ee-snyawacha/assets/CDR_BOUNDARIES/KE_Admin_Level_1"),
    Kenya = ui.import && ui.import("Kenya", "table", {
      "id": "projects/ee-snyawacha/assets/KENYA_AEZ"
    }) || ee.FeatureCollection("projects/ee-snyawacha/assets/KENYA_AEZ"),
    Zambia = ui.import && ui.import("Zambia", "table", {
      "id": "projects/ee-snyawacha/assets/Zambia_AEZ"
    }) || ee.FeatureCollection("projects/ee-snyawacha/assets/Zambia_AEZ"),
    Uganda = ui.import && ui.import("Uganda", "table", {
      "id": "projects/ee-snyawacha/assets/UGANDA_AEZ"
    }) || ee.FeatureCollection("projects/ee-snyawacha/assets/UGANDA_AEZ");
Map.setOptions('SATELLITE');
// 'users/snyawacha/kenya_adm0'
// // var boundary = county;
// Map.setOptions("SATELLITE");
// Map.centerObject(roi);
// // var bounds = county;
// print(county);
// print(table3);
// // Map.addLayer(table3)
// Map.style().set('cursor', 'hand');
// Map.setOptions('SATELLITE')
// Map.style().set('cursor', 'hand');
var Panel = ui.Panel();
Panel.style().set({
  width: '1000px',
  height: '800px',
  position: 'bottom-right',
  border : '1px solid #000000',
});
    var Panel = ui.Panel({style:{position:'bottom-right', width: '1000px', height: '1000px', border: '1px solid #000000', 
    backgroundColor:'#f7faf8', fontFamily:'calibri light'}})
                  .add(ui.Label(
                    {
                      value: 'FCaV Tool',
                      style: {fontWeight: 'bold', fontSize:'60px', margin: '0', color: 'blue', textAlign: 'center'}
                    }));
                  // .add(ui.Label('Fraud Capture and Visualization'));
    var Header = ui.Label('Fraud Capture and Visualization (FCaV) tool provides a quick avenue of assessing whether farms were planted and provides a trend chart of NDVI values across the season. It is advisable to look at the second curve and identify patterns. Generally, values below 0.2 represent bare ground and plant failure. All crops should have gradually increasing values, from germination to maturity. Input longitude and latitude in the text box, then proceed to click enter, the application will run and showcasse charts. Reach out incase of queries reach out to Seth Nyawacha (snyawacha@gmail.com)',{fontWeight: 'bold',color: 'maroon', fontSize: '15px', textAlign: 'left'});
    var county_filter = ui.Label('Select Country',{fontWeight: 'bold',color:'blue', fontSize: '30px'});
    var County  = ui.Select({
      items:[
        {label: 'Kenya', value: 'Kenya'},
        {label: 'Uganda', value: 'Uganda'},
        {label: 'Sudan', value: 'Sudan'},
        {label: 'Nigeria', value: 'Nigeria'},
        {label: 'South Sudan', value: 'South Saudan'},
        {label: 'All Polygons', value: 'All Polygons'},
        ],
      value: 'All Polygons',
      onChange: function(value){
        // var cfil = table.select(table('NAME_0').eq(value))
        var cfil = county.filter(ee.Filter.eq('COUNTRY', value));
        Map.clear();
        Map.centerObject(cfil, 10);
        if (value === 'Kenya'){
        Map.centerObject(county, 5);
        Map.addLayer (county.draw('brown'),{},'Kenya');
    }
      if (value === 'Uganda'){
          Map.centerObject(Uganda, 5);
          Map.addLayer (Uganda.draw('brown'),{},'Uganda');
      }
      if (value === 'Nigeria'){
          Map.centerObject(Nigeria, 5);
          Map.addLayer (Nigeria.draw('brown'),{},'Nigeria');
      }
          // Map.addLayer(cfil.draw('ff9716'),{}, 'Farm'+ value)
      },
      style: {width: '200px'}
      });
      //   Map.addLayer(cfil.draw('ff9716'),{}, 'Farm'+ value)
      // style: {width: '200px'}
      // });
// var polygon = table.filter(ee.Filter.eq('NAME', text))
//         var area_poly = polygon.geometry().area().divide(10000).getInfo()
//         print('area ha:'+ area_poly)
//         Map.centerObject(polygon, 10)
//         Map.addLayer(polygon.draw('green'),{}, 'Farm'+text)
//       }
//     });    
    var id_number = ui.Label('Input Latitude',{fontWeight: 'bold'});
    var ID = ui.Textbox({
      placeholder: ('Latitude'),
      onChange: function(text) {
      var idnumber = text;
      },
      style: {width: '200px'}
    });
    var Longitude = ui.Label('Input Latitude',{fontWeight: 'bold', color:'blue', fontSize: '30px'});
    var ID2 = ui.Textbox({ 
      placeholder: 'Longitude',
      onChange: function(text) {
      var idnumber2 = text;
        return(idnumber2);
      },
      style: {width: '200px'}
    });
    // print('idnumber2',text);
    // Panel.add(ui.Label('Enter Surname:', {fontWeight: 'bold', color: 'black'})).add(sur);
    var id_number = ui.Label('Input your first name',{fontWeight: 'bold',color:'blue', fontSize: '20px'});
    var ID = ui.Textbox({
      placeholder: 'Seth',
    // var ID33 = ui.Textbox({
    //   placeholder: 'Longitude',
      onChange: function(text) {
       Map.clear();
       var Latitude = ee.Number.parse(text);
        // print('Latitude is',Latitude);
        // var polygon = county.filter(ee.Filter.eq('NAME', text))
        // var area_poly = polygon.geometry().area().divide(10000).getInfo()
        // print('area ha:'+ area_poly)
        // Map.centerObject(polygon, 10)
        // Map.addLayer(polygon.draw('ff9716'),{}, 'Farm'+text)
      }
    });
// var start = '6666';
// var end  = '8888';
    var id_number2 = ui.Label('Input Longitude and Latitude (Longitude, Latitude)',{fontWeight: 'bold', color: 'blue', fontSize: '20px'});
    var ID2 = ui.Textbox({
      placeholder: '10.181594, 12.423347',
      onChange: function(text1) {
       Map.clear();
      // print('lis',lis);
        var Lo = text1;
        var nameArr = Lo.split(',');
        print('split',nameArr);
        // var no = nameArr.getNumber(1);
        // print('no',no);
        var first = ee.Number.parse(nameArr[0]);
        var second = ee.Number.parse(nameArr[1]);
        print('first',first);
        print('second',second);
        // print(typeof(first));
        var point = ee.Geometry.Point(first,second);
        var pointCoordinates = point.coordinates();
        var fc = ee.FeatureCollection(point);
        Map.addLayer(fc,
             {'color': 'red', 'pointSize':35, 'pointShape': 'star5'},
             'Farm Location');
        Map.centerObject(fc,25);
        // Import the Landsat 8 TOA image collection.
        var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA').filterDate('2018-01-01','2080-12-01');
        // Map a function over the Landsat 8 TOA collection to add an NDVI band.
        var withNDVI = l8.map(function(image) {
        var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
        return image.addBands(ndvi);
        });
        var landsat8Sr = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterDate('2018-01-01','2080-12-01');
        var roi = fc;
        // Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
          var maskL8sr = function(image) {
            // Bit 0 - Fill
            // Bit 1 - Dilated Cloud
            // Bit 2 - Cirrus
            // Bit 3 - Cloud
            // Bit 4 - Cloud Shadow
            var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
            var saturationMask = image.select('QA_RADSAT').eq(0);
            // Apply the scaling factors to the appropriate bands.
            var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
            var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
            // Replace the original bands with the scaled ones and apply the masks.
            return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true)
              .updateMask(qaMask)
              .updateMask(saturationMask);
          };
                      // Function to add NDVI, time, and constant variables to Landsat 8 imagery.
            var addVariables = function(image) {
              // Compute time in fractional years since the epoch.
              var date = image.date();
              var years = date.difference(ee.Date('1970-01-01'), 'year');
              // Return the image with the added bands.
              return image
              // Add an NDVI band.
              .addBands(image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI'))
              // Add a time band.
              .addBands(ee.Image(years).rename('t')).float()
              // Add a constant band.
              .addBands(ee.Image.constant(1));
            };
            // Remove clouds, add variables and filter to the area of interest.
            var filteredLandsat = landsat8Sr
              .filterBounds(roi)
              .filterDate('2019', '2080')
              .map(maskL8sr)
              .map(addVariables);
              // Plot a time series of NDVI at a single location.
              Map.centerObject(roi, 11);
              Map.addLayer(filteredLandsat,
                {bands: 'NDVI', min: 0.1, max: 0.9, palette: ['white', 'green']},
                'NDVI Mosaic');
              // Map.addLayer(roi, {color: 'yellow'}, 'ROI');
              var l8Chart = ui.Chart.image.series(filteredLandsat.select('NDVI'), roi)
                .setChartType('ScatterChart')
                .setOptions({
                 title: 'Landsat 8 NDVI Time Series at ROI',
                 trendlines: {
                   0: {color: 'CC0000'}
                 },
                 lineWidth: 1,
                 pointSize: 3,
                });
              print(l8Chart);
              // List of the independent variable names.
              var independents = ee.List(['constant', 't']);
              // Name of the dependent variable.
              var dependent = ee.String('NDVI');
              // Compute a linear trend. This will have two bands: 'residuals' and
              // a 2x1 band called 'coefficients' (columns are for dependent variables).
              var trend = filteredLandsat.select(independents.add(dependent))
                .reduce(ee.Reducer.linearRegression(independents.length(), 1));
              // Map.addLayer(trend, {}, 'Trend Array Image');
              // Flatten the coefficients into a 2-band image.
              var coefficients = trend.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([independents]);
                             // Compute a detrended series.
                var detrended = filteredLandsat.map(function(image) {
                  return image.select(dependent).subtract(
                    image.select(independents).multiply(coefficients).reduce('sum'))
                    .rename(dependent)
                    .copyProperties(image, ['system:time_start']);
                });
                var detrendedChart = ui.Chart.image.series(detrended, roi, null, 30)
                  .setOptions({
                    title: 'Detrended Landsat Time Series at ROI',
                    lineWidth: 1,
                    pointSize: 3,
                  });
                print(detrendedChart);
                      // Use these independent variables in the harmonic regression.
              var harmonicIndependents = ee.List(['constant', 't', 'cos', 'sin']);
              // Add harmonic terms as new image bands.
              var harmonicLandsat = filteredLandsat.map(function(image) {
                var timeRadians = image.select('t').multiply(2 * Math.PI);
                  return image
                    .addBands(timeRadians.cos().rename('cos'))
                    .addBands(timeRadians.sin().rename('sin'));
                });
                var harmonicTrend = harmonicLandsat
                .select(harmonicIndependents.add(dependent))
                // The output of this reducer is a 4x1 array image.
                .reduce(ee.Reducer.linearRegression({
                 numX: harmonicIndependents.length(),
                 numY: 1
                }));
                // Turn the array image into a multi-band image of coefficients.
              var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
                .arrayProject([0])
                .arrayFlatten([harmonicIndependents]);
              // Compute fitted values.
              var fittedHarmonic = harmonicLandsat.map(function(image) {
                return image.addBands(
                  image.select(harmonicIndependents)
                    .multiply(harmonicTrendCoefficients)
                    .reduce('sum')
                    .rename('fitted'));
              });
              // Plot the fitted model and the original data at the ROI.
             var plotNDVI2 = (ui.Chart.image.series(fittedHarmonic.select(['fitted', 'NDVI']), roi,
                    ee.Reducer.mean(), 30)
                .setSeriesNames(['NDVI', 'fitted'])
                .setOptions({
                  title: 'Harmonic Model: Original and Fitted Values based on NDVI values',
                  lineWidth: 1,
                  pointSize: 3
                })
              );
               Panel.widgets().set(6, plotNDVI2);
              // Compute phase and amplitude.
              var phase = harmonicTrendCoefficients.select('sin')
                .atan2(harmonicTrendCoefficients.select('cos'))
                // Scale to [0, 1] from radians.
                .unitScale(-Math.PI, Math.PI);
              var amplitude = harmonicTrendCoefficients.select('sin')
                .hypot(harmonicTrendCoefficients.select('cos'))
                // Add a scale factor for visualization.
                .multiply(5);
              // Compute the mean NDVI.
              var meanNdvi = filteredLandsat.select('NDVI').mean();
              // Use the HSV to RGB transformation to display phase and amplitude.
              var rgb = ee.Image.cat([phase, amplitude, meanNdvi]).hsvToRgb();
              // Map.addLayer(rgb, {}, 'Phase (hue), Amplitude (sat), NDVI (val)');
          // Create image collection of S-2 imagery for the perdiod 2016-2018
          var S2 = ee.ImageCollection('COPERNICUS/S2')
          //filter start and end date
          .filterDate('2020-01-01', '2030-12-31')
          //filter according to drawn boundary
          .filterBounds(fc);
          // Function to mask cloud from built-in quality band
          // information on cloud
          var maskcloud1 = function(image) {
          var QA60 = image.select(['QA60']);
          return image.updateMask(QA60.lt(1));
          };
          // Function to calculate and add an NDVI band
          var addNDVI = function(image) {
          return image.addBands(image.normalizedDifference(['B8', 'B4']));
          };
        // Add NDVI band to image collection
        var S22 = S2.map(addNDVI);
        // Extract NDVI band and create NDVI median composite image
        var NDVI = S22.select(['nd']);
        var NDVImed = NDVI.mean(); //I just changed the name of this variable ;)
        // Create palettes for display of NDVI
        var ndvi_pal = ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b',
        '#a6d96a'];
        // Create a time series chart.
        var plotNDVI = ui.Chart.image.seriesByRegion(NDVI, fc,ee.Reducer.mean(),
        'nd',30,'system:time_start', 'system:index')
                      .setChartType('LineChart').setOptions({
                        title: 'NDVI Sentinel-2 10 meter resolution ',
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'NDVI Values'}
        });
        // Display.
        // print(plotNDVI);
        Panel.widgets().set(5, plotNDVI);
        // ui.add(plotNDVI);
        // Display NDVI results on map
        // Map.addLayer(NDVImed.clip(fc), {min:-1, max:1, palette: ndvi_pal}, 'NDVI');
           // Now do the chart
      // var char2 = ui.Chart.image.seriesByRegion({
      // imageCollection: withNDVI, 
      // regions: fc, 
      // reducer: ee.Reducer.mean(), 
      // // Need to define scale
      // scale:15
      // }).setOptions({
      //     interpolateNulls: true, 
      //     lineWidth: 1, 
      //     pointSize: 3, 
      //     title: 'Overtime AOD at diff hotspots', 
      //     vAxis: {title: 'AOD Value'}, 
      //     hAxis: {title: 'Date', format: 'YYYY-MMMM', gridlines: {count: 12}},
      //     colors: ['blue', 'yellow', 'red']
      // });
      // print(char2);
      }
    });
  var textbox = ui.Textbox({
  placeholder: 'Enter Farm Id here: ',
  onChange: function(text) {
    // print('So what you are saying is ' + text + '?');\
    Map.clear();
    var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', text));
    // print(polygon)
    var area_poly = polygon.geometry().area().divide(10000).getInfo();
    print('area ha:'+ area_poly);
    Map.centerObject(polygon, 10);
    Map.addLayer(polygon.draw('ff9716'),{}, 'Farm'+text);
    // Map.addLayer(legend,{},'')
    // Map.addLayer(polygon.draw('green'),{}, 'Farm'+text)
    if (polygon === polygon){
        // Map.centerObject(table, 5)
        Map.addLayer (legend,{},'');
    }}
});
// var point = ee.Geometry.Point(Latitude, Longitude);
// print('point',point);
Panel.add(Header);
// Panel.add(Label_filter);
// Panel.add(Filter);
Panel.add(county_filter);
Panel.add(County);
// Panel.add(sur_name)
// Panel.add(sur);
Panel.add(id_number);
Panel.add(ID);
Panel.add(id_number2);
Panel.add(ID2);
// Panel.add(plotNDVI);
// Panel.add(checkbox)
// Panel.add(histo2)
// Panel.add(print('area ha:'+ area_poly))
// Panel.add(all);
ui.root.add(Panel);
// *********************************************************************************************************************************************************
// End of the user interface section (for input of the user in a GUI) **************************************************************************************
// *********************************************************************************************************************************************************
// // *********************************************************************************************************************************************************
// // Functions of the script *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
var runFARM = function(){
    Map.clear();
    AddButton();
    var Filter_ = Filter.getValue();
    var Filter_number = ee.Number.parse(countyval.replace(/-/g,'')).getInfo();
    var County_ = County.getValue();
    var County_number = ee.Number.parse(cfil.replace(/-/g,'')).getInfo();
    // var sur_ = sur.getValue();
    // var sur_number = ee.Number.parse(sur_.replace(/-/g,'')).getInfo();
    var ID_ = ID.getValue();
    var ID_number = ee.Number.parse(idnumber.replace(/-/g,'')).getInfo();
    var ID_number2 = ee.Number.parse(idnumber2.replace(/-/g,'')).getInfo();
    var ID_2 = ID2.getValue();
    var pointCoordinates = point.coordinates();
    // Map.addLayer(point,
    //         {'color': 'black'},
    //         'Geometry [black]: point');
    // print('TRIAL',ID_2);
    var all_ = all.getValue();
    var all_number = ee.Number.parse(all_.replace(/-/g,'')).getInfo();
};
// // *********************************************************************************************************************************************************
// // Application Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// Definition of study area
    // var country = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata('cc','equals',countryname); // Country border polygons of high accuracy
    // var studyarea = table; // The study area is set to above selection
    // if (Filter === 1){
    //   var fil = county.filter(ee.Filter.eq('ID', county ));
    //   Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    // }
    // if (Filter  === 3){
    //   var fil = county.filter(ee.Filter.eq('NAME', county ));
    //   // var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', county))
    //   Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    // }    
    // if (Filter === 4){
    //   var fil = county.filter(ee.Filter.eq('Approve', county ));
    //   // var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', county))
    //   Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    // } 
    // // Adjustments according to above user selections
    // if (center === true){
    //   Map.centerObject(studyarea, zoomlevel);
    // }
    // if (forest_mask_select === 'No_forest_map'){
    //   var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015_v1_3").clip(studyarea);
    //   var forest_mask = Hansen_map.select('treecover2000').gte(0); // No forest map selected
    //   Map.addLayer (forest_mask,{},'No Forest map',false);
    // }
// var AddButton = function(){
//       var button = ui.Button('Run Visualizer');
//       button.style().set({
//         position: 'top-center',
//         border : '1px solid #000000',
//         color : '#0e4a1c',
//       });
//       button.onClick(function(){return runFARM()});
//       Map.add(button);
// }
// AddButton();
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // *********************************************************************************************************************************************************
// // Start of Legend Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
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
var palette =['FF0000', '22ff00'];
// name of the legend
var names = ['Not Approved','Approved'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
// ui.root.add(legend);
// // Source: https://developers.google.com/earth-engine/ui_panels
// // Load and display NDVI data.
// Map.centerObject(table);
// var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
//     .filterDate('2022-01-01', '2022-04-01');
// var S2_SR = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(geometry);
// // Map.addLayer(ndvi.median().clip(table), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
// // Configure the map.
// // Map.setCenter(-94.84497, 39.01918, 8);
// Map.style().set('cursor', 'crosshair');
// // var id_number = ui.Label('Input ID Number',{fontWeight: 'bold'});
// //     var ID = ui.Textbox({
// //       placeholder: 'Enter ID',
// //       onChange: function(text) {
// //       Map.clear();
// //         var polygon = county.filter(ee.Filter.eq('NAME', text));
// //         var area_poly = polygon.geometry().area().divide(10000).getInfo();
// //         print('area ha:'+ area_poly);
// //         Map.centerObject(polygon, 10);
// //         Map.addLayer(polygon.draw('ff9716'),{}, 'Farm'+text);
// //       }
// //     });
// var label_Start_second_select = ui.Label('Latitude');
// var Start_second_select = ui.Textbox({
//   value: '1.3422',
//   style: {width : '150px', height: '50px'},
//   onChange: function(text) {
//     Map.clear();
//     var lat = ee.Number.parse(text);
//     print('lat',lat);
//     return lat;
//   }
// });
// var label_End_second_select = ui.Label('Longitude');
//   var End_second_select = ui.Textbox({
//   value: '36.22345',
//   style: {width : '150px', height: '50px', textAlign: 'right'},
//   onChange: function(text) {
//     Map.clear();
//     var longg = ee.Number.parse(text);
//     print('long',longg);
//     // var location2 = 'lon: ' + lat.toFixed(2) + ' ' +
//     //             'lat: ' + ''longg.toFixed(2);
//     // print('End_second_select',End_second_select)
//     return longg;
//   }
// });
// // print('End_second_select',End_second_select);
// // var lonng = ee.Number.parse(End_second_select);
// // var latttt = ee.Number.parse(Start_second_select);
// // var point2 = ee.Geometry.Point(latttt, lonng);
// // var pointCoordinates = point2.coordinates();
// // Map.addLayer(point2,
// //             {'color': 'black'},
// //             'Geometry [black]: point');
// // onChange: function(text) {
// //     Map.clear();
// //     var longg = ee.Number.parse(text);
// //     print('long',longg);
// //     // var location2 = 'lon: ' + lat.toFixed(2) + ' ' +
// //     //             'lat: ' + ''longg.toFixed(2);
// //     // print('End_second_select',End_second_select)
// //     return longg;
// //   }
// // var location22 = 'lon: ' + latttt + ' ' +
// //                 'lat: ' + lonng;
// // panel.widgets().set(1, ui.Label(lonng));
// // print('latttt',latttt);
// // print('End_second_select',End_second_select);
// // var location2 = 'lon: ' + lat.toFixed(2) + ' ' +
// //                 'lat: ' + longg.toFixed(2);
// // print('location2',location2);
// // function plotting(coords) {
// //   onChange: function(text) {
// //     Map.clear();
// //     var longg = ee.Number.parse(text);
// //     print('long',longg);
// //     // var location2 = 'lon: ' + lat.toFixed(2) + ' ' +
// //     //             'lat: ' + ''longg.toFixed(2);
// //     print('location2',location2);
// //     return longg;
// //   // Create or update the location label (the second widget in the panel)
// //   var location = 'lon: ' + coords.lat.toFixed(2) + ' ' +
// //                 'lat: ' + coords.longg.toFixed(2);
// //   panel.widgets().set(1, ui.Label(location));
// //   // ui.Textbox(placeholder, value, onChange, disabled, style);
// //   // var text = Textbox.onChange(
// //   // Add a red dot to the map where the user clicked.
// //   var point = ee.Geometry.Point(coords.lat, coords.longg);
// //   print('point',point);
// //   Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
// //   var NDVI_images = withNDVI.select('NDVI');
// //   // Create a chart of NDVI over time.
// //   var chart = ui.Chart.image.series(NDVI_images, point, ee.Reducer.mean(), 100)
// //       .setOptions({
// //         title: 'NDVI time series',
// //         vAxis: {title: 'NDVI'},
// //         lineWidth: 1.5,
// //         pointSize: 4,
// //       });
// //   // Add (or replace) the third widget in the panel by
// //   // manipulating the widgets list.
// //   panel.widgets().set(2, chart);
// // }
// // var image = 
// Map.onClick(function(coords) {
//   // Create or update the location label (the second widget in the panel)
//   var location = 'lon: ' + coords.lat.toFixed(2) + ' ' +
//                 'lat: ' + coords.lonng.toFixed(2);
//   panel.widgets().set(1, ui.Label(location));
//   // ui.Textbox(placeholder, value, onChange, disabled, style);
//   // var text = Textbox.onChange(
//   // Add a red dot to the map where the user clicked.
//   var point = ee.Geometry.Point(coords.lat, coords.longg);
//   print('point',point);
//   Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
//   var NDVI_images = withNDVI.select('NDVI');
//   // Create a chart of NDVI over time.
//   var chart = ui.Chart.image.series(NDVI_images, point, ee.Reducer.mean(), 100)
//       .setOptions({
//         title: 'NDVI time series',
//         vAxis: {title: 'NDVI'},
//         lineWidth: 1.5,
//         pointSize: 4,
//       });
//   // Add (or replace) the third widget in the panel by
//   // manipulating the widgets list.
//   panel.widgets().set(2, chart);
// });
// var runFARM = function(){
//     Map.clear();
//     AddButton();
//     var Filter_ = Start_second_select.getValue();
//     var Filter_number = ee.Number.parse(longg.replace(/-/g,'')).getInfo();
//     var County_ = County.getValue();
//     var County_number = ee.Number.parse(cfil.replace(/-/g,'')).getInfo();
//     // var sur_ = sur.getValue();
//     // var sur_number = ee.Number.parse(sur_.replace(/-/g,'')).getInfo();
//     var ID_ = ID.getValue();
//     var ID_number = ee.Number.parse(idnumber.replace(/-/g,'')).getInfo();
//     var all_ = all.getValue();
//     var all_number = ee.Number.parse(all_.replace(/-/g,'')).getInfo();
// };
// // var Start_base_number = ee.Number.parse(Start_base.replace(/-/g,'')).getInfo();
// // // var End_base = End_base_select.getValue();
// // var Start_second = Start_second_select.getValue();
// // print('Start_second_select',Start_second);
// // var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo();
// // print(Start_second_number);
// // var End_second = End_second_select.getValue();
// // print('End_second_select',End_second);
// // var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
// // print(End_second_number);
// // // Create an empty panel in which to arrange widgets.
// // // The layout is vertical flow by default.
// // var panel = ui.Panel({style: {width: '600px', height:'800px',color:'#283d2e', 
// // backgroundColor: '#b5c4b9',  fontSize: '30px', fontWeight:'bold'}})
// //     .add(ui.Label('Click on the map'));
// // // // Set a callback function for when the user clicks the map.
// panel.add(label_Start_second_select);
// panel.add(Start_second_select);
// panel.add(label_End_second_select);
// panel.add(End_second_select);
// // // Add the panel to the ui.root.
// ui.root.add(panel);
// // /Import GEE Feature Collection (Somaliland kml)
// var geometry = roi;
// // Create image collection of S-2 imagery for the perdiod 2016-2018
// var S2 = ee.ImageCollection('COPERNICUS/S2')
// //filter start and end date
// .filterDate('2018-09-01', '2018-10-31')
// //filter according to drawn boundary
// .filterBounds(geometry);
// // Function to mask cloud from built-in quality band
// // information on cloud
// var maskcloud1 = function(image) {
// var QA60 = image.select(['QA60']);
// return image.updateMask(QA60.lt(1));
// };
// // Function to calculate and add an NDVI band
// var addNDVI = function(image) {
// return image.addBands(image.normalizedDifference(['B8', 'B4']));
// };
// // Add NDVI band to image collection
// var S2 = S2.map(addNDVI);
// // Extract NDVI band and create NDVI median composite image
// var NDVI = S2.select(['nd']);
// var NDVImed = NDVI; //I just changed the name of this variable ;)
// // Create palettes for display of NDVI
// var ndvi_pal = ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b',
// '#a6d96a'];
// // Create a time series chart.
// var plotNDVI = ui.Chart.image.seriesByRegion(S2, geometry,ee.Reducer.mean(),
// 'nd',10,'system:time_start', 'system:index')
//               .setChartType('LineChart').setOptions({
//                 title: 'NDVI short-term time series',
//                 hAxis: {title: 'Date'},
//                 vAxis: {title: 'NDVI'}
// });
// // Display.
// // print(plotNDVI);
// // Display NDVI results on map
// Map.addLayer(NDVImed.clip(geometry), {min:-0.5, max:0.9, palette: ndvi_pal}, 'NDVI');