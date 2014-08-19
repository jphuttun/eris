/**
 *
 * @constructor
 */

var Credits = function() {
    Debugger.log("Inside: Credits, Constructor", 1, 0);
};

// ** Prototypes = Jokainen instanssi perii nämä

Credits.prototype.load = function() {
    Debugger.log("Inside: Credits, LOAD", 1, 0);

    // *** IMAGES

    wade.loadImage('images/game/credits/animbadlynx.png');

    // *** READY: Go to next mode
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.CREDITS, GameMode.STATES.INIT));
};

Credits.prototype.init = function() {
    Debugger.log("Inside: Credits, INIT", 1, 0);

    Debugger.log("CREDITS: Create and show objects, starting...", 1, 0);

    // Create and show background

    // Create animation sprite
    var spriteAnimCredits = new Sprite();
    spriteAnimCredits.setName('SpriteAnimCredits');
    spriteAnimCredits.setSize(800, 600);

    // Create animation object that will be assigned to sprite
    var configAnimCredits =  {
        type: 'Animation',
        name: 'AnimationAnimCredits',
        startFrame: 0,
        endFrame: 7,
        numCells: {x: 8, y: 1},
        image: 'images/game/credits/animbadlynx.png',
        speed: 1.0,
        looping: true,
        stopped: false,
        blending: false,
        playMode: 'forward',  // 'forward', 'reverse' or 'ping-pong'
        autoResize: false,
        offset: {x: 0, y: 0},
        properties: {}
    };
    var animationAnimCredits = new Animation(configAnimCredits);

    // Assign animation to sprite
    spriteAnimCredits.addAnimation('AnimationAnimCredits', animationAnimCredits);

    // Create scene object
    var sceneAnimCredits = new SceneObject(spriteAnimCredits);
    sceneAnimCredits.setName('SceneAnimCredits');
    sceneAnimCredits.onClick = this.handleButtonClick(sceneAnimCredits.getName());
    wade.addSceneObject(sceneAnimCredits);
    wade.addEventListener(sceneAnimCredits, 'onClick');

    // Play animation
    spriteAnimCredits.playAnimation('AnimationAnimCredits');

    Debugger.log("CREDITS: Create and show objects, DONE", 1, 0);

    // *** READY: Go to next mode
    var game = new Game();
    game.enqueueGameMode(new GameMode(GameMode.MODES.CREDITS, GameMode.STATES.RUN));
};

Credits.prototype.run = function() {
    Debugger.log("Inside: Credits, RUN", 1, 0);

    var debugFirstTimeEntry = true;

    // *** MAIN GAME LOOP
    wade.setMainLoopCallback(function() {
        // Empty for now...
        if (debugFirstTimeEntry === true) {
            debugFirstTimeEntry = false;
            Debugger.log('********************************************************', 1, 0);
            Debugger.log('***********  CREDITS: MAIN GAME LOOP  ******************', 1, 0);
            Debugger.log('********************************************************', 1, 0);
        }

    });
};

Credits.prototype.unload = function() {
    Debugger.log("Inside: Credits, UNLOAD", 1, 0);

    // TODO: Tarvitseeko objektille tehdä ensin removeEventListener jos se tuhotaan kokonaan? Testaa onko alla oleva turhaa!
    // TODO: Laita jokainen luotu objekti johonkin arrayhyn, jotta ne on helppo poistaa kerralla
    // TODO: Tee automaattinen unload, tyyliin: for sceneobj in <allSceneObjects> myRemover(sceneobj)
    // TODO: myRemover(sceneobj) sit katsoo if (sceneobj.isListener)... ja poistaa eventit jos niitä on

    // *** IMAGES
    // TODO: Odottaa load-bugin ratkaisua

    // *** UNLOAD EVENT HANDLERS

    Debugger.log('### Anim: ' + wade.getSceneObject('SceneAnimCredits'), 1, 0);
    Debugger.log('### Event listener: ' + wade.isEventListener(wade.getSceneObject('SceneAnimCredits'), 'onClick'), 1, 0);

    wade.removeEventListener(wade.getSceneObject('SceneAnimCredits'), 'onClick');

    Debugger.log('###2 Anim: ' + wade.getSceneObject('SceneAnimCredits'), 1, 0);
    Debugger.log('###2 Event listener: ' + wade.isEventListener(wade.getSceneObject('SceneAnimCredits'), 'onClick'), 1, 0);

    // *** REMOVE OBJECTS
    wade.removeSceneObject('SceneAnimCredits');

    Debugger.log('###3 Anim: ' + wade.getSceneObject('SceneAnimCredits'), 1, 0);
    Debugger.log('###3 Event listener: ' + wade.isEventListener(wade.getSceneObject('SceneAnimCredits'), 'onClick'), 1, 0);

    // Unload ready - signal that next mode can now be loaded
    var game = new Game();
    game.setReady();

};

// ** Event handler functions

Credits.prototype.handleButtonClick = function(buttonName) {
    Debugger.log("Inside: Credits.handleButtonClick, with: " + buttonName, 1, 0);
    return function() {
        Debugger.log('Inside: Mainmenu.handleButtonClick, ANIMATION CLICKED', 1, 0);
        // Return to main menu
        var game = new Game();
        game.enqueueGameModeAndUnloadCurrent(new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.LOAD));
    };
};

// ** Non-prototypes = Nämä ovat vain luokalla, eivät niiden instansseilla. Pääsy esim.: Game.STATES.LOAD

// N/A


//@ sourceURL=game.js