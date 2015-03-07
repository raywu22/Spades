var express = require('express');
var router = express.Router();
var models = require('../models/player_models.js');
var playersModel = models.playersModel;
var doneModel = models.doneModel;

router.get('/', function(req, res){
	res.render('index');
});

router.post('/startSpades',function(req,res){
	var players = {
		player1:req.body.player1,
		player2:req.body.player2,
		player3:req.body.player3,
		player4:req.body.player4,
	}

	if (canPlay(players)){
		var newPlayersModel = new playersModel({
			team1Players:players.player1+"-"+players.player2,
			team2Players:players.player3+"-"+players.player4,
			team1Points:[0],
			team2Points:[0]
		});
		newPlayersModel.save(function(error){
			playersModel.find({},function(error,playersData){
				res.redirect("game");
			});
		});
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;



var canPlay = function(players){
	var canWePlay = true;

	for (var playerIndex in players){
		var currentPlayer = players[playerIndex]
		if (currentPlayer.length===0){
			canWePlay = false;
		}
		for (var i=0; i<currentPlayer.length;i++){
			if (currentPlayer[i]===' '){
				canWePlay = false;
			}
		}
	}
	return canWePlay;
}