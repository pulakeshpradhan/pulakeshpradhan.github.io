// This app is developed by TC. Code copied from USUHI_app_v5
// Modified my Xuewei on Nov, 2021
// Modifications:
// 1. Add city bounds to census tracts map -- done
// 2. Make the boundaries boder -- done
// 3. Now user can toggle the layers. -- done
//Further modified by TC (on Nov, 2021 and again in Nov, 2022)
//1. Made sure new legend items load after every layer selection 
//2. Updated legend text. 
//3. Made sure how the SUHI is generated is always shown on the panel
//4. Updated reference
//5. Moved boundaries to only right panel. 
//6. Changed to bar plot and added other races to bar plot (also switched from total population to percentage population)
//7. Added example scatterplot between summer SUHI and income
//8. Fixed legend labels for consistency
//9. Added data for other races for layer switching to right-hand map.
//10. Better legends
//11. Add data driven logo.
//12. Update visibility settings.
// prepare SUE urban extent. make it a object. 
var urban_bound=ee.FeatureCollection('users/tirthankar25/US_urbanized_areas');
var empty = ee.Image() 
  var edge = empty.paint({
  featureCollection: urban_bound,
  width:2
  }); 
// prepare US admin bounds
// Note: this layer and dissolving takes time to load
var US_admin_bound_raw = ee.FeatureCollection("users/datadrivenlab/US_cities_censustracts_meta_diss_coast_added")//.union()
var us_admin_canvas = ee.Image()
var US_admin_bound = us_admin_canvas.paint(
  {featureCollection: US_admin_bound_raw,
  width:1
  })
var image = ee.Image("users/datadrivenlab/USUHI_census_image_forapp_final");
var Demoimage = ee.Image("users/datadrivenlab/USDemographic_census_image_forapp");
// // Create default map for the app
var map = ui.Map() 
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: false, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map 
ui.root.add(map)
var palettes = require('users/gena/packages:palettes');
var palette = palettes.kovesi.diverging_gwr_55_95_c38[7];
var palette2 = palettes.colorbrewer.YlGnBu[7];
//  .filterBounds(ee.Geometry.Rectangle(-74.18, 40.60, -73.75, 41.00));
// var urb = urb.filter(ee.Filter.notNull(['LST_urb_day_CT','LST_urb_night_CT', 'LST_rur_day', 'LST_rur_night']));
var UHIAdded = ee.FeatureCollection('users/datadrivenlab/UHIfinal'); 
// Map.addLayer(UHIAdded, {opacity: 0.5}, 'layer1'); 
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image();
//Map.addLayer(outline, {min: -2.0, max: 5.0, palette: palette, opacity: 0.5}, 'census track');
//Create function to create a panel
function panelcreate() {
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'US SUHI Disparity Explorer',
    style: {fontSize: '1.4vw', fontWeight: 'bold'}
  }),
  ui.Label({
    value:'This platform displays census-tract level surface urban heat island (SUHI) intensities (daytime and nighttime estimates for summer, winter, and the whole year) for US urbanized areas, as well as socioeconomic information (percentage race and median income) at the same level of aggregation. The polygons with orange boundaries show the urbanized areas, while the polygons with cyan boundaries show groups of corresponding census tracts. Use the search bar to find your urbanized area of interest. Click on your neighborhood on the left-hand side map, and the corresponding SUHI and population statistics will be listed below. Finally, the association between median income and the summer daytime SUHI intensity will be plotted for the urbanized area the selected census tract belongs to (each data point corresponds to a census tract).',
    style: {fontSize: '.9vw', fontWeight: 'normal', textAlign: 'left'}
}),
ui.Label({
    value: 'How is the SUHI calculated?',
    style: {fontSize: '1.1vw', fontWeight: 'bold'}
  }),
  ui.Label({
    value:'The SUHI intensity, as calculated here, is the difference in land surface temperature between the built-up and non-built up pixels of an urbanized area. Since these estimates are based on satellite observations, they are valid for clear-sky conditions. More information about the methodology used to generate this dataset can be found in: ',
    style: {fontSize: '.9vw', fontWeight: 'normal', textAlign: 'left'}
}),
ui.Label({value:'Chakraborty, T., Hsu, A., Manya, D., & Sheriff, G. (2020). A spatially explicit surface urban heat island database for the United States: characterization, uncertainties, and possible applications. ISPRS Journal of Photogrammetry and Remote Sensing, 168, 74-88.',style: {fontSize: '.9vw', color: 'black',fontWeight: 'bold', textAlign: 'left'},targetUrl:'https://www.sciencedirect.com/science/article/pii/S0924271620302082?dgcid=coauthor'}),
ui.Label({value:'Contact: TC',style: {fontSize: '.9vw', color: 'black',fontWeight: 'bold', textAlign: 'left'},targetUrl:'mailto:tc.chakraborty@pnnl.gov'})
]);
// var reference1=ui.Label({value:'Read more about UHI',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'http://datadrivenlab.org/urban/issue-profiles/climate-change/'}) 
panel.add(intro);
// panel.add(reference1);
}
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
// Add a label to the panel.
inspector.add(ui.Label({value: 'Click on a census track to see results',
style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
// Add the panel to the default map.
map.add(inspector);
// Set the default map's cursor to a "crosshair".
map.style().set('cursor', 'crosshair');
// Color labels and palette
var colors = ['#39970E', '#7DB461', '#B7D2A7', '#EDEAE6', '#F9BAB2', '#F78579', '#ED4744'];
// Create a panel to hold our widgets.
//var equity = {
//  Income: ['income'],
//  White: ['WHITE'],
//  Black: ['BLACK']
//};
//var select1 = ui.Select({
//  items: Object.keys(equity),
//  onChange: function(key) {
//    var equitylayer=UHIAdded.reduceToImage({properties:equity[key], reducer:ee.Reducer.first()});
//  Map.addLayer(equitylayer, {palette: palette, opacity: 0.5}, 'equity');
//  }
//});
var LIGHT =[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "10"
            },
            {
                "lightness": "14"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-27"
            }
        ]
    }
]
map.setOptions('Base', {'Base': LIGHT});
var legend = ui.Panel({style: {position: 'bottom-left',width: '250px'}});
function legendcreate()
{
legend.add(ui.Label())}
  //Call legend creation function
  legendcreate()
