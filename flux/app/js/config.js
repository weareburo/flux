require.config({
  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["main"],
  paths: {
    jquery: '../vendor/jquery/jquery',
    underscore: '../vendor/underscore/underscore-min',
    backbone: '../vendor/backbone/backbone',
    templates: 'templates',
    aura: '../vendor/aura/lib/aura',
    tilejs: '../vendor/tilejs/index',
    text: '../vendor/requirejs-text/text'
  },
  shim: {
      backbone: {
          deps: ['jquery','underscore'],
          exports: 'Backbone'
      },
      underscore: {
        exports: '_'
      }
  }
});
