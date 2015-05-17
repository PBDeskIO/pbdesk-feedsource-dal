(function () {
    "use strict";

    module.exports = function(mongoose){
        var feedSourceSchema = require("pbdesk-schema-feedsource")(mongoose);
        var FeedSourceModel = feedSourceSchema.feedSourceModel;
        var feedSourceCategories = feedSourceSchema.feedCategories;
        var feedSourceFormats = feedSourceSchema.feedFormats;

        function getAll(cb) {
            try {
                //cb(null, {title: "test1"});
                FeedSourceModel.find(function (err, data) {
                    if (err) {
                        cb(err, null);
                    }
                    else {
                        cb(null, data);
                    }
                });
            }
            catch (ex){
                console.log(ex);
            }
        }

        function getById(itemId, cb){
            try{
                FeedSourceModel.findById(itemId, function (errOb, data) {
                    if(errOb){
                        cb(errOb, null);
                    }
                    else{
                        cb(null, data);
                    }
                });
            }
            catch(ex){
                var err = new Error("Error in feedSourceCRUD::getById - " + ex.message, ex);
                cb(err, null);
            }
        }

        function create(item, cb){
            var itemToCreate = new FeedSourceModel(item);
            itemToCreate.save(function(err, newItem){
                if(err){
                    cb(err, null);
                    //res.state(500).json(err);
                }
                else{
                    cb(null, newItem);
                    //res.json(newItem);
                }
            });
        }

        return {
            feedSource: {
                formats: feedSourceFormats,
                categories: feedSourceCategories,
                model: FeedSourceModel,
                getAll: getAll,
                getById: getById,
                create: create
            }
        };
    };

}());

