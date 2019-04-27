// import Application from 'application-namespace';
// import $ from 'jquery';
// import _get from 'lodash/get';
// import moment from 'moment';
// import Turbolinks from 'turbolinks';
// // import BootstrapDialog from 'bootstrap-dialog';
//
// import Pusher from 'pusher-js';
// import * as Ladda from 'ladda';
// // import _each from 'lodash/each';

Application.Core = class Core {
    constructor() {
        this.afterRenderPage = this.afterRenderPage.bind(this);
        this.afterRenderPageAlertInit = this.afterRenderPageAlertInit.bind(this);
        this.bindClasses = this.bindClasses.bind(this);
        this.initializePlugins = this.initializePlugins.bind(this);
        this.initializeTouchSpin = this.initializeTouchSpin.bind(this);
        this.initializePopover = this.initializePopover.bind(this);
        this.initializeZipCoder = this.initializeZipCoder.bind(this);
        this.initializeSelectPicker = this.initializeSelectPicker.bind(this);
        this.initializeAjaxSelectPicker = this.initializeAjaxSelectPicker.bind(this);
        this.changeSelect2Behavior = this.changeSelect2Behavior.bind(this);
        this.initializeTimePicker = this.initializeTimePicker.bind(this);
        this.initializeDateTimePicker = this.initializeDateTimePicker.bind(this);
        this.initializeDatePicker = this.initializeDatePicker.bind(this);
        this.initializeRangeDatePicker = this.initializeRangeDatePicker.bind(this);
        this.initializeCheckboxInput = this.initializeCheckboxInput.bind(this);
        this.initializeDropdownToggle = this.initializeDropdownToggle.bind(this);
        this.initializePhonePicker = this.initializePhonePicker.bind(this);
        this.initializeLaddaSpiner = this.initializeLaddaSpiner.bind(this);
        this.initializeTreeTable = this.initializeTreeTable.bind(this);
        this.initializeReportTree = this.initializeReportTree.bind(this);
        this.initializeMathInput = this.initializeMathInput.bind(this);
        this.initializeFocusedOnField = this.initializeFocusedOnField.bind(this);
        this.initializeTooltip = this.initializeTooltip.bind(this);
        this.initializeUserNotifacationChanel = this.initializeUserNotifacationChanel.bind(this);
    }

    start() {
        // Select2 Default Options
        $.fn.select2.defaults.set('placeholder', 'Please select option');
        $.fn.select2.defaults.set('theme', 'bootstrap');
        $.fn.select2.defaults.set('width', '100%');
        $.fn.select2.defaults.set('minimumResultsForSearch', 0);
        $(document).on('turbolinks:load', this.afterRenderPage);
    }

    afterRenderPage() {
        Turbolinks.clearCache();
        this.initializePlugins();
        this.bindClasses();
        this.afterRenderPageAlertInit();
        this.initializeUserNotifacationChanel();
    }

    afterRenderPageAlertInit() {
        return $('.bootstrap-flash').each((i, el) => Application.Classes.Toastr.render($(el).text(), { type: $(el).data('type'), title: '' }));
    }

    bindClasses($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('[data-class-binder]').each((k, el) => $.each($(el).data('class-binder').split(' '), (index, className) => new (Application.Classes[className])($(el))));
    }

    initializePlugins($scope = $('body')) {
        this.initializeTouchSpin($scope);
        this.initializePopover($scope);
        this.initializeZipCoder($scope);
        this.initializeSelectPicker($scope);
        this.initializeAjaxSelectPicker($scope);
        this.initializeTimePicker($scope);
        this.initializeDateTimePicker($scope);
        this.initializeDatePicker($scope);
        this.initializeCheckboxInput($scope);
        this.initializeDropdownToggle($scope);
        this.initializePhonePicker($scope);
        this.initializeLaddaSpiner($scope);
        this.initializeTreeTable($scope);
        this.initializeReportTree($scope);
        this.initializeMathInput($scope);
        this.initLazyModals($scope);
        this.initializeFocusedOnField($scope);
        this.initializeTooltip($scope);
    }

    initializeTouchSpin($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.number-picker').TouchSpin({
            forcestepdivisibility: 'none',
        });
    }

    initializePopover($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $('[data-toggle="popover"]').popover({ html: true, container: 'body' });

        $scope.find('[data-toggle="popover"]').on('shown.bs.popover', (el) => {
            const dataContent = $(el.currentTarget).data('content');
            const currentPopoverId = $(el.currentTarget).attr('aria-describedby');
            const currentContentWrapper = $scope.find(`#${currentPopoverId}`);
            $(currentContentWrapper).find('.popover-content').html(dataContent);
            this.initLazyModals($(currentContentWrapper));
        });
    }

    initializeZipCoder($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.zipcode-geocoder').AddressAutocomplete();
    }

    initializeSelectPicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.select-picker').select2();
        this.changeSelect2Behavior($scope.find('.select-picker'));
    }

    initializeAjaxSelectPicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        const $el = $scope.find('.ajax-select-picker');
        $el.select2({
            templateSelection(data) {
                const $element = $scope.find('.ajax_select_picker').find(`option:contains('${data.text}')`);
                if (!$element.attr('data-rate') && (data.rate !== undefined)) {
                    $element.attr('data-rate', data.rate);
                }
                return data.text;
            },
            ajax: {
                //        url: JSON.parse($(this).dataset.ajax).url
                dataType: 'json',
                delay: 250,
                data(params) {
                    const options = $(this).data('ajax');
                    const documentDate = () => {
                        if (options.document_date_input) {
                            const $documentDateInput = $(options.document_date_input);
                            if ($documentDateInput.length) {
                                $(options.document_date_input).val();
                            }
                            console.warn('$documentDateInput', $documentDateInput.length);
                        }
                    };
                    return {
                        q: params.term,
                        term: params.term,
                        _type: params._type,
                        field_for_search: options.field_for_search,
                        document_name: options.document_name,
                        search_method: options.search_method,
                        text_method: options.text_method,
                        document_date: documentDate(),
                    };
                },
                processResults: (data) => {
                    data.results.forEach((v) => {
                        if (v.rate !== undefined) {
                            $scope.find('.ajax_select_picker').find(`option:contains('${v.text}')`).attr('data-rate', v.rate);
                        }
                    });
                    return { results: data.results };
                },
            },
        });
        return this.changeSelect2Behavior($scope.find('.ajax-select-picker'));
    }

    changeSelect2Behavior(element) {
        $(element).on('select2:close', (evt) => {
            const context = $(evt.target);
            $(document).on('keydown.select2', (e) => {
                if (e.which === 9) {
                    const highlighted = context.data('select2').$dropdown.find('.select2-results__option--highlighted');
                    if (highlighted) {
                        const id = _get(highlighted.data('data'), 'id');
                        context.val(id).trigger('change');
                    }
                    $(context).closest('.input').next('.input').find('input')
                        .focus();
                    $(context).closest('.input').next('.input').find('select')
                        .select2('open');
                }
            });
            setTimeout((() => {
                $(document).off('keydown.select2');
            }), 1);
        });
    }

    initializeTimePicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        return $scope.find('.time-picker').pickatime();
    }

    initializeDateTimePicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.datetimepicker').datetimepicker();
    }

    initializeDatePicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.date-picker').datetimepicker({ format: 'MM/DD/YYYY', useCurrent: false });
    }

    initializeRangeDatePicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        const payrollRuns = { weekly: 6, biweekly: 14, monthly: 31 };
        const $input = $scope.find('.range-date-picker');
        const res = {};
        if ($input.data('lastPeriods')) {
            $input.data('lastPeriods').forEach((element) => {
                const dates = [];
                const key = [];
                Object.values(element.dates).forEach((date, index) => {
                    dates.push(index > 0 ? moment.utc(date) : moment.utc(date));
                    key.push(index > 0 ? moment.utc(date).format('l') : moment.utc(date).format('l'));
                });
                res[`<span class='pull-right label ${element.label_class}'>${element.status}</span>${key.join('-')}`] = dates;
            });
        }
        return $input.daterangepicker({
            locale: { format: 'MM/DD/YYYY', separator: '-' },
            maxSpan: { days: payrollRuns[$input.data('payrollRun')] || 61 },
            ranges: res,
        });
    }

    initializeCheckboxInput($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        return $scope.find('.checkbox-picker').bootstrapToggle({
            on: 'Yes',
            off: 'No',
            size: 'normal',
        });
    }

    initializeDropdownToggle($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.dropdown-toggle').click().dropdown();
    }

    initializePhonePicker($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        return $scope.find('input[type=tel]').bfhphone({
            format: '(ddd) ddd-dddd',
        });
    }

    initializeLaddaSpiner() {
        Ladda.bind('button[type=submit]', { timeout: 2000 });
    }

    initializeTreeTable($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('#tree_table').treetable({ expandable: true });
    }

    initializeReportTree($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('#report_tree').ReportsTree();
    }

    initializeMathInput($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        $scope.find('.math-picker').mathInput();
    }

    initLazyModals($defaultScope) {
        const $parent = $defaultScope == null ? $('body') : $defaultScope;
        $parent.find('[data-lazy-modal]').each((k, el) => {
            const $el = $(el);
            $el.off('click').on('click', (event) => {
                BootstrapDialog.show({
                    title: $el.data('lazy-modal-title'),
                    cssClass: $el.data('lazy-modal-css-class'),
                    draggable: true,
                    onshown: (dialog) => {
                        dialog.$modal.removeAttr('tabindex');
                        const $dialog = dialog.getModalBody();
                        $dialog.load($(event.currentTarget).attr('href'), () => {
                            this.initializePlugins($dialog);
                            this.bindClasses($dialog);
                        });
                    },
                });
                return false;
            });
        });
    }

    initializeFocusedOnField($defaultScope) {
        const $scope = $defaultScope == null ? $('body') : $defaultScope;
        const $firstInput = $($scope.find('form').find('.input')[0]);
        if ($firstInput.hasClass('select_picker')) {
            if (!$firstInput.find('select').val()) {
                $firstInput.find('select').select2('open');
            }
        } else if (!$firstInput.find('input').val()) {
            $firstInput.find('input').focus().select();
        }
    }

    initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    initializeUserNotifacationChanel() {
        if (gon.currentUser) {
            if (!this.pusher) {
                this.pusher = new Pusher(gon.global.pusher_key, { encrypted: true });
            }
            const channel = this.pusher.subscribe(`notification-chanel-for-user-${gon.currentUser.id}`);
            channel.bind('notify', (data) => {
                const links = [];
                data.links.forEach(el => links.push(`<a class='btn btn-primary' href='${el.path}'>${el.name}</a>`));
                Application.Classes.Toastr.info([data.message, links].join('<br>'));
            });
        }
    }
};