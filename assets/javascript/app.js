function startTrivia() {
  var questionArray = [{
    question: "Who is the oldest female professional tennis player?",
    answers: ["Serena Williams", "Venus Williams", "Martina Hingis", "Maria Sharapova"],
    correctanswer: 1
  }, {
    question: "Who has won the most tournaments in the last 10 years?",
    answers: ["Pete Sampras", "Andre Agassi", "Roger Federer", "Rafael Nadal"],
    correctanswer: 2
  }, {
    question: "Who has the fastest serve of all time, at 155mph?",
    answers: ["Roger Federer", "Andy Roddick", "John Isner", "Kevin Anderson"],
    correctanswer: 1
  }, {
    question: "Who has won every Grand Slam including the Olympics within 1 calendar year?",
    answers: ["Serena Williams", "Venus Williams", "Maria Sharapova", "Steffi Graf"],
    correctanswer: 3
  }, {
    question: "Which Grand Slam requires players to wear all white clothing?",
    answers: ["US Open", "Australian Open", "Wimbledon", "French Open"],
    correctanswer: 2
  }]

  displayQuestions(questionArray);
  $("#submit").on('click', validateAnswers);

  function clearGame() {
    $("#questions").empty();
    $("#submit").remove();
    questionTimer.stop();
    $("#time").empty();
  }

  function displayResults(correct, wrong) {
    $("#correct-counter").text("Correct: " + correct);
    $("#wrong-counter").text("Wrong: " + wrong);
  }

  //wrong and right guesses
  function validateAnswers() {
    var correct = 0;
    var $answers = $("input:checked");
    var wrong = 0;
    for (let idx = 0; idx < $answers.length; idx++) {
      var questionIndex = $($answers[idx]).attr("name");
      var myAnswer = $($answers[idx]).attr("value");
      var question = questionArray[questionIndex];

      if (myAnswer == question.correctanswer) {
        correct++;
      }
    }
    // questions without guesses are wrong
    wrong = questionArray.length - correct;
    
    //clear game
    clearGame();
    // display the results
    displayResults(correct, wrong);
  }

  //timer 
  var questionTimer = {
      time: 30,

    reset: function() {
          questionTimer.time = 30;
    },
    start: function() {
      $("#time").html("Time Remaining: " + questionTimer.time);
      counter = setInterval(questionTimer.count, 1000);
    },
    stop: function() {
          clearInterval(counter);
    },
    count: function() {
          questionTimer.time--;
          $("#time").html("Time Remaining: " + questionTimer.time);
          if (questionTimer.time <= 0) {
            validateAnswers();
          }

      }
    }

  questionTimer.start();
}


$( "#other" ).click(function() {
  $( "#target" ).submit();
});


//display questions in html
function displayQuestions(questions) {
  for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
    $("#questions").append(questionToJQuery(questions[questionIndex], questionIndex));
  }
}


function questionToJQuery(question, questionId) {
  var $container = $("<div>");
  var $question = $("<div>");
  $question.text(question.question);
  $container.append($question);

  var $radioSection;
  var $radioInput;
  var $answerLabel;
  for (var idx = 0; idx < question.answers.length; idx++) {
    $radioSection = $("<div>");
    $radioInput = $("<input type='radio' value='" + idx + "' name='" + questionId + "'/>");
    $answerLabel = $("<label>");
    $answerLabel.text(question.answers[idx]);

    $radioSection.append($radioInput);
    $radioSection.append($answerLabel);
    $container.append($radioSection);
  }

  return $container;
}


startTrivia();
// function roundComplete() {
//   console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter );
  
//   document.getElementById("right-guesses").innerHTML = rightGuesses;

//   document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
//   // If we have gotten all the letters to match the solution...
//   if (answers.toString() === correctanswer.toString()) {
    
//     winCounter++;
    
//     document.getElementById("win-counter").innerHTML = winCounter;
//     startGame();
//   }
//   // If we've run out of guesses..
//   // else if (wrongGuesses /== correctanswer) {
    
//   //   lossCounter++;
    
//     // Update the loss counter in the HTML.
//     document.getElementById("loss-counter").innerHTML = lossCounter;
//     // Restart the game.
//     startGame();
  
// }
