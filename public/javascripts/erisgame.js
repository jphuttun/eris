App = function()
{
    // List of TODOs
    // - Instead of loading every object from JSON with mapDataJson.data.something, 
    //   create meaningful objects and JSON-loader which loads json to them
    //   This way we can get rid of numTiles-global variable

    // Global variables
    // TODO: Ota mallia polyst�, miten globaalit muuttujat v�ltet��n
    var numTiles = {"x" : "0", "z" : "0"} // Default numTiles, will be overridden by JSON

    // Objects
	var debugType = 0; // 0 = Console logging
	var isDebugging = 1; // 0 = false, 1 = true
	
    var witch, derrin, speechBubble, hero = 1;
	var charsHandler;
	var chars = []; // Player, allied and enemy characters
	var playData; // Playerdata
	var playData1;

    // Json files
    var mapDataJson = {};

    this.load = function()
    {
        // *** REQUIRED SCRIPTS
				
        // Loading debug interface
		wade.preloadScript('debugger.js');
		// Decide will actions ("messages") send to local script or remote server
		wade.preloadScript('communicationLayer.js');
		// Includes all actions that are loaded during init and characters can execute
		wade.preloadScript('charsActions.js');
		// Includes player characters and their resources (like picture loaders, sound loader etc.)
		wade.preloadScript('playerChars.js');
		
        // *** JSON

        // Load JSON
        wade.preloadJson('../json/erismap1.json', mapDataJson);

        // *** IMAGES

        wade.setLoadingImages('../images/game/loading.png');

        // load images
        wade.loadImage('../images/game/grass0.png');
        wade.loadImage('../images/game/sand0.png');
        wade.loadImage('../images/game/grass0_allSides.png');
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

        // load isometric animations for all directions
        var directions = ['n','s','w','e','ne','nw','se','sw'];
        for (var i=0; i < directions.length; i++)
        {
            wade.loadImage('../images/game/witch_Idle_iso_' + directions[i] + '.png');
            wade.loadImage('../images/game/witch_Walk_iso_' + directions[i] + '.png');
        }
		
        for (var i=0; i < directions.length; i++)
        {
            wade.loadImage('../images/game/derrin_Idle_iso_' + directions[i] + '.png');
            wade.loadImage('../images/game/derrin_Walk_iso_' + directions[i] + '.png');
        }
    };

    this.init = function()
    {
        // ** Initialize combat
        wade.app.startCombat();
		
		charsHandler = new charsActions();
		playData = new playerChars('derrin', isDebugging, debugType);
		playData1 = new playerChars('witch', isDebugging, debugType);
		
        // ** Create level
    
        // fill the terrain with grass
        var tileData = {texture: '../images/game/grass0.png'};
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
        wade.iso.setTile(2, 3, {texture: '../images/game/sand0.png'});
        wade.iso.setTransition(2, 3, {texture: '../images/game/grass0_allSides.png'});

        // set transitions around the edges
        for (i=1; i < numTiles.x-1; i++)
        {
            wade.iso.setTransition(i, numTiles.z-1, {texture: '../images/game/beach.png'});
        }
        for (i=1; i < numTiles.z-1; i++)
        {
            wade.iso.setTransition(numTiles.x-1, i, {texture: '../images/game/beach.png', rotation: 1});
        }
        for (i=1; i < numTiles.x-1; i++)
        {
            wade.iso.setTransition(i, 0, {texture: '../images/game/beach.png', rotation: 2});
        }
        for (i=1; i < numTiles.z-1; i++)
        {
            wade.iso.setTransition(0, i, {texture: '../images/game/beach.png', rotation: 3});
        }

        // transitions for the corners
        wade.iso.setTransition(numTiles.x-1, numTiles.z-1, {texture: '../images/game/beach_corner.png'});
        wade.iso.setTransition(numTiles.x-1, 0, {texture: '../images/game/beach_corner.png', rotation: 1});
        wade.iso.setTransition(0, 0, {texture: '../images/game/beach_corner.png', rotation: 2});
        wade.iso.setTransition(0, numTiles.z-1, {texture: '../images/game/beach_corner.png', rotation: 3});

        // add daisies
        var numCellsPerTile = wade.iso.getNumCellsPerTile();
        for (i=0; i < 50; i++)
        {
            var x = Math.floor(Math.random() * (numTiles.x - 2) * numCellsPerTile) + numCellsPerTile;
            var z = Math.floor(Math.random() * (numTiles.z - 2) * numCellsPerTile) + numCellsPerTile;
            var detailData = {texture: '../images/game/daisies' + Math.floor(Math.random() * 4) + '.png'};
            if (wade.iso.getTileTextureAtCell(x, z) == '../images/game/grass0.png')
            {
                wade.iso.setDetail(x, z, detailData);
            }
        }

        // create some plants
        var plantData = {sprites: {image: '../images/game/plant.png', scale: 0.4, offset: {y: 0.22}}, collisionMap: [{x: 0, z: 0}]};
        var plantPositions = [{x: 5, z: 5}, {x: 4, z: 9}, {x: 7, z: 4}, {x: 13, z: 6}, {x: 17, z: 13}, {x: 4, z: 16}, {x: 9, z: 17}];
        for (i=0; i < plantPositions.length; i++)
        {
            wade.iso.createObject(plantData, plantPositions[i]);
        }

        // Create cauldrons

        var cauldronDataJson = mapDataJson.data.objects.cauldron;
        var cauldron = mapDataJson.data.map.objects.cauldron[0]
        var cauldron2 = mapDataJson.data.map.objects.cauldron[1]

        wade.iso.createObject(cauldronDataJson, cauldron.position, {"name": cauldron.name});
        wade.iso.createObject(cauldronDataJson, cauldron2.position, {"name": cauldron2.name});

        //derrin = wade.iso.createObject(derrinData, {x: 13, z: 11}, {name: 'derrin'}).getBehavior();
        chars.push(wade.iso.createObject(playData.getWadeResourceData(), {x: 13, z: 11}, {name: 'chars0'}).getBehavior()); // Derrin
		chars[chars.length-1].canMove = true;

        chars.push(wade.iso.createObject(playData1.getWadeResourceData(), {x: 13, z: 18}, {name: 'chars1'}).getBehavior());
		chars[chars.length-1].canMove = true;
		
        // create some flowers
        var flowerData = {sprites: {image: '../images/game/flower.png', scale: 0.4, offset: {y: 0.4}}, interactionOffset: {x: -1, z: 0}};
        var flowerPositions = [{x: 5, z: 3}, {x: 8, z: 9}, {x: 12, z: 6}, {x: 16, z: 14}, {x: 5, z: 11}];
        for (i=0; i < flowerPositions.length; i++)
        {
            var flower = wade.iso.createObject(flowerData, flowerPositions[i], {isFlower: true});
            flower.onClick = function()
            {
                charsHandler.walkToObject(chars[hero],this);
                return true;
            };
            wade.addEventListener(flower, 'onClick');
        }
        var numFlowersLeft = flowerPositions.length;

        // create some smoke
        var smokeDataJson = mapDataJson.data.objects.smoke;
        var smoke1 = mapDataJson.data.map.objects.smoke[0];
        wade.iso.createObject(smokeDataJson, smoke1.position);

		
        //witch = wade.iso.createObject(witchData, {x: 14, z: 18}, {name: 'witch'}).getBehavior();
		
            var flower = wade.iso.createObject(flowerData, flowerPositions[i], {isFlower: true});
            // What will happen, if object is clicked
			flower.onClick = function()
            {
				// If flower is clicked, then our selected hero character walk to object
				charsHandler.walkToObject(chars[hero],this);
                return true;
            };
            wade.addEventListener(flower, 'onClick');		
		
		// Attaching talk function
        chars[hero].talk = function(text, time)
        {
            speechBubble=charsHandler.talk(chars[hero],speechBubble,text,time);
        };		
		
        // create a speech bubble
        speechBubble = new SceneObject(new Sprite('../images/game/callout.png', 3));
        speechBubble.addSprite(new TextSprite('', '16px Verdana', 'black', 'left', 3), {x: -100, y: -30});
        wade.setLayerTransform(3, 0, 0);

        // do something upon reaching an object
        chars[hero].owner.onObjectReached = function(eventData)
        {
            // Mainly picking flowers, but there is also event when reached cauldron
			numFlowersLeft=charsHandler.reachObjectOccurEvents(chars[hero], eventData, numFlowersLeft);

        };

        // What to do when the witch is finished playing an animation
        chars[hero].owner.onAnimationEnd = function(eventData)
        {
			
			charsHandler.afterAnimation(chars[hero], speechBubble, numFlowersLeft, eventData);

        };

        // set initial camera position
        var pos = wade.iso.getWorldCoordinates(13, 16);
        pos.z = 1;
        wade.setCameraPosition(pos);

        // start moving after 500 milliseconds
        setTimeout(function()
        {
            chars[hero].goToObject('cauldron');
        }, 500);

        // define what we want to do for every frame
        wade.setMainLoopCallback(function()
        {
            // move the speech bubble so it's always in the same position relative to the witch
            var pos = wade.getSceneObject('chars'+hero).getPosition();
            pos.y -= 90;
            pos.x -= 20;
            pos = wade.worldPositionToScreen(wade.iso.getObjectsLayerId(), pos);
            pos.y -= 120;
            pos.x -= 60;
            speechBubble.setPosition(pos);
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

    // move the witch
    this.onClick = function(eventData)
    {
		var coordsAreSet = false;
		var worldCoords = wade.screenPositionToWorld(wade.iso.getTerrainLayerId(), eventData.screenPosition);
        var cellCoords = wade.iso.getCellCoordinates(worldCoords.x, worldCoords.y);
	
		
		// Activation of selected character
		var charPosition;
		var charCellCoords;
		for (var i=0; i<chars.length; i=i+1) {
			charPosition = wade.getSceneObject('chars'+i).getPosition();
			charCellCoords = wade.iso.getCellCoordinates(charPosition.x, charPosition.y);	
			if (charCellCoords.x == cellCoords.x && charCellCoords.z == cellCoords.z) {
				hero=i;
			} 			
		}
		
		// Moving selected character
		if (hero >= 0) 
		{
			if (chars[hero].canMove)
			{
				var worldCoords = wade.screenPositionToWorld(wade.iso.getTerrainLayerId(), eventData.screenPosition);
				var cellCoords = wade.iso.getCellCoordinates(worldCoords.x, worldCoords.y);
				var numCells = wade.iso.getNumCells();
				if (cellCoords.x >= 2 && cellCoords.z >= 2 && cellCoords.x < numCells.x - 2 && cellCoords.z < numCells.z - 2)
				{
					//if (derrin.setDestination(cellCoords))
					if (chars[hero].setDestination(cellCoords))
					{
						coordsAreSet=true;
					}
				}
			}
		}
		
		// if reasonable cell is Clicked, then showing particle effect cursor animation
		if (coordsAreSet==true)
		{
			// show a particle effect - CURSOR CLICK ANIMATION
			var sprite = new Sprite(null, wade.iso.getObjectsLayerId());
			var animation = new Animation('../images/game/cursor.png', 4, 4, 30);
			sprite.addAnimation('cursor', animation);
			sprite.setSize(100, 50);
			var cursor = new SceneObject(sprite, 0, worldCoords.x, worldCoords.y);
			wade.addSceneObject(cursor);
			sprite.pushToBack();
			cursor.playAnimation('cursor');
			cursor.onAnimationEnd = function()
			{
				wade.removeSceneObject(cursor);
			};
		}
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

        console.log('Start game... done!');
    };

};

//@ sourceURL=erisgame.js
