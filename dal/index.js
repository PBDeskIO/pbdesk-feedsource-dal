'use strict';

module.exports = function(mongoose){
    var feedSourceSchema = require('pbdesk-schema-feedsource')(mongoose);
    var feedSourceModel = feedSourceSchema.feedSourceModel;
    var feedSourceCategories = feedSourceSchema.feedCategories;
    var feedSourceFormats = feedSourceSchema.feedFormats;

    return {
        feedSource : {
            formats: feedSourceFormats,
            categories: feedSourceCategories,
            model: feedSourceModel,
            getAll: _getAll,
            getById: _getById,
            create: _create
        }
    };
    function _getAll(cb) {
        try {
            //cb(null, {title: 'test1'});
            model.find(function (err, data) {
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

    function _getById(itemId, cb){
        try{
            model.findById(itemId, function (err, data) {
                if(err){
                    cb(err, null);
                }
                else{
                    cb(null, data);
                }
            });
        }
        catch(ex){
            var err = new Error("Error in feedSourceCRUD::_getById - " + ex.message, ex );
            cb(err, null);
        }
    }

    function _create(item, cb){
        var itemToCreate = new model(item);
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

};