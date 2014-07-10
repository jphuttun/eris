/* -- debugger.js --

Rajapinta tulostaa kaiken tarvittavan debug koodin.

Ideana on, ett� debug tieto l�hetet��n parametrin kera rajapinnalle ja yksinkertaisesti parametria muuttamalla saadaan debug tietoa
tulostumaan konsoliin, tiedostoon, kikkareeseen X runtime debuggaukseen yms. 

*/

var Debugger = {
    log: function(msg, msgType) {
        msgType = msgType || 0; // If msgType is not given => 0 = Console logging

        switch (msgType) {
            case 0:
                console.log(msg);
                break;
            case 1:
                // You debug type code here
                console.log('unrecognized level number ?');
                break;
            case 2:
                // You debug type code here
                console.log('unrecognized level number ?');
                break;
            case 3:
                // You debug type code here
                console.log('unrecognized level number ?');
                break;
            default:
                console.log(msg); // In case wrong number, console logging is default
                break;
        }	// end switch
    }
};

// For Chrome Debugging
//@ sourceURL=debugger.js