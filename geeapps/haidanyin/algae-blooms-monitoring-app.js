/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2_l2a = ee.ImageCollection("COPERNICUS/S2_SR"),
    s2cloud = ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    s2 = ee.ImageCollection("COPERNICUS/S2"),
    tangxunhu = /* color: #23cba7 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[114.3067009209763, 30.47240725717814],
                  [114.3067009209763, 30.363454929628848],
                  [114.44334337703098, 30.363454929628848],
                  [114.44334337703098, 30.47240725717814]]], null, false),
            {
              "system:index": "0"
            })]),
    tonghu = 
    /* color: #ff0000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[114.18075087621594, 23.02551394953689],
                  [114.18075087621594, 22.998653783082204],
                  [114.24804213598156, 22.998653783082204],
                  [114.24804213598156, 23.02551394953689]]], null, false),
            {
              "system:index": "0"
            })]),
    taihu = 
    /* color: #00ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[119.88119717261603, 31.58181725370079],
                  [119.88119717261603, 30.898460026633128],
                  [120.72439785620978, 30.898460026633128],
                  [120.72439785620978, 31.58181725370079]]], null, false),
            {
              "system:index": "0"
            })]),
    chaohu = 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[117.24353328603102, 31.737104137042806],
                  [117.24353328603102, 31.396610282728346],
                  [117.88211360829665, 31.396610282728346],
                  [117.88211360829665, 31.737104137042806]]], null, false),
            {
              "system:index": "0"
            })]),
    shenzhen = 
    /* color: #999900 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[113.96558396323736, 22.53760016869911],
                  [113.96558396323736, 22.527690357602342],
                  [113.98584000571783, 22.527690357602342],
                  [113.98584000571783, 22.53760016869911]]], null, false),
            {
              "system:index": "0"
            })]),
    dianchi = 
    /* color: #009999 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[102.55498893454947, 25.03159327334403],
                  [102.55498893454947, 24.632772373703258],
                  [102.84338004783072, 24.632772373703258],
                  [102.84338004783072, 25.03159327334403]]], null, false),
            {
              "system:index": "0"
            })]),
    xingyunhu = 
    /* color: #ff00ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[102.7415570197582, 24.396381576864542],
                  [102.7415570197582, 24.280641738621465],
                  [102.82052125315664, 24.280641738621465],
                  [102.82052125315664, 24.396381576864542]]], null, false),
            {
              "system:index": "0"
            })]),
    taihu2 = /* color: #98ff00 */ee.Geometry.Point([120.28610401087052, 31.202609168353682]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*
 *
 *
 This is developed by Yinhaidna,VHR group of School of Remote Sensing and Information Engineering,Wuhan University.
 This APP can be used to monitor the algae blooms of major lakes in China.
 *
 *
 */
var T = 1.35; //判断是否发生水华现象的阈值
Map.setCenter(113.08, 27.65, 6)//104°21′15〃，北纬28°42′30〃
//NDVI
function NDVI(image) {
           return image.addBands(
    image.normalizedDifference(["B8", "B4"])
         .rename("NDVI"));
}
//MNDWI
function MNDWI(img) {
 var ndwi = img.normalizedDifference(["B3","B11"]);
 return img.addBands(ndwi.rename('MNDWI'));
}
//EVI
function EVI(image) {
              var evi = image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 10000))', {
             'NIR' : image.select('B8'),
             'RED' : image.select('B4'),
             'BLUE': image.select('B2')
  })
             return image.addBands(evi.rename("EVI"))
}
      //OTSU
function otsu(histogram) {
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
}
      //S2_AI
function s2_AI(img){
    var s2_ai = img.expression(
    '0.001*(-B2-2*B4+3*B5+B6-0.8*B8A)-1.25',{     //0.001*(B2-4*B4+4*B5+0.8*B7-B8A-0.8*B9+B11-B12)-2.23
      B1:img.select('B1'),
      B2:img.select('B2'),                       //0.001*(-B1+2*B3-2*B4+0.5*B5+B6-B8A)-1.29
      B3:img.select('B3'),                   
      B4:img.select('B4'),                    //0.001*(-3*B4+3*B5+0.8*B8-B8A)-1.09'  
      B5:img.select('B5'),                   //0.001*(-B1+2*B3+0.6*B5+0.8*B6-0.6*B8A)-1.24
      B6:img.select('B6'),                    //0.001（-B1+B3-0.2B5+0.2B6-B8A)-1.06
      B8:img.select('B8'),                     //0.001（-B1+2B3-2B4+0.6B5+0.9B6-0.7B8A-0.8B12)-1.26
      B8A:img.select('B8A'),        
      B12:img.select('B12')
    })
    //ρ2-4ρ4+4ρ5+0.8ρ7-ρ8A-0.8ρ9+ρ11-ρ12
    return img.addBands(s2_ai.rename('s2_AInew'));
}  
//var layers = mapPanel.layers();
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var Panel = ui.Panel({style: {width: '23%'}});
// Create an intro panel with labels.
var logo = ee.Image('users/zijunxiaocug/logo');
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        format: 'png'
        },
    style: {stretch: 'horizontal', height: '80px', width: '342px',padding :'0'}
    });
