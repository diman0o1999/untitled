// import '../src/stylesheets/application';
//
// import 'jquery';
// import 'jquery-ujs';
// import Application from 'application-namespace';
// import Turbolinks from 'turbolinks';
//
// import 'jquery-ui';
//
// import 'moment';
// import 'bootstrap';
// import 'bootstrap-sass';
// import 'bootstrap-touchspin';
//
// import 'imports-loader?module=>false,define=>false,this=>window!bootstrap-dialog';
//
// import 'eonasdan-bootstrap-datetimepicker';
// import 'pickadate/lib/legacy';
// import 'pickadate/lib/picker';
// import 'pickadate/lib/picker.date';
// import 'pickadate/lib/picker.time';
// import 'bootstrap-toggle';
// import 'imports-loader?define=>false,module=>false!toastr';
//
// import 'select2';
// import 'jstree';
//
// // require jquery-datatable/js/jquery.dataTables
// // require jquery-datatable/js/dataTables.bootstrap
// // require jquery-datatable-editor/js/dataTables.editor
//
// import 'datatables.net-bs4';
//
// import 'cocoon-rails';
// import 'offline-js';
// import 'jquery-treetable';
// import 'js-cookie';
// import 'jstz';
//
// import 'pusher-js';
// import 'chart.js';
// import 'bootstrap-daterangepicker';
// import 'nprogress';
//
// window.Routes = require('routes');
// window.Ladda = require('ladda');
// // import 'tabulator-tables';
// window.Tabulator = require('tabulator-tables');
// window._ = require('lodash');

// function importAll(r) { r.keys().forEach(r); }
// importAll(require.context('../src/javascripts/plugins', true));
// importAll(require.context('../src/javascripts/core', true));
// importAll(require.context('../src/javascripts/abs_classes', true));
// importAll(require.context('../src/javascripts/concerns', true));
// importAll(require.context('../src/javascripts/classes', true));
//

// // Rails.start();
// Turbolinks.start({ cache: false });



function scrollToDownload() {
    if ($('.section-download').length != 0) {
        $("html, body").animate({
            scrollTop: $('.section-download').offset().top
        }, 1000);
    }
}
$( document ).ready(function() {
    console.log( "ready!" );
    // materialKit.initFormExtendedDatetimepickers();
    // materialKit.initSliders();
    // Application.app = new Application.Core();
    // Application.app.start();
});
// Application.Core = class Core {
//     constructor() {
//         console.log('webpac');
//     }
// }
