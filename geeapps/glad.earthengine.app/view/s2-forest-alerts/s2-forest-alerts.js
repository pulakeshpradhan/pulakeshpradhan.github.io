var ambasin = ui.import && ui.import("ambasin", "table", {
      "id": "projects/glad/amazonbasin"
    }) || ee.FeatureCollection("projects/glad/amazonbasin"),
    upd = ui.import && ui.import("upd", "imageCollection", {
      "id": "projects/glad/alert/UpdResult"
    }) || ee.ImageCollection("projects/glad/alert/UpdResult"),
    adm = ui.import && ui.import("adm", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    ocean = ui.import && ui.import("ocean", "image", {
      "id": "projects/glad/landBuffer4"
    }) || ee.Image("projects/glad/landBuffer4");
var s2col = 'projects/glad/S2alert';
var today = ee.Date(ee.Image(s2col+'/alert').get('date')).advance(-2,'day');//ee.Date('2020-10-05');//new Date()); 
var realtoday = new Date();realtoday = ee.Date(realtoday);
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
ocean = ocean.mask();
var mapbiomas = ee.FeatureCollection("users/glad/mapbiomas_published_alertas");
//var amzboundary = ambasin.geometry().intersection(ee.Geometry.Rectangle([-180,-14,0,14],'EPSG:4326'),1000);
//Map.addLayer(amzboundary)
var AOI = adm.filterMetadata('ADM0_NAME','equals','Brazil').merge(adm.filterMetadata('ADM0_NAME','equals','Peru')).merge(adm.filterMetadata('ADM0_NAME','equals','Ecuador')).union(10000).geometry().intersection(ambasin.geometry(),10000)
var s2raw = ee.ImageCollection("COPERNICUS/S2_HARMONIZED"),
    primary = ee.ImageCollection("UMD/GLAD/PRIMARY_HUMID_TROPICAL_FORESTS/v1"),
    gfc = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    gfc19 = ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    gfc20 = ee.Image("UMD/hansen/global_forest_change_2020_v1_8"),
    gfc21 = ee.Image("UMD/hansen/global_forest_change_2021_v1_9"),
    gfc22 = ee.Image("UMD/hansen/global_forest_change_2022_v1_10");
var lLS18 = ui.Map.Layer(gfc.select('last_b50','last_b40','last_b30'),{},'2018Landsat')
var lLS19 = ui.Map.Layer(gfc19,{bands:['last_b50','last_b40','last_b30']},'2019Landsat')
var lLS20 = ui.Map.Layer(gfc20,{bands:['last_b50','last_b40','last_b30']},'2020Landsat')
var lLS21 = ui.Map.Layer(gfc21,{bands:['last_b50','last_b40','last_b30']},'2021Landsat')
var lLS22 = ui.Map.Layer(gfc22,{bands:['last_b50','last_b40','last_b30']},'2022Landsat')
var SA = ee.ImageCollection('projects/glad/alert/UpdResult').filterMetadata('system:index','contains','_SA').sort('system:time_start',false).first()
var CA = ee.ImageCollection('projects/glad/alert/UpdResult').filterMetadata('system:index','contains','_CA').sort('system:time_start',false).first()
var LSalert = ee.ImageCollection([SA,CA]).mosaic()
              .addBands(ee.ImageCollection('projects/glad/alert/2022final').mosaic().select(['conf22','alertDate22']))
              .addBands(ee.ImageCollection('projects/glad/alert/2021final').mosaic().select(['conf21','alertDate21']))
var lLSlast = ui.Map.Layer(LSalert.select(['swir1','nir','red']),{},'LS last obs')
//var lLSloss19 = ui.Map.Layer(ee.Image([gfc19.select('lossyear').eq(19).unmask(),LSalert.select('conf19').where(gfc.select('lossyear').lt(19).and(gfc.select('lossyear').gt(0)),0).unmask()]),{max:[1,3]},'2019LSloss(alert--annual)')
var lLSloss19 = ui.Map.Layer(gfc19.select('lossyear').eq(19).selfMask(),{},'2019 Landsat annual loss')
//var lLSloss22 = ui.Map.Layer(gfc19.select('lossyear').eq(19).selfMask(),{},'2022 Landsat annual loss')
//Map.addLayer(gfc.select('lossyear'),{min:16,max:18},'annualloss')
var s2_18 = s2raw.filterDate('2018-09-01', '2019-01-01').sort('CLOUDY_PIXEL_PERCENTAGE').map(maskS2clouds);
s2raw = s2raw.filterDate('2019-01-01','2099-01-01');
//var s2visParams = {bands:['B11','B8A','B4'],min:[0,500,0],max:[5000,6000,5000]}
var s2visParams = {bands:['B11','B8A','B4'],min:[0,0,0],max:[4000,5500,3500]}
//var s2visParams = {bands:['B11','B8A','B4'],min:[0,500,0],max:[4500,6000,4000]}
var s2ja = s2raw.filterDate('2019-06-01', '2019-09-01').sort('CLOUDY_PIXEL_PERCENTAGE').map(maskS2clouds);
var s2sn = s2raw.filterDate('2019-09-01', '2019-12-01').sort('CLOUDY_PIXEL_PERCENTAGE').map(maskS2clouds);
var s2df = s2raw.filterDate('2019-12-01', '2020-03-01').sort('CLOUDY_PIXEL_PERCENTAGE').map(maskS2clouds);
var ls2_18 = ui.Map.Layer(s2_18,s2visParams,'S2 end 2018 composite')
var ls2ja = ui.Map.Layer(s2ja,s2visParams,'S2 June-Aug 2019 composite') 
var ls2sn = ui.Map.Layer(s2sn,s2visParams,'S2 Sept-Nov 2019 composite')
var ls2df = ui.Map.Layer(s2df,s2visParams,'S2 Dec-Feb 2020 composite')
var s2av = ee.Image(['projects/glad/S2mets/m1819_av2575_S1','projects/glad/S2mets/m1819_av2575_N','projects/glad/S2mets/m1819_av2575_R']).updateMask(ocean)//.rename(['B11','B8A','B4'])
var s2_last = ee.Image([s2col+'/last_S1',s2col+'/last_N',s2col+'/last_R']).updateMask(ocean)//.rename(['B11','B8A','B4'])
var ls2_av = ui.Map.Layer(s2av.selfMask(),{min:0,max:255},'S2 av18-19')
var ls2_last = ui.Map.Layer(s2_last.selfMask(),{min:0,max:255},'S2 last observation')
var lastdoy = today.difference(ee.Date('2020-01-01'),'day');
//Map.addLayer(s2raw.filterDate(today.advance(-31,'day'),today.advance(-21,'day')),s2visParams,'S2 Today 21-31 days ago');
var ls2_r3 = ui.Map.Layer(s2raw.filterDate(today.advance(-20,'day'),today.advance(-15,'day')),s2visParams,'S2 16-20 days ago');
var ls2_r2 = ui.Map.Layer(s2raw.filterDate(today.advance(-15,'day'),today.advance(-10,'day')),s2visParams,'S2 11-15 days ago');
var ls2_r1 = ui.Map.Layer(s2raw.filterDate(realtoday.advance(-10,'day'),realtoday.advance(-5,'day')),s2visParams,'S2 6-10 days ago');
var ls2_r0 = ui.Map.Layer(s2raw.filterDate(realtoday.advance(-5,'day'),realtoday),s2visParams,'S2 0-5 days ago');
var conf = ee.Image(s2col+'/alert').rename('alert').selfMask();
var confdate = ee.Image(s2col+'/alertDate').rename('alertdate').selfMask();
//var pixelcount = ee.Image('projects/glad/S2alert/connected');
var obsdate = ee.Image(s2col+'/obsDate').rename('obsDate').selfMask();
var dates = ee.Image([confdate,obsdate]).rename(['confdate','obsdate']);
var startdate = 1;
var datemask = dates.gte(startdate);
var LSalertboth = LSalert.select('conf21').add(LSalert.select('conf22')).add(LSalert.select('conf23')).rename('LSalert')//.where(LSalert.select('alertDate20').gte(lastdoy),0)
var LSalertbothdate = LSalert.select('alertDate22').add(365+366+365).where(LSalert.select('alertDate22').eq(0),0)// LSalert.select('alertDate21').add(365+366).where(LSalert.select('alertDate21').eq(0),0)
.add(LSalert.select('alertDate23').add(365+366+365+365).where(LSalert.select('alertDate23').eq(0),0)).selfMask()//.where(LSalert.select('alertDate20').gte(lastdoy),0)
var lLSalert = ui.Map.Layer(LSalertboth.selfMask(),{min:2,max:3,palette:['00ffff','ff0000']},'LSalert since 2022')
//var lLSalert = ui.Map.Layer(LSalert,{bands:['conf19','conf20'],min:0,max:3},'LSalert19-20 combined')
//Map.addLayer(LSalert,{bands:['alertDate19','alertDate20'],min:0,max:366},'LSalert19-20 combined')
var pmask = primary.mosaic().and(gfc.select('lossyear').eq(0));
var datepal = ["#000004FF",  "#0D082AFF",  "#280B54FF",  "#480B6AFF",  "#65156EFF",  "#82206CFF",  "#9F2A63FF",  "#BB3754FF",
  "#D44842FF",  "#E8602DFF",  "#F57D15FF",  "#FB9E07FF",  "#FAC127FF",  "#F3E55CFF",  "#FCFFA4FF"];
var confthresh = 1;
var comp=ee.Image([LSalertboth,ee.Image([conf,conf]).updateMask(conf.gte(confthresh))]).unmask();
var compdate=ee.Image([LSalertbothdate,ee.Image([confdate,confdate]).updateMask(conf.gte(confthresh))]).unmask();
var both = LSalertbothdate.gt(0).and(confdate.updateMask(conf.gte(confthresh)).gt(0));
var either = LSalertbothdate.gt(0).or(confdate.updateMask(conf.gte(confthresh)).gt(0));
//Map.addLayer(compdate.updateMask(pmask).updateMask(compdate.reduce('sum').gt(0)),{min:0,max:500},'LS-S2-S2 date')
var datedelta = confdate.updateMask(conf.gte(confthresh)).subtract(LSalertbothdate).updateMask(both).updateMask(pmask).rename('delta');
var datemin = confdate.unmask().where(confdate.gt(0).and(LSalertbothdate),confdate.min(LSalertbothdate)).where(confdate.unmask().eq(0),LSalertbothdate).selfMask().updateMask(pmask).rename('datemin');
//print('median',datedelta.reduceRegion({reducer:'median',geometry:ee.Geometry.Rectangle(Map.getBounds()),scale:10,maxPixels:1e10}).get('delta'))
//print('mean',datedelta.reduceRegion({reducer:'mean',geometry:ee.Geometry.Rectangle(Map.getBounds()),scale:10,maxPixels:1e10}).get('delta'))
var none = ee.Image([0]).selfMask().rename('none');
var s2all = ee.Image([conf,confdate,LSalertboth,datedelta,datemin,none]).updateMask(pmask);
var s2masks = s2all.mask();
var ls2conf_sf = ui.Map.Layer(s2all,{bands:['alert'],min:0,max:4,palette:['000000','00ffff','ffe599','ff9900','ff0000']},'S2 alert');
var ls2alertDate = ui.Map.Layer(s2all,{bands:['alertdate'],min:0,max:365+lastdoy.getInfo(),palette:datepal},'S2 alert date');
//var lLS_S2comp = ui.Map.Layer(comp.updateMask(pmask).updateMask(comp.reduce('sum').gt(0)),{min:0,max:[3,4,4]},'LS-S2-S2')
var lLS_S2comp = ui.Map.Layer(s2all.updateMask(confdate.gt(365+366)),{bands:['LSalert','alert','alert'],min:0,max:[1,1,1]},'LS-S2-S2');
var ldatedelta = ui.Map.Layer(s2all.updateMask(confdate.gt(365+366)),{bands:['delta'],min:-30,max:30, palette:['0099ff','ffffff','ff0000']},'S2-LS date delta (for agreement)');
var alertDateVisParams = {bands:['alertdate'],min:0,max:365+lastdoy.getInfo(),palette:datepal};
var advdays = ee.Number(0);
var s2lyrs = {
  'S2 alert': {bands:['alert'],min:0,max:4,palette:['000000','00ffff','ffe599','ff9900','ff0000']},
  'S2 alert date': {bands:['alertdate'],min:advdays.getInfo(),max:365+lastdoy.getInfo(),palette:datepal},
  'LS-S2 alert comparison': {bands:['LSalert','alert','alert'],min:0,max:[1,1,1]},
  //'Earliest detection date from S2 and LS': {bands:['datemin'],min:0,max:366+lastdoy.getInfo(), palette:datepal},
  'S2-LS date difference over agreement': {bands:['delta'],min:-30,max:30, palette:['0099ff','ffffff','ff0000']},
  'None': {bands:['none']},
};
var lmapbiomas = ui.Map.Layer(mapbiomas.filterMetadata('DETECTED_Y','equals',2019),{},'mapbiomas 2019');
var lnone0 = ui.Map.Layer(ee.Image([]),{},'none');
var lnone1 = ui.Map.Layer(ee.Image([]),{},'none');
var lnone2 = ui.Map.Layer(ee.Image([]),{},'none');
var images = {
  'S2 last observation':ls2_last,
  'S2 select date to view': ls2_r1,
  'S2 average 2018-2019':ls2_av,
  'Landsat last observation':lLSlast,
  'Landsat 2022': lLS22,
  'Landsat 2021': lLS21,
  'Landsat 2020': lLS20,
  'Landsat 2019': lLS19,
  'Landsat 2018': lLS18,
  'None': lnone0,
};
var otherdatalyrs = {
  //'Landsat annual loss 2019': lLSloss19,
  'Landsat alert': lLSalert,
  //'MapBiomas 2019': lmapbiomas,
  'None': lnone1,
};
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 0.1],dimensions: '200x15',format: 'png',min: 0,max: 1,palette: palette,};}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(datepal),
  style: {stretch: 'horizontal', margin: '0px 0px 0px 8px', maxHeight: '24px'},
}); 
//function getDatePanel(d){
//  return
//  ui.Panel([colorBar,
//    ui.Panel({
//      widgets: [ui.Label(d.format('Y-MM-dd').getInfo(), {backgroundColor: bgColor,margin: '4px 8px'}),//ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
//        ui.Label(today.format('Y-MM-dd').getInfo(), {backgroundColor: bgColor,margin: '4px 0px 6px 70px'})],
//      layout: ui.Panel.Layout.flow('horizontal'),
//      style: {backgroundColor: bgColor}
//    })
//  ],'flow',{backgroundColor: bgColor});
//}
//var dateLabels = getDateLabel(ee.Date("2019-01-01"));
var datePanel = ui.Panel([colorBar,
    ui.Panel({
      widgets: [ui.Label('2019-01-01', {backgroundColor: bgColor,margin: '4px 8px'}),//ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(today.format('Y-MM-dd').getInfo(), {backgroundColor: bgColor,margin: '4px 0px 6px 70px'})],
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {backgroundColor: bgColor}
    })
  ],'flow',{backgroundColor: bgColor});
var deltacolorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(['ff0000','ffffff','0099ff']),
  style: {stretch: 'horizontal', margin: '0px 0px 0px 8px', maxHeight: '24px'},
}); 
var deltaLabels = ui.Panel({
  widgets: [ui.Label("-30", {backgroundColor: bgColor,margin: '4px 8px'}),//ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label("+30", {backgroundColor: bgColor,margin: '4px 0px 6px 175px'})],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: bgColor}
});
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 8px'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px',backgroundColor: bgColor}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style:{backgroundColor: bgColor}
  });
};
var confLegend = ui.Panel(makeRow('ff0000','High confidence loss (3 consecutive)'));
confLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
confLegend.add(makeRow('ff9900','Medium confidence loss (2 consecutive or 3 out of 4)'))
confLegend.add(makeRow('ffe599','Low confidence loss (2 out of 3 or 4)'))
confLegend.add(makeRow('00ffff','Loss detected in only most recent observation'))
var compLegend = ui.Panel(makeRow('ffffff','Loss agreement'));
compLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
compLegend.add(makeRow('00ffff','Sentinel-2 only'))
compLegend.add(makeRow('ff0000','Landsat only'))
var layerOptions = {
  'S2 alert': confLegend,
  'S2 alert date': datePanel,//ui.Panel([colorBar,dateLabels],'flow',{backgroundColor: bgColor}),
  'LS-S2 alert comparison': compLegend,
  //'Earliest detection date from S2 and LS': ui.Panel([colorBar,dateLabels],'flow',{backgroundColor: bgColor}),
  'S2-LS date difference over agreement': ui.Panel([ui.Label("days detected before Landsat alert",{backgroundColor: bgColor}),deltacolorBar,deltaLabels],'flow',{backgroundColor: bgColor}),//
  'None':ui.Panel(),
}
var layerOptionsPanel = ui.Panel([confLegend],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var selother = ui.Select({items: Object.keys(otherdatalyrs),//], 
  placeholder: 'None',
  onChange: function(lyr){
    mapPanel.layers().set(1,otherdatalyrs[lyr]);
  }
});
var selS2 = ui.Select({items: Object.keys(s2lyrs),//], 
  value: 'S2 alert',
  onChange: function(lyr){
    layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[lyr]);
    mapPanel.layers().get(2).setVisParams(s2lyrs[lyr]);
  }
});
var selDatePanel = ui.Panel([
  ui.Label("Alerts from 2019-01-01 through "+today.format('yyyy-MM-dd').getInfo()+" are displayed.",{margin: '0 0 4px 8px', backgroundColor:bgColor})],
  'flow',{backgroundColor:bgColor})
