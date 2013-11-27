var models = require('../common/models.js')();
var validate = require('../common/validate.js');
var async = require('async');
var MongoFileHandler = require('fh-gridfs').MongoFileHandler;

/*
 * getSubmissionFile(connections, options, appId, cb) *
 *   connections: {
 *     mongooseConnection: ...
 *     databaseConnection: ...
 *   }
 *
 *   options: {
 *     uri: db connection string,
 *     fileStorage: optional config to be passed to MongoFileHandler, 
 *     logger: optional logger to be passed to MongoFileHandler
 *   }
 *   params: {
 *     _id: file group ID of file to retrieve
 *   }
 *   cb - callback function (err, result)
 *      result: {
 *         stream: stream for the file
 *         type: "application/octet-stream",
 *         length: length of the file in bytes
 *      }
 */
module.exports = function getSubmissionFile(connections, options, params, cb) {
  var fileHandler = new MongoFileHandler(options.fileStorage;, options.logger); // optional params, don't need to be specified
  fileHandler.streamFile(
    connections.databaseConnection,
    {"groupId":params._id, "length": true},
    {}, // fileOptions (e.g. get thumbnail)
    function (err, str, length) { //Note, all file streams are paused when created in the file handler
      if (err) return cb(err);
      res = {
        stream: str,
        type: "application/octet-stream",
        length: length
      };
      return cb(undefined, res);
    });
};