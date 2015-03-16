

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/blog/simple-javascript-inheritance/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function(){};
 
    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
          // Check if we're overwriting an existing function
          prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
              return function() {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);        
                this._super = tmp;

                return ret;
              };
            })(name, prop[name]) :
            prop[name];
        }

        // The dummy class constructor
        function Class() {
          // All construction is actually done in the init method
          if ( !initializing && this.init )
            this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();


/**
 * AW global object.  Creates a super global object which can be
 * prototyped and extended.
 * 
 * Example usage: 
 *      
 *      var myObj = AW.extend();
 *      
 *      jQuery(document).ready(function() {
 *          var plugin = new myObj();
 *      });
 *      
 *      var myObj1 = AW.extend({
 *          init: function() {
 *              // This line calls the parent constructor
 *              this._super();
 *          }
 *      });
 *      
 *      jQuery(document).ready(function() {
 *          var plugin = new myObj1();
 *      });
 *      
 *      var myObj2 = myObj1.extend({
 *          init: function() {
 *              // This line calls the parent constructor
 *              this._super();
 *          },
 *          
 *          someFunction: function() {
 *              // Do stuff
 *          }
 *      });
 * 
 * Prototyping example: 
 *      
 *      myObj2.prototype.someFunction = function() {
 *          // Do some other funky stuff
 *      };
 *      
 *      jQuery(document).ready(function() {
 *          var plugin = new myObj2();
 *      });
 * 
 */
var AW = Class.extend({
    /**
     * Generic event fire function.
     * 
     * Usage: Call this.fireEvent('event_name'); in your method.
     * Add into page scripts:
     *      document.addEventListener('event_name', function(e) {
     *          // Do stuff
     *      });
     * 
     * @param {String} evt    Event name
     * @param {Object} target Target object (javascript dom element)
     * 
     * @returns {null}
     */
    fireEvent: function(evt, target) {
        if (typeof target === "undefined") {
            target = document.body;
        }
        
        if (document.createEvent) {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent( evt, true, false );
            target.dispatchEvent( evObj );
        } else if( document.createEventObject ) { //IE
            var evObj = document.createEventObject();
            target.fireEvent( 'on' + evt, evObj );
        } 
    },
    
    /**
     * Extend the options of the class
     * 
     * @access public
     *
     * @return array
     */
    paramsextend: function() {
        for(var i = 1; i < arguments.length; i++) {
            for(var key in arguments[i]) {
                if(arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    },
    
    /**
     * Return the url params from the query string
     * 
     * @returns {Array}
     */
    getQueryParams: function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { 
                return decodeURIComponent(s.replace(pl, " "));
            },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        
        return urlParams;
    },
    
    /**
     * Return the url params from the query string
     * 
     * @param {String}
     *
     * @returns {Array}
     */
    getQueryParam: function (param) {
        if (this.getQueryParams().hasOwnProperty(param)) {
            return this.getQueryParams()[param];
        }
        
        return;
    }
});

var AWSearch = AW.extend({
    init: function(args) {
        this.options = this.paramsextend({}, this.defaults(), args);
    },
    
    search: function(s) {
    
        that = this;
    
        // Promise will be resolved successfully in case of any server response, even 404 etc.
        // So (as in case with XHR) we need to handle it:
        var processStatus = function (response) {
            if (response.status === 200 
                && response.headers.get("content-type").indexOf("application/json") !== -1
            ) {
                return response.json();
            } else {
                throw new TypeError('Response from "' + url + '" has unexpected "content-type"');
            }
        };
    
        var found = [];
        fetch(this.options.data_url)
            .then(processStatus)
            .then(function(data) {
                for (obj in data) {
                    if (data[obj].tags.indexOf(s) > -1) {
                        found.push(data[obj]);
                    }
                }
            })
            .then(function() {
            
                var tpl = $("#srch").html();
                $("#contents").html(
                    Mustache.render(tpl, { "results" : found })
                );
                
            })
            .catch(function(error) {
                
            });;
    },
    
    defaults: function() {
        return {
            data_url: "http://alexwyett.github.io/search.json"
        }
    }
});

(function(){
    var s = new AWSearch();
    data = s.search(s.getQueryParam('s'));
})()
