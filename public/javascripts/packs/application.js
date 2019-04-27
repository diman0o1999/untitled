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
// importAll(require.context('../src/js/plugins', true));
// importAll(require.context('../src/js/core', true));
// importAll(require.context('../src/js/abs_classes', true));
// importAll(require.context('../src/js/concerns', true));
// importAll(require.context('../src/js/classes', true));
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
function advertisementsCollection() {
    var compiled = _.template(`<div class="col">
                <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <h6 class="mb-0">
                            <a class="text-dark" href="/advertisements/<%- data['id'] %>"><%- data['title'] %></a>
                        </h6>
                        <div class="mb-1 text-muted small">Сегодня (дата)</div>
                        <p class="card-text mb-auto"> {{ title }}.</p>
                        <p class="card-text mb-auto"> {{ data_res }}.</p>
                        <p class="card-text mb-auto"> {{ data_req }}.</p>
                        <a class="btn btn-outline-primary btn-sm" role="button" href="http://www.jquery2dotnet.com/">
                           Приять участие
                        </a>
                    </div>
                    <img class="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]"
                         src="//placeimg.com/250/250/arch" style="width: 200px; height: 250px;">
                </div>
            </div>
    `);
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/todos",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function () {
            //called when complete
            console.log('process complete');
        },
        success: function (data) {
            _.forEach(data, function (value) {
                $('#data-array').append(compiled({data: value}));
            });
            console.log(data);
            console.log('process sucess');
        },

        error: function () {
            console.log('process error');
        },
    });
};

$(document).ready(function () {
    if ($('[data-class="Advertisements"]')) {
        advertisementsCollection();
    }
    console.log('start');
});
