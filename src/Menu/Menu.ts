import { Menu, MenuItem } from "electron";
// const { Menu, MenuItem } = remote;
const path = require('path');

export class MyMenu
{
    NavigationMenu(): Electron.Menu {
        let indexPath = 'file://' + path.join(__dirname, '../..') + '/index.html';
        let speechCommandsPath = 'file://' + path.join(__dirname, '../..') + '/speechCommands.html';
        let navigation = new Menu();
        navigation.append(new MenuItem({
             label: 'Home',
             click(menuItem, browserWindow, event) {
                 console.log(indexPath);
                browserWindow.loadURL(indexPath);
            }
            }
        ));
        navigation.append(new MenuItem({
             label: 'Speech Commands',
             click(menuItem, browserWindow, event) {
                browserWindow.loadURL(speechCommandsPath);
            }
        }));

        return navigation;
    }

    MainMenu(): Electron.Menu {
        let mainMenu = new Menu();
        mainMenu.append(new MenuItem({ label: 'Navigate', submenu: this.NavigationMenu() }));

        return mainMenu;
    }

    LoadMainMenu() {
        let mainMenu = this.MainMenu();
    }

    PopUp(options: Electron.PopupOptions)
    {
        let mainMenu = this.MainMenu();
        mainMenu.popup(options);
    }
}

