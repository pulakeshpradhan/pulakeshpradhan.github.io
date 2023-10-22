var forestBlocks = ui.import && ui.import("forestBlocks", "table", {
      "id": "users/derickongeri/Kenya_Legal_Forest_Bondaries"
    }) || ee.FeatureCollection("users/derickongeri/Kenya_Legal_Forest_Bondaries"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                37.02735900878906,
                0.09819025955439326
              ],
              [
                37.17464447021484,
                0.09819025955439326
              ],
              [
                37.17464447021484,
                0.26950736797333824
              ],
              [
                37.02735900878906,
                0.26950736797333824
              ],
              [
                37.02735900878906,
                0.09819025955439326
              ]
            ]
          ],
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
        [[[37.02735900878906, 0.09819025955439326],
          [37.17464447021484, 0.09819025955439326],
          [37.17464447021484, 0.26950736797333824],
          [37.02735900878906, 0.26950736797333824],
          [37.02735900878906, 0.09819025955439326]]]);
Map.centerObject(forestBlocks, 6);
//Create pannel to arrage the widgets
var panel = ui.Panel({style:{width: '500px'}})
              .add(ui.Label(
                {
                  value: 'SAR Forest Canopy Disturbance Monitoring Tool',
                  style: {fontWeight: 'bold', fontSize:'24px', margin: '10px 5px', color: 'red'}
                }))
              .add(ui.Label('This app allows you to perform Change detection on Selected' +
              'Tropical Forests Using SENTINEL-1 GRD data'));
