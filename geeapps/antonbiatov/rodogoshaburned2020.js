var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                27.502301107128027,
                51.320299323516664
              ],
              [
                27.502301107128027,
                50.59542817969064
              ],
              [
                29.111798177440527,
                50.59542817969064
              ],
              [
                29.111798177440527,
                51.320299323516664
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[27.502301107128027, 51.320299323516664],
          [27.502301107128027, 50.59542817969064],
          [29.111798177440527, 50.59542817969064],
          [29.111798177440527, 51.320299323516664]]], null, false);
Map.setOptions("HYBRID");
Map.centerObject(geometry, 10);
// разрешение результирующих растров
// Космоснимки
var scale = 20;
// NBR
var nbr_scale = 10;
var cloud_treshold = 60;
// пороговые значения каналов для создания маски сгоревших территорий
var burn_dNBR_191207_200319 = 100;
var burn_dNBR_200319_200326 = 100;
var burn_dNBR_200326_200403 = 100;
var burn_dNBR_200403_200408 = 100;
var burn_dNBR_200408_200423 = 100;
// пороговые значения каналов для уточнения маски сгоревших территорий по второму изображению
// _200319
var burn_NBR_200319 = 0.5;
var burn_RED_200319 = 950;
var burn_NIR_200319 = 1000;
// _200326
var burn_NBR_200326 = 0.5;
var burn_RED_200326 = 950;
var burn_NIR_200326 = 1600;
// _200403
var burn_NBR_200403 = 0.5;
var burn_RED_200403 = 950;
var burn_NIR_200403 = 1600;
// _200408
var burn_NBR_200408 = 0.5;
var burn_RED_200408 = 1000;
var burn_NIR_200408 = 1300;
// _200423
var burn_NBR_200423 = 0.5;
var burn_RED_200423 = 950;
var burn_NIR_200423 = 1600;
// нижний порог отделения воды NIR каналу
var water_NIR = 300;
// функция маскировки облаков
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).clip(geometry);
}
// функция расчета NBR
var calc_NBR = function(image) {
	return image.expression('(b("B8A") - b("B12")) / (b("B8A") + b("B12"))', {
//	return image.expression('(b("B8") - b("B12")) / (b("B8") + b("B12"))', {
		'B8A': image.select('B8A'), 
//		'B8': image.select('B8'), 
		'B12': image.select('B12')
     }).rename('NBR');
};
// функция расчета dNBR
function calc_dNBR(img_1, img_2){
    var nbr_1 = img_1.select('NBR');
    var nbr_2 = img_2.select('NBR');
    var dnbr = nbr_1.subtract(nbr_2).multiply(1000).rename('dNBR');
//    var dnbr = nbr_2.subtract(nbr_1).multiply(1000).add(1000).uint16().rename('dNBR');
return dnbr;
}
// создание маски сгоревших территорий из dNBR
function calc_burned_mask(dNBR_raster, burn_dNBR){
var burned_1 = dNBR_raster.select('dNBR')
                             .gt(burn_dNBR);
      // создание прозрачности вместо 0
var burned = burned_1.updateMask(burned_1);
return burned;  
}
// создание маски сгоревших территорий из по второму NBR
function calc_burned_NBR2(S2_img, NBR2_img, burn_NBR, burn_RED, burn_NIR){
var burned_1 = NBR2_img.select('NBR')
                             .lt(burn_NBR)
                             .and(S2_img
                                  .select('B4')
                                  .lt(burn_RED))
                             .and(S2_img
                                  .select('B8')
                                  .lt(burn_NIR))
                              .and(S2_img
                                  .select('B8')
                                  .gt(water_NIR))
                                  ;
// создание прозрачности вместо 0
var burned = burned_1.updateMask(burned_1);
return burned;  
}
// разделение сгоревших территорийна классы по dNBR
function calc_burned_classes(dNBR_raster){
var burned_1 = dNBR_raster.select('dNBR').gte(100)
                          .and(dNBR_raster.select('dNBR').lte(269)).multiply(1)
                          .add(dNBR_raster.select('dNBR').gte(270)
                                         .and(dNBR_raster.select('dNBR').lte(439)).multiply(2)
                          )
                          .add(dNBR_raster.select('dNBR').gte(440)
                                         .and(dNBR_raster.select('dNBR').lte(659)).multiply(3)
                          )
                          .add(dNBR_raster.select('dNBR').gte(660)
                                         .and(dNBR_raster.select('dNBR').lte(1300)).multiply(4)
                          )
                             ;
      // создание прозрачности вместо 0
//var burned = burned_1.updateMask(burned_1);
return burned_1;  
}
// Create a binary invert mask from polygons
function polygon2invertmask(FC){
// Reduce the collection to an image, where each pixel
// is the mean of the 'value' property in all features
// intersecting that pixel.
var fc_image_reduced = FC.reduceToImage(['DN'], 'mean').int().rename('mask');
// Make mask from polygon
var mask_1 = fc_image_reduced ; // 
// Mask 1 / 0 (NULL -> 0) 
var mask_2 = mask_1.unmask();
// Invert mask 1 / 0  - > NULL
var invert_mask = mask_2.not().selfMask();
return invert_mask;
}
// Настройки отображения слоев
var rgbVis_False_color_SWIR = {
  min: 500,
  max: 5500,
  bands: ['B12', 'B8A', 'B4'],
};
var vis_NBR = {
  min: -0.5,
  max: 0.5,
  palette: ['d7191c', 'fdae61', 'ffffbf', 'a6d96a', '1a9641']
};
var vis_dNBR = {
  min: -500,
  max: 900,
  palette: ['1a9641', 'a6d96a', 'ffffbf', 'fdae61', 'd7191c']
};
var visBurned  = {
  min: 0,
  max: 1,
  palette: ['000000', 'red']
};
var vis_dNBR_classes = {
  min: -1,
  max: 4,
  palette: ['000000', 'feb24c', 'fd8d3c', 'fc4e2a', 'e31a1c', 'b10026']
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Даты снимков:
// 2019-12-07
// 2020-03-19 (хороший снимок,многогорит) 
// 2020-03-26 (хороший снимок, многогорит и пожарищ) 
// 2020-04-03 (хороший снимок, многогорит и пожарищ)
// 2020-04-08 (хороший снимок, многогорит и пожарищ, появился большой пожар)
// 2020-04-23 (хороший снимок, многопожарищ)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2019-12-07 до пожаров //
var startDate_191207 = ee.Date('2019-12-03');
var endDate_191207 = ee.Date('2019-12-08');
var dataset_191207 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_191207,endDate_191207)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_191207.size());
    print('dataset_191217',dataset_191207);
