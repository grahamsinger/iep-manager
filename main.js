requirejs.config({
    //baseUrl: 'app/js',
    paths: {
        'jquery': 'node_modules/jquery/dist/jquery.min',
        'backbone': 'node_modules/backbone/backbone',
        'underscore': 'node_modules/underscore/underscore',
        'marionette': 'node_modules/backbone.marionette/lib/backbone.marionette.min',
        'backbone.radio': 'node_modules/backbone.radio/src/backbone.radio'
        // 'typeahead': 'bower_components/typeahead.js/dist/typeahead.jquery',
        // 'datepicker': 'node_modules/jquery-ui/ui/widgets/datepicker',
        // 'googleapis': 'node_modules/googleapis/lib/googleapis',
        // 'calendar': 'app/common/js/calendar',
        // 'config': 'app/config'

    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    }
});
