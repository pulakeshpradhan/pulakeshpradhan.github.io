var b500 = ee.FeatureCollection("users/brendanjarrell/ACo_500_foot_setback"),
    b1000 = ee.FeatureCollection("users/brendanjarrell/ACo_1000_foot_setback"),
    b1500 = ee.FeatureCollection("users/brendanjarrell/ACo_1500_foot_setback"),
    b2500 = ee.FeatureCollection("users/brendanjarrell/ACo_2500_foot_setback"),
    b500_pts = ee.FeatureCollection("users/brendanjarrell/b500_pts_NEW"),
    b500_pts2 = ee.FeatureCollection("users/brendanjarrell/b500_pts2_NEW"),
    b500_pts3 = ee.FeatureCollection("users/brendanjarrell/b500_pts3_NEW"),
    b1000_pts = ee.FeatureCollection("users/brendanjarrell/b1000_pts_NEW"),
    b1000_pts2 = ee.FeatureCollection("users/brendanjarrell/b1000_pts2_NEW"),
    b1000_pts3 = ee.FeatureCollection("users/brendanjarrell/b1000_pts3_NEW"),
    b1500_pts = ee.FeatureCollection("users/brendanjarrell/b1500_pts_NEW"),
    b1500_pts2 = ee.FeatureCollection("users/brendanjarrell/b1500_pts2_NEW"),
    b1500_pts3 = ee.FeatureCollection("users/brendanjarrell/b1500_pts3_NEW"),
    b2500_pts = ee.FeatureCollection("users/brendanjarrell/b2500_pts_NEW"),
    b2500_pts2 = ee.FeatureCollection("users/brendanjarrell/b2500_pts2_NEW"),
    b2500_pts3 = ee.FeatureCollection("users/brendanjarrell/b2500_pts3_NEW"),
    b500_buf = ee.FeatureCollection("users/brendanjarrell/b500_buf_NEW"),
    b500_buf2 = ee.FeatureCollection("users/brendanjarrell/b500_buf2_NEW"),
    b500_buf3 = ee.FeatureCollection("users/brendanjarrell/b500_buf3_NEW"),
    b1000_buf = ee.FeatureCollection("users/brendanjarrell/b1000_buf_NEW"),
    b1000_buf2 = ee.FeatureCollection("users/brendanjarrell/b1000_buf2_NEW"),
    b1000_buf3 = ee.FeatureCollection("users/brendanjarrell/b1000_buf3_NEW"),
    b1500_buf = ee.FeatureCollection("users/brendanjarrell/b1500_buf_NEW"),
    b1500_buf2 = ee.FeatureCollection("users/brendanjarrell/b1500_buf2_NEW"),
    b1500_buf3 = ee.FeatureCollection("users/brendanjarrell/b1500_buf3_NEW"),
    b2500_buf = ee.FeatureCollection("users/brendanjarrell/b2500_buf_NEW"),
    b2500_buf2 = ee.FeatureCollection("users/brendanjarrell/b2500_buf2_NEW"),
    b2500_buf3 = ee.FeatureCollection("users/brendanjarrell/b2500_buf3_NEW"),
    aCo_Bounds = ee.FeatureCollection("users/brendanjarrell/Allegheny_County_LineBounds"),
    aCo_shp = ee.FeatureCollection("users/brendanjarrell/Allegheny_County_Boundary"),
    pads = ee.FeatureCollection("users/brendanjarrell/12182018_Current_PA_Active_Wells");
