// Last modification:2023-05-29 by Pegah: Changed the decimal of Lat and long.
// Last modification:2023-05-29 by Pegah: Adding link of material to dataset.
// Last modification:2023-03-30 by Pegah: Improving disappearing the values in 3-2 and 4 by changing the dataset.
// Last modification:2022-09-02 by Pegah: Changes in Orbitpass func. and changnig the logo.
// Last modification:2022-08-25 by Pegah: Adding SAR data.
// Last modification:2022-07-22 by Pegah: Replacing S2-harmonized Cleaning & TOA scale fixing.
// Last modification:2022-07-12 by Pegah: TOA scale fixing.
// Last modification:2022-06-23 by Pegah: Ver1.2 Beta prepration.
// Last modification:2022-06-17 by Pegah: Offical Ver 1.2: Combining LS 4&5&7.
// Last modification:2022-06-6 by Pegah: Offical Ver 1.1: Combining LS 8&9.
// Last modification:2022-04-19 by Pegah: Changing LS8 scale factor method.
// Last modification:2021-12-08 by Pegah: Changing LS8 collection1 to collection 2.
Map.style().set('cursor', 'crosshair');
// ----------------------Scaling Functions----------------------
var ScaleFactors_SR89= function (image) {
  var getFactorImg = function(factorNames) {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var opticalBands = (image.select('SR_B.').multiply(getFactorImg(['REFLECTANCE_MULT_BAND_.']))
                                          .add(getFactorImg(['REFLECTANCE_ADD_BAND_.']))).multiply(10000);
  var thermalBands = (image.select('ST_B.*').multiply(getFactorImg(['TEMPERATURE_MULT_BAND_ST_B10']))
                                          .add(getFactorImg(['TEMPERATURE_ADD_BAND_ST_B10']))).subtract(273.15);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true)
};
var ScaleFactors_SR457= function (image) {
    var getFactorImg = function(factorNames) {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var opticalBands = (image.select('SR_B.').multiply(getFactorImg(['REFLECTANCE_MULT_BAND_.']))
                                          .add(getFactorImg(['REFLECTANCE_ADD_BAND_.']))).multiply(10000);
  var thermalBand = (image.select('ST_B6').multiply(getFactorImg(['TEMPERATURE_MULT_BAND_ST_B6']))
                                          .add(getFactorImg(['TEMPERATURE_ADD_BAND_ST_B6']))).subtract(273.15);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}
var LSTOA_scale_LS89 = function(img){
                            var img1=img.select(['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11']).multiply(10000)
                            var img2=img.select('B6').multiply(100)
                            var img3=img.select(['QA_PIXEL','QA_RADSAT'])
                            return img1.addBands(img2).addBands(img2).addBands(img3)
}  
var LSTOA_scale_LS457 = function(img){
                            var img1=img.select(['B1','B2','B3','B4','B5','B7']).multiply(10000)
                            var img2=img.select('B6').multiply(100)
                            var img3=img.select(['QA_PIXEL','QA_RADSAT'])
                            return img1.addBands(img2).addBands(img2).addBands(img3)
}  
// ----------------------Cloud Masking Functions----------------------
var CloudMask_LS89_SR=function (image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  return ((image)
      .updateMask(qaMask)
      .updateMask(saturationMask)
      )
};
var CloudMask_LS457_SR=function (image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  return image.updateMask(qaMask)
};
var CloudMask_LS45789_TOA=function (image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0)
   return image.updateMask(qaMask)
      .updateMask(saturationMask)}
var CloudMask_S2_SRTOA= function (image) {
          var qa = image.select('QA60');
          var cloudBitMask = 1 << 10;
          var cirrusBitMask = 1 << 11;
          var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
                        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
          return image.updateMask(mask);
        };
