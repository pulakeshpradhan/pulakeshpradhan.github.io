var Vancouver = ui.import && ui.import("Vancouver", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -123.4488375935656,
                49.69623396884189
              ],
              [
                -123.4488375935656,
                48.70201330683484
              ],
              [
                -121.5756686482531,
                48.70201330683484
              ],
              [
                -121.5756686482531,
                49.69623396884189
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-123.4488375935656, 49.69623396884189],
          [-123.4488375935656, 48.70201330683484],
          [-121.5756686482531, 48.70201330683484],
          [-121.5756686482531, 49.69623396884189]]], null, false);
// SET UP PRIMARY PANELS
// Create map
var map = ui.Map();
var canada_provinces = ee.FeatureCollection('projects/ee-mohshafi16/assets/province_canada');
var heatWarningIcon = ee.Image("projects/ee-mohshafi16/assets/heatWarning");
var infoIcon = ee.Image("projects/ee-mohshafi16/assets/info");
var dataModelIcon = ee.Image("projects/ee-mohshafi16/assets/dataModel");
var contactIcon = ee.Image("projects/ee-mohshafi16/assets/contact");
var backButtonIcon = ee.Image("projects/ee-mohshafi16/assets/backButton");
var name_property = 'NAME';
// Get all provinces from the canada featureCollection
var allprovinces = ee.List(canada_provinces.toList(canada_provinces.size()).map(function(feat){return ee.String(ee.Feature(feat).get(name_property))}));
map.addLayer(canada_provinces, null, 'Provinces of Canada', false);
// Center map on Canada
map.setCenter(-85.046981, 55.946702, 4);
/*
 * Initialising all Panels
 */
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
// Heat Warning Panel
var heatWarningPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px', shown: false}
});
// Info Panel
var infoPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px', shown: false}
});
// Data & Model Panel
var dataModelPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px', shown: false}
});
// Contact
var contactPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px', shown: false}
});
/*
 * Main Panel Widgets
 */
var mainHeadingLable =  ui.Label({value: 'Maple Heat',style: {fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}});
var heatWaringThumbnail = ui.Thumbnail({
  image: heatWarningIcon,
  style:{stretch: 'horizontal'},
  onClick: onHeatWaringThumbnailClicked
});
var infoThumbnail = ui.Thumbnail({
  image: infoIcon,
  style:{stretch: 'horizontal'},
  onClick: onInfoThumbnailClicked
});
var dataModelThumbnail = ui.Thumbnail({
  image: dataModelIcon,
  style:{stretch: 'horizontal'},
  onClick: ondatModelThumbnailClicked
});
var contactThumbnail = ui.Thumbnail({
  image: contactIcon,
  style:{stretch: 'horizontal'},
  onClick: onContactThumbnailClicked
});
mainPanel.add(mainHeadingLable);
mainPanel.add(heatWaringThumbnail);
mainPanel.add(infoThumbnail);
mainPanel.add(dataModelThumbnail);
mainPanel.add(contactThumbnail);
/*
 * HeatWarning Panel Widgets
 */
var settingBackButton = ui.Thumbnail( {
  image: backButtonIcon,
  style:{width:"40px"},
  onClick: onBackButtonHeatWarningClicked
});
var headingLable =  ui.Label({value: 'Heat risk warning',style: {fontSize: '20px', fontWeight: 'bold'}});
var tippLable = ui.Label('Please choose your location and the time span you are interested in. The map will show you if there is a heat risk waring near you ');
var headingPanel = ui.Panel([headingLable, tippLable]);
// Select Location
var locationSelect = ui.Select({items: allprovinces.getInfo(), placeholder: 'Select you location', style:{stretch: 'horizontal'},onChange: locationChanged});
var locationLable = ui.Label('Select your location *', {fontWeight: 'bold'});
var locationPanel = ui.Panel([locationLable,locationSelect], null, {stretch: 'horizontal'});
// Time periode
var dateSectionLabel = ui.Label('Select the time period *',{fontWeight: 'bold'});
var startDayLabel =  ui.Label({value : 'Start date', style: {color: 'gray'}});
var startDateSlider = ui.DateSlider({start: '2015-01-01',style:{stretch: 'horizontal'}});
var endDayLabel = ui.Label({value : 'End date', style: {color: 'gray'}});
var endDateSlider = ui.DateSlider({start: '2015-01-01', style:{stretch: 'horizontal'}});
var dateSliderPanel = ui.Panel([dateSectionLabel,startDayLabel, startDateSlider, endDayLabel, endDateSlider], null, {stretch: 'horizontal'});
var calculateButton = ui.Button({
  label: 'Calculate',
  onClick: startCalculating,
  style: {stretch: 'horizontal'}
});
heatWarningPanel.add(headingPanel);
heatWarningPanel.add(locationPanel);
heatWarningPanel.add(dateSliderPanel);
heatWarningPanel.add(calculateButton);
heatWarningPanel.add(settingBackButton);
/*
 * Info Panel Widgets
 */
