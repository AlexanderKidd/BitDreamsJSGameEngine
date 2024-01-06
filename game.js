var isInitiated = false;

function updateBullets() {
    for(var i = 0; i < player.bullets.length; i++) {
        switch(player.bullets[i].facing) {
            case(1):
                player.bullets[i].x += 5;
                if(player.bullets[i].x > player.bullets[i].targetX) player.bullets[i].isAlive = false;
                break;
            case(2):
                player.bullets[i].x -= 5;
                if(player.bullets[i].x < player.bullets[i].targetX) player.bullets[i].isAlive = false;
                break;
            case(3):
                player.bullets[i].y += 5;
                if(player.bullets[i].y > player.bullets[i].targetY) player.bullets[i].isAlive = false;
                break;
            case(4):
                player.bullets[i].y -= 5;
                if(player.bullets[i].y < player.bullets[i].targetX) player.bullets[i].isAlive = false;
                break;
            default:
                break;
        }
    }

    player.bullets = player.bullets.filter(function(bullet) {
        return bullet.isAlive;
    });
}

function gameUpdate() {
    if(!isInitiated) {
        loadAssets();
        playMusic(AudioAssets.menuMusic);
        setInitPlayerPos((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - 128));
        initInputs();
        isInitiated = true;
    }

    iterateClock();
    updateBullets();
}