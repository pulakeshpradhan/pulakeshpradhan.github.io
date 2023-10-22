var aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/jsilvan/CMCP/CMCP_AOI"
    }) || ee.FeatureCollection("users/jsilvan/CMCP/CMCP_AOI");
var initialDate = '2014-01-01';
var endDate = '2022-01-01';
var legends = require('users/jsilvan/tools:legends');
var gui = require('users/jsilvan/tools:gui');
var images = require('users/jsilvan/tools:images');
var timeOfChangeImage = ee.Image("users/jsilvan/CMCP/FMPU_LC08_25ChangeYear2021")
  .select([0],['year']);
var urbanPercentCol = ee.ImageCollection("users/jsilvan/CMCP/PU_LC08_C01_T1_TOA_MOS")
  .filterDate(initialDate,endDate);
var corrUrbanPercentCol = ee.ImageCollection("users/jsilvan/CMCP/FMPU_LC08_C01_T1_TOA_MOS")
  .filterDate(initialDate,endDate);
var filtUrbanPercentCol = ee.ImageCollection("users/jsilvan/CMCP/FPU_LC08_C01_T1_TOA_MOS")
  .filterDate(initialDate,endDate);
var lightsCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .select('avg_rad');
var sensorId = "Landsat 8 SR";
var L8TOACol = images.SensorsList[sensorId].collection; //ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var maxPixels = 1e12;
var idField = 'id';
//var bandNames = ['B1','B2','B3','B4','B5','B6','B7'];
var bandNames = images.SensorsList[sensorId].bands; //['B1','B2','B3','B4','B5','B6','B7','B10','B11'];
var scale = 30;
var chartTitle = 'Cobertura urbana 2014-2021';
var xlabel = 'Fecha';
var ylabel = '% Urbano';
var selectedPoints = [], pointsProps = [];
var TITLE = 'Urbanización del Corredor Metropolitano Centro-País (CMCP)';
var HEADER_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '4px',
};
var HEADER2_STYLE = {
  fontSize: '14px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '16px',
};
// parámetros de visualización
/*var visParams = {
  bands: ['swir2','nir','green'],
  min: 0.1,
  max: [0.3,0.5,0.3],
  gamma: 1.2,
};*/
var visParams = images.SensorsList[sensorId].visParams;
var visParamsMask = {
  min: 0, 
  max: 100, 
  palette: ['cyan','yellow','orange','red','darkred'],
  opacity: 1
};
var visParamsTime = {
  min: 2014,
  max: 2021,
  palette: ['gray','blue','cyan','green','yellow','red','magenta']
};
var urbanFracImage,lightsImage,downLoadImage;
var kernel = ee.Kernel.circle(1);
/*
Configura el mapa
*/
var mapPanel = ui.Map();
//mapPanel.setControlVisibility({drawingToolsControl: false});
var dt = mapPanel.drawingTools();
mapPanel.style().set('cursor', 'crosshair');
var toolPanel = ui.Panel([], 'flow', {width: '350px', padding: '8px 16px'});
ui.root.widgets().reset([toolPanel,mapPanel]);
// Agrega titulo
var header = ui.Label(TITLE,{fontSize: '24px', color: 'darkgray',textAlign: 'center',stretch: 'horizontal'});
toolPanel.add(header);
toolPanel.add(ui.Label('Por jsilvan',{fontWeight: 'bold'},'https://jsilvan.users.earthengine.app/'));
toolPanel.add(
    ui.Label('Esta App muestra la serie temporal de la mancha urbana en el CMCP ' +
    'que se detecta mediante demezclado espectral lineal de compuestos trimestrales ' +
    'de imágenes Landsat 8 libres de nubes. El año de urbanización corresponde ' +
    'al momento cuando ocurre el primer incremento de 25% o mas en el porcentaje' + 
    'de cobertura urbana.',
    {fontSize: '12px', stretch: 'horizontal'})
    );
/*
Panel de leyendas
*/
var showLegend = function(widget) {
  if (widget.value)
    ui.root.add(legendPanel);
  else
    ui.root.remove(legendPanel);
};
// define botón cíclico para mostrar leyenda
var showLegendButton = gui.toggleButton(
    [
      {
        label: '<<',
        value: false,
      },
      {
        label: '>>',
        value: true,
      }
    ],
    showLegend);
