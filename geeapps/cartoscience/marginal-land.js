var mod13q1 = ee.ImageCollection("MODIS/006/MOD13Q1"),
    lulc = ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3"),
    countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var startYear = 2008;
var endYear = 2018;
var startMonth = 11;
var endMonth = 4;
var country = 'Tanzania';
var scale = 2500;
var years = ee.List.sequence(startYear,endYear);
var n = endYear-startYear+1;
var ag = lulc.select('landcover').lte(30).eq(1);
var region = countries.filter(ee.Filter.eq('country_na',country));
var yearly_mod13q1 = ee.ImageCollection.fromImages(
  years.map(function (y) {
    return mod13q1.filter(ee.Filter.calendarRange(y,y,'year'))
                  .filter(ee.Filter.calendarRange(startMonth,endMonth,'month'))
                  .select('NDVI').mean()
                  .clip(region).updateMask(ag)
                  .multiply(0.0001);
  })
);
var mean_mod13q1 = yearly_mod13q1.mean().rename('mean_mod13q1');
var stddev_mod13q1 = yearly_mod13q1.map(function(img){
  return img.subtract(mean_mod13q1).pow(2);
}).sum().divide(n).sqrt().rename('stddev_mod13q1');
var level_mod13q1 = mean_mod13q1.reduceRegion({
  reducer: ee.Reducer.percentile([33,66]),
  geometry: region,
  scale: scale,
  maxPixels: 1e12
});
var var_mod13q1 = stddev_mod13q1.reduceRegion({
  reducer: ee.Reducer.percentile([50]),
  geometry: region,
  scale: scale,
  maxPixels: 1e12
});
var lmh_mod13q1 = mean_mod13q1.gt(ee.Number(level_mod13q1.get('mean_mod13q1_p33')))
                              .add(mean_mod13q1.gt(ee.Number(level_mod13q1.get('mean_mod13q1_p66'))))
                              .remap([0,1,2],[1,2,3]);
var vs_mod13q1 = stddev_mod13q1.gt(ee.Number(var_mod13q1.get('stddev_mod13q1'))).remap([0,1],[10,20]);
var productivity_mod13q1 = lmh_mod13q1.add(vs_mod13q1).remap([11,12,13,21,22,23],[1,4,5,2,3,6]).rename('productivity');
                                                      // 11 - LS - 1 - marginal
                                                      // 12 - MS - 3
                                                      // 13 - HS - 5
                                                      // 21 - LV - 2 - marginal
                                                      // 22 - MV - 4 - marginal
                                                      // 23 - HV - 6
var marginal_mod13q1 = productivity_mod13q1.lte(2).add(productivity_mod13q1.eq(4));
var createTimeBand = function(image) {
  var num = image.get('system:index');
  return image.addBands(ee.Image(ee.Number.parse(num)).double());
};
var linearFit = yearly_mod13q1.map(createTimeBand).select(['constant', 'NDVI']).reduce(ee.Reducer.linearFit()).select('scale');
var slope = linearFit.gt(0).remap([0,1],[0,10]);
var productivity_slope = productivity_mod13q1.add(slope).remap([1,2,3,4,5,6,11,12,13,14,15,16],[3,4,7,8,11,12,1,2,5,6,9,10]);
                          // 1 - 3 - LSD
                          // 2 - 4 - LVD
                          // 3 - 7 - MSD
                          // 4 - 8 - MVD
                          // 5 - 11 - HSD
                          // 6 - 12 - HVD
                          // 11 - 1 - LSI
                          // 12 - 2 - LVI
                          // 13 - 5 - MSI
                          // 14 - 6 - MVI
                          // 15 - 9 - HSI
                          // 16 - 10 - HVI
Map.centerObject(region);
Map.setOptions('HYBRID');
var sColors = ['fecc5c','fd8d3c','f03b20','bd0026','a1dab4','41b6c4','2c7fb8','253494','c2e699','78c679','31a354','006837'];
Map.addLayer(ee.Image(0),{palette:'black', opacity: 0.75},'dark basemap');
Map.addLayer(productivity_slope,{min:1,max:12,palette:sColors},'productivity slope');
var categories = ['Low-Stable-Increasing', 'Low-Variable-Increasing', 
                  'Low-Stable-Decreasing', 'Low-Variable-Decreasing', 
                  'Medium-Stable-Increasing', 'Medium-Variable-Increasing', 
                  'Medium-Stable-Decreasing', 'Medium-Variable-Decreasing', 
                  'High-Stable-Increasing', 'High-Variable-Increasing', 
                  'High-Stable-Decreasing', 'High-Variable-Decreasing']; 
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: '202020',
    padding: '8px 15px',
    border: '5px solid #333333'
  }
});
var legendTitle = ui.Label({
  value: 'Agricultural productivity',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '3px 0 -1px 8px',
    backgroundColor: '202020',
    color: 'dbdbdb',
    padding: '0'
  }
});
var line = ui.Label({
  value: '_________________________________________',
  style: {
    fontSize: '10px',
    margin: '0 0 10px 1px',
    backgroundColor: '202020',
    color: 'dbdbdb',
    padding: '0'
  }
});
legend.add(legendTitle);
legend.add(line);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      backgroundColor: '202020',
      color: 'dbdbdb',
    }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    style: {
      backgroundColor: '202020'
    },
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < categories.length; i++) {
  legend.add(makeRow(sColors[i], categories[i]));
}
var site = ui.Label('cartoscience.com', {fontSize: '12px', color: 'white', stretch: 'horizontal', textAlign: 'center', margin: '0 0 0 0', backgroundColor: '202020'}, 'http://cartoscience.com');
legend.add(site);
Map.add(legend);