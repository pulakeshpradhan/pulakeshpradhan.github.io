var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.13330161638054,
                6.787709613859786
              ],
              [
                -75.13330161638054,
                6.74100181116821
              ],
              [
                -75.09442031450065,
                6.74100181116821
              ],
              [
                -75.09442031450065,
                6.787709613859786
              ]
            ]
          ],
          "geodesic": false,
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
        [[[-75.13330161638054, 6.787709613859786],
          [-75.13330161638054, 6.74100181116821],
          [-75.09442031450065, 6.74100181116821],
          [-75.09442031450065, 6.787709613859786]]], null, false);
Map.centerObject(geometry, 14);
// Definindo a função Turbidity
function Turbidity(image) {
  return image.addBands(
    image.expression("(1.509984 * (B4 / 10) ** 1.7241) / 100", {
      'B4': image.select("B4")
    }).rename('Turb')
  );
}
// Função para calcular NDWI (Índice de Diferença Normalizada de Água)
function calculateNDWI(image) {
  var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return image.addBands(ndwi);
}
// Função para calcular a média de imagens específicas
function calculateAverageFromSpecificImages(imageDates) {
  var images = imageDates.map(function(dateStr) {
    var date = ee.Date(dateStr);
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
      .filterDate(date, date.advance(1, 'day'))
      .filterBounds(geometry) // Especifique a geometria de interesse aqui
      .map(Turbidity)
      .map(calculateNDWI);
    var avgImage = imageCollection.mean();
    var waterMask = avgImage.select('NDWI').gt(0);  // cria uma máscara de água
    return avgImage.updateMask(waterMask).select("Turb");  // aplicar a máscara de água e selecionar apenas a banda Turb
  });
  return ee.ImageCollection(images).mean();
}
// Função para calcular a diferença percentual entre duas imagens
function calculateDifference(img1, img2) {
  return img1.subtract(img2).divide(img1).multiply(100);  // convertendo para porcentagem
}
// Função para ajustar a visualização da imagem
function visualizeImage(img, visParams, name) {
  var imageRGB = img.visualize(visParams);
  Map.addLayer(imageRGB, {}, name);
}
var geometry; // Insira a geometria de interesse aqui
// Definindo os parâmetros de visualização
// Ajuste o min e o max para refletir a gama de valores de turbidez esperada
var visParams = {min: -100, max: 100, palette: ['blue', 'white', 'red']};
// Especificando as datas das imagens
var imageDates = {
  january: ['2023-01-23', '2023-01-28'],
  february: ['2023-02-27'],
  april: ['2023-04-03', '2023-04-13', '2023-04-18', '2023-04-23', '2023-04-28'],
  may: ['2023-05-03', '2023-05-08', '2023-05-18'],
  june: ['2023-06-12'],
  july: ['2023-07-12', '2023-07-17']
};
// Calculando a média das imagens específicas
var januaryAvg = calculateAverageFromSpecificImages(imageDates.january);
var februaryAvg = calculateAverageFromSpecificImages(imageDates.february);
var aprilAvg = calculateAverageFromSpecificImages(imageDates.april);
var mayAvg = calculateAverageFromSpecificImages(imageDates.may);
var juneAvg = calculateAverageFromSpecificImages(imageDates.june);
var julyAvg = calculateAverageFromSpecificImages(imageDates.july);
// Calculando a diferença percentual entre as médias mensais
var februaryDiff = calculateDifference(februaryAvg, januaryAvg);
var aprilDiff = calculateDifference(aprilAvg, februaryAvg);
var mayDiff = calculateDifference(mayAvg, aprilAvg);
var juneDiff = calculateDifference(juneAvg, mayAvg);
var julyDiff = calculateDifference(julyAvg, juneAvg);
// Visualizando as diferenças
visualizeImage(februaryDiff, visParams, 'Difference February - January');
visualizeImage(aprilDiff, visParams, 'Difference April - February');
visualizeImage(mayDiff, visParams, 'Difference May - April');
visualizeImage(juneDiff, visParams, 'Difference June - May');
visualizeImage(julyDiff, visParams, 'Difference July - June');
// Setas do Norte
var northArrow = ui.Panel({
  style: {
    position: 'top-right', 
    padding: '8px 15px'
  },
  widgets: [
    ui.Label('N', {fontSize: '24px', stretch: 'horizontal', textAlign: 'center'}),
    ui.Label('^', {fontSize: '24px', stretch: 'horizontal', textAlign: 'center'}),
    ui.Label('|', {fontSize: '24px', stretch: 'horizontal', textAlign: 'center'}),
  ]
});
Map.add(northArrow);
// Criação de legenda
var legend = ui.Panel({
  style: {position: 'bottom-left', padding: '8px 15px'}
});
var legendTitle = ui.Label({
  value: 'Turbidity Change (%)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// Definindo os painéis para as cores e valores da legenda
var legendColors = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
var legendValues = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
// Função personalizada para converter número em string hexadecimal de duas dígitos
function toHex(d) {
    return ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}
// Gradiente de cor de -100 a 100% (azul para branco e depois para vermelho)
for (var i = -100; i <= 100; i += 20) {
  var value = i;
  var normalisedValue = (i + 100) / 2; // Normalizando valores para a faixa de 0 a 100
  var red, blue, green;
  if (normalisedValue < 50) {
      // Gradiente de azul para branco
      blue = toHex(Math.round(255));
      green = toHex(Math.round(255 * (normalisedValue / 50)));
      red = green;
  } else {
      // Gradiente de branco para vermelho
      red = toHex(Math.round(255));
      green = toHex(Math.round(255 * (2 - normalisedValue / 50)));
      blue = green;
  }
  var color = red + green + blue;
  var colorBox = ui.Label('', {
    backgroundColor: '#' + color,
    padding: '10px',
    margin: '0 1px 0 0'
  });
  legendColors.add(colorBox);
  var description = ui.Label(value.toString(), {
    margin: '0 4px 0 0'
  });
  legendValues.add(description);
}
legend.add(legendColors);
legend.add(legendValues);
Map.add(legend);