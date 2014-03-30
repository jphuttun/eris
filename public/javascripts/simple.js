    App = function()
    {
   
        this.init = function()
        {
            // create a text object
            var textSprite = new TextSprite("ASS POO HJS", '22px Arial', 'blue', 'center');
            textSprite.setMaxWidth(400);
            var textObject = new SceneObject(textSprite);
            wade.addSceneObject(textObject);
        }
    };