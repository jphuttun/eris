/**
 *
 * @constructor
 */

var Strategy = function() {
    Debugger.log("Inside: Strategy, Constructor", 1, 0);
};

// ** Prototypes = Jokainen instanssi perii nämä

Strategy.prototype.load = function() {
    Debugger.log("Inside: Strategy, LOAD", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.STRATEGY, GameMode.STATES.INIT));
};

Strategy.prototype.init = function() {
    Debugger.log("Inside: Strategy, INIT", 1, 0);
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.STRATEGY, GameMode.STATES.RUN));
};

Strategy.prototype.run = function() {
    Debugger.log("Inside: Strategy, RUN", 1, 0);

    // TODO: Tähän tulee main game loop
    // Main game loopin sisällä sit kutsuttais
    //var game = new Game();
    //game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.COMBAT, GameMode.STATES.INIT));
    // PUUH: Ei enää, stopataan nyt tähän...
};

Strategy.prototype.unload = function() {
    Debugger.log("Inside: Strategy, UNLOAD", 1, 0);
    var game = new Game();

    // Unload ready - signal that next mode can now be loaded
    game.setReady();

};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: Game.STATES.LOAD

// N/A


//@ sourceURL=game.js