var conflictCentroids = ui.import && ui.import("conflictCentroids", "table", {
      "id": "users/lgoldberg8000/Conflict_Centroids"
    }) || ee.FeatureCollection("users/lgoldberg8000/Conflict_Centroids"),
    originalTable = ui.import && ui.import("originalTable", "table", {
      "id": "users/lgoldberg8000/Jan1_through_March28_ConflictData_Pivot_v2"
    }) || ee.FeatureCollection("users/lgoldberg8000/Jan1_through_March28_ConflictData_Pivot_v2");
// var land = landwaterMask.select('water_mask').eq(0).selfMask()
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var panelMain = ui.Panel()
panelMain.style().set({
  // maxHeight: '800px',
  maxWidth: '450px',
  position: 'top-left',
  // opacity: '0.5'
});
// Map.add(panelMain)
var title = ui.Label({
  value: 'Global Conflict under Coronavirus',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'The onset of the COVID-19 pandemic has prompted a global decrease in total conflict, including protests, battles, remote violence, riots, and strategic developments. '+
  'This app models changes in national to global conflict levels from February through the present.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var text2 = ui.Label({
  value: 'Hotspot size corresponds to total number of conflict events in March 2020. Color corresponds to the relative change in number of conflict events between March 1-14 and March 15-28.',
  // 'This app models changes in national to global conflict levels from February through the present.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 8px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
panelMain.add(title)
panelMain.add(text)
var mainInfoPanel = ui.Panel({style: 
{
//   border:'4px solid rgba(97, 97, 97, 0.05)',
// padding: '0px 0px 0px 8px '
}})
panelMain.add(mainInfoPanel)
// mainInfoPanel.style({
//   fontWeight: 'bold',
//     color: '#9E9E9E',
//     padding: '8px',
//     // backgroundColor: colors.transparent,
//     border: '4px solid rgba(97, 97, 97, 0.05)'
// })
var infoPanel = ui.Label({
  value: 'Click on a country to calculate national statistics.', 
  style: {padding: '0px 0px 0px 8px '}
})
var infoPanel2 = ui.Label({
  value: 'Total Global Conflict Events March 1-14: 13052 ',
  style: {padding: '0px 0px 0px 8px '}
})
var infoPanel3 = ui.Label({
  value: 'Total Global Conflict Events March 15-28: 10732 ',
style: {padding: '0px 0px 0px 8px '}
})
var panelChart = ui.Panel()
panelMain.add(panelChart)
var originalTable = ee.FeatureCollection('users/lgoldberg8000/Jan1_through_March28_ConflictData_Pivot_v2')
// print(originalTable)
var globalTable = originalTable.filterMetadata('Row Labels', 'equals', 'Grand Total')
// print(globalTable, 'global')
var chart1 =
  ui.Chart.feature.byProperty(ee.Feature(globalTable.first()), ['2/01/2020','2/02/2020','2/03/2020','2/04/2020','2/05/2020','2/06/2020','2/07/2020',
  '2/08/2020','2/9/2020','2/10/2020','2/11/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020',
  '2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/01/2020', '3/02/2020','3/03/2020','3/04/2020','3/05/2020','3/06/2020','3/07/2020',
  '3/08/2020','3/09/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020',
'3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020'])
    .setChartType('ScatterChart')
    .setSeriesNames(['0000000000000'])
    .setOptions({
      title: 'Total Number of Global Conflicts Feb-March 2020',
      hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Number of Conflicts'
      },
      lineWidth: 1,
      pointSize: 3,
      legend: {position: 'none'},
      colors: ['#0868ac']
    });
    panelChart.clear()
    panelChart.add(chart1)
// Remap all of the property values to their correct values for charting. 
originalTable = originalTable.select(['1/1/2020', '1/2/2020', '1/3/2020','1/4/2020','1/5/2020','1/6/2020','1/7/2020','1/8/2020','1/9/2020','1/10/2020',
  '1/11/2020','1/12/2020','1/13/2020','1/14/2020','1/15/2020','1/16/2020','1/17/2020','1/18/2020','1/19/2020','1/20/2020','1/21/2020','1/22/2020','1/23/2020',
  '1/24/2020','1/25/2020','1/26/2020','1/27/2020','1/29/2020','1/30/2020','1/31/2020','2/1/2020','2/2/2020','2/3/2020','2/4/2020','2/5/2020','2/6/2020','2/7/2020',
  '2/8/2020','2/9/2020','2/10/2020','2/11/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020',
  '2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/1/2020', '3/2/2020','3/3/2020','3/4/2020','3/5/2020','3/6/2020','3/7/2020',
  '3/8/2020','3/9/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020',
'3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020', 'Row Labels'], 
['1/01/2020', '1/02/2020', '1/03/2020','1/04/2020','1/05/2020','1/06/2020','1/07/2020','1/08/2020','1/09/2020','1/10/2020',
  '1/11/2020','1/12/2020','1/13/2020','1/14/2020','1/15/2020','1/16/2020','1/17/2020','1/18/2020','1/19/2020','1/20/2020','1/21/2020','1/22/2020','1/23/2020',
  '1/24/2020','1/25/2020','1/26/2020','1/27/2020','1/29/2020','1/30/2020','1/31/2020','2/01/2020','2/02/2020','2/03/2020','2/04/2020','2/05/2020','2/06/2020','2/07/2020',
  '2/08/2020','2/9/2020','2/10/2020','2/11/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020',
  '2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/01/2020', '3/02/2020','3/03/2020','3/04/2020','3/05/2020','3/06/2020','3/07/2020',
  '3/08/2020','3/09/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020',
'3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020', 'Row Labels'])
Map.onClick(function(coords){
  var selection = ee.Feature((conflictCentroids.filterBounds(ee.Geometry.Point([coords.lon, coords.lat])).first()));
  selection.get('Country').getInfo(function(i) {
    // print(i)
    infoPanel.setValue('Country: ' + i);
  });
   selection.get('First Two Weeks').getInfo(function(i) {
    infoPanel2.setValue('Total National Conflict Events March 1-14: ' + i);
  });
  selection.get('Last Week').getInfo(function(i) {
    infoPanel3.setValue('Total National Conflict Events March 15-28 : ' + i);
  });
var country = selection.get('Country')
print(country)
var filtered = ee.Feature(originalTable.filterMetadata('Row Labels', 'equals', country).first())
var countryName = filtered.get('Row Labels')
// Prepare the chart.
var chart1 =
  ui.Chart.feature.byProperty(filtered, ['2/01/2020','2/02/2020','2/03/2020','2/04/2020','2/05/2020','2/06/2020','2/07/2020',
  '2/08/2020','2/9/2020','2/10/2020','2/11/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020',
  '2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/01/2020', '3/02/2020','3/03/2020','3/04/2020','3/05/2020','3/06/2020','3/07/2020',
  '3/08/2020','3/09/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020',
'3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020'])
    .setChartType('ScatterChart')
    .setSeriesNames(['0000000000000'])
    .setOptions({
      title: 'Total Conflict Events Feb-March 2020, '+ countryName.getInfo(),
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Number of Conflicts'
      },
      lineWidth: 1,
      pointSize: 3,
      legend: {position: 'none'},
      colors: ['#0868ac']
    });
    panelChart.clear()
    panelChart.add(chart1)
})
mainInfoPanel.add(infoPanel)
mainInfoPanel.add(infoPanel2)
mainInfoPanel.add(infoPanel3)
var button = ui.Button({
  label: 'Global Statistics',
  onClick: function() {
        infoPanel.setValue('Click on a country to calculate national statistics.' );
        infoPanel2.setValue('Total Global Conflict Events March 1-14: 13052 ');
        infoPanel3.setValue('Total Global Conflict Events March 15-28: 10732 ');
         var chart1 =
  ui.Chart.feature.byProperty(ee.Feature(globalTable.first()), ['2/01/2020','2/02/2020','2/03/2020','2/04/2020','2/05/2020','2/06/2020','2/07/2020',
  '2/08/2020','2/9/2020','2/10/2020','2/11/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020',
  '2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/01/2020', '3/02/2020','3/03/2020','3/04/2020','3/05/2020','3/06/2020','3/07/2020',
  '3/08/2020','3/09/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020',
'3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020'])
    .setChartType('ScatterChart')
    .setSeriesNames(['0000000000000'])
    .setOptions({
      title: 'Total Number of Global Conflicts March 2020',
      hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Number of Conflicts'
      },
      lineWidth: 1,
      pointSize: 3,
      legend: {position: 'none'},
      colors: ['#0868ac']
    });
    panelChart.clear()
    panelChart.add(chart1)
  }
});
button.style().set({
  // maxHeight: '800px',
  padding: '0px 0px 0px 8px'
  // opacity: '0.5'
});
panelMain.add(button);
var vis = {min:0, max:0.6, palette:['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']};
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'}, 
    style: { padding: '0px 0px 0px 8px',
      maxHeight: '100px'
    }
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label('3/01'), 
      ui.Label({style: {stretch: 'horizontal', padding: '0px 0px 0px 8px'}}), 
      ui.Label('3/28')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '280px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel).add(thumb);
}
// LEGEND FOR FIRST MAP *****************************************************************************
var vis2 = {min:0, max:0.6, palette:['#0868ac', '#43a2ca', '#7bccc4', '#bae4bc', '#f0f9e8', 'FFFFFF', '#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']};
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'}, 
    style: { padding: '0px 0px 0px 8px',
      maxHeight: '100px'
    }
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('-250'), 
      ui.Label({style: {stretch: 'horizontal', padding: '0px 0px 0px 8px'}}), 
      ui.Label('+250')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '280px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
