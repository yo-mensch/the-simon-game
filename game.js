//alert("all good");
var isStarted = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

// game logic functions

$(document).keypress(function(){
    if(!isStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        isStarted = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    //nextSequence();
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        //console.log("correct");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
        
    }
    else{
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

// animation and sounds V 

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
} 
