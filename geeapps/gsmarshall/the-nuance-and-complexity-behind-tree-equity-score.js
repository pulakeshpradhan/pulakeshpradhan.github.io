var manch_sample_results = ui.import && ui.import("manch_sample_results", "table", {
      "id": "users/gsmarshall/urban_greenspace/manch_sample_results"
    }) || ee.FeatureCollection("users/gsmarshall/urban_greenspace/manch_sample_results"),
    nyc_results = ui.import && ui.import("nyc_results", "table", {
      "id": "users/gsmarshall/urban_greenspace/nyc_blockgrp_results"
    }) || ee.FeatureCollection("users/gsmarshall/urban_greenspace/nyc_blockgrp_results"),
    nyc_public_housing = ui.import && ui.import("nyc_public_housing", "table", {
      "id": "users/gsmarshall/urban_greenspace/nyc_public_housing"
    }) || ee.FeatureCollection("users/gsmarshall/urban_greenspace/nyc_public_housing"),
    nyc_tes = ui.import && ui.import("nyc_tes", "table", {
      "id": "users/gsmarshall/urban_greenspace/nyc_tes"
    }) || ee.FeatureCollection("users/gsmarshall/urban_greenspace/nyc_tes"),
    StAlbans = ui.import && ui.import("StAlbans", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.77028999208765,
            40.68939826937494
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "neighborhood": "St. Albans Park"
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-73.77028999208765, 40.68939826937494]),
            {
              "neighborhood": "St. Albans Park",
              "system:index": "0"
            })]),
    Rochdale = ui.import && ui.import("Rochdale", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.77185559475264,
            40.67667691684097
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "neighborhood": "Rochdale"
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-73.77185559475264, 40.67667691684097]),
            {
              "neighborhood": "Rochdale",
              "system:index": "0"
            })]),
    Queensbridge = ui.import && ui.import("Queensbridge", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.94537928602135,
            40.75507162163248
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "name": "Queensbridge"
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-73.94537928602135, 40.75507162163248]),
            {
              "name": "Queensbridge",
              "system:index": "0"
            })]),
    TheaterGarmentDistrict = ui.import && ui.import("TheaterGarmentDistrict", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.98694620487515,
            40.75608303882467
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([-73.98694620487515, 40.75608303882467]),
    BoroughPark = ui.import && ui.import("BoroughPark", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.99695377728027,
            40.6400504448772
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "name": "Borough Park"
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-73.99695377728027, 40.6400504448772]),
            {
              "name": "Borough Park",
              "system:index": "0"
            })]),
    RedHook = ui.import && ui.import("RedHook", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.00603088113918,
            40.67503491483609
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "name": "Red Hook Houses"
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.00603088113918, 40.67503491483609]),
            {
              "name": "Red Hook Houses",
              "system:index": "0"
            })]),
    RedHookComparison = ui.import && ui.import("RedHookComparison", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.96989616129055,
            40.68356188957697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.01208436507012,
            40.671786575724596
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.MultiPoint(
        [[-73.96989616129055, 40.68356188957697],
         [-74.01208436507012, 40.671786575724596]]);
// GEE App: exploring Tree Equity Score in NYC
// creates bivariate maps of four of the components of Tree Equity Score and highlights 3 interesting neighborhoods 
// in NYC where the individual maps add context and nuance to TES
// import tools
var legendTools = require('users/gsmarshall/greenspace_app:bivariate_legend');
var basemap = require('users/gsmarshall/greenspace_app:dark_basemap');
var modules = require('users/gsmarshall/greenspace_app:analysis_modules');
var zachTools = require('users/jhowarth/studentProjects:lst/lstModules.js');
var palettes = require('users/gena/packages:palettes');
// ************************************** define palettes and visualization parameters ************************************
// define breaks for visualization - 3 bins representing low, middle, high values, with the middle bin set as the median +-10% of the data range
var nonwhite_breaks = modules.medianBreaks(nyc_results, 'nonwhite');
var income_breaks = modules.medianBreaks(nyc_results, 'low_income');
var canopy_breaks = modules.medianBreaks(nyc_results, 'est_coverage');
var temp_breaks = modules.medianBreaks(nyc_results, 'mean');
// classify variables for bivariate mapping
var city_class = nyc_results.map(modules.reclass_collection('est_coverage', canopy_breaks.low, canopy_breaks.high, 'mean', temp_breaks.low, temp_breaks.high, 'temp_canopy'))
                            .map(modules.reclass_collection('nonwhite', nonwhite_breaks.low, nonwhite_breaks.high, 'low_income', income_breaks.low, income_breaks.high, 'nonwhite_income'))
                            .map(modules.reclass_collection('est_coverage', canopy_breaks.low, canopy_breaks.high, 'nonwhite', nonwhite_breaks.low, nonwhite_breaks.high, 'canopy_nonwhite'))
                            .map(modules.reclass_collection('nonwhite', nonwhite_breaks.low, nonwhite_breaks.high, 'mean', temp_breaks.low, temp_breaks.high, 'nonwhite_temp'))
                            .map(modules.reclass_collection('low_income', income_breaks.low, income_breaks.high, 'mean', temp_breaks.low, temp_breaks.high, 'low_income_temp'))
                            .map(modules.reclass_collection('est_coverage', canopy_breaks.low, canopy_breaks.high, 'low_income', income_breaks.low, income_breaks.high, 'canopy_income'));
// load raw land surface temp for the study region
var LST = modules.loadLST(nyc_results.geometry().buffer(700));
// set palettes and visualization parameters for each layer
// two bivariate color schemes used for all maps, both taken from Joshua Stevens https://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/
var teal_pink = ['#E8E8E8', '#AFE4E4', '#63C8C9', '#DDB0D9', '#A5ACD7', '#5A97BC', '#BB63B1', '#8A61AF', '#3B4799'];
var nonwhite_palette = [teal_pink[0], teal_pink[1], teal_pink[2]];
var income_palette = [teal_pink[0], teal_pink[3], teal_pink[6]];
var green_pink = ['#F3F3F3', '#C2F0CE', '#8AE1AE', '#EAC5DD', '#9EC5D3', '#7EC5B1', '#E6A2D0', '#BB9FCE', '#7A8EAE'];
var canopy_palette = [green_pink[0], green_pink[1], green_pink[2]];
var temp_class_palette = [green_pink[0], green_pink[3], green_pink[6]];
// palette used on tes website - makes it look like the original, but not a very good color scheme
var tes_og_palette = ['#F59E40', '#E5A24A','#D7A653','#C7A95C','#BAAD64','#ACB16D','#A4B373','#94B77D', '#8ABA83', '#7FBD89', '#70C093'];
var tes_vis = {
  min: 50,
  max: 100,
  palette: palettes.colorbrewer.YlGn[9]
};
var med_income_vis = {
  min: 6400,
  max: 250500,
  palette: ['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']
};
var pop_density_vis = {
  min: 0,
  max: 80000,
  palette: ['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']
};
// LST visualization borrowed from Zach Levitt
var lstPalette = ['#005b7b','#3897bc','#77b1c7','#b4c6cd','#ddb588','#f19a3f','#d6721f','#b13b03','#750401'];
var lstVis = {
  // min and max hardcoded for NYC to speed up rendering, but can adjust using getInfo()
	min: 80, // lst_stats.amin.getInfo(), 
	max: 155, // lst_stats.amax.getInfo(),
	palette: lstPalette
};
// ***************************** set feature styles for each map layer *****************************************
                          // single variable classified 
var city_styled = city_class.map(modules.styleFeatures('mean_class', '444444aa', 0.15, temp_class_palette))
                            .map(modules.styleFeatures('nonwhite_class', '444444aa', 0.15, nonwhite_palette))
                            .map(modules.styleFeatures('low_income_class', '444444aa', 0.15, income_palette))
                            .map(modules.styleFeatures('est_coverage_class', '444444aa', 0.15, canopy_palette))
                          // Bivariate classified
                            .map(modules.styleFeatures('canopy_nonwhite', '444444aa', 0.15, green_pink))
                            .map(modules.styleFeatures('nonwhite_income', '444444aa', 0.15, teal_pink))
                            .map(modules.styleFeatures('temp_canopy', '444444aa', 0.15, green_pink))
                            .map(modules.styleFeatures('nonwhite_temp', '444444aa', 0.15, teal_pink))
                            .map(modules.styleFeatures('low_income_temp', '444444aa', 0.15, teal_pink))
                            .map(modules.styleFeatures('canopy_income', '444444aa', 0.15, green_pink))
                          // single variable continuous
                            .map(modules.styleContinuous('tes', '444444aa', 0.15, tes_vis))
                            .map(modules.styleContinuous('B19013_001', '444444aa', 0.15, med_income_vis))
                          // B19013_001 is median household income - renaming columns is a pain in GEE (maybe write an export function for it...)
                            .map(modules.addPopDensity)
                            .map(modules.styleContinuous('pop_density', '444444aa', 0.15, pop_density_vis)); // B01001_001 is total population
var nyc_tes_styled = nyc_tes.map(modules.styleContinuous('tes', '444444aa', 0.15, tes_vis));
// **************************** App UI *****************************
// initialize layers outside of dictionary to avoid issues accessing values when adding to map
// single var layers
var lst = ui.Map.Layer(LST, lstVis, 'Surface Temp (F)', 0);
var tes_og = ui.Map.Layer(nyc_tes_styled.style({styleProperty: 'tes_style'}), {}, 'Original Tree Equity Score', 0);
var nonwhite = ui.Map.Layer(city_styled.style({styleProperty: 'nonwhite_class_style'}), {}, 'Percent of Population Identifying as Nonwhite', 0);
var low_income = ui.Map.Layer(city_styled.style({styleProperty: 'low_income_class_style'}), {}, 'Percent of Population Reporting Low Income', 0);
var canopy = ui.Map.Layer(city_styled.style({styleProperty: 'est_coverage_class_style'}), {}, 'Classified Canopy Cover',0);
var med_income = ui.Map.Layer(city_styled.style({styleProperty: 'B19013_001_style'}), {}, 'Median Household Income',0);
var pop_density = ui.Map.Layer(city_styled.style({styleProperty: 'pop_density_style'}), {}, 'Population Density',0);
// bivariate layers
var nonwhite_income = ui.Map.Layer(city_styled.style({styleProperty: 'nonwhite_income_style'}), {}, 'Nonwhite Population and Low-Income Population', 0);
var canopy_nonwhite = ui.Map.Layer(city_styled.style({styleProperty: 'canopy_nonwhite_style'}), {}, 'Canopy Cover and Nonwhite Population', 0);
var lst_class = ui.Map.Layer(city_styled.style({styleProperty: 'mean_class_style'}), {}, 'Classified LST',0);
var temp_canopy = ui.Map.Layer(city_styled.style({styleProperty: 'temp_canopy_style'}), {}, 'Canopy Cover and LST',0);
var nonwhite_lst = ui.Map.Layer(city_styled.style({styleProperty: 'nonwhite_temp_style'}), {}, 'Nonwhite Population and LST',0);
var income_lst = ui.Map.Layer(city_styled.style({styleProperty: 'low_income_temp_style'}), {}, 'Low Income Population and LST',0);
var canopy_income = ui.Map.Layer(city_styled.style({styleProperty: 'canopy_income_style'}), {}, 'Canopy Cover and Low Income Population',0);
// build dict of all layers I want to show - link this in some way with a dict containing a legend for each layer
var layers = {
  'Base Map': {},
  // single variable layers
  'Original Tree Equity Score': {
    data: tes_og,
    legend: zachTools.makeGradientLegend(tes_vis, "Tree Equity Score"),
  },
  // tes_newvis: {
  // },
  'Surface Temperature (F)': {
    data: lst,
    legend: zachTools.makeGradientLegend(lstVis, "Land Surface Temp"),
  },
  'Classified Surface Temperature': {
    data: lst_class,
    legend: legendTools.singleVarLegend("Classified LST", temp_class_palette, 'top-right'),
  },
  'Percent Canopy Cover': {
    data: canopy,
    legend: legendTools.singleVarLegend("Percent Canopy Cover", canopy_palette, 'top-right'),
  },
  'Percent of Population Identifying as Nonwhite': {
    data: nonwhite,
    legend: legendTools.singleVarLegend("Percent Nonwhite", nonwhite_palette, 'top-right'),
  },
  'Percent of Population Reporting Low Income': {
    data: low_income,
    legend: legendTools.singleVarLegend("Percent Low Income", income_palette, 'top-right'),
  },
  'Population Density': {
    data: pop_density,
    legend: zachTools.makeGradientLegend(pop_density_vis, "Population Density (people/km^2)"),
  },
  'Median Household Income': {
    data: med_income,
    legend: zachTools.makeGradientLegend(med_income_vis, "Median Household Income"),
  },
  // bivariate layers
  'Canopy Cover and LST': {
    data: temp_canopy,
    legend: legendTools.bivarLegend("LST and Canopy Cover", green_pink, '% Canopy Cover', 'Mean LST', 'top-left'),
  },
  'Canopy Cover and Low Income Population': {
    data: canopy_income,
    legend: legendTools.bivarLegend("Canopy Cover and Low Income Population", green_pink, '% Canopy Cover', '% Low Income Population', 'top-left'),
  },
  'Nonwhite Population and LST': {
    data: nonwhite_lst,
    legend: legendTools.bivarLegend("Nonwhite Population and LST", teal_pink, '% Nonwhite Population', 'Mean LST', 'top-left'),
  },
  'Canopy Cover and Nonwhite Population': {
    data: canopy_nonwhite,
    legend: legendTools.bivarLegend("Canopy Cover and Nonwhite Population", green_pink, '% Canopy Cover', '% Nonwhite Population', 'top-left'),
  },
  'Nonwhite Population and Low-Income Population': {
    data: nonwhite_income,
    legend: legendTools.bivarLegend("Nonwhite Population and Low-Income Population", teal_pink, '% Nonwhite Population', '%Low Income Population', 'top-left'),
  },
  'Low Income Population and LST': {
    data: income_lst,
    legend: legendTools.bivarLegend("Canopy Cover and Nonwhite Population", green_pink, '% Canopy Cover', '% Nonwhite Population', 'top-left'),
  }
};
// Structure of UI code adapted from Jeff Howarth
// **************************** create styling dictionaries to control text and ui styles *********************************
var labelMaster = {
  font: 
    {
      sans: 'Helvetica, sans-serif',
      serif: 'Georgia, serif'
    },
  align: 
    {
        padding: '12px',
        margin: '4px',  
        position: 'top-left',
    }
};
// Dictionary for label styles.
var labelStyles = {
  titleStyle: 
    {
      padding: '12px 16px 12px 16px',
      margin: '0 px',
      backgroundColor: '444444',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  abstractStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '14px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.serif,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  instructionStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  layerStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.sans,
      textDecoration: 'italics',
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  creditStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: '#656665',
      fontSize: '10px',
      fontWeight: '400',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'pre',
      stretch: 'horizontal'
    },
  mapLabelStyle: 
    {
      // padding: labelMaster.align.padding,
      // margin: '0px 40px 0px 40px',
      color: 'white',
      backgroundColor: '#666666',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      whiteSpace: 'wrap',
      stretch: 'horizontal',
      height: '30px',
    }
  };
//  style for location select menu
var selectStyles = {
  padding: labelMaster.align.padding,
  margin: labelMaster.align.margin,  
  stretch: 'horizontal'
};
// **************************** Labels and captions ******************************
var title = ui.Label({
  value: 'The Nuance and Complexity Behind Tree Equity Score',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value:'Tree Equity Score is a project from American Forests that aims to determine the relative need for tree planting in each neighborhood in every city in the U.S. It has many strengths, but lacks nuance. ' +
  'This app examines the complex relationships between four of the components of Tree Equity Score (canopy cover, temperature, nonwhite population, and low income population) in New York City.',
  style: labelStyles.abstractStyle
});
var tesLink = ui.Label({
  value: 'Visit the Tree Equity Score website',
  style: labelStyles.creditStyle,
  targetUrl: 'https://treeequityscore.org/'
  }
);
var background = ui.Label({
  value: 'Tree Equity Score uses a variety of environmental and socioeconomic data with multi-criteria analysis techniques to create a single Tree Equity Score (TES) ranging from 0 to 100 for each census block group. ' + 
  'Although it does a good job of trying to incorporate many different aspects of environmental justice in its assessment of tree equity, by collapsing the distribution of urban trees down to a single number ' +
  'it obscures many of the complex relationships between its component parts.',
  style: labelStyles.instructionStyle
}); 
var instructions = ui.Label({
  value: 'Choose a location from the menu above to explore the limits of Tree Equity Score in a particular neighborhood.',
  style: labelStyles.instructionStyle
});
var layersIntro = ui.Label({
  value: "Though all data layers cover the entire city, for each location there are a few suggested layers which offer a view into the unique conditions of that area. At each location, these suggestions include " + 
  "two single variable maps and a bivariate map showing the spatial correlation between them, along with one or two other maps which help contextualize those relationships.",
  style: labelStyles.instructionStyle
});
var narrativeTitle = ui.Label({
  value: "The Story: ",
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: labelMaster.font.sans,
    margin: '0px',
    padding: '0 0 0 13px',
    position: labelMaster.align.position,
  }
});
var layersTitle = ui.Label({
  value: "Suggested Layers: ",
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: labelMaster.font.sans,
    margin: '0px',
    padding: '0 0 0 13px',
    position: labelMaster.align.position,
  }
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://github.com/gsmarshall/greenspace_app'
  }
);
var credits = ui.Label({
  value: 'Sam Marshall\nGeography 700 Independent Study\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
// ************************************ Create UI panels and put them together **********************************
// Configure the layouts for how the panels flow together.
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
var legendPanel = ui.Panel({
  style: {
    padding: '4px'
  }
});
var narrativePanel = ui.Panel({
  widgets: [background, instructions]
});
var layersPanel = ui.Panel({
  widgets: [layersTitle, layersIntro]
});
// Compose panels. 
var rootPanel = ui.Panel({                         // Highest-level container.
  layout: ui.Panel.Layout.flow('horizontal'),   
  style: {
      height: '100%',
      width: '100%'
  }
});     
var sidePanel = ui.Panel({                         // Side panel
  widgets: [abstract, tesLink, narrativeTitle, narrativePanel, legendPanel, layersPanel, storyLink, credits],
  layout: ui.Panel.Layout.flow('vertical'), 
  style: {
      position: 'top-left',
      height: '90%',
      width: '20%',
      // padding: '10px',
      // margin: '10px',
      // backgroundColor: '#cccccc',
      // border:'4px solid orange',
      shown: true
  }
});
// points of interest to highlight
var locations = {
  "Queensbridge Houses": {
    poi: Queensbridge,
    zoom: 14,
    narrative: ui.Label({
      value: "By calculating scores for each block group individually, TES doesn't capture how a neighborhood's geographic context can influence whether or not it has equitable tree cover. " + 
      "Queensbridge Houses is the largest public housing project in North America, with a population of about 7000 people that is overwhelmingly poor and nonwhite. Although the development itself has high tree cover, low temperatures, and a high Tree Equity Score, " +
      "it is surrounded by industrial and commercial neighborhoods that have few trees, high temperatures, and lower scores, which likely negatively impacts the experience of Queensbridge residents. Tree inequity exists in Queensbridge more as a result of its location " + 
      "and surroundings than because of a lack of trees in the project itself, a form of inequity which doesn't appear in the Tree Equity Score.",
      style: labelStyles.instructionStyle
    }),
    layers: ui.Label({
      value: "Original Tree Equity Score, Classified Surface Temperature, Canopy Cover, Canopy Cover and LST",
      style: labelStyles.layerStyle
    }),
    explanation: ui.Label({
      value: "For each layer, note how Queensbridge itself appears differently from both its surroundings in western Queens and the much wealthier neighborhoods across the East River in Manhattan.",
      style: labelStyles.instructionStyle
    })
  },
  "Red Hook Houses": {
    poi: RedHook,
    zoom: 14,
    narrative: ui.Label({
      value: "Similarly to Queensbridge, Red Hook Houses is a large public housing development that was built in the late 1930s under the guidance of urban planners like Robert Moses. Like Queensbridge, Red Hook Houses itself " + 
      "has high tree cover within its boundaries but is surrounded by industrial and commercial neighborhoods with very low tree cover. Red Hook's location on the outskirts of Brooklyn also leaves it vulnerable to other forms of " +
      "environmental injustice: it was severely damaged by Hurricane Sandy in 2012, and is cut off from the wealthier, more tree covered residential areas to the Northeast by poor public transit and the Gowanus Expressway, which was also planned by Robert Moses. " +
      "The equity challenges that Red Hook faces highlight the importance of viewing environmental justice through many lenses, and illustrate the impact that other aspects of urban planning (such as housing location and infrastructure development) " + 
      "can have on residents' access to trees.",
      style: labelStyles.instructionStyle
    }),
    layers: ui.Label({
      value: "Canopy Cover, Percent of Population Reporting Low Income, Canopy Cover and Low Income Population, Median Household Income",
      style: labelStyles.instructionStyle
    }),
    explanation: ui.Label({
      value: "For each layer, note how Red Hook Houses itself appears differently from both its surroundings on the Red Hook peninsula and neighborhoods like Cobble Hill and Carroll Gardens to the Northeast. " + 
      "Most of the Red Hook peninsula is commercial or industrial and has low tree cover and low TES, while the gentrified, high-income residential neighborhoods just across the Gowanus Expressway have much higher tree cover.",
      style: labelStyles.instructionStyle
    })
  },
  "Borough Park/Sunset Park": {
    poi: BoroughPark,
    zoom: 14,
    narrative: ui.Label({
      value: "TES incorporates many different forms of socioeconomic and environmental inequity, but does not make the distinctions between these components evident. The neighborhood of Borough Park in Southwestern Brooklyn is predominantly Jewish, " + 
      "while adjacent Sunset Park is comprised largely of several Hispanic and South Asian communities. Both neighborhoods have a high proportion of low-income residents and similarly middle-of-the-road levels of canopy cover, but Borough Park has generally higher " + 
      "surface temperatures. Both neighborhoods have similar Tree Equity Scores, though, possibly due to the fact that Sunset Park has a much higher proportion of nonwhite residents. In this way, Tree Equity Score simultaneously does a good job of incorporating " + 
      "many different factors in its definition of equity and falls short by obscuring the nature of those different factors. Sunset Park and Borough Park have similar scores but for different reasons, which means that different approaches are likely needed in order to " +
      "increase equity in each neighborhood. Furthermore, the different communities in each neighborhood may have different needs and preferences with regards to tree cover as well as different ways of organizing themseves and enacting change, which could make the " +
      "design and implementation of a tree planting program different for each neighborhood.",
      style: labelStyles.instructionStyle
    }),
    layers: ui.Label({
      value: "Classified Surface Temperature, Percent of Population Identifying as Nonwhite, Nonwhite Population and LST, Canopy Cover, Canopy Cover and Low Income Population",
      style: labelStyles.instructionStyle
    }),
    explanation: ui.Label({
      value: "For each layer, compare conditions in Borough Park (Southeast of the Fort Hamilton Parkway) with those in Sunset Park (Northwest of the Fort Hamilton Parkway). Note how the " + 
      "two regions look different when viewing layers related to surface temperature or nonwhite population, but similar when viewing layers related to TES, canopy cover, or low-income population.",
      style: labelStyles.instructionStyle
    })
  },
  "Reset Map": {
    poi: nyc_results,
    zoom: 12,
    narrative: ui.Panel({
      widgets: [background, instructions]
    }),
    layers: layersIntro,
    explanation: ui.Label({
      value: "",
      style: labelStyles.instructionStyle
    })
  }
};
// ---------------------------------------------------------------
// Compose layout.
// ---------------------------------------------------------------
// add custom base map
var mapStyle = basemap.mapStyle;
var MAP = ui.Map();
MAP.centerObject(nyc_results, 12);
MAP.setOptions('Dark Theme', {'Dark Theme': mapStyle});
// *********************** Set up UI interaction ************************
// functions to update map layers and location
var layerChanged = function(layer){
  // set all layers to hidden
  for (var i=0; i<MAP.layers().length()-1; i++){
    MAP.layers().get(i).setShown(0);
  }
  // clear legend from the side panel
  legendPanel.clear();
  if(layer != 'Base Map'){
    // set selected layer shown
    layers[layer].data.setShown(1);
    // update legend panel
    legendPanel.add(layers[layer].legend);
  }
};
var updateMap = function(location){
  MAP.centerObject(locations[location].poi, locations[location].zoom);
  selectLayers.setValue('Base Map');
};
var selectLayers = ui.Select({
  items: Object.keys(layers),
  placeholder: 'Choose a layer',
  style: selectStyles,
  onChange: function(key) {
    layerChanged(key);
  }
});
var selectPlaces = ui.Select({
  items: Object.keys(locations),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(location) {
    narrativePanel.clear();
    narrativePanel.add(locations[location].narrative);
    layersPanel.remove(layersPanel.widgets().get(2));
    layersPanel.remove(layersPanel.widgets().get(2));
    layersPanel.add(locations[location].layers);
    layersPanel.add(locations[location].explanation);
    updateMap(location);
  }
});
sidePanel.insert(2, selectPlaces);
layersPanel.insert(0, selectLayers);
// Initialize split layout.  
var splitLayout = ui.SplitPanel(        // Split panel.      
  sidePanel,                            // Add side panel to left side.
  MAP,                             // Add map panel (with swipe map) to right side. 
  'horizontal',                         // Make split in horizontal direction.  
  false                                 // Do NOT make swipe transition for split screen.  
);
ui.root.clear();
ui.root.add(title);
ui.root.add(rootPanel);
rootPanel.add(splitLayout);
MAP.add(lst);
MAP.add(tes_og);
MAP.add(nonwhite);
MAP.add(low_income);
MAP.add(canopy);
MAP.add(med_income);
MAP.add(pop_density);
MAP.add(nonwhite_income);
MAP.add(canopy_nonwhite);
MAP.add(lst_class);
MAP.add(temp_canopy);
MAP.add(nonwhite_lst);
MAP.add(income_lst);
MAP.add(canopy_income);
MAP.setControlVisibility({layerList: false});
var POIS = Queensbridge.merge(RedHook).merge(BoroughPark);
MAP.addLayer(POIS.draw({color: 'FF00FF', pointRadius: 7}), {}, "Locations", 1);