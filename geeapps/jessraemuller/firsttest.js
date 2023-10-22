var bands = ui.import && ui.import("bands", "imageVisParam", {
      "params": {
        "bands": [
          "b1",
          "b2",
          "b3"
        ]
      }
    }) || {"bands":["b1","b2","b3"]},
    MineBoundary = ui.import && ui.import("MineBoundary", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              28.89317919573936,
              -24.01874037732517
            ],
            [
              28.895013826705547,
              -24.01941656530768
            ],
            [
              28.895550268508526,
              -24.019710558973472
            ],
            [
              28.89616181216392,
              -24.019749758078117
            ],
            [
              28.898157375671,
              -24.020514138229935
            ],
            [
              28.90039970240745,
              -24.02103352215022
            ],
            [
              28.90140821299705,
              -24.02111191954085
            ],
            [
              28.902556198455425,
              -24.021337311772538
            ],
            [
              28.904047506667705,
              -24.021464707206963
            ],
            [
              28.905495899535747,
              -24.021454907562646
            ],
            [
              28.90538861117515,
              -24.022474066570986
            ],
            [
              28.90567828974876,
              -24.023013041626374
            ],
            [
              28.906236189223858,
              -24.023454019536313
            ],
            [
              28.90740563235435,
              -24.02411058384376
            ],
            [
              28.90968014559898,
              -24.024884737450233
            ],
            [
              28.91093541941795,
              -24.025384505023418
            ],
            [
              28.911300199843975,
              -24.025511896446975
            ],
            [
              28.912576931335064,
              -24.025560893114722
            ],
            [
              28.913263576842876,
              -24.025511896446975
            ],
            [
              28.914604681350323,
              -24.025394304368177
            ],
            [
              28.916074531890484,
              -24.025345307636922
            ],
            [
              28.917834061004253,
              -24.025266912828076
            ],
            [
              28.91988326869163,
              -24.025325708939192
            ],
            [
              28.92062355837974,
              -24.025384505023418
            ],
            [
              28.922254341460796,
              -24.02443396503122
            ],
            [
              28.92386366686973,
              -24.023434420550217
            ],
            [
              28.92516185603294,
              -24.02241526915551
            ],
            [
              28.92515112719688,
              -24.02198408728698
            ],
            [
              28.924979465819927,
              -24.02160190214901
            ],
            [
              28.92488290629539,
              -24.02143530827177
            ],
            [
              28.925354975082012,
              -24.0215235050572
            ],
            [
              28.925601738311382,
              -24.021298113151936
            ],
            [
              28.925773399688335,
              -24.02082772877242
            ],
            [
              28.92590214572105,
              -24.019896754614106
            ],
            [
              28.926717537261577,
              -24.01945576450197
            ],
            [
              28.927071588851543,
              -24.019093171498863
            ],
            [
              28.92762948832664,
              -24.018642378771794
            ],
            [
              28.928294676162334,
              -24.01835818254462
            ],
            [
              28.928756016112896,
              -24.017868187574308
            ],
            [
              28.929117472124737,
              -24.017018628476507
            ],
            [
              28.929439337206524,
              -24.016273827624552
            ],
            [
              28.929675371599835,
              -24.015774024634098
            ],
            [
              28.929739744616192,
              -24.015254619468003
            ],
            [
              28.930201084566754,
              -24.01504881684076
            ],
            [
              28.9305336784846,
              -24.0145490090891
            ],
            [
              28.930683882189435,
              -24.0141374012468
            ],
            [
              28.93129542584483,
              -24.01336318292638
            ],
            [
              28.931713850451153,
              -24.013039773893443
            ],
            [
              28.932121546221417,
              -24.012549758657567
            ],
            [
              28.931692392779034,
              -24.01205974155473
            ],
            [
              28.931713850451153,
              -24.010736686051743
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "system:index": "0"
      },
      "color": "#0000ff",
      "mode": "Feature",
      "shown": true,
      "locked": true
    }) || 
    /* color: #0000ff */
    /* locked: true */
    ee.Feature(
        ee.Geometry.LineString(
            [[28.89317919573936, -24.01874037732517],
             [28.895013826705547, -24.01941656530768],
             [28.895550268508526, -24.019710558973472],
             [28.89616181216392, -24.019749758078117],
             [28.898157375671, -24.020514138229935],
             [28.90039970240745, -24.02103352215022],
             [28.90140821299705, -24.02111191954085],
             [28.902556198455425, -24.021337311772538],
             [28.904047506667705, -24.021464707206963],
             [28.905495899535747, -24.021454907562646],
             [28.90538861117515, -24.022474066570986],
             [28.90567828974876, -24.023013041626374],
             [28.906236189223858, -24.023454019536313],
             [28.90740563235435, -24.02411058384376],
             [28.90968014559898, -24.024884737450233],
             [28.91093541941795, -24.025384505023418],
             [28.911300199843975, -24.025511896446975],
             [28.912576931335064, -24.025560893114722],
             [28.913263576842876, -24.025511896446975],
             [28.914604681350323, -24.025394304368177],
             [28.916074531890484, -24.025345307636922],
             [28.917834061004253, -24.025266912828076],
             [28.91988326869163, -24.025325708939192],
             [28.92062355837974, -24.025384505023418],
             [28.922254341460796, -24.02443396503122],
             [28.92386366686973, -24.023434420550217],
             [28.92516185603294, -24.02241526915551],
             [28.92515112719688, -24.02198408728698],
             [28.924979465819927, -24.02160190214901],
             [28.92488290629539, -24.02143530827177],
             [28.925354975082012, -24.0215235050572],
             [28.925601738311382, -24.021298113151936],
             [28.925773399688335, -24.02082772877242],
             [28.92590214572105, -24.019896754614106],
             [28.926717537261577, -24.01945576450197],
             [28.927071588851543, -24.019093171498863],
             [28.92762948832664, -24.018642378771794],
             [28.928294676162334, -24.01835818254462],
             [28.928756016112896, -24.017868187574308],
             [28.929117472124737, -24.017018628476507],
             [28.929439337206524, -24.016273827624552],
             [28.929675371599835, -24.015774024634098],
             [28.929739744616192, -24.015254619468003],
             [28.930201084566754, -24.01504881684076],
             [28.9305336784846, -24.0145490090891],
             [28.930683882189435, -24.0141374012468],
             [28.93129542584483, -24.01336318292638],
             [28.931713850451153, -24.013039773893443],
             [28.932121546221417, -24.012549758657567],
             [28.931692392779034, -24.01205974155473],
             [28.931713850451153, -24.010736686051743]]),
        {
          "system:index": "0"
        }),
    InfoLayer = ui.import && ui.import("InfoLayer", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    image = ui.import && ui.import("image", "image", {
      "id": "users/jessraemuller/June21"
    }) || ee.Image("users/jessraemuller/June21"),
    land = ui.import && ui.import("land", "table", {
      "id": "users/jessraemuller/June_21"
    }) || ee.FeatureCollection("users/jessraemuller/June_21");
Map.centerObject(land, 13);
Map.setControlVisibility(true, false);
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('baseChange', {'baseChange': baseChange});
//Image Layer
var aerialimage = ui.Checkbox({
  label: 'Show Aerial Image', 
  value: true, 
  style: {backgroundColor: '949494', fontWeight: '500'}
  });
aerialimage.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(image, bands, 'June 2021');
//Developed Layer
var devparcels = ui.Checkbox({
  label: 'Show Developed Land', 
  value: true, 
  style: {backgroundColor: '949494', fontWeight: '500'}
  });
devparcels.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
var dev = land.filter(ee.Filter.eq('Features', 'DEVELOPED'));
Map.addLayer(dev, {color: 'FF0000'}, 'Developed');
//Vacant Layer
var vacparcels = ui.Checkbox({
  label: 'Show Vacant Land', 
  value: true, 
  style: {backgroundColor: '949494', fontWeight: '500'}
  });
vacparcels.onChange(function(checked) {
  Map.layers().get(2).setShown(checked);
});
var vac = land.filter(ee.Filter.eq('Features', 'VACANT'));
Map.addLayer(vac, {color: '21f600'}, 'Vacant');
//Distance Layer
var distances = function(features) {
  var distance = features.distance(MineBoundary);
  return features.set('distance', distance);
}
var landDist = land.map(distances);
landDist = landDist.select('distance');
var landDistances = ui.Checkbox({
  label: 'Show Mine Distance', 
  value: false, 
  style: {backgroundColor: '949494', fontWeight: '500'}
  });
landDistances.onChange(function(checked) {
  Map.layers().get(3).setShown(checked);
});
var viz = {
  min:400, 
  max:6000, 
  palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff'],
};
var distImage = landDist.reduceToImage(['distance'], ee.Reducer.first());
Map.addLayer(distImage, viz, 'Distance', false);
//Selection Layer
var selection = land;
var layer = ui.Map.Layer(selection);
//Select Town 
var gamapela = land.filter(ee.Filter.eq('Town', 'GA-MAPELA'));
var gamokaba = land.filter(ee.Filter.eq('Town', 'GA-MOKABA'));
var inform = land.filter(ee.Filter.eq('Town', 'INFORMAL ACTIVITY'));
var places = {
  'Ga-Mapela': [gamapela],
  'Ga-Mokaba': [gamokaba],
  'Informal Activity': [inform]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    select.setValue(null, false);
    selection = selection.filter(ee.Filter.eq('Features', 'EMPTY'));
    selection = selection.merge(places[key][0]);
    Map.remove(layer);
    layer = Map.addLayer(selection, {color: 'yellow'}, false);
    panel.clear();
    refresh();
  }
});
select.setPlaceholder('Filter by Town');
//Select Year
var year18 = land.filter(ee.Filter.eq('Year', 2018));
var year19 = land.filter(ee.Filter.eq('Year', 2019));
var year20 = land.filter(ee.Filter.eq('Year', 2020));
var year21 = land.filter(ee.Filter.eq('Year', 2021));
var years = {
  '2018': [year18],
  '2019': [year19],
  '2020': [year20],
  '2021': [year21]
};
var selectyear = ui.Select({
  items: Object.keys(years),
  placeholder: 'Filter by Year',
  onChange: function(key) {
    selectyear.setValue(null, false);
    selection = selection.filter(ee.Filter.eq('Features', 'EMPTY'));
    selection = selection.merge(years[key][0]);
    Map.remove(layer);
    layer = Map.addLayer(selection, {color: 'yellow'}, false);
    panel.clear();
    refresh();
  }
});
//Developed Pie Chart
var developedPie = function(){
  var datatable = ee.List([
    ee.Number(selection.filter(ee.Filter.eq('Features', 'DEVELOPED')).size()), 
    ee.Number(selection.filter(ee.Filter.eq('Features', 'VACANT')).size())
    ]);
  var labels = ee.List(['Developed', 'Vacant']);
  var chart = ui.Chart.array.values(datatable, 0, labels);
  chart.setChartType('PieChart');
  chart.setOptions({
    width: 600,
    height: 200,
    title: 'Developed or Vacant Land',
    colors: ['FF0000', '21f600'],
    is3D: true,
    backgroundColor: '707070',
    fontsize: 20
  });
  panel.add(chart);
};
//Clear button
var clear = ui.Button({
  label: 'Clear Selection',
  onClick: function() {
    Map.remove(layer);
    Map.setControlVisibility(true, false);
    select.setValue(null, false);
    selection = land;
    panel.clear();
    refresh();
  }
});
//Developed Label
var devcountlabel = function() {
  var developed = selection.filter(ee.Filter.eq('Features', 'DEVELOPED'));
  var developedcount = developed.size();
  var number = ee.Number(developedcount);
  var developedlabel = ui.Label({
  value: 'Developed count: ' + number.getInfo(), 
  style: {padding: '0px', backgroundColor: '949494', fontWeight: '500', position: 'bottom-left'},
  });
  panel.add(developedlabel);
}
//Vacant Label
var vaccountlabel = function() {
  var vacant = selection.filter(ee.Filter.eq('Features', 'VACANT'));
  var vacantcount = vacant.size();
  var number = ee.Number(vacantcount);
  var vacantlabel = ui.Label({
  value: 'Vacant count: ' + number.getInfo(), 
  style: {padding: '0px',backgroundColor: '949494', fontWeight: '500', position: 'bottom-left'},
  });
  panel.add(vacantlabel);
}
// //Distance Legend Panel
// var distPanel = ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical'),
//   style: {width: '100px'}
// });
// var distLabel = ui.Label('Distance (m)');
// distPanel.add(distLabel);
// // create the legend image
// var lon = ee.Image.pixelLonLat().select('latitude');
// var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
// var legendImage = gradient.visualize(viz);
// // create thumbnail from the image
// var thumbnail = ui.Thumbnail({
// image: legendImage,
// params: {bbox:'0,0,10,100', dimensions:'10x200'},
// style: {padding: '1px', position: 'bottom-center'}
// });
// // add the thumbnail to the legend
// distPanel.add(thumbnail);
//Panel
var panel = ui.Panel({
  style: {width: '300px', position: 'top-left', backgroundColor: '949494'}
});
Map.add(panel);
var layerpanel = ui.Panel({
  style: {width: '200px', position: 'top-right', backgroundColor: '949494'}
});
var llabel = ui.Label({
  value: 'Layers', 
  style: {backgroundColor: '949494', fontWeight: '1000'}
  });
Map.add(layerpanel);
var filterpanel = ui.Panel({
  style: {width: '150px', position: 'bottom-right', backgroundColor: '949494'}
});
var fplabel = ui.Label({
  value: 'Filters', 
  style: {backgroundColor: '949494', fontWeight: '1000'}
  });
Map.add(filterpanel);
//Refresh Panel
var refresh = function() {
  layerpanel.clear();
  layerpanel.add(llabel);
  layerpanel.add(aerialimage);
  layerpanel.add(devparcels);
  layerpanel.add(vacparcels);
  layerpanel.add(landDistances);
  panel.clear();
  devcountlabel();
  vaccountlabel();
  developedPie();
  filterpanel.clear();
  filterpanel.add(fplabel);
  filterpanel.add(select);
  filterpanel.add(selectyear);
  filterpanel.add(clear);
}
refresh();