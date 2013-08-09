function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "bookRecord/" + s : s.substring(0, index) + "/bookRecord/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function loadBook(id) {
        var found = books.where({
            oid: id
        });
        if (1 == found.length) {
            mybook = found[0];
            $.name.value = mybook.get("name");
            $.isbn.value = mybook.get("isbn");
            $.author.value = mybook.get("author");
            $.genre.value = mybook.get("genre");
        } else alert("Error getting book detail");
    }
    function updateBook() {
        var editbuffer = {
            name: $.name.value,
            isbn: $.isbn.value,
            author: $.author.value,
            genre: $.genre.value
        };
        if (mybook) mybook.set(editbuffer).save({}, {
            error: function() {
                alert("There was an error updating your book details");
            }
        }); else {
            var book = Alloy.createModel("PeppaBook");
            books.add(book);
            book.save(editbuffer, {
                success: function() {
                    alert("You book details have been recorded");
                    $.trigger("save");
                },
                error: function() {
                    alert("There was an error saving your book details");
                    $.trigger("save");
                }
            });
        }
    }
    new (require("alloy/widget"))("bookRecord");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.bookDetail = Ti.UI.createScrollView({
        id: "bookDetail",
        layout: "vertical"
    });
    $.__views.bookDetail && $.addTopLevelView($.__views.bookDetail);
    $.__views.name = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "name",
        hintText: "title"
    });
    $.__views.bookDetail.add($.__views.name);
    $.__views.isbn = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "isbn",
        hintText: "ISBN"
    });
    $.__views.bookDetail.add($.__views.isbn);
    $.__views.author = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "author",
        hintText: "author"
    });
    $.__views.bookDetail.add($.__views.author);
    $.__views.genre = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "genre",
        hintText: "genre"
    });
    $.__views.bookDetail.add($.__views.genre);
    $.__views.updateBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "updateBtn",
        title: "Done"
    });
    $.__views.bookDetail.add($.__views.updateBtn);
    updateBook ? $.__views.updateBtn.addEventListener("click", updateBook) : __defers["$.__views.updateBtn!click!updateBook"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var books = Alloy.Collections.PeppaBook;
    var mybook = false;
    exports.loadBook = loadBook;
    __defers["$.__views.updateBtn!click!updateBook"] && $.__views.updateBtn.addEventListener("click", updateBook);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;