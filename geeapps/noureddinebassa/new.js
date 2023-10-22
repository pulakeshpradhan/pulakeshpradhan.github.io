var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
var panel = ui.Panel();
panel.style().set({
  width:'300px'
})
//ui.root.add(panel)
 // panel.add(ui.Label('Region of Interest'))
    var drawingTools = Map.drawingTools()
    drawingTools.setShown(false)
function clearGeometry (){
  var layers = drawingTools.layers()
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0))
}
clearGeometry()
function drawRectangle(){
  clearGeometry()
  drawingTools.setShape('polygon')
  drawingTools.draw()
}
var drawR = ui.Button({label:'Draw ROI', style:{stretch:'horizontal'},
onClick:function(){
  drawRectangle();
}})
//panel.add(drawR)
var table = ui.import && ui.import("table", "table", {
      "id": "users/noureddinebassa/commune"
    }) || ee.FeatureCollection("users/noureddinebassa/commune");
var geo_dptos = ee.FeatureCollection(table);
var styling ={ color :'black', fillColor:'FFFFFF00'}
Map.addLayer(geo_dptos.style(styling))
var RGPH_Nom_dptos = ['Ait Iaaza (Mun.)','El Guerdane (Mun.)','Taroudannt (Mun.)','Ida Ou Gailal','Oulad Aissa','Argana','Lakhnafif','Lamhadi','Machraa El Ain',
'Sidi Ahmed Ou Amar','Ahmar Laglalcha','Ait Igas','Ait Makhlouf','Bounrar','Freija','Ida Ou Moumen','Imoulass','Lamnizla','Sidi Borja','Sidi Dahmane',
'Tafraouten','Tamaloukte','Tazemmourt','Tiout','Zaouia Sidi Tahar'
                    ]
var fca = function() {}
fca.hidebutton = ui.Button({label: 'X',style: {
    position:"bottom-right",
    backgroundColor:'black',
          },
  onClick: function(){
    fca.ocultar()  }
    })
    ;
fca.showbutton =
          ui.Button({label: '_',style: {
            position:"bottom-right",
            shown:false,
            backgroundColor:'DDDDDD00'
               },
  onClick: function(){
    fca.mostrar()  }
});
fca.ocultar = function() {
  fca.panel1.style().set('shown', false)
  fca.showbutton.style().set('shown', true)
  fca.hidebutton.style().set('shown', false)
  };
fca.mostrar = function() {
  fca.panel1.style().set('shown', true)
  fca.showbutton.style().set('shown', false)
  fca.hidebutton.style().set('shown', true)
  };
