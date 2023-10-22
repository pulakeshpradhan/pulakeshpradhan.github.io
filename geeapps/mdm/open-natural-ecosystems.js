// Forest & SSG Layers
var inputClassMask = ee.Image('users/mdm/atree_ssg/inputClassMask_7e25abdfccea1f74560a68a9f76947c5').rename('classMask')
var inputMask = ee.Image('users/mdm/atree_ssg/inputMask_0a176bc5c736c2641cd77f2aeaf7252b').rename('mask')
  // .aside(Map.addLayer)
var forests = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF")
    .map(function(image){return image.select('fnf').eq(1)})
    .max()
    .and(ee.Image('users/mdm/in_lulc_1819').eq(0).or(ee.Image('users/mdm/in_lulc_1819').eq(1)))
    .updateMask(inputClassMask.eq(2))
    .selfMask()
    .rename('forests')
var ssgContinuous = ee.Image('users/mdm/atree_ssg/finalSSGMap_v3')
  .updateMask(inputClassMask.gt(0).or(inputMask))
  .where(forests, 0)
  .where(ee.Image("USGS/SRTMGL1_003").gt(1200), 0)
  .rename('ssgProb')
  // .selfMask()
  // .aside(Map.addLayer, {palette: ['darkslategray', 'lightslategray', 'cornsilk', 'goldenrod'], min:0, max:1, opacity:1}, 'SSGContinuous')
var ssgDiscrete = ssgContinuous
  .lte(0.35)
  .add(ssgContinuous.gt(0.35).and(ssgContinuous.lte(0.5)).remap([1], [2], 0))
  .add(ssgContinuous.gt(0.5).and(ssgContinuous.lte(0.67)).remap([1], [3], 0))
  .add(ssgContinuous.gt(0.67).remap([1], [4], 0))
  .rename('ssgClass')
  // .aside(Map.addLayer, {palette: ['midnightblue', 'lightslategray', 'cornsilk', 'goldenrod'], min:1, max:4, opacity:1}, 'SSGDiscrete')
var atree_ssg = ee.Image('users/mdm/atree_ssg/atree_ssg_2012')
  .updateMask(inputMask.gte(0))
// WRI Layers
var ptc20 = ee.Image('users/mdm/atree_ssg/wri_potentialTreeCover_agri20').rename('pTrCov')
  .updateMask(inputMask)
  .updateMask(ssgDiscrete.gt(2))
  // .aside(Map.addLayer, {}, 'ptc20');
var ptc20_full = ee.Image('users/mdm/atree_ssg/wri_potentialTreeCover_agri20')
// var ptc40_full = ee.Image('users/mdm/atree_ssg/wri_potentialTreeCover_agri40')
// var agcap40 = ee.Image('users/mdm/atree_ssg/wri_carbonAdditionPotential_40')
//     .updateMask(inputMask)
//     .updateMask(ssgDiscrete.gt(2))
// Vector Layers
var states = ee.FeatureCollection('users/mdm/india_soiStates')
  .filter(ee.Filter.inList('state', ['DELHI', 'PUNJAB', 'UTTAR PRADESH', 'HARYANA', 'RAJASTHAN', 'GUJARAT', 'MAHARASHTRA', 'MADHYA PRADESH', 'CHHATTISGARH', 'JHARKHAND', 'BIHAR', 'TELANGANA', 'ANDHRA PRADESH', 'TAMIL NADU', 'KARNATAKA']));
var districts = ee.FeatureCollection('users/mdm/atree_ssg/districtsWithSSGStats_faa5ee1fb29c3c6a6e78c49cbfe188ca')
  .filter(ee.Filter.gt('dt_ssg_area', 0))
  // .select(
  //     ['st_hi_area', 'dtname', 'st_ptc_mean ', 'dt_hi_area', 'JID', 'st_lo_area', 'st_ssg_area', 'st_area', 'dt_ptc_area', 'dt_lo_area', 'dt_md_area', 'ddname', 'year_stat', 'st_md_area', 'dt_ssg_area', 'dt_area', 'dt_ptc_mean ', 'State_LGD', 'stcode11', 'Dist_LGD', 'st_ptc_area', 'dtcode11', 'system:index', 'stname'],
  //     ['st_hi_area', 'dtname', 'st_ptc_mean', 'dt_hi_area', 'JID', 'st_lo_area', 'st_ssg_area', 'st_area', 'dt_ptc_area', 'dt_lo_area', 'dt_md_area', 'ddname', 'year_stat', 'st_md_area', 'dt_ssg_area', 'dt_area', 'dt_ptc_mean', 'State_LGD', 'stcode11', 'Dist_LGD', 'st_ptc_area', 'dtcode11', 'system:index', 'stname']
  // )
