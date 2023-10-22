Map.setOptions('SATELLITE');
var logo = ee.Image('projects/my-project-1527255156007/assets/Pakistan_app').visualize({
    bands:  ['b3', 'b2', 'b1'],
    min: 0,
    max: 255
    });
var img = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1024x512',
        format: 'png'
        },
    style: {height: '230px', width: '450px',padding :'5px' , position: 'top-center'}
    });
var AOI = ee.FeatureCollection('users/GEE-DATA/Study_drought')
var AOIs = AOI.aggregate_array('DISTRICT').getInfo()
// SPI ------------------------------------------------------------------------------
var startDate = ee.Date.fromYMD(2001,1,1);
var endDate = ee.Date.fromYMD(2020,12,31);
var spicolor = ['760005','ec0013','ffa938','fdd28a','fefe53','ffffff','a2fd6e','00b44a','008180','2a23eb','a21fec'];
var spi_viz = {min:-2, max:2, palette: spicolor};
var lta = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
  .filterDate(startDate, endDate);
var evp_coll = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE").select('pet').filterDate(startDate, endDate);
print(evp_coll)
// NDVI LST --------------------------------------------------------------------------------
var NDVI = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
var LST = ee.ImageCollection("MODIS/006/MOD11A1")
var NDVI = NDVI.select('NDVI').filterDate('2001-01-01', '2020-12-31').filterBounds(AOI)
var LST = LST.select('LST_Day_1km').filterDate('2001-01-01', '2020-12-31').filterBounds(AOI)
var NDVI = NDVI.map(function(img){
  return img.clip(AOI)
  .copyProperties(img,['system:time_start','system:time_end']);
});
var LST = LST.map(function(img){
  return img.multiply(0.02).subtract(273.15).clip(AOI)
  .copyProperties(img,['system:time_start','system:time_end']);
});
var VCI = NDVI.map(function(image){
  var Imin = NDVI.reduce(ee.Reducer.min())
  var Imax = NDVI.reduce(ee.Reducer.max()) 
    return image.expression('(Ia-Imin)/(Imax-Imin)',
      {Ia: image,
       Imin: Imin,
       Imax:Imax
        }).rename('VCI')
        .copyProperties(image, ['system:time_start'])
        .set('date', image.date().format('YYYY_MM_dd'))
})
var TCI = LST.map(function(image){
  var Imin = LST.reduce(ee.Reducer.min())
  var Imax = LST.reduce(ee.Reducer.max()) 
    return image.expression('(Imax-Ia)/(Imax-Imin)',
      {Ia: image,
       Imin: Imin,
       Imax:Imax
        }).rename('TCI')
        .copyProperties(image, ['system:time_start'])
        .set('date', image.date().format('YYYY_MM_dd'))
})
var SVI = NDVI.map(function(image){
  var Istdev = NDVI.reduce(ee.Reducer.stdDev())
  var Imean = NDVI.reduce(ee.Reducer.mean()) 
    return image.expression('(Ia-Imean)/Istdev',
      {Ia: image,
       Imean: Imean,
       Istdev:Istdev
        }).rename('SVI')
        .copyProperties(image, ['system:time_start'])
        .set('date', image.date().format('YYYY_MM_dd'))
})
// ------------------------------------------------------------------------------------
/*var startyear = 2001; 
var endyear = 2020; 
var years = ee.List.sequence(startyear, endyear);
var yearNDVI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var NDVI_y = scaledNDVI.filter(ee.Filter.calendarRange(y, y, 'year'))
                          .median();
      return NDVI_y.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
var yearLST =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var LST_y = scaledLST.filter(ee.Filter.calendarRange(y, y, 'year'))
                          .median();
      return LST_y.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
var yearVCI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var VCI_y = VCI.filter(ee.Filter.calendarRange(y, y, 'year'))
                          .median();
      return VCI_y.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
var yearTCI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var TCI_y = TCI.filter(ee.Filter.calendarRange(y, y, 'year'))
                          .median();
      return TCI_y.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
var yearVHI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var VCI_y = VCI.filter(ee.Filter.calendarRange(y, y, 'year')).median();
      var TCI_y = TCI.filter(ee.Filter.calendarRange(y, y, 'year')).median();
      var both = VCI_y.addBands(TCI_y) 
      var VHI= both.expression('a1/2 + b1/2', {
                 a1: both.select('VCI'),
                 b1: both.select('TCI'),  
                  }).rename('VHI')
    return VHI.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
var yearSVI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
      var SVI_y = SVI.filter(ee.Filter.calendarRange(y, y, 'year'))
                          .median();
      return SVI_y.clip(AOI).set('year', y)
                          .set('system:time_start', ee.Date.fromYMD(y, 1, 1));
  }).flatten()
);
  */
  /* 
  var VHI= both.map(function(img) {
                 return img.addBands(
                 img.expression('a1/2 + b1/2', {
                 a1: img.select('VCI'),
                 b1:  img.select('TCI'),  
                  }).rename('VHI')).select('VHI');
                  }); 
print('VHI',VHI);
Map.addLayer(VHI, VisParams,'VHI')
*/
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '500px'}	});
var pnl_title = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style: {width: '480', height: '250'}});
var Years = ['2020','2019','2018', '2017', '2016','2015','2014','2013','2012','2011','2010','2009',
            '2008','2007','2006','2005','2004','2003','2002','2001']