var infoBackButton = ui.Thumbnail( {
  image: backButtonIcon,
  style:{width:"40px"},
  onClick: onBackButtonInfoClicked
});
var infoHeadingLable =  ui.Label({value: 'Information',style: {fontSize: '20px', fontWeight: 'bold'}});
var infoclimateLable =  ui.Label({value: 'Fighting climate change',style: {fontSize: '16px', fontWeight: 'bold'}});
var infoTippLable = ui.Label('Find out how you can help stop man-made climate change. Every small action counts and helps ensure that future generations can live safely on our planet.');
var carAtHome = ui.Label('- Leave the car at home');
var noFlying = ui.Label('- Cut back on flying');
var reduceEnergy= ui.Label('- Reduce your energy use, and bills');
var greenSpace= ui.Label('- Respect and protect green spaces');
var talkChanges= ui.Label('- Talk about the changes you make');
var noWast= ui.Label('- Cut consumption – and waste');
var infoHealthLable =  ui.Label({value: 'Health',style: {fontSize: '16px', fontWeight: 'bold'}});
var infoHealtTipphLable = ui.Label('Stay healthy when a heat wave approaches! Especially in extreme heat, it is important to take care of yourself and your body. With these few tips you will hopefully get through the next heat wave safe and healthy.');
var water= ui.Label('- Drink water and eat foods with high water content');
var clothes= ui.Label('- Waer loos-fitting clothing in breathable fabrics and a hat');
var shade= ui.Label('- Stay in the shade and limit travel and exercise');
var ice= ui.Label('- Use fans, ice and ool showsers to reduce your body temperature');
infoPanel.add(infoHeadingLable);
// Climate
infoPanel.add(infoclimateLable);
infoPanel.add(infoTippLable);
infoPanel.add(carAtHome);
infoPanel.add(noFlying);
infoPanel.add(reduceEnergy);
infoPanel.add(greenSpace);
infoPanel.add(talkChanges);
infoPanel.add(noWast);
// Health
infoPanel.add(infoHealthLable);
infoPanel.add(infoHealtTipphLable);
infoPanel.add(water);
infoPanel.add(clothes);
infoPanel.add(shade);
infoPanel.add(ice);
infoPanel.add(infoBackButton);
/*
 * Data & ModelPanel Widgets
 */
var dataModelBackButton = ui.Thumbnail( {
  image: backButtonIcon,
  style:{width:"40px"},
  onClick: onBackButtonDataModelClicked
});
var dataModelHeadingLable =  ui.Label({value: 'Data & Model',style: {fontSize: '20px', fontWeight: 'bold'}});
var dataModelTippLable = ui.Label('Sentinel-2 and Landsat-8 data were used in combination for this project. The Landsat-8 data were used to calculate land surface temperature (LST). The Sentinel-2 data were used to calculate the normalized vegetation index (NDVI) and normalized moisture index (NDMI). Based on all three indices, the final heat risk map was calculated.');
dataModelPanel.add(dataModelHeadingLable);
dataModelPanel.add(dataModelTippLable);
dataModelPanel.add(dataModelBackButton);
/*
 * Contact Panel Widgets
 */
