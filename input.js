function doTouchStart(event) {
    if(event.touches[0].clientX - CANVAS.offsetLeft >= CANVAS_WIDTH - 150 && event.touches[0].clientY - CANVAS.offsetTop >= (CANVAS_HEIGHT / 2 + 75) && event.touches[0].clientY - CANVAS.offsetTop <= (CANVAS_HEIGHT / 2 + 150)) {
        firePlayer();
    }

    // Right
    if(event.touches[0].clientX - CANVAS.offsetLeft <= 235 && event.touches[0].clientX - CANVAS.offsetLeft >= 135 &&
        event.touches[0].clientY - CANVAS.offsetTop >= (CANVAS_HEIGHT / 2 + 75) && event.touches[0].clientY - CANVAS.offsetTop <= (CANVAS_HEIGHT / 2 + 150)) {
        movePlayer(2, 0);
    }

    // Left
    if(event.touches[0].clientX - CANVAS.offsetLeft <= 135 && event.touches[0].clientX - CANVAS.offsetLeft >= 20 &&
        event.touches[0].clientY - CANVAS.offsetTop >= (CANVAS_HEIGHT / 2 + 75) && event.touches[0].clientY - CANVAS.offsetTop <= (CANVAS_HEIGHT / 2 + 150)) {
        movePlayer(-2, 0);
    }

    // Up
    if(event.touches[0].clientX - CANVAS.offsetLeft <= 160 && event.touches[0].clientX - CANVAS.offsetLeft >= 95 &&
        event.touches[0].clientY - CANVAS.offsetTop >= (CANVAS_HEIGHT / 2 + 10) && event.touches[0].clientY - CANVAS.offsetTop <= (CANVAS_HEIGHT / 2 + 75)) {
        movePlayer(0, -2);
    }

    // Down
    if(event.touches[0].clientX - CANVAS.offsetLeft <= 160 && event.touches[0].clientX - CANVAS.offsetLeft >= 95 &&
        event.touches[0].clientY - CANVAS.offsetTop >= (CANVAS_HEIGHT / 2 + 10 + 145) && event.touches[0].clientY - CANVAS.offsetTop <= (CANVAS_HEIGHT - 20)) {
        movePlayer(0, 2);
    }
}

function doMouseDown(event) {
    if(player.bullets.length < 5) {
        firePlayer();
        playSound(AudioAssets.bitPopSound);
    }
}

function doKeyDown(event) {
    if(event.keyCode === 87) {
        // W - Up
        movePlayer(0, -2);
    }
    else if(event.keyCode === 83) {
        // S - Down
        movePlayer(0, 2);
    }
    else if(event.keyCode === 65) {
        // A - Left
        movePlayer(-2, 0);
    }
    else if(event.keyCode === 68) {
        // D - Right
        movePlayer(2, 0);
    }
}

function initInputs() {
    CANVAS.addEventListener("touchstart", doTouchStart, {passive: true});

    window.addEventListener("mousedown", doMouseDown, false);
    window.addEventListener("keydown", doKeyDown, false);
}