import { Game, Graphics, Input, Screen } from './types';
import { CanvasGraphics } from './Graphics';
import { WebInput } from './Input';

export abstract class WebGame implements Game {
    private graphics: Graphics;
    private input: Input;
    private screen: Screen | null = null;
    private lastTime: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.graphics = new CanvasGraphics(canvas);
        this.input = new WebInput(canvas);
    }

    start() {
        this.screen = this.getInitScreen();
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    private frameCount: number = 0;
    private loop(now: number) {
        const deltaTime = (now - this.lastTime) / 1000.0;
        this.lastTime = now;

        if (this.screen) {
            this.screen.update(deltaTime);
            this.screen.present(deltaTime);
        }

        this.frameCount++;
        if (this.frameCount % 60 === 0) {
            console.log('Game loop running, deltaTime:', deltaTime);
        }

        requestAnimationFrame(this.loop.bind(this));
    }

    getGraphics(): Graphics {
        return this.graphics;
    }

    getInput(): Input {
        return this.input;
    }

    getAudio(): any {
        return null; // TODO: Implement WebAudio
    }

    setScreen(screen: Screen): void {
        if (this.screen) {
            this.screen.pause();
            this.screen.dispose();
        }
        this.screen = screen;
        if (this.screen) {
            this.screen.resume();
            this.screen.update(0);
        }
    }

    getCurrentScreen(): Screen {
        return this.screen!;
    }

    abstract getInitScreen(): Screen;
}
