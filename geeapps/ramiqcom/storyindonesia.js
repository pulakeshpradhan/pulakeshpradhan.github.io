var gaul = ui.import && ui.import("gaul", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    pop = ui.import && ui.import("pop", "imageCollection", {
      "id": "JRC/GHSL/P2016/POP_GPW_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    borneo = ui.import && ui.import("borneo", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.25220881755155,
                1.6897256053857637
              ],
              [
                108.54846820808439,
                -1.078042291724816
              ],
              [
                109.85621272380155,
                -2.988848714809555
              ],
              [
                111.46021663005155,
                -3.9757802849400417
              ],
              [
                114.71216975505155,
                -4.589293924509931
              ],
              [
                116.20631038005155,
                -4.457868690695127
              ],
              [
                116.98175742344134,
                -3.081273704552791
              ],
              [
                117.54664241130155,
                -1.42999810990425
              ],
              [
                118.18384944255155,
                -0.5512318393047801
              ],
              [
                118.99683772380155,
                0.28371943482194417
              ],
              [
                119.41431819255155,
                0.876948071754715
              ],
              [
                119.56812678630155,
                2.019142377534264
              ],
              [
                119.32642756755155,
                5.854560666863409
              ],
              [
                117.61911780917501,
                7.642989987924806
              ],
              [
                116.65232093417501,
                7.457841838224341
              ],
              [
                114.19138343417501,
                5.493017626289268
              ],
              [
                112.34568030917501,
                4.573734815581256
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.25220881755155, 1.6897256053857637],
          [108.54846820808439, -1.078042291724816],
          [109.85621272380155, -2.988848714809555],
          [111.46021663005155, -3.9757802849400417],
          [114.71216975505155, -4.589293924509931],
          [116.20631038005155, -4.457868690695127],
          [116.98175742344134, -3.081273704552791],
          [117.54664241130155, -1.42999810990425],
          [118.18384944255155, -0.5512318393047801],
          [118.99683772380155, 0.28371943482194417],
          [119.41431819255155, 0.876948071754715],
          [119.56812678630155, 2.019142377534264],
          [119.32642756755155, 5.854560666863409],
          [117.61911780917501, 7.642989987924806],
          [116.65232093417501, 7.457841838224341],
          [114.19138343417501, 5.493017626289268],
          [112.34568030917501, 4.573734815581256]]]),
    riverView = ui.import && ui.import("riverView", "featureViewLayer", {
      "id": "WWF/HydroSHEDS/v1/FreeFlowingRivers_FeatureView",
      "name": "FreeFlowingRivers_FeatureView"
    }) || ui.Map.FeatureViewLayer("WWF/HydroSHEDS/v1/FreeFlowingRivers_FeatureView", null, "FreeFlowingRivers_FeatureView"),
    alos = ui.import && ui.import("alos", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    river = ui.import && ui.import("river", "table", {
      "id": "WWF/HydroSHEDS/v1/FreeFlowingRivers"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers");
// Run the story
mainMenu();
function resetMap(){
  // Clear anything on the current map
  Map.clear();
   // Hide the rest of uneeded button in GEE
  Map.setControlVisibility({
    all: false,
    fullscreenControl: true,
    scaleControl: true
  });
  // Set map mode to satellit
  Map.setOptions({
    mapTypeId: 'SATELLITE'
  });
}
function mainMenu(){
  // Reset map
  resetMap();
  // Indonesia country shape for zoom for main menu
  var indonesia = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
  Map.centerObject(indonesia, 5);
  // Main story panel
  var storyPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', maxHeight: '500px', stretch: 'horizontal', position: 'top-center'}
  });
  Map.add(storyPanel);
  // Story title
  var storyLabel = ui.Label({
    value: 'Story of Indonesia',
    style: {fontSize: '40px', stretch: 'horizontal', textAlign: 'center'}
  });
  storyPanel.add(storyLabel);
  // Story author
  var authorLabel = ui.Label({
    value: 'Created by Ramadhan',
    style: {stretch: 'horizontal', textAlign: 'center'}
  });
  storyPanel.add(authorLabel);
  // Story start button
  var startStoryButton = ui.Button({
    label: 'Start',
    style: {stretch: 'horizontal'},
    onClick: function(){
      story1();
    }
  });
  storyPanel.add(startStoryButton);
}
// Small version of main menu button for each slide to return to main menu
function smallMenu(slide){
  // Story panel
  var storyPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', false),
    style: {position: 'top-center'}
  });
  Map.add(storyPanel);
  // Select slide
  var slideSelect = ui.Select({
    items: ['1', '2', '3'],
    value: slide,
    style: {},
    onChange: function(value){
      switch(value){
        case '1':
          story1();
          break;
        case '2':
          story2();
          break;
        case '3':
          story3();
          break;
      }
    }
  });
  storyPanel.add(slideSelect);
  // Previous button
  var previousButton = ui.Button({
    label: '<',
    disabled: true,
    onClick: function(){
      var slide = slideSelect.getValue();
      switch (slide) {
        case '1':
          break;
        case '2':
          story1();
          break;
        case '3':
          story2();
          break;
      }
    }
  });
  storyPanel.add(previousButton);
  // Next button
  var nextButton = ui.Button({
    label: '>',
    disabled: true,
    onClick: function(){
      var slide = slideSelect.getValue();
      switch (slide) {
        case '1':
          story2();
          break;
        case '2':
          story3();
          break;
        case '3':
          break;
      }
    }
  });
  storyPanel.add(nextButton);
  // Check slide function
  function checkSlide(){
    var slide = slideSelect.getValue();
    switch (slide) {
      case '1':
        previousButton.setDisabled(true);
        nextButton.setDisabled(false);
        break;
      case '2':
        previousButton.setDisabled(false);
        nextButton.setDisabled(false);
        break;
      case '3':
        previousButton.setDisabled(false);
        nextButton.setDisabled(true);
        break;
    }
  }
  checkSlide();
  // Only map button
  var visualSelect = ui.Select({
    items: ['All', 'Only map', 'Map & info'],
    value: 'All',
    onChange: function(value){
      if (value == 'Only map') {
        Map.widgets().forEach(function(object){
          object.style().set({shown: false});
        });
        visualSelect.setValue('Only map');
        storyPanel.style().set({shown: true});
        Map.widgets().get(1).style().set({shown: true});
      } else if (value == 'Map & info') {
        Map.widgets().forEach(function(object){
          object.style().set({shown: false});
        });
        visualSelect.setValue('Map & info');
        storyPanel.style().set({shown: true});
        Map.widgets().get(3).style().set({shown: true});
      } else if (value == 'All') {
        Map.widgets().forEach(function(object){
          object.style().set({shown: true});
        });
        visualSelect.setValue('All');
      }
    }
  });
  storyPanel.add(visualSelect);
  // End story button
  var endStoryButton = ui.Button({
    label: 'End',
    style: {},
    onClick: function(){
      mainMenu();
    }
  });
  storyPanel.add(endStoryButton);
}
// Legend tools to make legend panel
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Inset tools to make overview map
var insetTool = require('users/ramiqcom/ugm:tools/inset');
// New set of slide function
function newSlide(slide){
  // Reset map
  resetMap();
  // Small menu to return to main menu
  smallMenu(slide);
}
// Story 1 running function
function story1(){
  // New slide
  newSlide('1');
  // Story 1 data
  var jabodetabek = gaul.filter(ee.Filter.or(
    ee.Filter.eq('ADM1_NAME', 'Dki Jakarta'),
    ee.Filter.eq('ADM2_NAME', 'Bogor'),
    ee.Filter.eq('ADM2_NAME', 'Kota Bogor'),
    ee.Filter.eq('ADM2_NAME', 'Kota Depok'),
    ee.Filter.eq('ADM2_NAME', 'Kota Bekasi'),
    ee.Filter.eq('ADM2_NAME', 'Bekasi'),
    ee.Filter.eq('ADM2_NAME', 'Tangerang'),
    ee.Filter.eq('ADM2_NAME', 'Kota Tangerang')
    ));
  var popJabo = pop.map(function(img){
    return img.clip(jabodetabek);
  });
  // Visualization for population image
  var popVis = {palette: ['white', 'red'], min: 0, max: 1000};
  // Pop image for map
  var image = popJabo.filter(ee.Filter.eq('system:index', '2015')).first().selfMask();
  // Add image to map
  Map.addLayer(image, popVis, 'Jabodetabek', true, 0.6);
  // Center map to jabodetabek
  Map.centerObject(jabodetabek, 10);
  // Add legend to map
  var legend = legendTool.legendGradient('Pop Density per sqkm', popVis, 'middle-left');
  Map.add(legend);
  // Add inset to map
  var inset = insetTool.overview(jabodetabek.geometry(), '200px', 4, 'bottom-left', 'red');
  Map.add(inset);
  // First slide panel
  var panel1 = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', maxHeight: '500px', stretch: 'horizontal', position: 'bottom-right'}
  });
  Map.add(panel1);
  // First slide title
  var title1 = ui.Label({
    value: 'Most Populous Urban Area in Indonesia',
    style: {fontSize: '22px', textAlign: 'center', fontWeight: 'bold'}
  });
  panel1.add(title1);
  // First slide description
  var desc1 = ui.Label({
    value: "The Jakarta metropolitan area or Greater Jakarta, known locally as Jabodetabek (an acronym of Jakarta–Bogor–Depok–Tangerang–Bekasi), and sometimes extended to Jabodetabekjur (with the acronym extended to include part of Cianjur Regency), or Jabodetabekpunjur (further extended to include Puncak and the Cipanas district), is the most populous metropolitan area in Indonesia. It includes the national capital (Jakarta Special Capital Region, as the core city) as well as five satellite cities and three complete regencies. The original term 'Jabotabek' dated from the late 1970s and was revised to 'Jabodetabek' in 1999 when 'De' (for 'Depok') was inserted into the name following its formation. The term 'Jabodetabekjur' or 'Jabodetabekpunjur' was legalised on the Presidential Regulation Number 54 of 2008, although the name Jabodetabek is more commonly used. -Wikipedia",
    style: {fontSize: '11px', textAlign: 'justify'}
  });
  panel1.add(desc1);
  // List of feature to show for slide 1
  var popYearSelect = ui.Select({
    items: ['1975', '1990', '2000', '2015'],
    value: '2015',
    style: {stretch: 'horizontal'},
    onChange: function(value){
      changeYearImage(value);
    }
  });
  panel1.add(popYearSelect);
  // Change image by year
  function changeYearImage(year){
    var current = Map.layers().get(0);
    Map.remove(current);
    var newImage = popJabo.filter(ee.Filter.eq('system:index', year)).first().selfMask();
    Map.addLayer(newImage, popVis, 'Jabodetabek pop density ' + year, true, 0.6);
    Map.centerObject(jabodetabek, 10);
  }
  // Population time series chart
  var popChart = ui.Chart.image.series({
    imageCollection: popJabo,
    region: jabodetabek,
    reducer: ee.Reducer.sum(),
    scale: 250,
    xProperty: 'system:index',
  });
  popChart.setChartType('AreaChart');
  popChart.setOptions({
    title: 'Jabodetabek Population',
    hAxis: {title: 'Year'},
    vAxis: {title: 'Population'},
    legend: {position: 'none'}
  });
  panel1.add(popChart);
  // Data source label
  var story1SourceLabel = ui.Label({
    value: 'Source: Global Human Settlement Layer (JRC)',
    style: {fontSize: '12px'},
    targetUrl: 'https://publications.jrc.ec.europa.eu/repository/handle/JRC100523'
  }) ;
  panel1.add(story1SourceLabel);
}
function story2(){
  // New slide
  newSlide('2');
  // Center the map on borneo island
  Map.centerObject(borneo, 7);
  // Data for second slide
  var riverBorneo = riverView;
  // Visual for 2nd map
  var riverVis = {
    lineWidth: {
      property: 'RIV_ORD',
      categories: [
        [1, 5],
        [2, 4.5],
        [3, 4],
        [4, 3.5],
        [5, 3],
        [6, 2.5],
        [7, 2],
        [8, 1.5],
        [9, 1],
        [10, 0.5]
      ]
    },
    color: {
      property: 'RIV_ORD',
      mode: 'linear',
      palette: ['powderblue', 'lightskyblue', 'deepskyblue', 'royalblue', 'navy'],
      min: 1,
      max: 10,
    },
    rules: [{
      filter: ee.Filter.neq('COUNTRY', 'Indonesia'),
      isVisible: false
    }]
  };
  riverBorneo.setVisParams(riverVis);
  // Add river to map
  Map.add(riverBorneo);
  // Add river legend to map
  function addLegend(){
    // Title for the index map
    var title = 'River Order';
    // Visual for the legend
    var viz = {
      palette: ['navy', 'royalblue', 'deepskyblue', 'lightskyblue', 'powderblue'],
      min: 10, max: 1
    };
    // Position of the legend
    var post = 'middle-left';
    // Add legend to map
    var legend = legendTool.legendGradient(title, viz, post);
    Map.add(legend);
  }
  addLegend();
  // Add inset to map
  var inset = insetTool.overview(borneo, '200px', 2, 'bottom-left', 'red');
  Map.add(inset);
  // Second slide panel
  var panel2 = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', maxHeight: '500px', stretch: 'horizontal', position: 'bottom-right'}
  });
  Map.add(panel2);
  // Second slide title
  var title2 = ui.Label({
    value: 'Rivers of Borneo',
    style: {fontSize: '22px', textAlign: 'center', fontWeight: 'bold'}
  });
  panel2.add(title2);
  // Second slide description
  var desc2 = ui.Label({
    value: "The largest river system is the Kapuas in West Kalimantan, with a length of 1,143 km (710 mi). Other major rivers include the Mahakam in East Kalimantan (980 km (610 mi) long), the Barito, Kahayan, and Mendawai in South Kalimantan (1,090 km (680 mi), 658 km (409 mi), and 616 km (383 mi) long respectively), Rajang in Sarawak (565 km (351 mi) long) and Kinabatangan in Sabah (560 km (350 mi) long). Borneo has significant cave systems. In Sarawak, the Clearwater Cave has one of the world's longest underground rivers while Deer Cave is home to over three million bats, with guano accumulated to over 100 metres (330 ft) deep. The Gomantong Caves in Sabah has been dubbed as the 'Cockroach Cave' due to the presence of millions of cockroaches inside the cave. The Gunung Mulu National Park in Sarawak and Sangkulirang-Mangkalihat Karst in East Kalimantan which particularly a karst areas contains thousands of smaller caves. -Wikipedia",
    style: {fontSize: '11px', textAlign: 'justify'}
  });
  panel2.add(desc2);
  // River for calculation for graph in Borneo
  var riverGraphBorneo = river.filterBounds(borneo).filter(ee.Filter.lte('RIV_ORD', 3));
  // Graph river volume x length
  var riverGraph = ui.Chart.feature.byFeature({
    features: riverGraphBorneo,
    xProperty: 'LENGTH_KM',
    yProperties: 'VOLUME_TCM',
  });
  riverGraph.setChartType('ScatterChart');
  riverGraph.setOptions({
    title: 'Borneo Rivers Volume vs Length',
    hAxis: {title: 'Length(km)'},
    vAxis: {title: 'Volume*1000(cm3)'},
    legend: {position: 'none'}
  });
  panel2.add(riverGraph);
  // Data source label
  var story2SourceLabel = ui.Label({
    value: 'Source: WWF HydroSHEDS Free Flowing Rivers Network',
    style: {fontSize: '12px'},
    targetUrl: 'https://figshare.com/articles/dataset/Mapping_the_world_s_free-flowing_rivers_data_set_and_technical_documentation/7688801'
  }) ;
  panel2.add(story2SourceLabel);
}
function story3(){
  // New slide
  newSlide('3');
  // Slide 3 area
  var papua = gaul.filter(ee.Filter.or(
    ee.Filter.eq('ADM1_NAME', 'Papua'),
    ee.Filter.eq('ADM1_NAME', 'Irian Jaya Barat')
  ));
  // Center map to slide 3 area
  Map.centerObject(papua, 8);
  // Slide 3 data
  var elevation = alos.select('DSM').filterBounds(papua).mosaic().selfMask();
  // Vis parameter of slide 3 data
  var visParam = {palette: ['green', 'yellow', 'orange', 'red', 'white'], min: 0, max: 4000};
  // Add data to map
  Map.addLayer(elevation, visParam);
  // Add legend to map
  var legend = legendTool.legendGradient('Elevation (meter)', visParam, 'middle-right');
  Map.add(legend);
  // Add inset to map
  var inset = insetTool.overview(papua.geometry(), '200px', 2, 'bottom-right', 'red');
  Map.add(inset);
  // Second slide panel
  var panel3 = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {maxWidth: '350px', maxHeight: '500px', stretch: 'horizontal', position: 'bottom-left'}
  });
  Map.add(panel3);
  // Second slide title
  var title3 = ui.Label({
    value: 'Mountains Range of Jayawijaya',
    style: {fontSize: '22px', textAlign: 'center', fontWeight: 'bold'}
  });
  panel3.add(title3);
  // Second slide description
  var desc3 = ui.Label({
    value: "The Jayawijaya Mountains, formerly known as the Orange Range, are the eastern mountain range of the Maoke Mountains in the central highlands region of the Indonesian part of New Guinea. The range extends for 370 kilometres (230 mi) east of the Sudirman Range to the Star Mountains. Its highest point is Puncak Mandala at 4,760 metres (15,617 ft). The Baliem River has its source in the range. -Wikipedia",
    style: {fontSize: '11px', textAlign: 'justify'}
  });
  panel3.add(desc3);
  // Elevation chart
  var elevationChart = ui.Chart.image.histogram({
    image: alos.select('DSM').filterBounds(papua).mosaic(),
    region: papua,
    scale: 90,
    maxPixels: 1e20 ,
    maxBuckets: 10
  });
  elevationChart.setOptions({
    title: 'Average Elevation in Papua',
    hAxis: {title: 'Height (m)'},
    vAxis: {title: 'Area (m2)', scaleType: 'mirrorLog'},
    legend: {position: 'none'}
  });
  panel3.add(elevationChart);
  // Data source label
  var story3SourceLabel = ui.Label({
    value: 'Source: ALOS DSM: Global 30m',
    style: {fontSize: '12px'},
    targetUrl: 'https://www.aw3d.jp/en/'
  }) ;
  panel3.add(story3SourceLabel);
}