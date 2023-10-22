var darkMap = require('users/marcyinfeng/MapStyles/:/DarkMap');
// var legend = require('users/marcyinfeng/utils/:/legend')
Map.setOptions('Dark', {Dark: darkMap.darkMap()});
function getDate(cropType, dateType){
  var cropTypeCalendar =  ee.FeatureCollection('users/marcyinfeng/globalCropCalendar/cropCalendar')
                            .filterMetadata('full_crop_name', 'equals', cropType);
  var emptyImage = ee.Image(0);
  emptyImage = emptyImage.updateMask(emptyImage.gt(0));
  var features = cropTypeCalendar.filterMetadata('Level', 'equals', 'N');
  var code = features.aggregate_array('Nation_code');
  var date = features.aggregate_array(dateType);
  var ad = ee.Image('users/marcyinfeng/globalCropCalendar/gl_ad0_5min');
  var Nplanting = ee.Algorithms.If(code.size().gt(0), ad.remap(code, date), emptyImage);
  features = cropTypeCalendar.filterMetadata('Level', 'equals', 'S');
  code = features.aggregate_array('State_code');
  date = features.aggregate_array(dateType);
  ad = ee.Image('users/marcyinfeng/globalCropCalendar/gl_ad1_5min');
  var Splanting = ee.Algorithms.If(code.size().gt(0), ad.remap(code, date), emptyImage);
  features = cropTypeCalendar.filterMetadata('Level', 'equals', 'C');
  code = features.aggregate_array('County_code');
  date = features.aggregate_array(dateType);
  ad = ee.Image('users/marcyinfeng/globalCropCalendar/gl_ad2_5min');
  var Cplanting = ee.Algorithms.If(code.size().gt(0), ad.remap(code, date), emptyImage);
  date = ee.Image([Nplanting, Splanting, Cplanting])
                       .reduce(ee.Reducer.median())
                       .rename(dateType);
  return date
}
var chartPanel = ui.Panel({
  style:
      {height: '260px', width: '800px', 
       position: 'bottom-right', 
       shown: false, 
       backgroundColor: '#FF000000',
      // opacity:0.5,
      }
});
function createLegend(palette, legendTile, position, min, max){
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
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  min = Math.round(min)
  max = Math.round(max)
  var mid = Math.round((min + max) / 2)
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 8px', backgroundColor: '#FF000000'}),
      ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', backgroundColor: '#FF000000'}),
      ui.Label(max, {margin: '4px 8px', backgroundColor: '#FF000000'})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {backgroundColor: '#FF000000'}
  });
  var legendTitle = ui.Label({
    value: legendTile,
    style: {fontWeight: 'bold', backgroundColor: '#FF000000'}
  });
  // Add the legendPanel to the map.
  var legendPanel = ui.Panel({
    widgets: [legendTitle, colorBar, legendLabels],
    style: {position: position,
              fontFamily: 'Sans-serif',
              border: 1,
              // color: ,
              height: '100px',
              width: '300px',
              shown: false,
              // stretch: 'vertical',// ('horizontal', 'vertical', 'both')
              backgroundColor: '#ffffffE6',
      },
  });
  return legendPanel;
}
var palettes = require('users/gena/packages:palettes');
var greens  = palettes.colorbrewer.Greens[9]
var oranges = palettes.colorbrewer.Oranges[9]
var greensLegendPanel = createLegend(greens, 'Planting date (DOY)', 'middle-right', 0, 365)
var orangesLegendPanel = createLegend(oranges, 'Harvesting date (DOY)', 'middle-right', 0, 365)
// Define a DataTable using a JavaScript literal.
function plot1(calendar){
  var dataTable = {
    cols: [{id: 'day', label: 'Doy', type: 'number'},
           {id: 'Plant',   label: 'Plant', type: 'number'},
           {id: 'Growth',  label: 'Growth', type: 'number'},
           {id: 'Harvest', label: 'Harvest', type: 'number'}],
    rows: [{c: [{v: calendar[0]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v: calendar[5]}, {v: null}, {v: null}, {v: 1}]},
           ]
  };
  var options = {
          width: 600,
          height: 100,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' },
          // isStacked: true,
          lineWidth: 20,
          vAxis: {
            baselineColor: 'none',
            gridlineColor: 'none',
            ticks: []
          },
          hAxis: {
            baselineColor: 'none',
            // gridlineColor: 'none',
            viewWindow: {min: 0, max: 365},
          }
  };
  // Make a BarChart from the table and the options.
  var chart = new ui.Chart(dataTable, 'LineChart', options);
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var label1 = ui.Label('Crop calendar: ', 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var label2 = ui.Label('Plant start: ' + calendar[0], 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    // fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var dataTable1 = {
    cols: [{id: 'Plant start',    label: 'Plant start',    type: 'number'},
           {id: 'Plant median',   label: 'Plant median',   type: 'number'},
           {id: 'Plant end',      label: 'Plant end',      type: 'number'},
           {id: 'Harvest start',  label: 'Harvest start',  type: 'number'},
           {id: 'Harvest median', label: 'Harvest median', type: 'number'},
           {id: 'Harvest end',    label: 'Harvest end',    type: 'number'},
           ],
    rows: [{c: [{v: calendar[0]}, {v: calendar[1]}, {v: calendar[2]}, {v: calendar[3]}, {v: calendar[4]}, {v: calendar[5]}]}]
  };
  var chart1 = new ui.Chart(dataTable1, 'Table');
  chartPanel.widgets().set(0, label1);   
  chartPanel.widgets().set(1, chart1);  
  chartPanel.widgets().set(2, chart);
}
function plot2(calendar){
  var dataTable = {
    cols: [{id: 'day', label: 'Doy', type: 'number'},
           {id: 'Plant',   label: 'Plant', type: 'number'},
           {id: 'Growth',  label: 'Growth', type: 'number'},
           {id: 'Harvest', label: 'Harvest', type: 'number'}],
    rows: [{c: [{v: calendar[0]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v:         365}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v:         365}, {v: null}, {v: null}, {v: null}]},
           {c: [{v:           0}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v: calendar[5]}, {v: null}, {v: null}, {v: 1}]},
           ]
  };
  var options = {
          width: 600,
          height: 100,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' },
          // isStacked: true,
          lineWidth: 20,
          vAxis: {
            baselineColor: 'none',
            gridlineColor: 'none',
            ticks: []
          },
          hAxis: {
            baselineColor: 'none',
            // gridlineColor: 'none',
            viewWindow: {min: 0, max: 365},
          }
  };
  // Make a BarChart from the table and the options.
  var chart = new ui.Chart(dataTable, 'LineChart', options);
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var label1 = ui.Label('Crop calendar: ', 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var label2 = ui.Label('Plant start: ' + calendar[0], 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    // fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var dataTable1 = {
    cols: [{id: 'Plant start',    label: 'Plant start',    type: 'number'},
           {id: 'Plant median',   label: 'Plant median',   type: 'number'},
           {id: 'Plant end',      label: 'Plant end',      type: 'number'},
           {id: 'Harvest start',  label: 'Harvest start',  type: 'number'},
           {id: 'Harvest median', label: 'Harvest median', type: 'number'},
           {id: 'Harvest end',    label: 'Harvest end',    type: 'number'},
           ],
    rows: [{c: [{v: calendar[0]}, {v: calendar[1]}, {v: calendar[2]}, {v: calendar[3]}, {v: calendar[4]}, {v: calendar[5]}]}]
  };
  var chart1 = new ui.Chart(dataTable1, 'Table');
  chartPanel.widgets().set(0, label1);   
  chartPanel.widgets().set(1, chart1);  
  chartPanel.widgets().set(2, chart);
}
function plot3(calendar){
  var dataTable = {
    cols: [{id: 'day', label: 'Doy', type: 'number'},
           {id: 'Plant',   label: 'Plant', type: 'number'},
           {id: 'Growth',  label: 'Growth', type: 'number'},
           {id: 'Harvest', label: 'Harvest', type: 'number'}],
    rows: [{c: [{v: calendar[0]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v:         365}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v:         365}, {v: null}, {v: null}, {v: null}]},
           {c: [{v:           0}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v: calendar[5]}, {v: null}, {v: null}, {v: 1}]},
           ]
  };
  var options = {
          width: 600,
          height: 100,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' },
          // isStacked: true,
          lineWidth: 20,
          vAxis: {
            baselineColor: 'none',
            gridlineColor: 'none',
            ticks: []
          },
          hAxis: {
            baselineColor: 'none',
            // gridlineColor: 'none',
            viewWindow: {min: 0, max: 365},
          }
  };
  // Make a BarChart from the table and the options.
  var chart = new ui.Chart(dataTable, 'LineChart', options);
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var label1 = ui.Label('Crop calendar: ', 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var label2 = ui.Label('Plant start: ' + calendar[0], 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    // fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var dataTable1 = {
    cols: [{id: 'Plant start',    label: 'Plant start',    type: 'number'},
           {id: 'Plant median',   label: 'Plant median',   type: 'number'},
           {id: 'Plant end',      label: 'Plant end',      type: 'number'},
           {id: 'Harvest start',  label: 'Harvest start',  type: 'number'},
           {id: 'Harvest median', label: 'Harvest median', type: 'number'},
           {id: 'Harvest end',    label: 'Harvest end',    type: 'number'},
           ],
    rows: [{c: [{v: calendar[0]}, {v: calendar[1]}, {v: calendar[2]}, {v: calendar[3]}, {v: calendar[4]}, {v: calendar[5]}]}]
  };
  var chart1 = new ui.Chart(dataTable1, 'Table');
  chartPanel.widgets().set(0, label1);   
  chartPanel.widgets().set(1, chart1);  
  chartPanel.widgets().set(2, chart);
}
function plot4(calendar){
  var dataTable = {
    cols: [{id: 'day', label: 'Doy', type: 'number'},
           {id: 'Plant',   label: 'Plant', type: 'number'},
           {id: 'Growth',  label: 'Growth', type: 'number'},
           {id: 'Harvest', label: 'Harvest', type: 'number'}],
    rows: [{c: [{v: calendar[0]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: 1},    {v: null}, {v: null}]},
           {c: [{v: calendar[2]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v:         365}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v:         365}, {v: null}, {v: null}, {v: null}]},
           {c: [{v:           0}, {v: null}, {v: 1}, {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: 1},    {v: null}]},
           {c: [{v: calendar[3]}, {v: null}, {v: null}, {v: 1}]},
           {c: [{v: calendar[5]}, {v: null}, {v: null}, {v: 1}]},
           ]
  };
  var options = {
          width: 600,
          height: 100,
          legend: { position: 'top', maxLines: 3 },
          bar: { groupWidth: '75%' },
          // isStacked: true,
          lineWidth: 20,
          vAxis: {
            baselineColor: 'none',
            gridlineColor: 'none',
            ticks: []
          },
          hAxis: {
            baselineColor: 'none',
            // gridlineColor: 'none',
            viewWindow: {min: 0, max: 365},
          }
  };
  // Make a BarChart from the table and the options.
  var chart = new ui.Chart(dataTable, 'LineChart', options);
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var label1 = ui.Label('Crop calendar: ', 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var label2 = ui.Label('Plant start: ' + calendar[0], 
    {fontFamily: 'Sans-serif',
    border: 1,
    whiteSpace: 'pre',
    // fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#FF000000',
    });
  var dataTable1 = {
    cols: [{id: 'Plant start',    label: 'Plant start',    type: 'number'},
           {id: 'Plant median',   label: 'Plant median',   type: 'number'},
           {id: 'Plant end',      label: 'Plant end',      type: 'number'},
           {id: 'Harvest start',  label: 'Harvest start',  type: 'number'},
           {id: 'Harvest median', label: 'Harvest median', type: 'number'},
           {id: 'Harvest end',    label: 'Harvest end',    type: 'number'},
           ],
    rows: [{c: [{v: calendar[0]}, {v: calendar[1]}, {v: calendar[2]}, {v: calendar[3]}, {v: calendar[4]}, {v: calendar[5]}]}]
  };
  var chart1 = new ui.Chart(dataTable1, 'Table');
  chartPanel.widgets().set(0, label1);   
  chartPanel.widgets().set(1, chart1);  
  chartPanel.widgets().set(2, chart);
}
function plotCropCalendar(calendar){
  // case 1 within one cycle:
  if ((calendar[0] <= calendar[2]) 
    & (calendar[0] <= calendar[3]) 
    & (calendar[3] <= calendar[5]) 
    ){
    plot1(calendar)
  }
  // case 2 starting date span 2 years:
  if ((calendar[0] >= calendar[2]) 
    & (calendar[3] <= calendar[5])){
    plot2(calendar)
  }
  // case 3 harvesting date span 2 years:
  if ((calendar[0] <= calendar[2]) 
    & (calendar[3] >= calendar[5])){
    plot3(calendar)
  }
   // case 4 growthing date span 2 years:
  if ((calendar[0] <= calendar[2]) 
    & (calendar[3] <= calendar[5])
    & (calendar[0] >= calendar[3])){
    plot4(calendar)
  }
}
function mappingCalendar(cropType){
  var plantDate   = getDate(cropType, 'Plant_median')
  var harvestDate = getDate(cropType, 'Harvest_median')
  var plantStart = getDate(cropType, 'Plant_start')
  var plantEnd   = getDate(cropType, 'Plant_end')
  var harvestStart = getDate(cropType, 'Harvest_start')
  var harvestEnd   = getDate(cropType, 'Harvest_end')
  var calendarMap = ee.Image.cat([plantStart, plantDate, plantEnd, harvestStart, harvestDate, harvestEnd])
  Map.layers().reset()
  // Map.clear()
  // Map.addLayer(calendarMap.randomVisualizer(), {}, cropType + ' crop calendar');
  if (!greensLegendPanel.style().get('shown')) {
    greensLegendPanel.style().set('shown', true);
  }
  if (!orangesLegendPanel.style().get('shown')) {
    orangesLegendPanel.style().set('shown', true);
  }
  var palettes = require('users/gena/packages:palettes');
  var greens  = palettes.colorbrewer.Greens[9]
  var oranges = palettes.colorbrewer.Oranges[9]
  Map.addLayer(calendarMap.select('Plant_median'),   {palette:  greens, min:0, max:365}, cropType + ' planting date');
  Map.addLayer(calendarMap.select('Harvest_median'), {palette: oranges, min:0, max:365}, cropType + ' harvesting date');
  Map.unlisten();
  Map.onClick(function(coords) {
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var calendar = calendarMap.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: point,
      scale: 30,
    })
    calendar = calendar.values(['Plant_start', 'Plant_median','Plant_end', 'Harvest_start', 'Harvest_median','Harvest_end'])
    var filledCalendar = calendar.set(3, ee.Number(calendar.get(4)).subtract(20))
                                 .set(5, ee.Number(calendar.get(4)).add(20))
    calendar = ee.List(ee.Algorithms.If(ee.Number(calendar.get(3)).eq(0).and(ee.Number(calendar.get(5)).eq(0)), filledCalendar, calendar))
    calendar.evaluate(plotCropCalendar)
  });
}
var nceo_logo = ee.Image("users/marcyinfeng/NCEO_logo");
var ucl_logo = ee.Image("users/marcyinfeng/UCL_logo");
// var nceo_logo = ui.Thumbnail({image:nceo_logo,
//                               params:{bands:['b1','b2','b3'],min:0,max:255, dimensions: '1000x227'},
//                               style:{width:'276.5px',height:'62.7655px',position: 'bottom-left'}});
// var ucl_logo  = ui.Thumbnail({image: ucl_logo,
//                               params:{bands:['b1','b2','b3'],min:0,max:255, dimensions:'553x162'},
//                               style:{width:'276.5px',height:'81px', position: 'bottom-left'}});
var nceo_logo = ui.Thumbnail({image:nceo_logo,
                              params:{bands:['b1','b2','b3'],min:0,max:255, dimensions: '1000x227'},
                              style:{width:'140px',
                                     height:'45px',
                                     position: 'top-right',
                                     backgroundColor: '#FF000000'
                              }});
