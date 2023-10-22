var cc = ui.import && ui.import("cc", "imageCollection", {
      "id": "projects/servir-mekong/yearly_primitives_smoothed/tree_canopy"
    }) || ee.ImageCollection("projects/servir-mekong/yearly_primitives_smoothed/tree_canopy"),
    simard2 = ui.import && ui.import("simard2", "imageCollection", {
      "id": "projects/mangrovescience/DAAC_Hba_Simard"
    }) || ee.ImageCollection("projects/mangrovescience/DAAC_Hba_Simard");
//=====================================================================================================================
// App Tutorial for Vietnam
//                                                  
// Code: App Tutorial for Vietnam
// Written by: Giuseppe Baldassarre University of Lisbon
// Objective: This code works through a tutorial for creating a Canopy cover extent (2000-2019) app for Vietnam 
//=====================================================================================================================
// Select the Province
var province = 'Cà Mau';
// Select the Years
var year1 = 2000; 
var year2 = 2010; 
var year3 = 2019;
///////////////////////////////////////////////////////////////
//                    1) Import Layers of Interest           //
///////////////////////////////////////////////////////////////
// import shapefile data
var vietnam = ee.FeatureCollection("users/servirmekong/countries/VNM_adm1");
var roi = vietnam.filter(ee.Filter.eq("NAME_1",province)).geometry();
//var Guyana = ee.FeatureCollection
//('users/baldassarre/MangrGee/VectorizedCaMau'+(year3));
var extent2000 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_'+(year1)).clip(roi)
var extent2010 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_'+(year2)).clip(roi)
var extent2020 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_'+(year3)).clip(roi)
// Create a collection for the Canopy Cover
var prefix = 'projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_';
// fix dates 2017 - 2018 - 2019
c2017 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2017')
var may_date = 1483228800000;
var c2017 = c2017.set({'system:time_start': may_date});
c2018 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2018')
var may_date = 1514764800000;
var c2018 = c2018.set({'system:time_start': may_date});
c2019 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2019')
var may_date = 1546300800000;
var c2019 = c2019.set({'system:time_start': may_date});
var ccc = ee.ImageCollection([prefix+(2000),prefix+(2001),prefix+(2002),prefix+(2003),prefix+(2004),prefix+(2005),
                                                prefix+(2006),prefix+(2007),prefix+(2008),prefix+(2009),prefix+(2010),prefix+(2011),
                                                prefix+(2012),prefix+(2013),prefix+(2014),prefix+(2015),prefix+(2016),
                                                c2017,c2018,c2019]);
//Get the Simard data 
//var simard = ee.ImageCollection('projects/mangrovescience/DAAC_Hba_Simard')
var simard = ee.Image('users/baldassarre/MangrGee/Mangrove_agb_Vietnam')
//var simard = ee.ImageCollection('users/baldassarre/MangrGee/Mangrove_agb_Vietnam')
//Mosaic the Simard data to an Image so we can clip it later
//var hba = simard.mosaic().clip(roi)
var hba = simard.clip(roi)
///////////////////////////////////////////////////////////////
//      2) Begin setting up map appearance and app layers   //
///////////////////////////////////////////////////////////////
//2.1) Set up general display
//Set up a satellite background
Map.setOptions('Satellite')
//Center the map to ROI
Map.centerObject(roi,9)
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
//2.2) We want to set up a Viridis color pallete to display the Simard data
var viridis = {min: 50 , max : 140,palette : ['#481567FF','#482677FF','#453781FF','#404788FF','#39568CFF',
                                              '#33638DFF','#2D708EFF','#287D8EFF','#238A8DFF','#1F968BFF',
                                              '#20A387FF','#29AF7FFF','#3CBB75FF','#55C667FF',
                                              '#73D055FF','#95D840FF','#B8DE29FF','#DCE319FF','#FDE725FF' 
]};
//Other color pallette for Canopy Cover
var palettes = require('users/gena/packages:palettes');
var palette1 = {min: 0 , max : 100,palette : palettes.colorbrewer.Greens[9].slice(2,9)};
var palette2 = {min: 0 , max : 100,palette : palettes.colorbrewer.Blues[9].slice(2,9)};
var palette3 = {min: 0 , max : 100,palette : palettes.colorbrewer.Reds[9].slice(2,9)};
//2.3) Create variables for GUI layers for each layer
//We set each layer to "false" so the user can turn them on later
//var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false)
var simHBA = ui.Map.Layer(hba,viridis,'Biomass (AGB), Simard',false)
var ext2000 = ui.Map.Layer(extent2000.updateMask(extent2000), palette1, 'Extent'+(year1),false)
var ext2010 = ui.Map.Layer(extent2010.updateMask(extent2010), palette2, 'Extent'+(year2),false)
var ext2020 = ui.Map.Layer(extent2020.updateMask(extent2020), palette3, 'Extent'+(year3),false)
//Add these layers to our map. They will be added but not displayed
Map.add(ext2000)
Map.add(ext2010)
Map.add(ext2020)
Map.add(simHBA)
//Map.add(simHBA)
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('SRD project:', 
                        {fontSize: '18px', fontWeight: 'bold', color: 'red'});
