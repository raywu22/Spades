$(document).ready(function(){
	$(".ready-to-play").on('click',function(){
		var currentId = $(this).get(0).id;
		var singleId =  currentId.substring(currentId.length-1,currentId.length);
		var inputClass = ".spades"+singleId;
		if ($(inputClass).val().length!==0){
			$(this).toggleClass("highlight");
			highlightArray = $(".highlight");
			if (highlightArray.length===4){
				var audioElement = document.createElement('audio');
		        audioElement.setAttribute('src', './Spades.mp3');
		        audioElement.setAttribute('autoplay', 'autoplay');
		        audioElement.play();
				$(".hide-until-ready").removeClass("hide-until-ready");
				$(".start-spades-row").addClass("hide-until-ready");
				$(".team-label").addClass("hide-until-ready");
			}			
		}
	});
});