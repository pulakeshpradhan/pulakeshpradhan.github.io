var watersheds = require('users/johnkucharski/cadillacdesert:views/watersheds');
var landuses = require('users/johnkucharski/cadillacdesert:views/landuse');
var vegetations = require('users/johnkucharski/cadillacdesert:views/vegetation');
var widgets = {
  introduction: {
    title: ui.Label({value: 'USACE Watershed Explorer', style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}}),
    instruction: ui.Label({value: 'Select a watershed to explore', style: {fontSize: '16px'}}),
    selectedButton: ui.Button(
      {label: watersheds.view.events.selectedWatershedName(), 
       onClick: function() {
         widgets.introduction.selectedButton.setLabel('The '+watersheds.view.events.selectedWatershedName()+' watershed has been selected.');
         widgets.introduction.selectedButton.setDisabled(true);
         widgets.landUse.animationButton.setLabel('click to animate land use data');
         widgets.landUse.animationButton.setDisabled(false);
         //widgets.vegetation.animationButton.setLabel('click to animate EVI');
         //widgets.vegetation.animationButton.setDisabled(false);
         application.data.watershed = watersheds.view.layer;
         watersheds.view.model.data = application.data.watershed;
         application.data.landUse = landuses.view.model.clippers.watershed(application.data.watershed);
         landuses.view.model.data = application.data.landUse;
         application.data.vegetation = vegetations.view.model.clippers.watershed(application.data.watershed);
         vegetations.view.model.data = application.data.vegetation;
         application.panels.introductionPanel.add(application.panels.vegetationPanel);
        // Map.addLayer(
        //     {eeObject: application.data.landUse,
        //     visParams: landuses.view.visibilityParameters,
        //     name: 'Land Use',
        //     shown: true,
        //     opacity: 0.50}
        //   );
        // Map.addLayer(
        //   {eeObject: application.data.vegetation,
        //     visParams: vegetations.view.visibilityParameters.evi,
        //     name: 'EVI', 
        //     shown: true,
        //     opacity: 0.50}
        //   );
         //application.panels.introductionPanel.insert(2, ui.Label('The watershed listed below has been selected...'));
         //application.panels.introductionPanel.add(application.panels.landUsePanel);
       },
       disabled: true}),
    //selectedWatershed: ui.Label({value: watersheds.view.events.selectedWatershedName(), style: {margin: '2px'}})
  },
  landUse: {
    title: ui.Label({value: 'Select a year and land uses to explore', style: {fontSize: '16px'}}),
    slider: landuses.view.slider,
    All: landuses.view.checkboxes.Land_Cover_Type_1,
    Water: landuses.view.checkboxes.Water,
    EvergreenNeedleleafForest: landuses.view.checkboxes.EvergreenNeedleleafForest,
    EvergreenBroadleafForest: landuses.view.checkboxes.EvergreenBroadleafForest,
    DeciduousNeedleleafForest: landuses.view.checkboxes.DeciduousNeedleleafForest,
    DeciduousBroadleafForest: landuses.view.checkboxes.DeciduousBroadleafForest,
    MixedForest: landuses.view.checkboxes.MixedForest,
    ClosedShrublands: landuses.view.checkboxes.ClosedShrublands,
    OpenShrublands: landuses.view.checkboxes.OpenShrublands,
    WoodySavannas: landuses.view.checkboxes.WoodySavannas,
    Savannas: landuses.view.checkboxes.Savannas,
    Grasslands: landuses.view.checkboxes.Grasslands,
    PermanentWetlands: landuses.view.checkboxes.PermanentWetlands,
    Croplands: landuses.view.checkboxes.Croplands,
    UrbanAndBuiltup: landuses.view.checkboxes.UrbanAndBuiltup,
    CroplandNaturalVegetationMosaic: landuses.view.checkboxes.CroplandNaturalVegetationMosaic,
    SnowAndIce: landuses.view.checkboxes.SnowAndIce,
    BarrenOrSparselyVegetated: landuses.view.checkboxes.BarrenOrSparselyVegetated,
    Unclassified: landuses.view.checkboxes.Unclassified, 
    animationButton: ui.Button(
      {label: 'selected a watershed to animate',
       onClick: function() {
         var collection = application.data.landUse.map(function(image) { return image.clip(application.data.watershed);});
         landuses.view.events.liveAnimation(collection);
         animationButton.setDisabled(true);
       },
       disabled: true
      }
    )
  },
  vegetation: {
    title: ui.Label({value: 'Explore vegetation in the selected watershed', style: {fontSize: '16px'}}),
    description: ui.Label({value: 'Note: the Enhanced Vegetation Index (EVI) is a simple measure of vegetation health. It measures the greenness of plants or more specifically the amount of photosyntethetically available light being absorbed by the vegetation. It is commonly used to measure agricultural drought.',
      style: {fontSize: '10px'}
    }),
    slider: vegetations.view.slider,
    animationButton: ui.Button(
      {label: 'select a watershed to animate',
       onClick: function() {
         vegetations.view.events.liveAnimation(application.data.vegetation, vegetations.view.visibilityParameters.evi);},
       disabled: true
      }
    )
  }
};
var application = {
  data: {
    watershed: 'No watershed selected',
    landUse: 'No land use selected',
    vegetation: 'No vegetation selected'
  },
  panels: {
    introductionPanel: ui.Panel({
      widgets: [widgets.introduction.title, widgets.introduction.instruction, widgets.introduction.selectedButton],
      style: {width: '400px', padding: '2px'}
    }),
    landUsePanel: ui.Panel({
      widgets: [
        widgets.landUse.title, 
        widgets.landUse.slider,
        widgets.landUse.All, 
        widgets.landUse.Water, 
        widgets.landUse.EvergreenNeedleleafForest, 
        widgets.landUse.EvergreenBroadleafForest, 
        widgets.landUse.DeciduousNeedleleafForest,
        widgets.landUse.DeciduousBroadleafForest,
        widgets.landUse.MixedForest,
        widgets.landUse.ClosedShrublands,
        widgets.landUse.OpenShrublands,
        widgets.landUse.WoodySavannas,
        widgets.landUse.Savannas,
        widgets.landUse.Grasslands,
        widgets.landUse.PermanentWetlands,
        widgets.landUse.Croplands,
        widgets.landUse.UrbanAndBuiltup,
        widgets.landUse.CroplandNaturalVegetationMosaic,
        widgets.landUse.SnowAndIce,
        widgets.landUse.BarrenOrSparselyVegetated,
        widgets.landUse.Unclassified,
        widgets.landUse.animationButton
        ]
    }),
    vegetationPanel: ui.Panel({
      widgets: [
        widgets.vegetation.title,
        widgets.vegetation.description,
        widgets.vegetation.slider,
        //widgets.vegetation.animationButton
        ]
    })
  },
  bootup: function() {
    ui.root.insert(0, application.panels.introductionPanel);
    application.panels.introductionPanel.add(application.panels.landUsePanel);
    application.panels.introductionPanel.add(application.panels.vegetationPanel);
  },
  events: {
    mapClick: function(geometry) {
      watersheds.view.events.drillDown(geometry);
      var watershed = watersheds.view.events.selectedWatershedName();
      widgets.introduction.selectedButton.setDisabled(false);
      widgets.introduction.selectedButton.setLabel('Finalize Selection: '+watershed);
      application.data.watershed = watershed;
        // application.panels.introductionPanel.add(ui.Label(
        //   {value: watersheds.view.events.selectedWatershedName(),
        //   style: { fontWeight: 'bold', fontSize: '14px', margin: '2px', textAlign: 'center'}
        //   }
        //)
        //);
    },
  },
  helpers: {
  }
};
application.bootup();
Map.onClick(application.events.mapClick);