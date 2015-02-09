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

    $('.game-button').click(function() {
        return window.confirm("Are you sure?");
    });

});