var uhidayVis = image.select('uhiday').visualize({min:-2, max:3,palette:colors })
var uhinightVis = image.select('uhinight').visualize({min:-2, max:2,palette:colors })
var uhisumdayVis = image.select('uhisumday').visualize({min:-2, max:4,palette:colors })
var uhisumnightVis = image.select('uhisumnight').visualize({min:-2, max:3,palette:colors })
var uhiwindayVis = image.select('uhiwinday').visualize({min:-2, max:3,palette:colors })
var uhiwinnightVis = image.select('uhiwinnight').visualize({min:-2, max:2,palette:colors })
// Define some constants.
var SUMMER_DAY_UHI = 'Summer day';
var SUMMER_NIGHT_UHI = 'Summer night';
var WINTER_DAY_UHI = 'Winter day';
var WINTER_NIGHT_UHI = 'Winter night';
var YEARLY_DAY_UHI = 'Annual day';
var YEARLY_NIGHT_UHI = 'Annual night';
var none= "Reset";
/*Add UHI layers to map to display the 16-year daytime and nightime urban heat islands of the world's 4999 largest cities*/
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [YEARLY_DAY_UHI, YEARLY_NIGHT_UHI, SUMMER_DAY_UHI, SUMMER_NIGHT_UHI, WINTER_DAY_UHI, WINTER_NIGHT_UHI, none],
  value: YEARLY_DAY_UHI,
  onChange: redraw,
});
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'bold', textAlign: 'left'}
})).add(select);
  var vis = {min: -2, max: 3, palette: colors};
