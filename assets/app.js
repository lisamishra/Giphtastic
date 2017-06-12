
//Given buttons
var celebs = ["Kanye", "Jay Z", "Beyonce", "Rihanna"];

//Make buttons from array
makeButtons();

$("#addButton").on("click", function(event) {
  event.preventDefault();
  var input = $("#addText").val().trim();
  celebs.push(input);
//More buttons
  makeButtons();
});

function makeButtons(){

  $("#showButton").empty();
//Given Arrays
      for (var i=0; i<celebs.length; i++){
        var btn = $("<button>");
        btn.addClass("btn pix a");
        btn.attr("data-image", celebs[i]);
        btn.text(celebs[i]);
        $("#showButton").append(btn);
      }
  }

//Display buttons
function display(){
//Search API database
    var gifImage = $(this).attr("data-image");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifImage + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(gifImage);

//AJAX code
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

//Store results
      var results = response.data;
      $("#gifs").empty();
      for (var i=0; i<results.length; i++){
        var topicDiv = $("<div>");

//Ratings
        var r = $("<h2>").text("Rated: " + results[i].rating);
        var celebImage = $("<img>");

//Keep getting error in console that spits out lines 53-56 as error//

          // celebImage.attr("src", results[i].gifs.downsized.url);
          // celebImage.attr("data-still", results[i].gifs.downsized.url);
          // celebImage.attr("data-animate", results[i].gifs.downsized.url);
          // celebImage.attr("data-state", "still");

//Display ratings from database
        topicDiv.append(r);
        topicDiv.append(celebImage);
        topicDiv.addClass("animate left a");
        $("#gifs").prepend(topicDiv);
      }
    })
}

//Gifs go live
function animate(){
    var state = $(this).find("img").attr("data-state");
    
//Stop and animate gifs
      if (state === "still"){
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
      } else{
        $(this).find("img").attr("src", $(this).find("img").attr("data-state"));
        $(this).find("img").attr("data-state", "still");
      }
}

//Display ratings and gifs
$(document).on("click", ".pix", display);
//Click to look for animated gifs
$(document).on("click", ".animate", animate);