// The zones by which classification was performed.
var zoneGeometries = require('users/svangordon/west-africa-lulc:zoneGeometries');
var zonesImage = ee.FeatureCollection(zoneGeometries).style({
    fillColor: '00000000',
    width: 1
});
// A geometry encompassing the entire area of classification
var regionalGeometry = ee.Geometry.Rectangle([
    -17.5425,      // xMin
    9,        // yMin
    18.883107,  // xMax
    18.417,     // yMax
], null, false);
// A polygon to cut out some zones in Chad that were not fully masked.
var chadGeometry = /* color: #d63000 */ee.Geometry.Polygon(
  [[[14.955656566073003, 12.506749037546264],
    [14.944670237948003, 11.550446439196005],
    [13.785612620760503, 9.476604936726446],
    [14.807341136385503, 8.641216969107132],
    [16.938688792635503, 9.525365252469973],
    [16.158659495760503, 12.780106767480115]]]);
var atlas2013 = ee.Image('users/svangordon/conference/atlas/swa_2013lulc_2km');
// Create a combined mask that throws out any of the bad zones from Chad, and also
// masks any pixels that weren't also present in the original Atlas map.
var mask = atlas2013.mask()
    .clip(
        regionalGeometry.difference(chadGeometry, 8000)
    );
// Display Atlas and Atlas V2
var atlasPalette = [
    "8400a8", // Forest / Forêt
    "8bad8b", // Savanna / Savane
    "000080", // Wetland - floodplain / Prairie marécageuse - vallée inondable
    "ffcc99", // Steppe / Steppe
    "808000", // Plantation / Plantation
    "33cccc", // Mangrove / Mangrove
    "ffff96", // Agriculture / Zone de culture
    "3366ff", // Water bodies / Plans d'eau
    "ff99cc", // Sandy area / surfaces sableuses
    "969696", // Rocky land / Terrains rocheux
    "a87000", // Bare soil / Sols dénudés
    "ff0000", // Settlements / Habitations
    "ccff66", // Irrigated agriculture / Cultures irriguées
    "a95ce6", // Gallery forest and riparian forest / Forêt galerie et formation ripicole
    "d296e6", // Degraded forest / Forêt dégradée
    "a83800", // Bowe / Bowé
    "f5a27a", // Thicket / Fourré
    "ebc961", // Agriculture in shallows and recession / Cultures des bas-fonds et de décrue
    "28734b", // Woodland / Forêt claire
    "ebdf73", // Cropland and fallow with oil palms / Cultures et jachère sous palmier à huile
    "beffa6", // Swamp forest / Forêt marécageuse
    "a6c28c", // Sahelian short grass savanna / Savane sahélienne
    "0a9696", // Herbaceous savanna / Savane herbacée
    "749373", // Shrubland / Zone arbustive
    "505050", // Open mine / Carrière
    "ffffff"  // Cloud / Nuage
];
var atlasValues = [1,2,3,4,6,7,8,9,10,11,12,13,14,15,21,22,23,24,25,27,28,29,31,32,78,99];
/**Callback for .map that sets properties on an image that EE will use to display categorical images.
 * 
 * @param {ee.Image} image
 */
function visualizeAtlas(image) {
    return image.setMulti({  // Set visualization parameters on the Atlas V2 images.
        b1_class_values: atlasValues,
        b1_class_palette: atlasPalette
    });
}
/** Constructor for a collection of remote sensing images 
 * @constructor
 * @param {ImageCollection} collection - The Image Collection from which the training images will be taken.
 * @param {function} getFunction - The function that will return training images for this collection. Take as paramters
 * a geometry and a year.
 * @param {[string]} bandNames - A list of the bands that shuold be retained from the resulting training images.
 * @param {TimeFilter} timeFilter - A TimeFilter object, which is used to temporally select images from our collection.
 */
function TrainingCollection(collection, getImage, bandNames, timeFilter) {
    this.collection = ee.ImageCollection(collection);
    this.getImage = getImage;
    this.bandNames = bandNames;
    this.timeFilter = timeFilter;
  }
/** Return a constructor for ee.Filter's that will select images from the years around a certain calendar date. 
 * @constructor
 * @param {[number]} startTimes - Month and day on which to start the filter
 * @param {[number]} endTimes - Month and day on which to end the filter
 * @param {[number]} years - Amount by which to increment / decrement the input year (typically, [-1, 0, 1].)
 */
function TimeFilter(startTimes, endTimes, years) {
    this.startTimes = startTimes;
    this.endTimes = endTimes;
    this.years = ee.List(years);
    this.yearFilter = function filter(year) {
        var startTimes = this.startTimes;
        var endTimes = this.endTimes;
        var yearFilters = this.years.map(function(yearOffset) {
            var startDate = ee.Date.fromYMD(ee.Number(year).add(yearOffset), startTimes[0], startTimes[1]);
            var endDate = ee.Date.fromYMD(ee.Number(year).add(yearOffset), endTimes[0], endTimes[1]);
            return ee.Filter.date(startDate, endDate);
        });
        return ee.ApiFunction._call('Filter.or', yearFilters); 
    };
}
/**Composite a landsat image for a given year and geometry. Works for both Landsat 7 and Landsat 8.
 * Meant to be passed to a TrainingCollection constructor.
 * @param {ee.Geometry} geometry - The geometry for which images should be composited.
 * @param {number} year - What year the composite will be made for. Will be passed to the TimeFilter.
 */
