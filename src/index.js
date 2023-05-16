const { app, BrowserWindow } = require('electron');
const path = require('path');

//Import library os-utils
const os = require('os-utils');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 400,
    icon: __dirname + "/images.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //preload: path.join(__dirname, 'preload.js'),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  setInterval (() => 
  {
  os.cpuUsage(function(v) 
  {
    //get data
    var cpu = v * 100;
    var memory = os.freememPercentage() * 100;
    var totalMemory = os.totalmem() / 1024;

    //set data
    //CPU
    console.log("CPU Usage (%): " + cpu.toFixed(2));
    mainWindow.webContents.send("cpu", cpu.toFixed(2));

    //Memory
    console.log("Memory Usage (%): " + memory.toFixed(2));
    mainWindow.webContents.send("mem", memory.toFixed(2));

    //total memory
    console.log("Total Memory (GB): " + totalMemory.toFixed(0));
    mainWindow.webContents.send("total-mem", totalMemory.toFixed(0));

    //Platform
    console.log("Platform: " + os.platform());
    mainWindow.webContents.send("platform", os.platform());
  });
}, 1000);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