showLegendButton.style().set({
  position: 'bottom-right',
  padding: '0px',
  textAlign: 'center',
});
// estilo de título de legenda
legends.width = '200px';
legends.titleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var legendPanel = ui.Panel([
  ui.Label('Simbología',{fontSize: '24px',fontWeight: 'bold',stretch: 'horizontal',textAlign: 'center',margin: '4px'}),
  legends.rgb('Compuesto Landsat 8',visParams),
  legends.value('Porcentaje Urbano',visParamsMask),
  legends.value('Año de Urbanización',visParamsTime),
  ],ui.Panel.Layout.flow('vertical')
);
aoi.geometry().evaluate(function(geom) {
  dt.addLayer({
      geometries: [geom], 
      name: 'Area de interés', 
      color: 'cyan',
      shown: false,
      });
});
mapPanel.add(showLegendButton);
var buildMosaic = function(period){
  var year = period.slice(0,4);
  var start_month = (Number(period.slice(-1))-1)*3+1;
  var end_month = start_month+3;
  var start = year + '-' + start_month.toString() + '-' + '1';
  var end = year + '-' + end_month.toString() + '-' + '1';
  return images.MakeCompositeWithCM(L8TOACol.filterDate(start,end),sensorId,ee.Reducer.median());
};
/*
 Selección de la imágen de entrada
*/
// actualiza las imagenes al cambiar la selección
var showMosaic = function(selection) {
  var mosaic = buildMosaic(selection).aside(print)
  var visibility = true;
  if (mapPanel.layers().get(0))
    visibility = mapPanel.layers().get(0).get('shown');
  var mosName = mosaic.id().getInfo();
  var layer = ui.Map.Layer(mosaic, visParams, 'Compuesto Landsat 8',visibility);
  mapPanel.layers().set(0, layer);
  updateUrbanMask(minPUSlider.getValue(),minPUSlider);  
};
var mosNames = corrUrbanPercentCol
  .aggregate_array('id')
  .map(function(s){return ee.String(s).slice(-6)})
  .getInfo();
var mosSelect = ui.Select({
  items: mosNames,
  value: mosNames[0],
  onChange: showMosaic
});
var mosLabel = ui.Label('Selecciona un trimestre: ', HEADER_STYLE);
var mosPanel = ui.Panel([mosLabel, mosSelect],ui.Panel.Layout.flow('horizontal'));
toolPanel.add(mosPanel);
/*
 Menu de ciudades
*/
var locationDict = {
  'Aguascalientes': {lon: -102.28716, lat: 21.88094, zoom: 12},
  'Celaya': {lon: -100.81445, lat: 20.52287, zoom: 12},
  'Guanajuato': {lon: -101.27031, lat: 21.00134, zoom: 13},
  'Irapuato': {lon: -101.35955, lat: 20.67473, zoom: 12},
  'León': {lon: -101.672, lat: 21.1219, zoom: 11},
  'Querétaro': {lon: -100.4152, lat: 20.6019, zoom: 11},
  'Salamanca': {lon: -101.19744, lat: 20.57197, zoom: 12},
  'San Luis Potosí': {lon: -100.9619, lat: 22.1515, zoom: 11},
  'Silao': {lon: -101.42838, lat: 20.94837, zoom: 13},
  'Zacatecas': {lon:-102.5447, lat: 22.7628, zoom: 13}
  };
var locations = Object.keys(locationDict);
var locSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Centra el mapa en:', HEADER_STYLE), locSelect],
  ui.Panel.Layout.flow('horizontal'));
toolPanel.add(locationPanel);
mapPanel.setCenter(locationDict.Aguascalientes.lon, 
  locationDict.Aguascalientes.lat, 
  locationDict.Aguascalientes.zoom);
/*
Filtro de cerradura temporal
*/
var updateUrbanMask = function(value,widget) {
  var selection = mosSelect.getValue();
  urbanFracImage = ee.ImageCollection(ee.Algorithms.If(
    timeClosureCheckbox.getValue(),
    filtUrbanPercentCol,urbanPercentCol))
     .filterMetadata('id','ends_with',selection)
     .first();
  lightsImage = lightsCollection
  .filterMetadata('system:start_time','not_less_than',urbanFracImage.get('system:start_time'))
    .first();
  applyClosure(closeFilterSlider.getValue(),closeFilterSlider);
};
var timeClosureCheckbox = ui.Checkbox({
  label: 'Filtro máx acumulado',
  value: true,
  onChange: updateUrbanMask,
  style: HEADER2_STYLE,
  });
