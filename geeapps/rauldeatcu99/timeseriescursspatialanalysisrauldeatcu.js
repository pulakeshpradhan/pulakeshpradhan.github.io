// 1. Setam panoul de control
var panou = ui.Panel();
panou.style().set('width', '400px');
panou.add(ui.Label("Aplicatie test pentru cursul 'Spatial analysis and modelling in GIS'' "))
panou.add(ui.Label("Autor: Raul Deatcu"))
panou.add(ui.Label("1. Desenati un dreptunghi pentru a defini zona de interes"))
Map.setCenter(24.832, 45.942, 8)
Map.drawingTools().onDraw(function (geometry) {
// 2. Importam setul de date
var colectie = ee.ImageCollection("COPERNICUS/CORINE/V20/100m").filterBounds(geometry)
var img = ee.Image("COPERNICUS/CORINE/V20/100m/2018").clip(geometry)
Map.addLayer(img,{},"Acoperirea terenului in 2018")
// 3.EXTRAGERE COORDONATE & VALORI
Map.onClick(function(coords) {
  var lon = ui.Label();
  var lat = ui.Label();
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var clcChart = ui.Chart.image.series(colectie, point, ee.Reducer.mean(), 100);
  clcChart.setOptions({
    title: 'CLC',
    pointSize: 5, 
    vAxis: {title: 'Classes', maxValue: 600},
    hAxis: {title: 'date', format: 'yyyy'},
  });
  panou.widgets().set(4, clcChart);
});
// 4. ANIMATIE
var animatie = ui.Thumbnail(colectie, {'region': geometry,'dimensions': 400, 'framesPerSecond': 2, 'format':'gif'})
panou.widgets().set(1, ui.Label("Animatie:"))
panou.widgets().set(2, animatie);
panou.widgets().set(3, ui.Label("2. Utilizand iconita cu manuta din partea stanga, faceti click intr-un punct pentru a genera graficul schimbarii in timp"))
})
ui.root.insert(0, panou);
// 5. LEGENDA
var legend = ui.Panel({
  style: {position: 'bottom-left',height: '400px',width: '400px'}
});
var legendTitle = ui.Label({
  value: 'Legenda',
  style: {fontWeight: 'bold',fontSize: '24px'}
});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({style: {backgroundColor: '#' + color,padding: '8px'}});
      var description = ui.Label({value: name,style: {fontSize: '10px'}});
      return ui.Panel({widgets: [colorBox, description]});
};
var palette =["E6004D",	"FF0000",	"CC4DF2",	"CC0000",	"E6CCCC",	"E6CCE6",	"A600CC",	"A64DCC",	"FF4DFF",	"FFA6FF",	"FFE6FF",	"FFFFA8",	"FFFF00",	"E6E600",	"E68000",	"F2A64D",	"E6A600",	"E6E64D",	"FFE6A6",	"FFE64D",	"E6CC4D",	"F2CCA6",	"80FF00",	"00A600",	"4DFF00",	"CCF24D",	"A6FF80",	"A6E64D",	"A6F200",	"E6E6E6",	"CCCCCC",	"CCFFCC",	"000000",	"A6E6CC",	"A6A6FF",	"4D4DFF",	"CCCCFF",	"E6E6FF",	"A6A6E6",	"00CCF2",	"80F2E6",	"00FFA6",	"A6FFE6",	"E6F2FF"];
var names = ["111 Artificial surfaces > Urban fabric > Continuous urban fabric",	"112 Artificial surfaces > Urban fabric > Discontinuous urban fabric",	"121 Artificial surfaces > Industrial, commercial, and transport units > Industrial or commercial units",	"122 Artificial surfaces > Industrial, commercial, and transport units > Road and rail networks and associated land",	"123 Artificial surfaces > Industrial, commercial, and transport units > Port areas",	"124 Artificial surfaces > Industrial, commercial, and transport units > Airports",	"131 Artificial surfaces > Mine, dump, and construction sites > Mineral extraction sites",	"132 Artificial surfaces > Mine, dump, and construction sites > Dump sites",	"133 Artificial surfaces > Mine, dump, and construction sites > Construction sites",	"141 Artificial surfaces > Artificial, non-agricultural vegetated areas > Green urban areas",	"142 Artificial surfaces > Artificial, non-agricultural vegetated areas > Sport and leisure facilities",	"211 Agricultural areas > Arable land > Non-irrigated arable land",	"212 Agricultural areas > Arable land > Permanently irrigated land",	"213 Agricultural areas > Arable land > Rice fields",	"221 Agricultural areas > Permanent crops > Vineyards",	"222 Agricultural areas > Permanent crops > Fruit trees and berry plantations",	"223 Agricultural areas > Permanent crops > Olive groves",	"231 Agricultural areas > Pastures > Pastures",	"241 Agricultural areas > Heterogeneous agricultural areas > Annual crops associated with permanent crops",	"242 Agricultural areas > Heterogeneous agricultural areas > Complex cultivation patterns",	"243 Agricultural areas > Heterogeneous agricultural areas > Land principally occupied by agriculture, with significant areas of natural vegetation",	"244 Agricultural areas > Heterogeneous agricultural areas > Agro-forestry areas",	"311 Forest and semi natural areas > Forests > Broad-leaved forest",	"312 Forest and semi natural areas > Forests > Coniferous forest",	"313 Forest and semi natural areas > Forests > Mixed forest",	"321 Forest and semi natural areas > Scrub and/or herbaceous vegetation associations > Natural grasslands",	"322 Forest and semi natural areas > Scrub and/or herbaceous vegetation associations > Moors and heathland",	"323 Forest and semi natural areas > Scrub and/or herbaceous vegetation associations > Sclerophyllous vegetation",	"324 Forest and semi natural areas > Scrub and/or herbaceous vegetation associations > Transitional woodland-shrub",	"331 Forest and semi natural areas > Open spaces with little or no vegetation > Beaches, dunes, sands",	"332 Forest and semi natural areas > Open spaces with little or no vegetation > Bare rocks",	"333 Forest and semi natural areas > Open spaces with little or no vegetation > Sparsely vegetated areas",	"334 Forest and semi natural areas > Open spaces with little or no vegetation > Burnt areas",	"335 Forest and semi natural areas > Open spaces with little or no vegetation > Glaciers and perpetual snow",	"411 Wetlands > Inland wetlands > Inland marshes",	"412 Wetlands > Inland wetlands > Peat bogs",	"421 Wetlands > Maritime wetlands > Salt marshes",	"422 Wetlands > Maritime wetlands > Salines",	"423 Wetlands > Maritime wetlands > Intertidal flats",	"511 Water bodies > Inland waters > Water courses",	"512 Water bodies > Inland waters > Water bodies",	"521 Water bodies > Marine waters > Coastal lagoons",	"522 Water bodies > Marine waters > Estuaries",	"523 Water bodies > Marine waters > Sea and ocean"];
for (var i = 0; i < 44; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);