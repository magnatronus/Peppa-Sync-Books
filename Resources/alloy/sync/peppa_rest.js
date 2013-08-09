function createMethodURL(_method, _data, stringify) {
    var url = "";
    url = "production" == Ti.App.deployType ? "http://" + PROD_URL + "/peppa/api/" + API_VERSION + "/" + _method : "http://" + DEMO_URL + "/peppa/api/" + API_VERSION + "/" + _method;
    var params = false;
    if (_data) {
        for (var key in _data) if (_data.hasOwnProperty(key)) {
            params ? params += "&" : params = "?";
            params += key + "=" + encodeURI(stringify ? JSON.stringify(_data[key]) : _data[key]);
        }
        url += params;
    }
    return url;
}

function generateRESTRequest(method, url, payload, callback) {
    var request = Ti.Network.createHTTPClient({
        autoRedirect: true,
        cache: false,
        enableKeepAlive: true,
        timeout: 5e3,
        onload: function() {
            var data = JSON.parse(this.responseText);
            callback && callback(true, data, false);
        },
        onerror: function(e) {
            callback && callback(false, this.responseText, e);
        }
    });
    request.open(method, url);
    request.setRequestHeader("X-PEPPA-API-KEY", API_KEY);
    SESSION_ID && request.setRequestHeader("X-PEPPA-SESSIONID", SESSION_ID);
    if (payload) {
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(payload));
    } else request.send();
}

function userSync(method, model, options) {
    var payload = model.toJSON();
    var error;
    switch (method) {
      case "read":
        var url = createMethodURL("user", payload);
        generateRESTRequest("GET", url, null, function(success, res, error) {
            if (success) {
                SESSION_ID = res.user[model.idAttribute];
                options.success(res.user, JSON.stringify(res.user), options);
            } else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      case "create":
        var url = createMethodURL("user");
        generateRESTRequest("POST", url, payload, function(success, res, error) {
            if (success) options.success(res.user, JSON.stringify(res.user), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      case "update":
        var url = createMethodURL("user");
        generateRESTRequest("PUT", url, payload, function(success, res, error) {
            if (success) options.success(res.user, JSON.stringify(res.user), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      case "delete":
        var url = createMethodURL("user/logout");
        generateRESTRequest("GET", url, null, function(success, res, error) {
            if (success) options.success(res, JSON.stringify(res), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      default:
        error = "User function not implemented";
    }
    if (error) {
        options.error(model, error, options);
        Ti.API.error(error);
        model.trigger("error");
    }
}

function objectSync(method, model, options, name) {
    var payload = model.toJSON();
    var error;
    if (SESSION_ID) switch (method) {
      case "read":
        if (payload[model.idAttribute]) {
            var url = createMethodURL("object/" + name + "/" + payload[model.idAttribute]);
            generateRESTRequest("GET", url, null, function(success, res, error) {
                if (success) options.success(res.data, JSON.stringify(res.data), options); else {
                    var err = res ? res.error : error;
                    Ti.API.error(err);
                    options.error(model, error, options);
                    model.trigger("error");
                }
            });
        } else {
            var url = createMethodURL("object/" + name);
            generateRESTRequest("GET", url, null, function(success, res, error) {
                if (success) options.success(res.data, JSON.stringify(res.data), options); else {
                    var err = res ? res.error : error;
                    Ti.API.error(err);
                    options.error(model, error, options);
                    model.trigger("error");
                }
            });
        }
        break;

      case "create":
        var url = createMethodURL("object/" + name);
        generateRESTRequest("POST", url, payload, function(success, res, error) {
            if (success) options.success(res.data, JSON.stringify(res.data), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      case "update":
        var url = createMethodURL("object/" + name + "/" + payload[model.idAttribute]);
        generateRESTRequest("PUT", url, payload, function(success, res, error) {
            if (success) options.success(res.data, JSON.stringify(res.data), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
        break;

      case "delete":
        var url = createMethodURL("object/" + name + "/" + payload[model.idAttribute]);
        generateRESTRequest("DELETE", url, null, function(success, res, error) {
            if (success) options.success(res.data, JSON.stringify(res.data), options); else {
                var err = res ? res.error : error;
                Ti.API.error(err);
                options.error(model, error, options);
                model.trigger("error");
            }
        });
    } else error = "No session id log user in first!";
    if (error) {
        options.error(model, error, options);
        Ti.API.error(error);
        model.trigger("error");
    }
}

var SESSION_ID = false;

var API_KEY = "{PUT YOUR APIKEY HERE}";

var API_VERSION = "2";

var PROD_URL = "this is where you can set the default endpoint";

var DEMO_URL = "this is where you can set the default endpoint";

module.exports.sync = function(method, model, options) {
    switch (model.config.adapter.collection_name) {
      case "user":
        userSync(method, model, options);
        break;

      default:
        objectSync(method, model, options, model.config.adapter.collection_name);
    }
};

module.exports.beforeModelCreate = function(config) {
    config = config || {};
    config.adapter.api_key && (API_KEY = config.adapter.api_key);
    config.adapter.api_version && (API_VERSION = config.adapter.api_version);
    config.adapter.prod_url && (PROD_URL = config.adapter.prod_url);
    config.adapter.demo_url && (DEMO_URL = config.adapter.demo_url);
    return config;
};

module.exports.afterModelCreate = function() {};