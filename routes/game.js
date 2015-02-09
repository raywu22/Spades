var express = require('express');
var router = express.Router();
var models = require('../models/player_models.js');
var playersModel = models.playersModel;
var doneModel = models.doneModel;

router.get('/',function(req,res){
	playersModel.find({},function(error,playersData){
		console.log(playersData);
		var playersDataModified = playersData.reverse();
		res.render('game',{playersInfo:playersDataModified,
							currentGame:false});
	});
});

router.post('/deleteSpades',function(req,res){
	console.log(req.body.gameId);
	playersModel.findByIdAndRemove(req.body.gameId,function(error){
		res.redirect('/game');
	});
});

module.exports = router;