/*
Filtro de cerradura espacial
*/
var applyClosure = function(value,widget){
  var visibility = true;
  if (mapPanel.layers().get(1))
    visibility = mapPanel.layers().get(1).get('shown');
  downLoadImage = urbanFracImage;
  if (value)  
    downLoadImage = urbanFracImage.focal_max({kernel: ee.Kernel.square(value*scale,'meters')})
             .focal_min({kernel: ee.Kernel.square(value*scale,'meters')});
  var mask = downLoadImage.gte(minPUSlider.getValue()).and(lightsImage.gte(minLightsSlider.getValue()));
  var layer = ui.Map.Layer(downLoadImage.updateMask(mask),visParamsMask, 'Porcentaje urbano',visibility);
  mapPanel.layers().set(1, layer);
};
var closeFilterSlider = ui.Slider({
  min: 0, 
  max: 5,
  value: 0,
  step: 1,
  onChange: applyClosure
});
var closeFilterPanel = ui.Panel([
  ui.Label('Cerradura espacial:', HEADER2_STYLE), closeFilterSlider],
  ui.Panel.Layout.flow('horizontal'),{stretch: 'both'});
/*
Filtro por porcentaje mínimo
*/
var minPUSlider = ui.Slider({
  min: 1,
  max: 50,
  value: 2,
  step: 1,
  onChange: updateUrbanMask,
})
var minPUPanel = ui.Panel([
  ui.Label('Porcentaje mínimo:', HEADER2_STYLE), minPUSlider],
  ui.Panel.Layout.flow('horizontal'),{stretch: 'both'});
/*
Filtro por máscara luces
*/
var minLightsSlider = ui.Slider({
  min: 0,
  max: 10,
  value: 2,
  step: 1,
  onChange: updateUrbanMask,
});
var minLightsPanel = ui.Panel([
  ui.Label('Radianza de luces:', HEADER2_STYLE), minLightsSlider],
  ui.Panel.Layout.flow('horizontal'),{stretch: 'both'});
/*
Panel de filtros
*/
var filterPanel = ui.Panel([
  ui.Label('Ajusta los filtros:', HEADER_STYLE),
  minPUPanel,minLightsPanel,closeFilterPanel,timeClosureCheckbox],
  ui.Panel.Layout.flow('vertical'),{stretch: 'both'});
toolPanel.add(filterPanel);
/*
Paner Descargar
*/
var downloadLabel = ui.Label('Aquí',{fontWeight: 'bold'});
var downLoadPanel = ui.Panel([
  ui.Label('Descarga la cobertura:',HEADER_STYLE),downloadLabel],
  ui.Panel.Layout.flow('horizontal'));
toolPanel.add(downLoadPanel);
/*
 * Panel grafico
 */
// opciones de gráfico
var chartOptions = {
    title: chartTitle,
    legend: { position: 'top', 
              textStyle: {color: 'black', fontSize: 12}
            },
      vAxis: {title: ylabel,
              textStyle: {fontSize: 11, color: 'black'}, 
              titleTextStyle: {fontSize: 12, color: 'black', bold: true}, 
              viewWindow: {min: 0, max: 100}
      },
      hAxis: {title: xlabel,
              textStyle: {fontSize: 11, color: 'black'}, 
              titleTextStyle: {fontSize: 12, color: 'black', bold: true}, 
      },  
      type: 'line',
      lineWidth: 2,
      pointSize: 4,
//      curveType: 'function',
      colors: ['blue','cyan','green','yellow','red','magenta','orange','darkgreen','darkblue','darkcyan','lightgreen','pink'],
  };
// estilo de gráfico
var chartStyle = {
    width: '400px',
    height: '300px'
  };
