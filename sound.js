function playSound(sound) {
    sound.play();
}
  
function pauseSound(sound) {
    sound.pause();
}

function playMusic(music) {
    if(music.currentTime > 0 || !music.paused) {
        return;
    }
    music.volume = 0.5;
    music.loop = true;
    music.muted = false;
    var resp = music.play();

    // Odd workaround for basic autoplay in browser.
    if (resp !== undefined) {
        resp.then(_ => {
            // autoplay starts!
        }).catch(err => {
           console.error(err);
           window.addEventListener("click", function() {
            music.play();
           });
           window.addEventListener("touchend", function() {
            music.play();
           });
        });
    }
}

function pauseMusic(music) {
    music.pause();
}