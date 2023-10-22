// OBJECTIVE: Calculate change and projection of evolution for a custom area
// STEP1: Replace in the equation below, 'ISO3' with the 3 letter country
// code of the targeted country (where the area to be analyzed is located)
// list of ISO3 codes here: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
var country = ['SRB'] // example: var country = ['FRA'] for France
// STEP2: On the map below, zoom on the area of interest, then click
// on the small square icon in the top left corner and delimit the area
// of interest. If you are not satisfied with the area delimited, click on
// the 'hand' icon and then select the area you drew to delete it
// STEP3: Click on the 'Run' button above which will output two graphs
// on the right panel (scroll up and down to see each). You can click on the icon
// in the top right corner of each graph to download the source data
// THE REST OF FOR CODE DEVELOPERS ONLY
///////////////// CODE FOR CALCULATING POP ///////////////////////
var corridor = ee.FeatureCollection("users/alexchunet/belgrade_pacevo");
//var worldPop = ee.ImageCollection("WorldPop/POP")
var worldPop = ee.ImageCollection("WorldPop/GP/100m/pop")
// function to add time as a band
var addTime = function(image) {
  // Scale milliseconds by a large constant to avoid very small slopes
  // in the linear regression output.
  return image.addBands(image.metadata('system:time_start').divide(1e18));
};
// select country and add time bands
var wp =  worldPop
  .filter(ee.Filter.inList('country', country)).map(addTime)
  .select(['system:time_start', 'population']);
var display = {
  title: "Historic population (500m buffer)",
  fontSize: 12,
  hAxis: {title: 'Year'},
  vAxis: {title: "Total Population"}};
// set viz paramater
var viz = {min:0.0, max:50, palette:"F3FEEE,00ff04,075e09,0000FF,FDFF92,FF2700,FF00E7"};
// add 2020 year to the map
var img2010 = ee.ImageCollection("WorldPop/GP/100m/pop") .filterDate('2020');
var populationVis = {
    min: 0.0,
    max: 50.0,
    opacity: 0.4,
    palette: ['24126c', '1fff4f', 'd4ff50'],
    };
var buffer = corridor.geometry()
var panel = ui.Panel(ui.Chart.image.series({imageCollection:wp, 
                             region:corridor, 
                             reducer:ee.Reducer.sum(),
                             scale:100}).setOptions(display))
panel.style().set({ width: '400px', position: 'bottom-right'})
Map.centerObject(corridor)
Map.add(ui.Label('Belgrade - Pancevo railway corridor', {fontWeight: 'bold', fontSize: '24px'}))
Map.addLayer(buffer, {color: 'red'}, 'corridor')
Map.addLayer(img2010, populationVis, 'Population')
Map.add(panel)