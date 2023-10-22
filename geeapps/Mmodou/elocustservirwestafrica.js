var gfcImage = ui.import && ui.import("gfcImage", "image", {
      "id": "MODIS/MOD44W/MOD44W_005_2000_02_24"
    }) || ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    locustZone = ui.import && ui.import("locustZone", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.92190310397182,
                15.887268069141827
              ],
              [
                -12.824246853971824,
                13.67790421183467
              ],
              [
                1.4140343960281765,
                14.189728711699553
              ],
              [
                11.257784396028176,
                12.135895513393697
              ],
              [
                35.33981564602818,
                12.135895513393697
              ],
              [
                44.65622189602818,
                -0.07701650133130833
              ],
              [
                50.98434689602817,
                7.634664694229418
              ],
              [
                51.68747189602817,
                11.791970116361288
              ],
              [
                43.60153439602818,
                10.757652500965435
              ],
              [
                36.39450314602818,
                19.57003639575079
              ],
              [
                32.52731564602818,
                29.008042214149082
              ],
              [
                30.593721896028175,
                31.437941419915028
              ],
              [
                21.101534396028175,
                32.777943627203506
              ],
              [
                7.898487617621783,
                36.13157910908308
              ],
              [
                -14.187135396105663,
                31.486291565823088
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-17.92190310397182, 15.887268069141827],
          [-12.824246853971824, 13.67790421183467],
          [1.4140343960281765, 14.189728711699553],
          [11.257784396028176, 12.135895513393697],
          [35.33981564602818, 12.135895513393697],
          [44.65622189602818, -0.07701650133130833],
          [50.98434689602817, 7.634664694229418],
          [51.68747189602817, 11.791970116361288],
          [43.60153439602818, 10.757652500965435],
          [36.39450314602818, 19.57003639575079],
          [32.52731564602818, 29.008042214149082],
          [30.593721896028175, 31.437941419915028],
          [21.101534396028175, 32.777943627203506],
          [7.898487617621783, 36.13157910908308],
          [-14.187135396105663, 31.486291565823088]]]);