var contactBackButton = ui.Thumbnail( {
  image: backButtonIcon,
  style:{width:"40px"},
  onClick: onBackButtonContactClicked
});
var contactHeadingLable =  ui.Label({value: 'Get in touch!',style: {fontSize: '20px', fontWeight: 'bold'}});
var contactTippLable = ui.Label('We look forward to hearing your opinions and suggestions on the project. Feel free to contact us with questions or suggestions!');
var emailLable = ui.Label({value: 'E-Mail', style:{fontSize: '16px', fontWeight: 'bold'}});
var addressLable = ui.Label('Team: team_igp@xxx.de');
contactPanel.add(contactHeadingLable);
contactPanel.add(contactTippLable);
contactPanel.add(emailLable);
contactPanel.add(addressLable);
contactPanel.add(contactBackButton);
ui.root.clear();
ui.root.add(mainPanel);
ui.root.add(heatWarningPanel);
ui.root.add(infoPanel);
ui.root.add(dataModelPanel);
ui.root.add(contactPanel);
ui.root.add(map);
function onHeatWaringThumbnailClicked() {
    mainPanel.style().set("shown", false);
    heatWarningPanel.style().set("shown", true);
}
function onBackButtonHeatWarningClicked() {
  heatWarningPanel.style().set("shown", false);
  mainPanel.style().set("shown", true);
}
function onInfoThumbnailClicked() {
    mainPanel.style().set("shown", false);
    infoPanel.style().set("shown", true);
}
function onBackButtonInfoClicked() {
  infoPanel.style().set("shown", false);
  mainPanel.style().set("shown", true);
}
function ondatModelThumbnailClicked() {
    mainPanel.style().set("shown", false);
    dataModelPanel.style().set("shown", true);
}
function onBackButtonDataModelClicked (){
  dataModelPanel.style().set("shown", false);
  mainPanel.style().set("shown", true);
}
function onContactThumbnailClicked() {
    mainPanel.style().set("shown", false);
    contactPanel.style().set("shown", true);
}
function onBackButtonContactClicked () {
  contactPanel.style().set("shown", false);
  mainPanel.style().set("shown", true);
}
/*
 * Function is called when the province is selected in the dropdown box
 */
