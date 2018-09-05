//API key= nfh6Xdo60OlVkfiTsM6MXHy2GcS7qNuC
var topics = ["Ryan Reynolds", "Paul Walker", "ryan gosling", "Scarlett Johansson", 
"Tom Hanks","Tom Cruise", "Will Smith", "Leonardo DiCaprio", "Johnny Depp", "Cameron Diaz",
"Arnold Schwarzenegge", "Brad Pitt", "Jennifer Lawrence", "Vin Diesel", "Emma Stone",
"Emma Watson", "Keanu Reaves", "Matthew McConaughey"];


function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("Button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".Button").unbind("click");

	$(".Button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=nfh6Xdo60OlVkfiTsM6MXHy2GcS7qNuC&rating=PG&limit=10",
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#Actors").val().trim());
		$("#Actors").val("");
	});
});
