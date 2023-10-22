var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* shown: false */
    ee.Geometry.MultiPoint();
function ttest(s1, shock, pre_interval, post_interval) {
  // Convert the shock date to a date object
  var shock = ee.Date(shock);
  // Filter the image collection to the pre-event period
  var pre = s1.filterDate(
    shock.advance(ee.Number(pre_interval).multiply(-1), "month"),
    shock
  );
  // Filter the image collection to the post-event period
  var post = s1.filterDate('2022-12-01', '2023-03-01');
  //var post = s1.filterDate(shock, shock.advance(post_interval, "month"));
  // Calculate the mean, standard deviation, and number of images for the pre-event period
  var pre_mean = pre.mean();
  var pre_sd = pre.reduce(ee.Reducer.stdDev());
  var pre_n = ee.Number(pre.aggregate_array('orbitNumber_start').distinct().size());
  // Calculate the mean, standard deviation, and number of images for the pre-event period
  var post_mean = post.mean();
  var post_sd = post.reduce(ee.Reducer.stdDev());
  var post_n = ee.Number(post.aggregate_array('orbitNumber_start').distinct().size());
  // Calculate the pooled standard deviation
  var pooled_sd = pre_sd
    .multiply(pre_sd)
    .multiply(pre_n.subtract(1))
    .add(post_sd.multiply(post_sd).multiply(post_n.subtract(1)))
    .divide(pre_n.add(post_n).subtract(2))
    .sqrt();
    // Calculate the denominator of the t-test
  var denom = pooled_sd.multiply(
    ee.Number(1).divide(pre_n).add(ee.Number(1).divide(post_n)).sqrt()
  );
    // Calculate the Degrees of Freedom, which is the number of observations minus 2
  var df = pre_n.add(post_n).subtract(2);
  //print("Number of Images: ", df);
    // Calculate the t-test using the:
        // mean of the pre-event period, 
        // the mean of the post-event period, 
        // and the pooled standard deviation
  //Map.addLayer(pre_mean,{},'pre')
  //Map.addLayer(post_mean,{},'post')
  var change = post_mean
    .subtract(pre_mean)
    .divide(denom)
    .abs()
    //.subtract(2);
    // return the t-values for each pixel
    return change
}
function filter_s1(path) {
  var ua = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filter(ee.Filter.eq('ADM0_NAME', "Ukraine")).geometry()
  // Filter the image collection to the ascending or descending orbit
  var orbits = ee
    .ImageCollection("COPERNICUS/S1_GRD")
    .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VH"))
    .filter(ee.Filter.eq("instrumentMode", "IW"))
    .filter(ee.Filter.eq("orbitProperties_pass", path))
    .filterBounds(ua)
    .filterDate('2022-01-01','2022-10-01')
    .aggregate_array('relativeOrbitNumber_start')
    .distinct()
  var image_col=ee.ImageCollection(orbits.map(function(orbit){
  var s1 = ee
    .ImageCollection("COPERNICUS/S1_GRD")
    .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VH"))
    .filter(ee.Filter.eq("instrumentMode", "IW"))
    .filter(ee.Filter.eq("relativeOrbitNumber_start",orbit))
  // Calculate the t-test for the filtered image collection using the function we defined earlier
  var vv = ttest(s1.select("VV"), "2022-04-01", 12, 12)
  var vh = ttest(s1.select("VH"), "2022-04-01", 12, 12)
  var vv= vv.rename('change').updateMask(vv.lt(10))
  var vh= vh.rename('change').updateMask(vh.lt(10))
    // Return the t-values for each pixel
  var image=ee.ImageCollection([vv,vh]).mean()
  //var image=imcoll.divide(8)//.convolve(boxcar)
  return image
  })).mean()
  return image_col
  }