function getLandsatImage(geometry, year) {
    function maskLandsat(image) {
        // Bits 0, 3, 4 and 5 are fill, cloud shadow, snow, and cloud.
        var fillBit = ee.Number(2).pow(0).int();
        var cloudShadowBit = ee.Number(2).pow(3).int();
        var snowBit = ee.Number(2).pow(4).int();
        var cloudBit = ee.Number(2).pow(5).int();
        // Get the pixel QA band.
        var qa = image.select('pixel_qa');
        var radsatMask = image
            .select('radsat_qa')
            .eq(0);
        var mask = radsatMask
            .and(qa.bitwiseAnd(cloudShadowBit).eq(0))
            .and(qa.bitwiseAnd(fillBit).eq(0))
            .and(qa.bitwiseAnd(snowBit).eq(0))
            .and(qa.bitwiseAnd(cloudBit).eq(0));
        return image
            .updateMask(mask)
            .select(['B.+']);
    }
    var landsatCollection = this.collection;
    var dateFilter = this.timeFilter.yearFilter(year);
    return landsatCollection.filterBounds(geometry)
        .filter(dateFilter)
        .map(maskLandsat)
        .median()
        .clip(geometry);
}
/*
*    Display a UI element to select which images and years to display
*/
// Dropdown for selecting which AtlasV2 / Landsat year to display.
var selectYearV2 = ui.Select({
    items: Array.apply(null, Array(17)).map(function(_, i) { return String(i + 2000); }), // An array of Strings from 2000 - 2016. EE requires ui.Select args to be strings
    onChange: function() {
        syncMaps();
    },
    value: "2000"
});
// Dropdown for selecting which USGS Eros Atlas year to show.
var selectYearAtlas = ui.Select({
    items: ["2000", "2013"],
    onChange: function() {
        syncMaps();
    },
    value: "2000"
});
// Toggle whether to display the outlines of the zone geometries on all maps.
var toggleZoneGeometries = ui.Checkbox({
    label: 'Display Zone Geometries?',
    value: true,
    onChange: function(shouldDisplay) {
        ui.root.widgets().get(0).widgets().forEach(function(map) {
            if (shouldDisplay) {
                map.addLayer(zonesImage);
            } else {
                var layer = map.layers().get(1);
                map.remove(layer);
            }
        });
    }
});
// UI Element for selecting which years to display and other vis options. 
var yearControlPanel = ui.Panel([
    ui.Label(
      'Atlas & Atlas V2',
      {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
    ),
    ui.Label('AtlasV2 and Landsat Year'),
    selectYearV2,
    ui.Label('Atlas Year'),
    selectYearAtlas,
    toggleZoneGeometries,
    ui.Label("Adjust layer opacity using 'Layers' sliders.")
]);
// Callback for displaying the appropriate years of Atlas, V2, and Landsat.
function syncMaps() {
    var yearV2 = selectYearV2.getValue();
    var yearAtlas = selectYearAtlas.getValue();
    // Extract the appropriate Atlas / V2 images from their respective collections
    var imageAtlas = ee.Image(atlas.filterDate(yearAtlas + '-01-01', yearAtlas + '-12-31').first());
    var imageV2 = ee.Image(atlasV2.filterDate(yearV2 + '-01-01', yearV2 + '-12-31').first());
    // Get a Landsat composite image as created by the TrainingCollection instance.
    var imageLandsat = fallLandsat.getImage(
            regionalGeometry.difference(chadGeometry, 8000),
            Number(yearV2)
        )
        .updateMask(imageV2.mask());
    // These are what we want our new values to be.
    // We update instead of creating new layers, because it's more performant.
    var mapLayers = [
        {
            name: 'Atlas ' + yearAtlas,
            image: imageAtlas
        },
        {
            name: 'Landsat ' + yearV2,
            image: imageLandsat
        },
        {
            name: 'Atlas V2 ' + yearV2,
            image: imageV2
        }
    ];
    mapLayers.forEach(function(layer, idx) {
        // var map = ui.root.widgets().get(0).widgets().get(idx);
        // Update map image
        var mapLayer = Map.layers().get(idx);
        mapLayer.setEeObject(layer.image);
    });
}
/**
 * Setup the EE objects that we will be visualizing.
 */
// Load the Atlas and V2 collections and add visualization parameters.
var atlasV2 = ee.ImageCollection('users/svangordon/conference/atlas_v2/collections/classify')
    .map(visualizeAtlas)
    .map(function(image) {return image.updateMask(mask);});
var atlas = ee.ImageCollection('users/svangordon/conference/atlas/atlasCollection')
    .map(visualizeAtlas);
// Load the Landsat collection and instantiate the objects that we will use to visualize it.
var landsatCollection = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR');
var lsBands = ['B1', 'B2', 'B3'];
var timeFilter = new TimeFilter([9, 15], [11,15], [-1, 0, 1]);
var fallLandsat = new TrainingCollection(landsatCollection, getLandsatImage, lsBands, timeFilter);
/**
 * Setup our UI/
 */
// Create the ui.Map objects that we will add to the map.
var baseMaps = ['Atlas', 'Landsat', 'Atlas V2']
    .map(function(name) {
        Map.addLayer(ee.Image(), {}, name); // Add an empty placeholder layer to the image that we will replace later.
    });
Map.addLayer(zonesImage, {}, 'Zones Boundaries');
ui.root.add(yearControlPanel);
Map.centerObject(regionalGeometry);
syncMaps();
// Set vis params for the Landsat map.
var landsatVis = {bands: 'B3,B2,B1', min:0, max:3000};
Map.layers().get(1).setVisParams(landsatVis);