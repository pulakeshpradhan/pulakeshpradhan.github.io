/**
 * Emergency Compare - A tool to compare imagery from some of the collections available in Google Earth Engine in order to observe and measure change!
 * 
 * @author
 * Alfonso Sanchez-Paus Diaz sanchez.paus@gmail.com
 * 
 * @license
 * Copyright 2021 Open Foris Initiative
 * MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be incpluded in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var misc = require("users/sanchezpauspro/Apps:misc");
var s2 = require("users/collectearth/ce_scripts:common/sentinel2");
var polygonAreas = require("users/sanchezpauspro/Apps:PolygonDrawing");
var sstClass = require("users/sanchezpauspro/Apps:SeaSurfaceTemperature");
// Import country features 
var countryOutlineImage;
var ndviClassValues = [0,0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9, 1];
var ndviPaletteColors = ["000000", "8B592C", "A46A34", "BD7B3D" , "CF9F2B", "DDBC1E", "EDDD0E", "FEFE00", "D8F20B", "B1E418", "8BD825", "64CB32" , "56B931", "47A72E", "39952C", "2A842A" , "247224", "1e5c1e", "1a4b1a", "173b01"];
var ndmiClassValues = [-0.4,- 0.25, -0.15, 0,  0.15,0.4, 1];
var ndmiPaletteColors = ["000000", "d7191c", "fdae61", "ffffbf" , "abd9e9", "2c7bb6" ];
var no2PaletteColors = [ "purple", "cyan", "green", "yellow", "red"];
var so2PaletteColors = [ 'blue', 'purple', 'cyan', 'green', 'yellow', 'red','f79e72', 'f2570a', 'f50ad5', '8bf50a', '05dfeb', 'eb0593'];
var dwClassNames = [
	"Water",
	"Trees",
	"Grass",
	"Flooded vegetation",
	"Crops",
	"Shrub & Scrub",
	"Built Area",
	"Bare ground",
	"Snow & Ice"
	];
var dwClassValues = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8
	];
var dwClassColors = [
	"419BDF",
	"397D49",
	"88B053",
	"7A87C6",
	"E49635",
	"DFC35A",
	"C4281B",
	"A59B8F",
	"B39FE1"
	];
var BASEMAP = { name : "Google Maps Basemap", period : 5, start : "2014-10-14" };
var sentinel2Url = "https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi/overview";
var SENTINEL_1 = { name : "Sentinel-1 SAR Radar", period : 6, start : "2014-10-14" , pixelSize: "10", url:"https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/overview", info:"The 'Sentinel 1 mosaic' product is derived from processing ESA's Sentinel-1 C-band Synthetic Aperture Radar (SAR) images available for a certain date-range. The imagery is based on radar data which means that the land-cover is detected though the different textures rather than colors. Imaging radars equipped with C-band are generally not hindered by atmospheric effects and are capable of imaging through tropical clouds and rain showers. Its penetration capability with regard to vegetation canopies or soils is limited and is restricted to the top layers." };
var SENTINEL_2_NATURAL = { name : "Sentinel-2 Natural ( RGB )", period : 2, start : "2015-06-23", pixelSize: "10", url:sentinel2Url, info:"Sentinel-2 MultiSpectral Instrument, Level-2A images available from June 2015 to present. This image is a true color composite that uses visible light bands red, green and blue in the corresponding red, green and blue color channels, resulting in a natural colored result, that is a good representation of the Earth as humans would see it naturally." };
var SENTINEL_2_FALSE_20 = { name : "Sentinel-2 False 20 m (nir-swir1-red)", period : 2, pixelSize: "20", start : "2015-06-23",  url:sentinel2Url, info:"Sentinel-2 MultiSpectral Instrument, Level-2A images available from June 2015 to present. This image is a false color composite using near infrared, short wave infrared and red bands. "};
var SENTINEL_2_FALSE_10 = { name : "Sentinel-2 False 10 m (nir-red-green)", period : 2, pixelSize: "10", start : "2015-06-23",  url:sentinel2Url, info:"Sentinel-2 MultiSpectral Instrument, Level-2A images available from June 2015 to present. This image is a false color composite using near infrared, red and green bands, which is very popular. It is most commonly used to assess plant density and health, as plants reflect near infrared and green light, while absorbing red. Since they reflect more near infrared than green, plant-covered land appears deep red."};
var SENTINEL_2_NDVI = { name : "Sentinel-2 NDVI 20 m", period : 2, start : "2015-06-23", palette: { palette: ndviPaletteColors , min: 0, med:0.5, max: 1, label:"NDVI Values" }, pixelSize: "10",  url:sentinel2Url, info:"Sentinel-2 MultiSpectral Instrument, Level-2A images available from June 2015 to present. The NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in near infra-red wavelengths with chlorophyll absorption in red wavelengths. The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation."};
var SENTINEL_2_NDMI = { name : "Sentinel-2 NBR/NDMI 20 m", period : 2, start : "2015-06-23", palette: { palette: ndmiPaletteColors , min: -0.4, med:0, max: 0.4, label:"NBR/NDMI Values" }, pixelSize: "10",  url:sentinel2Url, info:"Sentinel-2 MultiSpectral Instrument, Level-2A images available from June 2015 to present. The NDMI/NBR is a Normalized Difference Moisture Index/Normalized Burn Ratio, that uses NIR and SWIR bands to display moisture as well as burn severity. The SWIR band reflects changes in both the vegetation water content and the spongy mesophyll structure in vegetation canopies, while the NIR reflectance is affected by leaf internal structure and leaf dry matter content but not by water content. The combination of the NIR with the SWIR removes variations induced by leaf internal structure and leaf dry matter content, improving the accuracy in retrieving the vegetation water content. The amount of water available in the internal leaf structure largely controls the spectral reflectance in the SWIR interval of the electromagnetic spectrum. SWIR reflectance is therefore negatively related to leaf water content. In short, NDMI is used to monitor changes in water content of leaves and NBR (which is the same index) ."};
var SENTINEL_2_DYNAMIC_WORLD = { name : "DYNAMIC WORLD Land Cover",  start : "2015-06-23", monthly: false, period : 2, pixelSize: "10", 
                      url:"https://dynamicworld.app/", info:"Dynamic World is a near realtime 10m resolution global land use land cover dataset, produced using deep learning, freely available and openly licensed. It is the result of a partnership between Google and the World Resources Institute, to produce a dynamic dataset of the physical material on the surface of the Earth. Dynamic World is intended to be used as a data product for users to add custom rules with which to assign final class values, producing derivative land cover maps."
                          , classification: { title : "Land Cover classes", classColors : dwClassColors , classNames : dwClassNames}  
};
var LANDSAT_8_NATURAL = { name : "Landsat-8 Natural (RGB)", period : 16, start : "2013-04-21", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/landsat-8/landsat-8-overview", info:"Landsat 8  is the eighth satellite in the Landsat program. Landsat 8 provides moderate-resolution imagery, from 15 to 100 metres, of Earth's land surface and polar regions and operates in the visible, near-infrared, short wave infrared, and thermal infrared spectrums. This image is a true color composite that uses visible light bands red, green and blue in the corresponding red, green and blue color channels, resulting in a natural colored result, that is a good representation of the Earth as humans would see it naturally."};
var LANDSAT_8_FALSE = { name : "Landsat-8 False (nir-swir-red)", period : 16, start : "2013-04-21", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/landsat-8/landsat-8-overview", info:"Landsat 8 provides moderate-resolution imagery, from 15 to 100 metres, of Earth's land surface and polar regions and operates in the visible, near-infrared, short wave infrared, and thermal infrared spectrums. This image is a false color composite using near infrared, short wave infrared and red bands."};
var LANDSAT_9_NATURAL = { name : "Landsat-9 Natural (RGB)", period : 16, start : "2021-10-31", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/satellites/landsat-9/landsat-9-overview/", info:"Landsat 9 is the latest satellite in the Landsat series—it will continue Landsat’s irreplaceable record of Earth’s land surface upon its September 2021 launch. To reduce the build time and a risk of a gap in observations, Landsat 9 largely replicates its predecessor Landsat 8.Both instruments have sensors with moderate spatial resolution—15 m (49 ft), 30 m (98 ft), and 100 m (328 ft) depending on spectral band—and the ability to detect a higher range in intensity than Landsat 8 (14-bit radiometric resolution vs. Landsat 8’s 12-bit radiometric resolution). Landsat 9 will be placed in an orbit that it is eight days out of phase with Landsat 8 to increase temporal coverage of observations."};
var LANDSAT_9_FALSE = { name : "Landsat-9 False (nir-swir-red)", period : 16, start : "2021-10-31", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/satellites/landsat-9/landsat-9-overview/", info:"Landsat 9 is the latest satellite in the Landsat series—it will continue Landsat’s irreplaceable record of Earth’s land surface upon its September 2021 launch. To reduce the build time and a risk of a gap in observations, Landsat 9 largely replicates its predecessor Landsat 8.Both instruments have sensors with moderate spatial resolution—15 m (49 ft), 30 m (98 ft), and 100 m (328 ft) depending on spectral band—and the ability to detect a higher range in intensity than Landsat 8 (14-bit radiometric resolution vs. Landsat 8’s 12-bit radiometric resolution). Landsat 9 will be placed in an orbit that it is eight days out of phase with Landsat 8 to increase temporal coverage of observations."};
var LANDSAT_7_NATURAL = { name : "Landsat-7 Natural (RGB)", period : 16, start : "1999-01-01", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/landsat-7", info:"Landsat 7 is the seventh satellite of the Landsat program. Landsat 7 provides moderate-resolution imagery, scanning across the entire Earth's surface and operates in the visible, near-infrared, short wave infrared, and thermal infrared spectrums. This image is a true color composite that uses visible light bands red, green and blue in the corresponding red, green and blue color channels, resulting in a natural colored result, that is a good representation of the Earth as humans would see it naturally."};
var LANDSAT_7_FALSE = { name : "Landsat-7 False (nir-swir-red)", period : 16, start : "1999-01-01", pixelSize: "30", url:"https://landsat.gsfc.nasa.gov/landsat-7", info:"Landsat 7 is the seventh satellite of the Landsat program. Landsat 7 provides moderate-resolution imagery, scanning across the entire Earth's surface and operates in the visible, near-infrared, short wave infrared, and thermal infrared spectrums. This image is a false color composite using near infrared, short wave infrared and red bands."};
var NIGHTLIGHTS = { name : "Night lights (VIIRS)", start : "2012-04-01" , end : "2020-06-01", monthly: true, period : 15, pixelSize: "450", url:"https://eogdata.mines.edu/products/vnl/", info:"The Visible Infrared Imaging Radiometer Suite (VIIRS) provides monthly average radiance composite images using nighttime data from the Day/Night Band (DNB). As these data are composited monthly, there are many areas of the globe where it is impossible to get good quality data coverage for that month. This can be due to cloud cover, especially in the tropical regions, or due to solar illumination, as happens toward the poles in their respective summer months"};
var SENTINEL_5_NO2 = { name : "Sentinel-5P NO2", period : 7, start : "2018-07-28", pixelSize: "1120", palette: { palette: no2PaletteColors , min: "0 - Low", med:"Med", max: "0.0002 High", label:"Total vertical column of NO2 (ratio of the slant column density of NO2 and the total air mass factor) - mol/m^2" }, url:"https://maps.s5p-pal.com/cases/", info:"The SENTINEL-5 mission consists of high resolution spectrometer system operating in the ultraviolet to shortwave infrared range with 7 different spectral bands. SENTINEL-5 is focused on air quality and composition-climate interaction with the main data products being O3, NO2, SO2, HCHO, CHOCHO and aerosols. This image shows nitrogen dioxide (NO2) concentrations in the atmosphere. NO2 primarily gets in the air from the burning of fuel. NO2 forms from emissions from cars, trucks and buses, power plants, and off-road equipment."};
var SENTINEL_5_SO2 = { name : "Sentinel-5P SO2", period : 1, start : "2018-07-28", pixelSize: "1120", palette: { palette: so2PaletteColors , min: "0 - Low", med:"High", max: "0.02 Very High", label:"SO2 vertical column density at ground level, calculated using the DOAS technique - mol/m^2" }, url:"https://maps.s5p-pal.com/cases/", info:"The SENTINEL-5 mission consists of high resolution spectrometer system operating in the ultraviolet to shortwave infrared range with 7 different spectral bands. SENTINEL-5 is focused on air quality and composition-climate interaction with the main data products being O3, NO2, SO2, HCHO, CHOCHO and aerosols. This image shows sulphur dioxide (SO2) concentrations in the atmosphere. Sulphur dioxide (SO2) enters the Earth’s atmosphere through both natural and anthropogenic processes. It plays a role in chemistry on a local and global scale and its impact ranges from short-term pollution to effects on climate. Only about 30% of the emitted SO2 comes from natural sources; the majority is of anthropogenic origin. SO2 emissions adversely affect human health and air quality. SO2 has an effect on climate through radiative forcing, via the formation of sulphate aerosols. Volcanic SO2 emissions can also pose a threat to aviation, along with volcanic ash. S5P/TROPOMI samples the Earth’s surface with a revisit time of one day with unprecedented spatial resolution of 3.5 x 7 km which allows the resolution of fine details including the detection of much smaller SO2 plumes."};
var BURNED_AREA = { name : "MODIS Burned Area Monthly",  start : "2000-11-01", monthly: true, period : 15, pixelSize: "500", url:"https://lpdaac.usgs.gov/products/mcd64a1v006/", info:"The Terra and Aqua combined MCD64A1 Version 6 Burned Area data product is a monthly, global gridded 500m product containing per-pixel burned-area and quality information. The MCD64A1 burned-area mapping approach employs 500m MODIS Surface Reflectance imagery coupled with 1km MODIS active fire observations."};
var sstPalette = sstClass.SST_PALETTE;
sstPalette.label = "Sea Surface Temperature (°C)" ;
var SST_NOAA = { name : "Sea Surface Temp NOAA",  start : "1981-09-01", monthly: false, period : 2, pixelSize: "27750",palette: sstPalette, url:"https://developers.google.com/earth-engine/datasets/catalog/NOAA_CDR_OISST_V2_1", info:"NOAA CDR OISST v02r01: Optimum Interpolation Sea Surface Temperature."};
var SST_GCOM = { name : "Sea Surface Temp GCOM",  start : "2020-01-01", monthly: false, period : 2, pixelSize: "5000",palette: sstPalette, url:"https://developers.google.com/earth-engine/datasets/catalog/JAXA_GCOM-C_L3_OCEAN_SST_V2", info:"GCOM-C/SGLI L3 Sea Surface Temperature (V2)"};
var ACATENELLA_NOAA = { name : "A. catenella Risk Map NOAA SST",  start : "1981-09-01", monthly: false, period : 2, pixelSize: "27750", url:"https://developers.google.com/earth-engine/datasets/catalog/NOAA_CDR_OISST_V2_1", info:"This maps shows the risk of A. Catenella blooming by classifying the Sea Surface Temperature (SST) in 4 classes. High Risk for waters with SST between 13 and 15 degress. Moderate risk for waters with SST between 11-13 and 15-17 degrees and low risk for sea surface temperature <11 or >17 degrees celsius. The SST of the map comes from the NOAA CDR OISST v02r01: Optimum Interpolation Sea Surface Temperature dataset. "
                          , classification: { title : "A.Catenella risk classes - NOAA Sea ", classColors : sstClass.CLASS_COLORS , classNames : sstClass.CLASS_NAMES}
};
var ACATENELLA_GCOM = { name : "A. catenella Risk Map GCOM-C SST",  start : "2020-01-01", monthly: false, period : 2, pixelSize: "5000", url:"https://developers.google.com/earth-engine/datasets/catalog/JAXA_GCOM-C_L3_OCEAN_SST_V2", info:"This maps shows the risk of A. Catenella blooming by classifying the Sea Surface Temperature (SST) in 4 classes. High Risk for waters with SST between 13 and 15 degress. Moderate risk for waters with SST between 11-13 and 15-17 degrees and low risk for sea surface temperature <11 or >17 degrees celsius. The SST of the map comes from the JAXA GCOM-C - SGLI L3 Sea Surface Temperature (V2) dataset. "
                          , classification: { title : "A.Catenella risk classes", classColors : sstClass.CLASS_COLORS , classNames : sstClass.CLASS_NAMES}  
};
var SENTINEL_2_dNBR = { name : "Burn Severity (dNRB) Sentinel2", period : 2, start : "2015-06-23", pixelSize: "10",  url:"https://un-spider.org/advisory-support/recommended-practices/recommended-practice-burn-severity/in-detail/normalized-burn-ratio", info:"Sentinel-2 derived Burn Severity (dNBR) map.The difference between the pre-fire and post-fire NBR obtained from the images is used to calculate the delta NBR (dNBR or ∆NBR), which then can be used to estimate the burn severity. A higher value of dNBR indicates more severe damage, while areas with negative dNBR values may indicate regrowth following a fire. The formula used to calculate dNBR is illustrated below: dNBR values can vary from case to case, and so, if possible, interpretation in specific instances should also be carried out through field assessment; in order to obtain the best results. However, the United States Geological Survey (USGS) proposed a classification table to interpret the burn severit"
                          , classification: { title : "Burn Severity", 
                          classColors : ["778835",                              "a7c050",                             "c9c9c9",   "f8fc11",       "f8b140" ,              "f8671a",                   "a600d4"] , 
                          classNames : [ "Enhanced Regrowth, high (post-fire)", "Enhanced Regrowth, low (post-fire)", "Unburned", "Low Severity", "Moderate-Low Severity", "Moderate-High Severity" , "High Severity"], 
                          classValues : [0,1,2,3,4,5,6], 
                          classValuesThresholds : [-0.251, -0.1, 0.1, 0.27, 0.44, 0.66, 1.3] }    
};
var selectionSource = [];
var selectionDate = [];
var selectionMap = [];
var pnlWelcome;
var leftMap;
var rightMap;
var preselected_geometry;
var selectPredefinedArea;
//------------------------------------------------------------------------------------------------------------------------------ 
// START OF THE CODE THAT YOU NEED TO CHANGE IN ORDER TO CUSTOMIZE THE AREAS OF INTEREST
var NO_SELECTION = "SHOWCASES - Choose an example of how to use the imagery comparison tool";
var DEFAULT_AREA = "Spain - Jubrique Burn Severity (Sept 2021)"; // This variable must match the name of one of the PREDEFINED_AREAS
// FOLLOW THE SAME STRUCTURE AND YOU SHOULD BE FINE
// THIS IS AN ARRARY OF JAVASCRIPT OBJECTS. [ { name:XXXX, } ]
var PREDEFINED_AREAS = [
  {
    name : "Italy - Po Valley flooding 2023",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [11.8922,44.5673],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 11,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIOdNS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2023-05-11"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2023-05-23"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Mauritius - MV Wakashio Oil Spill 2020",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [57.742,-20.437],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 15,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_NATURAL,                             // IMAGERY TO SHOW, OPTIOdNS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-08-01"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_NATURAL,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-08-05"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : DEFAULT_AREA,  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [-5.180,36.505],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 13,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_20,                             // IMAGERY TO SHOW, OPTIOdNS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2021-8-19"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_dNBR,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2021-9-18"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Uzbekistan - Sardoba Dam Collapse 01-05-2020",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [68.4903,  40.416],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 11,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIOdNS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-4-30"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-05-03"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Italy - COVID19 Pollution Impact",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [9.67,  45.69],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 6,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-01-20"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-03-18"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "China - COVID19 Pollution Impact",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [114.313,  30.564],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 6,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2020-01-16"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_5_NO2,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2020-03-10"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "Bahamas - Hurricane Dorian",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [-77.09866,  26.42997],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 13,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-08-16"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-09-05"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "Kazakhstan - Arys Weapon depot explosion",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [68.792405, 42.468870],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 15,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_NATURAL,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-06-19"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-06-24"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },{
    name : "Spain - L'Ametlla de Mar fire",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [0.698953, 40.915],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 15,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE ,SENTINEL_5_NO2N2O
        date :  "2019-06-10"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-06-20"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Mozambique - Beira floodings Cyclone Idai",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [34.66,-19.75],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 10,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-02-18"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-03-19"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Iran - Ahvaz floodings 2019",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [ 48.67061, 31.3183],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 11,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-02-24"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_1,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-04-06"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
    {
    name : "Iran - Aq Qala floodings 2019",  // THE NAME THAT IS SHOWN ON THE SELECTION FIELD
      location : [ 54.45063, 37.01413],                         // THE COORDINATES TO ZOOM INTO
      zoomLevel : 12,                                    // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                         // BEFORE THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date :  "2019-03-06"                             // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : SENTINEL_2_FALSE_10,                             // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        date : "2019-04-05"                              // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    },
  {
    name : "India - Punjab crop burning",
    location : [76.32,29.93],
    zoomLevel : 13,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2018-10-02")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-10-22") 
    }
  },
  {
    name : "Nicaragua - Incendio Indio Maiz",
    location : [ -83.8225058, 10.9968084, ],
    zoomLevel : 12,
    before : {
      source : BURNED_AREA,
      date :  new Date ("2018-04-17")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-04-26") 
    }
  },
  {
    name : "Australia - Bunyip State Park fire",
    location : [ 145.67, -37.99 ],
    zoomLevel : 14,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2019-03-02")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-03-25") 
    }
  },
  {
    name : "USA - Mendocino Complex Fire",
    location : [ -122.777, 39.2 ],
    zoomLevel : 11,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2018-07-30")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-09-02") 
    }
  },
  {
    name : "Indonesia - Anak Krakatau Tsunami - Radar",
    location : [105.4216,  -6.099938  ],
    zoomLevel : 15,
    before : {
      source : SENTINEL_1,
      date :  new Date ("2018-11-04")
    },
    after : {
      source : SENTINEL_2_NATURAL,
      date : new Date ("2019-03-24") 
    }
  },
    {
    name : "Indonesia - Anak Krakatau Tsunami - Optical - Green lava",
    location : [105.4216,  -6.099938  ],
    zoomLevel : 13,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2018-09-20")
    },
    after : {
      source : SENTINEL_2_FALSE_20,
      date : new Date ("2019-04-03") 
    }
  },
  {
    name : "Chile - Carahue incendio forestal/pastizales",
    location : [-72.9857,  -38.6621  ],
    zoomLevel : 11,
    before : {
      source : LANDSAT_8_FALSE,
      date :  new Date ("2019-01-23")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-02-28") 
    }
  },
  {
    name : "Brazil - Landslide Minas Gerais",
    location : [-44.12315,  -20.1238  ],
    zoomLevel : 16,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2018-12-23")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-02-26") 
    }
  },
  {
    name : "Panama - Ships waiting to enter",
    location : [-79.54512,    8.912825 ],
    zoomLevel : 14,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2019-03-21")
    },
    after : {
      source : SENTINEL_1,
      date : new Date ("2019-03-20") 
    }
  },
  {
    name : "Italy - Monte Etna eruption",
    location : [14.606608103048758,38.43404221617094],
    zoomLevel : 6,
    before : {
      source : SENTINEL_5_SO2,
      date :  new Date ("2021-2-22")
    },
    after : {
      source : SENTINEL_5_SO2,
      date : new Date ("2021-2-24") 
    }
  }
];
//------------------------------------------------------------------------------------------------------------------------------ 
// END OF THE CODE THAT YOU NEED TO CHANGE IN ORDER TO CUSTOMIZE TO THE 
//------------------------------------------------------------------------------------------------------------------------------ 
var getCountriesOutline = function(){
  if( countryOutlineImage )
    return countryOutlineImage;
  else{
    // Define an empty image to paint features to.
    var empty = ee.Image().byte();
    var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
    // Paint country feature edges to the empty image.
    countryOutlineImage = empty
      .paint({featureCollection: countries, color: 1, width: 1})
      // Convert to an RGB visualization image; set line color to black.
      .visualize({palette: '0f0f0f'});
    return countryOutlineImage;
  }
};
function getSentinel1Imagery(range){
  var polarization = 'VV';
	  return ee.ImageCollection('COPERNICUS/S1_GRD')
	                      .filterDate(range[0], range[1])
	                      .filter(ee.Filter.listContains(
	                          'transmitterReceiverPolarisation', polarization))
	                      //.filter(ee.Filter.eq('instrumentMode', 'IW'))
	                      .select(polarization) ;
}
function getSentinel1Composite(range) {
  // Only include the VV polarization, for consistent compositing.
    var sentinel1 = getSentinel1Imagery(range).mean();
    return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']}).set( "FROM", range[0], "TO", range[1] , "TYPE" , SENTINEL_1.name );
	/*
  var sentinel1 = getSentinel1ImageryAndreas(range, ee.Geometry( Map.getCenter()) ).median().unmask().select(['VV', 'VH', 'VVVH_ratio']);
  return sentinel1.visualize({min: [-20, -25, 1], max: [0, -5, 15]}).set( "FROM", range[0], "TO", range[1] , "TYPE" , SENTINEL_1.name );
  */
}
function getSentinel2Images(range, cloudOriginal, geometry, maskCloudPixels ){
   return s2.getSentinel2MergedImages( range, cloudOriginal, geometry, maskCloudPixels );
}
function getSentinel2Composite(range, imageType) {
    var sentinel2 = getSentinel2Images(range ).median();
    // Natural Color
    var viz = {min: 300,  max: 3500,  bands: ['B4', 'B3', 'B2']};
    if( imageType === SENTINEL_2_FALSE_20.name ){
      viz = {bands:['B8','B11','B4'], min: 300, max:3500};
    }else  if( imageType ===  SENTINEL_2_FALSE_10.name ){
      viz = {bands:['B8','B4' , 'B3' ],min:300, max:3000};
    }
    return sentinel2.visualize( viz ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
var getIndexImage =  function(image, classColor, classValues, typeSld ){
  // type might be "intervals" (default), "ramp" or "values" 
  // see explanation here : http://docs.geoserver.org/stable/en/user/styling/sld/reference/rastersymbolizer.html
  var generateSldStyle = function(classColors, classValues, type){ 
    var sldStyle = '<RasterSymbolizer><ColorMap  type="'+type+'" extended="true" >';
    // Exporting properties to the asset only works if the values are Strings or Numbers  
    for(var z =0;z<classColors.length; z++){
      sldStyle += '<ColorMapEntry color="#' + classColors[z] + '" quantity="' + classValues[z] + '" label="'+ z +'"/>';
    }
    sldStyle +='</ColorMap></RasterSymbolizer>';
    return sldStyle;
  };
  return ee.Image( image ).sldStyle( generateSldStyle( classColor, classValues, typeSld )  );
};
var getNdviImage = function(image){
  var ndvi = image.normalizedDifference( [  "nir", "red" ]);
  return getIndexImage( ndvi, ndviPaletteColors, ndviClassValues, "ramp");
};
var getNdmiImage = function(image){
  var ndmi = image.normalizedDifference( [  "nir", "swir1" ]);
  return getIndexImage( ndmi, ndmiPaletteColors, ndmiClassValues, "ramp");
};
function getSentinel2CompositeNDVI(range, imageType) {
  var sentinel2 = getSentinel2Images(range, null, null, true ).median();
  return getNdviImage( sentinel2 ).blend( getCountriesOutline() ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
function getSentinel2CompositeNDMI(range, imageType) {
  var sentinel2 = getSentinel2Images(range, null, null, true ).median();
  return getNdmiImage( sentinel2 ).blend( getCountriesOutline() ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
var showdNBRDates = function( controlPanel, point, timeLabel ){
  var dateLeft  =  new Date( selectionDate[0].getValue()[0] );
  var dateRight  =  new Date( selectionDate[1].getValue()[0] );
  var beforeRange = selectionDate[0].getValue();
  var afterRange = selectionDate[1].getValue();
  if( dateLeft > dateRight ){ // if the left pane date is after the right pane, change order
    beforeRange = selectionDate[1].getValue();
    afterRange = selectionDate[0].getValue();
  }
  var nbrBefore =  getSentinel2Images( beforeRange ).filterBounds( point );
  var nbrAfter =  getSentinel2Images(  afterRange ).filterBounds( point );
  nbrBefore.first().get("system:time_start").evaluate(
     function(time1){
          nbrAfter.first().get("system:time_start").evaluate(
             function(time2){
                  var text =  "Burn Severity (dNRB) " +new Date( time1 ).toUTCString() + " / " +  new Date(time2 ).toUTCString();
                  showImageDate( null, controlPanel, timeLabel, text );
             }
          );
     }
  );
};
function getDynamicWorld(range){
  var dw = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1").filterDate(range[0], range[1]);
	var classification = dw.select("label");
	var dwComposite = classification.reduce(ee.Reducer.mode());
	return dwComposite.visualize({ palette: dwClassColors, min:0, max:8 });
}
function getSentinel2DifferenceNBR(){
  var dateLeft  =  new Date( selectionDate[0].getValue()[0] );
  var dateRight  =  new Date( selectionDate[1].getValue()[0] );
  var beforeRange = selectionDate[0].getValue();
  var afterRange = selectionDate[1].getValue();
  if( dateLeft > dateRight ){ // if the left pane date is after the right pane, change order
    beforeRange = selectionDate[1].getValue();
    afterRange = selectionDate[0].getValue();
  }
  var nbrBefore =  getSentinel2Images( beforeRange , null, null, true ).median().normalizedDifference( [  "nir", "swir1" ]);
  var nbrAfter =  getSentinel2Images(  afterRange , null, null, true ).median().normalizedDifference( [  "nir", "swir1" ]);
  var dNBR = nbrBefore.subtract( nbrAfter ).rename("dNBR"); // perform difference NBR equation
  dNBR = dNBR.expression(
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[0] + "?"+SENTINEL_2_dNBR.classification.classValues[0]  +':'+
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[1] + "?"+SENTINEL_2_dNBR.classification.classValues[1]  +':'+
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[2] + "?"+SENTINEL_2_dNBR.classification.classValues[2]  +':'+
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[3] + "?"+SENTINEL_2_dNBR.classification.classValues[3]  +':'+
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[4] + "?"+SENTINEL_2_dNBR.classification.classValues[4]  +':'+
         'dNBR<' + SENTINEL_2_dNBR.classification.classValuesThresholds[5] + "?"+SENTINEL_2_dNBR.classification.classValues[5]  +':'+
         SENTINEL_2_dNBR.classification.classValues[6], // Default no-risk
      {
        'dNBR': dNBR.select( "dNBR" ),
      })
	.set( "system:time_start", nbrAfter.get("system:time_start") );
	dNBR = dNBR.visualize( {palette : SENTINEL_2_dNBR.classification.classColors }).set(  "TYPE" , SENTINEL_2_dNBR.name );
  return dNBR.updateMask( nbrBefore.mask() ).updateMask( nbrAfter.mask() );
}
function getModisBurnedArea(range) {
  var date = ee.Date(range[0]);
  var month = date.get('month');
  var year = date.get('year');
  var burned = ee.ImageCollection('MODIS/006/MCD64A1')
                      .filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).max().gt(0)
                      ;
  var viz = {min: 0 ,  max: 1 , palette : ['white', 'red'],  bands: ['BurnDate'] };
  return burned.visualize( viz );
}
function getSentinel5NO2Composite(range, imageType) {
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .select('NO2_column_number_density')
                      .filterDate(range[0], range[1])
                      .mean();
  var viz = {    min: 0.00005, max: 0.0002,  opacity: 0.8,  palette: no2PaletteColors };
  sentinel5 = sentinel5.mask( sentinel5.gt( 0.00005) );
  return sentinel5.visualize( viz ).blend( getCountriesOutline() ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
function getSentinel5SO2Composite(range, imageType) {
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
                      .select('SO2_column_number_density')
                      .filterDate(range[0], range[1])
                      .max();
  var viz = {    min: 0.000005, max: 0.02,  opacity: 0.8,  palette: so2PaletteColors };
  sentinel5 = sentinel5.mask( sentinel5.gt( 0.000005) );
  return sentinel5.visualize( viz ).blend( getCountriesOutline() ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
function getLandsat8Imagery(range) {
    return ee.ImageCollection('LANDSAT/LC08/C02/T1_RT').filter( ee.Filter.date( range[0], range[1] )); // Landsat-8 Surface Reflectance
}
function getLandsat9Imagery(range) {
    return ee.ImageCollection('LANDSAT/LC09/C02/T1').filter( ee.Filter.date( range[0], range[1] )); // Landsat-9 Surface Reflectance
}
function getLandsat7Imagery(range){
  return ee.ImageCollection('LANDSAT/LE07/C02/T1_RT').filterDate( range[0], range[1] );
}
// Applies scaling factors. FOR Surface Reflectance products, not used now in this script!!
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  return image.addBands(opticalBands, null, true);
}
var maxVizLandsat = 20000;
var minVizLandsat = 6300;
function getLandsat8(range, imageType) {
  var viz = {  min: minVizLandsat, max: maxVizLandsat, bands : ['B4', 'B3', 'B2']  };
  if( imageType === LANDSAT_8_FALSE.name ){
    viz = {bands:['B5','B6','B4'],min: minVizLandsat , max:maxVizLandsat};
  }
  var landsat8 =  getLandsat8Imagery(range).mean()  ;
  return landsat8.visualize(  viz ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
function getLandsat9(range, imageType) {
  var viz = {  min: minVizLandsat, max: maxVizLandsat, bands : ['B4', 'B3', 'B2']  };
  if( imageType === LANDSAT_9_FALSE.name ){
    viz = {bands:['B5','B6','B4'],min:minVizLandsat, max:maxVizLandsat};
  }
  var landsat9 =  getLandsat9Imagery(range).mean()  ;
  return landsat9.visualize(  viz ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
function getLandsat7(range, imageType) {
  var bands = ['B3', 'B2', 'B1'];
  if( imageType === LANDSAT_7_FALSE.name ){
    bands = ['B4','B5','B3'];
  }
  var landsat7 =  getLandsat7Imagery(range)
                      .mean();
  return landsat7.visualize(  { 
    bands : bands,
    min: 20,
    max:90,
  } ).set( "FROM", range[0], "TO", range[1] , "TYPE" , imageType );
}
// type one of NOAA or GCOM
var getSST = function(range, type ){
  //print( "SST", range[0], range[1], type )
  return  sstClass.getTempImage( range[0], range[1], type);
};
// type one of NOAA or GCOM
var getACatenellaRisk = function( range, type ){
    //print( "CATTENELLA", range[0], range[1], type )
    return  sstClass.getCatenellaRiskImage( range[0], range[1], type);
};
function getNightLights(range) {
  var date = ee.Date(range[0]);
  var month = date.get('month');
  var year = date.get('year');
  var nightlights = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG").filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).mean();
  var viz = {"opacity":1,"bands":["avg_rad"],"min":1,"max":30,"palette":["181801","f3f509"]};
  return nightlights.visualize( viz ).blend( getCountriesOutline() );
}
function updatePeriod( dateSlider, source ) {
  /*
  print( "Updating with source", source )
  print( "Updating with previous range", dateSlider.getPeriod() )
  print( "Updating with previous start", dateSlider.getStart() )
  print( "Updating with previous end", dateSlider.getEnd() )
  try{ 
    if( source.monthly) {
      var start = dateSlider.getValue()[0];
      var dt = new Date( start );
      var startOfMonth = new Date( dt.getFullYear(), dt.getMonth(),2);
      dateSlider= dateSlider.setValue( startOfMonth, false );
    }
    //print("SOURCE ... could be a problem, check", source )
    //print("dateSlider ... could be a problem, check", dateSlider.getValue() )
    dateSlider.setPeriod( source.period );
    dateSlider.setStart( source.start );
  print( "NEW range", dateSlider.getPeriod() )
  print( "NEW start", dateSlider.getStart() )
  print( "NEW end", dateSlider.getEnd() )
  }catch(error){
    print( "Error setting dateslider period", error.message );
    print( "SOURCEE" , source )
    print( "dateSlider" , dateSlider.getValue() )
  }
  try{ 
    if( source.end ){
      dateSlider.setEnd( source.end );
    }else{
      dateSlider.setEnd( getYesterday() );
    }
  }catch(error){
    print( "Error setting end of period", error.message );
  }*/
}
function getImageryObjectByName(source ){
  var obj;
  switch( source ){
    case SENTINEL_1.name:
      return SENTINEL_1;
    case SENTINEL_2_NATURAL.name:
      return SENTINEL_2_NATURAL;
    case SENTINEL_2_FALSE_20.name:
      return SENTINEL_2_FALSE_20;
    case SENTINEL_2_FALSE_10.name:
      return SENTINEL_2_FALSE_10;
    case SENTINEL_2_NDVI.name:
      return SENTINEL_2_NDVI;
    case SENTINEL_2_NDMI.name:
      return SENTINEL_2_NDMI;
    case SENTINEL_2_DYNAMIC_WORLD.name:
      return SENTINEL_2_DYNAMIC_WORLD;
    case SENTINEL_2_dNBR.name:
      return SENTINEL_2_dNBR;
    case LANDSAT_8_NATURAL.name:
      return LANDSAT_8_NATURAL;
    case LANDSAT_8_FALSE.name:
      return LANDSAT_8_FALSE;
    case LANDSAT_9_NATURAL.name:
      return LANDSAT_9_NATURAL;
    case LANDSAT_9_FALSE.name:
      return LANDSAT_9_FALSE;
    case LANDSAT_7_NATURAL.name:
      return LANDSAT_7_NATURAL;
    case LANDSAT_7_FALSE.name:
      return LANDSAT_7_FALSE;
    case SENTINEL_5_NO2.name:
      return SENTINEL_5_NO2;
    case SENTINEL_5_SO2.name:
      return SENTINEL_5_SO2;
    case BURNED_AREA.name:
      return BURNED_AREA;
   case SST_NOAA.name:
      return SST_NOAA;
    case SST_GCOM.name:
      return SST_GCOM;
    case ACATENELLA_NOAA.name:
      return ACATENELLA_NOAA;
    case ACATENELLA_GCOM.name:
      return ACATENELLA_GCOM;
    case NIGHTLIGHTS.name:
      return NIGHTLIGHTS;
    default:
      misc.showMessage("ERROR", "No imagery found for " + source);
  }
  return null;
}
function updatePeriodInSlider(source, dateSlider ){
  var range = dateSlider.getValue();
  var imageryObject = getImageryObjectByName(source );
  updatePeriod( dateSlider, imageryObject );
}
function getSingleImage(source, dateSlider ){
  var range = dateSlider.getValue();
  switch( source ){
    case SENTINEL_1.name:
      return getSentinel1Composite(range);
    case SENTINEL_2_NATURAL.name:
    case SENTINEL_2_FALSE_20.name:
    case SENTINEL_2_FALSE_10.name:
    case SENTINEL_2_NDVI.name:
    case SENTINEL_2_NDMI.name:
      return getSentinel2Composite(range, source);
    case SENTINEL_2_DYNAMIC_WORLD.name:
      return getDynamicWorld(range);
    case SENTINEL_2_dNBR.name:
      return getSentinel2DifferenceNBR();
    case LANDSAT_8_NATURAL.name:
    case LANDSAT_8_FALSE.name:
      return getLandsat8(range, source);
    case LANDSAT_9_NATURAL.name:
    case LANDSAT_9_FALSE.name:
      return getLandsat9(range, source);
    case LANDSAT_7_NATURAL.name:
    case LANDSAT_7_FALSE.name:
      return getLandsat7(range, source);
    case SENTINEL_5_NO2.name:
      return getSentinel5NO2Composite(range, source);
    case SENTINEL_5_SO2.name:
      return getSentinel5SO2Composite(range, source);
    case BURNED_AREA.name:
      return getModisBurnedArea(range);
    case SST_NOAA.name:
      return getSST(range, sstClass.NOAA );
    case SST_GCOM.name:
      return getSST(range, sstClass.GCOM );
    case ACATENELLA_NOAA.name:
      return getACatenellaRisk(range, sstClass.NOAA );
    case ACATENELLA_GCOM.name:
      return getACatenellaRisk(range, sstClass.GCOM );
    case NIGHTLIGHTS.name:
      return getNightLights(range);
    default:
      misc.showMessage("ERROR getting image", "No imagery found for " + source);
  }
  // For BASEMAP
  return null;
}
/*
 * Set up the maps and control widgets
 */
function getYesterday() {
  var today = new Date();
  var prevDay = ee.Date(today).advance(1, "day");
  return prevDay; // 
}
function getLastWeek() {
  var today = new Date();
  var prevWeek = ee.Date(today).advance(-7, "day");
  return prevWeek; // 
}
function getThumbUrl(image, map){
  return ee.Image( image ).getThumbURL({
    params : {
      region : map.getBounds( true ), 
      scale : map.getScale(),
      format:"png"
    }
  });
}
function getRawGeoTiffUrl(image, map){
  /*
  var region =  ee.Geometry( map.getBounds( true ) );
  image = ee.Image( image ).clip( region ).reproject( "EPSG:4326")
  var bestFit = require('users/openforisinitiative/EarthMap:Utils/CalculateBestFitScale');
	var scale = bestFit.calculateBestFit(region, image, 31.7);
	print( "SCALE", scale)
  return ee.Image( image ).getDownloadURL({
    params : {
      name : "DownloadedFromImageryCompare",
      scale : scale,
      filePerBand : false,
      region: region
    }
  });
  */
  return ee.Image( image ).getDownloadURL({
    params : {
      name : "DownloadedFromImageryCompare",
      region : map.getBounds( true ), 
      scale : map.getScale(),
      filePerBand : false
    }
  });
}
function updateMapFinal( selectSource, dateSlider, map ){
   try{
      var source = selectSource.getValue();
      var image = getSingleImage(source, dateSlider  );
      var imageMap = ui.Map.Layer( image );
    }catch(error){
      print("Error adding image to map")
      print( error.message )
    }
    try{
      hideImageDates();
    }catch(error){
      print("Error hiding message")
      print(error.message )
    }
    try{
      if( preselected_geometry ){
        if(map.layers().length()>1){
          map.layers().set(0, imageMap); // For cases when here is a polygon loaded on the window
        }else{
          map.layers().insert(0, imageMap); // When the polygon is loaded but there is no maps shown previously
        }
      }else{
        map.layers().set(0, imageMap);
      }
    }catch(error){
      print("Error setting image")
      print(error.message )
    }
    }
// This function changes the given map to show the selected image.
function updateMap( selectSource, dateSlider, map ) {
  try{
    ui.util.debounce(
      updateMapFinal( selectSource, dateSlider, map ),
      200,
      map);
  }catch(error){
    print("Error debouncing", error)
    print( error.message )
  }
}
function getObjectSelected( selectedArea ){
  for (var i = 0; i < PREDEFINED_AREAS.length; i++){
    var obj = PREDEFINED_AREAS[i];
    if ( obj.name === selectedArea )
      return obj;
  }
  return null;
}
function setArea( selectedArea ){
  selectPredefinedArea.setValue( selectedArea, true );
}
function getURLObject(){
  var center = leftMap.getCenter().coordinates();
  var beforeDate  =  new Date( selectionDate[0].getValue()[1] ); // Get the end date of the range
  beforeDate.setDate(beforeDate.getDate() - 1); // subtract 1 to make sure we load the right image in both Crome and Firefox
  var afterDate  =  new Date( selectionDate[1].getValue()[1] );// Get the end date of the range
  afterDate.setDate(afterDate.getDate() - 1); // subtract 1 to make sure we load the right image in both Crome and Firefox
  return {
      location : center.getInfo(),                       // THE COORDINATES TO ZOOM INTO
      zoomLevel : leftMap.getZoom(),                        // THE ZOOM LEVEL - MINIUM IS 1, MAXIMUM ZOOM LEVEL IS 18
      before : {                                        // BEFORE THE EVENT
        source : {
          name : selectionSource[0].getValue()          // IMAGERY TO SHOW, OPTIOdNS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        },         
        date : beforeDate.getFullYear() + "-" + (beforeDate.getMonth()+1) + "-" + beforeDate.getDate() ,           // DATE FOR THE IMAGERY TO SHOW - BEFORE EVENT  
      },
      after : {                                          // AFTER THE EVENT
        source : {
          name : selectionSource[1].getValue(),          // IMAGERY TO SHOW, OPTIONS : BURNED_AREA , SENTINEL_1 , SENTINEL_2_NATURAL , SENTINEL_2_FALSE_20 , SENTINEL_2_FALSE_10 , LANDSAT_8_NATURAL , LANDSAT_8_FALSE , SENTINEL_5_NO2
        },
        date : afterDate.getFullYear() + "-" + (afterDate.getMonth()+1) + "-" + afterDate.getDate(),             // DATE FOR THE IMAGERY TO SHOW - AFTER EVENT  
      }
    };
}
var printUrlToLabel = function(){
  var url =  "https://earthmap.org/compare.html?selectedArea=" + JSON.stringify( getURLObject() );
  var geoJson = polygonAreas.getDrawnPolygon();
  if( geoJson ){
    url += "&geoJson=" + geoJson.toGeoJSONString();
  }
  misc.showMessage( "Shareable URL generated",
        "You can keep this URL or send it to anyone and they will have the same view as you do right now!",
        "Click to open URL (copy it manually)",
        url,
        leftMap
    );
};
// This is the public function of the class
// you need to set the Map to which the panel must be added, the style of the panel, and if yu want to show area measurement and the download link
var addGetURLButton = function( map, style ){
  var comps = [];
  var getLinkButton = ui.Button({ label : "SHARE LINK ⋮", style : {}, onClick : printUrlToLabel  } );
  comps.push( getLinkButton);
  var btnMoreInfo = ui.Button({
      label: "About...",
      onClick: function () {
          pnlWelcome.style().set({ shown: !pnlWelcome.style().get('shown') });
      },
  });
  comps.push( btnMoreInfo);
  var urlPanel = ui.Panel({ widgets : comps, style : style});
  map.add(  urlPanel );
};
function usePredefinedObject( predefinedObject ){
  try{
    selectionSource[0].setValue( predefinedObject.before.source.name , false);
    selectionSource[1].setValue( predefinedObject.after.source.name , false);
  }catch(error){
    print("error 0", error );
    print(error.message );
  }
  try{
    updatePeriodInSlider( predefinedObject.before.source.name,selectionDate[0] );
    updatePeriodInSlider( predefinedObject.after.source.name,selectionDate[1] );
  }catch(error){
    print("error 1 ", error );
    print(error.message );
  }
  try{
    selectionDate[0].setValue( predefinedObject.before.date , false);
    selectionDate[1].setValue( predefinedObject.after.date , false);
  }catch(error){
    print("error 2", error );
    print(error.message );
  }
    //selectionDate[0].setPeriod( predefinedObject.before.source.period );
    //selectionDate[1].setPeriod( predefinedObject.after.source.period );
  try{
    selectionMap[0].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
    selectionMap[1].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
  }catch(error){
    print("error 3 ", error );
    print(error.message );
  }
  try{
    updateMap(selectionSource[0], selectionDate[0], selectionMap[0] );
    updateMap(selectionSource[1], selectionDate[1], selectionMap[1]  );
  }catch(error){
    print("error 4", error );
    print(error.message );
  }
}
function updateSelection( selectedArea ) {
  var predefinedObject = getObjectSelected( selectedArea );
  if(predefinedObject ){
    usePredefinedObject( predefinedObject );
  }
}
function addSelectPredefinedAreas(mapToChange, position){
  function getPredefinedAreas(){
    var arr =[ NO_SELECTION ];
    for (var i = 0; i < PREDEFINED_AREAS.length; i++){
      var obj = PREDEFINED_AREAS[i];
      arr.push( obj.name  );
    }
    return( arr );
  }
  selectPredefinedArea = ui.Select({
        placeholder : "Choose predefined area/date",
        items: getPredefinedAreas(),
        onChange : updateSelection,
        style: {position: position, width : "220px"}
  });
  selectPredefinedArea.setValue( NO_SELECTION, false );
  mapToChange.add(selectPredefinedArea);
}
var showUrlForDownload = function(img, mapToChange){
  var url =  getThumbUrl(img, mapToChange ); 
  var url2 = getRawGeoTiffUrl(img, mapToChange ); 
  misc.showMessage( "⇣  Download imagery ⇣",
        "",
        "Click to download PNG Image",
        url,
        mapToChange,
        "Click to download as GeoTIFF",
        url2
    );
};
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, position) {
  var context = "Context";
  // This function changes the given map to show the selected image.
  function updateMapLocal(selection) {
        updatePeriodInSlider( selectSource.getValue(), dateSlider );
        updateMap(selectSource, dateSlider, mapToChange );
  }
  var selectSource = ui.Select({
        placeholder : "Select Satellite Imagery and Date",
        items:[BASEMAP.name, SENTINEL_1.name,SENTINEL_2_NATURAL.name, SENTINEL_2_FALSE_20.name, SENTINEL_2_FALSE_10.name, SENTINEL_2_NDVI.name, SENTINEL_2_NDMI.name, SENTINEL_2_dNBR.name, SENTINEL_2_DYNAMIC_WORLD.name,
        LANDSAT_8_NATURAL.name,LANDSAT_8_FALSE.name, LANDSAT_9_NATURAL.name,LANDSAT_9_FALSE.name,BURNED_AREA.name ,NIGHTLIGHTS.name ,LANDSAT_7_NATURAL.name,LANDSAT_7_FALSE.name,SENTINEL_5_NO2.name,SENTINEL_5_SO2.name, 
        SST_GCOM.name,SST_NOAA.name, ACATENELLA_GCOM.name, ACATENELLA_NOAA.name
        ],
        onChange : updateMapLocal
  });
  selectionSource.push( selectSource );
  var dateSlider = ui.DateSlider({
    start : "2000-01-01",
    end : Date.now(),
    period: 2,
    onChange : updateMapLocal });
  selectionDate.push( dateSlider );
  var buttonDownload = new ui.Button({ 
    label : "⇣ Download Image ⇣" , 
    onClick : function(){ 
      var img = mapToChange.layers().get(0).getEeObject();
      showUrlForDownload(img, mapToChange);
    }
  });
  var infoButton = ui.Button({
    label : "ⓘ  Legend" , 
    onClick : function(){ 
      var imagery = getImageryObjectByName(selectSource.getValue());
      var compsMsg = [];
      var blob1 = ui.Label(imagery.info , {  fontSize:"14px" , padding : "10px"});
      compsMsg.push( blob1 );
      if( imagery.palette ){
        var legend = misc.makeLegend( imagery.palette.palette, imagery.palette.min, imagery.palette.med, imagery.palette.max  );
        var legendLabel = ui.Label( imagery.palette.label , {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
        compsMsg.push( legendLabel );
        compsMsg.push( legend );
      }
      if( imagery.classification ){
        compsMsg.push( misc.makeLegendForClassification( imagery.classification.title, imagery.classification.classColors, imagery.classification.classNames ) );
      }
      var availableText = "Available from " + imagery.start;
      if( imagery.end ){
        availableText = availableText + " until " + imagery.end;
      }else{
        if( imagery.monthly ){
          availableText = availableText + " until present ( ∼2 months delay for generation and ingestion )";
        }else{
          availableText = availableText + " until present ( ∼3 days delay for ingestion )";
        }
      }
      compsMsg.push( ui.Label( availableText  , {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'}) );       
      var periodicity;
      if( imagery.monthly ){
        periodicity = ui.Label( "Periodicity : Monhtly Imagery" , {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
      }else{
        periodicity = ui.Label( "Periodicity : " + imagery.period + " days" , {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
      }
      compsMsg.push( periodicity );  
      var scaleLabel = ui.Label( "Pixel size : " + imagery.pixelSize + " m." , {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
      compsMsg.push( scaleLabel ); 
      if( imagery.url ){
        var linkLabel = ui.Label(  "More info about " + imagery.name  , {color:"#144863"}, imagery.url);
        compsMsg.push( linkLabel ); 
      }
      var linkToCodeLabel = ui.Label( "Click to see the GEE App Code " , {color:"#5a0691"}, "https://code.earthengine.google.com/?scriptPath=users%2Fsanchezpauspro%2FApps%3AEmergencyCompare");
      compsMsg.push( linkToCodeLabel ); 
      var msgPanel = ui.Panel(compsMsg);
      misc.showMessagePanel( 
        imagery.name,
        msgPanel,
        mapToChange
      );
    }
  });
  var panelSelectSource = ui.Panel( [selectSource, infoButton], ui.Panel.Layout.flow('horizontal') );
  var controlPanel =
      ui.Panel({widgets: [panelSelectSource, dateSlider, buttonDownload], style: {position: position, width : "280px"}});
  mapToChange.add(controlPanel);
  selectionMap.push( mapToChange );
}
function drawPolygon( geometry, zoomLevel ){
  geometry.type().evaluate( function(type) {
    if( type === "Polygon" ){
      // show the polygon as a non-filled LinarRing so it is easier to see the imagery
      geometry = ee.Geometry.LinearRing( geometry.toGeoJSON().coordinates[0] );
    }
    leftMap.addLayer( geometry, { color: "yellow"} );
    rightMap.addLayer( geometry, { color: "yellow"} );
    if( zoomLevel ){
        if( type == "Point"){
          leftMap.centerObject( geometry, zoomLevel );
          rightMap.centerObject( geometry, zoomLevel );
        }else{
          leftMap.centerObject( geometry, zoomLevel  );
        }
    }
  });
}
var preselectImageryOnGeometry = function(geometry, yearsBack){
    var imageryDates = s2.getGoodSentinel2Images( geometry, 5, yearsBack );
    // if not images with less than 5% cloud cover
    imageryDates = imageryDates || s2.getGoodSentinel2Images( geometry, 15, yearsBack  );
    imageryDates = imageryDates || s2.getGoodSentinel2Images( geometry, 30, yearsBack  );
    selectionSource[0].setValue( SENTINEL_2_FALSE_20.name, false );
    selectionSource[1].setValue( SENTINEL_2_FALSE_20.name, false );
    updatePeriodInSlider( SENTINEL_2_FALSE_20.name,selectionDate[0] );
    updatePeriodInSlider( SENTINEL_2_FALSE_20.name,selectionDate[1] );
    selectionDate[0].setValue( imageryDates[0], false );
    selectionDate[1].setValue( imageryDates[1], false );
    selectionDate[0].setPeriod( SENTINEL_2_FALSE_20.period );
    selectionDate[1].setPeriod( SENTINEL_2_FALSE_20.period );
    updateMap(selectionSource[0], selectionDate[0], selectionMap[0] );
    updateMap(selectionSource[1], selectionDate[1], selectionMap[1]  );
};
var showLoading = function( controlPanel, timeLabel ){
  timeLabel.setValue( "Loading date..." );
  controlPanel.style().set('shown', true);
};
var showImageDate = function( time, controlPanel, timeLabel, labelText ){
  if( time ){
    timeLabel.setValue( ( (new Date(time)).toUTCString() ) );
    controlPanel.style().set('shown', true);
  }else if( labelText ){
    timeLabel.setValue( labelText );
    controlPanel.style().set('shown', true);
  }else{
    controlPanel.style().set('shown', false);
  }
};
var hideImageDates = function(){
  imageDatePanels[0].style().set('shown', false);
  imageDatePanels[1].style().set('shown', false);
};
var imageDatePanels = [];
var addClickListener =  function(map){
  var timeLabel =  ui.Label( "" );
  var controlPanel =
      ui.Panel({widgets: [timeLabel], style: {position: "bottom-center", shown: false}});
  map.add( controlPanel );
  imageDatePanels.push(controlPanel);
  map.onClick( function(click){
    showLoading(controlPanel, timeLabel);
    var point = ee.Geometry.Point([click.lon, click.lat]);
    var image = map.layers();
    image.get(0).getEeObject().evaluate( function(layerImg){
      var type = layerImg.properties.TYPE;
      if( type ){
        var rangeStart = layerImg.properties.FROM;
        var rangeEnd = layerImg.properties.TO;
         switch( type ){
          case SENTINEL_1.name:
            var s1images = getSentinel1Imagery([rangeStart, rangeEnd] ).filterBounds( point );
            var time = s1images.first().get("system:time_start").evaluate(
               function(time){
                  showImageDate( time, controlPanel, timeLabel );
               }
            );
            break;
          case SENTINEL_2_NATURAL.name:
          case SENTINEL_2_FALSE_20.name:
          case SENTINEL_2_FALSE_10.name:
          case SENTINEL_2_NDVI.name:
          case SENTINEL_2_NDMI.name:
          case SENTINEL_2_DYNAMIC_WORLD.name:
            var s2Images = getSentinel2Images( [rangeStart, rangeEnd] ).filterBounds( point );
            var time = s2Images.first().get("system:time_start").evaluate(
               function(time){
                  showImageDate( time, controlPanel, timeLabel );
               }
            );
            break;
          case SENTINEL_2_dNBR.name:
            showdNBRDates( controlPanel, point, timeLabel );
            break;
          case LANDSAT_8_NATURAL.name:
          case LANDSAT_8_FALSE.name:
            var l8Images = getLandsat8Imagery( [rangeStart, rangeEnd] ).filterBounds( point );
            var time = l8Images.first().get("system:time_start").evaluate(
               function(time){
                  showImageDate( time, controlPanel, timeLabel );
               }
            );
            break;
          case LANDSAT_9_NATURAL.name:
          case LANDSAT_9_FALSE.name: 
            var l9Images = getLandsat9Imagery( [rangeStart, rangeEnd] ).filterBounds( point );
            var time = l9Images.first().get("system:time_start").evaluate(
               function(time){
                  showImageDate( time, controlPanel, timeLabel );
               }
            );
            break;  
          case LANDSAT_7_NATURAL.name:
          case LANDSAT_7_FALSE.name:
            var l7Images = getLandsat7Imagery( [rangeStart, rangeEnd] ).filterBounds( point );
            var time = l7Images.first().get("system:time_start").evaluate(
               function(time){
                  showImageDate( time, controlPanel, timeLabel );
               }
            );
            break;
          default:
            print( "Image Type not foud?? bug!" , type );
            controlPanel.style().set('shown', false);
            break;
        }
      }else{
        print( "Type is empty?? bug!" , type );
        controlPanel.style().set('shown', false);
      }
    });
  });
};
var addInfoPanel= function( leftMap){
    pnlWelcome = ui.Panel({
      style: {
          width: '12%'
      },
      widgets: [
          ui.Label({
              value: "The Imagery Compare Tool is a Google Earth Engine App that allows users to easily access Sentinel 1/2/5 and Landsat 7/8 images. The imagery is available from 2000 until as recent as this week. Use the calendar and source selection controls on the bottom corners to choose the imagery, you can zoom anywhere in the world and it will just work! Click on the image to visualize its satellite acquisiton date/time.",
              style: { fontSize: '12px' },
          }),
          ui.Label({
              value:
                  "Try Earth Map - a tool for user-friendly access to Climatic and Natural Resources data!",
              style: { fontSize: '12px' , color:"#0324fc"},
          }).setUrl("https://earthmap.org"),
          ui.Label({
              value:
                  "More info on how to use Earth Map - Imagery Compare tool",
              style: { fontSize: '12px'  , color:"#0324fc" },
          }).setUrl("https://help.earthmap.org/how-to-guides/compare-two-datasets-or-two-contrasting-times-imagery-compare"),
          ui.Label("", { fontSize: '12px' }),
          ui.Label("You can contact us through the support forum", { fontSize: '12px'  , color:"#0324fc"}).setUrl('https://openforis.support/tags/earthmap/'),
          ui.Button({
              label: "Close",
              onClick: function () {
                  pnlWelcome.style().set({ shown: !pnlWelcome.style().get('shown') });
              },
              disabled: false,
              style: {
                  stretch: 'horizontal'
              }
          })
      ]
    });
   // leftMap.add(pnlWelcome);
    var hidePanel = ui.url.get('hidePanel', false);
    pnlWelcome.style().set( {shown: hidePanel?false:true} );
};
var initRightMap = function( addDrawPolygon ){
  rightMap = ui.Map();
  // Create the right map, and have it display layer 1.
  rightMap.setControlVisibility(false);
  var rightSelector = addLayerSelector(rightMap, 'bottom-right');
  rightMap.setOptions('HYBRID');
  rightMap.setControlVisibility({  "zoomControl":true,  "mapTypeControl":false, "layerList":false });
  if( addDrawPolygon){
    var geoJson = ui.url.get('geoJson');
    var preselected_geometry;
    if( geoJson ){
      var obj = JSON.parse(geoJson);
      preselected_geometry = ee.Geometry( obj );  
    }
    polygonAreas.addDrawPolygonButton( rightMap, {position : "top-right"}, true, true, preselected_geometry );
  }
  addClickListener( rightMap );
  return rightMap;
};
var initLetfMap = function( addPreselectedAreas ){
  leftMap = ui.Map();
  leftMap.setOptions('HYBRID');
  leftMap.setControlVisibility({ "zoomControl":true,  "mapTypeControl":false, "layerList":false   });
  var leftSelector = addLayerSelector(leftMap, 'bottom-left');
  if( addPreselectedAreas ){
    addSelectPredefinedAreas( leftMap, 'top-left');
  }
  addGetURLButton(leftMap, {position : "top-left"});
  addClickListener( leftMap );
  return leftMap;
};
var getLeftMap = function(){
  return leftMap;
};
var getRightMap = function(){
  return rightMap;
};
/*
 * Tie everything together
 */
// Create the left map, and have it display layer 0.
// Create a SplitPanel to hold the adjacent, linked maps.
var getSplitPanel = function( addDrawPolygon, addPreselectedAreas){
  initLetfMap( addPreselectedAreas );
  initRightMap (addDrawPolygon);
  var linker = ui.Map.Linker([leftMap, rightMap]);
  return ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
};
var init = function(){
  addInfoPanel( leftMap );
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([pnlWelcome, getSplitPanel( true, true) ]);
  // When everything is loaded focus on the default area
  // FOR TESTING 
  var geoJson = ui.url.get('geoJson');
  //var selectedArea = ui.url.get('selectedArea', '{"location":[67.6828454897514,34.056298878736136],"zoomLevel":11,"before":{"source":{"name":"Sentinel-2 False 10 m (nir-red-green)"},"date":"2021-10-14"},"after":{"source":{"name":"Sentinel-2 False 10 m (nir-red-green)"},"date":"2022-9-23"}}');
  var selectedArea = ui.url.get('selectedArea' );
  if ( geoJson ){
    var zoom = ui.url.get('zoom');
    var obj = JSON.parse(geoJson);
    var preselected_geometry = ee.Geometry( obj );
    drawPolygon( preselected_geometry, zoom );
    if ( selectedArea ){
      usePredefinedObject( JSON.parse(selectedArea) ); 
    }else{
      leftMap.centerObject( preselected_geometry )
      preselectImageryOnGeometry( obj );
    }
  }else{
    if ( selectedArea ){
      usePredefinedObject( JSON.parse(selectedArea) ); 
    }else{
      setArea( DEFAULT_AREA );
    }
  }
};
init();
exports = { 
  getSplitPanel : getSplitPanel , 
  preselectImageryOnGeometry : preselectImageryOnGeometry, 
  usePredefinedObject : usePredefinedObject,
  drawPolygon : drawPolygon, 
  setArea : setArea,
  getLeftMap: getLeftMap,
  getRightMap : getRightMap,
  DEFAULT_AREA : DEFAULT_AREA
};