var mapTitle = ui.Label('Agricultural Drought in rainfed areas of Sindh Province');	
mapTitle.style().set('color', 'Black');	
mapTitle.style().set('fontWeight', 'bold');	
mapTitle.style().set({fontSize: '32px',padding: '5px'});
var selectAOI = ui.Select({items: AOIs, value: AOIs[0],
                             style:{padding: '0px 0px 0px 0px', stretch: 'horizontal'}});
var lbl_Slct_AOI = ui.Label('Choose The AOI:');	
lbl_Slct_AOI.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	}); 
var date_start = ee.Date.fromYMD(2020,01,01);
var date_end = ee.Date.fromYMD(2020,12,31);
var datasld = ui.DateSlider(date_start, date_end)
datasld.setDisabled(true)
var selectYear = ui.Select({items: Years, value: Years[0],
                            onChange: function(){
                              var Year_selected = ee.Number.parse(selectYear.getValue())
                              var date_filter_start = ee.Date.fromYMD(Year_selected,01,01);
                              var date_filter_end = ee.Date.fromYMD(Year_selected,12,31);
                              datasld.setStart(date_filter_start)
                              datasld.setEnd(date_filter_end)
                            }, style:{padding: '0px 0px 0px 0', stretch: 'horizontal'}	});	
var lbl_Slct_Year = ui.Label('Choose The Year:');	
lbl_Slct_Year.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	}); 
var Items=["SPI","SPEI","VCI","TCI", "SVI", "VHI"];
var SelectItem = ui.Select({items: Items, value: Items[0],
                            onChange: function(){
                              var Index_selected = SelectItem.getValue()
                              if  ((Index_selected == 'VHI') || (SelectItem.getValue() == 'TCI') || (SelectItem.getValue() == 'SVI') || (SelectItem.getValue() == 'VCI')){ 
                                datasld.setDisabled(false)
                              }
                              else{
                                datasld.setDisabled(true)
                              }
                            }, style:{padding: '0px 0px 0px 0', stretch: 'horizontal'}	});	
