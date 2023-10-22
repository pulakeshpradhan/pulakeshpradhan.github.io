var BRIC = ee.FeatureCollection("users/anuskanarayanan/BRIC")
var countyDataset = ee.FeatureCollection('TIGER/2016/Counties')
var stateDataset = ee.FeatureCollection('TIGER/2016/States')
countyDataset = countyDataset.map(function (f) {
  return f.set('STATEFP', ee.Number.parse(f.get('STATEFP')))
})
var centroids = countyDataset.map(function(f) {
  return f.centroid()
})
var map = ui.Map()
// map.addLayer(centroids)
var cols = ['8500ff','c06eff','ffe483','ff9e25','ff510e']
var colorsCERI = cols
var colorsBRIC = cols
var colorsCEI =  cols
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 1],
      dimensions: '150x5',
      format: 'png',
      palette: palette,
    },
    style: {
      stretch: 'horizontal', 
      margin: '3px 0 0 0'
    },
  })
}
var valStyle = {
  margin: '0 5px 5px 5px', 
  fontSize: '12px', 
  backgroundColor: 'ffffff', 
  color: '202020'
};
var val0 = ui.Label('x', valStyle)
var val100 = ui.Label('y', valStyle)
var legend =  ui.Panel({
  widgets: [val0, ColorBar(colorsCERI), val100],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor:'ffffff', 
    margin: '10px 0 0 5px',
    width: '300px'
  }
})
var basemap = {
  'Basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#e8e8e8' }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        { color: '#303030' }
      ]
    },
    {
      featureType: 'landscape',
      stylers: [
        { color: '#ffffff' }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#FA4616'}
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { visibility: 'on' },
        { color: '#0021A5'}
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { visibility: 'on' },
        { color: '#ffffff'},
        { weight: 1.5 }
      ]
    },
    {
      featureType: 'road',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
}
map.setCenter(-94.682, 36.682, 5).setOptions('Basemap',basemap).style().set('cursor', 'crosshair')
map.setControlVisibility(null, true, true, true, true, true)
var layerSelect = 
      ui.Panel([
          ui.Label({value: 'Select a layer', 
                    style: {fontWeight: 'bold', fontSize: '12px', margin: '0 0 0 0'}}),
        ],
        ui.Panel.Layout.Flow('vertical'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px', position: 'top-left'}
      )
var exeCERI = function(){
  map.clear()
  map.setOptions('Basemap',basemap).style().set('cursor', 'crosshair')
  var startDay = app.startDateRange.startBoxDay.getValue()
  var startMonth = app.startDateRange.startBoxMonth.getValue()
  var startYear = app.startDateRange.startBoxYear.getValue()
  var endDay = app.endDateRange.endBoxDay.getValue()
  var endMonth = app.endDateRange.endBoxMonth.getValue()
  var endYear = app.endDateRange.endBoxYear.getValue()
  var dateStart = ee.Number.parse(startDay).getInfo()
  var monthStart = ee.Number.parse(startMonth).getInfo()
  var yearStart = ee.Number.parse(startYear).getInfo()
  var dateEnd = ee.Number.parse(endDay).getInfo()
  var monthEnd = ee.Number.parse(endMonth).getInfo()
  var yearEnd = ee.Number.parse(endYear).getInfo()
  //--------------------------------------------------------------------------
  // Date set up
  //--------------------------------------------------------------------------
  var start = yearStart + '-'+ monthStart + '-'+ dateStart
  var end = yearEnd + '-' + monthEnd + '-'+ dateEnd
  var yearMod = 0
  var monthMod = 0
  var dateMod = 0
  //--------------------------------------------------------------------------
  // Count days of month
  //--------------------------------------------------------------------------
    var daysfOfEndMonth  // the temporal aggregation type is set in input 9
    if (monthEnd == 2) {
      daysfOfEndMonth = 28
    }
    if (monthEnd == 4) {
      daysfOfEndMonth = 30
    }
    if (monthEnd == 6) {
      daysfOfEndMonth = 30
    }
    if (monthEnd == 9) {
      daysfOfEndMonth = 30
    }
    if (monthEnd == 11) {
      daysfOfEndMonth = 30
    }
    if (monthEnd == 1) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 3) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 5) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 7) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 8) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 10) {
      daysfOfEndMonth = 31
    }
    if (monthEnd == 12) {
      daysfOfEndMonth = 31
    }  
  //print(daysfOfEndMonth)
  //--------------------------------------------------------------------------
  // Create sequence
  //--------------------------------------------------------------------------
  if (monthEnd-monthStart < 0) {
      yearMod = 1 
    }
  var monthSet1, monthSet2
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd)
      monthSet2 = ee.List.sequence(monthStart,12)
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd)}
  var months = ee.List.sequence(monthStart, monthEnd)
  var years = ee.List.sequence(yearStart, yearEnd);
  var years30 = ee.List.sequence(1991, 2020);
  //-------------------------------------------------------------------------
  // Add BRIC 2015 Data
  //-------------------------------------------------------------------------
  // map.addLayer(ee.Image(0),{palette:'black',opacity:0.5})
  var BRIC_VIS= {
    min: 0.0,
    max: 1.00,
    palette: colorsBRIC,
  };
  //-------------------------------------------------------------------------
  // BRIC Z Calculation (National level Comparison)
  //-------------------------------------------------------------------------
  var nationalBRIC_01 = BRIC.map(function (f) {
    return f.set('Nat_Opp', ee.Number.parse(f.get('Nat_Opp')));
  });
  var nationalBRIC = nationalBRIC_01
    .filter(ee.Filter.notNull(['Nat_Opp']))
    .reduceToImage({
      properties: ['Nat_Opp'],
      reducer: ee.Reducer.first()
  }).rename('BRIC_national')
  map.addLayer(nationalBRIC, BRIC_VIS, "Resilience Score - National", false)
  //-------------------------------------------------------------------------
  // BRIC Z Calculation (State-level Comparison)
  //-------------------------------------------------------------------------
  var stateBRIC_01 = BRIC.map(function (f) {
    return f.set('Opp_Min_Ma', ee.Number.parse(f.get('Opp_Min_Ma')));
  });
  var stateBRIC = stateBRIC_01
    .filter(ee.Filter.notNull(['Opp_Min_Ma']))
    .reduceToImage({
      properties: ['Opp_Min_Ma'],
      reducer: ee.Reducer.first()
  }).rename('BRIC_state')
  map.addLayer(stateBRIC, BRIC_VIS, "Resilience Score - State", false)
  //-------------------------------------------------------------------------
  // Add County and State Data 
  //-------------------------------------------------------------------------
  var visParams = {
    palette: ['purple', 'blue', 'green', 'yellow', 'orange', 'red'],
    min: 0,
    max: 50,
    opacity: 0.8,
  };
  var image = ee.Image().float().paint(countyDataset, 'STATEFP');
  var countyOutlines = ee.Image().float().paint({
    featureCollection: countyDataset,
    width: 1
  });
  var stateOutlines = ee.Image().float().paint({
    featureCollection: stateDataset,
    width: 1.5
  });
  //-------------------------------------------------------------------------
  // PRISM Min Temp
  //-------------------------------------------------------------------------
  var minData = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
  var minTemp = minData.select('tmin');
  var minTempvis = {
    min: -35.11,
    max: 34.72,
    palette: ['red', 'yellow', 'green', 'cyan', 'purple'],
  };
  // Date Fixing
  var minTempTemporal = ee.ImageCollection(years.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 
    }
    var monthSet1, monthSet2
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd)
      monthSet2 = ee.List.sequence(monthStart,12)
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd)
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 
    }
    var dateSet1, dateSet2
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd)
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth)
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd)
    }
  // sp
    var filterYear = minTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDateMin = filterYear.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = minTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = minTemp.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYear = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYear.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYear.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDateMin = set3.merge(set4)
    }
    var avgMin = filterDateMin.mean();
    return avgMin;
  }));
    //map.addLayer(minTempTemporal,minTempvis,"Min Temp Temporal")
    var MinTempFirst = minTempTemporal.mean();
  //-------------------------------------------------------------------------
  // PRISM Max Temp
  //-------------------------------------------------------------------------
  var maxData = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
  var maxTemp = maxData.select('tmax');
  var maxTempVis = {
    min: -29.8,
    max: 49.74,
    palette: ['blue','green','yellow', 'orange', 'red', 'purple'],
  };
  // Date Fixing
  var maxTempTemporal = ee.ImageCollection(years.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 
    }
    var monthSet1, monthSet2
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd)
      monthSet2 = ee.List.sequence(monthStart,12)
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd)
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 
    }
    var dateSet1, dateSet2
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd)
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth)
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd)
    }
  // sp
    var filterYear = maxTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDateMax = filterYear.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = maxTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = maxTemp.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYear = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYear.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYear.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDateMax = set3.merge(set4)
    }
    var avgMax = filterDateMax.mean();
    return avgMax;
  }));
    //map.addLayer(maxTempTemporal,maxTempVis,"Max Temp Temporal")
    var MaxTempFirst = maxTempTemporal.mean();
  //-------------------------------------------------------------------------
  // PRISM Precipitation **remember to sum**
  //-------------------------------------------------------------------------
  var pptData = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
  var pptBand = pptData.select('ppt');
  var pptVis = {
    min: 0.0,
    max: 731.65,
    palette: ['red', 'yellow', 'cyan', 'purple'],
  };
  var pptTempTemporal = ee.ImageCollection(years.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 
    }
    var monthSet1, monthSet2
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd)
      monthSet2 = ee.List.sequence(monthStart,12)
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd)
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 
    }
    var dateSet1, dateSet2
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd)
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth)
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd)
    }
  // sp
    var filterYearPPT = pptBand.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDatePPT = filterYearPPT.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = pptBand.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = pptBand.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYearPPT = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYearPPT.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYearPPT.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDatePPT = set3.merge(set4)
    }
    var avgPPT = (filterDatePPT.sum()).divide(dateSet1.length());
    return avgPPT;
  }));
    //map.addLayer(pptTempTemporal,pptVis,"PPT Temporal")
    var pptFirst = pptTempTemporal.mean();
  //-------------------------------------------------------------------------
  //GRIDMET Drought
  //-------------------------------------------------------------------------
  var collection = ee.ImageCollection('GRIDMET/DROUGHT');
  var dSUTC = ee.Date(start, 'GMT');
  var dEUTC = ee.Date(end, 'GMT');
  var filtered = collection.filterDate(dSUTC, dEUTC.advance(1, 'day'));
  //print(collection.aggregate_array('system:index'));
  var Z = filtered.select('z');
  // Make a color palette that is similar to USDM drought classification
  var usdmColors = "0000aa,0000ff,00aaff,00ffff,aaff55,ffffff,ffff00,fcd37f,ffaa00,e60000,730000";
  // Make color options for Palmer variables psdi/z
  var minColorbar= -6;
  var maxColorbar= 6;
  var colorbarOptions2 = {
    'min':minColorbar,
    'max':maxColorbar,
    'palette': usdmColors
  };
  // Add map layers to  Map
  //map.addLayer(Z, colorbarOptions2, 'Palmer-Z');
  //-------------------------------------------------------------------------
  //Calculate 30 year average of min temp
  //-------------------------------------------------------------------------
  // Date Fixing
  var min30YearAvg = ee.ImageCollection(years30.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 
    }
    var monthSet1, monthSet2
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd)
      monthSet2 = ee.List.sequence(monthStart,12)
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd)
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 
    }
    var dateSet1, dateSet2
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd)
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth)
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd)
    }
  // sp
    var filterYear = minTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDateMin30 = filterYear.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = minTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = minTemp.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYear = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYear.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYear.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDateMin30 = set3.merge(set4)
    }
    var stdDevMin = filterDateMin30.mean();
    return stdDevMin;
  }));
    var min30YearTemporal = min30YearAvg.mean();
  //  map.addLayer(min30YearTemporal,minTempvis,"30 Year Min Temp Temporal");
  //-------------------------------------------------------------------------
  //Calculate 30 year average of max temp
  //-------------------------------------------------------------------------
  // Date Fixing
  var max30YearAvg = ee.ImageCollection(years30.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 ;
    }
    var monthSet1, monthSet2;
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd);
      monthSet2 = ee.List.sequence(monthStart,12);
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd);
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 ;
    }
    var dateSet1, dateSet2;
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd);
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth);
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd);
    }
  // sp
    var filterYear = maxTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDateMax30 = filterYear.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = maxTemp.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = maxTemp.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYear = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYear.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYear.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDateMax30 = set3.merge(set4);
    }
    var mean30Max = filterDateMax30.mean();
    return mean30Max;
  }));
    var max30YearTemporal = max30YearAvg.mean();
    //map.addLayer(max30YearTemporal,maxTempVis,"30 Year Max Temp Temporal");
  //-------------------------------------------------------------------------
  //Calculate 30 year average ppt
  //-------------------------------------------------------------------------
  // Date Fixing
  var ppt30YearAvg = ee.ImageCollection(years30.map(function(y) {
    if (monthEnd-monthStart < 0) {
      yearMod = 1 ;
    }
    var monthSet1, monthSet2;
    if (yearMod == 1) {
      monthSet1 = ee.List.sequence(1,monthEnd);
      monthSet2 = ee.List.sequence(monthStart,12);
    } else {
      monthSet1 = ee.List.sequence(monthStart,monthEnd);
    }
  // sp
    if (dateEnd-dateStart < 0) {
      monthMod = 1 ;
    }
    var dateSet1, dateSet2;
    if (monthMod == 1) {
      dateSet1 = ee.List.sequence(1,dateEnd);
      dateSet2 = ee.List.sequence(dateStart,daysfOfEndMonth);
    } else {
      dateSet1 = ee.List.sequence(dateStart,dateEnd);
    }
  // sp
    var filterYear = pptBand.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthStart, monthEnd, 'month'));
    var filterDatePPT30 = filterYear.filter(ee.Filter.calendarRange(dateStart, dateEnd, 'DAY_OF_MONTH'));
    if (yearMod == 1) {
      y = ee.Number(y);
      var len1 = monthSet1.length().subtract(1);
      var len2 = monthSet2.length().subtract(1);
      var set1 = pptBand.filter(ee.Filter.calendarRange(y,y,'year'))
                      .filter(ee.Filter.calendarRange(monthSet1.get(0), monthSet1.get(len1), 'month'))
      var set2 = pptBand.filter(ee.Filter.calendarRange(y.subtract(1),y.subtract(1),'year'))
                      .filter(ee.Filter.calendarRange(monthSet2.get(0), monthSet2.get(len2), 'month'));
      filterYear = set1.merge(set2)}
    if (monthMod == 1) {
      y = ee.Number(y);
      var len3 = dateSet1.length().subtract(1);
      var len4 = dateSet2.length().subtract(1);
      var set3 = filterYear.filter(ee.Filter.calendarRange(dateSet1.get(0), dateSet1.get(len3), 'DAY_OF_MONTH'));
      var set4 = filterYear.filter(ee.Filter.calendarRange(dateSet2.get(0), dateSet2.get(len4), 'DAY_OF_MONTH'));
      filterDatePPT30 = set3.merge(set4);
    }
    var mean30PPT = (filterDatePPT30.sum()).divide(dateSet1.length());
    return mean30PPT;
  }));
    var ppt30YearTemporal = ppt30YearAvg.mean();
  // Min temp
  var minTempCounties = MinTempFirst.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(minTempCounties, {}, 'Avg Min Temp by County', false)
  // Max temp
  var maxTempCounties = MaxTempFirst.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(maxTempCounties, {},'Avg Max Temp by County', false )
  // PPT
  var pptCounties = pptFirst.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(pptCounties,{}, 'Avg PPT by county', false)
  //-------------------------------------------------------------------------
  // Reduce Min, Max, PPT (X bar)
  //-------------------------------------------------------------------------
  //var avgMin30Year = byMonthMin.reduce(ee.Reducer.mean());
  //map.addLayer(avgMin30Year, minTempvis, 'TOI MinTemp 30 Year', false)
  //var avgMax30Year = byMonthMax.reduce(ee.Reducer.mean());
  //map.addLayer(avgMax30Year, maxTempVis, 'TOI MaxTemp 30 Year', false)
  //var avgppt30Year = byMonthppt.reduce(ee.Reducer.mean());
  //map.addLayer(avgppt30Year, pptVis, 'TOI PPT 30 Year', false)
  //-------------------------------------------------------------------------
  // Reduce Min, Max, PPT by county (X bar)
  //-------------------------------------------------------------------------
  // Min temp
  var minTempCounties30 = min30YearTemporal.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(minTempCounties30, {}, 'Avg Min Temp by County (30 Year)', false)
  // Max temp
  var maxTempCounties30 = max30YearTemporal.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(maxTempCounties30, {},'Avg Max Temp by County (30 Year)', false)
  // PPT
  var pptCounties30 = ppt30YearTemporal.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(pptCounties30,{}, 'Avg PPT by County (30 year)', false)
  //-------------------------------------------------------------------------
  // Reduce Palmer's Z
  //-------------------------------------------------------------------------
  var zTOI = Z.mean()
  var zCounties = zTOI.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //map.addLayer(zCounties,{}, 'TOI Palmer Z', false)
  //-------------------------------------------------------------------------
  // Vector to Raster (X)
  //-------------------------------------------------------------------------
  // Min
  var rasterMinTempTOI = minTempCounties
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterMinTempTOI, minTempvis,'TOI Min')
  // Max
  var rasterMaxTempTOI = maxTempCounties
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterMaxTempTOI, maxTempVis,'TOI Max')
  // PPT
  var rasterPPT_TOI = pptCounties
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterPPT_TOI, pptVis,'TOI PPT')
  // Palmer's Z
  var rasterZ_TOI = zCounties
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterZ_TOI, colorbarOptions2,'TOI Palmers Z')
  //-------------------------------------------------------------------------
  // Vector to Raster (X bar)
  //-------------------------------------------------------------------------
  // Min
  var rasterMinTemp30 = minTempCounties30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterMinTemp30, minTempvis,'TOI Min 30 Year')
  // Max
  var rasterMaxTemp30 = maxTempCounties30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterMaxTemp30, maxTempVis,'TOI Max 30 Year')
  // PPT
  var rasterPPT_30 = pptCounties30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //map.addLayer(rasterPPT_30, pptVis,'TOI PPT 30 Year')
  //-------------------------------------------------------------------------
  // (X) minus (X bar)
  //-------------------------------------------------------------------------
  var topMin = rasterMinTempTOI.subtract(rasterMinTemp30)
  var topMax = rasterMaxTempTOI.subtract(rasterMaxTemp30)
  var topPPT = rasterPPT_TOI.subtract(rasterPPT_30)
  //-------------------------------------------------------------------------
  // Calculate Standard Deviation min
  //-------------------------------------------------------------------------
  var avgMinTempSTD30Year = min30YearAvg.reduce(ee.Reducer.stdDev());
  //map.addLayer(avgMinTempSTD30Year, minTempvis, 'STD Min', false)
  //-------------------------------------------------------------------------
  // Reduce Min Temp STDev to county (vectors)
  //-------------------------------------------------------------------------
  var minCountiesSTD30 = avgMinTempSTD30Year.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //-------------------------------------------------------------------------
  // Vector to Raster (Min Temp STDev)
  //-------------------------------------------------------------------------
  var rasterMinSTD_30 = minCountiesSTD30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //-------------------------------------------------------------------------
  // Calculate Standard Deviation max
  //-------------------------------------------------------------------------
  var avgMaxTempSTD30Year = max30YearAvg.reduce(ee.Reducer.stdDev());
  //map.addLayer(avgMaxTempSTD30Year, maxTempVis, 'STD MAX', false)
  //-------------------------------------------------------------------------
  // Reduce Max Temp STDev to county (vectors)
  //-------------------------------------------------------------------------
  var maxCountiesSTD30 = avgMaxTempSTD30Year.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //-------------------------------------------------------------------------
  // Vector to Raster (Max Temp STDev)
  //-------------------------------------------------------------------------
  var rasterMaxSTD_30 = maxCountiesSTD30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //-------------------------------------------------------------------------
  // Calculate Standard Deviation ppt
  //-------------------------------------------------------------------------
  var avgpptSTD30Year = ppt30YearAvg.reduce(ee.Reducer.stdDev());
  //map.addLayer(avgpptSTD30Year, pptVis, 'STD PPT', false)
  //-------------------------------------------------------------------------
  // Reduce PPT STDev to county (vectors)
  //-------------------------------------------------------------------------
  var pptCountiesSTD30 = avgpptSTD30Year.reduceRegions({
    collection: countyDataset,
    reducer: ee.Reducer.mean(),
    scale: 4638.3,
  });
  //-------------------------------------------------------------------------
  // Vector to Raster (PPT STDev)
  //-------------------------------------------------------------------------
  var rasterPPTSTD_30 = pptCountiesSTD30
    .filter(ee.Filter.notNull(['mean']))
    .reduceToImage({
      properties: ['mean'],
      reducer: ee.Reducer.first()
  });
  //-------------------------------------------------------------------------
  // Calculate PPT CEI
  //-------------------------------------------------------------------------
  var CEIVIS = {
    min: -4.0,
    max: 4.00,
    palette: ['red', 'yellow', 'Blue'],
  };
  var Min_CEI = topMin.divide(rasterMinSTD_30)
  //map.addLayer(Min_CEI, CEIVIS, 'CEI Min Temp')
  var Max_CEI = topMax.divide(rasterMaxSTD_30)
  //map.addLayer(Max_CEI, CEIVIS, 'CEI Max Temp')
  var PPT_CEI = topPPT.divide(rasterPPTSTD_30)
  //map.addLayer(PPT_CEI, CEIVIS, 'CEI PPT')
  //map.addLayer(rasterZ_TOI, CEIVIS, 'CEI Palmers Z')
  //-------------------------------------------------------------------------
  // Reclassify Z scores to whole numbers 
  //-------------------------------------------------------------------------
  var CEIVIS = {
    min: -3.0,
    max: 3.00,
    palette: ['purple', 'red', 'yellow', 'green', 'yellow', 'red', 'purple'],
  };
  var minReclass = Min_CEI
            .where(Min_CEI.gt(-1.0).and(Min_CEI.lt(1.0)), 0)
            .where(Min_CEI.gte(1.0).and(Min_CEI.lt(2.0)), 1)
            .where(Min_CEI.lte(-1.0).and(Min_CEI.gt(-2.0)), 1)
            .where(Min_CEI.gte(2.0).and(Min_CEI.lt(3.0)), 2)
            .where(Min_CEI.lte(-2.0).and(Min_CEI.gt(-3.0)), 2)
            .where(Min_CEI.gte(3.0).and(Min_CEI.lt(100.0)), 3)
            .where(Min_CEI.lte(-3.0).and(Min_CEI.gt(-100.0)), 3)
  //map.addLayer(minReclass,CEIVIS, "Remap Min" )
  var maxReclass = Max_CEI
            .where(Max_CEI.gt(-1.0).and(Max_CEI.lt(1.0)), 0)
            .where(Max_CEI.gte(1.0).and(Max_CEI.lt(2.0)), 1)
            .where(Max_CEI.lte(-1.0).and(Max_CEI.gt(-2.0)), 1)
            .where(Max_CEI.gte(2.0).and(Max_CEI.lt(3.0)), 2)
            .where(Max_CEI.lte(-2.0).and(Max_CEI.gt(-3.0)), 2)
            .where(Max_CEI.gte(3.0).and(Max_CEI.lt(100.0)), 3)
            .where(Max_CEI.lte(-3.0).and(Max_CEI.gt(-100.0)), 3);
  //map.addLayer(maxReclass,CEIVIS, "Remap Max" );
  var pptReclass = PPT_CEI
            .where(PPT_CEI.gt(-1.0).and(PPT_CEI.lt(1.0)), 0)
            .where(PPT_CEI.gte(1.0).and(PPT_CEI.lt(2.0)), 1)
            .where(PPT_CEI.lte(-1.0).and(PPT_CEI.gt(-2.0)), 1)
            .where(PPT_CEI.gte(2.0).and(PPT_CEI.lt(3.0)), 2)
            .where(PPT_CEI.lte(-2.0).and(PPT_CEI.gt(-3.0)), 2)
            .where(PPT_CEI.gte(3.0).and(PPT_CEI.lt(100.0)), 3)
            .where(PPT_CEI.lte(-3.0).and(PPT_CEI.gt(-100.0)), 3);
  //map.addLayer(pptReclass,CEIVIS, "Remap PPt" );
  var zReclass = rasterZ_TOI
            .where(rasterZ_TOI.gt(-1.25).and(rasterZ_TOI.lt(1.0)), 0)
            .where(rasterZ_TOI.gte(1.0).and(rasterZ_TOI.lt(2.50)), 1)
            .where(rasterZ_TOI.lte(-1.25).and(rasterZ_TOI.gt(-2.0)), 1)
            .where(rasterZ_TOI.gte(2.50).and(rasterZ_TOI.lt(3.50)), 2)
            .where(rasterZ_TOI.lte(-2.0).and(rasterZ_TOI.gt(-2.75)), 2)
            .where(rasterZ_TOI.gte(3.50).and(rasterZ_TOI.lt(100.0)), 3)
            .where(rasterZ_TOI.lte(-2.75).and(rasterZ_TOI.gt(-100.0)), 3);
  //map.addLayer(zReclass,CEIVIS, "Remap Palmer Z" );
  //-------------------------------------------------------------------------
  // Count CEI by remapping
  //-------------------------------------------------------------------------
  var CEI_colormin= {
    min: 0.0,
    max: 4.00,
    palette: colorsCEI,
  };
  var countMin = minReclass
    .remap([0,1,2,3],
           [ 0,0,0,1])
  var countMax = maxReclass
    .remap([0,1,2,3],
           [ 0,0,0,1])
  var countPPT = pptReclass
    .remap([0,1,2,3],
           [ 0,0,0,1])
  var countZ = zReclass
    .remap([0,1,2,3],
           [ 0,0,0,1])
  var sumCEI = countMin.add(countMax).add(countPPT).add(countZ).rename('CEI')
  map.addLayer(sumCEI, CEI_colormin, 'Extremes Present', false);
  //-------------------------------------------------------------------------
  // CEI Min-Max Normalization
  //-------------------------------------------------------------------------
  var minMax_CEI = sumCEI.unitScale(0,4)
  //-------------------------------------------------------------------------
  // Calculate CERI Nationally
  //-------------------------------------------------------------------------
  var paletteCERI= {
    min: 0.0,
    max: 100.00,
    palette: colorsCERI}
  var nationalCERI_2 = minMax_CEI.add(nationalBRIC)
  var nationalCERI = ((nationalCERI_2.divide(2)).multiply(100)).rename('CERI_national')
  map.addLayer(nationalCERI, paletteCERI, "National CERI")
  //-------------------------------------------------------------------------
  // Calculate CERI State
  //-------------------------------------------------------------------------
  var stateCERI_2 = minMax_CEI.add(stateBRIC)
  var stateCERI = ((stateCERI_2.divide(2)).multiply(100)).rename('CERI_state')
  map.addLayer(stateCERI, paletteCERI, "State CERI",false)
  //-------------------------------------------------------------------------
  // Add State Data
  //-------------------------------------------------------------------------
  var clipCounty = countyOutlines
  var clipState = stateOutlines
  map.addLayer(clipCounty.rename('counties'), {palette: 'ffffff', opacity: 0.35}, 'County Boundaries');
  map.addLayer(clipState.rename('states'), {palette: '202020'}, 'State Boundaries');
  var popup = ui.Panel([
    ui.Label({value: 'Click map to query values', style: {fontWeight: '500', fontSize: '13px', margin: '0'}})
  ],
    ui.Panel.Layout.Flow('vertical'),
    {position: 'bottom-left', margin: '0'}
  )
  map.add(popup)
  map.onClick(function(coords) {
    var point = ee.Geometry.Point(coords.lon, coords.lat)
    var dot = ui.Map.Layer(point, {color: 'white'}, 'Inspector dot')
    var stateLabel = ee.Feature(stateDataset.filterBounds(point).first()).get('NAME').getInfo()
    var countyLabel = ee.Feature(countyDataset.filterBounds(point).first()).get('NAMELSAD').getInfo()
    popup.widgets().set(1,ui.Label({value: countyLabel+', '+stateLabel, style: {fontWeight: '300', fontSize: '12px', margin: '5px 0 0 0'}}))
    popup.widgets().set(2,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '5px 0 0 0'}}))
    popup.widgets().set(3,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '0'}}))
    popup.widgets().set(4,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '0'}}))
    popup.widgets().set(5,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '0'}}))
    popup.widgets().set(6,ui.Label({value: 'Calculating...', style: {fontWeight: '300', fontSize: '12px', margin: '0'}}))
    map.layers().set(7,dot)
    var sampledNationalCERI = nationalCERI.reduceRegion(ee.Reducer.mean(), point, 1),
        computedNationalCERI = sampledNationalCERI.get('CERI_national')
    var sampledStateCERI = stateCERI.reduceRegion(ee.Reducer.mean(), point, 1),
        computedStateCERI = sampledStateCERI.get('CERI_state')
    var sampledNationalBRIC = nationalBRIC.reduceRegion(ee.Reducer.mean(), point, 1),
        computedNationalBRIC = sampledNationalBRIC.get('BRIC_national')
    var sampledStateBRIC = stateBRIC.reduceRegion(ee.Reducer.mean(), point, 1),
        computedStateBRIC = sampledStateBRIC.get('BRIC_state')
    var sampledCEI = sumCEI.reduceRegion(ee.Reducer.mean(), point, 1),
        computedCEI = sampledCEI.get('CEI')
    computedNationalCERI.evaluate(function(result) {
      var inspectNationalCERI = ui.Label({
        value: 'CERI National: ' + result.toFixed(2),
        style: {fontWeight: '300', fontSize: '12px', color: '303030', margin: '5px 0 0 0'}
      })
      popup.widgets().set(2, inspectNationalCERI)
      computedStateCERI.evaluate(function(result) {
        var inspectStateCERI = ui.Label({
          value: 'CERI State: ' + result.toFixed(2),
          style: {fontWeight: '300', fontSize: '12px', color: '303030', margin: '0'}
        })
        popup.widgets().set(3, inspectStateCERI)
      })
      computedNationalBRIC.evaluate(function(result) {
        var inspectNationalBRIC = ui.Label({
          value: 'Resilience Score - National: ' + result.toFixed(2),
          style: {fontWeight: '300', fontSize: '12px', color: '303030', margin: '0'}
        })
        popup.widgets().set(4, inspectNationalBRIC)
      })
      computedStateBRIC.evaluate(function(result) {
        var inspectStateBRIC = ui.Label({
          value: 'Resilience Score - State: ' + result.toFixed(2),
          style: {fontWeight: '300', fontSize: '12px', color: '303030', margin: '0'}
        })
        popup.widgets().set(5, inspectStateBRIC)
      })
      computedCEI.evaluate(function(result) {
        var inspectCEI = ui.Label({
          value: 'Extremes Present: ' + result.toFixed(0),
          style: {fontWeight: '300', fontSize: '12px', color: '303030', margin: '0'}
        })
        popup.widgets().set(6, inspectCEI)
      })
    })
  })
}
var app = {};
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({value: 'CERI: Climate Extremes Resilience Index', style: {fontWeight: '700', fontSize: '16px', margin: '10px 5px 1px 10px'}}),
      ui.Label({value: 'Version 1 - August 2022', style: {fontWeight: '700', color: '#FA4616', fontSize: '12px', margin: '5px 5px 1px 10px'}}),
      ui.Label({value: 'A geovisualization application for mapping CERI '+
                          'across temporal scales for counties in the conterminous U.S.', 
                style: {fontWeight: '300', fontSize: '13px', margin: '10px 40px 1px 10px'}}),
      ui.Panel([
          ui.Label({value: 'The Climate Extremes Resilience Index (CERI) was developed as an at-a-glance tool for citizens, stakeholders, and scientists to identify extreme climatic conditions affecting communities and their intersections with resilience. For more information, please view the reference file linked below.', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '5px 15px 0 10px'}}),
          ui.Label({value: 'CERI.readme',
                    style: {fontWeight: '300', fontSize: '12px', margin: '10px 40px 1px 10px', color: '0021A5'},
                    targetUrl: 'https://docs.google.com/document/d/1hoHdi9HNE7V4IvKhxYjruVNA4k0Q5w0ulc8r2rkX_8Q'})
        ],
        ui.Panel.Layout.Flow('vertical'),
        {fontWeight: '300', fontSize: '12px', margin: '0'}
      ),
      ui.Label({
                value: 'Created by Anuska Narayanan (University of Florida) and Brad G. Peter (University of Arkansas).',
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 40px 1px 10px'}}),
      ui.Label({value: 'Enter a valid start and end dates in the boxes below (Day Month Year). Check the PRISM and GRIDMET descriptions for data availability', 
                style: {fontWeight: 'bold', fontSize: '12px', margin: '10px 40px 20px 10px', color: '#0021A5'}}),
      ui.Panel([
          ui.Label({value: 'Temperature and Rainfall: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'PRISM @ OSU',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px', color: '0021A5'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/OREGONSTATE_PRISM_AN81d'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      ),
      ui.Panel([
          ui.Label({value: 'Drought Index: ', 
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 0'}}),
          ui.Label({value: 'GRIDMET',
                    style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 3px', color: '0021A5'},
                    targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/GRIDMET_DROUGHT'})
        ],
        ui.Panel.Layout.Flow('horizontal'),
        {fontWeight: '300', fontSize: '12px', margin: '-9px 15px 10px 10px'}
      )
    ])
  }
  app.startDateRange = {
    label: ui.Label(),
    startBoxDay: ui.Textbox({placeholder: 'Day', style: {width: '40px', margin: '5px 1px 1px 10px'}}),
    startBoxMonth: ui.Textbox({placeholder: 'Month', style: {width: '55px', margin: '5px 1px 1px 1px'}}),
    startBoxYear: ui.Textbox({placeholder: 'Year', style: {width: '50px', margin: '5px 1px 1px 1px'}})
  }
  app.startDateRange.panel = ui.Panel({
    widgets: [
      ui.Label('1) Choose a start date', {fontWeight: '450', fontSize: '13px', margin: '3px 3px 3px 10px'}),
      ui.Label('Do not use any leading zeroes.', {fontWeight: '300', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.startDateRange.startBoxDay, app.startDateRange.startBoxMonth, app.startDateRange.startBoxYear], ui.Panel.Layout.Flow('horizontal'))
    ]
  })
  app.endDateRange = {
    label: ui.Label(),
    endBoxDay: ui.Textbox({placeholder: 'Day', style: {width: '40px', margin: '5px 1px 1px 10px'}}),
    endBoxMonth: ui.Textbox({placeholder: 'Month', style: {width: '55px', margin: '5px 1px 1px 1px'}}),
    endBoxYear: ui.Textbox({placeholder: 'Year', style: {width: '50px', margin: '5px 1px 1px 1px'}})
  }
  app.endDateRange.panel = ui.Panel({
    widgets: [
      ui.Label('2) Choose an end date', {fontWeight: '450', fontSize: '13px', margin: '10px 3px 3px 10px'}),
      ui.Label('Do not use any leading zeroes.', {fontWeight: '300', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.endDateRange.endBoxDay, app.endDateRange.endBoxMonth, app.endDateRange.endBoxYear], ui.Panel.Layout.Flow('horizontal'))
    ]
  })
  app.authors = {
    label: ui.Label()
  };
  app.authors.panel = ui.Panel({
      widgets: [
      ui.Label({value: "Hover over the 'Layers' panel in the top right to select another output layer for visualization.", 
                style: {color: 'FA4616', fontWeight: '300', fontSize: '12px', margin: '10px 40px 1px 10px'}}),
      legend,
      ui.Label({value: 'Scale Interpretation', 
                style: {fontWeight: '500', fontSize: '13px', margin: '0 15px 0 10px'}}),
      ui.Label({value: 'CERI: x = 0, y = 100', 
                style: {fontWeight: '350', fontSize: '13px', margin: '0 15px 0 10px'}}),
      ui.Label({value: 'Extremes Present: x = 0, y = 4', 
                style: {fontWeight: '350', fontSize: '13px', margin: '0 15px 0 10px'}}),
      ui.Label({value: 'Resilience Score: x = 0, y = 1', 
                style: {fontWeight: '350', fontSize: '13px', margin: '0 15px 0 10px'}}), 
      ui.Label({value: 'Larger CERI Scores indicate in elevated level of risk. Larger Resilience Scores indicate a decreased level of resilience', 
                style: {color: '0021A5', fontWeight: '700', fontSize: '12px', margin: '10px 40px 1px 10px'}}),
      ui.Label({value: 'Calculations and data processing may take a moment. If prompted, wait for the browser to respond while data layers are loaded.', 
                style: {color: '0021A5', fontWeight: '700', fontSize: '12px', margin: '10px 40px 1px 10px'}}),
      ui.Label({value: 'References:', 
                style: {fontWeight: '700', fontSize: '12px', margin: '10px 30px 0 10px'}}),
      ui.Label({value: 'Cutter, S.L., Ash, K.D. and Emrich, C.T., 2014. The geographies of community disaster resilience. Global Environmental Change, 29, pp.65–77.', 
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 30px 0 10px'}}),
      ui.Label({value: 'https://doi.org/10.1016/j.gloenvcha.2014.08.005', 
                style: {fontWeight: '300', fontSize: '12px', margin: '0 0 0 10px', color: '0021A5' },
                targetUrl: 'https://doi.org/10.1016/j.gloenvcha.2014.08.005'}),      
      /*
      ui.Label({value: 'This application is made possible by PLACEHOLDER TEXT', 
                style: {fontWeight: '300', fontSize: '12px', margin: '10px 30px 5px 10px'}})
      */
      ]
  })
  app.mapper = {
    button: ui.Button('Click to map!', exeCERI, false, {color: 'FA4616', width: '150px'})
  };
  app.mapper.panel = ui.Panel({
    widgets: [
      ui.Label('3) Run', {fontWeight: '450', fontSize: '13px', margin: '10px 3px 3px 10px'}),
      ui.Panel([
        app.mapper.button
      ])
    ]
  })
  map.setOptions('Basemap',basemap)
}
app.rootPanels = {
  panel: ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '340px'}}),
}
app.boot = function() {
  app.createPanels()
  ui.root.clear()
  ui.root.insert(0, app.rootPanels.panel)
  ui.root.insert(1, map)
  app.rootPanels.panel.add(app.intro.panel).add(app.startDateRange.panel).add(app.endDateRange.panel)
       .add(app.mapper.panel).add(app.authors.panel);
}
app.boot()