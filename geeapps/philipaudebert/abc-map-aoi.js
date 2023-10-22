var ipcc;
var msaLu;
var msaF;
var msaI;
var msaHe;
var msaArea;
var rangeLegend;
var categoryLegend;
var ts;
var lu;
var kba;
var wdpa;
var naturalCapital;
var selector;
Map.setCenter(0, 20, 2);
var year = 2017;
//var resolution = 20;
/*var aoi = 'Costa Rica';
var region = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0") // if interested by results by region, just change to "level 1" and select "ADM1_NAME" in charts xLabel
  .filter(ee.Filter.eq('ADM0_NAME', aoi));
*/
// Visualization parameters
var palettes = require('users/gena/packages:palettes');
var viz = {
  min: 0,
  max: 1,
  palette: ['800026','fc4e2a','fd8d3c','feb24c','fed976','ffeda0','ffffcc','f7fcb9','d9f0a3','addd8e','78c679','41ab5d','004529']
  //palettes.colorbrewer.RdYlGn[9]
};
var sign = function(dataset) {
  return ee.Algorithms.If(dataset.gte(0),
              'increased',
              ee.Algorithms.If(dataset.lt(0), 
                'decreased'));
};
var getRoundedNumber = function (object) {
  return ee.Number(object.get('first')).format('%,.2f');//ee.Number.parse().format('%.2f'));
};
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add MSA score          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Get MSA images
var getAdjustedIpccImage = function(region, year, resolution) {
	ipcc = ipcc || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/ABCBaseline/ipccAdjustedLandUses");
	return ipcc.properties(region, year, resolution);
	};
var getMsaLuImage = function(region, year, resolution) {
	msaLu = msaLu || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaLu");
	return msaLu.patchMsaLu(region, year, resolution);
	};
var getMsaFImage = function(region, year, resolution) {
	msaF = msaF || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaF");
	return msaF.patchMsaF(region, year, resolution);
	};
var getMsaIImage = function(region, year, resolution) {
	msaI = msaI || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaI");
	return msaI.patchMsaF(region, year, resolution);
	};
var getMsaHeImage = function(region, year, resolution) {
	msaHe = msaHe || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaHe");
	return msaHe.projectMsaHe(region, year, resolution);
	};