var med_dataset_191207 = dataset_191207.median().uint16().clip(geometry);
// print('med_dataset_191207:',med_dataset_191207);
Map.addLayer(med_dataset_191207.clip(geometry), rgbVis_False_color_SWIR, '191207_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2020-03-19 (хороший снимок, многогорит и пожарищ)
var startDate_200319 = ee.Date('2020-03-18');
var endDate_200319 = ee.Date('2020-03-20');
var dataset_200319 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_200319,endDate_200319)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_200319.size());
    print('dataset_200319',dataset_200319);
var med_dataset_200319 = dataset_200319.median().uint16().clip(geometry);
// print('med_dataset_200319:',med_dataset_200319);
Map.addLayer(med_dataset_200319.clip(geometry), rgbVis_False_color_SWIR, '200319_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2020-03-26 (хороший снимок, многогорит и пожарищ) 
var startDate_200326 = ee.Date('2020-03-25');
var endDate_200326 = ee.Date('2020-03-27');
var dataset_200326 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_200326,endDate_200326)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_200326.size());
    print('dataset_200326',dataset_200326);
var med_dataset_200326 = dataset_200326.median().uint16().clip(geometry);
// print('med_dataset_200326:',med_dataset_200326);
Map.addLayer(med_dataset_200326.clip(geometry), rgbVis_False_color_SWIR, '200326_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2020-04-03 (хороший снимок, многогорит и пожарищ)
var startDate_200403 = ee.Date('2020-04-02');
var endDate_200403 = ee.Date('2020-04-04');
var dataset_200403 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_200403,endDate_200403)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_200403.size());
    print('dataset_200403',dataset_200403);
