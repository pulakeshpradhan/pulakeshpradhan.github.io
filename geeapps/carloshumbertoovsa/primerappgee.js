var DANE = ui.import && ui.import("DANE", "table", {
      "id": "users/carloshumbertoovsa/Capitales_DANE"
    }) || ee.FeatureCollection("users/carloshumbertoovsa/Capitales_DANE"),
    MinMinas = ui.import && ui.import("MinMinas", "table", {
      "id": "users/carloshumbertoovsa/MinMinas/TitulosMineros"
    }) || ee.FeatureCollection("users/carloshumbertoovsa/MinMinas/TitulosMineros"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    VisS2 = ui.import && ui.import("VisS2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 169,
        "max": 2283.5,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":169,"max":2283.5,"gamma":1};
var BotonCenterMap = ui.Button({
                      label: 'Centrar Mapa', 
                      onClick: function(a){a = Map.centerObject(MinMinas)},
                      disabled: null, 
                      style:{color: 'gray',backgroundColor:'white',
                      position:'bottom-left',
                      height: null,
                      padding:'1px' ,
                      fontSize:'1',
                      fontWeight: null,
                      margin: null,
                      width: null,
                      border: '1px solid white'
                      }})
Map.add(BotonCenterMap)
var poligonos = MinMinas.style({
                  color:'red',
                  width:2,
                  fillColor:'00000000'
})
//var Titulo = ui.Label({value: 'Solicitudes Mineras Convenio GGC N 525',
//                        style:{color:'indigo', backgroundColor: 'orange', fontSize: '16px'},
//                        targetUrl: null})
//Map.add(Titulo)
Map.addLayer(poligonos,{},'Polígonos de las Solicitudes')
var ImageS2 = S2.filterBounds(MinMinas)
              .filterDate('2020-01-01','2020-12-21')
              .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 5)
              .sort('CLOUDY_PIXEL_PERCENTAGE')
              .mean().clip(MinMinas)
Map.addLayer(ImageS2,VisS2,'Imagen Sentinel 2 - 2020',false)
Map.centerObject(MinMinas)
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label({value:'Solicitudes Mineras Convenio GGC 525', style:{color:'indigo', backgroundColor: 'white', fontSize: '16px'}})]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // compute distance, a long running operation
  var computedValue = point.distance(MinMinas.geometry())
  computedValue.evaluate(function(result) {
    if (result < 500) {
      // get the text property, a long running operation
      var lbl = (MinMinas.filterBounds(point)).first().get('CODIGO_EXP')
      lbl.evaluate(function(result) {
        inspector.widgets().set(0, ui.Label({
          value: 'Código del Expediente: ' + result, style:{color:'indigo', backgroundColor: 'white', fontSize: '16px'}
        }))
      });
    } else {
      inspector.widgets().set(0, ui.Label({value:'Solicitudes Mineras Convenio GGC 525', style:{color:'indigo', backgroundColor: 'white', fontSize: '16px'}}))
      .style({backgroundColor:'orange'});
    }
  });
});
var places = {
LG110111: [-73.5723707865, 6.13283820225],
LJ809531: [-72.68876, 7.93764],
LLF08511: [-72.6369375, 7.3871875],
MAO14561: [-73.6822317073, 6.78352439024],
NEM11461: [-72.6858695652, 6.54396376812],
NEO08421: [-73.752, 5.979],
NEO10081: [-72.727375, 6.72125],
NET09061: [-73.5028162393, 6.16061396011],
NEU14251: [-73.18075, 7.06634375],
NEV15281: [-72.7931153846, 6.61088461538],
NGD10141: [-72.8035, 6.637],
NGI16411: [-72.686136646, 7.11601397516],
NGJ09471: [-72.5808492408, 8.44413340564],
NGJ15011: [-72.6530324675, 7.90511038961],
NH111011: [-72.6575095238, 7.8585],
NHA08591: [-73.4357142857, 6.87717857143],
NHF11271: [-73.618, 7.21],
NHH09031: [-72.5536469194, 7.68464691943],
NHN11531: [-72.6539109589, 7.87906849315],
NI508571: [-71.7130430809, 6.53163315927],
NIA08371: [-74.18, 6.7105],
NID15081: [-73.8811254961, 6.02345046833],
NIO16171: [-72.6221470588, 8.03755882353],
NIP14341: [-72.61658, 8.03794],
NIP15351: [-72.626875, 8.023375],
NIQ08191: [-73.8206851852, 5.9982037037],
NJH09041: [-73.733205, 6.818595],
NJT08431: [-72.5434166667, 7.8123],
NK108561: [-73.3664, 8.2215],
NK911061: [-73.3861178862, 7.40656504065],
NK911461: [-73.4056694915, 7.4098220339],
NKD16041: [-73.152, 7.19983333333],
NKK15001: [-72.6552169811, 7.08686792453],
NKK16461: [-72.6320625, 7.855625],
NL416431: [-73.2548888889, 7.27616666667],
NL608321: [-72.54175, 7.8260625],
NL614201: [-72.5979, 8.2089],
NLB14341: [-73.9985, 5.8555],
NLD10231: [-73.8245, 6.21240909091],
NLH09481: [-73.6608333333, 7.2285],
NLJ16221: [-72.5999744745, 8.11701351351],
NLQ11301: [-72.65588, 7.89288],
NLQ16351: [-74.0961732026, 6.51533006536],
NLS15421: [-73.0070833333, 6.52791666667],
OAF11011: [-74.2299594595, 6.41541591592],
OAG15421: [-72.9745, 6.562],
OAM16101: [-74.2295, 6.374],
OAU11131: [-72.5861111111, 8.16769444444],
OAU15261: [-72.66905, 7.94695],
OAV14271: [-72.5810740741, 8.22094444444],
OC115091: [-72.625, 8.03583333333],
OCE09141: [-72.6957971014, 6.54189855072],
OCJ09111: [-73.6737051282, 7.22651282051],
OD810181: [-73.1474230769, 6.76280769231],
ODA09021: [-72.6732773852, 7.10262367491],
ODB10281: [-73.2905, 6.794],
ODG09421: [-73.6186590909, 6.53156818182],
ODI15071: [-73.8525382166, 5.96231528662],
ODN11121: [-72.7271111111, 8.16972222222],
ODO15421: [-73.5493931298, 7.27608778626],
ODT08301: [-72.5375952381, 7.83902380952],
ODT16311: [-73.0095, 6.531],
ODT16361: [-73.1450619835, 7.31974793388],
ODU16431: [-73.9179049587, 5.79096280992],
OE211091: [-73.01275, 6.53071428571],
OE216151: [-72.6659615385, 7.36457692308],
OE308161: [-72.7050061728, 6.65721193416],
OE314391: [-73.1496654676, 7.23274460432],
OE611081: [-73.150627451, 7.10595098039],
OE615141: [-73.8106960784, 7.05475490196],
OE708351: [-72.604957265, 8.19162820513],
OE708571: [-73.151530303, 7.19762121212],
OE715341: [-72.8558684211, 8.6355],
OE814111: [-72.8227423313, 7.88608895706],
OE814371: [-72.46, 7.248],
OE815482: [-72.4585, 7.242],
OE816383: [-73.8455444444, 5.97964074074],
OE816422: [-72.4585, 7.2435],
OE909051: [-72.4842428571, 7.98454285714],
OE914531: [-74.0065, 5.8195],
OE914533: [-72.8012368421, 8.58861278195],
OE916012: [-72.6758, 6.84236666667],
OEA10483: [-73.8623333333, 6.07616666667],
OEA11115: [-72.3425, 7.117],
OEA11291: [-72.9431989247, 7.44424193548],
OEA15041: [-72.6304285714, 7.40994897959],
OEA15123: [-73.951, 5.817],
OEA15281: [-72.9514701835, 6.49424770642],
OEA15563: [-72.2839545455, 7.09395454545],
OEA15572: [-73.3125181818, 6.4382030303],
OEA16102: [-73.4935, 6.2695]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1],15);
  }
});
// Set a place holder.
select.setPlaceholder('Seleccionar Localización').style({position:'bottom-left' });
var Ventana = ui.Panel({style: {position:'top-left'}}).add(select)
Map.add(Ventana)