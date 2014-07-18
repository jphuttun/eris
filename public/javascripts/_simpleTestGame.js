App = function()
{
    // List of TODOs
    // - Instead of loading every object from JSON with mapDataJson.data.something, 
    //   create meaningful objects and JSON-loader which loads json to them
    //   This way we can get rid of numTiles-global variable

    // Global variables
    // TODO: Ota mallia polyst‰, miten globaalit muuttujat v‰ltet‰‰n
    var numTiles = {"x" : "0", "z" : "0"} // Default numTiles, will be overridden by JSON

    // Objects
	var debugType = 0; // 0 = Console logging
	var isDebugging = 1; // 0 = false, 1 = true
	
    var witch, derrin, speechBubble, hero = 1;
	var charsHandler;
	var chars = []; // Player, allied and enemy characters
	var playData = []; // Playerdata
	var playData1; // Helper variable for playData
	
	var userInt; // User Interface class
	
	var self = this;
	
    // Json files
    var mapDataJson = {};

    this.load = function()
    {
        // *** IMAGES

        wade.setBasePath('/');

        wade.setLoadingImages('images/game/loading.png');

       // Load JSON
        wade.loadJson('json/erismap1.json', mapDataJson);

        // load images
        wade.loadImage('images/game/grass0.png');
        wade.loadImage('images/game/sand0.png');
        wade.loadImage('images/game/grass0_allSides.png');
/*
        wade.loadImage('../images/game/daisies0.png');
        wade.loadImage('../images/game/daisies1.png');
        wade.loadImage('../images/game/daisies2.png');
        wade.loadImage('../images/game/daisies3.png');
        wade.loadImage('../images/game/plant.png');
        wade.loadImage('../images/game/cauldron.png');
        wade.loadImage('../images/game/flower.png');
        wade.loadImage('../images/game/smoke.png');
        wade.loadImage('../images/game/house.png');
        wade.loadImage('../images/game/callout.png');
        wade.loadImage('../images/game/witch_Crouch_iso_ne.png');
        wade.loadImage('../images/game/beach.png');
        wade.loadImage('../images/game/beach_corner.png');
        wade.loadImage('../images/game/cursor.png');
        wade.loadImage('../images/game/sparkle.png');

        wade.loadImage('../images/game/fullIcon.jpg'); // Loading UI images
        wade.loadImage('../images/game/emptyIcon.jpg'); // Loading UI images
*/
		
    };

    this.init = function()
    {
        // ** Initialize combat
        wade.app.startCombat();
				
        // ** Create level
    
        // fill the terrain with grass
        var tileData = {texture: 'images/game/grass0.png'};
        for (var i=0; i < numTiles.x; i++)
        {
            //if (i!=1) {
				for (var j=0; j < numTiles.z; j++)
				{
					wade.iso.setTile(i, j, tileData);
				}
			//}
        }

        // add a bit of sand
        wade.iso.setTile(2, 3, {texture: 'images/game/sand0.png'});
        wade.iso.setTransition(2, 3, {texture: 'images/game/grass0_allSides.png'});

        // set initial camera position
        var pos = wade.iso.getWorldCoordinates(13, 16);
        pos.z = 1;
        wade.setCameraPosition(pos);

        // define what we want to do for every frame
        wade.setMainLoopCallback(function()
        {
            // move the speech bubble so it's always in the same position relative to the witch
            /*
            var pos = wade.getSceneObject('chars'+hero).getPosition();
            pos.y -= 90;
            pos.x -= 20;
            pos = wade.worldPositionToScreen(wade.iso.getObjectsLayerId(), pos);
            pos.y -= 120;
            pos.x -= 60;
//            speechBubble.setPosition(pos);
*/
        }, 'myMainLoop');
    };

    this.onMouseDown = function(eventData)
    {
        // store coordinates when the mouse button is pressed (or when the screen is touched)
        this.mouseDownPosition = eventData.screenPosition;
        this.clickCameraPosition = wade.getCameraPosition();
    };

    // pan
    this.onMouseMove = function(eventData)
    {
        if (wade.isMouseDown())
        {
            // see how much we've moved since the onMouseDown event
            var dx = this.mouseDownPosition.x - eventData.screenPosition.x;
            var dy = this.mouseDownPosition.y - eventData.screenPosition.y;

            // update camera position
            var cameraPos = {x: this.clickCameraPosition.x + dx,
                y: this.clickCameraPosition.y + dy,
                z: this.clickCameraPosition.z};
            wade.setCameraPosition(cameraPos);
        }
    };

    // zoom
    this.onMouseWheel = function(eventData)
    {
        var cameraPos = wade.getCameraPosition();
        cameraPos.z = Math.max(0.4, cameraPos.z - eventData.value * 0.05);
        wade.setCameraPosition(cameraPos);
    };


    // TODO: Move to own file, however it requires creation of object of "game" which holds global information
    this.startCombat = function() {

        console.log('Start game... starting');

        // Debug: Log JSON
        console.log('JSON');
        console.log(mapDataJson);
        
        // Read numTiles from JSON and set it to global variable
        numTiles = mapDataJson.data.world.numTiles;

        // Initialize wade isometric
        wade.iso.init({numTiles: numTiles, movementDirection: 'both'});
        wade.setClickTolerance(15);

        // Test paths
        var basePath = wade.getBasePath();
        console.log('Base path' + basePath);



        console.log('Start game... done!');
    };

};

//@ sourceURL=erisgame.js
