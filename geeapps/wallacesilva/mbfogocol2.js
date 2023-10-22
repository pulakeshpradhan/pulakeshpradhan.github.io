var fogo = require('users/geomapeamentoipam/MapBiomas__Fogo:00_Tools/Datasets.js').get('MapBiomas-Fogo');
var mapbiomas = require('users/workspaceipam/packpages:toolkits/datasets/beta').get('MapBiomas Public Data');
var covariates = mapbiomas.concat(fogo);
//print('covariates',covariates);
// require('users/workspaceipam/packpages:toolkits/kyoshi/avatar/v1-3-4').start(covariates);
// require('users/workspaceipam/packpages:toolkits/kyoshi/avatar/staging').start(covariates);
require('users/workspaceipam/packpages:toolkits/kyoshi/avatar/production').start(covariates);