//Brendan Jarrell     10/19/2018
//UPDATED ON 11/2/2018 --> Updated labels at bottom of panel on change of "bufferSelecetion".
//UPDATED ON 11/13/2018 --> Added comments throughout to explain portions of the code.
//UPDATED ON 11/28/2018 --> Changed wording in some of the strings.
//UPDATED ON 11/28/2018 --> Also added current well pad sites to map (description included).
//UPDATED ON 11/28/2018 --> Changed colors of hypothetical well points to yellow.
//UPDATED ON 01/30/2019 --> Changed the names of all layers as they appear on the map.
//UPDATED ON 01/30/2019 --> Made the app initalize with layer representing the boundaries of Allegheny Co. vizualized, made boundary accessible throughout app.
//UPDATED ON 01/30/2019 --> Made the app initalize with current well pad locations vizualized, made the current well pad locations 
//                         (cont.) accessible once the well pad spacing interval has been selected.
//UPDATED ON 02/11/2019 --> Made cosmetic updates to initialization of app, side panel text, and layer names.
//UPDATED ON 02/12/2019 --> Updated current active well sites in the county as of 12/18/2018 (courtesy PA DEP).
//This code will attempt to:
//1.) Create a SkyTruth panel to the left side of the map.
//2.) Create a select widget that allows for user to select their setback of interest.
//3.) Display the scene (on the map) and unique descriptive text (on the panel) upon the user's interaction with the widget.
//4.) Change the scene and the descriptive text upon changing the selection.
var app = {};
Map.setCenter(-80,40.44,10);
Map.addLayer(aCo_Bounds,{},'Allegheny County Boundary');
var pads_filt = pads.filterBounds(aCo_shp); //Filter Active well locations to Allegheny County only.
Map.addLayer(pads_filt,{color:'red'},'Current Drilling Locations (as of 12/18/2018)');
var white = '000000'; //Note that this variable actually sets the color of the element to black.
var dB = '2C5DA2';
var sel1 = '500-foot setback';
var sel2 = '1000-foot setback';
var sel3 = '1500-foot setback';
var sel4 = '2500-foot setback';
var bufsel1 = '40-acre area between well pads';
var bufsel2 = '80-acre area between well pads';
var bufsel3 = '640-acre area between well pads';
var bufsel4 = '40-acre area between well pads';
var bufsel5 = '80-acre area between well pads';
var bufsel6 = '640-acre area between well pads';
var bufsel7 = '40-acre area between well pads';
var bufsel8 = '80-acre area between well pads';
var bufsel9 = '640-acre area between well pads';
var bufsel10 = '40-acre area between well pads';
var bufsel11 = '80-acre area between well pads';
var bufsel12 = '640-acre area between well pads';
var selectionMenu = null;
var bufferSelection = null;
var appAddition = null;
var popup = ui.Panel({widgets:
      [ui.Label(
                 'This app was built by SkyTruth to illustrate possible natural gas drilling scenarios for Allegheny County, Pennsylvania. '+
                 'Use this Google Earth Engine-powered app to explore the impact across the county of changing the setback distance (the minimum distance legally allowed between a drilling site and a home or other occupied '+
                 'building) and the buffer area (the spacing between drilling sites, also known as well pads, which can host multiple wells).',
                 {stretch:'horizontal',color:'ffffff',backgroundColor:dB,textAlign:'center',width:'580px'}
                ),
       ui.Label(
                 'To begin, select a setback distance from the dropdown menu below. '+
                 'Next, you\'ll be prompted by a second dropdown to choose a well pad spacing. '+
                 'Then the app will display a hypothetical distribution of drilling locations based on your selections. '+
                 'It will also calculate the number of occupied structures within 2 miles of a drilling location.',
                 {stretch:'horizontal',color:'ffffff',backgroundColor:dB,textAlign:'center',width:'580px'}
                ),
       ui.Label(
                 'CLICK ANYWHERE ON THE MAP TO REMOVE THIS POPUP AND BEGIN!',
                 {stretch:'horizontal',color:'ffffff',backgroundColor:dB,textAlign:'center',width:'580px'}
                )                  
      ],style:{width:'610px', backgroundColor: dB}});
Map.add(popup);
var popupRemover = function(){Map.remove(popup)};
function removePopupPanel(){
  if (popup !== null){Map.onClick(popupRemover)}
}
removePopupPanel();
/*Creates initial selection widget on the left-hand panel. Allows for selection of setback distance.
  "Setback Distance" includes: dist. from buildings PLUS a fixed distance from water bodies, highways and roads.
  For more information on these setback distances, see the complimentary write-up for this project.*/
app.selectionMenu = function()
{
  app.contents = {panel: ui.Panel({widgets:[ui.Label('Disclaimer: This application was created using a subset of data from the Allegheny County GIS Group (link to site: http://openac-alcogis.opendata.arcgis.com/). '+
                                                     'SkyTruth cannot guarantee the accuracy of the data contained in this application and expressly disclaims liability for possible errors. '+ 
                                                     'The "drill out" scenarios presented here are hypothetical, and should not be constituted as an actual representation of human health risk.',
                                  {width: '400px',color: 'ffffff',backgroundColor: dB,textAlign: 'center', fontSize: '10px',padding:'500px 0px 0px 0px'}),
                                            ui.Label('Data last updated on 01/30/2019',
                                  {width: '400px',color: 'ffffff',backgroundColor: dB,textAlign: 'center', fontSize: '10px'})],
                                  style:{backgroundColor: '2C5DA2'}})};
  selectionMenu = ui.Select({items:[sel1,sel2,sel3,sel4], onChange: selection_onChange, placeholder: 'Select a setback distance', 
                             style:{textAlign:'center',backgroundColor: dB, padding: '0px 0px 0px 120px'}});
};
/*In the event that a setback distance is selected/changed, this function wipes previously presented text from the panel and 
  changes out the shapefiles presented on the EE map.*/
