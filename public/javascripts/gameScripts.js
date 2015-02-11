$(document).ready(function(){

	$(".spades-single-game-sideBar").on("click",function(){
		$(".spades-sideBar-selected").removeClass("spades-sideBar-selected");
		$(this).addClass("spades-sideBar-selected");
		var name1 = $(".spades-sideBar-selected").find("p")[0].innerText;
		var name2 = $(".spades-sideBar-selected").find("p")[1].innerText;
		var teamNames = ".game" + name1 + name2;
		$(".game-shown").addClass("game-hidden").removeClass("game-shown");
		$(teamNames).removeClass("game-hidden").addClass("game-shown");
	});

    $('.delete-button').click(function() {
        return window.confirm("Are you sure?");
    });
    $(".game-input-score").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: $(this).serialize(),
            beforeSend: function() {
            },
            success: function(message) {
            	var teamsData = message.data;
            	if (message.message==="invalidInputs"){
            		alert("Invalid Inputs");
            	}
            	else {
            		$(".score-table").append("<tr>"+
	                    "<td>"+teamsData.team1Points[teamsData.team1Points.length-1]+"</td>"+
	                    "<td>"+teamsData.team2Points[teamsData.team2Points.length-1]+"</td>"+
	                  "</tr>");
            		if (message.message==="team1Win"){
            			
            		}
            		if (message.message==="team2Win"){

            		}
            	}
            }
        });
    });

});