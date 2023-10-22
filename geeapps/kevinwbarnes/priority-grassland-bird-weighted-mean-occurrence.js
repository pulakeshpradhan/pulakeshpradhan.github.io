var bais_wm = ui.import && ui.import("bais_wm", "image", {
      "id": "projects/ee-kevinbarnes/assets/BAIS_WM"
    }) || ee.Image("projects/ee-kevinbarnes/assets/BAIS_WM"),
    cclo_wm = ui.import && ui.import("cclo_wm", "image", {
      "id": "projects/ee-kevinbarnes/assets/CCLO_WM"
    }) || ee.Image("projects/ee-kevinbarnes/assets/CCLO_WM"),
    sppi_wm = ui.import && ui.import("sppi_wm", "image", {
      "id": "projects/ee-kevinbarnes/assets/SPPI_WM"
    }) || ee.Image("projects/ee-kevinbarnes/assets/SPPI_WM"),
    tblo_wm = ui.import && ui.import("tblo_wm", "image", {
      "id": "projects/ee-kevinbarnes/assets/TBLO_WM"
    }) || ee.Image("projects/ee-kevinbarnes/assets/TBLO_WM"),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1");
// Interactive exploration of the fab 4
// Allows filtering based on constraints and a popup info window.
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({style: {width: '300px'}});
var panel2 = ui.Panel({style: {width: '600px'}});
var map = ui.Map();
ui.root.add(panel).add(panel2).add(map);
map.setCenter(-105.00167216364025, 46.874732898021385, 5);
map.style().set('cursor', 'crosshair');
panel2.add(ui.Label("Currently, there is an effort to develop conservation strategies for four declining endemic grassland birds of the Great Plains, including Sprague’s Pipit, Chestnut-collared Longspur, Thick-billed Longspur, and Baird’s Sparrow (Somershoe 2018). Multiple density and/or distribution models for the breeding range of these species are available; however, they were developed using different survey data, analytical techniques, landscape scales, resolutions, spatial extents, and temporal representation. Understandably, this has caused confusion for conservation planning efforts."))
panel2.add(ui.Label("We utilized existing models to create weighted mean layers of occurrence for these four species. We incorporated models from six sources (Lipsey 2015, Niemuth et al. 2017, Fedy et al. 2018, Fields et al. 2018, Fink et al. 2019, Robinson unpublished). Density models were transformed from a Poisson distribution to a binomial distribution (Royle and Nichols 2003). All models were projected to a common coordinate system with cells aligned. Weighted mean calculations give more weight to cell values that agrees with the ensemble of cell values at that location, with less weight given the further a cell deviates from the ensemble’s mean (Maestas et al. 2020).  Analyses were conducted at the native resolution and extent of constituent models, and all composite metric outputs were calculated using the maximum extent and minimum resolution of the ensemble. Raster processing documentation (python script) and weighted mean occurrence rasters can be downloaded here (https://ecos.fws.gov/ServCat/Reference/Profile/143522). Weighted mean outputs will be updated as new models are created."))
panel2.add(ui.Label("This app was created to view and filter the four grassland bird weighted mean occurrence layers. We thank collaborators eBird (Fink et al. 2019), Prairie Habitat Joint Venture (Jim Devries), Ducks Unlimited Canada’s Institute for Wetland and Waterfowl Research (Brad Fedy), Environment and Climate Change Canada (Barry Robinson), Prairie Pothole Joint Venture (Sean Fields), Bird Conservancy of the Rockies (Chris Latimer), and the United State Fish and Wildlife Service (Habitat and Population Evaluation Team: Neal Niemuth and Jason Tack; Partner’s Program: Marisa Sather)."))
// panel2.add(ui.Label("In accordance with a data sharing agreement with Environment and Climate Change Canada please note: This product has been produced by Kevin Barnes (United States Fish and Wildlife Service) and includes data provided by Environment and Climate Change Canada. The incorporation of data sourced from Environment and Climate Change Canada within this product shall not be construed as constituting an endorsement by Environment and Climate Change Canada of our product."))
// panel2.add(ui.Label("1. Her Majesty the Queen in Right of Canada ('Canada') is the owner, or a licensee, of Intellectual Property Rights in Grassland Bird Weighted Mean Occurrence Models (GBWMOM) and has licensed to United States Fish and Wildlife Service certain rights to such intellectual property, including the right to sublicense it to third parties, on certain terms and conditions. With payment of the requisite fee (where applicable), data users are hereby granted a non-exclusive, world-wide, non-assignable licence to exercise such of Canada’s Intellectual Property Rights in GBWMOM as is necessary for Customer to use, reproduce, extract, modify, translate, further develop and further distribute GBWMOM, and as is necessary for Customer to manufacture and distribute products that Customer may develop by constructing, deriving, developing, adapting, incorporating or by any other means using GBWMOM, in whole or in part."))
// panel2.add(ui.Label("2. Customer shall include on all products Customer develops or causes to be developed in the exercise of Customer’s rights under section 1 above, in a prominent location, the following notice: This product has been produced by or for __________ (Customer’s name) and includes data provided by Environment and Climate Change Canada The incorporation of data sourced from Environment and Climate Change Canada within this product shall not be construed as constituting an endorsement by Environment and Climate Change Canada"))
// panel2.add(ui.Label("3. All copyright, other proprietary notices of Canada and metadata appearing on or incorporated into GBWMOM, as well as any and all conditions of use associated with GBWMOM, shall be incorporated and maintained on all reproductions of GBWMOM."))
// panel2.add(ui.Label("4. Customer shall not disassemble, decompile except for the specific purpose of recompiling for software compatibility, or in any way attempt to reverse engineer GBWMOM or any part thereof."))
// panel2.add(ui.Label("5. Customer shall not merge or link GBWMOM with any product or database in such a fashion that gives the appearance that Customer may have received, or had access to, information held by Canada about any identifiable individual, family, household, organization or business."))
// panel2.add(ui.Label("6. GBWMOM IS PROVIDED ON AN ‘AS-IS’ BASIS. CUSTOMER ACKNOWLEDGES AND AGREES THAT CANADA HAS MADE NO REPRESENTATION OR WARRANTY OF ANY KIND WITH RESPECT TO THE ACCURACY, USEFULNESS, NOVELTY, VALIDITY, SCOPE, COMPLETENESS OR CURRENCY OF GBWMOM OR ANY ELEMENTS THEREIN CONTAINED AND HAS EXPRESSLY DISCLAIMED ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OF GBWMOM."))
// panel2.add(ui.Label("7. CUSTOMER SHALL HAVE NO RECOURSE AGAINST CANADA, WHETHER BY WAY OF ANY SUIT OR ACTION OR OTHER, FOR ANY LOSS, LIABILITY, DAMAGE OR COST THAT CUSTOMER MAY SUFFER OR INCUR AT ANY TIME, BY REASON OF CUSTOMER’S POSSESSION OR USE OF GBWMOM."))
panel2.add(ui.Label("Citations"))
panel2.add(ui.Label("Fedy, B., J. H. Devries, D. W. Howerter, and J. R. Row. 2018. Distribution of priority grassland bird habitats in the Prairie Pothole Region of Canada. Avian Conservation and Ecology 13(1):4. https://doi.org/10.5751/ACE-01143-130104"))
panel2.add(ui.Label("Fields S. P., K. W. Barnes, N. D. Niemuth, R. Iovanna, A. J. Ryba, and P. J. Moore. 2018. Developing decision support tools for optimizing retention and placement of Conservation Reserve Program grasslands in the Northern Great Plains for grassland birds. Report prepared for the United States Department of Agriculture Farm Service Agency Reimbursable Fund Agreement 16-IA-MRE CRP TA 5. www.fsa.usda.gov/Assets/USDA-FSA-Public/usdafiles/EPAS/natural-resouces-analysis/Wildlife/pdfs/FSA_Optimizing_CRP_Interim_Report_092917.pdf"))
panel2.add(ui.Label("Fink, D., T. Auer, A. Johnston, V. Ruiz-Gutierrez, W. M. Hochachka, and S. Kelling. 2019. Modeling avian full annual cycle distribution and population trends with citizen science data. Ecological Applications 30:e02056. https://doi.org/10.1002/eap.2056 "))
panel2.add(ui.Label("Lipsey, M. K. S. 2015. Cows and plows: science-based conservation for grassland songbirds in agricultural landscapes. University of Montana, Missoula, MT, USA "))
panel2.add(ui.Label("Maestas J., M. Jones, N. Pastick, M. Rigge, B. Wylie, L. Garner, M. Crist, C. Homer, S. Boyte, and B. Witacre. 2020. Annual Herbaceous Cover across Rangelands of the Sagebrush Biome: U.S. Geological Survey data release, https://doi.org/10.5066/P9VL3LD5; https://chohnz.users.earthengine.app/; https://rangelands.app/products/annualHerbaceousCoverMethods.pdf"))
panel2.add(ui.Label("Niemuth, N. D., M. E. Estey, S. P. Fields, B. Wangler, A. A. Bishop, P. J. Moore, R. C. Grosse, and A. J. Ryba. 2017. Developing spatial models to guide conservation of grassland birds in the U.S. Northern Great Plains. Condor 119:506-525. https://doi.org/10.1650/CONDOR-17-14.1"))
panel2.add(ui.Label("Pavlacky, D. C., Jr., R. A. Sparks, A. Van Boer, A. W. Green, and T. L. George. 2019. A species richness metric to quantify the response of grassland birds to the Conservation Reserve Program. Technical Report AG-3151-P-17-0222. Bird Conservancy of the Rockies, Brighton, Colorado, USA. https://www.birdconservancy.org/wp-content/uploads/2021/04/FSA-species-metric-final-report-2.pdf"))
panel2.add(ui.Label("Royle, J. A., and J. D. Nichols. 2003. Estimating abundance from repeated presence-absence data or point counts. Ecology 84:777-790. https://doi.org/10.1890/0012-9658(2003)084[0777:EAFRPA]2.0.CO;2"))
panel2.add(ui.Label("Somershoe, S. G. (editor). 2018. A Full Annual-Cycle Conservation Strategy for Sprague’s Pipit, Chestnut-collared and McCown’s Longspurs, and Baird’s Sparrow. U.S. Department of the Interior, Fish and Wildlife Service, Washington, D.C."))
//add admin
var admin = ee.FeatureCollection(table);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: admin,
  color: 1,
  width: 1
});
// Define some constants.
var BAIS = 'Bairds Sparrow';
var CCLO = 'Chestnut-collared Longspur';
var TBLO = 'Thick-billed Longspur';
var SPPI = 'Spragues Pipit'
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
// Create an empty list of filter constraints.
var constraints = [];
// Load the birds set vis
var baisVis = bais_wm.visualize({min:0, max:0.80, palette: ['indigo', 'cyan', 'LimeGreen','yellow']});
var ccloVis = cclo_wm.visualize({min:0, max:0.80, palette: ['indigo', 'cyan', 'LimeGreen','yellow']});
var sppiVis = sppi_wm.visualize({min:0, max:0.80, palette: ['indigo', 'cyan', 'LimeGreen','yellow']});
var tbloVis = tblo_wm.visualize({min:0, max:0.80, palette: ['indigo', 'cyan', 'LimeGreen','yellow']});
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [BAIS, CCLO, SPPI, TBLO],
  value: SPPI,
  onChange: redraw,
});
panel.add(ui.Label('Select Bird:')).add(select);
// Check-boxes to control which layers are shown in the inspector.
panel.add(ui.Label('Info box fields:'));
var baisCheck = ui.Checkbox(BAIS).setValue(false);
panel.add(baisCheck);
var ccloCheck = ui.Checkbox(CCLO).setValue(false);
panel.add(ccloCheck);
var sppiCheck = ui.Checkbox(SPPI).setValue(true);
panel.add(sppiCheck);
var tbloCheck = ui.Checkbox(TBLO).setValue(false);
panel.add(tbloCheck);
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({style: {shown: false}});
map.add(inspector);
// Register an onClick handler that populates and shows the inspector panel.
map.onClick(function(coords) {
  // Gather the image bands into a single Image that we can asynchronously sample.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = ee.Image.cat(bais_wm, cclo_wm, sppi_wm, tblo_wm)
      .unmask(0).sample(point, 210).first().toDictionary();
      print(sample)
  sample.evaluate(function(values) {
    inspector.clear();
    // Display a label that corresponds to a checked checkbox.
    if (baisCheck.getValue()) {
      inspector.add(ui.Label('BAIS: ' + values.b1 + ' weighted mean probability of occurrence'));
    }
    if (ccloCheck.getValue()) {
      inspector.add(ui.Label('CCLO: ' + values.b1_1 + ' weighted mean probability of occurrence'));
    }
    if (sppiCheck.getValue()) {
      inspector.add(ui.Label('SPPI: ' + values.b1_2 + ' weighted mean probability of occurrence'));
    }
    if (tbloCheck.getValue()) {
      inspector.add(ui.Label('TBLO: ' + values.b1_3 + ' weighted mean probability of occurrence'));
    }
    inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
// Add a label and select to enable adding a new filter.
panel.add(ui.Label('Filter by Occurrence Values:'));
var constraint = ui.Select({
  items: [BAIS, CCLO, SPPI, TBLO],
  placeholder: '[Choose a Variable...]',
  onChange: selectConstraint,
});
panel.add(constraint);
// Create a function that configures a new constraint.
function addConstraint(name, image, defaultValue) {
  panel.add(ui.Label('Filter by ' + name + ':'));
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  // Create a greater-than / less-than selector.
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN],
    value: GREATER_THAN,
    onChange: redraw,
  });
  subpanel.add(mode);
  // Create a textbox for the filter threshold.
  var input = ui.Textbox({
    value: defaultValue,
    style: {width: '100px'},
    onChange: redraw,
  });
  subpanel.add(input);
  panel.add(subpanel);
  // Add this constraint to the global list so we can access the
  // constraints from the redraw() function in the future.
  constraints.push({
    image: image,
    mode: mode,
    value: input,
  });
  redraw();
}
// Create a function that adds a constraint of the requested type.
function selectConstraint(name) {
  if (name == BAIS) {
    addConstraint(name, bais_wm, .1);
  } else if (name == CCLO) {
    addConstraint(name, cclo_wm, .1);
  } else if (name == SPPI) {
    addConstraint(name, sppi_wm, .1);
  } else if (name == TBLO) {
    addConstraint(name, tblo_wm, .1);
  }
  constraint.setValue(null);
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == BAIS) {
    image = baisVis;
  } else if (layer == CCLO) {
    image = ccloVis;
  } else if (layer == SPPI) {
    image = sppiVis;
  } else if (layer == TBLO) {
    image = tbloVis;
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
  map.addLayer(image, {}, layer);
  map.addLayer(outline, {palette: 'white'}, 'boundaries');
}
// Invoke the redraw function once at start up to initialize the map.
redraw();