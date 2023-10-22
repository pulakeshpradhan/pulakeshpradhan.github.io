//Load data Shapefile
var ac = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/ACEH"),
    ba = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/BALI"),
    bb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KEP_BANGKA_BELITUNG"),
    bt = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/BANTEN"),
    be = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/BENGKULU"),
    yo = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/DI_YOGYAKARTA"),
    jk = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/DKI_JAKARTA"),
    go = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/GORONTALO"),
    pb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/PAPUA_BARAT"),
    pa = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/PAPUA"),
    ja = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/JAMBI"),
    jb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/JAWA_BARAT"),
    jt = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/JAWA_TENGAH"),
    ji = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/JAWA_TIMUR"),
    kb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KALIMANTAN_BARAT"),
    ks = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KALIMANTAN_SELATAN"),
    kt = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KALIMANTAN_TENGAH"),
    ki = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KALIMANTAN_TIMUR"),
    la = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/LAMPUNG"),
    ma = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/MALUKU"),
    mu = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/MALUKU_UTARA"),
    nb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/NUSA_TENGGARA_BARAT"),
    nt = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/NUSA_TENGGARA_TIMUR"),
    kr = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/KEP_RIAU"),
    ri = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/RIAU"),
    sr = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SULAWESI_BARAT"),
    sn = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SULAWESI_SELATAN"),
    st = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SULAWESI_TENGAH"),
    sg = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SULAWESI_TENGGARA"),
    sa = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SULAWESI_UTARA"),
    sb = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SUMATERA_BARAT"),
    ss = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SUMATERA_SELATAN"),
    su = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/SUMATERA_UTARA"),
    IND = ee.FeatureCollection("projects/ee-shpprovjanuar/assets/Indonesia_Prov");
var aoi,
    areaOfInterest,
    geometry
var sidePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: '100%',
    width: '20%',
  },
});
//ui.root.insert(0,sidePanel);
var title = ui.Label({
  value: 'Perubahan Kondisi Hutan dari Tahun 2000 hingga 2020',
  style: {'fontSize': '20px', fontWeight: 'bold'}
});
//sidePanel.add(title);
var subtitle = ui.Label({
  value: 'Aplikasi berikut menunjukkan perubahan lingkungan hutan',
  style: {'fontSize': '16px'}
});
//sidePanel.add(subtitle);
//Mendefinisikan variabel lokasi pengamatan
var acz = 'ACEH',
    baz = 'BALI',
    bbz = 'KEP_BANGKA_BELITUNG',
    btz = 'BANTEN',
    bez = 'BENGKULU',
    yoz = 'DI_YOGYAKARTA',
    jkz = 'DKI_JAKARTA',
    goz = 'GORONTALO',
    pbz = 'PAPUA_BARAT',
    paz = 'PAPUA',
    jaz = 'JAMBI',
    jbz = 'JAWA_BARAT',
    jtz = 'JAWA_TENGAH',
    jiz = 'JAWA_TIMUR',
    kbz = 'KALIMANTAN_BARAT',
    ksz = 'KALIMANTAN_SELATAN',
    ktz = 'KALIMANTAN_TENGAH',
    kiz = 'KALIMANTAN_TIMUR',
    laz = 'LAMPUNG',
    maz = 'MALUKU',
    muz = 'MALUKU_UTARA',
    nbz = 'NUSA_TENGGARA_BARAT',
    ntz = 'NUSA_TENGGARA_TIMUR',
    krz = 'KEP_RIAU',
    riz = 'RIAU',
    srz = 'SULAWESI_BARAT',
    snz = 'SULAWESI_SELATAN',
    stz = 'SULAWESI_TENGAH',
    sgz = 'SULAWESI_TENGGARA',
    saz = 'SULAWESI_UTARA',
    sbz = 'SUMATERA_BARAT',
    ssz = 'SUMATERA_SELATAN',
    suz = 'SUMATERA_UTARA';
var selecttitle = ui.Label({value:'Select area of interest',
style: {fontSize: '16px', fontWeight: 'bold'}});
//sidePanel.add(selecttitle);
var selSumatera = ui.Select(
  [acz,bbz,bez,jaz,laz,krz,riz,sbz,ssz,suz],
  "Sumatera Area")
  selSumatera.onChange(genSelSumatera);
//sidePanel.add(selSumatera);
var selKalimantan = ui.Select(
  [kbz,ksz,ktz,kiz],
  "Kalimantan Area");
  selKalimantan.onChange(genSelKalimantan);
//sidePanel.add(selKalimantan);
var selJawa = ui.Select(
  [btz,yoz,jkz,jbz,jtz,jiz],
  "Jawa Area");
  selJawa.onChange(genSelJawa);