var centroidsImg = conflictCentroids.reduceToImage({
  properties: ['Difference'],
  reducer: ee.Reducer.first()
})
// Map.addLayer(centroidsImg, {}, 'centroids image')
var decrease = centroidsImg.updateMask(centroidsImg.lt(0).selfMask()).visualize({min: -250, max: 0, palette: ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac']})
var noChange = centroidsImg.updateMask(centroidsImg.eq(0).selfMask()).visualize({palette: ['000000']})
var increase = centroidsImg.updateMask(centroidsImg.gt(0).selfMask()).visualize({min: 0, max: 250, palette: ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']})
var blend = decrease.blend(noChange).blend(increase)
Map.addLayer(blend, {}, 'Hotspots of Conflict')
var conflictCentroidsCheckbox = ui.Checkbox('Hotspots of Conflict', true);
conflictCentroidsCheckbox.onChange(function(checked) {
Map.layers().get(0).setShown(checked);
});
conflictCentroidsCheckbox.style().set({padding: '0px 0px 0px 8px '})
panelMain.add(conflictCentroidsCheckbox)
panelMain.add(text2);
panelMain.add(makeLegend2(vis2));
// CHART***********************************************************************************************************************
// originalTable = originalTable.select(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', 'Country'], 
//                       ['3/01', '3/02','3/03','3/04','3/05','3/06','3/07','3/08','3/09','3/10','3/11','3/12','3/13','3/14','3/15','3/16','3/17','3/18','3/19','3/20','3/21','3/22',
//                       '3/23','3/24','3/25','3/26','3/27','3/28','Country'])
// var filtered = ee.Feature(originalTable.filterMetadata('Country', 'equals', 'Global').first())
// var line2 = ui.Label({
//   value: '____________________________',
//   style: {fontWeight: 'bold',
//     fontSize: '32px',
//     padding: '0px 0px 0px 8px ',
//     color: '#616161',}
// })
// // panelMain.add(line2)
// // Prepare the chart.
// var chart1 =
//   ui.Chart.feature.byProperty(filtered, ['3/01', '3/02','3/3','3/04','3/05','3/06','3/07','3/08','3/09','3/10','3/11','3/12','3/13','3/14','3/15','3/16','3/17','3/18','3/19','3/20','3/21','3/22',
//                       '3/23','3/24','3/25','3/26','3/27','3/28'])
//     .setChartType('ScatterChart')
//     .setSeriesNames(['0000000000000'])
//     .setOptions({
//       title: 'Total Number of Global Conflicts March 2020',
//       hAxis: {
//         title: 'Month'
//       },
//       vAxis: {
//         title: 'Number of Conflicts'
//       },
//       lineWidth: 1,
//       pointSize: 3,
//       legend: {position: 'none'},
//       colors: ['#0868ac']
//     });
//     panelMain.add(chart1)
var attribution = ui.Label({
  value: 'This application was developed using the ACLED global conflict dataset. For information on ACLED methodology, please click here. ',
  style: {
    // fontSize: '32px',
    padding: '0px 0px 0px 8px ',
    color: '#616161',}
}).setUrl('https://acleddata.com/#/dashboard')
panelMain.add(attribution)
Map.setCenter(14.410298409359221, 27.824209592472915, 3)
ui.root.insert(0, panelMain)
var style = require('users/gena/packages:style')
style.SetMapStyleDark()