var header1 = ui.Label('Cà Mau Canopy Cover, Extent, and Loss Explorer', 
                        {fontSize: '18px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This tool maps Canopy Cover extent in the '+(province)+' province from '+(year1)+' to '+(year3)+'. ' +
 // 'Use the tools below to explore changes in mangrove extent, mangrove canopy height in 2000, and drivers of mangrove loss.',
   'Also visualize Mangrove Biomass in year 2000.',
    {fontSize: '14px'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, header1,text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
//var extLabel = ui.Label({value:'Mangrove Extent',
//style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
//});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
/*
var extCheck = ui.Checkbox(year1).setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox(year2).setValue(false);
var extCheck3 = ui.Checkbox(year3).setValue(false);
*/
//Now do the same for the Simard Height map
//var heightLab = ui.Label({value:'Mangrove Height (Simard et al. 2019)',
//style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
//});
var heightLab = ui.Label({value:'Mangrove Biomass (Simard et al. 2019)',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', color: '4A997E'}
});
var heightCheck = ui.Checkbox('2000').setValue(false);
//Now do the same for the Canopy Cover map
var heightCan = ui.Label({value:'Canopy Cover (Servir-Mekong dataset)',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px', color: '4A997E'}
});
var heightCheck1 = ui.Checkbox((year1)).setValue(false);
var heightCheck2 = ui.Checkbox((year2)).setValue(false);
var heightCheck3 = ui.Checkbox((year3)).setValue(false);
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
/*
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
//Create a palette using the same colors we used for each extent layer
var paletteMAPa = [
'6D63EB',//year1
'34BFDE',//year2
'71F4B7',//year3
];
// Name of each legend value
var namesa = [year1,year2,year3]; 
// Add color and names to legend
for (var i = 0; i < 3; i++) {
  extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
  }  
*/
//Height Legend
///////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend1 (viridis) {
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
      ui.Label('50 ton/ha'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('150 ton/ha')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//Canopy Legend
///////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
// 2000
function makeLegend2 (palette1) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((palette1.max-palette1.min)/100.0).add(palette1.min);
  var legendImage = gradient.visualize(palette1);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel3 = ui.Panel({
    widgets: [
      ui.Label('>0'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('100')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel3).add(thumb);
}
//4.4) Add these new widgets to the panel in the order you want them to appear
panel
      //.add(extLabel)
      //.add(extCheck)
      //.add(extCheck2)
      //.add(extCheck3)
      //.add(extentLegend)
      .add(heightCan)
      .add(makeLegend2(palette1))
      .add(heightCheck1)
      .add(makeLegend2(palette2))
      .add(heightCheck2)
      .add(makeLegend2(palette3))
      .add(heightCheck3)
      .add(heightLab)
      .add(makeLegend1(viridis))
      .add(heightCheck)
     // .add(heightLab)
     // .add(makeLegend2(viridis))
     // .add(heightCheck)
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
/*
//Extent 2000
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  ext2000.setShown(checked)
  })
}
doCheckbox();
//Extent 2010
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  ext2010.setShown(checked)
  })
}
doCheckbox2();
//Extent 2020
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  ext2020.setShown(checked)
  })
}
doCheckbox3();
*/
//Simard Height Data
var doCheckbox4 = function() {
  heightCheck.onChange(function(checked){
  simHBA.setShown(checked)
  })
}
doCheckbox4();
//Canopy Cover
// 2000
var doCheckbox5 = function() {
  heightCheck1.onChange(function(checked){
  ext2000.setShown(checked)
  })
}
doCheckbox5();
// 2010
var doCheckbox6 = function() {
  heightCheck2.onChange(function(checked){
  ext2010.setShown(checked)
  })
}
doCheckbox6();
// 2020
var doCheckbox7 = function() {
  heightCheck3.onChange(function(checked){
  ext2020.setShown(checked)
  })
}
doCheckbox7();
////////////////////////////////////////////////////////
//       6) Add a clicking feature to get tree Height //
////////////////////////////////////////////////////////
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Temporal Canopy Cover Inspector',
    style: {fontSize: '18px', fontWeight: 'bold', color: '4A997E'}
  }),
  ui.Label('Click a point on the map to visualize the Canopy Cover time series of its pixel (30m) from '+(year1)+' to '+(year3))
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '#f7df1e'});
  Map.layers().set(4, dot);
//var cccc = cc.map(
//    function(cc) {
//         return extent2010.copyProperties(extent2010, ['system:time_start']);
//    });
  // Create an Canopy Cover chart.
  var CoverChart = ui.Chart.image.series(ccc, point, ee.Reducer.mean(), 500).setSeriesNames(['Canopy Cover']);
  CoverChart.setOptions({
    //title: 'Canopy Cover Over Time',
    //vAxis: {title: 'Canopy Cover'},
    hAxis: {title: 'date', format: 'yy', gridlines: {count: 20}},
    colors: ['39a8a7']
  });
  panel.widgets().set(2, CoverChart); // put 4 to have 3 graphs
});
//Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
////////////////////////////////////////////////////////
//       6) Add a clicking feature to get Canopy Cover 2020 //
////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
//var inspector = ui.Panel({
//  layout: ui.Panel.Layout.flow('horizontal')
//});
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
//inspector.setLayout(ui.Panel.Layout.absolute());
//var position = 'bottom-center'
//function makeButton(position) {
//  return ui.Button({
//    style: {position: position}
//  });
//}
// Add a label to the panel.
//inspector.add(ui.Label('Click to get Mangrove Biomass (MB)'));
inspector.add(ui.Label({
      value: 'Click to get Mangrove Biomass (MB)',
      style: {fontSize: '12px',stretch: 'vertical'}
    }));
