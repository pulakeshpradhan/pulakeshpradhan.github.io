var srtm = ee.Image( "CGIAR/SRTM90_V4");
var alos = ee.ImageCollection( "JAXA/ALOS/AW3D30/V3_2" );
var glo30 = ee.ImageCollection("projects/sat-io/open-datasets/GLO-30" );
var fabdem = ee.ImageCollection("projects/sat-io/open-datasets/FABDEM");
var countries = ee.FeatureCollection("FAO/GAUL/2015/level0");
//Create Tiled Maps
var ELEVATION_BAND = "elev";
srtm =srtm.rename(ELEVATION_BAND);
alos = alos.mosaic().select('DSM').rename(ELEVATION_BAND);
glo30 = glo30.mosaic().rename(ELEVATION_BAND);
fabdem = fabdem.mosaic().rename(ELEVATION_BAND);
var infoPanel;
var showMessage = function(title, texts){
  if( infoPanel ){
    ui.root.widgets().remove( infoPanel );  
  }
  var title = ui.Label( title, {backgroundColor:"#bfb08a", fontWeight :"bold", padding : "10px", textAlign : "center", minWidth : "500px"});  var labels = [ title ];
  for( var i = 0; i < texts.length ; i++){
    labels.push( ui.Label( texts[i] , {color:"#3b352a"}) );
  }
  var closeButton = ui.Button( "Close");
  closeButton.onClick( function(){
     ui.root.widgets().remove( infoPanel );  
     infoPanel = null;
  });
  labels.push( closeButton );
  infoPanel = ui.Panel( labels, ui.Panel.Layout.flow( "vertical" ) );
  var widgets= ui.root.widgets();
  widgets.insert(0,  infoPanel );
};
function reduce( image, latLongObject ){
  return image.reduceRegion(
    {
      reducer : ee.Reducer.mean(),
      geometry : ee.Geometry.Point( [latLongObject.get("lon") ,  latLongObject.get("lat") ]),
      scale : 30
    }
  ).get( ELEVATION_BAND );
}
function showElevation( latLongObject ){
  latLongObject = ee.Dictionary( latLongObject );
  var srtmElev = reduce( srtm, latLongObject ).getInfo();
  var alosElev = reduce( alos, latLongObject ).getInfo();
  var glo30Elev = reduce( glo30, latLongObject ).getInfo();
  var fabdemElev = reduce( fabdem, latLongObject ).getInfo();
  var elevations = [
    "SRTM 30m " + srtmElev , 
    "ALOS 30m " + alosElev ,
    "Copernicus GLO 30m " + glo30Elev ,
    "FABDEM 30m " + fabdemElev 
  ];
  showMessage(
    "Elevation at pixel : lat : " + latLongObject.get("lat").getInfo() + " long : " + latLongObject.get("lon").getInfo(),
    elevations        
  ); 
}
var image = srtm.addBands(alos).addBands(glo30).addBands(fabdem);
var NAMES = [
  'SRTM 30m DEM',
  'ALOS 30m DSM',
  'Copernicus GLO 30m DEM',
  'FABDEM 30m DEM'
];
var VIS_PARAMS = [
  {'palette':['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'], min: 0, max: 3000},
  {'palette':['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'], min: 0, max: 3000},
  {'palette':['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'], min: 0, max: 3000},
  {'palette':['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'], min: 0, max: 3000}
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image.select([index]), VIS_PARAMS[index], image.select([index]).bandNames().get(0).getInfo());
  map.setControlVisibility(false);
  map.onClick( showElevation );
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// Create a title.
var title = ui.Label('Global 30m Elevation datasets', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel([
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps near Sacramento.
maps[0].setCenter(132.2587, -24.076, 10);