# TicTacToe

## Running it
To run it, you must have installed [Ionic Framework](http://ionicframework.com/docs/guide/installation.html)  

Change the following placeholder MASHAPE_KEY_HERE for your Mashape key  

After the key is replaced, you can start develping ans testing  

## Colaborating:

To clone and start working:
```
git clone https://github.com/katrykat/TicTacToe.git
cd TicTacToe/
npm install
ionic serve
```
After this you can go and open the followin URL on any browser:  
http://localhost:8100/  

To clean the project: 
```
npm run clean
```
## API Used
This have been developed using the followin API:  
https://market.mashape.com/stujo/tic-tac-toe

To use it, you can follow the doc:  
https://market.mashape.com/stujo/tic-tac-toe/overview

Example:  
```
$ curl -i -s \
-H 'X-Mashape-Key: MASHAPE_KEY_HERE' \
-H 'Accept: application/json' \
'https://stujo-tic-tac-toe-stujo-v1.p.mashape.com/O---XX---/O'

HTTP/1.1 200 OK
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Date: Sat, 11 Mar 2017 16:10:44 GMT
Etag: W/"43-BfJ+sm30tq0O9Rqxlx1Pew"
Server: Mashape/5.0.6
Via: 1.1 vegur
X-Powered-By: Express
Content-Length: 67
Connection: keep-alive

{"game":"O---XX---","player":"O","recommendation":3,"strength":-83}
```
