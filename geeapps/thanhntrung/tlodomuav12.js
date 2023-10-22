var vn = ui.import && ui.import("vn", "table", {
      "id": "users/thanhntrung/vn"
    }) || ee.FeatureCollection("users/thanhntrung/vn");
//Trượt lở v1.3
//map
var prov = ee.FeatureCollection('users/thanhntrung/vn_province');//.filter(ee.Filter.eq('ADM1_VI', 'Quảng Bình'));
//var ecoregions = ee.FeatureCollection('projects/google/charts_feature_example');          
//landcov
var lc = ee.ImageCollection("ESA/WorldCover/v100").first().clip(vn);
    //lc = lc.clip(vn);
Map.setOptions('HYBRID');
Map.centerObject(vn,6);
var chon_ts = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px',
    width: '400px'
  }
});
//list image name func
function getIds(collection) {
  var info = collection.getInfo() // turns the collection to a local list
  var images = info['features'] // need to use local javascript to access
  var ids = []
  for (var i=0; i<images.length; i++) {  // note .length not size()
    var im = images[i]                   // [i] not .get(i)
    var id = im['id']
    ids.push(id)                       // note .push() not .cat()
  }
  return ids
}
//ngay thang
var now = new Date();
var nowStr = now.toLocaleDateString('en-CA'); 
var dateNow = ee.Date(nowStr);
var lastDay = dateNow.advance(-10, 'day').format ("YYYY-MM-dd");
// Import country features and filter to South American countries.
/*var vn = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filterMetadata('country_co', 'equals', 'VM');*/
//dem
var dem = ee.Image("MERIT/DEM/v1_0_3")
  .select('dem')
  .clipToCollection(vn);
var slope = ee.Terrain.slope(dem);
var slope_per = slope.divide(180).multiply(Math.PI).tan().multiply(100).rename('Percent');
//mua JAXA
var precipitation = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
//var precipitation = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/reanalysis")
                  .filter(ee.Filter.date(lastDay, dateNow))
                 .select('hourlyPrecipRate')
                 .map(function(image){return image.clip(vn)});
//mưa mới NASA 
//var precipitation = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
//    .filter(ee.Filter.date(lastDay));
//resample 
var proj = dem.projection().getInfo()
var crs = proj['crs'] 
//var precip_meantmp = precipitation.select('precipitationCal').sum();
var precip_meantmp = precipitation.reduce(ee.Reducer.sum());
//var precip_mean = precip_meantmp.resample('bilinear').reproject({'crs': crs,'scale': 250})
var precip_mean = precip_meantmp;
//Map.addLayer(precip_mean)
print(precipitation)
      /*.visualize({
        min:0,
        max:100,
        palette:[
            '#386641',
            '#6a994e',
            '#a7c957',
            '#fdf7d6',
            '#ffffff'
            ]
        });*/
//var aspect = ee.Terrain.aspect(dem);
//Map.addLayer(slope_per,{min:0,max:100},'slope');
//Map.addLayer(precipitation,{},'Rain'); 
/*var image0 = ee.Image('JAXA/GPM_L3/GSMaP/v6/operational/20210713_0000')
             .select('hourlyPrecipRate')  
             .clip(vn);
Map.addLayer(image0);*/
//tinh toan
//var dates = ee.List(precipitation.aggregate_array('system:time_start'))
  //  .map(function(d) { return ee.Date(d)});
//var dates = precipitation.reduceColumns(ee.Reducer.toList(), ["system:time_start"])
 //     .get('list');
//var count1 = ee.Number(0);    
//var count1 = precipitation.size()
//var count = count1.add(-1)
//print(precipitation.size())
//print(count)
//print(ee.Date(precipitation.first().get('system:time_start')).format("yyyy-MM-dd hh-mm-ss"))
//var listOfImages = precipitation.toList(precipitation.size());
//var dates = getIds(precipitation);
//var imagelast = ee.Image(listOfImages.get(count))
//print(dates[count]);
//Map.addLayer(imagelast,{},'mưa');
//var lc_tmp = lc.updateMask(lc.eq(20)).or(lc.updateMask(lc.eq(30))).or(lc.updateMask(lc.eq(40))).or(lc.updateMask(lc.eq(50))).or(lc.updateMask(lc.eq(60)));
var lc_tmp = lc.updateMask(lc.gt(19)).and(lc.updateMask(lc.lt(61)))
//Map.addLayer(lc);
//Map.addLayer(lc_tmp);
var conditionA1 = precip_mean.gt(200);
var conditionA2 = slope_per.gt(14);
var conditionA3 = slope_per.lt(26);
//var conditionA12 = image0.updateMask(conditionA1).add(slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)));
var conditionA12 = slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)).and(precip_mean.updateMask(conditionA1)).and(lc_tmp);                                                           
//print(getIds(precipitation));
//đồ thị
var scale = conditionA12.projection().nominalScale();
var ts0 = conditionA12.reduceRegions({collection: prov, reducer: ee.Reducer.count(), scale: scale});
var filter = ee.Filter.gt('count',0);
var ts = ts0.filter(filter);
ts = ts.sort('count', false);
//add result
/*var styled = ts
  .map(function (feature) {
    return feature.set('style', {
      fillColor: feature.getNumber('count').format('#')
    });
  })
  .style({
    styleProperty: 'style',
  });*/
