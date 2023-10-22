var diagnostics = require('users/randd-eesd/prod:trends/1.2/modules/diagnostics');
var panels      = require('users/randd-eesd/prod:trends/1.2/modules/panels'     );
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
// Generate some diagnostics (Sen's slope histograms)
print(diagnostics.histogram_wStress);
print(diagnostics.histogram_NDVI   );
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
ui.root.clear();
ui.root.add(panels.splitPanel);
ui.root.add(panels.panelMain);