//sidePanel.add(selJawa);
var selSulawesi = ui.Select(
  [goz,srz,snz,stz,sgz,saz],
  "Sulawesi Area");
  selSulawesi.onChange(genSelSulawesi);
//sidePanel.add(selSulawesi);
var selPapua = ui.Select(
  [pbz,paz],
  "Papua Area");
  selPapua.onChange(genSelPapua);
//sidePanel.add(selPapua);
var selMant = ui.Select(
  [baz,maz,muz,nbz,ntz],
  "Maluku dan Nusa Tenggara Area");
  selMant.onChange(genSelMant);
//sidePanel.add(selMant);
//SUMATERA AREA FOR OPTION*************************************************************************************************************
function genSelSumatera (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selSumatera.getValue();
  if (aoi == acz){
      areaOfInterest = ac;
  }
  else if (aoi == bbz){
      areaOfInterest = bb;
  }
  else if(aoi == bez){
      areaOfInterest = be;
  }
  else if (aoi == jaz){
      areaOfInterest = ja;
  }
  else if (aoi == laz){
      areaOfInterest = la;
  }
  else if(aoi == krz){
      areaOfInterest = kr;
  }
  else if(aoi == riz){
      areaOfInterest = ri;
  }
  else if (aoi == sbz){
      areaOfInterest = sb;
  }
  else if(aoi == ssz){
      areaOfInterest = ss;
  }
  else if(aoi == suz){
      areaOfInterest = su;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//SUMATERA AREA FOR OPTION*************************************************************************************************************
//KALIMANTAN AREA FOR OPTION***********************************************************************************************************
function genSelKalimantan (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selKalimantan.getValue();
  if (aoi == kbz){
      areaOfInterest = kb;
  }
  else if(aoi == ksz){
      areaOfInterest = ks;
  }
  else if(aoi == ktz){
      areaOfInterest = kt;
  }
    else if(aoi == kiz){
      areaOfInterest = ki;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//KALIMANTAN AREA FOR OPTION***********************************************************************************************************
//JAWA AREA FOR OPTION*****************************************************************************************************************
function genSelJawa (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selJawa.getValue();
  if(aoi == btz){
      areaOfInterest = bt;
  }
  else if(aoi == yoz){
      areaOfInterest = yo;
  }
  else if (aoi == jkz){
      areaOfInterest = jk;
  }
  else if(aoi == jbz){
      areaOfInterest = jb;
  }
  else if(aoi == jtz){
      areaOfInterest = jt;
  }
    else if(aoi == jiz){
      areaOfInterest = ji;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//JAWA AREA FOR OPTION*****************************************************************************************************************
//SULAWESI AREA FOR OPTION***********************************************************************************************************
function genSelSulawesi (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selSulawesi.getValue();
  if(aoi == goz){
      areaOfInterest = go;
  }
    else if(aoi == srz){
      areaOfInterest = sr;
  }
  else if (aoi == snz){
      areaOfInterest = sn;
  }
  else if(aoi == stz){
      areaOfInterest = st;
  }
  else if(aoi == sgz){
      areaOfInterest = sg;
  }
  else if(aoi == saz){
      areaOfInterest = sa;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//SULAWESI AREA FOR OPTION***********************************************************************************************************
//PAPUA AREA FOR OPTION****************************************************************************************************************
function genSelPapua (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selPapua.getValue();
  if(aoi == pbz){
      areaOfInterest = pb;
  }
    else if(aoi == paz){
      areaOfInterest = pa;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//PAPUA AREA FOR OPTION*************************************************************************************************************
//MALUKU AND NUSA TENGGARA AREA FOR OPTION******************************************************************************************
function genSelMant (){
    applyFilter();
// Container function to create Image for mapping.
function applyFilter(){
function setAreaOfInterest(){
  aoi = selMant.getValue();
  if(aoi == baz){
      areaOfInterest = ba;
  }
  else if(aoi == maz){
      areaOfInterest = ma;
  }
  else if(aoi == muz){
      areaOfInterest = mu;
  }
    else if(aoi == nbz){
      areaOfInterest = nb;
  }
  else if (aoi == ntz){
      areaOfInterest = nt;
  }
}
setAreaOfInterest();
geometry = areaOfInterest;
}
var image = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
.clip(geometry);
peta.centerObject(geometry,7);
var treeCover = image.select('treecover2000');
var lossImage = image.select('loss');
var gainImage = image.select('gain');
var lossyear = image.select('lossyear');
// add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
peta.addLayer(forestcover, {palette: ['000000','00FF00'], max: 100}, 'Forest')
// add the loss layer in red
var loss = lossImage.updateMask(lossImage);
peta.addLayer(loss, {palette: ['FF0000']}, 'Forest Loss')
// add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
peta.addLayer(gain, {palette: ['0000FF']}, 'Forest Gain')
//making the chart
var years = ee.List.sequence(0,19)
var masking = years.map(function(a){
  var mask = image.eq(ee.Number(a)).selfMask()
  var h = mask.multiply(ee.Image.pixelArea())
  var cal = h.reduceRegion({
    reducer : ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e13
  })
  return mask.set('area',ee.Number(cal.get('lossyear')).multiply(0.0001))
             .set('year',ee.String(ee.Number(a).add(2000).toInt()))
})
var final_col = ee.ImageCollection.fromImages(masking);
var year2 = final_col.aggregate_array('year');
var area = final_col.aggregate_array('area');
var final_lists = ee.Dictionary.fromLists(year2,area);
//print(final_lists);
//chart
var chart = ui.Chart.array.values({
  array: final_lists.values(),
  axis: 0, 
  xLabels: final_lists.keys()
}).setChartType('ColumnChart')
// Set chart style properties.
var chartStyle = {
  title: 'Tree Loss per Year',
  hAxis: {
    title: 'Year',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'}
  },
  vAxis: {
    title: 'Tree Loss',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: '808080'},
    format: 'short',
    baselineColor: '808080'
  },
  colors: ['ff331f'],
};
chart.setOptions(chartStyle);
sidePanel.add(chart);
//create the title label
var title = ui.Label('Forest Change from 2000 to 2020');
title.style().set('position', 'top-center');
peta.add(title)
//add legend
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Forest Gain and Loss',
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
      backgroundColor: '#' + color,
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
var palette = ['00FF00','FF0000','0000FF'];
var names = ['Forest','Forest Loss','Forest Gain'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
peta.add(legend)
} 
//MALUKU AND NUSA TENGGARA AREA FOR OPTION******************************************************************************************
//*****************************************************************************************************
//*****************************************************************************************************
//var button = ui.Button({label:'Generate Data' , onClick:genselect});
//sidePanel.add(button);
var note = ui.Label({
  value: '*untuk pemilihan lokasi lain silahkan tekan tombol Reset Map terlebih dahulu',
  style: {'fontSize': '12px'}
});
//sidePanel.add(note);
var resetButton = ui.Button('Reset Data', reset);
//sidePanel.add(resetButton);
var peta = ui.Map();
var splitPanel = ui.SplitPanel({
  firstPanel: sidePanel,
  secondPanel: peta,
});
sidePanel.add(title);
sidePanel.add(subtitle);
sidePanel.add(selecttitle);
sidePanel.add(selSumatera);
sidePanel.add(selKalimantan);
sidePanel.add(selJawa);
sidePanel.add(selSulawesi);
sidePanel.add(selPapua);
sidePanel.add(selMant);
//sidePanel.add(ui.Panel([selSumatera, selKalimantan],ui.Panel.Layout.flow('horizontal')))
//sidePanel.add(ui.Panel([selJawa, selSulawesi],ui.Panel.Layout.flow('horizontal')))
//sidePanel.add(ui.Panel([selMant, selPapua],ui.Panel.Layout.flow('horizontal')))
//sidePanel.add(button);
sidePanel.add(note);
sidePanel.add(resetButton);
/*
var splitPanel = ui.SplitPanel({
  firstPanel: sidePanel,
  secondPanel: peta,
});
*/
ui.root.clear();
ui.root.add(splitPanel);
peta.centerObject(IND,5);
function reset(){
  peta.clear();
  sidePanel.clear();
  sidePanel.add(title);
  sidePanel.add(subtitle);
  sidePanel.add(selecttitle);
  sidePanel.add(selSumatera);
  sidePanel.add(selKalimantan);
  sidePanel.add(selJawa);
  sidePanel.add(selSulawesi);
  sidePanel.add(selPapua);
  sidePanel.add(selMant);
  //sidePanel.add(ui.Panel([selSumatera, selKalimantan],ui.Panel.Layout.flow('horizontal')))
  //sidePanel.add(ui.Panel([selJawa, selSulawesi],ui.Panel.Layout.flow('horizontal')))
  //sidePanel.add(ui.Panel([selMant, selPapua],ui.Panel.Layout.flow('horizontal')))
  sidePanel.add(note);
  sidePanel.add(resetButton);
  peta.centerObject(IND,5);
  ui.root.clear();
  ui.root.add(splitPanel);
}
/*
panel.add(changepanel)
  .add(ui.Panel([datasetRange_label2, datasetRange_label3],ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel([selectYr2, selectYr3],ui.Panel.Layout.flow('horizontal')))
  .add(GRMAP)
  .add(LGMAP);
*/