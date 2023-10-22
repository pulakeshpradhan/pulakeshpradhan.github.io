// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PROJECT 2 LAYOUT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ---------------------------------------------------------------
// PART 1: ANALYSIS
// ---------------------------------------------------------------
//INTERTIDAL AREA CLASSIFICATION DATASET (FROM GEE DATA CATALOG)
var dataset = ee.ImageCollection('UQ/murray/Intertidal/v1_1/global_intertidal');
// var visualization = {
//   bands: ['classification'],
//   min: 0.0,
//   max: 1.0,
//   palette: ['66ff00']
// };
// Map.addLayer(dataset, visualization, 'Intertidal areas', 0);
// print(dataset)  
//------------------------------------------------------
//LOAD AND UNMASK INDIVIDUAL IMAGES FROM THE TIME SERIES
//------------------------------------------------------
// 
// 
//1984-1986 LEAVE MASK ON FOR NOW
var Image1 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1984-1986')
;
//1987-1989
var Image2 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1987-1989')
  .unmask();
 //1990-1992 
var Image3 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1990-1992')
  .unmask();
//1993-1995  
var Image4 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1993-1995')
  .unmask();
//1996-1998 
var Image5 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1996-1998')
  .unmask();
//1999-2001
var Image6 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/1999-2001')
  .unmask();
//2002-2004
var Image7 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/2002-2004')
  .unmask();
//2005-2007
var Image8 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/2005-2007')
  .unmask();
//2008-2010
var Image9 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/2008-2010')
  .unmask();
//2014-2016 LEAVE MASK ON FOR NOW
var Image10 = ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/2014-2016');
//-------------------------------------
//CALCULATE UNCHANGED INTERTIDAL AREAS
//-------------------------------------
//MULTIPLY the FIRST and LAST image to derive intertidal areas that existed in both
//the start and end images(unchanged = 1), add 1 to make this a unique 
//classification value for later. [left mask on to make this operation simpler]
var unchanged = Image1.multiply(Image10).add(1);
//----------------------------------------------------------------------
//CALCULATE GAIN AND LOSS OF INTERTIDAL AREAS OVER THE WHOLE TIME SERIES
//----------------------------------------------------------------------
// We will need true boolean rasters for this part of the analysis, 
//so we must remove the preset mask on the first and last image now.
var unmasked1 = Image1.unmask(); //Unmask both images
var unmasked10 = Image10.unmask();
//Subtract image 1 from image 10 (unmasked) for gain and loss (1 = gain, -1 = loss)
var subtracted = unmasked10.subtract(unmasked1);
// Map.addLayer(subtracted, visBW, 'subtracted');
//----------------------------------------------------------------
//COMBINE AND VISUALIZE GAIN, LOSS, AND UNCHANGED INTERTIDAL AREAS
//----------------------------------------------------------------
//Add unchanged values (after removing mask) to the gain and loss values (the unchanged areas and the rest of the world should be 0)
var unchangedUnmask = unchanged.unmask();
var combine = subtracted.add(unchangedUnmask);
//----------------------------------------------------------------
//INCORPORATE VALUES FOR AREAS WHERE THERE WAS GAIN AND LOSS
//----------------------------------------------------------------
//subtract EXTENT of gain, loss, and unchanged areas from marsh extent
//across the whole time series, then add to the combined classified values
var gluExtent = combine.neq(0);
var totalExtent = dataset.or().unmask();
var gainLoss = totalExtent.subtract(gluExtent);
var gainLossUnique = gainLoss.multiply(3);//creating a unique identifier
var combine2 = combine.add(gainLossUnique)
//----------------------------------------------------------------
//VISUALIZE
//----------------------------------------------------------------
//add a mask (leaving only gain, loss, gainLoss and unchanged values)
var newMask = combine2.neq(0);
var classified = combine2.updateMask(newMask);
//create a palette for classified areas
var gainLossPalette = [
    '#E00A00',        //  Loss (-1)
    '000000',
    '#43FF00',        //  Gain (1)
    '#0001F5',        //  Unchanged (2)
    '#808080',        // Gain and loss (3)
];
var gainlossViz = {
  bands: ['classification'],
  min: -1,
  max: 3,
  palette: gainLossPalette
};
// Map.addLayer(classified, gainlossViz, "change in intertidal extent 1984-2016", 0);
// Set Base and other map preferences
var customBase = require('users/jhowarth/eePrimer:modules/darkBase.js');
Map.setCenter(126.6339, 37.4394, 6);
Map.setOptions('darkBase', {'darkBase': customBase.darkBase});
//----------------------------------------------------------------
//DISPLAY CHANGE ACROSS ALL YEARS (REPLICATING STUDY)
//----------------------------------------------------------------
//Make a single image with a class for each category of the time series, with
//more recent marsh extent taking precedence over older marsh extent
var studyImage = unmasked1.subtract(2)
  .subtract(Image2)
  .subtract(Image3)
  .subtract(Image4)
  .subtract(Image5)
  .subtract(Image6)
  .subtract(Image7)
  .subtract(Image8)
  .subtract(Image9)
  .subtract(unmasked10)
  .updateMask(newMask);