// Create new image combining patch-pressures (msaLu, msaF and msaI)
var getMsaPatchImage = function(region, year, resolution) {
  return getMsaLuImage(region, year, resolution).multiply(getMsaFImage(region, year, resolution)).multiply(getMsaIImage(region, year, resolution));
};
var getMsaPatch = function(region, year, resolution) {
  return getMsaPatchImage(region, year, resolution).reduceRegion(
  {reducer: ee.Reducer.mean(),
  geometry: region,
  scale: resolution,
  maxPixels: 1e15
  }
  ).toImage();
};
//print('msaPatch', msaPatch);
// Create new image combining patch- and project level (msaHe) pressures
var getAggregateMsa = function(region, year, resolution) {
  return getMsaPatch(region, year, resolution).multiply(getMsaHeImage(region, year, resolution));
};
//print('aggregateMsa', aggregateMsa)
// Chart for MSA calculation
var getMsaImage = function(region, year, resolution) {
  return ee.ImageCollection.fromImages([getMsaLuImage(region, year, resolution), getMsaFImage(region, year, resolution), getMsaIImage(region, year, resolution), getMsaHeImage(region, year, resolution), getAggregateMsa(region, year, resolution)]).toBands().rename('1_Land Use','2_Fragmentation','3_Infrastructure','4_Human Encroachment','5_Aggregate');//.set('MSA','MSA');
};
var getMsaPressures = function(region, year, resolution) {
  var addLabel = function(feature) {
	return feature.set(
		{'MSA Pressure': 'MSA Pressure'}
		)};
  var label = function(feature) {
    return region.map(addLabel);
  };
  var chart = 
    ui.Chart.image.regions({
      image: getMsaImage(region, year, resolution), 
      regions: label(), 
      reducer: ee.Reducer.mean(), 
      scale: resolution,
      seriesProperty: 'ADM0_NAME',
      xLabels: ['1 Land Use','2 Fragmentation','3 Infrastructure','4 Human Encroachment', 'Aggregate']
    })
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Mean Species Abundance',
          vAxis: {
            title: 'Mean Species Abundance',
            baseline: 0,
            titleTextStyle: {italic: false, bold: true}
          },
          colors: ['192d3f','192d3f','192d3f','192d3f','bb133e']
        });
  return chart
};
//print(getMsaPressures(ee.FeatureCollection(geometry), 2019))
// Get msa time series since 1992
var getMsaTimeSeries = function(region, resolution, aoi) {
	var ts = ts || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaAggregateTimeSeries");
	return ts.msaTimeSeries(region, resolution, aoi);
};
//print(getMsaTimeSeries(region, aoi))
// Get msa.km2 loss or gain since 1992
var getMsaAreaChange = function(region, resolution) {
	msaArea = msaArea || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator1_msa/msaAggregateTimeSeriesArea");
	return msaArea.areaChange(region, resolution);
};
//print('Biodiversity area gain(+) / loss(-) since 1992', getMsaAreaChange(region, aoi), 'km2');
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add Land Use distribution          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var getLandUseArea = function(region, resolution, aoi) {
	lu = lu || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/landUse");
	return lu.landUseChart(region, resolution, aoi);
};
//print(getLandUseArea(region, aoi))
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add KBAs          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var getKbaMap = function() {
	kba = kba || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/keyBiodiversityAreas");
	return kba.kbaMap;
};
var getKbaArea = function(region, resolution, aoi) {
	kba = kba || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/keyBiodiversityAreas");
	return kba.kbaArea(region, resolution, aoi);
};
//print('Key Biodiversity Areas in '+aoi+':', getRoundedNumber(getKbaArea(region, aoi)), "km2")
var getKbaLandUseArea = function(region, resolution, aoi) {
	kba = kba || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/keyBiodiversityAreas");
	return kba.kbaChart(region, resolution, aoi);
};
//print(getKbaLandUseArea(region, aoi))
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add Protected Areas          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var getWdpaMap = function() {
	wdpa = wdpa || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/protectedAreas");
	return wdpa.wdpaMap;
};
var getWdpaArea = function(region, resolution, aoi) {
	wdpa = wdpa || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/protectedAreas");
	return wdpa.wdpaArea(region, resolution, aoi);
};
//print('Protected Areas in '+aoi+':', getWdpaArea(region, aoi).toArray(), 'km2')
var getWdpaLandUseArea = function(region, resolution, aoi) {
	wdpa = wdpa || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator2_areas/protectedAreas");
	return wdpa.wdpaChart(region, resolution, aoi);
};
//print(getWdpaLandUseArea(region, aoi))
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add Natural Capital          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var getNaturalCapitalMap = function(region, resolution) {
  naturalCapital = naturalCapital || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator3_naturalCapital/naturalCapital");
  return naturalCapital.naturalCapitalMap(region, resolution);
};
//print(getNaturalCapital(region, aoi))
var getNaturalCapitalTimeSeries = function(region, resolution, aoi) {
  naturalCapital = naturalCapital || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator3_naturalCapital/naturalCapital");
  return naturalCapital.naturalCapitalChart(region, resolution, aoi);
};
//print(getNaturalCapital(region, aoi))
var getNaturalCapitalChange = function(region, resolution, aoi) {
	naturalCapital = naturalCapital || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator3_naturalCapital/naturalCapital");
	return naturalCapital.naturalCapitalChange(region, resolution, aoi);
};
//print('The Natural Capital increased (+) / decreased (-) by ', getNaturalCapitalChange(region, aoi), 'USD in '+ aoi)
var getNaturalCapitalLastYear = function(region, resolution, aoi) {
	naturalCapital = naturalCapital || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Images/ABC_indicator3_naturalCapital/naturalCapital");
	return naturalCapital.naturalCapitalLastYear(region, resolution, aoi);
};
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Add Panel          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty panel in which to arrange widgets.
var logo = ee.Image("users/philipaudebert/Viz/PNGs/ABC-Map_white_formatted").visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1004x178',
        format: 'png'
        },
    style: {height: '62px', width: '350px', padding :'0'} // native resolution is 1004x178px
    });
