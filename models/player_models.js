var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var playersSchema = mongoose.Schema({
	team1Players:String,
	team2Players:String,
	team1Points:[Number],
	team2Points:[Number]
});

var doneSchema = mongoose.Schema({
	team1Players:String,
	team2Players:String,
	team1FinalPoints:Number,
	team2FinalPoints:Number
})

var playersModel = mongoose.model("players",playersSchema);
var doneModel = mongoose.model("done",playersSchema);

exports.playersModel = playersModel;
exports.doneModel = doneModel;