/*
var districts = ee.FeatureCollection('users/mdm/india_districts_2019')
  .filter(ee.Filter.inList('stname', ["ANDHRA PRADESH", "BIHAR", "CHHATTISGARH", "DELHI", "GUJARAT", "HARYANA", "JHARKHAND", "KARNATAKA", "MADHYA PRADESH", "MAHARASHTRA", "PUNJAB", "RAJASTHAN", "TAMIL NADU", "TELANGANA", "UTTAR PRADESH"]))
  .map(function(f){
    // var f_simplified = f.geometry().simplify(1000)
    return f.set('ddname', 
        ee.String(f.get('stname'))
        .cat(ee.String(': '))
        .cat(ee.String(f.get('dtname'))))
  })
  .filter(ee.Filter.inList('ddname', 
    ["ANDHRA PRADESH: Anantapur", "ANDHRA PRADESH: Chittoor", "ANDHRA PRADESH: East Godavari", "ANDHRA PRADESH: Guntur", "ANDHRA PRADESH: Krishna", "ANDHRA PRADESH: Kurnool", "ANDHRA PRADESH: Prakasam", "ANDHRA PRADESH: SPS Nellore", "ANDHRA PRADESH: Srikakulam", "ANDHRA PRADESH: Visakhapatnam", "ANDHRA PRADESH: Vizianagaram", "ANDHRA PRADESH: West Godavari", "ANDHRA PRADESH: YSR Kadapa", "BIHAR: Arwal", "BIHAR: Aurangabad", "BIHAR: Banka", "BIHAR: Begusarai", "BIHAR: Bhagalpur", "BIHAR: Bhojpur", "BIHAR: Buxar", "BIHAR: Darbhanga", "BIHAR: Gaya", "BIHAR: Gopalganj", "BIHAR: Jamui", "BIHAR: Jehanabad", "BIHAR: Kaimur (Bhabua)", "BIHAR: Khagaria", "BIHAR: Lakhisarai", "BIHAR: Madhepura", "BIHAR: Madhubani", "BIHAR: Munger", "BIHAR: Muzaffarpur", "BIHAR: Nalanda", "BIHAR: Nawada", "BIHAR: Pashchim Champaran", "BIHAR: Patna", "BIHAR: Purba Champaran", "BIHAR: Purnia", "BIHAR: Rohtas", "BIHAR: Saharsa", "BIHAR: Samastipur", "BIHAR: Saran", "BIHAR: Sheikhpura", "BIHAR: Sitamarhi", "BIHAR: Siwan", "BIHAR: Supaul", "BIHAR: Vaishali", "CHHATTISGARH: Balrampur", "CHHATTISGARH: Bijapur", "CHHATTISGARH: Koriya", "CHHATTISGARH: Surajpur", "DELHI: Central", "DELHI: North", "DELHI: North East", "DELHI: North West", "DELHI: South", "DELHI: South West", "GUJARAT: Ahmadabad", "GUJARAT: Amreli", "GUJARAT: Anand", "GUJARAT: Aravalli", "GUJARAT: Banas Kantha", "GUJARAT: Bharuch", "GUJARAT: Bhavnagar", "GUJARAT: Botad", "GUJARAT: Chota Udaipur", "GUJARAT: Devbhumi Dwarka", "GUJARAT: Dohad", "GUJARAT: Gandhinagar", "GUJARAT: Gir Somnath", "GUJARAT: Jamnagar", "GUJARAT: Junagadh", "GUJARAT: Kachchh", "GUJARAT: Kheda", "GUJARAT: Mahesana", "GUJARAT: Mahisagar", "GUJARAT: Morbi", "GUJARAT: Narmada", "GUJARAT: Navsari", "GUJARAT: Panch Mahals", "GUJARAT: Patan", "GUJARAT: Porbandar", "GUJARAT: Rajkot", "GUJARAT: Sabar Kantha", "GUJARAT: Surat", "GUJARAT: Surendranagar", "GUJARAT: Tapi", "GUJARAT: The Dangs", "GUJARAT: Vadodara", "GUJARAT: Valsad", "HARYANA: Ambala", "HARYANA: Bhiwani", "HARYANA: Charki Dadri", "HARYANA: Faridabad", "HARYANA: Fatehabad", "HARYANA: Gurugram", "HARYANA: Hisar", "HARYANA: Jhajjar", "HARYANA: Jind", "HARYANA: Kaithal", "HARYANA: Karnal", "HARYANA: Kurukshetra", "HARYANA: Mahendragarh", "HARYANA: Nuh", "HARYANA: Palwal", "HARYANA: Panchkula", "HARYANA: Panipat", "HARYANA: Rewari", "HARYANA: Rohtak", "HARYANA: Sirsa", "HARYANA: Sonipat", "HARYANA: Yamunanagar", "JHARKHAND: Bokaro", "JHARKHAND: Chatra", "JHARKHAND: Deoghar", "JHARKHAND: Dhanbad", "JHARKHAND: Dumka", "JHARKHAND: Garhwa", "JHARKHAND: Giridih", "JHARKHAND: Godda", "JHARKHAND: Gumla", "JHARKHAND: Hazaribagh", "JHARKHAND: Jamtara", "JHARKHAND: Kodarma", "JHARKHAND: Latehar", "JHARKHAND: Lohardaga", "JHARKHAND: Palamu", "JHARKHAND: Ramgarh", "JHARKHAND: Ranchi", 
    "KARNATAKA: Bagalkote", "KARNATAKA: Ballari", "KARNATAKA: Bangalore", "KARNATAKA: Belagavi", "KARNATAKA: Bengaluru Rural", "KARNATAKA: Bidar", "KARNATAKA: Chamarajanagara", "KARNATAKA: Chikkaballapura", "KARNATAKA: Chikkamagaluru", "KARNATAKA: Chitradurga", "KARNATAKA: Davanagere", "KARNATAKA: Dharwad", "KARNATAKA: Gadag", "KARNATAKA: Hassan", "KARNATAKA: Haveri", "KARNATAKA: Kalaburagi", "KARNATAKA: Kodagu", "KARNATAKA: Kolar", "KARNATAKA: Koppal", "KARNATAKA: Mandya", "KARNATAKA: Mysuru", "KARNATAKA: Raichur", "KARNATAKA: Ramanagara", "KARNATAKA: Shivamogga", "KARNATAKA: Tumakuru", "KARNATAKA: Uttara Kannada", "KARNATAKA: Vijayapura", "KARNATAKA: Yadgir", "MADHYA PRADESH: Agar Malwa", "MADHYA PRADESH: Alirajpur", "MADHYA PRADESH: Anuppur", "MADHYA PRADESH: Ashoknagar", "MADHYA PRADESH: Balaghat", "MADHYA PRADESH: Barwani", "MADHYA PRADESH: Betul", "MADHYA PRADESH: Bhind", "MADHYA PRADESH: Bhopal", "MADHYA PRADESH: Burhanpur", "MADHYA PRADESH: Chhatarpur", "MADHYA PRADESH: Chhindwara", "MADHYA PRADESH: Damoh", "MADHYA PRADESH: Datia", "MADHYA PRADESH: Dewas", "MADHYA PRADESH: Dhar", "MADHYA PRADESH: Dindori", "MADHYA PRADESH: East Nimar", "MADHYA PRADESH: Guna", "MADHYA PRADESH: Gwalior", "MADHYA PRADESH: Harda", "MADHYA PRADESH: Hoshangabad", "MADHYA PRADESH: Indore", "MADHYA PRADESH: Jabalpur", "MADHYA PRADESH: Jhabua", "MADHYA PRADESH: Katni", "MADHYA PRADESH: Mandsaur", "MADHYA PRADESH: Morena", "MADHYA PRADESH: Narsimhapur", "MADHYA PRADESH: Neemuch", "MADHYA PRADESH: Niwari", "MADHYA PRADESH: Panna", "MADHYA PRADESH: Raisen", "MADHYA PRADESH: Rajgarh", "MADHYA PRADESH: Ratlam", "MADHYA PRADESH: Rewa", "MADHYA PRADESH: Sagar", "MADHYA PRADESH: Satna", "MADHYA PRADESH: Sehore", "MADHYA PRADESH: Seoni", "MADHYA PRADESH: Shahdol", "MADHYA PRADESH: Shajapur", "MADHYA PRADESH: Sheopur", "MADHYA PRADESH: Shivpuri", "MADHYA PRADESH: Sidhi", "MADHYA PRADESH: Singrauli", "MADHYA PRADESH: Tikamgarh", "MADHYA PRADESH: Ujjain", "MADHYA PRADESH: Umaria", "MADHYA PRADESH: Vidisha", "MADHYA PRADESH: West Nimar", "MAHARASHTRA: Ahmadnagar", "MAHARASHTRA: Akola", "MAHARASHTRA: Amravati", "MAHARASHTRA: Aurangabad", "MAHARASHTRA: Bhandara", "MAHARASHTRA: Bid", "MAHARASHTRA: Buldana", "MAHARASHTRA: Chandrapur", "MAHARASHTRA: Dhule", "MAHARASHTRA: Gadchiroli", "MAHARASHTRA: Gondiya", "MAHARASHTRA: Hingoli", "MAHARASHTRA: Jalgaon", "MAHARASHTRA: Jalna", "MAHARASHTRA: Kolhapur", "MAHARASHTRA: Latur", "MAHARASHTRA: Nagpur", "MAHARASHTRA: Nanded", "MAHARASHTRA: Nandurbar", "MAHARASHTRA: Nashik", "MAHARASHTRA: Osmanabad", "MAHARASHTRA: Palghar", "MAHARASHTRA: Parbhani", "MAHARASHTRA: Pune", "MAHARASHTRA: Raigarh", "MAHARASHTRA: Ratnagiri", "MAHARASHTRA: Sangli", "MAHARASHTRA: Satara", "MAHARASHTRA: Sindhudurg", "MAHARASHTRA: Solapur", "MAHARASHTRA: Thane", "MAHARASHTRA: Wardha", "MAHARASHTRA: Washim", "MAHARASHTRA: Yavatmal", 
    "PUNJAB: Amritsar", "PUNJAB: Barnala", "PUNJAB: Bathinda", "PUNJAB: Faridkot", "PUNJAB: Fatehgarh Sahib", "PUNJAB: Fazilka", "PUNJAB: Firozpur", "PUNJAB: Gurdaspur", "PUNJAB: Hoshiarpur", "PUNJAB: Jalandhar", "PUNJAB: Kapurthala", "PUNJAB: Ludhiana", "PUNJAB: Mansa", "PUNJAB: Moga", "PUNJAB: Pathankot", "PUNJAB: Patiala", "PUNJAB: Rupnagar", "PUNJAB: SAS Nagar", "PUNJAB: SBS Nagar", "PUNJAB: Sangrur", "PUNJAB: Sri Muktsar Sahib", "PUNJAB: Tarn Taran", "RAJASTHAN: Ajmer", "RAJASTHAN: Alwar", "RAJASTHAN: Banswara", "RAJASTHAN: Baran", "RAJASTHAN: Barmer", "RAJASTHAN: Bharatpur", "RAJASTHAN: Bhilwara", "RAJASTHAN: Bikaner", "RAJASTHAN: Bundi", "RAJASTHAN: Chittaurgarh", "RAJASTHAN: Churu", "RAJASTHAN: Dausa", "RAJASTHAN: Dhaulpur", "RAJASTHAN: Dungarpur", "RAJASTHAN: Ganganagar", "RAJASTHAN: Hanumangarh", "RAJASTHAN: Jaipur", "RAJASTHAN: Jaisalmer", "RAJASTHAN: Jalor", "RAJASTHAN: Jhalawar", "RAJASTHAN: Jhunjhunun", "RAJASTHAN: Jodhpur", "RAJASTHAN: Karauli", "RAJASTHAN: Kota", "RAJASTHAN: Nagaur", "RAJASTHAN: Pali", "RAJASTHAN: Pratapgarh", "RAJASTHAN: Rajsamand", "RAJASTHAN: Sawai Madhopur", "RAJASTHAN: Sikar", "RAJASTHAN: Sirohi", "RAJASTHAN: Tonk", "RAJASTHAN: Udaipur", "TAMIL NADU: Ariyalur", "TAMIL NADU: Chengalpattu", "TAMIL NADU: Chennai", "TAMIL NADU: Coimbatore", "TAMIL NADU: Cuddalore", "TAMIL NADU: Dharmapuri", "TAMIL NADU: Dindigul", "TAMIL NADU: Erode", "TAMIL NADU: Kallakurichi", "TAMIL NADU: Kancheepuram", "TAMIL NADU: Kanniyakumari", "TAMIL NADU: Karur", "TAMIL NADU: Krishnagiri", "TAMIL NADU: Madurai", "TAMIL NADU: Nagapattinam", "TAMIL NADU: Namakkal", "TAMIL NADU: Perambalur", "TAMIL NADU: Pudukkottai", "TAMIL NADU: Ramanathapuram", "TAMIL NADU: Ranipet", "TAMIL NADU: Salem", "TAMIL NADU: Sivaganga", "TAMIL NADU: Tenkasi", "TAMIL NADU: Thanjavur", "TAMIL NADU: The Nilgiris", "TAMIL NADU: Theni", "TAMIL NADU: Thiruvallur", "TAMIL NADU: Thiruvarur", "TAMIL NADU: Thoothukkudi", "TAMIL NADU: Tiruchirappalli", "TAMIL NADU: Tirunelveli", "TAMIL NADU: Tirupathur", "TAMIL NADU: Tiruppur", "TAMIL NADU: Tiruvannamalai", "TAMIL NADU: Vellore", "TAMIL NADU: Viluppuram", "TAMIL NADU: Virudhunagar", "TELANGANA: Adilabad", "TELANGANA: Bhadradri Kothagudem", "TELANGANA: Jagitial", "TELANGANA: Jangoan", "TELANGANA: Jayashankar", "TELANGANA: Jogulamba Gadwal", "TELANGANA: Kamareddy", "TELANGANA: Karimnagar", "TELANGANA: Khammam", "TELANGANA: Kumuram Bheem Asifabad", "TELANGANA: Mahabubabad", "TELANGANA: Mahabubnagar", "TELANGANA: Mancherial", "TELANGANA: Medak", "TELANGANA: Medchal Malkajgiri", "TELANGANA: Mulugu", "TELANGANA: Nagarkurnool", "TELANGANA: Nalgonda", "TELANGANA: Narayanpet", "TELANGANA: Nirmal", "TELANGANA: Nizamabad", "TELANGANA: Peddapalli", "TELANGANA: Rajanna Sircilla", "TELANGANA: Ranga Reddy", "TELANGANA: Sangareddy", "TELANGANA: Siddipet", "TELANGANA: Suryapet", "TELANGANA: Vikarabad", "TELANGANA: Wanaparthy", "TELANGANA: Warangal Rural", "TELANGANA: Warangal Urban", "TELANGANA: Yadadri Bhuvanagiri", 
    "UTTAR PRADESH: Agra", "UTTAR PRADESH: Aligarh", "UTTAR PRADESH: Ambedkar Nagar", "UTTAR PRADESH: Amethi", "UTTAR PRADESH: Amroha", "UTTAR PRADESH: Auraiya", "UTTAR PRADESH: Azamgarh", "UTTAR PRADESH: Baghpat", "UTTAR PRADESH: Bahraich", "UTTAR PRADESH: Ballia", "UTTAR PRADESH: Balrampur", "UTTAR PRADESH: Banda", "UTTAR PRADESH: Bara Banki", "UTTAR PRADESH: Bareilly", "UTTAR PRADESH: Basti", "UTTAR PRADESH: Bhadohi", "UTTAR PRADESH: Bijnor", "UTTAR PRADESH: Budaun", "UTTAR PRADESH: Bulandshahr", "UTTAR PRADESH: Chandauli", "UTTAR PRADESH: Chitrakoot", "UTTAR PRADESH: Deoria", "UTTAR PRADESH: Etah", "UTTAR PRADESH: Etawah", "UTTAR PRADESH: Faizabad", "UTTAR PRADESH: Farrukhabad", "UTTAR PRADESH: Fatehpur", "UTTAR PRADESH: Firozabad", "UTTAR PRADESH: Gautam Buddha Nagar", "UTTAR PRADESH: Ghaziabad", "UTTAR PRADESH: Ghazipur", "UTTAR PRADESH: Gonda", "UTTAR PRADESH: Gorakhpur", "UTTAR PRADESH: Hamirpur", "UTTAR PRADESH: Hapur", "UTTAR PRADESH: Hardoi", "UTTAR PRADESH: Hathras", "UTTAR PRADESH: Jalaun", "UTTAR PRADESH: Jaunpur", "UTTAR PRADESH: Jhansi", "UTTAR PRADESH: Kannauj", "UTTAR PRADESH: Kanpur Dehat", "UTTAR PRADESH: Kanpur Nagar", "UTTAR PRADESH: Kasganj", "UTTAR PRADESH: Kaushambi", "UTTAR PRADESH: Kheri", "UTTAR PRADESH: Kushinagar", "UTTAR PRADESH: Lalitpur", "UTTAR PRADESH: Lucknow", "UTTAR PRADESH: Mahoba", "UTTAR PRADESH: Mainpuri", "UTTAR PRADESH: Mathura", "UTTAR PRADESH: Mau", "UTTAR PRADESH: Meerut", "UTTAR PRADESH: Mirzapur", "UTTAR PRADESH: Moradabad", "UTTAR PRADESH: Muzaffarnagar", "UTTAR PRADESH: Pilibhit", "UTTAR PRADESH: Pratapgarh", "UTTAR PRADESH: Prayagraj", "UTTAR PRADESH: Rae Bareli", "UTTAR PRADESH: Rampur", "UTTAR PRADESH: Saharanpur", "UTTAR PRADESH: Sambhal", "UTTAR PRADESH: Sant Kabir Nagar", "UTTAR PRADESH: Shahjahanpur", "UTTAR PRADESH: Shamli", "UTTAR PRADESH: Shrawasti", "UTTAR PRADESH: Sitapur", "UTTAR PRADESH: Sonbhadra", "UTTAR PRADESH: Sultanpur", "UTTAR PRADESH: Unnao", "UTTAR PRADESH: Varanasi"]
    ))
  .sort('ddname')
// print(districts.aggregate_array('ddname').distinct())
// var districtsWithStats = ee.FeatureCollection(ee.List(["ANDHRA PRADESH"])
var districtsWithStats = ee.FeatureCollection(ee.List(["ANDHRA PRADESH", "BIHAR", "CHHATTISGARH", "GUJARAT", "HARYANA", "JHARKHAND", "KARNATAKA", "MADHYA PRADESH", "MAHARASHTRA", "PUNJAB", "RAJASTHAN", "TAMIL NADU", "TELANGANA", "UTTAR PRADESH"])
  .map(function(stname){
    var st_geom = states.filter(ee.Filter.eq('state', stname))
      .geometry()
      .dissolve()
      .simplify(100)
    var st_ssg_area = ssgContinuous
      .rename('st_ssg_area')
      .gte(0.5)
      .multiply(ee.Image.pixelArea())
      .divide(1e6)
      .reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: st_geom,
        scale: 100,
        bestEffort:true,
        maxPixels:1e13,
        tileScale:16
      });
    // var st_ssgClass_area = ssgDiscrete
    //   .eq([2,3,4]).rename(['st_lo_area', 'st_md_area', 'st_hi_area'])
    //   .multiply(ee.Image.pixelArea())
    //   .divide(1e6)
    //   .reduceRegion({
    //     reducer: ee.Reducer.sum(),
    //     geometry: st_geom,
    //     scale: 500,
    //     bestEffort:true,
    //     maxPixels:1e13,
    //     tileScale:16
    //   });
    var st_ptc_area = ptc20
      .rename('st_ptc_area')
      .updateMask(ssgContinuous.gt(0.5))
      .gt(0)
      .multiply(ee.Image.pixelArea())
      .divide(1e6)
      .reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: st_geom,
        scale: 100,
        bestEffort:true,
        maxPixels:1e13,
        tileScale:16
      });
    var st_ptc_mean = ptc20
      .rename('st_ptc_mean')
      .updateMask(ssgContinuous.gt(0.5))
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: st_geom,
        scale: 100,
        bestEffort:true,
        maxPixels:1e13,
        tileScale:16
      });
    return ee.FeatureCollection(districts.filter(ee.Filter.eq('stname', stname))
      .map(function(district){
        var dt_geom = ee.Feature(district).geometry()
          // .dissolve()
          // .simplify(100)
        var dt_ssg_area = ssgContinuous
          .rename('dt_ssg_area')
          .gte(0.5)
          .multiply(ee.Image.pixelArea())
          .divide(1e6)
          .reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: dt_geom,
            scale: 100,
            bestEffort:true,
            maxPixels:1e13,
            tileScale:16
          });
        // var dt_ssgClass_area = ssgDiscrete
        //   .eq([2,3,4]).rename(['dt_lo_area', 'dt_md_area', 'dt_hi_area'])
        //   .multiply(ee.Image.pixelArea())
        //   .divide(1e6)
        //   .reduceRegion({
        //     reducer: ee.Reducer.sum(),
        //     geometry: dt_geom,
        //     scale: 100,
        //     bestEffort:true,
        //     maxPixels:1e13,
        //     tileScale:16
        //   });
        var dt_ptc_area = ptc20
          .rename('dt_ptc_area')
          .updateMask(ssgContinuous.gt(0.5))
          .gt(0)
          .multiply(ee.Image.pixelArea())
          .divide(1e6)
          .reduceRegion({
            reducer: ee.Reducer.sum(),
            geometry: dt_geom,
            scale: 100,
            bestEffort:true,
            maxPixels:1e13,
            tileScale:16
          });
        var dt_ptc_mean = ptc20
          .rename('dt_ptc_mean')
          .updateMask(ssgContinuous.gt(0.5))
          .reduceRegion({
            reducer: ee.Reducer.mean(),
            geometry: dt_geom,
            scale: 100,
            bestEffort:true,
            maxPixels:1e13,
            tileScale:16
          });
        // return ee.Feature(district.geometry(),
        //   dt_ssg_area.combine(dt_ssgClass_area).combine(dt_ptc_area).combine(dt_ptc_mean)
        //   .combine(st_ssg_area).combine(st_ssgClass_area).combine(st_ptc_area).combine(st_ptc_mean)
        //   .combine(ee.Dictionary({dt_area: dt_geom.area().divide(1e6)})).combine(ee.Dictionary({st_area: st_geom.area().divide(1e6)}))
        //   ).copyProperties(district)
        return ee.Feature(district.geometry(),
          dt_ssg_area.combine(dt_ptc_area).combine(dt_ptc_mean)
          .combine(st_ssg_area).combine(st_ptc_area).combine(st_ptc_mean)
          .combine(ee.Dictionary({dt_area: dt_geom.area().divide(1e6)})).combine(ee.Dictionary({st_area: st_geom.area().divide(1e6)}))
          ).copyProperties(district)
      }))
  })).flatten()
// .aside(print)
Export.table.toAsset(districtsWithStats, 'districtsWithSSGStats', 'users/mdm/atree_ssg/districtsWithSSGStats')
*/
var placeNames = districts
  .select({propertySelectors:['stname', 'dtname', 'ddname'], retainGeometry:false})
