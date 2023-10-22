var buildings = ee.FeatureCollection("users/davidparastatidis/Sentinel_2_NBS_monitoring_application/london_buildings"),
    Capitals = ee.FeatureCollection("users/davidparastatidis/Sentinel_2_NBS_monitoring_application/London"),
    GreenRoofsLondon = ee.Image("users/davidparastatidis/Sentinel_2_NBS_monitoring_application/GreenRoofs_London");
///////////////////////////////////////////////USER INTERFACE//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//palettes NDVI GreenRoof images
var NDVIvis = {min: 0, max:1, palette: ['#6e462c', '#9c8448', '#cccc66', '#9cab68', '#306466']};
var GRvis = {min: 0, max:1, palette: ['blue', 'yellow', 'red']};
//Global variable to hold map widget
var splitPanel
// Create a panel to hold title, intro text and chart
var inspectorPanel = ui.Panel();
ui.root.widgets().insert(0, inspectorPanel)
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Urban NBS application',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label("Select between GreenRoof Detection and  monitoring.\n" +
           "Then select a polygon on the map to start.",
           {whiteSpace:'pre'})
]);
inspectorPanel.widgets().set(0, intro);
//UI selector for the user to choose type of NBS
var selectApplication = ui.Select({items:['GreenRoof Detection', 'GreenRoof monitoring'],
                                   onChange: initiateApplication})
                          .setValue('GreenRoof Detection')
inspectorPanel.widgets().set(1, selectApplication);
// Create panels to hold lon/lat values.
var lonText = ui.Label("Longitude: ");
var lonLabel = ui.Label();
var latText = ui.Label("Latitude: ");
var latLabel = ui.Label();
inspectorPanel.widgets().set(2, ui.Panel([lonText, lonLabel], ui.Panel.Layout.flow('horizontal')));
inspectorPanel.widgets().set(3, ui.Panel([latText, latLabel], ui.Panel.Layout.flow('horizontal')));
//Empty panel holders, used later for graph
inspectorPanel.widgets().set(4, ui.Panel())
//Put logos
var eovalueLogo = ui.Thumbnail({image: ee.Image('users/davidparastatidis/Sentinel_2_NBS_monitoring_application/EOValue'), style:{width: '177px', height:'34px'}})
var EClogo = ui.Thumbnail({image: ee.Image('users/davidparastatidis/Sentinel_2_NBS_monitoring_application/EClogo'), style:{width: '150px', height:'100px', margin:'175px 0px 0px'}});
var FORTHlogo = ui.Thumbnail({image: ee.Image('users/davidparastatidis/Sentinel_2_NBS_monitoring_application/rslab'), style:{width: '143px', height:'34px'}});
inspectorPanel.widgets().set(5, ui.Panel({widgets:[EClogo], style:{textAlign:'bottom'}}))
inspectorPanel.widgets().set(6, ui.Panel([eovalueLogo, FORTHlogo], ui.Panel.Layout.flow('horizontal')))
//Put JRC statement
var statement = ui.Label("This application has been developed within the EOVALUE \n" +
                         "project, which has received funding from the European \n" +
                         "Union’s Horizon 2020 research and innovation programme. \n" +
                         "The JRC, or as the case may be the European Commission, \n" +
                         "shall not be held liable for any direct or indirect, \n" +
                         "incidental, consequential or other damages, including \n" +
                         "but not limited to the loss of data, loss of profits, \n" +
                         "this application, or inability to use it, even if the \n" +
                         "JRC is or any other financial loss arising from the \n" +
                         "use of notified of the possibility of such damages.",
                         {whiteSpace:'pre', fontFamily:'Verdana italic'})