//Select forest block              
var forestBlock = ui.Select({
  items: [
    {label: 'AoI', value: 'AoI'},
    {label: 'Kapchemutwa', value: 'Kapchemutwa'},
    {label: 'Sogotio', value: 'Sogotio'},
    {label: 'Kipkunur', value: 'Kipkunur'},
    {label: 'Cheboyit', value: 'Cheboyit'},
    {label: 'Kerrer', value: 'Kerrer'},
    {label: 'Kaisungor', value: 'Kaisungor'},
    {label: 'Toropket', value: 'Toropket'},
    {label: 'Chemurokoi', value: 'Chemurokoi'},
    {label: 'Kiptaber', value: 'Kiptaber'},
    {label: 'Kessup', value: 'Kessup'},
    {label: 'Kaptagat', value: 'Kaptagat'},
    {label: 'Tingwa Hill', value: 'Tingwa Hill'},
    {label: 'Tumeya', value: 'Tumeya'},
    {label: 'Kapchorua Block IV', value: 'Kapchorua Block IV'},
    {label: 'Kapchorua Block I', value: 'Kapchorua Block I'},
    {label: 'Kipkabus', value: 'Kipkabus'},
    {label: 'Kapsaret', value: 'Kapsaret'},
    {label: 'Eldoret Municipality', value: 'Eldoret Municipality'},
    {label: 'Kiplombe', value: 'Kiplombe'},
    {label: 'Kakamega', value: 'Kakamega'},
    {label: 'Pekerra', value: 'Pekerra'},
    {label: 'Ketiwon', value: 'Ketiwon'},
    {label: 'Saimo', value: 'Saimo'},
    {label: 'Tutwoin', value: 'Tutwoin'},
    {label: 'Cherial', value: 'Cherial'},
    {label: 'Sokta', value: 'Sokta'},
    {label: 'Katimok', value: 'Katimok'},
    {label: 'Mosegem', value: 'Mosegem'},
    {label: 'Pemwai', value: 'Pemwai'},
    {label: 'Chebartigon', value: 'Chebartigon'},
    {label: 'Marop', value: 'Marop'},
    {label: 'Tambaras', value: 'Tambaras'},
    {label: 'Kinyo', value: 'Kinyo'},
    {label: 'Kimojoch', value: 'Kimojoch'},
    {label: 'Chepkuchumo', value: 'Chepkuchumo'},
    {label: 'Mukobe', value: 'Mukobe'},
    {label: 'Sekenwo', value: 'Sekenwo'},
    {label: 'Sanao', value: 'Sanao'},
    {label: 'Mt Elgon', value: 'Mt Elgon'},
    {label: 'Mt. Elgon', value: 'Mt. Elgon'},
    {label: 'Kapolet', value: 'Kapolet'},
    {label: 'Embobut', value: 'Embobut'},
    {label: 'Lugari', value: 'Lugari'},
    {label: 'Kitalale', value: 'Kitalale'},
    {label: 'Kitale Township', value: 'Kitale Township'},
    {label: 'Lelan', value: 'Lelan'},
    {label: 'Sekker', value: 'Sekker'},
    {label: 'Bunyala', value: 'Bunyala'},
    {label: 'Kisere', value: 'Kisere'},
    {label: 'Taresia', value: 'Taresia'},
    {label: 'North Nandi', value: 'North Nandi'},
    {label: 'Kaptaroi', value: 'Kaptaroi'},
    {label: 'Malava', value: 'Malava'},
    {label: 'sekhendu', value: 'sekhendu'},
    {label: 'Kamatira', value: 'Kamatira'},
    {label: 'Kapkanyar', value: 'Kapkanyar'},
    {label: 'Ururu', value: 'Ururu'},
    {label: 'South Nandi', value: 'South Nandi'},
    {label: 'Mumbaka', value: 'Mumbaka'},
    {label: 'Wanga', value: 'Wanga'},
    {label: 'Namuluku', value: 'Namuluku'},
    {label: 'Nanyungu', value: 'Nanyungu'},
    {label: 'Turbo', value: 'Turbo'},
    {label: 'Manzini', value: 'Manzini'},
    {label: 'Maragoli Hill', value: 'Maragoli Hill'},
    {label: 'OL BOLOSSAT', value: 'OL BOLOSSAT'},
    {label: 'ABERDARES', value: 'ABERDARES'},
    {label: 'LUSOI', value: 'LUSOI'},
    {label: 'KIGANJO', value: 'KIGANJO'},
    {label: 'NYERI', value: 'NYERI'},
    {label: 'NYERI HILL', value: 'NYERI HILL'},
    {label: 'KIKUYU ESCARPMENT', value: 'KIKUYU ESCARPMENT'},
    {label: 'LOWER IMENTI', value: 'LOWER IMENTI'},
    {label: 'MARMANET BLOCK', value: 'MARMANET BLOCK'},
    {label: 'Karura', value: 'Karura'},
    {label: 'Makuli Nguuta', value: 'Makuli Nguuta'},
    {label: 'Nzaui', value: 'Nzaui'},
    {label: 'Nthangu', value: 'Nthangu'},
    {label: 'Kilungu', value: 'Kilungu'},
    {label: 'Kitondu', value: 'Kitondu'},
    {label: 'Kyai', value: 'Kyai'},
    {label: 'Kilala', value: 'Kilala'},
    {label: 'Kithendu', value: 'Kithendu'},
    {label: 'Waiya', value: 'Waiya'},
    {label: 'Kilimani', value: 'Kilimani'},
    {label: 'Katende', value: 'Katende'},
    {label: 'Mutula', value: 'Mutula'},
    {label: 'Mataa', value: 'Mataa'},
    {label: 'Kiteta', value: 'Kiteta'},
    {label: 'Mbooni North', value: 'Mbooni North'},
    {label: 'Mbooni South', value: 'Mbooni South'},
    {label: 'Utunene', value: 'Utunene'},
    {label: 'Kitoo', value: 'Kitoo'},
    {label: 'Utangwa', value: 'Utangwa'},
    {label: 'Makongo', value: 'Makongo'},
    {label: 'Kiu (Ngungu)', value: 'Kiu (Ngungu)'},
    {label: 'Ikilisa', value: 'Ikilisa'},
    {label: 'Kioo', value: 'Kioo'},
    {label: 'Nduluni Kalani', value: 'Nduluni Kalani'},
    {label: 'Kenze', value: 'Kenze'},
    {label: 'Kiongwani', value: 'Kiongwani'},
    {label: 'Ndatai', value: 'Ndatai'},
    {label: 'Kitumbuuni', value: 'Kitumbuuni'},
    {label: 'Momandu', value: 'Momandu'},
    {label: 'Tulimani', value: 'Tulimani'},
    {label: 'Ngong Hills', value: 'Ngong Hills'},
    {label: 'Ololua', value: 'Ololua'},
    {label: 'Ngong Road', value: 'Ngong Road'},
    {label: 'Nairobi Arboretum', value: 'Nairobi Arboretum'},
    {label: 'Dagoreti', value: 'Dagoreti'},
    {label: 'Embakasi', value: 'Embakasi'},
    {label: 'Kiambu', value: 'Kiambu'},
    {label: 'Kamiti', value: 'Kamiti'},
    {label: 'Kyemundu', value: 'Kyemundu'},
    {label: 'Endau', value: 'Endau'},
    {label: 'East Ngamba (GTV)', value: 'East Ngamba (GTV)'},
    {label: 'Mutito', value: 'Mutito'},
    {label: 'Nuu', value: 'Nuu'},
    {label: 'Imba-Chakuyu', value: 'Imba-Chakuyu'},
    {label: 'Gakuyu', value: 'Gakuyu'},
    {label: 'Marsabit', value: 'Marsabit'},
    {label: 'Leroghi', value: 'Leroghi'},
    {label: 'Mathews Range', value: 'Mathews Range'},
    {label: 'Mount Nyiro', value: 'Mount Nyiro'},
    {label: 'Ndotos Range', value: 'Ndotos Range'},
    {label: 'Mukogodo', value: 'Mukogodo'},
    {label: 'Namanga', value: 'Namanga'},
    {label: 'Loitokotok', value: 'Loitokotok'},
    {label: 'Gembe Hills', value: 'Gembe Hills'},
    {label: 'Gwasi', value: 'Gwasi'},
    {label: 'Mwachi', value: 'Mwachi'},
    {label: 'South Coast Mangroves', value: 'South Coast Mangroves'},
    {label: 'Mailuganji', value: 'Mailuganji'},
    {label: 'Shimba Hills', value: 'Shimba Hills'},
    {label: 'Buda', value: 'Buda'},
    {label: 'Mrima', value: 'Mrima'},
    {label: 'Jombo', value: 'Jombo'},
    {label: 'Marenji', value: 'Marenji'},
    {label: 'Gonja', value: 'Gonja'},
    {label: 'North Coast Mangroves', value: 'North Coast Mangroves'},
    {label: 'Arabuko Sokoke', value: 'Arabuko Sokoke'},
    {label: 'Lamu Mangroves', value: 'Lamu Mangroves'},
    {label: 'Witu', value: 'Witu'},
    {label: 'Lamu Mangrove', value: 'Lamu Mangrove'},
    {label: 'Kierera', value: 'Kierera'},
    {label: 'Mutharanga', value: 'Mutharanga'},
    {label: 'Kijege', value: 'Kijege'},
    {label: 'Munguni', value: 'Munguni'},
    {label: 'Njuguni', value: 'Njuguni'},
    {label: 'Ntugi', value: 'Ntugi'},
    {label: 'Mutejwa', value: 'Mutejwa'},
    {label: 'Maatha', value: 'Maatha'},
    {label: 'Kikingo', value: 'Kikingo'},
    {label: 'Thuri', value: 'Thuri'},
    {label: 'Kiagu', value: 'Kiagu'},
    {label: 'Ndare', value: 'Ndare'},
    {label: 'Keiga', value: 'Keiga'},
    {label: 'Nyambeni', value: 'Nyambeni'},
    {label: 'Kibithewa', value: 'Kibithewa'},
    {label: 'Ngaiya', value: 'Ngaiya'},
    {label: 'Olbolosat', value: 'Olbolosat'},
    {label: 'MOLO', value: 'MOLO'},
    {label: 'SOUTH WEST MAU', value: 'SOUTH WEST MAU'},
    {label: 'SOUTHERN MAU', value: 'SOUTHERN MAU'},
    {label: 'MAASAI MAU', value: 'MAASAI MAU'},
    {label: 'OL PUSIMORU', value: 'OL PUSIMORU'},
    {label: 'OL PUSIMORU EXCISION', value: 'OL PUSIMORU EXCISION'},
    {label: 'EBURU', value: 'EBURU'},
    {label: 'MAU NAROK', value: 'MAU NAROK'},
    {label: 'KILOMBE HILL', value: 'KILOMBE HILL'},
    {label: 'MAJI MAZURI', value: 'MAJI MAZURI'},
    {label: 'METKEI', value: 'METKEI'},
    {label: 'TINDERET', value: 'TINDERET'},
    {label: 'TIMBOROA', value: 'TIMBOROA'},
    {label: 'WEST MOLO', value: 'WEST MOLO'},
    {label: 'WESTERN MAU', value: 'WESTERN MAU'},
    {label: 'NABKOI', value: 'NABKOI'},
    {label: 'LONDIANI', value: 'LONDIANI'},
    {label: 'TRANSMARA', value: 'TRANSMARA'},
    {label: 'NORTHERN TINDERET', value: 'NORTHERN TINDERET'},
    {label: 'MOUNT LONDIANI', value: 'MOUNT LONDIANI'},
    {label: 'Menengai', value: 'Menengai'},
    {label: 'Bahati', value: 'Bahati'},
    {label: 'Chepalungu', value: 'Chepalungu'},
    ],
  value: 'AoI',
  onChange: function(value){
    var forestBlockname = value;
  }
  })