var refName = ui.Textbox({placeholder: 'Name',  value: 'Aoi',
  style: {width: '100px'}});
var getScaleButton = function(panel) {
  selector = selector || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/widgets/selectScale");
  return selector.selectButton(panel);
};
var getScaleSelect = function() {
  selector = selector || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/widgets/selectScale");
  return selector.selectScale();
};
// The layout is vertical flow by default.
var panel = ui.Panel(thumb, 'flow', {width: '400px'})
     /*.add(ui.Label({
        value: 'Adaptation, Biodiversity and Carbon Mapping Tool (ABC-Map)',
        style: {fontSize: '20px', color: '484848', fontWeight: 'bold'}
      }))*/
     .add(ui.Label({
        value: 'The Adaptation, Biodiversity and Carbon Mapping Tool (ABC-Map) is a new geospatial app based on Google Earth Engine that holistically assesses the environmental impact of National Policies and Plans (NDC, NAPs, etc) and investments in the AFOLU sector, in line with the objectives of the UNFCCC and CBD.',
        style: {fontSize: '12px', color: '484848'}
      }))
     .add(ui.Label('Fill in name of Area of Interest      ',{margin: '0 0 0 10px',fontSize: '12px',color: 'gray'}))
     .add(refName)
     /*.add(ui.Label({
        value: 'Biodiversity Mapping Tool (B-Map)',
        style: {fontSize: '15px', color: '484848', fontWeight: 'bold'}
      }))
      .add(ui.Label({
        value: '1. Mean Species Abundance',
        style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
      }))
      .add(ui.Label({
        value: '"Mean species abundance (MSA) expresses the mean abundance of original species in disturbed conditions relative to their abundance in undisturbed habitat, as an indicator of the degree to which an ecosystem is intact. The indicator ranges from 1 (intact ecosystem) to 0 (destroyed ecosystem)." (GLOBIO Definition 2016)',
        style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
      }))
     .add(columnChart)
     .add(ui.Label({
        value: 'The Area with Intact Biodiversity (AIB) '+ sign(getMsaAreaChange(region, aoi)).getInfo()+' by ' + getMsaAreaChange(region, aoi).format('%,.2f').getInfo() +' km2 since 1992 in '+aoi+'.',
        style: {fontSize: '12px', color: '484848'}
      }))
     .add(getMsaTimeSeries(region, aoi))
     .add(ui.Label({
        value: '2. Key Biodiversity Areas',
        style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
      }))
      .add(ui.Label({
        value: '"Key Biodiversity Areas (KBA) are sites contributing significantly to the global persistence of biodiversity, in terrestrial, freshwater and marine ecosystems. The Global Standard for the Identification of Key Biodiversity Areas sets out globally agreed criteria for the identification of KBAs worldwide." (IUCN Definition 2016)',
        style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
      }))
     .add(ui.Label({
        value: aoi+ ' has a total Key Biodiversity Area (KBA) of ' +getRoundedNumber(getKbaArea(region, aoi)).getInfo()+' km2 as of 2020. The evolution of the land use distribution in the KBAs since 1992 is shown below:',
        style: {fontSize: '12px',color: '484848'}
      }))
     .add(getKbaLandUseArea(region, aoi))
     .add(ui.Label({
        value: '3. Protected Areas',
        style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
      }))
     .add(ui.Label({
        value: 'A protected area is a clearly defined geographical space, recognised, dedicated and managed, through legal or other effective means, to achieve the long term conservation of nature with associated ecosystem services and cultural values. IUCN differentiates six Protected Area Categories (I-VI)." (IUCN Definition 2008)',
        style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
      }))
     .add(ui.Label({
        value: aoi+ ' has a total Protected Area (KBA) of ' +getRoundedNumber(getWdpaArea(region, aoi)).getInfo()+' km2 as of 2020. The evolution of the land use distribution in the Protected Areas since 1992 is shown below:',
        style: {fontSize: '12px', color: '484848'}
      }))
     .add(getWdpaLandUseArea(region, aoi))
     .add(ui.Label({
        value: '4. Natural Capital',
        style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
      }))
     .add(ui.Label({
        value: 'The Natural Capital is derived from the Ecosystem Services Valuation Database (ESVD). ESVD is a follow-up to the “The Economics of Ecosystems and Biodiversity” (TEEB) database which contained over 1,300 data points from 267 case studies on monetary values of ecosystem services across all biomes. (ESVD 2020) ',
        style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
      }))
      .add(ui.Label({
        value: 'The Natural Capital in ' + aoi+ ' '+sign(getNaturalCapitalChange(region, aoi)).getInfo()+' by ' + getNaturalCapitalChange(region, aoi).format('%,.2f').getInfo() +' USD since 1992.',
        style: {fontSize: '12px', color: '484848'}
      }))
      .add(getNaturalCapital(region, aoi)) */
     /*.add(ui.Label({
        value: 'References',
        style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
      }))
      .add(ui.Label({
        value: 'BirdLife International (2021) World Database of Key Biodiversity Areas. Developed by the KBA Partnership: BirdLife International, International Union for the Conservation of Nature, American Bird Conservancy, Amphibian Survival Alliance, Conservation International, Critical Ecosystem Partnership Fund, Global Environment Facility, Global Wildlife Conservation, NatureServe, Rainforest Trust, Royal Society for the Protection of Birds, Wildlife Conservation Society and World Wildlife Fund. March 2021 version. Available at http://www.keybiodiversityareas.org/site/requestgis',
        style: {fontSize: '9px', color: '484848', padding: '10px'}
      }))
      .add(ui.Label({
        value: 'UNEP-WCMC and IUCN. 2021. Protected Planet: The World Database on Protected Areas (WDPA). Cambridge, UK: UNEP-WCMC and IUCN. Available at: www.protectedplanet.net',
        style: {fontSize: '9px', color: '484848', padding: '10px'}
      }))*/
