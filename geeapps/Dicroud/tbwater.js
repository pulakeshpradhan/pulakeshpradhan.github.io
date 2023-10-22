var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.MultiPoint();
//APP TURBIDEZ AGUA
var Area = 
    ee.Geometry.Polygon(
        [[[-34.917163504366115, -8.03601853105644],
          [-34.917163504366115, -8.096185467184243],
          [-34.86738170504971, -8.096185467184243],
          [-34.86738170504971, -8.03601853105644]]], null, false)
  var Turb_Agua = function (image){
  var scale = image.expression('image*0.0001', {'image': image})
  var Band4 = scale.select('B4')
  var ndwi = scale.normalizedDifference(['B3', 'B5'])
  var Mask_Agua = Band4.updateMask(ndwi.gte(0.15).and(ndwi.lte(0.5)))
  var tb_agua = image.expression('355.85*Vermelho/((1-Vermelho)*0.1686)', {'Vermelho':Mask_Agua})
  image = image.addBands(tb_agua.rename('Turb_Agua'))
  return image.select('Turb_Agua').clip(Area)
  }
function mask(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
//********DICCIONARIO DE WIDGETS********//
var dicobj = {
  Slider_fecha: ui.DateSlider({start: '2017-03-28',
                               end: ee.Date(Date.now()),
                               period: 180, 
                               onChange: function(){},
  }),
  label1: ui.Label('Water Turbidity', {fontSize: '27px', color: 'red', fontWeight: 'bold', backgroundColor: '00000000'}),
  label2: ui.Label('Enter Date Range', { backgroundColor: '00000000', fontWeight: 'bold'}),
  label3: ui.Label('By: Diego R. Castro', { backgroundColor: '00000000', fontWeight: 'bold', margin:'2px 2px 2px 160px'}),
}
                        Map.centerObject(Area, 13)
var Boton = ui.Button({label:  'CALCULATE',
                       onClick: function(img){
                        var Ta = ee.ImageCollection("COPERNICUS/S2")
                        .filterDate(ee.Date(dicobj.Slider_fecha.getValue()[0]).format('YYYY-MM-dd'),
                                       ee.Date(dicobj.Slider_fecha.getValue()[1]).format('YYYY-MM-dd'))
                        .filterBounds(Area)
                        .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30)
                        .map(mask)
                        .map(Turb_Agua)
                        .select('Turb_Agua')
                        .mosaic()
                        var layer = ui.Map.Layer(Ta, {palette: ['0000ff','0ef4ff', 'ff9031','ff0000'], min: 80, max: 250}, 'Turb_Agua')
                        Map.layers().set(0,layer)
                       },
                       })
var PanelP = ui.Panel({widgets: [dicobj.label1,
                                 dicobj.label2,
                                 dicobj.Slider_fecha,
                                 Boton,
                                 dicobj.label3
                                ],
                       layout: ui.Panel.Layout.Flow('vertical'),
                       style: {backgroundColor: '00005555', border: '2px solid black', fontWeight: 'bold',
                       position: ('top-right')}
})
Map.add(PanelP)