function selection_onChange()
{
  var layer = selectionMenu.getValue();
  var description = "";
  if (layer === sel1)
  {
    app.contents.panel.clear();
    Map.clear();
    Map.setCenter(-80,40.44,10);
    Map.addLayer(b500,{color:'868b93'},'Area of Potential Drilling');
    description = ui.Label('Number of acres open to potential well pad construction: 53,245',
                           {textAlign:'center',fontWeight:'bold',color:'ffffff',backgroundColor:dB});
    appAddition = ui.Label('To view possible well pad drilling locations considering the setback distance that you\'ve selected, please select an option below:',
                           {textAlign:'center',fontSize: '14px', backgroundColor: dB, color: 'ffffff'});
    bufferSelection = ui.Select({items:[bufsel1,bufsel2,bufsel3], onChange: bufferSelection_onChange, placeholder: 'Select a buffer area',
                                 style:{color: white, backgroundColor: dB, padding: '0px 0px 0px 120px'}});
  }
  else if (layer === sel2)
  {
    app.contents.panel.clear();
    Map.clear();
    Map.setCenter(-80,40.44,10);
    Map.addLayer(b1000,{color:'868b93'},'Area of Potential Drilling');
    description = ui.Label('Number of acres open to potential well pad construction: 15,627',
                           {textAlign:'center',fontWeight:'bold',color:'ffffff',backgroundColor:dB});
    appAddition = ui.Label('To view possible well pad drilling locations considering the setback distance that you\'ve selected, please select an option below:',
                           {textAlign:'center',fontSize: '14px', backgroundColor: dB, color: 'ffffff'});
    bufferSelection = ui.Select({items:[bufsel4,bufsel5,bufsel6], onChange: bufferSelection_onChange, placeholder: 'Select a buffer area',
                                 style:{color: white, backgroundColor: dB, padding: '0px 0px 0px 120px'}});
  }
  else if (layer === sel3)
  {
    app.contents.panel.clear();
    Map.clear();
    Map.setCenter(-80,40.44,10);
    Map.addLayer(b1500,{color:'868b93'},'Area of Potential Drilling');
    description = ui.Label('Number of acres open to potential well pad construction: 4,902',
                           {textAlign:'center',fontWeight:'bold',color:'ffffff',backgroundColor:dB});
    appAddition = ui.Label('To view possible well pad drilling locations considering the setback distance that you\'ve selected, please select an option below:',
                           {textAlign: 'center',fontSize: '14px', backgroundColor: dB, color: 'ffffff'});
    bufferSelection = ui.Select({items:[bufsel7,bufsel8,bufsel9], onChange: bufferSelection_onChange, placeholder: 'Select a buffer area',
                                 style:{color: white, backgroundColor: dB, padding: '0px 0px 0px 120px'}});
  }
  else if (layer === sel4)
  {
    app.contents.panel.clear();
    Map.clear();
    Map.setCenter(-80,40.44,10);
    Map.addLayer(b2500,{color:'868b93'},'Area of Potential Drilling');
    description = ui.Label('Number of acres open to potential well pad construction: 886',
                           {textAlign:'center',fontWeight:'bold',color:'ffffff',backgroundColor:dB});
    appAddition = ui.Label('To view possible well pad drilling locations considering the setback distance that you\'ve selected, please select an option below:',
                           {textAlign:'center',fontSize: '14px', backgroundColor: dB, color:'ffffff'});
    bufferSelection = ui.Select({items:[bufsel10,bufsel11,bufsel12], onChange: bufferSelection_onChange, placeholder: 'Select a buffer area',
                                 style:{backgroundColor: dB, padding: '0px 0px 0px 120px'}});
  }
  Map.addLayer(aCo_Bounds,{},'Allegheny County Boundary');
  Map.addLayer(pads_filt,{color:'red'},'Current Drilling Locations (as of 12/18/2018)');
  app.contents.panel.add(description);
  app.contents.panel.add(appAddition);
  app.contents.panel.add(bufferSelection);
}
//This function changes the displayed statistics on the panel and changes the buffered points shown on the EE map.
function bufferSelection_onChange()
{
  var layer = selectionMenu.getValue();
  var choice = bufferSelection.getValue();
  var description2 = "";
  var verdict = "";
  if ((choice === bufsel1) && (layer === sel1))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b500_buf,{},'Buffer');
    Map.addLayer(b500_pts,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 928',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 446,901',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel2) && (layer === sel1))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b500_buf2,{},'Buffer');
    Map.addLayer(b500_pts2,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 465',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 380,284',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel3) && (layer === sel1))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b500_buf3,{},'Buffer');
    Map.addLayer(b500_pts3,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 52',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 194,053',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});                        
  }
  else if ((choice === bufsel4) && (layer === sel2))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1000_buf,{},'Buffer');
    Map.addLayer(b1000_pts,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 257',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 222,481',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});                        
  }
  else if ((choice === bufsel5) && (layer === sel2))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1000_buf2,{},'Buffer');
    Map.addLayer(b1000_pts2,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 156',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 215,415',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});                        
  }
  else if ((choice === bufsel6) && (layer === sel2))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1000_buf3,{},'Buffer');
    Map.addLayer(b1000_pts3,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 14',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 43,256',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});                        
  }
  else if ((choice === bufsel7) && (layer === sel3))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1500_buf,{},'Buffer');
    Map.addLayer(b1500_pts,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 84',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 90,046',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});                        
  }
  else if ((choice === bufsel8) && (layer === sel3))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1500_buf2,{},'Buffer');
    Map.addLayer(b1500_pts2,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 48',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 60,919',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel9) && (layer === sel3))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b1500_buf3,{},'Buffer');
    Map.addLayer(b1500_pts3,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 8',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 26,722',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel10) && (layer === sel4))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b2500_buf,{},'Buffer');
    Map.addLayer(b2500_pts,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 18',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 4,816',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel11) && (layer === sel4))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);  
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b2500_buf2,{},'Buffer');
    Map.addLayer(b2500_pts2,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 10',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 4,524',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  else if ((choice === bufsel12) && (layer === sel4))
  {
    app.contents.panel.clear();
    Map.clear();
    app.contents.panel.add(appAddition);
    app.contents.panel.add(bufferSelection);
    Map.addLayer(b2500_buf3,{},'Buffer');
    Map.addLayer(b2500_pts3,{color:'yellow'},'Potential Drilling Sites');
    description2 = ui.Label('Number of well pads supported in your county at this spacing and setback: 3',
                            {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '100px 0px 0px 0px'});
    verdict = ui.Label('Number of occupied structures within 2 miles of a drilling site at this spacing and setback: 3,626',
                       {textAlign: 'center', fontSize: '14px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px', fontWeight: 'bold'});
  }
  Map.addLayer(aCo_Bounds,{},'Allegheny County Boundary');
  Map.addLayer(pads_filt,{color:'red'},'Current Drilling Sites (as of 12/18/2018)',false);
  app.contents.panel.add(description2);
  app.contents.panel.add(verdict);
  app.contents.panel.add( ui.Label({
        value: '*The gray buffer drawn around each hypothetical drilling site shows the two-mile radius of possible negative health impacts, as indicated by scientific research.',
        style: {width:'400px',stretch: 'horizontal', textAlign: 'center', fontSize: '11px', color: 'ffffff', backgroundColor: dB, padding: '20px 0px 0px 0px'}}));
}
//Creates the initial contents of the app's panel.
app.create = function()
{
  app.content = {
    panel: ui.Panel({widgets:
      [
        ui.Label({
          value: 'SkyTruth',
          style: {stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '20px',
                  width:'400px', color:'ffffff', backgroundColor: '2C5DA2'}
                }),
        ui.Label({
        value: 'Allegheny County, PA -- Hypothetical Gas-Drilling Scenarios',
        style: {stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '18px',
                width: '400px', color: 'ffffff', backgroundColor: '2C5DA2'}
                }),
         ui.Label(
                 'For more information about this app, including links to the data sources we used, follow this URL to our corresponding blog post: https://bit.ly/2HGu1El',
                 {stretch:'horizontal',color:'ffffff',backgroundColor:dB,textAlign:'center',width:'400px',fontSize:'11px'}
                ),
        ui.Label({
        value: 'App tips! Toggle between Map and Satellite at upper right to change the backdrop. '+
               'Hover over Layers at top center to get a menu of data layers you can turn on and off. '+
               'Click +/- at upper left to zoom in and out. Grab the drawing tools at upper left to mark up the map.',
        style: {width:'400px',color:'ffffff',backgroundColor:dB,textAlign:'center',fontWeight:'bold',fontSize: '11px',stretch:'horizontal',padding:'0px 0px 0px 0px'}
                }),
        ui.Label({
        value: 'Current natural gas well pads in Allegheny County are displayed in red.',
        style: {width:'400px',color:'ffffff',backgroundColor:dB,textAlign:'center',fontSize: '11px',stretch:'horizontal',padding:'0px 0px 0px 0px'}
                }),
      ],
      style:{width: '420px',backgroundColor: '2C5DA2'}
    })        
}};
//Creates the final panel with which the user will be presented, adds the other two supplementary panels to its contents.
app.boot = function()
{
  app.create();
  app.selectionMenu();
  var main = ui.Panel({
  widgets: [app.content.panel,selectionMenu,app.contents.panel],
  style:{width:'425px', backgroundColor: dB} });
  ui.root.insert(0, main);
};
//Generates the final panel.
app.boot();