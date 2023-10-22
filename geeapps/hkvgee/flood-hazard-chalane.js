var cummulative_precip = ui.import && ui.import("cummulative_precip", "image", {
      "id": "users/hkvgee/chalane_prec_cum_202012290330_202012300600"
    }) || ee.Image("users/hkvgee/chalane_prec_cum_202012290330_202012300600");
var countries = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var Country = countries.filter(ee.Filter.eq('ADM0_NAME', 'Mozambique'))
Map.centerObject(Country, 6)
// Global HAND
// Donchyts et al., Global 30m Height Above the Nearest Drainage
var hand = ee.ImageCollection('users/gena/global-hand/hand-100').mosaic().clip(Country)
var colors_hand = ['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf',
'fee08b', 'fdae61', 'f46d43', 'd73027'];
// var max_hand = hand.reduceRegion({
//   reducer: ee.Reducer.max(),
//   geometry: Country.geometry(),
//   scale: 30,
//   maxPixels: 1e9
// });
//Inverse of HAND - areas easier to inundate now have higher value
var hand_max = hand.updateMask(hand.lt(5));
var hand_inv = hand_max.multiply(-1)
var hand_invtot = hand_inv.add(1105);
Map.addLayer(hand, {min: 0, max: 200, palette: colors_hand}, 'Height Above Nearest Drainage (m)',false)
// Map.addLayer(hand_max, {min: 0, max: 200, palette: colors_hand}, 'Height Above Nearest Drainage 2 (m)')
// //Rainfall products check availability
// var Chirps_dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
//                           .filterDate('2020-12-28','2020-12-30');
// print('Chirps_dataset', Chirps_dataset);
// var PERSIANN_dataset = ee.ImageCollection('NOAA/PERSIANN-CDR')
//                           .filterDate('2020-12-28','2020-12-30');
// print('PERSIANN_dataset', PERSIANN_dataset);
// var CFSV2_dataset = ee.ImageCollection('NOAA/CFSV2/FOR6H')
//                           .filterDate('2020-12-28','2020-12-30')
//                           .select('Precipitation_rate_surface_6_Hour_Average');
// print('CFSV2_dataset', CFSV2_dataset);
// var TRMM_dataset = ee.ImageCollection('TRMM/3B42')
//                           .filterDate('2020-12-28','2020-12-30')
//                           .select('precipitation');
// print('TRMM_dataset', TRMM_dataset);
// var GLDAS_dataset = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
//                           .filterDate('2020-12-28','2020-12-30')
//                           .select('Rainf_tavg');
// print('GLDAS_dataset', GLDAS_dataset);
//GPM measured - RUUD HURKMANS
//van 29-12-2020 03:30 GTM tot 30-12-2020 06:00 GTM
    var cummulative_precip_clip = cummulative_precip.clip(Country)
    var colors_precip = ['008000', 'FFFF00', 'FF0000']
    Map.addLayer(cummulative_precip_clip, {min: 0, max: 200, palette: colors_precip}, 'Cumulative precipitation 11/29-11/30 (mm)',false)
// var gpm_dataset = ee.ImageCollection("NASA/GPM_L3/IMERG_V06")
//                         .filterDate('2020-12-25','2020-12-29')
//                         .select('precipitationCal');
// print('gpm_dataset', gpm_dataset);
// // Define colour palette and visualization parameters
// var palette =
// ['000096','0064ff','00b4ff','33db80','9beb4a',
// 'ffeb00','ffb300','ff6400','eb1e00','af0000'];
// // Calculate the total precipitaiton between 2019-03-03 and 2019-03-17
// var prec_total = gpm_dataset.sum().divide(2);
// var prec_total_gtm = prec_total.clip(Country);
// var prec_vis2 = {min: 0.0, max: 90, palette: palette};
// Map.addLayer(prec_total_gtm, prec_vis2, 'GPM total prec. [2019-11-16, 2019-11-19] (mm)' )
// data calculation
// 1609156800000
// 1609200000000 - Tuesday, 29 December 2020 00:00:00
// 1609221600000 - Tuesday, 29 December 2020 06:00:00
// 1609243200000 - Tuesday, 29 December 2020 12:00:00
// 1609264800000 - Tuesday, 29 December 2020 18:00:00
// 1609286400000 - Wednesday, 30 December 2020 00:00:00
// 1609308000000 - Wednesday, 30 December 2020 06:00:00 
// GFS - created: Monday, 29 December 2020 00:00:00
// ORIGINAL FULL FORECAST
var GFS_original = ee.ImageCollection("NOAA/GFS0P25")
                .filterMetadata('creation_time', 'equals', 1609221600000) 
                .filterMetadata('forecast_hours', 'greater_than', 0)
                .filterBounds(Country)
                .select("total_precipitation_surface");