var selDate = ui.DateSlider({
  start:'2019-01-01',
  end: today.format('yyyy-MM-dd').getInfo(),
  value:'2019-01-01',
  period:1,
  onChange: function(d){
    advdays = d.start().difference(ee.Date('2019-01-01'),'day');
    datemask = dates.gte(advdays).select('confdate');
    s2lyrs['S2 alert date']= {bands:['alertdate'],min:advdays.getInfo(),max:365+lastdoy.getInfo(),palette:datepal};
    var params = s2lyrs[selS2.getValue()];// mapPanel.layers().get(2).getVisParams();
    mapPanel.layers().set(2,ui.Map.Layer(s2all.unmask().updateMask(datemask).updateMask(s2masks),params));
    //dateLabels = getDateLabel(d.start());
    layerOptionsPanel.clear();
    layerOptions['S2 alert date'].clear()
    layerOptions['S2 alert date'] = ui.Panel([colorBar,
    ui.Panel({
      widgets: [ui.Label(d.start().format('Y-MM-dd').getInfo(), {backgroundColor: bgColor,margin: '4px 8px'}),//ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(today.format('Y-MM-dd').getInfo(), {backgroundColor: bgColor,margin: '4px 0px 6px 70px'})],
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {backgroundColor: bgColor}
    })
  ],'flow',{backgroundColor: bgColor});//getDatePanel(d.start());//ui.Panel([colorBar,getDateLabel(d.start())],'flow',{backgroundColor: bgColor});
    //layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[selS2.getValue()]);
    selDatePanel.clear();
    selDatePanel.add(ui.Label("Alerts from "+d.start().format('yyyy-MM-dd').getInfo()+" through "+today.format('yyyy-MM-dd').getInfo()+" are displayed.",{margin: '0 0 4px 8px', backgroundColor:bgColor}))
  },
  style:{'width':'250px',backgroundColor:bgColor}
});
var selImageDate = ui.DateSlider({
  start:'2019-01-01',
  end: realtoday.format('yyyy-MM-dd').getInfo(),
  value: realtoday.advance(-5,'day').format('yyyy-MM-dd').getInfo(),
  period:5,
  onChange: function(d){
    //var advdays = d.start().difference(ee.Date('2019-01-01'),'day');
    //datemask = dates.gte(advdays).select('confdate');
    //var params = mapPanel.layers().get(0).getVisParams();
    mapPanel.layers().set(0,ui.Map.Layer(s2raw.filterDate(d.start(),d.end()),s2visParams));
  },
  style:{'width':'250px',backgroundColor:bgColor}
});
var backgroundOptions = {
  'Landsat 2022': ui.Panel(),
  'Landsat 2021': ui.Panel(),
  'Landsat 2020': ui.Panel(),
  'Landsat 2019': ui.Panel(),
  'Landsat 2018': ui.Panel(),
  'Landsat last observation':ui.Panel(),
  'S2 average 2018-2019':ui.Panel(),
  'S2 select date to view': selImageDate,
  'S2 most recent':ui.Panel(),
  'S2 last observation':ui.Panel(),
  'None': ui.Panel(),
}
var backgroundOptionsPanel = ui.Panel([],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var selbackground = ui.Select({items: Object.keys(images),//], 
  placeholder: 'S2 last observation',
  onChange: function(lyr){
    backgroundOptionsPanel.clear();
    backgroundOptionsPanel.add(backgroundOptions[lyr]);
    mapPanel.layers().set(0,images[lyr]);
  }
});
//var selDate = ui.Slider({
//  min:1,
//  max:lastdoy.add(365),
//  value:1,
//  step:1,
//  onChange: function(d){
//    //var advdays = d.start().difference(ee.Date('2019-01-01'),'day');
//    datemask = dates.gte(d).select('confdate');
//    var params = mapPanel.layers().get(2).getVisParams();
//    mapPanel.layers().set(2,ui.Map.Layer(s2all.unmask().updateMask(datemask).updateMask(s2masks),params));
//  }
//});
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
var subtitlestyle = {color: '#555555', fontWeight: 'bold', backgroundColor:bgColor}
var clickPanel = ui.Panel();
panel.add(
  ui.Panel([ui.Label({value: 'Sentinel-2 forest loss alert', style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}}),
  //ui.Label("A.H. Pickens, M.C. Hansen, B. Adusei, P. Potapov (2020)",{backgroundColor: bgColor}),
  ui.Panel([ui.Label("A.H. Pickens, M.C. Hansen, B. Adusei, P. Potapov (2020)",{backgroundColor: bgColor,margin: '8px 4px 2px 8px'}),ui.Label("Global Land Analysis and Discovery (GLAD), University of Maryland",{backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"glad.umd.edu/")],ui.Panel.Layout.flow('vertical'),{backgroundColor: bgColor}),
  //ui.Label("glad.umd.edu",{backgroundColor: bgColor},"https://glad.umd.edu/"),
  ui.Label("Loss of primary forest is mapped in near-real time at 10m resolution using Sentinel-2 multispectral data. Cloud, shadow, water are detected in each new Sentinel-2 image and a forest loss algorithm is applied to all remaining clear land observations. The algorithm relies on the spectral data in each new image in combination with spectral metrics from a baseline period of the previous two years. Confidence is built through repeated loss observations in the consequent images. Results are masked to only within the primary forest mask of Turbanova et al. (2018) with 2001-2018 forest loss from Hansen et al. (2013) removed. To share location copy URL.",{backgroundColor: bgColor}),
  //ui.Label("Near-real time forest loss data from Sentinel-2: Jan 1, 2019 - "+today.format('MMM d, yyyy').getInfo()+" within primary forest.\n To share location copy URL.",{backgroundColor: bgColor}),
  ui.Label("Data download",{backgroundColor: bgColor},"https://console.cloud.google.com/storage/browser/earthenginepartners-hansen/S2alert"),
  ui.Label('S2 alert layer:',subtitlestyle),
  selS2,
  layerOptionsPanel,
  ui.Label('Select start date:',{margin: '8px 0 0 8px',backgroundColor:bgColor}),
  selDate,
  selDatePanel,
  ui.Label('Other data layer:',subtitlestyle),
  selother,
  ui.Label('Background image:',subtitlestyle),
  selbackground,
  backgroundOptionsPanel,
  ui.Label('Click for alert details',subtitlestyle),
  clickPanel
  ],'flow',{backgroundColor: bgColor})
);
//Loss of primary forest is mapped in near-real time at 10m resolution using Sentinel-2 multispectral data. Cloud, shadow, water are detected in each new Sentinel-2 image 
//and a forest loss algorithm is applied to all clear land observations. The algorithm relies on the spectral data in each new image in combination with spectral metrics 
//from a baseline period of the previous two years. Confidence is built through repeated loss observations in the consequent images. Results are masked to only within the
//primary forest mask of Turbanova et al. (2018) with forest loss from 2001-2018 as detected in Hansen et al. (2013) removed. To share location copy URL.
//as the spectral data in each new image and the difference between them.
mapPanel.add(ls2_last);
mapPanel.add(lnone1);
mapPanel.add(ls2conf_sf);
//mapPanel.addLayer(pixelcount,{max:20},'pixelcount')
//mapPanel.addLayer(s2all.unmask(),{max:20},'pixelcount')
//mapPanel.addLayer(pmask,{max:1},'primary')
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),-4).getInfo();
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),-63).getInfo();
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),5).getInfo();
mapPanel.setCenter(startlon,startlat,startzoom);
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onChangeBounds(changeURL);
mapPanel.onClick(pointInfo);
//mapPanel.addLayer(conf.eq(2))
///////////////////////////////////////////////////////////////////////////
function changeURL(input){
  ui.url.set({'lon':input.lon,'lat':input.lat,'zoom':input.zoom});
}
function pointInfo(coords){
  var lon=coords.lon;
  var lat = coords.lat;
  clickPanel.clear();
  var point = ee.Geometry.Point(lon, lat);
  var alertday = ee.Number(confdate.unmask().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('alertdate'));
  clickPanel.add(ui.Label('Lon: '+lon.toFixed(5)+', Lat: '+lat.toFixed(5)));
  if(alertday.gt(0).getInfo()){alertInfo(alertday,lat,lon,point)}
  else{clickPanel.add(ui.Label('no alert at clicked location'));}
}
function alertInfo(alertday,lat, lon,point){
  //var year = ee.Number(2019).add(alertday.gt(366));
  //var doy = alertday.subtract(ee.Number(366).multiply(alertday.gte(366)))//.subtract(ee.Number(366).multiply(alertday.lt(426).and(alertday.gt(366))));
  //var alertdate = ee.Date(year.getInfo()+'-01-01').advance(doy.subtract(1),'day');
  var alertdate = ee.Date('2018-12-31').advance(alertday,'day');
  //clickPanel.add(ui.Label('Clicked:',subtitlestyle)
  var size =0.005;
  var box = ee.Geometry.Rectangle([lon-size,lat-size,lon+size,lat+size]);
  var s2box = s2raw.filterBounds(box);
  var alertimage = s2box.filterDate(alertdate,alertdate.advance(1,'day')).mosaic().clip(box);
  //print(doy,alertday,alertdate,alertimage);
  var confidence = ee.Number(conf.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('alert')).getInfo();
  if(confidence == 1){confidence = "Loss detected in only most recent observation: ";}
  else if(confidence == 2){confidence = "Low confidence loss: ";}
  else if(confidence == 3){confidence = "Medium confidence loss: ";}
  else if(confidence == 4){confidence = "High confidence loss: ";}
  //clickPanel.add(ui.Label(confidence))
  clickPanel.add(ui.Label(confidence+alertdate.format('Y-MM-dd').getInfo()));
  clickPanel.add(ui.Thumbnail(s2box.filterDate(alertdate,alertdate.advance(1,'day')).mosaic().clip(box),s2visParams))
  clickPanel.add(ui.Label('5 days before: '));
  clickPanel.add(ui.Thumbnail(s2box.filterDate(alertdate.advance(-5,'day'),alertdate.advance(-4,'day')).mosaic().clip(box),s2visParams))
  clickPanel.add(ui.Label('5 days after: '));
  clickPanel.add(ui.Thumbnail(s2box.filterDate(alertdate.advance(5,'day'),alertdate.advance(6,'day')).mosaic().clip(box),s2visParams))
}
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}