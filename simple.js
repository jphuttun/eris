    App = function()
    {
   
        this.init = function()
        {
            // create a text object
            var textSprite = new TextSprite("ASS POO HJS", '22px Arial', 'blue', 'center');
            textSprite.setMaxWidth(300);
            var textObject = new SceneObject(textSprite);
			//textObject.setSpriteOffset(1, {x:-300, y: -300});
            wade.addSceneObject(textObject);
			textObject.moveTo(-200, -200, 100);
        }
    };