var lbl_Slct_Index = ui.Label('Select The indexes:');	
lbl_Slct_Index.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	});
var btn_visual = ui.Button({label:'Run',	  
                           onClick: function(){
                          Map.clear()
                          var color_class = ['red','orange','yellow','cyan','blue'];
                          var classe_list = ['extreme dry', //1
                                             'severe dry',  //2
                                             'moderate dry',//3
                                             'normal',  //4
                                             'wet']     //5
                          var legend = ui.Panel({
                              style: {
                                position: 'bottom-left',
                                padding: '8px 15px'
                              }
                            });
                            var legendTitle = ui.Label({
                              value: 'Hazard Index',
                              style: {
                                fontWeight: 'bold',
                                fontSize: '18px',
                                margin: '0 0 4px 0',
                                padding: '0'
                                }
                            });
                            legend.add(legendTitle);
                            var makeRow = function(color, name) {
                                  var colorBox = ui.Label({
                                    style: {
                                      backgroundColor: color,
                                      padding: '8px',
                                      margin: '0 0 4px 0'
                                    }
                                  });
                                  var description = ui.Label({
                                    value: name,
                                    style: {margin: '0 0 4px 6px'}
                                  });
                                  return ui.Panel({
                                    widgets: [colorBox, description],
                                    layout: ui.Panel.Layout.Flow('horizontal')
                                  });
                            };
                            var palette = ee.List(color_class);
                            var names = ee.List(classe_list);
                            for (var i = 0; i < 5; i++) {
                               var Name = ee.String(names.get(i).getInfo());
                               legend.add(makeRow(palette.get(i).getInfo(),Name.getInfo() ));
                              }  
                            Map.add(legend);
                          var AOI_selected = selectAOI.getValue()
                          var tr = AOI.filter(ee.Filter.eq('DISTRICT',AOI_selected));
                          Map.addLayer(tr, {}, AOI_selected);
                          Map.centerObject(tr)
                          var Year_selected = selectYear.getValue()
                          var Index_selected = SelectItem.getValue()
                          var date_selected = datasld.getValue()
                          var date_init = ee.Date(date_selected[0]).format('YYYY-MM-dd')
                          var date_fin = ee.Date(date_selected[1]).advance(1, 'day').format('YYYY-MM-dd')
                          if (Index_selected == 'VCI'){
                            datasld.getValue()
                            var VCI_image = VCI.filter(ee.Filter.date(date_init,date_fin)).first()
                            Map.addLayer(VCI_image.clip(tr),{min: 0, max:1, palette:['red','yellow','green']}, 'VCI')
                            var vciclass = ee.Image(1)
                                          .where(VCI_image.lte(0.1) , 1)
                                          .where(VCI_image.gt(0.1).and(VCI_image.lte(0.2)), 2)
                                          .where(VCI_image.gt(0.2).and(VCI_image.lte(0.3)), 3)
                                          .where(VCI_image.gt(0.3).and(VCI_image.lte(0.4)), 4)
                                          .where(VCI_image.gt(0.4), 5).clip(tr)
                            Map.addLayer(vciclass, viz_class, 'VCI Class');
                          }
                          if (Index_selected == 'TCI'){
                            var TCI_image = TCI.filter(ee.Filter.date(date_init,date_fin)).first()
                            Map.addLayer(TCI_image.clip(tr),{min: 0, max:1, palette:['red','yellow','green']}, 'TCI')
                            var tciclass = ee.Image(1)
                                          .where(TCI_image.lte(0.2), 1)
                                          .where(TCI_image.gt(0.2).and(TCI_image.lte(0.37)), 2)
                                          .where(TCI_image.gt(0.37).and(TCI_image.lte(0.46)), 3)
                                          .where(TCI_image.gt(0.46).and(TCI_image.lte(0.55)), 4)
                                          .where(TCI_image.gt(0.55), 5).clip(tr)
                            Map.addLayer(tciclass, viz_class, 'TCI Class');
                          }
                          if (Index_selected == 'SVI'){
                            var SVI_image = SVI.filter(ee.Filter.date(date_init,date_fin)).first()
                            Map.addLayer(SVI_image.clip(tr),{min: 0, max:1, palette:['red','yellow','green']}, 'SVI')
                            var sviclass = ee.Image(1)
                                          .where(SVI_image.gte(0).and(SVI_image.lte(0.05)), 1)
                                          .where(SVI_image.gt(0.05).and(SVI_image.lte(0.25)), 2)
                                          .where(SVI_image.gt(0.25).and(SVI_image.lte(0.75)), 3)
                                          .where(SVI_image.gt(0.75).and(SVI_image.lte(0.95)), 4)
                                          .where(SVI_image.gt(0.95).and(SVI_image.lte(1)), 5).clip(tr)
                            Map.addLayer(sviclass, viz_class, 'SVI Class');
                          }
                          if (Index_selected == 'VHI'){
                            var VCI_y = VCI.filter(ee.Filter.date(date_init,date_fin)).median()
                            var TCI_y = TCI.filter(ee.Filter.date(date_init,date_fin)).median()
                            var both = VCI_y.addBands(TCI_y) 
                            var VHI_image = both.expression('a1/2 + b1/2', {
                                             a1: both.select('VCI'),
                                             b1: both.select('TCI'),  
                                              }).rename('VHI')
                            Map.addLayer(VHI_image.clip(tr),{min: 0, max:1, palette:['red','yellow','green']}, 'VHI')
                            var vhiclass = ee.Image(1)
                                          .where(VHI_image.gte(0).and(VHI_image.lte(0.1)), 1)
                                          .where(VHI_image.gt(0.1).and(VHI_image.lte(0.2)), 2)
                                          .where(VHI_image.gt(0.2).and(VHI_image.lte(0.3)), 3)
                                          .where(VHI_image.gt(0.3).and(VHI_image.lte(0.4)), 4)
                                          .where(VHI_image.gt(0.4).and(VHI_image.lte(1)), 5).clip(tr)
                            Map.addLayer(vhiclass, viz_class, 'VHI Class');
                          }
                          if (Index_selected == 'SPI'){
                            var ltamean = lta.select('precipitation').mean().clip(tr);
                            var ltastd = lta.reduce(ee.Reducer.stdDev()).clip(tr);
                            var latest = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
                              .filter(ee.Filter.calendarRange(ee.Number.parse(Year_selected), ee.Number.parse(Year_selected), 'year'))
                            var rainfall_now = latest.select('precipitation').mean().clip(tr);
                            var spi = rainfall_now.subtract(ltamean).divide(ltastd);
                            Map.addLayer(spi, spi_viz, 'SPI');
                            var spiclass = ee.Image(1)
                                      .where(spi.lte(-2), 1)
                                      .where(spi.gt(-2).and(spi.lte(-1.5)), 2)
                                      .where(spi.gt(-1.5).and(spi.lte(-1)), 3)
                                      .where(spi.gt(-1).and(spi.lte(0)), 4)
                                      .where(spi.gt(0), 5).clip(tr)
                            var color_class = ['red','orange','yellow','cyan','blue'];
                            var viz_class = {min:1, max:5, palette: color_class};
                            Map.addLayer(spiclass, viz_class, 'SPI Class');
                          }
                          if (Index_selected == 'SPEI'){
                            var evpmean = evp_coll.mean().clip(tr);
                            var evpstd = evp_coll.reduce(ee.Reducer.stdDev()).clip(tr);
                            var evpest = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE").select('pet')
                              .filter(ee.Filter.calendarRange(ee.Number.parse(Year_selected), ee.Number.parse(Year_selected), 'year'))
                            var evap_now = evpest.mean().clip(tr);
                            var spei = evap_now.subtract(evpmean).divide(evpstd);
                            Map.addLayer(spei, spi_viz, 'SPEI');
                            var speiclass = ee.Image(1)
                                      .where(spei.lte(-2), 1)
                                      .where(spei.gt(-2).and(spei.lte(-1.5)), 2)
                                      .where(spei.gt(-1.5).and(spei.lte(-1)), 3)
                                      .where(spei.gt(-1).and(spei.lte(0)), 4)
                                      .where(spei.gt(0), 5).clip(tr)
                            var color_class = ['red','orange','yellow','cyan','blue'];
                            var viz_class = {min:1, max:5, palette: color_class};
                            Map.addLayer(speiclass, viz_class, 'SPEI Class');
                          }
                           }
});
btn_visual.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	});
pnl_title.add(img);
pnl_main.add(pnl_title);
pnl_main.add(mapTitle);
pnl_main.add(lbl_Slct_AOI);
pnl_main.add(selectAOI);
pnl_main.add(lbl_Slct_Year);
pnl_main.add(selectYear);
pnl_main.add(lbl_Slct_Index);
pnl_main.add(SelectItem);
pnl_main.add(datasld)
pnl_main.add(btn_visual);
ui.root.insert(0, pnl_main);