fca.crearPaneles = function() {
fca.titulo = ui.Label({
        value: '🌾 PRECISION fARMING 🌾',
        style: {fontWeight: 'bold', fontSize: '20px', textAlign:'center', width: "95%",backgroundColor:"#edf246"}
      }) 
fca.subtitulo = ui.Label({
        value: 'Vegetation Index by Commune ',
        style: {fontWeight: 'bold', fontSize: '13px', textAlign:'center', width: "95%", padding: '-10px 0px 0px 0px'}
      })
fca.Selector = ui.Select({
  items: RGPH_Nom_dptos.sort(),
  placeholder: 'RGPH_Nom.',
  value: "Oulad Aissa",
  onChange: fca.createmap1,
  style:{width:'90%',textAlign:'center'}
})
fca.per1 =  ui.DateSlider({
      start: '2018-01-01',
      end: ee.Date(Date.now()),
      //value: ee.Date(new Date()).advance(-320, 'day'),
      period: 28,
      onChange: fca.index1,
    style: {width: '90%', textAlign:'center'} })
fca.map1 = ui.Map()
  .setControlVisibility({
  zoomControl : false,
  drawingToolsControl: true,
  scaleControl: true,
  mapTypeControl: true,
});
fca.map1.panel = ui.Panel([fca.map1], null, {stretch: 'both'});
fca.panel_a = ui.Panel({
  widgets: [fca.titulo, fca.subtitulo, fca.Selector, fca.per1,panel,drawR], style: { width:'100%'}
                    });
fca.panel_data1 = ui.Panel({ widgets: [  ], style: { width:'100%'}
                    });
fca.panel1 = ui.Panel({
  widgets: [fca.panel_a, fca.panel_data1],
  style: {position: 'top-left', width:'350px', stretch: 'both', border: 'solid 0.5px', textAlign: 'center'},
  layout: ui.Panel.Layout.flow('vertical'),
});
};
fca.createmap1 = function() {
  fca.panel_data1.clear()
  fca.map1.layers().reset()
  var filtered = geo_dptos.filter(ee.Filter.eq('RGPH_Nom', fca.Selector.getValue())).geometry()
  fca.map1.addLayer(filtered, styling,fca.Selector.getValue())
  fca.map1.centerObject(filtered, 12)
  fca.index1()
}
fca.index1 = function() {
  var filtered = geo_dptos.filter(ee.Filter.eq('RGPH_Nom', fca.Selector.getValue())).geometry()
  var period = fca.per1.getValue();
  var layer_name = fca.Selector.getValue();
  var imagenes = fca.dataset
  .filterDate(ee.Date(period[0]),period[1])
  .filterBounds(filtered)
  .select(['B4','B8'])
  var indice = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var ndvi_clip = ndvi.clip(filtered);
  return image.addBands(ndvi_clip);}
  var img = imagenes.map(indice);
  var img_mean = img.mean();
  var data_map = img_mean.select('NDVI');
  fca.map1.layers().reset()
  fca.map1.addLayer(data_map, fca.paleta, layer_name, true)
  var histograma = ui.Chart.image.histogram(data_map,filtered, 100)
    .setSeriesNames(['NDVI'])
    .setOptions(fca.opciones);
    histograma.style().set({
    position: 'top-right',
    width: '95%',
    height: '30%',
  });
  fca.panel_data1.clear()
  fca.panel_data1.add(histograma)
var classs = ee.Image([
   data_map.gte(0).and(data_map.lt(0.25)).selfMask().rename('Very low'),
   data_map.gte(0.25).and(data_map.lt(0.5)).selfMask().rename('Low'),
   data_map.gte(0.50).and(data_map.lt(0.75)).selfMask().rename('Medium'),
   data_map.gte(0.75).and(data_map.lt(1)).selfMask().rename('High'),
   data_map.gte(0).and(data_map.lte(1)).selfMask().rename('Total'),
  ])
  .reduceRegion({reducer:ee.Reducer.sum(),
                                          geometry:filtered,
                                          scale:1000,
                                          maxPixels:1e6
                                          })
var area1 = classs.getNumber('Very low').divide(classs.getNumber('Total'));
var area2 = classs.getNumber('Low').divide(classs.getNumber('Total'));
var area3 = classs.getNumber('Medium').divide(classs.getNumber('Total'));
var area4 = classs.getNumber('High').divide(classs.getNumber('Total'));
var label = ui.Label(
"🌱 Vegetation Condition:\nVery low: " + ((area1.getInfo()*100).toFixed(1)) + "% | " + "Low: " + ((area2.getInfo()*100).toFixed(1)) + "%" +"\nMedium: " + ((area3.getInfo()*100).toFixed(1)) + "% | " +  "High: "+ ((area4.getInfo()*100).toFixed(1))+ "%",
{whiteSpace: 'pre', width:'95%' })
  fca.panel_data1.add(label)
}
fca.constantes = function() {
fca.dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
              .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5)
fca.paleta = {
  min: 0,
  max: 1,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
          ],
};
fca.opciones = {
  title: '- NDVI Frequency Histogram - ',
  fontSize: 12,
  width: 400,
  height: 200,
  hAxis: {viewWindow: {min: 0, max: 1}
  },
  series: {
    0: {color:'#4f9e13'}}
};
};
fca.complete = function() {
      fca.constantes();
      fca.crearPaneles();
      fca.createmap1();
      fca.index1();
  var main = ui.Panel(
    [
      fca.map1.panel,
      ],
      ui.Panel.Layout.Flow('horizontal'),{stretch: 'both'});
  fca.map1.add(fca.panel1)
  fca.map1.add(fca.hidebutton)
  fca.map1.add(fca.showbutton)
  fca.map1.setOptions('SATELLITE');
  ui.root.widgets().reset([main]);
  ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));
  };
fca.complete();