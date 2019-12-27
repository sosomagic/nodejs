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
  res.status(200);
  return;
});

app.get("/game", function(req, res, next) {
  const query = req.query;
  const playerAction = query.action;

  if (playerWon >= 3 && sameCount == 9) {
    res.status(500);
    res.send("我再也不和你玩儿了！");
  }

  if (playerLastAction && playerAction == playerLastAction) {
    sameCount++;
  } else {
    sameCount = 0;
  }

  playerLastAction = playerAction;

  if (sameCount >= 3) {
    res.status(400);
    res.send("你作弊！");
    sameCount = 9;
    return;
  }

  const gameResult = game(playerAction);

  res.status(200);
  if (gameResult == 0) {
    res.send("平局！");
  } else if (gameResult == 1) {
    res.send("你赢了！");
    playerWon++;
  } else {
    res.send("你输了！");
  }
});

app.get("/", function(req, res) {
  res.send(fs.readFileSync(__dirname + "/index.html", "utf-8"));
});

app.listen(3000);
