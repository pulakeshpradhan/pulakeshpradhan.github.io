var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                99.07769567910603,
                0.570039975532141
              ],
              [
                99.07769567910603,
                0.5340785870086532
              ],
              [
                99.13408644143513,
                0.5340785870086532
              ],
              [
                99.13408644143513,
                0.570039975532141
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[99.07769567910603, 0.570039975532141],
          [99.07769567910603, 0.5340785870086532],
          [99.13408644143513, 0.5340785870086532],
          [99.13408644143513, 0.570039975532141]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/arinnasution55/MuaraBtgNatal_2000_2001"
    }) || ee.FeatureCollection("users/arinnasution55/MuaraBtgNatal_2000_2001"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/arinnasution55/MuaraBtgNatal_2010_2011"
    }) || ee.FeatureCollection("users/arinnasution55/MuaraBtgNatal_2010_2011"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/arinnasution55/MuataBtgNatal_2020_2021"
    }) || ee.FeatureCollection("users/arinnasution55/MuataBtgNatal_2020_2021"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDTI 2020-2021"
        ],
        "min": -0.12465181058495822,
        "max": 0.4632418069087688,
        "palette": [
          "d7191c",
          "fdae61",
          "ffffbf",
          "abdda4",
          "2b83ba"
        ]
      }
    }) || {"opacity":1,"bands":["NDTI 2020-2021"],"min":-0.12465181058495822,"max":0.4632418069087688,"palette":["d7191c","fdae61","ffffbf","abdda4","2b83ba"]};
//////////Satellite background\\\\\\\\\\\\\\
Map.setOptions('satellite')
Map.setCenter(99.10949, 0.55192, 15);
////////////////////////HillShade\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// var dataset = ee.Image("USGS/SRTMGL1_003");
// var elevation = dataset.select('elevation').clip(geometry);
// var hs = ee.Terrain.hillshade(elevation)
// Map.addLayer(hs, {min: 0, max: 255, palette: ['black', 'white']}, 'Hillshade')
// Export.image.toDrive({
//   image: hs, 
//   description:'BtgNatalHS', 
//   folder: 'Google Earth Engine',
//   region: geometry,
//   scale : 30,
//   maxPixels: 1e13
// })
/////////////////////////2000-2001\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                  .filterDate('2000-01-01', '2001-12-31')
                  .filterBounds(table)
                  .map(cloudMaskL457)
                  .median()
                  .clip(table)
var visParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
// Map.addLayer(dataset, visParams, '2000-2001');
//NDTI ALGORITHM
var red = dataset.select('B3');
var green =dataset.select('B2')
var NDTI20002001= green.subtract(red).divide(green.add(red)).rename("NDTI 2000-2001");
var NDTIparam = {min: -0.09055741164058378, max: 0.386046511627907, palette:['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']};
// Map.addLayer(NDTI20002001, NDTIparam, 'NDTI 2000-2001')
///NDTI Charts 2000-2001
var NDTICharts1 = ui.Chart.image.histogram(NDTI20002001, table, 30)
                .setSeriesNames(['NDTI 2000-2001'])
                .setOptions({
                  title: 'NDTI Histogram 2000-2001',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NDTICharts1.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '150px'
});
// print(NDTICharts1);
//NSMI ALGORITM
var red = dataset.select('B3');
var green = dataset.select('B2')
var blue = dataset.select('B1');
var NSMI20002001 = red.add(green).subtract(blue).divide(red.add(green).add(blue)).rename ("NSMI 2000-2001");
var NSMIparam = {min: 0.205686630369026, max: 0.564366632337796, palette:['#fcfdbf','#fc8761','#b63679','#50127b','#000004']};
// Map.addLayer(NSMI20002001, NSMIparam, 'NSMI 2000-2001')
///NSMI Charts 2000-2001
var NSMICharts = ui.Chart.image.histogram(NSMI20002001, table, 30)
                .setSeriesNames(['NSMI 2000-2001'])
                .setOptions({
                  title: 'NSMI Histogram 2000-2001',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NSMICharts.style().set({
  position: 'bottom-right',
  width: '450px',
  height: '150px'
});
// print(NSMICharts);
// Export.image.toDrive({
//   image: dataset, 
//   description:'Laut_2000-2001', 
//   folder: 'Google Earth Engine',
//   region: table,
//   scale : 30,
//   maxPixels: 1e13
// })
/////////////////////////2010-2011\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                  .filterDate('2010-01-01', '2011-12-31')
                  .filterBounds(table2)
                  .map(cloudMaskL457)
                  .median()
                  .clip(table2);
var visParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
// Map.addLayer(dataset, visParams, '2010-2011');
//NDTI ALGORITHM
var red = dataset.select('B3');
var green =dataset.select("B2")
var NDTI20102011 = green.subtract(red).divide(green.add(red)).rename("NDTI 2010-2011");
var NDTIparam = {min: -0.06647605432451752, max: 0.3152664859981933, palette:['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']};
// Map.addLayer(NDTI20102011, NDTIparam, 'NDTI 2010-2011')
///NDTI Charts 2010-2011
var NDTICharts2 = ui.Chart.image.histogram(NDTI20102011, table, 30)
                .setSeriesNames(['NDTI 2010-2011'])
                .setOptions({
                  title: 'NDTI Histogram 2010-2011',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NDTICharts2.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '150px'
});
// print(NDTICharts2);
//NSMI ALGORITM
var red = dataset.select('B3');
var green = dataset.select('B2')
var blue = dataset.select('B1');
var NSMI20102011 = red.add(green).subtract(blue).divide(red.add(green).add(blue)).rename ("NSMI 2010-2011");
var NSMIparam = {min: 0.2251497005988024, max: 0.6280898876404495, palette:['#fcfdbf','#fc8761','#b63679','#50127b','#000004']};
// Map.addLayer(NSMI20102011, NSMIparam, 'NSMI 2010-2011')
///NSMI Charts 2010-2011
var NSMICharts2 = ui.Chart.image.histogram(NSMI20102011, table, 30)
                .setSeriesNames(['NSMI 2010-2011'])
                .setOptions({
                  title: 'NSMI Histogram 2010-2011',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NSMICharts2.style().set({
  position: 'bottom-right',
  width: '450px',
  height: '150px'
});
// print(NSMICharts2);
// Export.image.toDrive({
//   image: dataset, 
//   description:'Laut_2010-2011', 
//   folder: 'Google Earth Engine',
//   region: table2,
//   scale : 30,
//   maxPixels: 1e13
// })
/////////////////////////2020-2021\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterBounds(table3)
                  .filterDate('2020-01-01', '2021-08-16')
                  .map(maskL8sr)
                  .median()
                  .clip(table3);
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
// Map.addLayer(dataset, visParams, '2020-2021')
//NDTI ALGORITHM
var red = dataset.select('B4');
var green =dataset.select("B3")
var NDTI20202021 = green.subtract(red).divide(green.add(red)).rename("NDTI 2020-2021");
var NDTIparam = {min: -0.12465181058495822, max: 0.4632418069087688, palette:['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']};
// Map.addLayer(NDTI20202021, NDTIparam, 'NDTI 2020-2021')
///NDTI Charts 2020-2021
var NDTICharts3 = ui.Chart.image.histogram(NDTI20202021, table, 30)
                .setSeriesNames(['NDTI 2020-2021'])
                .setOptions({
                  title: 'NDTI Histogram 2020-2021',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NDTICharts3.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '150px'
});
// print(NDTICharts3);
//NSMI ALGORITM
var red = dataset.select('B4');
var green = dataset.select('B3')
var blue = dataset.select('B2');
var NSMI20202021 = red.add(green).subtract(blue).divide(red.add(green).add(blue)).rename ("NSMI 2020-2021");
var NSMIparam = {min: 0.2683222289521502, max: 0.6985573272589218, palette:['#fcfdbf','#fc8761','#b63679','#50127b','#000004']};
// Map.addLayer(NSMI20202021, NSMIparam, 'NSMI 2020-2021')
///NSMI Charts 2020-2021
var NSMICharts3 = ui.Chart.image.histogram(NSMI20202021, table, 30)
                .setSeriesNames(['NSMI 2020-2021'])
                .setOptions({
                  title: 'NSMI Histogram 2020-2021',
                  hAxis: {title: 'Value'},
                  vAxis: {title: 'Frequency'}
                });
NSMICharts3.style().set({
  position: 'bottom-right',
  width: '450px',
  height: '150px'
});
// print(NSMICharts3);
// Export.image.toDrive({
//   image: dataset, 
//   description:'Laut_2020-2021', 
//   folder: 'Google Earth Engine',
//   region: table3,
//   scale : 30,
//   maxPixels: 1e13
// })
///////////////////////LAYOUT\\\\\\\\\\\\\\\\\\\\\\\\\
//Title
var header = ui.Label('Batang Natal Estuary Area Water Quality', 
            {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//Summary
var text = ui.Label(
  'This map of Batang Natal Estuary Area extend the water quality related to the illegal mining activities in the range of 2000-2001, 2010-2011, and 2020-2021 using the Normalized Different Turbinity Index for the water clarity and Normalized Suspended Material Index to see its distribution of solid material suspensions in liquid materials such as sludge and sewage solids loads derived from Landsat imagery. ' +
  'Use the tools below to explore changes in the water clarity extent, and drivers of the solid material suspensions.',
    {fontSize: '15px'});
//Panel
var panel = ui.Panel({
  widgets:[header, text],
  style:{width: '350px',position:'middle-right'}});
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
panel.add(intro)
ui.root.insert(1,panel)
////////////////////Checkbox
//4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Normalized Different Turbidity Index',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var extCheck = ui.Checkbox('NDTI 2000-2001').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('NDTI 2010-2011').setValue(false);
var extCheck3 = ui.Checkbox('NDTI 2020-2021').setValue(false);
//Now do the same for the Simard Height map
var heightLab = ui.Label({value:'Water Clarity (According to NDTI)',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Height Legend
///////////////
var viridis = {min: 0 , max : 25,palette : ['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba' 
]};
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2 (viridis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((viridis.max-viridis.min)/100.0).add(viridis.min);
  var legendImage = gradient.visualize(viridis);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('turbid'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('limpid')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extentLegend)
      .add(heightLab)
      .add(makeLegend2(viridis))
///////////////////////////NDTI\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//We set each layer to "false" so the user can turn them on later
var extNDTI20002001 = ui.Map.Layer(NDTI20002001, NDTIparam, 'NDTI 2000-2001',false)
var extNDTI20102011 = ui.Map.Layer(NDTI20102011, NDTIparam, 'NDTI 2010-2011',false)
var extNDTI20202021 = ui.Map.Layer(NDTI20202021, NDTIparam, 'NDTI 2020-2021',false)
//Add these layers to our map. They will be added but not displayed
Map.add(extNDTI20002001)
Map.add(extNDTI20102011)
Map.add(extNDTI20202021)
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent NDTI 2000-2001
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  extNDTI20002001.setShown(checked)
  })
}
doCheckbox();
//Extent NDTI 2010-2011
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  extNDTI20102011.setShown(checked)
  })
}
doCheckbox2();
//Extent NDTI 2020-2021
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  extNDTI20202021.setShown(checked)
  })
}
doCheckbox3();
///////////////GRAPH RESULT\\\\\\\\\\\\\\\\
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '350px',position:'middle-right'}
})
//Create key of items for dropdown
var NDTI_20002001 = '2000-2001'
var NDTI_20102011 = '2010-2011'
var NDTI_20202021 = '2020-2021'
//Construct Dropdown
var graphSelect = ui.Select({
  items:[NDTI_20002001,NDTI_20102011,NDTI_20202021],
  placeholder:'Choose period',
  onChange: selectLayer,
  style: {position:'top-right'}
})
var constraints = []
//Write a function that runs on change of Dropdown
function selectLayer(){
  var graph = graphSelect.getValue() // get value from dropdown selection
  panelGraph.clear() //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  if (graph == NDTI_20002001){
    panelGraph.add(NDTICharts1)
  }
  else if (graph == NDTI_20102011){
    panelGraph.add(NDTICharts2)
  }
  else if (graph == NDTI_20202021){
    panelGraph.add(NDTICharts3)
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
//Create a new label
var graphLabel = ui.Label({value:'Select period to display water clarity graph distribution',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
////////////////////2222222\\\\\\\\\\\\\\\\\\\\\\\\\\\
var intro2 = ui.Panel([
  ui.Label({
    value: '____________________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
panel.add(intro2)
//4.1) Create a new label for this series of checkboxes
var extLabel2 = ui.Label({value:'Normalized Material Suspended Index',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var extCheck12 = ui.Checkbox('NSMI 2000-2001').setValue(false); //false = unchecked
var extCheck22 = ui.Checkbox('NSMI 2010-2011').setValue(false);
var extCheck32 = ui.Checkbox('NSMI 2020-2021').setValue(false);
//The following code creates legends we can add to the panel
//Now do the same for the Simard Height map
var heightLab22 = ui.Label({value:'Solid Material Suspensions (According to NSMI)',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa2 = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox2 = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description2 = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox2, description2],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Height Legend
///////////////
var viridis2 = {min: 0 , max : 25,palette : ['#000004','#50127b','#b63679','#fc8761','#fcfdbf' 
]};
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend22 (viridis2) {
  var lon2 = ee.Image.pixelLonLat().select('longitude');
  var gradient2 = lon2.multiply((viridis2.max-viridis2.min)/100.0).add(viridis2.min);
  var legendImage2 = gradient2.visualize(viridis2);
  var thumb2 = ui.Thumbnail({
    image: legendImage2, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel22 = ui.Panel({
    widgets: [
      ui.Label('high'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('low')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel22).add(thumb2);
}
panel.add(extLabel2)
      .add(extCheck12)
      .add(extCheck22)
      .add(extCheck32)
      .add(extentLegend2)
      .add(heightLab22)
      .add(makeLegend22(viridis2))
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////NSMI\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//We set each layer to "false" so the user can turn them on later
var extNSMI20002001 = ui.Map.Layer(NSMI20002001, NSMIparam, 'NSMI 2000-2001',false)
var extNSMI20102011 = ui.Map.Layer(NSMI20102011, NSMIparam, 'NSMI 2010-2011',false)
var extNSMI20202021 = ui.Map.Layer(NSMI20202021, NSMIparam, 'NSMI 2020-2021',false)
//Add these layers to our map. They will be added but not displayed
Map.add(extNSMI20002001)
Map.add(extNSMI20102011)
Map.add(extNSMI20202021)
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent NSMI 2000-2001
var doCheckbox12 = function() {
  extCheck12.onChange(function(checked){
  extNSMI20002001.setShown(checked)
  })
}
doCheckbox12();
//Extent NSMI 2010-2011
var doCheckbox22 = function() {
  extCheck22.onChange(function(checked){
  extNSMI20102011.setShown(checked)
  })
}
doCheckbox22();
//Extent NSMI 2020-2021
var doCheckbox32 = function() {
  extCheck32.onChange(function(checked){
  extNSMI20202021.setShown(checked)
  })
}
doCheckbox32();
///////////////////////////////////////////
///////////////GRAPH RESULT2\\\\\\\\\\\\\\\\
//Add a panel to hold graphs within main panel
var panelGraph2 = ui.Panel({
  style:{width: '350px',position:'middle-right'}
})
//Create key of items for dropdown
var NSMI_20002001 = '2000-2001'
var NSMI_20102011 = '2010-2011'
var NSMI_20202021 = '2020-2021'
//Construct Dropdown
var graphSelect2 = ui.Select({
  items:[NSMI_20002001,NSMI_20102011,NSMI_20202021],
  placeholder:'Choose period',
  onChange: selectLayer2,
  style: {position:'top-right'}
})
var constraints2 = []
//Write a function that runs on change of Dropdown
function selectLayer2(){
  var graph2 = graphSelect2.getValue() // get value from dropdown selection
  panelGraph2.clear() //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  if (graph2 == NSMI_20002001){
    panelGraph2.add(NSMICharts)
  }
  else if (graph2 == NSMI_20102011){
    panelGraph2.add(NSMICharts2)
  }
  else if (graph2 == NSMI_20202021){
    panelGraph2.add(NSMICharts3)
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint2 = select[i];
    var mode2 = constraint.mode.getValue();
    var value2 = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
//Create a new label
var graphLabel2 = ui.Label({value:'Select period to display solid material suspensions graph distribution',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add selecter and graph panel to main panel
panel.add(graphLabel2)
      .add(graphSelect2)
      .add(panelGraph2)