var stNames = placeNames
  .filter(ee.Filter.neq('stname', 'DELHI'))
  .aggregate_array('stname')
  .distinct()
  .sort()
// print(districts.first().propertyNames())
// // two districts have anomalous areas; don't know why... correcting those here
// var kanniyakumari_filter = ee.Filter.eq('dtname', 'Kanniyakumari')
// var karnal_filter = ee.Filter.eq('dtname', 'Karnal')
// var kanniyakumari = districts.filter(kanniyakumari_filter)
//   .first()
//   .set('dt_area', 1695.2)
//   .set('dt_ssg_area', 57.39)
//   .aside(print)
// var karnal = districts.filter(karnal_filter)
//   .first()
//   .set('dt_area', 2457.7)
//   .set('dt_ssg_area', 1) //0.024
//   .aside(print)
// var districts = districts
//   .filter(ee.Filter.neq('dtname', 'Kanniyakumari'))
//   .filter(ee.Filter.neq('dtname', 'Karnal'))
//   .merge(ee.FeatureCollection([kanniyakumari, karnal]))
//==================================== APP COMPONENTS ===============================
// UI panel elements and their text
// -------------------------------------
var title_leftPanel = ui.Panel({style:{'background-color':'000000', minHeight: '130px'}})
var title_leftText = ui.Label("Mapping India's Open Natural Ecosystems (ONE)", {'background-color':'000000', 'fontSize': '28px', 'font-weight':'bold', 'color': 'orange'});
var subtitle_leftText = ui.Label("Distribution and extent of our Woodland-Savannas, Scrublands, Grasslands, Ravines and Dunes", {'background-color':'000000', 'fontSize': '14px', 'font-weight':'bold', 'color': 'white'});
var title_rightPanel = ui.Panel({style:{'background-color':'000000', height: '60px'}})
var title_rightText = ui.Label("STATES & DISTRICTS\nSummary Statistics", {'background-color':'000000', 'fontSize': '18px', 'font-weight':'bold', 'color': 'white', whiteSpace:'pre-wrap'});
var quickstart_panel = ui.Panel({style:{'background-color':'333333', minHeight: '0px', margin: '5px', padding:'5px'}})
var quickstart_panel_defaultText = ui.Label("QUICK START\n\nYou can pan and zoom on the map, inspect layers, turn them on/off, or adjust their opacity using controls in the map window on the left.\n\nYou can drill down to areas of your interest in the map in one of TWO ways:\n\n  -- FIRST, by clicking on the map in an area of your interest. Doing this will fetch the state/district name of this location, zoom to the state's extent, and fetch state-level stats. \n\n  -- SECOND, by selecting a state of your choice from the drop-down menu below. This will also zoom to that state's extent and fetch state-level stats. \n\nThereafter, you can select a district within a given state to zoom to the district's extent and fetch district-level stats. \n\nTo return to this screen, click 'Reset Map Extent' to zoom to the full extent of the map, or reload the app.", {'background-color':'333333', fontSize: '14px', whiteSpace: 'pre-wrap', color:'orange'})
var placename_panel = ui.Panel({style:{'background-color':'333333', minHeight: '0px', margin: '5px', padding:'5px'}})
// var placename_panel_altText = ui.Label("State Level Summaries:", {'background-color':'333333', fontSize: '14px', whiteSpace: 'pre-wrap', color:'orange'})
var state_selector = ui.Select({
  placeholder: "Choose state...",
  items: ['ANDHRA PRADESH', 'BIHAR', 'CHHATTISGARH', 'GUJARAT', 'HARYANA', 'JHARKHAND', 'KARNATAKA', 'MADHYA PRADESH', 'MAHARASHTRA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH'],
  style: {
    fontSize: '16px',
    fontWeight:'0',
    color: 'blue',
    backgroundColor: "cccccc",
    width: '110px',
    height: '30px'},
  onChange: showStateAttributes,
})
var back_button = ui.Button({
  label: "Reset Map Extent", 
  onClick: resetZoom,
  style: {
    fontSize: '16px',
    fontWeight:'0',
    color: 'darkred',
    width: '110px',
    height: '30px'
  }
})
var state_selector_panel = ui.Panel({layout:ui.Panel.Layout.flow('horizontal', false), style:{'background-color':'333333', height: '50px'}})
var state_info_panel = ui.Panel({layout:ui.Panel.Layout.flow('vertical', false), style:{'background-color':'555555', margin: '5px', padding: '5px'}})
var state_info_panelText = ui.Label("Select a state above to see stats pertaining to it", {'background-color':'555555', fontSize: '12px', color:'cyan', fontWeight:'0'})
var district_selector_panel = ui.Panel({style:{'background-color':'333333', height: '50px'}})
var district_info_panel = ui.Panel({layout:ui.Panel.Layout.flow('vertical', false), style:{'background-color':'555555', margin: '5px', padding: '5px'}})
var district_info_panelText = ui.Label("Select a district above to see stats pertaining to it", {'background-color':'555555', fontSize: '12px', color:'cyan', 'font-weight':'bold'})
var description_panel = ui.Panel({style:{'background-color':'333333', minHeight:'400px'}})
var desc_spacer = ui.Label("", {'background-color':'333333'});
var desc_h1 = ui.Label("BACKGROUND TO THIS PROJECT", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
// var desc_para1 = ui.Label("India is endowed with a diversity of terrestrial biomes. Barring forests—areas of closed tree canopies—they mainly comprise naturally open and often treeless habitats, ranging from savannas and scrublands to grasslands, ravines and dunes, each supporting its own unique complement of plant and animal life. From unique animals such as the ratel and the hedgehog, to predators like the cheetah, wolf, caracal, and fox, or their prey, like the blackbuck and gazelle to hares and gerbils, these areas have historically had a unique mammal community. Similarly, they are also home to a variety of unique birds, from bustards, floricans, cranes and harriers, to their smaller cousins like partridges, quails and larks. Such animal variety is accompanied by a formidable diversity of grasses, herbs and woody vegetation too. Further, for centuries, such diversity has thrived alongside unique pastoral and agro-pastoral communities that have shared space with nature in this biome, while deriving identity, sustenance and livelihood from it.\n\nYet, here is the irony: these important Open Natural Ecosystems—as we call them here—feature prominently, not among areas prioritised for biodiversity conservation, but rather, in the government's Wasteland Atlas. As a result, not only are Open Natural Ecosystems disregarded for their unique ecological, cultural and livelihood values, but there are huge government schemes and programmes to put these 'wastelands' to good use. \n\nThis translates into two key threats today. The first is the diversion of Open Natural Ecosystems towards huge, industrial-scale, renewable-energy projects, mainly for solar and wind power. Second, these habitats now also risk ecological damage through the well-intentioned, but ill-advised schemes of tree planting and 'tree restoration' that seek to sequester carbon from the atmosphere, to mitigate the impacts of carbon emissions. It is time to correct this deep misunderstanding and long-standing mistreatment of our Open Natural Ecosystems as wastelands, and to recognise their ecological value, and to prioritise them for conservation.\n\n", {'background-color':'333333', color:'white', whiteSpace: 'pre-wrap'});
var desc_para1 = ui.Label("India is endowed with a diversity of terrestrial biomes. Barring forests—areas of closed tree canopies—they mainly comprise naturally open and often treeless habitats, ranging from savannas and scrublands to grasslands, ravines and dunes, each supporting its own unique complement of plant and animal life. India's Open Natural Ecosystems are vast. They stretch across c. 320,000 km² and comprise some 15% of the land area in our semi-arid zone. The threats they face are vast too.\n\nFrom unique animals such as the ratel and the hedgehog, to predators like the cheetah, wolf, caracal, and fox, or their prey, like the blackbuck and gazelle to hares and gerbils, these areas have historically had a unique mammal community. Similarly, they are also home to a variety of unique birds, from bustards, floricans, cranes and harriers, to their smaller cousins like partridges, quails and larks. Such animal variety is accompanied by a formidable diversity of grasses, herbs and woody vegetation too.Further, for centuries, such diversity has thrived alongside unique pastoral and agro-pastoral communities that have shared space with nature in this biome, while deriving identity, sustenance and livelihood from it.\n\nYet, here is the irony: these important Open Natural Ecosystems—as we call them here—feature prominently, not among areas prioritised for biodiversity conservation, but rather, in the government's Wasteland Atlas. As a result, not only are Open Natural Ecosystems disregarded for their unique ecological, cultural and livelihood values, but there are huge government schemes and programmes to put these 'wastelands' to some “productive” use. Once classified as a wasteland, primarily from the viewpoint of agricultural production, open natural habitats get diverted for well-intentioned developmental purposes, leading to serious unintended consequences. For example:\n\n  •	Open Natural Ecosystems are diverted towards large scale projects, including renewable-energy production, mainly for solar and wind power.\n\n  •	These habitats now also risk ecological damage through the well-intentioned, but ill-conceived schemes of afforestation and 'tree restoration' that seek to sequester carbon from the atmosphere, to mitigate the impacts of carbon emissions. Nearly 51% of Open Natural Ecosystems are proposed for 'tree planting', with targeted tree cover increases averaging c. 35%!\n\nIt is time to correct this deep misunderstanding and long-standing mistreatment of our Open Natural Ecosystems as wastelands, and to recognise their ecological value, and to prioritise them for conservation and where degraded, for restoration.\n\n", {'background-color':'333333', color:'white', whiteSpace: 'pre-wrap'});
var desc_h2 = ui.Label("WHAT DOES THIS MAP SHOW?", {'background-color':'333333', color:'gold', 'font-weight':'bold'});
// var desc_para2 = ui.Label("This map shows the distribution and extent of Open Natural Ecosystems within India's semi-arid zone, i.e., areas receiving less than 1,200 mm rainfall annually. We first prepared a map representing the probability that a given pixel was an Open Natural Ecosystem, and thereafter show pixels with a > 50% probability as Open Natural Ecosystems.\n\nWe overlay on this map, a recent restoration opportunities map prepared by the World Resources Institute, identifying areas with the potential for tree restoration. Based on this overlay, we estimate the extent of Open Natural Ecosystems of ecological value that are candidate areas for tree planting to further carbon capture and storage.\n\nIndia's Open Natural Ecosystems are vast. They stretch across 329,000 km² and comprise some 15% of the land area in our semi-arid zone. The threats they face are vast too. Nearly 51% of Open Natural Ecosystems are proposed for 'tree planting', with targeted tree cover increases averaging c. 35%!", {'background-color':'333333', color:'white', whiteSpace: 'pre-wrap'});
var desc_para2 = ui.Label("This map shows the distribution and extent of Open Natural Ecosystems within India's semi-arid zone, i.e., areas receiving less than 1,200 mm rainfall annually. We first prepared a map representing the probability that a given pixel was an Open Natural Ecosystem, and thereafter show pixels with a > 50% probability as Open Natural Ecosystems. We overlay on this map, a recent restoration opportunities map prepared by the World Resources Institute, identifying areas with the potential for tree restoration. Based on this overlay, we estimate the extent of Open Natural Ecosystems of ecological value that are candidate areas for tree planting to further carbon capture and storage.", {'background-color':'333333', color:'white', whiteSpace: 'pre-wrap'});
// var desc_para3 = ui.Label("CAUTION: Before using this tool, it is important to ensure that you are sufficiently zoomed in. Make sure that the region you are inspecting is at least at the 500 m zoom level, or finer. Clicking on the map at higher zoom levels may give misleading results", {'background-color':'333333', color:'white'});
// var desc_para4 = ui.Label("When you choose a taluk, the app also shows (in a panel below the drop-down) an estimate of the minimum extent of flooding in that taluk.", {'background-color':'333333', color:'white'});
var footer_panel = ui.Panel({style:{'background-color':'333333'}})
var footer_spacer = ui.Label("", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text1 = ui.Label("CAVEATS: The data layer on open natural habitats is being presented to raise awareness and to inform policy design. Accurate mapping of open natural habitats—savannas, scrublands & grasslands—is a challenging task. This effort to do so is work-in-progress. Ours may be among the first attempts to map this biome at this scale and resolution. While we've strived to maximise accuracy, our map is likely to contain both exclusion and inclusion errors, and hence, must be used with the necessary understanding, care and caution.", {'background-color':'333333', fontSize: '11px', color:'lightgrey'});
var footer_text2 = ui.Label("An initiative of ATREE, @atree_org. Implemented by MD Madhusudan, @mdmadhusudan with Abi Vanak, @abi_vanak & Abhijeet Kulkarni, @abhikul73", {'background-color':'333333', fontSize: '8pt', color:'aqua'});
/************************ legend-start ****************************/
// legend values
var classNames = 
[' 0% - 35%   | not considered ONE',
'35% - 50%   | not considered ONE',
'------------',
'50% - 67%   | considered ONE',
'67% - 100%   | considered ONE'];
var classColours = ['1a2b2b', '778899', 'FFFFFF', 'FFDEAD', 'DAA520'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Probability of a pixel being classified as\nOpen Natural Ecosystem (ONE)\n ',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    whiteSpace: 'pre-wrap'
    }
});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#'+color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px', fontSize:'12px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(classColours[i], classNames[i]));
  }  
