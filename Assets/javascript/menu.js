const {remote} = require('electron');
        const {Menu, MenuItem} = remote;
        let submenu = new Menu();
        submenu.append(new MenuItem({ type: 'checkbox', label: 'box1' }));
        submenu.append(new MenuItem({ type: 'checkbox', label: 'box2' }));
        submenu.append(new MenuItem({ type: 'checkbox', label: 'box3' }));
        submenu.append(new MenuItem({ type: 'checkbox', label: 'box4' }));
        let menu1 = new Menu();
        menu1.append(new MenuItem({ label: 'This is a test menu', click () { alert('item 1 clicked'); } }));
        menu1.append(new MenuItem({ label: 'Will update later', type: 'checkbox', checked: true }));
        menu1.append(new MenuItem({ label: 'Sub menu', submenu: submenu}));
        window.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          menu1.popup(remote.getCurrentWindow());
        }, false);