var total_6days_o = GFS_original.filterMetadata('forecast_hours', 'equals', 144)
var total_2days_o = GFS_original.filterMetadata('forecast_hours', 'equals', 72)
var total_6days_o = total_6days_o.sum().clip(Country);
var total_2days_o = total_2days_o.sum().clip(Country);
var palette = ['000096','0064ff','00b4ff','33db80','9beb4a', 'ffeb00','ffb300','ff6400','eb1e00','af0000'];
var prec_vis = {min: 0.0, max: 200.0, palette: palette}; 
// multiply inverse hand with precipitation. Idea is that were there is more rain and hand is low there is high
// inundation risk
var inun_risk_2days_o = hand_invtot.multiply(total_2days_o);
var inun_risk_6days_o = hand_invtot.multiply(total_6days_o);
var inun_risk_2days_o = inun_risk_2days_o.updateMask(inun_risk_2days_o.gt(20000));
var inun_risk_6days_o = inun_risk_6days_o.updateMask(inun_risk_6days_o.gt(60000));
var colors_inundationhazard = ['00d2ff', '0000FF']
// Map.addLayer(hand, {min: 0, max: 150, palette: colors_hand}, 'Height Above Nearest Drainage (m)')
Map.addLayer(inun_risk_2days_o,{min: 20000, max: 40000, palette: colors_inundationhazard},'Inundation hazard forecast (3 days from 29-12-2020 06:00 GMT)', false)
Map.addLayer(inun_risk_6days_o,{min: 60000, max: 120000, palette: colors_inundationhazard},'Inundation hazard forecast (6 days from 29-12-2020 06:00 GMT)', false)
Map.addLayer(total_2days_o, prec_vis, 'GFS forecast 3 days from 29-12-2020 06:00 GMT (mm)', false)
Map.addLayer(total_6days_o, prec_vis, 'GFS forecast 6 days from 29-12-2020 06:00 GMT (mm)', false)
// GFS forecast - created: Wednesday, 30 December 2020 00:00:00
// SECOND VERSION HYBRID WITH RAINFALL MEASUREMENTS
var GFS = ee.ImageCollection("NOAA/GFS0P25")
                .filterMetadata('creation_time', 'equals', 1609286400000) 
                .filterMetadata('forecast_hours', 'greater_than', 0)
                .filterBounds(Country)
                .select("total_precipitation_surface");
print('GFS',GFS)
// var collection = ee.ImageCollection("NOAA/GFS0P25")
//                 .select('precipitable_water_entire_atmosphere')       
//                 .filter(ee.Filter.eq('creation_time',ee.Date(0).update(2020,12,30,6,0,0).millis()))
//                 .filter(ee.Filter.eq('forecast_hours',72));
// print('test',collection)
// less days necessary because of GPM data until 30 december 06:00 GTM
var total_first6hours = GFS.filterMetadata('forecast_hours','equals',6) // because the forecast is not done yet at 06:00 GTM but 6 hours earlier we should subtract this precipitation from the total
var total_6days = GFS.filterMetadata('forecast_hours', 'equals', 120)
var total_2days = GFS.filterMetadata('forecast_hours', 'equals', 48)
print(total_2days)
var total_first6hours_GFS = total_first6hours.sum().clip(Country)
var total_6days_GFSfalse = total_6days.sum().clip(Country);
var total_2days_GFSfalse = total_2days.sum().clip(Country);
var total_6days_GFS = total_6days_GFSfalse.subtract(total_first6hours_GFS);
var total_2days_GFS = total_2days_GFSfalse.subtract(total_first6hours_GFS);
var total_6days = total_6days_GFS.add(cummulative_precip_clip);
var total_2days = total_2days_GFS.add(cummulative_precip_clip);
var palette = ['000096','0064ff','00b4ff','33db80','9beb4a', 'ffeb00','ffb300','ff6400','eb1e00','af0000']; 
// var prec_vis_6days = {min: 0.0, max: 200.0, palette: palette}; 
// multiply inverse hand with precipitation. Idea is that were there is more rain and hand is low there is high
// inundation risk
var inun_risk_2days = hand_invtot.multiply(total_2days);
var inun_risk_6days = hand_invtot.multiply(total_6days);
// var inun_6_gt_2 = inun_risk_6days.updateMask(inun_risk_6days.gt(inun_risk_3days.multiply(3)))
// var inun_6_lt_2 = inun_risk_2days.updateMask(inun_risk_2days.gt(inun_risk_6days.divide(3))).multiply(3)
// // var inun_6_to_2 = inun_6_gt_2.add(inun_6_lt_2)
var inun_risk_2days = inun_risk_2days.updateMask(inun_risk_2days.gt(20000));
var inun_risk_6days = inun_risk_6days.updateMask(inun_risk_6days.gt(60000));
// var inun_6_to_2 = inun_6_to_2.updateMask(inun_6_to_2.gt(90000));
var colors_inundationhazard = ['00d2ff', '0000FF']
// .add(inun_risk_6days.updateMask(inun_risk_2days.gt(inun_risk_6days.divide(3)))
// Map.addLayer(hand, {min: 0, max: 150, palette: colors_hand}, 'Height Above Nearest Drainage (m)')
Map.addLayer(inun_risk_2days,{min: 20000, max: 40000, palette: colors_inundationhazard},'Hybrid Inundation hazard (3 days from 29-12-2020 06:00 GMT; GPM & GFS)')
Map.addLayer(inun_risk_6days,{min: 60000, max: 120000, palette: colors_inundationhazard},'Hybrid Inundation hazard (6 days from 29-12-2020 06:00 GMT; GPM & GFS)', false)
Map.addLayer(total_2days, prec_vis, 'GPM measurement and GFS forecast 3 days from 29-12-2020 06:00 GMT (mm)', false)
Map.addLayer(total_6days, prec_vis, 'GPM measurement and GFS forecast 6 days from 29-12-2020 06:00 GMT (mm)', false)
// Map.addLayer(inun_6_to_2,{min: 90000, max: 150000, palette: colors_inundationhazard},'Inundation hazard (2-6 days)')
// Map.addLayer(inun_6_lt_2,{min: 90000, max: 150000, palette: colors_inundationhazard},'Inundation hazard (6lt2 days)')
// Map.addLayer(inun_6_gt_2,{min: 90000, max: 150000, palette: colors_inundationhazard},'Inundation hazard (6gt2 days)')
//------------------------------function for legend---------------------------------//
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
//-------------------------------------------------set panels-----------------------------------//
  // set position of panel
  var legend = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      height: '200px',
      width: '250px',
      position: 'bottom-left',
      padding: '8px 15px'
    }
  });
      // Create legend title, Add the title to the panel
    var legendTitle_left = ui.Label({
      value: 'Legends',
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
        }
    });
    legend.add(legendTitle_left);