//var toolPanel = ui.Panel(thumb);
var intro = ui.Panel(
  ui.Label('Developed by Yin haidan, VHR of WUHAN UNIVERSITY',
    {fontSize: '11px'})
);
Panel.add(thumb).add(intro);
/*
 * (1)单张图像查询及可视化
 */
//select roi(dictionary) 
///////////////////// 单张图像
var oneimg = ui.Panel([
  ui.Label({
    value: '(1)单张图像水华现象查询及可视化',
    style: {fontSize: '16px', fontWeight: 'bold', color: 'red'}
  }),
]);
Panel.add(oneimg);
var List = {
  '汤逊湖': tangxunhu,//    
  '巢湖': chaohu,
  '太湖': taihu,
  '潼湖': tonghu,
  '滇池': dianchi,
  '星云湖': xingyunhu,
  '深圳华侨城人工湖':shenzhen
};
////////////////////////////////// TS of tangxunhu///////////////////////
var list2 = ['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12','s2_AI','MNDWI']
var name1 = ee.Image('users/haidanyin/algaeimgs/wuhan_01')
var name2 = ee.Image('users/haidanyin/algaeimgs/wuhan_02')
var name3 = ee.Image('users/haidanyin/algaeimgs/wuhan_03')
var name4 = ee.Image('users/haidanyin/algaeimgs/wuhan_04')
var name5 = ee.Image('users/haidanyin/algaeimgs/wuhan_05')
var name6 = ee.Image('users/haidanyin/algaeimgs/wuhan_06')
var name7 = ee.Image('users/haidanyin/algaeimgs/wuhan_07')
var name8 = ee.Image('users/haidanyin/algaeimgs/wuhan_08')
var name9 = ee.Image('users/haidanyin/algaeimgs/wuhan_09')
var name10 = ee.Image('users/haidanyin/algaeimgs/wuhan_10')
var name11 = ee.Image('users/haidanyin/algaeimgs/wuhan_11')
var name12 = ee.Image('users/haidanyin/algaeimgs/wuhan_12')
var tangxunhulake = ee.ImageCollection.fromImages([name1,name2,name3,name4,name5,name6,name7,name8,name9,name10,name11,name12])
tangxunhulake = tangxunhulake.select(list2)
                 .map(NDVI)
                 .map(s2_AI)
                 .map(EVI)
////////////////////////////////// TS of chaonhu///////////////////////     
var name1a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_01')
var name2a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_02')
var name3a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_03')
var name4a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_04')
var name5a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_05')
var name6a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_06')
var name7a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_07')
var name8a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_08')
var name9a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_10')
var name10a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_10')
var name11a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_11')
var name12a = ee.Image('users/zijunxiaocug/algaeimgs/chaohu_12')
var chaohulake = ee.ImageCollection.fromImages([name1a,name2a,name3a,name4a,name5a,name6a,name7a,name8a,name9a,name10a,name11a,name12a])
chaohulake = chaohulake.select(list2)
                 .map(NDVI)
                 .map(s2_AI)
                 .map(EVI)
////////////////////////////////// TS of taihu/////////////////////// 
var name1b = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/taihu_01')
var name2b = ee.Image('users/xiaozijun21/algaeimgs/taihu_02')
var name3b = ee.Image('users/xiaozijun21/algaeimgs/taihu_03')
var name4b = ee.Image('users/xiaozijun21/algaeimgs/taihu_04')
var name5b = ee.Image('users/xiaozijun21/algaeimgs/taihu_05')
var name6b = ee.Image('users/xiaozijun21/algaeimgs/taihu_06')
var name7b = ee.Image('users/xiaozijun21/algaeimgs/taihu_07')
var name8b = ee.Image('users/xiaozijun21/algaeimgs/taihu_08')
var name9b = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/taihu_09')
var name10b = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/taihu_10')
var name11b = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/taihu_11')
var name12b = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/taihu_12')
var taihulake = ee.ImageCollection.fromImages([name1b,name2b,name3b,name4b,name5b,name6b,name7b,name8b,name9b,name10b,name11b,name12b])
taihulake = taihulake.select(list2)
                 .map(NDVI)
                 .map(s2_AI)
                 .map(EVI)
////////////////////////////////// TS of tonghu///////////////////////
var name1c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_01')
var name2c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_02')
var name3c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_03')
var name4c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_04')
var name5c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_05')
var name6c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_06')
var name7c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_07')
var name8c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_08')
var name9c = ee.Image('users/zijunxiaocug/algaeimgs/tonghu_09')
var name10c = ee.Image('projects/ee-zijunxiaocug/assets/algaeimgs/tonghu_10')
var name11c = ee.Image('projects/ee-zijunxiaocug/assets/algaeimgs/tonghu_11')
var name12c = ee.Image('projects/ee-zijunxiaocug/assets/algaeimgs/tonghu_12')
var tonghulake = ee.ImageCollection.fromImages([name1c,name2c,name3c,name4c,name5c,name6c,name7c,name8c,name9c,name10c,name11c,name12c])
tonghulake = tonghulake.select(list2)
                 .map(NDVI)
                 .map(s2_AI)
                 .map(EVI)
