var bog_conturs = ui.import && ui.import("bog_conturs", "table", {
      "id": "users/rusetskyserg/bog_conturs"
    }) || ee.FeatureCollection("users/rusetskyserg/bog_conturs"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    classimage = ui.import && ui.import("classimage", "image", {
      "id": "users/rusetskyserg/surfTypesElnia5lrs"
    }) || ee.Image("users/rusetskyserg/surfTypesElnia5lrs"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                27.870941162109375,
                55.5965509577771
              ],
              [
                27.826995849609375,
                55.578700455425434
              ],
              [
                27.835235595703125,
                55.570160388609644
              ],
              [
                27.809829711914062,
                55.55928852634634
              ],
              [
                27.774124145507812,
                55.56006518772237
              ],
              [
                27.740478515625,
                55.5495789637293
              ],
              [
                27.763137817382812,
                55.54452904304942
              ],
              [
                27.797470092773438,
                55.53908994138298
              ],
              [
                27.813262939453125,
                55.54258659311762
              ],
              [
                27.83111572265625,
                55.549190531324676
              ],
              [
                27.85308837890625,
                55.54763676331953
              ],
              [
                27.862014770507812,
                55.55928852634634
              ],
              [
                27.88055419921875,
                55.57443065417617
              ]
            ]
          ],
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[27.870941162109375, 55.5965509577771],
          [27.826995849609375, 55.578700455425434],
          [27.835235595703125, 55.570160388609644],
          [27.809829711914062, 55.55928852634634],
          [27.774124145507812, 55.56006518772237],
          [27.740478515625, 55.5495789637293],
          [27.763137817382812, 55.54452904304942],
          [27.797470092773438, 55.53908994138298],
          [27.813262939453125, 55.54258659311762],
          [27.83111572265625, 55.549190531324676],
          [27.85308837890625, 55.54763676331953],
          [27.862014770507812, 55.55928852634634],
          [27.88055419921875, 55.57443065417617]]]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                27.719879150390625,
                55.57368664195148
              ],
              [
                27.66082763671875,
                55.521634425882795
              ],
              [
                27.72674560546875,
                55.464063782234696
              ],
              [
                27.857208251953125,
                55.46017083861815
              ],
              [
                27.9437255859375,
                55.488191455802244
              ],
              [
                28.027496337890625,
                55.55970923563195
              ],
              [
                27.997283935546875,
                55.614037883021986
              ],
              [
                27.857208251953125,
                55.65899609942836
              ]
            ]
          ],
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[27.719879150390625, 55.57368664195148],
          [27.66082763671875, 55.521634425882795],
          [27.72674560546875, 55.464063782234696],
          [27.857208251953125, 55.46017083861815],
          [27.9437255859375, 55.488191455802244],
          [28.027496337890625, 55.55970923563195],
          [27.997283935546875, 55.614037883021986],
          [27.857208251953125, 55.65899609942836]]]);
Map.setCenter(28.2,55.5,10);
var year = new Date().getFullYear()
var obj=ee.List(['Болото Мох','Ельня','Стречно','Скураты','Долбенишки']);
var startday=ee.Date('2015-03-15').getRelative('day', 'year');
var endday=ee.Date('2016-09-15').getRelative('day', 'year');
var selcol=imageCollection.filterBounds(bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj))).filter(ee.Filter.calendarRange(startday, endday, 'day_of_year'))
                                                    // .filter(ee.Filter.calendarRange(2015, 2019, 'year'))
                                                    .filter(ee.Filter.calendarRange(2015, year, 'year'))
                                                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                                                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                                                    .filter(ee.Filter.eq('relativeOrbitNumber_start', 160))
                                                    //.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
                                                    .select('VH','VV','angle');
