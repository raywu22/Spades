var express = require('express');
var router = express.Router();

/* GET home page. */
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
	var canPlay = true;
	for (var playerIndex in players){
		if (players[playerIndex].length===0){
			canPlay = false;
		}
	}
	if (canPlay){
		res.render('game',{currentPlayers:players});
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;