/************************ legend-end ****************************/
title_leftPanel.add(title_leftText)
title_leftPanel.add(subtitle_leftText)
title_rightPanel.add(title_rightText)
quickstart_panel.add(quickstart_panel_defaultText)
placename_panel.style().set('shown', false)
state_selector_panel.add(state_selector)
state_selector_panel.add(back_button)
state_info_panel.add(state_info_panelText)
district_selector_panel.style().set('shown', false)
district_info_panel.add(district_info_panelText)
district_info_panel.style().set('shown', false)
description_panel.add(desc_spacer)
description_panel.add(desc_h1)
description_panel.add(desc_para1)
description_panel.add(desc_h2)
description_panel.add(desc_para2)
// description_panel.add(desc_para3)
// description_panel.add(desc_para4)
footer_panel.add(footer_spacer)
footer_panel.add(footer_text1)
footer_panel.add(footer_text2)
var leftPanel = ui.Panel(
  [title_leftPanel, description_panel, footer_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '400px', 'background-color':'333333'}
  )
var rightPanel = ui.Panel(
  [title_rightPanel, quickstart_panel, placename_panel, state_selector_panel, state_info_panel, district_selector_panel, district_info_panel],
  ui.Panel.Layout.flow("vertical"),
  {width: '250px', 'background-color':'333333'}
  )