var bogmask=bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj)).reduceToImage(['GIDROL_ZAK'],ee.Reducer.min()).gte(0).rename('bog');
var coef_hl=ee.Image(ee.Array([[ 0.10222868, -0.11813487,  0.07286871,  0.06755589, -0.27541154,
         0.16375505,  0.30036568, -0.07772558,  0.21271415, -0.26428465,
        -0.17352451, -0.1769679 ,  0.18023401, -0.07001896, -0.04499891,
         0.10814395,  0.03276713],
       [ 0.13163359, -0.08926961,  0.20542428, -0.09420089,  0.16431977,
        -0.1155981 ,  0.28238402,  0.02474915,  0.05877493,  0.23914308,
        -0.0854891 , -0.17987772, -0.256391  , -0.06762967,  0.00979605,
        -0.25509094, -0.02001837],
       [-0.00645172, -0.28616991, -0.29436605, -0.0714941 ,  0.03282846,
         0.13500345,  0.06296616,  0.12777486,  0.00370917, -0.21197413,
        -0.23013189,  0.1753694 ,  0.01420119, -0.25204916,  0.11975832,
         0.004356  ,  0.21827606],
       [-0.15301171, -0.08929505, -0.01461148, -0.1200687 ,  0.35073363,
         0.13735608,  0.34593058, -0.28398095,  0.34874355, -0.06737168,
        -0.19843974, -0.22613307, -0.05485021,  0.29703518,  0.04104617,
         0.09427524,  0.00082865],
       [-0.23124364,  0.13941523, -0.18175223,  0.16669171, -0.0109816 ,
        -0.27625216, -0.00744256, -0.31767646,  0.14535146,  0.10963189,
        -0.01797974, -0.12113557,  0.20617425,  0.30372943, -0.25122471,
         0.36430284, -0.2300052 ],
       [-0.00819776, -0.00524446,  0.0873486 , -0.18152789,  0.12012473,
        -0.10908013, -0.12450243,  0.02128665,  0.04301654,  0.11802538,
         0.16781095,  0.12075904,  0.28331365,  0.04733488, -0.11653542,
         0.26691598, -0.31229728],
       [ 0.01602267, -0.29992846, -0.11724384, -0.1383389 ,  0.29644944,
        -0.08156466, -0.13773704, -0.24417442,  0.0776877 , -0.09615327,
         0.13918107, -0.25759885,  0.28817957,  0.22563502, -0.20565014,
         0.09607678, -0.07758742],
       [ 0.04355174,  0.04511032,  0.01970289, -0.10402676,  0.25942879,
        -0.01275848, -0.0635912 , -0.24492033,  0.04141147, -0.30043608,
        -0.0791604 , -0.07952524, -0.11687318,  0.02781198,  0.10281759,
        -0.12323838, -0.28712772]]).transpose());
var coef_ol=ee.Image(ee.Array([[-0.14806666], [ 0.03297823], [ 0.27218764], [ 0.17401006], [ 0.08688305],
                              [-0.01814177], [ 0.4152546 ], [-0.15808432], [ 0.28622864], [ 0.02794121],
                              [-0.15815196], [ 0.0398999 ], [ 0.18583303], [ 0.16756324], [-0.07403152],
                              [ 0.30129477], [-0.20843406]]).transpose());
var bias_hide=ee.Image(ee.Array([[0.0807214], [0.2445351], [-0.12402774], [0.29045076], [-0.0154958], [0.06238172],
                                [-0.05857084], [0.13910749], [-0.05159755], [-0.13746297], [0.15698045], [-0.0060975],
                                [0.25942958], [0.14761953], [-0.27242016], [0.2452903], [0.01135594]]));
