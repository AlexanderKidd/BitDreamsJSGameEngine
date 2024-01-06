var player = {
    x: 0,
    y: 0,
    bullets: [],
    facing: 1,
};

function setInitPlayerPos(x, y) {
    player.x = x;
    player.y = y;
}

function movePlayer(x, y) {
    player.x += x;
    player.y += y;

    if(x > 0) {
        // Right
        player.facing = 1;
    }
    else if(x < 0) {
        // Left
        player.facing = 2;
    }
    else if(y > 0) {
        // Down
        player.facing = 3;
    }
    else if(y < 0) {
        // Up
        player.facing = 4;
    }
}

function firePlayer() {
    var targetX = null;
    var targetY = null;
    var facing = 1;

    switch(player.facing) {
        case(1):
            targetX = player.x + 200;
            facing = 1;
            break;
        case(2):
            targetX = player.x - 200;
            facing = 2;
            break;
        case(3):
            targetY = player.y + 200;
            facing = 3;
            break;
        case(4):
            targetY = player.y - 200;
            facing = 4;
            break;
        default:
            break;
    }

    var bullet = {
        isAlive: true,
        facing: facing,
        x: player.x + 32,
        y: player.y + 32,
        targetX: targetX,
        targetY: targetY,
    }

    player.bullets.push(bullet);
}