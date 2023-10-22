var UNC_R = ui.import && ui.import("UNC_R", "image", {
      "id": "users/sntopp/UNC_Research"
    }) || ee.Image("users/sntopp/UNC_Research"),
    classes = ui.import && ui.import("classes", "image", {
      "id": "users/sntopp/COVIDPortR/ShippingClasses_noMask"
    }) || ee.Image("users/sntopp/COVIDPortR/ShippingClasses_noMask"),
    covDif = ui.import && ui.import("covDif", "image", {
      "id": "users/sntopp/COVIDPortR/COVIDChlDif_noMask"
    }) || ee.Image("users/sntopp/COVIDPortR/COVIDChlDif_noMask");
// Create a map for each visualization option.
var chlMap = ui.Map()
chlMap.add(ui.Label('Chlorophyll-a Difference'))
chlMap.addLayer(covDif.select('chlor_a_median'),{min:-1, max:1, palette:['#52a4ff','#00f9ff','#cccccc','#50ff7f','#44ff32']},'chlorDiff')
chlMap.setControlVisibility(false)
chlMap.setOptions('HYBRID')
var shipMap = ui.Map()
shipMap.add(ui.Label('Shipping Classes'))
shipMap.addLayer(classes, {palette:[ "#440154FF", "#482878FF", "#3E4A89FF", "#31688EFF", "#26828EFF", "#1F9E89FF", "#35B779FF", "#6DCD59FF", "#B4DE2CFF", "#FDE725FF"] ,min:1, max:10},'Classes')
shipMap.setControlVisibility(false)
shipMap.setOptions('HYBRID')
var maps = [chlMap,shipMap]                    
print(maps)                    
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel({
  widgets: [maps[0], maps[1]],
  layout: ui.Panel.Layout.flow('horizontal'),
  style:{stretch: 'both',border:'1px solid black'}
  })
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
maps[0].setCenter(1.109, 50.689, 5);
///Make some legends
var visChl = {palette: ['#52a4ff','#00f9ff','#cccccc','#50ff7f','#44ff32'], min: -1, max: 1};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
var visShip = {palette: ["#440154FF", "#482878FF", "#3E4A89FF", "#31688EFF", "#26828EFF", "#1F9E89FF", "#35B779FF", "#6DCD59FF", "#B4DE2CFF", "#FDE725FF"], min: 1, max: 10};
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
// Create the color bar for the legend.
var colorBarChl = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visChl.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var colorBarShip = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visShip.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabelsChl = ui.Panel({
  widgets: [
    ui.Label('<-1', {margin: '4px 8px'}),
    ui.Label('0',
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('>1', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendLabelsShip = ui.Panel({
  widgets: [
    ui.Label('1 (Minimal Shipping)', {margin: '4px 8px'}),
    ui.Label('5',
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('(Heavy Shipping) 10', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitleChl = ui.Label({
  value: 'Chlor-a Change in mg/cu. m \n(Blue = Less Chl-a during COVID) \n(Green = More Chl-a During COVID)',
  style: {fontWeight: 'bold', whiteSpace:'pre'}
});
var legendTitleShip = ui.Label({
  value: 'Ocean Shipping Pressure',
  style: {fontWeight: 'bold'}
});
var legendPanelChl = ui.Panel([legendTitleChl, colorBarChl, legendLabelsChl]);
var legendPanelShip = ui.Panel([legendTitleShip, colorBarShip, legendLabelsShip]);
/*
 * Add a title and initialize
 */
var panel = ui.Panel({widgets:[
  ui.Label({
    value: 'COVID Ocean Productivity Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('The left panel depicts the average difference of chlorophyll-a production between historical levels and 2020, measured as median Chl-a between January 23 and March 19th in 2020 minus the historical (2010-2019) median for the same period'),
  ui.Label('The right panel depicts ocean shipping pressure as calculated by Halpern et al., 2015'),
  legendPanelChl,
  legendPanelShip,
  ui.Thumbnail({image:UNC_R,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px', padding:'5px'}})/*,
  ui.Label({value:'Watermasks: Pekel et al., 2016 (Nature); Deforestation: Hansen et al., 2013 (Science)',
            style:{fontSize:'10px'}})*/
  ], style:{'width':'350px', 'position':'bottom-left', 'padding':'7px'
}});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([panel, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));