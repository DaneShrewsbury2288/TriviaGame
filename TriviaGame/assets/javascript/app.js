
// When sit loads, hide some of the jumbotron
$(document).ready(function () {

    $("#questionbegin").hide();
    $("#timeremaining").hide();
    $("#Results").hide();
    $("#reset").hide();


    // List of all possible questions
    var questionoptions = [
        {
            question: "Sarah Connor is a key character in which movie franchise?",
            choice: ["Harry Potter", "Terminator", "Mission: Impossible", "Austin Powers"],
            answer: 1,
            photo: "assets/images/terminator.jpg"
        },
        {
            question: "What is the name of the young heroine in The Hunger Games?",
            choice: ["Katerina Eveleen", "Kathleen Evergrow", "Katherine Evergreen", "Katniss Everdeen"],
            answer: 3,
            photo: "assets/images/KatnissEverdeen.jpg"
        },
        {
            question: "Agent Smith is a villain in which film series?",
            choice: ["Lethal Weapon", "Batman", "Men in Black", "The Matrix"],
            answer: 3,
            photo: "assets/images/agentsmith.jpg"
        },
        {
            question: "What is the name of Thor's Hammer from the Avengers movie?",
            choice: ["HulkSmasher", "Mjolnir", "Jonraer", "Odinsfist"],
            answer: 1,
            photo: "assets/images/mjolnir.jpg"
        },
        {
            question: "Captain America's name is?",
            choice: ["Steve Rodgers", "Adam Smith", "Will Wheton", "John Powers"],
            answer: 0,
            photo: "assets/images/captainamerica.jpg"
        },
        {
            question: "Luke Skywalker was born on which planet?",
            choice: ["Naboo", "Hoth", "Tatooine", "Alderaan"],
            answer: 2,
            photo: "assets/images/tatooine.jpg"
        },
        {
            question: "What is the name of the title character in Anchorman?",
            choice: ["Ron merlot", "Ron Burgundy", "Rob Malbec", "Rob Bordeaux"],
            answer: 1,
            photo: "assets/images/ronburgandy.jpg"
        },
        {
            question: "What is the title of the first film in the four movies about Jason Bourne?",
            choice: ["The Bourne Legacy", "The Bourne Ultimatum", "The Bourne Supremacy", "The Bourne Identity"],
            answer: 3,
            photo: "assets/images/jasonbourne.jpg"
        },
        {
            question: "What is Darth Vader's actual name?",
            choice: ["Ben Skywalker", "Han Solo", "Anakin Skywalker", "JarJar Binks"],
            answer: 2,
            photo: "assets/images/darthvader.jpg"
        },
        {
            question: "In the movie Harry Potter, what subject does Snape teach?",
            choice: ["Potions", "Defense against the Dark Arts", "Herbology", "Charms"],
            answer: 0,
            photo: "assets/images/snape.jpg"
        },

    ];

    // Set a few variables to be used later
    var correctanswers = 0;
    var wronganswers = 0;
    var timer = 15;
    var userGuess = "";
    var running = false;
    var intervalID;
    var questionCount = questionoptions.length;
    var questionselected;
    var index;
    var newArray = [];
    var holder = [];


    // function to generate the questions
    function generateQuestion() {
        index = Math.floor(Math.random() * questionoptions.length);
        questionselected = questionoptions[index];
        answerselected = questionoptions[index].answer;

        console.log("answer selected" + " " + answerselected);

        $("#questions").html("<h2>" + questionselected.question + "</h2>");

        // Output the chosen chosenquestion variable to an pre-set row with some text and buttons (multiple choice)
        for (var i = 0; i < questionselected.choice.length; i++) {
            var userChoice = $("<button>");
            userChoice.addClass("answerchoice");
            userChoice.html(questionselected.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
        };
        
        // When you click the button, test if its the same as the correct answer
        $(".answerchoice").on("click", function () {

            userGuess = $(this).text();
    

            console.log(questionselected.choice[questionselected.answer]);
            console.log(userGuess);
    
            if (userGuess == questionselected.choice[questionselected.answer]) {
    
                stop();
                correctanswers++;
                $("#answers").html("<h2> Correct! </h2>");
                nextQuestion();
    
            }
            else {
                stop();
                wronganswers++;
                $("#answers").html("<h2> Wrong! The correct answer is:" + " " + questionselected.choice[questionselected.answer] + "</h2>");
                nextQuestion();
    
            }
        });
    };



    // Begin a timer of 20 seconds for each question
    function runTimer() {
        if (running === false) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        };
    };

    function decrement() {
        //Display the time remaining in a div
        $("#timeremaining").html("<h2>Time Remaining:" + timer + "</h2>");
        timer--;

        // If timer reaches 0, go to next question
        if (timer === 0) {
            stop();
            $("#answers").html("<h2> Time is up! The correct answer is:" + " " + questionselected.choice[questionselected.answer] + "</h2>")
        }
    };

    function stop() {
        running = false;
        clearInterval(intervalId);
    };

    function nextQuestion() {
        $("#answers").append("<img src=" + questionselected.photo + ">");
        newArray.push(questionselected);
        questionoptions.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answers").empty();
            timer= 15;
    
  
        if ((wronganswers + correctanswers) === questionCount) {
            $("#timeremaining").empty();
            $("#questions").empty();
            $("#questions").html("<h3>Game Over! Here are your results: </h3>");
            $("#answers").append("<h4> Correct: " + correctanswers + "</h4>" );
            $("#answers").append("<h4> Incorrect: " + wronganswers + "</h4>" );

            $("#reset").show();
            correctanswers = 0;
            wronganswers = 0;

    
        } else {
            runTimer();
            generateQuestion();
    
        }
        }, 2000);  
    };


  

    // Hit the start button to begin
    $("#start").click(function () {

        $("#startbegin").hide();
        $("#start").hide();
        $("#timeremaining").show();
        $("#questionbegin").show();

        for (i = 0; i < questionoptions.length; i++) {
            holder.push(questionoptions[i]);
        }

        generateQuestion();
        runTimer();

    });

    // Once all 10 questions have been cyccled through, show end results

    $("#reset").click(function () {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();

        for(var i = 0; i < holder.length; i++) {
            questionoptions.push(holder[i]);
        }

        generateQuestion();
        runTimer();

    });






});