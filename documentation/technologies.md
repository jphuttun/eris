Technologies used
=================

Eris has following parts:

- Frontend
	- Web page
	- Client (game as javascript files)
- Backend
	- Simple HTTP server serving web page and client js-files
	- Game server with API (TODO)

Frontend: Web page
------------------

- Language: Html + Css
- Template language: HJS

Frontend: Client
----------------

- Language: Javascript
- Game engines: WADE + WADE isometric plugin
- Package manager: Bowser (TODO)
- Task runner: Grunt (TODO)
- Code quality: JSHint
- Test framework: None (TODO)

- Bowser modules:
	- jQuery: Latest jQuery
	- wade: WADE Game Engine (not Bowser package)
	- wadeiso: WADE Game Engine, Isometric plugin (not Bowser package)

Backend: Simple HTTP server
---------------------------

- Language: Node.js
- Package manager: npm
- Task runner: Grunt (TODO)
- Code quality: JSHint
- Test framework: None (TODO)

- NPM modules:
	- express: Express, simple HTTP server
	- hjs: HTML template language
	- less-middleware: For dynamic stylesheets

Backend: Game server
--------------------

- Language: Node.js
- Package manager: npm
- Task runner: Grunt (TODO)
- Code quality: JSHint
- Test framework: None (TODO)

- NPM modules:
	- N/A