panel.add(ui.Label('1)Select Forest Block:', {fontWeight: 'bold'})).add(forestBlock);
panel.add(ui.Label('NOTE: If you wish to select an Area of interest, use the drawing tools on the top-left conner of the map pannel. Before creating new geometry, delete old geometry and click Run above the code editor to refresh the script.', {fontSize: '12px', color:'gray'}));
// Setting the before image date (before Image)
panel.add(ui.Label('2)Set Dates for before image:',{fontWeight: 'bold'}));
panel.add(ui.Label('Start Date',{fontSize: '12px',color:'gray'}));
var before_startDate = ui.Textbox({
  value: '2021-03-01',
  style: {width : '90px'},
  onChange: function(text) {
    var before_start = text
  }
});
panel.add(before_startDate);
panel.add(ui.Label('End Date',{fontSize: '12px',color:'gray'}));
var Before_image_end = ui.Textbox({
  value: '2021-03-19',
  style: {width : '90px'},
  onChange: function(text) {
    var before_endDate = text
  }
});
panel.add(Before_image_end);
// Now set the same parameters for AFTER image.
panel.add(ui.Label('3)Set Dates for after image:',{fontWeight: 'bold'}));
panel.add(ui.Label('Start Date',{fontSize: '12px',color:'gray'}));
var after_image_start = ui.Textbox({
  value: '2021-03-26',
  style: {width : '90px'},
  onChange: function(text) {
    var after_startDate = text
  }
});
panel.add(after_image_start);
//var postfire_start = postfireStart.getValue();
panel.add(ui.Label('Start Date',{fontSize: '12px',color:'gray'}));
var after_image_end = ui.Textbox({
  value: '2021-04-08',
  style: {width : '90px'},
  onChange: function(text) {
    var after_endDate = text
  }
});
panel.add(after_image_end);
// SELECT one of the following:   'L8'  or 'S2' 
var selectOrbitpass = ui.Select({
  items: [
    {label:'DESCENDING', value:'DESCENDING'},
    {label:'Ascending', value:'ASCENDING'},
    ],
  value: 'DESCENDING',
  onChange: function(value){
    var orbitPass = value;
  }
});
panel.add(ui.Label('4)Choose Orbit Pass directin:',{fontWeight: 'bold'})).add(selectOrbitpass);
//Select if intensity scale is to be used
var scaleSelect = ui.Checkbox({
  label: 'Compute SAR intensity',  
  value: true,
  onChange: function(value) {
    var scaleCheck = value
  }
});
panel.add(ui.Label('6)Check to compute SAR intensity of dbScale:', {fontWeight: 'bold'})).add(scaleSelect);
//select Index to compute
var selectIndex = ui.Select({
  items: [
    {label:'VH/(VV + VH)', value:'VH/(VV + VH)'},
    {label:'VV/(VV + VH)', value:'VV/(VV + VH)'},
    {label:'VV/VH', value:'VV/VH'},
    {label:'(VH-VV)/(VH+VV)', value:'(VH-VV)/(VH+VV)'}
    ],
  value: 'VH/(VV + VH)',
  onChange: function(value){
    var index = value;
  },
});
panel.add(ui.Label('7)Select Index to Compute in the text-box below:', {fontWeight: 'bold'})).add(selectIndex);
//Set difference thresholds
var threshold_select = ui.Textbox({
  value: '0.09',
  style: {width : '90px'},
  onChange: function(value) {
    var threshold = value
  }
});
panel.add(ui.Label('8)Set the difference threshold:', {fontWeight: 'bold'})).add(threshold_select);
ui.root.add(panel);
var AddButton = function(){
      var button = ui.Button('Run Tool');
      button.style().set({
        position: 'top-center',
        border : '1px solid #000000',
      });
      button.onClick(function(){return runTool()});
      panel.add(button);
}
AddButton();
var runTool = function(){
  Map.clear();
  var before_start= before_startDate.getValue();
  var before_end= Before_image_end.getValue();
  var after_start= after_image_start.getValue();
  var after_end= after_image_end.getValue();
  var scale = scaleSelect.getValue();
  var area = forestBlock.getValue();
  var pass_direction = selectOrbitpass.getValue(); //"DESCENDING";
  var forestName = forestBlock.getValue();
  var difference_threshold = threshold_select.getValue(); 
  var index = selectIndex.getValue();
  //var dt_index = threshold_select.getValue().toFloat();
  var decision_threshold = 1.3; 
  var connectedPixels = 12;
  var polarization = 'VH';
  var dt_index = ee.Number.parse(difference_threshold)
  var vh_band = "VH"; /* --> VH mostly is the prefered polarization for forest disturbance mapping.
                             However, but you can select 'VV' 
                             as well.*/
  var vv_band = "VV"; /* --> VV works best for subtraction. To be combined for creating LAI*/
  // rename selected geometry feature 
//var aoi = ee.FeatureCollection(geometry);
  var aoi;
    if (area == 'AoI'){
      aoi = geometry;
    }
    else{
      //aoi = forestBlocks
      aoi = forestBlocks.filter(ee.Filter.eq('Forest_blo', forestName))
    }
  var forestGeom = forestBlocks.first().geometry()
  Map.centerObject(aoi, 12)
  // Load and filter Sentinel-1 GRD data by predefined parameters 
  var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode','IW'))
    //.filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
    .filter(ee.Filter.eq('orbitProperties_pass', pass_direction)) 
    .filter(ee.Filter.eq('resolution_meters',10))
    //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
    .filterBounds(aoi);
    //.select(polarization);
  // Select images by predefined dates
  var before_collection = collection.filterDate(before_start, before_end);
  var after_collection = collection.filterDate(after_start,after_end);
  // Print selected tiles to the console
        // Extract date from meta data
        function dates(imgcol){
          var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
          var printed = ee.String('from ')
            .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
            .cat(' to ')
            .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
          return printed;
        }
        // print dates of before images to console
        var before_count = before_collection.size();
        print(ee.String('Tiles selected: Before disturbance ').cat('(').cat(before_count).cat(')'),
          dates(before_collection), before_collection);
        // print dates of after images to console
        var after_count = before_collection.size();
        print(ee.String('Tiles selected: After disturbance ').cat('(').cat(after_count).cat(')'),
          dates(after_collection), after_collection);
  // funct convert from db to intensity scalce 
  var intensityConversion = function (img) {
    // Amplitude
    var VV = img.expression( '10 ** (VV / 20)', {'VV': img.select('VV')});
    VV = VV.select(['constant'], ['VV']);
    var VH = img.expression( '10 ** (VH / 20)', {'VH': img.select('VH')});
    VH = VH.select(['constant'], ['VH']);
    // Intensity
    VV = VV.multiply(VV);
    VH = VH.multiply(VH);
    return VV.addBands(VH);
  };
  if(scale === true){
    var before_collection = before_collection.map(intensityConversion);
    var after_collection = after_collection.map(intensityConversion);
  }
  // Create a mosaic of selected tiles and clip to study area
  var before = before_collection.mosaic().clip(aoi);
  var after = after_collection.mosaic().clip(aoi);
  var im1 = before.select(['VV', 'VH']);
  var im2 = after.select(['VV', 'VH']);
  //Map.addLayer(im1,{}, 'im1');
  // Apply reduce the radar speckle by smoothing  
  var smoothing_radius = 50;
  var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
  var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
  var im1_filtered = im1.focal_mean(smoothing_radius, 'circle', 'meters');
  var im2_filtered = im2.focal_mean(smoothing_radius, 'circle', 'meters');
  //------------------------------- forest cannopy disturbance CALCULATION -------------------------------//
  //=============================== CHANGE DETECTION BY DIVISION =============================*/
  // Calculate the difference between the before and after images
  var difference_negative = before_filtered.divide(after_filtered);
  var difference_positive = after_filtered.divide(before_filtered);
  // Change map with 0 = no change, 2 = decrease, 1 = increase in intensity.
  var dt_1 = decision_threshold;
  var c_map_1 = before_filtered.multiply(0).where(difference_positive.gt(dt_1), 1) 
  var c_map_1 = c_map_1.where(difference_negative.gt(dt_1), 2)
  var c_map_1 = c_map_1.updateMask(c_map_1.gt(0))
  // Refine disturbance result by group connected pixels (or deforestation)
  var connections = c_map_1.int().connectedPixelCount();
  var c_map_1_connectedPixels = c_map_1.updateMask(connections.gte(connectedPixels));
  // Map.addLayer(difference_negative,{}, 'difference negative')
  // Map.addLayer(before_filtered,{}, 'beforeImg')
  // Map.addLayer(after_filtered,{}, 'afterImg')
  // // Apply the predefined difference-threshold and create the forest cannopy disturbance mask 
  // var threshold = difference_threshold;
  // var difference_binary = difference_differe.gt(threshold);
  /*================================ CHANGE DETECTION BY SUBTRACTION =========================*/
  // Determine the direction of change
  var intensity_loss = after_filtered.subtract(before_filtered);
  var intensity_gain = before_filtered.subtract(after_filtered);
  // Change map with 0 = no change, 2 = decrease, 1 = increase in intensity.
  var dt = difference_threshold;
  var c_map = before_filtered.multiply(0).where(intensity_gain.gt(dt), 1) 
  var c_map = c_map.where(intensity_loss.gt(dt), 2)
  var c_map = c_map.updateMask(c_map.gt(0))
  var c_map_loss = c_map.updateMask(c_map.eq(1))
  var c_map_gain = c_map.updateMask(c_map.eq(2))
  // Refine disturbance result by group connected pixels (or deforestation)
  var connections = c_map.int().connectedPixelCount();
  var c_map_connectedPixels = c_map.updateMask(connections.gte(connectedPixels));
  // connected pixels for loss
  var connections = c_map_loss.int().connectedPixelCount();
  var c_map_loss_connected = c_map_loss.updateMask(connections.gte(connectedPixels));
  /*============================= INDEX Computations ===========================================*/
  if(index == 'VV/(VV + VH)' && scale === false){
    var LAI_before = im1_filtered.select('VV').subtract((im1_filtered.select('VH').multiply(im1_filtered.select('VV'))));
    var LAI_after = im2_filtered.select('VV').subtract((im2_filtered.select('VH').multiply(im2_filtered.select('VV'))));
  }
  else if(index == 'VV/(VV + VH)' && scale === true){
    var LAI_before = im1_filtered.select('VV').divide((im1_filtered.select('VH').add(im1_filtered.select('VV'))));
    var LAI_after = im2_filtered.select('VV').divide((im2_filtered.select('VH').add(im2_filtered.select('VV'))));
  }
  else if(index == 'VH/(VV + VH)' && scale === false){
    var LAI_before = im1_filtered.select('VH').subtract((im1_filtered.select('VH').multiply(im1_filtered.select('VV'))));
    var LAI_after = im2_filtered.select('VH').subtract((im2_filtered.select('VH').multiply(im2_filtered.select('VV'))));
  }
  else if(index == 'VH/(VV + VH)' && scale === true){
    var LAI_before = im1_filtered.select('VH').divide((im1_filtered.select('VH').add(im1_filtered.select('VV'))));
    var LAI_after = im2_filtered.select('VH').divide((im2_filtered.select('VH').add(im2_filtered.select('VV'))));
  }
  else if(index == 'VV/VH' && scale === false){
    var LAI_before = im1_filtered.select('VV').subtract(im1_filtered.select('VH'));
    var LAI_after = im2_filtered.select('VV').subtract(im2_filtered.select('VH'));
  }
  else if(index == 'VV/VH' && scale === true){
    var LAI_before = im1_filtered.select('VV').divide(im1_filtered.select('VH'));
    var LAI_after = im2_filtered.select('VV').divide(im2_filtered.select('VH'));
  }
  else if(index == '(VH-VV)/(VH+VV)' && scale === false){
    var LAI_before = im1_filtered.select('VH').divide(im1_filtered.select('VV')).subtract((im1_filtered.select('VH').multiply(im1_filtered.select('VV'))));
    var LAI_after = im2_filtered.select('VH').divide(im2_filtered.select('VV')).subtract((im2_filtered.select('VH').multiply(im2_filtered.select('VV'))));
  }
  else if(index == '(VH-VV)/(VH+VV)' && scale === true){
   var LAI_before = im1_filtered.select('VH').subtract(im1_filtered.select('VV')).divide((im1_filtered.select('VH').add(im1_filtered.select('VV'))));
   var LAI_after = im2_filtered.select('VH').subtract(im2_filtered.select('VV')).divide((im2_filtered.select('VH').add(im2_filtered.select('VV'))));
  }
  var diffience_LAI_1 = LAI_before.subtract(LAI_after);
  var diffience_LAI_2 = LAI_after.subtract(LAI_before);
  print(diffience_LAI_2, 'differnce LAI');
  print(diffience_LAI_1, 'differnce LAI 1');
  var c_map_LAI = LAI_before.multiply(0).where(diffience_LAI_1.gt(dt_index), 1) 
  var c_map_LAI = c_map_LAI.where(diffience_LAI_2.gt(dt_index), 2)
  var c_map_LAI = c_map_LAI.updateMask(c_map_LAI.gt(0))
  var c_map_LAI_loss = c_map_LAI.updateMask(c_map_LAI.eq(1))
  print(c_map_LAI, 'cmp lai')
  // Refine disturbance result by group connected pixels (or deforestation)
  var connections_LAI = c_map_LAI.int().connectedPixelCount();
  var c_map_connectedPixels_LAI = c_map_LAI.updateMask(connections_LAI.gte(connectedPixels));
  // print(LAI_before);
  // print(c_map_connectedPixels_LAI);
  var vis_param = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
      '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
  Map.addLayer(LAI_before,{min:-361.50,max: -109.99, palette:vis_param}, 'LAI_before');
  Map.addLayer(LAI_after,{min: -361.50,max: -109.99, palette:vis_param}, 'LAI_after');
  // Map.addLayer(diffience_LAI_1,{min: -361.50,max: -109.99, palette:vis_param}, 'subtract', 0);
  // Calculate forest cannopy disturbance area
  // Create a raster layer containing the area information of each pixel 
  var pixelArea = intensity_loss.select(polarization)
    .multiply(ee.Image.pixelArea());
  // Sum the areas of flooded pixels
  // default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
  // accurate result set bestEffort to false and increase 'maxPixels'. 
  var change_stats = pixelArea.reduceRegion({
    reducer: ee.Reducer.sum(),              
    geometry: aoi,
    scale: 10, // native resolution 
    //maxPixels: 1e9,
    bestEffort: true
    });
  // Convert the forest cannopy disturbance to hectares (area calculations are originally given in meters)  
  var change_area_ha = change_stats
    .getNumber(polarization)
    .divide(10000)
    .round(); 
  //  compute stats for loss and gain indidual bands 
  var area_ = c_map_connectedPixels.reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: geometry,
    scale: 10,
  });
  var area_1 = c_map_1_connectedPixels.reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: geometry,
    scale: 10,
  });
  // compute stats for loss and gain LAI
  // loss
  var area_LAI = c_map_connectedPixels_LAI.reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: geometry,
    scale: 10,
  });
  // print on the console 
  // print((area_LAI.getInfo()['VV']*100)*0.000247, 'LAI subtration los')
  // //print((area_.getInfo()['VH'] *100)*0.000247, 'subtraction area acre VH');
  // print((area_.getInfo()['VV'] *100)*0.000247, 'subtraction  area acre VV');
  // print((area_1.getInfo()['VH'] *100)*0.000247, 'division area acre VH');
  // print((area_1.getInfo()['VV'] *100)*0.000247, 'division area acre VV');
  /*==========================================================================================================*/
  //------------------------------  DISPLAY PRODUCTS  ----------------------------------//
  // Before and after SAR mosaic
  Map.centerObject(aoi,12);
  // Map.addLayer(before_filtered, {min:-25,max:0}, 'Before disturbance',0);
  // Map.addLayer(after_filtered, {min:-25,max:0}, 'After disturbance',0);
  // Difference layer
  //Map.addLayer(difference_negative,{min:0,max:2},"Difference Layer",0);
  // Forest change layer
  //Map.addLayer(c_map,{min:1, max:2, palette:['red', 'blue']},'Forest Change(subtract)',0);
  // Map.addLayer(c_map_connectedPixels.select(vv_band),{min:1, max:2, palette:['red', 'blue']},'Forest Change Grouped pixels(subtract)',0);
   Map.addLayer(c_map_1_connectedPixels.select('VH'),{min:1, max:2, palette:['red', 'blue']},'Forest Change Grouped pixels(division)',1);
   Map.addLayer(c_map_connectedPixels_LAI.select('VH'),{min:1, max:2, palette:['red', 'blue']},'Forest Change LAI pixels(subtraction)',1);
  // Map.addLayer(c_map_loss_connected.select('VH'),{min:0, max:1, palette:['red']},'Forest loss',1);
  //------------------------------------- EXPORTS ------------------------------------//
  //Export disturbance area as TIFF file 
  Export.image.toDrive({
    image: c_map, 
    description: 'Forest_change_raster',
    fileNamePrefix: 'FCDM',
    region: aoi, 
    maxPixels: 1e10
  });
  // Export flooded area as shapefile (for further analysis in e.g. QGIS)
  // Convert flood raster to polygons
  var forest_loss_vec = c_map_loss_connected.select('VH').int().reduceToVectors({
    scale: 10,
    geometryType:'polygon',
    geometry: aoi,
    eightConnected: false,
    bestEffort:true,
    tileScale:2,
  });
  // Export flood polygons as shape-file
  Export.table.toDrive({
    collection:forest_loss_vec,
    description:'loss_extent_vector',
    fileFormat:'SHP',
    fileNamePrefix:'forestLoss_vec'
  });
}