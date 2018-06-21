const artyom = new Artyom();
const $ = require("jquery");

function StartArtyomOneCommand() {
    console.log("One command");
    if (artyom.isRecognizing()) {
        return alert("Stop artyom first !");
    }

    //Although the voice can't be changed,
    // You need to set the language for the speech
    // Recognition, see the documentation for more examples
    return artyom.initialize({
        lang: "en-GB",
        debug: true,
        continuous: false,
        listen: true
    });
}

function TriggerSimulation(command) {
    artyom.simulateInstruction(command); //Simulate a voice  command with voice command
}

function StartArtyomContinuous() {
    console.log("Continuous commands");
    if (artyom.isRecognizing()) {
        return alert("Stop artyom first !");
    }

    // You can create a permanent voice assistant
    // if you want using the continuous mode !
    return artyom.initialize({
        lang: "en-GB",
        debug: true,
        continuous: false,
        listen: true
    });
}

function StopArtyom() {
    artyom.fatality();
}

function AddBasicCommands() {
    artyom.addCommands([
        {
            indexes: ["Hello", "Hi"],
            action: function (i) {
                artyom.say("Hello, how are you today?");
            }
        },
        {
            indexes: ["Goodbye"],
            action: function () {
                artyom.say("See ya!");
            }
        },
        {
            indexes: ["Hey Joey"],
            action: function () {
                artyom.say("How you doin'");
            }
        },
        // {
        //     indexes:["Say * please"],
        //     smart:true,
        //     action: function(i,wildcard,sentence){
        //         artyom.say(wildcard);
        //     }
        // },
        // {
        //     indexes:["Text content *"],
        //     smart:true,
        //     action: function(i,wildcard,sentence){
        //         document.getElementById("text-content").value = wildcard;
        //     }
        // },
        // {
        //     indexes:["write * in the console"],
        //     smart:true,
        //     action: function(i,wildcard,sentence){
        //         console.log(wildcard);
        //     }
        // }
    ]);
}

function BuildSimulationButtons() {
    var commands = artyom.getAvailableCommands();
    commands.forEach(function (command) {
        $("#simulationButtonsContainer").append(
            ' <button type="button" class="btn btn-primary" onclick="TriggerSimulation('
            + "'" + command.indexes + "'" + ');">Simulate Saying ' + command.indexes
            + "</button>");
    });
}

window.onload = function () {
    // Add the error listeners
    artyom.when("ERROR", function (err) {
        console.error("An error ocurred : ", err.code);
    });

    console.log("Artyom is ready");

    // Important, add the commands to process.
    AddBasicCommands();

    BuildSimulationButtons();
};