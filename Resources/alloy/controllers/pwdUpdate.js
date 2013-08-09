function Controller() {
    function updatePwd() {
        if (1 != users.length) alert("No current User Found"); else {
            var user = users.at(0);
            user.set({
                pass: $.newPwd.value
            }).save({}, {
                success: function() {
                    alert("Password successfully Updated");
                    closeWin();
                },
                error: function() {
                    alert("Unable to update Password");
                }
            });
        }
    }
    function closeWin() {
        $.pwdWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.pwdWin = Ti.UI.createWindow({
        id: "pwdWin",
        title: "Change Password",
        backgroundColor: "black",
        modal: "true"
    });
    $.__views.pwdWin && $.addTopLevelView($.__views.pwdWin);
    $.__views.leftNavBtn = Ti.UI.createButton({
        id: "leftNavBtn",
        systemButton: Ti.UI.iPhone.SystemButton.CANCEL
    });
    closeWin ? $.__views.leftNavBtn.addEventListener("click", closeWin) : __defers["$.__views.leftNavBtn!click!closeWin"] = true;
    $.__views.pwdWin.leftNavButton = $.__views.leftNavBtn;
    $.__views.__alloyId19 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.pwdWin.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createImageView({
        image: "/peppabooks.png",
        top: "10",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.newPwd = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "newPwd",
        hintText: " new password",
        passwordMask: "*"
    });
    $.__views.__alloyId19.add($.__views.newPwd);
    $.__views.updateBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "updateBtn",
        title: "Change"
    });
    $.__views.__alloyId19.add($.__views.updateBtn);
    updatePwd ? $.__views.updateBtn.addEventListener("click", updatePwd) : __defers["$.__views.updateBtn!click!updatePwd"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var users = Alloy.Collections.User;
    __defers["$.__views.leftNavBtn!click!closeWin"] && $.__views.leftNavBtn.addEventListener("click", closeWin);
    __defers["$.__views.updateBtn!click!updatePwd"] && $.__views.updateBtn.addEventListener("click", updatePwd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;