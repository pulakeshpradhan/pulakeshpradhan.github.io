var mapbiomas = require('users/workspaceipam/packpages:toolkits/datasets/beta').get('MapBiomas Public Data');
var referencia = require('users/wallacesilva/mapbiomas-solos:carbonStock-RF/tools/Datasets.js').get('refrence');
var solo_beta = require('users/wallacesilva/mapbiomas-solos:carbonStock-RF/tools/Datasets.js').get('MapBiomas Solo beta');
var covariates = mapbiomas
  // .concat(referencia)
  // .concat(solo_v1_5_0)
  // .concat(solo_v1_6_2)
  // .concat(solo_v1_7_2)
  // .concat(solo_v1_7_1)
  // .concat(solo_v1_7_3)
  .concat(solo_beta);
require('users/workspaceipam/packpages:toolkits/kyoshi/avatar/production').start(covariates);