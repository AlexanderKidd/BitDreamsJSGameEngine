var bgX = 0;
var bgX2 = 1535;
const BG_RESET_X = -1535;

function drawUpdate(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground(ctx);
    drawClockbar(ctx);
    drawText(ctx, "BIT DREAMS ENGINE", true, (CANVAS_WIDTH - (17 * 32)) / 2, 75);
    drawText(ctx, "JAVASCRIPT EDITION V" + ENGINE_VERSION, false, (CANVAS_WIDTH - (25 * 28)) / 2, 125);
    drawPlayer(ctx);
    drawProjectiles(ctx);
    drawControls(ctx);
}

function drawBackground(ctx) {
    ctx.drawImage(GraphicsAssets.bg, bgX, 0);
    ctx.drawImage(GraphicsAssets.bg, bgX2, 0);

    // Scroll menu background.
    if (bgX > BG_RESET_X) {
        bgX -= 1;
    } else {
        bgX = -BG_RESET_X;
    }
    if (bgX2 > BG_RESET_X) {
        bgX2 -= 1;
    } else {
        bgX2 = -BG_RESET_X;
    }
}

function drawClockbar(ctx) {
    ctx.drawImage(GraphicsAssets.bitBorder, 0, 0);
    drawText(ctx, getClockTime(), true, (CANVAS_WIDTH - (8 * 32)) / 2, 10);
}

function drawPlayer(ctx) {
    switch(player.facing) {
        case(1):
            if(player.x % 8 === 0) {
                ctx.drawImage(GraphicsAssets.bitSoldierRight, player.x, player.y);
            }
            else {
                ctx.drawImage(GraphicsAssets.bitSoldierRight2, player.x, player.y);
            }
            break;
        case(2):
            if(player.x % 8 === 0) {
                ctx.drawImage(GraphicsAssets.bitSoldierLeft, player.x, player.y);
            }
            else {
                ctx.drawImage(GraphicsAssets.bitSoldierLeft2, player.x, player.y);
            }
            break;
        case(3):
            if(player.y % 8 === 0) {
                ctx.drawImage(GraphicsAssets.bitSoldierDown, player.x, player.y);
            }
            else {
                ctx.drawImage(GraphicsAssets.bitSoldierDown2, player.x, player.y);
            }
            break;
        case(4):
            if(player.y % 8 === 0) {
                ctx.drawImage(GraphicsAssets.bitSoldierUp, player.x, player.y);
            }
            else {
                ctx.drawImage(GraphicsAssets.bitSoldierUp2, player.x, player.y);
            }
            break;
        default:
            ctx.drawImage(GraphicsAssets.bitSoldierRight, player.x, player.y);
            break;
    }
}

function drawProjectiles(ctx) {
    for(var i = 0; i < player.bullets.length; i++) {
        ctx.drawImage(GraphicsAssets.bitBullet, player.bullets[i].x, player.bullets[i].y);
    }
}

function drawControls(ctx) {
    ctx.drawImage(GraphicsAssets.bitDpad, 20, (CANVAS_HEIGHT / 2) + 10);
    ctx.drawImage(GraphicsAssets.bitFireButton, CANVAS_WIDTH - 150, (CANVAS_HEIGHT / 2) + 75);
}

const VALID_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "1234567890" + " " + ".:!?";
const CHARACTER_LENGTH = VALID_CHARACTERS.length;
const LARGE_TEXT_WIDTH = 32;
const LARGE_TEXT_HEIGHT = 32;
const SMALL_TEXT_WIDTH = 24;
const SMALL_TEXT_HEIGHT = 16;

function drawText(ctx, text, isBigText, x, y) {
    if(isBigText) {
        for (var i = 0; i < text.length; i++) {
			for(var j = 0; j < CHARACTER_LENGTH; j++) {
				if (text.charAt(i) == VALID_CHARACTERS.charAt(j)) {
					if (j <= 11) {
                        ctx.drawImage(GraphicsAssets.fontSheet, j * 32, 0, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT, x + (i * 34), y, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT);
					} else if (j > 11 && j <= 23) {
                        ctx.drawImage(GraphicsAssets.fontSheet, (j - 12) * 32, 32, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT, x + (i * 34), y, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT);
					} else if (j > 23 && j <= 35) {
						ctx.drawImage(GraphicsAssets.fontSheet, (j - 24) * 32, 64, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT, x + (i * 34), y, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT);
					} else {
                        ctx.drawImage(GraphicsAssets.fontSheet, (j - 36) * 32, 96, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT, x + (i * 34), y, LARGE_TEXT_WIDTH, LARGE_TEXT_HEIGHT);
					}
				}
			}
		}
    }
    else {
        for (var i = 0; i < text.length; i++) {
			for(var j = 0; j < CHARACTER_LENGTH; j++) {
				if (text.charAt(i) == VALID_CHARACTERS.charAt(j)) {
					if (j <= 11) {
                        ctx.drawImage(GraphicsAssets.fontSheet, j * 24, 160, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT, x + (i * 28), y, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT);
					} else if (j > 11 && j <= 23) {
                        ctx.drawImage(GraphicsAssets.fontSheet, (j - 12) * 24, 176, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT, x + (i * 28), y, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT);
					} else if (j > 23 && j <= 35) {
						ctx.drawImage(GraphicsAssets.fontSheet, (j - 24) * 24, 192, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT, x + (i * 28), y, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT);
					} else {
                        ctx.drawImage(GraphicsAssets.fontSheet, (j - 36) * 24, 208, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT, x + (i * 28), y, SMALL_TEXT_WIDTH, SMALL_TEXT_HEIGHT);
					}
				}
			}
		}
    }
}