var sent2 = ui.import && ui.import("sent2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    C = ui.import && ui.import("C", "table", {
      "id": "users/grettelvargas/Cosecha_agua/Area_CA"
    }) || ee.FeatureCollection("users/grettelvargas/Cosecha_agua/Area_CA"),
    AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.09835347259805,
                20.101922887806996
              ],
              [
                -72.09835347259805,
                17.48646223509505
              ],
              [
                -68.20370015228555,
                17.48646223509505
              ],
              [
                -68.20370015228555,
                20.101922887806996
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
      "mode": "FeatureCollection",
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-72.09835347259805, 20.101922887806996],
                  [-72.09835347259805, 17.48646223509505],
                  [-68.20370015228555, 17.48646223509505],
                  [-68.20370015228555, 20.101922887806996]]], null, false),
            {
              "system:index": "0"
            })]),
    CA = ui.import && ui.import("CA", "table", {
      "id": "users/grettelvargas/Pais_RD"
    }) || ee.FeatureCollection("users/grettelvargas/Pais_RD"),
    PUNTOS = ui.import && ui.import("PUNTOS", "table", {
      "id": "users/grettelvargas/Ptos_gps_RD"
    }) || ee.FeatureCollection("users/grettelvargas/Ptos_gps_RD");
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // --------------------------------------------------------------------------
// // Assigment 3 - Instructor Joseph White
// // Student: Grettel Vargas Azofeifa
// // The Tropical Agricultural Research and Higher Education Center
// // 
// // 24 April 2021
// // -------------------------------------------------------------------------
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ///////////////////////////////////////////////////////
// // IMPORTING & PRE-PROCESSING /////////////////////////
// ///////////////////////////////////////////////////////
// // Create a polygon for your area of interest using the geometry tools;
// // make it a relatively small area. The chosen one is roughly 150 km^2
var contorno = ee.Feature(CA);
// // Create image collection of S-2 imagery for the full year of 2019
 var S2 = ee.ImageCollection(sent2)
// //filter start and end date
 .filterDate('2020-01-01', '2020-12-31')
// //filter according to drawn boundary
 .filterBounds(CA)
// // pre-filter to get less cloudy images (only keeps images with less than 20% cloudy pixels)
 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
 ;
// ///////////////////////////////////////////////////////
// // PRE-PROCESSING /////////////////////////////////////
// ///////////////////////////////////////////////////////
// // We will now build a custom function to mask clouds
// // To mask clouds we will use built-in quality band information on clouds for S2 imagery
// // This information is stored in the QA60 bitmask
 var maskS2clouds = function(image) {
   var qa = image.select('QA60'); // first select the QA60 band
// // Information in this band is stored in Bits. Bits work in multiples of 2's
// // Bits 10 (2^10 = 1024) and 11 (Bits 2^11 = 2048) are clouds and cirrus, respectively.
// // These need to be set to zero i.e. .eq(0) to represent clear conditions
   var clouds = qa.bitwiseAnd(Math.pow(2, 10)).eq(0);
   var cirrus = qa.bitwiseAnd(Math.pow(2, 11)).eq(0);
// // bitwiseAnd() is the function to recognise we are referring to the 2^x stored Bit
   var mask = clouds.and(cirrus) // add the two cloud layers together
// // and() returns 1 if both values are non-zero
   return image.updateMask(mask)
//   // return image.updateMask(mask); // Updates an image's mask at all positions where the existing mask is not zero.
};
// // Now that we have created the maskS2clouds function, we want to loop it over the 
// // full S2 collection. We use map().
// // map() will apply the function to each image in the full ImageCollection
var Sent2_cloudmask = S2.map(maskS2clouds); 
// // Let's take a look at what this function is doing...
// // Print the unmasked dataset sorting it from the most to least cloudy image
 print(S2.sort('CLOUDY_PIXEL_PERCENTAGE', false), 'S2 collection clouds'); // false sorts the collection in descending order
// // Look at the Console --> ImageCollection --> features --> 0: Image --> properties --> CLOUDY_PIXEL_PERCENTAGE
// // Let's plot the cloudiest image: 
// // We can select the most cloudy image by sorting the list in descending 
// // order and selecting the first image
 Map.addLayer(S2.sort('CLOUDY_PIXEL_PERCENTAGE', false).first(), 
               {min:0, max:3000, bands:['B4','B3','B2']}, 'Cloudies Image', false);
// // Plot the cloud mask layer QA60
 Map.addLayer(S2.sort('CLOUDY_PIXEL_PERCENTAGE', false).first().select('QA60').eq(0), 
               {min:0, max: 1}, 'Cloud mask', false);
// // Let's now plot the image with the cloud mask applied
 Map.addLayer(Sent2_cloudmask.sort('CLOUDY_PIXEL_PERCENTAGE', false).first(), 
               {min:0, max:3000, bands:['B4','B3','B2']}, 'Cloud masked image', false);