//fontSize: '13px',
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  //Clear legend and create new legend 
  legend.clear()
  legendcreate()
  var layer = select.getValue();
  var image_disp
  legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}})).add(select);
  if (layer==YEARLY_DAY_UHI)
  {
    // Color labels and palette
  vis = {min: -2, max: 3, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhidayVis;
}
  else if (layer==YEARLY_NIGHT_UHI)
  {
  //Clear legend and create new legend 
  vis = {min: -2, max: 2, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhinightVis;
  }
  else if (layer==SUMMER_DAY_UHI)
  {
  //Clear legend and create new legend 
  vis = {min: -2, max: 4, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhisumdayVis;
  }
  else if (layer==SUMMER_NIGHT_UHI)
  {
  //Clear legend and create new legend 
  vis = {min: -2, max: 3, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhisumnightVis;
  } 
  else if (layer==WINTER_DAY_UHI)
  {
  //Clear legend and create new legend 
  vis = {min: -2, max: 3, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhiwindayVis;
  }
  else if (layer==WINTER_NIGHT_UHI)
  {
  //Clear legend and create new legend 
  vis = {min: -2, max: 2, palette: colors};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
 legend.add(ui.Label({value:'5-year (2013-2017) composite of SUHI intensity (°C)',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend.add(colorBar)
  legend.add(legendLabels)
  image_disp=uhiwinnightVis;
  }
    map.addLayer(image_disp, {}, layer);
  if (layer==none)
   {
    map.layers().reset();
   }
   // add city bound to top of left map
  }
colors = ['#39970E', '#7DB461', '#B7D2A7', '#EDEAE6', '#F9BAB2', '#F78579', '#ED4744']
vis = {min: -2, max: 3, palette: colors};
  legend.clear()
  legendcreate()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'bold', textAlign: 'left'}})).add(select);
//// Set a place holder.
//select1.setPlaceholder('Compare Equity');
// add city bound to top of left map(initialize )
  var linkedMap = ui.Map();
  var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
  var splitPanel = ui.SplitPanel({
  firstPanel: ui.Panel(),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: false,
  style: {stretch: 'both'}
  });
var panel = ui.Panel();
panel.style().set({width: '25%', fontSize: '1vw', fontWeight: 'bold'});
panelcreate();
// var uhiintro = ui.Panel([
//   ui.Label({
//     value: 'How is the SUHI calculated?',
//     style: {fontSize: '1.1vw', fontWeight: 'bold'}
//   }),
//   ui.Label({
//     value:'The SUHI intensity, as calculated here, is the difference in surface temperature between the built-up and non-built up pixels of an urbanized area. Since these estimates are based on satellite observations, they are valid for clear-sky conditions. More information about the methodology used to generate this dataset can be found in: ',
//     style: {fontSize: '.9vw', fontWeight: 'bold', textAlign: 'left'}
// }),
// ui.Label({value:'Chakraborty, T., Hsu, A., Manya, D., & Sheriff, G. (2020). A spatially explicit surface urban heat island database for the United States: Characterization, uncertainties, and possible applications., ISPRS Journal of Photogrammetry and Remote Sensing',style: {fontSize: '.9vw', color: 'black',fontWeight: 'bold', textAlign: 'left'},targetUrl:'https://www.sciencedirect.com/science/article/pii/S0924271620302082?dgcid=coauthor'})
// ]);
// panel.add(uhiintro);
map.onClick(function(coords) {
//Map.addLayer(UHIAdded, {opacity: 0.1}, 'Census Tracks');
//Clear panel
panel.clear()
// Call the panel creation function again
panelcreate()
// Create panels to hold lon/lat and UHI values.
var loc = ui.Label();
//var lat = ui.Label();
//var lon = ui.Label();
var Dayall=ui.Label();
var Nightall=ui.Label();
var Summerdayall=ui.Label();
var Summernightall=ui.Label();
var Winterdayall=ui.Label();
var Winternightall=ui.Label();
var income=ui.Label();
//Add panel
panel.add(ui.Panel([loc], ui.Panel.Layout.flow('horizontal')))
//panel.add(ui.Panel([lat, lon], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Dayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Nightall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Summerdayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Summernightall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Winterdayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Winternightall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([income], ui.Panel.Layout.flow('horizontal')))
// Register a callback on the default map to be invoked when the map is clicked.
  // Add a red dot for the point clicked on.
var point = ee.Geometry.Point(coords.lon, coords.lat);
var UHI_scatter_dat=UHIAdded.filterMetadata('Urban_name','equals',ee.String(ee.Feature(UHIAdded.filterBounds(point).first()).get('Urban_name')).getInfo())
//  var dot = ui.Map.Layer(point, {color: 'red'},"point");
//  Map.layers().set(2, dot);
  // var edges = empty.paint({
  // featureCollection: UHIAdded.filterBounds(point),
  // color: 1,
  // width: 3
  // });
  // var edge = ui.Map.Layer(edges, {palette: 'FF0000'}, 'edges');
  // Map.layers().set(2,edge);
//Clear inspector
  inspector.clear()
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Loading...', style: {color: 'gray',fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
loc.setValue('Region: ' + ee.String(ee.Feature(UHIAdded.filterBounds(point).first()).get('Urban_name')).getInfo());
//lat.setValue('Lat: ' + coords.lat.toFixed(2));
//lon.setValue('Lon: ' + coords.lon.toFixed(2));
var sample = ee.Image(image).sample(point, 30).first().toDictionary();
    // Add a label with the results from the server.
  // Update the lon/lat panel with values from the click event.
  Dayall.setValue('Annual daytime UHI: ' + sample.get('uhiday').getInfo().toFixed(2) + ' °C');
  Nightall.setValue('Annual nightime UHI: ' + sample.get('uhinight').getInfo().toFixed(2) + ' °C');
  Summerdayall.setValue('Summer daytime UHI: ' + sample.get('uhisumday').getInfo().toFixed(2) + ' °C');
  Summernightall.setValue('Summer nighttime UHI: ' + sample.get('uhisumnight').getInfo().toFixed(2) + ' °C');
  Winterdayall.setValue('Winter daytime UHI: ' + sample.get('uhiwinday').getInfo().toFixed(2) + ' °C');
  Winternightall.setValue('Winter nighttime UHI: ' + sample.get('uhiwinnight').getInfo().toFixed(2) + ' °C');
var sample2 = ee.Image(Demoimage).sample(point, 30).first().toDictionary();
income.setValue('Median Annual Income: $' + sample2.get('income').getInfo().toFixed(0))
// print(UHIAdded.filterBounds(ee.Geometry.Point(coords.lon, coords.lat)).getArray('Area'));  
  // Clear inspector again and display a new label
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Click on another census tract...',
style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
 var SelectedFeature=ee.Feature(UHIAdded.filterBounds(point).first()) 
var raceselected=ee.FeatureCollection([ee.Feature(SelectedFeature.select(['White_perc','Black_perc','Asian_perc', 'AmIndian_perc', 'Hawaii_perc', 'Other_perc'],['White','Black','Asian', 'American Indian', 'Hawaiian', 'Other']))])
var raceChart =
    ui.Chart.feature.byProperty(
            {features: raceselected})
            .setChartType('BarChart')
        .setOptions({title: 'Percentage of population by race',
          hAxis: {
        title: 'Percentage of population (%)',
        titleTextStyle: {italic: false, bold: true}
      },
      legend:{position: 'none'},
      vAxis: {
        title: 'Race',
        titleTextStyle: {italic: false, bold: true}
      },
      colors: [
            'brown'
          ]
        });
  panel.widgets().set(10, raceChart);
var UHI_scatter_fin=UHI_scatter_dat.select(['Income','uhisumday'],['x','y'])
// Generate chart from sample
var scatterChart = ui.Chart.feature.byFeature(UHI_scatter_fin, 'x', 'y')
    .setChartType('ScatterChart')
    .setOptions({title: "Summer daytime SUHI vs median income", pointSize: 2,pointShape: 'square', color: 'cyan',
    legend: {maxLines: 5, position: 'top'},
    series: {
          0: {targetAxisIndex: 0, visibleInLegend: false},
          1: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'SUHI (°C)',titleTextStyle: {italic: false, bold: true}},
          1: {title: 'SUHI (°C)',titleTextStyle: {italic: false, bold: true}}
        },
                hAxes: {
          // Adds titles to each axis.
          0: {title: 'Median income ($)',titleTextStyle: {italic: false, bold: true}},
          1: {title: 'Median income ($)',titleTextStyle: {italic: false, bold: true}},
          titleTextStyle: {italic: false, bold: true}
        },
    trendlines: {
        0: {
          type: 'linear',
          color: 'brown',
          lineWidth: 3,
          opacity: 0.7,
          showR2: false,
          visibleInLegend: true
        },
      },
});
  panel.widgets().set(11, scatterChart);
  });
ui.root.add(linkedMap)
// Add the panel to the ui.root.
ui.root.insert(2, panel);
var colors2 = ["ffffcc","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","0c2c84"]
linkedMap.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: false, fullscreenControl: false})
  linkedMap.setOptions('Base', {'Base': LIGHT});
  //linkedMap.addLayer(UHIAdded, {opacity: 0.5}, 'layer1'); 
