/* -- Communication Layer --

T‰m‰ rajapinta p‰‰tt‰‰, l‰hetet‰‰nkˆ tiedot miss‰ m‰‰rin pelin aikana serverille ja odotetaanko serverilt‰ vastausta vai 
l‰hetet‰‰nkˆ tieto eteenp‰in paikalliselle scriptille, josta tarvittavat tiedot haetaan.

Tarkoituksena on helpottaa muutoksia, joita vaaditaan varsinaisen pelin toimintaan saattamiseksi, kun siirret‰‰n enemm‰n tietoa 
paikallisista skripteist‰ kohti serveriskirptej‰ tai varsinkin hybridiskriptej‰, jossa laite p‰‰ttelee, kannattaako tieto hakea
serverilt‰ vai ei.

*/

communicationLayer = function() {

	this.talk = function() {
		console.log('Aye!');
	};	// end talk
	
	this.getConnectionStatus() {
		console.log('Stub: Pit‰isi palauttaa yhteyden statuksen (todenn‰kˆisesti nopeus kt/s sek‰ ping).');
			// Pingi‰ tarvittaneen, jos l‰hetet‰‰n lyhyit‰ viestej‰ paljon ja niilt‰ vaaditaan serverilt‰ vastaus
			// Kilotavuja tarvitaan, kun siirret‰‰n paljon tietoa, kuten karttoja, kuvia, kokonaisia koodinp‰tki‰ yms.
	}; // end getConnectionStatus
	
};	// end communicationLayer

// For Chrome Debugging
//@ sourceURL=communicationLayer.js