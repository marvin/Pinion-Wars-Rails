# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
$ ->
	$(".startinput").click ->
		$(".startinput").val ""

	$(".startbutton").click ->
		if $(".startinput").val() isnt "" and $(".startinput").val() isnt "Playername"
			$(".startdiv").hide()	
			$(".gamediv").show()
			url = "game/" + $(".startinput").val()
			console.log url
			window.location = url
		else
			alert "Set your Playername please!"