////////////////////////////////// TS of dianchi & xingyunhu///////////////////////                 
var name1d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_01')
var name2d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_02')
var name3d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_03')
var name4d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_04')
var name5d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_05')
var name6d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_06')
var name7d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_07')
var name8d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_08')
var name9d = ee.Image('users/xiaozijun21/algaeimgs/dian_xingyun_09')
var name10d = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/dian_xingyun_10')
var name11d = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/dian_xingyun_11')
var name12d = ee.Image('projects/ee-xiaozijun21/assets/algaeimgs/dian_xingyun_12')
var yunnanlake = ee.ImageCollection.fromImages([name1d,name2d,name3d,name4d,name5d,name6d,name7d,name8d,name9d,name10d,name11d,name12d])
yunnanlake = yunnanlake.select(list2)
                 .map(NDVI)
                 .map(s2_AI) 
                 .map(EVI)
var yunnanlake2 = ee.ImageCollection.fromImages([name1d,name2d]);
yunnanlake2 = yunnanlake2.select(list2)
                 .map(NDVI)
                 .map(s2_AI) 
                 .map(EVI)
////////////////////////////////// TS of shenzhen/////////////////////// 
var name1f = ee.Image('users/haidanyin/algaeimgs/shenzhen_01')
var name2f = ee.Image('users/haidanyin/algaeimgs/shenzhen_02')
var name3f = ee.Image('users/haidanyin/algaeimgs/shenzhen_03')
var name4f = ee.Image('users/haidanyin/algaeimgs/shenzhen_04')
var name5f = ee.Image('users/haidanyin/algaeimgs/shenzhen_05')
var name6f = ee.Image('users/haidanyin/algaeimgs/shenzhen_06')
var name7f = ee.Image('users/haidanyin/algaeimgs/shenzhen_07')
var name8f = ee.Image('users/zijunxiaocug/algaeimgs/shenzhen_08')//users/zijunxiaocug/algaeimgs/shenzhen_08
var name9f = ee.Image('users/zijunxiaocug/algaeimgs/shenzhen_09')
var name10f = ee.Image('projects/ee-zijunxiaocug/assets/algaeimgs/shenzhen_10')
var name11f = ee.Image('users/zijunxiaocug/algaeimgs/shenzhen_11')
var name12f = ee.Image('users/zijunxiaocug/algaeimgs/shenzhen_12')                 
var shenzhenlake = ee.ImageCollection.fromImages([name1f,name2f,name3f,name4f,name5f,name6f,name7f,name8f,name9f,name10f,name11f,name12f])
shenzhenlake = shenzhenlake.select(list2)
                 .map(NDVI)
                 .map(s2_AI)
                 .map(EVI)
///////////////////////water roi selection
var select = ui.Select({
  items: Object.keys(List),
  onChange: getDate,
  placeholder: "请选择研究水体",
  style: {stretch: 'horizontal', maxHeight: '25px'},
  })
/////
var selDateFake = ui.Button({
    label: "Select a date",
    style: {stretch: 'horizontal', maxHeight: '25px'} 
  })
var buttonFake = ui.Button({
  label: "Display Image",
  style: {stretch: 'horizontal', maxHeight: '25px'}
})
Panel.add(select)
Panel.add(selDateFake)
Panel.add(buttonFake) 
//print(select.getValue())
  function getDate(key) {
  //////////// Exclui coisas da imagem
  //print('hhh is',select.getValue())
  Map.clear();
  Panel.remove(selDate1);
  Panel.remove(button1);
  //一些为了点击时画面不动的美观操作
/////////***********************************************************************************////////  
  Panel.remove(two);
  Panel.remove(selDateFake2);
  Panel.remove(select2);
  Panel.remove(buttonFake2);
  Panel.remove(three)
  Panel.remove(select3)
  Panel.remove(selDateFake3)
  Panel.remove(buttonFake3)
  Panel.remove(buttonFake33)
/////////***********************************************************************************////////  
  //Panel.clear()
  ////////////// Zoom para a região escolhida
 // var centre1 = List[select.getValue()].geometry().centroid().coordinates();
  Map.centerObject(List[select.getValue()], 10);
  /////////// Seleciona a região escolhida
  var region3 = List[select.getValue()];   /////////得到研究区
  //var clipe = region3.geometry()
  if (region3 == taihu){
        var region3 = taihu2;
      }
  var collection11 = ee.ImageCollection('COPERNICUS/S2')
        .select(['B2'])
        .filterBounds(region3)
        // Pre-filter to get less cloudy granules.
        .filter(ee.Filter.neq('system:band_names', []))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30));
  //
  //////////////// Cria uma coleção de datas
  var Meses1 = collection11
    .map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})
    })
    .distinct('date')
    .aggregate_array('date')
  //print(Meses1) 
  //////////////// Widgets para fornecer as datas disponíveis e para selecioná-las
  var dateList1 = Meses1;
  var selDate1 = ui.Select({
    placeholder: "Select a date", 
    items: dateList1.getInfo(),
    style: {stretch: 'horizontal', maxHeight: '25px'},
  })
  ///////////////// button a single image analysis
  var button1 = ui.Button({
  label: "Display Image",
  onClick: updateMap1,
  style: {stretch: 'horizontal', maxHeight: '25px'},
   //Map.setCenter(places[key][0], places[key][1]);
  })
  /////// 向地图添加按钮以选择日期，并添加按钮以显示图像 
  Panel.remove(selDateFake);
  Panel.remove(buttonFake);
  Panel.add(selDate1);
  Panel.add(button1);
  //一些为了点击时画面不动的美观操作
