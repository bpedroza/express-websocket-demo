# Node/Express Websocket Demo Using Socket.io

This is just a demo app that implements websockets on a node.js server using express.

## Local Setup:
1 Clone the repo
2 CD into directory
3 `npm install`
4 `node index.js`
5 visit localhost:3000 in your browser.

## Usage

You can add or remove people using the form at the top of the page.
Change which event you're viewing with url param event - eg. localhost:3000?event=17
IDs are hardcoded for this demo, the only valid event IDs are 1 and 17.

### TODO
Add docker containers to test serving the app with nginx. Test wss? Not sure how to do that locally yet.