// ----------------------------- ACCURACY ASSESSMENT ----------------------------------
function accuracy(lat, lon, location){
var image=clear()
Map.setCenter(lon,lat,13)
var damaged_buildings = ee.FeatureCollection("users/ollielballinger/"+location+"_damaged_buildings")
var damage_palette=['#D81B60','white','#1E88E5']
var damaged_vis={
    color: 'yellow',
    fillColor: 'red',
    width: 1.5,
    pointSize: 6.0,
    rules:[{
      filter:ee.Filter.lt('damage_level',2),
      isVisible:false
    }]
  }
var undamaged_vis={
    color: 'yellow',
    fillColor: 'blue',
    width: 1.5,
    pointSize: 6.0,
    rules:[{
      filter:ee.Filter.neq('damage_level',0),
      isVisible:false
    }]
  }  
var damaged=ui.Map.FeatureViewLayer({
  assetId: 'users/ollielballinger/'+location+'_damaged_buildings_fv',
  visParams: damaged_vis})
var undamaged=ui.Map.FeatureViewLayer({
  assetId: 'users/ollielballinger/'+location+'_damaged_buildings_fv',
  visParams: undamaged_vis})
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
  style:{
    fontSize:0,
    width: '150px'
  }
})
opacitySlider.onSlide(function (value) {
  Map.layers().get(1).setOpacity(value)
  Map.layers().get(2).setOpacity(1-value)
});
Map.add(damaged)
Map.add(undamaged)
var undamagedLabel = ui.Label("Undamaged ");
var damagedLabel = ui.Label("Damaged ");
var opacityPanel = ui.Panel({
  widgets: [undamagedLabel, opacitySlider,damagedLabel],
  style: { stretch: "horizontal" },
  layout: ui.Panel.Layout.Flow("horizontal"),
});
var homeButton=ui.Button({
  label:"Home",
  onClick: function(){
    home()
  }
  ,
  style:{stretch: "horizontal"}
})
var footprintPanel = ui.Panel({
  widgets: [
    ui.Label("Ukraine Damage Assessment", {
      fontWeight: "bold",
      fontSize: "20px",
    }),
    ui.Label(
  'The UN carried out a damage assessment by manually labelling buildings appearing destroyed in high resolution satellite imagery. Use the slider below to toggle between damaged and undamaged buildings:',
      { whiteSpace: "wrap" }
    ),
    opacityPanel
  ],
  style: { position: "top-left", maxWidth: "350px", maxHeight:'90%'},
  layout: ui.Panel.Layout.flow("vertical", true),
});
var types=ee.List(damaged_buildings.aggregate_array("type").distinct()).getInfo()
var dropdown=ui.Select({
  items: types,
  placeholder: 'Select a Building Type',
  onChange: function(value){
  var subset_vis={
    color: 'yellow',
    fillColor: 'red',
    width: 1.5,
    pointSize: 6.0,
    rules:[{
      filter:ee.Filter.neq('type',value),
      isVisible:false
    }]
  }
  var subset=ui.Map.FeatureViewLayer({
  assetId: 'users/ollielballinger/'+location+'_damaged_buildings_fv',
  visParams: subset_vis})
  Map.add(subset)
  }
})
var damaged_buildings=damaged_buildings.map(function(feat) {
  return ee.Algorithms.If(ee.Number(feat.get('damage_level')).gt(1),
  feat.set({'class': 1}),
  feat.set({'class': 0}))
}).filter(ee.Filter.gt('area',100))
var mean = image.reduceRegions({collection: damaged_buildings, reducer: ee.Reducer.mean(), scale: 5});
//var ROC_field = 'mean', ROC_min = mean.aggregate_min(ROC_field), ROC_max = mean.aggregate_max(ROC_field), ROC_steps = 20, ROC_points = mean
var ROC_field = 'mean', ROC_min = mean.aggregate_min(ROC_field), ROC_max = mean.aggregate_max(ROC_field), ROC_steps = 50, ROC_points = mean
//print(ROC_min, ROC_max)
var ROC = ee.FeatureCollection(ee.List.sequence(ROC_min, ROC_max, null, ROC_steps).map(function (cutoff) {
  var target_roc = ROC_points.filterMetadata('class','equals',1)
  // true-positive-rate, sensitivity  
  var TPR = ee.Number(target_roc.filterMetadata(ROC_field,'greater_than',cutoff).size()).divide(target_roc.size()) 
  var non_target_roc = ROC_points.filterMetadata('class','equals',0)
  // true-negative-rate, specificity  
  var TNR = ee.Number(non_target_roc.filterMetadata(ROC_field,'less_than',cutoff).size()).divide(non_target_roc.size()) 
  return ee.Feature(null,{cutoff: cutoff, TPR: TPR, TNR: TNR, FPR:TNR.subtract(1).multiply(-1),  dist:TPR.subtract(1).pow(2).add(TNR.subtract(1).pow(2)).sqrt()})
}))
// Use trapezoidal approximation for area under curve (AUC)
var X = ee.Array(ROC.aggregate_array('FPR')), 
    Y = ee.Array(ROC.aggregate_array('TPR')), 
    Xk_m_Xkm1 = X.slice(0,1).subtract(X.slice(0,0,-1)),
    Yk_p_Ykm1 = Y.slice(0,1).add(Y.slice(0,0,-1)),
    AUC = Xk_m_Xkm1.multiply(Yk_p_Ykm1).multiply(0.5).reduce('sum',[0]).abs().toList().get(0)
