// require 
var sm = require('users/SyLonek/lcu:SM/sm_v1'); 
// The namespace for our application.  All the state is kept in here.
var app = {};
app.createparameters = function(){
  app.param = {
    roi             : app.rois.roi_ID.getValue(),
    start_date      : app.filters.startDate.getValue(),
    end_date        : app.filters.endDate.getValue(),
    Sar_COL_ID      : app.filters.Sar_COL_ID.getValue(),
    Optic_COL_ID    : app.filters.Optic_COL_ID.getValue(),
    filter_methed   : app.speckle_filter.filter_methed.getValue(),
    kernel_size     : app.speckle_filter.kernel_size.getValue(),
    framework_flag  : app.speckle_filter.ML_flag.getValue(),
    Index_ID        : app.Index_filter.index_ID.getValue(),
    gap_fill_methed : app.Index_filter.gap_fill_methed.getValue(),
    index_ori_vis   : app.Index_filter.index_ori_vis.getValue(),
    index_gap1_vis  : app.Index_filter.index_gap1_vis.getValue(),
    index_gap2      : app.Index_filter.index_gap2.getValue(),
    index_gap2_vis  : app.Index_filter.index_gap2_vis.getValue(),
    Model_ID        : app.SM_Model.Model_ID.getValue(),
    download_flag   : app.result_option.download_flag.getValue(),
    sm_vis          : app.result_option.sm_vis.getValue(),
    folder_name     : app.download_detail.Folder_name.getValue(),
    file_name       : app.download_detail.File_name.getValue(),
    epsg            : app.download_detail.EPSG_name.getValue(),
    scales          : app.download_detail.Scales.getValue(),
    clip_flag       : app.download_detail.Clip_flag.getValue(),
    a_num           : app.wcm_detail.a_num.getValue(),
    b_num           : app.wcm_detail.b_num.getValue(),
    c_num           : app.wcm_detail.c_num.getValue(),
    d_num           : app.wcm_detail.d_num.getValue(),
    vd_num          : app.wcm_detail.vd_name.getValue(),
    project_name    : app.ml_detail.project_name.getValue(),
    model_name      : app.ml_detail.model_name.getValue(),
    version_n       : app.ml_detail.version_label.getValue(),
    title_size      : app.ml_detail.size_num.getValue(),
    ml_projection   : app.ml_detail.proj_name.getValue(),
    ml_scale        : app.ml_detail.scale_num.getValue(),
  }
}
/** Creates the app constants. */
app.createConstants = function() {
  app.OPTIC_ID = ['Sentienl-2(TOA)','Sentienl-2(SR)','Landsat8','Landsat7','Landsat7/8','Landsat7/8-S2(SR)'];
  app.SAR_ID = ['Sentienl-1','etc'];
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.Front_Label_STYLE = {
      margin: '12px 0 0 5px',
      // fontSize: '12px',
      // color: 'gray'
  };
  app.details_style = {stretch: 'horizontal', color:'black',width:'70px',height:'30px',padding:'0 1px 0 0'};
  app.download_details_style= {stretch: 'horizontal', color:'black',width:'140px',height:'30px',padding:'0 1px 0 0'};
  app.SPECKLE_FILTER = ['BOXCAR','LEE','GAMMA MAP','REFINED LEE','LEE SIGMA'];
  app.index_name = ['NDVI','etc'];
  app.gap_fill_name = ['Savitzky–Golay filter','etc'];
  app.s_vd_name = ['VWC','etc.']
  app.Model_name = ['Machine learning','Water Cloud Model'];
};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'High Spatial Resolution Soil Moisture Estimation Framework',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to retrieval soil moisture.')
    ])
  };
   /* The Input roi. */
   app.rois = {
    roi_label:ui.Label('Please input Tbale ID : ',app.Front_Label_STYLE),
    roi_ID:ui.Textbox('roi path','projects/changlingn/assets/nd1984'),
   }
   app.rois_panel = ui.Panel({
    widgets:[
      ui.Label('Input Region of Interest ',{fontWeight:'bold',fontSize:'20px'}),
      ui.Panel([app.rois.roi_label,app.rois.roi_ID],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:app.SECTION_STYLE
   });
   /* The collection filter controls. */
  app.filters = {
    Optic_label:ui.Label('Choose Optic Dataset : ',app.Front_Label_STYLE),
    Optic_COL_ID:ui.Select({items:app.OPTIC_ID,placeholder:'Choose one collection'}),
    Sar_label:ui.Label('Choose SAR Dataset : ',app.Front_Label_STYLE),
    Sar_COL_ID:ui.Select({items:app.SAR_ID,placeholder:'choose one collection'}),
    startDate_label:ui.Label('Start Date: ',app.Front_Label_STYLE),
    startDate: ui.Textbox('YYYY-MM-DD','2017-04-01'),
    endDate_label:ui.Label('End Date: ',app.Front_Label_STYLE),
    endDate: ui.Textbox('YYYY-MM-DD','2017-11-01'),
  };
    /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets:[
      ui.Label('Select Collection and Date',{fontWeight:'bold',fontSize:'20px'}),
      ui.Panel([app.filters.Optic_label,app.filters.Optic_COL_ID],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.filters.Sar_label,app.filters.Sar_COL_ID],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.filters.startDate_label,app.filters.startDate],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.filters.endDate_label,app.filters.endDate],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:app.SECTION_STYLE
  });
   /* The speckle filter controls. */
  app.speckle_filter = {
    methed_label : ui.Label('Choose Filter methed :',app.Front_Label_STYLE),
    filter_methed : ui.Select({items:app.SPECKLE_FILTER,placeholder:'choose one filter'}),
    size_label:ui.Label('Kernel Size: ',app.Front_Label_STYLE),
    kernel_size: ui.Textbox('Must be odd number','7'),
    ML_flag:ui.Checkbox({label: 'Multitemporal Speckle filter', value: false}),
  };
   /* The panel for the sepckle filter control widgets. */
  app.speckle_filter_panel = ui.Panel({
    widgets:[
      ui.Label('SAR Speckle Filter Options',{fontWeight:'bold',fontSize:'20px'}),
      ui.Panel([app.speckle_filter.methed_label,app.speckle_filter.filter_methed],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      app.speckle_filter.ML_flag,
      ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '20px 0 0 0'}
  });
  /* more panel */
  app.sar_filter_detail_panel = ui.Panel({
    widgets:[ui.Panel([app.speckle_filter.size_label,app.speckle_filter.kernel_size],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
     ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '0 0 0 0',shown: false}
  })
   /* This part is index gap  */
  app.Index_filter = {
    index_label : ui.Label('Choose Index :',app.Front_Label_STYLE),
    index_ID :ui.Select({items:app.index_name,placeholder:'choose one index'}),
    gap_fill_label : ui.Label('Choose Gap Fill Methed :',app.Front_Label_STYLE),
    gap_fill_methed : ui.Select({items:app.gap_fill_name,placeholder:'choose one index'}),
    index_ori_vis:ui.Checkbox({label: 'Original index Visualization', value: false}),
    index_gap1_vis:ui.Checkbox({label: 'Gap Fill Visualization', value: false}),
    index_gap2:ui.Checkbox({label: 'Gap Smoothing', value: false}),
    index_gap2_vis:ui.Checkbox({label: 'Gap Smooth Visualization', value: false}),
//gap_kernel_label:
  };
  app.Index_filter.panel = ui.Panel({
    widgets:[
      ui.Label('Optical Index and Gap Options',{fontWeight:'bold',fontSize:'20px'}),
      ui.Panel([app.Index_filter.index_label,app.Index_filter.index_ID],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.Index_filter.gap_fill_label ,app.Index_filter.gap_fill_methed],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:app.SECTION_STYLE
  });
  app.index_detail_panel = ui.Panel({
    widgets:[
      app.Index_filter.index_ori_vis,
      app.Index_filter.index_gap1_vis,
      app.Index_filter.index_gap2,
      app.Index_filter.index_gap2_vis,
     ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '0 0 0 0',shown: false}
  })
   /* This part is soil moisture methed  */
  app.SM_Model = {
    Model_label :ui.Label('Choose Soil Moisture Retrieval Model :',app.Front_Label_STYLE),
    Model_ID :ui.Select({items:app.Model_name,placeholder:'choose one methed'}),
  }
  app.SM_Model.panel = ui.Panel({
    widgets:[
       ui.Label('Soil Moisture Model Options',{fontWeight:'bold',fontSize:'20px'}),
      app.SM_Model.Model_label,app.SM_Model.Model_ID
      ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:app.SECTION_STYLE
  })
   app.wcm_detail = {
    A_label   : ui.Label('A parameter : ',app.Front_Label_STYLE),
    a_num     : ui.Textbox('a parameter','0.0014'),
    B_label   : ui.Label('B parameter : ',app.Front_Label_STYLE),
    b_num     : ui.Textbox('b parameter','0.084'),
    VD_label  : ui.Label('vegetation description : ',app.Front_Label_STYLE),
    vd_name   : ui.Select({items:app.s_vd_name,placeholder:'choose v d'}),
    C_label   : ui.Label('C parameter : ',app.Front_Label_STYLE),
    c_num     : ui.Textbox('slope','0.2043'),
    D_label   : ui.Label('D parameter : ',app.Front_Label_STYLE),
    d_num     : ui.Textbox('intercept','9.5372'),
   }
   app.wcm_detail_panel = ui.Panel({
    widgets:[
      ui.Panel([app.wcm_detail.A_label,app.wcm_detail.a_num],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.wcm_detail.B_label,app.wcm_detail.b_num],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.wcm_detail.VD_label,app.wcm_detail.vd_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.wcm_detail.C_label,app.wcm_detail.c_num ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.wcm_detail.D_label,app.wcm_detail.d_num ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
     ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '0 0 0 0',shown: false}
  })
  app.ml_detail = {
    Project_label: ui.Label('Project name : ',app.Front_Label_STYLE),
    project_name : ui.Textbox('project name'),
    Model_label  : ui.Label('Model name : ',app.Front_Label_STYLE),
    model_name   : ui.Textbox('model name'),
    version_label  : ui.Label('Version : ',app.Front_Label_STYLE),
    version_num : ui.Textbox('version number ','v0'),
    Title_label : ui.Label('Title size : ',app.Front_Label_STYLE),
    size_num       : ui.Textbox('inputTitlesize ','[8,8]'),
    proj_label : ui.Label('Projection : ',app.Front_Label_STYLE),
    proj_name   : ui.Textbox('projection ','EPSG:4326'),
    scale_label : ui.Label('Image scale : ',app.Front_Label_STYLE),
    scale_num   : ui.Textbox('scale ','30'),
   }
   app.ml_detail_panel = ui.Panel({
    widgets:[
      ui.Panel([app.ml_detail.Project_label,app.ml_detail.project_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.ml_detail.Model_label,app.ml_detail.model_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.ml_detail.version_label,app.ml_detail.version_num],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.ml_detail.Title_label,app.ml_detail.size_num ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.ml_detail.proj_label,app.ml_detail.proj_name ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.ml_detail.scale_label,app.ml_detail.scale_num ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
     ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '0 0 0 0',shown: false}
  })
   /* This part is result options  */
   app.result_option = {
     apply_para : ui.Button({
       label:'Apply',
       onClick: app.applypara
     }),
     clear_button: ui.Button({
       label: ' Clear Map',
       onClick: function(){
         Map.clear();
       }
     }),
     download_flag:ui.Checkbox({label: 'Download Soil Moisture Result', value: false}),
     sm_vis:ui.Checkbox({label: 'Soil Moisture Result Visualization', value: false}),
   }
   app.download_detail = {
    Folder_label: ui.Label('Folder Name : ',app.Front_Label_STYLE),
    Folder_name : ui.Textbox('Folder Name'),
    File_label  : ui.Label('File Name : ',app.Front_Label_STYLE),
    File_name   : ui.Textbox('file name description'),
    EPSG_label  : ui.Label('EPSG : ',app.Front_Label_STYLE),
    EPSG_name   : ui.Textbox('EPSG:4326 etc.','EPSG:4326'),
    Scale_label : ui.Label('Scale : ',app.Front_Label_STYLE),
    Scales      : ui.Textbox('Input scale '),
    Clip_flag   : ui.Checkbox({label: 'Clip result', value: false}),
   }
   app.download_detail_panel = ui.Panel({
    widgets:[
      ui.Panel([app.download_detail.Folder_label,app.download_detail.Folder_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.download_detail.File_label,app.download_detail.File_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.download_detail.EPSG_label,app.download_detail.EPSG_name],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      ui.Panel([app.download_detail.Scale_label,app.download_detail.Scales ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
      app.download_detail.Clip_flag,
     ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:{margin: '0 0 0 0',shown: false}
  })
   app.result_option_panel = ui.Panel({
    widgets:[
      ui.Label('Result Options',{fontWeight:'bold',fontSize:'20px'}),
      app.result_option.download_flag,
      app.result_option.sm_vis,
       ],
    layout:ui.Panel.Layout.Flow('vertical'),
    style:app.SECTION_STYLE
   })
   app.final_panel = ui.Panel({
    widgets:[
      ui.Panel([app.result_option.apply_para,app.result_option.clear_button],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
       ],
    layout:ui.Panel.Layout.Flow('vertical'),
   })
}
 /* This part is button fucntion   */
 app.createFunctions = function(){
   app.applypara = function(){
   app.createparameters();
   var sm_res = sm.sm_f(app.param);
  // if(app.param.download_flag)
  // { lazy.ExportImages(null,soilmois,'SM','SM','EPSG:4326',roi,30) }
   print('SM Done');
   }
   app.sar_filter_detail = function(){
     if(app.sar_filter_detail_panel.style().get('shown')){
        app.control_button.SAR_details_panel.setLabel('More >>');
        app.sar_filter_detail_panel.style().set('shown', false);
     }else{
        app.control_button.SAR_details_panel.setLabel('More <<');
        app.sar_filter_detail_panel.style().set('shown', true);
     }
   }
   app.index_detail = function(){
     if(app.index_detail_panel.style().get('shown')){
        app.control_button.Index_details_panel.setLabel('More >>');
        app.index_detail_panel.style().set('shown', false);
     }else{
        app.control_button.Index_details_panel.setLabel('More <<');
        app.index_detail_panel.style().set('shown', true);
     }
   }
   app.Download_details = function(){
     if(app.download_detail_panel.style().get('shown')){
        app.control_button.Download_details_panel.setLabel('Download Details >>');
        app.download_detail_panel.style().set('shown', false);
     }else{
        app.control_button.Download_details_panel.setLabel('Download Details <<');
        app.download_detail_panel.style().set('shown', true);
     }
   }
   app.WCM_details = function(){
     if(app.wcm_detail_panel.style().get('shown')){
        app.control_button.WCM_details_panel.setLabel('WCM Details >>');
        app.wcm_detail_panel.style().set('shown', false);
     }else{
        app.control_button.WCM_details_panel.setLabel('WCM Details <<');
        app.wcm_detail_panel.style().set('shown', true);
     }
   }
   app.ML_details = function(){
     if(app.ml_detail_panel.style().get('shown')){
        app.control_button.ML_details_panel.setLabel('ML Details >>');
        app.ml_detail_panel.style().set('shown', false);
     }else{
        app.control_button.ML_details_panel.setLabel('ML Details <<');
        app.ml_detail_panel.style().set('shown', true);
     }
   }
}
 /* This part is control button   */
app.createControl = function(){ 
app.control_button = {
   SAR_details_panel : ui.Button({
    label: 'More >>', 
    style:app.details_style,
    onClick:app.sar_filter_detail,
  }),
   Index_details_panel : ui.Button({
    label: 'More >>', 
    style:app.details_style,
    onClick:app.index_detail,
  }),
  WCM_details_panel : ui.Button({
    label: 'WCM Details >>', 
    style:app.download_details_style,
    onClick:app.WCM_details,
  }),
  ML_details_panel : ui.Button({
    label: 'ML Details >>', 
    style:app.download_details_style,
    onClick:app.ML_details,
  }),
  Download_details_panel : ui.Button({
    label: 'Download Details >>', 
    style:app.download_details_style,
    onClick:app.Download_details,
  }),
  } 
}
app.boot = function() {
   app.createConstants();
   app.createFunctions();
   app.createPanels();
   app.createControl();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.rois_panel,
      app.filters.panel,
      app.speckle_filter_panel,
      app.control_button.SAR_details_panel,
      app.sar_filter_detail_panel,
      app.Index_filter.panel,
      app.control_button.Index_details_panel,
      app.index_detail_panel,
      app.SM_Model.panel,
      app.control_button.WCM_details_panel,
      app.wcm_detail_panel,
      app.control_button.ML_details_panel,
      app.ml_detail_panel,
      app.result_option_panel,
      app.control_button.Download_details_panel,
      app.download_detail_panel,
      app.final_panel,
    ],
    style: {width: '360px', padding: '8px'}
  });
  Map.setCenter(118, 40, 5);
  ui.root.insert(0, main);
};
app.boot();