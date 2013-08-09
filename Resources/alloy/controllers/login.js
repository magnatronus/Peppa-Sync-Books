function Controller() {
    function loginUser() {
        $.username.blur();
        $.password.blur();
        var user = Alloy.createModel("user", {
            name: $.username.value,
            pass: $.password.value
        });
        user.fetch({
            success: function(r) {
                users.add(r);
                $.loginWin.close();
            },
            error: function() {
                alert("Unable to validate the supplied credentials.\nPlease try again.");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginWin = Ti.UI.createWindow({
        id: "loginWin",
        title: "PeppaBooks Login",
        backgroundColor: "black",
        modal: "true"
    });
    $.__views.loginWin && $.addTopLevelView($.__views.loginWin);
    $.__views.__alloyId16 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId16"
    });
    $.__views.loginWin.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        image: "/peppabooks.png",
        top: "10",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.username = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "username",
        hintText: "username"
    });
    $.__views.__alloyId16.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "password",
        hintText: "password",
        passwordMask: "*"
    });
    $.__views.__alloyId16.add($.__views.password);
    $.__views.loginBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "loginBtn",
        title: "Login"
    });
    $.__views.__alloyId16.add($.__views.loginBtn);
    loginUser ? $.__views.loginBtn.addEventListener("click", loginUser) : __defers["$.__views.loginBtn!click!loginUser"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.PeppaBook;
    var users = Alloy.Collections.User;
    __defers["$.__views.loginBtn!click!loginUser"] && $.__views.loginBtn.addEventListener("click", loginUser);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;