/////////***********************************************************************************////////
  Panel.add(two);
  Panel.add(select2);
  Panel.add(selDateFake2);
  Panel.add(buttonFake2);
  Panel.add(three)
  Panel.add(select3)
  Panel.add(selDateFake3)
  Panel.add(buttonFake3)
  Panel.add(buttonFake33)
/////////***********************************************************************************////////
  ////////////////////////////////// Função para processar o Single image analysis
  function updateMap1(region1) {
      var region1 = List[select.getValue()];   //////得到研究区
      //print(region1)
      //var region11 = taihu2;
      if (region1 == taihu){
        var region1 = taihu2;
      }
      var fromDateSentinel = ee.Date(selDate1.getValue()).advance(-1,"day").format("yyyy-MM-dd"); ////// Uma data do dia anterior à selecionada
      var toDateSentinel = ee.Date(selDate1.getValue()).advance(+1,"day").format("yyyy-MM-dd"); 
      var collection1 = s2.filterBounds(region1)
                          .filterDate(fromDateSentinel, toDateSentinel);
      var collection2 = s2cloud.filterBounds(region1)
                               .filterDate(fromDateSentinel, toDateSentinel);
      function rmCloudByProbability(image) {
        var prob = image.select("probability");
        return image.updateMask(prob.lte(30));
      }
      function mergeimgs(primary,secondary){
        var join = ee.Join.inner()
        var filter = ee.Filter.equals({
          leftField: 'system:index',rightField: 'system:index'});
          var joinCol = join.apply(primary, secondary, filter);
          joinCol = joinCol.map(function(image) {
            var img1 = ee.Image(image.get("primary"));
            var img2 = ee.Image(image.get("secondary"));
            return img1.addBands(img2);
          });
          return ee.ImageCollection(joinCol);
      }
      var mergecol = mergeimgs(collection1,collection2)
                 //.map(AC)
                 //.map(rmCloudByProbability)
                 .map(MNDWI)
                 .map(s2_AI)
                 .map(NDVI)
                 //.aside(print) 
      Map.clear();
      //// set center
      Map.centerObject(List[select.getValue()], 10);
      ////////// RGB
      var RGB = mergecol.first();
      var studyimg = rmCloudByProbability(mergecol.first());
      if (region1 == tangxunhu){
        var studylake = tangxunhulake;
      }
      else if(region1 == chaohu){
        var studylake = chaohulake;
      }
      else if(region1 == taihu2){
        var studylake = taihulake;
      }
      else if(region1 == tonghu){
        var studylake = tonghulake;
      }
      else if(region1 == dianchi){
        var studylake = yunnanlake;
      }
      else if(region1 == xingyunhu){
        var studylake = yunnanlake2;
      }
      else {
        var studylake = shenzhenlake;
     }
    var studylake = studylake.select(list2)
                 .map(NDVI)
                 //.map(s2_AI)  
    var studyimg = studyimg.updateMask(studylake.first().select('B2').mask());
    //Map.addLayer(studyimg,{min:0,max:3000,bands:["B8", "B4", "B3"]},'研究图像假彩色');
    //Map.centerObject(name2,8)             
  /////////////////////////水体提取/////////////////////////
  var histogram1 = studyimg.select('MNDWI')
                         .reduceRegion({
                           reducer: ee.Reducer.histogram(), 
                           geometry: studyimg.geometry(), //water
                           scale: 10,
                           maxPixels: 1e13,
                           tileScale: 8
                          });
  var threshold_water = otsu(histogram1.get("MNDWI"));
  //print(threshold_water,'threshold_S2')
  var mask = studyimg.select('MNDWI').gte(threshold_water);
  //mask = mask.updateMask(mask)  
  var waterimg = studyimg.updateMask(mask)
  //print(waterimg)
  /////////////////////////////TSA/////////////////////////
  var mean = studylake.mean().updateMask(waterimg.select('B2').mask());
  var variance = studylake.reduce(ee.Reducer.variance()).updateMask(waterimg.select('B2').mask());
  //print(variance)
  var b4 = mean.select('B4').updateMask(waterimg.select('B2').mask());
  var b6 = mean.select('B6').updateMask(waterimg.select('B2').mask());
  var b7 = mean.select('B7').updateMask(waterimg.select('B2').mask());
  var b8 = mean.select('B8').updateMask(waterimg.select('B2').mask());
  var b8a = mean.select('B8A').updateMask(waterimg.select('B2').mask());
  var TSA = waterimg.expression('ndvi*s2_AI_var*(b6+b7+b8+b8a-4*b4)', {
             'ndvi' : mean.select('NDVI').abs(),
             's2_AI_var' : variance.select('s2_AI_variance'),
             'b6': b6,
             'b7': b7,
             'b8': b8,
             'b8a': b8a,
             'b4': b4,
              }).rename('TSA')
  var TSAmask = TSA.updateMask(TSA.lte(0));//////去除水田像素后的水体
  var usedimg = studyimg.updateMask(TSAmask.mask());//.clip(lake)
  //print(usedimg) 
   if (region1 == taihu2){
        var region1 = taihu;
      }
  ////////////////////////水华提取////////////////////////
  var histogram2 = usedimg.select('s2_AInew')
                        .reduceRegion({
                           reducer: ee.Reducer.histogram(), 
                           geometry: region1, 
                           scale: 10,
                           maxPixels: 1e13,
                           tileScale: 8
                          });
  var threshold_algae = otsu(histogram2.get("s2_AInew"));
  //print('threshold_algae',threshold_algae)
  var mask2 = usedimg.select('s2_AInew').gte(threshold_algae);
  var algaeimg = usedimg.updateMask(mask2).clip(region1);
  //////////////////无水华现象的max//////////////////////
  var indexmax1 = algaeimg.select('s2_AInew').reduceRegion({
    reducer:ee.Reducer.max(),
    geometry: region1,
    scale:30,
    maxPixels:1e13
  })
  indexmax1 = indexmax1.getNumber('s2_AInew');
  var check1 = indexmax1.lt(T)//.getInfo();
  //print(check1)
      var rgbVis = {
        min: 0,
        max: 3000,
        bands: ['B4', 'B3', 'B2'],
      };
      var rgbVis2 = {
        min: 0,
        max: 3000,
        bands: ['B8', 'B4', 'B3'],
      };
      var vis1 = {min:0, max:1, palette: ['#4c9aeb','#50eb00']};    
      //-display image
      //print(label1); 
      var warning = ui.Label({
        value: '此影像无水华现象发生,图片仅供参考',
        style: {fontSize: '15px', fontWeight: 'bold', color: 'blue'}
      })
      if(0){
        Map.add(warning);
      }
      Map.addLayer(RGB, rgbVis, 'Sentinel RGB',false); 
      Map.addLayer(RGB, rgbVis2, 'Sentinel 假彩色');  
      Map.addLayer(waterimg,{min:0,max:3000,bands:["B8", "B4", "B3"]},'水体提取',false);
      Map.addLayer(usedimg,{min:0,max:3000,bands:["B8", "B4", "B3"]},'用于水华提取的底图',false); 
      Map.addLayer(mask2,vis1,'水华提取图');
      //Map.addLayer(algaeimg.select('s2_AInew'),vis1,'水华提取图');
      //Map.addLayer(chla1.select('Bloom').clip(region1), vis1, 'BLOOM', false)
      //Map.addLayer(macrofita.clip(region3), {palette: ['red']}, 'Macrófitas', false);  
      //Panel.add(label1)
      ///////////////////////// Legends /////////////////////////////////////////////////////////////
      ////// title (BLOOM)
      var legend_BLOOM = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
      });
      ////// 创建和设计bloom的class
      var makeRow = function(color, name) {
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle_BLOOM = ui.Label({
        value: '图例',
        style: {fontWeight: 'bold'}
      });
      var palette = ['4c9aeb', '00FF00'];
      var names = ['非水华','水华'];
      for (var i = 0; i < 2; i++) {
        legend_BLOOM.add(makeRow(palette[i], names[i]));
        }  
      //////// Panel inicial para hospedar todas as legendas 
      var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
      });
      ///////// Adicionar as legendas
      var legend = legend.add(legendTitle_BLOOM).add(legend_BLOOM)
      Map.add(legend);
  }
}    
/*
 * (2)月度图像查询及可视化
 */  
