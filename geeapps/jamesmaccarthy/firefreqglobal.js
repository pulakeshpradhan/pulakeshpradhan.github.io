Map.setCenter(0, 0, 3);
// Create a panel to hold the chart.
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
var title = ui.Label('Fire Frequency')
// var subtitle = ui.Label('Noel Kampff Mercado National Park')
title.style().set('fontSize', '24px')
// subtitle.style().set('fontSize', '16px')
panel.add(title)
// panel.add(subtitle)
panel.widgets().set(1, ui.Label('Click a point'))
ui.root.add(panel)
Map.onClick(function(coords) {
  // Show the loading label.
  panel.widgets().set(1, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Get the location of the click
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var value = image3
                .reduceRegion(ee.Reducer.first(), click_point, 30)
                .evaluate(
                    function(val){
                        var text = 'This location has burned ' + val.BurnDate + ' out of the last 21 years.';
                        panel.widgets().set(1, ui.Label(text));
                });
  print(click_point)
});
var dataset = ee.FeatureCollection('WCMC/WDPA/current/polygons');
var noelkempff = dataset.filter(ee.Filter.eq('NAME', 'Noel Kempff Mercado'));
var burndata = ee.ImageCollection('MODIS/006/MCD64A1').select('BurnDate');
// Load burned area image collection for 2016
var mcd_2000 = burndata.filter(ee.Filter.date('2000-01-01', '2000-12-31'));
var mcd_2001 = burndata.filter(ee.Filter.date('2001-01-01', '2001-12-31'));
var mcd_2002 = burndata.filter(ee.Filter.date('2002-01-01', '2002-12-31'));
var mcd_2003 = burndata.filter(ee.Filter.date('2003-01-01', '2003-12-31'));
var mcd_2004 = burndata.filter(ee.Filter.date('2004-01-01', '2004-12-31'));
var mcd_2005 = burndata.filter(ee.Filter.date('2005-01-01', '2005-12-31'));
var mcd_2006 = burndata.filter(ee.Filter.date('2006-01-01', '2006-12-31'));
var mcd_2007 = burndata.filter(ee.Filter.date('2007-01-01', '2007-12-31'));
var mcd_2008 = burndata.filter(ee.Filter.date('2008-01-01', '2008-12-31'));
var mcd_2009 = burndata.filter(ee.Filter.date('2009-01-01', '2009-12-31'));
var mcd_2010 = burndata.filter(ee.Filter.date('2010-01-01', '2010-12-31'));
var mcd_2011 = burndata.filter(ee.Filter.date('2011-01-01', '2011-12-31'));
var mcd_2012 = burndata.filter(ee.Filter.date('2012-01-01', '2012-12-31'));
var mcd_2013 = burndata.filter(ee.Filter.date('2013-01-01', '2013-12-31'));
var mcd_2014 = burndata.filter(ee.Filter.date('2014-01-01', '2014-12-31'));
var mcd_2015 = burndata.filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var mcd_2016 = burndata.filter(ee.Filter.date('2016-01-01', '2016-12-31'));
var mcd_2017 = burndata.filter(ee.Filter.date('2017-01-01', '2017-12-31'));
var mcd_2018 = burndata.filter(ee.Filter.date('2018-01-01', '2018-12-31'));
var mcd_2019 = burndata.filter(ee.Filter.date('2019-01-01', '2019-12-31'));
var mcd_2020 = burndata.filter(ee.Filter.date('2020-01-01', '2020-12-31'));
var mask2001 = mcd_2001.min().gte(0)//.clip(noelkempff).gte(0)
var mask2002 = mcd_2002.min().gte(0)//.clip(noelkempff).gte(0)
var mask2003 = mcd_2003.min().gte(0)//.clip(noelkempff).gte(0)
var mask2004 = mcd_2004.min().gte(0)//.clip(noelkempff).gte(0)
var mask2005 = mcd_2005.min().gte(0)//.clip(noelkempff).gte(0)
var mask2006 = mcd_2006.min().gte(0)//.clip(noelkempff).gte(0)
var mask2007 = mcd_2007.min().gte(0)//.clip(noelkempff).gte(0)
var mask2008 = mcd_2008.min().gte(0)//.clip(noelkempff).gte(0)
var mask2009 = mcd_2009.min().gte(0)//.clip(noelkempff).gte(0)
var mask2010 = mcd_2010.min().gte(0)//.clip(noelkempff).gte(0)
var mask2011 = mcd_2011.min().gte(0)//.clip(noelkempff).gte(0)
var mask2012 = mcd_2012.min().gte(0)//.clip(noelkempff).gte(0)
var mask2013 = mcd_2013.min().gte(0)//.clip(noelkempff).gte(0)
var mask2014 = mcd_2014.min().gte(0)//.clip(noelkempff).gte(0)
var mask2015 = mcd_2015.min().gte(0)//.clip(noelkempff).gte(0)
var mask2016 = mcd_2016.min().gte(0)//.clip(noelkempff).gte(0)
var mask2017 = mcd_2017.min().gte(0)//.clip(noelkempff).gte(0)
var mask2018 = mcd_2018.min().gte(0)//.clip(noelkempff).gte(0)
var mask2019 = mcd_2019.min().gte(0)//.clip(noelkempff).gte(0)
var mask2020 = mcd_2020.min().gte(0)//.clip(noelkempff).gte(0)
var image3 = mask2020.unmask(0)
                  .add(mask2001.unmask(0))
                  .add(mask2002.unmask(0))
                  .add(mask2003.unmask(0))
                  .add(mask2004.unmask(0))
                  .add(mask2005.unmask(0))
                  .add(mask2006.unmask(0))
                  .add(mask2007.unmask(0))
                  .add(mask2008.unmask(0))
                  .add(mask2009.unmask(0))
                  .add(mask2010.unmask(0))
                  .add(mask2011.unmask(0))
                  .add(mask2012.unmask(0))
                  .add(mask2013.unmask(0))
                  .add(mask2014.unmask(0))
                  .add(mask2015.unmask(0))
                  .add(mask2016.unmask(0))
                  .add(mask2017.unmask(0))
                  .add(mask2018.unmask(0))
                  .add(mask2019.unmask(0))
                  .add(mask2020.unmask(0))
Map.addLayer(image3.mask(image3.gt(0)), {palette: ['yellow', 'red']}, 'Fire frequency')