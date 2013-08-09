function Controller() {
    function __alloyId10() {
        var models = __alloyId9.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId7 = models[i];
            __alloyId7.__transform = {};
            var __alloyId8 = Ti.UI.createTableViewRow({
                title: "undefined" != typeof __alloyId7.__transform["name"] ? __alloyId7.__transform["name"] : __alloyId7.get("name"),
                pid: "undefined" != typeof __alloyId7.__transform["pid"] ? __alloyId7.__transform["pid"] : __alloyId7.get("pid"),
                oid: "undefined" != typeof __alloyId7.__transform["oid"] ? __alloyId7.__transform["oid"] : __alloyId7.get("oid"),
                hasChild: "true"
            });
            rows.push(__alloyId8);
        }
        $.__views.bookList.setData(rows);
    }
    function getSessionID() {
        if (1 != users.length) return false;
        var user = users.at(0);
        return user.get("sid");
    }
    function toggleDelete() {
        $.bookList.editing = !$.bookList.editing;
    }
    function refreshCollection() {
        books.fetch({
            error: function(c, r) {
                alert(r);
            }
        });
    }
    function updatePwd() {
        var win = Alloy.createController("pwdUpdate").getView();
        win.addEventListener("close", function() {});
        win.open({
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
    }
    function checkUser() {
        var sid = getSessionID();
        if (sid) {
            $.leftNavBtn.title = "Logout";
            $.rightNavBtn.enabled = true;
            $.pwdBtn.enabled = true;
            $.createBtn.enabled = true;
            $.deleteBtn.enabled = true;
        } else {
            $.rightNavBtn.enabled = false;
            $.pwdBtn.enabled = false;
            $.createBtn.enabled = false;
            $.deleteBtn.enabled = false;
            $.leftNavBtn.title = "Login";
            books.reset();
        }
        return sid;
    }
    function authenticateUser() {
        var sid = getSessionID();
        if (sid) {
            1 == users.length && users.at(0).destroy();
            checkUser();
        } else {
            var win = Alloy.createController("login").getView();
            win.addEventListener("close", function() {
                refreshCollection();
            });
            win.open({
                modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
                modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            });
        }
    }
    function updateBook(e) {
        var win = Alloy.createController("updateBook", e.rowData).getView();
        $.nav.open(win, {
            animated: true
        });
    }
    function addBook() {
        var win = Alloy.createController("addBook").getView();
        win.addEventListener("close", function() {});
        win.open({
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
    }
    function deleteBook(e) {
        var book = books.where({
            oid: e.rowData.oid
        });
        1 == book.length && book[0].destroy({
            error: function() {
                Ti.API.info("Error deleting the selected book entry.");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("PeppaBook");
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.win2 = Ti.UI.createWindow({
        id: "win2",
        title: "Peppa BookList"
    });
    $.__views.rightNavBtn = Ti.UI.createButton({
        id: "rightNavBtn",
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH,
        enabled: "false"
    });
    refreshCollection ? $.__views.rightNavBtn.addEventListener("click", refreshCollection) : __defers["$.__views.rightNavBtn!click!refreshCollection"] = true;
    $.__views.win2.rightNavButton = $.__views.rightNavBtn;
    $.__views.leftNavBtn = Ti.UI.createButton({
        id: "leftNavBtn",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE,
        title: "Login"
    });
    authenticateUser ? $.__views.leftNavBtn.addEventListener("click", authenticateUser) : __defers["$.__views.leftNavBtn!click!authenticateUser"] = true;
    $.__views.win2.leftNavButton = $.__views.leftNavBtn;
    $.__views.bookList = Ti.UI.createTableView({
        id: "bookList",
        bottom: "45"
    });
    $.__views.win2.add($.__views.bookList);
    var __alloyId9 = Alloy.Collections["PeppaBook"] || PeppaBook;
    __alloyId9.on("fetch destroy change add remove reset", __alloyId10);
    updateBook ? $.__views.bookList.addEventListener("click", updateBook) : __defers["$.__views.bookList!click!updateBook"] = true;
    deleteBook ? $.__views.bookList.addEventListener("delete", deleteBook) : __defers["$.__views.bookList!delete!deleteBook"] = true;
    var __alloyId13 = [];
    $.__views.pwdBtn = Ti.UI.createButton({
        id: "pwdBtn",
        systemButton: Ti.UI.iPhone.SystemButton.EDIT,
        enabled: "false"
    });
    __alloyId13.push($.__views.pwdBtn);
    updatePwd ? $.__views.pwdBtn.addEventListener("click", updatePwd) : __defers["$.__views.pwdBtn!click!updatePwd"] = true;
    $.__views.__alloyId14 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId13.push($.__views.__alloyId14);
    $.__views.createBtn = Ti.UI.createButton({
        id: "createBtn",
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
        enabled: "false"
    });
    __alloyId13.push($.__views.createBtn);
    addBook ? $.__views.createBtn.addEventListener("click", addBook) : __defers["$.__views.createBtn!click!addBook"] = true;
    $.__views.__alloyId15 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId13.push($.__views.__alloyId15);
    $.__views.deleteBtn = Ti.UI.createButton({
        id: "deleteBtn",
        systemButton: Ti.UI.iPhone.SystemButton.TRASH,
        enabled: "false"
    });
    __alloyId13.push($.__views.deleteBtn);
    toggleDelete ? $.__views.deleteBtn.addEventListener("click", toggleDelete) : __defers["$.__views.deleteBtn!click!toggleDelete"] = true;
    $.__views.__alloyId11 = Ti.UI.iOS.createToolbar({
        items: __alloyId13,
        bottom: "0",
        borderTop: "true",
        borderBottom: "false",
        id: "__alloyId11"
    });
    $.__views.win2.add($.__views.__alloyId11);
    $.__views.nav = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.win2,
        id: "nav"
    });
    $.__views.index.add($.__views.nav);
    exports.destroy = function() {
        __alloyId9.off("fetch destroy change add remove reset", __alloyId10);
    };
    _.extend($, $.__views);
    var books = Alloy.Collections.PeppaBook;
    var users = Alloy.Collections.User;
    checkUser() && refreshCollection();
    $.index.open();
    __defers["$.__views.rightNavBtn!click!refreshCollection"] && $.__views.rightNavBtn.addEventListener("click", refreshCollection);
    __defers["$.__views.leftNavBtn!click!authenticateUser"] && $.__views.leftNavBtn.addEventListener("click", authenticateUser);
    __defers["$.__views.bookList!click!updateBook"] && $.__views.bookList.addEventListener("click", updateBook);
    __defers["$.__views.bookList!delete!deleteBook"] && $.__views.bookList.addEventListener("delete", deleteBook);
    __defers["$.__views.pwdBtn!click!updatePwd"] && $.__views.pwdBtn.addEventListener("click", updatePwd);
    __defers["$.__views.createBtn!click!addBook"] && $.__views.createBtn.addEventListener("click", addBook);
    __defers["$.__views.deleteBtn!click!toggleDelete"] && $.__views.deleteBtn.addEventListener("click", toggleDelete);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;