inspectorPanel.widgets().set(7, ui.Panel([statement]))
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
function initiateApplication(selected){
  if(selected=="GreenRoof Detection"){
    createSinglePanel()
  }
  else if(selected=="GreenRoof monitoring"){
    var center = splitPanel.getCenter()
    var zoom = splitPanel.getZoom()
    createSplitPanel(center, zoom);
  }
}
function createSinglePanel(){
  splitPanel = ui.Map();
  ui.root.widgets().set(1, splitPanel);
  splitPanel.setCenter(15.234411674725493, 47.99933705444007)
  splitPanel.style().set('cursor', 'crosshair');
  splitPanel.setOptions('HYBRID');
  splitPanel.onClick(GRdetection)
  // Add the polygon layer on the map
  splitPanel.addLayer(Capitals.style({color:'red', fillColor: '00000000'}), {}, "Area of Interest");
  // Add the GreenRoof likelihood colorbar on the map
  splitPanel.add(GreenRoofColorBar())
  //Empty Graph holders
  inspectorPanel.widgets().set(4, ui.Panel())
}
function createSplitPanel(center, zoom){
  // Create the left map of the SplitPanel
  var leftMap = ui.Map();
  leftMap.centerObject(center, zoom)
  //leftMap.setZoom(zoom)
  leftMap.style().set('cursor', 'crosshair');
  leftMap.setOptions('HYBRID');
  leftMap.onClick(GRmonitoring);
  // Create the right map of the SplitPanel.
  var rightMap = ui.Map();
  //rightMap.setCenter(15.234411674725493, 47.99933705444007)
  rightMap.style().set('cursor', 'crosshair');
  rightMap.setOptions('HYBRID');
  rightMap.onClick(GRmonitoring);
  // Create a SplitPanel to hold the adjacent, linked maps.
  splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().set(1, splitPanel);
  var linker = ui.Map.Linker([leftMap, rightMap]);
  // Add polygon layer to both left and right maps
  splitPanel.getFirstPanel().addLayer(buildings.style({color:'red', fillColor: '00000000'}), {}, "Buildings footprint");
  splitPanel.getSecondPanel().addLayer(buildings.style({color:'red', fillColor: '00000000'}), {}, "Buildings footprint");
  // Add the colorbar
  splitPanel.getFirstPanel().add(NDVIColorBar());
  splitPanel.getSecondPanel().add(NDVIColorBar());
}
//Create GreenRoof likelihood colobar
function GreenRoofColorBar(){
  // Create the colorbar image.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {bbox: [0, 0, 1, 0.1], dimensions: '400x40', format: 'png', min: GRvis.min, max: GRvis.max, palette: GRvis.palette},
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  //Create colorbar panel with numbers
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label('Low'),
      ui.Label(
          ('Medium'),
          {textAlign: 'center', stretch: 'horizontal'}),
      ui.Label('High')
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  //Create colorbar title
  var legendTitle = ui.Label({
    value: 'GreenRoof likelihood',
    style: {fontWeight: 'bold', textAlign:'center', stretch: 'horizontal'}
  });
  return ui.Panel([legendTitle, colorBar, legendLabels], "flow",{padding: '0px', position: 'top-center'});
}
//Creates NDVI colorbar
function NDVIColorBar(){
  // Create the colorbar image.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {bbox: [0, 0, 1, 0.1], dimensions: '400x40', format: 'png', min: NDVIvis.min, max: NDVIvis.max, palette: NDVIvis.palette},
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  //Create colorbar panel with numbers
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(NDVIvis.min),
      ui.Label(
          (NDVIvis.max / 2),
          {textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(NDVIvis.max)
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  //Create colorbar title
  var legendTitle = ui.Label({
    value: 'Normalized Difference Vegetation Index',
    style: {fontWeight: 'bold', textAlign:'center', stretch: 'horizontal'}
  });
  return ui.Panel([legendTitle, colorBar, legendLabels], "flow",{padding: '0px', position: 'top-center'});
}
//Call all functions needed for generating results
function GRdetection(coords){
  //Extracts the selected polygon from the features list
  //var polygon = getCityPolygon(coords);
  //Gets the sentinel images of the selected area
  //var collection = getSentinelCollection(polygon);
  //Creates NDVI collection
  //var roofsNDVI = getNDVI(collection, polygon);
  //buildings = buildings.filterBounds(Capitals)
  //buildings = buildings.map(function(feature){
  //  return feature.buffer(-5)
  //})
  //var greenRoofs = roofsNDVI.filterDate(ee.Date('2019-01-01'),ee.Date('2020-01-01')).max()
    //                        .subtract(roofsNDVI.filterDate(ee.Date('2019-01-01'),ee.Date('2020-01-01')).min())
    //                        .clip(buildings)
  //splitPanel.addLayer(greenRoofs, {'min':GRvis.min, 'max':GRvis.max, 'palette':GRvis.palette}, "GreenRoof")
  splitPanel.addLayer(GreenRoofsLondon, {'min':GRvis.min, 'max':GRvis.max, 'palette':GRvis.palette}, "GreenRoof")
}
function GRmonitoring(coords){
  //Extracts the selected polygon from the features list
  var polygon = getBuildingPolygon(coords);
  //Gets the sentinel images of the selected area
  var collection = getSentinelCollection(polygon);
  //Creates NDVI collection
  var roofsNDVI = getNDVI(collection, polygon);
  //Creates one NDVI image for each year from the images of the Spring season
  var monthlyRoofsNDVI = getMonthlyNDVI(roofsNDVI);
  // Display the images.
  var leftSelector = addLayerSelector(monthlyRoofsNDVI, splitPanel.getFirstPanel(), 0, 'bottom-left', 3, polygon);
  var rightSelector = addLayerSelector(monthlyRoofsNDVI, splitPanel.getSecondPanel(), 2, 'bottom-right', 2, polygon);
  //Create NDVI timeseries
  createTimeseries(monthlyRoofsNDVI, polygon)
}
//Returns the polygon of the city coresponding to the coordinates of the point where the user clicked on the map
function getCityPolygon(coords){
  // Update the lon/lat panel with values from the click event.
  lonLabel.setValue(coords.lon);
  latLabel.setValue(coords.lat);
  return ee.Feature(Capitals.filterBounds(ee.Geometry.Point([coords.lon, coords.lat])).first()).geometry();
}
//Returns the polygon of the building coresponding to the coordinates of the point where the user clicked on the map
function getBuildingPolygon(coords){
  // Update the lon/lat panel with values from the click event.
  lonLabel.setValue(coords.lon);
  latLabel.setValue(coords.lat);
  return ee.Feature(buildings.filterBounds(ee.Geometry.Point([coords.lon, coords.lat])).first()).geometry();
}
//Returns the Sentinel image collection coresponding to the given polygon
function getSentinelCollection (polygon){
  return ee.ImageCollection("COPERNICUS/S2_SR")
                .filterBounds(polygon)
                .select(['B3', 'B4','B8','QA60'])
}
//Returns a NDVI collection from all Sentinel 2 images
function getNDVI(col, polygon){
  var NDVIcollection = col.map(function(img){
        var cloudmask = img.select('QA60').bitwiseAnd(1024).eq(0);
        var cloudmask2 = img.select('QA60').bitwiseAnd(2048).eq(0);
        img = img.updateMask(cloudmask.updateMask(cloudmask2));
        return img.normalizedDifference(['B8','B4'])
                  .set({'system:time_start':img.get('system:time_start')})
                  .set({'system:id':img.get('system:id')})
                  .rename(['NDVI'])
  });
  return NDVIcollection
}
function getMonthlyNDVI(col){
  var months = ee.List.sequence(0, 33)
  var yearlyCollection = ee.ImageCollection(months.map(function(month){
    var start = ee.Date.fromYMD(2017, 4, 1).advance(month, 'month')
    var end = start.advance(1, 'month')
    return ee.Image(col.filterDate(start, end)
              .median()
              .set({'system:time_start': start.millis()}))
              .set({'Date':start.format('YYYY-MM')})
    }))
  return yearlyCollection
}
function getNDWI(col, polygon){
  var NDWIcollection = col.map(function(img){
        var cloudmask = img.select('QA60').bitwiseAnd(1024).eq(0);
        var cloudmask2 = img.select('QA60').bitwiseAnd(2048).eq(0);
        img = img.updateMask(cloudmask.and(cloudmask2));
        return img.normalizedDifference(['B3','B8'])
                  .set({'system:time_start':img.get('system:time_start')})
                  .set({'system:id':img.get('system:id')});
  });
  return NDWIcollection
}
//Generate Histogram for max ndvi for each year in the selected region
function createTimeseries(col, polygon){
  // Pre-define some customization options.
  var options = {
    title: 'Monthly median NDVI of building',
    fontSize: 20,
    lineWidth: 1,
    pointSize: 5,
    hAxis: {title: 'Months'},
    vAxis: {title: 'NDVI'},
    series: {
      0: {color: 'green'},
    }
  };
  var timeseries = ui.Chart.image.series(col, polygon, ee.Reducer.median(), 10)
                                 .setOptions(options)
                                 .setSeriesNames(["Sentinel 2"], 0)
  inspectorPanel.widgets().set(4, timeseries);
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(col, mapToChange, defaultValue, position, stackPosition, polygon) {
  var label = ui.Label('Choose an image to visualize');
   //Changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(1, ui.Map.Layer(col[selection].clip(polygon)));
  }
  col.aggregate_array("Date").evaluate(function(ids) {
    var select = ui.Select({items: ids, onChange: function (selection){
      var layer = col.filter(ee.Filter.eq("Date", selection)).first().clip(polygon)
      mapToChange.layers().set(1, ui.Map.Layer(layer,{min: NDVIvis.min, max: NDVIvis.max, palette: NDVIvis.palette}, "selected NDVI"));
    }});
    var controlPanel =ui.Panel({widgets: [label, select], style: {position: position}});
    mapToChange.widgets().set(stackPosition, controlPanel);
  })
}