function Controller() {
    function bookUpdated() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.addWin = Ti.UI.createWindow({
        id: "addWin",
        title: "Add PeppaBook",
        backgroundColor: "black"
    });
    $.__views.addWin && $.addTopLevelView($.__views.addWin);
    $.__views.updateBook = Alloy.createWidget("bookRecord", "widget", {
        id: "updateBook",
        __parentSymbol: $.__views.addWin
    });
    $.__views.updateBook.setParent($.__views.addWin);
    bookUpdated ? $.__views.updateBook.on("save", bookUpdated) : __defers["$.__views.updateBook!save!bookUpdated"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.updateBook.loadBook(args.oid);
    __defers["$.__views.updateBook!save!bookUpdated"] && $.__views.updateBook.on("save", bookUpdated);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;