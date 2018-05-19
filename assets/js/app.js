var $ = require('jquery');
var Utils = require('./Utils');
var Foundation = require('foundation-sites/dist/js/npm');
$(document).foundation();

$(window).on('load', function() {
  $('input[type=search]').on('keyup', function() {
    Utils.siteSearch($(this).val());
  });

  if (Utils.urlParam('s') && Utils.urlParam('s').length > 0) {
    $('input[type=search]').val(Utils.urlParam('s'));
    Utils.siteSearch(Utils.urlParam('s'));
  }
});