////// 
var two = ui.Panel([
  ui.Label({
    value: '(2)月度影像水华现象查询及可视化',
    style: {fontSize: '16px', fontWeight: 'bold', color: 'red'}
  }),
]);
//print(two)
Panel.add(two);          
//print(Panel.widgets())   
var List22 = {
  '汤逊湖': tangxunhu,//    
  '巢湖': chaohu,
  '太湖': taihu,
  '潼湖': tonghu,
  '滇池': dianchi,
  //'星云湖': xingyunhu,
  '深圳华侨城人工湖':shenzhen
};
var select2 = ui.Select({
  items: Object.keys(List22),
  onChange: getmonth,
  placeholder: "请选择研究水体",
  style: {stretch: 'horizontal', maxHeight: '25px'},
  });
var selDateFake2 = ui.Button({
    label: "Select a month",
    style: {stretch: 'horizontal', maxHeight: '25px'} 
  })
var buttonFake2 = ui.Button({
  label: "Display Monthly Image ",
  style: {stretch: 'horizontal', maxHeight: '25px'}
})
Panel.add(select2)
Panel.add(selDateFake2)
Panel.add(buttonFake2) 
function getmonth(key) {
  //print('hhh is',select.getValue())
  Map.clear();
  Panel.remove(selDate2);
  Panel.remove(button2);
    //一些为了点击时画面不动的美观操作
/////////***********************************************************************************////////  
  Panel.remove(three)
  Panel.remove(select3)
  Panel.remove(selDateFake3)
  Panel.remove(buttonFake3)
  Panel.remove(buttonFake33)
/////////***********************************************************************************//////// 
  //Panel.clear()
  ////////////// Zoom para a região escolhida
 // var centre1 = List[select.getValue()].geometry().centroid().coordinates();
  Map.centerObject(List22[select2.getValue()], 10);
  /////////// Seleciona a região escolhida
  var region1 = List22[select2.getValue()];   /////////得到研究区
  //var clipe = region3.geometry()
  if (region1 == tangxunhu){
        var studylake = tangxunhulake;
      }
      else if(region1 == chaohu){
        var studylake = chaohulake;
      }
      else if(region1 == taihu){
        var studylake = taihulake;
      }
      else if(region1 == tonghu){
        var studylake = tonghulake;
      }
      else if(region1 == dianchi){
        var studylake = yunnanlake;
      }
      else {
        var studylake = shenzhenlake;
     }
  var Month2 = studylake
    .map(function(img) {
      return ee.Feature(null, {'date': ee.Date.parse("MM", img.get('month')).format('MM') })
    })
    .aggregate_array('date')
  //print(Meses1) 
  //////////////// Widgets para fornecer as datas disponíveis e para selecioná-las
  var dateList2 = Month2;
  var selDate2 = ui.Select({
    placeholder: "Select a month", 
    items: dateList2.getInfo(),
    style: {stretch: 'horizontal', maxHeight: '25px'},
  })
  ///////////////// button a single image analysis
  var button2 = ui.Button({
  label: "Display Monthly Image ",
  onClick: updateMap2,
  style: {stretch: 'horizontal', maxHeight: '25px'},
   //Map.setCenter(places[key][0], places[key][1]);
  })
  /////// 向地图添加按钮以选择日期，并添加按钮以显示图像 
  Panel.remove(selDateFake2);
  Panel.remove(buttonFake2);
  Panel.add(selDate2);
  Panel.add(button2);  
     //一些为了点击时画面不动的美观操作
/////////***********************************************************************************////////
  Panel.add(three)
  Panel.add(select3)
  Panel.add(selDateFake3)
  Panel.add(buttonFake3)
  Panel.add(buttonFake33)
/////////***********************************************************************************////////
  function updateMap2(region2) {
      Map.clear();
      var region2 = List22[select2.getValue()];   //////得到研究区
      //print(region1)
      var select_month = selDate2.getValue();
      var studyimg = studylake.filter(ee.Filter.eq('month', select_month)).first().select(list2);/////不去云了
      var studyimg = NDVI(s2_AI(studyimg))//.clip(region2);
      //print(studyimg)
  /////////////////////////水体提取/////////////////////////
  var histogram1 = studyimg.select('MNDWI')
                         .reduceRegion({
                           reducer: ee.Reducer.histogram(), 
                           geometry: region2, //water
                           scale: 10,
                           maxPixels: 1e13,
                           tileScale: 8
                          });
  var threshold_water = otsu(histogram1.get("MNDWI"));
  //print(threshold_water,'threshold_S2')
  var mask = studyimg.select('MNDWI').gte(threshold_water);
  //mask = mask.updateMask(mask)  
  var waterimg = studyimg.updateMask(mask)
  //print(waterimg)
  /////////////////////////////TSA/////////////////////////
  var mean = studylake.mean().updateMask(waterimg.select('B2').mask());
  var variance = studylake.reduce(ee.Reducer.variance()).updateMask(waterimg.select('B2').mask());
  //print(variance)
  var b4 = mean.select('B4').updateMask(waterimg.select('B2').mask());
  var b6 = mean.select('B6').updateMask(waterimg.select('B2').mask());
  var b7 = mean.select('B7').updateMask(waterimg.select('B2').mask());
  var b8 = mean.select('B8').updateMask(waterimg.select('B2').mask());
  var b8a = mean.select('B8A').updateMask(waterimg.select('B2').mask());
  var TSA = waterimg.expression('ndvi*s2_AI_var*(b6+b7+b8+b8a-4*b4)', {
             'ndvi' : mean.select('NDVI').abs(),
             's2_AI_var' : variance.select('s2_AI_variance'),
             'b6': b6,
             'b7': b7,
             'b8': b8,
             'b8a': b8a,
             'b4': b4,
              }).rename('TSA')
  var TSAmask = TSA.updateMask(TSA.lte(0));//////去除水田像素后的水体
  var usedimg = studyimg.updateMask(TSAmask.mask());//.clip(lake)
  //print(usedimg) 
  ////////////////////////水华提取////////////////////////
  var histogram2 = usedimg.select('s2_AInew')
                        .reduceRegion({
                           reducer: ee.Reducer.histogram(), 
                           geometry: region2, 
                           scale: 10,
                           maxPixels: 1e13,
                           tileScale: 8
                          });
  var threshold_algae = otsu(histogram2.get("s2_AInew"));
  //print('threshold_algae',threshold_algae)
  var mask2 = usedimg.select('s2_AInew').gte(threshold_algae);
  var algaeimg = usedimg.updateMask(mask2).clip(region2);
  //////////////////无水华现象的max//////////////////////
  var indexmax2 = algaeimg.select('s2_AInew').reduceRegion({
    reducer:ee.Reducer.max(),
    geometry: region2,
    scale:30,
    maxPixels:1e13
  })
  indexmax2 = indexmax2.getNumber('s2_AInew');
  var check2 = indexmax2.lt(T)//.getInfo();
      var rgbVis = {
        min: 0,
        max: 3000,
        bands: ['B4', 'B3', 'B2'],
      };
      var rgbVis2 = {
        min: 0,
        max: 3000,
        bands: ['B8', 'B4', 'B3'],
      };
      var vis1 = {min:0, max:1, palette: ['#4c9aeb','#50eb00']};    
      //-display image
      var warning = ui.Label({
        value: '此影像无水华现象发生',
        style: {fontSize: '15px', fontWeight: 'bold', color: 'blue'}
      })
      if(0){
        Map.add(warning);
      }
      Map.addLayer(studyimg, rgbVis, 'Monthly Sentinel RGB',false); 
      Map.addLayer(studyimg, rgbVis2, 'Monthly Sentinel 假彩色');  
      Map.addLayer(waterimg,{min:0,max:3000,bands:["B8", "B4", "B3"]},'月度水体提取',false);
      Map.addLayer(usedimg,{min:0,max:3000,bands:["B8", "B4", "B3"]},'用于水华提取的底图',false); 
      Map.addLayer(mask2,vis1,'月度水华提取图');
      ///////////////////////// Legends /////////////////////////////////////////////////////////////
      ////// title (BLOOM)
      var legend_BLOOM = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
      });
      ////// 创建和设计bloom的class
      var makeRow = function(color, name) {
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle_BLOOM = ui.Label({
        value: '图例',
        style: {fontWeight: 'bold'}
      });
      var palette = ['4c9aeb', '00FF00'];
      var names = ['非水华','水华'];
      for (var i = 0; i < 2; i++) {
        legend_BLOOM.add(makeRow(palette[i], names[i]));
        }  
      //////// Panel inicial para hospedar todas as legendas 
      var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '8px 15px'
      }
      });
      ///////// Adicionar as legendas
      var legend = legend.add(legendTitle_BLOOM).add(legend_BLOOM)
      Map.add(legend);
  }
}
/*
 * (3)水华月面积变化分析
 */  
