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
	playersModel.findByIdAndRemove(req.body.gameId,function(error){
		res.redirect('/game');
	});
});



router.post('/scoreSpades',function(req,res){
	var gameId = req.body.gameId;
	var valuesObject = JSON.parse(JSON.stringify(req.body));
	delete valuesObject.gameId;
	var isValid = hasValidValues(valuesObject);

	if (isValid){
		playersModel.findById(gameId,function(error,playersData){
			var team1Points = playersData.team1Points;
			var team2Points = playersData.team2Points;
			var team1LastScore = team1Points[team1Points.length-1];
			var team2LastScore = team2Points[team2Points.length-1];
			var team1UpdatedScore;
			var team2UpdatedScore;
			var team1Array = [];
			var team2Array = [];
			var indexTrack = 0;
			for (playerIndex in valuesObject){
				if (indexTrack>1 && indexTrack<6){
					team2Array.push(valuesObject[playerIndex]);
				}
				else {
					team1Array.push(valuesObject[playerIndex]);
				}
				indexTrack++;
			}
			var currentTeam1Score = team1LastScore+calculateScore(team1Array);
			var currentTeam2Score = team2LastScore+calculateScore(team2Array);
			if (team1LastScore%10+calculateScore(team1Array)%10>=10){
				currentTeam1Score-=100;
			}
			if (team2LastScore%10+calculateScore(team2Array)%10>=10){
				currentTeam2Score-=100;
			}

			playersModel.findByIdAndUpdate(gameId,{$push:{
															team1Points:currentTeam1Score,
															team2Points:currentTeam2Score
														}
													},function(error,updatedPlayersData){
				var winWay1 = currentTeam1Score>500 && currentTeam1Score>currentTeam2Score;
				var winWay2 = currentTeam2Score>500 && currentTeam2Score>currentTeam1Score;
				if (winWay1 || currentTeam1Score-currentTeam2Score>500){
					res.send({message:"team1Win",data:updatedPlayersData});
				}
				else if (winWay2 || currentTeam2Score-currentTeam1Score>500){
					res.send({message:"team2Win",data:updatedPlayersData});
				}
				else {
					res.send({message:"continue",data:updatedPlayersData});
				}
			});
		});
	}
	else {
		res.send("invalidInputs");
	}
});

module.exports = router;

var hasValidValues = function(playerObject){
	var isValid = true;
	for (var playerIndex in playerObject){
		if (playerObject[playerIndex]==="Invalid"){
			isValid = false;
		}
	}
	return isValid;
}

var calculateScore = function(arrayOfBetsResults){
	var nilForms = ["half","nil","blind"];
	for (var i=0;i<arrayOfBetsResults.length;i++){
		if (nilForms.indexOf(arrayOfBetsResults[i])===-1){
			arrayOfBetsResults[i] = parseInt(arrayOfBetsResults[i]);
		}
	}
	var betPlayer1 = arrayOfBetsResults[0];
	var resultPlayer1 = arrayOfBetsResults[1];
	var betPlayer2 = arrayOfBetsResults[2];
	var resultPlayer2 = arrayOfBetsResults[3];
	var finalScore;
	if (nilForms.indexOf(betPlayer1)===-1 && nilForms.indexOf(betPlayer2)==-1){
		finalScore = calculateNumericalScore(betPlayer1+betPlayer2,resultPlayer1+resultPlayer2);
	}
	else if (nilForms.indexOf(betPlayer1)!==-1 && nilForms.indexOf(betPlayer2)===-1){
		finalScore = calculateNilScore(betPlayer1,resultPlayer1)+calculateNumericalScore(betPlayer2,resultPlayer2);
	}
	else if (nilForms.indexOf(betPlayer1)===-1 && nilForms.indexOf(betPlayer2)!==-1){
		finalScore = calculateNumericalScore(betPlayer1,resultPlayer1)+calculateNilScore(betPlayer2,resultPlayer2);
	}
	else {
		finalScore = calculateNilScore(betPlayer1,resultPlayer1)+calculateNilScore(betPlayer2,resultPlayer2);
	}
	console.log("finalscore: ",finalScore);
	return finalScore;
}

var calculateNumericalScore = function(bet,result){
	var score;
	if (result>=bet){
		score = bet*10+(result-bet);
	}
	else {
		score = bet*-10;
	}
	console.log(score);
	return score;
}

var calculateNilScore = function(bet,result){
	var score;
	if (result===0){
		if (bet==="half"){
			score=50;
		}
		else if (bet==="nil"){
			score=100;
		}
		else {
			score=200; 
		}
	}
	else {
		if (bet==="half"){
			score=-50+result;
		}
		else if (bet==="nil"){
			score=-100+result;
		}
		else {
			score=-200+result; 
		}
	}
	//console.log(score);
	return score;
}