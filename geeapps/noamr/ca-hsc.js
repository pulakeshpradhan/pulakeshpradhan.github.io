///////////////
//FORMATTING
///////////////
///////////////
//UPDATE TO EXPORT TO PERSONAL GOOGLE DRIVE FOLDER 
///////////////
var modules = require("users/noamr/ClimateCompound:CompoundingModules") 
var exportdirectory = "CompoundingEvents_Exports" 
var exportdirectory_shp = "CompoundingEvents_Exports/Shapefiles" 
///////////////
///////////////
///////////////
//Dates
var start = '2020-06-01';
var end = '2020-11-30';
//Other constants
var METERS_PER_SQKM = 1e6
var AREA_OF_CA = 423970
var HRRR_SCALE = 3000
var GRIDMET_SCALE = 4600
var ABS_TEMP_CUTOFF = 80
var HUNDREDFIVE = 105
var ABS_TEMP_CUTOFF_MIN = 75
//CA boundary (Polygon)
var ca = ee.FeatureCollection("TIGER/2016/States").filter(ee.Filter.eq("NAME","California")).geometry();
//Ecoregions
var ecoregions = ee.FeatureCollection("EPA/Ecoregions/2013/L3")
var l1_names = ecoregions.aggregate_array("l1_key").distinct()
var ecoregions = ee.FeatureCollection(l1_names.map(function(name){
  var l1_col = ecoregions.filter(ee.Filter.eq("l1_key",name))
  var l1_geo = l1_col.union()
  return ee.Feature(l1_geo.first().geometry().intersection(ca),{"name":name})
}))
var ecoregions = ecoregions.map(function(fea){
  return fea.set("area",fea.geometry().area())
})
// Export.table.toDrive({collection:ecoregions,fileFormat:"SHP",fileNamePrefix:"ecoregions_l1_shp"})
//CA Enviro Screen
var ces = ee.FeatureCollection("users/noamr/CES4_acc_1_3_22");
var aqs = ee.FeatureCollection("users/noamr/AQS_Daily_CA_2020_shp");
var ctracts = ee.FeatureCollection("TIGER/2010/Tracts_DP1").filterBounds(ca)
ctracts = ctracts.map(function(fea){return fea.set("area",fea.geometry().area().divide(METERS_PER_SQKM)).select(["area","geoid10"])})
//World population
var population = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Count");
var population_density = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density")
//HRR Data (Raster) //Max ranges from 10.206-2881.7
var hrr = ee.ImageCollection("users/sraby/noaa_daily_12/jun_to_nov");
//Exceedance of 0.8 for HRR
hrr = hrr.map(function(img){
  return img.set({"date":ee.Date(img.get('system:time_start')).format("yyyyMMdd")})
})
//rename b1 to smoke
hrr = hrr.select(["b1"],["smoke"])  
//Temp (Raster)
var temps = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET").select("tmmx","rmax","tmmn","rmin");
//Add heat index variable - https://ehp.niehs.nih.gov/action/downloadSupplement?doi=10.1289%2Fehp.1409119&file=ehp.1409119.s001.acco.pdf
temps = temps.map(modules.to_heatindex)
//Compute average heat index
var temps = temps.map(function(img){
  var avg = img.select('heat_index_max').add(img.select("heat_index_min")).divide(2);
  return img.addBands(avg)
})
//Apply name "heat_index_avg" to band and remove superfluous bands to save memory
temps = temps.select(["heat_index_max","heat_index_min","heat_index_max_1"],
["heat_index_max","heat_index_min","heat_index_avg"])
//List of datees to map over
var dates = ee.List.sequence(1,365,1)
// //Validation of AQS with HRR
var aqs = aqs.map(function(fea){
  var datestr = fea.get("Date")
  var date = ee.Date.parse("MM/dd/yyyy",datestr) 
  return fea.set("system:time_start",date)
})
var hrrvalidation = ee.FeatureCollection(hrr.map(function(img){
    var date = ee.Date.parse("yyyyMMdd",img.get("date"))
    var aqs_filtered = aqs.filterDate(date)
    return img.reduceRegions(aqs_filtered,ee.Reducer.max())
}))
Export.table.toDrive({collection:hrrvalidation.flatten(),description: "hrr_aqs_validation",fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"hrr_aqs_validation"})
//////////////////////////
////////////////////////
////MAIN FUNCTION TO ANALYZE FOR EACH SCENARIO
////////////////////////
////////////////////////
/////////////////////////
var main = function(x,exportimage){
  var hi_percentile = ee.Number(ee.List(x).get(0));
  var heat_variable = ee.String(ee.List(x).get(1))
  var pm_tf_threshold = ee.Number(ee.List(x).get(2));
  var heat_consecutive_threshold = ee.Number(ee.List(x).get(3))
  var smoke_consecutive_threshold = ee.Number(ee.List(x).get(4))
  var compound_consecutive_threshold = ee.Number(ee.List(x).get(5))
  var id = ee.String(hi_percentile).cat("-").cat(heat_variable).cat("-").cat(pm_tf_threshold).cat("-").cat(heat_consecutive_threshold).cat(smoke_consecutive_threshold)
  var results = ee.Feature(null, {
    "name":id,
    "hi_percentile":hi_percentile,
    "heat_variable":heat_variable,
    "pm_tf_threshold":pm_tf_threshold,
    "heat_consecutive_threshold":heat_consecutive_threshold,
    "smoke_consecutive_threshold":smoke_consecutive_threshold,
    "compound_consecutive_threshold":compound_consecutive_threshold
  })
  ////////////
  //FUNCTION FOR WAVES
  ////////////
  var flagWaves = function(imgCname,bandname,threshold){
      //Functions to retroactively indicate heatwaves 
      var flagger = function(img,list){
        var list = ee.List(list)
        var img = ee.Image(img)
        //When consec count reaches threshold
        var mask = img.select("consec").eq(threshold)
        //Mark the index of current image
        var index = ee.Number(img.get("index"))
        //Find the previous n images, where n = threshold 
        //add 1 to threshold so that it's exclusive
        var subset = list.slice(ee.Number(index.subtract(threshold).add(1)).max(0),index,1)
        //For each image 
        subset = subset.map(function(subimg){
          //create an intiali image of 0
          var waveimg = ee.Image(0)
          //where the indexed images equaled threshold, apply 1 for heatwave pixels and 0 for all else
          waveimg = waveimg.updateMask(mask).add(1).unmask() 
          //add that to the global version (this roundabout way ensures that previous iterations are preserved as any unmask call would erase)
          //that way second days of a wave in some locations can coexist with first days of wave in other locations when, for example, thresh = 3 
          waveimg = ee.Image(subimg).select(bandname).add(waveimg) 
          return ee.Image(subimg).addBands({"srcImg":waveimg,"overwrite":true})
        })
        //retroactively update the days that were part of heatwave but below the threshold count
        //include max 0 in the event that index - thresh is negative
        //subtract one from threshold so that it's exclusive
        return list.splice(ee.Number(index.subtract(threshold).add(1)).max(0),threshold.subtract(1),subset)  
      };
      //Flag the counts of wave < threshold as waves
      var addWaveBand = function(imgC){
        var aslist = imgC.toList(imgC.size())
        //add index property to each image so that you can start iteration loop at right index
        //intialize a wave band of 0s that will be updated with 1 where wave is observed
        var indices = ee.List.sequence(0,imgC.size().subtract(1),1)
        aslist = indices.map(function(num){
          var ele = ee.Image(aslist.get(num)).set("index",num)
          return ele.addBands(ee.Image(0).rename(bandname).toFloat())
        })
        //Take the list of all images from index = consec threshold until end of list 
        //(avoiding slice of index = -consec_threshold for first image)
        var flaggedImgC = ee.ImageCollection(aslist.slice(threshold).iterate(flagger,aslist));
        return flaggedImgC
      };
      //Call function
      var toreturn = ee.ImageCollection.fromImages(addWaveBand(imgCname))
      //Flag the counts of wave > threshold as waves (easier because you know that anything greater is a wave, can't say same for less than)
      toreturn = ee.ImageCollection(toreturn.map(function(img){
          var wavemask = img.select("consec").gte(threshold)
          var waveimg = img.select(bandname).add(wavemask)
          return img.addBands({"srcImg":waveimg,"overwrite":true})
        }))
      return toreturn
      }  
    var addwaveband_zerothreshold = function(imgCol,thresh,bandname){
      return imgCol.map(function(img){
        //greater than not gte, because 0 should not be counted as a wave
        var wave = img.select("consec").gt(thresh);
        img = img.addBands(wave);	    
        return img.select(img.bandNames(),["exceedance","consec",bandname]);	  
      })
    }
  ///////////////
  //IMAGE WITH SMOKEWAVE BAND (BASED ON IMAGECOL ITERATE)
  ///////////////
  //Returns image with three bands corresponding to exceedance on date, run length count of exceedance event, and whether it constitutes a smokewae (i.e. consec >= n )
  //Adds band to image with 1 if greater than threshold
  var hrr_exc = modules.band_exc(hrr,"smoke",pm_tf_threshold);
  var hrr_exc_mag = modules.band_exc_mag(hrr,"smoke",pm_tf_threshold);
  //Add average exceedance to export feature
  var avg_smoke_exceedance = hrr_exc_mag.mean().reduceRegion({"geometry":ca,reducer:ee.Reducer.mean(),scale:HRRR_SCALE})
  results = results.set("hrr_exc_mag_avg",avg_smoke_exceedance.get("smoke"))
  //Loop through collection and cast returned list as image collection with consecutive exceedance band
  var hrr_consecutive = modules.runConsec(hrr_exc);
  hrr_consecutive = ee.ImageCollection(ee.Algorithms.If(
    smoke_consecutive_threshold.eq(0),
    addwaveband_zerothreshold(hrr_consecutive,smoke_consecutive_threshold,"smokewave"),
    flagWaves(hrr_consecutive,"smokewave",smoke_consecutive_threshold)
  ))
  //////////////
  //IMAGE WITH HEATWAVE BAND (BASED ON IMAGECOL ITERATE)
  /////////////
  //Returns temps image collection with additional percentile band
  var hi_percentiles = modules.getPercentile(temps,ee.Date('1980-01-01'),ee.Date('2010-01-01'),hi_percentile,7,8) //for July and August 
  // print(hi_percentiles.select("heat_index_max_percentile").reduceRegion({geometry:ca,reducer:ee.Reducer.mean(),scale:GRIDMET_SCALE,tileScale:4}))
  //80F used as an absolute cutoff, that is the minimum heat index used by NIOSH for caution with heat exposure
  //Temperature exceedance threshold image which is the greater of percentile and absolute cutoff 
  var tmax_percentile_img = hi_percentiles.select("heat_index_max_percentile")
  var hi_exc_tmax = modules.band_exc(temps.filterDate(start,end),"heat_index_max",tmax_percentile_img.max(ee.Image(ABS_TEMP_CUTOFF)).min(HUNDREDFIVE))
  //For tmin need to compare to percentile threshold and mask to areas that also have tmax above 80F on a given day
  //Compare Tmin to percentile
  var tmin_percentile_img = hi_percentiles.select("heat_index_min_percentile")
  var hi_exc_tmin = modules.band_exc(temps.filterDate(start,end),"heat_index_min",tmin_percentile_img)
  //Create imgC of exceedances above absolute threshold for tmax
  var hi_exc_abs = modules.band_exc(temps.filterDate(start,end),"heat_index_max",ee.Image(ABS_TEMP_CUTOFF))
  //Combine with the tmin percentile exceedance imgC, so that any day that has max temp below 80F is not counted
  var hi_exc_tmin_tmaxabs = modules.joinrasters_and(hi_exc_tmin,hi_exc_abs,"date")
  //Image collection, each image contains binary temperature exceedance band above percentile threshold 
  var hi_exc = ee.ImageCollection(ee.Algorithms.If(heat_variable.equals("heat_index_min"),hi_exc_tmin_tmaxabs,hi_exc_tmax))
  //Extent img
  var hi_exc_img = hi_exc.max()
  //Percentile threshold for tmin or tmax, that is used to the exceedance magnitude calculation
  var temp_cutoff_img = ee.Algorithms.If(heat_variable.equals("heat_index_min"),tmin_percentile_img,tmax_percentile_img.max(ee.Image(ABS_TEMP_CUTOFF)).min(HUNDREDFIVE))
  //Image with magnitude exceeded over threshold 
  var hi_exc_mag = modules.band_exc_mag(temps.filterDate(start,end),heat_variable,temp_cutoff_img)
  //Add average exceedance to export feature
  var hi_exc_mag_avg = hi_exc_mag.mean().reduceRegion({"geometry":ca,"reducer":ee.Reducer.mean(),"scale":HRRR_SCALE})
  //Retrive value based on key which will vary based on heat variable param
  results = results.set("hi_exc_mag_avg",hi_exc_mag_avg.get(heat_variable))
  //Loop through collection and cast returned list as image collection with consecutive exceedance band
  var heat_consecutive = modules.runConsec(hi_exc);
  heat_consecutive = ee.ImageCollection(ee.Algorithms.If(
    heat_consecutive_threshold.eq(0),
    addwaveband_zerothreshold(heat_consecutive,heat_consecutive_threshold,"heatwave"),
    flagWaves(heat_consecutive,"heatwave",heat_consecutive_threshold)
  ))
  //////////
  //FILTER HEAT AND HRRR COLLECTIONS TO DATES THAT THEY BOTH SHARE
  //////////
  var joined_exc = modules.joinrasters(hi_exc,hrr_exc,"date")
  hi_exc = ee.ImageCollection(joined_exc.map(function(fea){
    	  return ee.Image(fea.get("primary"));
  }));
  hrr_exc = ee.ImageCollection(joined_exc.map(function(fea){
    	  return ee.Image(fea.get("secondary"));
  }));
  ///////////////
  //RERUN SMOKEWAVE ANALYSIS W ARRAYS TO GET RUN LENGTHS SUMMARY STATS
  ///////////////
  //Converts image collection into image array
  var hrr_exc_arr = modules.colToArray(hrr_exc)
  //Difference array (computes the difference between array element n and n-1, anywhere with 0 has no difference or is a run)
  var hrr_diff = modules.diffArray(hrr_exc_arr)
  //Find values of each run by masking the original (raw) array with the difference array where diff = 1 (two neighbors are different)
  var hrr_run_values = modules.runValues(hrr_diff,hrr_exc_arr)
  //Indexes of where runs of length >=1 (i.e. single digits included) start by taking an array of indexes == length of array, and mask with the diff array 
  var hrr_starts = modules.runStarts(hrr_diff,hrr_exc,hrr_exc_arr)
  //Indexes where runs are > 1 and nonzero 
  var hrr_starts_nonzero = hrr_starts.arrayMask(hrr_run_values.neq(0))
  //Run lengths for all runs (of length > 1) by taking the forward difference of all run starts
  var hrr_run_lengths = modules.runLengths(hrr_starts,hrr_exc_arr)  
  //Run lengths for runs (of length > 1) that contain smoke  by masking the forward differences with starts that correspond to nonzero runs
  var hrr_run_lengths_smoke = hrr_run_lengths.arrayMask(hrr_run_values.neq(0))  
  //Mask to only show runs of size > n
  var hrr_run_lengths_smokewave = hrr_run_lengths_smoke.arrayMask(hrr_run_lengths_smoke.gte(smoke_consecutive_threshold))
  //Create a boolean array of length n,that corresponds to smokewave pixels
  // //Indexes where runs are > wave threshold
  //Mask to only show start indices for runs > n
  var hrr_starts_smokewave = hrr_starts_nonzero.arrayMask(hrr_run_lengths_smoke.gte(smoke_consecutive_threshold))
  // Image where each pixel is the mean of the non-zero run lengths by reducing along the image axis
  // Some pixels are all 0 valued and therefore cannot be mean/median reduced so first we must mask those 0 valued pixels (e.g. where max = 0)
  var hrr_run_lengths_smokewave_nonzero = modules.mask_zeroarrays(hrr_run_lengths_smokewave)
  // Image w mean smokewave run length per pixel 
  var smokerun_mean = hrr_run_lengths_smokewave_nonzero.arrayReduce({reducer: ee.Reducer.mean(),axes: [0]});
  // Get the sum of the non-zero run lengths by reducing along the image axis
  var smokerun_total = hrr_run_lengths_smokewave_nonzero.arrayReduce({reducer: ee.Reducer.sum(),axes: [0]});
  smokerun_mean = smokerun_mean.arrayProject([0]).arrayFlatten([["smoke_avg"]])
  ///////////////
  //RERUN HEATWAVE ANALYSIS W ARRAYS TO GET RUN LENGTHS SUMMARY STATS
  /////////////// 
  var hi_exc_arr = modules.colToArray(hi_exc)
  var hi_diff = modules.diffArray(hi_exc_arr)
  var hi_run_values = modules.runValues(hi_diff,hi_exc_arr)
  var hi_starts = modules.runStarts(hi_diff,hi_exc,hi_exc_arr)
  var hi_starts_nonzero = hi_starts.arrayMask(hi_run_values.neq(0))
  var hi_run_lengths = modules.runLengths(hi_starts,hi_exc_arr)
  var hi_run_lengths_heat = hi_run_lengths.arrayMask(hi_run_values.neq(0))
  var hi_run_lengths_heatwave = hi_run_lengths_heat.arrayMask(hi_run_lengths_heat.gte(heat_consecutive_threshold))
  var hi_starts_heatwave = hi_starts.arrayMask(hi_run_values.gte(1).and(hi_run_lengths.gte(heat_consecutive_threshold)))
  //Total heatwave days per pixel
  var heatrun_total = hi_run_lengths_heatwave.arrayReduce({reducer: ee.Reducer.sum(),axes: [0]});
  //Average length per pixel (even though var is names heatwaves also includes non-wave definitions)
  var hi_run_lengths_heatwave_nonzero = modules.mask_zeroarrays(hi_run_lengths_heatwave)
  var heatrun_mean = hi_run_lengths_heatwave_nonzero.arrayReduce({reducer: ee.Reducer.mean(),axes: [0]});
  heatrun_mean = heatrun_mean.arrayProject([0]).arrayFlatten([["heat_avg"]])
  /////////////
  //COMPOUNDING WITH ARRAYS
  ////////////
  var compounding_arr = hrr_exc_arr.arrayCat(hi_exc_arr,1)
  compounding_arr = compounding_arr.arrayReduce(ee.Reducer.sum(),[1])
  // Length of waves from each start position
  var length_array = hrr_run_lengths.arrayMask(hrr_run_values.gte(1).and(hrr_run_lengths.gte(smoke_consecutive_threshold)))//DID I ALREADY DO THIS ABOVE?
  ///////////////
  //COMPOUNDING COUNTS 
  ///////////////
  //Find compounding between temperature exceedance and smokewave by adding the individual exceedance bands
  //Where pixel = 2, it's compounding
  //Returns raster 
  //If thresholds for each are set to 0, then compounding is defined by exceedance only
  //If thresholds are >0, then wave definition enters and wave bands are used for compounding
  //Note that these are joining by date not by index so careful when evaluating the compounding array 
  var compounding = ee.ImageCollection(ee.Algorithms.If(heat_consecutive_threshold.eq(0).and(smoke_consecutive_threshold.eq(0)),
    modules.addRasters(hrr_consecutive.select("exceedance"),heat_consecutive.select("exceedance"),"date"),
    modules.addRasters(hrr_consecutive.select("smokewave"),heat_consecutive.select("heatwave"),"date")))
  compounding = compounding.map(function(img){return img.rename("compounding")})
  // Map.addLayer(modules.colToArray(compounding))
  //Image collection of compounding images that are 1 if compounding, 0 otherwise
  var masked_compounding_imgC = compounding.map(function(img){
    return ee.Image(img).eq(2).selfMask().copyProperties(img);
  })
  //////////////
  //RUNS OF COMPOUNDING
  //////////////
  //Extract run values for compounding days
  var compounding_array = modules.colToArray(compounding.map(function(img){return ee.Image(img).eq(2)})) // Convert imgCollection to a 2D array-valued image and flatten to 1D using arrayReshape()
  var compounding_diff = modules.diffArray(compounding_array)
  var compounding_run_values = modules.runValues(compounding_diff,compounding_array)
  var compounding_starts = modules.runStarts(compounding_diff,compounding,compounding_array)
  var compounding_starts_nonzero = compounding_starts.arrayMask(compounding_run_values.neq(0))
  var compounding_run_lengths = modules.runLengths(compounding_starts,compounding_array)
  var compounding_run_lengths_nonzero = compounding_run_lengths.arrayMask(compounding_run_values.neq(0))
  compounding_run_lengths_nonzero = compounding_run_lengths_nonzero.arrayMask(compounding_run_lengths_nonzero.gte(compound_consecutive_threshold))
  //Get the first array element from the array image with an array of maximum value indices
  var maxIndex = compounding_run_lengths_nonzero.arrayArgmax().arrayGet(0)
  var max_hsc_run_length = compounding_run_lengths_nonzero.arrayGet(maxIndex).reduceRegion({"geometry":ca,"reducer":ee.Reducer.max(),"scale":HRRR_SCALE,"tileScale":6})
  results = results.set("max_length",max_hsc_run_length.get("array"))
  //Get average run lengths 
  //Array image with the mean compound run length
  var compoundingrun_mean = compounding_run_lengths_nonzero.arrayReduce({reducer: ee.Reducer.mean(),axes: [0]});
  compoundingrun_mean = compoundingrun_mean.arrayProject([0]).arrayFlatten([["compound_avg"]])
  //Mask over pixels with mean of 0 (i.e. those that did not have any compounding events)
  compoundingrun_mean = compoundingrun_mean.selfMask()
  //Take average compound run length for all of CA
  results = results.set("compoundingrun_mean",compoundingrun_mean.reduceRegion({geometry:ca,reducer:ee.Reducer.mean(),tileScale: 6,scale:HRRR_SCALE}).get("compound_avg"))
  ////////
  //COMPOUNDING MAGNITUDE
  //////
  //Get the product of magnitude exceedances and then filter to compounding events by applying a mask that flags a compounding events
  var compounding_mag_geomean = ee.ImageCollection(modules.multiplyRastersGeoMean(hrr_exc_mag.select("smoke"),hi_exc_mag,"date"))
  //Zero out areas that are not compounding, if compounding requires waves, this will mask for only the waves. NO MASK HERE! 
  var compounding_mag_imgC_masked = ee.ImageCollection(modules.multiplyRasters(compounding_mag_geomean,masked_compounding_imgC,"date"))
  //Compounding Exc Mag
  var compounding_mag_meanimg = ee.ImageCollection(modules.multiplyRasters(compounding_mag_imgC_masked,masked_compounding_imgC,"date")).mean()
  //Summarize
  var max_comp_mag = compounding_mag_imgC_masked.max().reduceRegion({"geometry":ca,"reducer":ee.Reducer.max(),"scale":HRRR_SCALE,"tileScale":6}).get("smoke")
  var min_comp_mag = compounding_mag_imgC_masked.min().reduceRegion({"geometry":ca,"reducer":ee.Reducer.min(),"scale":HRRR_SCALE,"tileScale":6}).get("smoke")
  ///////////////
  //COMPOUNDING AREA
  ///////////////
  //Total count of compounding events per pixel
  //Image collection of area values per compounding pixel (time series) 
  var compoundingcounts = ee.ImageCollection(masked_compounding_imgC).sum()
  var compoundingcount_mean = compoundingcounts.reduceRegion({geometry:ca,reducer:ee.Reducer.mean(),tileScale: 6,scale:HRRR_SCALE})
  var compoundingcount_max = compoundingcounts.reduceRegion({geometry:ca,reducer:ee.Reducer.max(),tileScale: 6,scale:HRRR_SCALE})
  results = results.set("compoundingcount_mean",compoundingcount_mean.get("compounding"))
  results = results.set("compoundingcount_max",compoundingcount_max.get("compounding"))
  //Plot/calculate total area with minimum of 1 compounding event statewide
  var area_compounding_km_gteone = compounding.max().eq(2).multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM);
  var area_hrrr_km_gteone = hrr_exc.max().eq(1).multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM);
  var area_hi_km_gteone = hi_exc.max().eq(1).multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM);
  var compounding_km_sum_gteone = area_compounding_km_gteone.reduceRegion({"geometry":ca,"reducer":ee.Reducer.sum(),"scale":HRRR_SCALE,"tileScale":6})
  var area_hrrr_km_gteone_sum = area_hrrr_km_gteone.reduceRegion({"geometry":ca,"reducer":ee.Reducer.sum(),"scale":HRRR_SCALE,"tileScale":6})
  var area_hi_km_gteone_sum = area_hi_km_gteone.reduceRegion({"geometry":ca,"reducer":ee.Reducer.sum(),"scale":HRRR_SCALE,"tileScale":6})
  results = results.set("area_compounded_min_extent", compounding_km_sum_gteone.get("compounding"))
  results = results.set("area_heat_min_extent", area_hrrr_km_gteone_sum.get("smoke"))
  results = results.set("area_smoke_min_extent", area_hi_km_gteone_sum.get(heat_variable))
  //Total area compounding over the whole season (days*km2)
  var compounding_area_imgC = compounding.map(function(img){
  		  var area = ee.Image(img).eq(2).multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM);
  		  return ee.Image(area.copyProperties(img));
  		})
  var area_compounding = compounding_area_imgC.sum().reduceRegion({"geometry":ca,reducer:ee.Reducer.sum(),scale:HRRR_SCALE})		
  results = results.set("area_compounded_freq_weighted",area_compounding.get("compounding"))
  // ////////////////
  // //MAGNITUDE OF SMOKE & HEAT FOR COMPOUNDING/WAVE EVENTS (i.e. conditional magnitude)
  // ///////////////
  ////SMOKE
  //Average smoke values for compounding events
  var hrr_compounding = modules.joinrasters_merge(hrr,masked_compounding_imgC,"date")
  var hrr_compounding = hrr_compounding.map(function(img){return img.select("smoke").updateMask(img.select("compounding"))})
  var hrr_exc_mag_compounding = modules.band_exc_mag(hrr_compounding,"smoke",pm_tf_threshold);
  //Add average exceedance to export feature
  var avg_smoke_exceedance_compounding = hrr_exc_mag_compounding.mean().reduceRegion({"geometry":ca,reducer:ee.Reducer.mean(),scale:HRRR_SCALE})
  results = results.set("hrr_exc_mag_avg_compounding",avg_smoke_exceedance_compounding.get("smoke"))
  ///HEAT
  //Repeat above for heat
  var heat_compounding = modules.joinrasters_merge(temps.filterDate(start,end),masked_compounding_imgC,"date")
  var heat_compounding = heat_compounding.map(function(img){return img.select(heat_variable).updateMask(img.select("compounding"))})
  var heat_exc_mag_compounding = modules.band_exc_mag(heat_compounding,heat_variable, temp_cutoff_img);
  //Add average exceedance to export feature
  var avg_heat_exceedance_compounding = heat_exc_mag_compounding.mean().reduceRegion({"geometry":ca,reducer:ee.Reducer.mean(),scale:HRRR_SCALE})
  results = results.set("heat_exc_mag_avg_compounding",avg_heat_exceedance_compounding.get(heat_variable))
  //IMAGES USED FOR LATER STATS
  //Hi Exc Mag
  var hi_compounding_mag_meanimg = ee.ImageCollection(modules.multiplyRasters(hi_exc_mag,masked_compounding_imgC,"date")).mean()
  //Hrr Exc Mag
  var hrr_compounding_mag_meanimg = ee.ImageCollection(modules.multiplyRasters(hrr_exc_mag,masked_compounding_imgC,"date")).mean()
  ////////////////
  //POPULATION ESTIMATES 
  ///////////////
  //Dictionary with total population affected by areas with at minimum one compounding event
  //Most recent population image from dataset
  var pop = population.sort("system:time_start",false).first()
  //Mask areas that were affected at least once by compounding //CONSIDER REDOING WITH COUNT TO GET PEOPLE x DAYS
  var maskReduce = function(img,mask,func,imgscale){
    var masked_img = img.updateMask(mask)
    var reducer_dict = masked_img.reduceRegion({
      geometry:ca,
      reducer:func,
      tileScale: 6,
      scale:imgscale
    })
    return reducer_dict
  }
  ////////////////
  //POPULATION IMAGE
  ///////////////
  var hsc_min_extent = compounding.max().eq(2)
  var pop_affected_img = pop.updateMask(hsc_min_extent).selfMask()
  var pop_unaffected_img = pop.updateMask(hsc_min_extent.not()).selfMask()
  results = results.set("total_affected_population", maskReduce(pop,compounding.max().eq(2),ee.Reducer.sum(),1000).get("population_count"))
  results = results.set("total_affected_population_heat", maskReduce(pop,hi_exc.max().eq(1),ee.Reducer.sum(),1000).get("population_count"))
  results = results.set("total_affected_population_smoke", maskReduce(pop,hrr_exc.max().eq(1),ee.Reducer.sum(),1000).get("population_count"))
  //POP DENSITY
  var popden = population_density.sort("system:time_start",false).first()
  print(pop_affected_img.reduceRegion({geometry:ca,reducer:ee.Reducer.max(),scale:1000,tileScale:2}))
  var getIntersection = function(imgmask,img){
    //Takes any image and masks with areas that had compounding (or not)
    //Reduce the masked image to retrieve stats
    //CONSIDER REDOING WITH COUNT TO GET PEOPLE x DAYS
    var img = img.updateMask(imgmask)
    var img_avg = img.reduceRegion({
      geometry:ca,
      reducer:ee.Reducer.mean().combine({reducer2: ee.Reducer.stdDev(),sharedInputs: true}).combine({reducer2: ee.Reducer.count(),sharedInputs: true}),
      tileScale: 12,
      scale:HRRR_SCALE
    })
    return img_avg
  }
  results = results.set("popden_affected_mean", getIntersection(compoundingcounts,popden).get("population_density_mean"))
  results = results.set("popden_affected_std", getIntersection(compoundingcounts,popden).get("population_density_stdDev"))
  results = results.set("popden_affected_count", getIntersection(compoundingcounts,popden).get("population_density_count"))
  results = results.set("popden_unaffected_mean", getIntersection(compoundingcounts.unmask().not(),popden).get("population_density_mean"))
  results = results.set("popden_unaffected_std", getIntersection(compoundingcounts.unmask().not(),popden).get("population_density_stdDev"))
  results = results.set("popden_unaffected_count", getIntersection(compoundingcounts.unmask().not(),popden).get("population_density_count"))
  results = results.set("heat_popden_affected_mean", getIntersection(hi_exc.max(),popden).get("population_density_mean"))
  results = results.set("heat_popden_affected_std", getIntersection(hi_exc.max(),popden).get("population_density_stdDev"))
  results = results.set("heat_popden_affected_count", getIntersection(hi_exc.max(),popden).get("population_density_count"))
  results = results.set("heat_popden_unaffected_mean", getIntersection(hi_exc.max().unmask().not(),popden).get("population_density_mean"))
  results = results.set("heat_popden_unaffected_std", getIntersection(hi_exc.max().unmask().not(),popden).get("population_density_stdDev"))
  results = results.set("heat_popden_unaffected_count", getIntersection(hi_exc.max().unmask().not(),popden).get("population_density_count"))
  results = results.set("smoke_popden_affected_mean", getIntersection(hrr_exc.max(),popden).get("population_density_mean"))
  results = results.set("smoke_popden_affected_std", getIntersection(hrr_exc.max(),popden).get("population_density_stdDev"))
  results = results.set("smoke_popden_affected_count", getIntersection(hrr_exc.max(),popden).get("population_density_count"))
  results = results.set("smoke_popden_unaffected_mean", getIntersection(hrr_exc.max().unmask().not(),popden).get("population_density_mean"))
  results = results.set("smoke_popden_unaffected_std", getIntersection(hrr_exc.max().unmask().not(),popden).get("population_density_stdDev"))
  results = results.set("smoke_popden_unaffected_count", getIntersection(hrr_exc.max().unmask().not(),popden).get("population_density_count"))
  ////////////////
  //EXPORT IMAGES 
  ///////////////
  if(exportimage==true){
    ///////////////
    //FINDING LOCATIONS WHERE MAXIMUMS OCCURED 
    ///////////////
    // var compoundingcounts = ee.ImageCollection(masked_compounding_imgC).sum()
    var coordimg = ee.Image.pixelLonLat()
    var max_loc = coordimg.updateMask(ee.Image(compounding_run_lengths_nonzero.arrayGet(maxIndex)).eq(ee.Image(ee.Number(max_hsc_run_length.get("array")))))
    ///////////////
    //EXPORT RAW IMAGES AND TABLES FOR PROCESSING IN R & PYTHON
    ///////////////
    Export.image.toDrive({"image":pop_affected_img.clip(ca),"folder":exportdirectory,"description":"pop_affected_img","fileNamePrefix":"pop_affected_img", "region":ca,scale:1000})
    Export.image.toDrive({"image":pop_unaffected_img.clip(ca),"folder":exportdirectory,"description":"pop_unaffected_img","fileNamePrefix":"pop_unaffected_img", "region":ca,scale:1000})
    //Feature collection of population affected per day
    var pop_affected_daily =  ee.FeatureCollection(masked_compounding_imgC.map(function(img){
      var popimg = pop.updateMask(img)
      var popdaily = popimg.reduceRegion({geometry:ca,reducer:ee.Reducer.sum(),scale:1000,tileScale:6})
      var popdaily = ee.Feature(null,popdaily)
      return popdaily.set("date",img.get("date"))
    }))
    pop_affected_daily = modules.list_to_fc(pop_affected_daily.aggregate_array("population_count").zip(pop_affected_daily.aggregate_array("date")),["population_count","date"])
    Export.table.toDrive({"collection":pop_affected_daily,"folder":exportdirectory,"description":"dailypopulation","fileNamePrefix":"population_affected_daily","fileFormat":"CSV"})
    ///////////////
    //EXPORT RAW IMAGES AND TABLES FOR PROCESSING IN R & PYTHON
    ///////////////
    // Export.image.toDrive({"image":compoundingrun_mean.clip(ca),"folder":exportdirectory,"description":"compoundingrun_mean","fileNamePrefix":"compoundingrun_mean", "region":ca, "scale":HRRR_SCALE})
    // Export.image.toDrive({"image":compounding_mag_meanimg.clip(ca),"folder":exportdirectory,"description":"compoundingmag","fileNamePrefix":"compoundingmag", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":compoundingcounts.toFloat().clip(ca),"folder":exportdirectory,"description":"compoundingcounts","fileNamePrefix":"compoundingcounts", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":smokerun_mean.clip(ca),"folder":exportdirectory,"description":"smokerun_mean","fileNamePrefix":"smokerun_mean", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":hrr_exc_mag.mean().selfMask().clip(ca),"folder":exportdirectory,"description":"smokemag","fileNamePrefix":"smokemag", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":hrr_exc.sum().selfMask().toFloat().clip(ca),"folder":exportdirectory,"description":"hrr_counts","fileNamePrefix":"hrr_counts", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":heatrun_mean.clip(ca),"folder":exportdirectory,"description":"heatrun_mean","fileNamePrefix":"heatrun_mean", "region":ca, "scale":HRRR_SCALE})  
    Export.image.toDrive({"image":hi_exc_mag.mean().clip(ca),"folder":exportdirectory,"description":"heatmag","fileNamePrefix":"heatmag", "region":ca, "scale":HRRR_SCALE})
    Export.image.toDrive({"image":hi_exc.sum().selfMask().toFloat().clip(ca),"folder":exportdirectory,"description":"hi_counts","fileNamePrefix":"hi_counts", "region":ca, "scale":HRRR_SCALE})
    // //Get the max run lengths per pixel // "palette":{"0aff06,fff706,ffa808,ff3406", "min":0, "max":20}
    Export.image.toDrive({"image":compounding_run_lengths_nonzero.arrayGet(maxIndex).clip(ca), "folder":exportdirectory,"description": "Max compound run length","fileNamePrefix": "Max compound run length", "region":ca, "scale":HRRR_SCALE})
    ///////////////
    //TIME SERIES OF AREAS AFFECTED
    ///////////////
  	//Returns a table with each date and corresponding area compounding for each
  	var compounding_areaprop = modules.addAreaStats(compounding,2,ca);
  	var compounding_areaprop = compounding_areaprop.aggregate_array("2_area").zip(compounding_areaprop.aggregate_array("date"))
  	compounding_areaprop = modules.list_to_fc(compounding_areaprop,["area","date"])
  	//Get table for each day the area that is smoke exceeded and heat exceeded
  	var smoke_timeseries = modules.addAreaStats(hrr_exc.select("smoke"),1,ca).aggregate_array("1_area").zip(hrr_exc.aggregate_array("date"))
  	var hi_timeseries = modules.addAreaStats(hi_exc.select(heat_variable),1,ca).aggregate_array("1_area").zip(hi_exc.aggregate_array("date"))
  	//CSV of area of heat exc, smoke exc, and compounding by day -- input to seperate python code that outputs the graphs
    Export.table.toDrive({collection:modules.list_to_fc(smoke_timeseries,["area","date"]),description: "smoke_area_by_day",fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"smoke_area_by_day"})
    Export.table.toDrive({collection:modules.list_to_fc(hi_timeseries,["area","date"]),description:"heat_area_by_day",fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"heat_area_by_day"})
    Export.table.toDrive({collection:compounding_areaprop,description: "compounding_area_by_day",fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"compounding_area_by_day"})
    // ECOREGIONS
    ////
    ///EXEEDANCE AREA (NOT RAW HAZARD VALUE AVERAGES)
    var smoke_join_temp = modules.joinrasters_merge(hrr_exc,hi_exc,"date");
  	var smoke_join_temp = modules.joinrasters_merge(smoke_join_temp,masked_compounding_imgC,"date");
    //Get the minimum extent area
    var eventextent = ee.Image(smoke_join_temp.sum().gt(0)).multiply(ee.Image.pixelArea()).reduceRegions({collection:ecoregions,reducer:ee.Reducer.sum(),scale:HRRR_SCALE})
    var eventcounts = ee.Image(smoke_join_temp.sum().selfMask()).reduceRegions({collection:ecoregions,reducer:ee.Reducer.sum(),scale:HRRR_SCALE})
    var eventfootprint_weighted = ee.Image(smoke_join_temp.sum().multiply(ee.Image.pixelArea())).reduceRegions({collection:ecoregions,reducer:ee.Reducer.sum(),scale:HRRR_SCALE})
    var eventmagnitudes = hrr_exc_mag.mean().addBands(hi_exc_mag.mean()).reduceRegions({collection:ecoregions,reducer:ee.Reducer.mean(),scale:HRRR_SCALE})
    var eventlengths = smokerun_mean.addBands(heatrun_mean).reduceRegions({collection:ecoregions,reducer:ee.Reducer.mean(),scale:HRRR_SCALE})
    Export.table.toDrive({collection:eventextent,description: 'smoketemp_ecoregionsL1_summarytable_extent', 
        fileFormat: 'CSV',
        folder:exportdirectory,
        fileNamePrefix:"smoketemp_ecoregionsL1_summarytable_area"})
    Export.table.toDrive({collection:eventcounts,description: 'smoketemp_ecoregionsL1_summarytable_counts', 
        fileFormat: 'CSV',
        folder:exportdirectory,
        fileNamePrefix:"smoketemp_ecoregionsL1_summarytable_counts"})
    Export.table.toDrive({collection:eventfootprint_weighted,description: 'smoketemp_ecoregionsL1_summarytable_areafreqweighted', 
        fileFormat: 'CSV',
        folder:exportdirectory,
        fileNamePrefix:"smoketemp_ecoregionsL1_summarytable_areafreqweighted"})
    Export.table.toDrive({collection:eventmagnitudes,description: 'smoketemp_ecoregionsL1_summarytable_mag', 
        fileFormat: 'CSV',
        folder:exportdirectory,
        fileNamePrefix:"smoketemp_ecoregionsL1_summarytable_mag"})
    Export.table.toDrive({collection:eventlengths,description: 'smoketemp_ecoregionsL1_summarytable_length', 
        fileFormat: 'CSV',
        folder:exportdirectory,
        fileNamePrefix:"smoketemp_ecoregionsL1_summarytable_length"})
    // ///////////////
    // //CES ANALYSIS
    // ///////////////
    //Frequency weighted compounding area per census tract for the entire summer
    var area_compoundingcounts = compoundingcounts.multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM);
    var ces_compound_avg = area_compoundingcounts.reduceRegions({
      collection:ces,
      reducer:ee.Reducer.sum(),
      scale:HRRR_SCALE}
    )
    Export.table.toDrive({collection: ces_compound_avg,description: 'compound_ces',fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"ces_compoundarea"});
    // //Spatially weighted average of heatwave counts per census tract
    var ces_heat_total = hi_exc.sum().multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM)
    ces_heat_total = ces_heat_total.reduceRegions({
      collection:ces,
      reducer:ee.Reducer.sum(),
      scale:HRRR_SCALE}
    )
    Export.table.toDrive({collection: ces_heat_total,description: 'heat_ces',fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"ces_heatarea"});
    // //Spatially weighted average of smokewave counts per census tract
    var ces_smoke_total = hrr_exc.sum().multiply(ee.Image.pixelArea()).divide(METERS_PER_SQKM)
    ces_smoke_total = ces_smoke_total.reduceRegions({
      collection:ces,
      reducer:ee.Reducer.sum(),
      scale:HRRR_SCALE}
    )
    Export.table.toDrive({collection: ces_smoke_total,description: 'smoke_ces',fileFormat: 'CSV',folder:exportdirectory,fileNamePrefix:"ces_smokearea"});
    // // ///////////////
    // // //RECONCILES TRACTS AND PIXELS
    // // ///////////////
    // Area of HSC per tract
    var compounding_area_per_tract = area_compounding_km_gteone.reduceRegions({collection:ctracts,reducer:ee.Reducer.sum(),scale:1000,tileScale:6})
    var hi_area_per_tract = area_hi_km_gteone.reduceRegions({collection:ctracts,reducer:ee.Reducer.sum(),scale:HRRR_SCALE,tileScale:6})
    var hrrr_area_per_tract = area_hrrr_km_gteone.reduceRegions({collection:ctracts,reducer:ee.Reducer.sum(),scale:HRRR_SCALE,tileScale:6})
    Export.table.toDrive({collection:compounding_area_per_tract,description:'compounding_area_per_tract',fileFormat: 'SHP',folder:exportdirectory ,fileNamePrefix:"compounding_area_per_tract"})
    Export.table.toDrive({collection:hi_area_per_tract,description:'hi_area_per_tract',fileFormat: 'SHP',folder:exportdirectory ,fileNamePrefix:"hi_area_per_tract"})
    Export.table.toDrive({collection:hrrr_area_per_tract,description:'hrrr_area_per_tract',fileFormat: 'SHP',folder:exportdirectory ,fileNamePrefix:"hrrr_area_per_tract"})
    //For each tract, compute the 4 pixel window average
    var tracts = ctracts.map(modules.getCentroid)
    tracts = tracts.map(function(fea){return fea.buffer(6000).select(["geoid10"])})
    var tracthazard_counts = compoundingcounts.reduceRegions({collection:tracts,reducer:ee.Reducer.mean().combine({reducer2: ee.Reducer.max(),sharedInputs: true}),scale:HRRR_SCALE})
    var tracthazard_hi = hi_compounding_mag_meanimg.reduceRegions({collection:tracts,reducer:ee.Reducer.mean().combine({reducer2: ee.Reducer.max(),sharedInputs: true}),scale:HRRR_SCALE})
    var tracthazard_hrr = hrr_compounding_mag_meanimg.reduceRegions({collection:tracts,reducer:ee.Reducer.mean().combine({reducer2: ee.Reducer.max(),sharedInputs: true}),scale:HRRR_SCALE})
    var tracthazard_compoundingmag = compounding_mag_meanimg.reduceRegions({collection:tracts,reducer:ee.Reducer.mean().combine({reducer2: ee.Reducer.max(),sharedInputs: true}),scale:HRRR_SCALE})
    Export.table.toDrive({collection:tracthazard_counts,folder:exportdirectory_shp,description:"tracthazardcount",fileNamePrefix:"tracthazardcounts",fileFormat:"SHP"})
    Export.table.toDrive({collection:tracthazard_hi,folder:exportdirectory_shp,description:"tracthazardhi",fileNamePrefix:"tracthazardhi",fileFormat:"SHP"})
    Export.table.toDrive({collection:tracthazard_hrr,folder:exportdirectory_shp,description:"tracthazardhrr",fileNamePrefix:"tracthazardhrr",fileFormat:"SHP"})
    Export.table.toDrive({collection:tracthazard_compoundingmag,folder:exportdirectory_shp,description:"tracthazardcompoundmag",fileNamePrefix:"tracthazardcompoundmag",fileFormat:"SHP"})
  }
  return(ee.Feature(results))
}
//////////////////////////////
// hi_percentile 0
// heat_variable 1
// pm_tf_threshold 2
// heat_consecutive_threshold 3
// smoke_consecutive_threshold 4
// compound_consecutive_threshold 5 
//////////////////////////////
var fea1 = main([85,"heat_index_max",20,0,0,0],true)
// var fea2 = main([85,"heat_index_min",20,0,0,0],false)
// var fea3 = main([95,"heat_index_max",20,0,0,0],false)
// var fea4 = main([95,"heat_index_min",20,0,0,0],false)
// var fea5 = main([85,"heat_index_max",35,0,0,0],false)
// var fea6 = main([85,"heat_index_min",35,0,0,0],false)
// var fea7 = main([95,"heat_index_max",35,0,0,0],false)
// var fea8 = main([95,"heat_index_min",35,0,0,0],false)
// var fea9 = main([85,"heat_index_max",20,2,2,0],false)
// var fea10 = main([85,"heat_index_min",20,2,2,0],false)
// var fea11 = main([95,"heat_index_max",20,2,2,0],false)
// var fea12 = main([95,"heat_index_min",20,2,2,0],false)
// var fea13 = main([85,"heat_index_max",35,2,2,0],false)
// var fea14 = main([85,"heat_index_min",35,2,2,0],false)
// var fea15 = main([95,"heat_index_max",35,2,2,0],false)
// var fea16 = main([95,"heat_index_min",35,2,2,0],false)
Export.table.toDrive({collection:ee.FeatureCollection([fea1]),folder:exportdirectory,description:"sensitivityexport1","fileNamePrefix":"sensitivityanalysis1"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea2]),folder:exportdirectory,description:"sensitivityexport2","fileNamePrefix":"sensitivityanalysis2"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea3]),folder:exportdirectory,description:"sensitivityexport3","fileNamePrefix":"sensitivityanalysis3"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea4]),folder:exportdirectory,description:"sensitivityexport4","fileNamePrefix":"sensitivityanalysis4"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea5]),folder:exportdirectory,description:"sensitivityexport5","fileNamePrefix":"sensitivityanalysis5"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea6]),folder:exportdirectory,description:"sensitivityexport6","fileNamePrefix":"sensitivityanalysis6"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea7]),folder:exportdirectory,description:"sensitivityexport7","fileNamePrefix":"sensitivityanalysis7"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea8]),folder:exportdirectory,description:"sensitivityexport8","fileNamePrefix":"sensitivityanalysis8"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea9]),folder:exportdirectory,description:"sensitivityexport9","fileNamePrefix":"sensitivityanalysis9"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea10]),folder:exportdirectory,description:"sensitivityexport10","fileNamePrefix":"sensitivityanalysis10"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea11]),folder:exportdirectory,description:"sensitivityexport11","fileNamePrefix":"sensitivityanalysis11"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea12]),folder:exportdirectory,description:"sensitivityexport12","fileNamePrefix":"sensitivityanalysis12"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea13]),folder:exportdirectory,description:"sensitivityexport13","fileNamePrefix":"sensitivityanalysis13"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea14]),folder:exportdirectory,description:"sensitivityexport14","fileNamePrefix":"sensitivityanalysis14"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea15]),folder:exportdirectory,description:"sensitivityexport15","fileNamePrefix":"sensitivityanalysis15"})
// Export.table.toDrive({collection:ee.FeatureCollection([fea16]),folder:exportdirectory,description:"sensitivityexport16","fileNamePrefix":"sensitivityanalysis16"})