// Callback del grafico
var goTo = function(xValue, yValue, seriesName) {
  if (!xValue) return;
  var point = ee.FeatureCollection(selectedPoints)
  .filterMetadata('label','equals',seriesName)
  .first().geometry().coordinates().getInfo();
  mapPanel.setCenter(point[0],point[1],15);
  var acqdate = ee.Date(xValue);
  var period_id = ee.String(acqdate.get('year')).cat('-')
    .cat(ee.Number(acqdate.get('month'))
      .divide(3).ceil()
      .format('%d')
    ); 
  mosSelect.setValue(period_id.getInfo());
};
// construye gráfico empleando colección especificada
function makeChart(col) {
  var chart = ui.Chart.image.seriesByRegion({
    imageCollection: col,
    regions: selectedPoints,
    reducer: ee.Reducer.first(),
    scale: scale,
    seriesProperty : 'label'
  });
  // aplica opciones y estilo
  chart.setOptions(chartOptions);
  chart.style().set(chartStyle);
  chart.onClick(goTo);
  return chart;
}
// quita el panel de gráficos
function clearResults() {
  selectedPoints = []; pointsProps = [];
  mapPanel.layers().remove(Map.layers().get(3));
  var instructionsLabel = ui.Label('Pulsa en área urbana para graficar serie.',{fontSize: '16px',color: 'gray'});
  resultsPanel.widgets().reset([instructionsLabel]);
  legendPanel.widgets().remove(4);
}
// define botón cíclico para cambio de colección
var chartTypeToggleButton = gui.toggleButton(
    [
      {
        label: 'No Fliltrar',
        value: corrUrbanPercentCol,
      },
       {
        label: 'Filtrar',
        value: urbanPercentCol,
      }
    ],
    updateChart);
// Crea panel con dos botones
var buttonPanel = ui.Panel(
    [ui.Button('Borrar', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel();
function updateChart() {
  var col = chartTypeToggleButton.value; // usa colección seleccionada
  var chart = makeChart(col);
  resultsPanel.clear().add(chart).add(buttonPanel);
  legendPanel.widgets().set(4,legends.features('Puntos graficados',pointsProps));
}
function updateOverlay() {
  var points = ee.FeatureCollection(selectedPoints)
    .style({styleProperty: 'style'})
  mapPanel.layers().set(3, ui.Map.Layer(points,{},'Puntos graficados'));
}
function handleMapClick(location) {
  var next = selectedPoints.length;
  var props = {
        style: {
          color: chartOptions.colors[next], 
          pointShape: '+',
          pointSize: chartOptions.pointSize
        },
        label: 'P' + next.toString()
      };
  var point = ee.Geometry.Point([location.lon, location.lat]);
  selectedPoints.push(ee.Feature(point,props));
  var year = timeOfChangeImage.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale: scale,
    maxPixels: maxPixels
  }).get('year').getInfo();
  if (year) {
    props.label = props.label + ': ' + year.toFixed(1).toString();
  } else {
    props.label = props.label + ': non-urban';
  }
  pointsProps.push(props);
  updateOverlay()
  updateChart();
}
var updateDownloadUrl = function(loc,map){
  var url = null; 
  if (loc.zoom > 10 & map) {
    var mapBounds = map.getBounds();
    url = downLoadImage.getDownloadURL({
      name: 'CMCP_urbano',
      scale: scale,
      region: ee.Geometry.Rectangle(mapBounds)
    });
  }  
  downloadLabel.setUrl(url);
};
toolPanel.add(resultsPanel);
var showTools = function(widget) {
  if (widget.value)
    ui.root.insert(0,toolPanel);
  else
    ui.root.remove(toolPanel);
};
// define botón cíclico para mostrar leyenda
var showToolsButton = gui.toggleButton(
    [
      {
        label: '<<',
        value: true,
      },
      {
        label: '>>',
        value: false
      }
    ],
    showTools);
showToolsButton.style().set({
  position: 'bottom-left',
  padding: '0px'
});
mapPanel.add(showToolsButton);
clearResults();
mapPanel.onClick(handleMapClick);
mapPanel.onChangeBounds(updateDownloadUrl)
showMosaic(mosNames[0]);
/*
Agrega capa de tiempo
*/
var layer2 = ui.Map.Layer(timeOfChangeImage, visParamsTime, 'Año de urbanización',false);
mapPanel.layers().set(2, layer2);