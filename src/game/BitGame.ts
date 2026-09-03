import { WebGame } from '../engine/Engine';
import { Screen, Graphics, TouchEventType } from '../engine/types';
import { Player } from './entities/Player';
import { Bullet } from './entities/Bullet';
import { Assets } from './Assets';
import { TextRenderer } from './TextRenderer';

export class BitGameImpl extends WebGame {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    getInitScreen(): Screen {
        return new MainGameScreen(this);
    }
}

class MainGameScreen implements Screen {
    private game: BitGameImpl;
    private player: Player;
    private bullets: Bullet[] = [];

    private bgX: number = 0;
    private bgX2: number = 1535;
    private readonly BG_RESET_X: number = -1535;

    private startTime: number = Date.now();
    private minutes: number = 0;
    private seconds: number = 0;
    private triacontapentasec: number = 0;
    private musicStarted: boolean = false;

    constructor(game: BitGameImpl) {
        this.game = game;
        this.player = new Player();
        // Original pos: (CANVAS_WIDTH / 2), (CANVAS_HEIGHT - 128)
        this.player.x = 400 - 32;
        this.player.y = 480 - 128;
    }

    private iterateClock() {
        const delta = Date.now() - this.startTime;
        this.seconds = Math.round(delta / 1000);
        this.minutes = Math.round(this.seconds / 60);
        this.triacontapentasec = Math.round(delta % 35);
    }

    private getClockTime(): string {
        let mins = this.minutes;
        let secs = this.seconds % 60;
        let frac = this.triacontapentasec;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}.${frac}`;
    }

    private firePlayer() {
        let targetX: number | null = null;
        let targetY: number | null = null;

        switch (this.player.facing) {
            case 1: targetX = this.player.x + 200; break;
            case 2: targetX = this.player.x - 200; break;
            case 3: targetY = this.player.y + 200; break;
            case 4: targetY = this.player.y - 200; break;
        }

        const bullet = new Bullet(
            this.player.x + 32,
            this.player.y + 32,
            this.player.facing,
            targetX,
            targetY
        );
        this.bullets.push(bullet);

        if (Assets.bitPopSound) {
            Assets.bitPopSound.play(0.5);
        }
    }

    update(deltaTime: number): void {
        if (!this.musicStarted && Assets.menuMusic) {
            Assets.menuMusic.setLooping(true);
            Assets.menuMusic.play(0.3);
            this.musicStarted = true;
        }

        this.iterateClock();

        const input = this.game.getInput();

        // Handle Input
        const touchEvents = input.getTouchEvents();
        touchEvents.forEach(event => {
            if (event.type === TouchEventType.TOUCH_DOWN) {
                // Fire button (Right side)
                if (event.x >= 650 && event.y >= 315 && event.y <= 465) {
                    if (this.bullets.length < 5) {
                        this.firePlayer();
                    }
                }
            }

            if (event.type === TouchEventType.TOUCH_DOWN || event.type === TouchEventType.TOUCH_DRAGGED) {
                // D-pad Right
                if (event.x <= 235 && event.x >= 135 && event.y >= 315 && event.y <= 465) {
                    this.player.x += 4;
                    this.player.facing = 1;
                }
                // D-pad Left
                if (event.x <= 135 && event.x >= 20 && event.y >= 315 && event.y <= 465) {
                    this.player.x -= 4;
                    this.player.facing = 2;
                }
            }
        });

        // Update Bullets
        this.bullets.forEach(b => b.update());
        this.bullets = this.bullets.filter(b => b.isAlive);

        // Background scrolling (infinite loop)
        if (this.bgX > this.BG_RESET_X) {
            this.bgX -= 1;
        } else {
            this.bgX = -this.BG_RESET_X;
        }
        if (this.bgX2 > this.BG_RESET_X) {
            this.bgX2 -= 1;
        } else {
            this.bgX2 = -this.BG_RESET_X;
        }
    }

    present(deltaTime: number): void {
        const g = this.game.getGraphics();
        g.clear(0);

        // Draw Infinite Background
        if (Assets.bg) {
            g.drawImage(Assets.bg, this.bgX, 0);
            g.drawImage(Assets.bg, this.bgX2, 0);
        }

        // Draw Clock Bar
        if (Assets.bitBorder) {
            g.drawImage(Assets.bitBorder, 0, 0);
        }
        TextRenderer.drawText(g, this.getClockTime(), true, (800 - (8 * 32)) / 2, 10);

        // Draw Title Text
        TextRenderer.drawText(g, "BIT DREAMS ENGINE", true, (800 - (17 * 32)) / 2, 75);
        const version = import.meta.env.PACKAGE_VERSION || '1.0';
        TextRenderer.drawText(g, `JAVASCRIPT EDITION V${version}`, false, (800 - (25 * 28)) / 2, 125);

        // Draw Player
        this.player.draw(g);

        // Draw Bullets
        this.bullets.forEach(b => b.draw(g));

        // Draw Controls
        if (Assets.bitDpad) g.drawImage(Assets.bitDpad, 20, 250);
        if (Assets.bitFireButton) g.drawImage(Assets.bitFireButton, 650, 315);
    }

    pause(): void {}
    resume(): void {}
    dispose(): void {}
    backButton(): void {}
}
