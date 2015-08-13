// Dependencies
var $ = require("/libs/jquery");

/*!
 * getForm
 * Returns the form element.
 *
 * @name getForm
 * @function
 * @param {Object} data The data object.
 * @return {jQuery} The jQuery form element.
 */
function getForm(data) {
    return (data.event && data.event.target && $(data.event.target)) || (data.sel && $(data.sel));
}

/*!
 * init
 *
 * @name init
 * @function
 * @return {undefined}
 */
exports.init = function () {
    var self = this;
    var $container = $(self._config.form || "body");
    $container.serializer();

    self._dataStream = self.flow("data");

    $container.on("serializer:data", "form", function (_, formData) {
        var data = $(this).data();
        data.formData = formData;
        self._dataStream.write(null, data);
    });
};

/**
 * fill
 * Fills a form with data provided in `data.data`.
 *
 * @name fill
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object.
 * @return {undefined}
 */
exports.fill = function (data) {
    var $elm = getForm(ev, data);
    if (!$elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.data(data);
    $elm.trigger("serializer:fill", [data.data]);
};

/**
 * submit
 * Request a submit event from form serializer.
 *
 * @name submit
 * @function
 * @param {Object} data The data object.
 * @return {undefined}
 */
exports.submit = function (ev, data) {
    var $elm = getForm(ev, data);
    if (!$elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:submit");
};
