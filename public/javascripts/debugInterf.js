/* -- debugInterf.js --

Rajapinta tulostaa kaiken tarvittavan debug koodin.

Ideana on, ett‰ debug tieto l‰hetet‰‰n parametrin kera rajapinnalle ja yksinkertaisesti parametria muuttamalla saadaan debug tietoa
tulostumaan konsoliin, tiedostoon, kikkareeseen X runtime debuggaukseen yms. 

*/

debugInterf = function() {

	this.debugMsg = function() {
		console.log('Stub: Ei viel‰ tehtyn‰!');
	};	// end debugMsg
	
};	// end debugInterf

// For Chrome Debugging
//@ sourceURL=debugInterf.js