//Map.addLayer(ts,{}, 'Các tỉnh bị ảnh hưởng');
Map.addLayer(conditionA12,{min:0,max:1,palette: ['FF0000', 'FF0000']},'Cảnh báo TL');
print(ts);
/////////////////////
/*var chart_s = ui.Chart.feature.byProperty ({
     features: ts, 
     xProperties: ['ADM1_VI'], 
     seriesProperty:['count']
})
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Cách tỉnh bị ảnh hưởng',
      hAxis: { title: 'Tỉnh'},
      vAxis: { title: 'Diện tích' }
});
print(chart_s);*/
var chart =
    ui.Chart.feature
        .groups({
          features: ts,
          xProperty: 'ADM1_VI',
          yProperty: 'count',
          seriesProperty:'' 
        })
        .setSeriesNames(['Diện tích'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Diện tích dựa trên số liệu cảnh báo',
          hAxis:
              {title: 'Đồ thị cảnh báo trượt lở', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Diện tích (ha)',
            titleTextStyle: {italic: false, bold: true}
          },
          bar: {groupWidth: '80%'},
          colors: ['red'],
          isStacked: false
        });
//print(chart);
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
panel.add(chart);
Map.add(panel);
// this turns myImages to a local list
var mua_all = ui.Button({
  label: 'Trên tổng lượng mua ngày '+nowStr,
  onClick: function() {
    Map.clear();
conditionA1 = precip_mean.gt(25);
conditionA2 = slope_per.gt(14);
conditionA3 = slope_per.lt(26);
//var conditionA12 = image0.updateMask(conditionA1).add(slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)));
var conditionA12 = slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)).and(precip_mean.updateMask(conditionA1)).and(lc_tmp);                                                          
txt.setValue('Dữ lệu mưa: '+nowStr);
selector.setPlaceholder('Chọn dữ liệu mưa theo giờ');
selector.items().reset(getIds(precipitation))
//add result
//Map.addLayer(ts,{min:0,max:500000,palette: ['#ffd1be','#ffe1c2','#ffedb6','#fff5b8', '#c0f9fb']}, 'Các tỉnh bị ảnh hưởng');
Map.addLayer(conditionA12,{min:0,max:1,palette: ['FF0000', 'FF0000']},'Cảnh báo TL');
//đồ thị
var chart =
    ui.Chart.feature
        .groups({
          features: ts,
          xProperty: 'ADM1_VI',
          yProperty: 'count',
          seriesProperty:'' 
        })
        .setSeriesNames(['Diện tích'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Diện tích dựa trên số liệu cảnh báo',
          hAxis:
              {title: 'Đồ thị cảnh báo trượt lở', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Diện tích (ha)',
            titleTextStyle: {italic: false, bold: true}
          },
          bar: {groupWidth: '80%'},
          colors: ['red'],
          isStacked: false
        });
//print(chart);
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
panel.add(chart);
Map.add(panel);
/*var chart =
    ui.Chart.image
        .series({
          imageCollection: conditionA12,
          region: prov,
          reducer: ee.Reducer.count(),
          scale: 500,
          xProperty: 'ADM1_VI'
        })
        .setSeriesNames(['Percent'])
        .setOptions({
          title: 'Average Vegetation Index Value by Date for Forest',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Vegetation index (x1e4)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 5,
          colors: ['e37d05', '1d6b99'],
          curveType: 'function'
        });
print(chart);*/
/////////////////////////
  }
});
var selector = ui.Select(getIds(precipitation))
//var selector = ui.Select(dates)
    selector.setPlaceholder('Chọn dữ liệu mưa theo giờ')
    selector.onChange(function(anh){
     Map.clear();
     var image0 = ee.Image(anh)
             .select('hourlyPrecipRate')
             //.reduceToImage([slope_per], 'max')
             .clip(vn)
             .rename('jaxa');
conditionA1 = image0.gt(100);
conditionA2 = slope_per.gt(14);
conditionA3 = slope_per.lt(26);
//var conditionA12 = image0.updateMask(conditionA1).add(slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)));
var conditionA12 = slope_per.updateMask(conditionA2).and(slope_per.updateMask(conditionA3)).and(precip_mean.updateMask(conditionA1)).and(lc_tmp);                                                           
     //Map.addLayer(slope_per);
     //Map.addLayer(image0);
     txt.setValue('Dữ lệu mưa: ' + anh);
     Map.addLayer(conditionA12,{min:0,max:1,palette: ['FF0000', 'FF0000']},'Cảnh báo TL');
    });  
//print(selector)// adds selector to the console
//Map.add(selector);
ui.root.insert(0, ui.Panel([chon_ts]));
//ui
var txttitle = ui.Label({
  value: 'CẢNH BÁO TRƯỢT LỞ DO MƯA (JAXA/GPM_L3) NGÀY: ' +nowStr,
  style: {width: '300px', height: '45px', fontSize: '18px', color: 'red'}
});
var txt = ui.Label({
  value: 'Dữ lệu mưa: '+nowStr,
  style: {}
});
//dates = getIds(precipitation);
//txt.setValue('Dữ lệu mưa: ' + lastDay.getInfo() + ' - ' + dateNow.getInfo());
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Chú giải',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['FF0000', '22ff00', '1500ff'];
// name of the legend
var names = ['Vùng có nguy cơ trượt lở do mưa','Green','Blue'];
// Add color and and names
for (var i = 0; i < 1; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
//Map.add(legend);  
chon_ts.add(ui.Panel([
txttitle,
// mua_all,
//selector,
//txt,
legend
]));