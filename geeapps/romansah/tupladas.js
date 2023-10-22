/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var das = ee.FeatureCollection("users/romansah/Batas_DAS_KLHK"),
    Pemukiman = 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([123.0604081495302, 0.5258745216957494]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06229642467669, 0.5495627483085164]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06178144054583, 0.538576915517459]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([123.0713944776552, 0.5399501457074797]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05577329235247, 0.5425249514771285]),
            {
              "class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06246808605364, 0.5658698064827969]),
            {
              "class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07585767345599, 0.5610635203574557]),
            {
              "class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([123.03174069957903, 0.5586603758120867]),
            {
              "class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05542996959856, 0.5610635203574557]),
            {
              "class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05285504894427, 0.56243674536905]),
            {
              "class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07577184276751, 0.5693028655649074]),
            {
              "class": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07937673168352, 0.5729934017981425]),
            {
              "class": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05877736644915, 0.5735941865417484]),
            {
              "class": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05560163097552, 0.5701611300165368]),
            {
              "class": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05113843517474, 0.5687020803727415]),
            {
              "class": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([123.04547360973528, 0.5708477414857466]),
            {
              "class": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00182870464495, 0.6229226840388562]),
            {
              "class": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99496224956683, 0.6281580439989466]),
            {
              "class": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99024156170061, 0.6251970623679697]),
            {
              "class": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99200109081438, 0.6242529809167836]),
            {
              "class": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00809434490374, 0.6215494740061859]),
            {
              "class": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00114205913714, 0.6282867822927181]),
            {
              "class": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([123.02583382059576, 0.605284510638287]),
            {
              "class": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05718337415603, 0.5933764703557739]),
            {
              "class": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06919967054274, 0.5920890789212453]),
            {
              "class": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([123.03369518570673, 0.5817031398919708]),
            {
              "class": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([123.04086204819453, 0.5789566987455957]),
            {
              "class": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([123.04674145035517, 0.5844924928131221]),
            {
              "class": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05296417526972, 0.5780555224542431]),
            {
              "class": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([123.05747028641474, 0.577926782972369]),
            {
              "class": 0,
              "system:index": "29"
            })]),
    Sawah = 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([123.02172180466425, 0.5822610105867037]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([123.03004738144648, 0.5842779272528997]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([123.0831342703696, 0.5984395838194738]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08802661961276, 0.6014864062122751]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09326229160983, 0.5960793681261446]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([123.0820184714194, 0.5931183688263085]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09510179650908, 0.5874109309306098]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([123.10527273309356, 0.5848361450061591]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08493085992461, 0.5839778827686285]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([123.077077351929, 0.5881833664768611]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09441515100127, 0.578613740822749]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([123.10347028863555, 0.578613740822749]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09591718804961, 0.585136536758301]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07596155297881, 0.5811027033191694]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08797784936553, 0.5738932917134545]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08162637841826, 0.5742365972349622]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([123.0976471527529, 0.568443313807854]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([123.10592981419089, 0.5658256060531507]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([123.11172338566305, 0.5683145741099185]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08597417912009, 0.5684004005755311]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09481474003317, 0.5715330656959811]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08743330082419, 0.5674563093836673]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08103045461628, 0.5593581260013597]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08515032766316, 0.5611175710021502]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09266051290486, 0.5609459178546219]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09982737539265, 0.5573841139092278]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07523688314411, 0.554423094531199]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06909998891804, 0.5572553739671784]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07000121114704, 0.5601305653350538]),
            {
              "class": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([123.07184657094929, 0.5517624671600998]),
            {
              "class": 1,
              "system:index": "29"
            })]),
    Vegetasi = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([123.18541037750991, 0.5762260762165126]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([123.24377524567397, 0.5618072316779242]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([123.23725211334975, 0.551851342009238]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([123.25441825104507, 0.5357158993607731]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([123.27330100250991, 0.5491048867416964]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([123.17442404938491, 0.6023172253225312]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([123.21699607086929, 0.5848087045072694]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([123.17888724518569, 0.6239453202624557]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([123.17614066315444, 0.6321845713056423]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([123.23896872711929, 0.6033471365760242]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00825583649429, 0.5384623607196621]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([122.89701926422866, 0.5667851701697643]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([122.90560233307632, 0.5348576299333824]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([122.9155586929396, 0.5346859760334873]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([122.80123221588882, 0.5424103967537949]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([122.80415045929702, 0.5384623607196621]),
            {
              "class": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([122.81942832184585, 0.5285064324532147]),
            {
              "class": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([122.84294593048843, 0.5324544748987731]),
            {
              "class": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([122.93392646027358, 0.5386340145135811]),
            {
              "class": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99383628083022, 0.5338277064620938]),
            {
              "class": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([122.74256056726315, 0.6958794070717612]),
            {
              "class": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([123.10716933191159, 0.6848938765115512]),
            {
              "class": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([123.26853102624753, 0.6588031412593331]),
            {
              "class": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([123.2946235555444, 0.6203533892203241]),
            {
              "class": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([123.09961623132565, 0.7665981300904485]),
            {
              "class": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([123.17034071863034, 0.737074915527614]),
            {
              "class": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([123.01790541589597, 0.7748371307200792]),
            {
              "class": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99181288659909, 0.7562993570307617]),
            {
              "class": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([122.73844069421628, 0.7398212694449613]),
            {
              "class": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([123.51503676355222, 0.47410460647269836]),
            {
              "class": 2,
              "system:index": "29"
            })]),
    Air = 
    /* color: #ffc82d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([122.99814788530455, 0.5929785685745123]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99849120805845, 0.5893738715466017]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99814788530455, 0.584567605216193]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00587264726744, 0.5754700184272467]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([123.0067309541522, 0.5716936573724531]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([123.01136581132994, 0.5670590290488476]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00776092241392, 0.5651708460737533]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99522964189634, 0.5723802686585393]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99059478471861, 0.5708353931494039]),
            {
              "class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([122.97857848833189, 0.5778731559796954]),
            {
              "class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([122.96913711259947, 0.5744401020231886]),
            {
              "class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([122.9902514619647, 0.5687755584918464]),
            {
              "class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([122.99128143022642, 0.5601929062025067]),
            {
              "class": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([122.98973647783384, 0.5888589146375445]),
            {
              "class": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00432903721043, 0.5991094049895203]),
            {
              "class": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00604565097996, 0.6070053909335046]),
            {
              "class": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([123.00389988376804, 0.6127557212766268]),
            {
              "class": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06388093358233, 0.5259937229161747]),
            {
              "class": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([123.06988908177568, 0.5303709020320422]),
            {
              "class": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08312270246114, 0.5317205930828656]),
            {
              "class": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08936688504781, 0.535110758353171]),
            {
              "class": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([123.12962147794332, 0.546987050314707]),
            {
              "class": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([123.14455601773824, 0.546557916413338]),
            {
              "class": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([123.14601513944234, 0.5451632310223118]),
            {
              "class": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([123.14672481033358, 0.5452066316633549]),
            {
              "class": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([123.14848433944735, 0.5443912769832489]),
            {
              "class": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([123.08260413365952, 0.6283108657519673]),
            {
              "class": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([123.04157903146293, 0.6155740144778262]),
            {
              "class": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([123.04230859231498, 0.6172047031903356]),
            {
              "class": 3,
              "system:index": "28"
            })]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Pilih data DAS sebagai roi
var roi = das.filter(ee.Filter.eq('nama_das', 'LIMBOTO BONE BOLANGO'));
// Landsat 
// Function to mask cloud and cloud's shadow in a Landsat image
function maskL8clouds(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(
            qa.bitwiseAnd(cloudsBitMask).eq(0));
  var masked = image.updateMask(mask)
  var renamed = masked.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
                              ['blue', 'green', 'red', 'nir', 'swir1', 'swir2']);
  return renamed;
}
// Map the cloud masking function over one year of data
var l8filtered = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    .filterDate('2019-5-01', '2020-10-31')
    .filterBounds(roi)
    .map(maskL8clouds)
// Reduce image collection to median composite image
var compositeL8 = l8filtered.median().clip(roi);
// Pre-exported composite
//var compositeL8 = ee.Image("users/hadicu06/expertWorkshopJune/landsat_composite_2019_2b0620b80317c8627c8104e335bd7394")
Map.addLayer(compositeL8, 
    {min:[0,0,0], max:[3000,4000,2000], bands:['swir1','nir','red']}, 'Landsat composite');
var kelas = Pemukiman.merge(Sawah).merge(Vegetasi).merge(Air);
print(kelas);
var cBands = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
var training = compositeL8.select(cBands).sampleRegions({
  collection: kelas,
  properties: ['class'],
  scale: 30
});
print(training);
var klasifikasi = ee.Classifier.randomForest().train({
  features: training,
  classProperty: 'class',
  inputProperties: cBands
});
var classified = compositeL8.select(cBands).classify(klasifikasi);
//Display classification
Map.centerObject(roi,12);
Map.addLayer(classified,
{min: 0, max: 3, palette: ['ff681f','44c866','00ce00','25dcd4']},
'klasifikasi');
//Membagi ROI menjadi 2 (80% untuk membuat model, 20% untuk menguji model)
training = training.randomColumn({ seed: 1 });
var training = training.filter(ee.Filter.lt('random', 0.8)); // 80%
var validation = training.filter(ee.Filter.lt('random', 0.2)); // 20%
var trainAccuracy = klasifikasi.confusionMatrix().accuracy();
print('trainAccuracy', trainAccuracy); // 1.0
var testAccuracy = validation
    .classify(klasifikasi)
    .errorMatrix('class', 'classification')
    .accuracy();
print('testAccuracy', testAccuracy); // 1.0 
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: classified,
  description: 'Klasifikasi',
  scale: 30,
  region: roi
});
// Tetapkan ukuran dan letak legenda
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Membuat judul
var legendTitle = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Menampilkan judul ke panel
legend.add(legendTitle);
// Membuat style
var makeRow = function(color, name) {
// Mewarnai box
var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
// Use padding to give the box height and width.
padding: '8px',
margin: '0 0 4px 0'
}
});
// Membuat label
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
// Mengambalikan panel
return ui.Panel({
widgets: [colorBox, description],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
//  Memberi warna
var palette =['ff681f','44c866','00ce00','25dcd4'];
// Menamai legenda
var names = ['Pemukiman','Sawah','Vegetasi','Air'];
// Menambahkan warna dan nama
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Menambahkan legenda ke peta atau dapat juga di print pada console  
Map.add(legend);