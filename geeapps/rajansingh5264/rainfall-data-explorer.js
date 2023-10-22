var ic_chirps = ui.import && ui.import("ic_chirps", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
function App(){
  var data = {
    panel : {
      main : ui.Panel( { style:{width:"500px",backgroundColor:"lightgrey", border:"2px solid black"} }),
      chart: ui.Panel(),
      addImageSingle: ui.Panel({style: {border: "2px solid black", margin: "4px 4px 4px 4px"}, layout: ui.Panel.Layout.flow("vertical")}),
      legendImageSingle: ui.Panel(),
      addImageAggregate: ui.Panel({style: {border: "2px solid black", margin: "4px 4px 4px 4px"}, layout: ui.Panel.Layout.flow("horizontal")}),
      legendImageAggregate: ui.Panel()
      },
    label : {
      title : ui.Label({value: 'Rainfall Data Explorer, Developed By: Rajan Singh',
                style: {fontSize: '31px', textAlign: 'right', color: 'blue', fontFamily: 'monospace',  fontWeight: 'bold', backgroundColor: "lightgrey"}
      }),
      instructions : ui.Label({value: 'Select a point to explore rainfall data. Plot a time-series chart or view Single and/or Aggregate rainfall images.', 
                style: {fontSize: '14px', textAlign: 'left', fontFamily: 'monospace', fontWeight: 'bold', backgroundColor: "lightgrey"}}),
    },
    button : { 
      drawChart: ui.Button({label: "Generate Time-Series Chart", onClick: CreateChart})
    },
    checkbox: {
      imageSingle: ui.Checkbox({label: "Add Single Rain Year", value: false, onChange: ToggleImageSingle}),
      imageAggregate: ui.Checkbox({label: "Add Multiple Rain Aggregate", value: false, onChange: ToggleImageAggregate})
    },
    slider: {
      imageSingle: ui.Slider({min: 1981, max:2019, value: 1981, step:1, onChange: AddImageSingle, disabled: true, style: {stretch: "horizontal"}})
    },
    select: {
      aggregate: ui.Select({
        items: ["Mean", "Minimum", "Maximum", "Standard Deviation"],
        placeholder: "Select Aggregate Statistic",
        onChange: SelectRainReducer
      })},
      reducer: {
        aggregate: ee.Reducer.mean()
      },
    imagery : PrepareRegressionImagery(),   
    point: ee.Geometry.Point([2.1689, 41.3915]),
    palette: {rain :["red", "orange", "yellow", "green", "blue"]},
    map : ui.Map()
  };
  function RemoveMapLayer( thisLayer ){
    // https://github.com/fitoprincipe/geetools-code-editor
    var layers = data.map.layers();
    var names = [];
    layers.forEach( function(lay) {names.push(lay.getName()) } );
    var index = names.indexOf( thisLayer );
    if (index > -1) { data.map.remove( layers.get(index) ) }
  }  ////////// Removes layers from Map
  function PrepareRegressionImagery(){
    function fromDailyToAnnual( Year ){
      var yearStart = ee.Date.fromYMD( Year, 1, 1);
      var yearEnd = ee.Date.fromYMD( Year, 12, 31);
      var im_chirps = ic_chirps.filterDate( yearStart, yearEnd )
                               .sum()
                               .rename('rain')
                               .set('Year',Year)
                               .set('system:time_start',yearStart.millis());
      return im_chirps;
    }
    function PrepareVariables( thisImage ){
      var num_year = ee.Number( thisImage.get('Year') );
      var im_year = ee.Image(num_year).int8(); // dependent variable
      var im_rain = thisImage.select('rain'); // independent variable
      var im_variables = im_year.addBands(im_rain)
                                .rename("year","rain")
                                .set('Year', num_year)
                                .set( 'system:time_start', thisImage.get('system:time_start') );
      return im_variables;
    }
    var lst_annual_rain = ee.List.sequence(1981,2019).map( fromDailyToAnnual );
    var ic_annual_rain = ee.ImageCollection( lst_annual_rain ).sort( 'system:time_start' );
    ic_annual_rain = ic_annual_rain.map( PrepareVariables );
    return ic_annual_rain;
  } ///////// Daily data into annual data
  function AddWidgets(){
    data.panel.main.add( data.label.title );              
    data.panel.main.add( data.label.instructions );
    data.panel.main.add( data.panel.addImageSingle)
    data.panel.addImageSingle.add( data.checkbox.imageSingle)
    data.panel.addImageSingle.add ( data.slider.imageSingle)
    data.panel.main.add(data.panel.addImageAggregate)
    data.panel.addImageAggregate.add(data.checkbox.imageAggregate)
    data.panel.addImageAggregate.add(data.select.aggregate)
    data.panel.main.add(data.button.drawChart)
    data.panel.main.add( data.panel.chart )
  }
  function CreateLegend( min, max, name ){
    function ColourBar() {
      return ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: { bbox: [0, 0, 1, 0.1], palette: data.palette.rain, },
        style: {stretch: 'horizontal', margin: '4px 8px', maxHeight: '30px' },
      });
    }
    var mid = (min + max) / 2.0;
    min = Math.round(min);
    max = Math.round(max);
    mid = Math.round(mid);
    var title = ui.Label({ value: name,
                           style: {fontWeight: 'bold'}
                        });
    var gradientlabels = ui.Panel({
      widgets: [
        ui.Label( min ),
        ui.Label( mid, {margin: '4px 8px',textAlign: 'center', stretch: 'horizontal'}),
        ui.Label( max, {margin: '4px 8px'})
        ],
      layout: ui.Panel.Layout.flow('horizontal')      
    });
    var thisLegend = ui.Panel( {
      widgets: [title, ColourBar(), gradientlabels],
      style: {position: 'bottom-left'}
      });
    return thisLegend;
  }
  function SetupMouseClick (){
    function Click (coordinates){
      data.map.clear()
      data.map.onClick (Click)
      data.point = ee.Geometry.Point([coordinates.lon, coordinates.lat])
      data.map.addLayer(data.point, {color: "blue"}, "Point")
    }
    data.map.onClick(Click)
  }
  function CreateChart (){
    var thisChart = ui.Chart.image.series(data.imagery.select("rain"), data.point, ee.Reducer.mean(), 5000);
    thisChart.setOptions({
      title: "Time Series of Annual Rainfall",
      vAxis:{title: "Rainfall (mm)"},
      hAxis: {title: "Year", format: "yyyy"},
      trendlines: {0:{color: "red"}}
    })
    data.panel.chart.clear()
    data.panel.chart.add(thisChart)
  }
  function ToggleImageSingle(){
    if (data.checkbox.imageSingle.getValue()){
      data.slider.imageSingle.setDisabled(false);
      AddImageSingle(data.slider.imageSingle.getValue())
    }
    else {
      data.slider.imageSingle.setDisabled(true)
      RemoveMapLayer ("Rain (Single)")
      data.map.remove(data.panel.legendImageSingle)
    }
  }
  function AddImageSingle (thisYear){
    RemoveMapLayer ("Rain (Single)")
    data.map.remove(data.panel.legendImageSingle)
    var thisImage = data.imagery.filterMetadata("Year", "equals", thisYear).select("rain").first()
    var stats = thisImage.reduceRegion(ee.Reducer.minMax(), data.point.buffer(100000), 5000)
    stats.evaluate(function (thisDictionary){
    data.panel.legendImageSingle.clear()
    var thisLegend = CreateLegend(thisDictionary.rain_min, thisDictionary.rain_max, "Rainfall (mm)")
    data.panel.legendImageSingle.add(thisLegend)
    data.map.add(data.panel.legendImageSingle)
    data.map.addLayer(thisImage, {min:thisDictionary.rain_min, max:thisDictionary.rain_max, palette:data.palette.rain}, "Rain (Single)")
    })
  }
  function ToggleImageAggregate (){
    if (data.checkbox.imageAggregate.getValue()){
      AddImageAggregate()
    }
    else{
    RemoveMapLayer("Rain (Aggregate)")
    data.map.remove(data.panel.legendImageAggregate)
    }
  }
  function AddImageAggregate(){
    RemoveMapLayer("Rain (Aggregate)")
    data.map.remove(data.panel.legendImageAggregate)
    var thisImage = data.imagery.filterBounds(data.point)
                                .select("rain")
                                .reduce(data.reducer.aggregate)
                                .rename("rain")
    var stats = thisImage.reduceRegion(ee.Reducer.minMax(), data.point.buffer(100000), 5000)
    stats.evaluate(function (clientStats){
    data.panel.legendImageAggregate.clear()
    var thisLegend = CreateLegend(clientStats.rain_min, clientStats.rain_max, "Aggregate Rainfall (mm)")
    data.panel.legendImageAggregate.add(thisLegend)
    data.map.add(data.panel.legendImageAggregate)
    data.map.addLayer(thisImage, {min: clientStats.rain_min, max: clientStats.rain_max, palette: data.palette.rain}, "Rain (Aggregate)")
    })
  }
  function SelectRainReducer (thisItem){
    var reducers = {
      "Mean": ee.Reducer.mean(),
      "Minimum": ee.Reducer.min(),
      "Maximum": ee.Reducer.max(),
      "Standard Deviation": ee.Reducer.stdDev()
    }
    data.reducer.aggregate = reducers[thisItem]
  }
  AddWidgets();
  SetupMouseClick ();
  data.map.centerObject(data.point, 9)
  ui.root.clear();
  ui.root.add(data.panel.main)
  ui.root.add(data.map)
}
App();