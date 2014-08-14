/**
 *
 * @constructor
 */

var Combat = function() {
    Debugger.log("Inside: Combat, Constructor", 1, 0);
};

// ** Prototypes = Jokainen instanssi perii nämä

Combat.prototype.load = function() {
    Debugger.log("Inside: Combat, LOAD", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.COMBAT, GameMode.STATES.INIT));
};

Combat.prototype.init = function() {
    Debugger.log("Inside: Combat, INIT", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.COMBAT, GameMode.STATES.RUN));
};

Combat.prototype.run = function() {
    Debugger.log("Inside: Combat, RUN", 1, 0);

    // TODO: Tähän tulee main game loop
    // Main game loopin sisällä sit kutsuttais
    var game = new Game();
    game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.STRATEGY, GameMode.STATES.INIT));
};

Combat.prototype.unload = function() {
    Debugger.log("Inside: Combat, UNLOAD", 1, 0);
    var game = new Game();

    // Unload ready - signal that next mode can now be loaded
    game.setReady();

};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: Game.STATES.LOAD

// N/A


//@ sourceURL=game.js