////// 
var three = ui.Panel([
  ui.Label({
    value: '(3)水华月面积变化分析',
    style: {fontSize: '16px', fontWeight: 'bold', color: 'red'}
  }),
]);
Panel.add(three);      
var select3 = ui.Select({
  items: Object.keys(List),
  onChange: getindex,
  placeholder: "请选择研究水体",
  style: {stretch: 'horizontal', maxHeight: '25px'},
  })
var selDateFake3 = ui.Button({
    label: "Select an index",
    style: {stretch: 'horizontal', maxHeight: '25px'} 
  })
var buttonFake3 = ui.Button({
  label: "Perform the temporal analysis of the select index ",
  style: {stretch: 'horizontal', maxHeight: '25px'}
})
var buttonFake33 = ui.Button({
  label: "Perform the temporal analysis of algae bloom monthly area ",
  style: {stretch: 'horizontal', maxHeight: '25px'}
})
Panel.add(select3)
Panel.add(selDateFake3)
Panel.add(buttonFake3) 
Panel.add(buttonFake33) 
function getindex(index){
  Panel.remove(selDateFake3)
  Panel.remove(buttonFake3)
  Panel.remove(buttonFake33)
  Map.clear();
  var region3 = List[select3.getValue()];   /////////得到研究区
  //var clipe = region3.geometry()
  Map.centerObject(List[select3.getValue()], 10);
  if (region3 == tangxunhu){
        var studylake = tangxunhulake;
      }
      else if(region3 == chaohu){
        var studylake = chaohulake;
      }
      else if(region3 == taihu){
        var studylake = taihulake;
      }
      else if(region3 == tonghu){
        var studylake = tonghulake;
      }
      else if(region3 == dianchi){
        var studylake = yunnanlake;
      }
      else if(region3 == xingyunhu){
        var studylake = yunnanlake2;
      }
      else {
        var studylake = shenzhenlake;
     }
  var indexlist = studylake.first().select(['NDVI','EVI','s2_AInew']).bandNames()
  var selDate3 = ui.Select({
    placeholder: "Select an index", 
    items: indexlist.getInfo(),
    style: {stretch: 'horizontal', maxHeight: '25px'},
  })
  ///////////////// button a single image analysis
  var button3 = ui.Button({
  label: "Perform the temporal analysis of the select index ",
  onClick: updatechart1,
  style: {stretch: 'horizontal', maxHeight: '25px'},
   //Map.setCenter(places[key][0], places[key][1]);
  })
  var button33 = ui.Button({
  label: "Perform the temporal analysis of algae bloom monthly area ",
  onClick: updatechart2,
  style: {stretch: 'horizontal', maxHeight: '25px'},
   //Map.setCenter(places[key][0], places[key][1]);
  })
  Panel.add(selDate3)
  Panel.add(button3)
  Panel.add(button33)
  function updatechart1(index){
    var select_index = selDate3.getValue();
    //用于水体面积提取，并在此基础上计算相应水体的指数平均值
  function adddate(img){
  var date = ee.Date.parse("MM", img.get('month')).format('MM')
  return img.set('system:time_start',date)
    }  
    var collection = studylake.select(['NDVI','EVI','s2_AInew','MNDWI']).map(adddate)
    ////////////////////////////水体面积提取/////////////////////////
    var histogram1 = collection.first().select('MNDWI')
                         .reduceRegion({
                           reducer: ee.Reducer.histogram(), 
                           geometry: region3, //water
                           scale: 10,
                           maxPixels: 1e13,
                           tileScale: 8
                          });
        var threshold_water = otsu(histogram1.get("MNDWI"));
        //print(threshold_water,'threshold_S2')
        var mask = collection.first().select('MNDWI').gte(threshold_water);
        //mask = mask.updateMask(mask)  
    var waterimg = collection.first().updateMask(mask)
  var collection2 = collection.map(function(img){
  var dict = img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: waterimg.geometry(),
    scale: 30,
    maxPixels: 1e13
  });    
  dict = ee.Dictionary(dict);
  var index = ee.Number(dict.get(select_index));
  img = img.set(select_index, index);
  return img;
})       
var dataList = collection2.reduceColumns(ee.Reducer.toList(2), ["system:time_start", select_index])
                    .get("list");
