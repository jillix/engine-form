var $ = require("/libs/jquery");

function getForm(ev, data) {
    return (ev && ev.target && $(ev.target)) || (data.sel && $(data.sel));
}

exports.init = function () {
    var self = this;
    var $container = $(self._config.form || "body");
    $container.serializer();

    $("form", $container).on("serializer:data", function (_, formData) {
        self.emit("data", formData);
    });
};

exports.fill = function (ev, data) {
    var $elm = getForm(ev, data);
    if ($elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:fill", [data.data]);
};

exports.submit = function (ev, data) {
    var $elm = getForm(ev, data);
    if ($elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:submit");
};
