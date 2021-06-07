var buttonColor = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
// var started = true;

document.addEventListener("keypress", nextSequence, true);

$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  setTimeout(function () {
    $("." + userChosenColor).removeClass("pressed");
  }, 200);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor) {
  $("." + currentcolor).addClass("pressed");
}

function checkAnswer(currentlevel) {
//   console.log("inside check answer");
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    // console.log("last checker matches answer");
    if (userClickedPattern.length === gamePattern.length) {
    //   console.log("length checker matches answer");
      for (let i = 0; i < currentlevel; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game Over, Press Any key to Restart");
          restart();
        }
      }
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any key to Restart");
    restart();
  }
}

function nextSequence() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    level++;
    setTimeout(nextSequence(), 300);
  } else {
    document.removeEventListener("keypress", nextSequence, true);
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColor[randomNum];
    gamePattern.push(randomChosenColor);
    let chosenButton = $("div." + randomChosenColor);
    $(chosenButton).fadeOut().fadeIn();
    playSound(randomChosenColor);
    level++;
  }
}

function restart() {
  gamePattern = [];
  level = 0;
  document.addEventListener("keypress", nextSequence, true);
  //   started = false;
}

// $(document).keypress(function () {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// // $(document).on("keypress", nextSequence, true);
// document.addEventListener("keypress", nextSequence, true);
