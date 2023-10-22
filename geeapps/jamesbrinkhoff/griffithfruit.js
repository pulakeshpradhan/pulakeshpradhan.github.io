var pt = ui.import && ui.import("pt", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            146.08022368166212,
            -34.32278599162306
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([146.08022368166212, -34.32278599162306]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/jamesbrinkhoff/LLS/vectors_2019-10-24_postClassify"
    }) || ee.FeatureCollection("users/jamesbrinkhoff/LLS/vectors_2019-10-24_postClassify"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/jamesbrinkhoff/LLS/Fourier/classified_2020-02-11_sniced_final_vectors"
    }) || ee.FeatureCollection("users/jamesbrinkhoff/LLS/Fourier/classified_2020-02-11_sniced_final_vectors"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/jamesbrinkhoff/LLS/nsw_perennial_geom"
    }) || ee.FeatureCollection("users/jamesbrinkhoff/LLS/nsw_perennial_geom"),
    s2 = ui.import && ui.import("s2", "image", {
      "id": "users/jamesbrinkhoff/LLS/sniced_2019-09-25_s40_c4_c4_r5_m2p5"
    }) || ee.Image("users/jamesbrinkhoff/LLS/sniced_2019-09-25_s40_c4_c4_r5_m2p5"),
    clipped = ui.import && ui.import("clipped", "image", {
      "id": "users/jamesbrinkhoff/LLS/classified_clipped_nsw"
    }) || ee.Image("users/jamesbrinkhoff/LLS/classified_clipped_nsw");