function showFullRegion(){
  var black = ee.Image(0).byte();
  // var hole = ee.Image(1).byte().clipToCollection(districts);
  var hole = ee.Image(1).byte().updateMask(inputMask);
  var stamp = black.where(hole, 1);
  var mask = stamp.eq(0);
  var background = stamp.updateMask(mask)
  Map.setCenter(77.2, 22.13, 5)
  Map.setOptions("SATELLITE")
  Map.setControlVisibility(false, true, true, true, true, false)
  Map.drawingTools().setShown(false)
  Map.add(legend)
  Map.addLayer(background, {opacity: 0.7}, 'Background Mask')
  Map.addLayer(forests, {palette:'darkgreen', opacity:1}, 'Closed Forests', false)
  Map.addLayer(ptc20_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 20% Cap', false)
  // Map.addLayer(ptc40_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 40% Cap', false)
  Map.addLayer(ssgDiscrete, {palette: ['1a2b2b', 'lightslategray', 'navajowhite', 'goldenrod'], min:1, max:4, opacity:1}, 'Open Natural Ecosystem')
  Map.addLayer(ptc20, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI) that intersect with ONE', false)
  Map.addLayer(states.style({width:1, color:'ffffff88', fillColor:'00000000'}), {}, 'State Boundary')
  Map.style().set("cursor", "crosshair")
  Map.onClick(getDistrictAndState)
}
showFullRegion()
function resetZoom() {
  placename_panel.style().set('shown', false)
  quickstart_panel.style().set('shown', true)
  state_selector.setValue(null, false)
  state_selector_panel.clear()
  state_selector_panel.add(state_selector)
  state_selector_panel.add(back_button)
  state_info_panel.clear()
  state_info_panel.add(state_info_panelText)
  district_selector_panel.style().set('shown', false)
  district_selector_panel.clear()
  district_info_panel.style().set('shown', false)
  district_info_panel.clear()
  Map.clear()
  showFullRegion()
}
function showStateAttributes(stName) {
  quickstart_panel.style().set('shown', false)
  var state = states.filter(ee.Filter.eq('state', stName))
  var stDists = districts.filter(ee.Filter.eq('stname', stName))
  // STATS
  var first = stDists.first()
  var st_area = first.get('st_area')
  var st_ssg_area = first.get('st_ssg_area')
  var st_ptc_area = first.get('st_ptc_area')
  var st_ptc_mean = first.get('st_ptc_mean')
  var st_pc_land_ssg = ee.Number(100).multiply(st_ssg_area).divide(st_area)
  var st_pc_ssg_ptc = ee.Number(100).multiply(st_ptc_area).divide(st_ssg_area)
  ee.Dictionary({
    'st_area': st_area, 
    'st_ssg_area': st_ssg_area,
    'st_ptc_area': st_ptc_area,
    'st_ptc_mean': st_ptc_mean,
    'pc_land_ssg': st_pc_land_ssg ,
    'pc_ssg_ptc': st_pc_ssg_ptc
  })
    .evaluate(function(s){
      state_info_panel.clear()
      district_info_panel.clear()
      district_selector_panel.clear()
      state_info_panel.add(
        ui.Label(
          "Estimated Areal Extent of ONE: ",
          {'background-color': '555555',
            color:'white',
            fontSize: '14px',
            fontWeight:'50',
            margin:'0px',
            padding: '4px 2px 2px 2px'
          }))    
      state_info_panel.add(
        ui.Label(
          s.st_ssg_area.toLocaleString('hi-IN', {style: 'decimal', maximumFractionDigits: 0})+" km² \n("+s.pc_land_ssg.toFixed(1)+"% of state's area)",
          {'background-color': '555555',
            fontWeight:'0', 
            color: 'goldenrod',
            fontSize: '14px',
            margin:'0px',
            padding: '2px 2px 2px 8px'
          }))    
      state_info_panel.add(
        ui.Label(
          "Area Targeted for Tree Restoration:",
          {'background-color': '555555',
            color:'white',
            fontSize: '14px',
            fontWeight:'50',
            margin:'0px',
            padding: '6px 2px 2px 2px'
            }))
      state_info_panel.add(
        ui.Label(
          "A total of "+s.st_ptc_area.toLocaleString('hi-IN', {style: 'decimal', maximumFractionDigits: 0})+" km²—or "+s.pc_ssg_ptc.toFixed(1)+"% of Open Natural Ecosystems in the state—are targeted for a mean increase in tree cover of "+s.st_ptc_mean.toFixed(1)+"%",
          {'background-color': '555555',
            color:'lightgreen',
            'font-weight': '0',
            fontSize: '14px',
            margin:'0px',
            padding: '2px 2px 4px 8px'
            }))
    })
  // MAP
  var black = ee.Image(0).byte();
  var hole = ee.Image(1).byte().clipToCollection(stDists);
  var stamp = black.where(hole, 1);
  var mask = stamp.eq(0);
  var background = stamp.updateMask(mask)
  Map.clear()
  Map.centerObject(state);
  Map.setOptions("SATELLITE")
  Map.setControlVisibility(false, true, true, true, true, false)
  Map.drawingTools().setShown(false)
  Map.add(legend)
  Map.addLayer(forests, {palette:'darkgreen', opacity:1}, 'Closed Forests', false)
  Map.addLayer(ptc20_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 20% Cap', false)
  // Map.addLayer(ptc40_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 40% Cap', false)
  Map.addLayer(ssgDiscrete.updateMask(ssgDiscrete.gte(2)), {palette: ['lightslategray', 'navajowhite', 'goldenrod'], min:2, max:4}, 'Open Natural Ecosystems')
  Map.addLayer(ptc20, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI) that intersect with ONE', false)
  Map.addLayer(background, {opacity: 0.7}, 'Background Mask')
  Map.addLayer(stDists.style({width:1, color:'000000ff', fillColor:'00000000'}), {}, 'District Boundary')
  Map.onClick(getDistrictAndState)
  // FORM
  function showDistrictAttributes(dtName) {
    var selectedDistrict = districts
      .filter(ee.Filter.eq('stname', stName))
      .filter(ee.Filter.eq('dtname', dtName))
    var dt_placename = selectedDistrict.first().get('ddname')
    var dt_area = selectedDistrict.first().get('dt_area')
    var dt_ssg_area = selectedDistrict.first().get('dt_ssg_area')
    var dt_ptc_area = selectedDistrict.first().get('dt_ptc_area')
    var dt_ptc_mean = selectedDistrict.first().get('dt_ptc_mean')
    var dt_pc_land_ssg = ee.Number(100).multiply(dt_ssg_area).divide(dt_area)
    var dt_pc_ssg_ptc = ee.Number(100).multiply(dt_ptc_area).divide(dt_ssg_area)
    ee.Dictionary({
      'dt_placename': dt_placename, 
      'dt_area': dt_area, 
      'dt_ssg_area': dt_ssg_area,
      'dt_ptc_area': dt_ptc_area,
      'dt_ptc_mean': dt_ptc_mean,
      'dt_pc_land_ssg': dt_pc_land_ssg ,
      'dt_pc_ssg_ptc': dt_pc_ssg_ptc
    })
      .evaluate(function(d){
        placename_panel.clear()
        district_info_panel.clear()
        district_info_panel.style().set('shown', true)
        placename_panel.add(
          ui.Label(
            "Place Name:",
            {'background-color': '333333',
            color:'white',
            fontSize: '14px',
            margin:'0px',
            padding: '2px'
          }));
        placename_panel.add(
          ui.Label(
            d.dt_placename, 
            {'background-color': '333333',
            color:'orange',
            fontWeight: 'bold',
            fontSize: '14px',
            margin:'0px',
            padding: '2px'
          }));
        district_info_panel.add(
          ui.Label(
            "Estimated Areal Extent of ONE: ",
            {'background-color': '555555',
              color:'white',
              fontSize: '14px',
              fontWeight:'50',
              margin:'0px',
              padding: '4px 2px 2px 2px'
              }))    
        district_info_panel.add(
          ui.Label(
            d.dt_ssg_area.toLocaleString('hi-IN', {style: 'decimal', maximumFractionDigits: 0})+" km² ("+d.dt_pc_land_ssg.toFixed(1)+"% of district's area)",
            {'background-color': '555555',
              'font-weight':'0', 
              color: 'goldenrod',
              fontSize: '14px',
              margin:'0px',
              padding: '2px 2px 2px 8px'
            }))    
        district_info_panel.add(
          ui.Label(
            "Area Targeted for Tree Restoration:",
            {'background-color': '555555',
              color:'white',
              fontSize: '14px',
              fontWeight:'50',
              margin:'0px',
              padding: '4px 2px 2px 2px'
              }))
        district_info_panel.add(
          ui.Label(
            "A total of "+d.dt_ptc_area.toLocaleString('hi-IN', {style: 'decimal', maximumFractionDigits: 0})+" km²—or "+d.dt_pc_ssg_ptc.toFixed(1)+"% of Open Natural Ecosystems in the district—are targeted for a mean increase in tree cover of "+d.dt_ptc_mean.toFixed(1)+"%",
            {'background-color': '555555',
              color:'lightgreen',
              'font-weight': '0',
              fontSize: '14px',
              margin:'0px',
              padding: '2px 2px 4px 8px'
              }))
      })
    // MAP
    var black = ee.Image(0).byte();
    var hole = ee.Image(1).byte().clipToCollection(selectedDistrict);
    var stamp = black.where(hole, 1);
    var mask = stamp.eq(0);
    var background = stamp.updateMask(mask)
    Map.clear()
    Map.centerObject(selectedDistrict);
    Map.setOptions("SATELLITE")
    Map.setControlVisibility(false, true, true, true, true, false)
    Map.drawingTools().setShown(false)
    Map.add(legend)
    Map.addLayer(forests, {palette:'darkgreen', opacity:1}, 'Closed Forests', false)
    Map.addLayer(ptc20_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 20% Cap', false)
    // Map.addLayer(ptc40_full, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI): 40% Cap', false)
    Map.addLayer(ssgDiscrete.updateMask(ssgDiscrete.gte(2)), {palette: ['lightslategray', 'navajowhite', 'goldenrod'], min:2, max:4}, 'Open Natural Ecosystems')
    Map.addLayer(ptc20, {min: 0, max: 92, palette: ['lightgreen', 'darkgreen']}, 'Areas Proposed for Tree Restoration (by WRI) that intersect with ONE', false)
    Map.addLayer(background, {opacity: 0.7}, 'Background Mask')
    Map.addLayer(selectedDistrict.style({width:1, color:'000000ff', fillColor:'00000000'}), {}, 'District Boundary')
  }
  placeNames
    .filter(ee.Filter.eq('stname', stName))
    .aggregate_array('dtname')
    .distinct()
    .sort()
    .evaluate(function(dtName){
      district_selector_panel.style().set('shown', true)
      district_info_panel.add(district_info_panelText)
      district_info_panel.style().set('shown', true)
      district_selector_panel.add(ui.Select({
        placeholder: "Choose district",
        items: dtName,
        style: {
          fontSize: '16px',
          color: 'blue',
          'background-color': "cccccc",
          width: '150px',
          height: '30px'},
        onChange: showDistrictAttributes,
      }))
    })
}
// an On-Click function to enable querying of click location, zooming to target state in map,
// and loading of state-level stats and district list in right panel
function getDistrictAndState(coords){
  quickstart_panel.style().set('shown', false)
  placename_panel.clear();
  placename_panel.style().set('shown', true)
  var loadingLabel = ui.Label("Querying Location... ",{
    color: 'red',
    fontWeight: '0',
    'background-color': '333333',
  })
  placename_panel.add(loadingLabel)
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // trigger action to populate placename panel with district and
  // state name of clicked location
  districts
    .filterBounds(point)
    .first()
    .get('ddname')
    .evaluate(function(placename){
      placename_panel.clear()
      var placenameTitle = ui.Label("Place Name:",{
        'background-color': '333333',
        color:'white',
        fontSize: '14px',
        margin:'0px',
        padding: '2px'
      });
      var placenameResult = ui.Label(placename, {
        'background-color': '333333',
        color:'orange',
        fontWeight: 'bold',
        fontSize: '14px',
        margin:'0px',
        padding: '2px'
      });
      placename_panel.add(placenameTitle);
      placename_panel.add(placenameResult);
    })
  // trigger action to show state map and state stats
  var selectedState = districts
    .filterBounds(point)
    .first()
    .get('stname')
  selectedState.evaluate(function(stname){
    state_selector.setValue(stname, true)
  })
}
// add UI elements at the same level as map window.
ui.root.insert(0, leftPanel);
ui.Map()
ui.root.insert(2, rightPanel);