var med_dataset_200403 = dataset_200403.median().uint16().clip(geometry);
// print('med_dataset_200403:',med_dataset_200403);
Map.addLayer(med_dataset_200403.clip(geometry), rgbVis_False_color_SWIR, '200403_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2020-04-08 (хороший снимок, многогорит и пожарищ, появился большой пожар)
var startDate_200408 = ee.Date('2020-04-07');
var endDate_200408 = ee.Date('2020-04-09');
var dataset_200408 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_200408,endDate_200408)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_200408.size());
    print('dataset_200408',dataset_200408);
var med_dataset_200408 = dataset_200408.median().uint16().clip(geometry);
// print('med_dataset_200408:',med_dataset_200408);
Map.addLayer(med_dataset_200408.clip(geometry), rgbVis_False_color_SWIR, '200408_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2020-04-23 (хороший снимок, многопожарищ)
var startDate_200423 = ee.Date('2020-04-22');
var endDate_200423 = ee.Date('2020-04-24');
var dataset_200423 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(startDate_200423,endDate_200423)
                  .filterBounds(geometry)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']); 
    print('Number of Sent. scenes', dataset_200423.size());
    print('dataset_200423',dataset_200423);
var med_dataset_200423 = dataset_200423.median().uint16().clip(geometry);
// print('med_dataset_200423:',med_dataset_200423);
Map.addLayer(med_dataset_200423.clip(geometry), rgbVis_False_color_SWIR, '200423_False_color_SWIR', false);
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Считаем NBR за все даты
var NBR_191207 = calc_NBR(med_dataset_191207);
var NBR_200319 = calc_NBR(med_dataset_200319);
var NBR_200326 = calc_NBR(med_dataset_200326);
var NBR_200403 = calc_NBR(med_dataset_200403);
var NBR_200408 = calc_NBR(med_dataset_200408);
var NBR_200423 = calc_NBR(med_dataset_200423);
// Добавим NBR на карту
// Map.addLayer(NBR_191207, vis_NBR, 'NBR_191207',false);
// Map.addLayer(NBR_200319, vis_NBR, 'NBR_200319',false);
// Map.addLayer(NBR_200326, vis_NBR, 'NBR_200326',false);
// Map.addLayer(NBR_200403, vis_NBR, 'NBR_200403',false);
// Map.addLayer(NBR_200408, vis_NBR, 'NBR_200408',false);
// Map.addLayer(NBR_200423, vis_NBR, 'NBR_200423',false);
// Считаем dNBR за все диапзоны дат
var dNBR_191207_200319 = calc_dNBR(NBR_191207, NBR_200319);
var dNBR_200319_200326 = calc_dNBR(NBR_200319, NBR_200326);
var dNBR_200326_200403 = calc_dNBR(NBR_200326, NBR_200403);
var dNBR_200403_200408 = calc_dNBR(NBR_200403, NBR_200408);
var dNBR_200408_200423 = calc_dNBR(NBR_200408, NBR_200423);
// Добавим dNBR на карту
// Map.addLayer(dNBR_191207_200319, vis_dNBR, 'dNBR_191207_200319',false);
// Map.addLayer(dNBR_200319_200326, vis_dNBR, 'dNBR_200319_200326',false);
// Map.addLayer(dNBR_200326_200403, vis_dNBR, 'dNBR_200326_200403',false);
// Map.addLayer(dNBR_200403_200408, vis_dNBR, 'dNBR_200403_200408',false);
// Map.addLayer(dNBR_200408_200423, vis_dNBR, 'dNBR_200408_200423',false);
// Расчитаем маску сгореших территорий из dNBR
var burned_mask_191207_200319 = calc_burned_mask(dNBR_191207_200319, burn_dNBR_191207_200319);
var burned_mask_200319_200326 = calc_burned_mask(dNBR_200319_200326, burn_dNBR_200319_200326);
var burned_mask_200326_200403 = calc_burned_mask(dNBR_200326_200403, burn_dNBR_200326_200403);
var burned_mask_200403_200408 = calc_burned_mask(dNBR_200403_200408, burn_dNBR_200403_200408);
var burned_mask_200408_200423 = calc_burned_mask(dNBR_200408_200423, burn_dNBR_200408_200423);
// Добавим маску сгореших территорий из dNBR на карту
// Map.addLayer(burned_mask_191207_200319.clip(geometry), visBurned, 'burned_191207_200319', false);
// Map.addLayer(burned_mask_200319_200326.clip(geometry), visBurned, 'burned_200319_200326', false);
// Map.addLayer(burned_mask_200326_200403.clip(geometry), visBurned, 'burned_200326_200403', false);
// Map.addLayer(burned_mask_200403_200408.clip(geometry), visBurned, 'burned_200403_200408', false);
// Map.addLayer(burned_mask_200408_200423.clip(geometry), visBurned, 'burned_200408_200423', false);
// Расчитаем классы сгореших территорий из dNBR
var pre1_burned_classes_191207_200319 = calc_burned_classes(dNBR_191207_200319);
var pre1_burned_classes_200319_200326 = calc_burned_classes(dNBR_200319_200326);
var pre1_burned_classes_200326_200403 = calc_burned_classes(dNBR_200326_200403);
var pre1_burned_classes_200403_200408 = calc_burned_classes(dNBR_200403_200408);
var pre1_burned_classes_200408_200423 = calc_burned_classes(dNBR_200408_200423);
// обрезаем классифицированный dNBR по маскесгоревших территорий
var pre2_burned_classes_191207_200319 = pre1_burned_classes_191207_200319.updateMask(burned_mask_191207_200319);
var pre2_burned_classes_200319_200326 = pre1_burned_classes_200319_200326.updateMask(burned_mask_200319_200326);
var pre2_burned_classes_200326_200403 = pre1_burned_classes_200326_200403.updateMask(burned_mask_200326_200403);
var pre2_burned_classes_200403_200408 = pre1_burned_classes_200403_200408.updateMask(burned_mask_200403_200408);
var pre2_burned_classes_200408_200423 = pre1_burned_classes_200408_200423.updateMask(burned_mask_200408_200423);
// создание маски для уточнения маски по второму NBR2
var burned_NBR2_200319 = calc_burned_NBR2(med_dataset_200319, NBR_200319, burn_NBR_200319, burn_RED_200319, burn_NIR_200319);
var burned_NBR2_200326 = calc_burned_NBR2(med_dataset_200326, NBR_200326, burn_NBR_200326, burn_RED_200326, burn_NIR_200326);
var burned_NBR2_200403 = calc_burned_NBR2(med_dataset_200403, NBR_200403, burn_NBR_200403, burn_RED_200403, burn_NIR_200403);
var burned_NBR2_200408 = calc_burned_NBR2(med_dataset_200408, NBR_200408, burn_NBR_200408, burn_RED_200408, burn_NIR_200408);
var burned_NBR2_200423 = calc_burned_NBR2(med_dataset_200423, NBR_200423, burn_NBR_200423, burn_RED_200423, burn_NIR_200423);
// обрезкапо маске нарисованной вручную
var burned_classes_191207_200319 = pre2_burned_classes_191207_200319.updateMask(burned_NBR2_200319);
var burned_classes_200319_200326 = pre2_burned_classes_200319_200326.updateMask(burned_NBR2_200326);
var burned_classes_200326_200403 = pre2_burned_classes_200326_200403.updateMask(burned_NBR2_200403);
var burned_classes_200403_200408 = pre2_burned_classes_200403_200408.updateMask(burned_NBR2_200408);
var burned_classes_200408_200423 = pre2_burned_classes_200408_200423.updateMask(burned_NBR2_200423);
// Добавим классы сгореших территорий из dNBR на карту
Map.addLayer(burned_classes_191207_200319.clip(geometry), vis_dNBR_classes, 'burn_0319', false);
Map.addLayer(burned_classes_200319_200326.clip(geometry), vis_dNBR_classes, 'burn_0326', false);
Map.addLayer(burned_classes_200326_200403.clip(geometry), vis_dNBR_classes, 'burn_0403');
Map.addLayer(burned_classes_200403_200408.clip(geometry), vis_dNBR_classes, 'burn_0408');
Map.addLayer(burned_classes_200408_200423.clip(geometry), vis_dNBR_classes, 'burn_0423');