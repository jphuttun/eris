/**
 *
 * @constructor
 */

var Game = function() {

    if ( Game.prototype._singletonInstance ) {
        return Game.prototype._singletonInstance;
    }

    Game.prototype._singletonInstance = this;

    /* Private */

    // Create queue (FIFO) of game modes
    var gameModeStack = [];

    // If dirty, signals that we shoud proceed to next game mode
    var dirty = false;

    /* Public */

    Game.prototype.isDirty = function() {
        return dirty;
    };

    Game.prototype.setDirty = Game.prototype.setReady = function() {
        dirty = true;
    };

    Game.prototype.setDirty = function(isDirty) {
        dirty = isDirty;
    };

    Game.prototype.moveToNextGameMode = function() {
        var len = gameModeStack.length;
        if (len > 0) {
            //Debugger.log('Moving to next game mode...', 1, 0);

            // First make stack undirty
            dirty = false;
            //Debugger.log('Stack is undirtied', 1, 0);

            // If there are more than 1 items in stack (that is, we are not dealing with initial state)
            // Discard current mode from top of the stack, this will make next one in stack to become new current mode
            if (len > 1) {
                //Debugger.log('There are more than 1 game modes in stack. Pop one of them out', 1, 0);
                gameModeStack.shift();
            } else {
                //Debugger.log('There is only 1 game mode in stack, so this must be initial state', 1, 0);
            }

        } else {
            // Error: Tried to move to next game mode but stack is empty
            // TODO: Logging
            Debugger.log('Error: Tried to move to next game mode, but game mode stack is empty.' + this.toStr(), 1, 0);
        }

    };

    Game.prototype.enqueueGameMode = function(gameMode) {
        gameModeStack.push(gameMode);
        dirty = true;
    };

    Game.prototype.enqueueGameModeAndUnloadCurrent = function(gameMode) {

        // First unload current game mode
        if (gameModeStack.length > 0) {
            // Create "unloader" game mode which is identical to current game mode with state of "unload"
            // TODO: Mikä on oikea tapa tehdä objektien propertyjä? Näin kuin alla, eli tosta vain. Vai pitääkö luoda set-getterit? Miksi?
            var unloaderGameMode = new GameMode(gameModeStack[0].mode, GameMode.STATES.UNLOAD);
            this.enqueueGameMode(unloaderGameMode);
        }

        // Then add desired game mode
        this.enqueueGameMode(gameMode);
    };

    Game.prototype.getCurrentGameMode = function() {
        return gameModeStack[0];
    };

    Game.prototype.toStr = function() {
        // TODO: Huom - tämä on _turvallisin_ tapa tehdä array-iteraatio. munArray.forEach(blabla) on kätsympi, muttei 100% selaintuettu
        var len = gameModeStack.length;
        var message = 'GAME MODE STACK: [IsDirty: ' + dirty + '], [Size: ' + len + ']';
        for (var i = 0; i < len; ++i) {
            if (i in gameModeStack) {
                var type = " ";
                if (i === 0) {
                    // Current mode
                    type = "*";
                } else if (i === 1) {
                    // New mode
                    type = "^";
                }
                message += '\n' + 'Game mode ' + type + ' [' + i + '] ' + gameModeStack[i].toStr();
            }
        }
        return message;
    };

};


//@ sourceURL=game.js