var nsw_per_geometry=table3.geometry(10);
Map.centerObject(pt,13);
Map.style().set('cursor', 'crosshair');
Map.setOptions('SATELLITE')
var date_now = ee.Date(Date.now()).format('yyyy-MM-dd','Australia/Sydney');
var crops=ee.List([
  "Almond",
  //"Apple", //deleted 2019-07-01
  "Cherry",
  "Citrus",
  "Forest",
  "Hazelnut", //added 2019-07-01
  "Mandarin", //added 2019-07-01
  "NonCrop",
  "Olive",
  "Prune",
  "Stonefruit",
  "Summer",
  "Vineyard",
  "Walnut",
  "Winter",
  "ClearSelection"
]);
var colors=[//see https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/
  "brown",
  //"green",
  "red",
  "orange",
  "olive",
  "chocolate",
  "orangered",
  "white",
  "black",
  "indigo",
  "peachpuff",
  "yellow",
  "purple",
  "grey",
  "cyan"
];
var classes = ee.List.sequence(0,colors.length-1);
classes = classes.add(0); //for ClearSelection
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor:  color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 1px 8px'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 1px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
var legend_panel = ui.Panel([],ui.Panel.Layout.Flow('vertical'));
var colors1=[//see https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/
  "brown",
  "red",
  "orange",
  "chocolate",
  "black",
  "indigo",
  "peachpuff",
  "purple",
  "grey"
];
var crops1=[
  "Almond",
  "Cherry",
  "Citrus",
  "Hazelnut", //added 2019-07-01
  "Olive",
  "Prune",
  "Stonefruit",
  "Vineyard",
  "Walnut",
];
for(var i=0; i<9; i++){
  legend_panel.add(makeRow(colors1[i],crops1[i]));
}
var fcs=ee.FeatureCollection([]);
fcs=table;
table=table.filterMetadata('crop','not_equals','Summer');
table=table.filterMetadata('crop','not_equals','Forest');
table=table.filterMetadata('crop','not_equals','Other');
/*s2 ic*/
var date_start = ee.Date('2018-05-01');
var months = ee.List.sequence(0,11);
var dates = months.map(function(adv){
  return date_start.advance(ee.Number(adv),'month').format('YYMM');
});
var clusters = s2.select('clusters');
var image_prep=function(image){
  /*var dates = myf.list_filter(image.bandNames(),'_','abc').map(function(string){
    return ee.String(string).split('_').get(1);
  }).distinct().removeAll(['mean','max','min']);*/
  var bands = ee.List(['b','g','r','nir','re','re74','re78','re86','swi1','swi2','ndvi','VV','VH']);
  var date_images = dates.map(function(date){
    date = ee.String(date);
    var bands_date = bands.map(function(band){
      band=ee.String(band);
      return band.cat('_').cat(date);
    })
    return ee.Image(image.select(bands_date,bands)).set('system:time_start',ee.Date.parse('YYMM',date));
  });
  var ic = ee.ImageCollection(date_images);
  ic = ic.filterDate('2018-05-01','2019-05-01');
  return ic;
}
var s2 = image_prep(s2).select('ndvi');
var s2_first = ee.Image(s2.first());
var min=0.3;
var ndvi_max = s2.select('ndvi').max();
//ndvi_max = ndvi_max=ndvi_max.clip(nsw_per_geometry);
Map.addLayer(ndvi_max,{min:min,max:0.7,palette:['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']},'Max annual NDVI',false);
table = table.map(function(feature){
  return feature.set('class',ee.Number(crops.indexOf(ee.String(feature.get('crop')))));
});
var newc = ee.Image().byte();
var outline1 = newc.paint({
  featureCollection: table,
  color: 'class'
});
Map.layers().set(1,ui.Map.Layer(outline1,{palette:colors,min:0,max:colors.length-1, opacity:0.7},'Unfiltered map',false));
var outline1a = clipped;//outline1.clip(nsw_per_geometry);
//Export.image.toAsset({image:outline1a, description:'a', assetId:'classified_clipped_nsw', region:s2_first.geometry(), scale:5, maxPixels:1e11});
Map.layers().set(2,ui.Map.Layer(outline1a,{palette:colors,min:0,max:colors.length-1, opacity:0.7},'Map filtered by NSW 2017 land use (ACLUMP)'));
//print(table.limit(10));
var paddock_select = function(coords)
{
  label1.setValue('Selected crop: calculating...');
  panel.widgets().set(2,ui.Label(''));
  pt = ee.Geometry.Point(coords.lon, coords.lat);
  if(ee.Number(pt.intersects(s2_first.geometry())).getInfo()==1){
    ee.Number(clusters.reduceRegion(ee.Reducer.median(), pt, 5).get('clusters')).evaluate(function(num){
      var cluster = ee.Number(num);
    var seg = clusters.updateMask(clusters.eq(cluster));
    //Map.layers().set(3,ui.Map.Layer(seg,{palette:['cyan']},'Selected area'));
    var chart_ts=ui.Chart.image.series(s2.select('ndvi'),pt,ee.Reducer.median());
    chart_ts.setOptions({title:'NDVI at clicked location',
                          hAxis:{title:'Date'},
                          vAxis:{title:'NDVI',minValue:0.0,maxValue:1.0},
                          type: 'line',
                          pointSize: 1
    });
    panel.widgets().set(2,chart_ts);
    var feat = table.filterBounds(pt);
    if(feat.size().getInfo()>0){
      feat=ee.Feature(feat.first());
      label1.setValue('Selected crop: '+feat.get('crop').getInfo());
    }
    else{
      label1.setValue('Selected crop: ');
    }});
  }
  else{
    label1.setValue('Selected crop: Outside study area.');
  }
}
var title = ui.Label('Perennial crop map',{fontSize:'16pt'});
var note = ui.Label('This map was generated as part of a collaborative pilot project between Riverina Local Land Services and the Applied Agricultural Remote Sensing Centre, University of New England. It uses machine learning methods and public satellite data. As with all real machine learning predictions, there are errors. Full accuracy assessment is described in the paper linked below.', {fontSize:'8pt'});
var label1 = ui.Label('Selected crop:');
var paper = ui.Label({value:'Paper on how this map was generated.',targetUrl:'https://www.mdpi.com/2072-4292/12/1/96'});
var chart = ui.Label('');
var contact = ui.Label({value:'Contact: james.brinkhoff@une.edu.au',style:{fontSize:'8pt'},targetUrl:'mailto:james.brinkhoff@une.edu.au&Subject:Riverina perennial crop map'});
var panel = ui.Panel({
  widgets: [title,label1,chart,legend_panel,note,paper,contact],//,select,label3,label4,url_button,url_label,contact],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-right',
    padding: '7px',
    width: '300px'
  }
});
Map.add(panel);
Map.onClick(paddock_select);
ee.Dictionary.fromLists(['lon','lat'], pt.coordinates()).getInfo(paddock_select);