// ///////////////////////////////////////////////////////
// // PROCESSING /////////////////////////////////////////
// ///////////////////////////////////////////////////////
// //// NDVI calculation and plotting
// // We will now use a function in a slightly different way by combining map() and function() together
// // Clip each image and then calculate NDVI for each image in the s2 masked collection
// // Make sure you use the correct Bands here. For Sentinel-2 band B8 = NIR and B4 = RED
 var Sent2_ndvi = Sent2_cloudmask.map(function(image) { 
     var Sent2_clip = image.clip(AOI) // clip the image to our geometry
     return Sent2_clip.addBands(Sent2_clip.normalizedDifference(['B8', 'B4']).rename('NDVI')) //calc. NDVI
 });
// // take a look at the new band in the features list of the ImageCollection
 print(Sent2_ndvi, 'Sentinel-2 with NDVI 2018');
// ///////////////////////////////////////////////////////
// // VISUALISATION //////////////////////////////////////
// ///////////////////////////////////////////////////////
// // Extract band for NDVI and create new ImageCollection
 var NDVI = Sent2_ndvi.select(['NDVI']);
// // Create a time series chart.
// // This is done using the ui.Chart group of functions. First we select the type of chart we require. We are using an
// // image and we want a series as the output. Secondly, we have to chose our reducer.
// // Reducers are used to create spatial summaries of your data. In this case we will calculate the median values for each image
// // in the ImageCollection
// // For full customisable charts see link belows
// // https://developers.google.com/chart/interactive/docs
// // Let's take a look at the seasonal lows and highs
// // Filter NDVI image for January 2018 and January 2019, respectively and create NDVI mean composite image
 var NDVI_jan_2020 = NDVI.filterDate('2020-01-01', '2020-02-01').median();
 var NDVI_jan_2021 = NDVI.filterDate('2021-01-01', '2021-02-01').median();
// // Create palettes for display of NDVI
// // for more palettes: https://github.com/gee-community/ee-palettes
 var palettes = require('users/gena/packages:palettes');
 var ndvi_pal = palettes.colorbrewer.RdYlGn[9];
// // Display NDVI results on map
 Map.centerObject(CA);
// // Add layers to the map
 Map.addLayer(NDVI_jan_2020, {min:-1, max:1, palette: ndvi_pal}, 'NDVI Jan 2020');
 Map.addLayer(NDVI_jan_2021, {min:-1, max:1, palette: ndvi_pal}, 'NDVI Jan 2021');
// ///////////////////////////////////////////////////////
// // EXPORTING DATA /////////////////////////////////////
// ///////////////////////////////////////////////////////
// // 1) Export the data directly from the chart as a csv - select pop out window
// // 2) Convert the ImageCollection to a FeatureCollection and export as a csv
// // Create a function that takes an image, calculates the median over a
// // geometry and returns the value and the corresponding date as a feature.
 var convert_to_FC = function(image){
   var date = image.get('system:time_start');
   var value = image.reduceRegion(ee.Reducer.median(), C, 100).get('NDVI');
   var feature = ee.Feature(null, {'system:time_start': date, 
                             'date': ee.Date(date).format('Y/M/d'), 
                             'value': value});
   return feature;
 };
// // Apply the function to each image in the NDVI ImageCollection.
 var NDVI_table = NDVI.map(convert_to_FC);
 print('NDVI table:', NDVI_table);
Map.addLayer (CA);
Map.addLayer (PUNTOS);
// // INSTRUCTIONS:
// // Use the Sentinel-2 data to explore the NDVI trends in a region/date that interests you
// // ...............................................
// // Delete the geometry, and create your own geometry
// // Tip: use a smaller geometry for shorter processing times
// // Note: bigger geometries have issues of their own, which you can explore
// // ..............................................
// // Provide some commentary (2-3 sentences) with your assignment on the NDVI trends in your region
// // The ndvi presents the lowest values ​​because they effectively correspond to the dry seasons of
// // the country Costa Rica, that is, from November to April, the other values remain fairly 
// // constant throughout the time series.
// // To complete the practical exercise you need to know how to share
// // your scripts with us
// // Simply click on "Get Link" - the actual button NOT the dropdown arrow
// // Then click the "Click to copy link" button and paste that in an email to us
// // ots.online.education@gmail.com
// // !NB! Remember to add the prac number in the header
// // Also see https://biomath-lab.github.io/OTS-GEE/pages/1_prac.html for more help
// // -------------------------------------------------------------------------
// ///////////////////////////////////////////////////////
// // PRACTICAL 3 FEEDBACK FORM //////////////////////////
// ///////////////////////////////////////////////////////
// // Please share your feedback on this practical by completing this quick (2 min) survey. Thank you.
// // https://docs.google.com/forms/d/e/1FAIpQLSe7ySSEp6HXgfLl93f7QuzP36Rt4dOCp6JtMZHvOabtANfl1Q/viewform?usp=pp_url
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%