// ----------------------Rename Functions----------------------
var rename_LS89_C2= function (img){
  return img.rename(['B1','B2','B3','B4','B5','B6','B7','SR_QA_AEROSOL','B10',
                              'ST_ATRAN','ST_CDIST','ST_DRAD','ST_EMIS','ST_EMSD','ST_QA',
                              'ST_TRAD','ST_URAD','QA_PIXEL','QA_RADSAT'])
}
var rename_LS457_C2= function (img){
  return img.rename(['B1','B2','B3','B4','B5','B7','SR_ATMOS_OPACITY','SR_CLOUD_QA','B6',
                              'ST_ATRAN','ST_CDIST','ST_DRAD','ST_EMIS','ST_EMSD','ST_QA',
                              'ST_TRAD','ST_URAD','QA_PIXEL','QA_RADSAT'])
}
var rename_LS7_TOA=function(img){
  return img.rename(['B1','B2','B3','B4','B5','B6','B7','QA_PIXEL','QA_RADSAT'])
}
// ----------------------Importing Dataset----------------------
// ==================================OPTICAL======================================
var LS8_SR_C2=ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").filter(ee.Filter.eq('PROCESSING_LEVEL','L2SP')).map(ScaleFactors_SR89).map(rename_LS89_C2)
var LS9_SR_C2=ee.ImageCollection("LANDSAT/LC09/C02/T1_L2").filter(ee.Filter.eq('PROCESSING_LEVEL','L2SP')).map(ScaleFactors_SR89).map(rename_LS89_C2)
var LS89_SR_C2_T1=(LS8_SR_C2.merge(LS9_SR_C2)).set('Name','LS89_SR_C2_T1')
var LS8_Raw_C2_T2=ee.ImageCollection("LANDSAT/LC08/C02/T2").set('Name','LS8_Raw_C2_T2')
var LS4_SR_C2 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2').filter(ee.Filter.eq('PROCESSING_LEVEL','L2SP')).map(ScaleFactors_SR457).map(rename_LS457_C2)
var LS5_SR_C2 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filter(ee.Filter.eq('PROCESSING_LEVEL','L2SP')).map(ScaleFactors_SR457).map(rename_LS457_C2)
var LS7_SR_C2 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filter(ee.Filter.eq('PROCESSING_LEVEL','L2SP')).map(ScaleFactors_SR457).map(rename_LS457_C2)
var LS457_SR_C2_T1=(LS4_SR_C2.merge(LS5_SR_C2).merge(LS7_SR_C2)).set('Name','LS457_SR_C2_T1')
var S2_TOA = ee.ImageCollection('COPERNICUS/S2_HARMONIZED').set('Name','S2_TOA')
var S2_SR = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").set('Name','S2_SR')
var LS4_TOA_C2_T1 = (ee.ImageCollection("LANDSAT/LT04/C02/T1_TOA").select(['B1','B2','B3','B4','B5','B6','B7','QA_PIXEL','QA_RADSAT']))
var LS5_TOA_C2_T1 = (ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA").select(['B1','B2','B3','B4','B5','B6','B7','QA_PIXEL','QA_RADSAT']))
var LS7_TOA_C2_T1 = (ee.ImageCollection("LANDSAT/LE07/C02/T1_TOA").select(['B1','B2','B3','B4','B5','B6_VCID_1','B7','QA_PIXEL','QA_RADSAT'])).map(rename_LS7_TOA)
var LS457_TOA_C2_T1 =  ee.ImageCollection((LS4_TOA_C2_T1.merge(LS5_TOA_C2_T1)).merge(LS7_TOA_C2_T1)).set('Name','LS457_TOA_C2_T1')
var LS8_TOA_C2_T1 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
var LS9_TOA_C2_T1 = ee.ImageCollection("LANDSAT/LC09/C02/T1_TOA")
var LS89_TOA_C2_T1 =ee.ImageCollection(LS8_TOA_C2_T1.merge(LS9_TOA_C2_T1)).set('Name','LS89_TOA_C2_T1')
// ================================== SAR ======================================
var S1_GRD= ee.ImageCollection("COPERNICUS/S1_GRD").set('Name','S1_GRD')
var DN2dB= function (img) {
  img = ee.Image(img);
  var imgdB = ((img.pow(2)).log10()).multiply(10.0).subtract(83.0);
  return imgdB};
var ALOS2= ee.ImageCollection("JAXA/ALOS/PALSAR-2/Level2_2/ScanSAR").set('Name','ALOS2')//.map(DN2dB)
// ---------------------- Intro. and Panel --------------------------
//App title
var EnVer= ui.Label({value:'English', 
                    style:{fontSize: '15px', color: '#399EE2',textAlign:'center',margin:'0px 0px 0px 0px'},
                      })
                        .setUrl('https://geerestec.users.earthengine.app/view/vega-restec-en')
var header1 = ui.Label({value:'VEGA',
                        style:{fontSize: '55px', color: '#399EE2',fontWeight: 'bold', textAlign:'center',margin:'10px 1px 1px 125px'}})
                                            .setUrl('https://rs-training.jp/');
var header2 = ui.Label({value:'Ver. 2.1',
                        style:{fontSize: '15px', color: '#399EE2',fontWeight: 'bold',textAlign:'center',margin:'0px 0px 20px 250px'}});
var header3 = ui.Label({value:'Visualizing Earth tool by Google Earth Engine Apps', 
                        style:{fontSize: '15px', fontWeight: 'bold', color: '#399EE2',textAlign:'center',margin:'0px 20px 0px 50px'}})
var header4 = ui.Label({value:'Google Earth Engine Appsを用いた地球可視化ツール', 
                        style:{fontSize: '15px', fontWeight: 'bold', color: '#399EE2',textAlign:'center',margin:'0px 0px 0px 50px'}})
var RESTEClogo = ee.Image('projects/geeapptest/assets/TrainingLogo')
var thumb1 = ui.Thumbnail({image: RESTEClogo,
                          params: {
                                  dimensions: '500x100',
                                  format: 'jpeg'
                                  },
                              style: {padding :'0px 60px 0px 60px'}
                              });                              
//App summary
var AppDescription = ui.Label({value:'このツールは、Landsatシリーズ、Sentinel-1、Sentinel-2、ALOS-2 L2.2 のデータ'+
                                      'をユーザが指定する観測期間・色の組み合わせ・合成方法で表示するものです。',
                              style:{fontSize: '13px',textAlign:'center'}});
var sidePanel = ui.Panel({
    widgets:EnVer,
    style: {width: '450px',stretch:'both'}
    }); 
var intro = ui.Panel([
  ui.Label({
    value: '___________________________________________________________',
    style: {fontSize: '14px',fontWeight: 'bold'},
  })]);
sidePanel.widgets().set(1,header1)
sidePanel.widgets().set(2,header2)
sidePanel.widgets().set(3,header3)
sidePanel.widgets().set(4,header4)
sidePanel.widgets().set(5,AppDescription)     
sidePanel.widgets().set(6,intro)     
// ---------------------- LABELS --------------------------
var DataSelectorLabel=ui.Label('1: データセットを選択してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var LinkToMaterial=ui.Label('各データセットの観測可能期間については、こちらをご覧ください！',{fontSize: '11px', color: '#191970'})
                      .setUrl('https://rs-training.jp/from2022/wp-content/uploads/2023/06/VEGA_Manual_Jp.pdf')
var SARLabel=ui.Label('2: SARデータを選択した場合のみ、以下の観測条件を選択できます (任意)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'})
var SARAqModeLabel=ui.Label('2-1: 観測モードを選択してください。' ,{fontSize: '13px', color: '#191970'});
var SAROrbitLabel=ui.Label('2-2: 観測方向を選択してください。' ,{fontSize: '13px', color: '#191970'});
var VisSelectorLabel=ui.Label('3: 次の中から表示方法を選んで指示の通りに表示するバンドを指定してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var ResetLabel=ui.Label('単バンド表示から3バンド表示、あるいは3バンド表示から単バンド表示に切り替える際には、以下のボタンを押してください。',{fontSize: '14px', fontWeight: 'bold', color: 'red'});
var GreyScaleLabel=ui.Label('3-1: 単バンド（グレースケール）画像を表示するには、下のドロップボックスメニューからバンドを選択してください。',{fontSize: '13px', color: '#191970'});
var ComLabel=(ui.Label('3-2: 3バンド（赤緑青）カラー合成画像を表示するには、下のテキストボックスに赤、緑、青の色を割り当てるバンドの組み合わせを例のように入力してください。',{fontSize: '13px',  color: '#191970'}))
var MinMaxLabel= ui.Label('4: 表示させる最小・最大の画素値（光学の場合は反射率×10000、SARの場合は後方散乱の値（マイナスの値））をテキストボックスに入力してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var PeriodSelectorLabel=ui.Label('5: 表示させたいデータの観測時期（検索開始・終了日）を例のようにテキストボックスに入力してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var ReducerSelectorLabel=ui.Label('6: データの合成方法を選択してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var CloudMaskLabel=ui.Label('7: 雲マスクを適用する場合は、チェックを入れてください (任意)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'})
var LoadLabel=ui.Label('8: 表示ボタンを押して、画像を表示してください (必須)。',{fontSize: '14px', fontWeight: 'bold', color: '#191970'});
var inspectorLabel= ui.Label('** 地図上をクリックすると、その点の経度、緯度とその位置における表示されたバンド画像の画素値を確認できます。',{fontSize: '14px', fontWeight: 'bold', color: '#191970',textAlign:'center'});
var Loading=ui.Label('Loading...', {color: 'gray'})
// ---------------------- DatasetSelector & BandSelector --------------------------
var datasetSelector = ui.Select({
  items: [
          {label:'Select a dataset', value:'Select a dataset'},
          {label:'Landsat 4, 5, 及び  7 地表面反射率 Tier 1', value:'LS457_SR_C2_T1'},
          {label:'Landsat 4, 5, 及び  7 大気上端反射率 Tier 1', value:'LS457_TOA_C2_T1'},
          {label:'Landsat 8 及び  9 地表面反射率 Tier 1', value:'LS89_SR_C2_T1'},
          {label:'Landsat 8 及び  9 大気上端反射率 Tier 1', value:'LS89_TOA_C2_T1'},
          {label:'Sentinel-2 地表面反射率', value:'S2_SR'},
          {label:'Sentinel-2 大気上端反射率', value:'S2_TOA'},
          {label:'* Landsat 8 生データ Tier 2 (研修用)', value:'LS8_Raw_C2_T2'},
          {label:'Sentinel-1 Cバンド SAR', value:'S1_GRD'},
          {label:'ALOS-2 ScanSAR L2.2 L-band SAR', value:'ALOS2'}
          ],
  placeholder:'Select a dataset',
  style:{stretch: 'horizontal'},
  onChange: function() {
    if (datasetSelector.getValue() === 'LS457_SR_C2_T1'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Blue (0.45-0.52 μm)',value:'B1'},
        {label:'B2: Green (0.52-0.60 μm)',value:'B2'},
        {label:'B3: Red (0.63-0.69 μm)',value:'B3'},
        {label:'B4: Near infrared (0.77-0.90 μm)',value:'B4'},
        {label:'B5: Shortwave infrared 1 (1.55-1.75 μm)',value:'B5'},
        {label:'B7: Shortwave infrared 2 (2.08-2.35 μm)',value:'B7'},
        {label:'B6: Surface temperature (10.40-12.50 μm)',value:'B10'},
        ],
        value:'Choose a band',
        onChange: function() {}
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');
    }
    if (datasetSelector.getValue() === 'LS457_TOA_C2_T1'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Blue (0.45-0.52 μm)',value:'B1'},
        {label:'B2: Green (0.52-0.60 μm)',value:'B2'},
        {label:'B3: Red (0.63-0.69 μm)',value:'B3'},
        {label:'B4: Near infrared (0.76-0.90 μm)',value:'B4'},
        {label:'B5: Shortwave infrared 1 (1.55-1.75 μm)',value:'B5'},
        {label:'B6: Thermal Infrared 1 (Resampled from 60m to 30m) (10.40 - 12.50  μm)',value:'B6'},
        {label:'B7: Shortwave infrared 2 (2.08-2.35 μm)',value:'B7'},
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');
    }
    if (datasetSelector.getValue() === 'LS89_SR_C2_T1'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Coastal aerosol/Ultra blue (0.435-0.451μm)',value:'B1'},
        {label:'B2: Blue (0.452-0.512 μm)',value:'B2'},
        {label:'B3: Green (0.533-0.590 μm)',value:'B3'},
        {label:'B4: Red (0.636-0.673 μm)',value:'B4'},
        {label:'B5: Near infrared (0.851-0.879 μm)',value:'B5'},
        {label:'B6: Shortwave infrared 1 (1.566-1.651 μm)',value:'B6'},
        {label:'B7: Shortwave infrared 2 (2.107-2.294 μm)',value:'B7'},
        {label:'B10: Surface temperature (10.60-11.19 μm)',value:'B10'},
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()      
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');      
    }
    if (datasetSelector.getValue() === 'LS89_TOA_C2_T1'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Coastal aerosol (0.43-0.45μm)',value:'B1'},
        {label:'B2: Blue (0.45-0.51 μm)',value:'B2'},
        {label:'B3: Green (0.53-0.59 μm)',value:'B3'},
        {label:'B4: Red (0.64-0.67 μm)',value:'B4'},
        {label:'B5: Near infrared (0.85-0.88 μm)',value:'B5'},
        {label:'B6: Shortwave infrared 1 (1.57-1.65 μm)',value:'B6'},
        {label:'B7: Shortwave infrared 2 (2.11-2.29 μm)',value:'B7'},
        {label:'B8: Band 8 Panchromatic (0.52-0.90 μm)',value:'B8'},
        {label:'B9: Cirrus (1.36-1.38  μm)',value:'B9'},
        {label:'B10: Thermal infrared 1 (10.60-11.19 μm)',value:'B10'},
        {label:'B11: Thermal infrared 2 (11.50-12.51  μm)',value:'B11'},
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()      
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');      
    }
    if (datasetSelector.getValue() === 'LS8_Raw_C2_T2'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Coastal aerosol (0.43-0.45μm)',value:'B1'},
        {label:'B2: Blue (0.45-0.51 μm)',value:'B2'},
        {label:'B3: Green (0.53-0.59 μm)',value:'B3'},
        {label:'B4: Red (0.64-0.67 μm)',value:'B4'},
        {label:'B5: Near infrared (0.85-0.88 μm)',value:'B5'},
        {label:'B6: Shortwave infrared 1 (1.57-1.65 μm)',value:'B6'},
        {label:'B7: Shortwave infrared 2 (2.11-2.29 μm)',value:'B7'},
        {label:'B8: Panchromatic (0.52-0.9 μm)',value:'B8'},
        {label:'B9: Cirrus (1.36-1.38 μm)',value:'B9'},
        {label:'B10: Thermal infrared 1 (10.60 - 11.19 μm)',value:'B10'},
        {label:'B11: Thermal infrared 2 (11.50 - 12.51 μm)',value:'B11'},
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()      
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');      
    }
    if (datasetSelector.getValue() === 'S2_SR'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:'B1: Aerosols (443.9nm (S2A) / 442.3nm (S2B))',value:'B1'},
        {label:'B2: Blue (496.6nm (S2A) / 492.1nm (S2B))',value:'B2'},
        {label:'B3: Green (560nm (S2A) / 559nm (S2B))',value:'B3'},
        {label:'B4: Red (664.5nm (S2A) / 665nm (S2B))',value:'B4'},
        {label:'B5: Red Edge 1 (703.9nm (S2A) / 703.8nm (S2B))',value:'B5'},
        {label:'B6: Red Edge 2 (740.2nm (S2A) / 739.1nm (S2B))',value:'B6'},
        {label:'B7: Red Edge 3 (782.5nm (S2A) / 779.7nm (S2B))',value:'B7'},
        {label:'B8: Near infrared (835.1nm (S2A) / 833nm (S2B))',value:'B8'},
        {label:'B8A: Red Edge 4 (864.8nm (S2A) / 864nm (S2B))',value:'B8A'},
        {label:'B9: Water vapor (945nm (S2A) / 943.2nm (S2B))',value:'B9'},
        {label:'B11: Shortwave infrared 1 (1613.7nm (S2A) / 1610.4nm (S2B))',value:'B11'},
        {label:'B12: Shortwave infrared 2 (2202.4nm (S2A) / 2185.7nm (S2B))',value:'B12'}        
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()        
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');      
    }
    if (datasetSelector.getValue() === 'S2_TOA'){
      // ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:B4-B3-B2');
      GreyBandSelector = ui.Select({
        items: [
        {label:'Choose a band',value:'Choose a band'},
        {label:' B1: Aerosols (443.9nm (S2A) / 442.3nm (S2B))',value:'B1'},
        {label:' B2: Blue (496.6nm (S2A) / 492.1nm (S2B))',value:'B2'},
        {label:' B3: Green (560nm (S2A) / 559nm (S2B))',value:'B3'},
        {label:' B4: Red (664.5nm (S2A) / 665nm (S2B))',value:'B4'},
        {label:' B5: Red Edge 1 (703.9nm (S2A) / 703.8nm (S2B))',value:'B5'},
        {label:' B6: Red Edge 2 (740.2nm (S2A) / 739.1nm (S2B))',value:'B6'},
        {label:' B7: Red Edge 3 (782.5nm (S2A) / 779.7nm (S2B))',value:'B7'},
        {label:' B8: Near infrared (835.1nm (S2A) / 833nm (S2B))',value:'B8'},
        {label:' B8A: Red Edge 4 (864.8nm (S2A) / 864nm (S2B))',value:'B8A'},
        {label:' B9: Water vapor (945nm (S2A) / 943.2nm (S2B))',value:'B9'},
        {label:' B11: Shortwave infrared 1 (1613.7nm (S2A) / 1610.4nm (S2B))',value:'B11'},
        {label:' B12: Shortwave infrared 2 (2202.4nm (S2A) / 2185.7nm (S2B))',value:'B12'}        
        ],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'}}).setDisabled()      
      // minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: 0; 3bands: 0,0,0');
      // maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000');      
    }
    if (datasetSelector.getValue() === 'S1_GRD'){
      ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:VV-VH-VV');
      GreyBandSelector = ui.Select({
        items: [
                {label:'Choose a Polarization',value:'Choose a band'},
                {label:' HH: Single co-polarization, horizontal transmit/horizontal receive',value:'HH'},
                {label:' HV: Dual-band cross-polarization, horizontal transmit/vertical receive',value:'HV'},
                {label:' VV: Single co-polarization, vertical transmit/vertical receive',value:'VV'},
                {label:' VH: Dual-band cross-polarization, vertical transmit/horizontal receive',value:'VH'}],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        items:[
            {label:'Choose acquisition mode',value:'Choose a band'},  
            {label:' 全ての観測モード', value:'All'},
            {label:' IW (Interferometric Wide Swath)', value:'IW'},
            {label:' EW (Extra Wide Swath)', value:'EW'},
            {label:' SM (Strip Map)', value:'SM'}],   
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'},
        onChange: function() {}
      })
      OrbitPassSelector=ui.Select({
        items:[
            {label:'Choose Orbit pass',value:'Choose a band'},
            {label:' 両方向', value:'Both'},
            {label:' 昇交軌道', value:'Asc'},
            {label:' 降交軌道', value:'Dsc'}],
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'},
        onChange: function() {}
      })
      minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: -25; 3bands: -25,-25,-25');
      maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: -10; 3bands: -10,-10,-10');      
    }
    if (datasetSelector.getValue() === 'ALOS2'){
      ComBandSelector = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('ex:HH-HV-HH');
      GreyBandSelector = ui.Select({
        items: [
                {label:'Choose a Polarization',value:'Choose a band'},
                {label:' HH: Single co-polarization, horizontal transmit/horizontal receive',value:'HH'},
                {label:' HV: Dual-band cross-polarization, horizontal transmit/vertical receive',value:'HV'}],
        value:'Choose a band',
        onChange: function() {
        }
      });
      InstrumentModeSelector = ui.Select({
        placeholder:'Choose an acquisition mode',
        style:{stretch: 'horizontal'}}).setDisabled()
      OrbitPassSelector=ui.Select({
        items:[
            {label:'Choose Orbit pass',value:'Choose a band'},
            {label:' 両方向', value:'Both'},
            {label:' 昇交軌道', value:'Asc'},
            {label:' 降交軌道', value:'Dsc'}],
        placeholder:'Choose Orbit pass',
        style:{stretch: 'horizontal'},
        onChange: function() {}
      })
      minTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Min value(s) ex: 1band: -25; 3bands: -25,-25,-25');
      maxTextBox = ui.Textbox({style:{stretch: 'horizontal'}}).setPlaceholder('Max value(s) ex: 1band: -10; 3bands: -10,-10,-10');      
    }     
    sidePanel.widgets().set(12,InstrumentModeSelector)
    sidePanel.widgets().set(14,OrbitPassSelector)
    sidePanel.widgets().set(18,GreyBandSelector);
    sidePanel.widgets().set(20,ComBandSelector);
    sidePanel.widgets().set(25,minTextBox);    
    sidePanel.widgets().set(26,maxTextBox);
  }
  });
var InstrumentModeSelector=ui.Select({
      items:[
            {label:'Choose acquisition mode',value:'Choose a band'},  
            {label:' 全ての観測モード', value:'All'},
            {label:' IW (Interferometric Wide Swath)', value:'IW'},
            {label:' EW (Extra Wide Swath)', value:'EW'},
            {label:' SM (Strip Map)', value:'SM'}],   
      // value:'All',
      placeholder:'Choose acquisition mode',
      style:{stretch: 'horizontal'},
      onChange: function() {}
                });
var OrbitPassSelector=ui.Select({
      items:[
            {label:'Choose Orbit pass',value:'Choose a band'},
            {label:' 両方向', value:'Both'},
            {label:' 昇交軌道', value:'Asc'},
            {label:' 降交軌道', value:'Dsc'}],
      // value:'Both',
      placeholder:'Choose Orbit pass',
      style:{stretch: 'horizontal'},
      onChange: function() {}
                });
var GreyBandSelector = ui.Select({style:{stretch: 'horizontal'}});
var ComBandSelector=ui.Textbox({
  style:{stretch: 'horizontal'},
  placeholder: 'ex: B4-B3-B2',
});
var Reset=ui.Button({
  label: 'Reset visualization method',
  style:{stretch: 'horizontal'},
  onClick: function(){
      if (datasetSelector.getValue() === 'S1_GRD'){
          GreyBandSelector.setValue('Choose a band');
          ComBandSelector.setValue('');
 //         InstrumentModeSelector.setValue('Choose a band');
//          OrbitPassSelector.setValue('Choose a band');
//          datasetSelector.setValue('Select a dataset')
      }
      else {
          GreyBandSelector.setValue('Choose a band');
          ComBandSelector.setValue('');
 //         datasetSelector.setValue('Select a dataset')
      }      
  }
})
sidePanel.widgets().set(6,DataSelectorLabel)
sidePanel.widgets().set(7,LinkToMaterial)
sidePanel.widgets().set(8,datasetSelector)
sidePanel.widgets().set(9,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
sidePanel.widgets().set(10,SARLabel)
sidePanel.widgets().set(11,SARAqModeLabel)
sidePanel.widgets().set(12,InstrumentModeSelector)
sidePanel.widgets().set(13,SAROrbitLabel)
sidePanel.widgets().set(14,OrbitPassSelector)
sidePanel.widgets().set(15,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
sidePanel.widgets().set(16,VisSelectorLabel)
sidePanel.widgets().set(17,GreyScaleLabel) 
sidePanel.widgets().set(18,GreyBandSelector)
sidePanel.widgets().set(19,ComLabel)    
sidePanel.widgets().set(20,ComBandSelector)
sidePanel.widgets().set(21,ResetLabel)
sidePanel.widgets().set(22,Reset)
sidePanel.widgets().set(23,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
// ---------------------- Min&Max Value --------------------------
var minTextBox=ui.Textbox({
    style:{stretch: 'horizontal'},
    placeholder: 'Min value(s) ex: 1band: 0; 3bands: 0,0,0'});
var maxTextBox=ui.Textbox({    
    style:{stretch: 'horizontal'},
    placeholder: 'Max value(s) ex: 1band: 3000; 3bands: 3000,4000,5000'});
sidePanel.widgets().set(24,MinMaxLabel)    
sidePanel.widgets().set(25,minTextBox)    
sidePanel.widgets().set(26,maxTextBox)
sidePanel.widgets().set(27,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
// ---------------------- PeriodSelector --------------------------
var StartDateTextBox= ui.Textbox({
          placeholder: 'Starting date ex: 2018-01-01',
          style:{stretch: 'horizontal'},
          });
var EndDateTextBox = ui.Textbox({
          placeholder: 'Ending date ex: 2020-01-01',
          style:{stretch: 'horizontal'},
          });
sidePanel.widgets().set(28,PeriodSelectorLabel)    
sidePanel.widgets().set(29,StartDateTextBox)    
sidePanel.widgets().set(30,EndDateTextBox)    
sidePanel.widgets().set(31,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
//---------------------- ReducerSelector --------------------------
var ReducerSelector=ui.Select({
  placeholder:'Select a reducer',
  style:{stretch: 'horizontal'},
  items:[{label:'中間値',value:'中間値'},{label:'平均値',value:'平均値'},{label:'最小値',value:'最小値'},
        {label:'最大値',value:'最大値'},{label:'最新（合成しない）',value:'最新（合成しない）'},
        {label:'最古（合成しない）',value:'最古（合成しない）'}],  
      });
sidePanel.widgets().set(32,ReducerSelectorLabel)    
sidePanel.widgets().set(33,ReducerSelector)    
sidePanel.widgets().set(34,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {stretch: 'horizontal',fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
// ---------------------- CloudMasking --------------------------
var CloudMask = ui.Checkbox('Cloud Masking', false);   
sidePanel.widgets().set(35,CloudMaskLabel)    
sidePanel.widgets().set(36,CloudMask)    
sidePanel.widgets().set(37,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
//---------------------- Loading --------------------------
var Loadbutton = ui.Button({
  style:{stretch: 'horizontal'},
  label: 'Load image',
  onClick: function(){
    var Dataset=function(string){
          if(datasetSelector.getValue()==='LS457_SR_C2_T1'){return ee.ImageCollection(LS457_SR_C2_T1)}
          if(datasetSelector.getValue()==='LS457_TOA_C2_T1'){return ee.ImageCollection(LS457_TOA_C2_T1)}          
          if(datasetSelector.getValue()==='LS89_SR_C2_T1'){return ee.ImageCollection(LS89_SR_C2_T1)}
          if(datasetSelector.getValue()==='LS89_TOA_C2_T1'){return ee.ImageCollection(LS89_TOA_C2_T1)}
          if(datasetSelector.getValue()==='LS8_Raw_C2_T2'){return ee.ImageCollection(LS8_Raw_C2_T2)}
          if(datasetSelector.getValue()==='S2_SR'){return ee.ImageCollection(S2_SR)}
          if(datasetSelector.getValue()==='S1_GRD'){return ee.ImageCollection(S1_GRD)}
          if(datasetSelector.getValue()==='ALOS2'){return ee.ImageCollection(ALOS2)}
          else {return ee.ImageCollection(S2_TOA)}
          }
    var PlaceHolder=function (string){
      if(datasetSelector.getValue()==='S1_GRD'){return ComBandSelector.setPlaceholder('ex: VV-VH-VV') }
      if(datasetSelector.getValue()==='ALOS2'){return ComBandSelector.setPlaceholder('ex: HH-HV-HV') }
      else {return ComBandSelector.setPlaceholder('ex: B4-B3-B2')}
    }
    var SARInstruFilter= function(ImageCollection) {
      if((ImageCollection.get('Name')).getInfo()==='S1_GRD'){
        if (InstrumentModeSelector.getValue() === 'All'){ return ImageCollection}
        if (InstrumentModeSelector.getValue() === 'IW'){ return ImageCollection.filter(ee.Filter.eq('instrumentMode','IW'))}
        if (InstrumentModeSelector.getValue() === 'EW'){ return ImageCollection.filter(ee.Filter.eq('instrumentMode','EW'))}
        if (InstrumentModeSelector.getValue() === 'SM'){ return ImageCollection.filter(ee.Filter.eq('instrumentMode','SM'))}
        else {return ImageCollection}
      }
      else {return ImageCollection}
    }
    // print(InstrumentModeSelector.getValue())
    // print(OrbitPassSelector.getValue())
    var SAROrbitFilter=function(ImageCollection){
      if((ImageCollection.get('Name')).getInfo()==='S1_GRD'){
         if (OrbitPassSelector.getValue() === 'Both'){return ImageCollection}
        if (OrbitPassSelector.getValue() === 'Asc'){return ImageCollection.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))}
        if (OrbitPassSelector.getValue() === 'Dsc'){return ImageCollection.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))}
        else {return ImageCollection}
      }
      if((ImageCollection.get('Name')).getInfo()==='ALOS2'){
         if (OrbitPassSelector.getValue() === 'Both'){return ImageCollection}
        if (OrbitPassSelector.getValue() === 'Asc'){return ImageCollection.filter(ee.Filter.eq('PassDirection', 'Ascending'))}
        if (OrbitPassSelector.getValue() === 'Dsc'){return ImageCollection.filter(ee.Filter.eq('PassDirection', 'Descending'))}
        else {return ImageCollection}
      }
      else {return ImageCollection}
    } 
    // print(OrbitPassSelector.getValue())   
    var DatasetForName=function(string){
      if(datasetSelector.getValue()==='LS457_SR_C2_T1'){
        return 'LS4,5,7_SR_'}
      if(datasetSelector.getValue()==='LS457_TOA_C2_T1'){
        return 'LS4,5,7_TOA_'}
      if(datasetSelector.getValue()==='LS89_SR_C2_T1'){
        return 'LS8,9_SR_'} 
      if(datasetSelector.getValue()==='LS89_TOA_C2_T1'){
        return 'LS8,9_TOA_'} 
      if(datasetSelector.getValue()==='LS8_Raw_C2_T2'){
        return 'LS8_Raw_T2_'}  
      if(datasetSelector.getValue()==='S1_GRD'){
        return 'S1_GRD_'}  
      if(datasetSelector.getValue()==='S2_SR'){
        return 'S2_SR_'}
      if(datasetSelector.getValue()==='ALOS2'){
        return 'ALOS2_'}        
        else {return 'S2_TOA_'}}
    var CloudMaskForName=function(string){
      if(CloudMask.getValue()===true){
        return 'CloudFree_'} 
      else{ return ''}
    };
    var RGBBands=ComBandSelector.getValue();
      if (GreyBandSelector.getValue()=== 'Choose a band'){
        var SelectedBand=ee.String(ComBandSelector.getValue()).split('-');
        var SelectedBandDistinct=SelectedBand.distinct();
      }
      else {
       var SelectedBand=ee.String(GreyBandSelector.getValue());
       var SelectedBandDistinct=ee.String(GreyBandSelector.getValue());
      };
    // print(SelectedBand)
    // print(SelectedBandDistinct)
    var SARPolTrans=function(ImageCollection){
      if((ImageCollection.get('Name')).getInfo()==='S1_GRD'){
           if (ee.List(SelectedBandDistinct).contains('VH')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH')) }
           if (ee.List(SelectedBandDistinct).contains('VV')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH')) }
           if (ee.List(SelectedBandDistinct).contains('HH')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','HV')) }
           if (ee.List(SelectedBandDistinct).contains('HV')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','HV')) }
           else {return ImageCollection}
      }
      if((ImageCollection.get('Name')).getInfo()==='ALOS2'){
          // if (ee.List(SelectedBandDistinct).contains('VH')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH')) }
          // if (ee.List(SelectedBandDistinct).contains('VV')) {return ImageCollection.filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH')) }
           if (ee.List(SelectedBandDistinct).contains('HH')) {return ImageCollection.filter(ee.Filter.listContains('Polarizations','HH')) }
           if (ee.List(SelectedBandDistinct).contains('HV')) {return ImageCollection.filter(ee.Filter.listContains('Polarizations','HV')) }
           else {return ImageCollection}
      }
      else {return (ImageCollection)}
      }
    var SelectedReducer =  function(ImageCollection){
      var SelectedRuducerObj = {
        '中間値': ee.Reducer.median(),
        '平均値': ee.Reducer.mean(),
        '最大値': ee.Reducer.max(),
        '最小値': ee.Reducer.min(),
        '最古（合成しない）': ee.Reducer.firstNonNull(),
        '最新（合成しない）': ee.Reducer.lastNonNull()
      };
      return (ImageCollection.reduce(SelectedRuducerObj[ReducerSelector.getValue()]));
    };
    var CloudMaskImgColl=function(ImageCollection){
          if (CloudMask.getValue() === true){
              if(datasetSelector.getValue()==='LS457_SR_C2_T1'){return ImageCollection.map(CloudMask_LS457_SR)}
              if(datasetSelector.getValue()==='LS457_TOA_C2_T1'){return ImageCollection.map(CloudMask_LS45789_TOA).map(LSTOA_scale_LS457)}
              if(datasetSelector.getValue()==='LS89_SR_C2_T1'){return ImageCollection.map(CloudMask_LS89_SR)}
              if(datasetSelector.getValue()==='LS89_TOA_C2_T1'){return ImageCollection.map(CloudMask_LS45789_TOA).map(LSTOA_scale_LS89)}
              if(datasetSelector.getValue()==='LS8_Raw_C2_T2'){return ImageCollection.map(CloudMask_LS89_SR)}
              if(datasetSelector.getValue()==='S2_SR'){return ImageCollection.map(CloudMask_S2_SRTOA)}
              if(datasetSelector.getValue()==='S2_TOA'){return ImageCollection.map(CloudMask_S2_SRTOA)}
              if(datasetSelector.getValue()==='S1_GD'){return ImageCollection}
              if(datasetSelector.getValue()==='ALOS2'){return ImageCollection.map(DN2dB)}
              else {return ImageCollection.map(ImageCollection)}
                            }
          else {
            if(datasetSelector.getValue()==='LS89_TOA_C2_T1'){return ImageCollection.map(LSTOA_scale_LS89)}
            if(datasetSelector.getValue()==='LS457_TOA_C2_T1'){return ImageCollection.map(LSTOA_scale_LS457)}
            if(datasetSelector.getValue()==='ALOS2'){return ImageCollection.map(DN2dB)}
            else{ return ImageCollection}}
          };    
    var startDate=ee.Date(StartDateTextBox.getValue());
    var endDate=ee.Date(EndDateTextBox.getValue());
    var DateFilteredDataset=(Dataset(datasetSelector.getValue())).filterDate(startDate,endDate)
    var ImgtoLoad=SelectedReducer((CloudMaskImgColl(SARPolTrans((SAROrbitFilter(SARInstruFilter(Dataset(datasetSelector.getValue()))))).filterDate(startDate,endDate))).select(SelectedBandDistinct))
    print('ImgtoLoad_Orgi',ImgtoLoad)
    var ImgtoLoadBandName=ee.List((ee.List(ImgtoLoad.bandNames())).map(function(Object){return (ee.String(Object).split('_')).get(0)}))
    // print('ImgtoLoadBandName',ImgtoLoadBandName)
    var ImgtoLoad=ImgtoLoad.rename(ImgtoLoadBandName)
    // print('ImgtoLoad_Renamed',ImgtoLoad)
    var ImgName=(DatasetForName(datasetSelector.getValue()))+
                (CloudMaskForName(CloudMask.getValue()))+(ReducerSelector.getValue())+'_'+
                (StartDateTextBox.getValue())+'~'+(EndDateTextBox.getValue());
    var NewMinValue=(minTextBox.getValue().split(',')).map(function(String){return ee.Number.parse(String)});
     if (GreyBandSelector.getValue()=== 'Choose a band'){
        var NewMin=ee.String(minTextBox.getValue()).split(',');
      }
      else {
       var NewMin=minTextBox.getValue();
      };
    // print('NewMinValue',NewMinValue)
    var NewMaxValue=(maxTextBox.getValue().split(',')).map(function(String){return ee.Number.parse(String)});
     if (GreyBandSelector.getValue()=== 'Choose a band'){
        var NewMax=ee.String(maxTextBox.getValue()).split(',');
      }
      else {
       var NewMax=maxTextBox.getValue();
      }; 
    // print('NewMaxValue',NewMaxValue)
   var create_myAddLayerFunc = function (maxLayerNum){
    return(function (img,layername){
      while ((Map.layers().length()) > maxLayerNum-1){
        Map.remove(Map.layers().get(0));
      }
      return (Map.addLayer(img,layername));
        });
      };
    var myAddLayer_3 = create_myAddLayerFunc(5);
    Map.onClick(function(coords) {
      var location = '経度: ' + coords.lon.toFixed(5) + ' ' +
                     '緯度: ' + coords.lat.toFixed(5);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = (ImgtoLoad.reduceRegion(ee.Reducer.first(), click_point, 30)).values().evaluate(function(val){
        // var val2=ee.string.parse(val.toFixed(3))
        var demText = '画素値（最上層レイヤ）: ' + val;
        sidePanel.widgets().set(41,ui.Label(demText));
      });
      sidePanel.widgets().set(40,ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      sidePanel.widgets().set(41,ui.Label("loading..."));
      sidePanel.widgets().set(42,ui.Label("観測日（所定期間内）:", {fontWeight:'bold'}));      
        var times = DateFilteredDataset
          .filterBounds(click_point)
          .sort('system:time_start')
          .aggregate_array('system:time_start')
          .reduce(ee.Reducer.minMax())
        times = ee.Dictionary(times)
        // print(times)
        ee.Date(times.get('min')).format('YYYY-MM-dd').evaluate(function(t) {
          var str = '最初の観測:  ' + t; 
          sidePanel.widgets().set(43, ui.Label(str));
        })
        ee.Date(times.get('max')).format('YYYY-MM-dd').evaluate(function(t) {
          var str = '最後の観測:  ' + t; 
          sidePanel.widgets().set(44, ui.Label(str));
        });
       sidePanel.widgets().set(43,ui.Label("loading the Date..."));
       sidePanel.widgets().set(44,ui.Label("loading the Date..."));
    });
      // sidePanel.widgets().set(38,thumb);    
      var dic= ee.Dictionary({
        min:NewMinValue,
        max:NewMaxValue,
        bands:SelectedBand
      })
      print(dic)
      dic.evaluate(function(dic) {
            var vizParams = {
              min: dic.min, 
              max: dic.max, 
              bands: dic.bands
            }
      myAddLayer_3(Map.addLayer(ImgtoLoad,vizParams,ImgName))
      });
  }
  });
sidePanel.widgets().set(37,LoadLabel)    
sidePanel.widgets().set(38,Loadbutton)    
sidePanel.widgets().set(39,ui.Label({
    value: '----------------------------------------------------------------------------------------------------------',
    style: {fontSize: '10px',fontWeight: 'bold',  color: 'gray',textAlign:'center'},
  }))
sidePanel.add(inspectorLabel) 
// sidePanel.widgets().set(38,thumb)    
sidePanel.add(thumb1) 
var ToU = ui.Label({value:'利用許諾',
                        style:{fontSize: '12px', fontFamily:'serif',fontWeight: 'bold', color: '#357EC7',textAlign:'center',margin:'0px 0px 0px 380px'}})
                                            .setUrl('https://rs-training.jp/square/vega/#tou');  
var Contact = ui.Label({value:'VEGAに関するご意見やご質問はこちらにご連絡下さい。',
                        style:{fontSize: '12px', fontFamily:'serif',fontWeight: 'bold', color: '#357EC7',textAlign:'center',margin:'0px 0px 0px 10px'}})
                                            .setUrl('https://rs-training.jp/contact/');  
var MoreInfo = ui.Label({value:'衛星データの研修や利用に関する情報は「リモセン研修ラボ」をご覧下さい。',
                        style:{fontSize: '12px', fontFamily:'serif',fontWeight: 'bold', color: '#357EC7',textAlign:'left',margin:'5px 0px 0px 10px'}})
                                            .setUrl('https://rs-training.jp/'); 
sidePanel.add(ToU) 
sidePanel.add(Contact) 
sidePanel.add(MoreInfo) 
// sidePanel.add(inspector_value)    
//---------------------- Adding TO PANEL --------------------------
Map.setCenter(139.7711, 35.681,10)
ui.root.add(sidePanel)