//@  originally from (Kiran Viparthi et al)
var app = {};
var countries =ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1") ;
var aoiCountries = ['All','Algeria','Mali', 'Mauritania', 'Morocco', 'Niger','Senegal', 'Tunisia',];
var selectedCountry;
var vegMap;
var ndviBand = 'nd';
var mirBand = 'sur_refl_b07';
var nirBand = 'sur_refl_b02';
var redBand = 'sur_refl_b01';
var hueBand = 'hue';
var vegBand = 'veg_presence';
var rgbBands = ee.List([ mirBand, nirBand, redBand]);
/********************************************** GLOBAL VAR SECTION END *******************************************/
/********************************************** APP FUNCTIONS SECTION START *******************************************/
app.loadCountryData = function(countryName, start, end)
{
  app.refreshMap();
  var country = locustZone;
  if(countryName!=='All')
  {
    country = countries.filter(ee.Filter.eq("ADM0_NAME", countryName));
    Map.centerObject(country.geometry().centroid(), 5);
  }
  //print(country);
  // Center the map on the country selected
  Map.onClick( app.showCharts );
  Map.style().set('cursor', 'crosshair');
  var baseMap = require('users/tl2581/packages:baseMap.js');
  Map.setOptions('Dark', {'Dark': baseMap.darkTheme});
  var modis500Collection = ee.ImageCollection('MODIS/006/MOD09GA').filterDate(start, end);
  var modis250Collection = ee.ImageCollection('MODIS/006/MOD09GQ').filterDate(start, end);
  //var modis500Collection = ee.ImageCollection('MODIS/MOD09GA').filterDate(start, end);
  //var modis250Collection = ee.ImageCollection('MODIS/MOD09GQ').filterDate(start, end);
  var innerJoin = ee.Join.inner();
// Specify an equals filter for image timestamps.
  var filterTimeEq = ee.Filter.equals({
    leftField: 'system:time_start',
    rightField: 'system:time_start'
  });
  // Apply the join.
  var joined = innerJoin.apply(modis250Collection, modis500Collection, filterTimeEq);
  var modisCollection = ee.ImageCollection(joined.map(function(feature)
  {
    var imageP= ee.Image(feature.get('primary'));
    var imageS= ee.Image(feature.get('secondary'));
    var imageC = imageP.addBands(imageS);
    return ee.Image.cat(imageC);
    //Used the above as I am not sure if the cat is equal to addBands
    //return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  }));
  //Map.addLayer(modisCollection, {}, 'MODIS');
  // Add the 'veg_presence' band to the images on the collection
  modisCollection = app.addPresenceOfVegetation(modisCollection);
  // How does the vegetation look on the first of january? 
  //var firstJanuary = ee.Image( modis500Collection.filterDate('2016-01-01','2016-01-20').select([vegBand]).first() );
  //Map.addLayer( firstJanuary.updateMask(firstJanuary), { min: 0, max : 1, palette: ['FF0000', '00FF00'] }, "Vegetation presence 2016-01-01");
  // Now we need to generate an image where we get a veg_age' that tells us how many images in the collection (here we should be useing dekades ) have the 'veg_presence' set to 1 
  var vegAgeImage = app.getVegetationAgeMap( modisCollection );
  Map.addLayer(srtm.clip(country), {min:0, max:2000, palette: ['FFFFFF', '000000']}, 'SRTM', 0);
  vegMap = vegAgeImage.clip(country).updateMask(vegAgeImage);
  Map.addLayer( vegMap, { min: 1, max : 6, palette: ['#ffa9c9', 'FFDD2A', 'D8C52A', '3BBCAA', '8BEA4A', 'green'] } , "Vegetation age map");
  //Map.onClick(app.showCharts); 
}
app.addPresenceOfVegetation = function(modisCollection){
  // START FUNCTION TO ADD VEGETATION BAND 'veg_presence' TO IMAGES IN COLLECTION
  // Add Hue by mapping a function to each of the images on the collection
  modisCollection = modisCollection.map( function(image){
        var datamask =  gfcImage.select(['water_mask'])
        // Remove the ocean
        image = image.addBands(datamask);
        image = image.mask( datamask.eq(0));
        //image = image.updateMask(datamask);   
        // Change the original image so that only the RGB bands (MIR,NIR,Red) are used
        image = ee.Image(image.select(rgbBands));
        // Transform from RGB to HSV color space
        var hsvImage = image.unitScale(-32768, 32767).rgbToHsv();
        //var hsvImage = image.rgbToHsv();
        // Add the Red band to the HSV image
        var hsvAndRedImage = image.addBands(hsvImage);
        // Calculate NDVI from original Modis image
        var ndviImage = hsvAndRedImage.normalizedDifference([nirBand,redBand]);
        // Add the NDVI band to the HSV+red image
        var hsvAndNdviImage =hsvAndRedImage.addBands(ndviImage);
        // return the image that was process, with the original bands + HSV bands + NDVI band  
        return hsvAndNdviImage;
  });
  // Calculate Hue Slope
  // We need to calculate the slope of the hue ( meaning the percentage that the value of H changes from one image to the next in the collection)  
  // The slope should be added as a band in the image
  // This values is used to distinguish between vegetation/no-vegetation on corner cases described on the papaer
  // TO BE DONE
    //print(modisCollection);
  // Apply thresholds for Vegetation/No-Vegetation detection
  modisCollection = modisCollection.map( function(image){
        // A one means the presence of vegetation, a zero one means no vegetation
        //'(hue)>(82-(ndvi*250))?1:( hue>( 14.5 + (ndvi * 75) ) AND hue<( 8 + ( ndvi * 210) )  AND hue>( 60 - ( ndvi * 250) ) )?1:0',
        //'hue>(82-(ndvi*250))?1:(hue<(82-(ndvi*250)) AND hue>(14.5+(ndvi*75)) AND hue<(8+(ndvi*210)) AND hue>(60-(ndvi*250)))?1:0',
        var vegBandImage = ee.Image(0).expression(
          'hue>(82-(nd*250))?1:(hue>(14.5+(nd*75)) AND hue<(8+(nd*210)) AND hue>(60-(nd*250)))?1:0',
          {
            'nd': image.select(ndviBand),
            'hue' : image.select(hueBand).multiply(100)
          }).select([0],[ vegBand ]);
        return ee.Image.cat(image,vegBandImage);
  });
  return modisCollection;
  // END FUNCTION TO ADD VEGETATION BAND 'veg_presence' TO IMAGES IN COLLECTION
}
app.getVegetationAgeMap = function(modisCollection){
  // This is not completely correct as we should be summing only the values that are continuous...
  var vegAgeImg = modisCollection.select([vegBand]).sum();
  // Mask pixels where vegetation age > 5 dekade
  vegAgeImg = ee.Image(vegBand).expression(
          'veg_band>8?0:veg_band',
          {
            'veg_band': vegAgeImg.select(vegBand)
          });
  return vegAgeImg;        
}
app.showModisNdviChart = function( coords ){
  // Show the loading label.
  /*app.chartBox.widgets().set(1, ui.Label({
    value: 'Loading...' + coords.lon + ',' + coords.lat,
    style: {color: 'gray'}
  }));
*/
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Load the MODIS  Vegetation Index composite. Select the NDVI band. Resolution of the pixels is 250 meters.
  //var modisNoaaNdvi = ee.ImageCollection('MODIS/MOD13Q1').filterDate(app.getStartDate(), app.getEndDate()).select('NDVI');
  var modisNoaaNdvi = ee.ImageCollection('MODIS/006/MOD13Q1').filterDate(app.getDate(true,true, 2), app.getDate(true)).select('NDVI');
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(modisNoaaNdvi, point, ee.Reducer.mean());
  ndviChart.setOptions({
    title: 'Normalized Difference Vegetation Index',
    vAxis: {title: 'NDVI',viewWindowMode: 'explicit',gridlines: {count: 5,}},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  app.chartBox.widgets().set(2, ndviChart);
};
app.showPrecipitationChart = function( coords ){
  // Show the loading label.
/* app.chartBox.widgets().set(2, ui.Label({
    value: 'Loading...' + coords.lon + ',' + coords.lat,
    style: {color: 'gray'}
  }));*/
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Load CHIRPS precipitationdata https://explorer.earthengine.google.com/#detail/UCSB-CHG%2FCHIRPS%2FPENTAD
  //var precipitation = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').filterDate(app.getStartDate(), app.getEndDate()).select('precipitation');
  var precipitation = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').filterDate(app.getDate(true,true, 2), app.getDate(true)).select('precipitation');
    // Create an NDVI chart.
  var precipitationChart = ui.Chart.image.series(precipitation, point, ee.Reducer.mean());
  precipitationChart.setOptions({
    title: 'Precipitation',
    vAxis: {title: 'mm pentad', viewWindowMode: 'explicit',gridlines: {count: 5} },
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  app.chartBox.widgets().set(3, precipitationChart);
};
app.showCharts = function(coords){
  app.chartBox.widgets().set(0, 
  ui.Panel([ui.Label({
    value: 'Coord (' + coords.lon + ',' + coords.lat +')',
    style: {color: 'gray',fontWeight: 'bold'}
  }),ui.Button('Close',  app.clearChartBox)], ui.Panel.Layout.flow('horizontal'))
  );
/*var locust = ee.FeatureCollection(app.SWARMS_LINK);
var bufferSize = (Map.getScale()/1000)+1000;
print(bufferSize);
var fc = locust.filterBounds(ee.Geometry.Point(coords.lon, coords.lat).buffer(bufferSize));
var fcString = '';
var flist = fc.map(function(feature)
{ 
  fcString = fcString + feature.get('REPORT_ID')+' \n';
  print(feature.propertyNames());
  return feature;
});
  app.chartBox.widgets().set(1, ui.Label({
    value: 'Locust (' + fcString+')',
    style: {color: 'gray',fontWeight: 'bold'}
  }));*/
  app.showModisNdviChart(coords);
  //print(coords);
  app.showPrecipitationChart(coords);
};
app.clearChartBox = function() {
    app.chartBox.clear();
}
app.refreshMap = function(){
  app.chartBox.clear();
  app.export.button.setDisabled(true);
  Map.style().set('cursor', 'hand');
  Map.clear();
  //Map.setOptions("HYBRID");
  Map.addLayer(locustZone,{color: '#b8d641'},"Locust Recession Area", 0, 0.1);
  Map.add(app.quickInfoBox);
}
/********************************************** APP FUNCTIONS SECTION END *******************************************/
/********************************************** UI / HELPER START *******************************************/
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'SERVIR West Africa Locust Mapping and Monitoring',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Utiliser le filtre ci-dessous pour visualiser la carte greenness map, la présence acridienne, et exporter les images')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    locustStartDate: ui.Textbox('YYYY-MM-DD', app.getDate(true,true, 1)),
    locustEndDate: ui.Textbox('YYYY-MM-DD',app.getDate(true)),
    clipToCountry: ui.Checkbox({label: 'Limiter les données acridiennes au pays sélectionné (sélectionner pays)', value: false}),
    startDate: ui.Textbox('YYYY-MM-DD', '2020-08-21'), //app.getDate(true,true, 1)), //
    endDate: ui.Textbox('YYYY-MM-DD', '2020-08-30'), //app.getDate(true)), //
    countries: ui.Select(aoiCountries , "Select your country", 'All'),//, null, app.loadCountryData, false),
    //swarms: ui.Select(app.SWARMS_OPTIONS , "Swarms Year", "Custom"),//, null, app.loadCountryData, false),
    applyButton: ui.Button('Appliquer les filtres', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('(Start) Date Début / (End) Fin', {fontWeight: 'bold'}),
      app.filters.startDate,app.filters.endDate,
      ui.Label('Sélectionner le pays', {fontWeight: 'bold'}),
      app.filters.countries,
      ui.Label('Ajouter les données acridienne', {fontWeight: 'bold'}),
      //app.filters.swarms,
      ui.Label('Filtre temporel sur les données acridienne (sélectionner la date)', {fontWeight: 'bold'}),
      ui.Panel([app.filters.locustStartDate,app.filters.locustEndDate], ui.Panel.Layout.flow('horizontal')),
      app.filters.clipToCountry,
      ui.Panel([
      app.filters.applyButton,
      ui.Button('Rafraichir', app.refreshMap),
      app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  //app.filters.countries.setValue(app.filters.countries.items().get(0));
  //app.filters.swarms.setValue(app.filters.swarms.items().get(0));
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Exporter cette image dans le Drive',
      disabled: true,
      // React to the button's click event.
      onClick: function() {
        Export.image.toDrive(ee.Image(vegMap).toDouble(), "Carte_Vegetation_pour_" + app.getCountryName()+ "_generee_via_GEE_au_" + app.getDate(true), "GEE_CLCPRO", "GEE_CLCPRO_" + app.getDate(true));
//        Export.image.toDrive(vegMap, "Vegetation_Map_for_" + app.getCountryName()+ "_generated_throguh_GEE_on_" + app.getDate(true), "LOCUST Maps", "Locust_" + app.getDate(true));
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('EXPORTER ', {color:'black', fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
  app.makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '6px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  app.chartBox = ui.Panel({
    widgets: [],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-right',
      padding: '7px'
    }
  });
  // Create a panel that contains both the slider and the label.
  app.quickInfoBox = ui.Panel({
    widgets: [
      ui.Label("Criquet pèlerin", {fontWeight: 'bold'}),
      ui.Panel([
        //Mapping
        //SOL_ADULT, GREG_ADULT, SOL_HOPPER, GREG_HOPPER
        //Adult, swarm, hopper, band
      app.makeRow('#ffa9c9','essaims'),ui.Label(" "),
      app.makeRow('orange','bandes'), ui.Label(" "),
      app.makeRow('green','larves'),ui.Label(" "),
      app.makeRow('blue','ailés')
      ],ui.Panel.Layout.Flow('horizontal')),
      ui.Label("", {fontWeight: 'bold'}),
      ui.Panel([
      //app.makeRow('#FF6D51','<8'), ui.Label(" "),
      //app.makeRow('#FFDD2A','<16'),ui.Label(" "),
      //app.makeRow('#D8C52A','<24'),ui.Label(" "),
      //app.makeRow('#8BEA4A','<32'),ui.Label(" "),
    // app.makeRow('#3BBCAA','<40')
      ],ui.Panel.Layout.Flow('horizontal')),
      app.chartBox
      ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-right',
      padding: '7px', 
      backgroundColor:'#f0f0f0'
    }
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
  * Enables or disables loading mode.
  * @param {boolean} enabled Whether loading mode is enabled.
  */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      //app.filters.swarms,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.clipToCountry
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  app.getDate = function(todaysDate, beginMonth, backByMonths, separationChar)
  {
    var today = new Date();
    var dd = today.getDate();
    var mm = 0;
    var yyyy = today.getFullYear();
    if( todaysDate ){
      mm = today.getMonth()+1; //January is 0!
    }
    if( beginMonth ){
      dd='1';
    }
    if(backByMonths>0)
    {
      mm = today.getMonth()-backByMonths+1; //January is 0! Three months ago
      if( mm <= 0 ){
        mm = 12 - mm;
        yyyy = yyyy-1;
      }
    }
    if(dd<10){
      dd='0'+dd;
    } 
    if( !todaysDate ){
      if( dd>28){
        dd = 28;
      }
    }
    if(mm<10){
      mm='0'+mm;
    } 
    if( separationChar == null){
      separationChar = "-";
    }
    return yyyy+ separationChar +mm+ separationChar +dd;
  };
  app.getStartDate = function()
  {
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    return start;
  }
  app.getEndDate = function()
  {
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    return end;
  }
  app.getCountryName = function()
  {
    var countryName = app.filters.countries.getValue();
    return countryName;
  }
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.refreshMap();
    app.setLoadingMode(true);
    var countryName = app.getCountryName();
    //print('Country : '+countryName);
    if(countryName!==null && countryName !== undefined)
    {
      app.loadCountryData(countryName, app.getStartDate(), app.getEndDate());
      app.export.button.setDisabled(false);
    }
  // var swarmsYear = app.filters.swarms.getValue();
  //   if(swarmsYear !== 'None')
  //   {
  //   if(swarmsYear!==null && swarmsYear !== undefined)
  //   {
  // // This needs to be checked on how to implement in future.
  //     var sAdult,sSwarm,sHopper,sBand;
  //     //var swarmsOption = app.SWARMS_OPTIONS[swarmsYear];
  //     sAdult = ee.FeatureCollection(app.SWARMS_LINK).filter(ee.Filter.gt('SOL_ADULT',0));
  //     sSwarm = ee.FeatureCollection(app.SWARMS_LINK).filter(ee.Filter.gt('GREG_ADULT',0));
  //     sHopper = ee.FeatureCollection(app.SWARMS_LINK).filter(ee.Filter.gt('SOL_HOPPER',0));
  //     sBand = ee.FeatureCollection(app.SWARMS_LINK).filter(ee.Filter.gt('GREG_HOPPER',0));
  //     //print(swarmsYear);
  //     if(swarmsYear != 'All')
  //     {
  //       var lStartDate;
  //       var lEndDate;
  //       if(swarmsYear==='Custom')
  //       {
  //         lStartDate = app.filters.locustStartDate.getValue();
  //         lEndDate = app.filters.locustEndDate.getValue();    
  //       }
  //       else
  //       {
  //         lStartDate = swarmsYear+'-01-01';
  //         lEndDate = swarmsYear+'-12-31';
  //       }
  //       if(lStartDate!==null && lStartDate !== undefined && lEndDate!==null && lEndDate !== undefined)
  //       {
  //         //print(lStartDate);
  //         //print(lEndDate);
  //         var sdate = ee.Date.parse('yyyy-MM-dd', lStartDate);
  //         var edate = ee.Date.parse('yyyy-MM-dd', lEndDate);
  //         //print(sdate);
  //         //print(edate);
  //         sAdult = sAdult.filter(ee.Filter.and(ee.Filter.gt('START_DATE', sdate.millis()),ee.Filter.lt('START_DATE', edate.millis())));
  //         sSwarm = sSwarm.filter(ee.Filter.and(ee.Filter.gt('START_DATE', sdate.millis()),ee.Filter.lt('START_DATE', edate.millis())));
  //         sHopper = sHopper.filter(ee.Filter.and(ee.Filter.gt('START_DATE', sdate.millis()),ee.Filter.lt('START_DATE', edate.millis())));
  //         sBand = sBand.filter(ee.Filter.and(ee.Filter.gt('START_DATE', sdate.millis()),ee.Filter.lt('START_DATE', edate.millis())));
  //       }
  //     }
  //     sAdult = sAdult.draw({color:'blue', strokeWidth:1});
  //     sSwarm = sSwarm.draw({color:'red', strokeWidth:1});
  //     sHopper = sHopper.draw({color:'green', strokeWidth:1});
  //     sBand = sBand.draw({color:'orange', strokeWidth:1});
  //     if(app.filters.clipToCountry.getValue() === true && countryName!==null && countryName !== undefined)
  //     {
  //       var country = countries.filter(ee.Filter.eq("ADM0_NAME", countryName));
  //       sAdult = sAdult.clip(country);
  //       sSwarm = sSwarm.clip(country);
  //       sHopper = sHopper.clip(country);
  //       sBand = sBand.clip(country);
  //     }
  //     Map.addLayer(sAdult,{}, 'Locust Adults - '+swarmsYear);
  //     Map.addLayer(sSwarm,{}, 'Locust Swarms - '+swarmsYear);
  //     Map.addLayer(sHopper,{}, 'Locust Hoppers - '+swarmsYear);
  //     Map.addLayer(sBand,{}, 'Locust Bands - '+swarmsYear);
  //   }
  //   }
    app.setLoadingMode(false);
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'MODIS/MYD09A1';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
};
// Create a label and slider.
/** Creates the application interface. */
app.boot = function() {
  Map.setCenter(4, 17,4);
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.export.panel,
    ],
    style: {width: '25%', padding: '8px'}
  });
  //Map.setOptions("HYBRID");
  ui.root.insert(0, main);
  Map.add(app.quickInfoBox);
  Map.addLayer(locustZone,{color: '#b8d641'},"Locust Zone", 0, 0.1);
  app.applyFilters();
};
app.boot();
/********************************************** UI / HELPER END *******************************************/