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

    // *** IMAGES

    wade.loadImage('images/game/mainmenu/bgmainmenu.png');
    wade.loadImage('images/game/mainmenu/btncombat.png');
    wade.loadImage('images/game/mainmenu/btncredits.png');
    wade.loadImage('images/game/mainmenu/btnstrategy.png');

    // *** READY: Go to next mode
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.INIT));
};

Mainmenu.prototype.init = function() {
    Debugger.log("Inside: Mainmenu, INIT", 1, 0);

    // TODO: Luo create-helper, jolla tuo toistuva koodi saadaan helper-funktioon. DRY = Dont Repeat Yourself!!
    // TODO: Scene objektien position: älä käytä hardkoodattuja pikseleitä, vaan prosentteja of max bg width, jne, jolloin skaalaus on helpompaa!
    // TODO: Nimeäminen: Waden sisällä: SpriteBtnMyButton, SceneBtnMyButton. Mikä olisi fiksumpi?
    // TODO: Nimeäminen: Tiedostot: btnmybutton.png. Mikä olisi fiksumpi?
    // TODO: Nimeäminen: Muuttujat: spriteBtnMyButton, sceneBtnMyButton, configAnimMyAnimation, animAnimMyAnimation, argh! Mikä ois parempi?
    // TODO: Nimeämisessä mieti: Mikä on _SIMPPELEIN_ nimeäminen silti niin, ettei se ole liian simppeli? Älä tee liian vaikeaa vain vaikeuden ilosta
    // TODO: DRY! Eli kun siirrät copypaste koodin omaan funktioon, muuttujien nimillä ei enää niin väliä, koska niiden scope on niin pieni.

    Debugger.log("MAINMENU: Create and show objects, starting...", 1, 0);

    var buttonCoordTop = -50;
    var buttonCoordLeft = -150;
    var buttonCoordStep = 75;

    // Create and show background
    var spriteBgMainMenu = new Sprite('images/game/mainmenu/bgmainmenu.png');
    spriteBgMainMenu.setName('SpriteBgMainMenu');
    var sceneBgMainMenu = new SceneObject(spriteBgMainMenu);
    sceneBgMainMenu.setName('SceneBgMainMenu');
    wade.addSceneObject(sceneBgMainMenu);

    // Create buttons
    // Combat
    var namePostFix = GameMode.MODES.COMBAT.name;
    var spriteBtnCombat = new Sprite('images/game/mainmenu/btncombat.png');
    spriteBtnCombat.setName('SpriteBtn' + namePostFix);
    var sceneBtnCombat = new SceneObject(spriteBtnCombat);
    sceneBtnCombat.setName('SceneBtn' + namePostFix);
    sceneBtnCombat.setPosition(buttonCoordLeft-36, buttonCoordTop);
    sceneBtnCombat.onClick = this.handleButtonClick(namePostFix);
    wade.addSceneObject(sceneBtnCombat);
    wade.addEventListener(sceneBtnCombat, 'onClick');

    // Strategy
    var namePostFix = GameMode.MODES.STRATEGY.name;
    var spriteBtnStrategy = new Sprite('images/game/mainmenu/btnstrategy.png');
    spriteBtnStrategy.setName('SpriteBtn' + namePostFix);
    var sceneBtnStrategy = new SceneObject(spriteBtnStrategy);
    buttonCoordTop += buttonCoordStep;
    sceneBtnStrategy.setName('SceneBtn' + namePostFix);
    sceneBtnStrategy.setPosition(buttonCoordLeft, buttonCoordTop);
    sceneBtnStrategy.onClick = this.handleButtonClick(namePostFix);
    wade.addSceneObject(sceneBtnStrategy);
    wade.addEventListener(sceneBtnStrategy, 'onClick');

    // Credits
    var namePostFix = GameMode.MODES.CREDITS.name;
    var spriteBtnCredits = new Sprite('images/game/mainmenu/btncredits.png');
    spriteBtnCredits.setName('SpriteBtn' + namePostFix);
    var sceneBtnCredits = new SceneObject(spriteBtnCredits);
    buttonCoordTop += buttonCoordStep;
    sceneBtnCredits.setName('SceneBtn' + namePostFix);
    sceneBtnCredits.setPosition(buttonCoordLeft-20, buttonCoordTop);
    sceneBtnCredits.onClick = this.handleButtonClick(namePostFix);
    wade.addSceneObject(sceneBtnCredits);
    wade.addEventListener(sceneBtnCredits, 'onClick');

    Debugger.log("MAINMENU: Create and show objects, DONE", 1, 0);

    // *** READY: Go to next mode
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.RUN));
};

