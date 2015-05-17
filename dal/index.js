(function () {
    "use strict";

    module.exports = function(mongoose){
        var feedSourceSchema = require("pbdesk-feedsource-schema")(mongoose);
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

        function update(item, cb){
            var itemToUpd = new FeedSourceModel(item);
            FeedSourceModel.findByIdAndUpdate(itemToUpd._id, itemToUpd, {new: true}, function(errOccured, updatedItem){
                if(errOccured){
                    cb(errOccured, null);
                }
                else{
                    if(updatedItem){
                        cb(null, updatedItem);
                    }
                    else{
                        cb({"Error": "Invalid Id"}, null);
                    }
                }
            });
        }

        function deleteItem(itemId, cb){
            FeedSourceModel.findByIdAndRemove(new Object(itemId), function(errOccured, data){
                if(errOccured){
                    cb(errOccured, null);
                }
                else{
                    cb(data, null);
                }
            });
        }

        return {
            formats: feedSourceFormats,
            categories: feedSourceCategories,
            model: FeedSourceModel,
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            deleteItem: deleteItem
        };
    };

}());

