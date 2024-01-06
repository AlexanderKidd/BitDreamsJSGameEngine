var AudioAssets = {
    menuMusic: new Audio("./assets/bit_menu7.wav"),
    bitPopSound: new Audio("./assets/bit_pop.mp3"),
};

var GraphicsAssets = {
    bg: new Image(),
    bitBorder: new Image(),
    fontSheet: new Image(),
    bitDpad: new Image(),
    bitFireButton: new Image(),
    bitBullet: new Image(),
    bitSoldierDown: new Image(),
    bitSoldierDown2: new Image(),
    bitSoldierLeft: new Image(),
    bitSoldierLeft2: new Image(),
    bitSoldierRight: new Image(),
    bitSoldierRight2: new Image(),
    bitSoldierUp: new Image(),
    bitSoldierUp2: new Image(),
};

function loadAssets() {
    GraphicsAssets.bg.src = "./assets/mainMenu.png";
    GraphicsAssets.bitBorder.src = "./assets/bit_border.png";
    GraphicsAssets.fontSheet.src = "./assets/bit_normFont.png";
    GraphicsAssets.bitDpad.src = "./assets/bit_dpad.png";
    GraphicsAssets.bitFireButton.src = "./assets/bit_firebutton.png";
    GraphicsAssets.bitBullet.src = "./assets/bit_bullet.png";
    GraphicsAssets.bitSoldierDown.src = "./assets/bit_soldierDown.png";
    GraphicsAssets.bitSoldierDown2.src = "./assets/bit_soldierDown2.png";
    GraphicsAssets.bitSoldierLeft.src = "./assets/bit_soldierLeft.png";
    GraphicsAssets.bitSoldierLeft2.src = "./assets/bit_soldierLeft2.png";
    GraphicsAssets.bitSoldierRight.src = "./assets/bit_soldierRight.png";
    GraphicsAssets.bitSoldierRight2.src = "./assets/bit_soldierRight2.png";
    GraphicsAssets.bitSoldierUp.src = "./assets/bit_soldierUp.png";
    GraphicsAssets.bitSoldierUp2.src = "./assets/bit_soldierUp2.png";
}