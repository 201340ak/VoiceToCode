const artyom = new Artyom();
const $ = require("jquery");
const robot = require("robotjs");

function RunCommand() {
    artyom.simulateInstruction("Open");
}

function AddOpenExecCommand() {
    artyom.addCommands([{
        indexes: ["Open"],
        action: function () {
            if (document.getElementById("exampleFormControlFile1").files.length === 0) {
                artyom.say("Please select executable below.");
                return;
            }

            OpenExectuable();
        }
    }]);
}

function OpenExectuable(pathToExec) {
    artyom.say("Opening executable");
    var pathToExec = document.getElementById("exampleFormControlFile1").files[0].path;
    var executeFile = require('child_process').execFile;
    executeFile(pathToExec, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data.toString());
    });

    setTimeout(function () {
        CreateNewUsingHotKey();
        PasteContent();
    }, 3000);
}

function CreateNewUsingHotKey() {
    var commandToOpenNewFile = $("#hotKeyCommandForNewFile").val();
    var keys = commandToOpenNewFile.split("+");
    keys.forEach(function (key) {
        if (key == "ctrl") {
            key = "control";
        }
        robot.keyToggle(key, 'down');
    });
    keys.forEach(function (key) {
        if (key == "ctrl") {
            key = "control";
        }
        robot.keyToggle(key, 'up');
    });
}

function PasteContent() {
    var contentToPaste = $("#contentToPasteInNewFile").val();
    console.log(contentToPaste);
    robot.typeString(contentToPaste);
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

    AddOpenExecCommand();

    BuildSimulationButtons();
};