print(AUC,'Area under curve')
// Plot the ROC curve
var chart=ui.Chart.feature.byFeature(ROC, 'FPR', 'TPR').setOptions({
      title: 'ROC curve',
      legend: 'none',
      hAxis: { title: 'False-positive-rate'},
      vAxis: { title: 'True-negative-rate'},
      lineWidth: 1})
// find the cutoff value whose ROC point is closest to (0,1) (= "perfect classification")      
var ROC_best = ROC.sort('dist').first().get('cutoff').aside(print,'best ROC point cutoff')
var validated= mean.map(function(feat) {
  return ee.Algorithms.If(ee.Number(feat.get('mean')).gt(ROC_best),
  feat.set({'classification': 1}),
  feat.set({'classification': 0}))
})
var testAccuracy = validated.errorMatrix('class', 'classification');
var em = testAccuracy.array(), tp= em.get([1,1]), tn= em.get([0,0]), fp= em.get([0,1]), fn= em.get([1,0])
var precision=tp.divide(fn.add(tp))
var recall=tp.divide(fp.add(tp))
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy())
print('Precision: ',precision, 'Recall: ',recall)
Map.add(footprintPanel)
var regLabel=ui.Label('ROC Curve using damaged/undamaged building footprints:') 
footprintPanel.add(regLabel)
footprintPanel.add(chart)
footprintPanel.add(homeButton)
//regression(image.gt(ee.Number(ROC_best)).clip(damaged_buildings))
}
// ------------------------------------- USER INTERFACE -------------------------------------
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
    min: 0,
    max: 1,
    palette: palette.reverse(),
  };
}
var reds = ["yellow", "red","purple"];
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(reds.reverse()),
  style: { stretch: "horizontal", margin: "0px 8px", maxHeight: "24px" },
});
var legendTitle = ui.Label({
  value: "Damage Probability",
  style: { fontWeight: "bold" ,textAlign: "center",stretch: "horizontal"},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label('Low', { margin: "4px 8px" }),
    ui.Label( " ", {
      margin: "4px 8px",
      textAlign: "center",
      stretch: "horizontal",
    }),
    ui.Label('High', { margin: "4px 8px" }),
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
});
var legendPanel = ui.Panel({
  widgets: [legendTitle, colorBar,legendLabels],
  style:{height:'90px'}
});
var footageButton=ui.Button({
  label:"Show Geolocated Footage",
  onClick: function(){
  Map.layers().get(1).setShown(false)  
  },
  style:{stretch: "horizontal"}
})
var locationDict = {
  "Mariupol": {
    lat:47.10417, 
    lon:37.60185,
    loc:'mariupol'
  },
  "Irpin": {
    lat:50.5172, 
    lon:30.2384,
    loc: 'irpin',
  }
};
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui
  .Select({
    items: locations,
    onChange: function (value) {
      var location = locationDict[value];
      accuracy(location.lat,location.lon, location.loc)
    },
  })
  .setPlaceholder("Choose a Location");
var locationPanel = ui.Panel([
  ui.Label("Accuracy Assessment", { "font-size": "20px" }),
  locationSelect,
]);
var homeButton=ui.Button({
  label:"Home",
  onClick: function(){
    clear()
    Map.add(footagePanel)
  }
  ,
  style:{stretch: "horizontal"}
})
var sliderPanel = ui.Panel();
var start = "2022-02-28";
var now = Date.now();
var end = ee.Date(now).format();
var drawButton = ui.Button({
  label: "🔺" + " Draw a Polygon",
  onClick: drawPolygon,
  style: { stretch: "horizontal" },
});
var outputLabel=ui.Label()
var footagePanel = ui.Panel({
  widgets: [
    ui.Label("Ukraine Damage Assessment", {
      fontWeight: "bold",
      fontSize: "20px",
    }),
    ui.Label(
      "Click the button below and draw a box on the map to get an estimate of the number of damaged buildings in a given area",
      { whiteSpace: "wrap" }
    ),
    drawButton,
    ui.Label(),
    ui.Label(
      "Click on the button to display geolocated photos and videos of damage from social media. Clicking on a pin will show further details related to the conflict event, as well as the source media.",
      { whiteSpace: "wrap" }
    ),
    footageButton,
    locationPanel,
    legendPanel
  ],
  style: { position: "top-left", maxWidth: "350px", maxHeight:'90%'},
  layout: ui.Panel.Layout.flow("vertical", true),
});
var table = ee.FeatureCollection("users/ollielballinger/ukraine")
  .map(function (feature) {
    var date = ee.Date(feature.get("date"));
    return feature.set("system:time_start", date);
  });
