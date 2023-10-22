/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Point([-19.387580623816802, 64.65232882905315]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var PALETTE = ["0000ff","0078ff","46aafa","ff0000","ff9696","ffa929","ffdc64","ffff00","c8c800","969600","96ff96","64c864","329632","c8ff50","64ff32","32c800","ff00ff","c800c8","963296","966496","aaafff","5a78dc","4b50b4","320087","00ffff","32c8ff","007d7d","00465f","b3b3b3","666666"]
var CLASSES = ['Af', 'Am', 'Aw', 'BWh','BWk','BSh', 'BSk', 'CSa', 'CSb','CSc','CWa', 'CWb', 'CWc' ,'CFa', 'CFb','CFc','DSa', 'DSb', 'DSc', 'DSd','DWa','DWb', 'DWc', 'DWd', 'DFa','DFb','DFc', 'DFc', 'ET','EF']
//-----------------------Data imports--------------------------          
var imageCollection = ee.ImageCollection("NASA/NEX-GDDP"),
    nexdata = ee.Image("NASA/NEX-GDDP/historical_ACCESS1-0_19500105"),
    dem = ee.Image("USGS/GTOPO30"),
    climClass = ee.Image("users/climateClass/world_koppen"),
    climClassVis = {"opacity":1,"bands":["b1"],"min":1,"max":32,"gamma":1},
    kopVisParam = {"opacity":1,"bands":["constant"],"min":1,"max":30,"palette":PALETTE},
    landimg = ee.Image("Oxford/MAP/LST_Night_5km_Monthly/2005_10");
var land=landimg.select('Mean').gt(-999);
//-------------------------Code to classify Koppen-Geiger Climate Classess------------------------    
var KOPPEN = function(year, year2, rcp){
//var d = ee.Date.fromYMD(year,1,1) //day of the year iterator
//var Ensamble = [];                //empty list to store the Climate model ensamble
var start = ee.Date.fromYMD(year,1,1)
var end = ee.Date.fromYMD(year2,12,31)
var n_days = end.difference(start,'day')
var date_list = ee.List.sequence(0,n_days).map(function(n){
  return start.advance(n,'day')})
var Ensamble_means = ee.List([])
if(year < 2006) {
  Ensamble_means = date_list.map(function(date) {
  var img_daily = imageCollection.filterDate(date)
    .filter(ee.Filter.eq('scenario', 'historical'))
  var e_mean =  img_daily.mean()
  var date_dict = ee.Dictionary(['day', img_daily.first().get('day'),'month', img_daily.first().get('month'),'year', img_daily.first().get('year')]);
  return e_mean.set(date_dict)  
})}
if(year > 2005){
  Ensamble_means = date_list.map(function(date) {
  var img_daily = imageCollection.filterDate(date)
    .filter(ee.Filter.eq('scenario', rcp))
  var e_mean =  img_daily.mean()
  var date_dict = ee.Dictionary(['day', img_daily.first().get('day'),'month', img_daily.first().get('month'),'year', img_daily.first().get('year')]);
  return e_mean.set(date_dict)  
})}
Ensamble_means = ee.ImageCollection(Ensamble_means)
//Now we loop through the period and extract the ensamble mean for each date and store in our list 
/*
for (var i = 0; i < n_days; i++) { 
  var img_daily = imageCollection.filterDate(d).limit(21); //Get the RCP45 ensamble 
  var d = d.advance(1,'day')                               //Add a day to the runner
  //Create dictionary to store the date info for the ensamble
  var date_dict = ee.Dictionary(['day', img_daily.first().get('day'),'month', img_daily.first().get('month'),'year', img_daily.first().get('year')]);
  //Calculate the mean of the climate model ensamble and attach the date dictionary 
  var ensamb_mean = ee.Image(img_daily.reduce(ee.Reducer.mean())).set(date_dict);
  Ensamble.push(ensamb_mean);                     //store the daily ensemble mean
}
var Ensamble_means = ee.ImageCollection(Ensamble);//Classify as image collection to satisfy GEE
*/
//----------------------Köppen Geiger Classification Algorithm------------------------
//Extract image.collections with our Köppen-Geiger input data
var tmax_year = Ensamble_means.select('tasmax')
var tmin_year = Ensamble_means.select('tasmin')
var prec_year = Ensamble_means.select('pr')
//need to find the average precip and tmax in each month
//Start by creating empty lists and and defining the calender 
var prec_month = []; var tmax_month = []; var tmin_month = [];
var days_in_month = [31,28,31,30,31,30,31,31,30,31,30,31];
for (var i = 0; i < 12; i++) { 
  //extract the daily temp and precip
  var prec = prec_year.filter(ee.Filter.eq('month',i+1));
  var tma = tmax_year.filter(ee.Filter.eq('month',i+1));
  var tmi = tmin_year.filter(ee.Filter.eq('month',i+1));
  //Define the date and calculate the monthly mean temp and precip
  var date_dict = ee.Dictionary(['month',prec.first().get('month'),'year',prec.first().get('year')]);
  var prec_monthly_mean = ee.Image(prec.reduce(ee.Reducer.mean())).multiply(60*60*24*days_in_month[i]).set(date_dict);
  var tmax_monthly_mean = ee.Image(tma.reduce(ee.Reducer.mean())).set(date_dict);
  var tmin_monthly_mean = ee.Image(tmi.reduce(ee.Reducer.mean())).set(date_dict);
  tmin_month.push(tmin_monthly_mean);
  tmax_month.push(tmax_monthly_mean);
  prec_month.push(prec_monthly_mean);
}
//define the lists as image collections
prec_month = ee.ImageCollection(prec_month);
tmax_month = ee.ImageCollection(tmax_month);
tmin_month = ee.ImageCollection(tmin_month);
//-----------------Calculating the Koppen Geiger Variables-------------------------
//tmon10: Calculate the number of months that the temperature is above 10°C 
var tmon10 = ee.Image(0); //start by defining an empty image
for (var i = 0; i < 12; i++) { //loop over each month
var t_this_month = ee.Image(tmax_month.filter(ee.Filter.eq('month',i+1)).first()) ;  //extract each monthly temp image from the monthly averages
var img = ee.Image(0);                                                               //create an emtpy image to overlay the pixels with t > 10°C
img = img.where(t_this_month.gte(283.15),1);                                         //Classify pixels with tmon > 10 °C
tmon10 = tmon10.add(img);                                                            //Add up the months in the T10 image
}
//Summer/winter temperatures and precip
var ONDJFM = [10,11,12,1,2,3]; //Define Northern Hemisphere winter months
var AMJJAS = [4,5,6,7,8,9];    //Define Nothern Hemisphere summer months
//Find NH summer and winter mean temperatures
var ONDJFM_t = ee.Image(tmax_year.filter(ee.Filter.inList('month',ONDJFM)).reduce(ee.Reducer.mean()));
var AMJJAS_t = ee.Image(tmax_year.filter(ee.Filter.inList('month', AMJJAS)).reduce(ee.Reducer.mean()));
//Define summer and winter hemisphere based on whether the mean temp in ONDJFM is higher than AMJJAS 
var SH = ee.Image(0).where(ONDJFM_t.gt(AMJJAS_t),1);
var NH = ee.Image(0).where(AMJJAS_t.gte(ONDJFM_t),1);
//Extract the summer and winter precip
var ONDJFM_prec = prec_month.filter(ee.Filter.inList('month', ONDJFM));
var AMJJAS_prec = prec_month.filter(ee.Filter.inList('month', AMJJAS));
//MAP and MAT: Mean annual precip and temp
var MAP = ee.Image(prec_year.reduce(ee.Reducer.mean()).multiply(60*60*24*365));
var MAT = tmax_year.reduce(ee.Reducer.mean());
//P_thresh: Threshold precipitation
if((MAP.multiply(0.7)).gte(ONDJFM_prec)){   //70% of MAP occurs in winter
  var P_thresh = ee.Image(MAT.subtract(273.15)).multiply(2);
}else if((MAP.multiply(0.7)).gte(AMJJAS_prec)){   //70% of MAP occurs in summer
  var P_thresh = ee.Image((MAT.subtract(273.15)).multiply(2)).add(28);
}else{
  var P_thresh = ee.Image((MAT.subtract(273.15)).multiply(2)).add(14);
}  
//MAP100
var MAP100 = ee.Image(100).subtract(ee.Image(MAP.divide(25)))
//Create an empty image to store our Köppen classifications
var koppen = ee.Image(0)
///////////////////////Numbering Convention/////////////////////////////////
///////// Entire classes: A-100, B-200, C-300, D-400
///////// Subclasses: s---1, w---2, f---3
///////// Sub-Subclasses: as employed in Koppen-Geiger Classification Map
////////////////////////////////////////////////////////////////////////////
//Class B: Arid
koppen = koppen.where(MAP.lt(P_thresh.multiply(10)),
                200);
// BW: MAP<5×Pthreshold
koppen = koppen.where(MAP.lt(P_thresh.multiply(5))
                .and(koppen.eq(200)),
                2001);
//BS: MAP>= 5xPthreshold              
koppen = koppen.where(koppen.eq(200)
                .and(MAP.gte(P_thresh.multiply(5))),
                2002);
        //BWh: MAT>=18
        koppen = koppen.where(MAT.gte(273.15+18)
                .and(koppen.eq(2001)),
                4);
        //BWk: MAT<18 
        koppen = koppen.where(MAT.lt(273.15+18)
                .and(koppen.eq(2001)),
                5);
        //BSh: MAT>=18
        koppen = koppen.where(MAT.gte(273.15+18)
                .and(koppen.eq(2002)),
                6);
        //BSk: MAT<18
        koppen = koppen.where(MAT.lt(273.15+18) 
                .and(koppen.eq(2002)), 
                7); 
//Class A: Tropical: Tcold >=18
koppen = koppen.where(ee.Image(tmin_year.max()).gte(273.15+18) 
                .and(koppen.neq(4))
                .and(koppen.neq(5))
                .and(koppen.neq(6))
                .and(koppen.neq(7))
                ,100)
        //Af: Pdry >=60
        koppen = koppen.where(koppen.eq(100)
                        .and(ee.Image(prec_month.min()).gte(60)),
                        1);
        //Am: Not (Af) & Pdry>=100–MAP/25
        koppen = koppen.where(koppen.eq(100)
                       .and(koppen.neq(1))
                       .and(ee.Image(prec_month.min()).gte(MAP100)),
                       2);
        //Aw: Not (Af) & Pdry<100–MAP/25
        koppen = koppen.where(koppen.eq(100)
                       .and(koppen.neq(1))
                       .and(ee.Image(prec_month.min()).lt(MAP100)),
                       3)
//Class C: Temperate 
koppen = koppen.where(ee.Image(tmax_month.max()).gte(283.15)
               .and(koppen.neq(4))
               .and(koppen.neq(5))
               .and(koppen.neq(6))
               .and(koppen.neq(7))
               .and(ee.Image(tmin_month.min()).gte(273.15))
               .and(ee.Image(tmin_month.min()).lte(291.15)),
               300)
//Cs: Psdry<40 & Psdry<Pwwet/3
var PSHsdry = ee.Image(SH.multiply(ONDJFM_prec.min()));
var PNHsdry = ee.Image(NH.multiply(AMJJAS_prec.min()));
var PSHwwet = ee.Image(SH.multiply(AMJJAS_prec.max()));
var PNHwwet = ee.Image(NH.multiply(ONDJFM_prec.max()));
koppen=koppen.where(PSHsdry.lt(40)
             .or(PNHsdry.lt(40))
             .and(PSHsdry.lt(PSHwwet.divide(3)))
             .or(PNHsdry.lt(PNHwwet.divide(3)))
             .and(koppen.eq(300)),
               3001);
//Cw: Pwdry<Pswet/10
var PSHwdry = ee.Image(SH.multiply(AMJJAS_prec.min()));
var PNHwdry = ee.Image(NH.multiply(ONDJFM_prec.min()));
var PSHswet = ee.Image(SH.multiply(ONDJFM_prec.max()));
var PNHswet = ee.Image(NH.multiply(AMJJAS_prec.max()));
koppen=koppen.where(PSHwdry.lt(PSHswet.divide(10))
             .or(PNHwdry.lt(PNHswet.divide(10)))
             .and(koppen.eq(300)),
             3002);
//Cf: Psdry<40 & Psdry<Pwwet/3
koppen=koppen.where(koppen.neq(3001)
              .and(koppen.neq(3002))
              .and(koppen.eq(300)),
               3003);
      //Csa: Thot>=22
      koppen= koppen.where(koppen.eq(3001)
                    .and(tmax_month.max().gte(273.15+22)),
                    8);
      //Csb: Not (a) & Tmon10>=4 
      koppen= koppen.where(koppen.eq(3001)
                    .and(koppen.neq(8))
                    .and(tmon10.gte(4)),
                    9);
      //Csc: Not (a or b) & 1<=Tmon10<4
      koppen= koppen.where(koppen.eq(3001)
                    .and(koppen.neq(8))
                    .and(koppen.neq(9))
                    .and(tmon10.gte(1))
                    .and(tmon10.lt(4)),
                    10);  
      //Cwa: Thot>=22
      koppen= koppen.where(koppen.eq(3002)
                    .and(tmax_month.max().gte(273.15+22)),
                    11);
      //Cwb: Not (a) & Tmon10>=4 
      koppen= koppen.where(koppen.eq(3002)
                    .and(koppen.neq(11))
                    .and(tmon10.gte(4)),
                    12);
      //Cwc: Not (a or b) & 1<=Tmon10<4
      koppen= koppen.where(koppen.eq(3002)
                    .and(koppen.neq(11))
                    .and(koppen.neq(12))
                    .and(tmon10.gte(1))
                    .and(tmon10.lt(4)),
                    13);    
      //Cfa: Thot>=22
      koppen= koppen.where(koppen.eq(3003)
                    .and(tmax_month.max().gte(273.15+22)),
                    14);
      //Cfb: Not (a) & Tmon10>=4 
      koppen= koppen.where(koppen.eq(3003)
                    .and(koppen.neq(14))
                    .and(tmon10.gte(4)),
                    15);
      //Cfc: Not (a or b) & 1<=Tmon10<4
      koppen= koppen.where(koppen.eq(3003)
                    .and(koppen.neq(14))
                    .and(koppen.neq(15))
                    .and(tmon10.gte(1)).and(tmon10.lt(4)),
                    16);                
//Class D: Cold: Thot > 10°C and Tcold < 0°C
koppen = koppen.where(ee.Image(tmax_month.max()).gte(283.15)
               .and(ee.Image(tmin_month.min()).lte(273.15))
               .and(koppen.neq(4))
                .and(koppen.neq(5))
                .and(koppen.neq(6))
                .and(koppen.neq(7)),
               400)
//Ds: Psdry<40 & Psdry<Pwwet/3
koppen=koppen.where(PSHsdry.lt(40)
             .or(PNHsdry.lt(40))
             .and(PSHsdry.lt(PSHwwet.divide(3)))
             .or(PNHsdry.lt(PNHwwet.divide(3)))
             .and(koppen.eq(400)),
             4001);
//Dw: Pwdry<Pswet/10
koppen=koppen.where(PSHwdry.lt(PSHswet.divide(10))
             .or(PNHwdry.lt(PNHswet.divide(10)))
             .and(koppen.eq(400)),
              4002);
//Df: Psdry<40 & Psdry<Pwwet/3 
koppen=koppen.where(koppen.neq(4001)
              .and(koppen.neq(4002))
              .and(koppen.eq(400)),
               4003);
      //Dsa: 
      koppen= koppen.where(koppen.eq(4001)
                    .and(tmax_month.max().gte(273.15+22)),
                    17);
      //Dsb: 
      koppen= koppen.where(koppen.eq(4001)
                    .and(tmon10.gte(4))
                    .and(koppen.neq(17)),
                    18);
     //Dsd: 
      koppen= koppen.where(koppen.eq(4001)
                    .and(koppen.neq(17))
                    .and(koppen.neq(18))
                    .and(tmin_month.min().lte(273.15-38)),
                    20);
      //Dsc: 
      koppen= koppen.where(koppen.eq(4001)
                    .and(koppen.neq(17))
                    .and(koppen.neq(18))
                    .and(koppen.neq(20)),
                    19);
      //Dwa: 
      koppen= koppen.where(koppen.eq(4002)
                    .and(tmax_month.max().gte(273.15+22)),
                    21);
      //Dwb: 
      koppen= koppen.where(koppen.eq(4002)
                    .and(tmon10.gte(4))
                    .and(koppen.neq(21)),
                    22);
      //Dwd: 
      koppen= koppen.where(koppen.eq(4002)
                    .and(koppen.neq(21))
                    .and(koppen.neq(22))
                    .and(tmin_month.min().lte(235.15)),
                    24);              
      //Dwc: 
      koppen= koppen.where(koppen.eq(4002)
                    .and(koppen.neq(21))
                    .and(koppen.neq(22))
                    .and(koppen.neq(24)),
                    23);
      //Dfa: 
      koppen= koppen.where(koppen.eq(4003)
                    .and(tmax_month.max().gte(273.15+22)),
                    25);
      //Dfb: 
      koppen= koppen.where(koppen.eq(4003)
                    .and(tmon10.gte(4))
                    .and(koppen.neq(25)),
                    26);
      //Dfc: 
      koppen= koppen.where(koppen.eq(4003)
                    .and(koppen.neq(25))
                    .and(koppen.neq(26))
                    .and(koppen.neq(28)),
                    27);
      //Dfd: 
      koppen= koppen.where(koppen.eq(4003)
                    .and(koppen.neq(25))
                    .and(koppen.neq(26))
                    .and(tmin_month.min().lte(235.15)),
                    28);
//Class ET: Tundra; Thot < 10°C and Thot > 0°C
koppen = koppen.where(ee.Image(tmax_month.max()).lte(283.15)
               .and(ee.Image(tmax_month.max()).gte(273.15)),
               29);
//Class EF: Frost; Thot < 10°C and Thot < 0°C
koppen = koppen.where(ee.Image(tmax_month.max()).lte(283.15)
                .and(ee.Image(tmax_month.max()).lte(273.15)),
                30);
return koppen.mask(land)
}
var koppen_1950s = KOPPEN(1951, 1960, 'historical')
var koppen_2090_45 = KOPPEN(2090, 2099, 'rcp45')
var koppen_2090_85 = KOPPEN(2090, 2099, 'rcp85')
Export.map.toCloudStorage(koppen_2090_85, 'koppen_rcp85')
Export.map.toCloudStorage(koppen_2090_45, 'koppen_rcp45')
Export.map.toCloudStorage(koppen_1950s, 'koppen_hist')
/*
var koppen_1950s = ui.Map.CloudStorageLayer(gcs-koppen, , 15)
var koppen_2090_45 = KOPPEN(2090, 2099, 'rcp45')
var koppen_2090_85 = KOPPEN(2090, 2099, 'rcp85')
*/
//Map.addLayer(koppen_1950s, kopVisParam,'Koppen 1950-1960',true)
//Map.addLayer(koppen_2090_45, kopVisParam,'Koppen 2090-2100 rcp 4.5',true)
//Map.addLayer(koppen_2090_85, kopVisParam,'Koppen 2090-2100 rcp 8.5',true)
var maps = [];
var map = ui.Map().setControlVisibility(false)
//add 1950-1960 to map
map.addLayer(koppen_1950s, kopVisParam)
map.add(ui.Label('1950-1960'))
maps.push(map)
//add 2090-2100 RCP45 to map
var map = ui.Map().setControlVisibility(false)
map.addLayer(koppen_2090_45, kopVisParam)
map.add(ui.Label('2090-2100 RCP4.5'))
maps.push(map)
//add 2090-2100 RCP45 to map
var map = ui.Map().setControlVisibility(false)
map.addLayer(koppen_2090_85, kopVisParam)
map.add(ui.Label('2090-2100 RCP8.5'))
maps.push(map)
var linker = ui.Map.Linker(maps);
var make_legend_entry = function(class_name, color){
  var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
      });
      // Create the label with the description text.
  var description = ui.Label(class_name, {margin: '0 10px 4px 10px'});
  return ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'));
}
var make_legend = function(classes, palette){
  var legend = ui.Panel([], ui.Panel.Layout.Flow('horizontal', true), {margin: 'auto auto', padding: '7px'})
  legend.add(ui.Label('Legend:', {fontWeight: 'Bold', margin: '0 10px'}))
  for(var i = 0; i < classes.length; i++){
    var entry = make_legend_entry(classes[i], palette[i])
    legend.add(entry)
  }
  return legend
}
var top_panel = ui.Panel(maps, ui.Panel.Layout.Flow('horizontal'), {width: '100%', height: '90%'})
var bottom_panel = ui.Panel({widgets: [make_legend(CLASSES, PALETTE)],
                            style: {width: '100%', maxHeight: '30px'}
})
var main_panel = ui.Panel([top_panel, bottom_panel], ui.Panel.Layout.Flow('vertical'), 
                          {width: '100%', height: '100%'})
ui.root.clear()
ui.root.add(main_panel)