var palettes = require('users/gena/packages:palettes');
var studyPalette = palettes.crameri.imola[10].reverse();
var studyViz = {
  min: -10,
  max: -1,
  palette: studyPalette
};
// Map.addLayer(studyImage, studyViz, "Intertidal Change Over Time Series (Study Replication)");
//  Load the cart module.  
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
//  Use the list for labels.   
var labels = [
  'Loss',
  'Gain',
  'Unchanged',
  'Gain and Loss',
  ];
var keyPalette = [
    '#E00A00',        //  Loss (-1)
    '#43FF00',        //  Gain (1)
    '#0001F5',        //  Unchanged (2)
    '#808080',        // Gain and loss (3)
];
//---------------------------------------------------------------------
//DISPLAY WHERE MARSH WAS MOST FREQUENTLY OBSERVED OVER THE TIME SERIES
//---------------------------------------------------------------------
var frequencyImage = unmasked1
  .add(Image2)
  .add(Image3)
  .add(Image4)
  .add(Image5)
  .add(Image6)
  .add(Image7)
  .add(Image8)
  .add(Image9)
  .add(unmasked10)
  .updateMask(newMask);
var freqPalette = palettes.crameri.batlow[10];
var freqViz = {
  min: 1,
  max: 10,
  palette: freqPalette
};
// var key2 = cart.makeLegend('Intertidal occurences over time series', keyPalette, labels, 'bottom-left');
// Map.add(key2)
// Map.addLayer(frequencyImage, freqViz, 'most frequently seen');
//---------------------------------------------------------------------
//CONSTRUCT LEGENDS
//---------------------------------------------------------------------
//  Use the list for labels.   
var studyLabels = [
'1984-1986',
'1987-1989',
'1990-1992', 
'1993-1995',  
'1996-1998', 
'1999-2001',
'2002-2004',
'2005-2007',
'2008-2010',
'2014-2016',
];
var studyPalette = palettes.crameri.imola[10].reverse()
//Make legend for study layer
var key2 = cart.makeLegend('Most Recent Occurrence', studyPalette, studyLabels, 'bottom-left');
//  Use the list for labels.   
var freqLabels = [
'1',
'2',
'3', 
'4',  
'5', 
'6',
'7',
'8',
'9',
'10',
];
//Make legend for frequency layer
var key3 = cart.makeLegend('Frequency of Occurrence', freqPalette, freqLabels, 'bottom-right');
//  Use the list for labels.   
var labels = [
  'Loss',
  'Gain',
  'Unchanged',
  'Gain and Loss',
  ];
var keyPalette = [
    '#E00A00',        //  Loss (-1)
    '#43FF00',        //  Gain (1)
    '#0001F5',        //  Unchanged (2)
    '#808080',        // Gain and loss (3)
];
//  Make gain/loss legend.
var key = cart.makeLegend('Gain/Loss', keyPalette, labels, 'bottom-right');
// ---------------------------------------------------------------
// Make style dictionaries for label hierarchy. LARGELY DOESNT NEED ADAPTED UNLESS YOU WANT TO
// ---------------------------------------------------------------
// Dictionary for sans and serif pairing.
var labelMaster = {
  font:
    {
      sans: 'Helvetica, sans-serif',
      serif: 'Georgia, serif'
    },
  align:
    {
        padding: '12px',
        margin: '4px',
        position: 'top-left',
    }
};
// Dictionary for label styles.
var labelStyles = {
  titleStyle:
    {
      padding: '12px 16px 12px 16px',
      margin: '0 px',
      backgroundColor: '444444',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  abstractStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '14px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.serif,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  instructionStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  creditStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: '#656665',
      fontSize: '10px',
      fontWeight: '400',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'pre',
      stretch: 'horizontal'
    },
  mapLabelStyle:
    {
      // padding: labelMaster.align.padding,
      // margin: '0px 40px 0px 40px',
      color: 'white',
      backgroundColor: '#666666',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      whiteSpace: 'wrap',
      stretch: 'horizontal',
      height: '30px',
    }
  }
