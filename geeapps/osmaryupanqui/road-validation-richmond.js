var logo = ui.import && ui.import("logo", "image", {
      "id": "users/osmaryupanqui/losAmigos/logoACCA"
    }) || ee.Image("users/osmaryupanqui/losAmigos/logoACCA");
///////////////////////////////////////////////////////////////////////////////
// U. Richmond App, elaborado por: Osmar Yupanqui Carrasco, e-mail: osmar30asis@gmail.com
///////////////////////////////////////////////////////////////////////////////
// Change crosshair
Map.style().set('cursor', 'crosshair');
// Create Main Panel
var mainPanel = ui.Panel();
mainPanel.style().set({
  position: 'middle-left',
  padding: '2px 2px',
  border: '3px solid black',
  width: '370px'
});
// Add title
var title = ui.Label('Road Validation Tool',
{fontWeight: 'bold', width: '330px', height: '40px', fontSize: '24px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Add additional title
var subtitle = ui.Label('Google Earth Engine App for road validation (Updated on 22 Sep 2022)',
{width: '330px', fontSize: '16px', color: 'black', textAlign: 'center'});
// Add logo
var accaLogo = ui.Thumbnail(logo, {format: 'png', bands: ['b1', 'b2', 'b3'], min: 0, max: 255});
accaLogo.style().set({
  width: '150px',
  height: '150px',
  margin: '0 0 0 90px'
});
// Add link text
var linkText = ui.Label('Conservación Amazónica (ACCA) - 2022', {fontWeight: 'bold', textAlign: 'center', width: '320px'},
    'https://www.acca.org.pe/');
// Add help title
var helpTitle = ui.Label('Instructions',
{fontWeight: 'bold', width: '330px', height: '30px', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Add help text
var helpText1 = ui.Label('- First select select the column code and then the row code from the grid, then click the box to zoom to the grid quadrant.',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
var helpText2 = ui.Label('- Then, define the image parameters, such as year and band combination, the click the box to add them to the map.',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
var helpText3 = ui.Label('- You can download the images used in this app by clicking the link under the "Download" tab',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
var helpText4 = ui.Label('- The coordinates are shown below the "Coordinates" tab',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
var helpText5 = ui.Label('- You can reset the app (in case a bug appears) by clicking the button: "Reset the App"',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
// Add grid title
var gridTitle = ui.Label('Grid Parameters',
{fontWeight: 'bold', width: '330px', height: '30px', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Add image title
var imgTitle = ui.Label('Image Parameters',
{fontWeight: 'bold', width: '330px', height: '30px', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Add download title
var downloadTitle = ui.Label('Download',
{fontWeight: 'bold', width: '330px', height: '30px', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Add download panel
var downloadPanel = ui.Panel();
// Add pointer title
var coordTitle = ui.Label('Coordinates',
{fontWeight: 'bold', width: '330px', height: '30px', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: 'skyblue', border: '2px solid black'});
// Create clicker panel
var clickPanel = ui.Panel();
// Add clicker text
var clickText = ui.Label('The coordinates are:',
{width: '330px', fontSize: '12px', color: 'black', textAlign: 'left'});
///////////////////////////////////////////////////////////////////////////
// Add grid
var grid = ee.FeatureCollection('projects/ACCA-SERVIR/ABSAT/ABSAT_AOI_2022');
var gridFV = ui.Map.FeatureViewLayer('projects/ACCA-SERVIR/ABSAT/ABSAT_AOI_2022_FV', {color: 'yellow', polygonFillOpacity: 0}, 'Grid');
Map.add(gridFV);
Map.centerObject(grid, 7);
///////////////////////////////////////////////////////////////////////////
// Create grid panel
var gridPanel = ui.Panel();
var colTextbox = ui.Textbox({
  placeholder: 'Insert the column code (from AA to AZ, then to EA)',
  value: null
});
colTextbox.style().set({
  width: '316px',
  textAlign: 'center',
  border: '2px solid black'
});
var rowTextbox = ui.Textbox({
  placeholder: 'Insert the row code (from 01 to 50)',
  value: null
});
rowTextbox.style().set({
  width: '316px',
  textAlign: 'center',
  border: '2px solid black'
});
// Create button to zoom to selected grid
var gridButton = ui.Button({
  label: 'Click here to zoom to the grid quadrant',
  onClick: function () {
    var quadrant = grid.filter(ee.Filter.and(ee.Filter.eq('Col', colTextbox.getValue()), ee.Filter.eq('Row', rowTextbox.getValue())));
    Map.centerObject(quadrant, 13);
  }
});
gridButton.style().set({
  width: '316px',
  textAlign: 'center'
});
gridPanel.add(colTextbox);
gridPanel.add(rowTextbox);
gridPanel.add(gridButton);
///////////////////////////////////////////////////////////////////////////
// Define visualization parameters
var visParamsL8SNR = {
  bands: ['B6', 'B5', 'B4'],
  min: [5, 10, 0],
  max: [120, 140, 60]
};
var visParamsL8NRG = {
  bands: ['B5', 'B4', 'B3'],
  min: [5, 0, 4],
  max: [160, 60, 55]
};
var visParamsL8RGB = {
  bands: ['B4', 'B3', 'B2'],
  min: [0, 2, 17],
  max: [60, 55, 50]
};
var visParamsL7SNR = {
  bands: ['B5', 'B4', 'B3'],
  min: [5, 10, 0],
  max: [120, 140, 60]
};
var visParamsL7NRG = {
  bands: ['B4', 'B3', 'B2'],
  min: [5, 0, 4],
  max: [160, 60, 55]
};
var visParamsL7RGB = {
  bands: ['B3', 'B2', 'B1'],
  min: [0, 2, 17],
  max: [60, 55, 50]
};
var imgPanel = ui.Panel();
///////////////////////////////////////////////////////////////////////////
var imgCol = ee.ImageCollection('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT');
// Add dictionary to link with the pulldown selector
var imgDict = {
  '2015 L8': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2015_L8'), visParamsL8RGB, visParamsL8NRG, visParamsL8SNR],
  '2014 L8': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2014_L8'), visParamsL8RGB, visParamsL8NRG, visParamsL8SNR],
  '2013 L8': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2013_L8'), visParamsL8RGB, visParamsL8NRG, visParamsL8SNR],
  '2012 L7': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2012_L7'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2011 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2011_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2010 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2010_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2009 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2009_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2008 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2008_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2007 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2007_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2006 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2006_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2005 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2005_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2004 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2004_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2003 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2003_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2002 L7': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2002_L7'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2001 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2001_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '2000 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/2000_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1999 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1999_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1998 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1998_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1997 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1997_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1996 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1996_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1995 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1995_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1994 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1994_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1993 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1993_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1992 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1992_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1991 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1991_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1990 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1990_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1989 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1989_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1988 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1988_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1987 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1987_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1986 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1986_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
  '1985 L5': [ee.Image('projects/ACCA-SERVIR/ABSAT/LandsatCollectionABSAT/1985_L5'), visParamsL7RGB, visParamsL7NRG, visParamsL7SNR],
};
// Add pulldown selector (year)
var yearSelector = ui.Select({
  items: Object.keys(imgDict),
  placeholder: 'Select the year of the image to add',
  value: null
});
yearSelector.style().set({
  width: '316px',
  textAlign: 'center'
});
// Add pulldown selector (band combination)
var bandSelector = ui.Select({
  items: ['R-G-B', 'NIR-R-G', 'SWIR-NIR-R'],
  placeholder: 'Select the band combination',
  value: null,
});
bandSelector.style().set({
  width: '316px',
  textAlign: 'center'
});
///////////////////////////////////////////////////////////////////////////
// Add checkbox to clip to the grid quadrant
var clipCheckbox = ui.Checkbox({
  label: 'Clip the image to the quadrant selected',
  value: false
});
clipCheckbox.style().set({
  padding: '4px',
  border: '2px solid black',
  width: '316px',
  textAlign: 'center'
});
///////////////////////////////////////////////////////////////////////////
// Button to add the image
var imgButton = ui.Button({
  label: 'Click here to add the image',
  onClick: function () {
    var gridQuad = grid.filter(ee.Filter.and(ee.Filter.eq('Col', colTextbox.getValue()), ee.Filter.eq('Row', rowTextbox.getValue())));
    if (clipCheckbox.getValue() === true) {
      Map.layers().insert(0, imgDict[yearSelector.getValue()][0].clip(gridQuad.geometry()));
      if (bandSelector.getValue() == 'R-G-B') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' R-G-B '+colTextbox.getValue()+rowTextbox.getValue());
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][1]);
      }
      else if (bandSelector.getValue() == 'NIR-R-G') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' NIR-R-G '+colTextbox.getValue()+rowTextbox.getValue());
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][2]);
      }
      else if (bandSelector.getValue() == 'SWIR-NIR-R') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' SWIR-NIR-R '+colTextbox.getValue()+rowTextbox.getValue());
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][3]);
      }
    }
    else {
      Map.layers().insert(0, imgDict[yearSelector.getValue()][0]);
      if (bandSelector.getValue() == 'R-G-B') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' R-G-B');
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][1]);
      }
      else if (bandSelector.getValue() == 'NIR-R-G') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' NIR-R-G');
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][2]);
      }
      else if (bandSelector.getValue() == 'SWIR-NIR-R') {
        Map.layers().get(0).set('name', yearSelector.getValue()+' SWIR-NIR-R');
        Map.layers().get(0).set('visParams', imgDict[yearSelector.getValue()][3]);
      }
    }
  }
});
imgButton.style().set({
  width: '316px',
  textAlign: 'center'
});
imgPanel.add(yearSelector);
imgPanel.add(bandSelector);
imgPanel.add(clipCheckbox);
imgPanel.add(imgButton);
///////////////////////////////////////////////////////////////////////////////
// Add download button
var downloadButton = ui.Button({
  label: 'Click here to request download URL',
  onClick: function () {
    downloadPanel.clear();
    var downUrl = imgDict[yearSelector.getValue()][0].getDownloadURL({
      name: yearSelector.getValue() + '_grid_' + colTextbox.getValue() + rowTextbox.getValue(),
      bands: imgDict[yearSelector.getValue()][0].bandNames().getInfo(),
      region: grid.filter(ee.Filter.and(ee.Filter.eq('Col', colTextbox.getValue()), ee.Filter.eq('Row', rowTextbox.getValue()))).geometry(),
      filePerBand: false
    });
    var downText = ui.Label('Click here to download', {fontWeight: 'bold', textAlign: 'center', width: '320px'}, downUrl);
    downloadPanel.add(downText);
  }
});
downloadButton.style().set({fontWeight: 'bold', textAlign: 'center', width: '320px'});
///////////////////////////////////////////////////////////////////////////////
// Create a GIF panel
var gifPanel = ui.Panel();
var gifButton = ui.Button({
  label: 'Click to create a GIF',
  onClick: function () {
    gifPanel.clear();
    var imgGIF = imgCol.map(function (img) {
      var newImg = img.rename(['blue', 'green', 'red', 'nir', 'swir']);
      var clipped = newImg.clip(grid.filter(ee.Filter.and(ee.Filter.eq('Col', colTextbox.getValue()), ee.Filter.eq('Row', rowTextbox.getValue())))).visualize({bands: ['swir', 'nir', 'red'], min: [5, 10, 0], max: [120, 140, 60]});
      return clipped;
    });
    var gifVisParams = {
      'dimensions': 400,
      'region': grid.filter(ee.Filter.and(ee.Filter.eq('Col', colTextbox.getValue()), ee.Filter.eq('Row', rowTextbox.getValue()))).geometry(),
      'crs': 'EPSG:4326',
      'framesPerSecond': 5,
      'format': 'gif'
    };
    var thumbnail = ui.Thumbnail(imgGIF, gifVisParams);
    gifPanel.add(thumbnail);
  }
});
gifButton.style().set({fontWeight: 'bold', textAlign: 'center', width: '320px'});
gifPanel.add(gifButton);
///////////////////////////////////////////////////////////////////////////////
// Button to reset everything
var mapClearer = ui.Button({
  label: 'Reset the App',
  onClick: function (click) {
    Map.layers().reset();
    Map.add(gridFV);
    Map.centerObject(grid, 7);
  }
});
mapClearer.style().set({
  width: '320px',
  textAlign: 'center'
});
///////////////////////////////////////////////////////////////////////////////
// On click function to add coordinates to the click panel
Map.onClick(function(feature) {
    clickPanel.clear();
    var location = 'Long: ' + feature.lon.toFixed(6) + ' ' + 
    'Lat: ' + feature.lat.toFixed(6);
    var click_point = ee.Geometry.Point(feature.lon, feature.lat);
    var gridLocation = grid.filterBounds(click_point).first();
    clickPanel.widgets().set(0, ui.Label(location, {fontSize: '14px', textAlign: 'center'}));
    var gridInfo = gridLocation.evaluate(function (g) {
      return clickPanel.widgets().set(1, ui.Label('Column: ' + g.properties.Col + ' ' + 'Row: ' + g.properties.Row, {fontSize: '14px', textAlign: 'center'}));
    });
});
///////////////////////////////////////////////////////////////////////////
// Add items to the map
mainPanel.add(title);
mainPanel.add(subtitle);
mainPanel.add(accaLogo);
mainPanel.add(linkText);
mainPanel.add(helpText1);
mainPanel.add(helpText2);
mainPanel.add(helpText3);
mainPanel.add(helpText4);
mainPanel.add(helpText5);
mainPanel.add(gridTitle);
mainPanel.add(gridPanel);
mainPanel.add(imgTitle);
mainPanel.add(imgPanel);
mainPanel.add(downloadTitle);
mainPanel.add(downloadButton);
mainPanel.add(downloadPanel);
mainPanel.add(gifPanel);
mainPanel.add(coordTitle);
mainPanel.add(clickPanel);
mainPanel.add(mapClearer);
ui.root.insert(0, mainPanel);