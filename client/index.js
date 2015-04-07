// Dependencies
var $ = require("/libs/jquery");

/*!
 * getForm
 * Returns the form element.
 *
 * @name getForm
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object.
 * @return {jQuery} The jQuery form element.
 */
function getForm(ev, data) {
    return (ev && ev.target && $(ev.target)) || (data.sel && $(data.sel));
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

    $("form", $container).on("serializer:data", function (_, formData) {
        self.emit("data", null, formData);
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
exports.fill = function (ev, data) {
    var $elm = getForm(ev, data);
    if ($elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:fill", [data.data]);
};

/**
 * submit
 * Request a submit event from form serializer.
 *
 * @name submit
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object.
 * @return {undefined}
 */
exports.submit = function (ev, data) {
    var $elm = getForm(ev, data);
    if ($elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:submit");
};
