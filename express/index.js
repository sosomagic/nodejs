const queryString = require("querystring");
const http = require("http");
const url = require("url");
const fs = require("fs");
const game = require("./game");
const express = require("express");

let playerWon = 0;

let playerLastAction = null;
let sameCount = 0;

const app = express();

app.get("./favicon.ico", function(req, res) {
  res.writeHead(200);
  res.end();
  return;
});

app.get("/game", function(req, res) {
  const parseUrl = url.parse(req.url);
  const query = queryString.parse(parseUrl.query);
  const playerAction = query.action;

  if (playerWon >= 3) {
    res.writeHead(500);
    res.end("我再也不和你玩儿了！");
  }

  if (playerLastAction && playerAction == playerLastAction) {
    sameCount++;
  } else {
    sameCount = 0;
  }

  playerLastAction = playerAction;

  if (sameCount >= 3) {
    res.writeHead(400);
    res.end("你作弊！");
    sameCount = 9;
    return;
  }

  const gameResult = game(playerAction);

  res.writeHead(200);
  if (gameResult == 0) {
    res.end("平局！");
  } else if (gameResult == 1) {
    res.end("你赢了！");
    playerWon++;
  } else {
    res.end("你输了！");
  }
});

app.get("/", function(req, res) {
  res.writeHead(200);
  fs.createReadStream(__dirname + "/index.html").pipe(res);
});

app.listen(3000);
