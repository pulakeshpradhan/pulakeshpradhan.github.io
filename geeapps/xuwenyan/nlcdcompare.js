var nlcd=ee.ImageCollection("USGS/NLCD_RELEASES/2016_REL")
print(nlcd)
//select baseline year NLCD
var nlcds={
  '1992':ee.Image('USGS/NLCD_RELEASES/2016_REL/1992').select('landcover').visualize(),
  '2001':ee.Image('USGS/NLCD_RELEASES/2016_REL/2001').select('landcover').visualize(),
  '2006':ee.Image('USGS/NLCD_RELEASES/2016_REL/2006').select('landcover').visualize(),
  '2011':ee.Image('USGS/NLCD_RELEASES/2016_REL/2011').select('landcover').visualize(),
  '2016':ee.Image('USGS/NLCD_RELEASES/2016_REL/2016').select('landcover').visualize(),
}
print(nlcds)
// add layer selection widgets to the map
function addLayerSelector(map,value,position){
  var label=ui.Label('Choose a year to visulize')
  // change to show which ncld maps in different year
  function updateMap(selection){
    map.layers().set(0,ui.Map.Layer(nlcds[selection]))
  }
  //configure a selection dropdown to choose differnet years
  var select =ui.Select({items:Object.keys(nlcds),onChange:updateMap})
  select.setValue (Object.keys(nlcds)[value],true)
  var controlPanel=ui.Panel({
    widgets:[label,select],
    style:{position:position}
  })
  map.add(controlPanel)
}  
  //set up the maps and controlwidgets
  var leftMap=ui.Map()
  leftMap.setControlVisibility(false)
  var leftSelector=addLayerSelector(leftMap,0,'top-left')
  var rightMap=ui.Map()
  rightMap.setControlVisibility(false)
  var rightSelector=addLayerSelector(rightMap,0,'top-right')
  //create a splitPanel to link two maps
  var splitPanel=ui.SplitPanel({
    firstPanel:leftMap,
    secondPanel:rightMap,
    wipe:true,
    style:{stretch:'both'}
  })
  ui.root.widgets().reset([splitPanel])
  var linker=ui.Map.Linker([leftMap,rightMap])
  leftMap.setCenter(-105,38,12)