Mainmenu.prototype.run = function() {
    Debugger.log("Inside: Mainmenu, RUN", 1, 0);

    var debugFirstTimeEntry = true;

    // *** MAIN GAME LOOP
    wade.setMainLoopCallback(function() {
        // Empty for now...
        if (debugFirstTimeEntry === true) {
            debugFirstTimeEntry = false;
            Debugger.log('********************************************************', 1, 0);
            Debugger.log('***********  MAIN MENU: MAIN GAME LOOP  ****************', 1, 0);
            Debugger.log('********************************************************', 1, 0);
        }
    });
};

Mainmenu.prototype.unload = function() {
    Debugger.log("Inside: Mainmenu, UNLOAD", 1, 0);

    // *** UNLOAD IMAGES
    // TODO: Käytä wade.unloadAllImages() (jos se ei sotke jotain muuta), jos sotkee, sit tee nätimpi unload joka yhdellä käskyllä unloadattaa kaiken
    // TODO: Älä unloadaa imageja ennen kuin load-bugi on korjattu
    // TODO: TEE KUNNON UNLOAD-FUNKTIO, JOSSA ON SAFEGUARD!
    // TODO: Safeguardin idea: Jokainen objekti, jokainen eventhandler menee jollekin listalle
    // TODO: Unloadissa huolehditaan, että lopuksi se lista on tyhjä (tehdään tarkastus niille)
    // TODO: Unload myös huolehtii, ettei koskaan tehdä unloadia undefinedille. Siitä ei tule virhettä, mutta se tarkoittaa, että jotain on pielessä
    // TODO: Näiden avulla estetään inhottavat bugit, joissa jotain jää muistiin roikkumaan ja aiheuttaa ongelmia muualle
    /*
    wade.unloadImage('images/game/mainmenu/bgmainmenu.png');
    wade.unloadImage('images/game/mainmenu/btncombat.png');
    wade.unloadImage('images/game/mainmenu/btncredits.png');
    wade.unloadImage('images/game/mainmenu/btnstrategy.png');
    */

    // *** UNLOAD EVENT HANDLERS
    Debugger.log('MAINMENU: Unloading, starting...', 1, 0);

    wade.removeEventListener(wade.getSceneObject('SceneBtnCombat'), 'onClick');
    wade.removeEventListener(wade.getSceneObject('SceneBtnCredits'), 'onClick');
    wade.removeEventListener(wade.getSceneObject('SceneBtnStrategy'), 'onClick');

    // *** REMOVE OBJECTS
    wade.removeSceneObject('SceneBtnCombat');
    wade.removeSceneObject('SceneBtnCredits');
    wade.removeSceneObject('SceneBtnStrategy');
    wade.removeSceneObject('SceneBgMainMenu');
    Debugger.log('MAINMENU: Unloading, DONE', 1, 0);

    // Unload ready - signal that next mode can now be loaded
    var game = new Game();
    game.setReady();

};

// ** Event handler functions

// Notice: Correct way of doing non-inline event handler function is following:
// Create function, for example handleButtonClick with arguments you like, for example handleButtonClick = function(buttonName) { ... }
// Make it return another function without parameters
// This inner function inside function is the actual event handler function which is executed
// When you define event handler elsewhere, use myObj.onClick = handleButtonClick('myButtonName');
// Read why: http://www.howtocreate.co.uk/referencedvariables.html

// All buttons
Mainmenu.prototype.handleButtonClick = function(buttonName) {
    Debugger.log('Inside: Mainmenu.handleButtonClick, with: ' + buttonName, 1, 0);
    return function() {
        switch (buttonName) {
            case GameMode.MODES.CREDITS.name:
                {
                    Debugger.log('Inside: Mainmenu.handleButtonClick, CREDITS CLICKED', 1, 0);
                    var game = new Game();
                    game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.CREDITS, GameMode.STATES.LOAD));
                    break;
                }
            case GameMode.MODES.COMBAT.name:
                {
                    Debugger.log('Inside: Mainmenu.handleButtonClick, COMBAT CLICKED', 1, 0);
                    var game = new Game();
                    game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.COMBAT, GameMode.STATES.LOAD));
                    break;
                }
            case GameMode.MODES.STRATEGY.name:
                {
                    Debugger.log('Inside: Mainmenu.handleButtonClick, STRATEGY CLICKED', 1, 0);
                    var game = new Game();
                    game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.STRATEGY, GameMode.STATES.LOAD));
                    break;
                }
            default:
                {
                    Debugger.log('Error: Invalid onClick button name given: ' + buttonName, 1, 0);
                }
        }
    };
};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: Game.STATES.LOAD

// N/A


//@ sourceURL=game.js