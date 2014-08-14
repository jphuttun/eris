App = function()
{

    /***
    Idea, miten tulen hoitamaan monta statea
    erisgame.js:ssä on kaksi funktiota
    this.load: Ladataan _vain_ sellaiset perusjutut, joita tarvitaan koko gameen (en tiedä onko näitä yhtään)
    this.init: 
        - Määritellään globaalit waden asetukset
        - Luodaan game-objekti, joka sisältää pelin tilan (tai v2.0:ssa siellä on pelitilastack, jonne pushataan ja popataan uusin tila)
        - Moodin lisäksi on tiedossa status, esim. mainmenu.load.notready/running/ready
        - Kun on valmista, käynnistetään eka state
            - mainmenu.load()
            - mainmenu.init()
        - Huom: En tiedä voiko tuon vain heittää koodiin vai pitääkö rakentaa tänne main event loopiin tilakone, joka kokoajan tarkastelee koko pelin statea
        - Tyyliin heti kun state muuttuu, niin suoritetaan oldstate.remove() ja sit newstate.load() ja newstate.init()

    Jokainen "pelin state" noudattaa sisällöltään samaa ideologiaa ja toteuttaa nämä funktiot
    - load: Lataa tarvittavat resurssit
    - init: Asettaa perusteet kuntoon, käynnistää run-funktion
    - run: funktio, jossa on koko pelin logiikka. Täällä on myös main loopit
    - unload: poistaa muistista kaiken, kutsutaan silloin kun state muuttuu ja halutaan unohtaa kaikki
    
    ***/

    var self = this;

    this.load = function()
    {
        // Load everything that is needed for whole game
        // Everything related to one game mode should be loaded in mode file

        wade.setBasePath('/');

        wade.setLoadingImages('images/game/loading.png');

        // *** REQUIRED SCRIPTS
                
        // FROM JS
        wade.loadScript('js_dev/debugger.js');

        // FROM JS_DEV
        wade.loadScript('js_dev/game.js');
        wade.loadScript('js_dev/gameMode.js');
        wade.loadScript('js_dev/mainmenu.js');
        wade.loadScript('js_dev/combat.js');
        wade.loadScript('js_dev/strategy.js');

    };

    this.init = function()
    {
        // *** INIT GAME START ***

        Debugger.log('Initializing game: BEGIN', 1, 0);

        // Create game and mode objects
        Debugger.log('Initializing game - Create objects: BEGIN', 1, 0);

        // Create Game singleton
        var game = new Game();

        Debugger.log('Initializing game - Create objects: DONE', 1, 0);

        // *** INIT GAME END ***

        // *** GAME LOOP START ***

        Debugger.log('Initializing game - Create main game loop: BEGIN', 1, 0);
        // Main game loop, handles everything about game states
        // TODO: Use JSObserver-pattern which automatically knows if observer object changes
        wade.setMainLoopCallback(function()
        {
            // Main loop
            if (game.isDirty()) {

                Debugger.log('Main game loop: Executing game mode change with current stack \n' + game.toStr(), 1, 0);

                // Move to next game mode and return object with new game mode information
                game.moveToNextGameMode();
                var nextMode = game.getCurrentGameMode();

                Debugger.log('Main game loop: Next game mode will be: ' + nextMode.toStr(), 1, 0);

                // Execute new mode and/or state

                // TODO: Instead of if-block do something nicer
                var gameModeSource;

                switch (nextMode.mode) {
                    case GameMode.MODES.MAINMENU:
                        {
                            gameModeSource = new Mainmenu();
                            break;
                        }
                    case GameMode.MODES.COMBAT:
                        {
                            gameModeSource = new Combat();
                            break;
                        }
                    case GameMode.MODES.STRATEGY:
                        {
                            gameModeSource = new Strategy();
                            break;
                        }
                    default:
                        {
                            Debugger.log('Error: Invalid game mode given: ' + nextMode.mode.name, 1, 0);
                        }
                }

                switch (nextMode.state) {
                    case GameMode.STATES.LOAD:
                        {
                            gameModeSource.load();
                            break;
                        }
                    case GameMode.STATES.INIT:
                        {
                            gameModeSource.init();
                            break;
                        }
                    case GameMode.STATES.RUN:
                        {
                            gameModeSource.run();
                            break;
                        }
                    case GameMode.STATES.UNLOAD:
                        {
                            gameModeSource.unload();
                            break;
                        }
                    default:
                        {
                            Debugger.log('Error: Invalid game state given: ' + nextMode.state.name, 1, 0);
                        }
                }

            }
        }, 'mainGameLoop');
        Debugger.log('Initializing game - Create main game loop: DONE', 1, 0);

        Debugger.log('Start game: BEGIN', 1, 0);

        // Start in main menu mode
        var initialGameMode = new GameMode(GameMode.MODES.MAINMENU, GameMode.STATES.LOAD);
        game.enqueueGameMode(initialGameMode);

        Debugger.log('Start game: DONE. Started in Main Menu -mode', 1, 0);

    };


};

//@ sourceURL=erisgame.js
