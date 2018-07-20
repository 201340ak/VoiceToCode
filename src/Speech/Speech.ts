// import Artyom from '../../node_modules/artyom.js/source/artyom.js';
const Artyom = require("artyom.js");
var Jarvis = new Artyom.default();

export class Speech {
    TypesOfCommands: string[] = ["Speak"];
    
    AddCommands(commands: Command[])
    {
        commands.forEach(function(command){
            Jarvis.addCommands([{
                indexes: command.indexes,
                action: command.action
            }]);
        })
    }

    AddCommand(command: Command)
    {
        Jarvis.addCommands([{
            indexes: command.indexes,
            action: command.action
        }]);
    }

    AddSpeakCommand(commandIndex: string, speechToSayAloud: string)
    {
        var indexes = commandIndex.split(',');
        var speakCommand: Command = {
            indexes: indexes,
            action: () => this.Say(speechToSayAloud)
        }
        this.AddCommand(speakCommand)
    }

    GetAvailableCommands()
    {
        return Jarvis.getAvailableCommands();
    }

    RunCommand(commandIndex: string)
    {
        Jarvis.simulateInstruction(commandIndex);
    }

    InitializeSpeech()
    {
        // Initialize and Start Artyom
        Jarvis.initialize({
            debug: true,
            continuous: false,
            lang: "en-GB",
            listen: true
        }).then(() => {
            console.log("Speech succesfully initialized");
        }).catch(() => {
            console.log("Oops, something went wrong with your configuration ... ");
        });
    }

    StopListening()
    {
        // Stop Artyom
        setTimeout(() => {
            Jarvis.fatality().then(() => {
                console.log("succesfully stopped listening");
            }).catch(() => {
                console.log("Well, this shouldn't happen :) ... ");
            });
        }, 5000);
    }

    Restart()
    {
        // Restart Artyom
        Jarvis.restart().then(() => {
            console.log("Speech succesfully restarted with the same initialization configuration");
        }).catch((err: any) => {
            console.error("Cannot restart", err);
        });
    }

    Say(speak: string)
    {
        Jarvis.say(speak);
    }

    // TODO: Move to separate file.
    TestCommand: Command = {
        indexes: ["Hello"],
        action: () => this.Say("hello")
    }
}

export class Command {
    indexes: Array<any>;
    action: Function;
    description ?: string;
    smart ?: Boolean;
}