dataList.evaluate(function(datas) {
  //print("datas is", datas);
var dateList = [];
var eviList = [];
  for (var i=0; i<datas.length; i++) {
    var date = ee.Date(datas[i][0]).format("yy");
    dateList.push(date);
    eviList.push(ee.Number(datas[i][1]));
  }
  var chart = ui.Chart.array.values(ee.List(eviList), 0, ee.List(dateList))
                .setChartType("LineChart")
                .setSeriesNames([select_index])
                .setOptions({
                  title: "研究区所选指数均值变化表",
                  vAxis: {title: "mean value"},
                  hAxis: {title: 'Month', format: 'MM'},//////select_index
                series: {
                          0: {
                            color: 'blue',
                            lineWidth: 1,
                            pointsVisible: true,
                            pointSize: 2,
                          },
                        },
                        legend: {position: 'right'},
                      }); 
  // AreaChart style setup.
    chart.style().set({
      position: 'bottom-right',
      width: '450px',
      height: '250px'
    });
    Map.clear();
    // Add area change chart to panel.
    Map.add(chart);
});
    }  
  function updatechart2(index){
    Map.clear();
    var dianl = ee.List([0,0,0,0,0,126.86,106.08,115.40,83.75,0,0,0])
    ///////var xingyunl = [0,0,0,0,0,19.71,16.34,15.88,15.86,6.11,10.77,0] //////delete
    var taihul = ee.List([0,0,0,0,1375.65,791.07,836.54,1008.22,899.43,1151.52,0,0])
    var tonghul = ee.List([0,0,0.89,0,0,0,0.55,1.48,0,1.74,0,0])
    var chaohul = ee.List([0,0,12.49,0,417,380.44,330.11,217.07,338.11,338.11,0,0])
    var tangxunhul = ee.List([0,0,0,0,20.31,21.36,25.70,11.79,0,0,0,0])
    var shenzhenl = ee.List([0,0,0,0,0,0,0,0,0,0,0,0]) 
    var dateList3 = ee.List([1,2,3,4,5,6,7,8,9,10,11,12])
               .map(function(month){
                 var date = ee.Date.parse('MM',month).format('MM');//ee.Date(month[i][0]).format("yy")
                 return date;
               })
    var region3 = List[select3.getValue()];   /////////得到研究区
    //var clipe = region3.geometry()
    Map.centerObject(List[select3.getValue()], 10);
  if (region3 == tangxunhu){
        var arealist = tangxunhul;
      }
      else if(region3 == chaohu){
        var arealist = chaohul;
      }
      else if(region3 == taihu){
        var arealist = taihul;
      }
      else if(region3 == tonghu){
        var arealist = tonghul;
      }
      else if(region3 == dianchi){
        var arealist = dianl;
      }
      else {
        var arealist = shenzhenl;
     }
  var chart3 = ui.Chart.array.values(arealist, 0, dateList3)
                .setChartType("LineChart")
                .setSeriesNames(["水华面积"])
                .setOptions({
                  title: "研究区水华月面积变化表",
                  vAxis: {title: "AREA"},
                  hAxis: {title: 'Month'},//////select_index
                series: {
                          0: {
                            color: 'blue',
                            lineWidth: 1,
                            pointsVisible: true,
                            pointSize: 2,
                          },
                        },
                        legend: {position: 'right'},
                      }); 
  // AreaChart style setup.
    chart3.style().set({
      position: 'bottom-right',
      width: '450px',
      height: '250px'
    });
    Map.clear();
    // Add area change chart to panel.
    Map.add(chart3);
  }  
}
/*
 * (4) 影像导出
 */
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.add(Panel);
////////////////////////////////////////////////////////////////////////////////////////////