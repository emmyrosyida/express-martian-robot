const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let input = req.body.input;
  let grid = {};

  console.log(req.body);
  //remove carriage return
  input = input.trim().replace(/[\r]/g, "");

  //new line in array
  input = input.split("\n");

  //first index as grid
  let gridInput = trimString(input[0]);
  grid = {
    x: parseInt(gridInput.charAt(0)),
    y: parseInt(gridInput.charAt(1)),
  };

  //robot handling
  let resultArr = [];
  let isScented = [];
  for (let i = 1; i < input.length - 1; i = i + 2) {
    let robotMoving = trimString(input[i + 1]);
    let robot = trimString(input[i]);
    let currentPos = {
      x: parseInt(robot.charAt(0)),
      y: parseInt(robot.charAt(1)),
      compas: robot.charAt(2),
    };

    //initialize next position base on the compas
    let nextPos = updateNextPos({ ...currentPos });
    let lastPos = { ...currentPos };
    //robot moving
    for (let y = 0; y < robotMoving.length; y++) {
      let move = robotMoving.charAt(y);
      if (move == "R" || move == "L") {
        currentPos.compas = updateCompass(currentPos.compas, move);
      } else {
        lastPos = { ...currentPos };
        currentPos = { ...nextPos };
      }

      if (currentPos.x > grid.y || currentPos.y > grid.y) {
        //check robot scent
        let scent = isScented.some((e) => {
          return e.x == lastPos.x && e.y == lastPos.y;
        });

        if (scent) {
          currentPos = { ...lastPos };
        } else {
          isScented.push({ ...lastPos });
          currentPos = { ...lastPos, res: "LOST" };
          break;
        }
      }

      if (y != robotMoving.length - 1)
        nextPos = updateNextPos({ ...currentPos });
    }

    resultArr.push(currentPos);
  }

  res.json(resultArr);
});

var updateNextPos = (currentPos) => {
  switch (currentPos.compas) {
    case "N":
      currentPos.y++;
      break;
    case "E":
      currentPos.x++;
      break;
    case "S":
      currentPos.y--;
      break;
    case "W":
      currentPos.x--;
      break;
    default:
      break;
  }

  return currentPos;
};

var updateCompass = (currentCompass, turn) => {
  let turnRight = turn == "R";
  switch (currentCompass) {
    case "N":
      if (turnRight) currentCompass = "E";
      else currentCompass = "W";
      break;
    case "E":
      if (turnRight) currentCompass = "S";
      else currentCompass = "N";
      break;
    case "S":
      if (turnRight) currentCompass = "W";
      else currentCompass = "E";
      break;
    case "W":
      if (turnRight) currentCompass = "N";
      else currentCompass = "S";
      break;
    default:
      break;
  }
  return currentCompass;
};

var trimString = (str) => {
  return str.replace(/[\s]/g, "");
};

module.exports = router;
