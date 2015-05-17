(function () {
    "use strict";

    var gulp = require("gulp");

    require("pbdesk-gulp-codereview")(gulp, ["./dal/**/*.js", "./index.js", "./gulpfile.js", "./gulp/**/*.js"]);
}());
