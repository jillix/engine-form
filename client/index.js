// Dependencies
var $ = require("/libs/jquery");

/*!
 * getForm
 * Returns the form element (by default the form which was initialized in init).
 *
 * @name getForm
 * @function
 * @param {Object} data The data object:
 *
 *  - `form` (jQuery|QuerySelector): The jQuery element or the query selector.
 *
 * @return {jQuery} The jQuery form element.
 */
function getForm(data) {
    return data && data.form && $(data.form) || this.form;
}

/*!
 * init
 *
 * @name init
 * @function
 */
exports.init = function () {
    var self = this;
    var $container = $(self._config.form || "body");

    self.form = $container.serializer();

    self.form.on("serializer:data", function (_, formData) {
        var data = $(this).data();
        self.formData = formData;
        self.flow("data").write(null, data);
    });
};

/**
 * fill
 * Fills a form with data provided in `data.data`.
 *
 * @name fill
 * @function
 * @param {Object} data The data object.
 *
 *  - `data` (Object): The form data.
 *  - `form` (jQuery|QuerySelector): The jQuery element or the query selector.
 *
 */
exports.fill = function (data) {
    var $elm = getForm.call(this, data);
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
 *
 *  - `data` (Object): The form data.
 *  - `form` (jQuery|QuerySelector): The jQuery element or the query selector.
 *
 */
exports.submit = function (data) {
    var $elm = getForm.call(this, data);
    if (!$elm.length) {
        return console.warn("Cannot find the form element.");
    }
    $elm.trigger("serializer:submit");
    return this.formData;
};