var filtered_clashes = table;
table = table.map(function (feature) {
  var pt_size = feature.get("pt_size");
  var styles = ee.Dictionary({
    "#005e38": {
      color: "black",
      fillColor: "green",
      pointSize: pt_size,
      pointShape: "circle",
    },
    "#cc1b15": {
      color: "black",
      fillColor: "red",
      pointSize: pt_size,
      pointShape: "square",
    },
    "#f18729": {
      color: "black",
      fillColor: "orange",
      pointSize: pt_size,
      pointShape: "diamond",
    },
    "#ffcc00": {
      color: "black",
      fillColor: "yellow",
      pointSize: pt_size,
      pointShape: "plus",
    },
  });
  return feature.set("style", styles.get(feature.get("color")));
});
// Style the FeatureCollection according to each feature's "style" property.
var fcVisCustom = table.style({
  styleProperty: "style",
});
// Run this function on a change of the dateSlider.
var filterDates = function (range) {
  var filtered_clashes = table.filterDate(range.start(),range.end())
  Map.layers().set(1, filtered_clashes.style({ styleProperty: "style" }));
  return filtered_clashes;
};
// // Asynchronously compute the date range and show the slider.
// var dateRange = ee.DateRange(start, end).evaluate(function (range) {
//   var dateSlider = ui.DateSlider({
//     start: range["dates"][0],
//     end: range["dates"][1],
//     period: 31,
//     onChange: filterDates,
//     style: { width: "95%" },
//   });
//   //sliderPanel.add(dateSlider);
// });
var info_panel = ui.Panel({
  style: {
    position: "top-right",
    width: "300px",
    maxHeight: "500px",
    shown: false,
  },
});
var makeBuffer=function(feature){
    var buffered_pt=ee.Feature(feature).buffer(100)
    var empty = ee.Image().byte();
    var outline = empty.paint({
    featureCollection: buffered_pt,
    color: 1,
    width: 3
    });
    var radius_layer=ui.Map.Layer(outline,{palette: '#00FFFF'}, 'edges')
    Map.layers().set(2,radius_layer)
    return buffered_pt
}
var SEARCH_DISTANCE = 5000; // Meters.
function getProps(coords) {
  if (!info_panel.style().get("shown")) {
    info_panel.style().set("shown", true);
  }
  ui.url.set("lon", coords.lon.toFixed(4));
  ui.url.set("lat", coords.lat.toFixed(4));
  ui.url.set("zoom", Map.getZoom());
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var selectedPt = filtered_clashes
    .filterBounds(point.buffer(SEARCH_DISTANCE))
    .map(function (ft) {
      return ft.set("system:click_distance", point.distance(ft.geometry()));
    })
    .sort("system:click_distance")
    .first();
  var title = ui.Label({
    value: selectedPt.get("title").getInfo(),
    style: { fontWeight: "bold" },
  });
  var group = ui.Label("Event Type: " + selectedPt.get("group").getInfo());
  var violence_lvl = ui.Label(
    "Violence Level: " + selectedPt.get("violence_lvl").getInfo()
  );
  var url = ui.Label(
    "Click here to view source media",
    {},
    selectedPt.get("url").getInfo()
  );
  var pop_in_radius=makeBuffer(selectedPt)
  var bufferLabel3=ui.Label(pop_in_radius, {textAlign:'center',fontSize:'24px'})
  var info = ui.Panel([title, group, violence_lvl, url]);
  info_panel.widgets().set(0, info);
  //info_panel.widgets().reset([info]);
  //info_panel.widgets().set(2, bufferLabel3);
}
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry = ui.Map.GeometryLayer({
  geometries: null,
  name: "geometry",
  color: "23cba7",
}).setShown(false);
drawingTools.layers().add(dummyGeometry)
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape("rectangle");
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape("point");
  //var pointBuffer = point.buffer({'distance': 100});
  drawingTools.draw();
}
// set position of panel
var legend = ui.Panel({
  style: {
    position: "bottom-right",
    padding: "8px 15px",
  },
});
// Create legend title
var legendTitle = ui.Label({
  value: "Legend",
  style: {
    fontWeight: "bold",
    fontSize: "18px",
    margin: "0 0 4px 0",
    padding: "0",
  },
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function (color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: "#" + color,
      // Use padding to give the box height and width.
      padding: "8px",
      margin: "0 0 4px 0",
    },
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: { margin: "0 0 4px 6px" },
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow("horizontal"),
  });
};
//  Palette with the colors
var palette = ["005e38", "cc1b15", "f18729", "ffcc00"];
// name of the legend
var names = ["Military Movements", "Casualties", "Combat", "Other"];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
function clear(){
  Map.clear()  
  //Map.addLayer(image, {'min': 0, 'max': 12,opacity:0.5, palette:damage_palette}, 'coherence')
  var lon = ui.url.get("lon", -9999);
  var lat = ui.url.get("lat", -9999);
  var zoom = ui.url.get("zoom", -9999);
  Map.add(legendPanel)
}
// -------------------------------------- SETUP ----------------------------------------------
function clear(){
  Map.clear()  
  var ua = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filter(ee.Filter.eq('ADM0_NAME', "Ukraine")).geometry()
  Map.setOptions('HYBRID')
  Map.setControlVisibility({all: false});
  Map.setControlVisibility({layerList: true, mapTypeControl: true});
  var urban = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').filterDate('2021-01-01','2022-01-01').mean().select('built')
   var boxcar = ee.Kernel.gaussian({
     radius: 50, units: 'meters', normalize: true, sigma: 20
   });
  // Call the filter_s1 function twice, once for each orbit, and then combine the two images into a single image
  var asc = filter_s1("ASCENDING")
  var desc = filter_s1("DESCENDING")
  var image = ee
  .ImageCollection([asc,desc]).mean().convolve(boxcar)
  .updateMask(urban.gt(0.1))
  //.clip(ua)
// Add the composite to the map
var reds = ["yellow", "red","purple"];
// Add the composite to the map
var damage_layer=ui.Map.Layer(
  image.updateMask(image.gt(2.2)),
  { min: 2.2, max: 6, opacity: 0.8, palette: reds },
  "change"
);
Map.layers().set(0,damage_layer)  
  Map.style().set("cursor", "crosshair");
  var lon = ui.url.get("lon", -9999);
  var lat = ui.url.get("lat", -9999);
  var zoom = ui.url.get("zoom", -9999);
  if (lon != -9999 && lat != -9999) {
    Map.setCenter(lon, lat, zoom);
    var initialPoint = ee.Geometry.Point(lon, lat);
  } else {
    // defauilt location
    var initialPoint = ee.Geometry.Point(37.57199, 47.10211);
    Map.centerObject(initialPoint, 13);
  }
  Map.add(legend);
  var info=ui.Panel('') 
  info_panel.widgets().set(0, info);
  Map.onClick(getProps);
  return image
}
function home(){
  var image=clear()
Map.add(info_panel)
Map.add(footagePanel)
Map.addLayer(fcVisCustom,{},'Conflict Events', false);
return image
}
function footprints(){
  var aoi = drawingTools.layers().get(0).getEeObject();
  drawingTools.layers().get(0).setShown(false);
  var footprints  = ee.FeatureCollection('projects/sat-io/open-datasets/MSBuildings/Ukraine')
              .filterBounds(aoi)
              .map(function(feat){
                return feat.set('area', feat.geometry().area(10)).set('geometry_type', feat.geometry().type());
              })
                .filter(ee.Filter.gt('area',100))
                .filter(ee.Filter.equals('geometry_type', 'Polygon'));
  var mean = image.reduceRegions({collection: footprints, reducer: ee.Reducer.mean(), scale: 10});
  var damaged= mean.filter(ee.Filter.gt('mean',2))
  var totalCount=mean.size()
  var damagedCount=damaged.size()
  var proportion=((damagedCount.divide(totalCount)).multiply(100)).int()//.evaluate(function(val){return val});
  var sumLabel2 = ui.Label({
      value: 'Calculating...'
    })
  var meanLabel2 = ui.Label({
      value: 'Calculating...'
    })
  damagedCount.evaluate(function(val){sumLabel2.setValue(val)});
  proportion.evaluate(function(val){meanLabel2.setValue(val)});
  var sumLabel1=ui.Label("Number of damaged buildings in the area: ")
  var meanLabel1=ui.Label("Proportion (%): ")
  var sumPanel=ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
    widgets:[sumLabel1,sumLabel2]})
  var meanPanel=ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
    widgets:[meanLabel1,meanLabel2]})
 var statsPanel=ui.Panel([sumPanel,meanPanel])
 footagePanel.widgets().set(3, statsPanel);
  Export.table.toDrive({
    collection: damaged,
    description: '_damaged_buildings',
  });
  Export.image.toDrive({
    image: image.clip(aoi),
    scale:10,
    description: '_damage',
  });
  var outlines=ui.Map.Layer(damaged, {color: 'red'}, 'footprints');
  Map.layers().set(2,outlines)  
  Map.layers().get(0).setShown(false)  
  Map.layers().get(1).setShown(false)
  }
var image=home()
drawingTools.onDraw(ui.util.debounce(footprints, 500));