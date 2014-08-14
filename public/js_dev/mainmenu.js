/**
 *
 * @constructor
 */

var Mainmenu = function() {
    Debugger.log("Inside: Mainmenu, Constructor", 1, 0);
};

// ** Prototypes = Jokainen instanssi perii nämä

Mainmenu.prototype.load = function() {
    Debugger.log("Inside: Mainmenu, LOAD", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.INIT));
};

Mainmenu.prototype.init = function() {
    Debugger.log("Inside: Mainmenu, INIT", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.RUN));
};

Mainmenu.prototype.run = function() {
    Debugger.log("Inside: Mainmenu, RUN", 1, 0);

    // TODO: Tähän tulee main game loop
    // Main game loopin sisällä sit kutsuttais
    var game = new Game();
    game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.COMBAT, GameMode.STATES.INIT));
};

Mainmenu.prototype.unload = function() {
    Debugger.log("Inside: Mainmenu, UNLOAD", 1, 0);
    var game = new Game();

    // Unload ready - signal that next mode can now be loaded
    game.setReady();

};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: Game.STATES.LOAD

// N/A


//@ sourceURL=game.js