var legend2 = ui.Panel({style: {position: 'bottom-left',width: '250px'}});
function legendcreate2()
{
legend2.add(ui.Label())}
  //Call legend creation function
  legendcreate2()
var whiteVis = Demoimage.select('white').visualize({min:5, max:95,palette:colors2 })
var blackVis = Demoimage.select('black').visualize({min:5, max:55,palette:colors2 })
var asianVis = Demoimage.select('asian').visualize({min:5, max:35,palette:colors2 })
var aminVis = Demoimage.select('amindian').visualize({min:5, max:25,palette:colors2 })
var hawaiiVis = Demoimage.select('hawaii').visualize({min:5, max:15,palette:colors2 })
var otherVis = Demoimage.select('other').visualize({min:5, max:35,palette:colors2 })
var incomeVis = Demoimage.select('income').visualize({min:10000, max:60000,palette:colors2 })
  //Call legend creation function
// Define some constants.
var WHITE = 'White population (%)';
var BLACK = 'Black population (%)';
var ASIAN = 'Asian population (%)';
var HAWAII= 'Hawaiian population (%)';
var AMIND= 'American Indian population (%)';
var OTHER= 'Other population (%)';
var INCOME_UHI = 'Median income ($)';
var select2 = ui.Select({
  items: [WHITE, BLACK, ASIAN, AMIND, HAWAII, OTHER, INCOME_UHI],
  value: WHITE,
  onChange: redraw2,
});
legend2.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'bold', textAlign: 'left'}
})).add(select2);
function makeColorBarParams(palette2) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette2,
  };
}
// create a function can add two new boundary legend 
function add_urban_bound_to_legend(legend){
    // add SUE boundary info to entry object
  var SUE_label = [
    //SUE
     ui.Label({style:{color:'orange', margin: '0 0 5px 0'}, value: '---------'}),
    ui.Label({
      value: "Urbanized area",
      style: {fontSize: '14px',
        margin: '0 0 3px 3px'
      }
    }) 
    ]
  var admin_label = [
    //admin_label
     ui.Label({style:{color:'cyan', margin: '0 0 5px 0'}, value: '---------'}),
    ui.Label({
      value: "Tract group",
      style: {fontSize: '14px',
        margin: '0 0 3px 3px'
      }
    }) 
    ]
  legend.add(ui.Panel(SUE_label, ui.Panel.Layout.Flow('horizontal')));
  legend.add(ui.Panel(admin_label, ui.Panel.Layout.Flow('horizontal')));
}
add_urban_bound_to_legend(legend2)
// Create a function to render a map layer configured by the user inputs.
function redraw2() {
   linkedMap.layers().reset();
  //Clear legend and create new legend 
  legend2.clear()
  legendcreate2()
  var layer = select2.getValue();
  var image_disp2
  legend2.add(ui.Label({value:'Choose display layer:',style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}})).add(select2);
  if (layer==WHITE)
  {
  vis = {min: 5, max: 95, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=whiteVis;
add_urban_bound_to_legend(legend2)
  }
  else if (layer==INCOME_UHI)
  {
  vis = {min: 10000, max: 60000, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=incomeVis;
add_urban_bound_to_legend(legend2)
  }
  else if (layer==BLACK)
  {
  vis = {min: 5, max: 55, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=blackVis;
add_urban_bound_to_legend(legend2)
  }
   else if (layer==HAWAII)
  {
  vis = {min: 5, max: 15, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=hawaiiVis;
add_urban_bound_to_legend(legend2)
  }
   else if (layer==AMIND)
  {
  vis = {min: 5, max: 25, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=aminVis;
add_urban_bound_to_legend(legend2)
  }
   else if (layer==OTHER)
  {
  vis = {min: 5, max: 35, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=otherVis;
add_urban_bound_to_legend(legend2)
  }
  else if (layer==ASIAN)
  {
  vis = {min: 5, max: 35, palette: colors2};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '10%', width:'100%'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '0px 0px'}),
    ui.Label(
        (vis.mean),
        {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '0px 0px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  legend2.add(ui.Label({value:"American Community Survey 2017's 5-year estimates",style: {fontSize: '15px', fontWeight: 'bold', textAlign: 'left'}}))
  //legend.add(ui.Label({value:'Estimated number of cases over the last fourteen days per pixel',style: {fontSize: '12px',textAlign: 'left'}}))
  legend2.add(colorBar2)
  legend2.add(legendLabels2)
  image_disp2=asianVis;
add_urban_bound_to_legend(legend2)
  }
  linkedMap.addLayer(image_disp2,{},layer)
  // add boundaries (when redraw layer)
  linkedMap.addLayer(edge, {palette:['orange']},"Urbanized Area")
  linkedMap.addLayer(US_admin_bound, {palette:['cyan']},"City Administrative Boundary")
  }  
// add boundaries (intialize)
linkedMap.addLayer(edge, {palette:['orange']},"Urbanized Area")
linkedMap.addLayer(US_admin_bound, {palette:['cyan']},"City Administrative Boundary")
var point=99
redraw();
map.add(legend)
redraw2();
linkedMap.add(legend2)