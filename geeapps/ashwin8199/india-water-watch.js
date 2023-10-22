var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// app code for water watch  of lakes in INDIA (in progress)
///////////Add Assets -- wetland shape file//////////////
var table = ee.FeatureCollection("users/ashwin8199/color/final_wetlands");
///////////////////Plot Wetlands/////////////////////
Map.setCenter(77,22,5);
Map.onChangeBounds(plotwet);
function plotwet(){
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  }
};
removeLayer('WetLands');
var zom=Map.getZoom();
var extn=Map.getBounds();
var areaz = ee.Number(zom).pow(-9).multiply(60000000000);
var extge=ee.Geometry.Rectangle(extn);
var areafeature = table.filterMetadata('AREAHA','greater_than',areaz).filterBounds(extge);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: areafeature,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '000000'}, 'WetLands');
}
/////////////////////////////////////
/////////// Map panel ///////////////
/////////////////////////////////////
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
 drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
 // label for data used
 function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {marker: '📍'}
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: symbol.marker + ' Marker',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('1. Place the marker in a Wetland.'),
    ui.Label('2. Set the date range.'),
    ui.Label('3. Click the button for plot.'),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
var inspector1 = ui.Panel({
  widgets: [ui.Label('Name: '),
            ui.Label('Description: ')
            ],
  style: {position: 'bottom-right'}
});
Map.add(inspector1);  
drawingTools.onDraw(ui.util.debounce(geoProg, 500));
drawingTools.onEdit(ui.util.debounce(geoProg, 500));
/////////////////////////////////////
/////////// Input panel /////////////
/////////////////////////////////////
var panel = ui.Panel();
panel.style().set({width: '30%', position: 'bottom-right'});
ui.root.add(panel);
// app title
var header = ui.Label('Indian Wetland Monitoring System', 
    {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// app Author
var Author = ui.Label('Land Hydrology Division (LHD), SAC');
// app Summary
var text = ui.Label(
  'This Google earth engine app is devloped to study long term changes in wetland ecosystem using multiple water parameters.',
    {fontSize: '15px'});
// create Head panel
var Hpanel = ui.Panel({
  widgets:[header,Author,text],//Adds header and text
  });
var header1 = ui.Label('Select water parameter', 
    { fontWeight: 'bold'});
var firstname_select = ui.Select({
  items: [{label:'Water Extent', value:'Area (ha)'}, {label:'Chlorophyll-a', value:'Chl-a (ug/l)'}, {label:'SSC', value:'SSC'},
  {label:'CDOM absorption', value:'CDOM @ 440'}, {label:'Water Color', value:'Wavelength(nm)'}, {label:'Temperature', value:'Temp(C)'},
  {label:'Precipitation', value:'TP (m)'}, {label:'Diffuse Attenuation Coefficient', value:'Kd(490)'}],
  onChange: function() {
    if (firstname_select.getValue() === 'Area (ha)'){
      secondname_select = ui.Select({
        items: [
        {label:'CFMASK algorithm', value:'WE1'}, {label:'Otsu algorithm', value:'WE2'}, {label:'Gujrati and Jha (2019) ', value:'WE3'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'Chl-a (ug/l)'){
      secondname_select = ui.Select({
        items: [
        {label:'Chen et al (2017)', value:'B1'}, {label:'Sun et al (2015)', value:'B2'}, {label:'Jaelani et al (2016)', value:'B3'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'CDOM @ 440'){
      secondname_select = ui.Select({
        items: [
        {label:'Chen et al (2017)', value:'D1'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'Kd(490)'){
      secondname_select = ui.Select({
        items: [
        {label:'Zheng et al (2016)', value:'KD1'},{label:'Wang et al (2009)', value:'KD2'},
        {label:'Kratzer et al (2008)', value:'KD3'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'TP (m)'){
      secondname_select = ui.Select({
        items: [
        {label:'ERA-5', value:'TP1'},{label:'GPM', value:'TP2'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'Wavelength(nm)'){
      secondname_select = ui.Select({
        items: [
        {label:'True Color', value:'WC1'}, {label:'Apparent color', value:'WC2'}],
        onChange: function() {
        }
      });
    }
    if (firstname_select.getValue() === 'SSC'){
      secondname_select = ui.Select({
        items: [
        {label:'Yepez et al (2017)', value:'C1'}, {label:'Pham et al (2018)-a', value:'C2'}, {label:'Pham et al (2018)-b', value:'C3'},
        {label:'Najib et al (2021)', value:'C4'}, {label:'Jally et al (2021)', value:'C5'}],
        onChange: function() {
        }
      });
    } 
    if (firstname_select.getValue() === 'Temp(C)'){
      secondname_select = ui.Select({
        items: [
        {label:'Tera 8 day 1km', value:'TE1'}, {label:'Aqua 8 day 1km', value:'TE2'}],
        onChange: function() {
        }
      });
    }
    panel.widgets().set(4, secondname_select);
  }
  });
var header2 = ui.Label('Select retrieval algorithm', 
    { fontWeight: 'bold'});    
var secondname_select = ui.Select();
// Panel for satellite data selection
var sat_hrd = ui.Panel(ui.Label('Check satellite data',{ fontWeight: 'bold'}));
var checkbox5 = ui.Checkbox('Landsat-5', false);
var checkbox7 = ui.Checkbox('Landsat-7', false);
var checkbox8 = ui.Checkbox('Landsat-8', false);
// checkbox8.onChange(function(checked) {
//   if (checked) 
//     {var prodL8 = prod8 }
//   else 
//     {prodL8 = ee.ImageCollection([]);}
// return prodL8;
// });
var sat_panel = ui.Panel({
          widgets: [checkbox5, checkbox7, checkbox8],
          layout: ui.Panel.Layout.Flow('horizontal'),
        }); 
// panel for data date range
var Daterange = ui.Panel(ui.Label('Enter date range',{fontWeight: 'bold'}));
var startyear=ui.Textbox({
  placeholder: 'Enter Start Year...',
  style: {stretch: 'horizontal'}
});
var endyear=ui.Textbox({
  placeholder: 'Enter End Year...',
  style: {stretch: 'horizontal'}
});
var yearPanel = ui.Panel({
          widgets: [startyear, endyear],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
var startmonth=ui.Textbox({
  placeholder: 'Enter Start Month...',
  style: {stretch: 'horizontal'}
});
var endmonth=ui.Textbox({
  placeholder: 'Enter End Month...',
  style: {stretch: 'horizontal'}
});
var monthPanel = ui.Panel({
          widgets: [startmonth, endmonth],
          layout: ui.Panel.Layout.Flow('horizontal'),
        });
var getvalue = ui.Button({
  label: 'Time Series',
  onClick: main_function
});
panel.widgets().set(1, Hpanel);
panel.widgets().set(2, header1);
panel.widgets().set(3, firstname_select);
panel.widgets().set(4, header2);
panel.widgets().set(5, secondname_select);
panel.widgets().set(6, sat_hrd);
panel.widgets().set(7, sat_panel);
panel.widgets().set(8, Daterange);
panel.widgets().set(9, yearPanel);
panel.widgets().set(10, monthPanel);
panel.widgets().set(11, getvalue);
var chartPanel = ui.Panel({
  style:{position: 'bottom-right', shown: false}
});
panel.add(chartPanel);
/////////////////// Global variables////////////////
var first_year, last_year,table, first_month, last_month, geometry, wetland,startDate, endDate;
///////////////////////////////////
/////////// functions /////////////
///////////////////////////////////
function geoProg(){
var geometry = drawingTools.layers().get(0).getEeObject();
return geometry;
}
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
function Algo_SSC_C1(image) {
  var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  return image.addBands(image.select('B5').multiply(.133512).subtract(2.9385 ).rename('output_var'));
}
function Algo_SSC_C2(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var ssc = image.expression(
    '2.73 * (2.718 ** (3.11*(b4/b3)))', {
      'b4': image.select('B4'),
      'b3': image.select('B3')
});
  return image.addBands(ssc.rename('output_var'));
}
function Algo_SSC_C3(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var ssc = image.expression(
    '4.24 * (2.718 ** (2.53*((b4+b5)/b3)))', {
      'b5': image.select('B5'),
      'b4': image.select('B4'),
      'b3': image.select('B3')
});
  return image.addBands(ssc.rename('output_var'));
}
function Algo_SSC_C4(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var ssc = image.expression(
    'b6*.0001 * (564.68 * (b3/b5) - 381.98)', {
      'b5': image.select('B5'),
      'b6': image.select('B6'),
      'b3': image.select('B3')
});
  return image.addBands(ssc.rename('output_var'));
}
function Algo_SSC_C5(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var ssc = image.expression(
    '1.46642 * log10(0.01*(b3+b4))*((b2/b3)**-0.5) + 3.4163', {
      'b4': image.select('B4'),
      'b2': image.select('B2'),
      'b3': image.select('B3')
});
  return image.addBands(ssc.rename('output_var'));
}
function Algo_CHl_B1(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '25.985 * ((b5/b4)**3.117)', {
      'b4': image.select('B4'),
      'b5': image.select('B5')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_CHl_B2(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '3.134+.5636315*b1-1.0816193*b2+.6071622*b3-1.1010068*b4+1.0878736*b5+.4838647*b6-.6863896*b7', {
      'b1': image.select('B1'),'b2': image.select('B2'),'b3': image.select('B3'),
      'b4': image.select('B4'),'b5': image.select('B5'),'b6': image.select('B6'),'b7': image.select('B7')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_CHl_B3(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '10**(1.613*(log10((b2*0.0001))/log10((b4*0.0001)))+1.0718)', {
      'b2': image.select('B2'),
      'b4': image.select('B4')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_CDOM_D1(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '22.283 * (2.718**(-1.725*(b3/b5)))', {
      'b3': image.select('B3'),
      'b5': image.select('B5')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_KD490_KD1(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '2.486 * log(b5/b3) + 8.81', {
      'b3': image.select('B3'),
      'b5': image.select('B5')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_KD490_KD2(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '4.7424 * (b4/b2) - 3.7591', {
      'b2': image.select('B2'),
      'b4': image.select('B4')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_KD490_KD3(image) {
var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  var Chl = image.expression(
    '(2.718**(-0.71*log(b2/(0.5*b3+0.5*b4)))) + 9.2566', {
      'b2': image.select('B2'),'b3': image.select('B3'),
      'b4': image.select('B4')
});
  return image.addBands(Chl.rename('output_var'));
}
function Algo_WE_otsu(image){
  var otsu = function(histogram) {
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
          bCount.multiply(bMean.subtract(mean).pow(2)));
  });
  return means.sort(bss).get([-1]);
};
  var mndwi = image.normalizedDifference(['B3', 'B6']).rename('mndwi');
  var histogram = mndwi.reduceRegion({
  reducer: ee.Reducer.histogram(255),
  scale: 30,
  bestEffort: true});
  var threshold=otsu(histogram.get('mndwi'));
  var mask = mndwi.gt(threshold);
  image=image.updateMask(mask);
  return image.addBands(image.select(['B1']).gt(0).multiply(ee.Image.pixelArea()).divide(10000).rename('output_var'));
}
function Algo_L8_WE_pixelqa(image){
  var mask = image.select(['pixel_qa']).eq(324).or(image.select(['pixel_qa']).eq(388));
  image=image.updateMask(mask);
  return image.addBands(image.select(['B1']).gt(0).multiply(ee.Image.pixelArea()).divide(10000).rename('output_var'));
}
function Algo_L57_WE_pixelqa(image){
  var mask = image.select(['pixel_qa']).eq(68);
  image=image.updateMask(mask);
  return image.addBands(image.select(['B1']).gt(0).multiply(ee.Image.pixelArea()).divide(10000).rename('output_var'));
}
function Algo_WE_GJ(image){
  var mndwi = image.normalizedDifference(['B3', 'B6']).rename('mndwi');
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('ndvi');
  var mask = ndvi.lt(0).and(mndwi.gt(0));
  image=image.updateMask(mask);
  return image.addBands(image.select(['B1']).gt(0).multiply(ee.Image.pixelArea()).divide(10000).rename('output_var'));
}
function Algo_L57_Tcolor(image){
var mask = image.select(['pixel_qa']).eq(68);
image = image.updateMask(mask);
image =  image.addBands(image.multiply(0.0001));
image =  image.addBands(((image.select('B1_1').multiply(13.104))
                     .add(image.select('B2_1').multiply(53.791))
                     .add(image.select('B3_1').multiply(31.304))).rename('CIEX'));
image = image.addBands(((image.select('B1_1').multiply(24.097))
                     .add(image.select('B2_1').multiply(65.801))
                     .add(image.select('B3_1').multiply(15.883))).rename('CIEY'));
image =  image.addBands(((image.select('B1_1').multiply(63.845))
                     .add(image.select('B2_1').multiply( 2.142))
                     .add(image.select('B3_1').multiply( 0.013))).rename('CIEZ'));
image =  image.addBands((image.select('CIEX').divide(image.select('CIEX').add(image.select('CIEY'))
  .add(image.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));
image =  image.addBands((image.select('CIEY').divide(image.select('CIEX').add(image.select('CIEY'))
  .add(image.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));
image =  image.addBands((((image.select('CIEx').atan2(image.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));
image =  image.addBands((image.select('Hue').divide(100)).rename('Huer'));
image =  image.addBands((image.select('Hue').add((image.select('Huer').pow(5).multiply(-84.94))
                                            .add(image.select('Huer').pow(4).multiply(594.17))
                                            .add(image.select('Huer').pow(3).multiply(-1559.86))
                                            .add(image.select('Huer').pow(2).multiply(1852.5))
                                            .add(image.select('Huer').multiply(-918.11))
                                            .add(151.49))).rename('HueC'));
return image.addBands(((image.select('HueC').multiply(-0.6067)).add(602.6)).rename('output_var'));
}
function Algo_L8_Tcolor(data){
var mask = data.select(['pixel_qa']).eq(324).or(data.select(['pixel_qa']).eq(388));
data = data.updateMask(mask);
data = data.addBands(data.multiply(0.0001));
data = data.addBands(((data.select('B1_1').multiply(11.053))
                  .add(data.select('B2_1').multiply(6.950))
                  .add(data.select('B3_1').multiply(51.135))
                  .add(data.select('B4_1').multiply(34.457))).rename('CIEX'));
data = data.addBands(((data.select('B1_1').multiply(1.320))
                  .add(data.select('B2_1').multiply(21.053))
                  .add(data.select('B3_1').multiply(66.023))
                  .add(data.select('B4_1').multiply(18.034))).rename('CIEY'));
data = data.addBands(((data.select('B1_1').multiply(58.038))
                  .add(data.select('B2_1').multiply(34.931))
                  .add(data.select('B3_1').multiply(2.606))
                  .add(data.select('B4_1').multiply(0.016))).rename('CIEZ'));
data = data.addBands((data.select('CIEX').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));
data = data.addBands((data.select('CIEY').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));
data = data.addBands((((data.select('CIEx').atan2(data.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));
data = data.addBands((data.select('Hue').divide(100)).rename('Huer'));
data = data.addBands((data.select('Hue').add((data.select('Huer').pow(5).multiply(-52.16))
                                        .add(data.select('Huer').pow(4).multiply(373.81))
                                        .add(data.select('Huer').pow(3).multiply(-981.83))
                                        .add(data.select('Huer').pow(2).multiply(1134.19))
                                        .add(data.select('Huer').multiply(-533.61))
                                        .add(76.72))).rename('HueC')); 
 return data.addBands(((data.select('HueC').multiply(-0.6067)).add(602.6)).rename('output_var'));  
}
function Algo_L8_Acolor(data){
var mask = data.select(['pixel_qa']).eq(324).or(data.select(['pixel_qa']).eq(388));
data = data.updateMask(mask);
data = data.addBands(data.multiply(0.0001));
data = data.addBands(((data.select('B2_1').multiply(1.1302))
                  .add(data.select('B3_1').multiply(1.7571))
                  .add(data.select('B4_1').multiply(2.7689))).rename('CIEX'));
data = data.addBands(((data.select('B2_1').multiply(0.0601))
                  .add(data.select('B3_1').multiply(4.5907))
                  .add(data.select('B4_1').multiply(1.0))).rename('CIEY'));
data = data.addBands(((data.select('B2_1').multiply(5.5943))
                  .add(data.select('B3_1').multiply(0.0565))
                  .add(data.select('B4_1').multiply(0.0))).rename('CIEZ'));
data = data.addBands((data.select('CIEX').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));
data = data.addBands((data.select('CIEY').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));
data = data.addBands((((data.select('CIEx').atan2(data.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));
 return data.addBands(((data.select('Hue').multiply(-0.6067)).add(602.6)).rename('output_var'));  
}
function Algo_L57_Acolor(data){
var mask = data.select(['pixel_qa']).eq(68);
data = data.updateMask(mask);
data = data.addBands(data.multiply(0.0001));
data = data.addBands(((data.select('B1_1').multiply(1.1302))
                  .add(data.select('B2_1').multiply(1.7571))
                  .add(data.select('B3_1').multiply(2.7689))).rename('CIEX'));
data = data.addBands(((data.select('B1_1').multiply(0.0601))
                  .add(data.select('B2_1').multiply(4.5907))
                  .add(data.select('B3_1').multiply(1.0))).rename('CIEY'));
data = data.addBands(((data.select('B1_1').multiply(5.5943))
                  .add(data.select('B2_1').multiply(0.0565))
                  .add(data.select('B3_1').multiply(0.0))).rename('CIEZ'));
data = data.addBands((data.select('CIEX').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEx'));
data = data.addBands((data.select('CIEY').divide(data.select('CIEX').add(data.select('CIEY'))
  .add(data.select('CIEZ')))).subtract(0.3333).multiply(-1).rename('CIEy'));
data = data.addBands((((data.select('CIEx').atan2(data.select('CIEy')))
    .multiply(180).divide(Math.PI)).add(180)).rename('Hue'));
 return data.addBands(((data.select('Hue').multiply(-0.6067)).add(602.6)).rename('output_var'));  
}
///////////////////////////////////
/////////// main code /////////////
///////////////////////////////////
function main_function(){
      if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  var geometry = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var wetland=table.filterBounds(geometry);
var WetlandName = wetland.first().get('WETNAME').getInfo();
var WetlandDes = wetland.first().get('DESCR').getInfo();
var first_year = startyear.getValue();
var last_year = endyear.getValue();
var first_month = startmonth.getValue();
var last_month = endmonth.getValue();
var startDate = ee.Date(first_year+'-'+first_month+'-'+'01');
var endDate = ee.Date(last_year+'-'+last_month+'-'+'28');
var water_par=firstname_select.getValue();
var algo=secondname_select.getValue();
var L5=checkbox5.getValue();
var L7=checkbox7.getValue();
var L8=checkbox8.getValue();
///////// add wetland boundary and images //////////
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  }
};
removeLayer('selected_wetland');
var empty = ee.Image().byte();
var outlineW = empty.paint({
  featureCollection: wetland,
  color: 1,
  width: 2
});
Map.centerObject(wetland);
Map.addLayer(outlineW,{palette:'FF0000'},'selected_wetland');
///// select data set based on user AOI and dates//////
///////////// Landsat 8 //////////////////
var data8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland)
.map(maskL8sr);
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'C1'),data8.map(Algo_SSC_C1),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'C2'),data8.map(Algo_SSC_C2),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'C3'),data8.map(Algo_SSC_C3),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'C4'),data8.map(Algo_SSC_C4),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'C5'),data8.map(Algo_SSC_C5),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WE1'),data8.map(Algo_L8_WE_pixelqa),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WE2'),data8.map(Algo_WE_otsu),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WE3'),data8.map(Algo_WE_GJ),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'B1'),data8.map(Algo_CHl_B1),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'B2'),data8.map(Algo_CHl_B2),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'B3'),data8.map(Algo_CHl_B3),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'D1'),data8.map(Algo_CDOM_D1),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'KD1'),data8.map(Algo_KD490_KD1),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'KD2'),data8.map(Algo_KD490_KD2),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'KD3'),data8.map(Algo_KD490_KD3),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC1'),data8.map(Algo_L8_Tcolor),data8));
 data8 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC2'),data8.map(Algo_L8_Acolor),data8));
var prod8=data8.select('output_var');
prod8 = ee.ImageCollection(ee.Algorithms.If(L8,prod8,ee.ImageCollection([])));
///////////// Landsat 7 //////////////////
var data7 = ee.ImageCollection("LANDSAT/LE07/C01/T2_SR")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland)
.map(cloudMaskL457);
 data7 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WE1'),data7.map(Algo_L57_WE_pixelqa),data7));
 data7 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC1'),data7.map(Algo_L57_Tcolor),data7));
 data7 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC2'),data7.map(Algo_L57_Acolor),data7));
var prod7=data7.select('output_var');
prod7 = ee.ImageCollection(ee.Algorithms.If(L7,prod7,ee.ImageCollection([])));
///////////// Landsat 5 //////////////////
var data5 = ee.ImageCollection("LANDSAT/LT05/C01/T2_SR")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland)
.map(cloudMaskL457);
 data5 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WE1'),data5.map(Algo_L57_WE_pixelqa),data5));
 data5 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC1'),data5.map(Algo_L57_Tcolor),data5));
 data5 = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'WC2'),data5.map(Algo_L57_Acolor),data5));
var prod5=data5.select('output_var');
prod5 = ee.ImageCollection(ee.Algorithms.If(L5,prod5,ee.ImageCollection([])));
var prod = prod5.merge(prod7).merge(prod8);
////////////////// Land Surface temperature //////////////
var modis_data = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'TE1'),
                ee.ImageCollection("MODIS/006/MOD11A2"),ee.ImageCollection("MODIS/006/MYD11A2")))
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland);
var modLSTc = modis_data.map(function(img) {
  return img.addBands(img.select('LST_Day_1km')
    .multiply(0.02)
    .subtract(273.15)
    .rename('output_var'));
});
prod = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(water_par,'Temp(C)'),modLSTc.select('output_var'),prod));
////////////////// Total Precicpitation //////////////
var ERA_data = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
.filter(ee.Filter.date(startDate,endDate))
.filterBounds(wetland);
var rainfall1 = ERA_data.map(function(img) {
  return img.addBands(img.select('total_precipitation')
    .multiply(1)
    .rename('output_var'));
});
var GPM_data = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06")
.filterDate(startDate,endDate)
.filterBounds(wetland);
var rainfall2 = GPM_data.map(function(img) {
  return img.addBands(img.select('precipitation').multiply(1)
    .rename('output_var'));
});
var rainfall = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(algo,'TP1'),rainfall1,rainfall2));
prod = ee.ImageCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(water_par,'TP (m)'),rainfall.select('output_var'),prod));
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1984, 2022);
var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return prod
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .median()
        .set('month', m).set('year', y)
        .set('system:time_start',ee.Date.fromYMD(y,m,15));
  });
}).flatten());
var listOfImages = byMonthYear.toList(byMonthYear.size());
var newList = listOfImages.map(function comprobeBandsNumber(ele){
  var new_list = ee.List([]); 
  var count = ee.Image(ele).bandNames().size();
  var comp = ee.Algorithms.If(count.eq(1), ele, 0);
  new_list = new_list.add(comp);
  return new_list;
}).flatten();
//removing zeroes in new list
newList = newList.removeAll([0]);
var MIC = ee.ImageCollection(newList);
/////////////// plot hist ////////////////////
var hist = ui.Chart.image.series(MIC,wetland,
ee.Reducer(ee.Algorithms.If(ee.Algorithms.IsEqual(water_par,'Area (ha)'),ee.Reducer.sum(),ee.Reducer.median())),30)
.setOptions({title: 'Wetland water parameter',
  hAxis: {title: 'Date'},
  vAxis: {title: water_par}})
// panel.add(hist);
chartPanel.widgets().reset([hist]);
removeLayer('Color');
var dateLabel = ui.Label();
  hist.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    //Find image coresponding with clicked data and clip water classification to roi 
    var selcImage = ee.Image(MIC.filterDate(xValue).first()).clip(wetland); 
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(selcImage, {
      bands: ['output_var']
    });
    Map.layers().reset([S1Layer]);
    var visParams = {palette: ["4161BF","3f6bbf","3fa6b2","3fbf52","66bf3f","beb93f","bf863f"]};
    Map.addLayer(selcImage,visParams,'water parameter');
    // dateLabel.setValue((new Date(xValue)).toUTCString());
    // dateLabel.style().set({position: 'bottom-left'});
  });
  Map.add(dateLabel)
  // Map.unlisten(watercolor);
inspector1.widgets().set(0, ui.Label({
    value: 'Name: '+ WetlandName,
  }));
inspector1.widgets().set(1, ui.Label({
    value: 'Description: '+ WetlandDes,
  }));  
}
// leftmap right map
// add legend to map