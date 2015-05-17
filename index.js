(function () {
    "use strict";

    module.exports = function(mongoose){
        var feedSourceDAL = require("./dal")(mongoose);

        return feedSourceDAL;
    };
}());
