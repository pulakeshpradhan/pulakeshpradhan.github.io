var infoPanel = ui.Panel({style: {width: '27%'}});
var swipeSwitchIndex = 11;
var mapComparison = ui.Panel([
  ui.Label({
    value: 'Map Comparison',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
// Add widgets to the info panel.
infoPanel.add(mapComparison);
var mapChartSplitPanel = ui.Panel(ui.SplitPanel({
  firstPanel: ui.Panel(sliderPanel, null, {height: '62%'}), //
  secondPanel: tsChart,
  orientation: 'vertical',
  wipe: false,
}));
var leftMap = ui.Map();
var rightMap = ui.Map();
// left map draw only.
var rightMapDrawLabel = ui.Label({value: 'Drawing disabled on this side', style: {color: 'EE605E', position: 'top-right', backgroundColor: 'rgba(255, 255, 255, 1.0)'}})
rightMap.add(rightMapDrawLabel);
// Set map properties
//leftMap.setControlVisibility({layerList: false, zoomControl: false, fullscreenControl: false});
//rightMap.setControlVisibility({layerList: false, zoomControl: false, fullscreenControl: false});
//leftMap.drawingTools().setLinked(true);
//rightMap.drawingTools().setLinked(true);
//leftMap.drawingTools().setShown(false);
//rightMap.drawingTools().setShown(false);
//leftMap.setOptions('Dark', {Dark: darkMap()});
//rightMap.setOptions('Dark', {Dark: darkMap()});
// Link the default Map to the other map.
var linker = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
// Get the initial AOI from the url parameter.
var swipeStatus = ui.url.get('swipe', false);
ui.url.set('swipe', swipeStatus); // need to set incase this is the initial load.
var sliderPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: swipeStatus,
  style: {stretch: 'both'}
});
var swipeButtonLabel = 'Show swipe display';
if(swipeStatus) {
  swipeButtonLabel = 'Show side-by-side display';
}
var swipeButton = ui.Button(swipeButtonLabel, switchSwipe, null, {position: 'top-left', });
mapComparison.widgets().set(swipeSwitchIndex, swipeButton);
function switchSwipe() {
  if(swipeStatus) {
    sliderPanel.setWipe(false);
    swipeButton.setLabel('Show swipe display');
    swipeStatus = false;
    ui.url.set('swipe', 'false');
  } else {
    sliderPanel.setWipe(true);
    swipeButton.setLabel('Show side-by-side display');
    swipeStatus = true;
    ui.url.set('swipe', 'true');
  }
}
// #############################################################################
// ### SETUP THE CHARTS PANEL ###
// #############################################################################
var noPlotLabel = ui.Label({value: 'Drawn geometry is too large', style: {position: 'top-left', color: 'EE605E', fontWeight: 'bold', shown: false}});
var contChart = ui.Label({value: '', style: {position: 'top-left', shown: true}}); // [Continuous time series chart]
var yoyChart = ui.Label({value: '', style: {position: 'top-left', shown: true}}); // [Year-over-year time series chart]
var tsChart = ui.Panel([noPlotLabel, contChart, yoyChart]); //, null, {minHeight: '300px'}
// #############################################################################
// ### SETUP APP DISPLAY ###
// #############################################################################
//
var mapChartSplitPanel = ui.Panel(ui.SplitPanel({
  firstPanel: ui.Panel(sliderPanel, null, {height: '62%'}), //
  secondPanel: tsChart,
  orientation: 'vertical',
  wipe: false,
}));
// Make the info panel and slider panel split.
var splitPanel = ui.SplitPanel(infoPanel, mapChartSplitPanel);
// Set the SplitPanel as the only thing in root.
//Inicio de Panel Derecho
// Note style.
var noteStyle_panel2 = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var Button_Panel2;
Button_Panel2 = ui.Button({label: 'Estadísticas', onClick: notesButtonHandler2, style: {position: 'top-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
// Notes panel.
var panel2;
panel2 = ui.Panel({
  widgets: [
    ui.Label({value: 'Haga clic en el mapa', style: noteStyle_panel2}),
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Function to handle showing and hiding the notes panel.
var notesShow_Panel2;
notesShow_Panel2 = false;
function notesButtonHandler2() {
  if(notesShow_Panel2){
    notesShow_Panel2 = false;
    panel2.style().set('shown', false);
    panel2.style().set('width', '83px');
    Button_Panel2.setLabel('REPORTES');
  } else {
    notesShow_Panel2 = true;
    panel2.style().set('shown', true);
    panel2.style().set('width', '290px');
    Button_Panel2.setLabel('Ocultar Panel');
  }
}
//ui.root.insert(2,panel2);
rightMap.add(Button_Panel2);
ui.root.widgets().reset([splitPanel,panel2]);
// Set url params for map bounds.