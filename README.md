# Bigos v2
Because v1 broke.
This one also broke, so v3 might become a reality.

## What even is this thing?
It's supposed to be a fun, little game, written in JavaScript with a goal to easily be able to setup the game server in any LAN and just instantly be able to play it with others in the LAN.

## how to run it?
1. You need to have **Node.js** and **npm** installed.
2. Clone this repo.
3. Type in terminal `npm install`.
4. After installing the packages, just type `node .` to run it.
5. Server now works! You can join the game with your browser on port **3000**.

## What's the logic behind rendering?
Bigos uses custom made "engine" for managing of rendering things on the canvas. It's based on classes inheriting other, more basic classes, until it inherits the most basic class type `Object`. That way, you don't have to think about the most basic stuff when writing new types of objects, because the lower classes already take care of that for you!

## Can i create custom maps for it?
Yes! But be aware, that the map editor is in a very early stage. 
You can generate a map with any size you want in it, place ground blocks and then download the map file. Now, you can paste the text from file to line 50 of the player.js file.
### Why does player need map data?
That's the reason why development of v2 stopped. Player class ended up being used for everything.

## why everything breaks when second player joins?
Ehmmm... we haven't fully implement multiplayer...

## How can i contribute?
Don't. Bigos v2 is a dead project. If you really want to, you can wait for v3 or try creating your own game :D (it can be a lot of fun to make).