;
// print('Test', testLabel.style().set(labelStyles.titleStyle));
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Exploring Change in Global Intertidal Extent',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'For this project, I chose to explore the The Murray Intertidal Change Dataset. Created by Murray et al. (2019), this dataset is a classification of intertidal ecosystems’ global extent from LANDSAT imagery (1984-2016) via machine learning methods. I sought to compare multiple visualizations of intertidal change, and subsequently determine how they represent trends in its global extent. First, I replicated the visualization used in the figures of Murray et al. (2019), which show where intertidal extents were most recently seen in the time series. Then, I created two alternate visualizations of change. The first demonstrates areas that gained or lost intertidal extent and those that were unchanged, as well as areas that both gained and subsequently lost intertidal area between 1984 and 2016. The second is meant to show how many times intertidal extent occurred across the time series.',
  style: labelStyles.abstractStyle
})
var instructions = ui.Label({
  value: 'Click and drag to move around the map, and hover over the layers panel to toggle layers on and off. This app will work the most efficiently if only one layer is selected at a time.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY', //WHAT, WHY, HOW, etc, (anything a reader may want to know otherwise)
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1vDx0Xk7gTYQL3ML31wTHbNDrlUYmAQSR0BS2rI3aZ6g/edit?usp=sharing'
  }
);
var citation = ui.Label({
  value: 'Murray, N.J., Phinn, S.R., DeWitt, M., Ferrari,\nR., Johnston, R., Lyons, M.B., Clinton, N.,\nThau, D. & Fuller, R.A. (2019)\nThe global distribution and trajectory of tidal flats.\nNature, 565, 222-225.',
  style: labelStyles.creditStyle
  }
);
var credits = ui.Label({
  value: 'Will Behm\nGeography 150\nSpring 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
// ---------------------------------------------------------------
// Make widget to move between study sites.
// ---------------------------------------------------------------
var selectStyles =
  {
    padding: labelMaster.align.padding,
    margin: labelMaster.align.margin,
    stretch: 'horizontal'
  }
;
var poi1 = ee.Geometry.Point(101.76036226877623, 3.3786837890705557)
var poi2 = ee.Geometry.Point(90.69243797892477, 22.33772301898949)
var poi3 = ee.Geometry.Point(123.0713831490416, 36.65833349187493)
var places =
  {
    'Lack of Early Data in Malaysia (Use Gain/Loss Layer)': poi1,
    'Dynamism in the Megnha estuary (Use Most Recent Occurrence Layer)': poi2,
    'Intertidal Stability in the Yellow Sea (Use Frequency Layer)': poi3,
  }
;
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    mainMap.centerObject(places[key], 6);
  }
});
// print(selectPlaces);
// ---------------------------------------------------------------
// Make root panel.
// ---------------------------------------------------------------
// Configure the layouts for how the panels flow together.
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
// Compose panels.
var rootPanel = ui.Panel(                         // Highest-level container.
  {
    // layout: ui.Panel.Layout.flow('horizontal'),
    style:
      {
        height: '100%',
        width: '100%'
      }
  }
);
// ---------------------------------------------------------------
// Configure map panels.
// ---------------------------------------------------------------
// // Initialize two maps for swipe panel.
var mainMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);
var customBase = require('users/jhowarth/eePrimer:modules/darkBase.js');
mainMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
// // Initialize a map panel
var mapPanel = ui.Panel({          // Map panel.
  style:
    {
      stretch: 'vertical'
    }
  }
);
mapPanel
  .add(mainMap);                 // Add swipe map to map panel.
// ---------------------------------------------------------------
// Compose maps.
// ---------------------------------------------------------------
mainMap.addLayer(studyImage, studyViz, "Most Recent Occurrence (Study Replication)");
mainMap.addLayer(classified, gainlossViz, "Gain and Loss", 0);
mainMap.addLayer(frequencyImage, freqViz, 'Frequency of Occurrence', 0);
mainMap.add(key);
mainMap.add(key2);
mainMap.add(key3);
mainMap.setControlVisibility(true);
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [
    abstract,
    instructions,
    selectPlaces,
    storyLink,
    citation,
    credits],
  layout: ui.Panel.Layout.flow('vertical'),
  style:
    {
      position: 'top-left',
      height: '90%',
      width: '20%',
      // padding: '10px',
      // margin: '10px',
      // backgroundColor: '#cccccc',
      // border:'4px solid orange',
      shown: true
    }
  }
);
// ---------------------------------------------------------------
// Compose layout.
// ---------------------------------------------------------------
// Initialize split layout.
var splitLayout = ui.SplitPanel(        // Split panel.
  sidePanel,                            // Add side panel to left side.
  mapPanel,                             // Add map panel (with swipe map) to right side.
  'horizontal',                         // Make split in horizontal direction.
  false                                 // Do NOT make swipe transition for split screen.
);
ui.root.clear();
ui.root.add(title);
ui.root.add(rootPanel);
rootPanel.add(splitLayout);