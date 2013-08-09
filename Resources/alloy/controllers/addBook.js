function Controller() {
    function bookSaved() {
        Ti.API.info("Book was saved");
        $.addWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.addWin = Ti.UI.createWindow({
        id: "addWin",
        title: "Add PeppaBook",
        backgroundColor: "black",
        modal: "true"
    });
    $.__views.addWin && $.addTopLevelView($.__views.addWin);
    $.__views.addBook = Alloy.createWidget("bookRecord", "widget", {
        id: "addBook",
        __parentSymbol: $.__views.addWin
    });
    $.__views.addBook.setParent($.__views.addWin);
    bookSaved ? $.__views.addBook.on("save", bookSaved) : __defers["$.__views.addBook!save!bookSaved"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.addBook!save!bookSaved"] && $.__views.addBook.on("save", bookSaved);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;