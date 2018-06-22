$(document).ready(function(){
    var options = [
        {
            question: "She turned me into a...",
            choice: ["Snake!", "Newt!", "Frog!", "Shrubbery!"],
            answer: 1,
            photo: "assets/images/newt.gif"
        },
        {
            question: "The Knights who said Ni were particularly interested in these.",
            choice: ["Bears!", "Shrubberies!", "Spanish Inquisitions!", "Knights!"],
            answer: 1,
            photo: "assets/images/shrubbery.gif"
        },
        {
            question: "This relic was used to destroy the killer bunny.",
            choice: ["Papal Pen of Death!", "The Dagger of Divinity!", "The Holy Hand Grenade!", "The Spirtiual Spike!"],
            answer: 2,
            photo: "assets/images/grenade.gif"
        },
        {
            question: "Who lost both his arms and both his legs in a sword fight?",
            choice: ["The Black Knight","The Knight who Said Ni!","Lancelot","Arthur"],
            answer: 0,
            photo: "assets/images/blackknight.gif"
        },
        {
            question: "How did Arthur become King of the Britains?",
            choice: ["He won a lottery", "He won the vote", "was given a sword by a strange woman", "His father was the previous king"],
            answer: 2,
            photo: "assets/images/system.gif"
        },
        {
            question: "What exact number that must be counted to prior to throwing Holy Hand Grenade?",
            choice: ["2","4","5","3"],
            answer: 3,
            photo: "assets/images/three.gif"
        },
        {
            question: "To infiltrate the French, Arthur and his knights create the trojan...",
            choice: ["Horse!", "Camel!", "Bunny!", "Moose!"],
            answer: 2,
            photo: "assets/images/french.gif"
        },
        {
            question: "What is the Enchanter's name?",
            choice: ["Merlin", "Tim", "Logain", "Rand"],
            answer: 1,
            photo: "assets/images/tim.gif"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();
    
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        /*	if (pick.shown) {
    		displayQuestion();
        	} else {
        		console.log(pick.question);
        iterate through answer array and display */
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //checks answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position
            userGuess = parseInt($(this).attr("data-guessvalue"));

    
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //score screen
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })
});