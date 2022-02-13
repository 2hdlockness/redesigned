"use strict";

Module.register("gameoflife", {

  // Default module config.
  defaults: {
    name: "gameoflife",

    desiredFrameRate: 5,
    resolution: 20,
    canvasWidth: 1000,
    canvasHeight: 400,
    notAliveColorCode: "transparent",
    aliveColorCode: "lime",
    restartTimer: 1000
  },


  start: function() {
    Log.info("Starting module: " + this.name);
    this.sanitizeConfig();
  },


  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.id = "gameOfLifeWrapper";

    return wrapper;
  },

  getScripts: function() {
    return [
      "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"
    ];
  },


  notificationReceived: function(notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      Log.info("DOM objects are created. Starting P5 …");

      var sketch = this.makeSketch(this.config);
      new p5(sketch, "gameOfLifeWrapper");
    }
  },


  sanitizeConfig: function() {
    if (this.config.desiredFrameRate < 1) {
      this.config.desiredFrameRate = 1;
    }

    if (this.config.resolution < 2) {
      this.config.resolution = 2;
    }

    if (this.config.canvasWidth < 50) {
      this.config.canvasWidth = 50;
    }

    if (this.config.canvasHeight < 50) {
      this.config.canvasHeight = 50;
    }
  },


  makeSketch: function(conf) {
    return function(pFive) {
      var currentGenGrid;
      var lastGenGrid;

      /* user definable parameters */
      var desiredFrameRate = conf.desiredFrameRate;
      var resolution = conf.resolution;
      var canvasWidth = conf.canvasWidth;
      var canvasHeight = conf.canvasHeight;
      var notAliveColorCode = conf.notAliveColorCode;
      var aliveColorCode = conf.aliveColorCode;
      var notAliveColor = getNotAliveColor(notAliveColorCode);
      var restartTimer = conf.restartTimer;

      /* computed parameters */
      var rows = canvasWidth / resolution;
      var cols = canvasHeight / resolution;
      var restartFrameCount = restartTimer * desiredFrameRate;
      var frameCount = 0;


      pFive.setup = function() {
        pFive.frameRate(desiredFrameRate);
        pFive.createCanvas(canvasWidth, canvasHeight);

        lastGenGrid = makeGrid(rows, cols);
        currentGenGrid = makeGrid(rows, cols);
        fillGridRandomly(currentGenGrid);
      };


      pFive.draw = function() {
        pFive.clear();
        pFive.background(notAliveColor);

        drawGrid(currentGenGrid);
        frameCount++;
        var nextGenGrid = computeNextGeneration(currentGenGrid);

        if (representingSameState(nextGenGrid, currentGenGrid) || representingSameState(nextGenGrid, lastGenGrid)) {
          frameCount = 0;
          fillGridRandomly(currentGenGrid);
        } else if (frameCount == restartFrameCount) {
          frameCount = 0;
          fillGridRandomly(currentGenGrid);
        } else {
          lastGenGrid = currentGenGrid;
          currentGenGrid = nextGenGrid;
        }
      };


      /*
        "Private functions"
       */

      function getNotAliveColor() {
        if (notAliveColorCode === "transparent") {
          return pFive.color("rgba(0, 0, 0, 0)");
        } else {
          return pFive.color(notAliveColorCode);
        }
      }


      function makeGrid(rows, cols) {
        var array = new Array(rows);

        for (var i = 0; i < rows; i++) {
          array[i] = new Array(cols);
        }

        return array;
      }


      function fillGridRandomly(grid) {
        for (var i = 0; i < grid.length; i++) {
          for (var j = 0; j < grid[i].length; j++) {
            grid[i][j] = pFive.floor(pFive.random(2));
          }
        }
      }


      function drawGrid(grid) {
        for (var i = 0; i < grid.length; i++) {
          for (var j = 0; j < grid[i].length; j++) {
            drawCell(grid, i, j);
          }
        }
      }


      function drawCell(grid, i, j) {
        var aliveColor = pFive.color(aliveColorCode);

        if (grid[i][j] === 1) {
          pFive.fill(aliveColor);
          pFive.stroke(aliveColor);

          var x = i * resolution;
          var y = j * resolution;
          pFive.rect(x, y, resolution - 1, resolution - 1);
        }
      }


      function computeNextGeneration(currentGen) {
        var nextGen = makeGrid(rows, cols);

        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            computeNextGenCell(i, j, currentGen, nextGen);
          }
        }

        return nextGen;
      }


      function computeNextGenCell(i, j, currentGen, nextGen) {
        var currentState = currentGen[i][j];
        var aliveNeighbors = countAliveNeighbors(currentGen, i, j);

        if (currentState === 0 && aliveNeighbors === 3) {
          nextGen[i][j] = 1;
        } else if (currentState === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
          nextGen[i][j] = 0;
        } else {
          nextGen[i][j] = currentState;
        }
      }


      function countAliveNeighbors(grid, x, y) {
        var count = 0;

        for (var i = -1; i < 2; i++) {
          for (var j = -1; j < 2; j++) {
            var row = (x + i + rows) % rows;
            var col = (y + j + cols) % cols;

            count += grid[row][col];
          }
        }

        count -= grid[x][y];

        return count;
      }


      function representingSameState(leftGrid, rightGrid) {
        for (var i = 0; i < leftGrid.length; i++) {
          for (var j = 0; j < leftGrid.length; j++) {
            if (leftGrid[i][j] !== rightGrid[i][j]) {
              return false;
            }
          }
        }

        return true;
      }
    };
  }
});