/**
 *
 * @constructor
 */

// TODO: Miten pakottaa, että argumentin pitää olla tyyppiä x? Jos ei mitenkään, miten ohjeistaa koodaria?
var GameMode = function(mode, state) {

    this.mode = mode;
    this.state = state;

};

// ** Prototypes

GameMode.prototype.toStr = function() {
    return 'Mode: ' + this.mode.name + ', State: ' + this.state.name;
};

GameMode.prototype.toJSONStr = function() {
    return JSON.stringify(this, null, 4);
};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: GameMode.STATES.LOAD

GameMode.MODES = {
    MAINMENU : {value: 0, name: "Main menu"},
    CREDITS : {value: 1, name: "Credits"},
    STRATEGY : {value: 2, name: "Strategy"},
    COMBAT : {value: 3, name: "Combat"}
};

// STATES = Kunkin moodin ajostatus. Load = lataa resurssit. Init = Aseta alkuarvot. Run = Mainloop käynnissä. Unload = Pura resurssit
GameMode.STATES = {
    LOAD : {value: 0, name: "Load"},
    INIT: {value: 1, name: "Init"},
    RUN : {value: 2, name: "Run"},
    UNLOAD : {value: 3, name: "Unload"}
};

//@ sourceURL=GameMode.js