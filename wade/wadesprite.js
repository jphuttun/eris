App = function()
{
    this.init = function()
    {
        var textSprite = new TextSprite('Hello World Wide Web', '32px Arial', 'blue', 'center');
        var obj = new SceneObject(textSprite);
        wade.addSceneObject(obj);
    };
};