var bias_out=ee.Image(0.01718593);
var mean=ee.Array([[-17.64404063, -11.27421116, 42.57851314, 0,0,0,0,0]]).transpose();
var std=ee.Array([[2.469139047, 1.668497209, 2.25090325, 1,1,1,1,1]]).transpose();
//полигон сцены
var getboundbox=function(image){
  return ee.Geometry.Polygon(ee.Geometry(image.get('system:footprint')).coordinates());
};
var getinput=function(image){
  var day=ee.Image(image.date().getRelative('day', 'year'))
                                .subtract(ee.Image(ee.Date('2015-05-01')
                                .getRelative('day', 'year')))
                                .rename('day').toInt();
  var updmask=ee.FeatureCollection(ee.Feature(getboundbox(image),{'prop1':1})).reduceToImage(['prop1'],ee.Reducer.min());
  var composite=image.addBands(classimage).mask(bogmask);//.addBands(day).mask(bogmask);
  var arr=ee.Image(composite.toArray().toArray(1));
  var norminp=(arr.subtract(ee.Image(mean)).divide(ee.Image(std))).updateMask(updmask);
  var hl=coef_hl.matrixMultiply(norminp).add(bias_hide);
  var loghl=ee.Image(1).divide(ee.Image(1).add(hl.multiply(-1).exp()));
  var waternull=classimage.select('class1').lt(0.5);
  var wetness=ee.Image(-1).add(
              coef_ol.matrixMultiply(loghl).arrayProject([0]).arrayFlatten([['wetness']]).add(bias_out))
                .multiply(waternull)
                .add(1)
                .rename('humid');
  var pojop=((ee.Image(8.5).subtract(ee.Image(0.14).multiply(wetness.multiply(100)))).exp().divide(
              ee.Image(1).add((ee.Image(8.5).subtract(ee.Image(0.14).multiply(wetness.multiply(100)))).exp())).rename('pojop'))
              .multiply(waternull);
  return wetness.addBands(pojop).set('system:time_start',image.get('system:time_start'));
};
var fcol=selcol.map(getinput).map(function(image){return image.updateMask(classimage.select('class1').lt(0.5))});
/*
var humTimeSeries=ui.Chart.image.seriesByRegion(fcol, bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj)), ee.Reducer.mean(), 'humid', 30, 'system:time_start', 'NAIM_MEST')
                    .setOptions({title: 'Динамика влажности'});
var pojTimeSeries=ui.Chart.image.seriesByRegion(fcol, bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj)), ee.Reducer.mean(), 'pojop', 30, 'system:time_start', 'NAIM_MEST')
                    .setOptions({title: 'Динамика пожарной опасности'});
*/
//--------------------- Create the panel for the legend items.
var palette=['ff1004', 'ff9108', 'e3ff0b', '06ca15', '0618ff'];
var names = ['<0.5', '0.6', '0.7', '0.8', '>0.9'];
var humvizualise={
  bands: ["humid"],
  min:0.5,
  max:0.9,
  palette: palette
};
var legend = ui.Panel({
  style: {
    position: 'top-left',
    margin: '20px',
    padding: '20px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Влажность',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
// Create an empty panel in which to arrange widgets.
var panel = ui.Panel({style: {width: '800px'}})
    .add(ui.Label('выбирай'));
// var yearslist = {'2015': 2015,'2016': 2016,'2017':2017,'2018':2018,'2019':2019};
var vals = [];
for (var i = 2015; i <= year; ++i) vals.push(i);
var keys=vals.map(String);
var yearslist = {};
for(var i = 0; i < vals.length; i++)
{
    yearslist[keys[i]] = vals[i];
}
var selectdate = ui.Select({
  placeholder: 'дата',
  onChange: function() {
    Map.clear();
    var imageId = selectdate.getValue();
    var std=ee.Date(imageId);
    var endd=std.advance(23, 'hour');
    var dr=ee.DateRange(std,endd);
    if (imageId) {
      // If an image id is found, create an image.
      var image = fcol.filterDate(dr).mean().focal_mean(2);
      // Add the image to the map with the corresponding visualization options.
      Map.addLayer(image, humvizualise, imageId);
      Map.add(legend);}
  }
});
var selectyear = ui.Select({
  items: Object.keys(yearslist),
  onChange: function(key) {
    var y=yearslist[key];
    var fcoll=fcol.filter(ee.Filter.calendarRange(y, y, 'year'));
    var humTimeSeries=ui.Chart.image.seriesByRegion(fcoll, bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj)), ee.Reducer.mean(), 'humid', 30, 'system:time_start', 'NAIM_MEST')
                    .setOptions({title: 'Динамика влажности'});
    panel.widgets().set(3, humTimeSeries);
    var pojTimeSeries=ui.Chart.image.seriesByRegion(fcoll, bog_conturs.filter(ee.Filter.inList('NAIM_MEST',obj)), ee.Reducer.mean(), 'pojop', 30, 'system:time_start', 'NAIM_MEST')
                    .setOptions({title: 'Динамика пожарной опасности'});
    panel.widgets().set(4, pojTimeSeries);
    // Get the list of computed ids.
    var computedIds = ee.List(ee.List(fcoll.reduceColumns(ee.Reducer.toList(), ['system:time_start']).get('list'))
                                        .map(function(item){return ee.Date(item).format('YYYY-MM-dd')})
                                        .sort()
                                        .iterate(function(item, lst){
                                                  return ee.Algorithms.If(ee.List(lst).contains(item), lst, ee.List(lst).add(item));
                                                }, ee.List([])));
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      selectdate.items().reset(ids);
      // Default the image picker to the first id.
      selectdate.setValue(selectdate.items().get(0));
    });
  }
});
// Set a place holder.
selectyear.setPlaceholder('выбери год');
panel.add(selectyear);
panel.add(selectdate);
ui.root.add(panel);