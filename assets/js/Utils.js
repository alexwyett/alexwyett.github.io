var Fuse = require('fuse.js');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = {
  urlParam: function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  },
  siteSearch: function(param) {
    var options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        includeScore: true,
        keys: [
          'title',
          'tags'
      ]
    };

    var f = new Fuse(typeof pages !== 'undefined' ? pages : [], options);
    var tpl = '{{#results.length}}<div class="inner">{{#results}}' + 
          '<div class="callout" data-closable>' +
              '<p>' +
                  '<a href="{{item.href}}">{{item.title}} &raquo;</a>' +
              '</p>' +
              '{{#item.tags.length}}<p class="tags">{{#item.tags}}<a href="/?s={{.}}">{{.}}</a>{{/item.tags}}</p>{{/item.tags.length}}' + 
              '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>' + 
                '<span aria-hidden="true">&times;</span>' + 
              '</button>' + 
          '</div>' +
        '{{/results}}{{/results.length}}';

    var nr = function() {
      $('#results').html(
        '<div class="callout" data-closable>' + 
          '<p>No results found</p>' + 
          '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>' + 
            '<span aria-hidden="true">&times;</span>' + 
          '</button>' + 
        '</div>'
      );
    };

    var search = function(val) {
      val = (typeof val === 'string') ? val : '';

      if (val.length <= 2) {
        $('#results').html('');
      } else {
        var r = f.search(val);
        if (r.length === 0) {
          nr();
        } else {
          $("#results").html(
            Mustache.render(
              tpl,
              { results: r }
            )
          ); 
        }
      }
    };

    return search(param);
  }
}