ui.root.add(panel);
panel.add(ui.Label('Please select the scale of the reference map', {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'}));
getScaleButton(panel);
panel.add(ui.Label('Click button to select and draw Area of Interest      ',{margin: '0 0 0 10px',fontSize: '12px',color: 'gray'}));
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////          Visualization          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#152106" quantity="10" label="Forest with High Integrity"/>' +
    '<ColorMapEntry color="#285000" quantity="11" label="Forest with Medium Integrity"/>' +
    '<ColorMapEntry color="#788200" quantity="12" label="Forest with Low Integrity"/>' +
    '<ColorMapEntry color="#826900" quantity="13" label="Forest Plantation"/>' +
    '<ColorMapEntry color="#fffe9d" quantity="20" label="Extensive Annual Cropland"/>' +
    '<ColorMapEntry color="#ffff00" quantity="21" label="Intensive Annual Cropland"/>' +    
    '<ColorMapEntry color="#00dc80" quantity="22" label="Irrigated Cropland"/>' +
    '<ColorMapEntry color="#c4d659" quantity="23" label="Extensive Agroforestry"/>' +
    '<ColorMapEntry color="#bcbc5e" quantity="24" label="Intensive Agroforestry"/>' +
    '<ColorMapEntry color="#ffb432" quantity="30" label="Grassland"/>' +
    '<ColorMapEntry color="#ff8700" quantity="31" label="Pasture"/>' +
    '<ColorMapEntry color="#00785a" quantity="40" label="Wetlands with High Integrity"/>' +
    '<ColorMapEntry color="#008967" quantity="41" label="Wetlands with Medium Integrity"/>' +
    '<ColorMapEntry color="#00a37b" quantity="42" label="Wetlands with Low Integrity"/>' +
    '<ColorMapEntry color="#cc0013" quantity="50" label="Settlement"/>' +
    '<ColorMapEntry color="#ffebaf" quantity="60" label="Other Land"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
/////////////////////////////////          Add Legends          ///////////////////////////////////
var categoryNames = ["1a Forest with High Integrity","1b Forest with Medium Integrity","1c Forest with Low Integrity","1d Forest Plantation","2a Extensive Annual Cropland","2a Intensive Annual Cropland","2c Irrigated Cropland","2d Extensive Agroforestry","2e Intensive Agroforestry","3a Grassland","3b Pasture","4a Wetlands with High Integrity","4b Wetlands with Medium Integrity","4c Wetlands with Low Integrity","5 Settlement","6 Other Land"]; 
var palette = ['152106','285000','788200','826900','fffe9d','ffff00','00dc80','c4d659','bcbc5e','ffb432','ff8700','00785a','008967','00a37b','cc0013','ffebaf']; 
var categoryCount = 16;
var getCategoryLegend = function(title, position, categoryNames, palette, categoryCount) {
	categoryLegend = categoryLegend || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/categoryLegend");
	return categoryLegend.legend(title, position, categoryNames, palette, categoryCount);
	};
Map.add(getCategoryLegend('Land Use Legend', 'bottom-right', categoryNames, palette, categoryCount));
var getRangeLegend = function(name, viz, position) {
	rangeLegend = rangeLegend || require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/rangeLegend");
	return rangeLegend.legend(name, viz, position);
	};
Map.add(getRangeLegend('MSA Legend', viz, 'bottom-left'));
Map.add(getRangeLegend('USD/ha/yr', {min: 780, max: 64606, palette: palettes.colorbrewer.YlGnBu[9]}, 'top-left'));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// Draw AOI /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Alfonso Sanchez-Paus Diaz
// v1 - 2019-04-14
// v2 - 2021-02-18 - Using the new drawing tools
// Require this file from your script and use the addDrawPolygonButton to add the measurement tool to the Map ( to use the main map just use Map )
// See this script for more ideas on draing points or rectangles  https://code.earthengine.google.com/36102d36442bbb11da1011ebb61a4009 
var drawingTools;
var currentMap;
var drawButton;
var areaLabel;
var measurePanel;
var layerGeometry;
var _showArea;
var STATUS_DRAWING = "DRAWING";
var STATUS_WAITING = "WAITING";
var currentStatus = STATUS_WAITING;
var MEASURE_AREA_LABEL = "⎔ Select Area of Interest";
var RESET_AREA_LABEL = "Reset map";
var AREA_LABEL_NOT_DRAWING = "Click to draw polygon";
function clearGeometry() {
  var layers = drawingTools.layers();
  if( layers.length() > 0 )
    layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  while (drawingTools.layers().length() > 0) {
    var layer = drawingTools.layers().get(0);
    drawingTools.layers().remove(layer);
  }
}
function drawPolygon() {
  drawingTools.setShape('polygon');
  areaLabel.setValue("Drawing polygon(s)");
}
var showAreaData = ui.util.debounce(
    function( geometry ){       
      geometry.area().divide(10000).format("%(,.2f").evaluate( function(area) {
        areaLabel.setValue( "Area: " + area + " ha." );
      });
    },
    1000,
    currentMap
);
// Define global variables, aoi and region
var aoi = refName.getValue();
var resetPanel = function(){
  // Set the drawing mode back to null; turns drawing off.
  panel.add(ui.Label('______________________________________________________', {color: '192d3f'}));
  currentMap.layers().remove( layerGeometry );
  currentMap.style().set('cursor', 'hand');
  drawButton.setLabel( MEASURE_AREA_LABEL );
  areaLabel.setValue(AREA_LABEL_NOT_DRAWING);
};
var handlGeometryDrawn = function(){
  // Get the drawn geometry; it will define the reduction region.
  var region = ee.FeatureCollection(drawingTools.layers().get(0).getEeObject());
  var areaAoi = function (feature) {
  return region.geometry().simplify(100).area().divide(1e4);
};
  if( _showArea ){
  var resolution = ee.Number(getScaleSelect()).getInfo();
  panel
    .add(ui.Label({
      value: 'Biodiversity Mapping Tool (B-Map)',
      style: {fontSize: '15px', color: '484848', fontWeight: 'bold'}
    }))
    .add(ui.Label({
      value: '1. Mean Species Abundance',
      style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
    }))
    .add(ui.Label({
      value: '"Mean species abundance (MSA) expresses the mean abundance of original species in disturbed conditions relative to their abundance in undisturbed habitat, as an indicator of the degree to which an ecosystem is intact. The indicator ranges from 1 (intact ecosystem) to 0 (destroyed ecosystem)." (GLOBIO Definition 2016)',
      style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
    }))
    .add(getMsaPressures(region, year, resolution))
    .add(ui.Label({
      value: 'The Area with Intact Biodiversity (AIB) '+ sign(getMsaAreaChange(region, resolution, aoi)).getInfo()+' by ' + getMsaAreaChange(region, resolution, aoi).format('%,.2f').getInfo() +' km2 since 1992 in '+aoi+'.',
      style: {fontSize: '12px', color: '484848'}
    }))
    .add(getMsaTimeSeries(region, resolution, aoi))
    .add(ui.Label({
      value: 'The IPCC land use evolution is represented below.',
      style: {fontSize: '12px', color: '484848'}
    }))
    .add(getLandUseArea(region, resolution, aoi))
    .add(ui.Label({
      value: '2. Key Biodiversity Areas',
      style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
    }))
    .add(ui.Label({
      value: '"Key Biodiversity Areas (KBA) are sites contributing significantly to the global persistence of biodiversity, in terrestrial, freshwater and marine ecosystems. The Global Standard for the Identification of Key Biodiversity Areas sets out globally agreed criteria for the identification of KBAs worldwide." (IUCN Definition 2016)',
      style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
    }))
    .add(ui.Label({
      value: aoi+ ' has a total Key Biodiversity Area (KBA) of ' +getRoundedNumber(getKbaArea(region, resolution, aoi)).getInfo()+' km2 as of 2020. The evolution of the land use distribution in the KBAs since 1992 is shown below:',
      style: {fontSize: '12px',color: '484848'}
    }))
    .add(getKbaLandUseArea(region, resolution, aoi))
    .add(ui.Label({
      value: '3. Protected Areas',
      style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
    }))
    .add(ui.Label({
      value: 'A protected area is a clearly defined geographical space, recognised, dedicated and managed, through legal or other effective means, to achieve the long term conservation of nature with associated ecosystem services and cultural values. IUCN differentiates six Protected Area Categories (I-VI)." (IUCN Definition 2008)',
      style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
    }))
    .add(ui.Label({
      value: aoi+ ' has a total Protected Area (KBA) of ' +getRoundedNumber(getWdpaArea(region, resolution, aoi)).getInfo()+' km2 as of 2020. The evolution of the land use distribution in the Protected Areas since 1992 is shown below:',
      style: {fontSize: '12px', color: '484848'}
    }))
    .add(getWdpaLandUseArea(region, resolution, aoi))
    .add(ui.Label({
      value: '4. Natural Capital',
      style: {fontSize: '14px', color: '192d3f', fontWeight: 'bold'}
    }))
    .add(ui.Label({
      value: 'The Natural Capital is derived from the Ecosystem Services Valuation Database (ESVD). ESVD is a follow-up to the “The Economics of Ecosystems and Biodiversity” (TEEB) database which contained over 1,300 data points from 267 case studies on monetary values of ecosystem services across all biomes. (ESVD 2020) ',
      style: {fontSize: '9px', color: '484848', backgroundColor: 'f0f0f0'}
    }))
    .add(ui.Label({
      value: 'The average Natural Capital value was ' + getNaturalCapitalLastYear(region, resolution, aoi).divide(areaAoi()).format('%,.2f').getInfo()+ ' USD/ha in 2019. The total value of the Natural Capital in ' + aoi+ ' '+sign(getNaturalCapitalChange(region, resolution, aoi)).getInfo()+' by ' + getNaturalCapitalChange(region, resolution, aoi).format('%,.2f').getInfo() +' USD since 1992.',
      style: {fontSize: '12px', color: '484848'}
    }))
    .add(getNaturalCapitalTimeSeries(region, resolution, aoi));
    Map.centerObject(region)
    //Map.setOptions('Satellite')
    Map.addLayer(getMsaHeImage(region, year, resolution).clip(region), viz, 'msaHe');
    Map.addLayer(getMsaIImage(region, year, resolution).clip(region), viz, 'msaI');
    Map.addLayer(getMsaFImage(region, year, resolution).clip(region), viz, 'msaF');
    Map.addLayer(getMsaLuImage(region, year, resolution).clip(region), viz, 'msaLu');
    Map.addLayer(getMsaPatchImage(region, year, resolution).multiply(getMsaHeImage(region, year, resolution)).clip(region), viz, 'msaAggregate');
    Map.addLayer(getKbaMap(region, aoi).clip(region), {palette: '192d3f'}, 'Key Biodiversity Areas');
    Map.addLayer(getWdpaMap(region, aoi).clip(region), {palette: '38a800'}, 'Protected Areas');
    var palettes = require('users/gena/packages:palettes');
    Map.addLayer(getNaturalCapitalMap(region, resolution).clip(region), {min:0, max: 5000, palette: palettes.colorbrewer.YlGnBu[9]});
    var datamask = function (image) {
      return getAdjustedIpccImage(region, year, resolution).select('remapped').neq(70)};
    var maskedComposite = getAdjustedIpccImage(region, year, resolution).updateMask(datamask()).clip(region);
    Map.addLayer(maskedComposite.sldStyle(sld_intervals), {}, 'IPCC Land Use Classes with Forest Landscape Integrity Index');
  }
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
};
var handleClick = function(){
  if (currentStatus === STATUS_WAITING ){
    clearGeometry();
    drawPolygon();
    drawButton.setLabel( RESET_AREA_LABEL );
    drawingTools.draw();
    currentStatus = STATUS_DRAWING;
  }else{
    resetPanel();
    clearGeometry();
    currentStatus = STATUS_WAITING;
    drawButton.setLabel( MEASURE_AREA_LABEL );
  }
};
// This is the public function of the class
// you need to set the Map to which the panel must be added, the style of the panel, and if yu want to show area measurement and the download link
var addDrawPolygonButton = function( map, style, showArea ){
  drawingTools = map.drawingTools();
  drawingTools.setShown(false);
  // Remove geometries still lingering in the map
  while (drawingTools.layers().length() > 0) {
    var layer = drawingTools.layers().get(0);
    drawingTools.layers().remove(layer);
  }
  currentMap = map;
  _showArea = showArea;
  var comps = [];
  drawButton = ui.Button({ label : MEASURE_AREA_LABEL, style : {}, onClick : handleClick  } );
  panel.add(drawButton) // if button should be in panel - cut out measurePanel
  comps.push( drawButton);
  if( _showArea ){
    areaLabel = ui.Label({ value : AREA_LABEL_NOT_DRAWING });
    comps.push( areaLabel );
  }
  drawingTools.onDraw(ui.util.debounce(handlGeometryDrawn, 500));
  drawingTools.onEdit(ui.util.debounce(handlGeometryDrawn, 500));
};
// Un comment the next line to test
addDrawPolygonButton( Map, {position : "top-right"}, true, true);
exports =  {addDrawPolygonButton : addDrawPolygonButton};