// //-------------------------------------------fill middle panel------------------------//  
// Create the title label.
var title = ui.Label('Select other layers at the layers panel on the right');
title.style().set('position', 'top-center');
Map.add(title);
//   // set position of panel
//   var panel = ui.Panel({
//     style: {
//       width: '1000px',
//       position: 'top-center',
//       padding: '20px 150px'
//     }
//   });
//     // Create legend title, Add the title to the panel
//     var title = ui.Label({
//       value: '',
//       style: {
//         fontWeight: 'bold',
//         fontSize: '14px',
//         margin: '0 0 4px 0',
//         padding: '0'
//         }
//     });
//     panel.add(title);
// //     //  Palette with the colors, name of the legend
// //     var palette =['00d2ff', '0000FF'];
// //     var names = ['Medium','High']
//     // Add color and and names
//     for (var i = 0; i < 2; i++) {
//       legend_middle_landhazard.add(makeRow(palette[i], names[i]));
//       }
// Map.add(legend_middle_landhazard);
//-------------------------------------------fill left panel------------------------//  
     ////inundation hazard legend
    // Create legend title, Add the title to the panel
    var legendTitle_inundationhazardmap = ui.Label({
      value: 'Inundation hazard',
      style: {
        // fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 4px 0',
        padding: '0'
        }
    });
    legend.add(legendTitle_inundationhazardmap);
    //  Palette with the colors, name of the legend
    var palette =['00d2ff', '0000FF'];
    var names = ['Medium','High']
    // Add color and and names
    for (var i = 0; i < 2; i++) {
      legend.add(makeRow(palette[i], names[i]));
      }
    // Create legend title, Add the title to the panel
    var legendTitle_deforest = ui.Label({
      value: 'Cumulative precipitation (mm)',
      style: {
        // fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 0 4px 0',
        padding: '0'
        }
    });
    legend.add(legendTitle_deforest);
    //  Palette with the colors, name of the legend
    // var palette =['008000', 'FFFF00', 'FF0000'];
    // var palette = ['000096','0064ff','00b4ff','33db80','9beb4a', 'ffeb00','ffb300','ff6400','eb1e00','af0000']; 
    var palette = ['000096','00b4ff','9beb4a', 'ffb300','eb1e00','af0000']; 
    var names = ['0', '50','100', '150', '>200'];
    // Add color and and names
    for (var i = 0; i < 5; i++) {
      legend.add(makeRow(palette[i], names[i]));
      }   
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Map.add(title);