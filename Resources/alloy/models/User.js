exports.definition = {
    config: {
        adapter: {
            type: "peppa_rest",
            collection_name: "user",
            prod_url: "peppa.c2h4.co.uk",
            demo_url: "192.168.0.90/spirals",
            api_version: "2",
            api_key: "b8398e9413199cbcefdbca65016c8bd7"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            idAttribute: "sid"
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("user", exports.definition, []);

collection = Alloy.C("user", exports.definition, model);

exports.Model = model;

exports.Collection = collection;