var title = ui.Label('Global Crop Calendar, By: Rajan Singh', 
      {whiteSpace: 'pre',  
      position: 'top-center',
      fontFamily: 'Sans-serif',
      fontSize:  '24px',
      fontWeight: 'bold',
      border: 1,
      color: '#ffffff',
      backgroundColor: '#FF000000',
        })
function addPanel(list){  
  var select = ui.Select({
    items: list,
    onChange: function(key) {
      mappingCalendar(key, 'Harvest_median');
    }
  });
  select.setPlaceholder('Choose a crop type...');
  var hide_panel = ui.Panel({
    widgets: [
      ui.Label('Usage: ', 
        {whiteSpace: 'pre',  
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        border: 1,
        fontSize:  '24px',
        fontWeight: 'bold',
        // color: ,
        backgroundColor: '#FF000000',
          }),
      ui.Button({
                label: '❮❮',
                onClick: hide_control,
                style: {position: 'bottom-right', 
                        fontSize:  '24px',
                        fontWeight: 'bold',
                        //stretch: 'horizontal'
                        backgroundColor: '#FF000000',
                }})
        ], 
    style: {position: 'top-left',
            fontFamily: 'Sans-serif',
            border: 0,
            // color: ,
            height: '60px',
            // width: '320px',
            stretch: 'horizontal',// ('horizontal', 'vertical', 'both')
            backgroundColor: '#FF000000',
    },
    layout: ui.Panel.Layout.absolute()
  })
  var controlPanel = ui.Panel({
    widgets: [
      hide_panel, 
      ui.Label('1. Select crop type: ', 
      {whiteSpace: 'pre',  
      position: 'bottom-left',
      fontFamily: 'Sans-serif',
      border: 1,
      // color: ,
      backgroundColor: '#FF000000',
        }),
    select,
    ui.Label('2. Click on the colored regions to check the planting and harvesting dates.',
      {//whiteSpace: 'pre',  
       position: 'bottom-left',
        fontFamily: 'Sans-serif',
        border: 1,
        // color: ,
        backgroundColor: '#FF000000',
        }),
      ui.Label('This App is based on the Crop Calendar Dataset developed by Rajan Kumar Singh from the dataset of  Center for Sustainability and the Global Environment (SAGE). This app updates regards the correct timing of Planting & Harvesting of varrious crops.', 
        {//whiteSpace: 'pre',  
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        border: 1,
        // color: ,
        backgroundColor: '#FF000000',
          }),
      ui.Label({
        value:"Crop Calendar Dataset",
        style:{
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        // fontSize:  '24px',
        // fontWeight: 'bold',
        // border: 1,
        // color: ,
        backgroundColor: '#FF000000',
        },
        targetUrl:"https://nelson.wisc.edu/sage/data-and-models/crop-calendar-dataset/index.php"
        }),
    ui.Label({
        value:"Reference: \n",
        style:{
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        // fontSize:  '24px',
        // fontWeight: 'bold',
        // border: 1,
        // color: ,
        backgroundColor: '#FF000000',
        },
        }),
    ui.Label({
        value:"Crop planting dates: an analysis of global patterns.",
        style:{
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        // fontSize:  '24px',
        // fontWeight: 'bold',
        // border: 1,
        // color: ,
        backgroundColor: '#FF000000',
        },
        targetUrl:"https://nelson.wisc.edu/sage/data-and-models/crop-calendar-dataset/sacksetalGEB2010.pdf"
        }),
    ui.Label('',
      {whiteSpace: 'pre',  
        position: 'bottom-left',
        fontFamily: 'Sans-serif',
        // fontSize:  '24px',
        // fontWeight: 'bold',
        // border: 1,
        // color: ,
        backgroundColor: '#FF000000',
          }),
    ],
    style: {position: 'top-left',
            fontFamily: 'Sans-serif',
            border: 1,
            // color: ,
            height: '600px',
            width: '320px',
            // stretch: 'vertical',// ('horizontal', 'vertical', 'both')
            backgroundColor: '#ffffffE6',
    },
    layout: null,
  });
  var show_button =  ui.Button({
              label: '❯❯',
              onClick: show_control,
              style: {position: 'top-left', 
                      fontSize:  '24px',
                      fontWeight: 'bold',
                      //stretch: 'horizontal'
                      backgroundColor: '#FF000000',
              }});
  function hide_control(){
      // chartPanel.style().set('shown', true);
      Map.remove(controlPanel);
      Map.add(show_button);
   }
  function show_control(){
      // chartPanel.style().set('shown', true);
      Map.add(controlPanel);
       Map.remove(show_button);
   }
  Map.add(greensLegendPanel);
  Map.add(orangesLegendPanel);
  Map.add(controlPanel);
  Map.add(chartPanel);
  Map.add(title);
}
var allCrops = ee.FeatureCollection('users/marcyinfeng/globalCropCalendar/cropCalendar')
                 .aggregate_array('full_crop_name')
                 .distinct()
                 .sort()
                 ;
allCrops.evaluate(function(list){
  addPanel(list)
  // print(select);
});