App = function()
{
    var witch, speechBubble;

    this.load = function()
    {
        wade.setLoadingImages('images/loading.png');

        // load images
        wade.loadImage('images/grass0.png');
        wade.loadImage('images/sand0.png');
        wade.loadImage('images/grass0_allSides.png');
        wade.loadImage('images/daisies0.png');
        wade.loadImage('images/daisies1.png');
        wade.loadImage('images/daisies2.png');
        wade.loadImage('images/daisies3.png');
        wade.loadImage('images/plant.png');
        wade.loadImage('images/cauldron.png');
        wade.loadImage('images/flower.png');
        wade.loadImage('images/smoke.png');
        wade.loadImage('images/house.png');
        wade.loadImage('images/callout.png');
        wade.loadImage('images/witch_Crouch_iso_ne.png');
        wade.loadImage('images/beach.png');
        wade.loadImage('images/beach_corner.png');
        wade.loadImage('images/cursor.png');
        wade.loadImage('images/sparkle.png');

        // load isometric animations for all directions
        var directions = ['n','s','w','e','ne','nw','se','sw'];
        for (var i=0; i < directions.length; i++)
        {
            wade.loadImage('images/witch_Idle_iso_' + directions[i] + '.png');
            wade.loadImage('images/witch_Walk_iso_' + directions[i] + '.png');
        }
    };

    this.init = function()
    {
        // initialize the isometric plugin
        var numTiles = {x: 6, z: 6};
        wade.iso.init({numTiles: numTiles, movementDirection: 'both'});
        wade.setClickTolerance(15);

        // fill the terrain with grass
        var tileData = {texture: 'images/grass0.png'};
        for (var i=0; i < numTiles.x; i++)
        {
            for (var j=0; j < numTiles.z; j++)
            {
                wade.iso.setTile(i, j, tileData);
            }
        }

        // add a bit of sand
        wade.iso.setTile(2, 3, {texture: 'images/sand0.png'});
        wade.iso.setTransition(2, 3, {texture: 'images/grass0_allSides.png'});

        // set transitions around the edges
        for (i=1; i < numTiles.x-1; i++)
        {
            wade.iso.setTransition(i, numTiles.z-1, {texture: 'images/beach.png'});
        }
        for (i=1; i < numTiles.z-1; i++)
        {
            wade.iso.setTransition(numTiles.x-1, i, {texture: 'images/beach.png', rotation: 1});
        }
        for (i=1; i < numTiles.x-1; i++)
        {
            wade.iso.setTransition(i, 0, {texture: 'images/beach.png', rotation: 2});
        }
        for (i=1; i < numTiles.z-1; i++)
        {
            wade.iso.setTransition(0, i, {texture: 'images/beach.png', rotation: 3});
        }

        // transitions for the corners
        wade.iso.setTransition(numTiles.x-1, numTiles.z-1, {texture: 'images/beach_corner.png'});
        wade.iso.setTransition(numTiles.x-1, 0, {texture: 'images/beach_corner.png', rotation: 1});
        wade.iso.setTransition(0, 0, {texture: 'images/beach_corner.png', rotation: 2});
        wade.iso.setTransition(0, numTiles.z-1, {texture: 'images/beach_corner.png', rotation: 3});

        // add daisies
        var numCellsPerTile = wade.iso.getNumCellsPerTile();
        for (i=0; i < 50; i++)
        {
            var x = Math.floor(Math.random() * (numTiles.x - 2) * numCellsPerTile) + numCellsPerTile;
            var z = Math.floor(Math.random() * (numTiles.z - 2) * numCellsPerTile) + numCellsPerTile;
            var detailData = {texture: 'images/daisies' + Math.floor(Math.random() * 4) + '.png'};
            if (wade.iso.getTileTextureAtCell(x, z) == 'images/grass0.png')
            {
                wade.iso.setDetail(x, z, detailData);
            }
        }

        // create some plants
        var plantData = {sprites: {image: 'images/plant.png', scale: 0.4, offset: {y: 0.22}}, collisionMap: [{x: 0, z: 0}]};
        var plantPositions = [{x: 5, z: 5}, {x: 4, z: 9}, {x: 7, z: 4}, {x: 13, z: 6}, {x: 17, z: 13}, {x: 4, z: 16}, {x: 9, z: 17}];
        for (i=0; i < plantPositions.length; i++)
        {
            wade.iso.createObject(plantData, plantPositions[i]);
        }

        // create a cauldron
        var cauldronData = {sprites: {image: 'images/cauldron.png', scale: 0.4, offset: {y: 0.3}}, collisionMap: [{x: 0, z: 0}]};
        wade.iso.createObject(cauldronData, {x: 10, z: 13}, {name: 'cauldron'});

        // create some flowers
        var flowerData = {sprites: {image: 'images/flower.png', scale: 0.4, offset: {y: 0.4}}, interactionOffset: {x: -1, z: 0}};
        var flowerPositions = [{x: 5, z: 3}, {x: 8, z: 9}, {x: 12, z: 6}, {x: 16, z: 14}, {x: 5, z: 11}];
        for (i=0; i < flowerPositions.length; i++)
        {
            var flower = wade.iso.createObject(flowerData, flowerPositions[i], {isFlower: true});
            flower.onClick = function()
            {
                if (witch.canMove)
                {
                    witch.goToObject(this);
                }
                return true;
            };
            wade.addEventListener(flower, 'onClick');
        }
        var numFlowersLeft = flowerPositions.length;

        // create some smoke
        var smokeData =
        {
            sprites:
            {
                size: {x: 90, y: 120},
                offset: {y: 0.3},
                sortPoint: {y: 1},
                animations:
                {
                    image: 'images/smoke.png',
                    numCells: {x: 8, y: 4},
                    looping: true,
                    speed: 10
                }
            }
        };
        wade.iso.createObject(smokeData, {x:11, z: 14});

        // create a house
        var houseData =
        {
            sprites:
            {
                image: 'images/house.png',
                scale: 0.8,
                offset: {x: 0.01, y: 0.05},
                sortPoint: {y: 0.27}
            },
            gridSize: {x: 5, z: 5},
            collisionSize: {x: 5, z: 5}
        };
        wade.iso.createObject(houseData, {x:14, z: 15});

        // create a witch
        var witchData =
        {
            sprites:
            {
                scale: 0.57,
                offset: {y: 0.05},
                animations:
                [
                    { name: 'Idle_iso_s',   image: 'images/witch_Idle_iso_s.png',   autoResize: true },
                    { name: 'Idle_iso_e',   image: 'images/witch_Idle_iso_e.png',   autoResize: true },
                    { name: 'Idle_iso_n',   image: 'images/witch_Idle_iso_n.png',   autoResize: true },
                    { name: 'Idle_iso_w',   image: 'images/witch_Idle_iso_w.png',   autoResize: true },
                    { name: 'Idle_iso_se',  image: 'images/witch_Idle_iso_se.png',  autoResize: true },
                    { name: 'Idle_iso_sw',  image: 'images/witch_Idle_iso_sw.png',  autoResize: true },
                    { name: 'Idle_iso_ne',  image: 'images/witch_Idle_iso_ne.png',  autoResize: true },
                    { name: 'Idle_iso_nw',  image: 'images/witch_Idle_iso_nw.png',  autoResize: true },
                    { name: 'Walk_iso_e',   image: 'images/witch_Walk_iso_e.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
                    { name: 'Walk_iso_n',   image: 'images/witch_Walk_iso_n.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_w',   image: 'images/witch_Walk_iso_w.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
                    { name: 'Walk_iso_s',   image: 'images/witch_Walk_iso_s.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_se',  image: 'images/witch_Walk_iso_se.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_sw',  image: 'images/witch_Walk_iso_sw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_ne',  image: 'images/witch_Walk_iso_ne.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_nw',  image: 'images/witch_Walk_iso_nw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Crouch_iso_ne',image: 'images/witch_Crouch_iso_ne.png',autoResize: true,   numCells: {x: 3, y: 3} }
                ]
            },
            behaviors: IsoCharacter,
            collisionMap: [{x: 0, z: 0}]
        };
        witch = wade.iso.createObject(witchData, {x: 13, z: 18}, {name: 'witch'}).getBehavior();

        // add a talk function to our witch
        witch.talk = function(text, time)
        {
            // if we're talking already, cancel the talk timeout
            if (witch.talkTimeout)
            {
                clearTimeout(witch.talkTimeout);
            }

            // set text
            speechBubble.getSprite(1).setText(text);

            // add bubble to the scene
            if (!speechBubble.isInScene())
            {
                wade.addSceneObject(speechBubble);
            }

            // set a timeout to hide the bubble
            witch.talkTimeout = setTimeout(function()
            {
                wade.removeSceneObject(speechBubble);
                witch.talkTimeout = 0;
            }, time);
        };

        // create a speech bubble
        speechBubble = new SceneObject(new Sprite('images/callout.png', 3));
        speechBubble.addSprite(new TextSprite('', '16px Verdana', 'black', 'left', 3), {x: -100, y: -30});
        wade.setLayerTransform(3, 0, 0);

        // do something upon reaching an object
        witch.owner.onObjectReached = function(eventData)
        {
            if (eventData.object.getName() == 'cauldron')
            {
                // Tässä kohdassa ladataan tietoa serveriltä ja lähetetään tietoa serverille (esim. peliobjective saavutettu ja sitä
				// vastaavat tiedot ladataan serveriltä, samalla kun lähetetään serverille tiedot kentän edistymisestä tiettyyn pisteeseen)
				
				// Serveri voisi palauttaa esim. alta löytyvän JSON tiedoston
				
				//   {
				//		"testString" : "We reach the object! Should we continue attack or secure this location?",
				//		"testScore" : 42
				//	}
				
				this.serverResponse = {};
				var dataToSend = "ReachObject¤cauldron";
				var url = 'http://www.example.com/doSomething.php?';
				url = url + encodeURIComponent(dataToSend);
				wade.preloadJson(url, this.serverResponse, 0, 1);
				
				var puhuFraasi = this.serverResponse.data.testString;
				
				witch.talk('I need to find 5 Marigold\nFlowers for my potion.\nWill you help me?#'+puhuFraasi, 4000);
                witch.canMove = true;
            }
            if (eventData.object.isFlower)
            {
                witch.owner.playAnimation('Crouch_iso_ne', 'ping-pong');
                witch.canMove = false;

                // show a particle effect
                var sprite = new Sprite(null, wade.iso.getObjectsLayerId());
                var animation = new Animation('images/sparkle.png', 8, 4, 30);
                sprite.addAnimation('sparkle', animation);
                sprite.setSize(100, 100);
                var pos = eventData.object.getPosition();
                var sparkle = new SceneObject(sprite, 0, pos.x, pos.y);
                wade.addSceneObject(sparkle);
                sparkle.playAnimation('sparkle');
                sparkle.onAnimationEnd = function()
                {
                    wade.removeSceneObject(sparkle);
                };

                setTimeout(function()
                {
                    wade.iso.deleteObject(eventData.object);
                    numFlowersLeft--;
                }, 300);
            }
        };

        // What to do when the witch is finished playing an animation
        witch.owner.onAnimationEnd = function(eventData)
        {
            if (eventData.name == 'Crouch_iso_ne')
            {
                // face south
                witch.setDirection('s');

                // if the bubble isn't near the center of the screen, move the camera
                var text = (numFlowersLeft? 'Excellent! Only ' + numFlowersLeft + '\nmore to go!' : "Great job!\nThat's all of them.\nThanks so much!");
                if (numFlowersLeft == 4)
                {
                    text = 'You can pan and zoom\naround the map';
                }
                var pos = speechBubble.getPosition();
                var screenWidth = wade.getScreenWidth();
                var screenHeight = wade.getScreenHeight();
                if (Math.abs(pos.x) - screenWidth / 2 < screenWidth / 4 || Math.abs(pos.y) - screenHeight / 2 < screenHeight / 4)
                {
                    pos = wade.screenPositionToWorld(wade.iso.getObjectsLayerId(), pos);
                    pos.z = wade.getCameraPosition().z;
                    wade.moveCamera(pos, 300);
                    wade.app.onCameraMoveComplete = function()
                    {
                        // say something
                        witch.talk(text, 3000);
                        // feel free to move again
                        witch.canMove = true;
                    };
                }
                else
                {
                    // say something
                    witch.talk(text, 3000);
                    // feel free to move again
                    witch.canMove = true;
                }
            }
        };

        // set initial camera position
        var pos = wade.iso.getWorldCoordinates(13, 16);
        pos.z = 1;
        wade.setCameraPosition(pos);

        // start moving after 500 milliseconds
        setTimeout(function()
        {
            witch.goToObject('cauldron');
        }, 500);

        // define what we want to do for every frame
        wade.setMainLoopCallback(function()
        {
            // move the speech bubble so it's always in the same position relative to the witch
            var pos = wade.getSceneObject('witch').getPosition();
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
        if (witch.canMove)
        {
            var worldCoords = wade.screenPositionToWorld(wade.iso.getTerrainLayerId(), eventData.screenPosition);
            var cellCoords = wade.iso.getCellCoordinates(worldCoords.x, worldCoords.y);
            var numCells = wade.iso.getNumCells();
            if (cellCoords.x >= 2 && cellCoords.z >= 2 && cellCoords.x < numCells.x - 2 && cellCoords.z < numCells.z - 2)
            {
                if (witch.setDestination(cellCoords))
                {
                    // show a particle effect
                    var sprite = new Sprite(null, wade.iso.getObjectsLayerId());
                    var animation = new Animation('images/cursor.png', 4, 4, 30);
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
            }
        }
    };

};

//@ sourceURL=iso.js