function locationChanged(value, widget) {
  var province = canada_provinces.filterMetadata(name_property,"equals",value).first()
  var feature = ee.Feature(province);
  map.centerObject(feature, 5);
}
var legendFIRMS = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 5px',
    width: '500px'
  }
});
ui.root.add(legendFIRMS);
function fillLegend() {
  // Create legend title
  var legendTitleFIRMS = ui.Label({
    value: 'Heat Warning ',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // Add the title to the panel
  legendFIRMS.add(legendTitleFIRMS);
  // Creates and styles 1 row of the legend.
  var makeRowFIRMS = function(colorFIRMS, nameFIRMS) {
        // Create the label that is actually the colored box.
        var colorBoxFIRMS = ui.Label({
          style: {
            backgroundColor: '#' + colorFIRMS,
            // Use padding to give the box height and width.
            padding: '8px',
            margin: '0 0 4px 0'
          }
        });
        // Create the label filled with the description text.
        var descriptionFIRMS = ui.Label({
          value: nameFIRMS,
          style: {margin: '0 0 4px 6px'}
        });
        // return the panel
        return ui.Panel({
          widgets: [colorBoxFIRMS, descriptionFIRMS],
          layout: ui.Panel.Layout.Flow('horizontal')
        });
  };
  //  Palette with the colors
  var paletteFIRMS =['F3E80E', 'E0600D', 'C41D2A'];
  // name of the legend
  var namesFIRMS = ['Low', 'Medium', 'High'];
  // Add color and and names
  for (var p = 0; p < 3; p++) {
    legendFIRMS.add(makeRowFIRMS(paletteFIRMS[p], namesFIRMS[p]));
    }
}
function startCalculating() {
  print("Start Calculating")
  map.clear();
  legendFIRMS.clear();
  fillLegend();
  //Location
  var location = locationSelect.getValue();
  //Startdate
  var startDateValue = startDateSlider.getValue();
  var startDate = new Date(startDateValue[0]);
  startDate = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
  //Enddate
  var endDateValue = endDateSlider.getValue();
  var endDate = new Date(endDateValue[0]);
  endDate = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();
  //print(startDate)
  //print(endDate)
  //var date_start = '2020-01-01';
  //var date_end = '2021-03-31'; 
  var S2_data =  ee.ImageCollection('COPERNICUS/S2')
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
            .filterBounds(Vancouver)
            .filterDate(startDate,endDate)
            .map(maskS2clouds)
            .map(addNDMI)
            .map(addNDVI);
  print(S2_data)
  var S2_data_last_image = S2_data.first().select('B4', 'B3', 'B2');
  var S2_data_ndvi_last_image = S2_data.first().select('NDVI');
  var S2_data_ndmi_last_image = S2_data.first().select('NDMI');
  // Cmobine the NDVI and NDMI into one single image 
  var new_img = S2_data_ndvi_last_image.addBands(S2_data_ndmi_last_image).rename('NDVI','NDMI');
  // var new_img = LST_last_image.addBands(L8_data_ndvi_last_image).addBands(L8_data_ndmi_last_image).rename('LST','NDVI','NDMI'); For Landsat 8
  var zones = new_img.select('NDVI').gt(-0.6).add(new_img.select('NDVI').lt(0.2))
  var ndvi = new_img.expression('NDVI < 0.2 && NDVI >0.06', {
        'NDVI': new_img.select('NDVI'),
        // 'NDMI': new_img.select('NDMI'),
  });
  var ndmi = new_img.expression('NDMI < 0.2 && NDMI >-0.5', {
        'NDMI': new_img.select('NDMI'),
  });
  var combine = ndvi.addBands(ndmi).rename('NDVI','NDMI');
  var result = combine.expression('NDMI + NDVI', {
        'NDMI': combine.select('NDMI'),
        'NDVI': combine.select('NDVI')
  });
 // Define the chart and print it to the console.
var chartNDVI =
    ui.Chart.image
        .series({
          imageCollection: S2_data.select('NDVI'),
          region: Vancouver,
          reducer: ee.Reducer.mean(),
          scale: 500,
          xProperty: 'system:time_start'
        })
        .setSeriesNames(['NDVI'])
        .setOptions({
          title: ' Normalized Vegetation Index',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'NDVI',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 5,
          colors: ['green'],
          curveType: 'function'
        });
var chartNDMI= ui.Chart.image.series(S2_data.select('NDMI'), Vancouver, ee.Reducer.mean(), 500, 'system:time_start')
        //.setChartType('ScatterChart')
        .setOptions({
        crosshair: { 
        trigger: 'both' ,
        opacity: 0.5 ,
        orientation: 'both'
         },          
         title : '  Normalized Moisture Index ' ,
         titleTextStyle: {italic: false, bold: true},
         hAxis: {title: Date},
         vAxis: {title: 'NDMI'},
         pointSize: 5,
         colors : ['red'],
         curveType: 'function'
        });
  legendFIRMS.add(chartNDVI);
  legendFIRMS.add(chartNDMI);
  map.addLayer(canada_provinces, false);
  map.addLayer(S2_data_last_image, {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3}, 'RGB', false);    
  map.addLayer(S2_data_ndvi_last_image, {bands: 'NDVI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDVI', false); 
  map.addLayer(S2_data_ndmi_last_image, {bands: 'NDMI', min: 0, max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 
          'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401',
            '056201', '004C00', '023B01','012E01', '011D01', '011301']},'NDMI', false); 
  map.addLayer(result, {bands: 'NDMI', min: 0, max: 2,palette: ['F3E80E', 'E0600D', 'C41D2A']},'Heat Map'); 
  map.centerObject(result, 10);
}
// function for Cloud Mask of Sentinel 2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000)
  // these properties should be copied otherwise the charts will
        .copyProperties(image, ['system:time_start']);
}
// //// function to calculate NDVI and NDMI Sentinel 2 /////////
function addNDVI(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi)
    // these properties should be copied otherwise the charts will not be displayed
    .copyProperties(image, ['system:time_start']);
}
function addNDMI(image) {
    var ndmi = image.normalizedDifference(['B8', 'B11']).rename('NDMI');
    return image.addBands(ndmi)
    .copyProperties(image, ['system:time_start']);
}