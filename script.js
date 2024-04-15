window.addEventListener("DOMContentLoaded", start);

const player = {
  x: 0,
  y: 0,
  speed: 120,
  moving: false,
  direction: undefined,
};

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

const tiles = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;

let lastTimestamp = 0;

function checkKeyDown() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" || event.key === "d") {
      controls.right = true;
    }

    if (event.key === "ArrowUp" || event.key === "w") {
      controls.up = true;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
      controls.down = true;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
      controls.left = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight" || event.key === "d") {
      controls.right = false;
    }

    if (event.key === "ArrowUp" || event.key === "w") {
      controls.up = false;
    }

    if (event.key === "ArrowDown" || event.key === "s") {
      controls.down = false;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
      controls.left = false;
    }
  });
}

function start() {
  console.log("Javascript is running :)");

  checkKeyDown();
  requestAnimationFrame(tick);
}

function displayPlayerAtPosition() {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function canMoveTo(pos) {
  if (pos.x < 0 || pos.y < 0 || pos.x > 484 || pos.y > 340) {
    return false;
  } else {
    return true;
  }
}

function movePlayer(deltaTime) {
  player.moving = false;

  const newPos = {
    x: player.x,
    y: player.y,
  };

  if (controls.right) {
    player.moving = true;
    player.direction = "right";
    newPos.x += player.speed * deltaTime;
  } else if (controls.left) {
    player.moving = true;
    player.direction = "left";
    newPos.x -= player.speed * deltaTime;
  }

  if (controls.down) {
    player.moving = true;
    player.direction = "down";
    newPos.y += player.speed * deltaTime;
  } else if (controls.up) {
    player.moving = true;
    player.direction = "up";
    newPos.y -= player.speed * deltaTime;
  }

  if (canMoveTo(newPos)) {
    player.x = newPos.x;
    player.y = newPos.y;
  }
}

function displayPlayerAnimation() {
  const visualPlayer = document.querySelector("#player");

  if (player.moving) {
    visualPlayer.classList.add("animate");
    visualPlayer.classList.remove("up", "down", "left", "right");
    visualPlayer.classList.add(player.direction);
  } else {
    visualPlayer.classList.remove("animate");
  }
}

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  movePlayer(deltaTime);

  displayPlayerAtPosition();

  displayPlayerAnimation();
}

function getTileAtCoord({ row, col }) {
  return tiles[row][col];
}
