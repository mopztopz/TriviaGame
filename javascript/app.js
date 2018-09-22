var time = 30;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var serialNumber = 0;
// no need for a value as it is a object variable
var intervalId;

var quesAnsArray = [
  {
    question: " Ant-Man has had a number of incarnations. Which of these was his first?",
    answers: ["Scott Lang", "Eric O Grady", "Mick Taylor", "Hank Pym"],
    correct: "Hank Pym"
  },
  {
    question:
      "What is the real name of the member of the Uncanny X-Men known as Nightcrawler?",
    answers: ["Frank Castle", "Kurt Wagner ", "Hank McCoy", "Aleksei Sytsevich"],
    correct: "Kurt Wagner " 
  },
  {
    question:
      "The Fantastic Four have the headquarters in what building?",
    answers: ["Stark Tower", "Fantastic Headquarters", "Baxter Building", "Xavier Institute"],
    correct: "Baxter Building"
  },

  {
    question: "Thor has two war goats to pull his chariot. They are named:",
    answers: ["Balder and Hermod", "Thunder and Lightning", "Ask and Embla", "Toothgrinder and Toothgnasher"],
    correct: "Toothgrinder and Toothgnasher"
  },
  {
    question: "The vampire hunter Blade is a:",
    answers: ["Mutant", "Human", "Vampire", "Half Vampire"],
    correct: "Half Vampire"
  },
  {
    question:
      "Deadpool joined the Weapon X program because:",
    answers: ["He had incurable cancer", "He was forced to", "He thought it would be fun", "He wanted to fight for justice"],
    correct: "He had incurable cancer"
  },
  {
    question:
      "What did Dr. Pym discover that allowed him to change size?",
    answers: [
      "Gamma Rays",
      "Pym Particles",
      "Alpha Rays",
      "Omega Particles"
    ],
    correct: "Pym Particles"
  },
  {
    question: "Silver Surfer's surfboard is composed of:",
    answers: ["Adamantium", "Silver", "Ice", "Glass"],
    correct: "Adamantium"
  },
  {
    question: "Captain America was frozen in which war?",
    answers: [
      "World War 1",
      "World War 2",
      "Vietnam",
      "Cold War"
    ],
    correct: "World War 2"
  },
  {
    question: "Before turning to a life of crime, Mysterio was?",
    answers: ["A stuntman", "A special effects artist", "A magician", "A firefighter"],
    correct: "A special effects artist"
  }
];
var option = ["A.","B.","C.","D."];

$("#start").on("click", function(event) {
  // hides the start button
  $("#start").hide();
  //time needs to be called before the set of question appears
  timeStarter();
  //a set of a question and 4 possible answer
  qaset();
});

function timeStarter() {
  intervalId = setInterval(decrement, 1000);

  function decrement() {
    if (time === 0) {
      clearInterval(intervalId);
      timeOver();
    } else if (time > 0) {
      //decrease number by one
      time--;
    }
    $(".timer").html(time);
  }
}

function contentBuild() {
  $(".maincontent").empty();

  $(".maincontent").append($("<h2 id='timeR'>"));
  $("<h2>").addClass("text-center timer-p");
  $("#timeR").append($("<span class='timer'>"));
  $(".timer").html(time);
}

function qaset() {
  console.log(serialNumber);
  contentBuild();

  $(".maincontent").append(
    $(
      "<h3 class='text-center'>" + quesAnsArray[serialNumber].question + "</h3>"
    )
  );

  for (var i = 0; i < 4; i++) {
    $(".maincontent").append(
      $(
        "<h3 class='answer'>" +
          option[i] +
          " " +
          quesAnsArray[serialNumber].answers[i] +
          "</h3>"
      )
    );
  }
  console.log(serialNumber);
}

function timeOver() {
  unanswered++;

  contentBuild();

  $(".maincontent").append(
    $("<h3 class='text-center'> You ran out of time!</h3>")
  );
  $(".maincontent").append(
    $(
      "<button> The correct answer is: " +
        quesAnsArray[serialNumber].correct +
        "</button>"
    )
  );

  setTimeout(hault, 2000);
}

$("body").on("click", ".answer", function(event) {
  //player choice is userChoice
  var userChoice = $(this).text();
  //chooses the answer
  //var c = "a. chanda"
  //c.substring(3)=chanda
  var userAnswer = userChoice.substring(userChoice.indexOf(".") + 2);
  console.log(userChoice);
  console.log(quesAnsArray[serialNumber].correct);
  console.log(userAnswer);

  if (userAnswer === quesAnsArray[serialNumber].correct) {
    showCorrect();
  } else {
    showIncorrect();
  }
  clearInterval(intervalId);
});

function showCorrect() {
  correct++;
  contentBuild();

  $(".maincontent").append(
    $(
      "<h3 class='text-center'>Correct! The answer is: " +
        quesAnsArray[serialNumber].correct +
        "</h3>"
    )
  );

  setTimeout(hault, 2000);
}

function showIncorrect() {
  incorrect++;
  contentBuild();

  $(".maincontent").append(
    $(
      "<h3 class='text-center'>Incorrect! The correct answer is: " +
        quesAnsArray[serialNumber].correct +
        "</h3>"
    )
  );

  setTimeout(hault, 2000);
}

function hault() {
  if (serialNumber < 9) {
    serialNumber++;
    qaset();
    time = 30;
    timeStarter();
  } else {
    gameOver();
  }
}

function gameOver() {
  contentBuild();

  $(".maincontent").append($("<h3>Correct Answers: " + correct + "</h3>"));
  $(".maincontent").append($("<h3>Incorrect Answers: " + incorrect + "</h3>"));
  $(".maincontent").append(
    $("<h3>Unanswered Answers: " + unanswered + "</h3>")
  );
  $(".maincontent").append(
    $(
      "<button type='button' class='btn btn-secondary' id='reset'>Start Over?</button>"
    )
  );
}

$("body").on("click", "#reset", function() {
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  serialNumber = 0;
  intervalId;
  time = 30;
  timeStarter();
  qaset();
});
