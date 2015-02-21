var awSearch = function() {
    
    this.getParam = function(param) {
        var queryString = window.location.search.substring(1),
            queries = queryString.split('&');
        for (var i in queries) {
            var pair = queries[i].split('=');
            if (pair[0] === param) {
                // Decode the parameter value, replacing %20 with a space etc.
                return decodeURI(pair[1]);
            }
        }
        return null;
    };
    
    this.template = function(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            var keys = key.split("."), v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    };
};

jQuery(document).ready(function() {
    var awS = new awSearch();
});