//inspector.add(makeButton(position));
// Add the panel to the default map.
Map.add(inspector);
//Create a function to be invoked when the map is clicked 2000
Map.onClick(function(coords){
// Clear the panel and show a loading message.
inspector.clear();
inspector.style().set('shown', true);
inspector.add(ui.Label('Loading...', {color: 'gray'}));
//Computer the Canopy Cover value 2020
var point = ee.Geometry.Point(coords.lon, coords.lat);
var reduce = hba.reduce(ee.Reducer.first());
var sampledPoint = reduce.reduceRegion(ee.Reducer.first(), point, 30);
var computedValue = sampledPoint.get('first');
// Request the value from the server and use the results in a function.
computedValue.evaluate(function(result) {
inspector.clear();
// Add a label with the results from the server.
inspector.add(ui.Label({
      value: 'Mangrove Biomass year '+(year1)+': ' + result.toFixed(0)+' ton/ha',
      style: {fontSize: '12px',stretch: 'vertical'}
    }));
// Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
//inspector.setLayout(style: {position: 'vertical'})
/*
////////////////////////////////////////////////////////
//  7) Constuct graphs to measure extent for each year //
////////////////////////////////////////////////////////
//2000
//Calculate area in Hectares
var get2000 = extent2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Guyana,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
//Get area for the Guyana region
var feature = ee.Feature(Guyana)
var feature2000 = feature.set('2000', ee.Number(get2000))
//Construct Bar Chart
var chart2000 = ui.Chart.feature.byProperty(feature2000, ['2000'], ['Total'])
//Set up title and labels for chart
chart2000.setOptions({
  title: 'Total Mangrove Area',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
//2010
//Calculate area in Hectares
var get2010 = extent2010.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Guyana,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
//Get area for the Guyana region
var feature2010 = feature.set('2010', ee.Number(get2010))
//Construct Bar Chart
var chart2010 = ui.Chart.feature.byProperty(feature2010, ['2010'], ['Total'])
//Set up title and labels for chart
chart2010.setOptions({
  title: 'Total Mangrove Area',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
//2020
//Calculate area in Hectares
var get2020 = extent2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Guyana,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
//Get area for the Guyana region
var feature2020 = feature.set('2020', ee.Number(get2020))
//Construct Bar Chart
var chart2020 = ui.Chart.feature.byProperty(feature2020, ['2020'], ['Total'])
//Set up title and labels for chart
chart2020.setOptions({
  title: 'Total Mangrove Area',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
////////////////////////////////////////////////////////
//  8) Create a dropdown menu to display graph results //
////////////////////////////////////////////////////////
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
//Create key of items for dropdown
var y2000 = String(year1);
var y2010 = String(year2);
var y2020 = String(year3);
//Construct Dropdown
var graphSelect = ui.Select({
  items:[y2000,y2010,y2020],
  placeholder:'Choose year',
  onChange: selectLayer,
  style: {position:'top-right'}
})
var constraints = []
//Write a function that runs on change of Dropdown
function selectLayer(){
  var graph = graphSelect.getValue() // get value from dropdown selection
  panelGraph.clear() //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  if (graph == y2000){
    panelGraph.add(chart2000)
  }
  else if (graph == y2010){
    panelGraph.add(chart2010)
  }
  else if (graph == y2020){
    panelGraph.add(chart2020)
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
var graphLabel = ui.Label({value:'Select year to display mangrove extent',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
*/